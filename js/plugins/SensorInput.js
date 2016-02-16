//=============================================================================
// SensorInput.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/02/16 初版
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
 * @plugindesc プラグイン名称
 * @author トリアコンタン
 * 
 * @param パラメータ
 * @desc パラメータ説明
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

function SensorInput() {
    throw new Error('This is a static class');
}

(function () {
    var pluginName = 'SensorInput';

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };
    
    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        try {
            this.pluginCommandSensorInput(command, args);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window = require('nw.gui').Window.get();
                if (!window.isDevToolsOpen()) {
                    var devTool = window.showDevTools();
                    devTool.moveTo(0, 0);
                    devTool.resizeTo(Graphics.width, Graphics.height);
                    window.focus();
                }
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.toString());
        }
    };

    Game_Interpreter.prototype.pluginCommandSensorInput = function(command, args) {
        switch (getCommandName(command)) {
            case 'XXXXX' :
                break;
        }
    };

    var _SceneManager_initInput = SceneManager.initInput;
    SceneManager.initInput = function() {
        _SceneManager_initInput.apply(this, arguments);
        SensorInput.initialize();
    };

    var _SceneManager_updateInputData = SceneManager.updateInputData;
    SceneManager.updateInputData = function() {
        _SceneManager_updateInputData.apply(this, arguments);
        SensorInput.update();
    };

    var _Window_Selectable_updateInputData = Window_Selectable.prototype.updateInputData;
    Window_Selectable.prototype.updateInputData = function() {
        _Window_Selectable_updateInputData.apply(this, arguments);
        SensorInput.update();
    };

    //=============================================================================
    // SensorInput
    //  センサー情報を取得するモジュールです。
    //=============================================================================
    SensorInput.initialize = function() {
        this.clear();
        this._setupEventHandlers();
    };

    SensorInput.clear = function() {
        this._orientationAbsolute = 0;
        this._orientationAlpha    = 0;
        this._orientationBeta     = 0;
        this._orientationGamma    = 0;
        this._accelerationX       = 0;
        this._accelerationY       = 0;
        this._accelerationZ       = 0;
    };

    SensorInput.update = function() {

    };

    SensorInput._setupEventHandlers = function() {
        window.addEventListener('deviceorientation', this._onDeviceOrientation.bind(this), true);
        window.addEventListener('devicemotion', this._onDeviceMotion.bind(this), true);
    };

    SensorInput._onDeviceOrientation = function(event) {
        this._orientationAbsolute = event.absolute;
        this._orientationAlpha    = event.alpha;
        this._orientationBeta     = event.beta;
        this._orientationGamma    = event.gamma;
    };

    SensorInput._onDeviceMotion = function(event) {
        this._accelerationX = event.acceleration.x;
        this._accelerationY = event.acceleration.y;
        this._accelerationZ = event.acceleration.z;
    };
})();