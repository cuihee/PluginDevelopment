// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"DevToolsManage","status":true,"description":"デベロッパツール管理プラグイン","parameters":{"開始時に起動":"ON","常に前面表示":"OFF","デベロッパツール表示位置":"0,0,1200,800","最小化切替キー":"F8","リロードキー":"F12","画面の左寄せキー":"F11","FPS表示":"OFF","タイトルカット":"OFF"}},
{"name":"CustomizeConfigDefault","status":true,"description":"Optionsデフォルト値設定プラグイン","parameters":{"alwaysDash":"ON","commandRemember":"ON","bgmVolume":"20","bgsVolume":"20","meVolume":"20","seVolume":"20"}},
{"name":"ParallaxesNonBlur","status":true,"description":"視差ゼロ遠景のぼかし除去プラグイン","parameters":{}},
{"name":"MapRapid","status":true,"description":"マップ高速化プラグイン","parameters":{"testPlayOnly":"ON","showMessageRapid":"ON","windowOpenRapid":"ON","fadeRapid":"ON"}},
{"name":"PictureCallCommon","status":true,"description":"ピクチャのボタン化プラグイン","parameters":{"透明色を考慮":"ON","ピクチャ番号の変数番号":"21","ポインタX座標の変数番号":"41","ポインタY座標の変数番号":"42"}},
{"name":"DTextPicture","status":true,"description":"動的文字列ピクチャ生成プラグイン","parameters":{}},
{"name":"AdjustPictureGraphical","status":true,"description":"ピクチャのグラフィカルな位置調整プラグイン。\nパラメータを変更したら「プロジェクトの保存」（Ctrl+S）","parameters":{"グリッドサイズ":"48","テストマップID":"9"}},
{"name":"PictureVariableSetting","status":true,"description":"ピクチャの変数設定プラグイン","parameters":{"初期値":"ON","ピクチャ表示最大数":"150"}},
{"name":"BattleActorFaceVisibility","status":true,"description":"戦闘中顔グラフィック表示プラグイン","parameters":{"ウィンドウ表示":"ON","ウィンドウX座標":"","ウィンドウY座標":""}},
{"name":"GameStartEval","status":true,"description":"開始時スクリプト実行プラグイン","parameters":{"スクリプト1":"Input.keyMapper[8] = 'escape';","スクリプト2":"document.title = 'Ctrlでクレジット表示';","スクリプト3":"","スクリプト4":""}},
{"name":"ChangeWindowTouchPolicy","status":true,"description":"ウィンドウタッチ仕様変更プラグイン","parameters":{"枠外タッチ動作":"キャンセル"}},
{"name":"DynamicDatabase","status":true,"description":"動的データベース構築プラグイン","parameters":{}},
{"name":"BugFixPictureRotation","status":true,"description":"ピクチャの回転バグ修正プラグイン","parameters":{}},
{"name":"FarewellToArms","status":true,"description":"戦闘放棄プラグイン　～武器よさらば～","parameters":{"farewellCommand":"投降","farewellYes":"諦める","farewellNo":"諦めない","farewellDescription":"抵抗を止めて投降しますか？（敗北あつかいです）","farewellMessage":"%1は戦いを止めて投降した。"}},
{"name":"BugFixParallelEventAndCharacter","status":true,"description":"並列処理イベントのセーブ失敗バグ修正プラグイン","parameters":{}},
{"name":"TkoolMV_PluginCommandBook","status":true,"description":"プラグインコマンド集","parameters":{"制御文字の拡張":"はい"}},
{"name":"CharacterGraphicExtend","status":true,"description":"キャラクターグラフィック表示拡張プラグイン","parameters":{"パラメータ":"デフォルト値"}},
{"name":"YEP_MessageCore","status":true,"description":"v1.10 Adds more features to the Message Window to customized\nthe way your messages appear and functions.","parameters":{"---General---":"","Default Rows":"4","Default Width":"Graphics.boxWidth","Face Indent":"Window_Base._faceWidth + 24","Fast Forward Key":"pagedown","Enable Fast Forward":"true","Word Wrapping":"false","Description Wrap":"false","Word Wrap Space":"false","---Font---":"","Font Name":"GameFont","Font Size":"28","Font Size Change":"12","Font Changed Max":"96","Font Changed Min":"12","---Name Box---":"","Name Box Buffer X":"-28","Name Box Buffer Y":"0","Name Box Padding":"6","Name Box Color":"0","Name Box Clear":"false","Name Box Added Text":"\\c[6]"}},
{"name":"MessageWindowPopup","status":true,"description":"フキダシウィンドウプラグイン","parameters":{"フォントサイズ":"22","余白":"10","自動設定":"ON","フェイス倍率":"75","ウィンドウ連携":"ON","行間":"0"}},
{"name":"RestoreSaveData","status":true,"description":"セーブファイル復元プラグイン","parameters":{}},
{"name":"chunkof_QueryParam","status":true,"description":"","parameters":{}},
{"name":"Common","status":true,"description":"汎用処理","parameters":{}},
{"name":"SceneSoundTest","status":true,"description":"サウンドテストプラグイン","parameters":{"コマンド名称":"サウンドテスト","タイトルに追加":"ON","メニューに追加":"ON","音量名称":"音量","ピッチ名称":"ピッチ","位相名称":"位相","背景ピクチャ":"","読込形式":"CSV"}},
{"name":"BatchProcessManager","status":true,"description":"バッチ処理プラグイン","parameters":{}},
{"name":"AnotherNewGame","status":true,"description":"アナザーニューゲーム追加プラグイン","parameters":{"name":"？？？","map_id":"13","map_x":"9","map_y":"7","hidden":"OFF","disable":"OFF"}},
{"name":"BugFixImageOnLoad","status":true,"description":"画像ロード遅延時のエラー修正プラグイン","parameters":{}},
{"name":"GameStartEval","status":true,"description":"開始時スクリプト実行プラグイン","parameters":{"スクリプト1":"Input.keyMapper[8] = 'escape';","スクリプト2":"","スクリプト3":"","スクリプト4":""}},
{"name":"Chronus","status":true,"description":"ゲーム内時間の導入プラグイン","parameters":{"月ごとの日数配列":"31,28,31,30,31,30,31,31,30,31,30,31","曜日配列":"(日),(月),(火),(水),(木),(金),(土)","自然時間加算":"5","場所移動時間加算":"30","戦闘時間加算(固定)":"30","戦闘時間加算(ターン)":"5","年のゲーム変数":"8","月のゲーム変数":"9","日のゲーム変数":"10","曜日IDのゲーム変数":"13","曜日名のゲーム変数":"14","時のゲーム変数":"11","分のゲーム変数":"12","時間帯IDのゲーム変数":"16","天候IDのゲーム変数":"17","日時フォーマット1":"YYYY年 MM月 DD日 DY","日時フォーマット2":"AMHH時 MI分","カレンダー表示X座標":"8","カレンダー表示Y座標":"8","文字盤画像ファイル":"clock_0","長針画像ファイル":"clock_02","短針画像ファイル":"clock_03","時計X座標":"84","時計Y座標":"156"}},
{"name":"SetupOptionCustomize","status":true,"description":"起動オプション調整プラグイン","parameters":{"描画モード":"0","テストプレー":"ON","FPS表示":"ON","オーディオ無効":"OFF","任意オプション":"","ユーザオプション無効":"OFF"}},
{"name":"AudioPlayForIE","status":true,"description":"IEのBGM有効化プラグイン","parameters":{}},
{"name":"SetupOptionInvalid","status":true,"description":"起動オプション無効化プラグイン","parameters":{"例外":"noaudio,test,showfps"}},
{"name":"SensorInput","status":true,"description":"センサー情報取得プラグイン","parameters":{"Y軸傾き変数":"48","X軸傾き変数":"49","Z軸傾き変数":"47","傾き絶対値取得":"OFF","X軸加速度変数":"51","Y軸加速度変数":"52","Z軸加速度変数":"50"}},
{"name":"FootstepSound","status":true,"description":"足音プラグイン","parameters":{"イベント時無効":"OFF"}},
{"name":"RelativeTouchPad","status":true,"description":"もどきぷにコンプラグイン","parameters":{"タッチ有効領域":"0,0,816,624","パッド画像ファイル":"","アロー画像ファイル":"","パッド画像不透明度":"255"}},
{"name":"CompareParamRefine","status":true,"description":"装備購入時の性能比較改善プラグイン","parameters":{"最大HP除く":"OFF","最大MP除く":"ON"}},
{"name":"YEP_BattleEngineCore","status":false,"description":"v1.32b Have more control over the flow of the battle system\nwith this plugin and alter various aspects to your liking.","parameters":{"---General---":"","Action Speed":"agi","Default System":"dtb","---Escape---":"","Escape Ratio":"0.5 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.1","---Animation---":"","Animation Base Delay":"0","Animation Next Delay":"0","Certain Hit Animation":"120","Physical Animation":"52","Magical Animation":"51","Enemy Attack Animation":"39","Reflect Animation":"42","Motion Waiting":"false","---Frontview---":"","Front Position X":"Graphics.boxWidth / 8 + Graphics.boxWidth / 4 * index","Front Position Y":"Graphics.boxHeight - 180","Front Actor Sprite":"false","Front Sprite Priority":"1","---Sideview---":"","Home Position X":"screenWidth - 16 - (maxSize + 2) * 32 + index * 32","Home Position Y":"screenHeight - statusHeight - maxSize * 48 + (index+1) * 48 - 32","Side Sprite Priority":"1","---Sprites---":"","Default X Anchor":"0.5","Default Y Anchor":"1.0","Step Distance":"48","Flinch Distance":"12","Show Shadows":"true","---Damage Popups---":"","Popup Duration":"128","Newest Popup Bottom":"true","Popup Overlap Rate":"0.9","Critical Popup":"255, 0, 0, 160","Critical Duration":"60","---Tick-Settings---":"","Timed States":"false","Timed Buffs":"false","Turn Time":"100","AI Self Turns":"true","---Window Settings---":"","Lower Windows":"true","Window Rows":"4","Command Window Rows":"4","Command Alignment":"center","Start Actor Command":"true","Current Max":"false","---Selection Help---":"","Mouse Over":"true","Select Help Window":"true","User Help Text":"User","Ally Help Text":"Ally","Allies Help Text":"Allies","Enemy Help Text":"Enemy","Enemies Help Text":"Enemies","All Help Text":"All %1","Random Help Text":"%2 Random %1","---Enemy Select---":"","Visual Enemy Select":"true","Show Enemy Name":"true","Show Select Box":"false","Enemy Font Size":"20","Enemy Auto Select":"this.furthestRight()","---Actor Select---":"","Visual Actor Select":"true","---Battle Log---":"","Show Emerge Text":"false","Show Pre-Emptive Text":"true","Show Surprise Text":"true","Optimize Speed":"true","Show Action Text":"false","Show State Text":"false","Show Buff Text":"false","Show Counter Text":"true","Show Reflect Text":"true","Show Substitute Text":"true","Show Fail Text":"false","Show Critical Text":"false","Show Miss Text":"false","Show Evasion Text":"false","Show HP Text":"false","Show MP Text":"false","Show TP Text":"false"}},
{"name":"YEP_X_BattleSysATB","status":false,"description":"v1.21 (Requires YEP_BattleEngineCore.js) Add ATB (Active\nTurn Battle) into your game using this plugin!","parameters":{"---ATB Settings---":"","Per Tick":"user.agi","Initial Speed":"0","Full Gauge":"Math.max(5000, BattleManager.highestBaseAgi() * 100)","Charge Gauge":"Math.max(2000, BattleManager.highestBaseAgi() * 20)","Pre-Emptive Bonuses":"0.8","Surprise Bonuses":"0.8","---Escape---":"","Escape Ratio":"0.125 * $gameParty.agility() / $gameTroop.agility()","Fail Escape Boost":"0.025","---Turn---":"","Full Turn":"Math.min(200, BattleManager.lowestBaseAgi() * 8)","Flash Enemy":"true","---Rubberband---":"","Enable Rubberband":"true","Minimum Speed":"0.5 * BattleManager.highestBaseAgi()","Maximum Speed":"1.5 * BattleManager.highestBaseAgi()","---Sound---":"","Ready Sound":"Decision1","Ready Volume":"90","Ready Pitch":"120","Ready Pan":"0","---Options---":"","ATB Speed Text":"ATB Speed","Default ATB Speed":"10","---Windows---":"","Lock Status Window":"true","Gauge Style":"1","Gauge Text":"Turn","Gauge Text Align":"center","ATB Gauge Color 1":"13","ATB Gauge Color 2":"5","Slow Gauge Color 1":"12","Slow Gauge Color 2":"4","Fast Gauge Color 1":"26","Fast Gauge Color 2":"27","Stop Gauge Color 1":"7","Stop Gauge Color 2":"8","Full Gauge Color 1":"14","Full Gauge Color 2":"6","Charge Gauge Color 1":"2","Charge Gauge Color 2":"10"}},
{"name":"AutomaticState","status":false,"description":"ステート自動付与プラグイン","parameters":{}},
{"name":"StateChangeIfRemove","status":false,"description":"ステート解除時の変化プラグイン","parameters":{}},
{"name":"AdditionalPartyCommand","status":true,"description":"パーティコマンド追加プラグイン","parameters":{"コマンド名称":"オプション","コールバック処理":"SceneManager.push(Scene_SoundTest);"}}
];
