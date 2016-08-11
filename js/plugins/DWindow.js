//=============================================================================
// DWindow.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2016/07/16 ウィンドウをピクチャの間に差し込むことのできる機能を追加
// 1.1.1 2016/04/29 createUpperLayerによる競合対策
// 1.1.0 2016/01/16 ウィンドウを最前面に表示できる機能を追加
// 1.0.0 2015/11/12 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc Plugin that Make Dynamic Window
 * @author triacontane
 *
 * @param GameVariablesXPos
 * @desc Game variable number that stores the window X position
 * @default 1
 *
 * @param GameVariablesYPos
 * @desc Game variable number that stores the window Y position
 * @default 2
 *
 * @param GameVariablesWidth
 * @desc Game variable number that stores the window width
 * @default 3
 *
 * @param GameVariablesHeight
 * @desc Game variable number that stores the window height
 * @default 4
 *
 * @param AlwaysOnTop
 * @desc Always on top
 * @default OFF
 *
 * @param IncludePicture
 * @desc Include picture dynamic window
 * @default 0
 *
 * @help Make dynamic empty window in any position.
 * This plugin is released under the MIT License.
 *
 * Plugin Command
 *  D_WINDOW_DRAW [window number(1-10)] [x] [y] [width] [height]
 *  ex1：D_WINDOW_DRAW 1
 *  ex2：D_WINDOW_DRAW 1 20 20 320 80
 */

/*:ja
 * @plugindesc 動的ウィンドウ生成プラグイン
 * @author トリアコンタン
 *
 * @param X座標の変数番号
 * @desc X座標を格納するゲーム変数の番号
 * @default 1
 *
 * @param Y座標の変数番号
 * @desc Y座標を格納するゲーム変数の番号
 * @default 2
 *
 * @param 横幅の変数番号
 * @desc 横幅を格納するゲーム変数の番号
 * @default 3
 *
 * @param 高さの変数番号
 * @desc 高さを格納するゲーム変数の番号
 * @default 4
 *
 * @param 最前面に表示
 * @desc ウィンドウを画面の最前面に表示します。
 * @default OFF
 *
 * @param ピクチャに含める
 * @desc ウィンドウをピクチャの間に挟みたい場合、閾値となるピクチャ番号を指定してください。
 * @default 0
 *
 * @help 空のウィンドウを画面上の指定位置に表示します。
 * 最大10個までのウィンドウを表示可能。
 * 表示座標はあらかじめ指定したゲーム変数に格納しておくか、
 * プラグインコマンド実行時に直接指定します。
 * プラグインを使うほどではない自作システムの制作支援にお使いください。
 * 文章の表示はできません。DTextPicture.jsなどを使ってください。
 *
 * パラメータ「ピクチャに含める」にピクチャ番号を指定すると、
 * ウィンドウがその番号のピクチャより上に表示され
 * その番号より上のピクチャより下に表示されます。
 *
 * プラグインコマンド詳細
 *   イベントコマンド「プラグインコマンド」から実行。
 *   （引数の間は半角スペースで区切る）
 *
 *  D_WINDOW_DRAW [ウィンドウ番号] : ウィンドウを表示
 *  例1(座標を変数指定)：D_WINDOW_DRAW 1
 *  例2(座標を直接指定)：D_WINDOW_DRAW 1 20 20 320 80
 *  ※ ウィンドウ番号には1-10までの値を指定してください。
 *
 *  D_WINDOW_ERASE [ウィンドウ番号] : ウィンドウを削除
 *  例：D_WINDOW_ERASE 1
 *  ※ ウィンドウ番号には1-10までの値を指定してください。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function() {
    var pluginName = 'DWindow';

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

    var getArgNumber = function(arg, min, max) {
        if (arguments.length <= 2) min = -Infinity;
        if (arguments.length <= 3) max = Infinity;
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var paramGameVariablesXPos   = getParamNumber(['GameVariablesXPos', 'X座標の変数番号'], 0);
    var paramGameVariablesYPos   = getParamNumber(['GameVariablesYPos', 'Y座標の変数番号'], 0);
    var paramGameVariablesWidth  = getParamNumber(['GameVariablesWidth', '横幅の変数番号'], 0);
    var paramGameVariablesHeight = getParamNumber(['GameVariablesHeight', '高さの変数番号'], 0);
    var paramAlwaysOnTop         = getParamBoolean(['AlwaysOnTop', '最前面に表示']);
    var paramIncludePicture      = getParamNumber(['IncludePicture', 'ピクチャに含める'], 0);

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[D_WINDOW_DRAW]などを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        try {
            this.pluginCommandDWindow(command, args);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window  = require('nw.gui').Window.get();
                var devTool = window.showDevTools();
                devTool.moveTo(0, 0);
                devTool.resizeTo(Graphics.width, Graphics.height);
                window.focus();
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.toString());
            throw e;
        }
    };

    Game_Interpreter.prototype.pluginCommandDWindow = function(command, args) {
        switch (command.toUpperCase()) {
            case 'D_WINDOW_DRAW' :
                var windowInfo = new Rectangle(0, 0, 0, 0);
                var number     = 0;
                switch (args.length) {
                    case 1:
                        number            = getArgNumber(args[0], 1, 10);
                        windowInfo.x      = $gameVariables.value(paramGameVariablesXPos) || 0;
                        windowInfo.y      = $gameVariables.value(paramGameVariablesYPos) || 0;
                        windowInfo.width  = $gameVariables.value(paramGameVariablesWidth) || 0;
                        windowInfo.height = $gameVariables.value(paramGameVariablesHeight) || 0;
                        break;
                    case 5:
                        number            = getArgNumber(args[0], 1, 10);
                        windowInfo.x      = getArgNumber(args[1], 0);
                        windowInfo.y      = getArgNumber(args[2], 0);
                        windowInfo.width  = getArgNumber(args[3], 0);
                        windowInfo.height = getArgNumber(args[4], 0);
                        break;
                    default:
                        throw new Error(command + 'に指定した引数[' + args + 'が不正です。');
                }
                $gameMap.setDrawDWindow(number, windowInfo);
                break;
            case 'D_WINDOW_ERASE' :
                $gameMap.setEraseDWindow(getArgNumber(args[0], 1, 10));
                break;
        }
    };

    //=============================================================================
    // Game_Map
    //  動的ウィンドウ表示用の変数を追加定義します。
    //=============================================================================
    var _Game_Map_setup      = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        if (this._dWindowInfos == null) this._dWindowInfos = [];
    };

    Game_Map.prototype.setDrawDWindow = function(number, windowInfo) {
        this._dWindowInfos[number] = windowInfo;
    };

    Game_Map.prototype.setEraseDWindow = function(number) {
        this._dWindowInfos[number] = null;
    };

    //=============================================================================
    // Spriteset_Map
    //  動的ウィンドウの情報を保持し、作成する処理を追加定義します。
    //=============================================================================
    var _Spriteset_Base_createUpperLayer      = Spriteset_Base.prototype.createUpperLayer;
    Spriteset_Base.prototype.createUpperLayer = function() {
        if (!(this instanceof Spriteset_Map)) return;
        if (!paramAlwaysOnTop && paramIncludePicture === 0) {
            this.createDynamicWindow();
            _Spriteset_Base_createUpperLayer.apply(this, arguments);
        } else {
            _Spriteset_Base_createUpperLayer.apply(this, arguments);
            this.createDynamicWindow();
        }
    };

    Spriteset_Map.prototype.createDynamicWindow = function() {
        this._DynamicWindows = [];
        for (var i = 0; i < 10; i++) {
            this._DynamicWindows[i] = new Window_Dynamic(i);
            if (paramIncludePicture > 0) {
                this._pictureContainer.addChildAt(this._DynamicWindows[i], paramIncludePicture + i);
            } else {
                this.addChild(this._DynamicWindows[i]);
            }
        }
    };

    //=============================================================================
    // Window_Dynamic
    //  マップ画面に自由に配置できる動的ウィンドウです。
    //=============================================================================
    function Window_Dynamic() {
        this.initialize.apply(this, arguments);
    }

    Window_Dynamic.prototype             = Object.create(Window_Base.prototype);
    Window_Dynamic.prototype.constructor = Window_Dynamic;

    Window_Dynamic.prototype.initialize = function(number) {
        this._windowNumber = number;
        var info           = this.windowInfo();
        if (info != null) {
            Window_Base.prototype.initialize.call(this, info.x, info.y, info.width, info.height);
        } else {
            Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
        }
        this.update();
    };

    Window_Dynamic.prototype.windowInfo = function() {
        return $gameMap._dWindowInfos[this._windowNumber];
    };

    Window_Dynamic.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        var info = this.windowInfo();
        if (info != null) {
            if (info.x !== this.x || info.y !== this.y || info.width !== this.width || info.height !== this.height)
                this.move(info.x, info.y, info.width, info.height);
            this.show();
        } else {
            this.hide();
        }
    };
})();