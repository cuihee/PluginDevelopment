// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"SetupOptionCustomize","status":false,"description":"起動オプション調整プラグイン","parameters":{"描画モード":"0","テストプレー":"ON","FPS表示":"ON","オーディオ無効":"OFF","任意オプション":"","ユーザオプション無効":"OFF"}},
{"name":"DevToolsManage","status":false,"description":"デベロッパツール管理プラグイン","parameters":{"開始時に起動":"ON","常に前面表示":"OFF","デベロッパツール表示位置":"0,0,1200,800","最小化切替キー":"F8","リロードキー":"F12","画面の左寄せキー":"F11","高速化切替キー":"F10","強制戦闘勝利キー":"F7","FPS表示":"OFF","タイトルカット":"OFF","高速開始":"OFF","高速スピード":"8"}},
{"name":"MakeScreenCapture","status":false,"description":"画面キャプチャ管理プラグイン","parameters":{"PNGキャプチャキー":"F6","JPEGキャプチャキー":"F7","ファイル名":"image","保存形式":"jpeg","連番桁数":"2","タイムスタンプ":"ON","署名":"","実行間隔":"0","効果音":"Computer"}},
{"name":"CustomizeConfigDefault","status":false,"description":"Optionsデフォルト値設定プラグイン","parameters":{"alwaysDash":"ON","commandRemember":"ON","bgmVolume":"20","bgsVolume":"20","meVolume":"20","seVolume":"20"}},
{"name":"MapRapid","status":false,"description":"マップ高速化プラグイン","parameters":{"testPlayOnly":"ON","showMessageRapid":"ON","windowOpenRapid":"ON","fadeRapid":"ON"}},
{"name":"PictureCallCommon","status":false,"description":"ピクチャのボタン化プラグイン","parameters":{"透明色を考慮":"ON","ピクチャ番号の変数番号":"21","ポインタX座標の変数番号":"41","ポインタY座標の変数番号":"42","タッチ操作抑制":"ON"}},
{"name":"DTextPicture","status":false,"description":"動的文字列ピクチャ生成プラグイン","parameters":{}},
{"name":"AdjustPictureGraphical","status":false,"description":"ピクチャのグラフィカルな位置調整プラグイン。\nパラメータを変更したら「プロジェクトの保存」（Ctrl+S）","parameters":{"グリッドサイズ":"","テストマップID":""}},
{"name":"PictureVariableSetting","status":false,"description":"ピクチャ関連のイベント機能拡張プラグイン","parameters":{"初期値":"ON","ピクチャ表示最大数":"5"}},
{"name":"ChangeWindowTouchPolicy","status":false,"description":"ウィンドウタッチ仕様変更プラグイン","parameters":{"枠外タッチ動作":"なし"}},
{"name":"DynamicDatabase","status":false,"description":"動的データベース構築プラグイン","parameters":{}},
{"name":"FarewellToArms","status":false,"description":"戦闘放棄プラグイン　～武器よさらば～","parameters":{"farewellCommand":"投降","farewellYes":"諦める","farewellNo":"諦めない","farewellDescription":"抵抗を止めて投降しますか？（敗北あつかいです）","farewellMessage":"%1は戦いを止めて投降した。"}},
{"name":"TkoolMV_PluginCommandBook","status":false,"description":"プラグインコマンド集","parameters":{"制御文字の拡張":"はい","スクリプトに制御文字適用":"いいえ"}},
{"name":"YEP_MessageCore","status":false,"description":"v1.10 Adds more features to the Message Window to customized\nthe way your messages appear and functions.","parameters":{"---General---":"","Default Rows":"4","Default Width":"Graphics.boxWidth","Face Indent":"Window_Base._faceWidth + 24","Fast Forward Key":"pagedown","Enable Fast Forward":"true","Word Wrapping":"false","Description Wrap":"false","Word Wrap Space":"false","---Font---":"","Font Name":"GameFont","Font Size":"28","Font Size Change":"12","Font Changed Max":"96","Font Changed Min":"12","---Name Box---":"","Name Box Buffer X":"-28","Name Box Buffer Y":"0","Name Box Padding":"1","Name Box Color":"0","Name Box Clear":"false","Name Box Added Text":"\\c[6]"}},
{"name":"chunkof_QueryParam","status":false,"description":"","parameters":{}},
{"name":"Common","status":false,"description":"汎用処理","parameters":{}},
{"name":"SceneSoundTest","status":false,"description":"サウンドテストプラグイン","parameters":{"コマンド名称":"サウンドテスト","タイトルに追加":"ON","メニューに追加":"ON","音量名称":"音量","ピッチ名称":"ピッチ","位相名称":"位相","背景ピクチャ":"","読込形式":"CSV"}},
{"name":"BatchProcessManager","status":false,"description":"バッチ処理プラグイン","parameters":{}},
{"name":"AnotherNewGame","status":false,"description":"アナザーニューゲーム追加プラグイン","parameters":{"name":"？？？","map_id":"13","map_x":"9","map_y":"7","hidden":"OFF","disable":"OFF"}},
{"name":"Chronus","status":false,"description":"ゲーム内時間の導入プラグイン","parameters":{"月ごとの日数配列":"31,28,31,30,31,30,31,31,30,31,30,31","曜日配列":"(日),(月),(火),(水),(木),(金),(土)","自然時間加算":"5","場所移動時間加算":"30","戦闘時間加算(固定)":"30","戦闘時間加算(ターン)":"5","年のゲーム変数":"8","月のゲーム変数":"9","日のゲーム変数":"10","曜日IDのゲーム変数":"13","曜日名のゲーム変数":"14","時のゲーム変数":"11","分のゲーム変数":"","時間帯IDのゲーム変数":"16","天候IDのゲーム変数":"17","日時フォーマット1":"YYYY年 MM月 DD日 DY","日時フォーマット2":"AMHH時 MI分","カレンダー表示X座標":"8","カレンダー表示Y座標":"8","文字盤画像ファイル":"clock_dial","長針画像ファイル":"clock_minute_hand","短針画像ファイル":"clock_hour_hand","時計X座標":"84","時計Y座標":"156"}},
{"name":"AudioPlayForIE","status":false,"description":"IEのBGM有効化プラグイン","parameters":{}},
{"name":"SensorInput","status":false,"description":"センサー情報取得プラグイン","parameters":{"Y軸傾き変数":"48","X軸傾き変数":"49","Z軸傾き変数":"47","傾き絶対値取得":"OFF","X軸加速度変数":"51","Y軸加速度変数":"52","Z軸加速度変数":"50"}},
{"name":"RelativeTouchPad","status":false,"description":"もどきぷにコンプラグイン","parameters":{"タッチ有効領域":"0,0,816,624","パッド画像ファイル":"","アロー画像ファイル":"","パッド画像不透明度":"255"}},
{"name":"CommonInterceptor","status":false,"description":"割り込みコモンイベントプラグイン","parameters":{"ニューゲームコモン":"5","ロードコモン":"6","メニューコモン":"7"}},
{"name":"CharacterGraphicExtend","status":false,"description":"キャラクターグラフィック表示拡張プラグイン","parameters":{"イベント消去無効":"ON"}},
{"name":"StartUpFullScreen","status":false,"description":"フルスクリーンで起動プラグイン","parameters":{"シャットダウン":"シャットダウン","フルスクリーンで起動":"フルスクリーンで起動"}},
{"name":"FloatingCharacter","status":false,"description":"キャラクターの浮遊プラグイン","parameters":{"通行可能地形タグ":"1,2,3","通行可能リージョン":"1,2,"}},
{"name":"GraphicalDesignMode","status":false,"description":"GUI画面デザインプラグイン　\r\nパラメータを変更したら「プロジェクトの保存」（Ctrl+S）","parameters":{"デザインモード":"ON","自動保存":"OFF","モバイル版作成":"ON","モバイル偽装":"OFF","ウィンドウ透過":"ON","グリッドサイズ":"48","パディング":"","フォントサイズ":"","行の高さ":"","背景透明度":""}},
{"name":"TouchUI","status":false,"description":"UIをタッチ操作に適したものへ変更します。","parameters":{"Menu Command Text":"メニュー","Previous Command Text":"前","Next Command Text":"次"}},
{"name":"PictureAnimation","status":false,"description":"ピクチャのアニメーションプラグイン","parameters":{}},
{"name":"AutomaticState","status":false,"description":"ステート自動付与プラグイン","parameters":{}},
{"name":"MessageWindowPopup","status":false,"description":"フキダシウィンドウプラグイン","parameters":{"フォントサイズ":"22","余白":"10","自動設定":"ON","フェイス倍率":"75","ウィンドウ連携":"ON","行間":"0","ウィンドウ透過":"ON"}},
{"name":"BugFixLoadErrorChoiceSetup","status":false,"description":"選択肢表示中のロードエラー修正プラグイン","parameters":{}},
{"name":"CustomizeMaxSaveFile","status":false,"description":"最大セーブファイル数変更プラグイン","parameters":{"セーブファイル数":"4"}},
{"name":"BattleSpecialCommand","status":false,"description":"特殊戦闘コマンド追加プラグイン","parameters":{"追加位置":"防御","コマンド表示行数":"8","コマンド表示行数可変":"OFF","ウィンドウ透過":"ON"}},
{"name":"YEP_ItemCore","status":true,"description":"v1.18 Changes the way Items are handled for your game\nand the Item Scene, too.","parameters":{"---General---":"","Max Items":"0","Max Weapons":"100","Max Armors":"100","Starting ID":"3000","Random Variance":"5","Negative Variance":"false","Name Format":"%1%2%3%4","Name Spacing":"true","Boost Format":"(+%1)","---Item Scene---":"","Updated Scene Item":"true","List Equipped Items":"true","Show Icon":"true","Icon Size":"128","Font Size":"20","Command Alignment":"center","Recovery Format":"%1 Heal","Add State":"+State","Add Buff":"+Buff","Remove State":"-State","Remove Buff":"-Buff","Maximum Icons":"4","Use Command":"Use %1","Carry Format":"%1/%2","--Independent Items--":"","Midgame Note Parsing":"false"}}
];
