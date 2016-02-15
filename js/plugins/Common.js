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

})();

