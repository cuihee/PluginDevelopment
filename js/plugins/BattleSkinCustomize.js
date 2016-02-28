//=============================================================================
// BattleSkinCustomize.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/02/27 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc バトル画面外観変更プラグイン
 * @author トリアコンタン
 *
 * @param コマンドX座標
 * @desc パラメータ説明
 * @default デフォルト値
 *
 * @help 従来のステータスウィンドウを排除して
 * 外観をカスタマイズできるようにします。
 * 戦闘システムには影響を与えません。
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
    var settings = {
        /* fontInfo:フォント関連情報です */
        fontInfo:{
            /* face:フォント名です。
             * 通常のフォントと異なるものを指定した場合ゲーム開始時にロードします。
             */
            face:'GameFont',
            /* パラメータごとのフォント情報です。
             * size   :表示サイズ
             * color  :表示カラー(CSS形式)
             */
            hp:{size:36, color:'rgba(255,255,255,1.0)'},
            mp:{size:36, color:'rgba(255,255,255,1.0)'},
            tp:{size:36, color:'rgba(255,255,255,1.0)'},
        },
        /* positions:位置情報です。 */
        positions:{
            /* party:パーティメンバーごとのステータス表示領域の座標(左上)です。 */
            party:[
                {x:200, y:400},
                {x:600, y:400},
                {x:200, y:400},
                {x:600, y:400},
            ],
            /* size:ステータス表示領域の横幅と高さです。 */
            size:{width:200, height:200},
            /* パラメータごとのステータス表示領域内での座標(左上)です。
             * hp:HPの座標
             * mp:MPの座標
             * tp:TPの座標
             * states:ステートアイコンの座標
             */
            hp:{x:0, y:0},
            mp:{x:0, y:32},
            tp:{x:0, y:64},
            states:{x:100, y:0}
        },
        /* values:表示内容です。 */
    };
    var pluginName = 'BattleSkinCustomize';

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        try {
            this.pluginCommandBattleSkinCustomize(command, args);
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

    Game_Interpreter.prototype.pluginCommandBattleSkinCustomize = function (command, args) {
        switch (getCommandName(command)) {
            case 'XXXXX' :
                break;
        }
    };

    var _Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
    Scene_Battle.prototype.createStatusWindow = function() {
        _Scene_Battle_createStatusWindow.apply(this, arguments);
        this._statusWindow.hide();
        this.addWindow()
    };

    var _Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
    Window_BattleStatus.prototype.refresh = function() {
        _Window_BattleStatus_refresh.apply(this, arguments);

    };
})();

