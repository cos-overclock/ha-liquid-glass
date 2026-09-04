# Liquid Glass Cards for Home Assistant

`pen/design.pen` の Liquid Glass デザインを、Home Assistant のダッシュボードに追加できるカスタムカード群として実装したものです。
Vite + React + TypeScript への段階的な移行を進めており、Home Assistant 向けには単一ファイル `dist/liquid-glass-cards.js` にバンドルされます。Separator Card は React と `@samasante/liquid-glass`、既存カードは移行期間中の Lit 実装です。

| カード | type | 対応ドメイン |
| --- | --- | --- |
| Light | `custom:liquid-glass-light-card` | `light`（明るさ / 色温度 / 色相・彩度 / お気に入り / プリセット） |
| Climate | `custom:liquid-glass-climate-card` | `climate`（270° ダイヤル、モード、風量 / プリセット） |
| Switch | `custom:liquid-glass-switch-card` | `switch` `input_boolean` `fan` など |
| Sensor | `custom:liquid-glass-sensor-card` | `sensor`（数値 + 24h スパークライン + トレンド） |
| Binary Sensor | `custom:liquid-glass-binary-sensor-card` | `binary_sensor`（device_class に応じた表示） |
| Lock | `custom:liquid-glass-lock-card` | `lock`（スライドして施錠 / 解錠） |
| Cover | `custom:liquid-glass-cover-card` | `cover`（ブラインド / カーテン、位置ドラッグ、チルト） |
| Media | `custom:liquid-glass-media-card` | `media_player`（再生操作、シーク、音量） |
| Slider | `custom:liquid-glass-slider-card` | 任意の数値（`input_number` `number` `fan` `light` など） |
| Weather | `custom:liquid-glass-weather-card` | `weather`（現在の天気、時間ごと・日ごとの予報） |
| Button | `custom:liquid-glass-button-card` | `scene` `script` `automation` `button` `input_button` |
| Scenes | `custom:liquid-glass-scene-card` | 複数のシーンをタイルまたはチップで並べる |
| Camera | `custom:liquid-glass-camera-card` | `camera`（静止画、動体検知、履歴） |
| Group | `custom:liquid-glass-group-card` | 他のカードをまとめる折りたたみ可能なパネル |

すべてのカードはライト / ダークテーマ（`hass.themes.darkMode`）、日本語 / 英語（`hass.language`）に自動で追従します。

Home Assistant 2026.6 以降では、ダッシュボード編集時に先にエンティティを選ぶと、対応する Liquid Glass カードが「Community」の候補に表示されます。同じエンティティに複数のカードが適合する場合（たとえば明るさ対応ライトの Light / Switch / Slider）は、利用可能な候補をすべて表示します。

## 幅への追従

カード幅に応じて余白、アイコン、文字サイズが縮みます。基準は 380px で、狭い列では約 170px まで崩れずに収まります。ビューポートではなくカード自身の幅を見ているため、セクションビューの狭い列でも、パネル全幅でも同じように表示されます。

250px を下回るとステータスバッジ、260px を下回るとセンサーの範囲表示が省略されます。どちらも状態テキストやグラフが同じ情報を示すためです。320px を下回るとエアコンの風量とプリセットが縦に並びます。

## Liquid Glass 効果について

デザインファイルの `liquid-glass.glsl` シェーダ（エッジ屈折 + ブラー + 彩度 + リムハイライト）を、カード本体では CSS / SVG、スライダーやノブなどの操作部では WebGL で再現しています。カード本体は Home Assistant のダッシュボード背景を実際に透過・ぼかします。

- ブラー・彩度・ティント・リムハイライト・内側グロー・影: すべてのモダンブラウザで動作
- エッジ屈折（`feDisplacementMap` を使った `backdrop-filter: url(#lg-card)`）: Chromium 系ブラウザのみ。Safari / Firefox では自動的に通常のブラー表示にフォールバックします
- スライダー・ノブ: WebGL シェーダ描画を維持します。ダイヤルノブは実バックドロップの上へ半透明シェーダーを重ねます
- モード選択ピル: 背景透過と表示安定性を優先し、CSS の半透明サーフェスで描画します
- 背景がカラフルなほど効果が映えます。ダッシュボードのテーマで `background` にグラデーション画像を設定することを推奨します

## アニメーション

状態が外から届いたとき、カードは値をいきなり差し替えずに補間します。エアコンのモードを切り替えると、リングの長さ・リングの色・ノブの位置・アイコンの色・バッジの色がそれぞれ 0.42〜0.45 秒かけて次の状態へ移ります。

運転モードのボタンでは、選択中を示す白いピルが次のボタンへ滑って移動します。背景を一方から消して他方に出すと瞬きに見えるため、動く要素は1つだけにしています。

補間しないのは、指の動きに追従する部分だけです。ドラッグ中のノブと弧はポインタに正確に追従します。遅れて追いつく動きは、そのまま操作の遅延として感じられるためです。

指を離したあとは、確定した値をエンティティが返してくるまで保持します。保持しないと、離した瞬間にダイヤルが変更前の値へ戻り、そこから設定値へ animate してしまうためです。エンティティが応答しない場合は 4 秒で保持をやめ、エンティティの値に戻ります。

OS で「視差効果を減らす」（`prefers-reduced-motion: reduce`）を有効にしている場合、すべてのトランジションとアニメーションは無効になり、最終状態が即座に表示されます。

## インストール

### HACS（カスタムリポジトリ）

1. HACS → Frontend → 右上メニュー → Custom repositories
2. このリポジトリの URL を Category: Dashboard で追加
3. "Liquid Glass Cards" をインストールし、フロントエンドをリロード

### 手動

1. `npm install && npm run build` で `dist/liquid-glass-cards.js` を生成
2. `config/www/liquid-glass-cards.js` にコピー
3. `www/` を新規に作った場合は Home Assistant を再起動
4. 設定 → ダッシュボード → リソース で `/local/liquid-glass-cards.js?v=1`（JavaScript モジュール）を追加

コピー先を `HA_WWW` に設定しておくと、ビルド後に自動でコピーされます。`npm run watch` でも各ビルド後にコピーされます。

```bash
HA_WWW=//homeassistant/config/www npm run build
```

### 更新するとき

Home Assistant はリソースを強くキャッシュします。ファイルを置き換えただけでは古いままになることがあります。

1. ファイルをコピーし直す
2. リソースの URL の `?v=` の値を**前回と違う値**に変える（`?v=1` → `?v=2`）
3. ブラウザを再読み込みする

`?v=` はキャッシュを捨てるための目印なので、値が前回と変わっていなければ意味がありません。バージョン番号を使う場合は、バージョンが上がっていないと同じ値になる点に注意してください。日時など必ず変わる値のほうが確実です。

読み込まれているビルドはブラウザのコンソールで確認できます。起動時に次のような行が出ます。

```text
 LIQUID-GLASS-CARDS  v0.6.0 · 13 cards · built 2026-09-04 09:06
```

カード枚数とビルド時刻が、コピーしたファイルのものと一致していれば正しく読み込まれています。一致しない場合はまだ古いファイルです。

## 設定例

13種類すべてビジュアルエディタに対応しています。ダッシュボードでカードを追加すると、エンティティや表示項目をフォームから設定できます。YAML を直接書く必要はありません。以下は同じ設定を YAML で表したものです。

すべてのカードに共通するオプション:

```yaml
entity: light.living_room   # 必須
name: リビング              # 表示名（省略時は friendly_name）
icon: mdi:lightbulb         # アイコン上書き
refraction: auto            # auto | true | false（SVG 屈折フィルタ）
theme: auto                 # auto | light | dark
glass_variant: regular      # regular | clear（写真・映像上では clear が有効）
language: ja                # 省略時は HA の言語設定
```

`regular` は文字の読みやすさを保つ標準素材です。`clear` は tint と blur を抑えて背後の写真や映像を優先します。屈折対応ブラウザではカードの実寸と角丸からSDF変位マップを生成し、サイズ変更時だけ再生成します。スライダーやトグルなどの小型コントロールは、対応環境では推定色ではなく実際のトラックやカード面を屈折します。

### Light

```yaml
type: custom:liquid-glass-light-card
entity: light.living_room
presets:
  - name: 読書
    icon: mdi:book-open-variant
    brightness: 100
    color_temp_kelvin: 4500
  - name: リラックス
    icon: mdi:coffee
    brightness: 45
    color_temp_kelvin: 2700
  - name: おやすみ
    icon: mdi:weather-night
    scene: scene.good_night      # scene / service 指定も可
favorites: ["#FF453A", "#FF9F0A", "#FFD60A", "#30D158", "#0A84FF", "#B15CFF", "#FF375F"]
# show_brightness / show_color_temp / show_color: false で非表示
```

色温度と色の両方に対応するライトでは「カラー / 色温度」のセグメントが表示されます。

### Climate

```yaml
type: custom:liquid-glass-climate-card
entity: climate.living_room
hvac_modes: [auto, cool, heat, fan_only, off]   # 省略時はエンティティの hvac_modes
show_fan_mode: true
show_preset_mode: true
show_swing_mode: false
```

`heat_cool` モードでは 2 つのノブで設定範囲を操作できます。ダイヤル上をドラッグすると温度が変わります。

### Switch

```yaml
type: custom:liquid-glass-switch-card
entity: switch.desk_outlet
power_entity: sensor.desk_outlet_power   # オン時に消費電力を表示
```

カードのどこをタップしてもオン / オフが切り替わります。長押しすると詳細ダイアログが開きます。オン / オフはアイコンの色と状態テキストで示します。

### Sensor

```yaml
type: custom:liquid-glass-sensor-card
entity: sensor.living_room_temperature
secondary_entity: sensor.living_room_humidity
secondary_label: 湿度
hours_to_show: 24
graph: true              # false で大きな数値のみのコンパクト表示
value_in_caption: false  # true で値を説明文に移し、1行のカードにする
trend: true              # 1 時間前との差分バッジ
accent: "#FF9F0A"
decimals: 1
```

履歴は `history/period` API から取得し 5 分ごとに更新します。

`value_in_caption: true` にすると、大きな数値をやめて値を説明文の先頭に入れます。残るのは1行だけになるので、スイッチカードと並べたときに高さが揃います。グラフはこの形に収まらないため描画しません。

```yaml
type: custom:liquid-glass-sensor-card
entity: sensor.area_person_count
value_in_caption: true
```

説明文は「0 objects · 7分前に更新」のようになります。単位が記号（`°C` や `%`）のときは数値に続けて、単語のときは空白を挟んで並べます。

### Binary Sensor

```yaml
type: custom:liquid-glass-binary-sensor-card
entity: binary_sensor.front_door
# icon_on / icon_off / label_on / label_off / accent で上書き可能
```

`door` `window` `motion` `occupancy` `moisture` `smoke` などの device_class に応じてアイコン・ラベル・色が変わります。

### Lock

```yaml
type: custom:liquid-glass-lock-card
entity: lock.front_door
buttons:                      # 任意のアクションボタン
  - name: ドアを開ける
    icon: mdi:door-open
    service: lock.open
  - name: アクティビティ
    icon: mdi:history
    service: script.show_lock_log
```

施錠中はスライダーを右端まで、解錠中は左端までドラッグすると操作が実行されます。`jammed` 状態では操作が無効になります。

### Cover

```yaml
type: custom:liquid-glass-cover-card
entity: cover.living_room_blind
style: blind        # blind | curtain（省略時は device_class から判定）
curtain: double     # double | single
show_tilt: true     # チルト対応時のみ表示
```

位置トラックをドラッグすると `set_cover_position` を呼び出します。

### Media

```yaml
type: custom:liquid-glass-media-card
entity: media_player.living_room
source_color: "#FF375F"
show_volume: true
show_device: true
```

### Slider

数値をひとつ持つエンティティなら何でも、ドラッグできるトラックとして表示します。

```yaml
type: custom:liquid-glass-slider-card
entity: fan.bedroom
ticks: true          # 段階が 2〜12 のとき目盛りを引く。数値を渡すと本数を指定
show_range: true     # false で最小値・最大値の行を省き、カードを1行分低くする
accent: "#FF9F0A"    # アイコンとトラックの色
subtitle: 風量        # 省略時は刻み幅や段階を表示
min: 0
max: 100
step: 20
unit: "%"
decimals: 0
```

トラックには丸いガラスのつまみが乗ります。つまみをドラッグするか、トラックの任意の位置を押すと値が変わります。指を離した後は、Home Assistant が新しい状態を返すまで操作後の値を表示し続けるので、一瞬元の値に戻ることはありません。

次のドメインは設定なしで読み書きできます。最小値、最大値、刻み幅、単位はエンティティの属性から取ります。

| ドメイン | 読み取り | 書き込み |
| --- | --- | --- |
| `input_number` `number` | 状態 | `set_value` |
| `fan` | `percentage` | `set_percentage` |
| `light` | `brightness` | `turn_on` の `brightness_pct` |
| `media_player` | `volume_level` | `volume_set` |
| `cover` `valve` | `current_position` | `set_cover_position` / `set_valve_position` |
| `humidifier` | `humidity` | `set_humidity` |
| `water_heater` `climate` | `temperature` | `set_temperature` |

上記以外のエンティティや、既定とは別の値を扱いたい場合は読み書きの方法を指定できます。サービスを指定するまでは読み取り専用として表示されます。

```yaml
type: custom:liquid-glass-slider-card
entity: sensor.pump_level
attribute: level          # 状態ではなくこの属性から読む
service: script.set_pump  # domain.service 形式
service_key: level        # 値を渡すキー。省略時は value
```

値が最小値かつ最小値が 0 のときは、アイコンとトラックが待機状態の表示になります。

### Weather

現在の天気、時間ごとの予報、日ごとの予報、湿度・風速・降水を1枚にまとめます。

```yaml
type: custom:liquid-glass-weather-card
entity: weather.tokyo
layout: full         # full | row
show_hourly: true    # 時間ごとの予報
hourly_count: 6
show_daily: true     # 日ごとの気温レンジ
daily_count: 4
show_metrics: true   # 湿度・風速・降水
```

予報は `weather.get_forecasts` サービスから取得し、15分ごとに更新します。2024.4 より前の Home Assistant では属性の `forecast` を読みます。

日ごとの行のバーは、表示する全日の最低から最高までを共通の目盛りにして各日の範囲を置きます。週の中でその日がどのあたりかが一目で分かります。

アイコンと色は天気の状態から決まります。`sun.sun` があれば夜かどうかを判定し、「晴れ時々くもり」は夜用のアイコンに切り替わります。

`show_daily: false` と `show_metrics: false` を指定すると、現在の天気と時間ごとの予報だけのコンパクトな表示になります。最高・最低は残ります。

`layout: row` にすると1行に収まります。アイコン、地名、天気と最高・最低、気温だけの表示になり、スイッチカードと同じ高さになります。ダッシュボードの下部に並べる用途向けです。予報の各セクションはこの形に収まらないため描画しません。

```yaml
type: custom:liquid-glass-weather-card
entity: weather.tokyo
layout: row
```

### Button

シーン、スクリプト、オートメーション、ボタンを1行で実行します。

```yaml
type: custom:liquid-glass-button-card
entity: scene.good_night
accent: "#5E5CE6"    # アイコンの色
subtitle: 就寝前の一括操作   # 省略時は種類と前回の実行時刻
service: script.custom      # 省略時はドメインごとの既定
service_data: { minutes: 10 }
```

押すとアイコンがチェックに変わり、説明文が「実行しました · たった今」になります。2.6秒で元に戻ります。

説明文は省略すると「シーン · 前回 8時間前」のようになります。12時間以内は経過時間、それ以前は時刻で表示します。

### Scenes

複数のシーンをまとめて並べます。デザインの Button Grid、Scene Chips、Scene Chips Row の3つに対応します。

```yaml
type: custom:liquid-glass-scene-card
title: シーン
style: tiles        # tiles | chips
columns: 3
show_count: false
scenes:
  - entity: scene.morning
    icon: mdi:weather-sunset-up
  - entity: scene.night
    icon: mdi:weather-night
  - entity: scene.away
    name: 外出
    accent: "#0A7EA4"
  - service: script.run_vent      # entity の代わりにサービスでも可
    name: 換気
    service_data: { minutes: 10 }
```

`style: chips` にするとアイコンのない文字だけのピルになります。`columns: 4` と組み合わせるとデザインの Scene Chips Row になります。

アイコンの色を指定しなければ、デザインのパレット6色を順番に使います。押したタイルは短く光って反応を返します。

### Camera

```yaml
type: custom:liquid-glass-camera-card
entity: camera.front_door
motion_entity: binary_sensor.front_door_motion   # 動体検知のチップ
show_actions: true       # 下部の操作列
show_mic: false
mic_service: script.talk_to_door
snapshot_service: ""     # 省略時は静止画を新しいタブで開く
refresh_interval: 10     # 静止画の更新間隔（秒）
aspect_ratio: 1.777      # 16 / 9
```

映像は `entity_picture` の静止画を一定間隔で取り直します。Home Assistant のライブ配信は内部コンポーネントで提供されており、カスタムカードからは利用できないためです。拡大ボタンは詳細ダイアログを開くので、そちらでライブ映像を見られます。

エンティティの状態が `streaming` なら「ライブ」、それ以外は「静止画」のバッジになります。`unavailable` のときは映像を消し、オフライン表示に切り替えます。

`show_actions: false` で下部の操作列を省き、映像だけのカードになります。

### Group

```yaml
type: custom:liquid-glass-group-card
title: セキュリティ
icon: mdi:shield-home
subtitle: ""          # 省略時は「3台 · 2台が稼働中」を自動生成
collapsible: true     # ヘッダーのタップで開閉
collapsed: false      # 初期状態
summary: true         # 折りたたみ時に状態チップを表示
cards:
  - type: custom:liquid-glass-lock-card
    entity: lock.front_door
  - type: custom:liquid-glass-binary-sensor-card
    entity: binary_sensor.front_door
  - type: custom:liquid-glass-switch-card
    entity: switch.porch_light
```

カードをカテゴリごとにまとめるコンテナです。パネル自体はガラスではありません。Apple のガイドラインでは Liquid Glass を重ねないこととされているため、容器は淡く色を敷いた面にとどめ、ガラスは中のカードだけが持ちます。

`cards` には Liquid Glass 以外の任意の Lovelace カードも入れられます。子カードは Home Assistant の `loadCardHelpers()` で生成されるためです。

`theme` `refraction` `language` は、子カードが自分で指定していない場合にかぎり引き継がれます。グループをダークに固定すると中のカードもダークになります。

折りたたむと、子カードのエンティティごとに状態チップが並びます。照明は明るさ、カバーは開度、エアコンは設定温度というように、閉じたままでも各機器の状態が読めます。`summary: false` でチップを省き、ヘッダーだけにできます。

## テーマによるカスタマイズ

デザイントークンはすべて CSS カスタムプロパティとして公開されており、HA テーマから上書きできます。

```yaml
liquid_glass:
  lg-radius: 32px
  lg-accent: "#ffb340"
  lg-glass-tint-alpha: 0.4
  lg-font-jp: '"Noto Sans JP", sans-serif'
```

主なトークン: `--lg-text-primary` `--lg-text-secondary` `--lg-glass-tint`（RGB 三成分）`--lg-glass-tint-alpha` `--lg-glass-stroke` `--lg-track-bg` `--lg-shadow-glass` `--lg-segment-selected` `--lg-accent` `--lg-heat` `--lg-cool` `--lg-radius` `--lg-blur` `--lg-saturation` `--lg-group-panel`。定義は `src/styles/tokens.ts` を参照してください。

## 開発

```bash
npm install
npm run build     # 型チェック + dist/liquid-glass-cards.js を生成
npm run watch     # 変更を監視してビルド
npm test          # React/Custom Element 境界の単体テスト
npm run demo      # http://localhost:5173/ でモック hass を使ったデモを表示
```

デモは `?theme=dark` `?lang=en` `?refraction=off` `?width=210` のクエリで表示を切り替えられます。画面上部のスライダーでカード幅を変えられるので、狭い列での見え方を確認できます。

`http://localhost:5173/demo/editor.html` はビジュアルエディタの確認用ページです。`?kind=cover` のようにカード種別を指定できます。Home Assistant の `ha-form` を最小限に再現したシムの上で動くため見た目は簡素ですが、スキーマ・ラベル・書き出される設定・カードへの反映を確認できます。ページ上部の Self test が全カードのエディタを自動で操作して結果を検証します。

```text
src/
  index.ts                    カード登録 / customCards への追加
  react/define-react-card.tsx React と HA Custom Element 契約のアダプター
  react/use-card-host.ts      hass / config をホスト属性へ同期する React Hook
  base-card.ts                移行前カードの Lit 共通処理
  i18n.ts                     日本語 / 英語の文言
  styles/tokens.ts            デザイントークン（design.pen の variables）
  styles/glass.ts             ガラス表面の共通スタイル
  styles/glass-defs.ts        liquid-glass.glsl を移植した SVG フィルタ
  components/lg-slider.ts     bar / thumb / thin の 3 種類のスライダー
  components/lg-icon.ts       ha-icon ラッパー
  editor/lg-card-editor.ts    全カード共通のビジュアルエディタ
  editor/schema.ts            カード種別ごとの ha-form スキーマ
  editor/load.ts              ha-form の遅延読み込み
  cards/*.ts(x)               各カード（React へ順次移行）
```

主なトークンに加えて、スライダーカードは `--lg-slider-accent` `--lg-slider-accent-deep` `--lg-slider-accent-light` `--lg-slider-fill-light` を使います。
