# プロンプトライブラリ

## 1. Claude: 症例クイズ生成プロンプト（Q1, Q2用）

```
あなたは調剤薬局で10年の経験を持つ薬剤師です。
4月に入社する新人薬剤師向けの「薬局シミュレーション」クイズを作成してください。

## 出力形式（JSON）

{
  "number": 1,
  "type": "standard",
  "creator": "ai",
  "difficulty": {{DIFFICULTY}},
  "patient": "（年齢・性別・既往歴・処方歴を含む）",
  "situation": "来局時の相談：<br><span class=\"quote\">「（患者のセリフ）」</span>",
  "choices": ["A選択肢", "B選択肢", "C選択肢"],
  "answer": 0,
  "explanation": "（なぜ正解か。200〜300字。機序や根拠を含む）",
  "keyPoint": "（1〜2行の暗記ポイント）",
  "proTip": "（ベテランならではの実務Tips。100〜150字）",
  "source": "（添付文書、ガイドライン等）",
  "choiceReviews": [
    {"status": "ok|ng", "reason": "（15字以内）"},
    {"status": "ok|ng", "reason": ""},
    {"status": "ok|ng", "reason": ""}
  ]
}

## ルール
- 3択のうち1つだけが明確に正解であること
- 不正解の選択肢にも「なぜ間違いか」が明確に説明できること
- 新人薬剤師が実際に直面しそうなリアルな場面設定にすること
- 患者は必ず「セリフ」を話すこと（臨場感のため）
- difficulty 1=新人向け, 2=実務1〜3年目, 3=考えさせる系

## テーマ
{{THEME}}
```

---

## 2. Claude: 処方箋クイズ生成プロンプト（Q3用）

```
あなたは調剤薬局で10年の経験を持つ薬剤師です。
処方箋を読み解くシミュレーションクイズ（Q3・処方箋形式）を作成してください。

## 出力形式（JSON）

{
  "number": 3,
  "type": "prescription",
  "creator": "ai",
  "difficulty": 3,
  "prescription": {
    "patient": "（年齢 性別 ─ 診療科）",
    "clinic": "○○クリニック",
    "items": [
      {"name": "薬品名 規格", "dose": "1回X錠（1日Y錠）", "usage": "1日Z回 タイミング ─ N日分"}
    ],
    "note": "（患者背景・経緯を1〜2行）"
  },
  "question": "この処方箋を受け取ったとき、<br>薬剤師として<span class=\"hl\">最も優先すべき対応</span>は？",
  "choices": ["A選択肢", "B選択肢", "C選択肢"],
  "answer": 0,
  "explanation": "...",
  "keyPoint": "...",
  "proTip": "...",
  "source": "...",
  "choiceReviews": [...]
}

## ルール
- 処方箋は2〜4剤で構成すること
- 必ず1つ以上の「問題点」を処方に含めること
  （相互作用 / 禁忌 / 用量過量 / 重複 / 腎機能考慮不足 等）
- 正解は「疑義照会すべき」系が望ましい（新人に照会の習慣を植え付ける）
- 不正解Bは「問題なし」系にすること（見逃しの怖さを学ばせる）

## テーマ
{{THEME}}
```

---

## 3. Gemini NanoBanana 2: インフォグラフィック画像プロンプト

> **自動生成**: `gen.js` が JSON の `infographic` フィールドからプロンプトテキストを自動生成します。
>
> **使い方:**
> 1. `node gen.js data/vol002.json` を実行
> 2. `output/vol002-q1-nb2-prompt.txt` 等が生成される
> 3. テキストをコピーして Gemini NanoBanana2 に貼り付ける
> 4. 生成されたインフォグラフィック画像をダウンロードして note に挿入
>
> **出力先:** `output/{slug}-q{n}-nb2-prompt.txt`（infographic フィールドがある問題のみ）

プロンプトテンプレート（参考）:

```
Create a clean, professional medical infographic in Japanese.

## Content
Title: {{TITLE}}
Objective: {{OBJECTIVE}}
Key data points:
（解説、ポイント、メカニズム、安全/危険、アクション、出典が自動挿入）

## Design requirements
- Color scheme: navy (#1B3A5C), teal (#4ECDC4), coral accent (#FF6B6B), white background
- Style: Clean, modern, minimal. Medical/pharmaceutical professional feel.
- Layout: Vertical, suitable for social media (1080x1080px)
- Typography: Bold headers, clear hierarchy
- Include simple icons for each data point
- All text in Japanese
- Bottom: "📚 {{SOURCE}}" in small text
- Bottom corner: "{{ACCOUNT}}" watermark

## Important
- DO NOT include any misleading medical imagery
- Keep the design simple and readable
- Prioritize clarity over decoration
```

---

## 4. ChatGPT: X投稿文生成プロンプト

```
以下の薬局シミュレーションクイズを元に、X投稿文を3パターン作成してください。

## クイズ内容
タイトル: {{TITLE}}
患者: {{PATIENT}}
質問の核心: {{CORE_QUESTION}}

## 条件
- 各パターン130字以内（画像添付前提）
- ハッシュタグ: #薬剤師 #新人薬剤師 #薬局シミュレーション
- 末尾: 「答えはリプ欄👇」

## パターン
1. 問いかけ型:「あなたならどうする？」で始める
2. 驚き型: 意外な事実を冒頭に持ってくる
3. 共感型:「新人の頃、これで焦った」系

## 出力
投稿文のみ。各パターンを ---  で区切る。
```

---

## 5. Claude: note記事整形プロンプト

```
以下の3題のクイズデータをnote記事として整形してください。

## データ
{{VOL_JSON}}

## 記事構成

タイトル: 【薬局シミュレーション Vol.{{VOL}}】今週の3症例に挑戦！

---

🏥 **今日の1症例** ─ Vol.{{VOL}}

新人薬剤師のみなさん、今週も3症例に挑戦しましょう。
難易度は ★☆☆ → ★★☆ → ★★★ のステップアップ形式です。

---

### 症例1（難易度：★☆☆）{{BADGE}}

**👤 患者情報**
（patient情報）

**状況**
（situation）

**あなたならどう対応する？**
A.
B.
C.

<details><summary>答えと解説を見る</summary>

**✅ 正解：{{ANSWER}}**

（explanation）

> ⚡ **覚えておきたいポイント**
> （keyPoint）

> 💡 **ベテラン薬剤師のワンポイント**
> （proTip）

📚 出典：（source）

</details>

---
（症例2, 3も同様）

---

## まとめ：今週の3つのポイント
1.（Q1のkeyPoint要約）
2.（Q2のkeyPoint要約）
3.（Q3のkeyPoint要約）

---

✅ 毎週月曜・金曜に更新中！
フォローして来週の症例もチェック👇

## 条件
- スマホで読みやすい短い段落
- note のMarkdown記法に準拠
- 処方箋問題（Q3）は処方内容をテキストで再現
- 画像挿入位置を【画像：q1.png】のように明示
```

---

## 6. Gemini: 校正・ファクトチェックプロンプト

```
以下のnote記事の薬学的正確性をチェックしてください。

## チェック項目
1. 薬品名・規格は正しいか
2. 用法用量は添付文書と整合するか
3. 相互作用の説明に誤りはないか
4. ガイドラインの引用は最新か
5. 患者への説明として誤解を招く表現はないか

## 記事
{{ARTICLE}}

## 出力形式
問題なし → ✅ OK
修正が必要 → ⚠️ [箇所] 修正内容
重大な誤り → 🚨 [箇所] 正しい情報と出典
```
