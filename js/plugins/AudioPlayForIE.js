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
 * @plugindesc プラグイン名称が未入力です。
 * @author トリアコンタン
 *
 * @param パラメータ
 * @desc パラメータ説明
 * @default デフォルト値
 *
 * @help プラグイン説明が未入力です。
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

    var _AudioManager_shouldUseHtml5Audio = AudioManager.shouldUseHtml5Audio;
    AudioManager.shouldUseHtml5Audio = function() {
        return _AudioManager_shouldUseHtml5Audio.apply(this, arguments) || Utils.isIe();
    };

    var _SceneManager_initAudio = SceneManager.initAudio;
    SceneManager.initAudio = function() {
        if (!Utils.isIe()) _SceneManager_initAudio.apply(this, arguments);
    };

    Utils.isIe = function() {
        var agent = navigator.userAgent.toLowerCase();
        return !!(agent.match(/msie/) || agent.match(/trident/));
    };

    var _Html5Audio__setupEventHandlers = Html5Audio._setupEventHandlers;
    Html5Audio._setupEventHandlers = function () {
        _Html5Audio__setupEventHandlers.apply(this, arguments);
        document.addEventListener('keydown', this._onTouchStart.bind(this));
    };
})();

