# X投稿戦略：コハクの症例シミュレーション

## X投稿する問題の選定ルール

### 基本方針
毎Vol（3題）から **1題だけ** Xに投稿する。
残り2題はnoteでしか読めない → noteへの誘導力になる。

### 選定基準（優先順位）

| 順位 | 基準 | 理由 |
|---|---|---|
| 1 | **Q3（処方箋形式）を優先** | 視覚的インパクトが最大。処方箋画像はスクロールを止める力がある |
| 2 | 例外：Q1/Q2が「万人に刺さるテーマ」の場合はそちらを選ぶ | 妊婦×鎮痛薬、小児×解熱剤 等は非薬剤師にも反応される |
| 3 | 「AI作成」バッジ付きの問題を月2回以上含める | 「AI vs 薬剤師」の切り口でバズを狙う |

### 投稿判断フロー

```
Q3は処方箋画像として目を引くか？
  ├─ YES → Q3をX投稿
  └─ NO → Q1/Q2で「広く刺さるテーマ」があるか？
              ├─ YES → そのQをX投稿
              └─ NO → Q3をX投稿（デフォルト）
```

### 今週のVol.001の場合

| Q | テーマ | 作成者 | X向き？ |
|---|---|---|---|
| Q1 | 妊婦×市販鎮痛薬 | AI | ◎ 万人に刺さる |
| Q2 | メトホルミン×造影CT | 薬剤師 | △ 専門的すぎる |
| Q3 | NSAIDs×ワルファリン処方 | 薬剤師 | ○ 処方箋画像で目を引く |

**→ 選定結果：Q1をX投稿**
理由：妊娠×薬は薬剤師以外にも関心が高い。リーチが最大化する。
Q3はnote記事のメイン訴求として「処方箋問題はnoteで👇」と誘導。

---

## X投稿テンプレート（コハクの口調）

### パターン1：問いかけ型（メイン使用）

```
🏥 今日の1症例 {{NUM}}

{{PATIENT_SHORT}}

{{QUOTE}}

あなたならどう対応しますか？

A. {{A}}
B. {{B}}
C. {{C}}

答えはリプ欄で。

#薬剤師 #新人薬剤師 #薬局シミュレーション
```

### パターン2：コハクナレーション型

```
💊 コハクの薬局シミュレーション {{NUM}}

この場面、少し考えてみてください。

{{SITUATION_SHORT}}

A. {{A}}
B. {{B}}
C. {{C}}

正解と解説はリプ欄で👇
（全3問の解説はnoteで →{{NOTE_LINK}}）

#薬剤師 #新人薬剤師
```

### パターン3：処方箋特化型（Q3用）

```
📋 この処方箋、何か気になりませんか？

{{RX_SUMMARY}}

最も優先すべき対応は？

A. {{A}}
B. {{B}}
C. {{C}}

→ 答えと詳しい解説はnoteで
{{NOTE_LINK}}

#薬剤師 #処方箋チェック #疑義照会
```

### パターン4：AI vs 薬剤師（月2回の特別投稿）

```
🤖 AIが作った症例クイズ、あなたは正解できる？

{{SITUATION_SHORT}}

A. {{A}}
B. {{B}}
C. {{C}}

この問題はAIが作成しました。
薬剤師作成の問題と比べてどうでしたか？

答えはリプ欄👇

#薬剤師 #AI #薬局シミュレーション
```

---

## リプ欄テンプレート（解答用）

### 画像付きリプ

```
✅ 正解は {{ANSWER}}

{{EXPLANATION_SHORT}}（50字以内）

> 💊 コハク：{{PROTIP_SHORT}}（30字以内）

📚 {{SOURCE}}

全3問の詳しい解説はnoteで👇
{{NOTE_LINK}}
```

※ リプには解説カード画像（vol*-q*a.png）を添付

---

## 週間投稿スケジュール

| 曜日 | 時間 | 内容 |
|---|---|---|
| **金 12:00** | 昼休み | X：選定した1題を投稿（画像付き） |
| **金 12:30** | 30分後 | X：リプ欄に解答＋解説カード |
| **金 19:00** | 夜 | note：Vol全体（3題セット）を公開 |
| **金 19:15** | 直後 | X：note公開告知ツイート |
| **土 9:00** | 翌朝 | X：前日投稿のリポスト or 補足 |

### 金曜に集中させる理由
- 薬剤師の昼休み（12:00-13:00）はX閲覧のピーク
- 金曜夜は「週末に勉強しよう」心理が働く
- 土曜朝のリポストで週末の流入も拾う

---

## Gemini NanoBanana2：コハク ポーズ生成プロンプト

### 基本プロンプト（ポーズ変更時に使用）

```
Generate a chibi anime-style character illustration:

Character: Kohaku (コハク)
- Young female pharmacist
- Dark navy/blue semi-bob haircut
- Blue and white capsule-shaped hair clip on left side
- Blue-grey calm eyes with gentle smile
- White long lab coat over light blue scrub top
- Dark pants, black shoes
- "DI" name badge on coat
- Clean, intelligent, calm appearance
- 2-3 head tall chibi proportions

Pose: {{POSE}}
Expression: {{EXPRESSION}}
Background: transparent / simple white

Style: Clean vector-like chibi illustration, soft shading,
professional medical character design. NOT overly cute or moe.
Maintain dignity and intelligence.
```

### ポーズバリエーション

| 用途 | POSE | EXPRESSION |
|---|---|---|
| 問題提示 | Right hand raised with index finger pointing up, thinking pose | Gentle curious smile, head slightly tilted |
| 解説中 | Both hands open in front, explaining gesture | Calm confident smile |
| まとめ | Arms crossed lightly, standing straight | Satisfied gentle smile |
| 処方箋チェック | Holding a clipboard, looking at it carefully | Focused, slightly serious |
| 正解発表 | Right hand giving thumbs up | Happy but composed smile |
| 不正解の解説 | Left hand on chin, thinking | Slightly concerned, kind expression |

### 設定集準拠チェックリスト
- [ ] 過度な萌え化になっていないか
- [ ] 感情爆発していないか
- [ ] ポンコツ化していないか
- [ ] 極端なリアクションになっていないか
- [ ] 知性70%・落ち着き60%・純粋さ30%のバランスか
