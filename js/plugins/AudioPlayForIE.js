//=============================================================================
// AudioPlayForIE.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/02/15 初版
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
 * @plugindesc IEのオーディオ有効化プラグイン
 * @author トリアコンタン
 *
 * @help Html5Audioを利用してIEでBGM等のオーディオを演奏します。
 * いくつかの制約があります。ゲーム中の
 *
 * 1. IE8以前では動作しません。
 * 2. ピッチの変更が効きません。
 * 3. タッチかクリックするまでオーディオは演奏されません。
 * 4. noaudioパラメータを無視します。
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

    var _AudioManager_shouldUseHtml5Audio = AudioManager.shouldUseHtml5Audio;
    AudioManager.shouldUseHtml5Audio = function() {
        return _AudioManager_shouldUseHtml5Audio.apply(this, arguments) || Utils.isIe();
    };

    var _SceneManager_initAudio = SceneManager.initAudio;
    SceneManager.initAudio = function() {
        try {
            _SceneManager_initAudio.apply(this, arguments);
        } catch (e) {
            if (!Utils.isIe()) throw e;
        }
    };

    Utils.isIe = function() {
        var agent = navigator.userAgent;
        return !!(agent.match(/msie/i) || agent.match(/trident/i));
    };

    var _Html5Audio__setupEventHandlers = Html5Audio._setupEventHandlers;
    Html5Audio._setupEventHandlers = function () {
        _Html5Audio__setupEventHandlers.apply(this, arguments);
        //document.addEventListener('', this._onTouchStart.bind(this));
        window.addEventListener('focus', this._onTouchStart.bind(this));
    };
})();

