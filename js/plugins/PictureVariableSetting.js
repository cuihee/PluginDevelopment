//=============================================================================
// PictureVariableSetting.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2016/03/19 表示中のすべてのピクチャに処理を適用するコマンドを追加
// 1.1.2 2016/01/24 ピクチャの最大表示数を設定できる機能を追加
// 1.1.1 2015/12/20 番号の変数指定の初期値を有効/無効で設定できるよう修正
// 1.1.0 2015/11/27 ピクチャのファイル名に変数を組み込むことが出来る機能を追加
// 1.0.0 2015/11/24 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc ピクチャ関連のイベント機能拡張プラグイン
 * @author トリアコンタン
 *
 * @param 初期値
 * @desc 初期状態での有効/無効の設定値(ON/OFF)
 * @default OFF
 *
 * @param ピクチャ表示最大数
 * @desc ピクチャ表示最大数（デフォルト100個）を設定します。
 * 変えない場合は何も入力しないでください。
 * @default
 * 
 * @help ピクチャ関連のイベント命令の機能を拡張します。
 * プラグインコマンドから機能を有効にしてください。
 *
 * １．ピクチャ関連のイベント命令で番号が「指定された変数の値」になるよう
 * 仕様を変更します。
 * 例えば番号に「1」を設定すると「1」番の変数の値をピクチャ番号として設定します。
 * プラグインコマンドから「P_VARIABLE_VALID」「P_VARIABLE_INVALID」で
 * 有効/無効を切り替えてください。（初期状態では無効です）
 *
 * ２．ピクチャのファイル名に変数を組み込むことが出来るようになります。
 * 連番を含むファイル名などの柔軟な指定に有効です。
 * プラグインコマンド「P_D_FILENAME」を実行してから
 * 「画像」を指定せず「ピクチャの表示」を行ってください。
 *
 * 要注意！　ピクチャのファイル名を動的指定した場合、デプロイメント時に
 * 未使用ファイルとして除外される可能性があります。
 * その場合、削除されたファイルを入れ直す等の対応が必要です。
 *
 * ３．以下のイベントコマンドの対象が「表示している全てのピクチャ」になります。
 *  ・ピクチャの移動
 *  ・ピクチャの色調変更
 *  ・ピクチャの回転
 *  ・ピクチャの消去
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （引数の間は半角スペースで区切る）
 *
 *  P_VARIABLE_VALID : ピクチャ番号の変数設定が有効になります。
 *  P_VARIABLE_INVALID : ピクチャ番号の変数設定が無効になります。
 *  ※ 一度有効に設定したら、無効にするまでずっとそのままです。
 *  例 P_VARIABLE_VALID
 *
 *  P_D_FILENAME [ファイル名] :
 *  次に表示するピクチャのファイル名に変数を含めることができます。
 *  変数は「文章の表示」と同様の書式\V[n]で組み込んでください。
 *  拡張子は指定しないでください。
 *  例 P_D_FILENAME file\V[1]
 *
 *  P_TARGET_ALL :
 *  ピクチャ関連のイベントコマンドの対象を
 *  「表示している全てのピクチャ」に変更します。
 *  1回実行すると設定はもとに戻ります。
 *  例 P_TARGET_ALL
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function () {
    'use strict';
    var pluginName = 'PictureVariableSetting';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return (value || '').toUpperCase() == 'ON';
    };

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    var getArgString = function (args, upperFlg) {
        args = convertEscapeCharacters(args);
        return upperFlg ? args.toUpperCase() : args;
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\,(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1])).padZero(arguments[2]);
        }.bind(this));
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters(text) : text;
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[P_VARIABLE_VALID]などを追加定義します。
    //  ピクチャ番号を変数で指定するよう変更します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        switch (getCommandName(command)) {
            case 'P_VARIABLE_VALID':
                $gameSystem.pictureNumVariable = true;
                break;
            case 'P_VARIABLE_INVALID':
                $gameSystem.pictureNumVariable = false;
                break;
            case 'P_D_FILENAME':
                $gameScreen.dPictureFileName = getArgString(args[0]);
                break;
            case 'P_TARGET_ALL':
                $gameScreen.setPictureTargetAll();
                break;
        }
    };

    var _Game_Interpreter_command231 = Game_Interpreter.prototype.command231;
    Game_Interpreter.prototype.command231 = function() {
        return this.transPictureNumber(_Game_Interpreter_command231.bind(this));
    };

    var _Game_Interpreter_command232 = Game_Interpreter.prototype.command232;
    Game_Interpreter.prototype.command232 = function() {
        return this.transPictureNumber(_Game_Interpreter_command232.bind(this));
    };

    var _Game_Interpreter_command233 = Game_Interpreter.prototype.command233;
    Game_Interpreter.prototype.command233 = function() {
        return this.transPictureNumber(_Game_Interpreter_command233.bind(this));
    };

    var _Game_Interpreter_command234 = Game_Interpreter.prototype.command234;
    Game_Interpreter.prototype.command234 = function() {
        return this.transPictureNumber(_Game_Interpreter_command234.bind(this));
    };

    var _Game_Interpreter_command235 = Game_Interpreter.prototype.command235;
    Game_Interpreter.prototype.command235 = function() {
        return this.transPictureNumber(_Game_Interpreter_command235.bind(this));
    };

    Game_Interpreter.prototype.transPictureNumber = function(handler) {
        var result;
        if ($gameSystem.pictureNumVariable) {
            var oldValue = this._params[0];
            this._params[0] = $gameVariables.value(this._params[0]).clamp(1, $gameScreen.maxPictures());
            result = handler();
            this._params[0] = oldValue;
        } else {
            result = handler();
        }
        return result;
    };

    //=============================================================================
    // Game_System
    //  ピクチャ番号の変数指定フラグを追加定義します。
    //=============================================================================
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this.pictureNumVariable = getParamBoolean('初期値');
    };

    //=============================================================================
    // Game_Screen
    //  動的ファイル名指定用のプロパティを追加定義します。
    //=============================================================================
    var _Game_Screen_clear = Game_Screen.prototype.clear;
    Game_Screen.prototype.clear = function() {
        _Game_Screen_clear.call(this);
        this.dPictureFileName = null;
    };

    Game_Screen.prototype.setPictureTargetAll = function() {
        this._pictureTargetAll = true;
    };

    var _Game_Screen_movePicture = Game_Screen.prototype.movePicture;
    Game_Screen.prototype.movePicture = function(pictureId, origin, x, y, scaleX,
                                                 scaleY, opacity, blendMode, duration) {
        if (this._pictureTargetAll) {
            this.iteratePictures(function(picture) {
                picture.move(origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
            }.bind(this));
            this._pictureTargetAll = false;
        } else {
            _Game_Screen_movePicture.apply(this, arguments);
        }
    };

    var _Game_Screen_rotatePicture = Game_Screen.prototype.rotatePicture;
    Game_Screen.prototype.rotatePicture = function(pictureId, speed) {
        if (this._pictureTargetAll) {
            this.iteratePictures(function(picture) {
                picture.rotate(speed);
            }.bind(this));
            this._pictureTargetAll = false;
        } else {
            _Game_Screen_rotatePicture.apply(this, arguments);
        }
    };

    var _Game_Screen_tintPicture = Game_Screen.prototype.tintPicture;
    Game_Screen.prototype.tintPicture = function(pictureId, tone, duration) {
        if (this._pictureTargetAll) {
            this.iteratePictures(function(picture) {
                picture.tint(tone, duration);
            }.bind(this));
            this._pictureTargetAll = false;
        } else {
            _Game_Screen_tintPicture.apply(this, arguments);
        }
    };

    var _Game_Screen_erasePicture = Game_Screen.prototype.erasePicture;
    Game_Screen.prototype.erasePicture = function(pictureId) {
        if (this._pictureTargetAll) {
            this.iteratePictures(function(picture, pictureId) {
                var realPictureId = this.realPictureId(pictureId);
                this._pictures[realPictureId] = null;
            }.bind(this));
            this._pictureTargetAll = false;
        } else {
            _Game_Screen_erasePicture.apply(this, arguments);
        }
    };

    Game_Screen.prototype.iteratePictures = function(callBack) {
        for (var i = 1, n = this.maxPictures(); i <= n; i++) {
            var picture = this.picture(i);
            if (picture) callBack.call(this, picture, i);
        }
    };

    var _Game_Screen_maxPictures = Game_Screen.prototype.maxPictures;
    Game_Screen.prototype.maxPictures = function() {
        var max = getParamNumber('ピクチャ表示最大数', 0);
        return max > 0 ? max : _Game_Screen_maxPictures.apply(this, arguments);
    };

    //=============================================================================
    // Game_Picture
    //  ファイル名の動的生成処理を追加定義します。
    //=============================================================================
    var _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
                                           scaleY, opacity, blendMode) {
        if ($gameScreen.dPictureFileName != null) {
            arguments[0] = $gameScreen.dPictureFileName;
            $gameScreen.dPictureFileName = null;
        }
        _Game_Picture_show.apply(this, arguments);
    };
})();