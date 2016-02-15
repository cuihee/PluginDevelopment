// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"DevToolsManage","status":true,"description":"デベロッパツール管理プラグイン","parameters":{"開始時に起動":"ON","常に前面表示":"ON","デベロッパツール表示位置":"0,0,1200,800","最小化切替キー":"F8","リロードキー":"F12","画面の左寄せキー":"F11","FPS表示":"OFF","タイトルカット":"OFF"}},
{"name":"CustomizeConfigDefault","status":true,"description":"Optionsデフォルト値設定プラグイン","parameters":{"alwaysDash":"ON","commandRemember":"ON","bgmVolume":"20","bgsVolume":"20","meVolume":"20","seVolume":"20"}},
{"name":"ParallaxesNonBlur","status":false,"description":"視差ゼロ遠景のぼかし除去プラグイン","parameters":{}},
{"name":"MapRapid","status":true,"description":"マップ高速化プラグイン","parameters":{"testPlayOnly":"ON","showMessageRapid":"ON","windowOpenRapid":"ON","fadeRapid":"ON"}},
{"name":"PictureCallCommon","status":true,"description":"ピクチャのボタン化プラグイン","parameters":{"透明色を考慮":"ON","ピクチャ番号の変数番号":"21","ポインタX座標の変数番号":"41","ポインタY座標の変数番号":"42"}},
{"name":"DTextPicture","status":true,"description":"動的文字列ピクチャ生成プラグイン","parameters":{}},
{"name":"AdjustPictureGraphical","status":true,"description":"ピクチャのグラフィカルな位置調整プラグイン。\nパラメータを変更したら「プロジェクトの保存」（Ctrl+S）","parameters":{"グリッドサイズ":"48","テストマップID":"9"}},
{"name":"PictureAnimation","status":true,"description":"ピクチャのアニメーションプラグイン","parameters":{}},
{"name":"PictureVariableSetting","status":true,"description":"ピクチャの変数設定プラグイン","parameters":{"初期値":"ON","ピクチャ表示最大数":"150"}},
{"name":"BattleActorFaceVisibility","status":true,"description":"戦闘中顔グラフィック表示プラグイン","parameters":{"ウィンドウ表示":"ON","ウィンドウX座標":"","ウィンドウY座標":""}},
{"name":"GameStartEval","status":true,"description":"開始時スクリプト実行プラグイン","parameters":{"スクリプト1":"Input.keyMapper[8] = 'escape';","スクリプト2":"document.title = 'Ctrlでクレジット表示';","スクリプト3":"","スクリプト4":""}},
{"name":"ChangeWindowTouchPolicy","status":true,"description":"ウィンドウタッチ仕様変更プラグイン","parameters":{"枠外タッチ動作":"キャンセル"}},
{"name":"DynamicDatabase","status":true,"description":"動的データベース構築プラグイン","parameters":{}},
{"name":"BugFixPictureRotation","status":true,"description":"ピクチャの回転バグ修正プラグイン","parameters":{}},
{"name":"MessageWindowHidden","status":true,"description":"メッセージウィンドウ一時消去プラグイン","parameters":{"ボタン名称":"shift"}},
{"name":"CacheManager","status":true,"description":"Selectively clear the image cache for memory usage improvements","parameters":{"Mobile only":"N","--------------------------------------------":"","Clear All":"Y","Clear Animations":"Y","Clear Battlebacks":"Y","Clear Battlers":"Y","Clear Characters":"Y","Clear Faces":"Y","Clear Parallaxes":"Y","Clear Pictures":"Y","Clear System":"N","Clear Tilesets":"Y","Clear Titles":"Y","Custom Images":""}},
{"name":"FarewellToArms","status":true,"description":"戦闘放棄プラグイン　～武器よさらば～","parameters":{"farewellCommand":"投降","farewellYes":"諦める","farewellNo":"諦めない","farewellDescription":"抵抗を止めて投降しますか？（敗北あつかいです）","farewellMessage":"%1は戦いを止めて投降した。"}},
{"name":"BugFixParallelEventAndCharacter","status":true,"description":"並列処理イベントのセーブ失敗バグ修正プラグイン","parameters":{}},
{"name":"PlayerShiftTurn","status":true,"description":"プレイヤーのその場方向転換","parameters":{"ボタン名称":"tab"}},
{"name":"FlexibleBattleBgm","status":true,"description":"敵グループごとの戦闘BGM設定プラグイン","parameters":{}},
{"name":"TkoolMV_PluginCommandBook","status":false,"description":"プラグインコマンド集","parameters":{"制御文字の拡張":"はい"}},
{"name":"CharacterGraphicExtend","status":false,"description":"キャラクターグラフィック表示拡張プラグイン","parameters":{"パラメータ":"デフォルト値"}},
{"name":"RegionTerrain","status":false,"description":"リージョンにタイル属性を付与するプラグイン","parameters":{"梯子リージョンID":"1","茂みリージョンID":"2","カウンターリージョンID":"3","ダメージ床リージョンID":"4"}},
{"name":"MessageSkip","status":false,"description":"メッセージスキッププラグイン","parameters":{"スキップキー":"S","オートキー":"A","スキップアイコン":"140","オートアイコン":"75","オート待機フレーム":"240","イベント終了で解除":"OFF"}},
{"name":"DWindow","status":false,"description":"動的ウィンドウ生成プラグイン","parameters":{"X座標の変数番号":"1","Y座標の変数番号":"2","横幅の変数番号":"3","高さの変数番号":"4","最前面に表示":"ON"}},
{"name":"CommonInterceptor","status":false,"description":"割り込みコモンイベントプラグイン","parameters":{"ニューゲームコモン":"5","ロードコモン":"6","メニューコモン":"7"}},
{"name":"YEP_MessageCore","status":true,"description":"メッセージの表示方法や機能をカスタマイズすることができます。","parameters":{"---一般---":"","Default Rows":"4","Default Width":"Graphics.boxWidth","Face Indent":"Window_Base._faceWidth + 24","Fast Forward":"Input.isPressed('pagedown')","Word Wrapping":"false","Description Wrap":"false","---フォント---":"","Font Name":"GameFont","Font Size":"28","Font Size Change":"12","Font Changed Max":"96","Font Changed Min":"12","---Name Box---":"","Name Box Buffer X":"-28","Name Box Buffer Y":"0","Name Box Padding":"this.standardPadding() * 4","Name Box Color":"0","Name Box Clear":"false","Name Box Added Text":"\\c[6]"}},
{"name":"MessageSelectPicture","status":true,"description":"選択肢のピクチャ表示プラグイン","parameters":{"パラメータ":"デフォルト値"}},
{"name":"RestoreSaveData","status":true,"description":"セーブファイル復元プラグイン","parameters":{}},
{"name":"chunkof_QueryParam","status":true,"description":"","parameters":{}},
{"name":"Common","status":true,"description":"汎用処理","parameters":{}},
{"name":"MessageWindowPopup","status":false,"description":"フキダシウィンドウプラグイン","parameters":{"フォントサイズ":"22","余白":"10","自動設定":"ON","フェイス倍率":"75","ウィンドウ連携":"ON","行間":"0"}},
{"name":"SceneSoundTest","status":true,"description":"サウンドテストプラグイン","parameters":{"コマンド名称":"サウンドテスト","タイトルに追加":"ON","メニューに追加":"ON","音量名称":"音量","ピッチ名称":"ピッチ","位相名称":"位相","背景ピクチャ":"","読込形式":"CSV"}},
{"name":"BatchProcessManager","status":true,"description":"バッチ処理プラグイン","parameters":{}},
{"name":"CustomizeConfigItem","status":true,"description":"オプション任意項目作成プラグイン","parameters":{"スイッチ項目1":"スイッチ項目1:OFF:0:OFF","数値項目1":"数値項目1:0:0:OFF:0:10:1","音量項目1":"音量項目1:0:0:OFF","文字項目1":"文字項目1:0:0:OFF:EASY, NORMAL, HARD, VERY HARD","スイッチ項目2":"スイッチ項目2:OFF:0:OFF","数値項目2":"数値項目2:0:0:OFF:0:10:1","音量項目2":"音量項目2:0:0:OFF","文字項目2":"文字項目2:0:0:OFF:EASY, NORMAL, HARD, VERY HARD\r"}},
{"name":"AnotherNewGame","status":true,"description":"アナザーニューゲーム追加プラグイン","parameters":{"name":"？？？","map_id":"13","map_x":"9","map_y":"7","hidden":"OFF","disable":"OFF"}},
{"name":"StateChangeIfRemove","status":true,"description":"ステート変化プラグイン","parameters":{}},
{"name":"BugFixImageOnLoad","status":true,"description":"画像ロード遅延時のエラー修正プラグイン","parameters":{}},
{"name":"AutomaticState","status":true,"description":"ステート自動付与プラグイン","parameters":{"パラメータ":"デフォルト値"}},
{"name":"GameStartEval","status":true,"description":"開始時スクリプト実行プラグイン","parameters":{"スクリプト1":"Input.keyMapper[8] = 'escape';","スクリプト2":"","スクリプト3":"","スクリプト4":""}},
{"name":"BugFixWebPlayTest","status":true,"description":"Web実行におけるテストオプション防止プラグイン","parameters":{}},
{"name":"Chronus","status":true,"description":"ゲーム内時間の導入プラグイン","parameters":{"月ごとの日数配列":"31,28,31,30,31,30,31,31,30,31,30,31","曜日配列":"(日),(月),(火),(水),(木),(金),(土)","自然時間加算":"5","場所移動時間加算":"30","戦闘時間加算(固定)":"30","戦闘時間加算(ターン)":"5","年のゲーム変数":"8","月のゲーム変数":"9","日のゲーム変数":"10","曜日IDのゲーム変数":"13","曜日名のゲーム変数":"14","時のゲーム変数":"11","分のゲーム変数":"12","時間帯IDのゲーム変数":"16","天候IDのゲーム変数":"17","日時フォーマット1":"YYYY年 MM月 DD日 DY","日時フォーマット2":"AMHH時 MI分","カレンダー表示X座標":"8","カレンダー表示Y座標":"8","文字盤画像ファイル":"clock_0","長針画像ファイル":"clock_02","短針画像ファイル":"clock_03","時計X座標":"84","時計Y座標":"156"}},
{"name":"SetupOptionCustomize","status":true,"description":"起動オプション調整プラグイン","parameters":{"描画モード":"0","テストプレー":"ON","FPS表示":"ON","オーディオ無効":"ON","任意オプション":"","ユーザオプション無効":"OFF"}},
{"name":"LoadLight","status":false,"description":"マップ処理負荷軽減プラグイン","parameters":{"色調変更無効化":"ON","ピクチャ最大表示数":"5"}}
];
