//=============================================================================
// TkoolMV_PluginCommandEditor.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2015/12/23 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc プラグインコマンドエディタ起動プラグイン
 * @author トリアコンタン
 *
 * @param エディタ表示位置
 * @desc PCEの表示座標です。X座標、Y座標、横幅、高さをカンマ区切りで指定します。
 * @default 0,0,800,600
 *
 * @param 起動キー
 * @desc エディタ画面の起動を行うキーです(F1～F12)。
 * @default F7
 *
 * @help プラグインコマンド集のコマンドを選択してクリップボードに格納できる
 * プラグインコマンドエディタを起動するプラグインです。
 * イベントテストから起動した場合のみ有効です。
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
    var pluginName = 'TkoolMV_PluginCommandEditor';

    // イベントテストでなければ一切の機能を無効
    if (!DataManager.isEventTest())return;

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

    var getParamArrayString = function (paramNames) {
        var values = getParamString(paramNames);
        return (values || '').split(',');
    };

    var getParamArrayNumber = function (paramNames, min, max) {
        var values = getParamArrayString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        for (var i = 0; i < values.length; i++) values[i] = (parseInt(values[i], 10) || 0).clamp(min, max);
        return values;
    };

    SceneManager._editorWindow = null;

    //=============================================================================
    // SceneManager
    //  プラグインコマンドエディタを起動します。
    //=============================================================================
    SceneManager.openEditor = function() {
        if (!Utils.isNwjs()) return;
        if (SceneManager._editorWindow == null) {
            var newWindow = require('nw.gui').Window.open('PCE/editor_main.html');
            var rectArray = getParamArrayNumber('エディタ表示位置');
            newWindow.moveTo(rectArray[0], rectArray[1]);
            newWindow.resizeTo(rectArray[2], rectArray[3]);
            newWindow.setAlwaysOnTop(true);
            SceneManager._editorWindow = newWindow;
        } else {
            SceneManager._editorWindow.focus();
        }
    };

    var _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        switch (event.keyCode) {
            case Input.functionReverseMapper[getParamString('起動キー')] :
                SceneManager.openEditor();
                break;
            default:
                _SceneManager_onKeyDown.call(this, event);
                break;
        }
    };

    //=============================================================================
    // Scene_Boot
    //  プラグインコマンドエディタを起動します。
    //=============================================================================
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        SceneManager.openEditor();
    };

    //=============================================================================
    // Input
    //  キー入力用逆引きマップを追加定義します。
    //=============================================================================
    Input.functionReverseMapper = {
        'F1'  : 112,
        'F2'  : 113,
        'F3'  : 114,
        'F4'  : 115,
        'F5'  : 116,
        'F6'  : 117,
        'F7'  : 118,
        'F8'  : 119,
        'F9'  : 120,
        'F10' : 121,
        'F11' : 122,
        'F12' : 123
    };
})();

