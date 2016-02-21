//=============================================================================
// Common.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/01/24 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 汎用処理
 * @author トリアコンタン
 *
 * @help 自分用
 */

(function () {
    'use strict';
    var pluginName = 'Common';

    var makeCredit = function() {
        var str = '';
        str += 'chunkof様 chunkof_QueryParam.js(https://gist.github.com/chunkof/03806df94177b354f115)\n';
        str += 'ほらたん様 画像素材(http://illust-hp.com/img/jyank.html)\n';
        str += 'hasegawairue様、WTR様 アナログ時計画像\n';
        return str;
    };

    var _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.apply(this, arguments);
        if (Input.isTriggered('control')) alert(makeCredit());
        
    };

    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
    };

    //インフォメーションウインドウの作成------------------------------------

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.apply(this, arguments);
        this.createInformationWindow();
    };


Scene_Menu.prototype.createInformationWindow = function() {
    this._informationWindow = new Window_Information();
    this.addWindow(this._informationWindow);
};
var _Scene_Menu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function() {
    _Scene_Menu_update.call(this);
    // インフォメーションウィンドウの更新
    this._informationWindow.setText();
};
//-----------------------------------------------------------------------------
// Window_Information
function Window_Information() {
    this.initialize.apply(this, arguments);
    this.opacity = 255;
}

Window_Information.prototype = Object.create(Window_Base.prototype);
Window_Information.prototype.constructor = Window_Information;
Window_Information.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 100, 527, 300, 70);
};
Window_Information.prototype.setText = function(text) {
    this.refresh();
};
Window_Information.prototype.refresh = function() {
    this.contents.clear();
    // マップ名、多分ここにアイコンつけるコードが入るかな？
    this.drawIcon(parseInt($dataMap.meta.icon), 0, 0);
    this.drawText($gameMap.displayName(), Window_Base._iconWidth + 8, 0, 280, 'left');
};

})();

