//=============================================================================
// AdjustScreenSize.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2015/12/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:ja
 * @plugindesc プラグイン名称
 * @author トリアコンタン
 * 
 * @param 横幅
 * @desc 画面の横幅
 * @default デフォルト値
 * 
 * @help プラグイン説明
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （引数の間は半角スペースで区切る）
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  ただし、ヘッダのライセンス表示は残してください。
 */
(function () {
    var pluginName = 'AdjustScreenSize';

    //=============================================================================
    // PluginManager
    //  多言語とnullに対応したパラメータの取得を行います。
    //  このコードは自動生成され、全てのプラグインで同じものが使用されます。
    //=============================================================================
    PluginManager.getParamString = function (pluginName, paramEngName, paramJpgName) {
        var value = this.getParamOther(pluginName, paramEngName, paramJpgName);
        return value == null ? '' : value;
    };

    PluginManager.getParamNumber = function (pluginName, paramEngName, paramJpgName, min, max) {
        var value = this.getParamOther(pluginName, paramEngName, paramJpgName);
        if (arguments.length <= 3) min = -Infinity;
        if (arguments.length <= 4) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    PluginManager.getParamBoolean = function (pluginName, paramEngName, paramJpgName) {
        var value = this.getParamOther(pluginName, paramEngName, paramJpgName);
        return (value || '').toUpperCase() == 'ON';
    };

    PluginManager.getParamOther = function (pluginName, paramEngName, paramJpgName) {
        var value = this.parameters(pluginName)[paramEngName];
        if (value == null) value = this.parameters(pluginName)[paramJpgName];
        return value;
    };

    PluginManager.getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    PluginManager.checkCommandName = function (command, value) {
        return this.getCommandName(command) === value;
    };

    PluginManager.getArgString = function (index, args) {
        return PluginManager.convertEscapeCharacters(args[index]);
    };

    PluginManager.getArgNumber = function (index, args, min, max) {
        if (arguments.length <= 2) min = -Infinity;
        if (arguments.length <= 3) max = Infinity;
        return (parseInt(PluginManager.convertEscapeCharacters(args[index]), 10) || 0).clamp(min, max);
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[XXXXXXXX]などを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (PluginManager.checkCommandName(command, 'XXXXXXXX')) {
        }
    };

    //=============================================================================
    // ◆クラス名◆
    //  クラスの説明
    //=============================================================================
    function Window_FarewellCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_FarewellCommand.prototype             = Object.create(Window_Command.prototype);
    Window_FarewellCommand.prototype.constructor = Window_FarewellCommand;

    Window_FarewellCommand.prototype.initialize = function () {
    };
})();