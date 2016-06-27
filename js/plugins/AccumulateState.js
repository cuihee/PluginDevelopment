//=============================================================================
// AccumulateState.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2016/05/31 戦闘テスト以外で戦闘に入るとエラーになる場合がある問題を修正
// 1.0.0 2016/05/28 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 蓄積型ステートプラグイン
 * @author トリアコンタン
 *
 * @param ゲージ画像ファイル
 * @desc ゲージ表示に使用する画像ファイル(img/pictures)です。空のゲージと満タンのゲージを縦に並べて一つの画像にしてください。
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @help 特定のステートを蓄積型に変更します。
 * 使用効果「ステート付加」によって値が蓄積していき、
 * 100%を超えると対象のステートが有効になります。
 *
 * 蓄積量は対象の「ステート有効度」によって変動します。
 * また、「ステート解除」によって蓄積量がリセットされます。
 *
 * ステートのメモ欄に以下の通り設定してください。
 * <AS蓄積型>
 *
 * ステートをひとつだけ指定して戦闘画面にゲージとして表示することができます。
 * この機能を使う場合は、アクターのメモ欄に以下の通り設定してください。
 * <ASゲージステート:3> // 蓄積型のステートID「3」をゲージとして表示します。
 * <ASゲージX:600>      // ゲージのX座標です。
 * <ASゲージY:400>      // ゲージのY座標です。
 *
 * ゲージ画像はパラメータとして指定したものを使用します。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * ASステート蓄積 [アクターID] [ステートID] [蓄積量]
 *  指定したアクターのステート蓄積量を増減します。
 *  例:ASステート蓄積 1 3 50
 *  ID「1」のアクターにID「3」のステート蓄積量を50%増やします。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName    = 'AccumulateState';
    var metaTagPrefix = 'AS';

    var getCommandName = function(command) {
        return (command || '').toUpperCase();
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var getParamString = function(paramNames) {
        var value = getParamOther(paramNames);
        return value === null ? '' : value;
    };

    var getMetaValue = function(object, name) {
        var metaTagName = metaTagPrefix + (name ? name : '');
        return object.meta.hasOwnProperty(metaTagName) ? object.meta[metaTagName] : undefined;
    };

    var getMetaValues = function(object, names) {
        if (!Array.isArray(names)) return getMetaValue(object, names);
        for (var i = 0, n = names.length; i < n; i++) {
            var value = getMetaValue(object, names[i]);
            if (value !== undefined) return value;
        }
        return undefined;
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(convertEscapeCharactersAndEval(arg, true), 10) || 0).clamp(min, max);
    };

    var convertEscapeCharactersAndEval = function(text, evalFlg) {
        if (text === null || text === undefined) {
            text = evalFlg ? '0' : '';
        }
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1]) >= 1 ? $gameActors.actor(parseInt(arguments[1])) : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1]) >= 1 ? $gameParty.members()[parseInt(arguments[1]) - 1] : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return evalFlg ? eval(text) : text;
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var paramGaugeImage = getParamString(['GaugeImage', 'ゲージ画像ファイル']);

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        try {
            this.pluginCommandAccumulateState(command, args);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window = require('nw.gui').Window.get();
                if (!window.isDevToolsOpen()) {
                    var devTool = window.showDevTools();
                    devTool.moveTo(0, 0);
                    devTool.resizeTo(window.screenX + window.outerWidth, window.screenY + window.outerHeight);
                    window.focus();
                }
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.stack || e.toString());
        }
    };

    Game_Interpreter.prototype.pluginCommandAccumulateState = function(command, args) {
        switch (getCommandName(command)) {
            case metaTagPrefix + 'ステート蓄積' :
            case metaTagPrefix + 'AccumulateState' :
                var actorId      = getArgNumber(args[0], 1);
                var stateId      = getArgNumber(args[1], 1);
                var accumulation = getArgNumber(args[2]) / 100;
                $gameActors.actor(actorId).accumulateState(stateId, accumulation);
                break;
        }
    };

    //=============================================================================
    // Game_BattlerBase
    //  ステート蓄積量を管理します。
    //=============================================================================
    Game_BattlerBase.prototype.clearStateAccumulationsIfNeed = function() {
        if (!this._stateAccumulations) {
            this._stateAccumulations = {};
        }
    };

    var _Game_BattlerBase_clearStates      = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        _Game_BattlerBase_clearStates.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
    };

    var _Game_BattlerBase_eraseState      = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        _Game_BattlerBase_eraseState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    var _Game_Battler_removeState      = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function(stateId) {
        _Game_Battler_removeState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    var _Game_BattlerBase_attackStates      = Game_BattlerBase.prototype.attackStates;
    Game_BattlerBase.prototype.attackStates = function(accumulateFlg) {
        if (arguments.length === 0) accumulateFlg = false;
        var states = _Game_BattlerBase_attackStates.apply(this, arguments);
        return states.filter(function(stateId) {
            return BattleManager.isStateAccumulate(stateId) === accumulateFlg;
        }.bind(this));
    };

    Game_BattlerBase.prototype.accumulateState = function(stateId, value) {
        this.clearStateAccumulationsIfNeed();
        if (BattleManager.isStateAccumulate(stateId)) {
            this._stateAccumulations[stateId] = (this._stateAccumulations[stateId] || 0) + value;
            if (!this.isStateAffected(stateId) && this._stateAccumulations[stateId] >= 1.0) {
                this.addState(stateId);
                return true;
            }
        }
        return false;
    };

    Game_BattlerBase.prototype.getStateAccumulation = function(stateId) {
        return this._stateAccumulations[stateId] || 0;
    };

    Game_BattlerBase.prototype.getGaugeStateAccumulation = function() {
        return this.getStateAccumulation(this.getGaugeStateId());
    };

    Game_BattlerBase.prototype.getGaugeX = function() {
        return this.getGaugeInfo(['ゲージX', '_GaugeX']);
    };

    Game_BattlerBase.prototype.getGaugeY = function() {
        return this.getGaugeInfo(['ゲージY', '_GaugeY']);
    };

    Game_BattlerBase.prototype.getGaugeStateId = function() {
        return this.getGaugeInfo(['ゲージステート', '_GaugeState']);
    };

    Game_BattlerBase.prototype.getGaugeInfo = function(names) {
        return getArgNumber(getMetaValues(this.getData(), names)) || 0;
    };

    //=============================================================================
    // Game_Action
    //  行動によってステート蓄積量を増やします。
    //=============================================================================
    var _Game_Action_itemEffectAddAttackState      = Game_Action.prototype.itemEffectAddAttackState;
    Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
        _Game_Action_itemEffectAddAttackState.apply(this, arguments);
        this.subject().attackStates(true).forEach(function(stateId) {
            var accumulation = effect.value1;
            accumulation *= target.stateRate(stateId);
            accumulation *= this.subject().attackStatesRate(stateId);
            accumulation *= this.lukEffectRate(target);
            var result       = target.accumulateState(stateId, accumulation);
            if (result) this.makeSuccess(target);
        }.bind(this), target);
    };

    var _Game_Action_itemEffectAddNormalState      = Game_Action.prototype.itemEffectAddNormalState;
    Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
        if (BattleManager.isStateAccumulate(effect.dataId)) {
            var accumulation = effect.value1;
            if (!this.isCertainHit()) {
                accumulation *= target.stateRate(effect.dataId);
                accumulation *= this.lukEffectRate(target);
            }
            var result = target.accumulateState(effect.dataId, accumulation);
            if (result) this.makeSuccess(target);
        } else {
            _Game_Action_itemEffectAddNormalState.apply(this, arguments);
        }
    };

    //=============================================================================
    // BattleManager
    //  蓄積型のステートかどうかを判定します。
    //=============================================================================
    BattleManager.isStateAccumulate = function(stateId) {
        return stateId > 0 && !!getMetaValues($dataStates[stateId], ['蓄積型', 'Accumulation']);
    };

    //=============================================================================
    // Scene_Base
    //  ステートゲージを作成します。
    //=============================================================================
    Scene_Battle.prototype.createAccumulateState = function() {
        this._characterPictures = {};
        for (var i = 0, n = $gameParty.members().length; i < n; i++) {
            var sprite = new Sprite_AccumulateState(i);
            this.addChild(sprite);
        }
    };

    var _Scene_Battle_createSpriteset      = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function() {
        _Scene_Battle_createSpriteset.apply(this, arguments);
        this.createAccumulateState();
    };

    //=============================================================================
    // Sprite_AccumulateState
    //  ステート蓄積表示用スプライトです。
    //=============================================================================
    function Sprite_AccumulateState() {
        this.initialize.apply(this, arguments);
    }

    Sprite_AccumulateState.prototype             = Object.create(Sprite.prototype);
    Sprite_AccumulateState.prototype.constructor = Sprite_AccumulateState;

    Sprite_AccumulateState.prototype.initialize = function(index) {
        this._index = index;
        this._actor = null;
        this._rate  = null;
        Sprite.prototype.initialize.call(this);
        this.create();
    };

    Sprite_AccumulateState.prototype.getActor = function() {
        return $gameParty.members()[this._index];
    };

    Sprite_AccumulateState.prototype.create = function() {
        this.bitmap = ImageManager.loadPicture(paramGaugeImage, 0);
        this.createGaugeSprite();
        this.bitmap.addLoadListener(this.onLoadBitmap.bind(this));
        this.visible = false;
    };

    Sprite_AccumulateState.prototype.createGaugeSprite = function() {
        this._gaugeSprite        = new Sprite();
        this._gaugeSprite.bitmap = this.bitmap;
        this.addChild(this._gaugeSprite);
    };

    Sprite_AccumulateState.prototype.onLoadBitmap = function() {
        var height = this.bitmap.height / 2;
        this.setFrame(0, height, this.bitmap.width, height);
        this._gaugeSprite.setFrame(0, 0, this.bitmap.width, height);
    };

    Sprite_AccumulateState.prototype.update = function() {
        var actor = this.getActor();
        if (!actor) return;
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
        this.updateRate();
    };

    Sprite_AccumulateState.prototype.updateRate = function() {
        var rate = Math.min(this._actor.getGaugeStateAccumulation(), 1.0);
        if (rate !== this._rate) {
            this._rate = rate;
            this.bitmap.addLoadListener(function() {
                this._gaugeSprite.setFrame(0, 0, this.bitmap.width * rate, this.bitmap.height / 2);
            }.bind(this));
        }
    };

    Sprite_AccumulateState.prototype.refresh = function() {
        var stateId = this._actor.getGaugeStateId();
        if (stateId > 0) {
            this.x       = this._actor.getGaugeX();
            this.y       = this._actor.getGaugeY();
            this.visible = true;
        } else {
            this.visible = false;
        }
    };
})();

