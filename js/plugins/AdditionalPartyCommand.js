//=============================================================================
// AdditionalPartyCommand.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/02/21 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Plugin That ...
 * @author triacontane
 *
 * @param param
 * @desc parameter description
 * @default default value
 *
 * @help Plugin That ...
 *
 * Plugin Command
 *  XXXXX [XXX]
 *  ex1：XXXXX 1
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc パーティコマンド追加プラグイン
 * @author トリアコンタン
 *
 * @param コマンド名称
 * @desc 追加するパーティコマンドの名称です。
 * @default オプション
 *
 * @param コールバック処理
 * @desc コマンドを実行したときに実行される処理です。
 * evalによって評価されます。
 * @default SceneManager.push(Scene_Options);
 *
 * @help
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
    var pluginName = 'AdditionalPartyCommand';

    var getParamString = function(paramNames) {
        var value = getParamOther(paramNames);
        return value == null ? '' : value;
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var commandName = getParamString(['コマンド名称', 'CommandName']);

    //=============================================================================
    // Scene_Battle
    //  パーティコマンドに選択肢を追加します。
    //=============================================================================
    var _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.call(this);
        var callBack = getParamString(['コールバック処理', 'CallBack']);
        this._partyCommandWindow.setHandler(commandName, function () {
            eval(callBack);
        }.bind(this));
    };

    //=============================================================================
    // Window_PartyCommand
    //  パーティコマンドに選択肢を追加します。
    //=============================================================================
    var _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        _Window_PartyCommand_makeCommandList.apply(this, arguments);
        this.addCommand(commandName, commandName);
    };
})();

