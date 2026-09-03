# Liquid Glass Cards for Home Assistant

`pen/design.pen` の Liquid Glass デザインを、Home Assistant のダッシュボードに追加できるカスタムカード群として実装したものです。
Lit + TypeScript で書かれ、単一ファイル `dist/liquid-glass-cards.js` にバンドルされます。

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

すべてのカードはライト / ダークテーマ（`hass.themes.darkMode`）、日本語 / 英語（`hass.language`）に自動で追従します。

## 幅への追従

カード幅に応じて余白、アイコン、文字サイズが縮みます。基準は 380px で、狭い列では約 170px まで崩れずに収まります。ビューポートではなくカード自身の幅を見ているため、セクションビューの狭い列でも、パネル全幅でも同じように表示されます。

250px を下回るとステータスバッジ、260px を下回るとセンサーの範囲表示が省略されます。どちらも状態テキストやグラフが同じ情報を示すためです。320px を下回るとエアコンの風量とプリセットが縦に並びます。

## Liquid Glass 効果について

デザインファイルの `liquid-glass.glsl` シェーダ（エッジ屈折 + ブラー + 彩度 + リムハイライト）を CSS / SVG で再現しています。

- ブラー・彩度・ティント・リムハイライト・内側グロー・影: すべてのモダンブラウザで動作
- エッジ屈折（`feDisplacementMap` を使った `backdrop-filter: url(#lg-card)`）: Chromium 系ブラウザのみ。Safari / Firefox では自動的に通常のブラー表示にフォールバックします
- 背景がカラフルなほど効果が映えます。ダッシュボードのテーマで `background` にグラデーション画像を設定することを推奨します

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
2. リソースの URL の `?v=` の数字を増やす（`?v=1` → `?v=2`）
3. ブラウザを再読み込みする

読み込まれているビルドはブラウザのコンソールで確認できます。起動時に次のような行が出ます。

```text
 LIQUID-GLASS-CARDS  v0.2.0 · built 2026-09-03 11:54
```

バージョンやビルド時刻が古い場合は、まだ古いファイルが読み込まれています。

## 設定例

8種類すべてビジュアルエディタに対応しています。ダッシュボードでカードを追加すると、エンティティや表示項目をフォームから設定できます。YAML を直接書く必要はありません。以下は同じ設定を YAML で表したものです。

すべてのカードに共通するオプション:

```yaml
entity: light.living_room   # 必須
name: リビング              # 表示名（省略時は friendly_name）
icon: mdi:lightbulb         # アイコン上書き
refraction: auto            # auto | true | false（SVG 屈折フィルタ）
theme: auto                 # auto | light | dark
language: ja                # 省略時は HA の言語設定
```

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
graph: true          # false でコンパクト表示
trend: true          # 1 時間前との差分バッジ
accent: "#FF9F0A"
decimals: 1
```

履歴は `history/period` API から取得し 5 分ごとに更新します。

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
accent: "#FF9F0A"    # アイコンとトラックの色
subtitle: 風量        # 省略時は刻み幅や段階を表示
min: 0
max: 100
step: 20
unit: "%"
decimals: 0
```

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

## テーマによるカスタマイズ

デザイントークンはすべて CSS カスタムプロパティとして公開されており、HA テーマから上書きできます。

```yaml
liquid_glass:
  lg-radius: 32px
  lg-accent: "#ffb340"
  lg-glass-tint-alpha: 0.4
  lg-font-jp: '"Noto Sans JP", sans-serif'
```

主なトークン: `--lg-text-primary` `--lg-text-secondary` `--lg-glass-tint`（RGB 三成分）`--lg-glass-tint-alpha` `--lg-glass-stroke` `--lg-track-bg` `--lg-shadow-glass` `--lg-segment-selected` `--lg-accent` `--lg-heat` `--lg-cool` `--lg-radius` `--lg-blur` `--lg-saturation`。定義は `src/styles/tokens.ts` を参照してください。

## 開発

```bash
npm install
npm run build     # 型チェック + dist/liquid-glass-cards.js を生成
npm run watch     # 変更を監視してビルド
npm run demo      # http://localhost:5173/ でモック hass を使ったデモを表示
```

デモは `?theme=dark` `?lang=en` `?refraction=off` `?width=210` のクエリで表示を切り替えられます。画面上部のスライダーでカード幅を変えられるので、狭い列での見え方を確認できます。

`http://localhost:5173/demo/editor.html` はビジュアルエディタの確認用ページです。`?kind=cover` のようにカード種別を指定できます。Home Assistant の `ha-form` を最小限に再現したシムの上で動くため見た目は簡素ですが、スキーマ・ラベル・書き出される設定・カードへの反映を確認できます。ページ上部の Self test が全カードのエディタを自動で操作して結果を検証します。

```text
src/
  index.ts                    カード登録 / customCards への追加
  base-card.ts                共通処理（hass / config / テーマ / i18n / ヘッダー・バッジ・トグル）
  i18n.ts                     日本語 / 英語の文言
  styles/tokens.ts            デザイントークン（design.pen の variables）
  styles/glass.ts             ガラス表面の共通スタイル
  styles/glass-defs.ts        liquid-glass.glsl を移植した SVG フィルタ
  components/lg-slider.ts     bar / thumb / thin の 3 種類のスライダー
  components/lg-icon.ts       ha-icon ラッパー
  editor/lg-card-editor.ts    全カード共通のビジュアルエディタ
  editor/schema.ts            カード種別ごとの ha-form スキーマ
  editor/load.ts              ha-form の遅延読み込み
  cards/*.ts                  各カード
```

主なトークンに加えて、スライダーカードは `--lg-slider-accent` `--lg-slider-accent-deep` `--lg-slider-accent-light` `--lg-slider-fill-light` を使います。
