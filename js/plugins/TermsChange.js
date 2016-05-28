//=============================================================================
// TermsChange.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2016/05/18 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 用語変更プラグイン
 * @author トリアコンタン
 *
 * @help データベースの用語で定義した値を
 * ゲーム中に動的に変更します。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function () {
    'use strict';
    var pluginName = 'TermsChange';
    var metaTagPrefix = 'TC';

    var getCommandName = function (command) {
        return (command || '').toUpperCase();
    };

    var getArgString = function (arg, upperFlg) {
        arg = convertEscapeCharactersAndEval(arg, false);
        return upperFlg ? arg.toUpperCase() : arg;
    };

    var convertEscapeCharactersAndEval = function(text, evalFlg) {
        if (text === null || text === undefined) {
            text = evalFlg ? '0' : '';
        }
        var window = SceneManager._scene._windowLayer.children[0];
        if (window) {
            var result = window.convertEscapeCharacters(text);
            return evalFlg ? eval(result) : result;
        } else {
            return text;
        }
    };

    //=============================================================================
    // ローカル変数
    //=============================================================================
    var localTermsMapper = {
        level:'レベル',
        levelA:'レベル（略）',
        hp:'HP',
        hpA:'HP（略）',
        mp:'MP',
        mpA:'MP（略）',
        tp:'TP',
        tpA:'TP（略）',
        exp:'経験値',
        expA:'経験値（略）',
        fight:'戦う',
        escape:'逃げる',
        attack:'攻撃',
        guard:'防御',
        item:'アイテム',
        skill:'スキル',
        equip:'装備',
        status:'ステータス',
        formation:'並び替え',
        save:'セーブ',
        gameEnd:'ゲーム終了',
        options:'オプション',
        weapon:'武器',
        armor:'防具',
        keyItem:'大事なもの',
        equip2:'装備2',
        optimize:'最強装備',
        clear:'全て外す',
        newGame:'ニューゲーム',
        continue_:'コンティニュー',
        toTitle:'タイトルへ',
        cancel:'やめる',
        buy:'購入する',
        sell:'売却する',
        alwaysDash:'常時ダッシュ',
        commandRemember:'コマンド記憶',
        bgmVolume:'BGM 音量',
        bgsVolume:'BGS 音量',
        meVolume:'ME 音量',
        seVolume:'SE 音量',
        possession:'持っている数',
        expTotal:'現在の経験値',
        expNext:'次のレベルまで',
        saveMessage:'セーブメッセージ',
        loadMessage:'ロードメッセージ',
        file:'ファイル',
        partyName:'パーティ名',
        emerge:'出現',
        preemptive:'先制攻撃',
        surprise:'不意打ち',
        escapeStart:'逃走開始',
        escapeFailure:'逃走失敗',
        victory:'勝利',
        defeat:'敗北',
        obtainExp:'経験値獲得',
        obtainGold:'お金獲得',
        obtainItem:'アイテム獲得',
        levelUp:'レベルアップ',
        obtainSkill:'スキル習得',
        useItem:'アイテム使用',
        criticalToEnemy:'敵に会心',
        criticalToActor:'味方に会心',
        actorDamage:'味方ダメージ',
        actorRecovery:'味方回復',
        actorGain:'味方ポイント増加',
        actorLoss:'味方ポイント減少',
        actorDrain:'味方ポイント吸収',
        actorNoDamage:'味方ノーダメージ',
        actorNoHit:'味方に命中せず',
        enemyDamage:'敵ダメージ',
        enemyRecovery:'敵回復',
        enemyGain:'敵ポイント増加',
        enemyLoss:'敵ポイント減少',
        enemyDrain:'敵ポイント吸収',
        enemyNoDamage:'敵ノーダメージ',
        enemyNoHit:'敵に命中せず',
        evasion:'回避',
        magicEvasion:'魔法回避',
        magicReflection:'魔法反射',
        counterAttack:'反撃',
        substitute:'身代わり',
        buffAdd:'強化',
        debuffAdd:'弱化',
        buffRemove:'強化・弱化の解除',
        actionFailure:'行動失敗'
    };

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        try {
            this.pluginCommandTermsChange(command, args);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window = require('nw.gui').Window.get();
                if (!window.isDevToolsOpen()) {
                    var devTool = window.showDevTools();
                    devTool.moveTo(0, 0);
                    devTool.resizeTo(Graphics.width, Graphics.height);
                    window.focus();
                }
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.stack || e.toString());
        }
    };

    Game_Interpreter.prototype.pluginCommandTermsChange = function (command, args) {
        switch (getCommandName(command)) {
            case metaTagPrefix + '用語変更' :
                $gameSystem.changeTerm(getArgString(args[0]), getArgString(args[1]));
                break;
        }
    };

    //=============================================================================
    // Game_System
    //  用語を登録します。
    //=============================================================================
    Game_System.prototype.changeTerm = function(termParam, newValue) {
        var termKey = Object.keys(localTermsMapper).filter(function (key) {
            return localTermsMapper[key] === termParam;
        })[0];
        if (termKey) {
            if (!this._terms) this._terms = [];
            this._terms[termKey] = newValue;
            this.updateTerms();
        }
    };

    Game_System.prototype.updateTerms = function() {
        Object.keys(this._terms).forEach(function (key) {
            Object.defineProperties(TextManager, key, {
                value : this._terms[key]
            });
        }, this);
    };

})();

