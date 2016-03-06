//=============================================================================
// AdjustWindowGraphical.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/03/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc ウィンドウのグラフィカルな位置調整プラグイン。
 * パラメータを変更したら「プロジェクトの保存」（Ctrl+S）
 * @author トリアコンタン
 *
 * @param デザインモード
 * @desc 戦闘テストからウィンドウの位置調整ができます。(ON/OFF)
 * ドラッグ＆ドロップで位置を調整できます。
 * @default ON
 *
 * @param ウィンドウ透過
 * @desc ウィンドウが重なったときに透過表示します。(ON/OFF)
 * 他のプラグインで同様機能を実現している場合はOFFにしてください。
 * @default OFF
 *
 * @param グリッドサイズ
 * @desc ウィンドウ調整中に指定サイズでグリッドを表示します。
 * 0を指定すると非表示になります。
 * @default 48
 *
 * @help 各画面のウィンドウ表示位置をドラッグ＆ドロップで
 * 微調整できます。
 * デフォルトの画面のほか、プラグインによって追加された画面についても
 * 位置をカスタマイズできます。
 * (ただし、相手の実装に依存するので動作保証はできません)
 *
 * 以下の手順で実行してください。
 *
 * 1. パラメータ「デザインモード」を「ON」にする。
 *   - デフォルトで「ON」になっています。
 *
 * 2. テストプレー、戦闘テスト、イベントテストを開始する。
 *
 * 3. マウスでウィンドウを掴んで好きな場所に配置する。
 *   - マウスによる通常のウィンドウ操作は無効になります。
 *   - 他のウィンドウや画面端に自動でスナップします。(Shiftで無効化)
 *   - Ctrlを押していると、グリッドにスナップします。
 *
 * 4. Ctrl+Sでカスタマイズした位置を保存する。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

var $dataContainerPositions = null;

(function () {
    'use strict';
    var pluginName = 'AdjustWindowGraphical';

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (value == null) return null;
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return (value || '').toUpperCase() == 'ON';
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var checkTypeFunction = function(value) {
        return checkType(value, 'Function');
    };

    var checkType = function(value, typeName) {
        return Object.prototype.toString.call(value).slice(8, -1) === typeName;
    };

    var getClassName = function(object) {
        return object.constructor.toString().replace(/function\s+(.*)\s*\([\s\S]*/m, '$1');
    };

    var paramDesignMode      = getParamBoolean(['DesignMode', 'デザインモード']);
    var paramThroughWindow   = getParamBoolean(['ThroughWindow', 'ウィンドウ透過']);
    var paramGridSize        = getParamNumber(['GridSize', 'グリッドサイズ'], 0) || 0;

    //=============================================================================
    // DataManager
    //  WindowPositions.jsonの読み込み処理を追記します。
    //=============================================================================
    DataManager._databaseFileCp = {name: '$dataContainerPositions', src: 'ContainerPositions.json'};

    var _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        _DataManager_loadDatabase.apply(this, arguments);
        var errorMessage = this._databaseFileCp.src + 'が見付かりませんでした。';
        this.loadDataFileAllowError(this._databaseFileCp.name, this._databaseFileCp.src, errorMessage);
    };

    DataManager.loadDataFileAllowError = function(name, src, errorMessage) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function() {
            if (xhr.status < 400) {
                window[name] = JSON.parse(xhr.responseText);
                DataManager.onLoad(window[name]);
            }
        };
        xhr.onerror = function() {
            window[name] = {};
            console.warn(errorMessage);
        };
        window[name] = null;
        xhr.send();
    };

    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        return _DataManager_isDatabaseLoaded.apply(this, arguments) && window[this._databaseFileCp.name];
    };

    //=============================================================================
    // SceneManager
    //  現在のシーン名を返します。
    //=============================================================================
    SceneManager.getSceneName = function() {
        return getClassName(this._scene);
    };
    //=============================================================================
    // Scene_Base
    //  ウィンドウ追加時に位置をロードします。
    //=============================================================================
    var _Scene_Base_addWindow = Scene_Base.prototype.addWindow;
    Scene_Base.prototype.addWindow = function(child) {
        _Scene_Base_addWindow.apply(this, arguments);
        child.loadPosition(this._windowLayer);
    };

    var _Scene_Base_addChild = Scene_Base.prototype.addChild;
    Scene_Base.prototype.addChild = function(child) {
        _Scene_Base_addChild.apply(this, arguments);
        child.loadPosition(this);
    };

    //=============================================================================
    // PIXI.DisplayObjectContainer
    //  表示位置のセーブとロードを行います。
    //=============================================================================
    PIXI.DisplayObjectContainer.prototype.loadPosition = function(parentContainer) {
        var sceneName    = SceneManager.getSceneName();
        var parentName   = getClassName(parentContainer);
        var scenePositions = $dataContainerPositions[sceneName];
        if (scenePositions) {
            var containerPositions = scenePositions[parentName];
            var key = [parentContainer.getChildIndex(this), getClassName(this)];
            if (containerPositions && containerPositions[key]) {
                this.x = containerPositions[key].x;
                this.y = containerPositions[key].y;
                this.width = containerPositions[key].width;
                this.height = containerPositions[key].height;
                this._positionCustomized = true;
            }
        }
    };

    PIXI.DisplayObjectContainer.prototype.savePosition = function(parentContainer) {
        var sceneName    = SceneManager.getSceneName();
        var parentName   = getClassName(parentContainer);
        if (!$dataContainerPositions[sceneName]) $dataContainerPositions[sceneName] = {};
        var scenePositions = $dataContainerPositions[sceneName];
        if (!scenePositions[parentName]) scenePositions[parentName] = {};
        var containerPositions = scenePositions[parentName];
        var key = [parentContainer.getChildIndex(this), getClassName(this)];
        if (!containerPositions[key]) containerPositions[key] = {};
        containerPositions[key].x = this.x;
        containerPositions[key].y = this.y;
        containerPositions[key].width  = this.width;
        containerPositions[key].height = this.height;
    };

    //=============================================================================
    // Utils
    //  デザインモード判定を追加します。
    //=============================================================================
    Utils.isDesignMode = function() {
        return (this.isOptionValid('test') || this.isOptionValid('btest') || this.isOptionValid('etest')) &&
            this.isNwjs() && paramDesignMode;
    };

    //=============================================================================
    // デザインモードの場合のみ実装する
    //=============================================================================
    if (Utils.isDesignMode()) {
        //=============================================================================
        // Input
        //  コピーと上書き保存用のボタンを追加定義します。
        //=============================================================================
        Input.keyMapper[67] = 'copy';
        Input.keyMapper[83] = 'save';

        //=============================================================================
        // TouchInput
        //  ポインタ位置を常に記憶します。
        //=============================================================================
        TouchInput._onMouseMove = function(event) {
            var x = Graphics.pageToCanvasX(event.pageX);
            var y = Graphics.pageToCanvasY(event.pageY);
            this._onMove(x, y);
        };

        //=============================================================================
        // SceneManager
        //  ウィンドウポジションをjson形式で保存する処理を追加定義します。
        //=============================================================================
        var _SceneManager_initialize = SceneManager.initialize;
        SceneManager.initialize = function() {
            _SceneManager_initialize.call(this);
            this.lastWindowX    = null;
            this.lastWindowY    = null;
            this.infoWindow     = '';
            this.infoExtend     = '';
            this._copyCount     = 0;
            this._infoHelp      = 'Ctrl+マウス:グリッドにスナップ Ctrl+S:ウィンドウ位置を保存 Ctrl+Shift+Enter:位置をリセット';
            this._documentTitle = '';
        };

        var _SceneManager_update = SceneManager.updateMain;
        SceneManager.updateMain = function() {
            _SceneManager_update.apply(this, arguments);
            this.updateDragInfo();
        };

        SceneManager.updateDragInfo = function() {
            if (Input.isPressed('control') && Input.isTriggered('copy')) {
                if (this.lastWindowX == null || this.lastWindowY == null) return;
                var clipboard = require('nw.gui').Clipboard.get();
                var copyValue = '';
                if (this._copyCount % 2 === 0) {
                    copyValue = this.lastWindowX.toString();
                    this.infoExtend = ' X座標[' + copyValue + ']をコピーしました。';
                } else {
                    copyValue = this.lastWindowY.toString();
                    this.infoExtend = ' Y座標[' + copyValue + ']をコピーしました。';
                }
                console.log(this.infoExtend);
                clipboard.set(copyValue, 'text');
                this._copyCount++;
            }
            if (Input.isPressed('control') && Input.isTriggered('save')) {
                DataManager.saveDataFileWp();
                this.infoExtend = ' 現在のウィンドウ位置を保存しました。 ';
                console.log(this.infoExtend);
            }
            if (Input.isPressed('control') && Input.isPressed('shift') && Input.isPressed('ok')) {
                $dataContainerPositions[this.getSceneName()] = {};
                DataManager.saveDataFileWp();
                location.reload();
            }
            var docTitle = this._infoHelp + this.infoWindow + this.infoExtend;
            if (docTitle !== this._documentTitle) {
                document.title = docTitle;
                this._documentTitle = docTitle;
            }
        };

        //=============================================================================
        // DataManager
        //  ウィンドウポジションをjson形式で保存する処理を追加定義します。
        //=============================================================================
        DataManager.saveDataFileWp = function() {
            StorageManager.saveToLocalDataFile(this._databaseFileCp.src, window[this._databaseFileCp.name]);
        };

        //=============================================================================
        // StorageManager
        //  ウィンドウポジションをjson形式で保存する処理を追加定義します。
        //=============================================================================
        StorageManager.saveToLocalDataFile = function(fileName, json) {
            var data = JSON.stringify(json);
            var fs = require('fs');
            var dirPath = this.localDataFileDirectoryPath();
            var filePath = dirPath + fileName;
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, data);
        };

        StorageManager.localDataFileDirectoryPath = function() {
            var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
            if (path.match(/^\/([A-Z]\:)/)) {
                path = path.slice(1);
            }
            return decodeURIComponent(path);
        };

        //=============================================================================
        // Scene_Base
        //  ウィンドウをドラッグ＆ドロップします。
        //=============================================================================
        var _Scene_Base_update = Scene_Base.prototype.update;
        Scene_Base.prototype.update = function() {
            _Scene_Base_update.apply(this, arguments);
            if (this._windowLayer) this.updateDrag();
        };

        Scene_Base.prototype.updateDrag = function() {
            var result = this._windowLayer.children.clone().reverse().some(function(container) {
                return checkTypeFunction(container.checkDrag) && container.checkDrag(this._windowLayer);
            }, this);
            if (result) return;
            this.children.clone().reverse().some(function(container) {
                return checkTypeFunction(container.checkDrag) && container.checkDrag(this);
            }, this);
        };

        var _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
        Scene_Base.prototype.createWindowLayer = function(white) {
            if (!(this instanceof Scene_Boot) && !(this instanceof Scene_Map)) this.createGridSprite();
            _Scene_Base_createWindowLayer.apply(this, arguments);
        };

        Scene_Base.prototype.createGridSprite = function() {
            var size = paramGridSize;
            if (size === 0) return;
            this._gridSprite = new Sprite();
            this._gridSprite.setFrame(0, 0, this.width, this.height);
            var bitmap = new Bitmap(this.width, this.height);
            for (var x = 0; x < this.width; x += size) {
                bitmap.fillRect(x, 0, 1, this.height, 'rgba(255,255,255,1.0)');
            }
            for (var y = 0; y < this.height; y += size) {
                bitmap.fillRect(0, y, this.width, 1, 'rgba(255,255,255,1.0)');
            }
            this._gridSprite.bitmap = bitmap;
            this._gridSprite.moveDisable = true;
            this.addChild(this._gridSprite);
        };

        //=============================================================================
        // PIXI.DisplayObjectContainer
        //  コンテナをドラッグ＆ドロップします。
        //=============================================================================
        Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'x', {
            get: function() {
                return  this.position.x;
            },
            set: function(value) {
                if (this._positionCustomized) return;
                this.position.x = value;
            }
        });

        Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'y', {
            get: function() {
                return  this.position.y;
            },
            set: function(value) {
                if (this._positionCustomized) return;
                this.position.y = value;
            }
        });

        var _PIXI_DisplayObjectContainer_initialize = PIXI.DisplayObjectContainer.prototype.initialize;
        PIXI.DisplayObjectContainer.prototype.initialize = function(x, y, width, height) {
            _PIXI_DisplayObjectContainer_initialize.apply(this, arguments);
            this._holding            = false;
            this._dx                 = 0;
            this._dy                 = 0;
            this.moveDisable         = false;
            this._positionCustomized = false;
        };

        PIXI.DisplayObjectContainer.prototype.checkDrag = function(parentContainer) {
            var result = false;
            if (!this.moveDisable) {
                this._parentContainer = parentContainer;
                if (this.updateDragMove()) {
                    var info = 'X:[' + this.x + '] Y:[' + this.y + ']';
                    SceneManager.lastWindowX = this.x;
                    SceneManager.lastWindowY = this.y;
                    SceneManager.infoWindow  = info;
                    SceneManager.infoCopy   = '';
                    if (!this._holding) console.log(info);
                    result = true;
                }
                this._parentContainer = null;
            }
            return result;
        };

        PIXI.DisplayObjectContainer.prototype.updateDragMove = function() {
            if (this.isTouchEvent(TouchInput.isTriggered) || (this._holding && TouchInput.isPressed())) {
                if (!this._holding) this.hold();
                var x = TouchInput.x - this._dx;
                var y = TouchInput.y - this._dy;
                if (Input.isPressed('control')) {
                    var size = paramGridSize;
                    if (size !== 0) {
                        x += (x % size > size / 2 ? size - x % size : -(x % size));
                        y += (y % size > size / 2 ? size - y % size : -(y % size));
                    }
                } else if (!Input.isPressed('shift') && !this.isAnchorChanged()) {
                    x = this.updateSnapX(x);
                    y = this.updateSnapY(y);
                }
                this.position.x = x;
                this.position.y = y;
                this._positionCustomized = true;
                return true;
            } else if (this._holding) {
                this.release();
                return true;
            }
            return false;
        };

        PIXI.DisplayObjectContainer.prototype.isAnchorChanged = function() {
            return false;
        };

        Sprite.prototype.isAnchorChanged = function() {
            return this.anchor.x !== 0 || this.anchor.y !== 0;
        };

        PIXI.DisplayObjectContainer.prototype.hold = function() {
            this._holding = true;
            this._dx      = TouchInput.x - this.x;
            this._dy      = TouchInput.y - this.y;
        };

        Window.prototype.hold = function() {
            PIXI.DisplayObjectContainer.prototype.hold.call(this);
            this._windowBackSprite.setBlendColor([255,255,255,192]);
        };

        Sprite.prototype.hold = function() {
            PIXI.DisplayObjectContainer.prototype.hold.call(this);
            this.setBlendColor([255,255,255,192]);
        };

        PIXI.DisplayObjectContainer.prototype.release = function() {
            this._holding = false;
            this.savePosition(this._parentContainer);
        };

        Window.prototype.release = function() {
            PIXI.DisplayObjectContainer.prototype.release.call(this);
            this._windowBackSprite.setBlendColor([0,0,0,0]);
        };

        Sprite.prototype.release = function() {
            PIXI.DisplayObjectContainer.prototype.release.call(this);
            this.setBlendColor([0,0,0,0]);
        };

        PIXI.DisplayObjectContainer.prototype.updateSnapX = function(x) {
            var minDistanceL = 16, minIndexL = -1, minDistanceR = 16, minIndexR = -1;
            var children = this._parentContainer.children, endX = x + this.width;
            for (var i = 0, n = children.length; i < n; i++) {
                var child = children[i];
                if (child !== this && this.isSameInstance(child) && child.isTouchable() && child.isOverlapY(this)) {
                    var distanceL = Math.abs(x - child.endX);
                    if (minDistanceL > distanceL)  {
                        minDistanceL = distanceL;
                        minIndexL = i;
                    }
                    var distanceR = Math.abs(endX - child.x);
                    if (minDistanceR > distanceR)  {
                        minDistanceR = distanceR;
                        minIndexR = i;
                    }
                }
            }
            if (minDistanceL > Math.abs(x)) return 0;
            if (minDistanceR > Math.abs(Graphics.boxWidth - endX)) return Graphics.boxWidth - this.width;
            if (minDistanceR > minDistanceL) {
                return minIndexL === -1 ? x : children[minIndexL].endX;
            } else {
                return minIndexR === -1 ? x : children[minIndexR].x - this.width;
            }
        };

        PIXI.DisplayObjectContainer.prototype.updateSnapY = function(y) {
            var minDistanceU = 16, minIndexU = -1, minDistanceD = 16, minIndexD = -1;
            var children = this._parentContainer.children, endY = y + this.height;
            for (var i = 0, n = children.length; i < n; i++) {
                var child = children[i];
                if (child !== this && this.isSameInstance(child) && child.isTouchable() && child.isOverlapX(this)) {
                    var distanceU = Math.abs(y - child.endY);
                    if (minDistanceU > distanceU)  {
                        minDistanceU = distanceU;
                        minIndexU = i;
                    }
                    var distanceD = Math.abs(endY - child.y);
                    if (minDistanceD > distanceD)  {
                        minDistanceD = distanceD;
                        minIndexD = i;
                    }
                }
            }
            if (minDistanceU > Math.abs(y)) return 0;
            if (minDistanceD > Math.abs(Graphics.boxHeight - endY)) return Graphics.boxHeight - this.height;
            if (minDistanceD > minDistanceU) {
                return minIndexU === -1 ? y : children[minIndexU].endY;
            } else {
                return minIndexD === -1 ? y : children[minIndexD].y - this.height;
            }
        };

        Window.prototype.isSameInstance = function(objectContainer) {
            return objectContainer instanceof Window;
        };

        Sprite.prototype.isSameInstance = function(objectContainer) {
            return objectContainer instanceof Sprite;
        };

        PIXI.DisplayObjectContainer.prototype.isTouchPosInRect = function() {
            var tx = TouchInput.x;
            var ty = TouchInput.y;
            return (tx >= this.x && tx <= this.endX &&
            ty >= this.y && ty <= this.endY);
        };

        Sprite.prototype.isTouchPosInRect = function () {
            if (this.isTransparent()) return false;
            var dx = TouchInput.x - this.x;
            var dy = TouchInput.y - this.y;
            var sin = Math.sin(-this.rotation);
            var cos = Math.cos(-this.rotation);
            var rx = this.x + Math.floor(dx * cos + dy * -sin);
            var ry = this.y + Math.floor(dx * sin + dy * cos);
            return (rx >= this.minX() && rx <= this.maxX() &&
            ry >= this.minY() && ry <= this.maxY());
        };

        Sprite.prototype.isTransparent = function () {
            var dx = TouchInput.x - this.x;
            var dy = TouchInput.y - this.y;
            var sin = Math.sin(-this.rotation);
            var cos = Math.cos(-this.rotation);
            var bx = Math.floor(dx * cos + dy * -sin) / this.scale.x + this.anchor.x * this.width;
            var by = Math.floor(dx * sin + dy * cos)  / this.scale.y + this.anchor.y * this.height;
            return this.bitmap.getAlphaPixel(bx, by) === 0;
        };

        Sprite.prototype.screenWidth = function() {
            return (this.width || 0) * this.scale.x;
        };

        Sprite.prototype.screenHeight = function() {
            return (this.height || 0) * this.scale.y;
        };

        Sprite.prototype.screenX = function() {
            return (this.x || 0) - this.anchor.x * this.screenWidth();
        };

        Sprite.prototype.screenY = function() {
            return (this.y || 0) - this.anchor.y * this.screenHeight();
        };

        Sprite.prototype.minX = function() {
            return Math.min(this.screenX(), this.screenX() + this.screenWidth());
        };

        Sprite.prototype.minY = function() {
            return Math.min(this.screenY(), this.screenY() + this.screenHeight());
        };

        Sprite.prototype.maxX = function() {
            return Math.max(this.screenX(), this.screenX() + this.screenWidth());
        };

        Sprite.prototype.maxY = function() {
            return Math.max(this.screenY(), this.screenY() + this.screenHeight());
        };

        PIXI.DisplayObjectContainer.prototype.isTouchable = function() {
            return this.visible && this.opacity > 0;
        };

        Window.prototype.isTouchable = function() {
            return PIXI.DisplayObjectContainer.prototype.isTouchable.call(this) && this.isOpen();
        };

        Sprite.prototype.isTouchable = function() {
            return PIXI.DisplayObjectContainer.prototype.isTouchable.call(this) &&
                this.bitmap != null && this.scale.x !== 0 && this.scale.y !== 0;
        };

        PIXI.DisplayObjectContainer.prototype.isTouchEvent = function(triggerFunc) {
            return this.isTouchable() && triggerFunc.call(TouchInput) && this.isTouchPosInRect();
        };

        PIXI.DisplayObjectContainer.prototype.isRangeX = function(x) {
            return this.x <= x && this.endX >= x;
        };

        PIXI.DisplayObjectContainer.prototype.isRangeY = function(y) {
            return this.y <= y && this.endY >= y;
        };

        PIXI.DisplayObjectContainer.prototype.isOverlapX = function(win) {
            return this.isRangeX(win.x) || this.isRangeX(win.endX) || win.isRangeX(this.x) || win.isRangeX(this.endX);
        };

        PIXI.DisplayObjectContainer.prototype.isOverlapY = function(win) {
            return this.isRangeY(win.y) || this.isRangeY(win.endY) || win.isRangeY(this.y) || win.isRangeY(this.endY);
        };

        Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'endX', {
            get: function() {
                return this.x + this.width;
            },
            set: function(value) {
                this.x = value - this.width;
            },
            configurable: true
        });

        Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'endY', {
            get: function() {
                return this.y + this.height;
            },
            set: function(value) {
                this.y = value - this.height;
            },
            configurable: true
        });

        //=============================================================================
        //  Window_Selectable
        //   通常のタッチ操作を無効化します。
        //=============================================================================
        Window_Selectable.prototype.processTouch = function() {};
    }

    //=============================================================================
    // ウィンドウを透過して重なり合ったときの表示を自然にします。
    //=============================================================================
    if (paramThroughWindow) {
        //=============================================================================
        //  WindowLayer
        //   描画前に配列を逆転させます。
        //=============================================================================
        var _WindowLayer__renderWebGL = WindowLayer.prototype._renderWebGL;
        WindowLayer.prototype._renderWebGL = function(renderSession) {
            this.children.reverse();
            _WindowLayer__renderWebGL.apply(this, arguments);
            this.children.reverse();
        };

        WindowLayer.prototype._webglMaskWindow = function(renderSession, window) {};
        WindowLayer.prototype._canvasClearWindowRect = function(renderSession, window) {};
    }
})();

