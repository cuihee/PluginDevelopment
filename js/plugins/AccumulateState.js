//=============================================================================
// AccumulateState.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
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
 * @param パラメータ
 * @desc パラメータ説明
 * @default デフォルト値
 *
 * @help 特定のステートを蓄積型に変更します。
 * 使用効果「ステート付加」によって値が蓄積していき、
 * 100を超えると対象のステートが有効になります。
 *
 * 蓄積量は対象の「ステート有効度」によって変動します。
 * また、使用効果「ステート解除」によって蓄積量がリセットされます。
 *
 * ステートのメモ欄に以下の通り設定してください。
 * <AS蓄積型>
 *
 * さらに蓄積量をゲージで表示することができます。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName = 'AccumulateState';
    var metaTagPrefix = 'AS';

    var getCommandName = function(command) {
        return (command || '').toUpperCase();
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
            case 'XXXXX' :
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

    var _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function() {
        _Game_BattlerBase_clearStates.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
    };

    var _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        _Game_BattlerBase_eraseState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    var _Game_Battler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function(stateId) {
        _Game_Battler_removeState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    var _Game_BattlerBase_attackStates = Game_BattlerBase.prototype.attackStates;
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
            this._stateAccumulations[stateId] += value;
            if (this._stateAccumulations[stateId] >= 1.0) {
                target.addState(stateId);
                return true;
            }
        }
        return false;
    };

    //=============================================================================
    // Game_Action
    //  行動によってステート蓄積量を増やします。
    //=============================================================================
    var _Game_Action_itemEffectAddAttackState = Game_Action.prototype.itemEffectAddAttackState;
    Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
        _Game_Action_itemEffectAddAttackState.apply(this, arguments);
        this.subject().attackStates(true).forEach(function(stateId) {
            var accumulation = effect.value1;
            accumulation *= target.stateRate(stateId);
            accumulation *= this.subject().attackStatesRate(stateId);
            accumulation *= this.lukEffectRate(target);
            var result = target.accumulateState(stateId, accumulation);
            if (result) this.makeSuccess(target);
        }.bind(this), target);
    };

    var _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
    Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
        if (BattleManager.isStateAccumulate(effect.dataId)) {
            var accumulation = effect.value1;
            if (!this.isCertainHit()) {
                accumulation *= target.stateRate(effect.dataId);
                accumulation *= this.lukEffectRate(target);
            }
            var result = target.accumulateState(stateId, accumulation);
            if (result) this.makeSuccess(target);
        } else {
            _Game_Action_itemEffectAddNormalState.apply(this, arguments);
        }
    };

    BattleManager.isStateAccumulate = function(stateId) {
        return stateId > 0 && !!getMetaValues($dataStates[stateId], ['蓄積型', 'Accumulation']);
    };
})();

