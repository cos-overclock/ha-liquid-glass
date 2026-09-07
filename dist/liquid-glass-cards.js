//#region src/card-constants.ts
var e = [
	"scene",
	"script",
	"automation",
	"button",
	"input_button"
], t = [
	"switch",
	"input_boolean",
	"fan",
	"light",
	"automation",
	"humidifier",
	"siren",
	"remote"
], n = [
	"input_number",
	"number",
	"fan",
	"light",
	"media_player",
	"cover",
	"valve",
	"humidifier",
	"water_heater",
	"climate"
], r = ["select", "input_select"], i = [
	"#FF453A",
	"#FF9F0A",
	"#FFD60A",
	"#30D158",
	"#0A84FF",
	"#B15CFF",
	"#FF375F"
], a = {
	on: "On",
	off: "Off",
	lit: "On",
	unlit: "Off",
	last: "last",
	brightness: "Brightness",
	color_temp: "Color temperature",
	hue: "Hue",
	saturation: "Saturation",
	favorites: "Favorites",
	color: "Color",
	unavailable: "Unavailable",
	target_temp: "Target",
	target_range: "Target range",
	room_temp: "Room",
	humidity: "Humidity",
	heating: "Heating",
	cooling: "Cooling",
	drying: "Drying",
	fan_running: "Fan",
	idle: "Idle",
	mode_auto: "Auto",
	mode_heat_cool: "Auto",
	mode_cool: "Cool",
	mode_heat: "Heat",
	mode_dry: "Dry",
	mode_fan_only: "Fan",
	mode_off: "Off",
	fan_mode: "Fan",
	fan_speed: "Speed",
	fan_presets: "Presets",
	fan_oscillation: "Oscillation",
	fan_direction: "Direction",
	fan_forward: "Forward",
	fan_reverse: "Reverse",
	preset: "Preset",
	swing_mode: "Swing",
	power: "Power",
	vacuum_cleaning: "Cleaning",
	vacuum_docked: "Docked",
	vacuum_returning: "Returning",
	vacuum_error: "Error",
	vacuum_start: "Start",
	vacuum_resume: "Resume",
	vacuum_pause: "Pause",
	vacuum_stop: "Stop",
	vacuum_dock: "Dock",
	vacuum_locate: "Locate",
	vacuum_spot: "Spot clean",
	vacuum_fan_speed: "Suction",
	vacuum_battery: "Battery",
	vacuum_area: "Cleaned area",
	last_on: "last on",
	updated_ago: "Updated {t}",
	hours_24: "24 h",
	ago_24h: "24 h ago",
	ago_12h: "12 h ago",
	now: "Now",
	since: "since {t}",
	last_change: "changed {t}",
	open: "Open",
	closed: "Closed",
	is_open: "Open",
	is_closed: "Closed",
	detected: "Detected",
	detecting: "Detected",
	clear: "Clear",
	locked: "Locked",
	unlocked: "Unlocked",
	is_locked: "Locked",
	is_unlocked: "Unlocked",
	locking: "Locking…",
	unlocking: "Unlocking…",
	jammed: "Jammed",
	jammed_state: "Jam detected · check the door",
	slide_to_unlock: "Slide to unlock",
	slide_to_lock: "Slide to lock",
	cannot_operate: "Unavailable",
	position: "Position",
	stopped: "Stopped",
	opening: "Opening",
	closing: "Closing",
	moving: "Moving",
	tilt: "Slat tilt",
	not_playing: "Nothing playing",
	standby: "Idle",
	paused: "Paused",
	playing: "Playing",
	just_now: "just now",
	minutes_ago: "{n} min ago",
	hours_ago: "{n} h ago",
	days_ago: "{n} d ago",
	seconds_ago: "{n} s ago",
	auto_locked_at: "auto-locked at {t}",
	manual: "manually",
	slider_off: "Off",
	slider_levels: "Step {i} of {n}",
	slider_step: "{s} steps",
	select_no_options: "No options available",
	wx_now: "Now",
	btn_scene: "Scene",
	btn_script: "Script",
	btn_automation: "Automation",
	btn_button: "Button",
	btn_done: "Activated",
	scene_count: "{n}",
	cam_live: "Live",
	cam_still: "Still",
	cam_mic: "Microphone",
	cam_expand: "Expand",
	cam_snapshot: "Snapshot",
	cam_history: "History",
	cam_motion: "Motion",
	cam_no_motion: "No motion",
	cam_no_signal: "No video",
	cam_offline: "Offline",
	cam_offline_state: "Cannot connect",
	wx_today: "Today",
	wx_tomorrow: "Tomorrow",
	wx_high: "High",
	wx_low: "Low",
	wx_wind: "Wind",
	wx_precip: "Precipitation",
	"wx_clear-night": "Clear",
	wx_cloudy: "Cloudy",
	wx_exceptional: "Exceptional",
	wx_fog: "Fog",
	wx_hail: "Hail",
	wx_lightning: "Lightning",
	"wx_lightning-rainy": "Thunderstorms",
	wx_partlycloudy: "Partly cloudy",
	wx_pouring: "Pouring",
	wx_rainy: "Rain",
	wx_snowy: "Snow",
	"wx_snowy-rainy": "Sleet",
	wx_sunny: "Sunny",
	wx_windy: "Windy",
	"wx_windy-variant": "Windy",
	grp_title: "Group",
	grp_devices: "{n} devices",
	grp_running: "{n} active",
	grp_all_idle: "all idle",
	grp_tap_expand: "tap to expand",
	grp_empty: "No cards yet",
	sep_title: "Section",
	ed_entity: "Entity",
	ed_name: "Name",
	ed_icon: "Icon",
	ed_interactions: "Interactions",
	ed_tap_action: "Tap action",
	ed_hold_action: "Hold action",
	ed_double_tap_action: "Double-tap action",
	ed_advanced: "Advanced",
	ed_theme: "Appearance",
	ed_theme_auto: "Follow Home Assistant",
	ed_theme_light: "Light",
	ed_theme_dark: "Dark",
	ed_refraction: "Refraction",
	ed_refraction_auto: "Automatic",
	ed_refraction_on: "Always on",
	ed_refraction_off: "Off",
	ed_refraction_quality: "Refraction quality",
	ed_refraction_quality_auto: "Automatic (medium on Android)",
	ed_refraction_quality_high: "High quality",
	ed_refraction_quality_medium: "Medium quality",
	ed_glass_variant: "Glass material",
	ed_glass_variant_regular: "Regular (legible)",
	ed_glass_variant_clear: "Clear (background-first)",
	ed_language: "Language",
	ed_show_brightness: "Brightness",
	ed_show_color_temp: "Color temperature",
	ed_show_color: "Color",
	ed_presets: "Presets",
	ed_favorites: "Favorite colors",
	ed_show_fan_mode: "Fan mode",
	ed_show_fan_speed: "Suction control",
	ed_show_preset_mode: "Preset",
	ed_show_stats: "Battery and cleaned area",
	ed_show_locate: "Locate button",
	ed_show_clean_spot: "Spot-clean button",
	ed_show_icon: "Icon",
	ed_show_name: "Name",
	ed_show_state: "State",
	ed_color: "Badge color",
	ed_show_speed: "Speed control",
	ed_show_presets: "Presets",
	ed_show_oscillation: "Oscillation",
	ed_show_direction: "Direction",
	ed_show_swing_mode: "Swing",
	ed_design: "Card design",
	ed_design_classic: "Dial (existing)",
	ed_design_compact: "Compact slider",
	ed_hvac_modes: "Modes to show",
	ed_power_entity: "Power sensor",
	ed_graph: "Show graph",
	ed_value_in_caption: "Reading in the caption",
	ed_trend: "Show trend badge",
	ed_hours_to_show: "Hours to show",
	ed_decimals: "Decimal places",
	ed_accent: "Accent color",
	ed_secondary_entity: "Secondary entity",
	ed_secondary_label: "Secondary label",
	ed_icon_on: "Icon when on",
	ed_icon_off: "Icon when off",
	ed_label_on: "Label when on",
	ed_label_off: "Label when off",
	ed_buttons: "Action buttons",
	ed_style: "Style",
	ed_style_blind: "Blind",
	ed_style_curtain: "Curtain",
	ed_curtain: "Curtain type",
	ed_curtain_double: "Double",
	ed_curtain_single: "Single",
	ed_show_tilt: "Slat tilt",
	ed_show_volume: "Volume",
	ed_show_device: "Device name",
	ed_source_color: "Source color",
	ed_help_color: "Color code in #RRGGBB form",
	ed_help_presets: "List of entries with name plus brightness / color_temp_kelvin / rgb_color / scene",
	ed_help_buttons: "List of entries with name and service (domain.service)",
	ed_help_favorites: "Leave empty to hide the swatches",
	ed_help_style: "Derived from device_class when left empty",
	ed_help_hvac_modes: "Shows every mode the entity supports when left empty",
	ed_min: "Minimum",
	ed_max: "Maximum",
	ed_min_temp: "Minimum temperature",
	ed_max_temp: "Maximum temperature",
	ed_step: "Step",
	ed_unit: "Unit",
	ed_ticks: "Show tick marks",
	ed_show_range: "Show min and max",
	ed_scenes: "Scenes",
	ed_style_tiles: "Tiles",
	ed_style_segments: "Segments",
	ed_style_chips: "Chips",
	ed_style_plain: "Plain",
	ed_style_pill: "Pill",
	ed_style_header: "Header",
	ed_columns: "Columns",
	ed_title: "Heading",
	ed_show_count: "Show the count",
	ed_service_data: "Service data",
	ed_motion_entity: "Motion sensor",
	ed_show_actions: "Action row",
	ed_show_mic: "Microphone button",
	ed_mic_service: "Microphone service",
	ed_snapshot_service: "Snapshot service",
	ed_refresh_interval: "Refresh interval (s)",
	ed_aspect_ratio: "Aspect ratio",
	ed_help_scenes: "List of entries with entity plus name / icon / accent / service",
	ed_help_snapshot_service: "Opens the still in a new tab when left empty",
	ed_help_motion_entity: "Adds the motion chip when set",
	ed_cards: "Cards",
	ed_collapsible: "Collapsible",
	ed_collapsed: "Start collapsed",
	ed_summary: "Status chips when collapsed",
	ed_help_cards: "A list of card configs, each with its own type",
	ed_layout: "Layout",
	ed_layout_full: "Full",
	ed_layout_row: "Single row",
	ed_help_layout: "A single row matches a switch card's height and drops the forecast",
	ed_show_hourly: "Hourly forecast",
	ed_hourly_count: "Hours to show",
	ed_show_daily: "Daily forecast",
	ed_daily_count: "Days to show",
	ed_show_metrics: "Humidity, wind, precipitation",
	ed_subtitle: "Subtitle",
	ed_count: "Count",
	ed_custom_entity: "Reading and writing",
	ed_attribute: "Value attribute",
	ed_service: "Service to call",
	ed_service_key: "Value key",
	ed_help_value_in_caption: "Drops the large number into the caption line, matching a switch card's height",
	ed_help_ticks: "Drawn when the control has between 2 and 12 steps",
	ed_help_show_range: "Turning this off makes the card one row shorter",
	ed_help_attribute: "Reads the domain's usual place when left empty",
	ed_help_service: "domain.service; the domain default is used when left empty",
	ed_help_service_key: "Defaults to value",
	ed_help_subtitle: "Describes the current state when left empty"
}, o = Object.fromEntries(Object.entries({
	ja: {
		on: "オン",
		off: "オフ",
		lit: "点灯",
		unlit: "消灯",
		last: "前回",
		brightness: "明るさ",
		color_temp: "色温度",
		hue: "色相",
		saturation: "彩度",
		favorites: "お気に入り",
		color: "カラー",
		unavailable: "利用不可",
		target_temp: "設定温度",
		target_range: "設定範囲",
		room_temp: "室温",
		humidity: "湿度",
		heating: "暖房中",
		cooling: "冷房中",
		drying: "除湿中",
		fan_running: "送風中",
		idle: "待機中",
		mode_auto: "自動",
		mode_heat_cool: "自動",
		mode_cool: "冷房",
		mode_heat: "暖房",
		mode_dry: "除湿",
		mode_fan_only: "送風",
		mode_off: "オフ",
		fan_mode: "風量",
		fan_speed: "風量",
		fan_presets: "プリセット",
		fan_oscillation: "首振り",
		fan_direction: "風向",
		fan_forward: "正方向",
		fan_reverse: "逆方向",
		preset: "プリセット",
		swing_mode: "スイング",
		power: "消費電力",
		vacuum_cleaning: "清掃中",
		vacuum_docked: "充電台",
		vacuum_returning: "帰還中",
		vacuum_error: "エラー",
		vacuum_start: "清掃開始",
		vacuum_resume: "再開",
		vacuum_pause: "一時停止",
		vacuum_stop: "停止",
		vacuum_dock: "充電台へ戻る",
		vacuum_locate: "呼び出す",
		vacuum_spot: "スポット清掃",
		vacuum_fan_speed: "吸引力",
		vacuum_battery: "バッテリー",
		vacuum_area: "清掃面積",
		last_on: "最終オン",
		updated_ago: "{t}に更新",
		hours_24: "24時間",
		ago_24h: "24時間前",
		ago_12h: "12時間前",
		now: "現在",
		since: "{t}から",
		last_change: "最終変更 {t}",
		open: "開",
		closed: "閉",
		is_open: "開いています",
		is_closed: "閉じています",
		detected: "検知",
		detecting: "検知中",
		clear: "クリア",
		locked: "施錠",
		unlocked: "解錠",
		is_locked: "施錠中",
		is_unlocked: "解錠中",
		locking: "施錠中…",
		unlocking: "解錠中…",
		jammed: "要確認",
		jammed_state: "詰まりを検知 · ドアを確認",
		slide_to_unlock: "スライドして解錠",
		slide_to_lock: "スライドして施錠",
		cannot_operate: "操作できません",
		position: "開度",
		stopped: "停止中",
		opening: "開放中",
		closing: "閉鎖中",
		moving: "動作中",
		tilt: "スラットの傾き",
		not_playing: "再生していません",
		standby: "待機中",
		paused: "一時停止中",
		playing: "再生中",
		just_now: "たった今",
		minutes_ago: "{n}分前",
		hours_ago: "{n}時間前",
		days_ago: "{n}日前",
		seconds_ago: "{n}秒前",
		auto_locked_at: "{t} に自動施錠",
		manual: "手動",
		slider_off: "停止中",
		slider_levels: "{n}段階中 {i}",
		slider_step: "{s} 刻み",
		select_no_options: "選択肢がありません",
		wx_now: "今",
		btn_scene: "シーン",
		btn_script: "スクリプト",
		btn_automation: "オートメーション",
		btn_button: "ボタン",
		btn_done: "実行しました",
		scene_count: "{n}件",
		cam_live: "ライブ",
		cam_still: "静止画",
		cam_mic: "マイク",
		cam_expand: "拡大",
		cam_snapshot: "スナップショット",
		cam_history: "履歴",
		cam_motion: "動体検知",
		cam_no_motion: "検知なし",
		cam_no_signal: "映像を取得できません",
		cam_offline: "オフライン",
		cam_offline_state: "接続できません",
		wx_today: "今日",
		wx_tomorrow: "明日",
		wx_high: "最高",
		wx_low: "最低",
		wx_wind: "風速",
		wx_precip: "降水",
		"wx_clear-night": "晴れ",
		wx_cloudy: "くもり",
		wx_exceptional: "注意",
		wx_fog: "霧",
		wx_hail: "ひょう",
		wx_lightning: "雷",
		"wx_lightning-rainy": "雷雨",
		wx_partlycloudy: "晴れ時々くもり",
		wx_pouring: "大雨",
		wx_rainy: "雨",
		wx_snowy: "雪",
		"wx_snowy-rainy": "みぞれ",
		wx_sunny: "晴れ",
		wx_windy: "風が強い",
		"wx_windy-variant": "風が強い",
		grp_title: "グループ",
		grp_devices: "{n}台",
		grp_running: "{n}台が稼働中",
		grp_all_idle: "すべて停止中",
		grp_tap_expand: "タップで展開",
		grp_empty: "カードが登録されていません",
		sep_title: "セクション",
		ed_entity: "エンティティ",
		ed_name: "表示名",
		ed_icon: "アイコン",
		ed_interactions: "操作",
		ed_tap_action: "タップ操作",
		ed_hold_action: "長押し操作",
		ed_double_tap_action: "ダブルタップ操作",
		ed_advanced: "詳細設定",
		ed_theme: "配色",
		ed_theme_auto: "自動",
		ed_theme_light: "ライト",
		ed_theme_dark: "ダーク",
		ed_refraction: "屈折効果",
		ed_refraction_auto: "自動",
		ed_refraction_on: "常に有効",
		ed_refraction_off: "無効",
		ed_refraction_quality: "屈折品質",
		ed_refraction_quality_auto: "自動（Androidは中品質）",
		ed_refraction_quality_high: "高品質",
		ed_refraction_quality_medium: "中品質（軽量）",
		ed_glass_variant: "ガラス素材",
		ed_glass_variant_regular: "標準（読みやすさ優先）",
		ed_glass_variant_clear: "クリア（背景優先）",
		ed_language: "言語",
		ed_show_brightness: "明るさ",
		ed_show_color_temp: "色温度",
		ed_show_color: "カラー",
		ed_presets: "プリセット",
		ed_favorites: "お気に入りの色",
		ed_show_fan_mode: "風量",
		ed_show_fan_speed: "吸引力操作",
		ed_show_preset_mode: "プリセット",
		ed_show_stats: "バッテリーと清掃面積",
		ed_show_locate: "呼び出しボタン",
		ed_show_clean_spot: "スポット清掃ボタン",
		ed_show_icon: "アイコン",
		ed_show_name: "名前",
		ed_show_state: "状態",
		ed_color: "バッジの色",
		ed_show_speed: "風量操作",
		ed_show_presets: "プリセット",
		ed_show_oscillation: "首振り",
		ed_show_direction: "風向",
		ed_show_swing_mode: "スイング",
		ed_design: "カードデザイン",
		ed_design_classic: "ダイヤル（既存）",
		ed_design_compact: "コンパクトスライダー",
		ed_hvac_modes: "表示する運転モード",
		ed_power_entity: "消費電力センサー",
		ed_graph: "グラフを表示",
		ed_value_in_caption: "値をキャプションに表示",
		ed_trend: "トレンドバッジを表示",
		ed_hours_to_show: "表示する時間",
		ed_decimals: "小数点以下の桁数",
		ed_accent: "アクセントカラー",
		ed_secondary_entity: "サブ表示のエンティティ",
		ed_secondary_label: "サブ表示のラベル",
		ed_icon_on: "オン時のアイコン",
		ed_icon_off: "オフ時のアイコン",
		ed_label_on: "オン時のラベル",
		ed_label_off: "オフ時のラベル",
		ed_buttons: "アクションボタン",
		ed_style: "表示スタイル",
		ed_style_blind: "ブラインド",
		ed_style_curtain: "カーテン",
		ed_curtain: "カーテンの種類",
		ed_curtain_double: "両開き",
		ed_curtain_single: "片開き",
		ed_show_tilt: "スラットの傾き",
		ed_show_volume: "音量",
		ed_show_device: "デバイス名",
		ed_source_color: "再生元の色",
		ed_help_color: "#RRGGBB 形式の色コード",
		ed_help_presets: "name と、brightness / color_temp_kelvin / rgb_color / scene などを持つリスト",
		ed_help_buttons: "name と service（domain.service 形式）を持つリスト",
		ed_help_favorites: "空にすると色見本を非表示にします",
		ed_help_style: "省略時は device_class から判定します",
		ed_help_hvac_modes: "省略時はエンティティが対応するモードをすべて表示します",
		ed_min: "最小値",
		ed_max: "最大値",
		ed_min_temp: "最小温度",
		ed_max_temp: "最大温度",
		ed_step: "刻み幅",
		ed_unit: "単位",
		ed_ticks: "目盛りを表示",
		ed_show_range: "最小値と最大値を表示",
		ed_scenes: "シーン一覧",
		ed_style_tiles: "タイル",
		ed_style_segments: "セグメント",
		ed_style_chips: "チップ",
		ed_style_plain: "プレーン",
		ed_style_pill: "ピル",
		ed_style_header: "ヘッダー",
		ed_columns: "列数",
		ed_title: "見出し",
		ed_show_count: "件数を表示",
		ed_service_data: "サービスのデータ",
		ed_motion_entity: "動体センサー",
		ed_show_actions: "下部の操作列",
		ed_show_mic: "マイクボタン",
		ed_mic_service: "マイクのサービス",
		ed_snapshot_service: "スナップショットのサービス",
		ed_refresh_interval: "更新間隔（秒）",
		ed_aspect_ratio: "縦横比",
		ed_help_scenes: "entity と、name / icon / accent / service を持つリスト",
		ed_help_snapshot_service: "省略時は静止画を新しいタブで開きます",
		ed_help_motion_entity: "指定すると動体検知のチップを表示します",
		ed_cards: "カード一覧",
		ed_collapsible: "折りたたみ可能",
		ed_collapsed: "初期状態は折りたたみ",
		ed_summary: "折りたたみ時に状態チップを表示",
		ed_help_cards: "type と各カードの設定を持つリスト",
		ed_layout: "レイアウト",
		ed_layout_full: "通常",
		ed_layout_row: "1行",
		ed_help_layout: "1行にするとスイッチカードと同じ高さになり、予報は省かれます",
		ed_show_hourly: "時間ごとの予報",
		ed_hourly_count: "表示する時間数",
		ed_show_daily: "日ごとの予報",
		ed_daily_count: "表示する日数",
		ed_show_metrics: "湿度・風速・降水",
		ed_subtitle: "説明文",
		ed_count: "件数",
		ed_custom_entity: "エンティティの読み書き",
		ed_attribute: "値を読む属性",
		ed_service: "呼び出すサービス",
		ed_service_key: "値を渡すキー",
		ed_help_value_in_caption: "大きな数値をやめて説明文に入れます。スイッチカードと同じ高さになります",
		ed_help_ticks: "段階が2〜12のときに目盛りを引きます",
		ed_help_show_range: "外すとカードが1行分低くなります",
		ed_help_attribute: "省略時はドメインごとの既定の位置から読みます",
		ed_help_service: "domain.service 形式。省略時はドメインごとの既定を使います",
		ed_help_service_key: "省略時は value",
		ed_help_subtitle: "省略時は状態に応じた説明を自動表示します"
	},
	en: a
}).map(([e, t]) => [e, ((e, n) => {
	let r = t[e] ?? a[e] ?? e;
	if (n) for (let [e, t] of Object.entries(n)) r = r.replace(`{${e}}`, String(t));
	return r;
})]));
function s(e) {
	return o[(e ?? "en").toLowerCase().split("-")[0]] ?? o.en;
}
function c(e, t) {
	if (!e) return "";
	let n = Math.max(0, Date.now() - new Date(e).getTime()), r = Math.round(n / 1e3);
	if (r < 30) return t("just_now");
	if (r < 90) return t("seconds_ago", { n: r });
	let i = Math.round(r / 60);
	if (i < 60) return t("minutes_ago", { n: i });
	let a = Math.round(i / 60);
	return a < 48 ? t("hours_ago", { n: a }) : t("days_ago", { n: Math.round(a / 24) });
}
function l(e) {
	if (!e) return "";
	let t = new Date(e);
	return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
//#endregion
//#region src/utils.ts
var u = (e, t, n) => Math.min(n, Math.max(t, e));
function d(e, t, n = {}) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
function f(e, t) {
	t && d(e, "hass-more-info", { entityId: t });
}
function p(e, t) {
	return e?.attributes.friendly_name ?? t;
}
function m(e) {
	if (typeof e == "string") return e;
	let t = e === void 0 ? [] : Array.isArray(e) ? e : [e];
	if (t.length !== 0 && t.every((e) => e.type === "text")) return t.map((e) => e.type === "text" ? e.text : "").join(" ");
}
function h(e, t, n, r) {
	if (t && e?.formatEntityName) try {
		let r = e.formatEntityName(t, n);
		if (r?.trim()) return r;
	} catch {}
	return m(n) ?? p(t, r);
}
function g(e, t, n, r) {
	if (!t) return n;
	try {
		let n = e?.formatEntityState?.(t, r);
		if (n?.trim()) return n;
	} catch {}
	return n;
}
function _(e, t, n) {
	let r = e?.locale?.language ?? e?.language ?? "en";
	try {
		return new Intl.NumberFormat(r, {
			maximumFractionDigits: n ?? +!Number.isInteger(t),
			minimumFractionDigits: n ?? 0
		}).format(t);
	} catch {
		return String(t);
	}
}
function v(e, t, n) {
	let [r, i] = (t ?? "").split(".");
	return !r || !i ? !1 : (e?.callService(r, i, n), !0);
}
function y(e) {
	return !e || e.state === "unavailable" || e.state === "unknown";
}
function b(e, t) {
	return !!((e?.attributes.supported_features ?? 0) & t);
}
function x(e, t, n, r, i) {
	let a = [
		n,
		r,
		Object.keys(t?.states ?? {})
	], o = (t) => e.includes(t.split(".")[0]), s = (e) => {
		let n = t?.states[e];
		return !n || n.state !== "unavailable" && n.state !== "unknown";
	};
	if (i) for (let e of a) {
		let n = e?.find((e) => {
			let n = t?.states[e];
			return o(e) && s(e) && n !== void 0 && i(n);
		});
		if (n) return n;
	}
	for (let e of a) {
		let t = e?.find((e) => o(e) && s(e));
		if (t) return t;
	}
	return `${e[0]}.example`;
}
function S(e, t) {
	let n = t / 100, r = (e % 360 + 360) % 360 / 60, i = n * (1 - Math.abs(r % 2 - 1)), a;
	a = r < 1 ? [
		n,
		i,
		0
	] : r < 2 ? [
		i,
		n,
		0
	] : r < 3 ? [
		0,
		n,
		i
	] : r < 4 ? [
		0,
		i,
		n
	] : r < 5 ? [
		i,
		0,
		n
	] : [
		n,
		0,
		i
	];
	let o = 1 - n;
	return [
		Math.round((a[0] + o) * 255),
		Math.round((a[1] + o) * 255),
		Math.round((a[2] + o) * 255)
	];
}
function C(e) {
	return `#${e.slice(0, 3).map((e) => Math.round(u(e, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}
function w(e) {
	let t = /^#?([0-9a-f]{6})$/i.exec(e.trim());
	if (!t) return;
	let n = parseInt(t[1], 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function T(e, t = .45) {
	let n = w(e);
	return n ? C(n.map((e) => e + (255 - e) * t)) : e;
}
function E(e, t = .3) {
	let n = w(e);
	return n ? C(n.map((e) => e * (1 - t))) : e;
}
function D(e, t) {
	let n = w(e);
	return n ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${t})` : e;
}
//#endregion
//#region src/editor/schema.ts
var O = (e) => ({
	name: e,
	selector: { text: {} }
}), k = (e) => ({
	name: e,
	selector: { boolean: {} }
}), A = (e) => ({
	name: e,
	selector: { icon: {} }
}), j = (e) => ({
	name: e,
	selector: { object: {} }
}), M = (e) => ({
	name: "",
	type: "grid",
	schema: e
}), N = (e, t, n = !1) => ({
	name: e,
	required: n,
	selector: { entity: { domain: t } }
}), P = (e, t, n, r = 1) => ({
	name: e,
	selector: { number: {
		min: t,
		max: n,
		step: r,
		mode: "box"
	} }
}), F = (e, t, n = !1) => ({
	name: e,
	selector: { select: {
		options: t,
		multiple: n,
		mode: "dropdown"
	} }
});
function I(e) {
	return typeof e?.formatEntityName == "function" ? {
		name: "name",
		selector: { entity_name: {} },
		context: { entity: "entity" }
	} : O("name");
}
function L(e) {
	return {
		name: "",
		type: "expandable",
		title: e("ed_advanced"),
		icon: "mdi:tune",
		schema: [
			M([F("theme", [
				{
					value: "auto",
					label: e("ed_theme_auto")
				},
				{
					value: "light",
					label: e("ed_theme_light")
				},
				{
					value: "dark",
					label: e("ed_theme_dark")
				}
			]), F("refraction", [
				{
					value: "auto",
					label: e("ed_refraction_auto")
				},
				{
					value: "on",
					label: e("ed_refraction_on")
				},
				{
					value: "off",
					label: e("ed_refraction_off")
				}
			])]),
			F("refraction_quality", [
				{
					value: "auto",
					label: e("ed_refraction_quality_auto")
				},
				{
					value: "high",
					label: e("ed_refraction_quality_high")
				},
				{
					value: "medium",
					label: e("ed_refraction_quality_medium")
				}
			]),
			F("language", [{
				value: "ja",
				label: "日本語"
			}, {
				value: "en",
				label: "English"
			}]),
			F("glass_variant", [{
				value: "regular",
				label: e("ed_glass_variant_regular")
			}, {
				value: "clear",
				label: e("ed_glass_variant_clear")
			}])
		]
	};
}
function ee(e) {
	let t = (e) => ({
		name: e,
		selector: { ui_action: { actions: [
			"more-info",
			"toggle",
			"navigate",
			"url",
			"perform-action",
			"assist",
			"none"
		] } },
		context: { entity_id: "entity" }
	});
	return {
		name: "",
		type: "expandable",
		title: e("ed_interactions"),
		icon: "mdi:gesture-tap",
		schema: [
			t("tap_action"),
			t("hold_action"),
			t("double_tap_action")
		]
	};
}
function R(e) {
	return [ee(e), L(e)];
}
var z = [
	"auto",
	"heat_cool",
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
];
function B(e) {
	return (e ?? "").replace(/^custom:/, "").replace(/^liquid-glass-/, "").replace(/-card$/, "");
}
function V(t, i, a, o) {
	let s = B(t), c = (e) => [N("entity", e, !0), M([I(o), A("icon")])];
	switch (s) {
		case "light": return [
			...c("light"),
			M([
				k("show_brightness"),
				k("show_color_temp"),
				k("show_color")
			]),
			{
				name: "favorites",
				selector: { text: { multiple: !0 } }
			},
			j("presets"),
			...R(i)
		];
		case "vacuum": return [
			...c("vacuum"),
			M([k("show_fan_speed"), k("show_stats")]),
			M([k("show_locate"), k("show_clean_spot")]),
			...R(i)
		];
		case "fan": return [
			...c("fan"),
			M([k("show_speed"), k("show_presets")]),
			M([k("show_oscillation"), k("show_direction")]),
			...R(i)
		];
		case "climate": return [
			...c("climate"),
			F("design", [{
				value: "classic",
				label: i("ed_design_classic")
			}, {
				value: "compact",
				label: i("ed_design_compact")
			}]),
			...a?.design === "compact" || a?.design === "a" ? [k("show_fan_mode")] : [M([
				k("show_fan_mode"),
				k("show_preset_mode"),
				k("show_swing_mode")
			])],
			F("hvac_modes", z.map((e) => ({
				value: e,
				label: i(`mode_${e}`)
			})), !0),
			M([P("min_temp", -50, 100, .5), P("max_temp", -50, 100, .5)]),
			...R(i)
		];
		case "switch": return [
			...c([
				"switch",
				"input_boolean",
				"fan",
				"light",
				"automation",
				"humidifier",
				"siren",
				"remote"
			]),
			N("power_entity", "sensor"),
			...R(i)
		];
		case "sensor": {
			let e = a?.value_in_caption === !0;
			return [
				...c("sensor"),
				M(e ? [k("value_in_caption"), k("trend")] : [
					k("value_in_caption"),
					k("graph"),
					k("trend")
				]),
				M(e ? [P("decimals", 0, 4)] : [P("hours_to_show", 1, 168), P("decimals", 0, 4)]),
				O("accent"),
				M([N("secondary_entity", ["sensor", "binary_sensor"]), O("secondary_label")]),
				...R(i)
			];
		}
		case "binary-sensor": return [
			...c("binary_sensor"),
			M([A("icon_on"), A("icon_off")]),
			M([O("label_on"), O("label_off")]),
			O("accent"),
			...R(i)
		];
		case "entity-badge": return [
			...c([]),
			M([
				k("show_icon"),
				k("show_name"),
				k("show_state")
			]),
			O("color"),
			...R(i)
		];
		case "lock": return [
			...c("lock"),
			j("buttons"),
			...R(i)
		];
		case "cover": return [
			...c("cover"),
			M([F("style", [{
				value: "blind",
				label: i("ed_style_blind")
			}, {
				value: "curtain",
				label: i("ed_style_curtain")
			}]), F("curtain", [{
				value: "double",
				label: i("ed_curtain_double")
			}, {
				value: "single",
				label: i("ed_curtain_single")
			}])]),
			k("show_tilt"),
			...R(i)
		];
		case "media": return [
			...c("media_player"),
			M([k("show_volume"), k("show_device")]),
			O("source_color"),
			...R(i)
		];
		case "slider": return [
			...c(n),
			M([P("min", -1e3, 1e4, .1), P("max", -1e3, 1e4, .1)]),
			M([P("step", .01, 1e3, .01), O("unit")]),
			M([
				k("ticks"),
				k("show_range"),
				P("decimals", 0, 4)
			]),
			O("subtitle"),
			O("accent"),
			{
				name: "",
				type: "expandable",
				title: i("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [O("attribute"), M([O("service"), O("service_key")])]
			},
			...R(i)
		];
		case "select": return [
			...c(r),
			F("style", [{
				value: "segments",
				label: i("ed_style_segments")
			}, {
				value: "chips",
				label: i("ed_style_chips")
			}]),
			O("accent"),
			...R(i)
		];
		case "weather": {
			let e = a?.layout === "row", t = F("layout", [{
				value: "full",
				label: i("ed_layout_full")
			}, {
				value: "row",
				label: i("ed_layout_row")
			}]);
			return e ? [
				...c("weather"),
				t,
				...R(i)
			] : [
				...c("weather"),
				t,
				M([
					k("show_hourly"),
					k("show_daily"),
					k("show_metrics")
				]),
				M([P("hourly_count", 2, 12), P("daily_count", 1, 10)]),
				...R(i)
			];
		}
		case "button": return [
			...c(e),
			O("subtitle"),
			O("accent"),
			{
				name: "",
				type: "expandable",
				title: i("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [O("service"), j("service_data")]
			},
			...R(i)
		];
		case "scene": return [
			M([F("style", [{
				value: "tiles",
				label: i("ed_style_tiles")
			}, {
				value: "chips",
				label: i("ed_style_chips")
			}]), P("columns", 1, 6)]),
			M([O("title"), k("show_count")]),
			j("scenes"),
			...R(i)
		];
		case "group": return [
			M([O("title"), A("icon")]),
			O("subtitle"),
			M([
				k("collapsible"),
				k("collapsed"),
				k("summary")
			]),
			j("cards"),
			...R(i)
		];
		case "separator": {
			let e = a?.style ?? "pill";
			return [
				M([O("title"), A("icon")]),
				F("style", [
					{
						value: "plain",
						label: i("ed_style_plain")
					},
					{
						value: "pill",
						label: i("ed_style_pill")
					},
					{
						value: "header",
						label: i("ed_style_header")
					}
				]),
				...e === "header" ? [O("subtitle")] : [P("count", 0, 999)],
				...R(i)
			];
		}
		case "camera": return [
			...c("camera"),
			N("motion_entity", "binary_sensor"),
			M([k("show_actions"), k("show_mic")]),
			M([P("refresh_interval", 1, 300), P("aspect_ratio", .5, 3, .01)]),
			{
				name: "",
				type: "expandable",
				title: i("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [O("snapshot_service"), O("mic_service")]
			},
			...R(i)
		];
		default: return [
			N("entity", [], !0),
			M([I(o), A("icon")]),
			...R(i)
		];
	}
}
var te = /* @__PURE__ */ new Set(/* @__PURE__ */ "show_brightness.show_color_temp.show_color.show_fan_mode.show_fan_speed.show_preset_mode.show_stats.show_locate.show_icon.show_state.show_speed.show_presets.show_oscillation.show_direction.graph.trend.show_tilt.show_volume.show_device.show_range.show_hourly.show_daily.show_metrics.show_actions.collapsible.summary".split("."));
function ne(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => {
		for (let r of e) r.schema ? n(r.schema) : r.name && t.add(r.name);
	};
	return n(e), t;
}
var re = {
	presets: "ed_help_presets",
	buttons: "ed_help_buttons",
	favorites: "ed_help_favorites",
	accent: "ed_help_color",
	source_color: "ed_help_color",
	color: "ed_help_color",
	ticks: "ed_help_ticks",
	show_range: "ed_help_show_range",
	value_in_caption: "ed_help_value_in_caption",
	attribute: "ed_help_attribute",
	service: "ed_help_service",
	service_key: "ed_help_service_key",
	subtitle: "ed_help_subtitle",
	scenes: "ed_help_scenes",
	snapshot_service: "ed_help_snapshot_service",
	motion_entity: "ed_help_motion_entity",
	style: "ed_help_style",
	layout: "ed_help_layout",
	hvac_modes: "ed_help_hvac_modes",
	cards: "ed_help_cards"
}, H = class extends HTMLElement {
	constructor() {
		super(), this.computeLabel = (e) => this.t(`ed_${e.name}`), this.computeHelper = (e) => {
			let t = re[e.name];
			return t ? this.t(t) : void 0;
		}, this.valueChanged = (e) => {
			e.stopPropagation(), d(this, "config-changed", { config: this.fromForm(e.detail.value) });
		};
		let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
		t.textContent = ":host{display:block}", this.form = document.createElement("ha-form"), this.form.hidden = !0, this.form.addEventListener("value-changed", this.valueChanged), e.append(t, this.form);
	}
	get hass() {
		return this.hassValue;
	}
	set hass(e) {
		this.hassValue !== e && (this.hassValue = e, this.updateForm());
	}
	setConfig(e) {
		this.config = e, this.updateForm();
	}
	toForm(e) {
		let { refraction: t, theme: n, ...r } = e, a = { ...r };
		if (a.refraction = t === !0 ? "on" : t === !1 ? "off" : "auto", a.refraction_quality = r.refraction_quality ?? "auto", a.theme = n ?? "auto", a.glass_variant = r.glass_variant ?? "regular", B(e.type) === "weather" && (a.layout = r.layout ?? "full"), B(e.type) === "climate") {
			let e = r.design;
			a.design = e === "a" ? "compact" : e ?? "classic";
		}
		B(e.type) === "separator" && (a.style = r.style ?? "pill"), B(e.type) === "select" && (a.style = r.style ?? "segments");
		for (let t of ne(V(e.type, this.t, a, this.hassValue))) te.has(t) && (a[t] = B(e.type) === "climate" && a.design === "compact" && t === "show_fan_mode" ? r[t] === !0 : r[t] !== !1);
		if (B(e.type) === "light") {
			let e = r.favorites;
			a.favorites = e === !1 ? [] : e ?? i;
		}
		return a;
	}
	fromForm(e) {
		let t = { ...e }, n = B(t.type) === "climate" && (t.design === "compact" || t.design === "a"), r = this.config, a = r?.design === "compact" || r?.design === "a";
		r && n !== a && r.show_fan_mode === void 0 && delete t.show_fan_mode;
		for (let [e, r] of Object.entries(t)) if (typeof r == "boolean") {
			if (n && e === "show_fan_mode") {
				r === !1 && delete t[e];
				continue;
			}
			r === te.has(e) && delete t[e];
		}
		t.refraction === "on" ? t.refraction = !0 : t.refraction === "off" ? t.refraction = !1 : delete t.refraction, t.refraction_quality === "auto" && delete t.refraction_quality, t.theme === "auto" && delete t.theme, t.glass_variant === "regular" && delete t.glass_variant, t.layout === "full" && delete t.layout, t.design === "classic" && delete t.design, t.style === "pill" && B(t.type) === "separator" && delete t.style, t.style === "segments" && B(t.type) === "select" && delete t.style;
		let o = t.favorites;
		Array.isArray(o) && o.join() === i.join() && delete t.favorites;
		for (let [e, n] of Object.entries(t)) (n == null || n === "" || Array.isArray(n) && n.length === 0 && e !== "favorites") && delete t[e];
		return t;
	}
	get t() {
		return s(this.config?.language ?? this.hassValue?.locale?.language ?? this.hassValue?.language);
	}
	updateForm() {
		let e = this.hassValue, t = this.config;
		this.form.hidden = !e || !t, e && t && (this.form.hass = e, this.form.data = this.toForm(t), this.form.schema = V(t.type, this.t, t, e), this.form.computeLabel = this.computeLabel, this.form.computeHelper = this.computeHelper);
	}
};
customElements.get("liquid-glass-card-editor") || customElements.define("liquid-glass-card-editor", H);
//#endregion
//#region node_modules/preact/dist/preact.module.js
var ie, U, W, G, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge = {}, _e = [], ve = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ye = Array.isArray;
function be(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function xe(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
}
function Se(e, t, n) {
	var r, i, a, o = {};
	for (a in t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : o[a] = t[a];
	if (arguments.length > 2 && (o.children = arguments.length > 3 ? ie.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (a in e.defaultProps) o[a] === void 0 && (o[a] = e.defaultProps[a]);
	return Ce(e, o, r, i, null);
}
function Ce(e, t, n, r, i) {
	var a = {
		type: e,
		props: t,
		key: n,
		ref: r,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: i ?? ++W,
		__i: -1,
		__u: 0
	};
	return i == null && U.vnode != null && U.vnode(a), a;
}
function we() {
	return { current: null };
}
function K(e) {
	return e.children;
}
function Te(e, t) {
	this.props = e, this.context = t;
}
function Ee(e, t) {
	if (t == null) return e.__ ? Ee(e.__, e.__i + 1) : null;
	for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
	return typeof e.type == "function" ? Ee(e) : null;
}
function De(e) {
	if (e.__P && e.__d) {
		var t = e.__v, n = t.__e, r = [], i = [], a = be({}, t);
		a.__v = t.__v + 1, U.vnode && U.vnode(a), ze(e.__P, a, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n ?? Ee(t), !!(32 & t.__u), i), a.__v = t.__v, a.__.__k[a.__i] = a, Ve(r, a, i), t.__e = t.__ = null, a.__e != n && Oe(a);
	}
}
function Oe(e) {
	if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
		if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
	}), Oe(e);
}
function ke(e) {
	(!e.__d && (e.__d = !0) && G.push(e) && !Ae.__r++ || ae != U.debounceRendering) && ((ae = U.debounceRendering) || oe)(Ae);
}
function Ae() {
	try {
		for (var e, t = 1; G.length;) G.length > t && G.sort(se), e = G.shift(), t = G.length, De(e);
	} finally {
		G.length = Ae.__r = 0;
	}
}
function je(e, t, n, r, i, a, o, s, c, l, u) {
	var d, f, p, m, h, g, _ = r && r.__k || _e, v = t.length;
	for (c = Me(n, t, _, c, v), d = 0; d < v; d++) (p = n.__k[d]) != null && (f = p.__i != -1 && _[p.__i] || ge, p.__i = d, g = ze(e, p, f, i, a, o, s, c, l, u), m = p.__e, p.ref && f.ref != p.ref && (f.ref && We(f.ref, null, p), u.push(p.ref, p.__c || m, p)), h == null && m != null && (h = m), 4 & p.__u ? (c = Ne(p, c, e), f.__e && (f.__e = null)) : typeof p.type == "function" && g !== void 0 ? c = g : m && (c = m.nextSibling), p.__u &= -7);
	return n.__e = h, c;
}
function Me(e, t, n, r, i) {
	var a, o, s, c, l, u = n.length, d = u, f = 0;
	for (e.__k = Array(i), a = 0; a < i; a++) (o = t[a]) != null && typeof o != "boolean" && typeof o != "function" ? (typeof o == "string" || typeof o == "number" || typeof o == "bigint" || o.constructor == String ? o = e.__k[a] = Ce(null, o, null, null, null) : ye(o) ? o = e.__k[a] = Ce(K, { children: o }, null, null, null) : o.constructor === void 0 && o.__b > 0 ? o = e.__k[a] = Ce(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : e.__k[a] = o, c = a + f, o.__ = e, o.__b = e.__b + 1, s = null, (l = o.__i = Fe(o, n, c, d)) != -1 && (d--, (s = n[l]) && (s.__u |= 2)), s == null || s.__v == null ? (l == -1 && (i > u ? f-- : i < u && f++), typeof o.type != "function" && (o.__u |= 4)) : l != c && (l == c - 1 ? f-- : l == c + 1 ? f++ : (l > c ? f-- : f++, o.__u |= 4))) : e.__k[a] = null;
	if (d) for (a = 0; a < u; a++) (s = n[a]) != null && !(2 & s.__u) && (s.__e == r && (r = Ee(s)), Ge(s, s));
	return r;
}
function Ne(e, t, n) {
	var r, i;
	if (typeof e.type == "function") {
		for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = Ne(r[i], t, n));
		return t;
	}
	e.__e != t && (t && e.type && !t.parentNode && (t = Ee(e)), t = n.insertBefore(e.__e, t || null));
	do
		t = t && t.nextSibling;
	while (t != null && t.nodeType == 8);
	return t;
}
function Pe(e, t) {
	return t = t || [], e == null || typeof e == "boolean" || (ye(e) ? e.some(function(e) {
		Pe(e, t);
	}) : t.push(e)), t;
}
function Fe(e, t, n, r) {
	var i, a, o, s = e.key, c = e.type, l = t[n], u = l != null && !(2 & l.__u);
	if (l === null && s == null || u && s == l.key && c == l.type) return n;
	if (r > +!!u) {
		for (i = n - 1, a = n + 1; i >= 0 || a < t.length;) if ((l = t[o = i >= 0 ? i-- : a++]) != null && !(2 & l.__u) && s == l.key && c == l.type) return o;
	}
	return -1;
}
function Ie(e, t, n) {
	t[0] == "-" ? e.setProperty(t, n ?? "") : e[t] = n == null ? "" : typeof n != "number" || ve.test(t) ? n : n + "px";
}
function Le(e, t, n, r, i) {
	var a, o;
	n: if (t == "style") {
		if (typeof n == "string") e.style.cssText = n;
		else {
			if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || Ie(e.style, t, "");
			if (n) for (t in n) r && n[t] == r[t] || Ie(e.style, t, n[t]);
		}
	} else if (t[0] == "o" && t[1] == "n") a = t != (t = t.replace(de, "$1")), o = t.toLowerCase(), t = o in e || t == "onFocusOut" || t == "onFocusIn" ? o.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = n, n ? r ? n[ue] = r[ue] : (n[ue] = fe, e.addEventListener(t, a ? me : pe, a)) : e.removeEventListener(t, a ? me : pe, a);
	else {
		if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
		else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
			e[t] = n ?? "";
			break n;
		} catch {}
		typeof n == "function" || (n == null || !1 === n && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
	}
}
function Re(e) {
	return function(t) {
		if (this.l) {
			var n = this.l[t.type + e];
			if (t[le] == null) t[le] = fe++;
			else if (t[le] < n[ue]) return;
			return n(U.event ? U.event(t) : t);
		}
	};
}
function ze(e, t, n, r, i, a, o, s, c, l) {
	var u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = t.type;
	if (t.constructor !== void 0) return null;
	128 & n.__u && (c = !!(32 & n.__u), a = [s = t.__e = n.__e]), (u = U.__b) && u(t);
	n: if (typeof E == "function") {
		d = o.length;
		try {
			if (v = t.props, y = E.prototype && E.prototype.render, b = (u = E.contextType) && r[u.__c], x = u ? b ? b.props.value : u.__ : r, n.__c ? _ = (f = t.__c = n.__c).__ = f.__E : (y ? t.__c = f = new E(v, x) : (t.__c = f = new Te(v, x), f.constructor = E, f.render = Ke), b && b.sub(f), f.state || (f.state = {}), f.__n = r, p = f.__d = !0, f.__h = [], f._sb = []), y && f.__s == null && (f.__s = f.state), y && E.getDerivedStateFromProps != null && (f.__s == f.state && (f.__s = be({}, f.__s)), be(f.__s, E.getDerivedStateFromProps(v, f.__s))), m = f.props, h = f.state, f.__v = t, p) y && E.getDerivedStateFromProps == null && f.componentWillMount != null && f.componentWillMount(), y && f.componentDidMount != null && f.__h.push(f.componentDidMount);
			else {
				if (y && E.getDerivedStateFromProps == null && v !== m && f.componentWillReceiveProps != null && f.componentWillReceiveProps(v, x), t.__v == n.__v || !f.__e && f.shouldComponentUpdate != null && !1 === f.shouldComponentUpdate(v, f.__s, x)) {
					t.__v != n.__v && (f.props = v, f.state = f.__s, f.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(e) {
						e && (e.__ = t);
					}), _e.push.apply(f.__h, f._sb), f._sb = [], f.__h.length && o.push(f), s = Ee(n);
					break n;
				}
				f.componentWillUpdate != null && f.componentWillUpdate(v, f.__s, x), y && f.componentDidUpdate != null && f.__h.push(function() {
					f.componentDidUpdate(m, h, g);
				});
			}
			if (f.context = x, f.props = v, f.__P = e, f.__e = !1, S = U.__r, C = 0, y) f.state = f.__s, f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), _e.push.apply(f.__h, f._sb), f._sb = [];
			else do
				f.__d = !1, S && S(t), u = f.render(f.props, f.state, f.context), f.state = f.__s;
			while (f.__d && ++C < 25);
			f.state = f.__s, f.getChildContext != null && (r = be(be({}, r), f.getChildContext())), y && !p && f.getSnapshotBeforeUpdate != null && (g = f.getSnapshotBeforeUpdate(m, h)), w = u != null && u.type === K && u.key == null ? He(u.props.children) : u, s = je(e, ye(w) ? w : [w], t, n, r, i, a, o, s, c, l), f.base = t.__e, t.__u &= -161, f.__h.length && o.push(f), _ && (f.__E = f.__ = null);
		} catch (e) {
			if (o.length = d, t.__v = null, c || a != null) {
				if (e.then) {
					for (t.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling;) s = s.nextSibling;
					a != null && (a[a.indexOf(s)] = null), t.__e = s;
				} else if (a != null) for (T = a.length; T--;) xe(a[T]);
			} else t.__e = n.__e;
			t.__k ?? (t.__k = n.__k || []), e.then || Be(t), U.__e(e, t, n);
		}
	} else a == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = Ue(n.__e, t, n, r, i, a, o, c, l);
	return (u = U.diffed) && u(t), 128 & t.__u ? void 0 : s;
}
function Be(e) {
	e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Be));
}
function Ve(e, t, n) {
	for (var r = 0; r < n.length; r++) We(n[r], n[++r], n[++r]);
	U.__c && U.__c(t, e), e.some(function(t) {
		try {
			e = t.__h, t.__h = [], e.some(function(e) {
				e.call(t);
			});
		} catch (e) {
			U.__e(e, t.__v);
		}
	});
}
function He(e) {
	return typeof e != "object" || !e || e.__b > 0 ? e : ye(e) ? e.map(He) : e.constructor === void 0 ? be({}, e) : null;
}
function Ue(e, t, n, r, i, a, o, s, c) {
	var l, u, d, f, p, m, h, g = n.props || ge, _ = t.props, v = t.type;
	if (v == "svg" ? i = "http://www.w3.org/2000/svg" : v == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), a != null) {
		for (l = 0; l < a.length; l++) if ((p = a[l]) && "setAttribute" in p == !!v && (v ? p.localName == v : p.nodeType == 3)) {
			e = p, a[l] = null;
			break;
		}
	}
	if (e == null) {
		if (v == null) return document.createTextNode(_);
		e = document.createElementNS(i, v, _.is && _), s && (U.__m && U.__m(t, a), s = !1), a = null;
	}
	if (v == null) g === _ || s && e.data == _ || (e.data = _);
	else {
		if (a = v == "textarea" && _.defaultValue != null ? null : a && ie.call(e.childNodes), !s && a != null) for (g = {}, l = 0; l < e.attributes.length; l++) g[(p = e.attributes[l]).name] = p.value;
		for (l in g) p = g[l], l == "dangerouslySetInnerHTML" ? d = p : l == "children" || l in _ || l == "value" && "defaultValue" in _ || l == "checked" && "defaultChecked" in _ || Le(e, l, null, p, i);
		for (l in _) p = _[l], l == "children" ? f = p : l == "dangerouslySetInnerHTML" ? u = p : l == "value" ? m = p : l == "checked" ? h = p : s && typeof p != "function" || g[l] === p || Le(e, l, p, g[l], i);
		if (u) s || d && (u.__html == d.__html || u.__html == e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
		else if (d && (e.innerHTML = ""), je(t.type == "template" ? e.content : e, ye(f) ? f : [f], t, n, r, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, a, o, a ? a[0] : n.__k && Ee(n, 0), s, c), a != null) for (l = a.length; l--;) xe(a[l]);
		s && v != "textarea" || (l = "value", v == "progress" && m == null ? e.removeAttribute("value") : m != null && (m !== e[l] || v == "progress" && !m || v == "option" && m != g[l]) && Le(e, l, m, g[l], i), l = "checked", h != null && h != e[l] && Le(e, l, h, g[l], i));
	}
	return e;
}
function We(e, t, n) {
	try {
		if (typeof e == "function") {
			var r = typeof e.__u == "function";
			r && e.__u(), r && t == null || (e.__u = e(t));
		} else e.current = t;
	} catch (e) {
		U.__e(e, n);
	}
}
function Ge(e, t, n) {
	var r, i;
	if (U.unmount && U.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || We(r, null, t)), (r = e.__c) != null) {
		if (r.componentWillUnmount) try {
			r.componentWillUnmount();
		} catch (e) {
			U.__e(e, t);
		}
		r.base = r.__P = r.__n = null;
	}
	if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Ge(r[i], t, n || typeof e.type != "function");
	n || xe(e.__e), e.__c = e.__ = e.__e = void 0;
}
function Ke(e, t, n) {
	return this.constructor(e, n);
}
function qe(e, t, n) {
	var r, i, a, o;
	t == document && (t = document.documentElement), U.__ && U.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, a = [], o = [], ze(t, e = (!r && n || t).__k = Se(K, null, [e]), i || ge, ge, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? ie.call(t.childNodes) : null, a, !r && n ? n : i ? i.__e : t.firstChild, r, o), Ve(a, e, o), e.props.children = null;
}
function Je(e, t) {
	qe(e, t, Je);
}
function Ye(e, t, n) {
	var r, i, a, o, s = be({}, e.props);
	for (a in e.type && e.type.defaultProps && (o = e.type.defaultProps), t) a == "key" ? r = t[a] : a == "ref" ? i = t[a] : s[a] = t[a] === void 0 && o != null ? o[a] : t[a];
	return arguments.length > 2 && (s.children = arguments.length > 3 ? ie.call(arguments, 2) : n), Ce(e.type, s, r || e.key, i || e.ref, null);
}
function Xe(e) {
	function t(e) {
		var n, r;
		return this.getChildContext || (n = /* @__PURE__ */ new Set(), (r = {})[t.__c] = this, this.getChildContext = function() {
			return r;
		}, this.componentWillUnmount = function() {
			n = null;
		}, this.shouldComponentUpdate = function(e) {
			this.props.value != e.value && n.forEach(function(e) {
				e.__e = !0, ke(e);
			});
		}, this.sub = function(e) {
			n.add(e);
			var t = e.componentWillUnmount;
			e.componentWillUnmount = function() {
				n && n.delete(e), t && t.call(e);
			};
		}), e.children;
	}
	return t.__c = "__cC" + he++, t.__ = e, t.Provider = t.__l = (t.Consumer = function(e, t) {
		return e.children(t);
	}).contextType = t, t;
}
ie = _e.slice, U = { __e: function(e, t, n, r) {
	for (var i, a, o; t = t.__;) if ((i = t.__c) && !i.__) try {
		if ((a = i.constructor) && a.getDerivedStateFromError != null && (i.setState(a.getDerivedStateFromError(e)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), o = i.__d), o) return i.__E = i;
	} catch (t) {
		e = t;
	}
	throw e;
} }, W = 0, Te.prototype.setState = function(e, t) {
	var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = be({}, this.state);
	typeof e == "function" && (e = e(be({}, n), this.props)), e && be(n, e), e != null && this.__v && (t && this._sb.push(t), ke(this));
}, Te.prototype.forceUpdate = function(e) {
	this.__v && (this.__e = !0, e && this.__h.push(e), ke(this));
}, Te.prototype.render = K, G = [], oe = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, se = function(e, t) {
	return e.__v.__b - t.__v.__b;
}, Ae.__r = 0, ce = Math.random().toString(8), le = "__d" + ce, ue = "__a" + ce, de = /(PointerCapture)$|Capture$/i, fe = 0, pe = Re(!1), me = Re(!0), he = 0;
//#endregion
//#region node_modules/preact/hooks/dist/hooks.module.js
var Ze, Qe, $e, et, tt = 0, nt = [], rt = U, it = rt.__b, at = rt.__r, ot = rt.diffed, st = rt.__c, ct = rt.unmount, lt = rt.__;
function ut(e, t) {
	rt.__h && rt.__h(Qe, e, tt || t), tt = 0;
	var n = Qe.__H || (Qe.__H = {
		__: [],
		__h: []
	});
	return e >= n.__.length && n.__.push({}), n.__[e];
}
function q(e) {
	return tt = 1, dt(Tt, e);
}
function dt(e, t, n) {
	var r = ut(Ze++, 2);
	if (r.t = e, !r.__c && (r.__ = [n ? n(t) : Tt(void 0, t), function(e) {
		var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
		t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}));
	}], r.__c = Qe, !Qe.__f)) {
		var i = function(e, t, n) {
			if (!r.__c.__H) return !0;
			var i = !1, o = r.__c.props !== e;
			if (r.__c.__H.__.some(function(e) {
				if (e.__N) {
					i = !0;
					var t = e.__[0];
					e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (o = !0);
				}
			}), a) {
				var s = a.call(this, e, t, n);
				return i ? s || o : s;
			}
			return !i || o;
		};
		Qe.__f = !0;
		var a = Qe.shouldComponentUpdate, o = Qe.componentWillUpdate;
		Qe.componentWillUpdate = function(e, t, n) {
			if (this.__e) {
				var r = a;
				a = void 0, i(e, t, n), a = r;
			}
			o && o.call(this, e, t, n);
		}, Qe.shouldComponentUpdate = i;
	}
	return r.__N || r.__;
}
function J(e, t) {
	var n = ut(Ze++, 3);
	!rt.__s && wt(n.__H, t) && (n.__ = e, n.u = t, Qe.__H.__h.push(n));
}
function ft(e, t) {
	var n = ut(Ze++, 4);
	!rt.__s && wt(n.__H, t) && (n.__ = e, n.u = t, Qe.__h.push(n));
}
function Y(e) {
	return tt = 5, mt(function() {
		return { current: e };
	}, []);
}
function pt(e, t, n) {
	tt = 6, ft(function() {
		if (typeof e == "function") {
			var n = e(t());
			return function() {
				e(null), n && typeof n == "function" && n();
			};
		}
		if (e) return e.current = t(), function() {
			return e.current = null;
		};
	}, n == null ? n : n.concat(e));
}
function mt(e, t) {
	var n = ut(Ze++, 7);
	return wt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function ht(e, t) {
	return tt = 8, mt(function() {
		return e;
	}, t);
}
function gt(e) {
	var t = Qe.context[e.__c], n = ut(Ze++, 9);
	return n.c = e, t ? (n.__ ?? (n.__ = !0, t.sub(Qe)), t.props.value) : e.__;
}
function _t(e, t) {
	rt.useDebugValue && rt.useDebugValue(t ? t(e) : e);
}
function vt() {
	var e = ut(Ze++, 11);
	if (!e.__) {
		for (var t = Qe.__v; t !== null && !t.__m && t.__ !== null;) t = t.__;
		var n = t.__m || (t.__m = [0, 0]);
		e.__ = "P" + n[0] + "-" + n[1]++;
	}
	return e.__;
}
function yt() {
	for (var e; e = nt.shift();) {
		var t = e.__H;
		if (e.__P && t) try {
			t.__h.some(St), t.__h.some(Ct), t.__h = [];
		} catch (n) {
			t.__h = [], rt.__e(n, e.__v);
		}
	}
}
rt.__b = function(e) {
	Qe = null, it && it(e);
}, rt.__ = function(e, t) {
	e && t.__k && t.__k.__m && (e.__m = t.__k.__m), lt && lt(e, t);
}, rt.__r = function(e) {
	at && at(e), Ze = 0;
	var t = (Qe = e.__c).__H;
	t && ($e === Qe ? (t.__h = [], Qe.__h = [], t.__.some(function(e) {
		e.__N && (e.__ = e.__N), e.u = e.__N = void 0;
	})) : (t.__h.some(St), t.__h.some(Ct), t.__h = [], Ze = 0)), $e = Qe;
}, rt.diffed = function(e) {
	ot && ot(e);
	var t = e.__c;
	t && t.__H && (t.__H.__h.length && (nt.push(t) !== 1 && et === rt.requestAnimationFrame || ((et = rt.requestAnimationFrame) || xt)(yt)), t.__H.__.some(function(e) {
		e.u && (e.__H = e.u, e.u = void 0);
	})), $e = Qe = null;
}, rt.__c = function(e, t) {
	t.some(function(e) {
		try {
			e.__h.some(St), e.__h = e.__h.filter(function(e) {
				return !e.__ || Ct(e);
			});
		} catch (n) {
			t.some(function(e) {
				e.__h && (e.__h = []);
			}), t = [], rt.__e(n, e.__v);
		}
	}), st && st(e, t);
}, rt.unmount = function(e) {
	ct && ct(e);
	var t, n = e.__c;
	n && n.__H && (n.__H.__.some(function(e) {
		try {
			St(e);
		} catch (e) {
			t = e;
		}
	}), n.__H = void 0, t && rt.__e(t, n.__v));
};
var bt = typeof requestAnimationFrame == "function";
function xt(e) {
	var t, n = function() {
		clearTimeout(r), bt && cancelAnimationFrame(t), setTimeout(e);
	}, r = setTimeout(n, 35);
	bt && (t = requestAnimationFrame(n));
}
function St(e) {
	var t = Qe, n = e.__c;
	typeof n == "function" && (e.__c = void 0, n()), Qe = t;
}
function Ct(e) {
	var t = Qe;
	e.__c = e.__(), Qe = t;
}
function wt(e, t) {
	return !e || e.length !== t.length || t.some(function(t, n) {
		return t !== e[n];
	});
}
function Tt(e, t) {
	return typeof t == "function" ? t(e) : t;
}
//#endregion
//#region node_modules/preact/compat/dist/compat.module.js
function Et(e, t) {
	for (var n in t) e[n] = t[n];
	return e;
}
function Dt(e, t) {
	for (var n in e) if (n !== "__source" && !(n in t)) return !0;
	for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
	return !1;
}
function Ot(e, t) {
	var n = t(), r = q({ t: {
		__: n,
		u: t
	} }), i = r[0].t, a = r[1];
	return ft(function() {
		i.__ = n, i.u = t, kt(i) && a({ t: i });
	}, [
		e,
		n,
		t
	]), J(function() {
		return kt(i) && a({ t: i }), e(function() {
			kt(i) && a({ t: i });
		});
	}, [e]), n;
}
function kt(e) {
	try {
		return !((t = e.__) === (n = e.u()) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
	} catch {
		return !0;
	}
	var t, n;
}
function At(e) {
	e();
}
function jt(e) {
	return e;
}
function Mt() {
	return [!1, At];
}
var Nt = ft;
function Pt(e, t) {
	this.props = e, this.context = t;
}
function Ft(e, t) {
	function n(e) {
		var n = this.props.ref;
		return n != e.ref && n && (typeof n == "function" ? n(null) : n.current = null), t ? !t(this.props, e) || n != e.ref : Dt(this.props, e);
	}
	function r(t) {
		return this.shouldComponentUpdate = n, Se(e, t);
	}
	return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.__f = r.prototype.isReactComponent = !0, r.type = e, r;
}
(Pt.prototype = new Te()).isPureReactComponent = !0, Pt.prototype.shouldComponentUpdate = function(e, t) {
	return Dt(this.props, e) || Dt(this.state, t);
};
var It = U.__b;
U.__b = function(e) {
	e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), It && It(e);
};
var Lt = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Rt(e) {
	function t(t) {
		var n = Et({}, t);
		return delete n.ref, e(n, t.ref || null);
	}
	return t.$$typeof = Lt, t.render = e, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var zt = function(e, t) {
	return e == null ? null : Pe(Pe(e).map(t));
}, Bt = {
	map: zt,
	forEach: zt,
	count: function(e) {
		return e ? Pe(e).length : 0;
	},
	only: function(e) {
		var t = Pe(e);
		if (t.length !== 1) throw "Children.only";
		return t[0];
	},
	toArray: Pe
}, Vt = U.__e;
U.__e = function(e, t, n, r) {
	if (e.then) {
		for (var i, a = t; a = a.__;) if ((i = a.__c) && i.__c) return t.__e ?? (t.__e = n.__e, t.__k = n.__k || []), i.__c(e, t);
	}
	Vt(e, t, n, r);
};
var Ht = U.unmount;
function Ut(e, t, n) {
	return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(e) {
		typeof e.__c == "function" && e.__c();
	}), e.__c.__H = null), (e = Et({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(e) {
		return Ut(e, t, n);
	})), e;
}
function Wt(e, t, n) {
	return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(e) {
		return Wt(e, t, n);
	}), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Gt() {
	this.__u = 0, this.o = null, this.__b = null;
}
function Kt(e) {
	var t = e.__ && e.__.__c;
	return t && t.__a && t.__a(e);
}
function qt(e) {
	var t, n, r, i = null;
	function a(a) {
		if (t || (t = e()).then(function(e) {
			e && (i = e.default || e), r = !0;
		}, function(e) {
			n = e, r = !0;
		}), n) throw n;
		if (!r) throw t;
		return i ? Se(i, a) : null;
	}
	return a.displayName = "Lazy", a.__f = !0, a;
}
function Jt() {
	this.i = null, this.l = null;
}
U.unmount = function(e) {
	var t = e.__c;
	t && (t.__z = !0), t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Ht && Ht(e);
}, (Gt.prototype = new Te()).__c = function(e, t) {
	var n = t.__c, r = this;
	r.o ?? (r.o = []), r.o.push(n);
	var i = Kt(r.__v), a = !1, o = function() {
		a || r.__z || (a = !0, n.__R = null, i ? i(c) : c());
	};
	n.__R = o;
	var s = n.__P;
	n.__P = null;
	var c = function() {
		if (!--r.__u) {
			if (r.state.__a) {
				var e = r.state.__a;
				r.__v.__k[0] = Wt(e, e.__c.__P, e.__c.__O);
			}
			var t;
			for (r.setState({ __a: r.__b = null }); t = r.o.pop();) t.__P = s, t.forceUpdate();
		}
	};
	r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(o, o);
}, Gt.prototype.componentWillUnmount = function() {
	this.o = [];
}, Gt.prototype.render = function(e, t) {
	if (this.__b) {
		if (this.__v.__k) {
			var n = document.createElement("div"), r = this.__v.__k[0].__c;
			this.__v.__k[0] = Ut(this.__b, n, r.__O = r.__P);
		}
		this.__b = null;
	}
	var i = t.__a && Se(K, null, e.fallback);
	return i && (i.__u &= -33), [Se(K, null, t.__a ? null : e.children), i];
};
var Yt = function(e, t, n) {
	if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n;) {
		for (; n.length > 3;) n.pop()();
		if (n[1] < n[0]) break;
		e.i = n = n[2];
	}
};
function Xt(e) {
	return this.getChildContext = function() {
		return e.context;
	}, e.children;
}
function Zt(e) {
	var t = this, n = e.h;
	if (t.componentWillUnmount = function() {
		qe(null, t.v), t.v = null, t.h = null;
	}, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
		for (var r = t.__v; r !== null && !r.__m && r.__ !== null;) r = r.__;
		t.h = n, t.v = {
			nodeType: 1,
			parentNode: n,
			childNodes: [],
			__k: { __m: r.__m },
			contains: function() {
				return !0;
			},
			namespaceURI: n.namespaceURI,
			insertBefore: function(e, n) {
				this.childNodes.push(e), t.h.insertBefore(e, n);
			},
			removeChild: function(e) {
				this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.h.removeChild(e);
			}
		};
	}
	qe(Se(Xt, { context: t.context }, e.__v), t.v);
}
function Qt(e, t) {
	var n = Se(Zt, {
		__v: e,
		h: t
	});
	return n.containerInfo = t, n;
}
(Jt.prototype = new Te()).__a = function(e) {
	var t = this, n = Kt(t.__v), r = t.l.get(e);
	return r[0]++, function(i) {
		var a = function() {
			t.props.revealOrder ? (r.push(i), Yt(t, e, r)) : i();
		};
		n ? n(a) : a();
	};
}, Jt.prototype.render = function(e) {
	this.i = null, this.l = /* @__PURE__ */ new Map();
	var t = Pe(e.children);
	e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
	for (var n = t.length; n--;) this.l.set(t[n], this.i = [
		1,
		0,
		this.i
	]);
	return e.children;
}, Jt.prototype.componentDidUpdate = Jt.prototype.componentDidMount = function() {
	var e = this;
	this.l.forEach(function(t, n) {
		Yt(e, n, t);
	});
};
var $t = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, en = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, tn = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, nn = /[A-Z0-9]/g, rn = typeof document < "u", an = function(e) {
	return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function on(e, t, n) {
	return t.__k ?? (t.textContent = ""), qe(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function sn(e, t, n) {
	return Je(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
Te.prototype.isReactComponent = !0, [
	"componentWillMount",
	"componentWillReceiveProps",
	"componentWillUpdate"
].forEach(function(e) {
	Object.defineProperty(Te.prototype, e, {
		configurable: !0,
		get: function() {
			return this["UNSAFE_" + e];
		},
		set: function(t) {
			Object.defineProperty(this, e, {
				configurable: !0,
				writable: !0,
				value: t
			});
		}
	});
});
var cn = U.event;
U.event = function(e) {
	return cn && (e = cn(e)), e.persist = function() {}, e.isPropagationStopped = function() {
		return this.cancelBubble;
	}, e.isDefaultPrevented = function() {
		return this.defaultPrevented;
	}, e.nativeEvent = e;
};
var ln, un = {
	configurable: !0,
	get: function() {
		return this.class;
	}
}, dn = U.vnode;
U.vnode = function(e) {
	typeof e.type == "string" && function(e) {
		var t = e.props, n = e.type, r = {}, i = n.indexOf("-") == -1;
		for (var a in t) {
			var o = t[a];
			if (!(a === "value" && "defaultValue" in t && o == null || rn && a === "children" && n === "noscript" || a === "class" || a === "className")) {
				var s = a.toLowerCase();
				a === "defaultValue" && "value" in t && t.value == null ? a = "value" : a === "download" && !0 === o ? o = "" : s === "translate" && o === "no" ? o = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || n !== "input" && n !== "textarea" || an(t.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : tn.test(a) && (a = s) : s = a = "oninput" : i && en.test(a) ? a = a.replace(nn, "-$&").toLowerCase() : o === null && (o = void 0), s === "oninput" && r[a = s] && (a = "oninputCapture"), r[a] = o;
			}
		}
		n == "select" && (r.multiple && Array.isArray(r.value) && (r.value = Pe(t.children).forEach(function(e) {
			e.props.selected = r.value.indexOf(e.props.value) != -1;
		})), r.defaultValue != null && (r.value = Pe(t.children).forEach(function(e) {
			e.props.selected = r.multiple ? r.defaultValue.indexOf(e.props.value) != -1 : r.defaultValue == e.props.value;
		}))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", un)) : t.className && (r.class = r.className = t.className), e.props = r;
	}(e), e.$$typeof = $t, dn && dn(e);
};
var fn = U.__r;
U.__r = function(e) {
	fn && fn(e), ln = e.__c;
};
var pn = U.diffed;
U.diffed = function(e) {
	pn && pn(e);
	var t = e.props, n = e.__e;
	n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), ln = null;
};
var mn = { ReactCurrentDispatcher: { current: {
	readContext: function(e) {
		return ln.__n[e.__c].props.value;
	},
	useCallback: ht,
	useContext: gt,
	useDebugValue: _t,
	useDeferredValue: jt,
	useEffect: J,
	useId: vt,
	useImperativeHandle: pt,
	useInsertionEffect: Nt,
	useLayoutEffect: ft,
	useMemo: mt,
	useReducer: dt,
	useRef: Y,
	useState: q,
	useSyncExternalStore: Ot,
	useTransition: Mt
} } };
function hn(e) {
	return Se.bind(null, e);
}
function gn(e) {
	return !!e && e.$$typeof === $t;
}
function _n(e) {
	return gn(e) && e.type === K;
}
function vn(e) {
	return !!e && typeof e.displayName == "string" && e.displayName.indexOf("Memo(") == 0;
}
function yn(e) {
	return gn(e) ? Ye.apply(null, arguments) : e;
}
function bn(e) {
	return !!e.__k && (qe(null, e), !0);
}
function xn(e) {
	return e && (e.base || e.nodeType === 1 && e) || null;
}
var Sn = {
	useState: q,
	useId: vt,
	useReducer: dt,
	useEffect: J,
	useLayoutEffect: ft,
	useInsertionEffect: Nt,
	useTransition: Mt,
	useDeferredValue: jt,
	useSyncExternalStore: Ot,
	startTransition: At,
	useRef: Y,
	useImperativeHandle: pt,
	useMemo: mt,
	useCallback: ht,
	useContext: gt,
	useDebugValue: _t,
	version: "18.3.1",
	Children: Bt,
	render: on,
	hydrate: sn,
	unmountComponentAtNode: bn,
	createPortal: Qt,
	createElement: Se,
	createContext: Xe,
	createFactory: hn,
	cloneElement: yn,
	createRef: we,
	Fragment: K,
	isValidElement: gn,
	isElement: gn,
	isFragment: _n,
	isMemo: vn,
	findDOMNode: xn,
	Component: Te,
	PureComponent: Pt,
	memo: Ft,
	forwardRef: Rt,
	flushSync: function(e, t) {
		var n, r = U.debounceRendering;
		U.debounceRendering = function(e) {
			n = e;
		};
		try {
			var i = e(t);
			return n && n(), i;
		} finally {
			U.debounceRendering = r;
		}
	},
	unstable_batchedUpdates: function(e, t) {
		return e(t);
	},
	StrictMode: K,
	Suspense: Gt,
	SuspenseList: Jt,
	lazy: qt,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: mn
}, Cn = 0;
Array.isArray;
function X(e, t, n, r, i, a) {
	t || (t = {});
	var o, s, c = t;
	if ("ref" in c) for (s in c = {}, t) s == "ref" ? o = t[s] : c[s] = t[s];
	var l = {
		type: e,
		props: c,
		key: n,
		ref: o,
		__k: null,
		__: null,
		__b: 0,
		__e: null,
		__c: null,
		constructor: void 0,
		__v: --Cn,
		__i: -1,
		__u: 0,
		__source: i,
		__self: a
	};
	if (typeof e == "function" && (o = e.defaultProps)) for (s in o) c[s] === void 0 && (c[s] = o[s]);
	return U.vnode && U.vnode(l), l;
}
//#endregion
//#region node_modules/@samasante/liquid-glass/dist/index.js
var wn = {
	lensW: 95,
	lensH: 95,
	borderRadius: 95,
	mapSize: 512,
	clipToShape: !0,
	softEdge: !0,
	strength: .06,
	depth: .65,
	curvature: .6,
	splay: 0,
	dispersion: .5,
	bend: 0,
	bendWidth: .16,
	frost: .5,
	brightness: .1,
	specular: 1,
	sheenAngle: 45,
	sheenDark: !1,
	sheen: .3,
	sheenWidth: 3,
	sheenFalloff: 1.5,
	glow: .12,
	glowSpread: 1,
	glowFalloff: .5
}, Tn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", En = .22, Dn = Math.sqrt(Math.PI), On = (e) => Math.tanh(Dn * e), kn = (e, t) => t > 0 ? (e - Math.sqrt(e * e - t * t)) / t : 0, An = (e, t, n) => {
	let r = Math.max(.01, Math.min(e, Math.min(t, n) - 1)), i = (t * t + r * r) / (2 * r), a = (n * n + r * r) / (2 * r), o = kn(i, t), s = kn(a, n);
	return {
		Rx: i,
		Ry: a,
		scaleX: o > 0 ? .5 / o : 1,
		scaleY: s > 0 ? .5 / s : 1
	};
}, jn = (e, t, n) => {
	let r = Math.min(e, t * .999);
	return r / Math.sqrt(t * t - r * r) * n;
}, Mn = (e, t) => `${e} 0 0 0 ${.5 * (1 - e)}  0 ${t} 0 0 ${.5 * (1 - t)}  0 0 1 0 0  0 0 0 1 0`, Nn = /* @__PURE__ */ new Map(), Pn = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t)), a = Math.max(0, Math.min(Math.round(n), Math.min(r, i) / 2)), o = `rr\xB7${r}\xB7${i}\xB7${a}`, s = Nn.get(o);
	if (s) return {
		uri: s,
		key: o
	};
	let c = .5, l = Math.max(0, r - 2 * c), u = Math.max(0, i - 2 * c), d = Math.max(0, a - c), f = `<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 ${r} ${i}'><rect fill='black' rx='${d}' ry='${d}' x='${c}' y='${c}' width='${l}' height='${u}'/></svg>`, p = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(f)}`;
	return Nn.set(o, p), {
		uri: p,
		key: o
	};
}, Fn = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t));
	return Pn(r, i, Math.max(0, Math.min(Math.round(n), Math.floor(Math.min(r, i) / 2))));
}, In = (e) => (.5 + e) * 255 + .5 | 0, Ln = (e) => 127 * e + 128 + .5 | 0, Rn = (e) => {
	let t = null, n = null, r = null, i = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0, u = null;
	return {
		generate(d) {
			t || (t = document.createElement("canvas"), t.width = e, t.height = e, n = t.getContext("2d"), r = n.createImageData(e, e));
			let { lensHalfWidth: f, lensHalfHeight: p, borderRadius: m, depth: h, clipToShape: g, softEdge: _, sheenAngle: v = 45, glow: y = 0, glowSpread: b = 1, glowFalloff: x = 1.5, sheen: S = 0, sheenWidth: C = 3, sheenFalloff: w = 1.5, curvature: T = 0, splay: E = 0, bend: D = 0, bendWidth: O = .16 } = d, k = r.data, A = e >> 1, j = Math.min(m, Math.min(f, p)), M = Math.min(f, p), N = Math.min(h * M, M - 1), P = Math.max(0, f - N), F = Math.max(0, p - N), I = Math.max(0, Math.min(m, Math.min(P, F))), L = N > 0 ? Math.SQRT1_2 / N : 1e6, ee = y > 0 || S > 0, R = v * Math.PI / 180, z = Math.cos(R), B = Math.sin(R), V = C > 0 ? 1 / C : 0, te = 1 / Math.max(2, b * Math.min(f, p)), ne = 2 * f / e, re = 2 * p / e, H = 1 / f, ie = 1 / p, U = T > 0, W = T * Math.min(f, p), G = E > 0, ae = D > 0, oe = 1 / Math.max(2, O * Math.min(f, p)), se = (e, t) => e > 0 || t > 0 ? Math.sqrt(e * e + t * t) : 0;
			if (U && ((!u || Math.abs(W - a) > .5 || Math.abs(f - o) > 1 || Math.abs(p - s) > 1) && (u = An(W, f, p), a = W, o = f, s = p, l = !0), c !== A && (i = new Float32Array(A), c = A, l = !0), l)) {
				let e = i, t = u, n = t.Rx * t.Rx, r = t.Rx * .999;
				for (let i = 0; i < A; i += 1) {
					let a = -((i + .5) * ne - f), o = a < r ? a : r;
					e[i] = o / Math.sqrt(n - o * o) * t.scaleX;
				}
				l = !1;
			}
			let ce = U ? i : null, le = .5 * Math.min(f, p), ue = le > 0 ? 1 / le : 0, de = Math.SQRT1_2;
			for (let t = 0; t < A; t += 1) {
				let n = e - 1 - t, r = -((t + .5) * re - p), i = r - p + j, a = _ ? r - F + I : 0, o = U && ce ? jn(r, u.Ry, u.scaleY) : r * ie > 1 ? 1 : r * ie, s = r * ie > 1 ? 1 : r * ie, c = G ? Math.max(0, 1 - (p - r) * ue) : 0, l = t * e, d = n * e;
				for (let t = 0; t < A; t += 1) {
					let n = e - 1 - t, r = -((t + .5) * ne - f), u = r - f + j, p = se(u > 0 ? u : 0, i > 0 ? i : 0) + (u > i ? u > 0 ? 0 : u : i > 0 ? 0 : i) - j, m = (l + t) * 4, h = (l + n) * 4, v = (d + t) * 4, b = (d + n) * 4;
					if (g && p >= 0) {
						for (let e of [
							m,
							h,
							v,
							b
						]) k[e] = 128, k[e + 1] = 128, k[e + 2] = 128, k[e + 3] = 255;
						continue;
					}
					let C = ce ? ce[t] : r * H > 1 ? 1 : r * H, T = o;
					if (G) {
						let e = c * E, t = Math.max(0, 1 - (f - r) * ue) * E;
						if (e > .001 || t > .001) {
							let n = C, r = T;
							C = n * (1 - e), T = r * (1 - t);
							let i = Math.sqrt(n * n + r * r), a = Math.sqrt(C * C + T * T);
							if (a > .001) {
								let e = i / a;
								C *= e, T *= e;
							}
						}
					}
					let O = 1;
					if (_) {
						let e = r - P + I;
						O = .5 * (1 + On((se(e > 0 ? e : 0, a > 0 ? a : 0) + (e > a ? e > 0 ? 0 : e : a > 0 ? 0 : a) - I) * L));
					}
					let A = .5 * C * O, M = .5 * T * O;
					if (ae) {
						let e = p < 0 ? Math.max(0, 1 + p * oe) : 0;
						if (e > 0) {
							let t = Math.sqrt(C * C + T * T);
							if (t > 1e-4) {
								let n = 6.75 * e * e * (1 - e), r = .5 * D * n * O / t;
								A += C * r, M += T * r;
							}
						}
					}
					let N = 0, F = 0;
					if (ee) {
						let e = r * H > 1 ? 1 : r * H, t = Math.min(1, Math.abs(e * z + s * B) * de), n = Math.min(1, Math.abs(e * z - s * B) * de);
						if (S > 0) {
							let e = S * (p < 0 ? Math.max(0, 1 + p * V) : 0) ** +w;
							N += e * (.16 + .84 * t ** 1.6), F += e * (.16 + .84 * n ** 1.6);
						}
						if (y > 0) {
							let e = 1 - (p < 0 ? Math.min(1, -p * te) : 1), r = y * (e * e * (3 - 2 * e)) ** x * O;
							N += r * (.6 + .4 * t), F += r * (.6 + .4 * n);
						}
						N > 1 ? N = 1 : N < -1 && (N = -1), F > 1 ? F = 1 : F < -1 && (F = -1);
					}
					let R = In(A), re = In(-A), ie = In(M), U = In(-M), W = Ln(N), le = Ln(F);
					k[m] = R, k[m + 1] = ie, k[m + 2] = W, k[m + 3] = 255, k[h] = re, k[h + 1] = ie, k[h + 2] = le, k[h + 3] = 255, k[v] = R, k[v + 1] = U, k[v + 2] = le, k[v + 3] = 255, k[b] = re, k[b + 1] = U, k[b + 2] = W, k[b + 3] = 255;
				}
			}
			return n.putImageData(r, 0, 0), t.toDataURL();
		},
		dispose() {
			t && (t.width = 0, t.height = 0, t = null), n = null, r = null, i = null, u = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0;
		}
	};
}, zn = (e) => typeof e == "object" && !!e && "get" in e && "on" in e, Bn = (e) => zn(e) ? e.get() : e, Vn = class {
	constructor(e) {
		this.subscribers = [], this.current = e;
	}
	get() {
		return this.current;
	}
	set(e) {
		if (e !== this.current) {
			this.current = e;
			for (let t of this.subscribers.slice()) t(e);
		}
	}
	on(e, t) {
		return this.subscribers.push(t), () => {
			let e = this.subscribers.indexOf(t);
			e !== -1 && this.subscribers.splice(e, 1);
		};
	}
}, Z = (e) => new Vn(e), Hn = (e, t) => {
	let n = Z(t()), r = () => n.set(t());
	for (let t of e) t.on("change", r);
	return n;
}, Un = (e, t, n, r) => {
	let i = 3 * e, a = 3 * (n - e) - i, o = 1 - i - a, s = 3 * t, c = 3 * (r - t) - s, l = 1 - s - c, u = (e) => ((o * e + a) * e + i) * e, d = (e) => ((l * e + c) * e + s) * e, f = (e) => (3 * o * e + 2 * a) * e + i, p = (e) => {
		let t = e;
		for (let n = 0; n < 8; n += 1) {
			let n = u(t) - e;
			if (Math.abs(n) < 1e-6) return t;
			let r = f(t);
			if (Math.abs(r) < 1e-6) break;
			t -= n / r;
		}
		let n = 0, r = 1;
		for (t = e; n < r;) {
			let i = u(t);
			if (Math.abs(i - e) < 1e-6 || (i < e ? n = t : r = t, r - n < 1e-7)) break;
			t = (n + r) / 2;
		}
		return t;
	};
	return (e) => e <= 0 ? 0 : e >= 1 ? 1 : d(p(e));
}, Wn = Un(.34, 1.36, .42, 1), Gn = /* @__PURE__ */ new WeakMap(), Kn = (e, t, { duration: n = .3, ease: r = Wn, onComplete: i } = {}) => {
	Gn.get(e)?.stop();
	let a = e.get();
	if (a === t || n <= 0) return e.set(t), i?.(), { stop() {} };
	let o = n * 1e3, s = 0, c = 0, l = (n) => {
		c === 0 && (c = n);
		let u = (n - c) / o;
		if (u >= 1) {
			e.set(t), Gn.delete(e), i?.();
			return;
		}
		e.set(a + (t - a) * r(u)), s = requestAnimationFrame(l);
	};
	s = requestAnimationFrame(l);
	let u = { stop() {
		cancelAnimationFrame(s), Gn.delete(e);
	} };
	return Gn.set(e, u), u;
}, qn = "#version 300 es\nin vec2 a_pos;\nout vec2 v_uv;\nvoid main() {\n  // a_pos is a -1..1 fullscreen quad; v_uv is bottom-left-origin 0..1, which\n  // (with UNPACK_FLIP_Y on the textures) samples the source upright. The lens\n  // descriptor is supplied in this same bottom-left space by the component.\n  v_uv = a_pos * 0.5 + 0.5;\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}", Jn = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nvoid main() { o = texture(u_src, v_uv); }", Yn = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform vec2 u_step;\nvoid main() {\n  vec4 c = texture(u_src, v_uv) * 0.1857;\n  c += (texture(u_src, v_uv + u_step)       + texture(u_src, v_uv - u_step))       * 0.1671;\n  c += (texture(u_src, v_uv + 2.0 * u_step) + texture(u_src, v_uv - 2.0 * u_step)) * 0.1227;\n  c += (texture(u_src, v_uv + 3.0 * u_step) + texture(u_src, v_uv - 3.0 * u_step)) * 0.0768;\n  c += (texture(u_src, v_uv + 4.0 * u_step) + texture(u_src, v_uv - 4.0 * u_step)) * 0.0414;\n  o = c;\n}", Xn = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform sampler2D u_blur;\nuniform sampler2D u_disp;\nuniform vec2 u_origin;\nuniform vec2 u_size;\nuniform vec2 u_scale;\nuniform vec2 u_lenspx;   // lens box size in device px (for an aspect-correct SDF)\nuniform float u_radiuspx; // corner radius in device px\nuniform float u_dispersion;\nuniform float u_sheen;\nuniform float u_frost;    // 0 = sharp; >0 = blend toward the pre-blurred copy\nuniform float u_opacity;  // enter/exit fade (multiplies coverage)\nuniform float u_brightness; // white(>0)/black(<0) veil over the lens\n// Signed distance to a rounded rectangle (negative inside). Computed in pixel\n// space so the corner radius stays circular on non-square lenses. NB: the half-\n// extent arg must NOT be named `half` — that's a reserved word in GLSL ES and\n// Safari's (stricter) WebGL2 compiler rejects it, throwing at renderer init.\nfloat sdRoundRect(vec2 p, vec2 b, float r) {\n  vec2 q = abs(p) - b + r;\n  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;\n}\n// Source sample, blended toward the frosted (pre-blurred) copy by mixAmt. The\n// frost is what makes the glass read as liquid rather than a clear lens.\nvec3 frosted(vec2 p, float mixAmt) {\n  vec3 raw = texture(u_src, p).rgb;\n  return mixAmt > 0.0 ? mix(raw, texture(u_blur, p).rgb, mixAmt) : raw;\n}\nvoid main() {\n  vec2 lensUV = (v_uv - u_origin) / u_size;\n  // Rounded-rect coverage. The SDF is in device px and a true distance field\n  // (gradient ~1), so a fixed ~1px feather anti-aliases the edge without fwidth\n  // (derivatives are handled inconsistently across WebGL2 backends).\n  vec2 p = (lensUV - 0.5) * u_lenspx;\n  float sdf = sdRoundRect(p, u_lenspx * 0.5, min(u_radiuspx, min(u_lenspx.x, u_lenspx.y) * 0.5));\n  float coverage = (1.0 - smoothstep(-1.0, 1.0, sdf)) * u_opacity;\n  if (coverage <= 0.0) discard;\n  vec4 d = texture(u_disp, clamp(lensUV, 0.0, 1.0));\n  vec2 disp = (d.rg - 0.5) * u_scale;            // feDisplacementMap equivalent\n  // RGB split — red bent DISPERSION_SPREAD more than blue, green half that (keep\n  // in sync with DISPERSION_SPREAD in displacement.ts so DOM + WebGL match).\n  vec2 uvR = v_uv + disp * (1.0 + u_dispersion * 0.22);\n  vec2 uvG = v_uv + disp * (1.0 + u_dispersion * 0.11);\n  vec2 uvB = v_uv + disp;\n  vec3 lensCol = vec3(frosted(uvR, u_frost).r, frosted(uvG, u_frost).g, frosted(uvB, u_frost).b);\n  // Specular lift from B. The map encodes spec as B = 127·s + 128, so (B/255 − 0.5)\n  // = 0.498·s; this matches the DOM path's gain exactly (feColorMatrix 1× alpha\n  // then feComposite k2=specular → 0.498·specular·s). (NOT ×2 — that double-lifted it.)\n  lensCol += u_sheen * max(0.0, d.b - 0.5);\n  // Brightness veil (alpha-blend toward white/black, like the DOM path).\n  if (u_brightness > 0.0) lensCol = mix(lensCol, vec3(1.0), clamp(u_brightness, 0.0, 1.0));\n  else if (u_brightness < 0.0) lensCol = mix(lensCol, vec3(0.0), clamp(-u_brightness, 0.0, 1.0));\n  // Mix over the untouched backdrop by the coverage → an AA'd, frosted-clipping\n  // silhouette. Canvas stays fully opaque, so straight/premultiplied alpha is moot.\n  vec3 backdrop = texture(u_src, v_uv).rgb;\n  o = vec4(mix(backdrop, lensCol, coverage), 1.0);\n}", Zn = (e, t, n) => {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`glass-webgl shader: ${t}`);
	}
	return r;
}, Qn = (e, t, n) => {
	let r = e.createProgram(), i = Zn(e, e.VERTEX_SHADER, t), a = Zn(e, e.FRAGMENT_SHADER, n);
	if (e.attachShader(r, i), e.attachShader(r, a), e.bindAttribLocation(r, 0, "a_pos"), e.linkProgram(r), e.deleteShader(i), e.deleteShader(a), !e.getProgramParameter(r, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(r);
		throw e.deleteProgram(r), Error(`glass-webgl link: ${t}`);
	}
	return r;
}, $n = class {
	constructor(e) {
		this.dispCache = /* @__PURE__ */ new Map(), this.blurW = 0, this.blurH = 0, this.srcW = 0, this.srcH = 0, this.disposed = !1;
		let t = e.getContext("webgl2", {
			premultipliedAlpha: !1,
			alpha: !0,
			antialias: !1,
			preserveDrawingBuffer: !1
		});
		if (!t) throw Error("webgl2 unavailable");
		this.gl = t, this.blit = Qn(t, qn, Jn), this.lens = Qn(t, qn, Xn), this.blur = Qn(t, qn, Yn), this.quad = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quad), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), t.STATIC_DRAW);
		let n = () => {
			let e = t.createTexture();
			return t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), e;
		};
		this.srcTex = n(), this.dispTex = n(), this.blurTex = [n(), n()], this.fbo = [t.createFramebuffer(), t.createFramebuffer()], t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, !0), this.uBlitSrc = t.getUniformLocation(this.blit, "u_src"), this.uBlur = {
			src: t.getUniformLocation(this.blur, "u_src"),
			step: t.getUniformLocation(this.blur, "u_step")
		}, this.uLens = {
			src: t.getUniformLocation(this.lens, "u_src"),
			blur: t.getUniformLocation(this.lens, "u_blur"),
			disp: t.getUniformLocation(this.lens, "u_disp"),
			origin: t.getUniformLocation(this.lens, "u_origin"),
			size: t.getUniformLocation(this.lens, "u_size"),
			scale: t.getUniformLocation(this.lens, "u_scale"),
			lenspx: t.getUniformLocation(this.lens, "u_lenspx"),
			radiuspx: t.getUniformLocation(this.lens, "u_radiuspx"),
			dispersion: t.getUniformLocation(this.lens, "u_dispersion"),
			specular: t.getUniformLocation(this.lens, "u_sheen"),
			frost: t.getUniformLocation(this.lens, "u_frost"),
			opacity: t.getUniformLocation(this.lens, "u_opacity"),
			brightness: t.getUniformLocation(this.lens, "u_brightness")
		};
	}
	ensureBlurTargets(e, t) {
		if (e === this.blurW && t === this.blurH) return;
		let n = this.gl;
		for (let r = 0; r < 2; r += 1) n.bindTexture(n.TEXTURE_2D, this.blurTex[r]), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, e, t, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.bindFramebuffer(n.FRAMEBUFFER, this.fbo[r]), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, this.blurTex[r], 0);
		n.bindFramebuffer(n.FRAMEBUFFER, null), this.blurW = e, this.blurH = t;
	}
	renderFrost(e) {
		let t = this.gl;
		this.ensureBlurTargets(this.srcW, this.srcH), t.useProgram(this.blur), t.viewport(0, 0, this.srcW, this.srcH), t.activeTexture(t.TEXTURE0), t.uniform1i(this.uBlur.src, 0), t.bindFramebuffer(t.FRAMEBUFFER, this.fbo[0]), t.bindTexture(t.TEXTURE_2D, this.srcTex), t.uniform2f(this.uBlur.step, e / this.srcW, 0), t.drawArrays(t.TRIANGLE_STRIP, 0, 4), t.bindFramebuffer(t.FRAMEBUFFER, this.fbo[1]), t.bindTexture(t.TEXTURE_2D, this.blurTex[0]), t.uniform2f(this.uBlur.step, 0, e / this.srcH), t.drawArrays(t.TRIANGLE_STRIP, 0, 4), t.bindFramebuffer(t.FRAMEBUFFER, null);
	}
	setDisplacementMap(e) {
		if (this.disposed) return;
		let t = this.gl;
		t.bindTexture(t.TEXTURE_2D, this.dispTex), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
	}
	dispTexFor(e) {
		let t = this.gl, n = this.dispCache.get(e);
		return n || (n = t.createTexture(), t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e), this.dispCache.set(e, n)), n;
	}
	releaseDispMap(e) {
		let t = this.dispCache.get(e);
		t && (this.gl.deleteTexture(t), this.dispCache.delete(e));
	}
	resize(e, t) {
		let n = this.gl.canvas;
		(n.width !== e || n.height !== t) && (n.width = e, n.height = t);
	}
	uploadSource(e, t, n) {
		let r = this.gl;
		r.bindTexture(r.TEXTURE_2D, this.srcTex), t !== this.srcW || n !== this.srcH ? (r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, e), this.srcW = t, this.srcH = n) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, e);
	}
	render(e, t, n, r) {
		if (this.disposed || t === 0 || n === 0) return;
		let i = this.gl;
		this.uploadSource(e, t, n), i.bindBuffer(i.ARRAY_BUFFER, this.quad), i.enableVertexAttribArray(0), i.vertexAttribPointer(0, 2, i.FLOAT, !1, 0, 0), i.disable(i.BLEND);
		let a = r.reduce((e, t) => Math.max(e, t.blur), 0);
		a > 0 && this.renderFrost(a);
		let o = i.canvas.width, s = i.canvas.height;
		i.viewport(0, 0, o, s), i.useProgram(this.blit), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.srcTex), i.uniform1i(this.uBlitSrc, 0), i.drawArrays(i.TRIANGLE_STRIP, 0, 4), i.useProgram(this.lens), i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, this.srcTex), i.uniform1i(this.uLens.src, 0), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, this.dispTex), i.uniform1i(this.uLens.disp, 1), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, this.blurTex[1]), i.uniform1i(this.uLens.blur, 2);
		for (let e of r) {
			let t = e.opacity ?? 1;
			t <= 0 || (i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, e.dispMap ? this.dispTexFor(e.dispMap) : this.dispTex), i.uniform2f(this.uLens.origin, e.originX, e.originY), i.uniform2f(this.uLens.size, e.sizeX, e.sizeY), i.uniform2f(this.uLens.scale, e.scaleX, e.scaleY), i.uniform2f(this.uLens.lenspx, e.sizeX * o, e.sizeY * s), i.uniform1f(this.uLens.radiuspx, (e.cornerRadius ?? 0) * o), i.uniform1f(this.uLens.dispersion, e.dispersion), i.uniform1f(this.uLens.specular, e.specular), i.uniform1f(this.uLens.frost, e.blur > 0 ? Math.min(1, e.blur / 8) : 0), i.uniform1f(this.uLens.opacity, t), i.uniform1f(this.uLens.brightness, e.brightness ?? 0), i.drawArrays(i.TRIANGLE_STRIP, 0, 4));
		}
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = !0;
		let e = this.gl;
		e.deleteProgram(this.blit), e.deleteProgram(this.lens), e.deleteProgram(this.blur), e.deleteTexture(this.srcTex), e.deleteTexture(this.dispTex), this.dispCache.forEach((t) => e.deleteTexture(t)), this.dispCache.clear(), e.deleteTexture(this.blurTex[0]), e.deleteTexture(this.blurTex[1]), e.deleteFramebuffer(this.fbo[0]), e.deleteFramebuffer(this.fbo[1]), e.deleteBuffer(this.quad), e.getExtension("WEBGL_lose_context")?.loseContext();
	}
}, er = () => typeof window < "u" && window.devicePixelRatio || 1, tr = (e) => ({
	merged: {
		...wn,
		...e.lens
	},
	lensW: e.lensW,
	lensH: e.lensH,
	radius: e.borderRadius,
	x: e.x,
	y: e.y,
	scale: e.scale ?? 1,
	opacity: e.opacity ?? 1
}), nr = (e, t, n, r, i, a) => {
	let [o, s] = q(!1), c = Y(null), l = Y(null), u = r[0], d = Y(r);
	d.current = r;
	let f = r.some((e) => zn(e.x) || zn(e.y) || zn(e.lensW) || zn(e.lensH) || e.radius != null && zn(e.radius));
	ft(() => {
		let n = e.current, r = t.current;
		if (!n || !r) return;
		let a;
		try {
			a = new $n(n);
		} catch (e) {
			typeof console < "u" && console.warn("[liquid-glass] WebGL renderer unavailable, falling back:", e), s(!0);
			return;
		}
		c.current = a;
		let o = Math.min(er(), i), l = () => {
			let e = r.clientWidth, t = r.clientHeight;
			n.style.width = `${e}px`, n.style.height = `${t}px`, a.resize(Math.round(e * o), Math.round(t * o));
		};
		l();
		let u = new ResizeObserver(l);
		return u.observe(r), () => {
			u.disconnect(), a.dispose(), c.current = null;
		};
	}, [
		e,
		t,
		i
	]);
	let p = u.merged, m = Bn(u.lensW), h = Bn(u.lensH), g = u.radius == null ? Math.min(m, h) : Bn(u.radius);
	J(() => {
		if (!c.current) return;
		l.current || (l.current = Rn(p.mapSize));
		let e = l.current.generate({
			lensHalfWidth: m,
			lensHalfHeight: h,
			borderRadius: g,
			depth: p.depth,
			clipToShape: p.clipToShape,
			softEdge: p.softEdge,
			sheenAngle: p.sheenAngle,
			glow: p.glow,
			glowSpread: p.glowSpread,
			glowFalloff: p.glowFalloff,
			sheen: p.sheen,
			sheenWidth: p.sheenWidth,
			sheenFalloff: p.sheenFalloff,
			curvature: p.curvature,
			splay: p.splay,
			bend: p.bend,
			bendWidth: p.bendWidth
		}), t = !1, n = new Image();
		return n.onload = () => {
			t || c.current?.setDisplacementMap(n);
		}, n.src = e, () => {
			t = !0;
		};
	}, [JSON.stringify([
		p.mapSize,
		m,
		h,
		g,
		p.depth,
		p.clipToShape,
		p.softEdge,
		p.curvature,
		p.splay,
		p.glow,
		p.glowSpread,
		p.glowFalloff,
		p.sheen,
		p.sheenWidth,
		p.sheenFalloff,
		p.sheenAngle,
		p.bend,
		p.bendWidth
	]), o]);
	let _ = r.map((e) => {
		let t = e.merged, n = Bn(e.lensW), r = Bn(e.lensH), i = e.radius == null ? Math.min(n, r) : Bn(e.radius);
		return JSON.stringify([
			t.mapSize,
			n,
			r,
			i,
			t.depth,
			t.clipToShape,
			t.softEdge,
			t.curvature,
			t.splay,
			t.glow,
			t.glowSpread,
			t.glowFalloff,
			t.sheen,
			t.sheenWidth,
			t.sheenFalloff,
			t.sheenAngle,
			t.bend,
			t.bendWidth
		]);
	}), v = Y(_);
	v.current = _;
	let y = Y(/* @__PURE__ */ new Map());
	return J(() => {
		let e = l.current;
		if (!e) return;
		let t = new Set(v.current);
		y.current.forEach((e, n) => {
			t.has(n) || (y.current.delete(n), c.current?.releaseDispMap(e));
		});
		let n = v.current[0], i = [], a = /* @__PURE__ */ new Set();
		return r.forEach((t, r) => {
			let o = v.current[r];
			if (o === n || a.has(o) || y.current.has(o)) return;
			a.add(o);
			let s = t.merged, c = Bn(t.lensW), l = Bn(t.lensH), u = t.radius == null ? Math.min(c, l) : Bn(t.radius), d = e.generate({
				lensHalfWidth: c,
				lensHalfHeight: l,
				borderRadius: u,
				depth: s.depth,
				clipToShape: s.clipToShape,
				softEdge: s.softEdge,
				sheenAngle: s.sheenAngle,
				glow: s.glow,
				glowSpread: s.glowSpread,
				glowFalloff: s.glowFalloff,
				sheen: s.sheen,
				sheenWidth: s.sheenWidth,
				sheenFalloff: s.sheenFalloff,
				curvature: s.curvature,
				splay: s.splay,
				bend: s.bend,
				bendWidth: s.bendWidth
			}), f = !1, p = new Image();
			p.onload = () => {
				f || y.current.set(o, p);
			}, p.src = d, i.push(() => {
				f = !0;
			});
		}), () => i.forEach((e) => e());
	}, [_.join("|"), o]), J(() => () => {
		l.current?.dispose(), l.current = null;
	}, []), J(() => {
		if (o) return;
		let e = 0, r = 0, i = a, s = !!i && !f && typeof i.requestVideoFrameCallback == "function", l = () => {
			let a = c.current, o = t.current;
			if (!a || !o) return;
			let u = n();
			if (u && u.w > 0 && u.h > 0) {
				let e = o.clientWidth, t = o.clientHeight, n = Math.sqrt((e * e + t * t) / 2), r = v.current, i = d.current.map((i, a) => {
					let o = Bn(i.lensW), s = Bn(i.lensH), c = i.radius == null ? Math.min(o, s) : Bn(i.radius), l = Bn(i.x), u = Bn(i.y), d = o * i.scale, f = s * i.scale, p = a > 0 && r[a] !== r[0], m = p ? y.current.get(r[a]) : void 0, h = p && !m;
					return {
						originX: (l * e - d) / e,
						originY: 1 - (u * t + f) / t,
						sizeX: 2 * d / e,
						sizeY: 2 * f / t,
						scaleX: h ? 0 : (i.merged.scaleX ?? i.merged.strength) * n / e,
						scaleY: h ? 0 : (i.merged.scaleY ?? i.merged.strength) * n / t,
						dispersion: i.merged.dispersion,
						specular: i.merged.specular,
						blur: i.merged.frost,
						cornerRadius: c * i.scale / e,
						opacity: i.opacity,
						brightness: i.merged.brightness,
						dispMap: m
					};
				});
				a.render(u.source, u.w, u.h, i);
			}
			s ? r = i.requestVideoFrameCallback(l) : e = requestAnimationFrame(l);
		};
		return s ? r = i.requestVideoFrameCallback(l) : e = requestAnimationFrame(l), () => {
			cancelAnimationFrame(e), s && r && i.cancelVideoFrameCallback?.(r);
		};
	}, [
		o,
		n,
		t,
		a,
		f
	]), o;
}, rr = ({ src: e, draw: t, poster: n, loop: r = !0, muted: i = !0, autoPlay: a = !0, crossOrigin: o, paused: s, videoRef: c, lenses: l, width: u, height: d, lens: f, lensW: p = 90, lensH: m = 90, borderRadius: h, x: g = .5, y: _ = .5, maxDpr: v = 1.5, className: y, style: b, children: x }) => {
	let S = e != null, C = Y(null), w = Y(null), T = Y(null), [E, D] = q(null), O = Sn.useCallback((e) => {
		T.current = e, typeof c == "function" ? c(e) : c && (c.current = e);
	}, [c]), k = Y(null), A = Y(t);
	A.current = t;
	let j = Y(0);
	!S && !k.current && typeof document < "u" && (k.current = document.createElement("canvas"));
	let M = (l && l.length ? l.map((e) => ({
		lens: e.optics ? {
			...f,
			...e.optics
		} : f,
		lensW: e.w / 2,
		lensH: e.h / 2,
		borderRadius: e.radius,
		x: e.x,
		y: e.y,
		scale: e.scale,
		opacity: e.opacity
	})) : [{
		lens: f,
		lensW: p,
		lensH: m,
		borderRadius: h,
		x: g,
		y: _
	}]).map(tr);
	J(() => {
		S && D(T.current);
	}, [S]), J(() => {
		let e = T.current;
		S && e && s !== void 0 && (s ? e.pause() : e.play().catch(() => {}));
	}, [S, s]);
	let N = nr(w, C, Sn.useCallback(() => {
		if (S) {
			let e = T.current;
			return !e || e.readyState < 2 ? null : {
				source: e,
				w: e.videoWidth,
				h: e.videoHeight
			};
		}
		let e = k.current, t = C.current;
		if (!e || !t || !A.current) return null;
		let n = u ?? Math.round(t.clientWidth), r = d ?? Math.round(t.clientHeight);
		if (n === 0 || r === 0) return null;
		(e.width !== n || e.height !== r) && (e.width = n, e.height = r);
		let i = e.getContext("2d");
		return i ? (j.current === 0 && (j.current = performance.now()), A.current(i, performance.now() - j.current), {
			source: e,
			w: n,
			h: r
		}) : null;
	}, [
		S,
		u,
		d
	]), M, v, S ? E : null);
	return /* @__PURE__ */ X("div", {
		ref: C,
		className: y,
		style: {
			position: "relative",
			overflow: "hidden",
			...b
		},
		children: [
			S && /* @__PURE__ */ X("video", {
				ref: O,
				src: e,
				poster: n,
				loop: r,
				muted: i,
				autoPlay: a,
				playsInline: !0,
				crossOrigin: o,
				style: {
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					visibility: N ? "visible" : "hidden"
				}
			}),
			/* @__PURE__ */ X("canvas", {
				ref: w,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					display: N ? "none" : "block"
				}
			}),
			!S && N && /* @__PURE__ */ X("div", {
				style: {
					position: "absolute",
					inset: 0,
					display: "grid",
					placeItems: "center",
					color: "#888",
					font: "13px system-ui"
				},
				children: "WebGL unavailable"
			}),
			x != null && /* @__PURE__ */ X("div", {
				style: {
					position: "absolute",
					inset: 0
				},
				children: x
			})
		]
	});
}, ir = () => {
	let [e, t] = q(!1);
	return J(() => {
		if (typeof navigator > "u") return;
		let e = navigator.userAgent, n = navigator.userAgentData != null || /\b(?:Chrome|Chromium|Edg)\//.test(e) && !/\b(?:CriOS|EdgiOS|FxiOS|OPiOS)\b/.test(e) && !/iPhone|iPad|iPod/.test(e);
		t(n);
	}, []), e;
}, ar = {
	strength: .05,
	depth: .5,
	curvature: .3,
	bend: .45,
	bendWidth: .16,
	dispersion: .32,
	frost: 6,
	saturate: 1.15,
	sheen: .32,
	sheenWidth: 3,
	sheenFalloff: 1.5,
	glow: .1,
	glowSpread: 1,
	glowFalloff: .5,
	specular: 1,
	sheenAngle: 45,
	brightness: 0
}, or = ({ dispScale: e, dispersion: t, specular: n, hasSpecular: r, mapMatrix: i, width: a, height: o, mapUrl: s, feImageRef: c }) => {
	let l = i ? "scaledMap" : "map";
	return /* @__PURE__ */ X(K, { children: [
		/* @__PURE__ */ X("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ X("feImage", {
			ref: c,
			href: s || void 0,
			x: 0,
			y: 0,
			width: a,
			height: o,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ X("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		i && /* @__PURE__ */ X("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: i,
			result: "scaledMap"
		}),
		t > 0 ? /* @__PURE__ */ X(K, { children: [
			/* @__PURE__ */ X("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + En * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ X("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + En * .5 * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ X("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ X("feDisplacementMap", {
			in: "SourceGraphic",
			in2: l,
			scale: e,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		r && /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ X("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: n,
			k3: "1",
			k4: "0"
		})] })
	] });
}, sr = (e) => e == null ? void 0 : zn(e) ? Bn(e) : e, cr = ({ children: e, optics: t, radius: n, width: r, height: i, className: a, style: o, ...s }) => {
	let c = ir(), l = mt(() => ({
		...wn,
		...ar,
		...t
	}), [t]), u = vt().replace(/:/g, ""), d = Y(null), f = Y(null), p = Y(null), m = Y(null), h = Y(""), g = Y(0), [_, v] = q({
		w: 0,
		h: 0,
		r: 0,
		appliedR: void 0
	}), [y, b] = q(!1), x = _.w > 0 && _.h > 0, S = sr(n), C = sr(r), w = sr(i), T = o?.borderRadius != null, E = Y(!1);
	ft(() => {
		E.current = !1;
	}, [
		S,
		T,
		a
	]), ft(() => {
		let e = d.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect(), n = typeof getComputedStyle < "u", r = n ? getComputedStyle(e) : null, i = r && parseFloat(r.borderTopLeftRadius) || 0;
			if (r) {
				let e = r.position;
				b((t) => e === "static" || e === "relative" && t);
			}
			let a, o;
			if (S != null) a = S, o = S;
			else if (T || i > 0 && !E.current) a = i, o = void 0;
			else {
				let t = e.firstElementChild;
				for (; t && t.hasAttribute("data-lg-layer");) t = t.nextElementSibling;
				let r = t && n && parseFloat(getComputedStyle(t).borderTopLeftRadius) || 0;
				a = r, o = r, E.current = !0;
			}
			v((e) => e.w === t.width && e.h === t.height && e.r === a && e.appliedR === o ? e : {
				w: t.width,
				h: t.height,
				r: a,
				appliedR: o
			});
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), window.addEventListener("resize", t), () => {
			n.disconnect(), window.removeEventListener("resize", t);
		};
	}, [
		S,
		T,
		a
	]);
	let D = JSON.stringify([
		_.w,
		_.h,
		_.r,
		l.mapSize,
		l.clipToShape,
		l.softEdge,
		l.depth,
		l.curvature,
		l.splay,
		l.bend,
		l.bendWidth,
		l.sheen,
		l.sheenWidth,
		l.sheenFalloff,
		l.sheenAngle,
		l.glow,
		l.glowSpread,
		l.glowFalloff
	]), O = l.scaleX ?? l.strength, k = l.scaleY ?? l.strength, A = Math.max(O, k), j = A * (x ? Math.sqrt((_.w * _.w + _.h * _.h) / 2) : 0), M = x ? Math.ceil(j * (l.dispersion > 0 ? 1.2 : 1) * .5 + 28) : 0, N = A > 0 ? O / A : 1, P = A > 0 ? k / A : 1, F = N === 1 && P === 1 ? null : Mn(N, P), I = l.glow > 0 || l.sheen > 0;
	ft(() => {
		if (!x) return;
		let e = l.mapSize;
		(!m.current || m.current.size !== e) && (m.current?.gen.dispose(), m.current = {
			gen: Rn(e),
			size: e
		});
		let t = m.current.gen.generate({
			lensHalfWidth: _.w / 2,
			lensHalfHeight: _.h / 2,
			borderRadius: _.r,
			depth: l.depth,
			clipToShape: l.clipToShape,
			softEdge: l.softEdge,
			sheenAngle: l.sheenAngle,
			glow: l.glow,
			glowSpread: l.glowSpread,
			glowFalloff: l.glowFalloff,
			sheen: l.sheen,
			sheenWidth: l.sheenWidth,
			sheenFalloff: l.sheenFalloff,
			curvature: l.curvature,
			splay: l.splay,
			bend: l.bend,
			bendWidth: l.bendWidth
		});
		h.current = t, p.current?.setAttribute("href", t), L();
	}, [x, D]);
	let L = mt(() => () => {
		let e = d.current, t = f.current;
		if (!e) return;
		let n = Math.max(0, l.frost), r = l.saturate ?? 1, i = [n > 0 ? `blur(${n}px)` : "", r === 1 ? "" : `saturate(${r})`].filter(Boolean).join(" "), a = i || "none";
		c && t && h.current && (g.current += 1, t.id = `lg-mat-${u}-v${g.current}`, a = `${i ? i + " " : ""}url(#${t.id})`), e.style.backdropFilter = a, e.style.setProperty("-webkit-backdrop-filter", a);
	}, [
		l.frost,
		l.saturate,
		c,
		u
	]);
	J(() => {
		x && L();
	}, [
		x,
		L,
		l.dispersion,
		l.strength,
		l.scaleX,
		l.scaleY,
		l.specular
	]), J(() => () => {
		m.current?.gen.dispose(), m.current = null;
	}, []);
	let ee = Y(!1);
	J(() => {
		if (ee.current || !x || typeof getComputedStyle > "u" || typeof document > "u") return;
		let e = d.current;
		if (!e) return;
		let t = getComputedStyle(e).backgroundColor, n = !1;
		try {
			let e = document.createElement("canvas");
			e.width = e.height = 1;
			let r = e.getContext("2d");
			r && (r.clearRect(0, 0, 1, 1), r.fillStyle = t, r.fillRect(0, 0, 1, 1), n = r.getImageData(0, 0, 1, 1).data[3] === 255);
		} catch {
			n = !1;
		}
		n && typeof console < "u" && (console.warn("[liquid-glass] <Glass>: the wrapper's background is fully opaque, so it hides the refraction (no glass shows through). Give it an alpha (e.g. `bg-red-400/40` / `rgba(...,0.4)`). (An opaque `background-image` — a solid gradient or photo — hides it the same way.)"), ee.current = !0);
	}, [x]);
	let R = mt(() => {
		let e = Math.max(0, Math.min(1.5, l.specular));
		return [`inset 0 1px 0 rgba(255,255,255,${(.55 * e).toFixed(3)})`, `inset 0 0 0 1px rgba(255,255,255,${(.12 * e).toFixed(3)})`].join(", ");
	}, [l.specular]), z = o?.position, B = z != null && z !== "static" && z !== "unset" && z !== "initial" ? z : y ? "relative" : void 0, V = l.brightness === 0 ? null : /* @__PURE__ */ X("div", {
		"aria-hidden": !0,
		"data-lg-layer": "",
		style: {
			position: "absolute",
			inset: 0,
			pointerEvents: "none",
			borderRadius: "inherit",
			background: l.brightness > 0 ? "#fff" : "#000",
			opacity: Math.min(1, Math.abs(l.brightness))
		}
	});
	return /* @__PURE__ */ X("div", {
		ref: d,
		"data-liquid-glass": "material",
		className: a,
		style: {
			display: "inline-block",
			...o,
			...B == null ? null : { position: B },
			...C == null ? null : { width: C },
			...w == null ? null : { height: w },
			..._.appliedR == null ? null : { borderRadius: _.appliedR }
		},
		...s,
		children: [
			V,
			e,
			/* @__PURE__ */ X("div", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					borderRadius: "inherit",
					boxShadow: R
				}
			}),
			/* @__PURE__ */ X("svg", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				width: 0,
				height: 0,
				style: {
					position: "absolute",
					width: 0,
					height: 0
				},
				children: /* @__PURE__ */ X("defs", { children: /* @__PURE__ */ X("filter", {
					ref: f,
					id: `lg-mat-${u}-v0`,
					filterUnits: "userSpaceOnUse",
					primitiveUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					x: -M,
					y: -M,
					width: _.w + 2 * M,
					height: _.h + 2 * M,
					children: x && /* @__PURE__ */ X(or, {
						dispScale: j,
						dispersion: l.dispersion,
						specular: l.specular,
						hasSpecular: I,
						mapMatrix: F,
						width: _.w,
						height: _.h,
						mapUrl: h.current || "",
						feImageRef: p
					})
				}) })
			})
		]
	});
}, lr = () => {
	let [e, t] = q(!1);
	return J(() => {
		t(typeof navigator < "u" && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent));
	}, []), e;
}, ur = ({ lens: e, mapHref: t, feImageRef: n, mapMatrixRef: r, blurStdDeviation: i, specularFromRawMap: a, brightnessInFilter: o, filterW: s, filterH: c, clipShapeRef: l }) => {
	let u = e.scaleX ?? e.strength, d = e.scaleY ?? e.strength, f = Math.max(u, d), p = f * (s && c ? Math.sqrt((s * s + c * c) / 2) : 1), m = f > 0 ? u / f : 0, h = f > 0 ? d / f : 0, g = m !== 1 || h !== 1, _ = g ? "scaledMap" : "map", v = e.frost > 0 && !!i, y = v ? "blurred" : "SourceGraphic", b = e.glow > 0 || e.sheen > 0, x = e.specular, S = o && e.brightness !== 0, C = v || S;
	return /* @__PURE__ */ X(K, { children: [
		/* @__PURE__ */ X("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ X("feImage", {
			ref: n,
			"data-lens": "",
			href: t,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ X("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		g && /* @__PURE__ */ X("feColorMatrix", {
			ref: r,
			in: "map",
			type: "matrix",
			values: Mn(m, h),
			result: "scaledMap"
		}),
		v && /* @__PURE__ */ X("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: i,
			result: "blurred"
		}),
		C && /* @__PURE__ */ X("feImage", {
			ref: l,
			"data-lens": "",
			href: Tn,
			preserveAspectRatio: "none",
			result: "lensShape"
		}),
		e.dispersion > 0 ? /* @__PURE__ */ X(K, { children: [
			/* @__PURE__ */ X("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 + En * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ X("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ X("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 - En * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ X("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ X("feDisplacementMap", {
			"data-lens": "",
			in: y,
			in2: _,
			scale: p,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		b && (e.sheenDark ? /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 0 0 1`,
			result: "sheenMask"
		}), /* @__PURE__ */ X("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "1",
			k2: "0",
			k3: "0",
			k4: "0",
			result: "lensOut"
		})] }) : /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ X("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: x,
			k3: "1",
			k4: "0",
			result: "lensOut"
		})] })),
		S && /* @__PURE__ */ X(K, { children: [
			/* @__PURE__ */ X("feFlood", {
				"data-lens": "",
				floodColor: e.brightness > 0 ? "white" : "black",
				floodOpacity: Math.abs(e.brightness),
				result: "brightnessFlood"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "brightnessFlood",
				in2: "lensShape",
				operator: "in",
				result: "brightnessVeil"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "brightnessVeil",
				in2: "lensOut",
				operator: "over",
				result: "lensOut"
			})
		] }),
		C ? /* @__PURE__ */ X(K, { children: [
			/* @__PURE__ */ X("feComposite", {
				in: "lensOut",
				in2: "lensShape",
				operator: "in",
				result: "lensOut"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "SourceGraphic",
				in2: "lensShape",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] }) : /* @__PURE__ */ X(K, { children: [
			/* @__PURE__ */ X("feFlood", {
				"data-lens": "",
				floodColor: "black",
				floodOpacity: "1",
				result: "lensMask"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "SourceGraphic",
				in2: "lensMask",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ X("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] })
	] });
}, dr = ({ children: e, lens: t, x: n = .5, y: r = .5, lensW: i, lensH: a, borderRadius: o, refractionTarget: s, refractionBackground: c = "transparent", overlay: l, tintColor: u, tintOpacity: d, tintBlur: f, shadowOpacity: p, restShadowOpacity: m, edgeBias: h, depth: g, scale: _, filterResolution: v = 1, brightnessInFilter: y = !1, pixelUnits: b = !1, live: x = !1, onLensMapChange: S, className: C, style: w, ...T }) => {
	let E = lr(), D = Y(E);
	D.current = E;
	let O = Y(y);
	O.current = y;
	let k = Y(b);
	k.current = b;
	let A = Y(x);
	A.current = x;
	let j = Y(v);
	j.current = v;
	let M = mt(() => ({
		...wn,
		...t
	}), [t]), N = Y(M);
	N.current = M;
	let P = vt().replace(/:/g, ""), F = Y(null), I = Y(null), L = Y(null), ee = Y(null), R = Y(null), z = Y(null), B = Y(null), V = Y(null), te = Y(null), ne = Y(null), re = Y(null), H = Y(null), ie = Y(null), U = Y([]), W = Y([]), [G, ae] = q({
		w: 0,
		h: 0
	}), oe = Y(G);
	oe.current = G;
	let se = G.w > 0 && G.h > 0, ce = s != null, [le, ue] = q(null);
	ft(() => {
		if (!ce || c !== "transparent") {
			ue(null);
			return;
		}
		if (typeof window > "u") return;
		let e = F.current?.parentElement ?? null, t = null;
		for (; e;) {
			let n = getComputedStyle(e).backgroundColor, r = n.match(/rgba?\(([^)]+)\)/)?.[1].split(",");
			if ((r && r[3] != null ? parseFloat(r[3]) : 1) > .95) {
				t = n;
				break;
			}
			e = e.parentElement;
		}
		ue(t);
	}, [ce, c]);
	let de = c === "transparent" ? le ?? "transparent" : c, fe = Y(.5), pe = Y(.5), me = Y(M.lensW), he = Y(M.lensH), ge = Y(M.borderRadius), _e = Y(i !== void 0);
	_e.current = i !== void 0;
	let ve = Y(a !== void 0);
	ve.current = a !== void 0;
	let ye = Y(o !== void 0);
	ye.current = o !== void 0;
	let be = Y(0), xe = Y(M.depth), Se = Y(M.scaleX ?? M.strength), Ce = Y(M.scaleY ?? M.strength), we = Y(1), K = Y(0), Te = Y(1), Ee = Y(0), De = Y(.5), Oe = Y(NaN), ke = Y(NaN), Ae = Y(NaN), je = Y(1), Me = Y(0), Ne = Y(""), Pe = Y(!1), Fe = Y(null), Ie = Y(null), Le = Y(null), Re = Y(u);
	Re.current = u;
	let ze = Y(S);
	ze.current = S;
	let Be = G.w > 0 && G.h > 0 ? Math.sqrt((G.w * G.w + G.h * G.h) / 2) : 0, Ve = Math.max(M.scaleX ?? M.strength, M.scaleY ?? M.strength);
	if (Be > 0) {
		let e = typeof i == "number" ? i * 2 : G.w, t = typeof a == "number" ? a * 2 : G.h, n = 1 + En * M.dispersion;
		Ve = Math.min(Ve, Math.max(e, t) * .6 / (Be * n));
	}
	let He = b && s != null && G.w > 0 && G.h > 0 ? Math.ceil(Ve * Be * (1 + En * M.dispersion) * .5 + M.depth + 28) + 16 : 0, Ue = Y(He);
	Ue.current = He, ft(() => {
		let e = F.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect();
			if (!ye.current && typeof getComputedStyle < "u") {
				let t = parseFloat(getComputedStyle(e).borderTopLeftRadius) || 0, n = I.current?.firstElementChild;
				!t && n && (t = parseFloat(getComputedStyle(n).borderTopLeftRadius) || 0), be.current = t;
			}
			ae((e) => e.w === t.width && e.h === t.height ? e : {
				w: t.width,
				h: t.height
			});
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), window.addEventListener("resize", t), () => {
			n.disconnect(), window.removeEventListener("resize", t);
		};
	}, []);
	let We = ht(() => {
		let e = F.current;
		if (!e) return;
		let t = oe.current.w, n = oe.current.h;
		if (!(t > 0 && n > 0)) {
			let r = e.getBoundingClientRect();
			t = r.width, n = r.height;
		}
		if (!(t > 0 && n > 0)) return;
		let r = N.current, i = Se.current, a = Ce.current, o = Math.max(i, a), s = r.dispersion, c = _e.current ? me.current : t / 2, l = ve.current ? he.current : n / 2, u = ye.current ? ge.current : be.current, d = fe.current * t, f = pe.current * n;
		k.current && L.current && (d = Math.max(c, Math.min(t - c, d)), f = Math.max(l, Math.min(n - l, f)));
		let p = d - c, m = f - l, h = 2 * c, g = 2 * l;
		if (k.current) {
			let e = Math.sqrt((t * t + n * n) / 2), r = 1 + En * s, i = Math.max(h, g) * .6;
			e > 0 && (o = Math.min(o, i / (e * r)));
		}
		let _ = j.current, v = _ !== 1 && !D.current ? _ : 1, y = D.current ? v * je.current : v, b = p !== Oe.current || m !== ke.current, x = o !== Ae.current;
		if (Oe.current = p, ke.current = m, Ae.current = o, b || x || A.current) {
			let e = De.current, r = k.current, i = Math.sqrt((t * t + n * n) / 2), a = o * i * (1 + En * s) * .5, c = Math.ceil(a + xe.current + 28), l = r && L.current ? Ue.current : 0, d = String(r ? (p + l + e) * y : (p + e) / t), f = String(r ? (m + l + e) * y : (m + e) / n), _ = String(r ? Math.max(0, h - 2 * e) * y : Math.max(0, h - 2 * e) / t), b = String(r ? Math.max(0, g - 2 * e) * y : Math.max(0, g - 2 * e) / n);
			for (let e of U.current) e.setAttribute("x", d), e.setAttribute("y", f), e.setAttribute("width", _), e.setAttribute("height", b);
			if (x) {
				let e = r ? o * i * y : o, t = s > 0 ? [
					e * (1 + En * .5 * s),
					e,
					e * (1 - En * .5 * s)
				] : [e], n = W.current;
				for (let e = 0; e < n.length; e += 1) n[e].setAttribute("scale", String(t[e] ?? 0));
			}
			let S = ne.current;
			if (S) {
				r && (S.setAttribute("x", "0"), S.setAttribute("y", "0"), L.current ? (S.setAttribute("width", String((p + l + h + c) * y)), S.setAttribute("height", String((m + l + g + c) * y))) : (S.setAttribute("width", String(t * y)), S.setAttribute("height", String(n * y)))), Me.current += 1, S.id = `lg-${P}-v${Me.current}`;
				let e = Fe.current ? `url(#${S.id})` : "";
				L.current ? (L.current.style.filter !== e && (L.current.style.filter = e), L.current.style.clipPath = `inset(${Math.max(0, m + l) * v}px ${Math.max(0, t + l - (p + h)) * v}px ${Math.max(0, n + l - (m + g)) * v}px ${Math.max(0, p + l) * v}px round ${u * v}px)`, I.current && !ee.current && (I.current.style.filter = "")) : I.current && I.current.style.filter !== e && (I.current.style.filter = e);
			}
		}
		ee.current && (ee.current.style.clipPath = `inset(${Math.max(0, m) * v}px ${Math.max(0, t - (p + h)) * v}px ${Math.max(0, n - (m + g)) * v}px ${Math.max(0, p) * v}px round ${u * v}px)`), R.current && !ee.current && (R.current.style.clipPath = `inset(${Math.max(0, m)}px ${Math.max(0, t - (p + h))}px ${Math.max(0, n - (m + g))}px ${Math.max(0, p)}px round ${u}px)`);
		let S = (e, t) => {
			e.style.transform = `translate(${p}px, ${m}px)`, e.style.width = `${h}px`, e.style.height = `${g}px`, e.style.borderRadius = `${u}px`, t !== void 0 && (e.style.opacity = String(t));
		};
		if (V.current && S(V.current, Te.current), te.current && S(te.current, Ee.current), B.current) {
			B.current.style.transform = `translate3d(${p}px, ${m}px, 0)`, B.current.style.width = `${h}px`, B.current.style.height = `${g}px`, B.current.style.borderRadius = `${u}px`;
			let { uri: e, key: t } = Pn(h, g, u);
			if (Ne.current !== t) {
				let n = `url("${e}")`;
				B.current.style.maskImage = n, B.current.style.setProperty("-webkit-mask-image", n), B.current.style.maskSize = "100% 100%", B.current.style.setProperty("-webkit-mask-size", "100% 100%"), Ne.current = t;
			}
		}
		if (z.current) {
			S(z.current);
			let e = Re.current ?? "white";
			z.current.style.background = `color-mix(in srgb, ${e} ${100 * we.current}%, transparent)`, z.current.style.opacity = "1";
			let t = K.current > 0 ? `blur(${K.current}px)` : "none";
			z.current.style.backdropFilter = t, z.current.style.setProperty("-webkit-backdrop-filter", t);
		}
		if (ie.current) {
			let e = o > 0 ? i / o : 0, t = o > 0 ? a / o : 0;
			ie.current.setAttribute("values", Mn(e, t));
		}
	}, [P]), Ge = ht(() => {
		Pe.current || (Pe.current = !0, queueMicrotask(() => {
			Pe.current = !1, We();
		}));
	}, [We]), Ke = ht(() => {
		Oe.current = NaN, Ae.current = NaN, We();
	}, [We]);
	J(() => {
		let e = () => {
			let e = window.innerWidth, t = e > 0 ? window.outerWidth / e : 1;
			return t > .2 && t < 12 ? Math.abs(t - 1) < .04 ? 1 : t : 1;
		}, t = () => {
			let t = e();
			Math.abs(t - je.current) > .002 && (je.current = t, Ke());
		};
		return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
	}, [Ke]);
	let qe = ht(() => {
		let e = N.current.mapSize;
		(!Le.current || Le.current.size !== e) && (Le.current?.gen.dispose(), Le.current = {
			gen: Rn(e),
			size: e
		});
		let t = N.current, n = _e.current ? me.current : oe.current.w / 2, r = ve.current ? he.current : oe.current.h / 2, i = ye.current ? ge.current : be.current, a = Le.current.gen.generate({
			lensHalfWidth: n,
			lensHalfHeight: r,
			borderRadius: i,
			depth: xe.current,
			clipToShape: t.clipToShape,
			softEdge: t.softEdge,
			sheenAngle: t.sheenAngle,
			glow: t.glow,
			glowSpread: t.glowSpread,
			glowFalloff: t.glowFalloff,
			sheen: t.sheen,
			sheenWidth: t.sheenWidth,
			sheenFalloff: t.sheenFalloff,
			curvature: t.curvature,
			splay: t.splay,
			bend: t.bend,
			bendWidth: t.bendWidth
		});
		if (Fe.current = a, re.current?.setAttribute("href", a), t.frost > 0 || O.current && t.brightness !== 0) {
			let e = Fn(2 * n, 2 * r, i);
			Ie.current = e.uri, H.current?.setAttribute("href", e.uri);
		}
		ze.current?.(a), Ke();
	}, [Ke]), Je = Y(qe);
	Je.current = qe;
	let Ye = JSON.stringify([
		M.mapSize,
		M.clipToShape,
		M.softEdge,
		M.sheenAngle,
		M.glow,
		M.glowSpread,
		M.glowFalloff,
		M.sheen,
		M.sheenWidth,
		M.sheenFalloff,
		M.curvature,
		M.splay,
		M.bend,
		M.bendWidth,
		zn(i) ? "mv" : i ?? (G.w / 2 || M.lensW),
		zn(a) ? "mv" : a ?? (G.h / 2 || M.lensH),
		zn(o) ? "mv" : o ?? be.current,
		zn(g) ? "mv" : g ?? M.depth,
		y && M.brightness !== 0
	]);
	ft(() => {
		let e = [], t = (t, n, r, i = () => {
			A.current || Ge();
		}) => {
			if (t === void 0) {
				n.current = r;
				return;
			}
			zn(t) ? (n.current = t.get(), e.push(t.on("change", (e) => {
				n.current = e, i();
			}))) : n.current = t;
		};
		return t(n, fe, .5), t(r, pe, .5), t(i ?? M.lensW, me, M.lensW), t(a ?? M.lensH, he, M.lensH), t(o ?? M.borderRadius, ge, M.borderRadius), t(g ?? M.depth, xe, M.depth), t(_ ?? M.scaleX ?? M.strength, Se, M.scaleX ?? M.strength), t(_ ?? M.scaleY ?? M.strength, Ce, M.scaleY ?? M.strength), t(d, we, 1), t(f, K, 0), t(p, Te, 1), t(m, Ee, 0), t(h, De, .5), We(), () => e.forEach((e) => e());
	}, [
		n,
		r,
		i,
		a,
		o,
		g,
		_,
		d,
		f,
		p,
		m,
		h,
		M,
		Ge,
		We
	]);
	let Xe = M.dispersion > 0, Ze = M.frost > 0;
	ft(() => {
		let e = ne.current;
		U.current = e ? Array.from(e.querySelectorAll("[data-lens]")) : [], W.current = e ? Array.from(e.querySelectorAll("feDisplacementMap")) : [], re.current && Fe.current && re.current.setAttribute("href", Fe.current), H.current && Ie.current && H.current.setAttribute("href", Ie.current), Ke();
	}, [
		se,
		Xe,
		Ze,
		M.glow > 0 || M.sheen > 0,
		M.sheenDark,
		M.scaleX,
		M.scaleY,
		M.strength,
		M.brightness,
		y,
		b,
		E,
		s != null,
		l != null,
		Ke
	]), ft(() => {
		se && Ke();
	}, [
		G.w,
		G.h,
		He,
		Ke
	]), ft(() => {
		se && Je.current();
	}, [se, Ye]), J(() => {
		let e = [], t, n = () => {
			clearTimeout(t), t = setTimeout(() => Je.current(), 90);
		};
		for (let t of [
			i,
			a,
			o,
			g
		]) zn(t) && e.push(t.on("change", n));
		return () => {
			e.forEach((e) => e()), clearTimeout(t);
		};
	}, [
		i,
		a,
		o,
		g
	]), J(() => () => {
		Le.current?.gen.dispose(), Le.current = null, ze.current?.(null);
	}, []), J(() => {
		if (!x || !se) return;
		let e = 0, t = () => {
			e = requestAnimationFrame(t), We();
		};
		return e = requestAnimationFrame(t), () => cancelAnimationFrame(e);
	}, [
		x,
		se,
		We
	]);
	let Qe = v !== 1 && !E ? v : 1, $e = Ze && se ? b ? `${M.frost * Qe}` : `${M.frost / G.w} ${M.frost / G.h}` : void 0, et = v !== 1 && !E ? v : 1, tt = et > 1 && l == null && s == null && se, nt = l == null && s == null && !tt && i === void 0, rt = (e, t, n) => /* @__PURE__ */ X("div", {
		ref: e,
		style: {
			...n,
			position: "absolute",
			top: 0,
			left: 0,
			width: G.w * et,
			height: G.h * et,
			transform: `scale(${1 / et})`,
			transformOrigin: "top left"
		},
		children: /* @__PURE__ */ X("div", {
			style: {
				transform: `scale(${et})`,
				transformOrigin: "top left",
				width: G.w,
				height: G.h
			},
			children: t
		})
	}), it = M.brightness !== 0 && !y ? /* @__PURE__ */ X("div", {
		ref: R,
		style: {
			position: "absolute",
			inset: 0,
			pointerEvents: "none",
			background: M.brightness > 0 ? "white" : "black",
			opacity: Math.abs(M.brightness)
		}
	}) : null, at = (e, t, n) => t || n ? /* @__PURE__ */ X("div", {
		ref: e,
		style: {
			position: "absolute",
			top: 0,
			left: 0,
			pointerEvents: "none",
			willChange: "transform",
			boxSizing: "border-box",
			boxShadow: [t, n ? `inset ${n}` : null].filter(Boolean).join(", ")
		}
	}) : null;
	return /* @__PURE__ */ X("div", {
		ref: F,
		"data-liquid-glass": "",
		className: C,
		style: {
			contain: "layout",
			position: "relative",
			overflow: "visible",
			...nt ? { width: "fit-content" } : null,
			...tt ? { minHeight: G.h } : null,
			...w
		},
		...T,
		children: [
			tt ? rt(I, e, { willChange: "filter" }) : l == null && s == null ? /* @__PURE__ */ X("div", {
				ref: I,
				style: nt ? { willChange: "filter" } : {
					willChange: "filter",
					position: "relative",
					height: se ? G.h : void 0,
					overflow: "hidden",
					contain: "paint"
				},
				children: e
			}) : l == null && b ? /* @__PURE__ */ X("div", {
				ref: I,
				style: {
					position: "absolute",
					inset: 0,
					isolation: "isolate"
				},
				children: e
			}) : /* @__PURE__ */ X("div", {
				ref: l == null ? I : void 0,
				style: l == null ? { willChange: "filter" } : void 0,
				children: e
			}),
			s != null && (b ? /* @__PURE__ */ X("div", {
				ref: L,
				style: {
					position: "absolute",
					inset: -He,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: de
				},
				children: /* @__PURE__ */ X("div", {
					style: {
						position: "absolute",
						inset: He
					},
					children: s
				})
			}) : et > 1 ? rt(L, s, {
				pointerEvents: "none",
				willChange: "filter, clip-path",
				background: de
			}) : /* @__PURE__ */ X("div", {
				ref: L,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: de
				},
				children: s
			})),
			l != null && /* @__PURE__ */ X("div", {
				ref: ee,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [/* @__PURE__ */ X("div", {
					ref: I,
					style: { willChange: "filter" },
					children: l
				}), it]
			}),
			/* @__PURE__ */ X("div", {
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [
					/* @__PURE__ */ X("svg", {
						viewBox: `0 0 ${G.w} ${G.h}`,
						width: "100%",
						height: "100%",
						style: { display: "block" },
						children: /* @__PURE__ */ X("defs", { children: /* @__PURE__ */ X("filter", {
							ref: ne,
							id: `lg-${P}-v0`,
							filterUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							primitiveUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							colorInterpolationFilters: "sRGB",
							x: 0,
							y: 0,
							width: b ? G.w * et : 1,
							height: b ? G.h * et : 1,
							children: se && /* @__PURE__ */ X(ur, {
								lens: {
									...M,
									scaleX: _ === void 0 ? M.scaleX ?? M.strength : Bn(_),
									scaleY: _ === void 0 ? M.scaleY ?? M.strength : Bn(_)
								},
								mapHref: Tn,
								feImageRef: re,
								mapMatrixRef: ie,
								blurStdDeviation: $e,
								specularFromRawMap: E,
								brightnessInFilter: y,
								filterW: b ? G.w * et : void 0,
								filterH: b ? G.h * et : void 0,
								clipShapeRef: H
							})
						}) })
					}),
					l == null && it,
					u !== void 0 && /* @__PURE__ */ X("div", {
						ref: z,
						style: {
							position: "absolute",
							top: 0,
							left: 0,
							pointerEvents: "none",
							overflow: "hidden",
							willChange: "transform"
						}
					})
				]
			}),
			Ze && e == null && s == null && l == null && /* @__PURE__ */ X("div", {
				ref: B,
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					willChange: "backdrop-filter, transform",
					backdropFilter: `blur(${M.frost}px)`,
					WebkitBackdropFilter: `blur(${M.frost}px)`
				}
			}),
			at(V, M.edgeShadow, M.edgeInsetShadow),
			at(te, M.restEdgeShadow, M.restEdgeInsetShadow)
		]
	});
}, fr = (e) => mt(() => e == null ? void 0 : zn(e) ? Hn([e], () => e.get() / 2) : e / 2, [e]), pr = (e) => {
	let { children: t, width: n, height: r, size: i, radius: a, center: o, optics: s, refract: c, behind: l, src: u, draw: d, lenses: f, videoRef: p, paused: m, poster: h, loop: g, muted: _, autoPlay: v, crossOrigin: y, maxDpr: b, unstable_lens: x, ...S } = e, C = {
		...S,
		...x ?? {}
	}, w = o?.x, T = o?.y, [E, D] = Array.isArray(i) ? i : i == null ? [void 0, void 0] : [i, i], O = fr(n ?? E), k = fr(r ?? D);
	if (u != null || d != null) return /* @__PURE__ */ X(rr, {
		src: u,
		draw: d,
		lens: s,
		lenses: f,
		videoRef: p,
		paused: m,
		poster: h,
		loop: g,
		muted: _,
		autoPlay: v,
		crossOrigin: y,
		maxDpr: b,
		lensW: O,
		lensH: k,
		borderRadius: a,
		x: w,
		y: T,
		className: e.className,
		style: e.style,
		children: t
	});
	let { overlay: A, tintColor: j, tintOpacity: M, tintBlur: N, shadowOpacity: P, restShadowOpacity: F, edgeBias: I, brightnessInFilter: L, depth: ee, scale: R, filterResolution: z, pixelUnits: B, live: V, onLensMapChange: te, ...ne } = C, re = zn(n) || zn(r) || zn(a) || zn(E) || zn(D) || zn(w) || zn(T);
	return t != null && c == null && u == null && d == null && f == null && A == null && !B && j == null && M == null && N == null && P == null && F == null && I == null && !L && z == null && !V && ee == null && R == null && te == null && w == null && T == null && !re ? /* @__PURE__ */ X(cr, {
		...ne,
		optics: s,
		radius: a,
		width: n ?? E,
		height: r ?? D,
		children: t
	}) : /* @__PURE__ */ X(dr, {
		...C,
		lensW: O,
		lensH: k,
		borderRadius: a,
		x: w,
		y: T,
		lens: s,
		refractionTarget: c,
		refractionBackground: l,
		children: t
	});
}, mr = 176, hr = 13.6, gr = .34, _r = .75, vr = 84, yr = .033, br = .008, xr = .03, Sr = (e, t, n, r) => {
	J(() => {
		let i = 0, a = 0, o = 0, s = 0, c = e.get(), l = !1, u = (e) => {
			let t = e ** +_r / vr, r = t < gr ? t : gr, i = n.current, a = r > i ? r : i;
			return a < gr ? a : gr;
		}, d = (e) => Math.abs(a) < 6e-4 && Math.abs(o) < .006 && e < .006 && n.current === 0, f = (n) => {
			let r = (n - s) / 1e3, p = r < yr ? r : yr;
			s = n;
			let m = e.get(), h = r < br ? br : r > xr ? xr : r, g = Math.abs((m - c) / h);
			c = m;
			let _ = mr * (u(g) - a) - hr * o;
			if (o += _ * p, a += o * p, t.set(a), d(g)) {
				l = !1, t.set(0);
				return;
			}
			i = requestAnimationFrame(f);
		}, p = () => {
			l || (l = !0, s = performance.now(), c = e.get(), i = requestAnimationFrame(f));
		};
		r.current = p;
		let m = e.on("change", p);
		return () => {
			m(), cancelAnimationFrame(i), r.current = () => {};
		};
	}, [
		e,
		t,
		n,
		r
	]);
}, Cr = (e, t, n) => {
	let r = e < n ? e / n : 1;
	return t * r * (3 + r * (r - 3));
}, wr = Sn.forwardRef(({ x: e, scaleX: t, scaleY: n, style: r, children: i, ...a }, o) => {
	let s = Y(null);
	return J(() => {
		let r = s.current;
		if (!r) return;
		let i = [
			e,
			t,
			n
		].filter((e) => e != null), a = () => {
			let i = "";
			if (e && (i = `translateX(${e.get()}px)`), t || n) {
				let e = t ? t.get() : 1, r = n ? n.get() : 1;
				i += `${i ? " " : ""}scale(${e}, ${r})`;
			}
			r.style.transform = i;
		};
		a();
		let o = i.map((e) => e.on("change", a));
		return () => o.forEach((e) => e());
	}, [
		e,
		t,
		n
	]), /* @__PURE__ */ X("div", {
		ref: (e) => {
			s.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
		},
		style: r,
		...a,
		children: i
	});
});
wr.displayName = "GlassDiv";
//#endregion
//#region src/react/refraction-quality.ts
var Tr = Xe("high");
function Er() {
	return gt(Tr);
}
function Dr(e) {
	return e === "medium" ? 1 : 2;
}
var Or = 512, kr = 96;
function Ar(e, t) {
	if (t !== "medium") return e;
	let n = e.mapSize ?? Or;
	return {
		...e,
		dispersion: 0,
		mapSize: Math.min(n, Math.max(kr, n >> 1))
	};
}
//#endregion
//#region src/react/glass-primitives.tsx
var jr = {
	mapSize: 256,
	strength: .035,
	depth: .22,
	curvature: .12,
	dispersion: 0,
	bend: .38,
	bendWidth: .12,
	frost: 7,
	saturate: 1.3,
	sheen: .42,
	sheenWidth: 2.5,
	sheenFalloff: 1.6,
	glow: .09,
	glowSpread: .14,
	glowFalloff: 1.5,
	specular: 1.18,
	brightness: .015
}, Mr = {
	...jr,
	strength: .05,
	depth: .3,
	curvature: .18,
	bend: .48,
	bendWidth: .1,
	frost: 3,
	saturate: 1.4,
	sheen: .52,
	glow: .12,
	specular: 1.28,
	brightness: 0
}, Nr = {
	...jr,
	glowSpread: .55,
	glowFalloff: .7,
	strength: .12,
	depth: .88,
	curvature: .58,
	bend: .74,
	bendWidth: .14,
	frost: 4,
	sheen: .72,
	glow: .22,
	specular: 1.3
}, Pr = {
	...Nr,
	strength: .14,
	curvature: .66,
	frost: 2,
	saturate: 1.45
}, Fr = {
	mapSize: 512,
	clipToShape: !0,
	softEdge: !0,
	strength: .16,
	depth: .2,
	curvature: .55,
	bend: .25,
	bendWidth: .08,
	dispersion: .15,
	specular: 1,
	sheenAngle: 50,
	glow: .15,
	glowSpread: 1,
	glowFalloff: 1.5,
	sheen: .95,
	sheenWidth: 2,
	sheenFalloff: 1.5,
	frost: 3,
	brightness: 0
}, Ir = {
	regular: {
		card: jr,
		compact: jr,
		control: Nr
	},
	clear: {
		card: Mr,
		compact: Mr,
		control: Pr
	}
}, Lr = ["regular", "clear"], Rr = [
	"card",
	"compact",
	"control"
], zr = (e) => {
	let t = {};
	for (let n of Lr) {
		let r = {};
		for (let t of Rr) r[t] = e(Ir[n][t]);
		t[n] = r;
	}
	return t;
}, Br = {
	high: zr((e) => e),
	medium: zr((e) => ({
		...Ar(e, "medium"),
		frost: 0
	}))
};
function Vr(e = "regular", t = "card", n = "high") {
	return Br[n][e][t];
}
var Hr = "\n  .lg-liquid-surface {\n    --lg-surface-tint: var(--lg-glass-tint);\n    --lg-surface-tint-alpha: var(--lg-glass-tint-alpha);\n    isolation: isolate;\n    background: rgba(var(--lg-surface-tint), var(--lg-surface-tint-alpha));\n  }\n  /*\n   * Filter-free glass for embedded WebViews. Static lighting across the face and\n   * asymmetric inner edges suggest a curved lens without asking the compositor\n   * for backdrop blur, SVG displacement, canvas maps or per-frame updates.\n  */\n  .lg-liquid-surface[data-lg-static-glass=\"\"] {\n    overflow: hidden;\n    background:\n      radial-gradient(135% 105% at 8% -14%, var(--lg-static-glass-highlight) 0%, transparent 47%),\n      radial-gradient(95% 100% at 104% 112%, var(--lg-static-glass-lowlight) 0%, transparent 66%),\n      linear-gradient(132deg, var(--lg-static-glass-sheen) 0%, transparent 38%),\n      rgba(var(--lg-surface-tint), var(--lg-surface-tint-alpha));\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      0 1px 1px var(--lg-glass-inner),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 12px 24px -24px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].lg-liquid-compact {\n    box-shadow:\n      0 3px 10px -3px var(--lg-shadow-glass),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].lg-liquid-control {\n    box-shadow:\n      0 5px 14px rgba(0, 0, 0, 0.32),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 10px 16px -16px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].active {\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      inset 1px 1px 0 var(--lg-glass-stroke-active),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 12px 24px -24px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-card {\n    box-shadow: 0 10px 26px -8px var(--lg-shadow-glass);\n  }\n  /* A card that is its own switch reads brighter while the entity is on. */\n  .lg-liquid-surface.active {\n    --lg-surface-tint: var(--lg-glass-tint-active);\n    --lg-surface-tint-alpha: var(--lg-glass-tint-active-alpha);\n  }\n  .lg-liquid-card.active {\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      inset 0 0 0 1px var(--lg-glass-stroke-active);\n  }\n  .lg-liquid-compact {\n    box-shadow: 0 3px 10px -3px var(--lg-shadow-glass);\n  }\n  .lg-liquid-control {\n    background: rgba(255, 255, 255, 0.32);\n    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.46);\n  }\n  :host([dark]) .lg-liquid-control {\n    background: rgba(255, 255, 255, 0.18);\n  }\n  /*\n   * The DOM refraction route inserts a crisp-content wrapper before its optical\n   * layers. Recreate the surface layout on that wrapper and keep it above the\n   * refracted background. Without this, a card becomes one blank flex item and\n   * the later SVG layer paints over its contents.\n   */\n  .lg-liquid-surface[data-liquid-glass=\"\"] > :first-child {\n    position: relative;\n    z-index: 2;\n    min-width: 0;\n    box-sizing: border-box;\n  }\n  .lg-liquid-card[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: inherit;\n  }\n  /* A row card lays its header out along the wrapper, not down it. */\n  .lg-liquid-card.row[data-liquid-glass=\"\"] > :first-child {\n    flex-direction: row;\n    align-items: center;\n  }\n  .lg-liquid-compact[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: inherit;\n  }\n  .lg-liquid-control[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    height: 100%;\n    display: grid;\n    place-items: center;\n  }\n  /*\n   * The copy the lens refracts stands in for the backdrop, so it has to read as an\n   * even panel: Apple's glass carries its light at the rim, not as a wash across the\n   * middle. A soft top light and a flat tint, with only a hint of the card's accent.\n   */\n  .lg-refraction-source {\n    width: 100%;\n    height: 100%;\n    min-height: inherit;\n    border-radius: inherit;\n    background:\n      radial-gradient(120% 160% at 12% -28%, rgba(255, 255, 255, 0.4), transparent 58%),\n      radial-gradient(80% 120% at 94% 112%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 14%, transparent), transparent 62%),\n      linear-gradient(180deg, rgba(var(--lg-glass-tint), 0.3), rgba(var(--lg-glass-tint), 0.18));\n  }\n  :host([dark]) .lg-refraction-source {\n    background:\n      radial-gradient(120% 160% at 12% -28%, rgba(255, 255, 255, 0.16), transparent 58%),\n      radial-gradient(80% 120% at 94% 112%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 12%, transparent), transparent 62%),\n      linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.04));\n  }\n";
function Ur({ refraction: e, frost: t = Fr.frost, children: n, ...r }) {
	let i = Er(), a = mt(() => Ar(t === Fr.frost ? Fr : {
		...Fr,
		frost: t
	}, i), [t, i]);
	return e ? /* @__PURE__ */ X(pr, {
		...r,
		optics: a,
		children: n
	}) : /* @__PURE__ */ X("div", {
		...r,
		"data-lg-static-lens": "",
		children: n
	});
}
function Wr({ refraction: e, variant: t = "regular", surface: n = "card", sourceAccent: r, sourceBackground: i, className: a, children: o, ...s }) {
	let c = Er(), l = e ? /* @__PURE__ */ X("div", {
		"aria-hidden": "true",
		className: "lg-refraction-source",
		"data-lg-refraction-source": "copy",
		style: {
			...r ? { "--lg-refraction-accent": r } : {},
			...i ? { background: i } : {}
		}
	}) : void 0, u = `lg-liquid-surface lg-liquid-${n}${a ? ` ${a}` : ""}`;
	return e ? /* @__PURE__ */ X(pr, {
		...s,
		className: u,
		optics: Vr(t, n, c),
		refract: l,
		behind: "var(--primary-background-color, transparent)",
		filterResolution: Dr(c),
		children: o
	}) : /* @__PURE__ */ X("div", {
		...s,
		className: u,
		"data-lg-static-glass": "",
		children: o
	});
}
function Q({ icon: e, decorative: t = !0 }) {
	return Se("lg-icon", {
		icon: e,
		...t ? { "aria-hidden": "true" } : {}
	});
}
//#endregion
//#region src/react/card-parts.tsx
function Gr(e) {
	return (t) => {
		(t.key === " " || t.key === "Enter") && (t.preventDefault(), e());
	};
}
function Kr({ icon: e, style: t, onClick: n }) {
	return /* @__PURE__ */ X("div", {
		className: `icon-well${t ? "" : " idle"}${n ? " tappable" : ""}`,
		style: t ? {
			"--well-from": t.from,
			"--well-to": t.to,
			"--well-glow": t.glow
		} : void 0,
		onClick: n,
		children: /* @__PURE__ */ X(Q, { icon: e })
	});
}
function qr({ name: e, state: t, onClick: n }) {
	return /* @__PURE__ */ X("div", {
		className: `title${n ? " tappable" : ""}`,
		onClick: n,
		...n ? {
			role: "button",
			tabIndex: 0,
			onKeyDown: Gr(n)
		} : {},
		children: [/* @__PURE__ */ X("div", {
			className: "name",
			children: e
		}), /* @__PURE__ */ X("div", {
			className: "state",
			children: t
		})]
	});
}
function Jr({ label: e, style: t, icon: n }) {
	return /* @__PURE__ */ X("div", {
		className: "badge",
		style: t ? {
			"--badge-color": t.color,
			"--badge-bg": t.bg,
			"--badge-stroke": t.stroke,
			"--badge-glow": t.glow ?? t.color
		} : void 0,
		children: [n ? /* @__PURE__ */ X("span", {
			className: "badge-icon",
			children: /* @__PURE__ */ X(Q, { icon: n })
		}) : /* @__PURE__ */ X("span", { className: "dot" }), e ? /* @__PURE__ */ X("span", { children: e }) : null]
	});
}
function Yr({ refraction: e, variant: t, icon: n = "mdi:help-circle-outline", name: r, label: i, onOpen: a }) {
	return /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: e,
		variant: t,
		style: {
			display: "flex",
			position: "relative"
		},
		children: /* @__PURE__ */ X("div", {
			className: "header",
			children: [/* @__PURE__ */ X(Kr, {
				icon: n,
				onClick: a
			}), /* @__PURE__ */ X(qr, {
				name: r,
				state: i,
				onClick: a
			})]
		})
	});
}
//#endregion
//#region src/react/card-styles.ts
var Xr = "\n  * { box-sizing: border-box; }\n\n  :host {\n    display: block;\n    min-width: 0;\n    container-type: inline-size;\n    font-family: var(--lg-font-jp);\n    color: var(--lg-text-primary);\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .card {\n    --lg-pad: 20px;\n    --lg-pad-row: 16px;\n    --lg-gap: 18px;\n    --lg-gap-row: 14px;\n    --lg-well: 48px;\n    --lg-well-icon: 24px;\n    --lg-name: 17px;\n    --lg-state: 13px;\n    --lg-label: 13px;\n    --lg-tick: 11px;\n    --lg-corner: var(--lg-radius);\n\n    width: 100%;\n    border-radius: var(--lg-corner);\n    padding: var(--lg-pad);\n    display: flex;\n    flex-direction: column;\n    gap: var(--lg-gap);\n    overflow: hidden;\n    color: var(--lg-text-primary);\n  }\n\n  .card.row {\n    flex-direction: row;\n    align-items: center;\n    gap: var(--lg-gap-row);\n    padding: var(--lg-pad-row) var(--lg-pad);\n  }\n\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-pad: clamp(12px, 5.3cqi, 20px);\n      --lg-pad-row: clamp(10px, 4.2cqi, 16px);\n      --lg-gap: clamp(10px, 4.7cqi, 18px);\n      --lg-gap-row: clamp(9px, 3.7cqi, 14px);\n      --lg-well: clamp(34px, 12.6cqi, 48px);\n      --lg-well-icon: clamp(17px, 6.3cqi, 24px);\n      --lg-name: clamp(13.5px, 4.5cqi, 17px);\n      --lg-state: clamp(11px, 3.4cqi, 13px);\n      --lg-label: clamp(11px, 3.4cqi, 13px);\n      --lg-tick: clamp(9.5px, 2.9cqi, 11px);\n      --lg-corner: min(var(--lg-radius), 11cqi);\n    }\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    gap: var(--lg-gap-row);\n    min-height: var(--lg-well);\n  }\n  .title {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n  .title.tappable,\n  .icon-well.tappable { cursor: pointer; }\n  .title:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 3px;\n    border-radius: 6px;\n  }\n  .name {\n    font-size: var(--lg-name);\n    font-weight: 600;\n    line-height: 1.3;\n    color: var(--lg-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .state {\n    font-size: var(--lg-state);\n    line-height: 1.35;\n    color: var(--lg-text-secondary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .icon-well {\n    flex: none;\n    width: var(--lg-well);\n    height: var(--lg-well);\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    color: #fff;\n    background: linear-gradient(180deg, var(--well-from, #ffd36b), var(--well-to, var(--lg-accent-deep)));\n    box-shadow:\n      0 4px 12px var(--well-glow, rgba(255, 165, 48, 0.24)),\n      0 1px 1px rgba(255, 255, 255, 0.7),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.5);\n    cursor: pointer;\n    transition:\n      --well-from 0.42s ease,\n      --well-to 0.42s ease,\n      --well-glow 0.42s ease,\n      background 0.25s ease,\n      box-shadow 0.25s ease;\n  }\n  .icon-well.idle {\n    background: var(--lg-track-bg);\n    color: var(--lg-text-secondary);\n    box-shadow:\n      0 1px 1px var(--lg-glass-inner),\n      inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .icon-well lg-icon {\n    --mdc-icon-size: var(--lg-well-icon);\n    width: var(--lg-well-icon);\n    height: var(--lg-well-icon);\n  }\n\n  .badge {\n    flex: 0 1 auto;\n    min-width: 0;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 14px;\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--badge-color, var(--lg-text-secondary));\n    background: var(--badge-bg, var(--lg-track-bg));\n    box-shadow: inset 0 0 0 1px var(--badge-stroke, var(--lg-glass-stroke));\n    white-space: nowrap;\n  }\n  .badge > span:last-child {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .badge .dot {\n    flex: none;\n    width: 8px;\n    height: 8px;\n    border-radius: 4px;\n    background: var(--badge-color, var(--lg-text-secondary));\n    box-shadow: 0 0 6px var(--badge-glow, transparent);\n  }\n  .badge .badge-icon {\n    flex: none;\n    display: inline-flex;\n    color: var(--badge-color, var(--lg-text-secondary));\n  }\n  .badge .badge-icon lg-icon {\n    --mdc-icon-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n\n  .chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .chip {\n    position: relative;\n    isolation: isolate;\n    overflow: hidden;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 9px 14px;\n    border: 0;\n    border-radius: 18px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    font: inherit;\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    cursor: pointer;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  .section {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .label-row {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 8px;\n    font-size: var(--lg-label);\n  }\n  .label-row .label {\n    color: var(--lg-text-secondary);\n    font-weight: 500;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .label-row .value {\n    flex: none;\n    color: var(--lg-text-primary);\n    font-weight: 600;\n    font-family: var(--lg-font-ui);\n    letter-spacing: -0.2px;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .round-btn {\n    --btn: 56px;\n    flex: none;\n    width: var(--btn);\n    height: var(--btn);\n    border: 0;\n    border-radius: 50%;\n    background: var(--lg-track-bg);\n    box-shadow:\n      0 1px 1px var(--lg-glass-inner),\n      inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    display: grid;\n    place-items: center;\n    cursor: pointer;\n    padding: 0;\n    transition: background 0.2s ease, color 0.2s ease;\n  }\n  .round-btn:active {\n    background: var(--lg-segment-selected);\n  }\n  .round-btn lg-icon {\n    --mdc-icon-size: calc(var(--btn) * 0.43);\n    width: calc(var(--btn) * 0.43);\n    height: calc(var(--btn) * 0.43);\n  }\n  @supports (container-type: inline-size) {\n    .round-btn {\n      --btn: clamp(38px, 14.7cqi, 56px);\n    }\n  }\n\n  .segment {\n    display: flex;\n    gap: 2px;\n    padding: 3px;\n    border-radius: 18px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .segment > button {\n    flex: 1;\n    min-width: 0;\n    height: 30px;\n    border: 0;\n    border-radius: 15px;\n    background: transparent;\n    color: var(--lg-text-secondary);\n    font: inherit;\n    font-size: var(--lg-label);\n    font-weight: 500;\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 4px;\n    padding: 0;\n    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;\n  }\n  .segment > button.selected {\n    background: var(--lg-segment-selected);\n    color: var(--lg-text-primary);\n    font-weight: 600;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);\n  }\n\n  .dim {\n    opacity: 0.45;\n  }\n  .muted {\n    opacity: 0.6;\n  }\n\n  .ticks {\n    display: flex;\n    justify-content: space-between;\n    padding: 0 4px;\n    font-family: var(--lg-font-ui);\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n\n  @container (max-width: 250px) {\n    .badge { display: none; }\n  }\n  @container (max-width: 280px) {\n    .chip { padding: 8px 11px; }\n  }\n\n  button { font-family: inherit; }\n  button:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after {\n      transition-duration: 0.01ms !important;\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n    }\n  }\n", Zr = class extends HTMLElement {
	static get observedAttributes() {
		return ["icon"];
	}
	constructor() {
		super(), this.iconValue = "";
		let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
		t.textContent = "\n      :host{display:inline-flex;align-items:center;justify-content:center;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);color:inherit;flex:none}\n      ha-icon{display:flex;--mdc-icon-size:inherit}\n    ", this.haIcon = document.createElement("ha-icon"), e.append(t, this.haIcon);
	}
	get icon() {
		return this.iconValue;
	}
	set icon(e) {
		this.iconValue !== e && (this.iconValue = e, this.haIcon.icon = e);
	}
	attributeChangedCallback(e, t, n) {
		e === "icon" && (this.icon = n ?? "");
	}
};
customElements.get("lg-icon") || customElements.define("lg-icon", Zr);
//#endregion
//#region src/editor/load.ts
var Qr;
function $r() {
	return Qr || (Qr = (async () => {
		let e = window.loadCardHelpers;
		if (e) try {
			await ((await e()).createCardElement?.({
				type: "entities",
				entities: []
			})?.constructor)?.getConfigElement?.();
		} catch {}
	})()), Qr;
}
//#endregion
//#region src/react/card-sheets.ts
var ei = typeof CSSStyleSheet == "function" && (() => {
	try {
		return new CSSStyleSheet().replaceSync(""), !0;
	} catch {
		return !1;
	}
})(), ti = /* @__PURE__ */ new Map();
function ni(e) {
	let t = ti.get(e);
	if (t) return t;
	let n = new CSSStyleSheet();
	return n.replaceSync(e), ti.set(e, n), n;
}
function ri(e, t) {
	return !e || !ei ? !1 : (e.adoptedStyleSheets = t.map(ni), !0);
}
//#endregion
//#region node_modules/preact/compat/client.mjs
function ii(e) {
	return {
		render: function(t) {
			on(t, e);
		},
		unmount: function() {
			bn(e);
		}
	};
}
//#endregion
//#region src/react/card-actions.ts
var ai = 500, oi = 250, si = 10, ci = ".card, .panel, .separator", li = [
	"button",
	"input",
	"select",
	"textarea",
	"a[href]",
	"[contenteditable='true']",
	"[role='slider']",
	"[role='switch']",
	"[role='checkbox']",
	"[role='combobox']",
	".cards"
].join(",");
function ui(e) {
	return e.classList.contains("title") || e.classList.contains("icon-well");
}
function di(e, t) {
	for (let n of e.composedPath()) {
		if (n === t) break;
		if (n instanceof Element) {
			if (n.matches(ci)) return n;
			if (!ui(n) && n.matches(li)) return;
		}
	}
}
function fi(e) {
	return typeof e.pointerId == "number" ? e.pointerId : 1;
}
function pi(e, t, n) {
	let r, i, a, o, s = !1, c = !1, l = (e) => n()?.[`${e}_action`], u = (e) => {
		let r = n();
		r?.[`${e}_action`] && d(t, "hass-action", {
			config: r,
			action: e
		});
	}, f = () => {
		window.clearTimeout(i), i = void 0, r = void 0;
	}, p = (e) => {
		e.preventDefault(), e.stopPropagation();
	}, m = (e) => e.stopPropagation(), h = (t) => {
		t.button === 0 && l("hold") && di(t, e) && (m(t), r = {
			id: fi(t),
			x: t.clientX,
			y: t.clientY,
			held: !1
		}, window.clearTimeout(i), i = window.setTimeout(() => {
			r && (r.held = !0, s = !0, u("hold"));
		}, ai));
	}, g = (e) => {
		r && fi(e) === r.id && (m(e), (Math.abs(e.clientX - r.x) > si || Math.abs(e.clientY - r.y) > si) && f());
	}, _ = (e) => {
		r && fi(e) === r.id && (m(e), f());
	}, v = (e) => {
		if (e?.isConnected) {
			c = !0;
			try {
				e.dispatchEvent(new MouseEvent("click", {
					bubbles: !0,
					cancelable: !0,
					composed: !0,
					detail: 1
				}));
			} finally {
				c = !1;
			}
		}
	}, y = () => {
		a = void 0;
		let e = o;
		o = void 0, l("tap") ? u("tap") : v(e);
	}, b = (t) => {
		if (!c && di(t, e)) {
			if (s) {
				s = !1, p(t);
				return;
			}
			if (l("double_tap")) {
				p(t), a === void 0 ? (o = t.target instanceof Element ? t.target : void 0, a = window.setTimeout(y, oi)) : (window.clearTimeout(a), a = void 0, o = void 0, u("double_tap"));
				return;
			}
			l("tap") && (p(t), u("tap"));
		}
	}, x = (t) => {
		t.key !== "Enter" && t.key !== " " || !l("tap") || di(t, e) && (p(t), u("tap"));
	}, S = (t) => {
		l("hold") && di(t, e) && p(t);
	};
	return e.addEventListener("pointerdown", h, !0), e.addEventListener("pointermove", g, !0), e.addEventListener("pointerup", _, !0), e.addEventListener("pointercancel", _, !0), e.addEventListener("click", b, !0), e.addEventListener("keydown", x, !0), e.addEventListener("contextmenu", S, !0), () => {
		window.clearTimeout(i), window.clearTimeout(a), e.removeEventListener("pointerdown", h, !0), e.removeEventListener("pointermove", g, !0), e.removeEventListener("pointerup", _, !0), e.removeEventListener("pointercancel", _, !0), e.removeEventListener("click", b, !0), e.removeEventListener("keydown", x, !0), e.removeEventListener("contextmenu", S, !0);
	};
}
//#endregion
//#region src/react/define-react-card.tsx
var mi = "__HA_LIQUID_GLASS_REACT_CARD_RUNTIME__", hi = globalThis, gi = hi[mi] ?? (hi[mi] = {
	constructors: /* @__PURE__ */ new Map(),
	definitions: /* @__PURE__ */ new Map(),
	instances: /* @__PURE__ */ new Map()
});
function _i(e) {
	let t = e.tagName, n = e;
	gi.definitions.set(t, n);
	let r = gi.constructors.get(t), i = customElements.get(t);
	if (r && i === r) {
		let n = i;
		n.getConfigElement = e.getConfigElement, n.getStubConfig = e.getStubConfig;
		for (let e of gi.instances.get(t) ?? []) e.requestRender();
		return n;
	}
	if (i) {
		let n = i;
		gi.constructors.set(t, n), n.getConfigElement = e.getConfigElement, n.getStubConfig = e.getStubConfig;
		for (let e of gi.instances.get(t) ?? []) e.requestRender();
		return n;
	}
	gi.constructors.delete(t);
	class a extends HTMLElement {
		constructor() {
			super(), this.renderQueued = !1;
			let e = this.attachShadow({ mode: "open" });
			this.cardShadowRoot = e, this.mountNode = document.createElement("div"), this.mountNode.setAttribute("part", "root"), e.append(this.mountNode);
		}
		get hass() {
			return this.hassValue;
		}
		set hass(e) {
			this.hassValue !== e && (this.hassValue = e, this.requestRender());
		}
		setConfig(e) {
			if (!e || typeof e != "object") throw Error("Invalid configuration");
			let t = this.currentDefinition();
			this.configValue = t.normalizeConfig?.(e) ?? e, this.requestRender();
		}
		getCardSize() {
			return this.configValue ? this.currentDefinition().getCardSize?.(this.configValue, this) ?? 3 : 3;
		}
		getGridOptions() {
			return this.configValue ? this.currentDefinition().getGridOptions?.(this.configValue, this) ?? { columns: 12 } : { columns: 12 };
		}
		connectedCallback() {
			let e = gi.instances.get(t) ?? /* @__PURE__ */ new Set();
			e.add(this), gi.instances.set(t, e), this.actionCleanup ?? (this.actionCleanup = pi(this.cardShadowRoot, this, () => this.configValue)), this.requestRender();
		}
		disconnectedCallback() {
			gi.instances.get(t)?.delete(this), this.actionCleanup?.(), this.actionCleanup = void 0, this.root?.unmount(), this.root = void 0;
		}
		requestRender() {
			this.isConnected && this.configValue && !this.renderQueued && (this.renderQueued = !0, queueMicrotask(() => {
				if (this.renderQueued = !1, !this.isConnected || !this.configValue) return;
				this.root ?? (this.root = ii(this.mountNode));
				let e = this.currentDefinition();
				this.root.render(Se(e.component, {
					config: this.configValue,
					hass: this.hassValue,
					host: this
				}));
			}));
		}
		currentDefinition() {
			let e = gi.definitions.get(t);
			if (!e) throw Error(`React card definition for "${t}" is unavailable`);
			return e;
		}
	}
	let o = a;
	return e.getConfigElement && (o.getConfigElement = e.getConfigElement), e.getStubConfig && (o.getStubConfig = e.getStubConfig), gi.constructors.set(t, o), customElements.define(t, o), o;
}
//#endregion
//#region src/react/platform.ts
var vi = typeof navigator > "u" ? "" : navigator.userAgent, yi = /(?:^|[; (])wv(?:[;) ]|$)|Home[ /]?Assistant/i, bi = yi.test(vi);
function xi(e = vi) {
	return e === vi ? bi : yi.test(e);
}
function Si(e, t = vi) {
	return e === !0 || e !== !1 && !xi(t);
}
function Ci(e, t = vi) {
	return e === "high" || e === "medium" ? e : /Android/i.test(t) || xi(t) ? "medium" : "high";
}
//#endregion
//#region src/react/define-liquid-glass-card.ts
var wi = async () => (await $r(), document.createElement("liquid-glass-card-editor")), Ti = "\n  :host([card-action]) .card,\n  :host([card-action]) .panel,\n  :host([card-action]) .separator { cursor: pointer; }\n  [data-lg-action-focus]:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n";
function Ei({ host: e, parts: t }) {
	return ft(() => {
		ri(e.shadowRoot, t);
	}, [e, t]), ei ? null : Se("style", null, t.join(""));
}
function Di({ host: e, hasAction: t, tapAccessible: n }) {
	return ft(() => {
		e.toggleAttribute("card-action", t);
		let r = e.shadowRoot?.querySelector("[data-lg-action-focus]");
		if (r?.removeAttribute("data-lg-action-focus"), r?.removeAttribute("role"), r?.removeAttribute("tabindex"), !n) return;
		let i = e.shadowRoot?.querySelector(".card, .panel, .separator");
		!i || i.matches("[tabindex]") || i.querySelector(".title[tabindex]") || (i.setAttribute("data-lg-action-focus", ""), i.setAttribute("role", "button"), i.tabIndex = 0);
	}, [
		e,
		t,
		n
	]), null;
}
var Oi = (e) => e?.action !== void 0 && e.action !== "none";
function ki(e) {
	let t = e.component, n = [...e.styles, Ti];
	return _i({
		...e,
		component: (e) => Se(Tr.Provider, { value: Ci(e.config.refraction_quality) }, Se(Ei, {
			host: e.host,
			parts: n
		}), Se(t, e), Se(Di, {
			host: e.host,
			hasAction: Oi(e.config.tap_action) || Oi(e.config.hold_action) || Oi(e.config.double_tap_action),
			tapAccessible: Oi(e.config.tap_action)
		})),
		normalizeConfig: (e) => ({
			refraction: "auto",
			refraction_quality: "auto",
			theme: "auto",
			...e
		}),
		getConfigElement: wi
	});
}
//#endregion
//#region src/react/use-card-host.ts
function Ai(e, t, n) {
	let r = t.theme === "dark" || t.theme !== "light" && !!n?.themes?.darkMode, i = Si(t.refraction), a = Ci(t.refraction_quality);
	return ft(() => {
		e.toggleAttribute("dark", r), e.toggleAttribute("refraction", i), e.setAttribute("refraction-quality", i ? a : "off"), e.setAttribute("glass-variant", t.glass_variant ?? "regular");
	}, [
		t.glass_variant,
		e,
		r,
		i,
		a
	]), {
		isDark: r,
		refraction: i
	};
}
//#endregion
//#region src/styles/tokens.ts
var ji = "\n  :host {\n    --lg-text-primary: #1c1c1e;\n    --lg-text-secondary: rgba(60, 60, 67, 0.65);\n    --lg-glass-tint: 255, 255, 255;\n    --lg-glass-tint-alpha: 0.2;\n    --lg-glass-stroke: rgba(255, 255, 255, 0.7);\n    --lg-glass-inner: rgba(255, 255, 255, 0.5);\n    /* Filter-free glass lighting used by embedded/mobile WebViews. */\n    --lg-static-glass-highlight: rgba(255, 255, 255, 0.5);\n    --lg-static-glass-sheen: rgba(255, 255, 255, 0.2);\n    --lg-static-glass-lowlight: rgba(28, 28, 30, 0.1);\n    --lg-track-bg: rgba(255, 255, 255, 0.4);\n    /* A slider knob is solid until it is dragged, when the glass under it is revealed. */\n    --lg-knob-solid: #ffffff;\n    --lg-knob-solid-rim: rgba(28, 28, 30, 0.06);\n    --lg-knob-shadow: 0 0.5px 4px rgba(28, 28, 30, 0.16), 0 6px 13px rgba(28, 28, 30, 0.18);\n    --lg-knob-shadow-active: 0 1px 6px rgba(28, 28, 30, 0.18), 0 10px 22px rgba(28, 28, 30, 0.26);\n    /* The unfilled part of a slider bar, matching the neutral fill Apple uses. */\n    --lg-slider-bar-bg: rgba(120, 120, 128, 0.24);\n    --lg-slider-mark: rgba(28, 28, 30, 0.26);\n    --lg-shadow-glass: rgba(28, 28, 30, 0.18);\n    --lg-segment-selected: rgba(255, 255, 255, 0.85);\n    --lg-glass-tint-active: 255, 255, 255;\n    --lg-glass-tint-active-alpha: 0.34;\n    --lg-glass-stroke-active: rgba(255, 255, 255, 0.82);\n    --lg-trend-up: #1e9e4a;\n    --lg-trend-up-bg: rgba(48, 209, 88, 0.18);\n    --lg-trend-down: #0a7ea4;\n    --lg-trend-down-bg: rgba(43, 179, 208, 0.18);\n    --lg-cover-badge: #0a7ea4;\n    /* A tile or chip held down. */\n    --lg-press-fill: rgba(255, 255, 255, 0.9);\n    --lg-press-stroke: rgba(94, 92, 230, 0.65);\n    --lg-press-label: #3f3dbf;\n    --lg-press-glow: rgba(94, 92, 230, 0.3);\n    --lg-motion-label: #b36a00;\n    /* Group panel: a container that holds glass cards, so it must not be glass itself. */\n    --lg-group-panel: rgba(255, 255, 255, 0.32);\n    --lg-group-panel-stroke: rgba(255, 255, 255, 0.54);\n    --lg-separator-line: rgba(28, 28, 30, 0.12);\n\n    --lg-accent: #ffb340;\n    --lg-accent-deep: #ff8a1f;\n    --lg-heat: #ff6a3d;\n    --lg-heat-deep: #ff2d55;\n    --lg-cool: #5ac8fa;\n    --lg-cool-deep: #0a84ff;\n    --lg-switch-accent: #0a84ff;\n    --lg-switch-accent-light: #6fc3ff;\n    --lg-sensor-accent: #ff9f0a;\n    --lg-alert: #ff9f0a;\n    --lg-lock-locked: #30d158;\n    --lg-lock-locked-deep: #1e9e4a;\n    --lg-lock-unlocked: #ff6b5c;\n    --lg-lock-unlocked-deep: #ff3b30;\n    --lg-warn: #ffd60a;\n    --lg-warn-deep: #e6a800;\n    --lg-warn-text: #b8860b;\n    --lg-cover-accent: #2bb3d0;\n    --lg-cover-accent-deep: #0a7ea4;\n    --lg-slider-accent: #5e5ce6;\n    --lg-slider-accent-deep: #3f3dbf;\n    --lg-slider-accent-light: #9e9cff;\n    --lg-slider-fill-light: #b0afff;\n    --lg-motion: #7c3aed;\n    --lg-motion-light: #a66bff;\n    --lg-rgb-accent: #b15cff;\n\n    --lg-font-ui: \"Inter\", \"SF Pro Text\", Roboto, system-ui, -apple-system, sans-serif;\n    --lg-font-jp: \"Inter\", \"Noto Sans JP\", \"Hiragino Sans\", \"SF Pro Text\", Roboto, system-ui, sans-serif;\n\n    --lg-radius: 40px;\n    --lg-blur: 7px;\n    --lg-saturation: 1.35;\n  }\n\n  :host([dark]) {\n    --lg-text-primary: #ffffff;\n    --lg-text-secondary: rgba(235, 235, 245, 0.65);\n    --lg-glass-tint: 28, 28, 30;\n    --lg-glass-tint-alpha: 0.24;\n    --lg-glass-stroke: rgba(255, 255, 255, 0.25);\n    --lg-glass-inner: rgba(255, 255, 255, 0.12);\n    --lg-static-glass-highlight: rgba(255, 255, 255, 0.18);\n    --lg-static-glass-sheen: rgba(255, 255, 255, 0.09);\n    --lg-static-glass-lowlight: rgba(0, 0, 0, 0.26);\n    --lg-track-bg: rgba(255, 255, 255, 0.14);\n    --lg-knob-solid: #f2f2f7;\n    --lg-knob-solid-rim: rgba(28, 28, 30, 0.12);\n    --lg-knob-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.4), 0 6px 14px rgba(0, 0, 0, 0.42);\n    --lg-knob-shadow-active: 0 1px 6px rgba(0, 0, 0, 0.44), 0 10px 24px rgba(0, 0, 0, 0.5);\n    --lg-slider-bar-bg: rgba(120, 120, 128, 0.36);\n    --lg-slider-mark: rgba(255, 255, 255, 0.4);\n    --lg-shadow-glass: rgba(0, 0, 0, 0.45);\n    --lg-segment-selected: rgba(255, 255, 255, 0.2);\n    --lg-glass-tint-active: 255, 255, 255;\n    --lg-glass-tint-active-alpha: 0.22;\n    --lg-glass-stroke-active: rgba(255, 255, 255, 0.36);\n    --lg-trend-up: #4cde73;\n    --lg-trend-up-bg: rgba(48, 209, 88, 0.2);\n    --lg-trend-down: #5dd6ee;\n    --lg-trend-down-bg: rgba(93, 214, 238, 0.2);\n    --lg-cover-badge: #5dd6ee;\n    --lg-press-fill: rgba(94, 92, 230, 0.35);\n    --lg-press-stroke: rgba(176, 175, 255, 0.8);\n    --lg-press-label: #ffffff;\n    --lg-press-glow: rgba(94, 92, 230, 0.4);\n    --lg-motion-label: #ffc46b;\n    --lg-group-panel: rgba(255, 255, 255, 0.08);\n    --lg-group-panel-stroke: rgba(255, 255, 255, 0.12);\n    --lg-separator-line: rgba(255, 255, 255, 0.14);\n  }\n\n  /* Clear glass is reserved for surfaces over photos/video or user-selected showcase UI. */\n  :host([glass-variant=\"clear\"]) {\n    --lg-glass-tint-alpha: 0.07;\n    --lg-blur: 3px;\n    --lg-saturation: 1.45;\n  }\n\n  :host([dark][glass-variant=\"clear\"]) {\n    --lg-glass-tint-alpha: 0.1;\n  }\n", Mi = "\n  :host {\n    display: inline-block;\n    width: auto;\n    max-width: 100%;\n    container-type: normal;\n  }\n  .card {\n    width: auto;\n    min-width: 36px;\n    min-height: 36px;\n    padding: 0;\n    border-radius: 18px;\n  }\n  .card:focus-visible {\n    outline: 2px solid var(--badge-color, var(--lg-cool-deep));\n    outline-offset: 2px;\n  }\n  .badge {\n    min-height: 36px;\n    max-width: min(320px, 80vw);\n    padding: 0 12px;\n    border-radius: inherit;\n    background: transparent;\n    box-shadow: none;\n    font-size: var(--ha-badge-font-size, 12px);\n  }\n", Ni = /* @__PURE__ */ new Set([
	"alarm_control_panel",
	"automation",
	"binary_sensor",
	"climate",
	"cover",
	"fan",
	"humidifier",
	"input_boolean",
	"light",
	"lock",
	"media_player",
	"remote",
	"siren",
	"switch",
	"vacuum"
]), Pi = /* @__PURE__ */ new Set([
	"closed",
	"disarmed",
	"idle",
	"locked",
	"not_home",
	"off",
	"paused",
	"standby",
	"unavailable",
	"unknown"
]), Fi = {
	alarm_control_panel: "mdi:shield-home-outline",
	automation: "mdi:robot",
	binary_sensor: "mdi:radiobox-marked",
	climate: "mdi:thermostat",
	cover: "mdi:blinds",
	device_tracker: "mdi:map-marker-radius",
	fan: "mdi:fan",
	humidifier: "mdi:air-humidifier",
	light: "mdi:lightbulb",
	lock: "mdi:lock",
	media_player: "mdi:play-circle-outline",
	person: "mdi:account",
	sensor: "mdi:gauge",
	switch: "mdi:toggle-switch-outline",
	todo: "mdi:format-list-checks",
	update: "mdi:package-up",
	vacuum: "mdi:robot-vacuum"
};
function Ii(e, t) {
	return t || (e.attributes.icon ? e.attributes.icon : Fi[e.entity_id.split(".")[0]] ?? "mdi:information-outline");
}
function Li(e, t) {
	let n = t.attributes.unit_of_measurement;
	return g(e, t, `${t.state}${n ? ` ${n}` : ""}`);
}
function Ri(e, t) {
	let n = e.entity_id.split(".")[0];
	if (!(t || Ni.has(n) && !Pi.has(e.state))) return;
	let r = t ?? "#0a84ff";
	return {
		color: r,
		bg: `color-mix(in srgb, ${r} 18%, transparent)`,
		stroke: `color-mix(in srgb, ${r} 30%, transparent)`,
		glow: `color-mix(in srgb, ${r} 55%, transparent)`
	};
}
function zi({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = h(t, a, e.name, e.entity ?? "Entity"), c = y(a), l = a ? Li(t, a) : i("unavailable"), u = e.show_icon !== !1, d = e.show_name === !0, p = e.show_state !== !1, m = [d ? o : void 0, p ? l : void 0].filter((e) => !!e).join(" · "), g = e.tap_action?.action === "none", _ = () => {
		g || f(n, e.entity);
	};
	return /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: r,
		variant: e.glass_variant,
		surface: "compact",
		sourceAccent: e.color,
		role: g ? void 0 : "button",
		tabIndex: g ? void 0 : 0,
		"aria-label": `${o}: ${l}`,
		onClick: _,
		onKeyDown: (e) => {
			g || e.key !== "Enter" && e.key !== " " || (e.preventDefault(), _());
		},
		style: {
			display: "flex",
			position: "relative"
		},
		children: /* @__PURE__ */ X(Jr, {
			label: m || void 0,
			icon: u && a ? Ii(a, e.icon) : void 0,
			style: a ? Ri(a, c ? void 0 : e.color) : void 0
		})
	});
}
var Bi = ki({
	tagName: "liquid-glass-entity-badge",
	component: zi,
	styles: [
		ji,
		Xr,
		Hr,
		Mi
	],
	getCardSize: () => 1,
	getStubConfig: (e, t, n) => ({ entity: t?.[0] ?? n?.[0] ?? Object.keys(e?.states ?? {}).find((t) => !y(e?.states[t])) ?? "sensor.example" })
});
//#endregion
//#region src/react/grid-options.ts
function Vi(e, t) {
	return Math.min(t, Math.max(1, Number.isFinite(e) ? Math.round(e) : t));
}
function Hi(e = 6) {
	return {
		rows: 2,
		min_rows: 2,
		max_rows: 2,
		columns: 6,
		min_columns: Vi(e, 6),
		max_columns: 12
	};
}
function Ui(e, t = 6, n = 6) {
	return {
		rows: e,
		min_rows: e,
		columns: t,
		min_columns: Vi(n, t),
		max_columns: 12
	};
}
function Wi(e = 12, t = 6) {
	return {
		columns: e,
		min_columns: Vi(t, e),
		max_columns: 12
	};
}
var Gi = () => ({
	rows: 1,
	min_rows: 1,
	max_rows: 1,
	columns: 12,
	min_columns: 3,
	max_columns: 12
}), Ki = { stop: () => {} };
function qi() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function $(e, t, n) {
	return qi() ? (e.set(t), n?.onComplete?.(), Ki) : Kn(e, t, n);
}
function Ji(e, t, n = .175) {
	if (qi()) {
		e.current = 0;
		return;
	}
	e.current = n, t.current();
}
//#endregion
//#region src/react/glass-slider.tsx
var Yi = .05, Xi = 30, Zi = {
	ease: Un(.34, 1.36, .42, 1),
	duration: .27
}, Qi = {
	ease: Un(.36, 0, .18, 1),
	duration: .46
}, $i = {
	mapSize: 128,
	depth: .2,
	dispersion: .5,
	scaleX: .06,
	scaleY: .06,
	clipToShape: !0,
	softEdge: !0,
	curvature: .55,
	splay: .5,
	bend: .1,
	bendWidth: .05,
	frost: 0,
	brightness: .06,
	specular: 1.5,
	sheenAngle: 45,
	sheenDark: !1,
	glow: .4,
	glowSpread: .5,
	glowFalloff: 1.5,
	sheen: 0,
	sheenWidth: 3,
	sheenFalloff: 1.5,
	edgeShadow: "0 2px 6px rgba(0, 0, 0, 0.16)",
	edgeInsetShadow: "0 -4px 10px rgba(0, 0, 0, 0.12)"
}, ea = {
	restEdgeShadow: "0 1.333px 5.333px rgba(0, 0, 0, 0.5)",
	scaleX: .133,
	scaleY: .135,
	brightness: .12,
	sheenAngle: 45,
	glowFalloff: 1.5,
	sheen: .5,
	sheenWidth: 1,
	sheenFalloff: 1.5
}, ta = {
	restEdgeShadow: "0 1.333px 5.333px rgba(46, 15, 15, 0.12)",
	scaleX: .1,
	scaleY: .1,
	brightness: -.02,
	sheenAngle: 30,
	glowFalloff: 2,
	sheen: 1,
	sheenWidth: 1,
	sheenFalloff: 1
}, na = { scaleY: .25 }, ra = typeof navigator < "u" && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent);
function ia(e, t) {
	let n = Er();
	return mt(() => Ar({
		...$i,
		...t === "dark" ? ea : ta,
		...ra ? na : null,
		...e ? null : {
			strength: 0,
			scaleX: 0,
			scaleY: 0,
			curvature: 0,
			dispersion: 0,
			bend: 0
		},
		sheenDark: t === "light"
	}, n), [
		n,
		e,
		t
	]);
}
var aa = "\n  .lg-react-slider {\n    --lg-effective-slider-height: var(--lg-slider-height, 44px);\n    --lg-effective-bar-height: var(--lg-slider-bar-height, 6px);\n    --lg-effective-thumb-width: var(--lg-slider-thumb-width, var(--lg-slider-knob-size, 22px));\n    --lg-effective-thumb-height: var(--lg-slider-thumb-height, 34px);\n    position: relative;\n    display: block;\n    width: 100%;\n    height: var(--lg-slider-height, 44px);\n    overflow: visible;\n    touch-action: none;\n    user-select: none;\n    -webkit-user-select: none;\n  }\n  .lg-react-slider.disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n  .slider-glass {\n    position: absolute !important;\n    overflow: visible !important;\n  }\n  .slider-content,\n  .slider-refraction-content { box-sizing: content-box; }\n  .slider-refraction-content {\n    display: flex;\n    align-items: center;\n  }\n  .slider-track {\n    position: relative;\n    width: 100%;\n    height: var(--lg-effective-slider-height);\n    border-radius: 999px;\n    cursor: pointer;\n    touch-action: none;\n  }\n  .lg-react-slider.disabled .slider-track { cursor: not-allowed; }\n  .slider-track:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n  .slider-range-handle {\n    position: absolute;\n    z-index: 5;\n    top: 0;\n    width: var(--lg-effective-thumb-width);\n    height: 100%;\n    transform: translateX(-50%);\n    border-radius: 999px;\n    pointer-events: none;\n  }\n  .slider-range-handle:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n  .slider-bar,\n  .slider-refraction-bar {\n    position: absolute;\n    inset-inline: 0;\n    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-bar-height)) / 2);\n    height: var(--lg-effective-bar-height);\n    overflow: hidden;\n    border-radius: 999px;\n    background: var(--lg-slider-track, var(--lg-slider-bar-bg));\n  }\n  .slider-refraction-bar {\n    position: relative;\n    inset: auto;\n    top: auto;\n    transform-origin: center;\n  }\n  .slider-fill {\n    position: absolute;\n    inset-block: 0;\n    left: 0;\n    border-radius: inherit;\n    background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));\n    pointer-events: none;\n  }\n  .slider-fill.clipped {\n    inset-inline: 0;\n    transition: clip-path 0.35s cubic-bezier(0.3, 0.8, 0.3, 1);\n  }\n  .lg-react-slider.active .slider-fill.clipped { transition: none; }\n  .slider-anchor {\n    position: absolute;\n    top: 50%;\n    width: 2px;\n    height: calc(var(--lg-effective-bar-height) + 6px);\n    margin-left: -1px;\n    transform: translateY(-50%);\n    border-radius: 1px;\n    background: var(--lg-slider-mark);\n    pointer-events: none;\n  }\n  .marks {\n    position: absolute;\n    inset-block: 0;\n    inset-inline: calc(var(--lg-effective-thumb-width) / 2 - 2px);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    pointer-events: none;\n  }\n  .marks span {\n    width: 4px;\n    height: 4px;\n    border-radius: 50%;\n    background: var(--lg-slider-mark);\n  }\n  .slider-knob {\n    position: absolute;\n    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-thumb-height)) / 2);\n    left: 0;\n    width: var(--lg-effective-thumb-width);\n    height: var(--lg-effective-thumb-height);\n    border-radius: 999px;\n    pointer-events: none;\n  }\n  .slider-knob.static {\n    background: var(--lg-knob-solid);\n    box-shadow: var(--lg-knob-shadow);\n  }\n  .knob-probe {\n    position: absolute;\n    visibility: hidden;\n    width: var(--lg-effective-thumb-width);\n    height: var(--lg-effective-thumb-height);\n    pointer-events: none;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .slider-fill.clipped { transition-duration: 0.01ms !important; }\n  }\n", oa = (e, t, n, r) => {
	let i = Math.max(0, e - n), a = e * Yi, o = Math.ceil(.5 * Math.max(n / 2, r / 2) + a) + 2;
	return {
		trackW: e,
		controlH: t,
		thumbW: n,
		thumbH: r,
		pad: o,
		fullW: e + 2 * o,
		fullH: t + 2 * o,
		travel: i,
		refractionTrackH: Math.round(.75 * r)
	};
}, sa = oa(240, 44, 22, 34), ca = (e, t) => e.trackW === t.trackW && e.controlH === t.controlH && e.thumbW === t.thumbW && e.thumbH === t.thumbH && e.pad === t.pad;
function la({ value: e, highValue: t, min: n, max: r, step: i, keyboardStep: a, restTintOpacity: o = 1, disabled: s = !1, refraction: c, scheme: l = "light", showFill: d = !0, clipFill: f = !1, showKnob: p = !0, fillFrom: m, ticks: h = 0, label: g, valueText: _, rangeLabels: v, trackContent: y, thumbContent: b, onInput: x, onChange: S }) {
	let C = Er(), w = ia(c, l), T = t !== void 0, E = Y(null), D = Y(null), O = Y(null), k = Y(null), A = Y(!1), j = Y(0), M = Y(0), N = Y("low"), P = Y(sa), F = Y({
		value: e,
		highValue: t,
		min: n,
		max: r,
		step: i
	});
	F.current = {
		value: e,
		highValue: t,
		min: n,
		max: r,
		step: i
	};
	let I = Y(o);
	I.current = o;
	let [L, ee] = q(sa), [R, z] = q("low"), [B, V] = q(), [te, ne] = q(!1), re = Y(void 0), H = ht((e, t = P.current) => {
		let n = F.current.max - F.current.min;
		return n > 0 ? (e - F.current.min) / n * t.travel : 0;
	}, []), ie = ht((e, t = P.current) => {
		let { min: n, max: r, step: i } = F.current, a = u(e, 0, t.travel), o = t.travel > 0 ? n + a / t.travel * (r - n) : n;
		return u(i > 0 ? Math.round((o - n) / i) * i + n : o, n, r);
	}, []), U = Y(e), W = mt(() => {
		let e = Z(sa.travel * u((U.current - F.current.min) / (F.current.max - F.current.min || 1), 0, 1)), t = Z(sa.fullW), n = Z(sa.pad), r = Z(sa.thumbW), i = Z(sa.thumbW / 2), a = Z(sa.thumbH / 2), o = Z(Math.min(sa.thumbW, sa.thumbH) / 2), s = Z(I.current), c = Z(.85), l = Z(.525), d = Z(0), f = Hn([d], () => 1 - d.get()), p = Z(0);
		return {
			thumbX: e,
			surfaceW: t,
			pad: n,
			thumbW: r,
			halfW: i,
			halfH: a,
			radius: o,
			tintOpacity: s,
			trackScaleX: c,
			trackScaleY: l,
			shadowOpacity: d,
			restShadowOpacity: f,
			stretch: p,
			lensX: Hn([
				e,
				t,
				n,
				r
			], () => (n.get() + r.get() / 2 + e.get()) / t.get()),
			lensW: Hn([i, p], () => i.get() * (1 - .2 * p.get()) * 2),
			lensH: Hn([a, p], () => a.get() * (1 + .4 * p.get()) * 2)
		};
	}, []), G = Y(0), ae = Y(() => {}), oe = mt(() => Z(0), []);
	Sr(c ? W.thumbX : oe, W.stretch, G, ae);
	let se = ht(() => {
		let n = E.current, r = D.current, i = O.current;
		if (!n || !r || !i) return;
		let a = n.getBoundingClientRect(), o = r.getBoundingClientRect(), s = i.getBoundingClientRect(), c = P.current, l = oa(a.width || o.width || c.trackW, o.height || c.controlH, s.width || i.offsetWidth || c.thumbW, s.height || i.offsetHeight || c.thumbH);
		if (P.current = l, W.surfaceW.set(l.fullW), W.pad.set(l.pad), W.thumbW.set(l.thumbW), !A.current) {
			W.halfW.set(l.thumbW / 2), W.halfH.set(l.thumbH / 2), W.radius.set(Math.min(l.thumbW, l.thumbH) / 2);
			let n = N.current === "high" ? t ?? e : e;
			W.thumbX.set(H(n, l));
		}
		ee((e) => ca(e, l) ? e : l);
	}, [
		t,
		W,
		e,
		H
	]);
	ft(() => {
		if (se(), typeof ResizeObserver > "u" || !E.current) return;
		let e = new ResizeObserver(se);
		return e.observe(E.current), () => e.disconnect();
	}, [se]), J(() => {
		if (A.current || !p) return;
		let n = N.current === "high" ? t ?? e : e;
		W.thumbX.set(H(n));
	}, [
		t,
		W.thumbX,
		p,
		e,
		H
	]), J(() => () => {
		window.clearTimeout(re.current);
		let e = k.current;
		e !== null && D.current?.hasPointerCapture?.(e) && D.current.releasePointerCapture(e);
	}, []);
	let ce = ht(() => {
		c && ($(W.halfW, 1.5 * P.current.thumbW / 2, Zi), $(W.halfH, 1.5 * P.current.thumbH / 2, Zi), $(W.radius, 1.5 * Math.min(P.current.thumbW, P.current.thumbH) / 2, Zi), $(W.tintOpacity, 0, Zi), $(W.trackScaleX, .95, Zi), $(W.trackScaleY, .975, Zi), $(W.shadowOpacity, 1, Zi));
	}, [W, c]), le = ht(() => {
		c && ($(W.halfW, P.current.thumbW / 2, Qi), $(W.halfH, P.current.thumbH / 2, Qi), $(W.radius, Math.min(P.current.thumbW, P.current.thumbH) / 2, Qi), $(W.tintOpacity, I.current, Qi), $(W.trackScaleX, .85, Qi), $(W.trackScaleY, .525, Qi), $(W.shadowOpacity, 0, Qi));
	}, [W, c]), ue = ht(() => {
		ce(), c && Ji(G, ae);
	}, [ce, c]), de = B?.handle === "low" ? B.value : e, fe = B?.handle === "high" ? B.value : t ?? e, pe = (e) => {
		if (s || !p || e.button !== 0 || k.current !== null) return;
		e.preventDefault(), se(), k.current = e.pointerId, e.currentTarget.setPointerCapture?.(e.pointerId), A.current = !0, e.currentTarget.focus({ preventScroll: !0 });
		let t = e.currentTarget.getBoundingClientRect(), n = u(e.clientX - t.left - P.current.thumbW / 2, 0, P.current.travel), r = ie(n), i = T && Math.abs(r - fe) < Math.abs(r - de) ? "high" : "low";
		N.current = i, z(i), W.thumbX.set(n), V({
			handle: i,
			value: r
		}), j.current = e.clientX, M.current = n, ue(), x(r, i);
	}, me = (e) => {
		if (e.pointerId !== k.current) return;
		let t = M.current + e.clientX - j.current, n = P.current.trackW * Yi, r = n * Xi;
		t < 0 ? t = -Cr(-t, n, r) : t > P.current.travel && (t = P.current.travel + Cr(t - P.current.travel, n, r)), W.thumbX.set(t);
		let i = ie(t), a = N.current;
		V({
			handle: a,
			value: i
		}), x(i, a);
	}, he = (e) => {
		if (e.pointerId !== k.current) return;
		let t = N.current, n = u(W.thumbX.get(), 0, P.current.travel), r = ie(n);
		k.current = null, A.current = !1, G.current = 0, V(void 0), $(W.thumbX, n, Qi), le(), S(r, t);
	}, ge = (e, t = "low") => {
		if (s || !p) return;
		let o = a ?? (i > 0 ? i : (r - n) / 20), c = T && t === "high" ? de : n, l = T && t === "low" ? fe : r, d = t === "high" ? fe : de;
		if (e.key === "ArrowRight" || e.key === "ArrowUp") d += o;
		else if (e.key === "ArrowLeft" || e.key === "ArrowDown") d -= o;
		else if (e.key === "Home") d = c;
		else if (e.key === "End") d = l;
		else return;
		e.preventDefault(), e.stopPropagation(), d = u(d, c, l), N.current = t, z(t), W.thumbX.set(H(d)), ne(!0), ue(), window.clearTimeout(re.current), re.current = window.setTimeout(() => {
			G.current = 0, ne(!1), le();
		}, 320), S(d, t);
	}, _e = r - n || 1, ve = (e) => u((e - n) / _e, 0, 1), ye = ve(de), be = ve(fe), xe = p ? "(100% - var(--lg-effective-thumb-width))" : "100%", Se = (e) => p ? `calc(var(--lg-effective-thumb-width) / 2 + ${xe} * ${e})` : `${(e * 100).toFixed(3)}%`, Ce = m === void 0 ? void 0 : u((m - n) / _e, 0, 1), we = Ce === void 0 ? T ? ye : 0 : Math.min(Ce, be), K = Ce === void 0 ? be : Math.max(Ce, be), Te = f ? { clipPath: `inset(0 calc(100% - ${Se(K)}) 0 ${T || Ce !== void 0 ? Se(we) : "0px"} round 999px)` } : Ce !== void 0 || T ? {
		left: Se(we),
		width: `calc(${xe} * ${K - we})`
	} : { width: Se(K) }, Ee = T ? [{
		key: "low",
		ratio: ye
	}, {
		key: "high",
		ratio: be
	}] : [{
		key: "low",
		ratio: be
	}], De = B !== void 0 || te, Oe = /* @__PURE__ */ X("div", {
		ref: D,
		className: "slider-track",
		role: T ? "group" : "slider",
		tabIndex: T || s ? -1 : 0,
		"aria-label": g,
		"aria-valuemin": T ? void 0 : n,
		"aria-valuemax": T ? void 0 : r,
		"aria-valuenow": T ? void 0 : fe,
		"aria-valuetext": T ? void 0 : _,
		"aria-disabled": s,
		onPointerDown: pe,
		onPointerMove: me,
		onPointerUp: he,
		onPointerCancel: he,
		onKeyDown: T ? void 0 : ge,
		onDragStart: (e) => e.preventDefault(),
		children: [
			/* @__PURE__ */ X("div", {
				className: "slider-bar",
				children: d && /* @__PURE__ */ X("div", {
					className: `slider-fill${f ? " clipped" : ""}`,
					style: Te
				})
			}),
			y,
			Ce !== void 0 && /* @__PURE__ */ X("div", {
				className: "slider-anchor",
				style: { left: Se(Ce) },
				"aria-hidden": "true"
			}),
			h > 0 && /* @__PURE__ */ X("div", {
				className: "marks",
				"aria-hidden": "true",
				children: Array.from({ length: h }, (e, t) => /* @__PURE__ */ X("span", {}, t))
			}),
			T && p && [{
				handle: "low",
				ratio: ye,
				current: de,
				lower: n,
				upper: fe
			}, {
				handle: "high",
				ratio: be,
				current: fe,
				lower: de,
				upper: r
			}].map(({ handle: e, ratio: t, current: n, lower: r, upper: i }, a) => /* @__PURE__ */ X("div", {
				className: "slider-range-handle",
				style: { left: Se(t) },
				role: "slider",
				tabIndex: s ? -1 : 0,
				"aria-label": v?.[a] ?? `${g} ${e}`,
				"aria-valuemin": r,
				"aria-valuemax": i,
				"aria-valuenow": n,
				"aria-disabled": s,
				onKeyDown: (t) => ge(t, e)
			}, `a11y-${e}`)),
			p && /* @__PURE__ */ X("div", {
				ref: O,
				className: "knob-probe",
				"aria-hidden": "true"
			}),
			p && Ee.filter(({ key: e }) => e !== R).map(({ key: e, ratio: t }) => /* @__PURE__ */ X("div", {
				className: "slider-knob static",
				style: { left: `calc(${xe} * ${t})` },
				"aria-hidden": "true",
				children: b
			}, e)),
			p && /* @__PURE__ */ X(wr, {
				x: W.thumbX,
				className: `slider-knob moving${c ? "" : " static"}`,
				"aria-hidden": "true",
				children: b
			})
		]
	});
	return !p || !c ? /* @__PURE__ */ X("div", {
		ref: E,
		className: `lg-react-slider${De ? " active" : ""}${s ? " disabled" : ""}`,
		children: Oe
	}) : /* @__PURE__ */ X("div", {
		ref: E,
		className: `lg-react-slider${De ? " active" : ""}${s ? " disabled" : ""}`,
		children: /* @__PURE__ */ X(pr, {
			className: "slider-glass",
			optics: w,
			center: {
				x: W.lensX,
				y: .5
			},
			size: [W.lensW, W.lensH],
			radius: W.radius,
			unstable_lens: {
				tintColor: "var(--lg-knob-solid)",
				tintOpacity: W.tintOpacity,
				shadowOpacity: W.shadowOpacity,
				restShadowOpacity: W.restShadowOpacity
			},
			filterResolution: Dr(C),
			behind: l === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				left: -L.pad,
				top: -L.pad,
				width: L.fullW,
				height: L.fullH
			},
			refract: c ? /* @__PURE__ */ X("div", {
				className: "slider-refraction-content",
				"data-lg-refraction-source": "copy",
				"aria-hidden": "true",
				style: {
					padding: L.pad,
					width: L.trackW,
					height: L.controlH
				},
				children: /* @__PURE__ */ X(wr, {
					className: "slider-refraction-bar",
					scaleX: W.trackScaleX,
					scaleY: W.trackScaleY,
					style: {
						width: L.trackW,
						height: L.refractionTrackH,
						borderRadius: L.refractionTrackH / 2
					},
					children: d && /* @__PURE__ */ X("div", {
						className: `slider-fill${f ? " clipped" : ""}`,
						style: Te
					})
				})
			}) : void 0,
			children: /* @__PURE__ */ X("div", {
				className: "slider-content",
				style: { padding: L.pad },
				children: Oe
			})
		})
	});
}
//#endregion
//#region src/react/glass-switch.tsx
var ua = Un(.34, 1.36, .42, 1), da = Un(.36, 0, .18, 1), fa = {
	ease: ua,
	duration: .52
}, pa = {
	ease: ua,
	duration: .26
}, ma = {
	ease: da,
	duration: .46
}, ha = {
	mapSize: 256,
	depth: .2,
	dispersion: .65,
	strength: .19,
	clipToShape: !0,
	softEdge: !0,
	curvature: .3,
	splay: .6,
	bend: .1,
	bendWidth: .06,
	frost: 0,
	brightness: .05,
	specular: 1.2,
	sheenAngle: 45,
	sheenDark: !1,
	glow: .05,
	glowSpread: .5,
	glowFalloff: 1.5,
	sheen: .45,
	sheenWidth: 2,
	sheenFalloff: 1.5,
	edgeShadow: "0 2px 6px rgba(0, 0, 0, 0.16)",
	edgeInsetShadow: "0 -4px 10px rgba(0, 0, 0, 0.12)",
	restEdgeShadow: "0 1px 3px rgba(0, 0, 0, 0.24), 0 4px 10px rgba(0, 0, 0, 0.14)"
}, ga = {
	brightness: .12,
	glow: .4,
	sheen: .5
}, _a = {
	brightness: -.02,
	sheenAngle: 30,
	specular: 1.5,
	glow: .4,
	glowSpread: .5,
	glowFalloff: 2,
	sheen: 1,
	sheenWidth: 1.5,
	sheenFalloff: 1
}, va = "color-mix(in srgb, var(--glass-track), var(--glass-active) calc(var(--switch-progress, 0) * 100%))", ya = "\n  .lg-glass-switch:has(> input:focus-visible) {\n    outline: 2px solid var(--glass-active, var(--lg-accent));\n    outline-offset: 3px;\n  }\n  .lg-glass-switch-static-puck {\n    width: 100%;\n    height: 100%;\n    border-radius: inherit;\n    background: #fff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 4px 10px rgba(0, 0, 0, 0.14);\n    transform: scale(1);\n    transition:\n      transform 0.26s cubic-bezier(0.34, 1.36, 0.42, 1),\n      background 0.26s ease,\n      box-shadow 0.26s ease;\n  }\n  .lg-glass-switch-static-puck.expanded {\n    background: rgba(255, 255, 255, 0.34);\n    box-shadow:\n      inset 0 0 0 1px rgba(255, 255, 255, 0.72),\n      0 2px 6px rgba(0, 0, 0, 0.16);\n    transform: scale(1.5);\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .lg-glass-switch-static-puck {\n      transition-duration: 0.01ms;\n    }\n  }\n";
function ba({ checked: e, onCheckedChange: t, disabled: n = !1, ariaLabel: r, width: i = 74, height: a = 28, refraction: o = !0, scheme: s = "light", trackColor: c, activeColor: l, surface: u }) {
	let d = Er(), f = s === "dark", p = Math.round(.6 * i), m = a - 6, h = i - p - 6, g = i * .15, _ = g * 10, v = a / 2, y = m / 2, b = p / 2, x = m / 2, S = Math.round(.75 * a), C = Math.ceil(.5 * Math.max(b, x) + g) + 2, w = i + 2 * C, T = a + 2 * C, E = Y(h), D = Y(p), O = Y(w), k = Y(C), A = Y(b), j = Y(x), M = Y(y);
	ft(() => {
		E.current = h, D.current = p, O.current = w, k.current = C, A.current = b, j.current = x, M.current = y;
	});
	let N = mt(() => {
		let t = Z(e ? E.current : 0), n = Hn([t], () => (k.current + 3 + D.current / 2 + t.get()) / O.current), r = Z(A.current), i = Z(j.current), a = Z(M.current), o = Z(1), s = Z(.85), c = Z(.525), l = Z(0), u = Hn([l], () => 1 - l.get()), d = Z(0);
		return {
			thumbX: t,
			lensX: n,
			halfWidth: r,
			halfHeight: i,
			radius: a,
			tintOpacity: o,
			trackScaleX: s,
			trackScaleY: c,
			shadowOpacity: l,
			restShadowOpacity: u,
			stretch: d,
			lensWidth: Hn([r, d], () => r.get() * (1 - .2 * d.get()) * 2),
			lensHeight: Hn([i, d], () => i.get() * (1 + .4 * d.get()) * 2),
			edgeBias: Hn([o], () => .5 * o.get())
		};
	}, []), P = Y(0), F = Y(() => {});
	Sr(N.thumbX, N.stretch, P, F);
	let [I, L] = q(!1), [ee, R] = q(!1), z = () => {
		L(!0), $(N.halfWidth, 1.5 * A.current, pa), $(N.halfHeight, 1.5 * j.current, pa), $(N.radius, 1.5 * M.current, pa), $(N.tintOpacity, 0, pa), $(N.trackScaleX, .95, pa), $(N.trackScaleY, .975, pa), $(N.shadowOpacity, 1, pa);
	}, B = () => {
		L(!1), $(N.halfWidth, A.current, ma), $(N.halfHeight, j.current, ma), $(N.radius, M.current, ma), $(N.tintOpacity, 1, ma), $(N.trackScaleX, .85, ma), $(N.trackScaleY, .525, ma), $(N.shadowOpacity, 0, ma);
	}, V = Y("idle"), te = Y(void 0), ne = Y(void 0), re = Y(!0), H = Y(!1), ie = Y(null), U = Y(null), W = Y(null), G = Y(0), ae = Y(0), oe = Y(!1), se = Y(null);
	J(() => {
		re.current = !0;
		let e = U.current;
		return () => {
			if (re.current = !1, clearTimeout(te.current), clearTimeout(ne.current), W.current !== null && e) try {
				e.releasePointerCapture(W.current);
			} catch {}
		};
	}, []), J(() => {
		ee || V.current === "tap" || (se.current = $(N.thumbX, e ? h : 0, fa));
	}, [
		e,
		ee,
		N.thumbX,
		h
	]), ft(() => {
		let e = (e) => {
			let t = E.current;
			ie.current?.style.setProperty("--switch-progress", String(t > 0 ? Math.max(0, Math.min(1, e / t)) : 0));
		};
		return e(N.thumbX.get()), N.thumbX.on("change", e);
	}, [N.thumbX]);
	let ce = mt(() => Ar({
		...ha,
		...f ? ga : _a,
		sheenDark: !f
	}, d), [f, d]), le = (e) => {
		H.current || (t?.(e), V.current === "idle" && (V.current = "tap", z(), clearTimeout(ne.current), ne.current = setTimeout(B, 290), se.current = $(N.thumbX, e ? h : 0, {
			...fa,
			onComplete: () => {
				re.current && V.current === "tap" && (V.current = "idle");
			}
		})));
	}, ue = /* @__PURE__ */ X(wr, {
		ref: U,
		"data-lg-glass-switch-thumb": "",
		x: N.thumbX,
		style: {
			position: "absolute",
			width: p,
			height: m,
			top: 3,
			left: 3,
			borderRadius: y,
			touchAction: "none",
			userSelect: "none",
			WebkitUserSelect: "none",
			willChange: "transform"
		},
		onPointerDown: (e) => {
			W.current !== null || n || e.button !== 0 || (W.current = e.pointerId, e.currentTarget.setPointerCapture(e.pointerId), G.current = e.clientX, ae.current = N.thumbX.get(), oe.current = !1, R(!0), H.current = !0, clearTimeout(te.current), clearTimeout(ne.current), V.current = "pending", te.current = setTimeout(() => {
				V.current === "pending" && (V.current = "hold", se.current?.stop(), z(), Ji(P, F));
			}, 170));
		},
		onPointerMove: (e) => {
			if (e.pointerId !== W.current) return;
			let t = e.clientX - G.current;
			if (!oe.current) {
				if (Math.abs(t) < 3) return;
				oe.current = !0, se.current?.stop(), ae.current = N.thumbX.get(), G.current = e.clientX, clearTimeout(te.current), P.current = 0, V.current !== "hold" && (V.current = "hold", z());
			}
			let n = ae.current + e.clientX - G.current;
			n < 0 ? n = -Cr(-n, g, _) : n > h && (n = h + Cr(n - h, g, _)), N.thumbX.set(n);
		},
		onPointerUp: (n) => {
			if (n.pointerId === W.current) {
				if (W.current = null, clearTimeout(te.current), R(!1), oe.current) {
					V.current = "idle", B();
					let n = Math.max(0, Math.min(h, N.thumbX.get())) > h / 2;
					se.current = $(N.thumbX, n ? h : 0, fa), n !== e && t?.(n), requestAnimationFrame(() => {
						H.current = !1;
					});
					return;
				}
				if (V.current === "pending" || V.current === "tap") {
					V.current = "tap", H.current = !1, z(), clearTimeout(ne.current), ne.current = setTimeout(B, 290), se.current = $(N.thumbX, e ? 0 : h, {
						...fa,
						onComplete: () => {
							re.current && V.current === "tap" && (V.current = "idle");
						}
					});
					return;
				}
				V.current = "idle", P.current = 0, B(), se.current = $(N.thumbX, e ? h : 0, fa), requestAnimationFrame(() => {
					H.current = !1;
				});
			}
		},
		onPointerCancel: (t) => {
			t.pointerId === W.current && (W.current = null, clearTimeout(te.current), R(!1), P.current = 0, V.current = "idle", B(), se.current = $(N.thumbX, e ? h : 0, fa), requestAnimationFrame(() => {
				H.current = !1;
			}));
		},
		onDragStart: (e) => e.preventDefault(),
		children: !o && /* @__PURE__ */ X("div", { className: `lg-glass-switch-static-puck${I ? " expanded" : ""}` })
	}), de = c ?? (f ? "#2a2828" : "#e1dfdf"), fe = l ?? "#0a84ff", pe = u ?? (f ? "#1f1f24" : "#ffffff"), me = /* @__PURE__ */ X("div", {
		"aria-hidden": "true",
		style: {
			width: i,
			height: a,
			borderRadius: v,
			background: va,
			position: "relative",
			overflow: "visible"
		},
		children: ue
	});
	return /* @__PURE__ */ X("label", {
		ref: ie,
		className: `toggle lg-glass-switch${e ? " on" : ""}`,
		style: {
			flexShrink: 0,
			width: i,
			height: a,
			overflow: "visible",
			cursor: n ? "not-allowed" : "pointer",
			opacity: n ? .4 : void 0,
			borderRadius: 999,
			display: "block",
			position: "relative",
			"--glass-track": de,
			"--glass-active": fe
		},
		children: [/* @__PURE__ */ X("input", {
			type: "checkbox",
			role: "switch",
			checked: e,
			onChange: (e) => le(e.target.checked),
			onClick: (e) => {
				H.current && e.preventDefault();
			},
			onKeyDown: (t) => {
				t.key === "Enter" && (t.preventDefault(), le(!e));
			},
			disabled: n,
			"aria-label": r,
			style: {
				whiteSpace: "nowrap",
				clip: "rect(0 0 0 0)",
				clipPath: "inset(50%)",
				pointerEvents: "none",
				border: 0,
				width: 1,
				height: 1,
				margin: -1,
				padding: 0,
				position: "absolute",
				overflow: "hidden"
			}
		}), o ? /* @__PURE__ */ X(pr, {
			optics: ce,
			center: {
				x: N.lensX,
				y: .5
			},
			size: [N.lensWidth, N.lensHeight],
			radius: N.radius,
			unstable_lens: {
				tintColor: "white",
				tintOpacity: N.tintOpacity,
				shadowOpacity: N.shadowOpacity,
				restShadowOpacity: N.restShadowOpacity,
				edgeBias: N.edgeBias
			},
			filterResolution: Dr(d),
			behind: pe,
			style: {
				width: w,
				height: T,
				overflow: "visible",
				margin: -C
			},
			refract: /* @__PURE__ */ X("div", {
				style: {
					padding: C,
					height: a,
					display: "flex",
					alignItems: "center",
					boxSizing: "content-box"
				},
				children: /* @__PURE__ */ X(wr, {
					scaleX: N.trackScaleX,
					scaleY: N.trackScaleY,
					style: {
						width: i,
						height: S,
						borderRadius: S / 2,
						background: va
					}
				})
			}),
			children: /* @__PURE__ */ X("div", {
				style: { padding: C },
				children: me
			})
		}) : me]
	});
}
//#endregion
//#region src/react/use-optimistic-value.ts
var xa = 4e3;
function Sa(e, t, n = xa) {
	let [r, i] = q(), [a, o] = q(), s = Y(void 0);
	J(() => () => window.clearTimeout(s.current), []);
	let c = a !== void 0 && e !== void 0 && Math.abs(e - a) <= t;
	J(() => {
		c && (window.clearTimeout(s.current), o(void 0));
	}, [c]);
	let l = ht((e) => {
		i(void 0), o(e), window.clearTimeout(s.current), s.current = window.setTimeout(() => o(void 0), n);
	}, [n]), u = ht(() => {
		i(void 0), o(void 0), window.clearTimeout(s.current);
	}, []);
	return {
		value: r ?? a ?? e,
		optimistic: r !== void 0 || a !== void 0,
		setPreview: i,
		commit: l,
		reset: u
	};
}
function Ca(e, t, n = xa) {
	let [r, i] = q(), a = Y(void 0);
	J(() => () => window.clearTimeout(a.current), []);
	let o = r !== void 0 && Object.entries(r).every(([n, r]) => {
		let i = e[n];
		return i !== void 0 && Math.abs(i - r) <= t;
	});
	return J(() => {
		o && (window.clearTimeout(a.current), i(void 0));
	}, [o]), {
		pending: r,
		hold: ht((e, t) => {
			i((n) => ({
				...n,
				[e]: t
			})), window.clearTimeout(a.current), a.current = window.setTimeout(() => i(void 0), n);
		}, [n]),
		value: (t, n) => r?.[t] ?? e[t] ?? n
	};
}
//#endregion
//#region src/cards/light-card.tsx
var wa = i, Ta = "\n  /* Brightness keeps its two lamps beside the bar, where a thin slider leaves room. */\n  .brightness .bar-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .brightness .bar-row .lg-react-slider {\n    flex: 1;\n    min-width: 0;\n  }\n  .brightness .sun {\n    flex: none;\n    display: grid;\n    color: var(--sun-color, #6b5323);\n    --mdc-icon-size: 24px;\n  }\n  .brightness .sun-dim {\n    flex: none;\n    display: grid;\n    color: var(--lg-text-secondary);\n    --mdc-icon-size: 22px;\n  }\n  .temp .lg-react-slider {\n    --lg-slider-track: linear-gradient(90deg, #ffa63d 0%, #ffd9a0 40%, #fff7ec 65%, #bfdbff 100%);\n  }\n  .hue .lg-react-slider {\n    --lg-slider-track: linear-gradient(\n      90deg,\n      #ff3b30 0%,\n      #ffcc00 17%,\n      #34c759 33%,\n      #32ade6 50%,\n      #007aff 62%,\n      #af52de 78%,\n      #ff2d55 92%,\n      #ff3b30 100%\n    );\n  }\n  .sat .lg-react-slider {\n    --lg-slider-track: linear-gradient(90deg, #ffffff, var(--sat-color, #b15cff));\n  }\n  .favorites {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n  .favorites .label {\n    font-size: var(--lg-label);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n  .swatches {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-items: center;\n    gap: 6px;\n  }\n  .swatch {\n    flex: none;\n    width: var(--lg-swatch, 32px);\n    height: var(--lg-swatch, 32px);\n    border: 0;\n    border-radius: 50%;\n    padding: 0;\n    cursor: pointer;\n    background: var(--swatch);\n    box-shadow:\n      inset 0 0 0 1px rgba(255, 255, 255, 0.4),\n      0 2px 3px rgba(255, 255, 255, 0.55),\n      0 -2px 3px rgba(0, 0, 0, 0.2);\n    transition: transform 0.15s ease, box-shadow 0.15s ease;\n  }\n  .swatch.selected {\n    box-shadow:\n      inset 0 0 0 3px #fff,\n      0 0 0 2px var(--swatch-glow),\n      0 4px 10px var(--swatch-glow);\n  }\n  .swatch:active {\n    transform: scale(0.92);\n  }\n  .swatch.add {\n    background: var(--lg-track-bg);\n    color: var(--lg-text-secondary);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    display: grid;\n    place-items: center;\n    --mdc-icon-size: calc(var(--lg-swatch, 32px) * 0.5);\n  }\n  .chip-button {\n    width: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    padding: 9px 14px;\n    border: 0;\n    border-radius: inherit;\n    background: transparent;\n    color: inherit;\n    font: inherit;\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    cursor: pointer;\n  }\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-swatch: clamp(24px, 8.4cqi, 32px);\n    }\n  }\n";
function Ea(e) {
	let t = parseInt(e.replace("#", ""), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	].map((e) => u(e, 0, 255));
}
function Da({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), [o, c] = q(), l = Y(void 0), u = e.entity ? t?.states[e.entity] : void 0, d = h(t, u, e.name, e.entity ?? ""), p = () => f(n, e.entity), m = u?.state === "on", g = u?.attributes.brightness, _ = u?.attributes.hs_color, b = Sa(m && g !== void 0 ? Math.round(g / 255 * 100) : 0, 1), x = Sa(u?.attributes.color_temp_kelvin, 25), w = Sa(_?.[0], 1), T = Sa(_?.[1], 1);
	if (J(() => {
		m && g !== void 0 && (l.current = Math.round(g / 255 * 100));
	}, [m, g]), !u || y(u)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: d,
		label: a("unavailable"),
		onOpen: p
	}) });
	let E = (n, r) => void t?.callService("light", n, {
		entity_id: e.entity,
		...r
	}), O = u.attributes, k = O.supported_color_modes ?? [], A = e.show_brightness !== !1 && k.some((e) => e !== "onoff"), j = e.show_color_temp !== !1 && k.includes("color_temp"), M = e.show_color !== !1 && k.some((e) => [
		"hs",
		"rgb",
		"rgbw",
		"rgbww",
		"xy"
	].includes(e)), N = o ?? (M ? j && O.color_mode === "color_temp" ? "color_temp" : "color" : "color_temp"), P = M && N === "color", F = b.value ?? 0, I = [O.min_color_temp_kelvin ?? 2e3, O.max_color_temp_kelvin ?? 6500], L = x.value ?? I[0], ee = O.hs_color ?? [280, 85], R = w.value ?? ee[0], z = T.value ?? ee[1], B = O.rgb_color, V = !w.optimistic && !T.optimistic && B ? C(B) : C(S(R, z)), te = P ? V : "var(--lg-accent)", ne = m ? P ? {
		from: C(S(R, Math.min(z, 60))),
		to: V,
		glow: D(V, .24)
	} : {
		from: "#FFD36B",
		to: "var(--lg-accent-deep)",
		glow: "rgba(255, 165, 48, 0.24)"
	} : void 0, re = P ? C(S(R, Math.min(z, 10))) : "#FFF8EA", H = P ? C(S(R, Math.min(z, 30))) : "#FFE2A6", ie = P ? C(S(R, 60).map((e) => e * .5)) : "#6B5323", U = e.presets ?? [], W = e.favorites === !1 ? [] : e.favorites ?? wa, G = m ? [
		a("lit"),
		...A ? [`${F}%`] : [],
		...P ? [a("color")] : j && O.color_temp_kelvin ? [`${Math.round(L)}K`] : []
	].join(" · ") : l.current ? `${a("unlit")} · ${a("last")} ${l.current}%` : a("unlit"), ae = () => E("toggle"), oe = (n) => {
		if (n.scene) {
			t?.callService("scene", "turn_on", { entity_id: n.scene });
			return;
		}
		if (n.service) {
			v(t, n.service, {
				entity_id: e.entity,
				...n.data ?? {}
			});
			return;
		}
		let r = { ...n.data ?? {} };
		n.brightness !== void 0 && (r.brightness_pct = n.brightness), n.color_temp_kelvin !== void 0 && (r.color_temp_kelvin = n.color_temp_kelvin), n.rgb_color && (r.rgb_color = n.rgb_color), n.hs_color && (r.hs_color = n.hs_color), E("turn_on", r);
	};
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: P ? V : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X(Kr, {
						icon: e.icon ?? O.icon ?? "mdi:lightbulb",
						style: ne,
						onClick: ae
					}),
					/* @__PURE__ */ X(qr, {
						name: d,
						state: G,
						onClick: p
					}),
					/* @__PURE__ */ X(ba, {
						checked: m,
						onCheckedChange: ae,
						ariaLabel: d,
						activeColor: te,
						refraction: i,
						scheme: r ? "dark" : "light"
					})
				]
			}),
			M && j && /* @__PURE__ */ X("div", {
				className: "segment",
				children: ["color", "color_temp"].map((e) => /* @__PURE__ */ X("button", {
					className: N === e ? "selected" : void 0,
					onClick: () => c(e),
					children: /* @__PURE__ */ X("span", { children: a(e === "color" ? "color" : "color_temp") })
				}, e))
			}),
			A && /* @__PURE__ */ X("div", {
				className: "section brightness",
				style: {
					"--fill-from": re,
					"--fill-to": H,
					"--sun-color": m ? ie : "var(--lg-text-secondary)"
				},
				children: [/* @__PURE__ */ X("div", {
					className: "label-row",
					children: [/* @__PURE__ */ X("span", {
						className: "label",
						children: a("brightness")
					}), /* @__PURE__ */ X("span", {
						className: "value",
						children: [F, "%"]
					})]
				}), /* @__PURE__ */ X("div", {
					className: "bar-row",
					children: [
						/* @__PURE__ */ X("span", {
							className: "sun",
							children: /* @__PURE__ */ X(Q, { icon: "mdi:white-balance-sunny" })
						}),
						/* @__PURE__ */ X(la, {
							value: F,
							min: 0,
							max: 100,
							step: 1,
							showFill: m,
							refraction: i,
							scheme: r ? "dark" : "light",
							label: a("brightness"),
							onInput: b.setPreview,
							onChange: (e) => {
								b.commit(e), E("turn_on", { brightness_pct: Math.round(e) });
							}
						}),
						/* @__PURE__ */ X("span", {
							className: "sun-dim",
							children: /* @__PURE__ */ X(Q, { icon: "mdi:brightness-5" })
						})
					]
				})]
			}),
			j && N === "color_temp" && /* @__PURE__ */ X("div", {
				className: `section temp${m ? "" : " dim"}`,
				children: [
					/* @__PURE__ */ X("div", {
						className: "label-row",
						children: [/* @__PURE__ */ X("span", {
							className: "label",
							children: a("color_temp")
						}), /* @__PURE__ */ X("span", {
							className: "value",
							children: [Math.round(L), "K"]
						})]
					}),
					/* @__PURE__ */ X(la, {
						value: L,
						min: I[0],
						max: I[1],
						step: 50,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("color_temp"),
						onInput: x.setPreview,
						onChange: (e) => {
							x.commit(e), E("turn_on", { color_temp_kelvin: Math.round(e) });
						}
					}),
					/* @__PURE__ */ X("div", {
						className: "ticks",
						children: [/* @__PURE__ */ X("span", { children: [I[0], "K"] }), /* @__PURE__ */ X("span", { children: [I[1], "K"] })]
					})
				]
			}),
			M && N === "color" && /* @__PURE__ */ X(K, { children: [
				/* @__PURE__ */ X("div", {
					className: `section hue${m ? "" : " dim"}`,
					children: [/* @__PURE__ */ X("div", {
						className: "label-row",
						children: [/* @__PURE__ */ X("span", {
							className: "label",
							children: a("hue")
						}), /* @__PURE__ */ X("span", {
							className: "value",
							children: [Math.round(R), "°"]
						})]
					}), /* @__PURE__ */ X(la, {
						value: R,
						min: 0,
						max: 360,
						step: 1,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("hue"),
						onInput: w.setPreview,
						onChange: (e) => {
							w.commit(e), E("turn_on", { hs_color: [Math.round(e), Math.round(z)] });
						}
					})]
				}),
				/* @__PURE__ */ X("div", {
					className: `section sat${m ? "" : " dim"}`,
					style: { "--sat-color": C(S(R, 100)) },
					children: [/* @__PURE__ */ X("div", {
						className: "label-row",
						children: [/* @__PURE__ */ X("span", {
							className: "label",
							children: a("saturation")
						}), /* @__PURE__ */ X("span", {
							className: "value",
							children: [Math.round(z), "%"]
						})]
					}), /* @__PURE__ */ X(la, {
						value: z,
						min: 0,
						max: 100,
						step: 1,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("saturation"),
						onInput: T.setPreview,
						onChange: (e) => {
							T.commit(e), E("turn_on", { hs_color: [Math.round(R), Math.round(e)] });
						}
					})]
				}),
				W.length > 0 && /* @__PURE__ */ X("div", {
					className: `favorites${m ? "" : " muted"}`,
					children: [/* @__PURE__ */ X("div", {
						className: "label",
						children: a("favorites")
					}), /* @__PURE__ */ X("div", {
						className: "swatches",
						children: [W.map((e) => /* @__PURE__ */ X("button", {
							className: `swatch${m && e.toLowerCase() === V.toLowerCase() ? " selected" : ""}`,
							style: {
								"--swatch": e,
								"--swatch-glow": D(e, .5)
							},
							title: e,
							onClick: () => oe({
								name: e,
								rgb_color: Ea(e)
							})
						}, e)), /* @__PURE__ */ X("button", {
							className: "swatch add",
							onClick: p,
							title: "More",
							children: /* @__PURE__ */ X(Q, { icon: "mdi:plus" })
						})]
					})]
				})
			] }),
			U.length > 0 && /* @__PURE__ */ X("div", {
				className: `chips${m ? "" : " muted"}`,
				children: U.map((t, n) => /* @__PURE__ */ X(Wr, {
					className: "chip",
					refraction: i,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: te,
					style: { display: "flex" },
					children: /* @__PURE__ */ X("button", {
						className: "chip-button",
						onClick: () => oe(t),
						children: [t.icon && /* @__PURE__ */ X(Q, { icon: t.icon }), /* @__PURE__ */ X("span", { children: t.name })]
					})
				}, `${t.name}:${n}`))
			})
		]
	}) });
}
var Oa = ki({
	tagName: "liquid-glass-light-card",
	component: Da,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		ya,
		Ta
	],
	getCardSize: () => 5,
	getGridOptions: () => Ui(6),
	getStubConfig: (e, t, n) => ({ entity: x(["light"], e, t, n, (e) => (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff")) })
}), ka = {
	PAUSE: 4,
	STOP: 8,
	RETURN_HOME: 16,
	FAN_SPEED: 32,
	LOCATE: 512,
	CLEAN_SPOT: 1024,
	START: 8192
}, Aa = "\n  .card {\n    --vacuum-accent: #0a84ff;\n    --vacuum-accent-light: #68c5ff;\n  }\n  .icon-well.running lg-icon { animation: lg-vacuum-roam 2.2s ease-in-out infinite; }\n  .icon-well.returning lg-icon { animation: lg-vacuum-return 1.35s ease-in-out infinite; }\n  @keyframes lg-vacuum-roam {\n    0%, 100% { transform: translateX(-2px) rotate(-5deg); }\n    50% { transform: translateX(2px) rotate(5deg); }\n  }\n  @keyframes lg-vacuum-return {\n    0%, 100% { transform: translateX(0); }\n    50% { transform: translateX(-4px); }\n  }\n  .stats {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 8px;\n  }\n  .stat {\n    min-width: 0;\n    padding: 10px 12px;\n    border-radius: 16px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .stat-label {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    color: var(--lg-text-secondary);\n    font-size: var(--lg-tick);\n  }\n  .stat-label lg-icon { --mdc-icon-size: 14px; }\n  .stat-value {\n    margin-top: 3px;\n    color: var(--lg-text-primary);\n    font-size: var(--lg-label);\n    font-weight: 650;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .controls {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: clamp(8px, 3cqi, 12px);\n  }\n  .control {\n    min-width: 0;\n    display: grid;\n    justify-items: center;\n    gap: 5px;\n    color: var(--lg-text-secondary);\n    font: inherit;\n    font-size: var(--lg-tick);\n  }\n  .control .round-btn { margin: 0; }\n  .control.primary .round-btn {\n    color: #fff;\n    background: linear-gradient(180deg, var(--vacuum-accent-light), var(--vacuum-accent));\n    box-shadow: 0 5px 14px color-mix(in srgb, var(--vacuum-accent) 30%, transparent);\n  }\n  .control.primary { color: var(--lg-text-primary); font-weight: 600; }\n  .control.danger .round-btn { color: var(--lg-lock-unlocked-deep); }\n  .fan-speed {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .fan-title {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: var(--lg-text-secondary);\n    font-size: var(--lg-label);\n    font-weight: 600;\n  }\n  .fan-title lg-icon { --mdc-icon-size: 16px; }\n  .speed-options {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 7px;\n  }\n  .speed {\n    min-height: 34px;\n    padding: 0 12px;\n    border: 0;\n    border-radius: 17px;\n    color: var(--lg-text-secondary);\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    font: inherit;\n    font-size: var(--lg-tick);\n    cursor: pointer;\n  }\n  .speed.selected {\n    color: #fff;\n    background: linear-gradient(180deg, var(--vacuum-accent-light), var(--vacuum-accent));\n    box-shadow: 0 3px 10px color-mix(in srgb, var(--vacuum-accent) 24%, transparent);\n  }\n  .speed:focus-visible, .round-btn:focus-visible {\n    outline: 2px solid var(--vacuum-accent);\n    outline-offset: 2px;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .icon-well.running lg-icon, .icon-well.returning lg-icon { animation: none; }\n  }\n  @container (max-width: 250px) {\n    .control span { display: none; }\n    .controls { justify-content: space-between; }\n  }\n";
function ja(e) {
	switch (e) {
		case "cleaning": return {
			icon: "mdi:robot-vacuum",
			labelKey: "vacuum_cleaning",
			accent: "#0A84FF",
			light: "#68C5FF",
			className: "running"
		};
		case "returning": return {
			icon: "mdi:home-import-outline",
			labelKey: "vacuum_returning",
			accent: "#2BB3D0",
			light: "#78DCEA",
			className: "returning"
		};
		case "paused": return {
			icon: "mdi:pause-circle-outline",
			labelKey: "paused",
			accent: "#FF9F0A",
			light: "#FFD06B"
		};
		case "docked": return {
			icon: "mdi:robot-vacuum-variant",
			labelKey: "vacuum_docked"
		};
		case "error": return {
			icon: "mdi:robot-vacuum-alert",
			labelKey: "vacuum_error",
			accent: "#FF3B30",
			light: "#FF8A80"
		};
		default: return {
			icon: "mdi:robot-vacuum",
			labelKey: "idle"
		};
	}
}
function Ma(e) {
	let t = typeof e == "number" ? e : Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function Na(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
}
function Pa({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = h(t, a, e.name, e.entity ?? ""), l = () => f(n, e.entity);
	if (!a || y(a)) return /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon ?? "mdi:robot-vacuum",
		name: o,
		label: i("unavailable"),
		onOpen: l
	});
	let u = ja(a.state), d = u.accent, p = d ? {
		from: u.light ?? d,
		to: d,
		glow: D(d, .28)
	} : void 0, m = d ? {
		color: d,
		bg: D(d, .18),
		stroke: D(d, .3)
	} : void 0, _ = g(t, a, i(u.labelKey)), v = Ma(a.attributes.battery_level), x = Ma(a.attributes.cleaned_area), S = a.attributes.cleaned_area_unit ?? "m²", C = a.attributes.fan_speed, w = Na(a.attributes.fan_speed_list), T = a.state === "paused", E = (n, r = {}) => {
		t && e.entity && t.callService("vacuum", n, {
			entity_id: e.entity,
			...r
		});
	}, O = [
		a.state === "cleaning" ? b(a, ka.PAUSE) ? {
			key: "pause",
			icon: "mdi:pause",
			label: i("vacuum_pause"),
			service: "pause",
			className: "primary"
		} : void 0 : b(a, ka.START) ? {
			key: T ? "resume" : "start",
			icon: "mdi:play",
			label: i(T ? "vacuum_resume" : "vacuum_start"),
			service: "start",
			className: "primary"
		} : void 0,
		b(a, ka.STOP) ? {
			key: "stop",
			icon: "mdi:stop",
			label: i("vacuum_stop"),
			service: "stop",
			className: "danger"
		} : void 0,
		b(a, ka.RETURN_HOME) ? {
			key: "dock",
			icon: "mdi:home-import-outline",
			label: i("vacuum_dock"),
			service: "return_to_base"
		} : void 0,
		e.show_locate !== !1 && b(a, ka.LOCATE) ? {
			key: "locate",
			icon: "mdi:map-marker-radius",
			label: i("vacuum_locate"),
			service: "locate"
		} : void 0,
		e.show_clean_spot === !0 && b(a, ka.CLEAN_SPOT) ? {
			key: "spot",
			icon: "mdi:target",
			label: i("vacuum_spot"),
			service: "clean_spot"
		} : void 0
	].filter((e) => !!e), k = {
		display: "flex",
		position: "relative",
		"--vacuum-accent": d ?? "#0A84FF",
		"--vacuum-accent-light": u.light ?? "#68C5FF"
	};
	return /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: d,
		style: k,
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X("div", {
						className: `icon-well${p ? "" : " idle"}${u.className ? ` ${u.className}` : ""}`,
						style: p ? {
							"--well-from": p.from,
							"--well-to": p.to,
							"--well-glow": p.glow
						} : void 0,
						onClick: l,
						role: "button",
						children: /* @__PURE__ */ X(Q, { icon: e.icon ?? a.attributes.icon ?? u.icon })
					}),
					/* @__PURE__ */ X(qr, {
						name: o,
						state: `${_} · ${i("since", { t: c(a.last_changed, i) })}`,
						onClick: l
					}),
					/* @__PURE__ */ X(Jr, {
						label: _,
						style: m
					})
				]
			}),
			e.show_stats !== !1 && (v !== void 0 || x !== void 0) && /* @__PURE__ */ X("div", {
				className: "stats",
				children: [v !== void 0 && /* @__PURE__ */ X("div", {
					className: "stat",
					children: [/* @__PURE__ */ X("div", {
						className: "stat-label",
						children: [/* @__PURE__ */ X(Q, { icon: "mdi:battery" }), /* @__PURE__ */ X("span", { children: i("vacuum_battery") })]
					}), /* @__PURE__ */ X("div", {
						className: "stat-value",
						children: [Math.round(v), "%"]
					})]
				}), x !== void 0 && /* @__PURE__ */ X("div", {
					className: "stat",
					children: [/* @__PURE__ */ X("div", {
						className: "stat-label",
						children: [/* @__PURE__ */ X(Q, { icon: "mdi:ruler-square" }), /* @__PURE__ */ X("span", { children: i("vacuum_area") })]
					}), /* @__PURE__ */ X("div", {
						className: "stat-value",
						children: [
							x,
							" ",
							S
						]
					})]
				})]
			}),
			O.length > 0 && /* @__PURE__ */ X("div", {
				className: "controls",
				role: "group",
				"aria-label": o,
				children: O.map((e) => /* @__PURE__ */ X("div", {
					className: `control ${e.className ?? ""}`,
					children: [/* @__PURE__ */ X("button", {
						className: "round-btn",
						type: "button",
						title: e.label,
						onClick: () => E(e.service),
						children: /* @__PURE__ */ X(Q, { icon: e.icon })
					}), /* @__PURE__ */ X("span", { children: e.label })]
				}, e.key))
			}),
			e.show_fan_speed !== !1 && b(a, ka.FAN_SPEED) && w.length > 0 && /* @__PURE__ */ X("div", {
				className: "fan-speed",
				children: [/* @__PURE__ */ X("div", {
					className: "fan-title",
					children: [/* @__PURE__ */ X(Q, { icon: "mdi:fan" }), /* @__PURE__ */ X("span", { children: i("vacuum_fan_speed") })]
				}), /* @__PURE__ */ X("div", {
					className: "speed-options",
					role: "group",
					"aria-label": i("vacuum_fan_speed"),
					children: w.map((e) => /* @__PURE__ */ X("button", {
						className: `speed${e === C ? " selected" : ""}`,
						type: "button",
						"aria-pressed": e === C,
						onClick: () => E("set_fan_speed", { fan_speed: e }),
						children: e
					}, e))
				})]
			})
		]
	});
}
var Fa = ki({
	tagName: "liquid-glass-vacuum-card",
	component: Pa,
	styles: [
		ji,
		Xr,
		Hr,
		Aa
	],
	getCardSize: () => 4,
	getGridOptions: () => Ui(5),
	getStubConfig: (e, t, n) => ({ entity: x(["vacuum"], e, t, n) })
}), Ia = {
	SET_SPEED: 1,
	OSCILLATE: 2,
	DIRECTION: 4,
	PRESET_MODE: 8,
	TURN_OFF: 16,
	TURN_ON: 32
}, La = "\n  .card {\n    --fan-accent: #5e5ce6;\n    --fan-accent-light: #9e9cff;\n  }\n  .card.fan-on .icon-well lg-icon { animation: lg-fan-spin 1.8s linear infinite; }\n  @keyframes lg-fan-spin { to { transform: rotate(360deg); } }\n  .power { flex: none; }\n  .speed-control, .presets, .extras { display: flex; flex-direction: column; gap: 8px; }\n  .control-head {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    color: var(--lg-text-secondary);\n    font-size: var(--lg-label);\n    font-weight: 600;\n  }\n  .control-head > span:first-child { display: inline-flex; align-items: center; gap: 6px; }\n  .control-head lg-icon { --mdc-icon-size: 16px; }\n  .speed-value { color: var(--fan-accent); font-weight: 700; }\n  .speed-ticks {\n    display: flex;\n    justify-content: space-between;\n    color: var(--lg-text-secondary);\n    font-size: var(--lg-tick);\n  }\n  .preset-options { display: flex; flex-wrap: wrap; gap: 7px; }\n  .preset, .extra {\n    min-height: 36px;\n    padding: 0 13px;\n    border: 0;\n    border-radius: 18px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    color: var(--lg-text-secondary);\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    font: inherit;\n    font-size: var(--lg-tick);\n    cursor: pointer;\n  }\n  .preset.selected, .extra.selected {\n    color: #fff;\n    background: linear-gradient(180deg, var(--fan-accent-light), var(--fan-accent));\n    box-shadow: 0 3px 10px color-mix(in srgb, var(--fan-accent) 25%, transparent);\n  }\n  .preset:focus-visible, .extra:focus-visible {\n    outline: 2px solid var(--fan-accent);\n    outline-offset: 2px;\n  }\n  .extras { flex-direction: row; flex-wrap: wrap; }\n  .extra { flex: 1 1 120px; }\n  .extra lg-icon { --mdc-icon-size: 18px; }\n  @media (prefers-reduced-motion: reduce) { .card.fan-on .icon-well lg-icon { animation: none; } }\n";
function Ra(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
}
function za({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), o = e.entity ? t?.states[e.entity] : void 0, l = Number(o?.attributes.percentage), u = Sa(Number.isFinite(l) ? l : void 0, 1), d = h(t, o, e.name, e.entity ?? ""), p = () => f(n, e.entity);
	if (!o || y(o)) return /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon ?? "mdi:fan",
		name: d,
		label: a("unavailable"),
		onOpen: p
	});
	let m = o.state === "on", _ = Math.max(0, Math.min(100, u.value ?? (m ? 100 : 0))), v = Math.max(1, Number(o.attributes.percentage_step) || 1), x = o.attributes.preset_mode, S = Ra(o.attributes.preset_modes), C = o.attributes.oscillating === !0, w = o.attributes.direction, T = m ? b(o, Ia.TURN_OFF) : b(o, Ia.TURN_ON), E = "#5E5CE6", D = m ? {
		from: "#9E9CFF",
		to: E,
		glow: "rgba(94, 92, 230, 0.3)"
	} : void 0, O = m ? {
		color: r ? "#B0AFFF" : E,
		bg: "rgba(94, 92, 230, 0.18)",
		stroke: "rgba(94, 92, 230, 0.3)"
	} : void 0, k = g(t, o, a(m ? "on" : "off")), A = m ? `${x ?? `${Math.round(_)}%`} · ${a("since", { t: c(o.last_changed, a) })}` : `${k} · ${a("last_change", { t: c(o.last_changed, a) })}`, j = (n, r = {}) => {
		t && e.entity && t.callService("fan", n, {
			entity_id: e.entity,
			...r
		});
	};
	return /* @__PURE__ */ X(Wr, {
		className: `card${m ? " fan-on" : ""}`,
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: E,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X("div", {
						className: "fan-icon",
						children: /* @__PURE__ */ X(Kr, {
							icon: e.icon ?? o.attributes.icon ?? "mdi:fan",
							style: D,
							onClick: p
						})
					}),
					/* @__PURE__ */ X(qr, {
						name: d,
						state: A,
						onClick: p
					}),
					/* @__PURE__ */ X(Jr, {
						label: m ? `${Math.round(_)}%` : k,
						style: O
					}),
					/* @__PURE__ */ X("div", {
						className: "power",
						children: /* @__PURE__ */ X(ba, {
							checked: m,
							disabled: !T,
							onCheckedChange: (e) => j(e ? "turn_on" : "turn_off"),
							ariaLabel: `${d} ${a(m ? "off" : "on")}`,
							width: 58,
							height: 26,
							refraction: i,
							scheme: r ? "dark" : "light",
							activeColor: E
						})
					})
				]
			}),
			e.show_speed !== !1 && b(o, Ia.SET_SPEED) && /* @__PURE__ */ X("div", {
				className: "speed-control",
				children: [
					/* @__PURE__ */ X("div", {
						className: "control-head",
						children: [/* @__PURE__ */ X("span", { children: [/* @__PURE__ */ X(Q, { icon: "mdi:fan-chevron-up" }), a("fan_speed")] }), /* @__PURE__ */ X("span", {
							className: "speed-value",
							children: [Math.round(_), "%"]
						})]
					}),
					/* @__PURE__ */ X(la, {
						value: _,
						min: 0,
						max: 100,
						step: v,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("fan_speed"),
						onInput: u.setPreview,
						onChange: (e) => {
							u.commit(e), j("set_percentage", { percentage: Math.round(e) });
						}
					}),
					/* @__PURE__ */ X("div", {
						className: "speed-ticks",
						children: [
							/* @__PURE__ */ X("span", { children: "0%" }),
							/* @__PURE__ */ X("span", { children: "50%" }),
							/* @__PURE__ */ X("span", { children: "100%" })
						]
					})
				]
			}),
			e.show_presets !== !1 && b(o, Ia.PRESET_MODE) && S.length > 0 && /* @__PURE__ */ X("div", {
				className: "presets",
				children: [/* @__PURE__ */ X("div", {
					className: "control-head",
					children: /* @__PURE__ */ X("span", { children: [/* @__PURE__ */ X(Q, { icon: "mdi:creation" }), a("fan_presets")] })
				}), /* @__PURE__ */ X("div", {
					className: "preset-options",
					role: "group",
					"aria-label": a("fan_presets"),
					children: S.map((e) => /* @__PURE__ */ X("button", {
						className: `preset${e === x ? " selected" : ""}`,
						type: "button",
						"aria-pressed": e === x,
						onClick: () => j("set_preset_mode", { preset_mode: e }),
						children: e
					}, e))
				})]
			}),
			(e.show_oscillation !== !1 && b(o, Ia.OSCILLATE) || e.show_direction !== !1 && b(o, Ia.DIRECTION)) && /* @__PURE__ */ X("div", {
				className: "extras",
				children: [e.show_oscillation !== !1 && b(o, Ia.OSCILLATE) && /* @__PURE__ */ X("button", {
					className: `extra${C ? " selected" : ""}`,
					type: "button",
					"aria-pressed": C,
					onClick: () => j("oscillate", { oscillating: !C }),
					children: [/* @__PURE__ */ X(Q, { icon: "mdi:arrow-oscillating" }), /* @__PURE__ */ X("span", { children: a("fan_oscillation") })]
				}), e.show_direction !== !1 && b(o, Ia.DIRECTION) && /* @__PURE__ */ X("button", {
					className: `extra${w === "reverse" ? " selected" : ""}`,
					type: "button",
					"aria-label": a("fan_direction"),
					onClick: () => j("set_direction", { direction: w === "reverse" ? "forward" : "reverse" }),
					children: [/* @__PURE__ */ X(Q, { icon: w === "reverse" ? "mdi:rotate-left" : "mdi:rotate-right" }), /* @__PURE__ */ X("span", { children: a(w === "reverse" ? "fan_reverse" : "fan_forward") })]
				})]
			})
		]
	});
}
var Ba = ki({
	tagName: "liquid-glass-fan-card",
	component: za,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		ya,
		La
	],
	getCardSize: () => 5,
	getGridOptions: () => Ui(6),
	getStubConfig: (e, t, n) => ({ entity: x(["fan"], e, t, n) })
}), Va = {
	ease: Un(.34, 1.36, .42, 1),
	duration: .48
}, Ha = {
	ease: Un(.34, 1.36, .42, 1),
	duration: .27
}, Ua = {
	ease: Un(.36, 0, .18, 1),
	duration: .46
}, Wa = {
	mapSize: 256,
	depth: .2,
	dispersion: .28,
	scaleX: .065,
	scaleY: .09,
	clipToShape: !0,
	softEdge: !0,
	curvature: .48,
	splay: .55,
	bend: .1,
	bendWidth: .055,
	frost: 0,
	brightness: .01,
	specular: 1.45,
	sheenAngle: 35,
	sheenDark: !1,
	glow: .32,
	glowSpread: .5,
	glowFalloff: 1.7,
	sheen: .75,
	sheenWidth: 1.5,
	sheenFalloff: 1.2,
	edgeShadow: "0 5px 13px rgba(0, 0, 0, 0.18)",
	edgeInsetShadow: "0 -3px 8px rgba(0, 0, 0, 0.1)",
	restEdgeShadow: "0 2px 6px rgba(0, 0, 0, 0.14)"
}, Ga = {
	scaleX: .085,
	scaleY: .115,
	brightness: .07,
	glow: .38,
	sheen: .52,
	restEdgeShadow: "0 2px 7px rgba(0, 0, 0, 0.42)"
}, Ka = {
	brightness: -.02,
	specular: 1.55,
	glowFalloff: 2,
	sheen: .95
}, qa = 3, Ja = 2, Ya = `
  .lg-glass-segmented {
    position: relative;
    display: block;
    width: 100%;
    height: 50px;
    padding: 0;
    border: 0;
    border-radius: 20px;
    background: var(--glass-segment-track);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    isolation: isolate;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .lg-glass-segmented.compact {
    height: 40px;
  }
  @supports (container-type: inline-size) {
    .lg-glass-segmented:not(.compact) {
      height: clamp(50px, calc(14cqi + 6px), 60px);
    }
  }
  .lg-segment-refraction-source {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(120% 160% at 12% -30%, rgba(255, 255, 255, 0.2), transparent 55%),
      var(--glass-segment-track);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .lg-glass-segmented > button > span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lg-segment-lens {
    position: absolute !important;
    z-index: 1;
    overflow: visible !important;
    pointer-events: none !important;
  }
  .lg-segment-static-pill {
    position: absolute !important;
    z-index: 1;
    border-radius: 999px;
    background: var(--glass-segment-pill);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
    pointer-events: none;
  }
  .lg-segment-static-pill::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.34);
    transform: scale(var(--lg-segment-press-scale, 1));
    transition: transform 0.27s cubic-bezier(0.34, 1.36, 0.42, 1);
  }
  .lg-glass-segmented > button {
    position: absolute;
    z-index: 2;
    top: ${qa}px;
    bottom: ${qa}px;
    left: calc(${qa}px + var(--item-i) * (var(--seg-w) + ${Ja}px));
    width: var(--seg-w);
    min-width: 0;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 17px;
    background: transparent;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--lg-text-secondary);
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
  }
  .lg-glass-segmented > button::after {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 15px;
    pointer-events: none;
  }
  .lg-glass-segmented > button:focus-visible {
    outline: none;
  }
  .lg-glass-segmented > button.selected {
    background: transparent;
    box-shadow: none;
    color: var(--lg-text-primary);
    font-weight: 650;
  }
  .lg-glass-segmented > button.selected lg-icon {
    color: var(--selected-color);
  }
  .lg-glass-segmented > button lg-icon {
    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
  }
  .lg-glass-segmented > button:focus-visible::after {
    box-shadow: inset 0 0 0 2px var(--selected-color);
  }
  .lg-glass-segmented.compact > button {
    gap: 0;
  }
  .lg-glass-segmented.compact > button lg-icon {
    --mdc-icon-size: 17px;
  }
  @media (prefers-reduced-motion: reduce) {
    .lg-segment-static-pill::after {
      transition-duration: 0.01ms;
    }
  }
`;
function Xa({ item: e, compact: t }) {
	return /* @__PURE__ */ X(K, { children: [e.icon && /* @__PURE__ */ X(Q, { icon: e.icon }), !t && /* @__PURE__ */ X("span", { children: e.label })] });
}
function Za({ items: e, value: t, onValueChange: n, refraction: r, scheme: i, selectedColor: a, compact: o = !1, className: s, ariaLabel: c }) {
	let l = Er(), u = e.findIndex((e) => e.value === t), d = u >= 0, f = Math.max(u, 0), [p, m] = q(f), [h, g] = q(d), [_, v] = q({
		width: 300,
		height: o ? 40 : 50
	}), [y, b] = q(!1), x = Y(null), S = Y([]), C = Y(null), w = Y(0), T = Y(0), E = Y(!1), D = Y(!1), O = Y(null), k = Y(void 0), A = Y(!1), j = Math.max(e.length, 1), M = Math.max(1, (_.width - 6 - Ja * (j - 1)) / j), N = M + Ja, P = Math.max(1, _.height - 6), F = _.width * .045, I = F * 24, L = Math.ceil(Math.max(M / 2, P / 2) * .3 + F) + 4, ee = _.width + L * 2, R = _.height + L * 2, z = Y({
		segmentWidth: M,
		stepWidth: N,
		pillHeight: P,
		lensPad: L,
		lensSurfaceWidth: ee
	}), B = Y(i === "dark" ? .18 : .38);
	ft(() => {
		z.current = {
			segmentWidth: M,
			stepWidth: N,
			pillHeight: P,
			lensPad: L,
			lensSurfaceWidth: ee
		}, B.current = i === "dark" ? .18 : .38;
	});
	let V = mt(() => {
		let e = Z(f * z.current.stepWidth), t = Z(z.current.segmentWidth / 2), n = Z(z.current.pillHeight / 2), r = Z(z.current.pillHeight / 2), i = Z(B.current), a = Z(0), o = Hn([a], () => 1 - a.get()), s = Z(0);
		return {
			position: e,
			halfWidth: t,
			halfHeight: n,
			radius: r,
			tintOpacity: i,
			shadowOpacity: a,
			restShadowOpacity: o,
			stretch: s,
			lensWidth: Hn([t, s], () => t.get() * (1 - .16 * s.get()) * 2),
			lensHeight: Hn([n, s], () => n.get() * (1 + .34 * s.get()) * 2),
			lensX: Hn([e, t], () => (z.current.lensPad + qa + z.current.segmentWidth / 2 + e.get()) / z.current.lensSurfaceWidth)
		};
	}, []), te = Y(0), ne = Y(() => {});
	Sr(V.position, V.stretch, te, ne);
	let re = Y(f), H = Y(N);
	ft(() => {
		let e = x.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect();
			t.width > 0 && t.height > 0 && v((e) => e.width === t.width && e.height === t.height ? e : {
				width: t.width,
				height: t.height
			});
		};
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []), J(() => {
		if (A.current) return;
		let e = re.current !== f, t = H.current !== N;
		re.current = f, H.current = N, m(f), g(d), O.current?.stop();
		let n = f * N;
		t && !e ? V.position.set(n) : O.current = $(V.position, n, Va);
	}, [
		d,
		V.position,
		f,
		N
	]), J(() => {
		A.current || (V.halfWidth.set(M / 2), V.halfHeight.set(P / 2), V.radius.set(P / 2));
	}, [
		V,
		P,
		M
	]), J(() => () => {
		if (O.current?.stop(), clearTimeout(k.current), C.current !== null && x.current) try {
			x.current.releasePointerCapture(C.current);
		} catch {}
	}, []);
	let ie = mt(() => Ar({
		...Wa,
		...i === "dark" ? Ga : Ka,
		sheenDark: i !== "dark"
	}, l), [l, i]), U = () => {
		clearTimeout(k.current), b(!0);
		let e = z.current;
		$(V.halfWidth, e.segmentWidth * .62, Ha), $(V.halfHeight, e.pillHeight * .59, Ha), $(V.radius, e.pillHeight * .59, Ha), $(V.tintOpacity, .08, Ha), $(V.shadowOpacity, 1, Ha), Ji(te, ne);
	}, W = () => {
		b(!1), te.current = 0;
		let e = z.current;
		$(V.halfWidth, e.segmentWidth / 2, Ua), $(V.halfHeight, e.pillHeight / 2, Ua), $(V.radius, e.pillHeight / 2, Ua), $(V.tintOpacity, B.current, Ua), $(V.shadowOpacity, 0, Ua);
	}, G = (r, i) => {
		let a = Math.max(0, Math.min(e.length - 1, r)), o = e[a];
		o && (m(a), g(!0), O.current?.stop(), O.current = $(V.position, a * z.current.stepWidth, Va), i ? W() : k.current = setTimeout(W, 260), o.value !== t && n(o.value));
	}, ae = (t) => {
		let n = x.current?.getBoundingClientRect();
		if (!n || n.width <= 0) return p;
		let r = Math.max(0, Math.min(n.width - .001, t - n.left));
		return Math.max(0, Math.min(e.length - 1, Math.floor(r / n.width * e.length)));
	}, oe = (t) => {
		if (!(t.button !== 0 || C.current !== null || e.length < 2)) {
			C.current = t.pointerId, A.current = !0, E.current = !1, D.current = !1, w.current = t.clientX, T.current = V.position.get(), O.current?.stop();
			try {
				t.currentTarget.setPointerCapture(t.pointerId);
			} catch {}
			U();
		}
	}, se = (t) => {
		if (t.pointerId !== C.current) return;
		let n = t.clientX - w.current;
		if (!E.current && Math.abs(n) < 3) return;
		E.current = !0;
		let r = T.current + n, i = Math.max(0, (e.length - 1) * z.current.stepWidth);
		r < 0 ? r = -Cr(-r, F, I) : r > i && (r = i + Cr(r - i, F, I)), V.position.set(r);
		let a = Math.max(0, Math.min(e.length - 1, Math.round(r / z.current.stepWidth)));
		a !== p && m(a);
	}, ce = (e) => {
		if (e.pointerId === C.current) {
			if (C.current = null, A.current = !1, D.current = !0, requestAnimationFrame(() => {
				D.current = !1;
			}), E.current) {
				let e = Math.round(V.position.get() / z.current.stepWidth);
				G(e, !0);
			} else {
				let t = ae(e.clientX);
				t === p ? W() : G(t, !1);
			}
		}
	}, le = (e) => {
		e.pointerId === C.current && (C.current = null, A.current = !1, D.current = !0, requestAnimationFrame(() => {
			D.current = !1;
		}), m(f), g(d), O.current = $(V.position, f * z.current.stepWidth, Va), W());
	}, ue = (e) => {
		U(), G(e, !1), S.current[e]?.focus();
	};
	return /* @__PURE__ */ X("div", {
		ref: x,
		className: [
			s,
			"lg-glass-segmented",
			o ? "compact" : "",
			r ? "" : "static"
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": c,
		"data-lg-segment-pressed": y ? "" : void 0,
		style: {
			"--n": String(j),
			"--seg-w": `calc((100% - 6px - ${(j - 1) * Ja}px) / ${j})`,
			"--selected-color": a,
			"--glass-segment-track": i === "dark" ? "#2a2828" : "#e1dfdf",
			"--glass-segment-pill": i === "dark" ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.62)",
			"--lg-segment-press-scale": y ? "1.18" : "1"
		},
		onPointerDown: oe,
		onPointerMove: se,
		onPointerUp: ce,
		onPointerCancel: le,
		onContextMenu: (e) => e.preventDefault(),
		children: [r ? /* @__PURE__ */ X(pr, {
			className: "lg-segment-lens",
			optics: ie,
			center: {
				x: V.lensX,
				y: .5
			},
			size: [V.lensWidth, V.lensHeight],
			radius: V.radius,
			unstable_lens: {
				tintColor: "white",
				tintOpacity: V.tintOpacity,
				shadowOpacity: V.shadowOpacity,
				restShadowOpacity: V.restShadowOpacity
			},
			filterResolution: Dr(l),
			behind: i === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				left: -L,
				top: -L,
				width: ee,
				height: R,
				opacity: +!!h
			},
			refract: /* @__PURE__ */ X("div", {
				style: {
					padding: L,
					width: _.width,
					height: _.height
				},
				children: /* @__PURE__ */ X("div", {
					style: {
						position: "relative",
						width: "100%",
						height: "100%"
					},
					children: /* @__PURE__ */ X("div", {
						className: "lg-segment-refraction-source",
						"aria-hidden": "true"
					})
				})
			})
		}) : /* @__PURE__ */ X(wr, {
			className: "lg-segment-static-pill",
			x: V.position,
			"aria-hidden": "true",
			style: {
				left: qa,
				top: qa,
				width: M,
				height: P,
				opacity: +!!h
			}
		}), e.map((t, n) => /* @__PURE__ */ X("button", {
			ref: (e) => {
				S.current[n] = e;
			},
			type: "button",
			className: h && n === p ? "selected" : void 0,
			style: { "--item-i": String(n) },
			title: t.label,
			"aria-label": t.label,
			"aria-pressed": h && n === p,
			onClick: () => {
				if (D.current) {
					D.current = !1;
					return;
				}
				ue(n);
			},
			onKeyDown: (t) => {
				let r = n;
				if (t.key === "ArrowRight" || t.key === "ArrowDown") r = Math.min(e.length - 1, n + 1);
				else if (t.key === "ArrowLeft" || t.key === "ArrowUp") r = Math.max(0, n - 1);
				else if (t.key === "Home") r = 0;
				else if (t.key === "End") r = e.length - 1;
				else return;
				t.preventDefault(), ue(r);
			},
			children: /* @__PURE__ */ X(Xa, {
				item: t,
				compact: o
			})
		}, t.value))]
	});
}
//#endregion
//#region src/cards/climate-card.tsx
var Qa = 250, $a = 24, eo = Qa / 2 - $a / 2, to = 135, no = 4e3, ro = 270, io = 22, ao = 34, oo = (e, t = eo) => {
	let n = e * Math.PI / 180;
	return [Qa / 2 + t * Math.cos(n), Qa / 2 + t * Math.sin(n)];
};
function so({ id: e, x: t, y: n, rotation: r, motionPosition: i, active: a, refraction: o, scheme: s, sourceBackground: c, label: l, value: u, min: d, max: f, onKeyDown: p }) {
	let m = ia(o, s), h = mt(() => ({
		...m,
		edgeShadow: "",
		edgeInsetShadow: "",
		restEdgeShadow: "",
		restEdgeInsetShadow: ""
	}), [m]), g = mt(() => {
		let e = Z(i), t = Z(io / 2), n = Z(ao / 2), r = Z(io / 2), a = Z(1), o = Z(0);
		return {
			position: e,
			halfW: t,
			halfH: n,
			radius: r,
			tintOpacity: a,
			stretch: o,
			lensW: Hn([t, o], () => t.get() * (1 - .2 * o.get()) * 2),
			lensH: Hn([n, o], () => n.get() * (1 + .4 * o.get()) * 2)
		};
	}, []), _ = Y(0), v = Y(() => {}), y = Y(!1), b = mt(() => Z(0), []);
	return Sr(o ? g.position : b, g.stretch, _, v), ft(() => {
		g.position.get() !== i && g.position.set(i);
	}, [g, i]), J(() => {
		o && a !== y.current && (y.current = a, a ? ($(g.halfW, 1.5 * io / 2, Zi), $(g.halfH, 1.5 * ao / 2, Zi), $(g.radius, 1.5 * io / 2, Zi), $(g.tintOpacity, 0, Zi), Ji(_, v)) : (_.current = 0, $(g.halfW, io / 2, Qi), $(g.halfH, ao / 2, Qi), $(g.radius, io / 2, Qi), $(g.tintOpacity, 1, Qi)));
	}, [
		a,
		g,
		o
	]), /* @__PURE__ */ X("div", {
		className: `dial-glass-thumb-position${a ? " active" : ""}`,
		"data-dial-glass-thumb": e,
		role: "slider",
		tabIndex: 0,
		"aria-label": l,
		"aria-valuemin": d,
		"aria-valuemax": f,
		"aria-valuenow": u,
		onKeyDown: p,
		style: {
			left: `${(t * 100).toFixed(3)}%`,
			top: `${(n * 100).toFixed(3)}%`,
			width: 78,
			height: 90,
			transform: "translate(-50%, -50%)",
			"--dial-thumb-rotation": `${r.toFixed(3)}deg`
		},
		children: o ? /* @__PURE__ */ X(pr, {
			className: "dial-glass-lens",
			optics: h,
			center: {
				x: .5,
				y: .5
			},
			size: [g.lensW, g.lensH],
			radius: g.radius,
			unstable_lens: {
				tintColor: "var(--lg-knob-solid)",
				tintOpacity: g.tintOpacity
			},
			filterResolution: 1,
			behind: s === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				width: 78,
				height: 90
			},
			refract: /* @__PURE__ */ X("div", {
				className: "dial-refraction-source",
				"aria-hidden": "true",
				style: {
					width: "100%",
					height: "100%",
					background: c
				}
			})
		}) : /* @__PURE__ */ X("div", {
			className: "dial-thumb-static",
			"aria-hidden": "true"
		})
	});
}
function co(e, t) {
	let [n, r] = oo(e), [i, a] = oo(t);
	return `M ${n} ${r} A ${eo} ${eo} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}
var lo = `
  .dial-row {
    display: flex;
    justify-content: center;
  }
  /* The SVG scales with its viewBox, so everything layered on top is positioned in
     percentages of the dial rather than in the 250px design units. */
  .dial {
    position: relative;
    width: min(${Qa}px, 100%);
    aspect-ratio: 1;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .dial svg {
    position: absolute;
    inset: 0;
    overflow: visible;
  }
  .ring-track {
    fill: none;
    stroke: var(--lg-track-bg);
    stroke-width: ${$a}px;
  }
  .ring-track-stroke {
    fill: none;
    stroke: var(--lg-glass-stroke);
    stroke-width: 1px;
  }
  .ring-fill {
    fill: none;
    stroke-width: ${$a}px;
    stroke-linecap: butt;
    filter: drop-shadow(0 0 7px var(--ring-glow));
    transition:
      stroke-dasharray 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      stroke-dashoffset 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      opacity 0.3s ease;
  }
  svg {
    transition:
      --lg-ring-0 0.42s ease,
      --lg-ring-1 0.42s ease,
      --lg-ring-2 0.42s ease;
  }
  .dial-glass-thumb-position {
    position: absolute !important;
    z-index: 1;
    transform-origin: center;
    pointer-events: none !important;
  }
  .dial-glass-thumb-position:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: -20px;
  }
  .dial-glass-lens {
    position: absolute !important;
    inset: 0;
    overflow: visible !important;
    pointer-events: none !important;
  }
  .dial-thumb-static {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${io}px;
    height: ${ao}px;
    border-radius: ${io / 2}px;
    transform: translate(-50%, -50%) rotate(var(--dial-thumb-rotation));
    background: var(--lg-knob-solid);
    box-shadow: var(--lg-knob-shadow), inset 0 0 0 1px var(--lg-knob-solid-rim);
    transition: transform 120ms ease;
  }
  .dial-glass-thumb-position.active .dial-thumb-static {
    transform: translate(-50%, -50%) rotate(var(--dial-thumb-rotation)) scale(1.08);
  }
  /* Keep the measured Glass box axis-aligned. Rotating an ancestor changes its
     bounding rect, which makes the lens engine calculate an offset centre. */
  .dial-glass-lens > div:nth-child(2),
  .dial-glass-lens > div:nth-child(3) {
    transform-origin: center;
    rotate: var(--dial-thumb-rotation);
  }
  /* The arc and lens both follow the pointer without an eased position lag. */
  .dial.dragging .ring-fill {
    transition: none;
  }
  .center {
    position: absolute;
    z-index: 2;
    inset: 14%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    pointer-events: none;
  }
  .caption {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .temp-row {
    display: flex;
    align-items: flex-start;
    gap: 2px;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    color: var(--lg-text-primary);
    font-variant-numeric: tabular-nums;
  }
  .temp-row .target {
    font-size: var(--lg-temp, 54px);
    line-height: 1;
    letter-spacing: -2px;
  }
  .temp-row .target.range {
    font-size: var(--lg-temp-range, 40px);
    letter-spacing: -1px;
    line-height: 1.2;
  }
  .temp-row .fraction {
    font-size: var(--lg-temp-fraction, 22px);
    line-height: 1.2;
    letter-spacing: -0.2px;
  }
  .temp-row.off {
    color: var(--lg-text-secondary);
  }
  .current {
    font-size: var(--lg-label);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .minmax {
    position: absolute;
    z-index: 2;
    bottom: 5%;
    left: 14%;
    right: 14%;
    display: flex;
    justify-content: space-between;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
    pointer-events: none;
  }
  .card.climate-compact {
    --lg-gap: 16px;
  }
  /*
   * Same geometry as every other slider in the app: a thin capsule, a round knob. The
   * fill colour comes from the mode (set as --lg-slider-fill on the card), the same
   * identity the dial's ring carries — not a fixed rainbow across the whole range.
   */
  .card.climate-compact .lg-react-slider {
    --lg-slider-height: var(--lg-tile-row-h, 44px);
    --lg-slider-bar-height: var(--lg-tile-bar-h, 6px);
    --lg-slider-knob-size: var(--lg-tile-knob, 22px);
  }
  .tile-readout {
    min-width: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
  }
  .tile-target {
    min-width: 0;
    display: flex;
    align-items: flex-start;
    gap: 2px;
    color: var(--lg-text-primary);
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .tile-target .number {
    font-size: var(--lg-tile-temp, 56px);
    line-height: 1;
    letter-spacing: -2px;
    white-space: nowrap;
  }
  .tile-target.range .number {
    font-size: var(--lg-tile-range, 40px);
    line-height: 1.25;
    letter-spacing: -1px;
  }
  .tile-target .fraction {
    color: var(--lg-text-secondary);
    font-size: var(--lg-tile-fraction, 24px);
    line-height: 1.15;
    letter-spacing: -0.2px;
    white-space: nowrap;
  }
  .tile-target.off {
    color: var(--lg-text-secondary);
  }
  .tile-room {
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
    padding-bottom: 3px;
  }
  .tile-room .caption {
    font-size: var(--lg-tick);
    font-weight: 500;
  }
  .tile-room .value {
    color: var(--lg-text-primary);
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tile-room, 17px);
    font-weight: 600;
    letter-spacing: -0.2px;
    font-variant-numeric: tabular-nums;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-temp: clamp(34px, 14.2cqi, 54px);
      --lg-temp-range: clamp(26px, 10.5cqi, 40px);
      --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
    }
    .card.climate-compact {
      --lg-tile-row-h: clamp(34px, 11.6cqi, 44px);
      --lg-tile-bar-h: clamp(5px, 1.6cqi, 6px);
      --lg-tile-knob: clamp(18px, 5.8cqi, 22px);
      --lg-tile-temp: clamp(38px, 14.7cqi, 56px);
      --lg-tile-range: clamp(28px, 10.5cqi, 40px);
      --lg-tile-fraction: clamp(17px, 6.3cqi, 24px);
      --lg-tile-room: clamp(13px, 4.5cqi, 17px);
    }
  }
  .details {
    display: flex;
    gap: 10px;
  }
  /* Two dropdowns side by side leave no room for their values in a narrow column. */
  @container (max-width: 320px) {
    .details {
      flex-direction: column;
    }
  }
  .detail {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 10px 14px;
    border-radius: 20px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-secondary);
  }
  .detail lg-icon {
    flex: none;
    --mdc-icon-size: 16px;
  }
  .detail .text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .detail .dl {
    font-size: var(--lg-tick);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail .dv {
    font-size: var(--lg-label);
    font-weight: 600;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail select {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
`;
function uo(e, t) {
	let n = "rgba(255,255,255,0.7)";
	switch (e) {
		case "heat": return {
			icon: "mdi:fire",
			label: t("mode_heat"),
			well: {
				from: "#FFA073",
				to: "var(--lg-heat-deep)",
				glow: "rgba(255,106,61,0.24)"
			},
			badge: {
				color: "var(--lg-heat)",
				bg: "rgba(255,106,61,0.18)",
				stroke: "rgba(255,106,61,0.3)"
			},
			ring: [
				"#FFB36B",
				"var(--lg-heat)",
				"var(--lg-heat-deep)"
			],
			glow: "rgba(255,106,61,0.35)",
			selectedColor: "var(--lg-heat)"
		};
		case "cool": return {
			icon: "mdi:snowflake",
			label: t("mode_cool"),
			well: {
				from: "#8FDBFF",
				to: "var(--lg-cool-deep)",
				glow: "rgba(10,132,255,0.24)"
			},
			badge: {
				color: "var(--lg-cool-deep)",
				bg: "rgba(10,132,255,0.18)",
				stroke: "rgba(10,132,255,0.3)"
			},
			ring: [
				"#A8E4FF",
				"var(--lg-cool)",
				"var(--lg-cool-deep)"
			],
			glow: "rgba(10,132,255,0.35)",
			selectedColor: "var(--lg-cool-deep)"
		};
		case "dry": return {
			icon: "mdi:water-percent",
			label: t("mode_dry"),
			well: {
				from: "#8FDBFF",
				to: "#2BB3D0",
				glow: "rgba(43,179,208,0.24)"
			},
			badge: {
				color: "#0A7EA4",
				bg: "rgba(43,179,208,0.18)",
				stroke: "rgba(43,179,208,0.3)"
			},
			ring: [
				"#A8E4FF",
				"#5DD6EE",
				"#0A7EA4"
			],
			glow: "rgba(43,179,208,0.35)",
			selectedColor: "#0A7EA4"
		};
		case "fan_only": return {
			icon: "mdi:fan",
			label: t("mode_fan_only"),
			well: {
				from: "#C9CED6",
				to: "#8E9AAF",
				glow: "rgba(142,154,175,0.24)"
			},
			badge: {
				color: "#5C6B82",
				bg: "rgba(142,154,175,0.18)",
				stroke: "rgba(142,154,175,0.3)"
			},
			ring: [
				"#DDE3EC",
				"#B4BDCC",
				"#8E9AAF"
			],
			glow: "rgba(142,154,175,0.3)",
			selectedColor: "#5C6B82"
		};
		case "heat_cool":
		case "auto": return {
			icon: "mdi:thermometer-auto",
			label: t(e === "auto" ? "mode_auto" : "mode_heat_cool"),
			well: {
				from: "#7EE8A0",
				to: "#1E9E4A",
				glow: "rgba(48,209,88,0.24)"
			},
			badge: {
				color: "#1E9E4A",
				bg: "rgba(48,209,88,0.18)",
				stroke: "rgba(48,209,88,0.3)"
			},
			ring: [
				"var(--lg-heat)",
				"#C58CFF",
				"var(--lg-cool-deep)"
			],
			glow: "rgba(142,107,255,0.35)",
			selectedColor: "#1E9E4A"
		};
		default: return {
			icon: "mdi:power",
			label: t("mode_off"),
			ring: [
				n,
				n,
				n
			],
			glow: "transparent",
			selectedColor: "var(--lg-text-primary)"
		};
	}
}
function fo(e, t, n, r) {
	return {
		icon: {
			auto: "mdi:refresh-auto",
			heat_cool: "mdi:sun-snowflake-variant",
			cool: "mdi:snowflake",
			heat: "mdi:fire",
			dry: "mdi:water-percent",
			fan_only: "mdi:fan",
			off: "mdi:power"
		}[e] ?? "mdi:thermostat",
		label: g(n, r, t(`mode_${e}`), e)
	};
}
function po({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), [o, c] = q(), l = Y(null), d = e.entity ? t?.states[e.entity] : void 0, p = h(t, d, e.name, e.entity ?? ""), m = d?.attributes ?? {}, v = m.target_temp_step ?? .5, b = Ca({
		single: m.temperature,
		low: m.target_temp_low,
		high: m.target_temp_high
	}, Math.max(v / 2, .01), no);
	if (!d || y(d)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: p,
		label: a("unavailable"),
		onOpen: () => f(n, e.entity)
	}) });
	let x = (n, r) => void t?.callService("climate", n, {
		entity_id: e.entity,
		...r
	}), S = d.state, C = S === "off", [w, T] = [e.min_temp ?? m.min_temp ?? 7, e.max_temp ?? m.max_temp ?? 35], E = S === "heat_cool" && m.target_temp_low !== void 0, D = (e) => u((e - w) / (T - w || 1), 0, 1), O = (e, t) => o?.which === e ? o.value : b.value(e, t), k = O("single", w), A = O("low", w), j = O("high", T), M = uo(S, a), N = (e.hvac_modes ?? m.hvac_modes ?? []).filter(Boolean), P = e.design === "compact" || e.design === "a", F = m.current_temperature, I = b.hold, L = (e, t) => {
		let n = t;
		e === "single" ? x("set_temperature", { temperature: t }) : e === "low" ? (n = Math.min(t, m.target_temp_high - v), x("set_temperature", {
			target_temp_low: n,
			target_temp_high: m.target_temp_high
		})) : (n = Math.max(t, m.target_temp_low + v), x("set_temperature", {
			target_temp_low: m.target_temp_low,
			target_temp_high: n
		})), I(e, n);
	}, ee = (e) => {
		let t = l.current?.getBoundingClientRect();
		if (!t) return k;
		let n = e.clientX - (t.left + t.width / 2), r = e.clientY - (t.top + t.height / 2), i = Math.atan2(r, n) * 180 / Math.PI;
		return i = ((i - to) % 360 + 360) % 360, i > ro && (i = i > 315 ? 0 : ro), u(Math.round((w + i / ro * (T - w)) / v) * v, w, T);
	}, R = (e) => E ? Math.abs(e - A) <= Math.abs(e - j) ? "low" : "high" : "single", z = (e) => c({
		which: R(e),
		value: e
	}), B = () => {
		o && (c(void 0), L(o.which, o.value));
	}, V = (e, t) => {
		let n = e === "high" ? A + v : w, r = e === "low" && E ? j - v : T, i = e === "low" ? A : e === "high" ? j : k;
		if (t.key === "ArrowRight" || t.key === "ArrowUp") i += v;
		else if (t.key === "ArrowLeft" || t.key === "ArrowDown") i -= v;
		else if (t.key === "Home") i = n;
		else if (t.key === "End") i = r;
		else return;
		t.preventDefault(), t.stopPropagation(), L(e, u(i, n, r));
	}, te = m.hvac_action, ne = C ? a("mode_off") : te === "heating" ? a("heating") : te === "cooling" ? a("cooling") : te === "drying" ? a("drying") : te === "fan" ? a("fan_running") : te === "idle" ? a("idle") : M.label, re = m.current_humidity, H = (e, t) => {
		let n = m[`${e}s`], r = m[e];
		return n?.length ? /* @__PURE__ */ X("div", {
			className: "detail",
			children: [
				/* @__PURE__ */ X(Q, { icon: t }),
				/* @__PURE__ */ X("div", {
					className: "text",
					children: [/* @__PURE__ */ X("span", {
						className: "dl",
						children: a(e === "preset_mode" ? "preset" : e)
					}), /* @__PURE__ */ X("span", {
						className: "dv",
						children: r ?? "—"
					})]
				}),
				/* @__PURE__ */ X(Q, { icon: "mdi:chevron-down" }),
				/* @__PURE__ */ X("select", {
					value: r ?? "",
					onChange: (t) => x(`set_${e}`, { [e]: t.target.value }),
					children: n.map((e) => /* @__PURE__ */ X("option", {
						value: e,
						children: e
					}, e))
				})
			]
		}, e) : null;
	}, ie = /* @__PURE__ */ X("div", {
		className: "header",
		children: [
			/* @__PURE__ */ X(Kr, {
				icon: e.icon ?? M.icon,
				style: M.well,
				onClick: () => f(n, e.entity)
			}),
			/* @__PURE__ */ X(qr, {
				name: p,
				state: [
					ne,
					...P || F === void 0 ? [] : [`${a("room_temp")} ${_(t, F, 1)}°`],
					...re === void 0 ? [] : [`${a("humidity")} ${_(t, re, 0)}%`]
				].join(" · "),
				onClick: () => f(n, e.entity)
			}),
			/* @__PURE__ */ X(Jr, {
				label: g(t, d, M.label),
				style: M.badge
			})
		]
	});
	if (P) {
		let [n, o] = (Math.round(k * 10) / 10).toFixed(1).split(".");
		return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
			className: "card climate-compact",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: M.selectedColor,
			style: {
				display: "flex",
				position: "relative",
				"--lg-slider-fill": M.selectedColor,
				"--fill-from": M.selectedColor,
				"--fill-to": M.selectedColor
			},
			children: [
				ie,
				/* @__PURE__ */ X("div", {
					className: "tile-readout",
					children: [/* @__PURE__ */ X("div", {
						className: `tile-target${E ? " range" : ""}${C ? " off" : ""}`,
						children: [/* @__PURE__ */ X("span", {
							className: "number",
							children: E ? `${_(t, A, 0)}–${_(t, j, 0)}` : _(t, Number(n), 0)
						}), /* @__PURE__ */ X("span", {
							className: "fraction",
							children: E ? "°" : `.${o}°`
						})]
					}), F !== void 0 && /* @__PURE__ */ X("div", {
						className: "tile-room",
						children: [/* @__PURE__ */ X("span", {
							className: "caption",
							children: a("room_temp")
						}), /* @__PURE__ */ X("span", {
							className: "value",
							children: [_(t, F, 1), "°"]
						})]
					})]
				}),
				/* @__PURE__ */ X(la, {
					value: E ? A : k,
					highValue: E ? j : void 0,
					min: w,
					max: T,
					step: v,
					disabled: C,
					showFill: !C,
					showKnob: !C,
					clipFill: !0,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: a(E ? "target_range" : "target_temp"),
					rangeLabels: [`${a("target_temp")} ${a("ed_min")}`, `${a("target_temp")} ${a("ed_max")}`],
					onInput: (e, t) => c({
						which: E ? t : "single",
						value: e
					}),
					onChange: (e, t) => {
						let n = E ? t : "single";
						c(void 0), L(n, e);
					}
				}),
				N.length > 0 && /* @__PURE__ */ X(Za, {
					className: "tile-modes",
					compact: !0,
					items: N.map((e) => {
						let n = fo(e, a, t, d);
						return {
							value: e,
							label: n.label,
							icon: e === "auto" ? "mdi:refresh" : n.icon
						};
					}),
					value: S,
					selectedColor: M.selectedColor,
					refraction: i,
					scheme: r ? "dark" : "light",
					onValueChange: (e) => x("set_hvac_mode", { hvac_mode: e })
				}),
				e.show_fan_mode === !0 && /* @__PURE__ */ X("div", {
					className: `details${C ? " muted" : ""}`,
					children: H("fan_mode", "mdi:weather-windy")
				})
			]
		}) });
	}
	let U = E ? D(A) : 0, W = D(E ? j : k), [G, ae, oe] = M.ring, se = `linear-gradient(90deg, ${G}, ${oe}) center / 100% 38% no-repeat,
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.42), transparent 34px)`, ce = E ? [{
		which: "low",
		value: A
	}, {
		which: "high",
		value: j
	}] : [{
		which: "single",
		value: k
	}], le = E ? `${_(t, A, 0)}–${_(t, j, 0)}` : _(t, Math.floor(k), 0), ue = E ? "°" : `.${Math.round((k - Math.floor(k)) * 10)}°`, de = e.show_fan_mode !== !1, fe = e.show_preset_mode !== !1, pe = e.show_swing_mode === !0;
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: M.selectedColor,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			ie,
			/* @__PURE__ */ X("div", {
				className: "dial-row",
				children: /* @__PURE__ */ X("div", {
					ref: l,
					className: `dial${o ? " dragging" : ""}`,
					onPointerDown: (e) => {
						C || e.button !== 0 || (e.preventDefault(), e.currentTarget.setPointerCapture?.(e.pointerId), z(ee(e)));
					},
					onPointerMove: (e) => {
						if (!o) return;
						let t = ee(e);
						t !== o.value && c({
							...o,
							value: t
						});
					},
					onPointerUp: B,
					onPointerCancel: B,
					children: [
						/* @__PURE__ */ X("svg", {
							viewBox: `0 0 ${Qa} ${Qa}`,
							style: {
								"--ring-glow": M.glow,
								"--lg-ring-0": G,
								"--lg-ring-1": ae,
								"--lg-ring-2": oe
							},
							children: [
								/* @__PURE__ */ X("defs", { children: /* @__PURE__ */ X("linearGradient", {
									id: "ring-grad",
									gradientUnits: "userSpaceOnUse",
									x1: "0",
									y1: Qa,
									x2: Qa,
									y2: "0",
									children: [
										/* @__PURE__ */ X("stop", {
											offset: "0",
											stopColor: "var(--lg-ring-0)"
										}),
										/* @__PURE__ */ X("stop", {
											offset: "0.55",
											stopColor: "var(--lg-ring-1)"
										}),
										/* @__PURE__ */ X("stop", {
											offset: "1",
											stopColor: "var(--lg-ring-2)"
										})
									]
								}) }),
								/* @__PURE__ */ X("path", {
									className: "ring-track",
									d: co(to, 405)
								}),
								/* @__PURE__ */ X("path", {
									className: "ring-fill",
									d: co(to, 405),
									pathLength: "1",
									stroke: "url(#ring-grad)",
									style: {
										strokeDasharray: `${Math.max(W - U, 0).toFixed(4)} 1`,
										strokeDashoffset: (-U).toFixed(4),
										opacity: +!C
									}
								})
							]
						}),
						!C && ce.map(({ which: e, value: t }) => {
							let n = to + D(t) * ro, [s, c] = oo(n);
							return /* @__PURE__ */ X(so, {
								id: e,
								x: s / Qa,
								y: c / Qa,
								rotation: n - 90,
								motionPosition: D(t) * Qa,
								active: o?.which === e,
								refraction: i,
								scheme: r ? "dark" : "light",
								sourceBackground: se,
								label: E ? `${a("target_temp")} ${a(e === "low" ? "ed_min" : "ed_max")}` : a("target_temp"),
								value: t,
								min: e === "high" ? A + v : w,
								max: e === "low" && E ? j - v : T,
								onKeyDown: (t) => V(e, t)
							}, e);
						}),
						/* @__PURE__ */ X("div", {
							className: "center",
							children: [
								/* @__PURE__ */ X("div", {
									className: "caption",
									children: a(E ? "target_range" : "target_temp")
								}),
								/* @__PURE__ */ X("div", {
									className: `temp-row${C ? " off" : ""}`,
									children: [/* @__PURE__ */ X("span", {
										className: `target${E ? " range" : ""}`,
										children: le
									}), /* @__PURE__ */ X("span", {
										className: "fraction",
										children: ue
									})]
								}),
								F !== void 0 && /* @__PURE__ */ X("div", {
									className: "current",
									children: [
										a("room_temp"),
										" ",
										_(t, F, 1),
										"°"
									]
								})
							]
						}),
						/* @__PURE__ */ X("div", {
							className: "minmax",
							children: [/* @__PURE__ */ X("span", { children: [_(t, w, 0), "°"] }), /* @__PURE__ */ X("span", { children: [_(t, T, 0), "°"] })]
						})
					]
				})
			}),
			N.length > 0 && /* @__PURE__ */ X(Za, {
				className: "segment modes",
				items: N.map((e) => ({
					value: e,
					...fo(e, a, t, d)
				})),
				value: S,
				selectedColor: M.selectedColor,
				refraction: i,
				scheme: r ? "dark" : "light",
				onValueChange: (e) => x("set_hvac_mode", { hvac_mode: e })
			}),
			(de || fe || pe) && /* @__PURE__ */ X("div", {
				className: `details${C ? " muted" : ""}`,
				children: [
					de && H("fan_mode", "mdi:weather-windy"),
					fe && H("preset_mode", "mdi:creation"),
					pe && H("swing_mode", "mdi:arrow-oscillating")
				]
			})
		]
	}) });
}
var mo = ki({
	tagName: "liquid-glass-climate-card",
	component: po,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		Ya,
		lo
	],
	getCardSize: () => 6,
	getGridOptions: (e) => {
		let t = e.design === "compact" || e.design === "a";
		return Ui(t ? 4 : 6, t ? 6 : 12);
	},
	getStubConfig: (e, t, n) => ({ entity: x(["climate"], e, t, n) })
}), ho = 500, go = 10, _o = "\n  .card {\n    cursor: pointer;\n    user-select: none;\n    -webkit-user-select: none;\n    transition:\n      background-color 0.38s ease,\n      box-shadow 0.38s ease;\n  }\n  .card:focus-visible {\n    outline: 2px solid var(--lg-switch-accent);\n    outline-offset: 2px;\n  }\n  /* The whole card is the control, so the title must not look separately clickable. */\n  .title {\n    cursor: inherit;\n  }\n  .card.switch-turned-on {\n    animation: lg-switch-card-on 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);\n  }\n  .card.switch-turned-off {\n    animation: lg-switch-card-off 0.36s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  .card.switch-turned-on .icon-well {\n    animation: lg-switch-icon-on 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);\n  }\n  .card.switch-turned-off .icon-well {\n    animation: lg-switch-icon-off 0.36s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  .card.switch-turned-on .state,\n  .card.switch-turned-off .state {\n    animation: lg-switch-state-change 0.32s ease-out;\n  }\n  @keyframes lg-switch-card-on {\n    0% { transform: scale(0.985); }\n    58% { transform: scale(1.008); }\n    100% { transform: scale(1); }\n  }\n  @keyframes lg-switch-card-off {\n    0% { transform: scale(1.006); }\n    100% { transform: scale(1); }\n  }\n  @keyframes lg-switch-icon-on {\n    0% { transform: scale(0.78) rotate(-8deg); }\n    62% { transform: scale(1.1) rotate(2deg); }\n    100% { transform: scale(1) rotate(0); }\n  }\n  @keyframes lg-switch-icon-off {\n    0% { transform: scale(1.08); }\n    55% { transform: scale(0.92); }\n    100% { transform: scale(1); }\n  }\n  @keyframes lg-switch-state-change {\n    0% { opacity: 0; transform: translateY(3px); }\n    100% { opacity: 1; transform: translateY(0); }\n  }\n";
function vo(e) {
	switch (e?.split(".")[0]) {
		case "fan": return "mdi:fan";
		case "light": return "mdi:lightbulb";
		case "automation": return "mdi:robot";
		default: return "mdi:power-plug";
	}
}
function yo({ config: e, hass: n, host: r }) {
	let { refraction: i } = Ai(r, e, n), a = s(e.language ?? n?.locale?.language ?? n?.language), o = e.entity ? n?.states[e.entity] : void 0, l = h(n, o, e.name, e.entity ?? ""), u = Y(void 0), d = Y(void 0), p = Y(!1), m = Y(void 0), [v, b] = q(), x = o && !y(o) ? o.state === "on" : void 0, S = () => {
		window.clearTimeout(u.current), u.current = void 0, d.current = void 0;
	};
	if (J(() => () => window.clearTimeout(u.current), []), J(() => {
		if (x === void 0) {
			m.current = void 0, b(void 0);
			return;
		}
		m.current !== void 0 && m.current !== x && b(x ? "on" : "off"), m.current = x;
	}, [x]), !o || y(o)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: l,
		label: a("unavailable"),
		onOpen: () => f(r, e.entity)
	}) });
	let C = x ?? !1, w = () => {
		if (!e.entity || !n) return;
		let r = e.entity.split(".")[0], i = t.includes(r) ? r : "homeassistant";
		n.callService(i, "toggle", { entity_id: e.entity });
	}, T = (t) => {
		t.button === 0 && (p.current = !1, d.current = {
			x: t.clientX,
			y: t.clientY
		}, u.current = window.setTimeout(() => {
			p.current = !0, S(), f(r, e.entity);
		}, ho));
	}, E = (e) => {
		let t = d.current;
		t && (Math.abs(e.clientX - t.x) > go || Math.abs(e.clientY - t.y) > go) && S();
	}, D = () => {
		if (S(), p.current) {
			p.current = !1;
			return;
		}
		w();
	}, O = (e) => {
		(e.key === " " || e.key === "Enter") && (e.preventDefault(), w());
	}, k = e.power_entity ? n?.states[e.power_entity] : void 0, A = c(o.last_changed, a), j = g(n, o, a(C ? "on" : "off")), M = C ? k && !y(k) ? `${j} · ${a("power")} ${_(n, Number(k.state), 0)} ${k.attributes.unit_of_measurement ?? "W"}` : `${j} · ${a("since", { t: A })}` : `${j} · ${a("last_on")} ${A}`;
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: `card row${C ? " active" : ""}${v ? ` switch-turned-${v}` : ""}`,
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: C ? "var(--lg-switch-accent)" : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		role: "switch",
		"aria-checked": C,
		"aria-label": l,
		tabIndex: 0,
		onClick: D,
		onKeyDown: O,
		onPointerDown: T,
		onPointerMove: E,
		onPointerUp: S,
		onPointerCancel: S,
		onPointerLeave: S,
		onContextMenu: (e) => e.preventDefault(),
		children: [/* @__PURE__ */ X(Kr, {
			icon: e.icon ?? o.attributes.icon ?? vo(e.entity),
			style: C ? {
				from: "var(--lg-switch-accent-light)",
				to: "var(--lg-switch-accent)",
				glow: "rgba(10,132,255,0.24)"
			} : void 0
		}), /* @__PURE__ */ X(qr, {
			name: l,
			state: M
		})]
	}) });
}
var bo = ki({
	tagName: "liquid-glass-switch-card",
	component: yo,
	styles: [
		ji,
		Xr,
		Hr,
		_o
	],
	getCardSize: () => 1,
	getGridOptions: () => Hi(),
	getStubConfig: (e, n, r) => ({ entity: x(t, e, n, r) })
}), xo = {
	points: [],
	trend: void 0
}, So = 3e5, Co = 36e5;
function wo(e, t = 600) {
	if (e.length <= t || t < 4) return e;
	let n = [e[0]], r = Math.max(1, Math.floor((t - 2) / 2)), i = e.length - 2;
	for (let t = 0; t < r; t++) {
		let a = 1 + Math.floor(t * i / r), o = 1 + Math.floor((t + 1) * i / r), s = a, c = a;
		for (let t = a + 1; t < o; t++) e[t].v < e[s].v && (s = t), e[t].v > e[c].v && (c = t);
		s === c ? n.push(e[s]) : s < c ? n.push(e[s], e[c]) : n.push(e[c], e[s]);
	}
	return n.push(e[e.length - 1]), n;
}
function To(e) {
	if (e.length < 2) return;
	let t = e[e.length - 1], n = t.t - Co, r = e[0];
	for (let t of e) if (t.t <= n) r = t;
	else break;
	return t.v - r.v;
}
function Eo(e, t) {
	let n = -1;
	for (let r = 0; r < e.length && e[r].t <= t; r++) n = r;
	if (n < 0) return e;
	let r = e.slice(n);
	return [{
		t,
		v: r[0].v
	}, ...r.slice(1)];
}
function Do(e, t, n, r = Date.now()) {
	let i = Eo(e, r - n * Co).slice();
	if (t !== void 0 && Number.isFinite(t)) {
		let e = i[i.length - 1];
		(!e || e.t < r) && i.push({
			t: r,
			v: t
		});
	}
	return i.length === 0 ? xo : {
		points: wo(i),
		trend: To(i)
	};
}
function Oo(e, t) {
	if (!t?.length) return e;
	let n = e.slice();
	for (let e of t) {
		let t = Number(e.s), r = typeof e.lu == "number" ? e.lu * 1e3 : NaN;
		if (!Number.isFinite(t) || !Number.isFinite(r)) continue;
		let i = n[n.length - 1];
		i && r <= i.t || n.push({
			t: r,
			v: t
		});
	}
	return n;
}
function ko(e) {
	return (/* @__PURE__ */ new Date(Date.now() - e * Co)).toISOString();
}
async function Ao(e, t, n) {
	let r = ko(n);
	try {
		let n = await e.callApi("GET", `history/period/${r}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`), i = [];
		for (let e of n?.[0] ?? []) {
			let t = Number(e.state ?? e.s), n = e.last_changed ?? e.last_updated, r = n ? new Date(n).getTime() : typeof e.lu == "number" ? e.lu * 1e3 : NaN;
			Number.isFinite(t) && Number.isFinite(r) && i.push({
				t: r,
				v: t
			});
		}
		return i;
	} catch {
		return [];
	}
}
async function jo(e, t, n, r) {
	let i = e.connection;
	if (!i?.subscribeMessage) throw Error("history/stream is unavailable");
	let a = [], o = await i.subscribeMessage((e) => {
		let i = e?.states?.[t];
		i && (a = Eo(Oo(a, i), Date.now() - n * Co), r(a));
	}, {
		type: "history/stream",
		entity_ids: [t],
		start_time: ko(n),
		minimal_response: !0,
		no_attributes: !0,
		significant_changes_only: !1
	});
	return () => void o();
}
//#endregion
//#region src/react/use-visible-tick.ts
function Mo(e, t = !0) {
	let [n, r] = q(!0), [i, a] = q(() => typeof document > "u" || document.visibilityState === "visible");
	return J(() => {
		if (typeof IntersectionObserver > "u") return;
		let t = new IntersectionObserver((e) => r(e.some((e) => e.isIntersecting)), { rootMargin: "128px" });
		return t.observe(e), () => t.disconnect();
	}, [e]), J(() => {
		let e = () => a(document.visibilityState === "visible");
		return document.addEventListener("visibilitychange", e), () => document.removeEventListener("visibilitychange", e);
	}, []), t && n && i;
}
function No(e, t) {
	let [n, r] = q(0), i = Y(!0);
	return J(() => {
		if (!e) {
			i.current = !1;
			return;
		}
		i.current || r((e) => e + 1), i.current = !0;
		let n = window.setInterval(() => r((e) => e + 1), t);
		return () => window.clearInterval(n);
	}, [e, t]), n;
}
function Po(e, t, n = !0) {
	return No(Mo(e, n), t);
}
//#endregion
//#region src/react/use-entity-history.ts
function Fo(e, t, n, r, i = !0) {
	let [a, o] = q([]), [s, c] = q(!1), l = Y(t);
	l.current = t;
	let u = !!(i && n && t), d = Mo(e, u), f = t?.connection, p = !!(u && f?.subscribeMessage && !s), m = No(d && !p, So);
	J(() => {
		if (!p || !d || !n) return;
		let e = l.current;
		if (!e) return;
		let t = !0, i;
		return jo(e, n, r, (e) => {
			t && o(e);
		}).then((e) => {
			t ? i = e : e();
		}, () => {
			t && c(!0);
		}), () => {
			t = !1, i?.();
		};
	}, [
		p,
		d,
		n,
		r
	]), J(() => {
		if (p || !d || !n) return;
		let e = l.current;
		if (!e) return;
		let t = !1;
		return Ao(e, n, r).then((e) => {
			t || o(e);
		}), () => {
			t = !0;
		};
	}, [
		p,
		d,
		n,
		r,
		m
	]);
	let h = n ? t?.states[n] : void 0, g = h ? Number(h.state) : void 0;
	return mt(() => u ? Do(a, g, r) : xo, [
		u,
		a,
		g,
		h?.last_updated,
		r
	]);
}
//#endregion
//#region src/cards/sensor-card.tsx
var Io = 340, Lo = 84, Ro = `
  .card {
    gap: 16px;
  }
  .value-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 10px;
  }
  .value {
    display: flex;
    align-items: flex-start;
    gap: 3px;
    min-width: 0;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .value .number {
    font-size: var(--lg-value, 52px);
    line-height: 1;
    letter-spacing: -2px;
    color: var(--lg-text-primary);
  }
  /* Units run from "°C" to whole words like "objects", so this one has to be able to
     shrink and, failing that, truncate rather than push the number out of the card. */
  .value .unit {
    font-size: var(--lg-value-unit, 22px);
    line-height: 1.3;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .range {
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }
  .range .caption {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .range .rv {
    font-family: var(--lg-font-ui);
    font-size: var(--lg-label);
    font-weight: 600;
    letter-spacing: -0.2px;
    color: var(--lg-text-primary);
    font-variant-numeric: tabular-nums;
  }
  .spark {
    width: 100%;
    height: var(--lg-spark, ${Lo}px);
    overflow: visible;
    display: block;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-value: clamp(26px, 13.5cqi, 52px);
      --lg-value-unit: clamp(13px, 5.8cqi, 22px);
      --lg-spark: clamp(52px, 22cqi, ${Lo}px);
    }
  }
  /* The 24 h range needs more room than a narrow column can spare, and the sparkline
     underneath already shows the same span. */
  @container (max-width: 260px) {
    .range {
      display: none;
    }
  }
  .spark .line {
    fill: none;
    stroke: var(--accent);
    stroke-width: 2.5;
    stroke-linejoin: round;
    stroke-linecap: round;
  }
  .spark .dot {
    fill: var(--accent);
    stroke: #fff;
    stroke-width: 2.5;
    filter: drop-shadow(0 0 5px var(--accent));
  }
  .axis {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .badge lg-icon {
    --mdc-icon-size: 14px;
  }
  .badge.trend {
    font-family: var(--lg-font-ui);
    gap: 4px;
  }
`;
function zo(e) {
	if (e.length < 2) return;
	let t = e[0].t, n = e[e.length - 1].t, r = Infinity, i = -Infinity;
	for (let t of e) r = Math.min(r, t.v), i = Math.max(i, t.v);
	i - r < 1e-9 && (i += 1, --r);
	let a = e.map((e) => (e.t - t) / (n - t || 1) * 328), o = e.map((e) => 10 + (1 - (e.v - r) / (i - r)) * 64), s = `M ${a[0].toFixed(1)} ${o[0].toFixed(1)}`;
	for (let t = 0; t < e.length - 1; t++) {
		let n = a[Math.max(0, t - 1)], r = o[Math.max(0, t - 1)], i = a[t], c = o[t], l = a[t + 1], u = o[t + 1], d = a[Math.min(e.length - 1, t + 2)], f = o[Math.min(e.length - 1, t + 2)], p = i + (l - n) / 6, m = c + (u - r) / 6, h = l - (d - i) / 6, g = u - (f - c) / 6;
		s += ` C ${p.toFixed(1)} ${m.toFixed(1)}, ${h.toFixed(1)} ${g.toFixed(1)}, ${l.toFixed(1)} ${u.toFixed(1)}`;
	}
	let c = a[a.length - 1];
	return {
		line: s,
		area: `${s} L ${c.toFixed(1)} ${Lo} L ${a[0].toFixed(1)} ${Lo} Z`,
		last: [c, o[o.length - 1]]
	};
}
function Bo(e, t) {
	return t ? /^[°%]/.test(t) ? `${e}${t}` : `${e} ${t}` : e;
}
function Vo(e, t, n, r, i) {
	let a = r ? [r] : [];
	a.push(i("updated_ago", { t: c(e.last_updated, i) }));
	let o = t.secondary_entity ? n?.states[t.secondary_entity] : void 0;
	if (o && !y(o)) {
		let e = h(n, o, t.secondary_label, ""), r = g(n, o, `${o.state}${o.attributes.unit_of_measurement ?? ""}`);
		a.push(`${e} ${r}`.trim());
	}
	return a.join(" · ");
}
function Ho({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = h(t, a, e.name, e.entity ?? ""), c = e.hours_to_show ?? 24, l = e.value_in_caption === !0, u = e.graph !== !1 && !l, d = e.trend !== !1, p = u || d, { points: m, trend: v } = Fo(n, t, e.entity, u ? c : 1, p);
	if (!a || y(a)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: o,
		label: i("unavailable"),
		onOpen: () => f(n, e.entity)
	}) });
	let b = e.accent ?? "#FF9F0A", x = Number(a.state), S = Number.isFinite(x), C = e.decimals, w = a.attributes.unit_of_measurement ?? "", E = S && d ? v : void 0, O = u ? zo(m) : void 0, k, A;
	for (let e of m) k = k === void 0 ? e.v : Math.min(k, e.v), A = A === void 0 ? e.v : Math.max(A, e.v);
	let j = e.icon ?? a.attributes.icon ?? (a.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer"), M = (E ?? 0) >= 0, N = w === "°C" || w === "°F" ? "°" : w.length <= 3 ? w : "", P = S ? _(t, x, C) : g(t, a, a.state), F = Vo(a, e, t, l ? Bo(P, w) : void 0, i), I = () => f(n, e.entity), L = /* @__PURE__ */ X(K, { children: [
		/* @__PURE__ */ X(Kr, {
			icon: j,
			style: {
				from: T(b),
				to: b,
				glow: D(b, .24)
			},
			onClick: I
		}),
		/* @__PURE__ */ X(qr, {
			name: o,
			state: F,
			onClick: I
		}),
		E !== void 0 && /* @__PURE__ */ X("div", {
			className: "badge trend",
			style: {
				"--badge-color": M ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
				"--badge-bg": M ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
				"--badge-stroke": M ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)"
			},
			children: [/* @__PURE__ */ X(Q, { icon: M ? "mdi:trending-up" : "mdi:trending-down" }), /* @__PURE__ */ X("span", { children: [
				M ? "+" : "−",
				_(t, Math.abs(E), 1),
				N
			] })]
		})
	] });
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: `card${l ? " row" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: b,
		style: {
			display: "flex",
			position: "relative",
			"--accent": b
		},
		children: [
			l ? L : /* @__PURE__ */ X("div", {
				className: "header",
				children: L
			}),
			!l && /* @__PURE__ */ X("div", {
				className: "value-row",
				children: [/* @__PURE__ */ X("div", {
					className: "value",
					children: [/* @__PURE__ */ X("span", {
						className: "number",
						children: P
					}), w && /* @__PURE__ */ X("span", {
						className: "unit",
						children: w
					})]
				}), u && k !== void 0 && A !== void 0 && /* @__PURE__ */ X("div", {
					className: "range",
					children: [/* @__PURE__ */ X("span", {
						className: "caption",
						children: c === 24 ? i("hours_24") : `${c} h`
					}), /* @__PURE__ */ X("span", {
						className: "rv",
						children: [
							_(t, k, C ?? 1),
							" – ",
							_(t, A, C ?? 1),
							" ",
							w
						]
					})]
				})]
			}),
			u && /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("svg", {
				className: "spark",
				viewBox: `0 0 ${Io} ${Lo}`,
				preserveAspectRatio: "none",
				children: [/* @__PURE__ */ X("defs", { children: /* @__PURE__ */ X("linearGradient", {
					id: "area",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ X("stop", {
						offset: "0",
						stopColor: b,
						stopOpacity: "0.4"
					}), /* @__PURE__ */ X("stop", {
						offset: "1",
						stopColor: b,
						stopOpacity: "0"
					})]
				}) }), O && /* @__PURE__ */ X(K, { children: [
					/* @__PURE__ */ X("path", {
						d: O.area,
						fill: "url(#area)"
					}),
					/* @__PURE__ */ X("path", {
						className: "line",
						d: O.line
					}),
					/* @__PURE__ */ X("circle", {
						className: "dot",
						cx: O.last[0],
						cy: O.last[1],
						r: "4.75"
					})
				] })]
			}), /* @__PURE__ */ X("div", {
				className: "axis",
				children: [
					/* @__PURE__ */ X("span", { children: i("hours_ago", { n: c }) }),
					/* @__PURE__ */ X("span", { children: i("hours_ago", { n: Math.round(c / 2) }) }),
					/* @__PURE__ */ X("span", { children: i("now") })
				]
			})] })
		]
	}) });
}
var Uo = ki({
	tagName: "liquid-glass-sensor-card",
	component: Ho,
	styles: [
		ji,
		Xr,
		Hr,
		Ro
	],
	getCardSize: (e) => e.graph === !1 || e.value_in_caption ? e.value_in_caption ? 1 : 2 : 4,
	getGridOptions: (e) => e.value_in_caption ? Hi() : Ui(e.graph === !1 ? 3 : 4),
	getStubConfig: (e, t, n) => ({ entity: x(["sensor"], e, t, n, (e) => Number.isFinite(Number(e.state))) })
});
//#endregion
//#region src/cards/binary-sensor-card.tsx
function Wo(e, t) {
	let n = {
		iconOn: "mdi:checkbox-marked-circle",
		iconOff: "mdi:checkbox-blank-circle-outline",
		badgeOn: t("on"),
		badgeOff: t("off"),
		stateOn: t("on"),
		stateOff: t("off"),
		accent: "#FF9F0A",
		accentLight: "#FFC96B"
	};
	switch (e) {
		case "door":
		case "garage_door":
		case "opening": return {
			...n,
			iconOn: "mdi:door-open",
			iconOff: "mdi:door-closed",
			badgeOn: t("open"),
			badgeOff: t("closed"),
			stateOn: t("is_open"),
			stateOff: t("is_closed")
		};
		case "window": return {
			...n,
			iconOn: "mdi:window-open-variant",
			iconOff: "mdi:window-closed-variant",
			badgeOn: t("open"),
			badgeOff: t("closed"),
			stateOn: t("is_open"),
			stateOff: t("is_closed")
		};
		case "motion":
		case "occupancy":
		case "presence": return {
			...n,
			iconOn: "mdi:motion-sensor",
			iconOff: "mdi:motion-sensor-off",
			badgeOn: t("detected"),
			badgeOff: t("clear"),
			stateOn: t("detecting"),
			stateOff: t("clear"),
			accent: "#7C3AED",
			accentLight: "#B48CFF"
		};
		case "moisture": return {
			...n,
			iconOn: "mdi:water-alert",
			iconOff: "mdi:water-off",
			badgeOn: t("detected"),
			badgeOff: t("clear"),
			stateOn: t("detecting"),
			stateOff: t("clear"),
			accent: "#0A84FF",
			accentLight: "#8FDBFF"
		};
		case "smoke":
		case "gas":
		case "carbon_monoxide":
		case "safety":
		case "problem": return {
			...n,
			iconOn: "mdi:alert",
			iconOff: "mdi:shield-check",
			badgeOn: t("detected"),
			badgeOff: t("clear"),
			stateOn: t("detecting"),
			stateOff: t("clear"),
			accent: "#FF3B30",
			accentLight: "#FF8A80"
		};
		case "vibration":
		case "sound": return {
			...n,
			iconOn: "mdi:vibrate",
			iconOff: "mdi:vibrate-off",
			badgeOn: t("detected"),
			badgeOff: t("clear"),
			stateOn: t("detecting"),
			stateOff: t("clear"),
			accent: "#7C3AED",
			accentLight: "#B48CFF"
		};
		case "connectivity": return {
			...n,
			iconOn: "mdi:lan-connect",
			iconOff: "mdi:lan-disconnect",
			accent: "#0A84FF",
			accentLight: "#8FDBFF"
		};
		case "battery": return {
			...n,
			iconOn: "mdi:battery-alert",
			iconOff: "mdi:battery",
			accent: "#FF3B30",
			accentLight: "#FF8A80"
		};
		case "lock": return {
			...n,
			iconOn: "mdi:lock-open-variant",
			iconOff: "mdi:lock",
			badgeOn: t("unlocked"),
			badgeOff: t("locked"),
			stateOn: t("is_unlocked"),
			stateOff: t("is_locked"),
			accent: "#FF3B30",
			accentLight: "#FF8A80"
		};
		default: return n;
	}
}
function Go({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = h(t, a, e.name, e.entity ?? ""), l = () => f(n, e.entity);
	if (!a || y(a)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: o,
		label: i("unavailable"),
		onOpen: l
	}) });
	let u = a.state === "on", d = Wo(a.attributes.device_class, i), p = e.accent ?? d.accent, m = e.accent ? T(e.accent) : d.accentLight, _ = (u ? e.icon_on : e.icon_off) ?? e.icon ?? a.attributes.icon ?? (u ? d.iconOn : d.iconOff), v = u ? {
		from: m,
		to: p,
		glow: D(p, .24)
	} : void 0, b = u ? {
		color: p === "#7C3AED" ? "#A66BFF" : p,
		bg: D(p, .18),
		stroke: D(p, .3)
	} : void 0, x = (u ? e.label_on : e.label_off) ?? g(t, a, u ? d.badgeOn : d.badgeOff), S = c(a.last_changed, i), C = u ? `${d.stateOn} · ${i("since", { t: S })}` : `${d.stateOff} · ${i("last_change", { t: S })}`;
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card row",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: u ? p : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X(Kr, {
				icon: _,
				style: v,
				onClick: l
			}),
			/* @__PURE__ */ X(qr, {
				name: o,
				state: C,
				onClick: l
			}),
			/* @__PURE__ */ X(Jr, {
				label: x,
				style: b
			})
		]
	}) });
}
var Ko = ki({
	tagName: "liquid-glass-binary-sensor-card",
	component: Go,
	styles: [
		ji,
		Xr,
		Hr
	],
	getCardSize: () => 1,
	getGridOptions: () => Hi(),
	getStubConfig: (e, t, n) => ({ entity: x(["binary_sensor"], e, t, n) })
}), qo = "\n  .card {\n    gap: 16px;\n    width: 100%;\n  }\n  .lock-control {\n    position: relative;\n    display: grid;\n    gap: 6px;\n    --lg-slider-height: var(--lg-lock-track-h, 54px);\n    --lg-slider-bar-height: var(--lg-lock-bar-h, 42px);\n    --lg-slider-thumb-width: var(--lg-lock-thumb-w, 58px);\n    --lg-slider-thumb-height: var(--lg-lock-thumb-h, 44px);\n  }\n  .lock-control .slider-track:focus-visible {\n    outline-color: var(--thumb-color);\n  }\n  .lock-control .slider-anchor { display: none; }\n  .lock-control .slider-bar,\n  .lock-control .slider-refraction-bar {\n    border: 1px solid var(--lg-glass-stroke);\n    box-shadow:\n      inset 0 1px 0 rgba(255,255,255,0.46),\n      inset 0 -1px 0 rgba(255,255,255,0.1),\n      0 4px 14px rgba(0,0,0,0.05);\n    -webkit-backdrop-filter: blur(10px) saturate(1.25);\n    backdrop-filter: blur(10px) saturate(1.25);\n  }\n  .lock-instruction {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    font-size: var(--lg-hint, 14px);\n    line-height: 20px;\n    font-weight: 600;\n    color: var(--lg-text-secondary);\n    pointer-events: none;\n    white-space: nowrap;\n  }\n  .lock-instruction::before {\n    content: \"\";\n    width: 5px;\n    height: 5px;\n    flex: none;\n    border-radius: 50%;\n    background: var(--thumb-color);\n    box-shadow: 0 0 8px color-mix(in srgb, var(--thumb-color) 70%, transparent);\n  }\n  .lock-instruction > span {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .lock-instruction lg-icon {\n    flex: none;\n    --mdc-icon-size: 16px;\n  }\n  .chips .chip {\n    flex: 1;\n    justify-content: center;\n    padding: 0;\n    border-radius: 22px;\n  }\n  .chip-button {\n    width: 100%;\n    min-width: 0;\n    min-height: 42px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    padding: 12px 10px;\n    border: 0;\n    border-radius: inherit;\n    background: transparent;\n    color: inherit;\n    font: inherit;\n    font-size: var(--lg-label);\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .chip-button > span {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .chip-button lg-icon {\n    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);\n    width: clamp(15px, 4.7cqi, 18px);\n    height: clamp(15px, 4.7cqi, 18px);\n  }\n  @container (max-width: 300px) {\n    .lock-instruction lg-icon { display: none; }\n  }\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-hint: clamp(11.5px, 3.7cqi, 14px);\n      --lg-lock-track-h: clamp(48px, 14.2cqi, 54px);\n      --lg-lock-bar-h: clamp(38px, 11.1cqi, 42px);\n      --lg-lock-thumb-w: clamp(52px, 15.3cqi, 58px);\n      --lg-lock-thumb-h: clamp(40px, 11.6cqi, 44px);\n    }\n  }\n";
function Jo(e, t, n, r, i) {
	let a = c(t.last_changed, i), o = (n) => g(e, t, n);
	return r ? {
		icon: "mdi:alert",
		well: {
			from: "#FFE66B",
			to: "var(--lg-warn-deep)",
			glow: "rgba(255,214,10,0.24)"
		},
		badge: {
			color: "var(--lg-warn-text)",
			background: "rgba(255,214,10,0.24)",
			stroke: "rgba(230,168,0,0.3)",
			glow: "var(--lg-warn)"
		},
		badgeLabel: o(i("jammed")),
		thumbColor: "var(--lg-warn)",
		hint: i("cannot_operate"),
		state: i("jammed_state")
	} : n ? {
		icon: "mdi:lock",
		well: {
			from: "#7EE8A0",
			to: "var(--lg-lock-locked-deep)",
			glow: "rgba(48,209,88,0.24)"
		},
		badge: {
			color: "var(--lg-lock-locked-deep)",
			background: "rgba(30,158,74,0.18)",
			stroke: "rgba(30,158,74,0.3)"
		},
		badgeLabel: o(i("locked")),
		thumbColor: "var(--lg-lock-locked)",
		hint: i("slide_to_unlock"),
		state: t.state === "locking" ? i("locking") : `${i("is_locked")} · ${i("auto_locked_at", { t: l(t.last_changed) })}`
	} : {
		icon: "mdi:lock-open-variant",
		well: {
			from: "var(--lg-lock-unlocked)",
			to: "var(--lg-lock-unlocked-deep)",
			glow: "rgba(255,59,48,0.24)"
		},
		badge: {
			color: "var(--lg-lock-unlocked-deep)",
			background: "rgba(255,59,48,0.18)",
			stroke: "rgba(255,59,48,0.3)"
		},
		badgeLabel: o(i("unlocked")),
		thumbColor: "var(--lg-lock-unlocked)",
		hint: i("slide_to_lock"),
		state: t.state === "unlocking" ? i("unlocking") : `${i("is_unlocked")} · ${a}`
	};
}
function Yo({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), [a, o] = q(), [c, l] = q(), u = Y(void 0), d = s(e.language ?? t?.locale?.language ?? t?.language), p = e.entity ? t?.states[e.entity] : void 0, m = p?.state;
	if (J(() => () => window.clearTimeout(u.current), []), J(() => {
		(c === "lock" && m === "locked" || c === "unlock" && m === "unlocked") && (window.clearTimeout(u.current), l(void 0));
	}, [m, c]), !p || y(p)) {
		let r = h(t, p, e.name, e.entity ?? "");
		return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
			className: "card",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: "var(--lg-warn)",
			style: {
				display: "flex",
				position: "relative"
			},
			children: /* @__PURE__ */ X("div", {
				className: "header",
				children: [/* @__PURE__ */ X("div", {
					className: "icon-well idle",
					onClick: () => f(n, e.entity),
					role: "button",
					children: /* @__PURE__ */ X(Q, { icon: e.icon ?? "mdi:help-circle-outline" })
				}), /* @__PURE__ */ X("div", {
					className: "title",
					onClick: () => f(n, e.entity),
					children: [/* @__PURE__ */ X("div", {
						className: "name",
						children: r
					}), /* @__PURE__ */ X("div", {
						className: "state",
						children: d("unavailable")
					})]
				})]
			})
		}) });
	}
	let g = p.state === "locked" || p.state === "locking", _ = p.state === "jammed", v = c !== void 0 || p.state === "locking" || p.state === "unlocking", b = Jo(t, p, g, _, d), x = (n) => {
		t && e.entity && (l(n), t.callService("lock", n, { entity_id: e.entity }), window.clearTimeout(u.current), u.current = window.setTimeout(() => l(void 0), 4e3));
	}, S = (e) => {
		o(void 0), g && e >= .8 ? x("unlock") : !g && e <= .2 && x("lock");
	}, C = (n) => {
		let r = n.service.indexOf(".");
		if (!t || r < 1 || r === n.service.length - 1) return;
		let i = n.service.slice(0, r), a = n.service.slice(r + 1);
		t.callService(i, a, {
			entity_id: e.entity,
			...n.data ?? {}
		});
	}, w = { "--thumb-color": b.thumbColor };
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: b.thumbColor,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X("div", {
						className: "icon-well",
						style: {
							"--well-from": b.well.from,
							"--well-to": b.well.to,
							"--well-glow": b.well.glow
						},
						onClick: () => f(n, e.entity),
						role: "button",
						children: /* @__PURE__ */ X(Q, { icon: e.icon ?? b.icon })
					}),
					/* @__PURE__ */ X("div", {
						className: "title",
						onClick: () => f(n, e.entity),
						children: [/* @__PURE__ */ X("div", {
							className: "name",
							children: h(t, p, e.name, e.entity ?? "")
						}), /* @__PURE__ */ X("div", {
							className: "state",
							children: b.state
						})]
					}),
					/* @__PURE__ */ X("div", {
						className: "badge",
						style: {
							"--badge-color": b.badge.color,
							"--badge-bg": b.badge.background,
							"--badge-stroke": b.badge.stroke,
							"--badge-glow": b.badge.glow ?? b.badge.color
						},
						children: [/* @__PURE__ */ X("span", { className: "dot" }), /* @__PURE__ */ X("span", { children: b.badgeLabel })]
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: `lock-control ${g ? "locked" : "unlocked"}${_ ? " jammed" : ""}`,
				style: w,
				children: [/* @__PURE__ */ X("div", {
					className: "lock-instruction",
					"aria-hidden": "true",
					children: [
						!g && !_ && /* @__PURE__ */ X(Q, { icon: "mdi:chevron-double-left" }),
						/* @__PURE__ */ X("span", { children: b.hint }),
						g && !_ && /* @__PURE__ */ X(Q, { icon: "mdi:chevron-double-right" })
					]
				}), /* @__PURE__ */ X(la, {
					value: a ?? (c === "unlock" ? 1 : c === "lock" ? 0 : +!g),
					min: 0,
					max: 1,
					step: .01,
					keyboardStep: 1,
					disabled: _ || v,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: b.hint,
					valueText: b.badgeLabel,
					showFill: !1,
					onInput: o,
					onChange: S
				})]
			}),
			e.buttons?.length ? /* @__PURE__ */ X("div", {
				className: "chips",
				children: e.buttons.map((t, n) => /* @__PURE__ */ X(Wr, {
					className: "chip",
					refraction: i,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: b.thumbColor,
					style: {
						display: "flex",
						position: "relative"
					},
					children: /* @__PURE__ */ X("button", {
						className: "chip-button",
						onClick: () => C(t),
						children: [t.icon && /* @__PURE__ */ X(Q, { icon: t.icon }), /* @__PURE__ */ X("span", { children: t.name })]
					})
				}, `${t.service}:${t.name}:${n}`))
			}) : null
		]
	}) });
}
var Xo = ki({
	tagName: "liquid-glass-lock-card",
	component: Yo,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		qo
	],
	getCardSize: () => 2,
	getGridOptions: (e) => Ui(3 + Math.ceil((e.buttons?.length ?? 0) / 2)),
	getStubConfig: (e, t, n) => ({ entity: x(["lock"], e, t, n) })
}), Zo = {
	OPEN: 1,
	CLOSE: 2,
	SET_POSITION: 4,
	STOP: 8,
	SET_TILT: 128
}, Qo = 180, $o = `
  .card {
    gap: 16px;
  }
  .position-row {
    display: flex;
    gap: 12px;
  }
  .track {
    position: relative;
    flex: 1;
    min-width: 0;
    height: var(--lg-track-h, ${Qo}px);
    border-radius: 20px;
    overflow: hidden;
    background: var(--lg-track-bg);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.14),
      inset 0 0 0 1px var(--lg-glass-stroke);
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }
  .fabric,
  .panel {
    position: absolute;
    background: linear-gradient(180deg, #e6f8fc, #b9e9f3);
    box-shadow: 0 4px 10px rgba(10, 126, 164, 0.2);
    transition: height 0.25s ease, width 0.25s ease;
  }
  .fabric {
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 6px 14px;
  }
  .fabric span {
    height: 2px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.7);
  }
  .panel {
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 14px 8px;
  }
  .panel.left {
    left: 0;
    box-shadow: 4px 0 10px rgba(10, 126, 164, 0.2);
  }
  .panel.right {
    right: 0;
    box-shadow: -4px 0 10px rgba(10, 126, 164, 0.2);
  }
  .panel span {
    width: 2px;
    border-radius: 1px;
    background: rgba(255, 255, 255, 0.7);
  }
  .handle {
    position: absolute;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: top 0.25s ease, left 0.25s ease, right 0.25s ease;
  }
  .handle.h {
    left: 50%;
    width: 44px;
    height: 6px;
    margin-left: -22px;
  }
  .handle.v {
    top: 50%;
    width: 6px;
    height: 44px;
    margin-top: -22px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 0 14px 18px;
    pointer-events: none;
  }
  .overlay.top {
    justify-content: flex-start;
    padding-top: 16px;
  }
  /* Double curtains part in the middle, so the readable gap is centred. */
  .overlay.center {
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
  }
  /* A single curtain gathers on the left, leaving the right side clear. */
  .overlay.right {
    align-items: flex-end;
    padding-left: 12px;
    padding-right: 16px;
  }
  .overlay .pv {
    font-family: var(--lg-font-ui);
    font-size: var(--lg-pos, 30px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -1px;
    color: var(--pv-color, var(--lg-text-primary));
    font-variant-numeric: tabular-nums;
  }
  .overlay .pc {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--pc-color, var(--lg-text-secondary));
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-track-h: clamp(120px, 47cqi, ${Qo}px);
      --lg-pos: clamp(20px, 8cqi, 30px);
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .round-btn.active {
    background: rgba(43, 179, 208, 0.18);
    box-shadow: inset 0 0 0 1px rgba(43, 179, 208, 0.3);
    color: var(--lg-cover-accent-deep);
  }
  .round-btn.selected {
    background: var(--lg-segment-selected);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  }
  .round-btn.stop lg-icon {
    --mdc-icon-size: 18px;
  }
  .round-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .track:focus-visible {
    outline: 2px solid var(--lg-cover-accent-deep);
    outline-offset: 2px;
  }
  .tilt .lg-react-slider {
    --lg-slider-fill: linear-gradient(90deg, rgba(43, 179, 208, 0.35), rgba(43, 179, 208, 0.75));
    --fill-from: rgba(43, 179, 208, 0.35);
    --fill-to: rgba(43, 179, 208, 0.75);
  }
`;
function es({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), [o, c] = q(), d = Y("left"), p = Y(null), m = e.entity ? t?.states[e.entity] : void 0, _ = Sa(m?.attributes.current_position, 1), v = Sa(m?.attributes.current_tilt_position, 1), x = h(t, m, e.name, e.entity ?? ""), S = () => f(n, e.entity);
	if (!m || y(m)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: x,
		label: a("unavailable"),
		onOpen: S
	}) });
	let C = (n, r) => void t?.callService("cover", n, {
		entity_id: e.entity,
		...r
	}), w = m.attributes, T = o ?? _.value ?? (m.state === "closed" ? 0 : 100), E = (e.style ?? (w.device_class === "curtain" ? "curtain" : "blind")) === "curtain", D = E && (e.curtain ?? "double") === "single", O = m.state === "opening" || m.state === "closing" ? m.state : void 0, k = b(m, Zo.SET_POSITION), A = b(m, Zo.OPEN) || k, j = b(m, Zo.CLOSE) || k, M = b(m, Zo.STOP), N = e.show_tilt !== !1 && b(m, Zo.SET_TILT) && w.current_tilt_position !== void 0, P = (e) => {
		let t = p.current?.getBoundingClientRect();
		if (!t) return T;
		let n;
		return n = E ? D ? (e.clientX - t.left) / t.width : 2 * (d.current === "right" ? t.right - e.clientX : e.clientX - t.left) / t.width : (e.clientY - t.top) / t.height, Math.round(u(1 - n, 0, 1) * 100);
	}, F = (e) => {
		if (!k || e.button !== 0) return;
		e.preventDefault(), e.currentTarget.setPointerCapture?.(e.pointerId);
		let t = e.currentTarget.getBoundingClientRect();
		d.current = e.clientX < t.left + t.width / 2 ? "left" : "right", c(P(e));
	}, I = (e) => {
		o !== void 0 && c(P(e));
	}, L = (e) => {
		_.commit(e), C("set_cover_position", { position: e });
	}, ee = (e) => {
		if (o === void 0) return;
		let t = P(e);
		c(void 0), L(t);
	}, R = (e) => {
		if (!k) return;
		let t = T;
		if (e.key === "ArrowRight" || e.key === "ArrowUp") t += 5;
		else if (e.key === "ArrowLeft" || e.key === "ArrowDown") t -= 5;
		else if (e.key === "Home") t = 0;
		else if (e.key === "End") t = 100;
		else return;
		e.preventDefault(), L(Math.round(u(t, 0, 100)));
	}, z = (e) => {
		let t = e ? Zo.OPEN : Zo.CLOSE;
		b(m, t) ? C(e ? "open_cover" : "close_cover") : k && L(e ? 100 : 0);
	}, B = T === 0 && !O, V = 1 - T / 100, te = B ? void 0 : {
		from: "#8FE3F4",
		to: "var(--lg-cover-accent-deep)",
		glow: "rgba(43,179,208,0.24)"
	}, ne = B ? void 0 : {
		color: "var(--lg-cover-badge)",
		bg: "rgba(43,179,208,0.18)",
		stroke: "rgba(43,179,208,0.3)"
	}, re = e.icon ?? w.icon ?? (E ? "mdi:curtains" : "mdi:blinds-horizontal"), [H, ie] = E ? D ? ["mdi:chevron-double-left", "mdi:chevron-double-right"] : ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"] : ["mdi:chevron-up", "mdi:chevron-down"], U = O ? `${a(O)} · ${T}% → ${O === "opening" ? 100 : 0}%` : m.state === "closed" || T === 0 ? `${a("is_closed")} · ${a("last_change", { t: l(m.last_changed) })}` : `${a("position")} ${T}% · ${a("stopped")}`, W = O ? `${a(O)}…` : a(B ? "is_closed" : "is_open"), G = g(t, m, a(O ? "moving" : B ? "closed" : "open"), O ?? (B ? "closed" : "open")), ae = B || !E && O === "opening" && T < 60, oe = !E && O === "opening" && T < 60 && !B, se = v.value ?? 50, ce = `${V * 100 / 2}%`;
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: "var(--lg-cover-accent)",
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X(Kr, {
						icon: re,
						style: te,
						onClick: S
					}),
					/* @__PURE__ */ X(qr, {
						name: x,
						state: U,
						onClick: S
					}),
					/* @__PURE__ */ X(Jr, {
						label: G,
						style: ne
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: "position-row",
				children: [/* @__PURE__ */ X("div", {
					ref: p,
					className: "track",
					role: "slider",
					tabIndex: k ? 0 : -1,
					"aria-label": `${x} ${a("position")}`,
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": T,
					"aria-disabled": !k,
					onPointerDown: F,
					onPointerMove: I,
					onPointerUp: ee,
					onPointerCancel: ee,
					onKeyDown: R,
					children: [E ? D ? /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("div", {
						className: "panel left",
						style: { width: `${V * 100}%` },
						children: [
							0,
							1,
							2
						].map((e) => /* @__PURE__ */ X("span", {}, e))
					}), /* @__PURE__ */ X("div", {
						className: "handle v",
						style: { left: `calc(${V * 100}% - 13px)` }
					})] }) : /* @__PURE__ */ X(K, { children: [
						/* @__PURE__ */ X("div", {
							className: "panel left",
							style: { width: ce },
							children: [
								0,
								1,
								2
							].map((e) => /* @__PURE__ */ X("span", {}, e))
						}),
						/* @__PURE__ */ X("div", {
							className: "panel right",
							style: { width: ce },
							children: [
								0,
								1,
								2
							].map((e) => /* @__PURE__ */ X("span", {}, e))
						}),
						/* @__PURE__ */ X("div", {
							className: "handle v",
							style: { left: `calc(${ce} - 13px)` }
						}),
						/* @__PURE__ */ X("div", {
							className: "handle v",
							style: { right: `calc(${ce} - 13px)` }
						})
					] }) : /* @__PURE__ */ X(K, { children: [/* @__PURE__ */ X("div", {
						className: "fabric",
						style: { height: `${V * 100}%` },
						children: [
							0,
							1,
							2,
							3,
							4
						].map((e) => /* @__PURE__ */ X("span", {}, e))
					}), T > 0 && /* @__PURE__ */ X("div", {
						className: "handle h",
						style: { top: `max(4px, calc(${V * 100}% - 13px))` }
					})] }), /* @__PURE__ */ X("div", {
						className: `overlay${E && !D ? " center" : ""}${D ? " right" : ""}${oe ? " top" : ""}`,
						style: ae ? {
							"--pv-color": "#0B3A46",
							"--pc-color": "rgba(11,58,70,0.7)"
						} : void 0,
						children: [/* @__PURE__ */ X("span", {
							className: "pv",
							children: [T, "%"]
						}), /* @__PURE__ */ X("span", {
							className: "pc",
							children: W
						})]
					})]
				}), /* @__PURE__ */ X("div", {
					className: "buttons",
					children: [
						/* @__PURE__ */ X("button", {
							className: `round-btn${O === "opening" ? " active" : ""}`,
							disabled: !A,
							onClick: () => z(!0),
							title: "Open",
							children: /* @__PURE__ */ X(Q, { icon: H })
						}),
						/* @__PURE__ */ X("button", {
							className: `round-btn stop${O ? " selected" : ""}`,
							disabled: !M,
							onClick: () => C("stop_cover"),
							title: "Stop",
							children: /* @__PURE__ */ X(Q, { icon: "mdi:square-outline" })
						}),
						/* @__PURE__ */ X("button", {
							className: `round-btn${O === "closing" ? " active" : ""}`,
							disabled: !j,
							onClick: () => z(!1),
							title: "Close",
							children: /* @__PURE__ */ X(Q, { icon: ie })
						})
					]
				})]
			}),
			N && /* @__PURE__ */ X("div", {
				className: "section tilt",
				children: [
					/* @__PURE__ */ X("div", {
						className: "label-row",
						children: [/* @__PURE__ */ X("span", {
							className: "label",
							children: a("tilt")
						}), /* @__PURE__ */ X("span", {
							className: "value",
							children: [Math.round(se / 100 * 180 - 90), "°"]
						})]
					}),
					/* @__PURE__ */ X(la, {
						value: se,
						min: 0,
						max: 100,
						step: 1,
						fillFrom: 50,
						showFill: !B,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("tilt"),
						onInput: v.setPreview,
						onChange: (e) => {
							v.commit(e), C("set_cover_tilt_position", { tilt_position: Math.round(e) });
						}
					}),
					/* @__PURE__ */ X("div", {
						className: "ticks",
						children: [
							/* @__PURE__ */ X("span", { children: "−90°" }),
							/* @__PURE__ */ X("span", { children: "0°" }),
							/* @__PURE__ */ X("span", { children: "90°" })
						]
					})
				]
			})
		]
	}) });
}
var ts = ki({
	tagName: "liquid-glass-cover-card",
	component: es,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		$o
	],
	getCardSize: () => 4,
	getGridOptions: () => Ui(5),
	getStubConfig: (e, t, n) => ({ entity: x(["cover"], e, t, n, (e) => !!((e.attributes.supported_features ?? 0) & Zo.SET_POSITION)) })
}), ns = {
	PAUSE: 1,
	SEEK: 2,
	VOLUME_SET: 4,
	PREVIOUS: 16,
	NEXT: 32,
	PLAY: 16384,
	SHUFFLE: 32768,
	REPEAT: 262144
};
function rs(e) {
	let t = Math.max(0, Math.round(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
var is = "\n  .card {\n    gap: 16px;\n  }\n  .device {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--lg-text-secondary);\n    --mdc-icon-size: 14px;\n    cursor: pointer;\n  }\n  .art {\n    flex: none;\n    width: var(--lg-art, 72px);\n    height: var(--lg-art, 72px);\n    border-radius: 20px;\n    overflow: hidden;\n    background: var(--lg-track-bg);\n    background-size: cover;\n    background-position: center;\n    box-shadow:\n      0 8px 20px rgba(0, 0, 0, 0.25),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.4);\n    display: grid;\n    place-items: center;\n    color: var(--lg-text-secondary);\n    --mdc-icon-size: 28px;\n  }\n  .art.idle {\n    box-shadow:\n      0 1px 1px var(--lg-glass-inner),\n      inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .title {\n    gap: 3px;\n  }\n  .source {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    font-size: 11px;\n    font-weight: 600;\n    color: var(--source-color);\n    --mdc-icon-size: 12px;\n  }\n  .source.muted-text {\n    color: var(--lg-text-secondary);\n  }\n  .media-control-glass {\n    flex: none;\n    border-radius: 50%;\n    overflow: hidden;\n    background: none;\n    box-shadow: none;\n  }\n  .media-control-glass[data-lg-static-lens=\"\"] {\n    background: rgba(255, 255, 255, 0.08);\n    -webkit-backdrop-filter: blur(5px);\n    backdrop-filter: blur(5px);\n    box-shadow:\n      0 5px 14px rgba(0, 0, 0, 0.22),\n      inset 1px 1px 0 rgba(255, 255, 255, 0.36),\n      inset -1px -1px 0 rgba(0, 0, 0, 0.14);\n  }\n  .more-glass {\n    width: 36px;\n    height: 36px;\n  }\n  .more {\n    width: 100%;\n    height: 100%;\n    border: 0;\n    border-radius: inherit;\n    padding: 0;\n    display: grid;\n    place-items: center;\n    background: transparent;\n    color: var(--lg-text-primary);\n    cursor: pointer;\n    --mdc-icon-size: 18px;\n    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));\n    transition: transform 120ms ease;\n  }\n  .more:active {\n    transform: scale(0.9);\n  }\n  .progress {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  /* Playback bars carry no accent of their own, so they fill in the text colour. */\n  .progress .lg-react-slider,\n  .volume .lg-react-slider {\n    --lg-slider-fill: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);\n    --fill-from: color-mix(in srgb, var(--lg-text-primary) 70%, transparent);\n    --fill-to: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);\n  }\n  /* The seek bar uses a compact instance of the same glass slider as volume. */\n  .progress .lg-react-slider {\n    --lg-slider-height: 14px;\n    --lg-slider-bar-height: 6px;\n    --lg-slider-knob-size: 18px;\n    --lg-slider-thumb-height: 26px;\n  }\n  .times {\n    display: flex;\n    justify-content: space-between;\n    font-family: var(--lg-font-ui);\n    font-size: 11px;\n    font-weight: 500;\n    letter-spacing: -0.2px;\n    color: var(--lg-text-secondary);\n    font-variant-numeric: tabular-nums;\n  }\n  .transport {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 0 8px;\n  }\n  .transport button {\n    border: 0;\n    background: transparent;\n    padding: 0;\n    color: var(--lg-text-primary);\n    cursor: pointer;\n    display: grid;\n    place-items: center;\n    transition: opacity 0.2s ease, transform 0.1s ease;\n  }\n  .transport button:active {\n    transform: scale(0.94);\n  }\n  .transport button:disabled {\n    opacity: 0.35;\n    cursor: default;\n  }\n  .transport .aux {\n    color: var(--lg-text-secondary);\n    --mdc-icon-size: var(--lg-aux, 20px);\n  }\n  .transport .aux.on {\n    color: var(--source-color);\n  }\n  .transport .skip {\n    --mdc-icon-size: var(--lg-skip, 32px);\n  }\n  .play-glass {\n    flex: none;\n    width: var(--lg-play, 68px);\n    height: var(--lg-play, 68px);\n    border-radius: 50%;\n    color: var(--lg-text-primary);\n  }\n  .play {\n    width: 100%;\n    height: 100%;\n    border-radius: inherit;\n    display: grid;\n    place-items: center;\n    cursor: pointer;\n    color: inherit;\n    --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);\n    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));\n  }\n  .play-glass.idle {\n    color: var(--lg-text-secondary);\n  }\n  .volume {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    color: var(--lg-text-secondary);\n    --mdc-icon-size: 20px;\n  }\n  .volume .lg-react-slider {\n    flex: 1;\n    --lg-slider-height: 26px;\n    --lg-slider-bar-height: 6px;\n    --lg-slider-knob-size: 20px;\n    --lg-slider-thumb-height: 30px;\n  }\n  .dim,\n  .fade {\n    opacity: 0.4;\n  }\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-art: clamp(48px, 19cqi, 72px);\n      --lg-play: clamp(48px, 18cqi, 68px);\n      --lg-skip: clamp(24px, 8.4cqi, 32px);\n      --lg-aux: clamp(17px, 5.3cqi, 20px);\n    }\n  }\n  @container (max-width: 250px) {\n    .transport {\n      padding: 0;\n    }\n  }\n";
function as(e, t) {
	let n = e.attributes, r = n.media_duration, i = n.media_position;
	if (r && i !== void 0) return t && n.media_position_updated_at && (i += (Date.now() - new Date(n.media_position_updated_at).getTime()) / 1e3), {
		pos: u(i, 0, r),
		duration: r
	};
}
function os({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), o = e.entity ? t?.states[e.entity] : void 0, c = h(t, o, e.name, e.entity ?? ""), l = () => f(n, e.entity), u = o?.state === "playing" || o?.state === "buffering";
	Po(n, 1e3, u);
	let d = o ? as(o, u) : void 0, p = Sa(d ? d.pos / d.duration : void 0, d ? Math.max(1 / d.duration, .005) : .005), m = Sa(o?.attributes.volume_level, .005);
	if (!o || y(o)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: c,
		label: a("unavailable"),
		onOpen: l
	}) });
	let _ = (n, r) => void t?.callService("media_player", n, {
		entity_id: e.entity,
		...r
	}), v = o.attributes, x = o.state === "paused", S = !u && !x, C = e.source_color ?? "#FF375F", w = S ? void 0 : v.entity_picture, T = S ? a("not_playing") : v.media_title ?? c, E = [v.media_artist, v.media_album_name].filter(Boolean), D = S ? g(t, o, a("standby")) : E.join(" — ") || (v.source ?? ""), O = v.app_name ?? v.source, k = d, A = p.value ?? 0, j = k ? A * k.duration : 0, M = k ? k.duration - j : 0, N = m.value ?? .5, P = !!v.shuffle, F = v.repeat ?? "off", I = b(o, ns.SEEK) && !!k && !S, L = e.show_volume !== !1 && b(o, ns.VOLUME_SET);
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: C,
		style: {
			display: "flex",
			position: "relative",
			"--source-color": C
		},
		children: [
			e.show_device !== !1 && /* @__PURE__ */ X("div", {
				className: "device",
				onClick: l,
				children: [/* @__PURE__ */ X(Q, { icon: "mdi:speaker" }), /* @__PURE__ */ X("span", { children: c })]
			}),
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X("div", {
						className: `art${w ? "" : " idle"}`,
						style: w ? { backgroundImage: `url("${w}")` } : void 0,
						onClick: l,
						children: !w && /* @__PURE__ */ X(Q, { icon: "mdi:music" })
					}),
					/* @__PURE__ */ X("div", {
						className: "title",
						onClick: l,
						children: [
							/* @__PURE__ */ X("div", {
								className: "name",
								children: T
							}),
							/* @__PURE__ */ X("div", {
								className: "state",
								children: D
							}),
							x ? /* @__PURE__ */ X("div", {
								className: "source muted-text",
								children: [/* @__PURE__ */ X(Q, { icon: "mdi:pause" }), /* @__PURE__ */ X("span", { children: g(t, o, a("paused")) })]
							}) : !S && O ? /* @__PURE__ */ X("div", {
								className: "source",
								children: [/* @__PURE__ */ X(Q, { icon: "mdi:waveform" }), /* @__PURE__ */ X("span", { children: O })]
							}) : null
						]
					}),
					/* @__PURE__ */ X(Ur, {
						className: "media-control-glass more-glass",
						refraction: i,
						frost: 5,
						children: /* @__PURE__ */ X("button", {
							className: "more",
							type: "button",
							onClick: l,
							title: "More",
							children: /* @__PURE__ */ X(Q, { icon: "mdi:dots-horizontal" })
						})
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: `progress${S ? " dim" : ""}`,
				children: [/* @__PURE__ */ X(la, {
					value: S ? .003 : A,
					min: 0,
					max: 1,
					step: 0,
					disabled: !I,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: T,
					onInput: p.setPreview,
					onChange: (e) => {
						p.commit(e), k && _("media_seek", { seek_position: Math.round(e * k.duration) });
					}
				}), /* @__PURE__ */ X("div", {
					className: "times",
					children: [/* @__PURE__ */ X("span", { children: k ? rs(j) : "0:00" }), /* @__PURE__ */ X("span", { children: ["−", k ? rs(M) : "0:00"] })]
				})]
			}),
			/* @__PURE__ */ X("div", {
				className: "transport",
				children: [
					/* @__PURE__ */ X("button", {
						className: `aux${P ? " on" : ""}${S ? " fade" : ""}`,
						disabled: !b(o, ns.SHUFFLE),
						onClick: () => _("shuffle_set", { shuffle: !P }),
						title: "Shuffle",
						children: /* @__PURE__ */ X(Q, { icon: "mdi:shuffle-variant" })
					}),
					/* @__PURE__ */ X("button", {
						className: `skip${S ? " fade" : ""}`,
						disabled: !b(o, ns.PREVIOUS),
						onClick: () => _("media_previous_track"),
						title: "Previous",
						children: /* @__PURE__ */ X(Q, { icon: "mdi:skip-previous-outline" })
					}),
					/* @__PURE__ */ X(Ur, {
						className: `media-control-glass play-glass${S ? " idle" : ""}`,
						refraction: i,
						frost: 5,
						children: /* @__PURE__ */ X("button", {
							className: "play",
							type: "button",
							title: "Play / Pause",
							onClick: () => {
								(!S || b(o, ns.PLAY)) && _("media_play_pause");
							},
							children: /* @__PURE__ */ X(Q, { icon: u ? "mdi:pause" : "mdi:play-outline" })
						})
					}),
					/* @__PURE__ */ X("button", {
						className: `skip${S ? " fade" : ""}`,
						disabled: !b(o, ns.NEXT),
						onClick: () => _("media_next_track"),
						title: "Next",
						children: /* @__PURE__ */ X(Q, { icon: "mdi:skip-next-outline" })
					}),
					/* @__PURE__ */ X("button", {
						className: `aux${F === "off" ? "" : " on"}${S ? " fade" : ""}`,
						disabled: !b(o, ns.REPEAT),
						onClick: () => _("repeat_set", { repeat: F === "off" ? "all" : F === "all" ? "one" : "off" }),
						title: "Repeat",
						children: /* @__PURE__ */ X(Q, { icon: F === "one" ? "mdi:repeat-once" : "mdi:repeat" })
					})
				]
			}),
			L && /* @__PURE__ */ X("div", {
				className: "volume",
				children: [
					/* @__PURE__ */ X(Q, { icon: "mdi:volume-low" }),
					/* @__PURE__ */ X(la, {
						value: N,
						min: 0,
						max: 1,
						step: .01,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("ed_show_volume"),
						onInput: m.setPreview,
						onChange: (e) => {
							m.commit(e), _("volume_set", { volume_level: Math.round(e * 100) / 100 });
						}
					}),
					/* @__PURE__ */ X(Q, { icon: "mdi:volume-high" })
				]
			})
		]
	}) });
}
var ss = ki({
	tagName: "liquid-glass-media-card",
	component: os,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		is
	],
	getCardSize: () => 4,
	getGridOptions: () => Ui(6),
	getStubConfig: (e, t, n) => ({ entity: x(["media_player"], e, t, n) })
}), cs = (e) => e !== null && e !== "" && Number.isFinite(Number(e)) ? Number(e) : void 0;
function ls(e, t) {
	let n = e.attributes, r = e.entity_id.split(".")[0], i;
	switch (r) {
		case "input_number":
		case "number":
			i = {
				min: cs(n.min) ?? 0,
				max: cs(n.max) ?? 100,
				step: cs(n.step) ?? 1,
				unit: n.unit_of_measurement ?? "",
				icon: "mdi:tune-variant",
				value: cs(e.state),
				call: (e) => [
					r,
					"set_value",
					{ value: e }
				]
			};
			break;
		case "fan":
			i = {
				min: 0,
				max: 100,
				step: cs(n.percentage_step) ?? 1,
				unit: "%",
				icon: "mdi:fan",
				value: e.state === "on" ? cs(n.percentage) ?? 0 : 0,
				call: (e) => [
					"fan",
					"set_percentage",
					{ percentage: Math.round(e) }
				]
			};
			break;
		case "light":
			i = {
				min: 0,
				max: 100,
				step: 1,
				unit: "%",
				icon: "mdi:lightbulb",
				value: e.state === "on" ? Math.round((cs(n.brightness) ?? 0) / 255 * 100) : 0,
				call: (e) => [
					"light",
					"turn_on",
					{ brightness_pct: Math.round(e) }
				]
			};
			break;
		case "media_player":
			i = {
				min: 0,
				max: 100,
				step: 1,
				unit: "%",
				icon: "mdi:volume-high",
				value: Math.round((cs(n.volume_level) ?? 0) * 100),
				call: (e) => [
					"media_player",
					"volume_set",
					{ volume_level: Math.round(e) / 100 }
				]
			};
			break;
		case "cover":
			i = {
				min: 0,
				max: 100,
				step: 1,
				unit: "%",
				icon: "mdi:blinds-horizontal",
				value: cs(n.current_position) ?? (e.state === "closed" ? 0 : 100),
				call: (e) => [
					"cover",
					"set_cover_position",
					{ position: Math.round(e) }
				]
			};
			break;
		case "valve":
			i = {
				min: 0,
				max: 100,
				step: 1,
				unit: "%",
				icon: "mdi:pipe-valve",
				value: cs(n.current_position) ?? (e.state === "closed" ? 0 : 100),
				call: (e) => [
					"valve",
					"set_valve_position",
					{ position: Math.round(e) }
				]
			};
			break;
		case "humidifier":
			i = {
				min: cs(n.min_humidity) ?? 0,
				max: cs(n.max_humidity) ?? 100,
				step: 1,
				unit: "%",
				icon: "mdi:air-humidifier",
				value: cs(n.humidity),
				call: (e) => [
					"humidifier",
					"set_humidity",
					{ humidity: Math.round(e) }
				]
			};
			break;
		case "water_heater":
			i = {
				min: cs(n.min_temp) ?? 30,
				max: cs(n.max_temp) ?? 60,
				step: cs(n.target_temp_step) ?? 1,
				unit: "°",
				icon: "mdi:water-boiler",
				value: cs(n.temperature),
				call: (e) => [
					"water_heater",
					"set_temperature",
					{ temperature: e }
				]
			};
			break;
		case "climate":
			i = {
				min: cs(n.min_temp) ?? 7,
				max: cs(n.max_temp) ?? 35,
				step: cs(n.target_temp_step) ?? .5,
				unit: "°",
				icon: "mdi:thermostat",
				value: cs(n.temperature),
				call: (e) => [
					"climate",
					"set_temperature",
					{ temperature: e }
				]
			};
			break;
		default: i = {
			min: 0,
			max: 100,
			step: 1,
			unit: n.unit_of_measurement ?? "",
			icon: "mdi:tune-variant",
			value: cs(e.state)
		};
	}
	let a = i.call;
	if (t.service) {
		let e = t.service.indexOf(".");
		a = e > 0 && e < t.service.length - 1 ? (n) => [
			t.service.slice(0, e),
			t.service.slice(e + 1),
			{ [t.service_key ?? "value"]: n }
		] : void 0;
	}
	return {
		min: t.min ?? i.min,
		max: t.max ?? i.max,
		step: t.step ?? i.step,
		unit: t.unit ?? i.unit,
		icon: t.icon ?? n.icon ?? i.icon,
		value: t.attribute ? cs(n[t.attribute]) : i.value,
		call: a
	};
}
var us = "\n  .card {\n    gap: 16px;\n    width: 100%;\n  }\n  .value {\n    flex: none;\n    display: flex;\n    align-items: flex-end;\n    gap: 2px;\n    font-family: var(--lg-font-ui);\n    font-weight: 600;\n    font-variant-numeric: tabular-nums;\n  }\n  .value .num {\n    font-size: var(--lg-sv, 28px);\n    line-height: 1.1;\n    letter-spacing: -1px;\n    color: var(--lg-text-primary);\n  }\n  .value .unit {\n    font-size: var(--lg-sv-unit, 15px);\n    line-height: 1.6;\n    letter-spacing: -0.2px;\n    color: var(--lg-text-secondary);\n  }\n  .value.zero .num { color: var(--lg-text-secondary); }\n  .track-wrap {\n    position: relative;\n    --lg-slider-height: var(--lg-track-h, 44px);\n    --lg-slider-bar-height: var(--lg-bar-h, 6px);\n    --lg-slider-knob-size: var(--lg-knob-size, 22px);\n    --lg-slider-fill: linear-gradient(90deg, var(--fill-from), var(--fill-to));\n  }\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-sv: clamp(20px, 7.4cqi, 28px);\n      --lg-sv-unit: clamp(11px, 3.9cqi, 15px);\n      --lg-track-h: clamp(34px, 11.6cqi, 44px);\n      --lg-bar-h: clamp(5px, 1.6cqi, 6px);\n      --lg-knob-size: clamp(18px, 5.8cqi, 22px);\n    }\n  }\n";
function ds(e, t) {
	return t === void 0 || e.value !== void 0 && Math.abs(e.value - t) <= Math.max(e.step / 2, 1);
}
function fs({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), [a, o] = q(), [c, l] = q(), d = Y(void 0), p = s(e.language ?? t?.locale?.language ?? t?.language), m = e.entity ? t?.states[e.entity] : void 0;
	J(() => () => window.clearTimeout(d.current), []);
	let g = m && !y(m) ? ls(m, e) : void 0, v = !g || ds(g, c);
	if (J(() => {
		c !== void 0 && v && (window.clearTimeout(d.current), l(void 0));
	}, [v, c]), !m || y(m) || !g) {
		let r = h(t, m, e.name, e.entity ?? "");
		return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
			className: "card",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: "var(--lg-slider-accent)",
			style: {
				display: "flex",
				position: "relative"
			},
			children: /* @__PURE__ */ X("div", {
				className: "header",
				children: [/* @__PURE__ */ X("div", {
					className: "icon-well idle",
					onClick: () => f(n, e.entity),
					role: "button",
					children: /* @__PURE__ */ X(Q, { icon: e.icon ?? "mdi:help-circle-outline" })
				}), /* @__PURE__ */ X("div", {
					className: "title",
					onClick: () => f(n, e.entity),
					children: [/* @__PURE__ */ X("div", {
						className: "name",
						children: r
					}), /* @__PURE__ */ X("div", {
						className: "state",
						children: p("unavailable")
					})]
				})]
			})
		}) });
	}
	let b = u(a ?? (v ? g.value : c) ?? g.min, g.min, g.max), x = g.min === 0 && b <= 0, S = e.decimals ?? +!Number.isInteger(g.step), C = e.accent, w = C ? T(C, .4) : "var(--lg-slider-accent-light)", O = C ? E(C, .3) : "var(--lg-slider-accent-deep)", k = C ? D(C, .3) : "rgba(94, 92, 230, 0.3)", A = C ? T(C, .55) : "var(--lg-slider-fill-light)", j = C ?? "var(--lg-slider-accent)", M = g.step > 0 ? Math.round((g.max - g.min) / g.step) : 0, N = e.subtitle === void 0 ? g.min === 0 && b <= 0 ? p("slider_off") : M >= 2 && M <= 12 ? p("slider_levels", {
		n: M,
		i: Math.round((b - g.min) / g.step)
	}) : p("slider_step", { s: `${_(t, g.step)}${g.unit}` }) : e.subtitle, P = typeof e.ticks == "number" ? u(Math.round(e.ticks), 0, 20) : e.ticks === !0 && M >= 2 && M <= 12 ? M : 0, F = (e) => _(t, e, S), I = (n) => {
		if (o(void 0), !g.call || !t) return;
		l(n), window.clearTimeout(d.current), d.current = window.setTimeout(() => l(void 0), 4e3);
		let [r, i, a] = g.call(n);
		t.callService(r, i, {
			entity_id: e.entity,
			...a
		});
	}, L = {
		display: "flex",
		position: "relative",
		"--fill-from": A,
		"--fill-to": j
	};
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: j,
		style: L,
		children: [
			/* @__PURE__ */ X("div", {
				className: "header",
				children: [
					/* @__PURE__ */ X("div", {
						className: `icon-well${x ? " idle" : ""}`,
						style: x ? void 0 : {
							"--well-from": w,
							"--well-to": O,
							"--well-glow": k
						},
						onClick: () => f(n, e.entity),
						role: "button",
						children: /* @__PURE__ */ X(Q, { icon: g.icon })
					}),
					/* @__PURE__ */ X("div", {
						className: "title",
						onClick: () => f(n, e.entity),
						children: [/* @__PURE__ */ X("div", {
							className: "name",
							children: h(t, m, e.name, e.entity ?? "")
						}), /* @__PURE__ */ X("div", {
							className: "state",
							children: N
						})]
					}),
					/* @__PURE__ */ X("div", {
						className: `value${x ? " zero" : ""}`,
						children: [/* @__PURE__ */ X("span", {
							className: "num",
							children: F(b)
						}), g.unit && /* @__PURE__ */ X("span", {
							className: "unit",
							children: g.unit
						})]
					})
				]
			}),
			/* @__PURE__ */ X("div", {
				className: "track-wrap",
				children: /* @__PURE__ */ X(la, {
					value: b,
					min: g.min,
					max: g.max,
					step: g.step,
					disabled: !g.call,
					refraction: i,
					scheme: r ? "dark" : "light",
					showFill: !x,
					ticks: P,
					label: h(t, m, e.name, e.entity ?? ""),
					onInput: o,
					onChange: I
				})
			}),
			e.show_range !== !1 && /* @__PURE__ */ X("div", {
				className: "ticks",
				children: [/* @__PURE__ */ X("span", { children: [F(g.min), g.unit] }), /* @__PURE__ */ X("span", { children: [F(g.max), g.unit] })]
			})
		]
	}) });
}
var ps = ki({
	tagName: "liquid-glass-slider-card",
	component: fs,
	styles: [
		ji,
		Xr,
		Hr,
		aa,
		us
	],
	getCardSize: () => 2,
	getGridOptions: (e) => Ui(e.show_range === !1 ? 2 : 3),
	getStubConfig: (e, t, r) => ({ entity: x(n, e, t, r) })
}), ms = 4e3, hs = "\n  .card {\n    gap: 14px;\n  }\n  .select-control {\n    width: 100%;\n  }\n  .select-control .lg-glass-segmented > button {\n    flex-direction: row;\n    padding: 0 8px;\n    font-size: var(--lg-select-label, 13px);\n    font-weight: 550;\n  }\n  .option-chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .option-chip {\n    position: relative;\n    isolation: isolate;\n    flex: 1 1 auto;\n    min-width: min(112px, 100%);\n    height: var(--lg-select-chip-h, 42px);\n    border-radius: 999px;\n    overflow: hidden;\n    color: var(--lg-text-secondary);\n    transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;\n  }\n  .option-chip.selected {\n    color: var(--lg-text-primary);\n    background: var(--lg-press-fill);\n    box-shadow:\n      inset 0 0 0 2px var(--lg-select-accent),\n      0 4px 14px var(--lg-select-glow);\n  }\n  .option-chip button {\n    width: 100%;\n    height: 100%;\n    min-width: 0;\n    padding: 0 15px;\n    border: 0;\n    border-radius: inherit;\n    background: transparent;\n    color: inherit;\n    font: inherit;\n    font-size: var(--lg-select-label, 13px);\n    font-weight: 600;\n    cursor: pointer;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .option-chip button:active {\n    transform: scale(0.97);\n  }\n  .option-chip button:focus-visible {\n    outline: 2px solid var(--lg-select-accent);\n    outline-offset: -3px;\n  }\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-select-label: clamp(11px, 3.4cqi, 13px);\n      --lg-select-chip-h: clamp(36px, 11cqi, 42px);\n    }\n  }\n";
function gs(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
}
function _s(e) {
	return e === "input_select" ? "mdi:form-select" : "mdi:form-dropdown";
}
function vs({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Ai(n, e, t), a = s(e.language ?? t?.locale?.language ?? t?.language), o = e.entity ? t?.states[e.entity] : void 0, [c, l] = q(), u = Y(void 0), d = e.entity?.split(".")[0] ?? "select", p = gs(o?.attributes.options), m = c !== void 0 && o?.state === c;
	J(() => () => window.clearTimeout(u.current), []), J(() => {
		m && (window.clearTimeout(u.current), u.current = window.setTimeout(() => l(void 0), 0));
	}, [m]);
	let _ = h(t, o, e.name, e.entity ?? "");
	if (!o || y(o) || p.length === 0) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon ?? _s(d),
		name: _,
		label: o && !y(o) ? a("select_no_options") : a("unavailable"),
		onOpen: () => f(n, e.entity)
	}) });
	let v = c && p.includes(c) ? c : o.state, b = (e) => g(t, o, e, e), x = e.accent, S = x ?? "var(--lg-slider-accent)", C = {
		from: x ? T(x, .42) : "var(--lg-slider-accent-light)",
		to: x ? E(x, .2) : "var(--lg-slider-accent)",
		glow: x ? D(x, .3) : "rgba(94, 92, 230, 0.3)"
	}, w = (n) => {
		t && e.entity && n !== v && (l(n), window.clearTimeout(u.current), u.current = window.setTimeout(() => l(void 0), ms), t.callService(d, "select_option", {
			entity_id: e.entity,
			option: n
		}));
	}, O = {
		display: "flex",
		position: "relative",
		"--lg-select-accent": S,
		"--lg-select-glow": x ? D(x, .25) : "rgba(94, 92, 230, 0.2)"
	};
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: S,
		style: O,
		children: [/* @__PURE__ */ X("div", {
			className: "header",
			children: [/* @__PURE__ */ X(Kr, {
				icon: e.icon ?? o.attributes.icon ?? _s(d),
				style: C,
				onClick: () => f(n, e.entity)
			}), /* @__PURE__ */ X(qr, {
				name: _,
				state: b(v),
				onClick: () => f(n, e.entity)
			})]
		}), e.style === "chips" ? /* @__PURE__ */ X("div", {
			className: "option-chips",
			role: "group",
			"aria-label": _,
			children: p.map((t) => {
				let n = t === v;
				return /* @__PURE__ */ X(Wr, {
					className: `option-chip${n ? " selected" : ""}`,
					refraction: i,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: S,
					style: { display: "flex" },
					children: /* @__PURE__ */ X("button", {
						type: "button",
						title: b(t),
						"aria-pressed": n,
						onClick: () => w(t),
						children: b(t)
					})
				}, t);
			})
		}) : /* @__PURE__ */ X("div", {
			className: "select-control",
			children: /* @__PURE__ */ X(Za, {
				items: p.map((e) => ({
					value: e,
					label: b(e)
				})),
				value: v,
				onValueChange: w,
				refraction: i,
				scheme: r ? "dark" : "light",
				selectedColor: S,
				ariaLabel: _
			})
		})]
	}) });
}
var ys = ki({
	tagName: "liquid-glass-select-card",
	component: vs,
	styles: [
		ji,
		Xr,
		Hr,
		Ya,
		hs
	],
	getCardSize: () => 2,
	getGridOptions: () => Ui(3),
	getStubConfig: (e, t, n) => ({ entity: x(r, e, t, n) })
}), bs = 1, xs = 2, Ss = 4, Cs = {
	"clear-night": {
		icon: "mdi:weather-night",
		color: "#9AB6FF"
	},
	cloudy: {
		icon: "mdi:weather-cloudy",
		color: "#A0AEC0"
	},
	exceptional: {
		icon: "mdi:alert-circle-outline",
		color: "#FF9F0A"
	},
	fog: {
		icon: "mdi:weather-fog",
		color: "#A0AEC0"
	},
	hail: {
		icon: "mdi:weather-hail",
		color: "#8FD6FF"
	},
	lightning: {
		icon: "mdi:weather-lightning",
		color: "#FFD60A"
	},
	"lightning-rainy": {
		icon: "mdi:weather-lightning-rainy",
		color: "#FFD60A"
	},
	partlycloudy: {
		icon: "mdi:weather-partly-cloudy",
		night: "mdi:weather-night-partly-cloudy",
		color: "#FFB340"
	},
	pouring: {
		icon: "mdi:weather-pouring",
		color: "#5AC8FA"
	},
	rainy: {
		icon: "mdi:weather-rainy",
		color: "#5AC8FA"
	},
	snowy: {
		icon: "mdi:weather-snowy",
		color: "#BFE3FF"
	},
	"snowy-rainy": {
		icon: "mdi:weather-snowy-rainy",
		color: "#8FD6FF"
	},
	sunny: {
		icon: "mdi:weather-sunny",
		color: "#FFB340"
	},
	windy: {
		icon: "mdi:weather-windy",
		color: "#A0AEC0"
	},
	"windy-variant": {
		icon: "mdi:weather-windy-variant",
		color: "#A0AEC0"
	}
}, ws = {
	icon: "mdi:weather-cloudy",
	color: "#A0AEC0"
}, Ts = 9e5, Es = "\n  .card {\n    gap: 16px;\n  }\n\n  /* Current conditions */\n  .current {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 12px;\n  }\n  .now {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n    cursor: pointer;\n  }\n  .city {\n    font-size: var(--lg-name);\n    font-weight: 600;\n    color: var(--lg-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .condition {\n    font-size: var(--lg-state);\n    color: var(--lg-text-secondary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .temp-row {\n    display: flex;\n    align-items: flex-start;\n    gap: 2px;\n    font-family: var(--lg-font-ui);\n    font-weight: 600;\n    font-variant-numeric: tabular-nums;\n  }\n  .temp-row .temp {\n    font-size: var(--lg-wx-temp, 52px);\n    line-height: 1.05;\n    letter-spacing: -2px;\n    color: var(--lg-text-primary);\n  }\n  .temp-row .deg {\n    font-size: var(--lg-wx-deg, 26px);\n    line-height: 1.2;\n    letter-spacing: -0.2px;\n    color: var(--lg-text-secondary);\n  }\n  .hilo {\n    display: flex;\n    gap: 10px;\n    font-size: var(--lg-label);\n    letter-spacing: -0.2px;\n  }\n  .hilo .hi {\n    font-weight: 600;\n    color: var(--lg-text-primary);\n  }\n  .hilo .lo {\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n  .big-icon {\n    flex: none;\n    display: grid;\n    place-items: center;\n    width: var(--lg-wx-icon-box, 110px);\n    height: var(--lg-wx-icon-box, 110px);\n  }\n  .big-icon lg-icon {\n    --mdc-icon-size: var(--lg-wx-icon, 96px);\n    width: var(--lg-wx-icon, 96px);\n    height: var(--lg-wx-icon, 96px);\n    color: var(--wx-color);\n    filter: drop-shadow(0 6px 20px var(--wx-glow));\n  }\n\n  /* Hourly strip */\n  .hourly {\n    display: flex;\n    justify-content: space-between;\n    gap: 2px;\n    padding: 12px 10px;\n    border-radius: 20px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .hour {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 0;\n    border-radius: 14px;\n  }\n  .hour.now {\n    background: var(--lg-segment-selected);\n  }\n  .hour .time {\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n    white-space: nowrap;\n  }\n  .hour.now .time {\n    font-weight: 600;\n    color: var(--lg-text-primary);\n  }\n  .hour lg-icon {\n    --mdc-icon-size: var(--lg-wx-hour-icon, 22px);\n    width: var(--lg-wx-hour-icon, 22px);\n    height: var(--lg-wx-hour-icon, 22px);\n    color: var(--wx-color);\n  }\n  .hour .t {\n    font-family: var(--lg-font-ui);\n    font-size: var(--lg-label);\n    font-weight: 600;\n    letter-spacing: -0.2px;\n    color: var(--lg-text-primary);\n    font-variant-numeric: tabular-nums;\n  }\n\n  /* Daily rows */\n  .daily {\n    display: flex;\n    flex-direction: column;\n  }\n  .day {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    height: 44px;\n  }\n  .day .label {\n    flex: none;\n    width: var(--lg-wx-day, 44px);\n    font-size: var(--lg-name-sm, 14px);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .day.today .label {\n    font-weight: 600;\n    color: var(--lg-text-primary);\n  }\n  .day lg-icon {\n    flex: none;\n    --mdc-icon-size: var(--lg-wx-hour-icon, 22px);\n    width: var(--lg-wx-hour-icon, 22px);\n    height: var(--lg-wx-hour-icon, 22px);\n    color: var(--wx-color);\n  }\n  .day .lo,\n  .day .hi {\n    flex: none;\n    width: var(--lg-wx-temp-col, 30px);\n    text-align: right;\n    font-family: var(--lg-font-ui);\n    font-size: var(--lg-label);\n    letter-spacing: -0.2px;\n    font-variant-numeric: tabular-nums;\n  }\n  .day .lo {\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n  .day .hi {\n    font-weight: 600;\n    color: var(--lg-text-primary);\n  }\n  /* Every bar shares one scale, so a day's segment shows where it sits in the week. */\n  .bar {\n    position: relative;\n    flex: 1;\n    min-width: 0;\n    height: 6px;\n    border-radius: 3px;\n    background: var(--lg-track-bg);\n    overflow: hidden;\n  }\n  .bar span {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    border-radius: 3px;\n    background: linear-gradient(90deg, #5ac8fa, #ffd60a 55%, #ff9f0a);\n  }\n\n  /* Metric tiles */\n  .metrics {\n    display: flex;\n    gap: 8px;\n  }\n  .metric {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 3px;\n    padding: 10px 12px;\n    border-radius: 18px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .metric .head {\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    min-width: 0;\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n  .metric .head span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .metric lg-icon {\n    flex: none;\n    --mdc-icon-size: 14px;\n    width: 14px;\n    height: 14px;\n  }\n  .metric .v {\n    font-family: var(--lg-font-ui);\n    font-size: var(--lg-wx-metric, 15px);\n    font-weight: 600;\n    letter-spacing: -0.2px;\n    color: var(--lg-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  /*\n   * Row layout: the icon shrinks to the size of a card's icon well and the reading\n   * moves to the trailing edge, which puts the card at a switch card's height.\n   */\n  .card.row .big-icon {\n    width: var(--lg-well);\n    height: var(--lg-well);\n  }\n  .card.row .big-icon lg-icon {\n    --mdc-icon-size: var(--lg-well);\n    width: var(--lg-well);\n    height: var(--lg-well);\n    filter: drop-shadow(0 3px 10px var(--wx-glow));\n  }\n  .card.row .temp-row {\n    flex: none;\n  }\n  .card.row .temp-row .temp {\n    font-size: var(--lg-wx-row-temp, 28px);\n    line-height: 1.1;\n    letter-spacing: -1px;\n  }\n  .card.row .temp-row .deg {\n    font-size: var(--lg-wx-row-deg, 15px);\n    line-height: 1.6;\n  }\n\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-wx-row-temp: clamp(20px, 7.4cqi, 28px);\n      --lg-wx-row-deg: clamp(11px, 3.9cqi, 15px);\n      --lg-wx-temp: clamp(34px, 13.7cqi, 52px);\n      --lg-wx-deg: clamp(17px, 6.8cqi, 26px);\n      --lg-wx-icon-box: clamp(64px, 29cqi, 110px);\n      --lg-wx-icon: clamp(54px, 25cqi, 96px);\n      --lg-wx-hour-icon: clamp(17px, 5.8cqi, 22px);\n      --lg-wx-day: clamp(32px, 11.6cqi, 44px);\n      --lg-wx-temp-col: clamp(24px, 7.9cqi, 30px);\n      --lg-wx-metric: clamp(12px, 3.9cqi, 15px);\n      --lg-name-sm: clamp(11.5px, 3.7cqi, 14px);\n    }\n  }\n  /* Three tiles side by side stop being readable long before the card does. */\n  @container (max-width: 300px) {\n    .metrics {\n      flex-wrap: wrap;\n    }\n    .metric {\n      flex-basis: calc(50% - 4px);\n    }\n  }\n  @container (max-width: 250px) {\n    .day {\n      gap: 8px;\n    }\n    .hourly {\n      padding: 10px 6px;\n    }\n  }\n";
async function Ds(e, t, n) {
	try {
		return ((await e.callService("weather", "get_forecasts", { type: n }, { entity_id: t }, !1, !0))?.response ?? {})[t]?.forecast ?? [];
	} catch {
		return e.states[t]?.attributes.forecast ?? [];
	}
}
function Os(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.datetime.slice(0, 10), r = t.get(e) ?? [];
		r.push(n), t.set(e, r);
	}
	return [...t.values()].map((e) => {
		let t = e.flatMap((e) => [e.temperature, e.templow].filter((e) => e !== void 0)), n = e.find((e) => e.is_daytime) ?? e[0], r = e.map((e) => e.precipitation_probability).filter((e) => e !== void 0), i = e.map((e) => e.precipitation).filter((e) => e !== void 0);
		return {
			...n,
			temperature: t.length ? Math.max(...t) : void 0,
			templow: t.length ? Math.min(...t) : void 0,
			precipitation_probability: r.length ? Math.max(...r) : void 0,
			precipitation: i.length ? i.reduce((e, t) => e + t, 0) : void 0
		};
	});
}
function ks({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = e.language ?? t?.locale?.language ?? t?.language ?? "en", a = s(e.language ?? t?.locale?.language ?? t?.language), [o, c] = q([]), [l, d] = q([]), p = e.entity ? t?.states[e.entity] : void 0, m = h(t, p, e.name, e.entity ?? ""), v = e.layout === "row", b = () => f(n, e.entity), x = !!(t && e.entity), S = Po(n, Ts, x), C = p?.attributes.supported_features, w = typeof C == "number", T = !w || C & bs ? "daily" : C & Ss ? "twice_daily" : void 0, E = !w || !!(C & xs);
	if (J(() => {
		if (!t || !e.entity) return;
		let n = !1, r = e.entity;
		return T && Ds(t, r, T).then((e) => {
			n || c(T === "twice_daily" ? Os(e) : e);
		}), !v && e.show_hourly !== !1 && E && Ds(t, r, "hourly").then((e) => {
			n || d(e);
		}), () => {
			n = !0;
		};
	}, [
		x,
		e.entity,
		e.show_hourly,
		T,
		v,
		S,
		E
	]), !p || y(p)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: m,
		label: a("unavailable"),
		onOpen: b
	}) });
	let O = t?.states["sun.sun"], k = O ? O.state === "below_horizon" : p.state === "clear-night", A = (e) => {
		let t = Cs[e ?? ""] ?? ws;
		return k && t.night ? {
			...t,
			icon: t.night,
			color: "#9AB6FF"
		} : t;
	}, j = (e) => e ? g(t, p, a(`wx_${e}`), e) : "", M = (e) => e === void 0 ? "–" : `${_(t, e, 0)}°`, N = (e, t) => {
		try {
			return new Intl.DateTimeFormat(i, t).format(new Date(e));
		} catch {
			return "";
		}
	}, P = p.attributes, F = A(p.state), I = o[0], L = /* @__PURE__ */ X("div", {
		className: "big-icon",
		style: {
			"--wx-color": F.color,
			"--wx-glow": D(F.color, .4)
		},
		children: /* @__PURE__ */ X(Q, { icon: e.icon ?? F.icon })
	}), ee = /* @__PURE__ */ X("div", {
		className: "temp-row",
		children: [/* @__PURE__ */ X("span", {
			className: "temp",
			children: _(t, P.temperature ?? 0, 0)
		}), /* @__PURE__ */ X("span", {
			className: "deg",
			children: "°"
		})]
	});
	if (v) {
		let t = [j(p.state)];
		return I?.temperature !== void 0 && t.push(`${a("wx_high")} ${M(I.temperature)}`), I?.templow !== void 0 && t.push(`${a("wx_low")} ${M(I.templow)}`), /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
			className: "card row",
			refraction: r,
			variant: e.glass_variant,
			sourceAccent: F.color,
			style: {
				display: "flex",
				position: "relative"
			},
			children: [
				L,
				/* @__PURE__ */ X(qr, {
					name: m,
					state: t.filter(Boolean).join(" · "),
					onClick: b
				}),
				ee
			]
		}) });
	}
	let R = e.show_hourly === !1 ? [] : l.slice(0, u(e.hourly_count ?? 6, 2, 12)), z = e.show_daily === !1 ? [] : o.slice(0, u(e.daily_count ?? 4, 1, 10)), B = z.map((e) => e.templow ?? e.temperature).filter((e) => e !== void 0), V = z.map((e) => e.temperature).filter((e) => e !== void 0), te = Math.min(...B, ...V), ne = Math.max(...B, ...V) - te || 1, re = P.humidity, H = P.wind_speed, ie = P.wind_speed_unit ?? "", U = l[0]?.precipitation_probability ?? o[0]?.precipitation_probability, W = l[0]?.precipitation ?? o[0]?.precipitation, G = [];
	return re !== void 0 && G.push([
		"mdi:water-percent",
		a("humidity"),
		`${_(t, re, 0)}%`
	]), H !== void 0 && G.push([
		"mdi:weather-windy",
		a("wx_wind"),
		`${_(t, H, 1)} ${ie}`.trim()
	]), U === void 0 ? W !== void 0 && G.push([
		"mdi:weather-rainy",
		a("wx_precip"),
		`${_(t, W, 1)} mm`
	]) : G.push([
		"mdi:weather-rainy",
		a("wx_precip"),
		`${_(t, U, 0)}%`
	]), /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: F.color,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ X("div", {
				className: "current",
				children: [/* @__PURE__ */ X("div", {
					className: "now",
					onClick: b,
					children: [
						/* @__PURE__ */ X("div", {
							className: "city",
							children: m
						}),
						/* @__PURE__ */ X("div", {
							className: "condition",
							children: j(p.state)
						}),
						ee,
						(I?.temperature !== void 0 || I?.templow !== void 0) && /* @__PURE__ */ X("div", {
							className: "hilo",
							children: [I?.temperature !== void 0 && /* @__PURE__ */ X("span", {
								className: "hi",
								children: [
									a("wx_high"),
									" ",
									M(I.temperature)
								]
							}), I?.templow !== void 0 && /* @__PURE__ */ X("span", {
								className: "lo",
								children: [
									a("wx_low"),
									" ",
									M(I.templow)
								]
							})]
						})
					]
				}), L]
			}),
			R.length > 0 && /* @__PURE__ */ X("div", {
				className: "hourly",
				children: R.map((e, t) => {
					let n = A(e.condition);
					return /* @__PURE__ */ X("div", {
						className: `hour${t === 0 ? " now" : ""}`,
						style: { "--wx-color": n.color },
						children: [
							/* @__PURE__ */ X("span", {
								className: "time",
								children: t === 0 ? a("wx_now") : N(e.datetime, { hour: "numeric" })
							}),
							/* @__PURE__ */ X(Q, { icon: n.icon }),
							/* @__PURE__ */ X("span", {
								className: "t",
								children: M(e.temperature)
							})
						]
					}, e.datetime);
				})
			}),
			z.length > 0 && /* @__PURE__ */ X("div", {
				className: "daily",
				children: z.map((e, t) => {
					let n = A(e.condition), r = e.templow ?? e.temperature, i = e.temperature, o = r === void 0 ? 0 : (r - te) / ne * 100, s = r === void 0 || i === void 0 ? 100 : Math.max((i - r) / ne * 100, 6), c = t === 0 ? a("wx_today") : t === 1 ? a("wx_tomorrow") : N(e.datetime, { weekday: "short" });
					return /* @__PURE__ */ X("div", {
						className: `day${t === 0 ? " today" : ""}`,
						style: { "--wx-color": n.color },
						children: [
							/* @__PURE__ */ X("span", {
								className: "label",
								children: c
							}),
							/* @__PURE__ */ X(Q, { icon: n.icon }),
							/* @__PURE__ */ X("span", {
								className: "lo",
								children: M(r)
							}),
							/* @__PURE__ */ X("div", {
								className: "bar",
								children: /* @__PURE__ */ X("span", { style: {
									left: `${o}%`,
									width: `${s}%`
								} })
							}),
							/* @__PURE__ */ X("span", {
								className: "hi",
								children: M(i)
							})
						]
					}, e.datetime);
				})
			}),
			e.show_metrics !== !1 && G.length > 0 && /* @__PURE__ */ X("div", {
				className: "metrics",
				children: G.map(([e, t, n]) => /* @__PURE__ */ X("div", {
					className: "metric",
					children: [/* @__PURE__ */ X("div", {
						className: "head",
						children: [/* @__PURE__ */ X(Q, { icon: e }), /* @__PURE__ */ X("span", { children: t })]
					}), /* @__PURE__ */ X("div", {
						className: "v",
						children: n
					})]
				}, t))
			})
		]
	}) });
}
var As = ki({
	tagName: "liquid-glass-weather-card",
	component: ks,
	styles: [
		ji,
		Xr,
		Hr,
		Es
	],
	getCardSize: (e) => {
		if (e.layout === "row") return 1;
		let t = 3;
		return e.show_hourly !== !1 && (t += 1), e.show_daily !== !1 && (t += 2), e.show_metrics !== !1 && (t += 1), t;
	},
	getGridOptions: (e) => {
		if (e.layout === "row") return Hi();
		let t = 3;
		return e.show_hourly !== !1 && (t += 1), e.show_daily !== !1 && (t += Math.ceil(u(e.daily_count ?? 4, 1, 10) * 44 / 64)), e.show_metrics !== !1 && (t += 1), Ui(t, 12);
	},
	getStubConfig: (e, t, n) => ({ entity: x(["weather"], e, t, n) })
}), js = [
	{
		from: "#FFD36B",
		to: "#FF8A1F"
	},
	{
		from: "#9E9CFF",
		to: "#5E5CE6"
	},
	{
		from: "#FF9BC2",
		to: "#E0417F"
	},
	{
		from: "#8FE3F4",
		to: "#0A7EA4"
	},
	{
		from: "#7EE8A0",
		to: "#1E9E4A"
	},
	{
		from: "#FFB39B",
		to: "#E05A2B"
	}
];
function Ms(e, t) {
	let n = e ? {
		from: T(e, .45),
		to: e
	} : t;
	return {
		...n,
		glow: D(n.to, .3)
	};
}
var Ns = {
	scene: {
		service: "scene.turn_on",
		icon: "mdi:palette",
		well: js[0],
		label: "btn_scene"
	},
	script: {
		service: "script.turn_on",
		icon: "mdi:script-text-play",
		well: js[1],
		label: "btn_script"
	},
	automation: {
		service: "automation.trigger",
		icon: "mdi:robot",
		well: js[3],
		label: "btn_automation"
	},
	button: {
		service: "button.press",
		icon: "mdi:gesture-tap-button",
		well: js[3],
		label: "btn_button"
	},
	input_button: {
		service: "input_button.press",
		icon: "mdi:gesture-tap-button",
		well: js[3],
		label: "btn_button"
	}
}, Ps = 2600, Fs = "\n  .card {\n    cursor: pointer;\n    user-select: none;\n    -webkit-user-select: none;\n  }\n  .card:focus-visible {\n    outline: 2px solid var(--lg-slider-accent);\n    outline-offset: 2px;\n  }\n  .title {\n    cursor: inherit;\n  }\n  .action {\n    flex: none;\n    width: 36px;\n    height: 36px;\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    --mdc-icon-size: 16px;\n    transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;\n  }\n  .action.done {\n    background: rgba(48, 209, 88, 0.18);\n    box-shadow: inset 0 0 0 1px rgba(48, 209, 88, 0.3);\n    color: var(--lg-lock-locked-deep);\n  }\n  .card:active .action {\n    background: var(--lg-segment-selected);\n  }\n";
function Is(e) {
	return e.attributes.last_triggered || (Number.isNaN(Date.parse(e.state)) ? void 0 : e.state);
}
function Ls(e, t, n, r, i) {
	if (t.subtitle !== void 0) return t.subtitle;
	if (r) return `${i("btn_done")} · ${i("just_now")}`;
	let a = Ns[n], o = a ? i(a.label) : n, s = Is(e);
	if (!s) return o;
	let u = Date.now() - new Date(s).getTime() < 432e5 ? c(s, i) : l(s);
	return `${o} · ${i("last")} ${u}`;
}
function Rs({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), [a, o] = q(!1), c = Y(void 0), l = e.entity ? t?.states[e.entity] : void 0, u = h(t, l, e.name, e.entity ?? "");
	if (J(() => () => window.clearTimeout(c.current), []), !l || y(l)) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: u,
		label: i("unavailable"),
		onOpen: () => f(n, e.entity)
	}) });
	let d = e.entity?.split(".")[0] ?? "", p = Ns[d], m = Ms(e.accent, p?.well ?? js[0]), g = e.icon ?? l.attributes.icon ?? p?.icon ?? "mdi:gesture-tap-button", _ = () => {
		v(t, e.service ?? p?.service, {
			entity_id: e.entity,
			...e.service_data ?? {}
		}) && (o(!0), window.clearTimeout(c.current), c.current = window.setTimeout(() => o(!1), Ps));
	};
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: "card row",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: m.to,
		style: {
			display: "flex",
			position: "relative"
		},
		role: "button",
		tabIndex: 0,
		"aria-label": u,
		onClick: _,
		onKeyDown: (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), _());
		},
		children: [
			/* @__PURE__ */ X(Kr, {
				icon: g,
				style: m
			}),
			/* @__PURE__ */ X(qr, {
				name: u,
				state: Ls(l, e, d, a, i)
			}),
			/* @__PURE__ */ X("div", {
				className: `action${a ? " done" : ""}`,
				children: /* @__PURE__ */ X(Q, { icon: a ? "mdi:check" : "mdi:play" })
			})
		]
	}) });
}
var zs = ki({
	tagName: "liquid-glass-button-card",
	component: Rs,
	styles: [
		ji,
		Xr,
		Hr,
		Fs
	],
	getCardSize: () => 1,
	getGridOptions: () => Hi(),
	getStubConfig: (t, n, r) => ({ entity: x(e, t, n, r) })
}), Bs = 900, Vs = "\n  .card {\n    gap: 14px;\n  }\n  .head {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 8px;\n  }\n  .head .heading {\n    font-size: var(--lg-scene-title, 15px);\n    font-weight: 600;\n    color: var(--lg-text-primary);\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .head .count {\n    flex: none;\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n  /* The chips row variant labels itself quietly rather than as a heading. */\n  .card.chips .head .heading {\n    font-size: var(--lg-label);\n    color: var(--lg-text-secondary);\n  }\n\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));\n    gap: 10px;\n  }\n  .card.chips .grid {\n    gap: 8px;\n  }\n\n  button {\n    border: 0;\n    font: inherit;\n    cursor: pointer;\n    color: var(--lg-text-primary);\n    min-width: 0;\n    transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.1s ease;\n  }\n  .tile {\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .tile:active,\n  .chip:active {\n    transform: scale(0.97);\n  }\n  .tile.on,\n  .chip.on {\n    background: var(--lg-press-fill);\n    color: var(--lg-press-label);\n    box-shadow:\n      inset 0 0 0 2px var(--lg-press-stroke),\n      0 0 0 3px var(--lg-press-glow),\n      0 6px 16px var(--lg-press-glow);\n  }\n\n  .tile {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n    padding: 14px 10px;\n    border-radius: 20px;\n  }\n  .tile .well {\n    width: var(--lg-scene-well, 40px);\n    height: var(--lg-scene-well, 40px);\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    color: #fff;\n    background: linear-gradient(180deg, var(--from), var(--to));\n    box-shadow:\n      0 4px 12px var(--glow),\n      0 1px 1px rgba(255, 255, 255, 0.7),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.5);\n    --mdc-icon-size: calc(var(--lg-scene-well, 40px) * 0.5);\n  }\n  .tile.on .well {\n    box-shadow:\n      0 4px 16px var(--glow-strong),\n      0 1px 1px rgba(255, 255, 255, 0.7),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.5);\n  }\n  .tile .label {\n    font-size: var(--lg-scene-label, 12px);\n    font-weight: 600;\n    max-width: 100%;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  /* A chip is its own small glass surface, with the button filling it. */\n  .chip {\n    position: relative;\n    isolation: isolate;\n    height: var(--lg-chip-h, 42px);\n    border-radius: 999px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    overflow: hidden;\n  }\n  .chip-button {\n    width: 100%;\n    height: 100%;\n    padding: 0 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 6px;\n    background: transparent;\n    color: inherit;\n    font-size: var(--lg-chip-label, 13px);\n    font-weight: 600;\n  }\n  .chip-button span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .chip-button lg-icon {\n    flex: none;\n    --mdc-icon-size: 15px;\n    width: 15px;\n    height: 15px;\n  }\n\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-scene-title: clamp(12.5px, 3.9cqi, 15px);\n      --lg-scene-well: clamp(30px, 10.5cqi, 40px);\n      --lg-scene-label: clamp(10px, 3.2cqi, 12px);\n      --lg-chip-h: clamp(34px, 11cqi, 42px);\n      --lg-chip-label: clamp(11px, 3.4cqi, 13px);\n    }\n  }\n";
function Hs({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), [a, o] = q(), c = Y(void 0), l = e.scenes ?? [], d = u(Math.round(e.columns ?? 3), 1, 6), f = e.style === "chips";
	if (J(() => () => window.clearTimeout(c.current), []), !l.length) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: e.title ?? h(t, void 0, e.name, ""),
		label: i("unavailable")
	}) });
	let p = (e) => h(t, e.entity ? t?.states[e.entity] : void 0, e.name, e.entity ?? ""), m = (e) => e.icon ? e.icon : (e.entity ? t?.states[e.entity] : void 0)?.attributes.icon ?? Ns[e.entity?.split(".")[0] ?? ""]?.icon ?? "mdi:palette", g = (e, n) => {
		v(t, e.service ?? Ns[e.entity?.split(".")[0] ?? ""]?.service, {
			...e.entity ? { entity_id: e.entity } : {},
			...e.service_data ?? {}
		}), o(n), window.clearTimeout(c.current), c.current = window.setTimeout(() => o(void 0), Bs);
	};
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: `card${f ? " chips" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: Ms(e.scenes?.[0]?.accent, js[0]).to,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [(e.title || e.show_count) && /* @__PURE__ */ X("div", {
			className: "head",
			children: [/* @__PURE__ */ X("span", {
				className: "heading",
				children: e.title ?? ""
			}), e.show_count && /* @__PURE__ */ X("span", {
				className: "count",
				children: i("scene_count", { n: l.length })
			})]
		}), /* @__PURE__ */ X("div", {
			className: "grid",
			style: { "--cols": String(d) },
			children: l.map((t, n) => {
				let i = a === n;
				if (f) return /* @__PURE__ */ X(Wr, {
					className: `chip${i ? " on" : ""}`,
					refraction: r,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: "var(--lg-accent)",
					style: { display: "flex" },
					children: /* @__PURE__ */ X("button", {
						className: "chip-button",
						onClick: () => g(t, n),
						children: [t.icon && /* @__PURE__ */ X(Q, { icon: t.icon }), /* @__PURE__ */ X("span", { children: p(t) })]
					})
				}, `${t.entity ?? t.service ?? ""}:${n}`);
				let o = Ms(t.accent, js[n % js.length]);
				return /* @__PURE__ */ X("button", {
					className: `tile${i ? " on" : ""}`,
					style: {
						"--from": o.from,
						"--to": o.to,
						"--glow": o.glow,
						"--glow-strong": D(o.to, .6)
					},
					onClick: () => g(t, n),
					children: [/* @__PURE__ */ X("span", {
						className: "well",
						children: /* @__PURE__ */ X(Q, { icon: m(t) })
					}), /* @__PURE__ */ X("span", {
						className: "label",
						children: p(t)
					})]
				}, `${t.entity ?? t.service ?? ""}:${n}`);
			})
		})]
	}) });
}
var Us = ki({
	tagName: "liquid-glass-scene-card",
	component: Hs,
	styles: [
		ji,
		Xr,
		Hr,
		Vs
	],
	getCardSize: (e) => {
		let t = u(Math.round(e.columns ?? 3), 1, 6);
		return 1 + Math.ceil((e.scenes?.length ?? 0) / t) * (e.style === "chips" ? 1 : 2);
	},
	getGridOptions: (e) => {
		let t = u(Math.round(e.columns ?? 3), 1, 6);
		return Ui(1 + Math.ceil((e.scenes?.length ?? 0) / t) * (e.style === "chips" ? 1 : 2), 12);
	},
	getStubConfig: (e, t, n) => ({ scenes: ([
		t,
		n,
		Object.keys(e?.states ?? {})
	].find((e) => e?.some((e) => e.startsWith("scene.")))?.filter((e) => e.startsWith("scene.")).slice(0, 6) ?? ["scene.example"]).map((e) => ({ entity: e })) })
}), Ws = 10, Gs = 32, Ks = 34, qs = 8;
function Js(e, t, n) {
	return e.tick === n && t !== void 0 == (e.url !== void 0) ? e : t === void 0 ? {
		tick: n,
		url: void 0
	} : {
		tick: n,
		url: `${t}${t.includes("?") ? "&" : "?"}_=${n}`
	};
}
function Ys(e, t = document.createElement("canvas")) {
	let n;
	return (r) => {
		let i = r.canvas.width, a = r.canvas.height;
		if (!i || !a) return;
		let { image: o, generation: s } = e();
		if ((!n || n.generation !== s || n.width !== i || n.height !== a) && o && o.naturalWidth && o.naturalHeight) {
			t.width = i, t.height = a;
			let e = t.getContext("2d");
			if (!e) return;
			let r = Math.max(i / o.naturalWidth, a / o.naturalHeight), c = i / r, l = a / r;
			e.drawImage(o, (o.naturalWidth - c) / 2, (o.naturalHeight - l) / 2, c, l, 0, 0, i, a), n = {
				generation: s,
				width: i,
				height: a
			};
		}
		n && r.drawImage(t, 0, 0, i, a);
	};
}
var Xs = "\n  .card {\n    padding: 0;\n    gap: 0;\n  }\n  .feed {\n    position: relative;\n    width: 100%;\n    aspect-ratio: var(--lg-cam-ratio, 16 / 9);\n    overflow: hidden;\n    background: #0e1014;\n  }\n  /*\n   * The still is an element rather than a CSS background so the lens can reuse the\n   * very same decode. A background image is fetched in no-cors mode, which cannot\n   * share a cache entry with the cors-mode load a canvas needs — the camera would be\n   * pulled twice per refresh.\n   */\n  .still {\n    position: absolute;\n    inset: 0;\n    display: block;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n  /*\n   * Camera refreshes are double-buffered. Keep the decoded frame visible while\n   * the other image element fetches the next one; swapping the visible source\n   * element exposes an empty frame to both the browser and the WebGL lens.\n   */\n  .still.staging {\n    visibility: hidden;\n  }\n  /* Darkens the top and bottom just enough for white text to hold up. */\n  .scrim {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0.6) 0%,\n      rgba(0, 0, 0, 0) 42%,\n      rgba(0, 0, 0, 0) 62%,\n      rgba(0, 0, 0, 0.65) 100%\n    );\n    pointer-events: none;\n  }\n  .bar {\n    position: absolute;\n    left: 0;\n    right: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    padding: 0 14px;\n    height: 56px;\n  }\n  .bar.top {\n    top: 0;\n  }\n  .bar.bottom {\n    bottom: 0;\n  }\n  .trail {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n\n  /* Display-only badges retain their lightweight translucent treatment. */\n  .float {\n    position: relative;\n    overflow: hidden;\n    border: 0;\n    padding: 0;\n    color: #fff;\n    background: rgba(11, 11, 15, 0.34);\n    -webkit-backdrop-filter: blur(5px) saturate(1.35);\n    backdrop-filter: blur(5px) saturate(1.35);\n    box-shadow:\n      0 4px 12px rgba(0, 0, 0, 0.2),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.18);\n  }\n  .round {\n    width: 32px;\n    height: 32px;\n    border: 0;\n    border-radius: 50%;\n    padding: 0;\n    color: #fff;\n    display: grid;\n    place-items: center;\n    cursor: pointer;\n    --mdc-icon-size: 15px;\n    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));\n    transition: transform 120ms ease, opacity 160ms ease;\n  }\n  .round:active {\n    transform: scale(0.9);\n  }\n  .round.big {\n    width: 34px;\n    height: 34px;\n    --mdc-icon-size: 16px;\n  }\n  /*\n   * Like GlassVideoControls, the WebGL surface paints the lens underneath while\n   * the actual control stays crisp and has no fill of its own.\n   */\n  .feed.glass-active .lens-control {\n    overflow: visible;\n    background: none;\n    -webkit-backdrop-filter: none;\n    backdrop-filter: none;\n    box-shadow: none;\n  }\n  /*\n   * Everything else floating over the feed keeps its own fill, but not its blur: a\n   * backdrop filter over the lens canvas makes the compositor re-read and re-blur that\n   * canvas on every frame it presents, which is every frame. A denser fill reads the\n   * same over a photo and costs the compositor nothing.\n   */\n  .feed.glass-active .float:not(.lens-control) {\n    background: rgba(11, 11, 15, 0.52);\n    -webkit-backdrop-filter: none;\n    backdrop-filter: none;\n  }\n  .camera-glass-stage {\n    position: absolute !important;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n  }\n  .live {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 5px 10px;\n    border-radius: 14px;\n    font-size: 11px;\n    font-weight: 700;\n    color: #fff;\n  }\n  .live .dot {\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: var(--dot, #8e8e93);\n    box-shadow: 0 0 6px var(--dot-glow, transparent);\n  }\n\n  .name {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    min-width: 0;\n    cursor: pointer;\n  }\n  .name .who {\n    font-size: 15px;\n    font-weight: 600;\n    color: #fff;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .name .when {\n    font-size: 11px;\n    font-weight: 500;\n    color: rgba(255, 255, 255, 0.7);\n  }\n  .card.offline .name .who {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .nosignal {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    color: rgba(255, 255, 255, 0.5);\n    --mdc-icon-size: 32px;\n  }\n  .nosignal span {\n    font-size: 12px;\n    font-weight: 500;\n  }\n\n  .actions {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 14px 16px;\n  }\n  .motion {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 7px 11px;\n    border-radius: 16px;\n    font-size: 11px;\n    font-weight: 600;\n    min-width: 0;\n    background: var(--chip-bg, var(--lg-track-bg));\n    box-shadow: inset 0 0 0 1px var(--chip-stroke, var(--lg-glass-stroke));\n    color: var(--chip-label, var(--lg-text-secondary));\n  }\n  .motion .dot {\n    flex: none;\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: var(--chip-dot, var(--lg-text-secondary));\n    box-shadow: 0 0 6px var(--chip-glow, transparent);\n  }\n  .motion span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .actions .spacer {\n    flex: 1;\n  }\n  .history {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 7px 12px;\n    border-radius: 16px;\n    border: 0;\n    font: inherit;\n    font-size: 12px;\n    font-weight: 600;\n    cursor: pointer;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    --mdc-icon-size: 14px;\n  }\n  .dimmed {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n\n  @container (max-width: 260px) {\n    .bar {\n      height: 46px;\n      padding: 0 10px;\n    }\n    .actions {\n      padding: 12px;\n    }\n  }\n";
function Zs({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = Er(), a = mt(() => Ar(Fr, i), [i]), o = s(e.language ?? t?.locale?.language ?? t?.language), l = e.entity ? t?.states[e.entity] : void 0, u = h(t, l, e.name, e.entity ?? ""), d = () => f(n, e.entity), p = y(l), m = l?.state === "streaming", g = l?.attributes.entity_picture, _ = !(!g || p), b = Po(n, Math.max(e.refresh_interval ?? Ws, 1) * 1e3, _), x = Y({
		tick: -1,
		url: void 0
	});
	x.current = Js(x.current, _ ? g : void 0, b);
	let S = x.current.url, C = Y(null), [w, T] = q({
		width: 0,
		height: 0
	}), E = Y([null, null]), D = Y(void 0), O = Y(0), k = Y(S), [A, j] = q(() => ({
		requested: S,
		frames: S ? [S, void 0] : [void 0, void 0],
		active: void 0
	}));
	if (k.current = S, A.requested !== S) {
		if (!S) D.current = void 0, j({
			requested: void 0,
			frames: [void 0, void 0],
			active: void 0
		});
		else {
			let e = +(A.active === 0), t = [...A.frames];
			t[e] = S, j({
				...A,
				requested: S,
				frames: t
			});
		}
	}
	let M = ht((e, t) => {
		k.current === t && (D.current = e, O.current += 1, j((n) => n.requested === t ? {
			...n,
			active: e
		} : n));
	}, []), { active: N, frames: P } = A;
	ft(() => {
		let e = C.current;
		if (!e) return;
		let t = () => T({
			width: e.clientWidth,
			height: e.clientHeight
		});
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []);
	let F = mt(() => Ys(() => {
		let e = D.current;
		return {
			image: e === void 0 ? void 0 : E.current[e] ?? void 0,
			generation: O.current
		};
	}), []);
	if (!l) return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Yr, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: u,
		label: o("unavailable"),
		onOpen: d
	}) });
	let I = (n) => v(t, n, { entity_id: e.entity }), L = () => {
		if (e.snapshot_service) {
			I(e.snapshot_service);
			return;
		}
		g && window.open(g, "_blank", "noopener");
	}, ee = e.motion_entity ? t?.states[e.motion_entity] : void 0, R = ee?.state === "on", z = !!(r && N !== void 0 && w.width > 0 && w.height > 0), B = w.width <= 260, V = B ? 46 : 56, te = B ? 10 : 14, ne = w.width - te - Gs / 2, re = [
		{
			x: ne / w.width,
			y: V / 2 / w.height,
			w: Gs,
			h: Gs,
			radius: Gs / 2
		},
		...e.show_mic ? [{
			x: (ne - Gs - qs) / w.width,
			y: V / 2 / w.height,
			w: Gs,
			h: Gs,
			radius: Gs / 2
		}] : [],
		{
			x: (w.width - te - Ks / 2) / w.width,
			y: (w.height - V / 2) / w.height,
			w: Ks,
			h: Ks,
			radius: Ks / 2
		}
	], H = /* @__PURE__ */ X(K, { children: [
		/* @__PURE__ */ X("div", { className: "scrim" }),
		/* @__PURE__ */ X("div", {
			className: "bar top",
			children: [p ? /* @__PURE__ */ X("span", {}) : /* @__PURE__ */ X("span", {
				className: "live float",
				style: m ? {
					"--dot": "#FF453A",
					"--dot-glow": "#FF453A"
				} : { "--dot": "#8E8E93" },
				children: [/* @__PURE__ */ X("span", { className: "dot" }), /* @__PURE__ */ X("span", {
					className: "live-label",
					children: o(m ? "cam_live" : "cam_still")
				})]
			}), /* @__PURE__ */ X("div", {
				className: `trail${p ? " dimmed" : ""}`,
				children: [e.show_mic && /* @__PURE__ */ X("button", {
					className: "round float lens-control",
					type: "button",
					onClick: () => I(e.mic_service),
					title: o("cam_mic"),
					children: /* @__PURE__ */ X(Q, { icon: "mdi:microphone-off" })
				}), /* @__PURE__ */ X("button", {
					className: "round float lens-control",
					type: "button",
					onClick: d,
					title: o("cam_expand"),
					children: /* @__PURE__ */ X(Q, { icon: "mdi:arrow-expand" })
				})]
			})]
		}),
		p && /* @__PURE__ */ X("div", {
			className: "nosignal",
			children: [/* @__PURE__ */ X(Q, { icon: "mdi:video-off" }), /* @__PURE__ */ X("span", { children: o("cam_no_signal") })]
		}),
		/* @__PURE__ */ X("div", {
			className: "bar bottom",
			children: [/* @__PURE__ */ X("div", {
				className: "name",
				onClick: d,
				children: [/* @__PURE__ */ X("span", {
					className: "who",
					children: u
				}), /* @__PURE__ */ X("span", {
					className: "when",
					children: p ? o("cam_offline_state") : c(l.last_updated, o)
				})]
			}), /* @__PURE__ */ X("button", {
				className: `round big float lens-control${p ? " dimmed" : ""}`,
				type: "button",
				onClick: L,
				title: o("cam_snapshot"),
				children: /* @__PURE__ */ X(Q, { icon: "mdi:camera" })
			})]
		})
	] });
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X(Wr, {
		className: `card${p ? " offline" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		style: {
			display: "flex",
			position: "relative",
			overflow: "hidden",
			"--lg-cam-ratio": String(e.aspect_ratio ?? 16 / 9)
		},
		children: [/* @__PURE__ */ X("div", {
			ref: C,
			className: `feed${z ? " glass-active" : ""}`,
			children: [P.map((e, t) => e && /* @__PURE__ */ X("img", {
				ref: (e) => {
					E.current[t] = e;
				},
				className: `still${N === t ? "" : " staging"}`,
				src: e,
				crossOrigin: r ? "anonymous" : void 0,
				alt: "",
				decoding: "async",
				onLoad: () => M(t, e)
			}, t)), z ? /* @__PURE__ */ X(pr, {
				className: "camera-glass-stage",
				draw: F,
				optics: a,
				lenses: re,
				maxDpr: i === "medium" ? 1 : 2,
				children: H
			}) : H]
		}), e.show_actions !== !1 && /* @__PURE__ */ X("div", {
			className: "actions",
			children: [
				p ? /* @__PURE__ */ X("div", {
					className: "motion",
					style: {
						"--chip-bg": "rgba(255, 69, 58, 0.18)",
						"--chip-stroke": "rgba(255, 69, 58, 0.3)",
						"--chip-label": "#FF453A",
						"--chip-dot": "#FF453A"
					},
					children: [/* @__PURE__ */ X("span", { className: "dot" }), /* @__PURE__ */ X("span", { children: o("cam_offline") })]
				}) : ee && /* @__PURE__ */ X("div", {
					className: "motion",
					style: R ? {
						"--chip-bg": "rgba(255, 159, 10, 0.18)",
						"--chip-stroke": "rgba(255, 159, 10, 0.3)",
						"--chip-label": "var(--lg-motion-label)",
						"--chip-dot": "#E08600",
						"--chip-glow": "#FF9F0A"
					} : void 0,
					children: [/* @__PURE__ */ X("span", { className: "dot" }), /* @__PURE__ */ X("span", { children: R ? `${o("cam_motion")} · ${c(ee.last_changed, o)}` : o("cam_no_motion") })]
				}),
				/* @__PURE__ */ X("div", { className: "spacer" }),
				/* @__PURE__ */ X("button", {
					className: `history${p ? " dimmed" : ""}`,
					onClick: d,
					children: [/* @__PURE__ */ X(Q, { icon: "mdi:bell-outline" }), /* @__PURE__ */ X("span", { children: o("cam_history") })]
				})
			]
		})]
	}) });
}
var Qs = ki({
	tagName: "liquid-glass-camera-card",
	component: Zs,
	styles: [
		ji,
		Xr,
		Hr,
		Xs
	],
	getCardSize: (e) => e.show_actions === !1 ? 4 : 5,
	getGridOptions: () => Wi(),
	getStubConfig: (e, t, n) => ({ entity: x(["camera"], e, t, n) })
}), $s = {
	light: "mdi:lightbulb",
	switch: "mdi:power-plug",
	input_boolean: "mdi:toggle-switch",
	fan: "mdi:fan",
	lock: "mdi:lock",
	cover: "mdi:blinds",
	climate: "mdi:thermostat",
	sensor: "mdi:gauge",
	binary_sensor: "mdi:motion-sensor",
	media_player: "mdi:speaker",
	camera: "mdi:cctv",
	scene: "mdi:palette",
	script: "mdi:script-text"
}, ec = {
	door: ["open", "closed"],
	garage_door: ["open", "closed"],
	window: ["open", "closed"],
	opening: ["open", "closed"],
	motion: ["detected", "clear"],
	occupancy: ["detected", "clear"],
	presence: ["detected", "clear"]
}, tc = {
	door: ["mdi:door-open", "mdi:door-closed"],
	garage_door: ["mdi:garage-open", "mdi:garage"],
	window: ["mdi:window-open", "mdi:window-closed"],
	opening: ["mdi:square-outline", "mdi:square"],
	motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
	occupancy: ["mdi:home-account", "mdi:home-outline"],
	presence: ["mdi:account", "mdi:account-outline"],
	moisture: ["mdi:water-alert", "mdi:water-off"],
	smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"]
}, nc = [
	["light", "custom:liquid-glass-light-card"],
	["switch", "custom:liquid-glass-switch-card"],
	["sensor", "custom:liquid-glass-sensor-card"]
], rc = [
	"theme",
	"refraction",
	"refraction_quality",
	"language",
	"glass_variant"
], ic = [], ac = "\n  .panel {\n    --lg-group-pad: 16px;\n    --lg-group-gap: 12px;\n    border-radius: var(--lg-corner, var(--lg-radius));\n    padding: var(--lg-group-pad);\n    display: flex;\n    flex-direction: column;\n    gap: var(--lg-group-gap);\n    background: var(--lg-group-panel);\n    box-shadow: inset 0 0 0 1px var(--lg-group-panel-stroke);\n  }\n  @supports (container-type: inline-size) {\n    .panel {\n      --lg-group-pad: clamp(10px, 4.2cqi, 16px);\n      --lg-group-gap: clamp(8px, 3.2cqi, 12px);\n      --lg-corner: min(calc(var(--lg-radius) + 4px), 12cqi);\n      --lg-group-title: clamp(13px, 4.2cqi, 16px);\n    }\n  }\n\n  .head {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    padding: 0 4px;\n  }\n  .head.tappable {\n    cursor: pointer;\n  }\n  .head .icon-well {\n    width: 32px;\n    height: 32px;\n  }\n  .head .icon-well lg-icon {\n    --mdc-icon-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n  .head .text {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n  }\n  .head .heading {\n    font-size: var(--lg-group-title, 16px);\n    font-weight: 700;\n    color: var(--lg-text-primary);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .head .sub {\n    font-size: 11px;\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .chevron {\n    flex: none;\n    width: 28px;\n    height: 28px;\n    border: 0;\n    border-radius: 50%;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-secondary);\n    display: grid;\n    place-items: center;\n    cursor: pointer;\n    padding: 0;\n    --mdc-icon-size: 15px;\n  }\n  .chevron lg-icon {\n    width: 15px;\n    height: 15px;\n    transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);\n  }\n  .chevron.closed lg-icon {\n    transform: rotate(-180deg);\n  }\n\n  .cards {\n    display: flex;\n    flex-direction: column;\n    gap: var(--lg-group-gap);\n  }\n  /* Children are full cards; they bring their own :host block layout. */\n  .cards > * {\n    display: block;\n  }\n\n  .summary {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    padding: 0 4px;\n  }\n  .sum {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 15px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    font-size: 11px;\n    font-weight: 600;\n    color: var(--tone, var(--lg-text-secondary));\n    max-width: 100%;\n  }\n  .sum span {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .sum lg-icon {\n    flex: none;\n    --mdc-icon-size: 14px;\n    width: 14px;\n    height: 14px;\n  }\n  .sum.warm {\n    --tone: var(--lg-motion-label);\n  }\n  .sum.good {\n    --tone: var(--lg-trend-up);\n  }\n  .sum.info {\n    --tone: var(--lg-cover-badge);\n  }\n\n  .empty {\n    padding: 6px 4px 2px;\n    font-size: var(--lg-state);\n    color: var(--lg-text-secondary);\n  }\n";
function oc(e) {
	let t = String(e.type ?? ""), n = t.startsWith("custom:") ? t.slice(7) : `hui-${t}-card`, r = document.createElement(n), i = () => {
		try {
			r.setConfig?.(e);
		} catch {}
	};
	return typeof r.setConfig == "function" ? i() : customElements.whenDefined(n).then(i), r;
}
function sc(e, t) {
	if (t === "binary_sensor") {
		let t = tc[e?.attributes.device_class ?? ""];
		if (t) return e?.state === "on" ? t[0] : t[1];
	}
	return $s[t] ?? "mdi:card-outline";
}
function cc(e, t, n, r) {
	let i = e.state, a = i === "on", o = (t, n) => g(r, e, t, n);
	switch (t) {
		case "light": {
			if (!a) return {
				label: o(n("unlit")),
				tone: "off"
			};
			let t = e.attributes.brightness;
			return {
				label: t ? `${Math.round(t / 255 * 100)}%` : o(n("lit")),
				tone: "warm"
			};
		}
		case "switch":
		case "input_boolean":
		case "fan":
		case "automation":
		case "siren": return a ? {
			label: o(n("on")),
			tone: "info"
		} : {
			label: o(n("off")),
			tone: "off"
		};
		case "lock": return i === "jammed" ? {
			label: o(n("jammed")),
			tone: "warm"
		} : i === "locked" ? {
			label: o(n("locked")),
			tone: "good"
		} : {
			label: o(n("unlocked")),
			tone: "warm"
		};
		case "cover": {
			if (i === "closed") return {
				label: o(n("closed")),
				tone: "off"
			};
			let t = e.attributes.current_position, r = o(n("open"), "open");
			return {
				label: t === void 0 ? r : `${r} ${Math.round(t)}%`,
				tone: "info"
			};
		}
		case "climate": {
			if (i === "off") return {
				label: o(n("mode_off")),
				tone: "off"
			};
			let t = e.attributes.temperature;
			return {
				label: t === void 0 ? o(n(`mode_${i}`)) : `${t}°`,
				tone: "warm"
			};
		}
		case "binary_sensor": {
			let t = e.attributes.device_class, r = (t && ec[t]) ?? ["on", "off"];
			return a ? {
				label: o(n(r[0])),
				tone: "warm"
			} : {
				label: o(n(r[1])),
				tone: "off"
			};
		}
		case "media_player": return i === "playing" ? {
			label: o(n("playing")),
			tone: "info"
		} : i === "paused" ? {
			label: o(n("paused")),
			tone: "off"
		} : {
			label: o(n("standby")),
			tone: "off"
		};
		case "sensor": return {
			label: o(`${i}${e.attributes.unit_of_measurement ?? ""}`),
			tone: "off"
		};
		default: return a ? {
			label: o(n("on")),
			tone: "info"
		} : {
			label: o(i),
			tone: "off"
		};
	}
}
function lc({ config: e, hass: t, host: n }) {
	Ai(n, e, t);
	let r = s(e.language ?? t?.locale?.language ?? t?.language), [i, a] = q(e.collapsed !== !0), [o, c] = q([]), l = Y(null), u = e.cards ?? ic, d = e.collapsible !== !1, f = mt(() => u.map((t) => {
		if (!String(t.type ?? "").startsWith("custom:liquid-glass-")) return t;
		let n = { ...t };
		for (let t of rc) n[t] === void 0 && e[t] !== void 0 && (n[t] = e[t]);
		return n;
	}), [
		u,
		e.glass_variant,
		e.language,
		e.refraction,
		e.refraction_quality,
		e.theme
	]);
	J(() => a(e.collapsed !== !0), [e.collapsed]), J(() => {
		let e = !1;
		return (async () => {
			let t = await window.loadCardHelpers?.().catch(() => void 0);
			e || c(f.map((e) => {
				try {
					return t ? t.createCardElement(e) : oc(e);
				} catch {
					return oc(e);
				}
			}));
		})(), () => {
			e = !0;
		};
	}, [f]), J(() => {
		l.current?.replaceChildren(...o);
	}, [o, i]), J(() => {
		for (let e of o) e.hass = t;
		n.lgGroupSize = i ? 1 + o.reduce((e, t) => e + (t.getCardSize?.() ?? 3), 0) : 1;
	});
	let p = u.map((e) => {
		let n = typeof e.entity == "string" ? e.entity : void 0;
		if (!n) return;
		let i = t?.states[n], a = n.split(".", 1)[0], o = e.icon ?? i?.attributes.icon ?? sc(i, a);
		return y(i) ? {
			icon: o,
			label: r("unavailable"),
			tone: "off"
		} : {
			icon: o,
			...cc(i, a, r, t)
		};
	}).filter((e) => !!e);
	return /* @__PURE__ */ X(K, { children: /* @__PURE__ */ X("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ X("div", {
				className: `head${d ? " tappable" : ""}`,
				onClick: () => d && a((e) => !e),
				children: [
					/* @__PURE__ */ X(Kr, { icon: e.icon ?? "mdi:view-grid-outline" }),
					/* @__PURE__ */ X("div", {
						className: "text",
						children: [/* @__PURE__ */ X("div", {
							className: "heading",
							children: e.title ?? r("grp_title")
						}), /* @__PURE__ */ X("div", {
							className: "sub",
							children: (() => {
								if (e.subtitle) return e.subtitle;
								if (!u.length) return "";
								let t = p.filter((e) => e.tone !== "off").length, n = [r("grp_devices", { n: u.length })];
								return p.length && n.push(t ? r("grp_running", { n: t }) : r("grp_all_idle")), !i && d && n.push(r("grp_tap_expand")), n.join(" · ");
							})()
						})]
					}),
					d && /* @__PURE__ */ X("button", {
						className: `chevron${i ? "" : " closed"}`,
						"aria-expanded": i,
						children: /* @__PURE__ */ X(Q, { icon: "mdi:chevron-up" })
					})
				]
			}),
			!i && e.summary !== !1 && p.length > 0 && /* @__PURE__ */ X("div", {
				className: "summary",
				children: p.map((e, t) => /* @__PURE__ */ X("div", {
					className: `sum ${e.tone}`,
					children: [/* @__PURE__ */ X(Q, { icon: e.icon }), /* @__PURE__ */ X("span", { children: e.label })]
				}, t))
			}),
			i && (u.length ? /* @__PURE__ */ X("div", {
				className: "cards",
				ref: l
			}) : /* @__PURE__ */ X("div", {
				className: "empty",
				children: r("grp_empty")
			}))
		]
	}) });
}
var uc = ki({
	tagName: "liquid-glass-group-card",
	component: lc,
	styles: [
		ji,
		Xr,
		ac
	],
	getCardSize: (e, t) => t.lgGroupSize ?? (e.collapsed ? 1 : 1 + (e.cards?.length ?? 0) * 3),
	getGridOptions: () => Wi(),
	getStubConfig: (e, t, n) => {
		let r = [
			t,
			n,
			Object.keys(e?.states ?? {})
		].find((e) => e?.length) ?? [];
		return { cards: nc.flatMap(([e, t]) => {
			let n = r.find((t) => t.startsWith(`${e}.`));
			return n ? [{
				type: t,
				entity: n
			}] : [];
		}) };
	}
}), dc = "\n  * { box-sizing: border-box; }\n  :host {\n    display: block;\n    min-width: 0;\n    container-type: inline-size;\n    color: var(--lg-text-primary);\n    font-family: var(--lg-font-jp);\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n  }\n  .separator {\n    width: 100%;\n    min-width: 0;\n    display: flex;\n    align-items: center;\n    color: var(--lg-text-primary);\n  }\n  .separator > lg-icon,\n  .pill > lg-icon,\n  .header-well > lg-icon,\n  .chevron > lg-icon { flex: none; }\n  .plain {\n    gap: 10px;\n    padding: 16px 6px 10px;\n    color: var(--lg-text-secondary);\n  }\n  .plain > lg-icon {\n    --mdc-icon-size: 16px;\n    width: 16px;\n    height: 16px;\n  }\n  .plain-title {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 13px;\n    font-weight: 700;\n    line-height: 19px;\n    letter-spacing: 0.6px;\n  }\n  .line {\n    flex: 1 1 24px;\n    min-width: 12px;\n    height: 1px;\n    background: var(--lg-separator-line);\n  }\n  .plain-count {\n    flex: none;\n    font-size: 12px;\n    font-weight: 600;\n    line-height: 1;\n    font-variant-numeric: tabular-nums;\n  }\n  .pill-row {\n    gap: 10px;\n    padding: 10px 0;\n  }\n  .pill {\n    flex: none;\n    position: relative;\n    min-width: 0;\n    max-width: calc(100% - 22px);\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 8px 14px;\n    border-radius: 20px;\n    color: var(--lg-text-primary);\n  }\n  .pill > lg-icon {\n    --mdc-icon-size: 15px;\n    width: 15px;\n    height: 15px;\n  }\n  .pill-title {\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-size: 13px;\n    font-weight: 600;\n    line-height: 20px;\n  }\n  .pill-count {\n    flex: none;\n    min-width: 20px;\n    height: 20px;\n    padding: 0 5px;\n    border-radius: 10px;\n    display: grid;\n    place-items: center;\n    background: var(--lg-track-bg);\n    color: var(--lg-text-secondary);\n    font-size: 11px;\n    font-weight: 700;\n    line-height: 1;\n    font-variant-numeric: tabular-nums;\n  }\n  .header-row {\n    gap: 12px;\n    padding: 14px 4px 8px;\n  }\n  .header-well {\n    flex: none;\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    color: var(--lg-text-primary);\n  }\n  .header-well > lg-icon {\n    --mdc-icon-size: 15px;\n    width: 15px;\n    height: 15px;\n  }\n  .header-text {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n  }\n  .header-title,\n  .header-subtitle {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .header-title {\n    font-size: 16px;\n    font-weight: 700;\n    line-height: 23px;\n  }\n  .header-subtitle {\n    color: var(--lg-text-secondary);\n    font-size: 11px;\n    font-weight: 500;\n    line-height: 16px;\n  }\n  .chevron {\n    flex: none;\n    width: 28px;\n    height: 28px;\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    color: var(--lg-text-secondary);\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .chevron > lg-icon {\n    --mdc-icon-size: 15px;\n    width: 15px;\n    height: 15px;\n  }\n  @container (max-width: 230px) {\n    .plain,\n    .pill-row { gap: 8px; }\n    .pill { padding-inline: 11px; }\n    .header-row { gap: 9px; }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after {\n      transition-duration: 0.01ms !important;\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n    }\n  }\n";
function fc({ config: e, hass: t, host: n }) {
	let { refraction: r } = Ai(n, e, t), i = s(e.language ?? t?.locale?.language ?? t?.language), a = e.title ?? h(t, void 0, e.name, i("sep_title")), o = e.icon ?? "mdi:lightbulb-outline", c = e.count !== void 0 && e.count !== null && e.count !== "", l;
	switch (e.style) {
		case "plain":
			l = /* @__PURE__ */ X("div", {
				className: "separator plain",
				children: [
					/* @__PURE__ */ X(Q, { icon: o }),
					/* @__PURE__ */ X("span", {
						className: "plain-title",
						children: a
					}),
					/* @__PURE__ */ X("span", {
						className: "line",
						"aria-hidden": "true"
					}),
					c && /* @__PURE__ */ X("span", {
						className: "plain-count",
						children: e.count
					})
				]
			});
			break;
		case "header":
			l = /* @__PURE__ */ X("div", {
				className: "separator header-row",
				children: [
					/* @__PURE__ */ X(Wr, {
						className: "header-well",
						refraction: r,
						variant: e.glass_variant,
						surface: "compact",
						sourceAccent: "var(--lg-accent)",
						style: { display: "grid" },
						children: /* @__PURE__ */ X(Q, { icon: o })
					}),
					/* @__PURE__ */ X("span", {
						className: "header-text",
						children: [/* @__PURE__ */ X("span", {
							className: "header-title",
							children: a
						}), e.subtitle && /* @__PURE__ */ X("span", {
							className: "header-subtitle",
							children: e.subtitle
						})]
					}),
					/* @__PURE__ */ X("span", {
						className: "chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ X(Q, { icon: "mdi:chevron-up" })
					})
				]
			});
			break;
		default: l = /* @__PURE__ */ X("div", {
			className: "separator pill-row",
			children: [/* @__PURE__ */ X(Wr, {
				className: "pill",
				refraction: r,
				variant: e.glass_variant,
				surface: "compact",
				sourceAccent: "var(--lg-accent)",
				style: { display: "flex" },
				children: [
					/* @__PURE__ */ X(Q, { icon: o }),
					/* @__PURE__ */ X("span", {
						className: "pill-title",
						children: a
					}),
					c && /* @__PURE__ */ X("span", {
						className: "pill-count",
						children: e.count
					})
				]
			}), /* @__PURE__ */ X("span", {
				className: "line",
				"aria-hidden": "true"
			})]
		});
	}
	return l;
}
var pc = ki({
	tagName: "liquid-glass-separator-card",
	component: fc,
	styles: [
		ji,
		Hr,
		dc
	],
	getCardSize: () => 1,
	getGridOptions: Gi,
	getStubConfig: () => ({
		title: "Section",
		icon: "mdi:lightbulb-outline",
		style: "pill"
	})
}), mc = "0.6.0", hc = "2026-09-07 15:14", gc = "https://github.com/cos-overclock/ha-liquid-glass", _c = (e, t) => !!((e.attributes.supported_features ?? 0) & t);
function vc(e, t, n, r, i, a = (e) => ({ entity: e })) {
	return {
		type: e,
		name: t,
		description: n,
		getEntitySuggestion: (t, n) => {
			let o = n.split(".", 1)[0];
			if (!r.includes(o)) return null;
			let s = t.states[n];
			return i && (!s || !i(s)) ? null : { config: {
				type: `custom:${e}`,
				...a(n)
			} };
		}
	};
}
var yc = 1, bc = 4, xc = 4, Sc = [
	vc("liquid-glass-light-card", "Liquid Glass Light", "Brightness, color temperature, color and presets", ["light"]),
	vc("liquid-glass-vacuum-card", "Liquid Glass Vacuum", "Cleaning controls, fan speed and status", ["vacuum"]),
	vc("liquid-glass-fan-card", "Liquid Glass Fan", "Speed, presets, oscillation and direction", ["fan"]),
	vc("liquid-glass-climate-card", "Liquid Glass Climate", "Thermostat dial with modes and fan / preset", ["climate"], (e) => _c(e, 3)),
	vc("liquid-glass-switch-card", "Liquid Glass Switch", "Single row toggle", t),
	vc("liquid-glass-sensor-card", "Liquid Glass Sensor", "Value, trend and 24h sparkline", ["sensor"]),
	vc("liquid-glass-binary-sensor-card", "Liquid Glass Binary Sensor", "Door / motion / window status row", ["binary_sensor"]),
	vc("liquid-glass-lock-card", "Liquid Glass Lock", "Slide to lock / unlock", ["lock"]),
	vc("liquid-glass-cover-card", "Liquid Glass Cover", "Blinds and curtains with position and tilt", ["cover"], (e) => _c(e, 7)),
	vc("liquid-glass-media-card", "Liquid Glass Media", "Now playing with transport and volume", ["media_player"]),
	vc("liquid-glass-slider-card", "Liquid Glass Slider", "Any numeric value as a draggable track", n, (e) => {
		switch (e.entity_id.split(".", 1)[0]) {
			case "input_number":
			case "number": return !0;
			case "fan": return _c(e, yc);
			case "light": return (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
			case "media_player": return _c(e, xc);
			case "cover":
			case "valve": return _c(e, bc);
			case "humidifier": return "humidity" in e.attributes;
			case "water_heater":
			case "climate": return _c(e, yc);
			default: return !1;
		}
	}),
	vc("liquid-glass-select-card", "Liquid Glass Select", "Choose an option with glass segments or chips", r),
	vc("liquid-glass-weather-card", "Liquid Glass Weather", "Current conditions with hourly and daily forecast", ["weather"]),
	vc("liquid-glass-button-card", "Liquid Glass Button", "Run a scene, script, automation or button", e),
	vc("liquid-glass-scene-card", "Liquid Glass Scenes", "A grid of scene tiles or a row of chips", e, void 0, (e) => ({ scenes: [{ entity: e }] })),
	vc("liquid-glass-camera-card", "Liquid Glass Camera", "Camera still with motion and history", ["camera"]),
	{
		type: "liquid-glass-group-card",
		name: "Liquid Glass Group",
		description: "A collapsible panel that holds other cards"
	},
	{
		type: "liquid-glass-separator-card",
		name: "Liquid Glass Separator",
		description: "A section heading in plain, pill or header style",
		getEntitySuggestion: () => ({ config: {
			type: "custom:liquid-glass-separator-card",
			title: "Section",
			icon: "mdi:lightbulb-outline",
			style: "pill"
		} })
	}
], Cc = [{
	type: "liquid-glass-entity-badge",
	name: "Liquid Glass Entity",
	description: "Entity name and state in a compact glass pill"
}];
window.customCards = window.customCards ?? [];
for (let e of Sc) {
	let t = {
		...e,
		preview: !0,
		documentationURL: gc
	}, n = window.customCards.find((t) => t.type === e.type);
	n ? Object.assign(n, t) : window.customCards.push(t);
}
window.customBadges = window.customBadges ?? [];
for (let e of Cc) {
	let t = {
		...e,
		preview: !0,
		documentationURL: gc
	}, n = window.customBadges.find((t) => t.type === e.type);
	n ? Object.assign(n, t) : window.customBadges.push(t);
}
console.info(`%c LIQUID-GLASS-CARDS %c v${mc} · ${Sc.length} cards · ${Cc.length} badge${Cc.length === 1 ? "" : "s"} · built ${hc} `, "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;", "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");
//#endregion
export { Ko as LiquidGlassBinarySensorCard, zs as LiquidGlassButtonCard, Qs as LiquidGlassCameraCard, mo as LiquidGlassClimateCard, ts as LiquidGlassCoverCard, Bi as LiquidGlassEntityBadge, Ba as LiquidGlassFanCard, uc as LiquidGlassGroupCard, Oa as LiquidGlassLightCard, Xo as LiquidGlassLockCard, ss as LiquidGlassMediaCard, Us as LiquidGlassSceneCard, ys as LiquidGlassSelectCard, Uo as LiquidGlassSensorCard, pc as LiquidGlassSeparatorCard, ps as LiquidGlassSliderCard, bo as LiquidGlassSwitchCard, Fa as LiquidGlassVacuumCard, As as LiquidGlassWeatherCard, _i as defineReactCard };
