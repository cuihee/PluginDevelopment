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
 * @plugindesc センサー情報取得プラグイン
 * @author トリアコンタン
 * 
 * @param Z軸傾き変数
 * @desc Z軸方向のデバイスの傾き度合いを格納する変数番号
 * @default
 *
 * @param Y軸傾き変数
 * @desc Y軸方向のデバイスの傾き度合いを格納する変数番号
 * @default
 *
 * @param X軸傾き変数
 * @desc X軸方向のデバイスの傾き度合いを格納する変数番号
 * @default
 *
 * @param 傾き絶対値取得
 * @desc ONにすると傾きの度合いを絶対値で取得します。
 * OFFにするとニュートラルポジションからの相対値で取得します。
 * @default OFF
 *
 * @help モバイル端末のハードウェアに搭載されたセンサーの情報を取得して
 * 指定したゲーム変数に格納します。
 *
 * ジャイロセンサー
 * 端末の傾き状態を3次元で取得して変数に格納します。
 * 絶対指定と、ニュートラルポジションからの相対指定の双方が可能です。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （引数の間は半角スペースで区切る）
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

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return (value || '').toUpperCase() === 'ON';
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
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

    var paramOrientationZ = getParamNumber(['Z軸傾き変数', 'OrientationZ'], 0, 5000);
    var paramOrientationY = getParamNumber(['Y軸傾き変数', 'OrientationY'], 0, 5000);
    var paramOrientationX = getParamNumber(['X軸傾き変数', 'OrientationX'], 0, 5000);

    //=============================================================================
    // Game_Variables
    //  変数に値を設定しますが、onChangeを実行しません。
    //=============================================================================
    Game_Variables.prototype.setValueSilent = function(variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            if (typeof value === 'number') {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
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
        this._orientationAbsolute = getParamBoolean(['傾き絶対値取得', 'OrientationAbsolute']);
        this._orientationAlpha    = 0;
        this._orientationBeta     = 0;
        this._orientationGamma    = 0;
        this._neutralAlpha        = 0;
        this._neutralBeta         = 0;
        this._neutralGamma        = 0;
        this._accelerationX       = 0;
        this._accelerationY       = 0;
        this._accelerationZ       = 0;
        this._sensitive           = 0.1;
    };

    SensorInput.update = function() {
        if (!$gameVariables) return;
        $gameVariables.setValueSilent(paramOrientationZ, this.getOrientationAlpha());
        $gameVariables.setValueSilent(paramOrientationX, this.getOrientationBeta());
        $gameVariables.setValueSilent(paramOrientationY, this.getOrientationGamma());
    };

    SensorInput.setSensitive = function(value) {
        this._sensitive = value.clamp(0, 10000);
    };

    SensorInput.getOrientationAlpha = function() {
        return (this._orientationAlpha - (this._orientationAbsolute ? 0 : this._neutralAlpha)) * this._sensitive;
    };

    SensorInput.getOrientationBeta = function() {
        return (this._orientationBeta - (this._orientationAbsolute ? 0 : this._neutralBeta)) * this._sensitive;
    };

    SensorInput.getOrientationGamma = function() {
        return (this._orientationGamma - (this._orientationAbsolute ? 0 : this._neutralGamma)) * this._sensitive;
    };

    SensorInput.setNeutralOrientation = function() {
        this._neutralAlpha    = this._orientationAlpha;
        this._neutralBeta     = this._orientationBeta;
        this._neutralGamma    = this._orientationGamma;
    };

    SensorInput._setupEventHandlers = function() {
        window.addEventListener('deviceorientation', this._onDeviceOrientation.bind(this), true);
        window.addEventListener('devicemotion', this._onDeviceMotion.bind(this), true);
    };

    SensorInput._onDeviceOrientation = function(event) {
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