//=============================================================================
// CustomizeBattleLog.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015-2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/05/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc バトルログ調整プラグイン
 * @author トリアコンタン
 *
 * @param 全体攻撃のダメージ
 * @desc パラメータ説明
 * @default デフォルト値
 *
 * @help プラグイン説明が未入力です。
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

(function () {
    'use strict';
    var pluginName    = 'CustomizeBattleLog';
    var metaTagPrefix = 'CustomizeBattleLog';

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    var getParamString = function (paramNames) {
        var value = getParamOther(paramNames);
        return value === null ? '' : value;
    };

    var getParamOther = function (paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var paramParamName = getParamString(['ParamName', 'パラメータ名']);

    var _BattleManager_updateAction = BattleManager.updateAction;
    BattleManager.updateAction = function() {
        _BattleManager_updateAction.apply(this, arguments);
        this._targetsCopy = this._targets.clone();
        while (this._targets.length > 0) {
            _BattleManager_updateAction.apply(this, arguments);
        }
    };

    var _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        _BattleManager_endAction.apply(this, arguments);
        if (this._targetsCopy && this._targetsCopy.length > 0) {
            this._logWindow.displayMultiDamage(this._targetsCopy);
        }
    };

    //=============================================================================
    // Window_BattleLog
    //  戦闘のテンポを制御します。
    //=============================================================================
    var _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function() {
        _Window_BattleLog_initialize.apply(this, arguments);
        this._logIndex = 0;
    };

    var _Window_BattleLog_push = Window_BattleLog.prototype.push;
    Window_BattleLog.prototype.push = function(methodName) {
        _Window_BattleLog_push.apply(this, arguments);
        this.getLatestMethod().index = this._logIndex;
        this._logIndex++;
    };

    var _Window_BattleLog_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
    Window_BattleLog.prototype.displayHpDamage = function(target) {
        _Window_BattleLog_displayHpDamage.apply(this, arguments);
        if (this.getLatestMethod().name === 'addText') {
            this._methods.pop();
        }
    };

    Window_BattleLog.prototype.getLatestMethod = function() {
        return this._methods[this._methods.length - 1];
    };

    var _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        this.sortMethods();
        while (!this.updateWait() && this._methods.length > 0) {
            _Window_BattleLog_update.apply(this, arguments);
        }
    };

    Window_BattleLog.prototype.sortMethods = function() {
        this._methods.sort(this.compareMethodsOrder.bind(this));
    };

    Window_BattleLog.prototype.compareMethodsOrder = function(a, b) {
        var dis = this.getMethodPriority(b) - this.getMethodPriority(a);
        if (dis !== 0) {
            return dis;
        } else {
            return a.index - b.index;
        }
    };

    Window_BattleLog.prototype.getMethodPriority = function(method) {
        switch (method.name) {
            case 'popupDamage':
                return 10;
            case 'performDamage':
                return 9;
            default :
                return 0;
        }
    };

    Window_BattleLog.prototype.displayMultiDamage = function(targets) {
        this.push('addText', this.makeMultiHpDamageText(targets));
    };

    Window_BattleLog.prototype.makeMultiHpDamageText = function(targets) {
        var damage = 0;
        targets.forEach(function (target) {
            damage += target.result().hpDamage;
        }.bind(this));
        damage = Math.floor(damage / targets.length);
        var target = targets[0];
        var result = target.result();
        var isActor = target.isActor();
        var name = targets.length === 1 ? target.name : TextManager.partyName.format(target.name);
        var fmt;
        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(name, TextManager.hp, damage);
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
            return fmt.format(name, damage);
        } else if (damage < 0) {
            fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
            return fmt.format(name, TextManager.hp, -damage);
        } else {
            fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
            return fmt.format(name);
        }
    };
})();

