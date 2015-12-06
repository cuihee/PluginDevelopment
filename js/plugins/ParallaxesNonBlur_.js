//=============================================================================
// ParallaxesNonBlur.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2015/12/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 視差ゼロ遠景のぼかし除去プラグイン
 * @author トリアコンタン
 * 
 * @help 遠景が視差ゼロ（ファイル名の戦闘に「!」）の場合、ぼかし処理を除去します。
 * その代わり、遠景がループ及びスクロールしなくなります。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  ただし、ヘッダのライセンス表示は残してください。
 */
(function () {

    var _SpriteSet_Map_createParallax = Spriteset_Map.prototype.createParallax;
    Spriteset_Map.prototype.createParallax = function() {
        _SpriteSet_Map_createParallax.call(this);
        this._parallaxNonBlur = new Sprite();
        this._baseSprite.addChild(this._parallaxNonBlur);
    };

    var _SpriteSet_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
    Spriteset_Map.prototype.updateParallax = function() {
        if (this._parallax.tilingTexture != null) {
            this._parallaxZero = $gameMap._parallaxZero;
            this._parallax.tilingTexture.scaleMode =
                $gameMap._parallaxZero ? PIXI.scaleModes.NEAREST : PIXI.scaleModes.NEAREST;
            this._parallax.texture.needsUpdate = true;
            this._parallax.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        }
        _SpriteSet_Map_updateParallax.call(this);
    };
})();