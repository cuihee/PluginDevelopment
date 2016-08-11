//=============================================================================
// Asset_JSON_Maker_for_MV
// ----------------------------------------------------------------------------
// Copyright (c) 2016 fftfantt
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.1.0 2016/7/12 β版
// 0.5.0 2016/7/15 ファイルの書き出し方法やエラー処理などを変更
// 0.6.0 2016/7/20 全体的にリファクタリング
// 0.7.0 2016/7/30 フォルダごとに書き出し機能を追加、エラー時にDevToolsを起動
// ----------------------------------------------------------------------------
// [HomePage]: https://googledrive.com/host/0BxiSZT-B8lvFOUFhVTF6VjNnUGc/index.html 
// [Twitter] : https://twitter.com/fftfantt/
// [GitHub]  : https://github.com/fftfantt/
//=============================================================================
/*:
 * @plugindesc 使用素材一覧JSON作成
 * @author fftfantt
 * 
 * @param nameJSON
 * @desc 書き出すJSONのファイル名
 * @default MV_Project.json
 * 
 * @param isExtension
 * @desc 素材名の拡張子を除外 ON or OFF
 * @default ON
 * 
 * @param isWrite_bgm
 * @desc bgmフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_bgs
 * @desc bgsフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_me
 * @desc meフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_se
 * @desc seフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_animations
 * @desc animationsフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_battlebacks1
 * @desc battlebacks1フォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_battlebacks2
 * @desc battlebacks2フォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_characters
 * @desc  charactersフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_enemies
 * @desc enemiesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_faces
 * @desc facesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_parallaxes
 * @desc parallaxesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_pictures
 * @desc picturesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_sv_actors
 * @desc actorsフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_sv_enemies
 * @desc enemiesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_system
 * @desc systemフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_tilesets
 * @desc tilesetsフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_sv_Titles1
 * @desc SV_Titles1フォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_sv_Titles2
 * @desc SV_Titles2フォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_movies
 * @desc moviesフォルダの素材名を書き出す ON or OFF
 * @default ON
 * 
 * @param isWrite_others
 * @desc その他ツクールMV標準以外のフォルダの素材名を書き出す ON or OFF
 * @default OFF
 * 
 * @help
 * 
 * ■注意
 *  このプラグインはローカルファイルの削除および上書き(作成)を行います。
 *  使用前にファイルのバックアップを取ることを強く推奨します。
 *  MITライセンスの記載どおり、当プラグインにより必要なファイルが削除
 *  されてしまっても責任は負いかねますので、あらかじめご了承ください。
 *
 * ■説明
 * このプラグインは使用素材一覧のJSON素材を生成します。
 * 対象フォルダは、「audio」配下、「img」配下「movies」配下になります。
 * プラグインコマンド「MakeAssetJSON」を実行すると現行のプロジェクト
 * フォルダを解析して素材一覧のJSONファイルを作成します。
 * プラグインコマンド「DeleteAssetJSON」を実行すると素材一覧のJSON
 * ファイルを削除します。
 * JSONの内容を解析して不要ファイルを削除するようなプラグインとの連携
 * を行う場合、「DeleteAssetJSON」で素材一覧のJSONがあらかじめ削除して、
 * 削除プラグイン実行後に「MakeAssetJSON」でJSONを再作成してください。
 * 
 * ■利用規約
 * 当プラグインはMITライセンスのもとで公開されています。
 * https://osdn.jp/projects/opensource/wiki/licenses%2FMIT_license
 * ヘッダーのライセンス表記のみ残してください。
 * 商用利用、年齢制限のあるゲームへの使用や改変が可能です。
 * クレジットは不要です。
 * 当プラグインによる損害の責任についても、MITライセンスの表記どおりです。 
*/

(function () {
    'use strict';

    //コンストラクタ
    function Asset_JSON_Maker_for_MV() { this.initialize() };

    //初期化
    Asset_JSON_Maker_for_MV.prototype.initialize = function () {
        var parameters = PluginManager.parameters('Asset_JSON_Maker_for_MV');
        this._name = parameters['nameJSON'];
        this._isExtension = (parameters['isExtension'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_bgm = (parameters['isWrite_bgm'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_bgs = (parameters['isWrite_bgs'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_me = (parameters['isWrite_me'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_se = (parameters['isWrite_se'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_animations = (parameters['isWrite_animations'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_battlebacks1 = (parameters['isWrite_battlebacks1'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_battlebacks2 = (parameters['isWrite_battlebacks2'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_characters = (parameters['isWrite_characters'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_enemies = (parameters['isWrite_enemies'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_faces = (parameters['isWrite_faces'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_parallaxes = (parameters['isWrite_parallaxes'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_pictures = (parameters['isWrite_pictures'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_sv_actors = (parameters['isWrite_sv_actors'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_sv_enemies = (parameters['isWrite_sv_enemies'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_system = (parameters['isWrite_system'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_tilesets = (parameters['isWrite_tilesets'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_sv_Titles1 = (parameters['isWrite_sv_Titles1'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_sv_Titles2 = (parameters['isWrite_sv_Titles2'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_movies = (parameters['isWrite_movies'].toUpperCase() === 'ON') ? true : false;
        this._isWrite_others = (parameters['isWrite_others'].toUpperCase() === 'ON') ? true : false;
        this._data = {};
        this._listFolder = {
            "name": ["bgm", "bgs", "me", "se", "animations", "battlebacks1", "battlebacks2", "characters",
                "enemies", "faces", "parallaxes", "pictures", "SV_actors", "SV_enemies", "system",
                "tilesets", "SV_Titles1", "SV_Titles2", "movies"],
            "decision": [this._isWrite_bgm, this._isWrite_bgs, this._isWrite_me, this._isWrite_se, this._isWrite_animations,
                this._isWrite_battlebacks1, this._isWrite_battlebacks2, this._isWrite_characters, this._isWrite_enemies,
                this._isWrite_faces, this._isWrite_parallaxes, this._isWrite_pictures, this._isWrite_SV_actors, this._isWrite_SV_enemies,
                this._isWrite_system, this._isWrite_tilesets, this._isWrite_SV_Titles1, this._isWrite_SV_Titles2, this._isWrite_movies]
        };
    };

    //プロジェクトディレクトリ
    Asset_JSON_Maker_for_MV.prototype.ProjectDirectory = function () {
        var dir = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, "");
        if (dir.match(/^\/([A-Z]\:)/)) {
            dir = dir.slice(1);
        }
        return decodeURIComponent(dir);
    };

    Asset_JSON_Maker_for_MV.prototype.showDevTool = function () {
        var devTool = require('nw.gui');
        devTool.Window.get().moveTo(0, 0);
        devTool.Window.get().resizeTo(window.screenX + window.outerWidth, window.screenY + window.outerHeight);
        devTool.Window.get().showDevTools();
    };

    //拡張子除外
    Asset_JSON_Maker_for_MV.prototype.excludExtension = function (file) {
        if (this._isExtension) file = file.match(/(.*)(?:\.([^.]+$))/)[1];
        return file;
    };

    //重複除外
    Asset_JSON_Maker_for_MV.prototype.deDuplication = function (files) {
        files = files.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        return files;
    }

    //フォルダ書き出し判定
    Asset_JSON_Maker_for_MV.prototype.decisionFolders = function (dir) {
        var path = require('path');
        var num = this._listFolder.name.indexOf(path.basename(dir));
        if (num !== -1) { return this._listFolder.decision[num] }
        else { return this._isWrite_others }
    };

    //ファイルリスト作成
    Asset_JSON_Maker_for_MV.prototype.makeFileList = function (dir) {
        try {
            var fs = require('fs');
            var path = require('path');
            var files = [];
            var list = fs.readdirSync(dir);
            if (list == null) return;
            list.forEach(function (etc) {
                if (fs.statSync(dir + '/' + etc + '/').isDirectory()) this.makeFileList(dir + '/' + etc + '/');
                if (fs.statSync(dir + '/' + etc + '/').isFile()) files.push(this.excludExtension(etc))
            }, this);
            if (files.length !== 0 && this.decisionFolders(dir))
                this._data[path.basename(dir)] = this.deDuplication(files);
        } catch (e) {
            this.showDevTool();
            console.log(e);
        };
    };

    //素材用JSON作成
    Asset_JSON_Maker_for_MV.prototype.makeJSON = function () {
        try {
            var fs = require('fs');
            var dir = this.ProjectDirectory() + '/data/';
            fs.writeFileSync(dir + this._name, JSON.stringify(this._data, null));
            return true;
        } catch (e) {
            if (e.errno === -4058 && e.code === "ENOENT" && e.syscall === "open") {
                var msg = 'JSONファイルが作成できません。';
                msg = msg + '\n' + '作成するフォルダが存在するか、';
                msg = msg + 'またはファイルがOPENされていないか確認してください。';
                msg = msg + '\n'
            }
            this.showDevTool();
            console.log(msg + e);
            return false;
        }
    }

    //素材用JSON削除
    Asset_JSON_Maker_for_MV.prototype.deleteJSON = function () {
        try {
            var fs = require('fs');
            var dir = this.ProjectDirectory() + '/data/';
            fs.unlinkSync(dir + this._name);
            return true;
        } catch (e) {
            if (e.errno === -4058 && e.code === "ENOENT" && e.syscall === "unlink") {
                var msg = '削除するJSONファイルが見つかりません';
                msg = msg + '\n'
            }
            this.showDevTool();
            console.log(msg + e);
            return false;
        };
    };

    var makeMain = function () {
        if (!StorageManager.isLocalMode()) return;
        var AssetJSON = new Asset_JSON_Maker_for_MV();
        var dir = AssetJSON.ProjectDirectory();
        AssetJSON.makeFileList(dir + '/audio/');
        AssetJSON.makeFileList(dir + '/img/');
        AssetJSON.makeFileList(dir + '/movies/');
        var makeJSON = AssetJSON.makeJSON();
        if (makeJSON) console.log('JSON maked');
        AssetJSON = null;
    };

    var deleteMain = function () {
        if (!StorageManager.isLocalMode()) return;
        var AssetJSON = new Asset_JSON_Maker_for_MV();
        var deleteJSON = AssetJSON.deleteJSON();
        if (deleteJSON) console.log('JSON deleted');
        AssetJSON = null;
    };

    //=============================================================================
    // Game_Interpreter_pluginCommand
    //  プラグインコマンドが実行されたときに処理されます
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toUpperCase() === 'MAKEASSETJSON') { makeMain(); }
        else if (command.toUpperCase() === 'DELETEASSETJSON') { deleteMain(); }
    };
})();
