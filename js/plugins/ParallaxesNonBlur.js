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
        this._parallax.visible = !$gameMap._parallaxZero;
        this._parallaxNonBlur.visible = $gameMap._parallaxZero;
        if ($gameMap._parallaxZero) {
            this._parallax.bitmap = null;
            if (this._parallaxName !== $gameMap.parallaxName()) {
                this._parallaxName = $gameMap.parallaxName();
                this._parallaxNonBlur.bitmap = ImageManager.loadParallax(this._parallaxName);
            }
            if (this._parallaxNonBlur.bitmap) {
                this._parallaxNonBlur.x = 0;
                this._parallaxNonBlur.y = 0;
                this._parallaxNonBlur.setFrame($gameMap.parallaxOx(), $gameMap.parallaxOy(),
                    Graphics.width, Graphics.height);
            }
        } else {
            this._parallaxNonBlur.bitmap = null;
            _SpriteSet_Map_updateParallax.call(this);
        }

    };
})();