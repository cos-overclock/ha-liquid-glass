# 開発者向けガイド

利用者向けの導入・設定方法は [README](../README.md) を参照してください。

## 実装概要

`pen/design.pen` のLiquid GlassデザインをVite + React + TypeScriptで実装し、Home Assistant向けには単一ファイル`dist/liquid-glass-cards.js`として配布します。実行時のReact APIは`preact/compat`へ差し替えています。全カードは`@samasante/liquid-glass`を使い、`src/react/define-react-card.tsx`のCustom Elementアダプター経由でHome Assistantに登録します。

## 表示効果の実装

React版カードは屈折対象の背景レイヤーをカード側で描画し、`Glass`の`refract`へ複製して渡します。これによりカード内の光学背景にSVGの`filter: url()`を適用します。Home Assistantの壁紙そのものを屈折する方式ではありません。スライダーやノブなどの操作部はWebGLシェーダを使います。

状態が外から届いたときは値を補間し、ドラッグ中はポインタへ直接追従します。操作を確定した値はエンティティからの応答まで保持し、応答がなければ4秒後に元の状態へ戻します。`prefers-reduced-motion: reduce`ではトランジションとアニメーションを停止します。

## バンドルサイズ

Home Assistant はダッシュボードを開くたびにこのファイルを読み込みます。カードが使っているのはフック・ref・シャドウルートへの描画までで、React 19 が加えた機能は使っていないため、ビルド時に `preact/compat` へ差し替えています。

| | 生 | gzip |
| --- | --- | --- |
| React | 606 KB | 154 KB |
| Preact | 約429 KB | 約111 KB |

差し替えは `vite.config.ts` の `resolve.alias` 1か所だけで行います。ソースは `react` を import したまま、型も `@types/react` のままで、テストも同じ alias の上で走ります。配布物だけが別のランタイムで動く、という状態にはなりません。

`@vitejs/plugin-react` は外しました。JSX は Vite 本体の変換が扱います。このため `npm run demo` の開発サーバーでは Fast Refresh が効かず、変更時はページ全体が再読み込みされます。

## 開発

```bash
npm install
npm run build     # 型チェック + dist/liquid-glass-cards.js を生成
npm run watch     # 変更を監視してビルド
npm test          # 単体テスト
npm run lint      # ESLint（React Hooks ルールと型情報を使った検査）
npm run check     # typecheck + lint + test をまとめて実行
npm run verify-version # package / lockfile / 配布バンドルのバージョンを照合
npm run demo      # http://localhost:5173/ でモック hass を使ったデモを表示
```

デモは `?theme=dark` `?lang=en` `?refraction=on` `?quality=medium` `?width=210` のクエリで表示を切り替えられます。画面上部のスライダーでカード幅を変えられるので、狭い列での見え方を確認できます。`?focus=overview`はREADMEの全体画像、`?focus=light`などはカード別画像、`?focus=badge`はバッジを表示します。

READMEのスクリーンショットはデモのモックデータから生成します。デモを起動したまま、別のターミナルで`node scripts/capture-readme-screenshots.mjs`を実行してください。Chromeが標準の場所にない場合は`CHROME_PATH`、デモが5173番以外で起動した場合は`DEMO_URL`を指定します。画像は`docs/images/`へ保存されます。

GitHub Actions（`.github/workflows/ci.yml`）が push と pull request ごとに `typecheck` / `lint` / `test` / `build` とバージョン照合を実行します。コミット済みの`dist/`が`src`から遅れていないかも検査します（ビルド時刻のスタンプだけは差分として無視します）。

バージョンの基準は`package.json`です。リリース時は`npm version 1.0.0 --no-git-tag-version`のようにして`package.json`と`package-lock.json`を更新し、`npm run build`で`dist/`を再生成します。`npm run verify-version`で3つのバージョンを照合してから変更を`main`へマージしてください。

`main`の対象コミットに`v1.0.0`のようなタグを付け、`git push origin v1.0.0`でリモートへ送ります。`.github/workflows/release.yml`はタグpushで起動し、タグ名とパッケージのバージョンを照合し、ソースを再検証・ビルドしてGitHub Releaseに`liquid-glass-cards.js`を添付します。同じタグのReleaseが存在する場合は再発行しません。既存の`v0.8.5`以前のタグは、タグ作成時のソース内バージョンが一致しないため、この新しい手順では再発行できません。

`http://localhost:5173/demo/editor.html` はビジュアルエディタの確認用ページです。`?kind=cover` のようにカード種別を指定できます。Home Assistant の `ha-form` を最小限に再現したシムの上で動くため見た目は簡素ですが、スキーマ・ラベル・書き出される設定・カードへの反映を確認できます。ページ上部の Self test が全カードのエディタを自動で操作して結果を検証します。

```text
src/
  index.ts                    カード登録 / customCards への追加
  react/define-react-card.tsx React と HA Custom Element 契約のアダプター
  react/use-card-host.ts      hass / config をホスト属性へ同期する React Hook
  react/use-entity-history.ts 履歴の購読とポーリングの切り替え
  history.ts                  履歴の取得・購読・間引き・トレンド
  react/glass-primitives.tsx  ガラス面（Glass ラッパーと光学プリセット）
  react/glass-slider.tsx      Apple 風スライダー（バー＋つまみ）
  react/card-parts.tsx        アイコンウェル / タイトル / バッジなどの共通部品
  react/card-styles.ts        カード共通レイアウトのスタイルシート
  react/reduced-motion.ts     prefers-reduced-motion を JS アニメーションへ適用
  i18n.ts                     翻訳の読み込みと時刻表記
  translations/ja.ts          日本語の文言
  translations/en.ts          英語の文言（未訳キーの代替でもあります）
  styles/tokens.ts            デザイントークン（design.pen の variables）
  components/lg-icon.ts       ha-icon ラッパー
  editor/lg-card-editor.ts    全カード共通のビジュアルエディタ
  editor/schema.ts            カード種別ごとの ha-form スキーマ
  editor/load.ts              ha-form の遅延読み込み
  cards/*.tsx                 各カード（すべて React）
```

カード共通のスタイル（`styles/tokens.ts` と `react/card-styles.ts`）は、カードごとに `<style>` を複製するのではなく、構築済みの `CSSStyleSheet` を全インスタンスの Shadow Root で共有します（`react/card-sheets.ts`）。ダッシュボードに何枚並べても、共通部分のパースは1回で済みます。

主なトークンに加えて、スライダーカードは `--lg-slider-accent` `--lg-slider-accent-deep` `--lg-slider-accent-light` `--lg-slider-fill-light` を使います。バーとつまみは `--lg-slider-bar-bg`（未充填部分）`--lg-slider-mark`（目盛り）`--lg-knob-solid` `--lg-knob-solid-rim`（待機中のつまみ）`--lg-knob-shadow` `--lg-knob-shadow-active`（つまみの影）で調整できます。

サイズ比較には`demo/?focus=compact&gap=8&width=380`を使用できます。幅170 / 250 / 380pxと全幅、通常配置とSections相当の配置、テーマ、屈折の切り替えに対応し、各カードの実測高さを表示します。Sections相当の表示はデモ用のグリッドで、Home Assistant本体での確認も必要です。
