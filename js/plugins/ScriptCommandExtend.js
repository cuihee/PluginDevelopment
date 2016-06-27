//=============================================================================
// ScriptCommandExtend.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/06/11 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:ja
 * @plugindesc スクリプトコマンド拡張
 * @author トリアコンタン
 *
 * @help イベントコマンドや移動ルートの設定の「スクリプト」でできる内容を
 * 関数化して再利用を容易にします。
 *
 *
 *
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    var pluginName    = 'ScriptCommandExtend';
    var metaTagPrefix = 'SCE';

    Game_Character.prototype.moveTowardPosition = function(x, y) {
        this.moveTowardCharacter({x:x, y:y});
    };

    Game_Character.prototype.moveAwayFromPosition = function(x, y) {
        var sx = this.deltaXFrom(x);
        var sy = this.deltaYFrom(y);
        if (Math.abs(sx) > Math.abs(sy)) {
            this.moveStraight(sx > 0 ? 6 : 4);
            if (!this.isMovementSucceeded() && sy !== 0) {
                this.moveStraight(sy > 0 ? 2 : 8);
            }
        } else if (sy !== 0) {
            this.moveStraight(sy > 0 ? 2 : 8);
            if (!this.isMovementSucceeded() && sx !== 0) {
                this.moveStraight(sx > 0 ? 6 : 4);
            }
        }
    };

    Game_Character.prototype.moveTowardEventName = function(name) {
        var character = $gameMap.events().filter(function(event) {
                return event.event().name === name;
            })[0];
        if (character) this.moveTowardCharacter(character);
    };
})();

