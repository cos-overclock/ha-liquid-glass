//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = [
	"scene",
	"script",
	"automation",
	"button",
	"input_button"
], u = [
	"switch",
	"input_boolean",
	"fan",
	"light",
	"automation",
	"humidifier",
	"siren",
	"remote"
], d = [
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
], f = [
	"#FF453A",
	"#FF9F0A",
	"#FFD60A",
	"#30D158",
	"#0A84FF",
	"#B15CFF",
	"#FF375F"
], p = {
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
	preset: "プリセット",
	swing_mode: "スイング",
	power: "消費電力",
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
	ed_show_preset_mode: "プリセット",
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
}, m = {
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
	preset: "Preset",
	swing_mode: "Swing",
	power: "Power",
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
	ed_show_preset_mode: "Preset",
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
}, h = Object.fromEntries(Object.entries({
	ja: p,
	en: m
}).map(([e, t]) => [e, ((e, n) => {
	let r = t[e] ?? m[e] ?? e;
	if (n) for (let [e, t] of Object.entries(n)) r = r.replace(`{${e}}`, String(t));
	return r;
})]));
function g(e) {
	return h[(e ?? "en").toLowerCase().split("-")[0]] ?? h.en;
}
function _(e, t) {
	if (!e) return "";
	let n = Math.max(0, Date.now() - new Date(e).getTime()), r = Math.round(n / 1e3);
	if (r < 30) return t("just_now");
	if (r < 90) return t("seconds_ago", { n: r });
	let i = Math.round(r / 60);
	if (i < 60) return t("minutes_ago", { n: i });
	let a = Math.round(i / 60);
	return a < 48 ? t("hours_ago", { n: a }) : t("days_ago", { n: Math.round(a / 24) });
}
function v(e) {
	if (!e) return "";
	let t = new Date(e);
	return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
//#endregion
//#region src/utils.ts
var y = (e, t, n) => Math.min(n, Math.max(t, e));
function b(e, t, n = {}) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
function x(e, t) {
	t && b(e, "hass-more-info", { entityId: t });
}
function S(e, t) {
	return e?.attributes.friendly_name ?? t;
}
function C(e, t, n) {
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
function w(e) {
	return !e || e.state === "unavailable" || e.state === "unknown";
}
function T(e, t) {
	return !!((e?.attributes.supported_features ?? 0) & t);
}
function E(e, t, n, r, i) {
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
function D(e, t) {
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
function O(e) {
	return `#${e.slice(0, 3).map((e) => Math.round(y(e, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}
function k(e) {
	let t = /^#?([0-9a-f]{6})$/i.exec(e.trim());
	if (!t) return;
	let n = parseInt(t[1], 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function A(e, t = .45) {
	let n = k(e);
	return n ? O(n.map((e) => e + (255 - e) * t)) : e;
}
function j(e, t = .3) {
	let n = k(e);
	return n ? O(n.map((e) => e * (1 - t))) : e;
}
function M(e, t) {
	let n = k(e);
	return n ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${t})` : e;
}
//#endregion
//#region src/editor/schema.ts
var N = (e) => ({
	name: e,
	selector: { text: {} }
}), P = (e) => ({
	name: e,
	selector: { boolean: {} }
}), F = (e) => ({
	name: e,
	selector: { icon: {} }
}), I = (e) => ({
	name: e,
	selector: { object: {} }
}), L = (e) => ({
	name: "",
	type: "grid",
	schema: e
}), R = (e, t, n = !1) => ({
	name: e,
	required: n,
	selector: { entity: { domain: t } }
}), z = (e, t, n, r = 1) => ({
	name: e,
	selector: { number: {
		min: t,
		max: n,
		step: r,
		mode: "box"
	} }
}), B = (e, t, n = !1) => ({
	name: e,
	selector: { select: {
		options: t,
		multiple: n,
		mode: "dropdown"
	} }
});
function V(e) {
	return [R("entity", e, !0), L([N("name"), F("icon")])];
}
function H(e) {
	return {
		name: "",
		type: "expandable",
		title: e("ed_advanced"),
		icon: "mdi:tune",
		schema: [
			L([B("theme", [
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
			]), B("refraction", [
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
			B("refraction_quality", [
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
			B("language", [{
				value: "ja",
				label: "日本語"
			}, {
				value: "en",
				label: "English"
			}]),
			B("glass_variant", [{
				value: "regular",
				label: e("ed_glass_variant_regular")
			}, {
				value: "clear",
				label: e("ed_glass_variant_clear")
			}])
		]
	};
}
var ee = [
	"auto",
	"heat_cool",
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
];
function te(e) {
	return (e ?? "").replace(/^custom:/, "").replace(/^liquid-glass-/, "").replace(/-card$/, "");
}
function ne(e, t, n) {
	switch (te(e)) {
		case "light": return [
			...V("light"),
			L([
				P("show_brightness"),
				P("show_color_temp"),
				P("show_color")
			]),
			{
				name: "favorites",
				selector: { text: { multiple: !0 } }
			},
			I("presets"),
			H(t)
		];
		case "climate": return [
			...V("climate"),
			B("design", [{
				value: "classic",
				label: t("ed_design_classic")
			}, {
				value: "compact",
				label: t("ed_design_compact")
			}]),
			...n?.design === "compact" || n?.design === "a" ? [P("show_fan_mode")] : [L([
				P("show_fan_mode"),
				P("show_preset_mode"),
				P("show_swing_mode")
			])],
			B("hvac_modes", ee.map((e) => ({
				value: e,
				label: t(`mode_${e}`)
			})), !0),
			L([z("min_temp", -50, 100, .5), z("max_temp", -50, 100, .5)]),
			H(t)
		];
		case "switch": return [
			...V([
				"switch",
				"input_boolean",
				"fan",
				"light",
				"automation",
				"humidifier",
				"siren",
				"remote"
			]),
			R("power_entity", "sensor"),
			H(t)
		];
		case "sensor": {
			let e = n?.value_in_caption === !0;
			return [
				...V("sensor"),
				L(e ? [P("value_in_caption"), P("trend")] : [
					P("value_in_caption"),
					P("graph"),
					P("trend")
				]),
				L(e ? [z("decimals", 0, 4)] : [z("hours_to_show", 1, 168), z("decimals", 0, 4)]),
				N("accent"),
				L([R("secondary_entity", ["sensor", "binary_sensor"]), N("secondary_label")]),
				H(t)
			];
		}
		case "binary-sensor": return [
			...V("binary_sensor"),
			L([F("icon_on"), F("icon_off")]),
			L([N("label_on"), N("label_off")]),
			N("accent"),
			H(t)
		];
		case "lock": return [
			...V("lock"),
			I("buttons"),
			H(t)
		];
		case "cover": return [
			...V("cover"),
			L([B("style", [{
				value: "blind",
				label: t("ed_style_blind")
			}, {
				value: "curtain",
				label: t("ed_style_curtain")
			}]), B("curtain", [{
				value: "double",
				label: t("ed_curtain_double")
			}, {
				value: "single",
				label: t("ed_curtain_single")
			}])]),
			P("show_tilt"),
			H(t)
		];
		case "media": return [
			...V("media_player"),
			L([P("show_volume"), P("show_device")]),
			N("source_color"),
			H(t)
		];
		case "slider": return [
			...V(d),
			L([z("min", -1e3, 1e4, .1), z("max", -1e3, 1e4, .1)]),
			L([z("step", .01, 1e3, .01), N("unit")]),
			L([
				P("ticks"),
				P("show_range"),
				z("decimals", 0, 4)
			]),
			N("subtitle"),
			N("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [N("attribute"), L([N("service"), N("service_key")])]
			},
			H(t)
		];
		case "weather": {
			let e = n?.layout === "row", r = B("layout", [{
				value: "full",
				label: t("ed_layout_full")
			}, {
				value: "row",
				label: t("ed_layout_row")
			}]);
			return e ? [
				...V("weather"),
				r,
				H(t)
			] : [
				...V("weather"),
				r,
				L([
					P("show_hourly"),
					P("show_daily"),
					P("show_metrics")
				]),
				L([z("hourly_count", 2, 12), z("daily_count", 1, 10)]),
				H(t)
			];
		}
		case "button": return [
			...V(l),
			N("subtitle"),
			N("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [N("service"), I("service_data")]
			},
			H(t)
		];
		case "scene": return [
			L([B("style", [{
				value: "tiles",
				label: t("ed_style_tiles")
			}, {
				value: "chips",
				label: t("ed_style_chips")
			}]), z("columns", 1, 6)]),
			L([N("title"), P("show_count")]),
			I("scenes"),
			H(t)
		];
		case "group": return [
			L([N("title"), F("icon")]),
			N("subtitle"),
			L([
				P("collapsible"),
				P("collapsed"),
				P("summary")
			]),
			I("cards"),
			H(t)
		];
		case "separator": {
			let e = n?.style ?? "pill";
			return [
				L([N("title"), F("icon")]),
				B("style", [
					{
						value: "plain",
						label: t("ed_style_plain")
					},
					{
						value: "pill",
						label: t("ed_style_pill")
					},
					{
						value: "header",
						label: t("ed_style_header")
					}
				]),
				...e === "header" ? [N("subtitle")] : [z("count", 0, 999)],
				H(t)
			];
		}
		case "camera": return [
			...V("camera"),
			R("motion_entity", "binary_sensor"),
			L([P("show_actions"), P("show_mic")]),
			L([z("refresh_interval", 1, 300), z("aspect_ratio", .5, 3, .01)]),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [N("snapshot_service"), N("mic_service")]
			},
			H(t)
		];
		default: return [
			R("entity", [], !0),
			L([N("name"), F("icon")]),
			H(t)
		];
	}
}
var U = /* @__PURE__ */ new Set([
	"show_brightness",
	"show_color_temp",
	"show_color",
	"show_fan_mode",
	"show_preset_mode",
	"graph",
	"trend",
	"show_tilt",
	"show_volume",
	"show_device",
	"show_range",
	"show_hourly",
	"show_daily",
	"show_metrics",
	"show_actions",
	"collapsible",
	"summary"
]);
function re(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => {
		for (let r of e) r.schema ? n(r.schema) : r.name && t.add(r.name);
	};
	return n(e), t;
}
var W = {
	presets: "ed_help_presets",
	buttons: "ed_help_buttons",
	favorites: "ed_help_favorites",
	accent: "ed_help_color",
	source_color: "ed_help_color",
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
}, ie = class extends HTMLElement {
	constructor() {
		super(), this.computeLabel = (e) => this.t(`ed_${e.name}`), this.computeHelper = (e) => {
			let t = W[e.name];
			return t ? this.t(t) : void 0;
		}, this.valueChanged = (e) => {
			e.stopPropagation(), b(this, "config-changed", { config: this.fromForm(e.detail.value) });
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
		let { refraction: t, theme: n, ...r } = e, i = { ...r };
		if (i.refraction = t === !0 ? "on" : t === !1 ? "off" : "auto", i.refraction_quality = r.refraction_quality ?? "auto", i.theme = n ?? "auto", i.glass_variant = r.glass_variant ?? "regular", te(e.type) === "weather" && (i.layout = r.layout ?? "full"), te(e.type) === "climate") {
			let e = r.design;
			i.design = e === "a" ? "compact" : e ?? "classic";
		}
		te(e.type) === "separator" && (i.style = r.style ?? "pill");
		for (let t of re(ne(e.type, this.t, i))) U.has(t) && (i[t] = te(e.type) === "climate" && i.design === "compact" && t === "show_fan_mode" ? r[t] === !0 : r[t] !== !1);
		if (te(e.type) === "light") {
			let e = r.favorites;
			i.favorites = e === !1 ? [] : e ?? f;
		}
		return i;
	}
	fromForm(e) {
		let t = { ...e }, n = te(t.type) === "climate" && (t.design === "compact" || t.design === "a"), r = this.config, i = r?.design === "compact" || r?.design === "a";
		r && n !== i && r.show_fan_mode === void 0 && delete t.show_fan_mode;
		for (let [e, r] of Object.entries(t)) if (typeof r == "boolean") {
			if (n && e === "show_fan_mode") {
				r === !1 && delete t[e];
				continue;
			}
			r === U.has(e) && delete t[e];
		}
		t.refraction === "on" ? t.refraction = !0 : t.refraction === "off" ? t.refraction = !1 : delete t.refraction, t.refraction_quality === "auto" && delete t.refraction_quality, t.theme === "auto" && delete t.theme, t.glass_variant === "regular" && delete t.glass_variant, t.layout === "full" && delete t.layout, t.design === "classic" && delete t.design, t.style === "pill" && te(t.type) === "separator" && delete t.style;
		let a = t.favorites;
		Array.isArray(a) && a.join() === f.join() && delete t.favorites;
		for (let [e, n] of Object.entries(t)) (n == null || n === "" || Array.isArray(n) && n.length === 0 && e !== "favorites") && delete t[e];
		return t;
	}
	get t() {
		return g(this.config?.language ?? this.hassValue?.locale?.language ?? this.hassValue?.language);
	}
	updateForm() {
		let e = this.hassValue, t = this.config;
		this.form.hidden = !e || !t, e && t && (this.form.hass = e, this.form.data = this.toForm(t), this.form.schema = ne(t.type, this.t, t), this.form.computeLabel = this.computeLabel, this.form.computeHelper = this.computeHelper);
	}
};
customElements.get("liquid-glass-card-editor") || customElements.define("liquid-glass-card-editor", ie);
//#endregion
//#region node_modules/react/cjs/react.production.js
var G = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function D(e, t) {
		return E(e.type, t, e.props);
	}
	function O(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function k(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? k("" + e.key) : t.toString(36);
	}
	function M(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function N(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, N(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), N(o, r, i, "", function(e) {
			return e;
		})) : o != null && (O(o) && (o = D(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += N(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += N(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return N(M(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function P(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return N(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function F(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var I = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, L = {
		map: P,
		forEach: function(e, t, n) {
			P(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return P(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return P(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!O(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = L, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = O, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: F
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, I);
		} catch (e) {
			I(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), ae = /* @__PURE__ */ o(((e, t) => {
	t.exports = G();
})), oe = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), se = /* @__PURE__ */ o(((e, t) => {
	t.exports = oe();
})), K = /* @__PURE__ */ c(ae(), 1), q = se(), ce = {
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
}, le = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", ue = .22, de = Math.sqrt(Math.PI), fe = (e) => Math.tanh(de * e), pe = (e, t) => t > 0 ? (e - Math.sqrt(e * e - t * t)) / t : 0, me = (e, t, n) => {
	let r = Math.max(.01, Math.min(e, Math.min(t, n) - 1)), i = (t * t + r * r) / (2 * r), a = (n * n + r * r) / (2 * r), o = pe(i, t), s = pe(a, n);
	return {
		Rx: i,
		Ry: a,
		scaleX: o > 0 ? .5 / o : 1,
		scaleY: s > 0 ? .5 / s : 1
	};
}, he = (e, t, n) => {
	let r = Math.min(e, t * .999);
	return r / Math.sqrt(t * t - r * r) * n;
}, ge = (e, t) => `${e} 0 0 0 ${.5 * (1 - e)}  0 ${t} 0 0 ${.5 * (1 - t)}  0 0 1 0 0  0 0 0 1 0`, _e = /* @__PURE__ */ new Map(), ve = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t)), a = Math.max(0, Math.min(Math.round(n), Math.min(r, i) / 2)), o = `rr\xB7${r}\xB7${i}\xB7${a}`, s = _e.get(o);
	if (s) return {
		uri: s,
		key: o
	};
	let c = .5, l = Math.max(0, r - 2 * c), u = Math.max(0, i - 2 * c), d = Math.max(0, a - c), f = `<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 ${r} ${i}'><rect fill='black' rx='${d}' ry='${d}' x='${c}' y='${c}' width='${l}' height='${u}'/></svg>`, p = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(f)}`;
	return _e.set(o, p), {
		uri: p,
		key: o
	};
}, ye = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t));
	return ve(r, i, Math.max(0, Math.min(Math.round(n), Math.floor(Math.min(r, i) / 2))));
}, be = (e) => (.5 + e) * 255 + .5 | 0, xe = (e) => 127 * e + 128 + .5 | 0, Se = (e) => {
	let t = null, n = null, r = null, i = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0, u = null;
	return {
		generate(d) {
			t || (t = document.createElement("canvas"), t.width = e, t.height = e, n = t.getContext("2d"), r = n.createImageData(e, e));
			let { lensHalfWidth: f, lensHalfHeight: p, borderRadius: m, depth: h, clipToShape: g, softEdge: _, sheenAngle: v = 45, glow: y = 0, glowSpread: b = 1, glowFalloff: x = 1.5, sheen: S = 0, sheenWidth: C = 3, sheenFalloff: w = 1.5, curvature: T = 0, splay: E = 0, bend: D = 0, bendWidth: O = .16 } = d, k = r.data, A = e >> 1, j = Math.min(m, Math.min(f, p)), M = Math.min(f, p), N = Math.min(h * M, M - 1), P = Math.max(0, f - N), F = Math.max(0, p - N), I = Math.max(0, Math.min(m, Math.min(P, F))), L = N > 0 ? Math.SQRT1_2 / N : 1e6, R = y > 0 || S > 0, z = v * Math.PI / 180, B = Math.cos(z), V = Math.sin(z), H = C > 0 ? 1 / C : 0, ee = 1 / Math.max(2, b * Math.min(f, p)), te = 2 * f / e, ne = 2 * p / e, U = 1 / f, re = 1 / p, W = T > 0, ie = T * Math.min(f, p), G = E > 0, ae = D > 0, oe = 1 / Math.max(2, O * Math.min(f, p)), se = (e, t) => e > 0 || t > 0 ? Math.sqrt(e * e + t * t) : 0;
			if (W && ((!u || Math.abs(ie - a) > .5 || Math.abs(f - o) > 1 || Math.abs(p - s) > 1) && (u = me(ie, f, p), a = ie, o = f, s = p, l = !0), c !== A && (i = new Float32Array(A), c = A, l = !0), l)) {
				let e = i, t = u, n = t.Rx * t.Rx, r = t.Rx * .999;
				for (let i = 0; i < A; i += 1) {
					let a = -((i + .5) * te - f), o = a < r ? a : r;
					e[i] = o / Math.sqrt(n - o * o) * t.scaleX;
				}
				l = !1;
			}
			let K = W ? i : null, q = .5 * Math.min(f, p), ce = q > 0 ? 1 / q : 0, le = Math.SQRT1_2;
			for (let t = 0; t < A; t += 1) {
				let n = e - 1 - t, r = -((t + .5) * ne - p), i = r - p + j, a = _ ? r - F + I : 0, o = W && K ? he(r, u.Ry, u.scaleY) : r * re > 1 ? 1 : r * re, s = r * re > 1 ? 1 : r * re, c = G ? Math.max(0, 1 - (p - r) * ce) : 0, l = t * e, d = n * e;
				for (let t = 0; t < A; t += 1) {
					let n = e - 1 - t, r = -((t + .5) * te - f), u = r - f + j, p = se(u > 0 ? u : 0, i > 0 ? i : 0) + (u > i ? u > 0 ? 0 : u : i > 0 ? 0 : i) - j, m = (l + t) * 4, h = (l + n) * 4, v = (d + t) * 4, b = (d + n) * 4;
					if (g && p >= 0) {
						for (let e of [
							m,
							h,
							v,
							b
						]) k[e] = 128, k[e + 1] = 128, k[e + 2] = 128, k[e + 3] = 255;
						continue;
					}
					let C = K ? K[t] : r * U > 1 ? 1 : r * U, T = o;
					if (G) {
						let e = c * E, t = Math.max(0, 1 - (f - r) * ce) * E;
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
						O = .5 * (1 + fe((se(e > 0 ? e : 0, a > 0 ? a : 0) + (e > a ? e > 0 ? 0 : e : a > 0 ? 0 : a) - I) * L));
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
					if (R) {
						let e = r * U > 1 ? 1 : r * U, t = Math.min(1, Math.abs(e * B + s * V) * le), n = Math.min(1, Math.abs(e * B - s * V) * le);
						if (S > 0) {
							let e = S * (p < 0 ? Math.max(0, 1 + p * H) : 0) ** +w;
							N += e * (.16 + .84 * t ** 1.6), F += e * (.16 + .84 * n ** 1.6);
						}
						if (y > 0) {
							let e = 1 - (p < 0 ? Math.min(1, -p * ee) : 1), r = y * (e * e * (3 - 2 * e)) ** x * O;
							N += r * (.6 + .4 * t), F += r * (.6 + .4 * n);
						}
						N > 1 ? N = 1 : N < -1 && (N = -1), F > 1 ? F = 1 : F < -1 && (F = -1);
					}
					let z = be(A), ne = be(-A), re = be(M), W = be(-M), ie = xe(N), q = xe(F);
					k[m] = z, k[m + 1] = re, k[m + 2] = ie, k[m + 3] = 255, k[h] = ne, k[h + 1] = re, k[h + 2] = q, k[h + 3] = 255, k[v] = z, k[v + 1] = W, k[v + 2] = q, k[v + 3] = 255, k[b] = ne, k[b + 1] = W, k[b + 2] = ie, k[b + 3] = 255;
				}
			}
			return n.putImageData(r, 0, 0), t.toDataURL();
		},
		dispose() {
			t && (t.width = 0, t.height = 0, t = null), n = null, r = null, i = null, u = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0;
		}
	};
}, Ce = (e) => typeof e == "object" && !!e && "get" in e && "on" in e, we = (e) => Ce(e) ? e.get() : e, Te = class {
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
}, J = (e) => new Te(e), Ee = (e, t) => {
	let n = J(t()), r = () => n.set(t());
	for (let t of e) t.on("change", r);
	return n;
}, De = (e, t, n, r) => {
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
}, Oe = De(.34, 1.36, .42, 1), ke = /* @__PURE__ */ new WeakMap(), Y = (e, t, { duration: n = .3, ease: r = Oe, onComplete: i } = {}) => {
	ke.get(e)?.stop();
	let a = e.get();
	if (a === t || n <= 0) return e.set(t), i?.(), { stop() {} };
	let o = n * 1e3, s = 0, c = 0, l = (n) => {
		c === 0 && (c = n);
		let u = (n - c) / o;
		if (u >= 1) {
			e.set(t), ke.delete(e), i?.();
			return;
		}
		e.set(a + (t - a) * r(u)), s = requestAnimationFrame(l);
	};
	s = requestAnimationFrame(l);
	let u = { stop() {
		cancelAnimationFrame(s), ke.delete(e);
	} };
	return ke.set(e, u), u;
}, Ae = "#version 300 es\nin vec2 a_pos;\nout vec2 v_uv;\nvoid main() {\n  // a_pos is a -1..1 fullscreen quad; v_uv is bottom-left-origin 0..1, which\n  // (with UNPACK_FLIP_Y on the textures) samples the source upright. The lens\n  // descriptor is supplied in this same bottom-left space by the component.\n  v_uv = a_pos * 0.5 + 0.5;\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}", je = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nvoid main() { o = texture(u_src, v_uv); }", Me = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform vec2 u_step;\nvoid main() {\n  vec4 c = texture(u_src, v_uv) * 0.1857;\n  c += (texture(u_src, v_uv + u_step)       + texture(u_src, v_uv - u_step))       * 0.1671;\n  c += (texture(u_src, v_uv + 2.0 * u_step) + texture(u_src, v_uv - 2.0 * u_step)) * 0.1227;\n  c += (texture(u_src, v_uv + 3.0 * u_step) + texture(u_src, v_uv - 3.0 * u_step)) * 0.0768;\n  c += (texture(u_src, v_uv + 4.0 * u_step) + texture(u_src, v_uv - 4.0 * u_step)) * 0.0414;\n  o = c;\n}", Ne = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform sampler2D u_blur;\nuniform sampler2D u_disp;\nuniform vec2 u_origin;\nuniform vec2 u_size;\nuniform vec2 u_scale;\nuniform vec2 u_lenspx;   // lens box size in device px (for an aspect-correct SDF)\nuniform float u_radiuspx; // corner radius in device px\nuniform float u_dispersion;\nuniform float u_sheen;\nuniform float u_frost;    // 0 = sharp; >0 = blend toward the pre-blurred copy\nuniform float u_opacity;  // enter/exit fade (multiplies coverage)\nuniform float u_brightness; // white(>0)/black(<0) veil over the lens\n// Signed distance to a rounded rectangle (negative inside). Computed in pixel\n// space so the corner radius stays circular on non-square lenses. NB: the half-\n// extent arg must NOT be named `half` — that's a reserved word in GLSL ES and\n// Safari's (stricter) WebGL2 compiler rejects it, throwing at renderer init.\nfloat sdRoundRect(vec2 p, vec2 b, float r) {\n  vec2 q = abs(p) - b + r;\n  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;\n}\n// Source sample, blended toward the frosted (pre-blurred) copy by mixAmt. The\n// frost is what makes the glass read as liquid rather than a clear lens.\nvec3 frosted(vec2 p, float mixAmt) {\n  vec3 raw = texture(u_src, p).rgb;\n  return mixAmt > 0.0 ? mix(raw, texture(u_blur, p).rgb, mixAmt) : raw;\n}\nvoid main() {\n  vec2 lensUV = (v_uv - u_origin) / u_size;\n  // Rounded-rect coverage. The SDF is in device px and a true distance field\n  // (gradient ~1), so a fixed ~1px feather anti-aliases the edge without fwidth\n  // (derivatives are handled inconsistently across WebGL2 backends).\n  vec2 p = (lensUV - 0.5) * u_lenspx;\n  float sdf = sdRoundRect(p, u_lenspx * 0.5, min(u_radiuspx, min(u_lenspx.x, u_lenspx.y) * 0.5));\n  float coverage = (1.0 - smoothstep(-1.0, 1.0, sdf)) * u_opacity;\n  if (coverage <= 0.0) discard;\n  vec4 d = texture(u_disp, clamp(lensUV, 0.0, 1.0));\n  vec2 disp = (d.rg - 0.5) * u_scale;            // feDisplacementMap equivalent\n  // RGB split — red bent DISPERSION_SPREAD more than blue, green half that (keep\n  // in sync with DISPERSION_SPREAD in displacement.ts so DOM + WebGL match).\n  vec2 uvR = v_uv + disp * (1.0 + u_dispersion * 0.22);\n  vec2 uvG = v_uv + disp * (1.0 + u_dispersion * 0.11);\n  vec2 uvB = v_uv + disp;\n  vec3 lensCol = vec3(frosted(uvR, u_frost).r, frosted(uvG, u_frost).g, frosted(uvB, u_frost).b);\n  // Specular lift from B. The map encodes spec as B = 127·s + 128, so (B/255 − 0.5)\n  // = 0.498·s; this matches the DOM path's gain exactly (feColorMatrix 1× alpha\n  // then feComposite k2=specular → 0.498·specular·s). (NOT ×2 — that double-lifted it.)\n  lensCol += u_sheen * max(0.0, d.b - 0.5);\n  // Brightness veil (alpha-blend toward white/black, like the DOM path).\n  if (u_brightness > 0.0) lensCol = mix(lensCol, vec3(1.0), clamp(u_brightness, 0.0, 1.0));\n  else if (u_brightness < 0.0) lensCol = mix(lensCol, vec3(0.0), clamp(-u_brightness, 0.0, 1.0));\n  // Mix over the untouched backdrop by the coverage → an AA'd, frosted-clipping\n  // silhouette. Canvas stays fully opaque, so straight/premultiplied alpha is moot.\n  vec3 backdrop = texture(u_src, v_uv).rgb;\n  o = vec4(mix(backdrop, lensCol, coverage), 1.0);\n}", Pe = (e, t, n) => {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`glass-webgl shader: ${t}`);
	}
	return r;
}, Fe = (e, t, n) => {
	let r = e.createProgram(), i = Pe(e, e.VERTEX_SHADER, t), a = Pe(e, e.FRAGMENT_SHADER, n);
	if (e.attachShader(r, i), e.attachShader(r, a), e.bindAttribLocation(r, 0, "a_pos"), e.linkProgram(r), e.deleteShader(i), e.deleteShader(a), !e.getProgramParameter(r, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(r);
		throw e.deleteProgram(r), Error(`glass-webgl link: ${t}`);
	}
	return r;
}, Ie = class {
	constructor(e) {
		this.dispCache = /* @__PURE__ */ new Map(), this.blurW = 0, this.blurH = 0, this.srcW = 0, this.srcH = 0, this.disposed = !1;
		let t = e.getContext("webgl2", {
			premultipliedAlpha: !1,
			alpha: !0,
			antialias: !1,
			preserveDrawingBuffer: !1
		});
		if (!t) throw Error("webgl2 unavailable");
		this.gl = t, this.blit = Fe(t, Ae, je), this.lens = Fe(t, Ae, Ne), this.blur = Fe(t, Ae, Me), this.quad = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quad), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
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
}, Le = () => typeof window < "u" && window.devicePixelRatio || 1, Re = (e) => ({
	merged: {
		...ce,
		...e.lens
	},
	lensW: e.lensW,
	lensH: e.lensH,
	radius: e.borderRadius,
	x: e.x,
	y: e.y,
	scale: e.scale ?? 1,
	opacity: e.opacity ?? 1
}), ze = (e, t, n, r, i, a) => {
	let [o, s] = (0, K.useState)(!1), c = (0, K.useRef)(null), l = (0, K.useRef)(null), u = r[0], d = (0, K.useRef)(r);
	d.current = r;
	let f = r.some((e) => Ce(e.x) || Ce(e.y) || Ce(e.lensW) || Ce(e.lensH) || e.radius != null && Ce(e.radius));
	(0, K.useLayoutEffect)(() => {
		let n = e.current, r = t.current;
		if (!n || !r) return;
		let a;
		try {
			a = new Ie(n);
		} catch (e) {
			typeof console < "u" && console.warn("[liquid-glass] WebGL renderer unavailable, falling back:", e), s(!0);
			return;
		}
		c.current = a;
		let o = Math.min(Le(), i), l = () => {
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
	let p = u.merged, m = we(u.lensW), h = we(u.lensH), g = u.radius == null ? Math.min(m, h) : we(u.radius), _ = JSON.stringify([
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
	]);
	(0, K.useEffect)(() => {
		if (!c.current) return;
		l.current || (l.current = Se(p.mapSize));
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
	}, [_, o]);
	let v = r.map((e) => {
		let t = e.merged, n = we(e.lensW), r = we(e.lensH), i = e.radius == null ? Math.min(n, r) : we(e.radius);
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
	}), y = (0, K.useRef)(v);
	y.current = v;
	let b = (0, K.useRef)(/* @__PURE__ */ new Map()), x = v.join("|");
	return (0, K.useEffect)(() => {
		let e = l.current;
		if (!e) return;
		let t = new Set(y.current);
		b.current.forEach((e, n) => {
			t.has(n) || (b.current.delete(n), c.current?.releaseDispMap(e));
		});
		let n = y.current[0], i = [], a = /* @__PURE__ */ new Set();
		return r.forEach((t, r) => {
			let o = y.current[r];
			if (o === n || a.has(o) || b.current.has(o)) return;
			a.add(o);
			let s = t.merged, c = we(t.lensW), l = we(t.lensH), u = t.radius == null ? Math.min(c, l) : we(t.radius), d = e.generate({
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
				f || b.current.set(o, p);
			}, p.src = d, i.push(() => {
				f = !0;
			});
		}), () => i.forEach((e) => e());
	}, [x, o]), (0, K.useEffect)(() => () => {
		l.current?.dispose(), l.current = null;
	}, []), (0, K.useEffect)(() => {
		if (o) return;
		let e = 0, r = 0, i = a, s = !!i && !f && typeof i.requestVideoFrameCallback == "function", l = () => {
			let a = c.current, o = t.current;
			if (!a || !o) return;
			let u = n();
			if (u && u.w > 0 && u.h > 0) {
				let e = o.clientWidth, t = o.clientHeight, n = Math.sqrt((e * e + t * t) / 2), r = y.current, i = d.current.map((i, a) => {
					let o = we(i.lensW), s = we(i.lensH), c = i.radius == null ? Math.min(o, s) : we(i.radius), l = we(i.x), u = we(i.y), d = o * i.scale, f = s * i.scale, p = a > 0 && r[a] !== r[0], m = p ? b.current.get(r[a]) : void 0, h = p && !m;
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
}, Be = ({ src: e, draw: t, poster: n, loop: r = !0, muted: i = !0, autoPlay: a = !0, crossOrigin: o, paused: s, videoRef: c, lenses: l, width: u, height: d, lens: f, lensW: p = 90, lensH: m = 90, borderRadius: h, x: g = .5, y: _ = .5, maxDpr: v = 1.5, className: y, style: b, children: x }) => {
	let S = e != null, C = (0, K.useRef)(null), w = (0, K.useRef)(null), T = (0, K.useRef)(null), [E, D] = (0, K.useState)(null), O = K.useCallback((e) => {
		T.current = e, typeof c == "function" ? c(e) : c && (c.current = e);
	}, [c]), k = (0, K.useRef)(null), A = (0, K.useRef)(t);
	A.current = t;
	let j = (0, K.useRef)(0);
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
	}]).map(Re);
	(0, K.useEffect)(() => {
		S && D(T.current);
	}, [S]), (0, K.useEffect)(() => {
		let e = T.current;
		S && e && s !== void 0 && (s ? e.pause() : e.play().catch(() => {}));
	}, [S, s]);
	let N = ze(w, C, K.useCallback(() => {
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
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		ref: C,
		className: y,
		style: {
			position: "relative",
			overflow: "hidden",
			...b
		},
		children: [
			S && /* @__PURE__ */ (0, q.jsx)("video", {
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
			/* @__PURE__ */ (0, q.jsx)("canvas", {
				ref: w,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					display: N ? "none" : "block"
				}
			}),
			!S && N && /* @__PURE__ */ (0, q.jsx)("div", {
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
			x != null && /* @__PURE__ */ (0, q.jsx)("div", {
				style: {
					position: "absolute",
					inset: 0
				},
				children: x
			})
		]
	});
}, Ve = () => {
	let [e, t] = (0, K.useState)(!1);
	return (0, K.useEffect)(() => {
		if (typeof navigator > "u") return;
		let e = navigator.userAgent, n = navigator.userAgentData != null || /\b(?:Chrome|Chromium|Edg)\//.test(e) && !/\b(?:CriOS|EdgiOS|FxiOS|OPiOS)\b/.test(e) && !/iPhone|iPad|iPod/.test(e);
		t(n);
	}, []), e;
}, He = {
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
}, Ue = ({ dispScale: e, dispersion: t, specular: n, hasSpecular: r, mapMatrix: i, width: a, height: o, mapUrl: s, feImageRef: c }) => {
	let l = i ? "scaledMap" : "map";
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
		/* @__PURE__ */ (0, q.jsx)("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ (0, q.jsx)("feImage", {
			ref: c,
			href: s || void 0,
			x: 0,
			y: 0,
			width: a,
			height: o,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ (0, q.jsx)("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		i && /* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: i,
			result: "scaledMap"
		}),
		t > 0 ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + ue * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + ue * .5 * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
			in: "SourceGraphic",
			in2: l,
			scale: e,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		r && /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, q.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: n,
			k3: "1",
			k4: "0"
		})] })
	] });
}, We = (e) => e == null ? void 0 : Ce(e) ? we(e) : e, Ge = ({ children: e, optics: t, radius: n, width: r, height: i, className: a, style: o, ...s }) => {
	let c = Ve(), l = (0, K.useMemo)(() => ({
		...ce,
		...He,
		...t
	}), [t]), u = (0, K.useId)().replace(/:/g, ""), d = (0, K.useRef)(null), f = (0, K.useRef)(null), p = (0, K.useRef)(null), m = (0, K.useRef)(null), h = (0, K.useRef)(""), g = (0, K.useRef)(0), [_, v] = (0, K.useState)({
		w: 0,
		h: 0,
		r: 0,
		appliedR: void 0
	}), [y, b] = (0, K.useState)(!1), x = _.w > 0 && _.h > 0, S = We(n), C = We(r), w = We(i), T = o?.borderRadius != null, E = (0, K.useRef)(!1);
	(0, K.useLayoutEffect)(() => {
		E.current = !1;
	}, [
		S,
		T,
		a
	]), (0, K.useLayoutEffect)(() => {
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
	]), O = l.scaleX ?? l.strength, k = l.scaleY ?? l.strength, A = Math.max(O, k), j = A * (x ? Math.sqrt((_.w * _.w + _.h * _.h) / 2) : 0), M = x ? Math.ceil(j * (l.dispersion > 0 ? 1.2 : 1) * .5 + 28) : 0, N = A > 0 ? O / A : 1, P = A > 0 ? k / A : 1, F = N === 1 && P === 1 ? null : ge(N, P), I = l.glow > 0 || l.sheen > 0;
	(0, K.useLayoutEffect)(() => {
		if (!x) return;
		let e = l.mapSize;
		(!m.current || m.current.size !== e) && (m.current?.gen.dispose(), m.current = {
			gen: Se(e),
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
	let L = (0, K.useMemo)(() => () => {
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
	(0, K.useEffect)(() => {
		x && L();
	}, [
		x,
		L,
		l.dispersion,
		l.strength,
		l.scaleX,
		l.scaleY,
		l.specular
	]), (0, K.useEffect)(() => () => {
		m.current?.gen.dispose(), m.current = null;
	}, []);
	let R = (0, K.useRef)(!1);
	(0, K.useEffect)(() => {
		if (R.current || !x || typeof getComputedStyle > "u" || typeof document > "u") return;
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
		n && typeof console < "u" && (console.warn("[liquid-glass] <Glass>: the wrapper's background is fully opaque, so it hides the refraction (no glass shows through). Give it an alpha (e.g. `bg-red-400/40` / `rgba(...,0.4)`). (An opaque `background-image` — a solid gradient or photo — hides it the same way.)"), R.current = !0);
	}, [x]);
	let z = (0, K.useMemo)(() => {
		let e = Math.max(0, Math.min(1.5, l.specular));
		return [`inset 0 1px 0 rgba(255,255,255,${(.55 * e).toFixed(3)})`, `inset 0 0 0 1px rgba(255,255,255,${(.12 * e).toFixed(3)})`].join(", ");
	}, [l.specular]), B = o?.position, V = B != null && B !== "static" && B !== "unset" && B !== "initial" ? B : y ? "relative" : void 0, H = l.brightness === 0 ? null : /* @__PURE__ */ (0, q.jsx)("div", {
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
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		ref: d,
		"data-liquid-glass": "material",
		className: a,
		style: {
			display: "inline-block",
			...o,
			...V == null ? null : { position: V },
			...C == null ? null : { width: C },
			...w == null ? null : { height: w },
			..._.appliedR == null ? null : { borderRadius: _.appliedR }
		},
		...s,
		children: [
			H,
			e,
			/* @__PURE__ */ (0, q.jsx)("div", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					borderRadius: "inherit",
					boxShadow: z
				}
			}),
			/* @__PURE__ */ (0, q.jsx)("svg", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				width: 0,
				height: 0,
				style: {
					position: "absolute",
					width: 0,
					height: 0
				},
				children: /* @__PURE__ */ (0, q.jsx)("defs", { children: /* @__PURE__ */ (0, q.jsx)("filter", {
					ref: f,
					id: `lg-mat-${u}-v0`,
					filterUnits: "userSpaceOnUse",
					primitiveUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					x: -M,
					y: -M,
					width: _.w + 2 * M,
					height: _.h + 2 * M,
					children: x && /* @__PURE__ */ (0, q.jsx)(Ue, {
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
}, Ke = () => {
	let [e, t] = (0, K.useState)(!1);
	return (0, K.useEffect)(() => {
		t(typeof navigator < "u" && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent));
	}, []), e;
}, qe = ({ lens: e, mapHref: t, feImageRef: n, mapMatrixRef: r, blurStdDeviation: i, specularFromRawMap: a, brightnessInFilter: o, filterW: s, filterH: c, clipShapeRef: l }) => {
	let u = e.scaleX ?? e.strength, d = e.scaleY ?? e.strength, f = Math.max(u, d), p = f * (s && c ? Math.sqrt((s * s + c * c) / 2) : 1), m = f > 0 ? u / f : 0, h = f > 0 ? d / f : 0, g = m !== 1 || h !== 1, _ = g ? "scaledMap" : "map", v = e.frost > 0 && !!i, y = v ? "blurred" : "SourceGraphic", b = e.glow > 0 || e.sheen > 0, x = e.specular, S = o && e.brightness !== 0, C = v || S;
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
		/* @__PURE__ */ (0, q.jsx)("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ (0, q.jsx)("feImage", {
			ref: n,
			"data-lens": "",
			href: t,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ (0, q.jsx)("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		g && /* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
			ref: r,
			in: "map",
			type: "matrix",
			values: ge(m, h),
			result: "scaledMap"
		}),
		v && /* @__PURE__ */ (0, q.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: i,
			result: "blurred"
		}),
		C && /* @__PURE__ */ (0, q.jsx)("feImage", {
			ref: l,
			"data-lens": "",
			href: le,
			preserveAspectRatio: "none",
			result: "lensShape"
		}),
		e.dispersion > 0 ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 + ue * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 - ue * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ (0, q.jsx)("feDisplacementMap", {
			"data-lens": "",
			in: y,
			in2: _,
			scale: p,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		b && (e.sheenDark ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 0 0 1`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, q.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "1",
			k2: "0",
			k3: "0",
			k4: "0",
			result: "lensOut"
		})] }) : /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, q.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: x,
			k3: "1",
			k4: "0",
			result: "lensOut"
		})] })),
		S && /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)("feFlood", {
				"data-lens": "",
				floodColor: e.brightness > 0 ? "white" : "black",
				floodOpacity: Math.abs(e.brightness),
				result: "brightnessFlood"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "brightnessFlood",
				in2: "lensShape",
				operator: "in",
				result: "brightnessVeil"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "brightnessVeil",
				in2: "lensOut",
				operator: "over",
				result: "lensOut"
			})
		] }),
		C ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "lensOut",
				in2: "lensShape",
				operator: "in",
				result: "lensOut"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "SourceGraphic",
				in2: "lensShape",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] }) : /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)("feFlood", {
				"data-lens": "",
				floodColor: "black",
				floodOpacity: "1",
				result: "lensMask"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "SourceGraphic",
				in2: "lensMask",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ (0, q.jsx)("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] })
	] });
}, Je = ({ children: e, lens: t, x: n = .5, y: r = .5, lensW: i, lensH: a, borderRadius: o, refractionTarget: s, refractionBackground: c = "transparent", overlay: l, tintColor: u, tintOpacity: d, tintBlur: f, shadowOpacity: p, restShadowOpacity: m, edgeBias: h, depth: g, scale: _, filterResolution: v = 1, brightnessInFilter: y = !1, pixelUnits: b = !1, live: x = !1, onLensMapChange: S, className: C, style: w, ...T }) => {
	let E = Ke(), D = (0, K.useRef)(E);
	D.current = E;
	let O = (0, K.useRef)(y);
	O.current = y;
	let k = (0, K.useRef)(b);
	k.current = b;
	let A = (0, K.useRef)(x);
	A.current = x;
	let j = (0, K.useRef)(v);
	j.current = v;
	let M = (0, K.useMemo)(() => ({
		...ce,
		...t
	}), [t]), N = (0, K.useRef)(M);
	N.current = M;
	let P = (0, K.useId)().replace(/:/g, ""), F = (0, K.useRef)(null), I = (0, K.useRef)(null), L = (0, K.useRef)(null), R = (0, K.useRef)(null), z = (0, K.useRef)(null), B = (0, K.useRef)(null), V = (0, K.useRef)(null), H = (0, K.useRef)(null), ee = (0, K.useRef)(null), te = (0, K.useRef)(null), ne = (0, K.useRef)(null), U = (0, K.useRef)(null), re = (0, K.useRef)(null), W = (0, K.useRef)([]), ie = (0, K.useRef)([]), [G, ae] = (0, K.useState)({
		w: 0,
		h: 0
	}), oe = (0, K.useRef)(G);
	oe.current = G;
	let se = G.w > 0 && G.h > 0, de = s != null, [fe, pe] = (0, K.useState)(null);
	(0, K.useLayoutEffect)(() => {
		if (!de || c !== "transparent") {
			pe(null);
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
		pe(t);
	}, [de, c]);
	let me = c === "transparent" ? fe ?? "transparent" : c, he = (0, K.useRef)(.5), _e = (0, K.useRef)(.5), be = (0, K.useRef)(M.lensW), xe = (0, K.useRef)(M.lensH), Te = (0, K.useRef)(M.borderRadius), J = (0, K.useRef)(i !== void 0);
	J.current = i !== void 0;
	let Ee = (0, K.useRef)(a !== void 0);
	Ee.current = a !== void 0;
	let De = (0, K.useRef)(o !== void 0);
	De.current = o !== void 0;
	let Oe = (0, K.useRef)(0), ke = (0, K.useRef)(M.depth), Y = (0, K.useRef)(M.scaleX ?? M.strength), Ae = (0, K.useRef)(M.scaleY ?? M.strength), je = (0, K.useRef)(1), Me = (0, K.useRef)(0), Ne = (0, K.useRef)(1), Pe = (0, K.useRef)(0), Fe = (0, K.useRef)(.5), Ie = (0, K.useRef)(NaN), Le = (0, K.useRef)(NaN), Re = (0, K.useRef)(NaN), ze = (0, K.useRef)(1), Be = (0, K.useRef)(0), Ve = (0, K.useRef)(""), He = (0, K.useRef)(!1), Ue = (0, K.useRef)(null), We = (0, K.useRef)(null), Ge = (0, K.useRef)(null), Je = (0, K.useRef)(u);
	Je.current = u;
	let Ye = (0, K.useRef)(S);
	Ye.current = S;
	let Xe = G.w > 0 && G.h > 0 ? Math.sqrt((G.w * G.w + G.h * G.h) / 2) : 0, Ze = Math.max(M.scaleX ?? M.strength, M.scaleY ?? M.strength);
	if (Xe > 0) {
		let e = typeof i == "number" ? i * 2 : G.w, t = typeof a == "number" ? a * 2 : G.h, n = 1 + ue * M.dispersion;
		Ze = Math.min(Ze, Math.max(e, t) * .6 / (Xe * n));
	}
	let Qe = b && s != null && G.w > 0 && G.h > 0 ? Math.ceil(Ze * Xe * (1 + ue * M.dispersion) * .5 + M.depth + 28) + 16 : 0, $e = (0, K.useRef)(Qe);
	$e.current = Qe, (0, K.useLayoutEffect)(() => {
		let e = F.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect();
			if (!De.current && typeof getComputedStyle < "u") {
				let t = parseFloat(getComputedStyle(e).borderTopLeftRadius) || 0, n = I.current?.firstElementChild;
				!t && n && (t = parseFloat(getComputedStyle(n).borderTopLeftRadius) || 0), Oe.current = t;
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
	let et = (0, K.useCallback)(() => {
		let e = F.current;
		if (!e) return;
		let t = oe.current.w, n = oe.current.h;
		if (!(t > 0 && n > 0)) {
			let r = e.getBoundingClientRect();
			t = r.width, n = r.height;
		}
		if (!(t > 0 && n > 0)) return;
		let r = N.current, i = Y.current, a = Ae.current, o = Math.max(i, a), s = r.dispersion, c = J.current ? be.current : t / 2, l = Ee.current ? xe.current : n / 2, u = De.current ? Te.current : Oe.current, d = he.current * t, f = _e.current * n;
		k.current && L.current && (d = Math.max(c, Math.min(t - c, d)), f = Math.max(l, Math.min(n - l, f)));
		let p = d - c, m = f - l, h = 2 * c, g = 2 * l;
		if (k.current) {
			let e = Math.sqrt((t * t + n * n) / 2), r = 1 + ue * s, i = Math.max(h, g) * .6;
			e > 0 && (o = Math.min(o, i / (e * r)));
		}
		let _ = j.current, v = _ !== 1 && !D.current ? _ : 1, y = D.current ? v * ze.current : v, b = p !== Ie.current || m !== Le.current, x = o !== Re.current;
		if (Ie.current = p, Le.current = m, Re.current = o, b || x || A.current) {
			let e = Fe.current, r = k.current, i = Math.sqrt((t * t + n * n) / 2), a = o * i * (1 + ue * s) * .5, c = Math.ceil(a + ke.current + 28), l = r && L.current ? $e.current : 0, d = String(r ? (p + l + e) * y : (p + e) / t), f = String(r ? (m + l + e) * y : (m + e) / n), _ = String(r ? Math.max(0, h - 2 * e) * y : Math.max(0, h - 2 * e) / t), b = String(r ? Math.max(0, g - 2 * e) * y : Math.max(0, g - 2 * e) / n);
			for (let e of W.current) e.setAttribute("x", d), e.setAttribute("y", f), e.setAttribute("width", _), e.setAttribute("height", b);
			if (x) {
				let e = r ? o * i * y : o, t = s > 0 ? [
					e * (1 + ue * .5 * s),
					e,
					e * (1 - ue * .5 * s)
				] : [e], n = ie.current;
				for (let e = 0; e < n.length; e += 1) n[e].setAttribute("scale", String(t[e] ?? 0));
			}
			let S = te.current;
			if (S) {
				r && (S.setAttribute("x", "0"), S.setAttribute("y", "0"), L.current ? (S.setAttribute("width", String((p + l + h + c) * y)), S.setAttribute("height", String((m + l + g + c) * y))) : (S.setAttribute("width", String(t * y)), S.setAttribute("height", String(n * y)))), Be.current += 1, S.id = `lg-${P}-v${Be.current}`;
				let e = Ue.current ? `url(#${S.id})` : "";
				L.current ? (L.current.style.filter !== e && (L.current.style.filter = e), L.current.style.clipPath = `inset(${Math.max(0, m + l) * v}px ${Math.max(0, t + l - (p + h)) * v}px ${Math.max(0, n + l - (m + g)) * v}px ${Math.max(0, p + l) * v}px round ${u * v}px)`, I.current && !R.current && (I.current.style.filter = "")) : I.current && I.current.style.filter !== e && (I.current.style.filter = e);
			}
		}
		R.current && (R.current.style.clipPath = `inset(${Math.max(0, m) * v}px ${Math.max(0, t - (p + h)) * v}px ${Math.max(0, n - (m + g)) * v}px ${Math.max(0, p) * v}px round ${u * v}px)`), z.current && !R.current && (z.current.style.clipPath = `inset(${Math.max(0, m)}px ${Math.max(0, t - (p + h))}px ${Math.max(0, n - (m + g))}px ${Math.max(0, p)}px round ${u}px)`);
		let S = (e, t) => {
			e.style.transform = `translate(${p}px, ${m}px)`, e.style.width = `${h}px`, e.style.height = `${g}px`, e.style.borderRadius = `${u}px`, t !== void 0 && (e.style.opacity = String(t));
		};
		if (H.current && S(H.current, Ne.current), ee.current && S(ee.current, Pe.current), V.current) {
			V.current.style.transform = `translate3d(${p}px, ${m}px, 0)`, V.current.style.width = `${h}px`, V.current.style.height = `${g}px`, V.current.style.borderRadius = `${u}px`;
			let { uri: e, key: t } = ve(h, g, u);
			if (Ve.current !== t) {
				let n = `url("${e}")`;
				V.current.style.maskImage = n, V.current.style.setProperty("-webkit-mask-image", n), V.current.style.maskSize = "100% 100%", V.current.style.setProperty("-webkit-mask-size", "100% 100%"), Ve.current = t;
			}
		}
		if (B.current) {
			S(B.current);
			let e = Je.current ?? "white";
			B.current.style.background = `color-mix(in srgb, ${e} ${100 * je.current}%, transparent)`, B.current.style.opacity = "1";
			let t = Me.current > 0 ? `blur(${Me.current}px)` : "none";
			B.current.style.backdropFilter = t, B.current.style.setProperty("-webkit-backdrop-filter", t);
		}
		if (re.current) {
			let e = o > 0 ? i / o : 0, t = o > 0 ? a / o : 0;
			re.current.setAttribute("values", ge(e, t));
		}
	}, [P]), tt = (0, K.useCallback)(() => {
		He.current || (He.current = !0, queueMicrotask(() => {
			He.current = !1, et();
		}));
	}, [et]), nt = (0, K.useCallback)(() => {
		Ie.current = NaN, Re.current = NaN, et();
	}, [et]);
	(0, K.useEffect)(() => {
		let e = () => {
			let e = window.innerWidth, t = e > 0 ? window.outerWidth / e : 1;
			return t > .2 && t < 12 ? Math.abs(t - 1) < .04 ? 1 : t : 1;
		}, t = () => {
			let t = e();
			Math.abs(t - ze.current) > .002 && (ze.current = t, nt());
		};
		return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
	}, [nt]);
	let rt = (0, K.useCallback)(() => {
		let e = N.current.mapSize;
		(!Ge.current || Ge.current.size !== e) && (Ge.current?.gen.dispose(), Ge.current = {
			gen: Se(e),
			size: e
		});
		let t = N.current, n = J.current ? be.current : oe.current.w / 2, r = Ee.current ? xe.current : oe.current.h / 2, i = De.current ? Te.current : Oe.current, a = Ge.current.gen.generate({
			lensHalfWidth: n,
			lensHalfHeight: r,
			borderRadius: i,
			depth: ke.current,
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
		if (Ue.current = a, ne.current?.setAttribute("href", a), t.frost > 0 || O.current && t.brightness !== 0) {
			let e = ye(2 * n, 2 * r, i);
			We.current = e.uri, U.current?.setAttribute("href", e.uri);
		}
		Ye.current?.(a), nt();
	}, [nt]), it = (0, K.useRef)(rt);
	it.current = rt;
	let at = JSON.stringify([
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
		Ce(i) ? "mv" : i ?? (G.w / 2 || M.lensW),
		Ce(a) ? "mv" : a ?? (G.h / 2 || M.lensH),
		Ce(o) ? "mv" : o ?? Oe.current,
		Ce(g) ? "mv" : g ?? M.depth,
		y && M.brightness !== 0
	]);
	(0, K.useLayoutEffect)(() => {
		let e = [], t = (t, n, r, i = () => {
			A.current || tt();
		}) => {
			if (t === void 0) {
				n.current = r;
				return;
			}
			Ce(t) ? (n.current = t.get(), e.push(t.on("change", (e) => {
				n.current = e, i();
			}))) : n.current = t;
		};
		return t(n, he, .5), t(r, _e, .5), t(i ?? M.lensW, be, M.lensW), t(a ?? M.lensH, xe, M.lensH), t(o ?? M.borderRadius, Te, M.borderRadius), t(g ?? M.depth, ke, M.depth), t(_ ?? M.scaleX ?? M.strength, Y, M.scaleX ?? M.strength), t(_ ?? M.scaleY ?? M.strength, Ae, M.scaleY ?? M.strength), t(d, je, 1), t(f, Me, 0), t(p, Ne, 1), t(m, Pe, 0), t(h, Fe, .5), et(), () => e.forEach((e) => e());
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
		tt,
		et
	]);
	let ot = M.dispersion > 0, st = M.frost > 0, ct = M.glow > 0 || M.sheen > 0;
	(0, K.useLayoutEffect)(() => {
		let e = te.current;
		W.current = e ? Array.from(e.querySelectorAll("[data-lens]")) : [], ie.current = e ? Array.from(e.querySelectorAll("feDisplacementMap")) : [], ne.current && Ue.current && ne.current.setAttribute("href", Ue.current), U.current && We.current && U.current.setAttribute("href", We.current), nt();
	}, [
		se,
		ot,
		st,
		ct,
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
		nt
	]), (0, K.useLayoutEffect)(() => {
		se && nt();
	}, [
		G.w,
		G.h,
		Qe,
		nt
	]), (0, K.useLayoutEffect)(() => {
		se && it.current();
	}, [se, at]), (0, K.useEffect)(() => {
		let e = [], t, n = () => {
			clearTimeout(t), t = setTimeout(() => it.current(), 90);
		};
		for (let t of [
			i,
			a,
			o,
			g
		]) Ce(t) && e.push(t.on("change", n));
		return () => {
			e.forEach((e) => e()), clearTimeout(t);
		};
	}, [
		i,
		a,
		o,
		g
	]), (0, K.useEffect)(() => () => {
		Ge.current?.gen.dispose(), Ge.current = null, Ye.current?.(null);
	}, []), (0, K.useEffect)(() => {
		if (!x || !se) return;
		let e = 0, t = () => {
			e = requestAnimationFrame(t), et();
		};
		return e = requestAnimationFrame(t), () => cancelAnimationFrame(e);
	}, [
		x,
		se,
		et
	]);
	let lt = v !== 1 && !E ? v : 1, ut = st && se ? b ? `${M.frost * lt}` : `${M.frost / G.w} ${M.frost / G.h}` : void 0, dt = v !== 1 && !E ? v : 1, ft = dt > 1 && l == null && s == null && se, pt = l == null && s == null && !ft && i === void 0, mt = (e, t, n) => /* @__PURE__ */ (0, q.jsx)("div", {
		ref: e,
		style: {
			...n,
			position: "absolute",
			top: 0,
			left: 0,
			width: G.w * dt,
			height: G.h * dt,
			transform: `scale(${1 / dt})`,
			transformOrigin: "top left"
		},
		children: /* @__PURE__ */ (0, q.jsx)("div", {
			style: {
				transform: `scale(${dt})`,
				transformOrigin: "top left",
				width: G.w,
				height: G.h
			},
			children: t
		})
	}), ht = M.brightness !== 0 && !y ? /* @__PURE__ */ (0, q.jsx)("div", {
		ref: z,
		style: {
			position: "absolute",
			inset: 0,
			pointerEvents: "none",
			background: M.brightness > 0 ? "white" : "black",
			opacity: Math.abs(M.brightness)
		}
	}) : null, gt = (e, t, n) => t || n ? /* @__PURE__ */ (0, q.jsx)("div", {
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
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		ref: F,
		"data-liquid-glass": "",
		className: C,
		style: {
			contain: "layout",
			position: "relative",
			overflow: "visible",
			...pt ? { width: "fit-content" } : null,
			...ft ? { minHeight: G.h } : null,
			...w
		},
		...T,
		children: [
			ft ? mt(I, e, { willChange: "filter" }) : l == null && s == null ? /* @__PURE__ */ (0, q.jsx)("div", {
				ref: I,
				style: pt ? { willChange: "filter" } : {
					willChange: "filter",
					position: "relative",
					height: se ? G.h : void 0,
					overflow: "hidden",
					contain: "paint"
				},
				children: e
			}) : l == null && b ? /* @__PURE__ */ (0, q.jsx)("div", {
				ref: I,
				style: {
					position: "absolute",
					inset: 0,
					isolation: "isolate"
				},
				children: e
			}) : /* @__PURE__ */ (0, q.jsx)("div", {
				ref: l == null ? I : void 0,
				style: l == null ? { willChange: "filter" } : void 0,
				children: e
			}),
			s != null && (b ? /* @__PURE__ */ (0, q.jsx)("div", {
				ref: L,
				style: {
					position: "absolute",
					inset: -Qe,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: me
				},
				children: /* @__PURE__ */ (0, q.jsx)("div", {
					style: {
						position: "absolute",
						inset: Qe
					},
					children: s
				})
			}) : dt > 1 ? mt(L, s, {
				pointerEvents: "none",
				willChange: "filter, clip-path",
				background: me
			}) : /* @__PURE__ */ (0, q.jsx)("div", {
				ref: L,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: me
				},
				children: s
			})),
			l != null && /* @__PURE__ */ (0, q.jsxs)("div", {
				ref: R,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [/* @__PURE__ */ (0, q.jsx)("div", {
					ref: I,
					style: { willChange: "filter" },
					children: l
				}), ht]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [
					/* @__PURE__ */ (0, q.jsx)("svg", {
						viewBox: `0 0 ${G.w} ${G.h}`,
						width: "100%",
						height: "100%",
						style: { display: "block" },
						children: /* @__PURE__ */ (0, q.jsx)("defs", { children: /* @__PURE__ */ (0, q.jsx)("filter", {
							ref: te,
							id: `lg-${P}-v0`,
							filterUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							primitiveUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							colorInterpolationFilters: "sRGB",
							x: 0,
							y: 0,
							width: b ? G.w * dt : 1,
							height: b ? G.h * dt : 1,
							children: se && /* @__PURE__ */ (0, q.jsx)(qe, {
								lens: {
									...M,
									scaleX: _ === void 0 ? M.scaleX ?? M.strength : we(_),
									scaleY: _ === void 0 ? M.scaleY ?? M.strength : we(_)
								},
								mapHref: le,
								feImageRef: ne,
								mapMatrixRef: re,
								blurStdDeviation: ut,
								specularFromRawMap: E,
								brightnessInFilter: y,
								filterW: b ? G.w * dt : void 0,
								filterH: b ? G.h * dt : void 0,
								clipShapeRef: U
							})
						}) })
					}),
					l == null && ht,
					u !== void 0 && /* @__PURE__ */ (0, q.jsx)("div", {
						ref: B,
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
			st && e == null && s == null && l == null && /* @__PURE__ */ (0, q.jsx)("div", {
				ref: V,
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
			gt(H, M.edgeShadow, M.edgeInsetShadow),
			gt(ee, M.restEdgeShadow, M.restEdgeInsetShadow)
		]
	});
}, Ye = (e) => (0, K.useMemo)(() => e == null ? void 0 : Ce(e) ? Ee([e], () => e.get() / 2) : e / 2, [e]), Xe = (e) => {
	let { children: t, width: n, height: r, size: i, radius: a, center: o, optics: s, refract: c, behind: l, src: u, draw: d, lenses: f, videoRef: p, paused: m, poster: h, loop: g, muted: _, autoPlay: v, crossOrigin: y, maxDpr: b, unstable_lens: x, ...S } = e, C = {
		...S,
		...x ?? {}
	}, w = o?.x, T = o?.y, [E, D] = Array.isArray(i) ? i : i == null ? [void 0, void 0] : [i, i], O = Ye(n ?? E), k = Ye(r ?? D);
	if (u != null || d != null) return /* @__PURE__ */ (0, q.jsx)(Be, {
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
	let { overlay: A, tintColor: j, tintOpacity: M, tintBlur: N, shadowOpacity: P, restShadowOpacity: F, edgeBias: I, brightnessInFilter: L, depth: R, scale: z, filterResolution: B, pixelUnits: V, live: H, onLensMapChange: ee, ...te } = C, ne = Ce(n) || Ce(r) || Ce(a) || Ce(E) || Ce(D) || Ce(w) || Ce(T);
	return t != null && c == null && u == null && d == null && f == null && A == null && !V && j == null && M == null && N == null && P == null && F == null && I == null && !L && B == null && !H && R == null && z == null && ee == null && w == null && T == null && !ne ? /* @__PURE__ */ (0, q.jsx)(Ge, {
		...te,
		optics: s,
		radius: a,
		width: n ?? E,
		height: r ?? D,
		children: t
	}) : /* @__PURE__ */ (0, q.jsx)(Je, {
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
}, Ze = 176, Qe = 13.6, $e = .34, et = .75, tt = 84, nt = .033, rt = .008, it = .03, at = (e, t, n, r) => {
	(0, K.useEffect)(() => {
		let i = 0, a = 0, o = 0, s = 0, c = e.get(), l = !1, u = (e) => {
			let t = e ** +et / tt, r = t < $e ? t : $e, i = n.current, a = r > i ? r : i;
			return a < $e ? a : $e;
		}, d = (e) => Math.abs(a) < 6e-4 && Math.abs(o) < .006 && e < .006 && n.current === 0, f = (n) => {
			let r = (n - s) / 1e3, p = r < nt ? r : nt;
			s = n;
			let m = e.get(), h = r < rt ? rt : r > it ? it : r, g = Math.abs((m - c) / h);
			c = m;
			let _ = Ze * (u(g) - a) - Qe * o;
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
}, ot = (e, t, n) => {
	let r = e < n ? e / n : 1;
	return t * r * (3 + r * (r - 3));
}, st = K.forwardRef(({ x: e, scaleX: t, scaleY: n, style: r, children: i, ...a }, o) => {
	let s = (0, K.useRef)(null);
	return (0, K.useEffect)(() => {
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
	]), /* @__PURE__ */ (0, q.jsx)("div", {
		ref: (e) => {
			s.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
		},
		style: r,
		...a,
		children: i
	});
});
st.displayName = "GlassDiv";
//#endregion
//#region src/react/refraction-quality.ts
var ct = (0, K.createContext)("high");
function lt() {
	return (0, K.useContext)(ct);
}
function ut(e) {
	return e === "medium" ? 1 : 2;
}
function dt(e, t) {
	return t === "medium" ? {
		...e,
		dispersion: 0
	} : e;
}
//#endregion
//#region src/react/glass-primitives.tsx
var ft = {
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
}, pt = {
	...ft,
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
}, mt = {
	...ft,
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
}, ht = {
	...mt,
	strength: .14,
	curvature: .66,
	frost: 2,
	saturate: 1.45
}, gt = {
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
}, _t = (e) => ({
	...e,
	strength: 0,
	scaleX: 0,
	scaleY: 0,
	curvature: 0,
	dispersion: 0,
	bend: 0
}), vt = {
	regular: {
		card: ft,
		compact: ft,
		control: mt
	},
	clear: {
		card: pt,
		compact: pt,
		control: ht
	}
};
function yt(e, t = "regular", n = "card") {
	let r = vt[t][n];
	return e ? r : _t(r);
}
var bt = "\n  .lg-liquid-surface {\n    --lg-surface-tint: var(--lg-glass-tint);\n    --lg-surface-tint-alpha: var(--lg-glass-tint-alpha);\n    isolation: isolate;\n    background: rgba(var(--lg-surface-tint), var(--lg-surface-tint-alpha));\n  }\n  /*\n   * Filter-free glass for embedded WebViews. Static lighting across the face and\n   * asymmetric inner edges suggest a curved lens without asking the compositor\n   * for backdrop blur, SVG displacement, canvas maps or per-frame updates.\n  */\n  .lg-liquid-surface[data-lg-static-glass=\"\"] {\n    overflow: hidden;\n    background:\n      radial-gradient(135% 105% at 8% -14%, var(--lg-static-glass-highlight) 0%, transparent 47%),\n      radial-gradient(95% 100% at 104% 112%, var(--lg-static-glass-lowlight) 0%, transparent 66%),\n      linear-gradient(132deg, var(--lg-static-glass-sheen) 0%, transparent 38%),\n      rgba(var(--lg-surface-tint), var(--lg-surface-tint-alpha));\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      0 1px 1px var(--lg-glass-inner),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 12px 24px -24px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].lg-liquid-compact {\n    box-shadow:\n      0 3px 10px -3px var(--lg-shadow-glass),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].lg-liquid-control {\n    box-shadow:\n      0 5px 14px rgba(0, 0, 0, 0.32),\n      inset 1px 1px 0 var(--lg-glass-stroke),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 10px 16px -16px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-surface[data-lg-static-glass=\"\"].active {\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      inset 1px 1px 0 var(--lg-glass-stroke-active),\n      inset -1px -1px 0 var(--lg-static-glass-lowlight),\n      inset 0 12px 24px -24px var(--lg-static-glass-highlight);\n  }\n  .lg-liquid-card {\n    box-shadow: 0 10px 26px -8px var(--lg-shadow-glass);\n  }\n  /* A card that is its own switch reads brighter while the entity is on. */\n  .lg-liquid-surface.active {\n    --lg-surface-tint: var(--lg-glass-tint-active);\n    --lg-surface-tint-alpha: var(--lg-glass-tint-active-alpha);\n  }\n  .lg-liquid-card.active {\n    box-shadow:\n      0 10px 26px -8px var(--lg-shadow-glass),\n      inset 0 0 0 1px var(--lg-glass-stroke-active);\n  }\n  .lg-liquid-compact {\n    box-shadow: 0 3px 10px -3px var(--lg-shadow-glass);\n  }\n  .lg-liquid-control {\n    background: rgba(255, 255, 255, 0.32);\n    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.46);\n  }\n  :host([dark]) .lg-liquid-control {\n    background: rgba(255, 255, 255, 0.18);\n  }\n  /*\n   * The DOM refraction route inserts a crisp-content wrapper before its optical\n   * layers. Recreate the surface layout on that wrapper and keep it above the\n   * refracted background. Without this, a card becomes one blank flex item and\n   * the later SVG layer paints over its contents.\n   */\n  .lg-liquid-surface[data-liquid-glass=\"\"] > :first-child {\n    position: relative;\n    z-index: 2;\n    min-width: 0;\n    box-sizing: border-box;\n  }\n  .lg-liquid-card[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    gap: inherit;\n  }\n  /* A row card lays its header out along the wrapper, not down it. */\n  .lg-liquid-card.row[data-liquid-glass=\"\"] > :first-child {\n    flex-direction: row;\n    align-items: center;\n  }\n  .lg-liquid-compact[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: inherit;\n  }\n  .lg-liquid-control[data-liquid-glass=\"\"] > :first-child {\n    width: 100%;\n    height: 100%;\n    display: grid;\n    place-items: center;\n  }\n  /*\n   * The copy the lens refracts stands in for the backdrop, so it has to read as an\n   * even panel: Apple's glass carries its light at the rim, not as a wash across the\n   * middle. A soft top light and a flat tint, with only a hint of the card's accent.\n   */\n  .lg-refraction-source {\n    width: 100%;\n    height: 100%;\n    min-height: inherit;\n    border-radius: inherit;\n    background:\n      radial-gradient(120% 160% at 12% -28%, rgba(255, 255, 255, 0.4), transparent 58%),\n      radial-gradient(80% 120% at 94% 112%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 14%, transparent), transparent 62%),\n      linear-gradient(180deg, rgba(var(--lg-glass-tint), 0.3), rgba(var(--lg-glass-tint), 0.18));\n  }\n  :host([dark]) .lg-refraction-source {\n    background:\n      radial-gradient(120% 160% at 12% -28%, rgba(255, 255, 255, 0.16), transparent 58%),\n      radial-gradient(80% 120% at 94% 112%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 12%, transparent), transparent 62%),\n      linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.04));\n  }\n";
function xt({ refraction: e, frost: t = gt.frost, children: n, ...r }) {
	let i = lt(), a = (0, K.useMemo)(() => dt(t === gt.frost ? gt : {
		...gt,
		frost: t
	}, i), [t, i]);
	return e ? /* @__PURE__ */ (0, q.jsx)(Xe, {
		...r,
		optics: a,
		children: n
	}) : /* @__PURE__ */ (0, q.jsx)("div", {
		...r,
		"data-lg-static-lens": "",
		children: n
	});
}
function St({ refraction: e, variant: t = "regular", surface: n = "card", sourceAccent: r, sourceBackground: i, className: a, children: o, ...s }) {
	let c = lt(), l = e ? /* @__PURE__ */ (0, q.jsx)("div", {
		"aria-hidden": "true",
		className: "lg-refraction-source",
		"data-lg-refraction-source": "copy",
		style: {
			...r ? { "--lg-refraction-accent": r } : {},
			...i ? { background: i } : {}
		}
	}) : void 0, u = `lg-liquid-surface lg-liquid-${n}${a ? ` ${a}` : ""}`;
	return e ? /* @__PURE__ */ (0, q.jsx)(Xe, {
		...s,
		className: u,
		optics: yt(e, t, n),
		refract: l,
		behind: "var(--primary-background-color, transparent)",
		filterResolution: ut(c),
		children: o
	}) : /* @__PURE__ */ (0, q.jsx)("div", {
		...s,
		className: u,
		"data-lg-static-glass": "",
		children: o
	});
}
function X({ icon: e, decorative: t = !0 }) {
	return (0, K.createElement)("lg-icon", {
		icon: e,
		...t ? { "aria-hidden": "true" } : {}
	});
}
//#endregion
//#region src/react/card-parts.tsx
function Ct({ icon: e, style: t, onClick: n }) {
	return /* @__PURE__ */ (0, q.jsx)("div", {
		className: `icon-well${t ? "" : " idle"}`,
		style: t ? {
			"--well-from": t.from,
			"--well-to": t.to,
			"--well-glow": t.glow
		} : void 0,
		onClick: n,
		role: n ? "button" : void 0,
		children: /* @__PURE__ */ (0, q.jsx)(X, { icon: e })
	});
}
function wt({ name: e, state: t, onClick: n }) {
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "title",
		onClick: n,
		children: [/* @__PURE__ */ (0, q.jsx)("div", {
			className: "name",
			children: e
		}), /* @__PURE__ */ (0, q.jsx)("div", {
			className: "state",
			children: t
		})]
	});
}
function Tt({ label: e, style: t }) {
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "badge",
		style: t ? {
			"--badge-color": t.color,
			"--badge-bg": t.bg,
			"--badge-stroke": t.stroke,
			"--badge-glow": t.glow ?? t.color
		} : void 0,
		children: [/* @__PURE__ */ (0, q.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, q.jsx)("span", { children: e })]
	});
}
function Et({ refraction: e, variant: t, icon: n = "mdi:help-circle-outline", name: r, label: i, onOpen: a }) {
	return /* @__PURE__ */ (0, q.jsx)(St, {
		className: "card",
		refraction: e,
		variant: t,
		style: {
			display: "flex",
			position: "relative"
		},
		children: /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "header",
			children: [/* @__PURE__ */ (0, q.jsx)(Ct, {
				icon: n,
				onClick: a
			}), /* @__PURE__ */ (0, q.jsx)(wt, {
				name: r,
				state: i,
				onClick: a
			})]
		})
	});
}
//#endregion
//#region src/react/card-styles.ts
var Dt = "\n  * { box-sizing: border-box; }\n\n  :host {\n    display: block;\n    min-width: 0;\n    container-type: inline-size;\n    font-family: var(--lg-font-jp);\n    color: var(--lg-text-primary);\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  .card {\n    --lg-pad: 20px;\n    --lg-pad-row: 16px;\n    --lg-gap: 18px;\n    --lg-gap-row: 14px;\n    --lg-well: 48px;\n    --lg-well-icon: 24px;\n    --lg-name: 17px;\n    --lg-state: 13px;\n    --lg-label: 13px;\n    --lg-tick: 11px;\n    --lg-corner: var(--lg-radius);\n\n    width: 100%;\n    border-radius: var(--lg-corner);\n    padding: var(--lg-pad);\n    display: flex;\n    flex-direction: column;\n    gap: var(--lg-gap);\n    overflow: hidden;\n    color: var(--lg-text-primary);\n  }\n\n  .card.row {\n    flex-direction: row;\n    align-items: center;\n    gap: var(--lg-gap-row);\n    padding: var(--lg-pad-row) var(--lg-pad);\n  }\n\n  @supports (container-type: inline-size) {\n    .card {\n      --lg-pad: clamp(12px, 5.3cqi, 20px);\n      --lg-pad-row: clamp(10px, 4.2cqi, 16px);\n      --lg-gap: clamp(10px, 4.7cqi, 18px);\n      --lg-gap-row: clamp(9px, 3.7cqi, 14px);\n      --lg-well: clamp(34px, 12.6cqi, 48px);\n      --lg-well-icon: clamp(17px, 6.3cqi, 24px);\n      --lg-name: clamp(13.5px, 4.5cqi, 17px);\n      --lg-state: clamp(11px, 3.4cqi, 13px);\n      --lg-label: clamp(11px, 3.4cqi, 13px);\n      --lg-tick: clamp(9.5px, 2.9cqi, 11px);\n      --lg-corner: min(var(--lg-radius), 11cqi);\n    }\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    gap: var(--lg-gap-row);\n    min-height: var(--lg-well);\n  }\n  .title {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    cursor: pointer;\n  }\n  .name {\n    font-size: var(--lg-name);\n    font-weight: 600;\n    line-height: 1.3;\n    color: var(--lg-text-primary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .state {\n    font-size: var(--lg-state);\n    line-height: 1.35;\n    color: var(--lg-text-secondary);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .icon-well {\n    flex: none;\n    width: var(--lg-well);\n    height: var(--lg-well);\n    border-radius: 50%;\n    display: grid;\n    place-items: center;\n    color: #fff;\n    background: linear-gradient(180deg, var(--well-from, #ffd36b), var(--well-to, var(--lg-accent-deep)));\n    box-shadow:\n      0 4px 12px var(--well-glow, rgba(255, 165, 48, 0.24)),\n      0 1px 1px rgba(255, 255, 255, 0.7),\n      inset 0 0 0 1px rgba(255, 255, 255, 0.5);\n    cursor: pointer;\n    transition:\n      --well-from 0.42s ease,\n      --well-to 0.42s ease,\n      --well-glow 0.42s ease,\n      background 0.25s ease,\n      box-shadow 0.25s ease;\n  }\n  .icon-well.idle {\n    background: var(--lg-track-bg);\n    color: var(--lg-text-secondary);\n    box-shadow:\n      0 1px 1px var(--lg-glass-inner),\n      inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .icon-well lg-icon {\n    --mdc-icon-size: var(--lg-well-icon);\n    width: var(--lg-well-icon);\n    height: var(--lg-well-icon);\n  }\n\n  .badge {\n    flex: 0 1 auto;\n    min-width: 0;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 14px;\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--badge-color, var(--lg-text-secondary));\n    background: var(--badge-bg, var(--lg-track-bg));\n    box-shadow: inset 0 0 0 1px var(--badge-stroke, var(--lg-glass-stroke));\n    white-space: nowrap;\n  }\n  .badge > span:last-child {\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n  .badge .dot {\n    flex: none;\n    width: 8px;\n    height: 8px;\n    border-radius: 4px;\n    background: var(--badge-color, var(--lg-text-secondary));\n    box-shadow: 0 0 6px var(--badge-glow, transparent);\n  }\n\n  .chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n  .chip {\n    position: relative;\n    isolation: isolate;\n    overflow: hidden;\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 9px 14px;\n    border: 0;\n    border-radius: 18px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    font: inherit;\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    cursor: pointer;\n    min-width: 0;\n    max-width: 100%;\n  }\n\n  .section {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .label-row {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 8px;\n    font-size: var(--lg-label);\n  }\n  .label-row .label {\n    color: var(--lg-text-secondary);\n    font-weight: 500;\n    min-width: 0;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .label-row .value {\n    flex: none;\n    color: var(--lg-text-primary);\n    font-weight: 600;\n    font-family: var(--lg-font-ui);\n    letter-spacing: -0.2px;\n    font-variant-numeric: tabular-nums;\n  }\n\n  .round-btn {\n    --btn: 56px;\n    flex: none;\n    width: var(--btn);\n    height: var(--btn);\n    border: 0;\n    border-radius: 50%;\n    background: var(--lg-track-bg);\n    box-shadow:\n      0 1px 1px var(--lg-glass-inner),\n      inset 0 0 0 1px var(--lg-glass-stroke);\n    color: var(--lg-text-primary);\n    display: grid;\n    place-items: center;\n    cursor: pointer;\n    padding: 0;\n    transition: background 0.2s ease, color 0.2s ease;\n  }\n  .round-btn:active {\n    background: var(--lg-segment-selected);\n  }\n  .round-btn lg-icon {\n    --mdc-icon-size: calc(var(--btn) * 0.43);\n    width: calc(var(--btn) * 0.43);\n    height: calc(var(--btn) * 0.43);\n  }\n  @supports (container-type: inline-size) {\n    .round-btn {\n      --btn: clamp(38px, 14.7cqi, 56px);\n    }\n  }\n\n  .segment {\n    display: flex;\n    gap: 2px;\n    padding: 3px;\n    border-radius: 18px;\n    background: var(--lg-track-bg);\n    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);\n  }\n  .segment > button {\n    flex: 1;\n    min-width: 0;\n    height: 30px;\n    border: 0;\n    border-radius: 15px;\n    background: transparent;\n    color: var(--lg-text-secondary);\n    font: inherit;\n    font-size: var(--lg-label);\n    font-weight: 500;\n    cursor: pointer;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 4px;\n    padding: 0;\n    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;\n  }\n  .segment > button.selected {\n    background: var(--lg-segment-selected);\n    color: var(--lg-text-primary);\n    font-weight: 600;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);\n  }\n\n  .dim {\n    opacity: 0.45;\n  }\n  .muted {\n    opacity: 0.6;\n  }\n\n  .ticks {\n    display: flex;\n    justify-content: space-between;\n    padding: 0 4px;\n    font-family: var(--lg-font-ui);\n    font-size: var(--lg-tick);\n    font-weight: 500;\n    color: var(--lg-text-secondary);\n  }\n\n  @container (max-width: 250px) {\n    .badge { display: none; }\n  }\n  @container (max-width: 280px) {\n    .chip { padding: 8px 11px; }\n  }\n\n  button { font-family: inherit; }\n  button:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n\n  @media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after {\n      transition-duration: 0.01ms !important;\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n    }\n  }\n", Ot = class extends HTMLElement {
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
customElements.get("lg-icon") || customElements.define("lg-icon", Ot);
//#endregion
//#region src/editor/load.ts
var kt;
function At() {
	return kt || (kt = (async () => {
		let e = window.loadCardHelpers;
		if (e) try {
			await ((await e()).createCardElement?.({
				type: "entities",
				entities: []
			})?.constructor)?.getConfigElement?.();
		} catch {}
	})()), kt;
}
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
var jt = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && j(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), Mt = /* @__PURE__ */ o(((e, t) => {
	t.exports = jt();
})), Nt = /* @__PURE__ */ o(((e) => {
	var t = ae();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = c(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = c(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), Pt = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = Nt();
})), Ft = /* @__PURE__ */ o(((e) => {
	var t = Mt(), n = ae(), r = Pt();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var f = Object.assign, p = Symbol.for("react.element"), m = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), b = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), D = Symbol.for("react.memo_cache_sentinel"), O = Symbol.iterator;
	function k(e) {
		return typeof e != "object" || !e ? null : (e = O && e[O] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var A = Symbol.for("react.client.reference");
	function j(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === A ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case g: return "Fragment";
			case v: return "Profiler";
			case _: return "StrictMode";
			case S: return "Suspense";
			case C: return "SuspenseList";
			case E: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case h: return "Portal";
			case b: return e.displayName || "Context";
			case y: return (e._context.displayName || "Context") + ".Consumer";
			case x:
				var t = e.render;
				return e = e.displayName, e || (e = t.displayName || t.name || "", e = e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case w: return t = e.displayName || null, t === null ? j(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return j(e(t));
				} catch {}
		}
		return null;
	}
	var M = Array.isArray, N = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, I = [], L = -1;
	function R(e) {
		return { current: e };
	}
	function z(e) {
		0 > L || (e.current = I[L], I[L] = null, L--);
	}
	function B(e, t) {
		L++, I[L] = e.current, e.current = t;
	}
	var V = R(null), H = R(null), ee = R(null), te = R(null);
	function ne(e, t) {
		switch (B(ee, t), B(H, e), B(V, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		z(V), B(V, e);
	}
	function U() {
		z(V), z(H), z(ee);
	}
	function re(e) {
		e.memoizedState !== null && B(te, e);
		var t = V.current, n = Hd(t, e.type);
		t !== n && (B(H, e), B(V, n));
	}
	function W(e) {
		H.current === e && (z(V), z(H)), te.current === e && (z(te), Qf._currentValue = F);
	}
	var ie, G;
	function oe(e) {
		if (ie === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ie = t && t[1] || "", G = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ie + e + G;
	}
	var se = !1;
	function K(e, t) {
		if (!e || se) return "";
		se = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? oe(n) : "";
	}
	function q(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return oe(e.type);
			case 16: return oe("Lazy");
			case 13: return e.child !== t && t !== null ? oe("Suspense Fallback") : oe("Suspense");
			case 19: return oe("SuspenseList");
			case 0:
			case 15: return K(e.type, !1);
			case 11: return K(e.type.render, !1);
			case 1: return K(e.type, !0);
			case 31: return oe("Activity");
			default: return "";
		}
	}
	function ce(e) {
		try {
			var t = "", n = null;
			do
				t += q(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var le = Object.prototype.hasOwnProperty, ue = t.unstable_scheduleCallback, de = t.unstable_cancelCallback, fe = t.unstable_shouldYield, pe = t.unstable_requestPaint, me = t.unstable_now, he = t.unstable_getCurrentPriorityLevel, ge = t.unstable_ImmediatePriority, _e = t.unstable_UserBlockingPriority, ve = t.unstable_NormalPriority, ye = t.unstable_LowPriority, be = t.unstable_IdlePriority, xe = t.log, Se = t.unstable_setDisableYieldValue, Ce = null, we = null;
	function Te(e) {
		if (typeof xe == "function" && Se(e), we && typeof we.setStrictMode == "function") try {
			we.setStrictMode(Ce, e);
		} catch {}
	}
	var J = Math.clz32 ? Math.clz32 : Oe, Ee = Math.log, De = Math.LN2;
	function Oe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ee(e) / De | 0) | 0;
	}
	var ke = 256, Y = 262144, Ae = 4194304;
	function je(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Me(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = je(n))) : i = je(o) : i = je(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = je(n))) : i = je(o)) : i = je(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Ne(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Pe(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Fe() {
		var e = Ae;
		return Ae <<= 1, !(Ae & 62914560) && (Ae = 4194304), e;
	}
	function Ie(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Le(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Re(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - J(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ze(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ze(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - J(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Be(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - J(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ve(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : He(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function He(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function Ue(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function We() {
		var e = P.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function Ge(e, t) {
		var n = P.p;
		try {
			return P.p = e, t();
		} finally {
			P.p = n;
		}
	}
	var Ke = Math.random().toString(36).slice(2), qe = "__reactFiber$" + Ke, Je = "__reactProps$" + Ke, Ye = "__reactContainer$" + Ke, Xe = "__reactEvents$" + Ke, Ze = "__reactListeners$" + Ke, Qe = "__reactHandles$" + Ke, $e = "__reactResources$" + Ke, et = "__reactMarker$" + Ke;
	function tt(e) {
		delete e[qe], delete e[Je], delete e[Xe], delete e[Ze], delete e[Qe];
	}
	function nt(e) {
		var t = e[qe];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ye] || n[qe]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[qe]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function rt(e) {
		if (e = e[qe] || e[Ye]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function it(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function at(e) {
		var t = e[$e];
		return t || (t = e[$e] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}), t;
	}
	function ot(e) {
		e[et] = !0;
	}
	var st = /* @__PURE__ */ new Set(), ct = {};
	function lt(e, t) {
		ut(e, t), ut(e + "Capture", t);
	}
	function ut(e, t) {
		for (ct[e] = t, e = 0; e < t.length; e++) st.add(t[e]);
	}
	var dt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), ft = {}, pt = {};
	function mt(e) {
		return le.call(pt, e) ? !0 : le.call(ft, e) ? !1 : dt.test(e) ? pt[e] = !0 : (ft[e] = !0, !1);
	}
	function ht(e, t, n) {
		if (mt(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, "" + n);
			}
		}
	}
	function gt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function _t(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function vt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function yt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function bt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function xt(e) {
		if (!e._valueTracker) {
			var t = yt(e) ? "checked" : "value";
			e._valueTracker = bt(e, t, "" + e[t]);
		}
	}
	function St(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = yt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function X(e) {
		if (e = e || (typeof document < "u" ? document : void 0), e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ct = /[\n"\\]/g;
	function wt(e) {
		return e.replace(Ct, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Tt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + vt(t)) : e.value !== "" + vt(t) && (e.value = "" + vt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Dt(e, o, vt(n)) : Dt(e, o, vt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + vt(s) : e.removeAttribute("name");
	}
	function Et(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				xt(e);
				return;
			}
			n = n == null ? "" : "" + vt(n), t = t == null ? n : "" + vt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r = r ?? i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), xt(e);
	}
	function Dt(e, t, n) {
		t === "number" && X(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Ot(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + vt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function kt(e, t, n) {
		if (t != null && (t = "" + vt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + vt(n);
	}
	function At(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (M(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ?? (n = ""), t = n;
		}
		n = vt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), xt(e);
	}
	function jt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Nt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Ft(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Nt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function It(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Ft(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Ft(e, o, t[o]);
	}
	function Lt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Rt = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), zt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Bt(e) {
		return zt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Vt() {}
	var Ht = null;
	function Ut(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Wt = null, Gt = null;
	function Kt(e) {
		var t = rt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Je] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Tt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + wt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Je] || null;
								if (!a) throw Error(i(90));
								Tt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && St(r);
					}
					break a;
				case "textarea":
					kt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Ot(e, !!n.multiple, t, !1);
			}
		}
	}
	var qt = !1;
	function Jt(e, t, n) {
		if (qt) return e(t, n);
		qt = !0;
		try {
			return e(t);
		} finally {
			if (qt = !1, (Wt !== null || Gt !== null) && (vu(), Wt && (t = Wt, e = Gt, Gt = Wt = null, Kt(t), e))) for (t = 0; t < e.length; t++) Kt(e[t]);
		}
	}
	function Yt(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Je] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var Xt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Zt = !1;
	if (Xt) try {
		var Qt = {};
		Object.defineProperty(Qt, "passive", { get: function() {
			Zt = !0;
		} }), window.addEventListener("test", Qt, Qt), window.removeEventListener("test", Qt, Qt);
	} catch {
		Zt = !1;
	}
	var $t = null, en = null, tn = null;
	function nn() {
		if (tn) return tn;
		var e, t = en, n = t.length, r, i = "value" in $t ? $t.value : $t.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return tn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function rn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function an() {
		return !0;
	}
	function on() {
		return !1;
	}
	function sn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? an : on, this.isPropagationStopped = on, this;
		}
		return f(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = an);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = an);
			},
			persist: function() {},
			isPersistent: an
		}), t;
	}
	var cn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, ln = sn(cn), un = f({}, cn, {
		view: 0,
		detail: 0
	}), dn = sn(un), fn, pn, mn, hn = f({}, un, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: En,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== mn && (mn && e.type === "mousemove" ? (fn = e.screenX - mn.screenX, pn = e.screenY - mn.screenY) : pn = fn = 0, mn = e), fn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : pn;
		}
	}), gn = sn(hn), _n = sn(f({}, hn, { dataTransfer: 0 })), vn = sn(f({}, un, { relatedTarget: 0 })), yn = sn(f({}, cn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), bn = sn(f({}, cn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), xn = sn(f({}, cn, { data: 0 })), Sn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Cn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, wn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Tn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = wn[e]) ? !!t[e] : !1;
	}
	function En() {
		return Tn;
	}
	var Dn = sn(f({}, un, {
		key: function(e) {
			if (e.key) {
				var t = Sn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = rn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Cn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: En,
		charCode: function(e) {
			return e.type === "keypress" ? rn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? rn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), On = sn(f({}, hn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), kn = sn(f({}, un, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: En
	})), An = sn(f({}, cn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), jn = sn(f({}, hn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Mn = sn(f({}, cn, {
		newState: 0,
		oldState: 0
	})), Nn = [
		9,
		13,
		27,
		32
	], Pn = Xt && "CompositionEvent" in window, Fn = null;
	Xt && "documentMode" in document && (Fn = document.documentMode);
	var In = Xt && "TextEvent" in window && !Fn, Ln = Xt && (!Pn || Fn && 8 < Fn && 11 >= Fn), Rn = " ", zn = !1;
	function Bn(e, t) {
		switch (e) {
			case "keyup": return Nn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Vn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Hn = !1;
	function Un(e, t) {
		switch (e) {
			case "compositionend": return Vn(t);
			case "keypress": return t.which === 32 ? (zn = !0, Rn) : null;
			case "textInput": return e = t.data, e === Rn && zn ? null : e;
			default: return null;
		}
	}
	function Wn(e, t) {
		if (Hn) return e === "compositionend" || !Pn && Bn(e, t) ? (e = nn(), tn = en = $t = null, Hn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Ln && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Gn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Kn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Gn[e.type] : t === "textarea";
	}
	function qn(e, t, n, r) {
		Wt ? Gt ? Gt.push(r) : Gt = [r] : Wt = r, t = Td(t, "onChange"), 0 < t.length && (n = new ln("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Jn = null, Yn = null;
	function Xn(e) {
		vd(e, 0);
	}
	function Zn(e) {
		if (St(it(e))) return e;
	}
	function Qn(e, t) {
		if (e === "change") return t;
	}
	var $n = !1;
	if (Xt) {
		var er;
		if (Xt) {
			var tr = "oninput" in document;
			if (!tr) {
				var nr = document.createElement("div");
				nr.setAttribute("oninput", "return;"), tr = typeof nr.oninput == "function";
			}
			er = tr;
		} else er = !1;
		$n = er && (!document.documentMode || 9 < document.documentMode);
	}
	function rr() {
		Jn && (Jn.detachEvent("onpropertychange", ir), Yn = Jn = null);
	}
	function ir(e) {
		if (e.propertyName === "value" && Zn(Yn)) {
			var t = [];
			qn(t, Yn, e, Ut(e)), Jt(Xn, t);
		}
	}
	function ar(e, t, n) {
		e === "focusin" ? (rr(), Jn = t, Yn = n, Jn.attachEvent("onpropertychange", ir)) : e === "focusout" && rr();
	}
	function or(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zn(Yn);
	}
	function sr(e, t) {
		if (e === "click") return Zn(t);
	}
	function cr(e, t) {
		if (e === "input" || e === "change") return Zn(t);
	}
	function lr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var ur = typeof Object.is == "function" ? Object.is : lr;
	function dr(e, t) {
		if (ur(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!le.call(t, i) || !ur(e[i], t[i])) return !1;
		}
		return !0;
	}
	function fr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function pr(e, t) {
		var n = fr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = fr(n);
		}
	}
	function mr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? mr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function hr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = X(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = X(e.document);
		}
		return t;
	}
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var _r = Xt && "documentMode" in document && 11 >= document.documentMode, vr = null, yr = null, br = null, xr = !1;
	function Sr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		xr || vr == null || vr !== X(r) || (r = vr, "selectionStart" in r && gr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), br && dr(br, r) || (br = r, r = Td(yr, "onSelect"), 0 < r.length && (t = new ln("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = vr)));
	}
	function Cr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var wr = {
		animationend: Cr("Animation", "AnimationEnd"),
		animationiteration: Cr("Animation", "AnimationIteration"),
		animationstart: Cr("Animation", "AnimationStart"),
		transitionrun: Cr("Transition", "TransitionRun"),
		transitionstart: Cr("Transition", "TransitionStart"),
		transitioncancel: Cr("Transition", "TransitionCancel"),
		transitionend: Cr("Transition", "TransitionEnd")
	}, Tr = {}, Er = {};
	Xt && (Er = document.createElement("div").style, "AnimationEvent" in window || (delete wr.animationend.animation, delete wr.animationiteration.animation, delete wr.animationstart.animation), "TransitionEvent" in window || delete wr.transitionend.transition);
	function Dr(e) {
		if (Tr[e]) return Tr[e];
		if (!wr[e]) return e;
		var t = wr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Er) return Tr[e] = t[n];
		return e;
	}
	var Or = Dr("animationend"), kr = Dr("animationiteration"), Ar = Dr("animationstart"), jr = Dr("transitionrun"), Mr = Dr("transitionstart"), Nr = Dr("transitioncancel"), Pr = Dr("transitionend"), Fr = /* @__PURE__ */ new Map(), Ir = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Ir.push("scrollEnd");
	function Lr(e, t) {
		Fr.set(e, t), lt(t, [e]);
	}
	var Rr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, zr = [], Br = 0, Vr = 0;
	function Hr() {
		for (var e = Br, t = Vr = Br = 0; t < e;) {
			var n = zr[t];
			zr[t++] = null;
			var r = zr[t];
			zr[t++] = null;
			var i = zr[t];
			zr[t++] = null;
			var a = zr[t];
			if (zr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Kr(n, i, a);
		}
	}
	function Ur(e, t, n, r) {
		zr[Br++] = e, zr[Br++] = t, zr[Br++] = n, zr[Br++] = r, Vr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Wr(e, t, n, r) {
		return Ur(e, t, n, r), qr(e);
	}
	function Gr(e, t) {
		return Ur(e, null, null, t), qr(e);
	}
	function Kr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - J(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function qr(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Jr = {};
	function Yr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Xr(e, t, n, r) {
		return new Yr(e, t, n, r);
	}
	function Zr(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Qr(e, t) {
		var n = e.alternate;
		return n === null ? (n = Xr(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function $r(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ei(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") Zr(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, V.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case E: return e = Xr(31, n, t, a), e.elementType = E, e.lanes = o, e;
			case g: return ti(n.children, a, o, t);
			case _:
				s = 8, a |= 24;
				break;
			case v: return e = Xr(12, n, t, a | 2), e.elementType = v, e.lanes = o, e;
			case S: return e = Xr(13, n, t, a), e.elementType = S, e.lanes = o, e;
			case C: return e = Xr(19, n, t, a), e.elementType = C, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case b:
						s = 10;
						break a;
					case y:
						s = 9;
						break a;
					case x:
						s = 11;
						break a;
					case w:
						s = 14;
						break a;
					case T:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Xr(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ti(e, t, n, r) {
		return e = Xr(7, e, r, t), e.lanes = n, e;
	}
	function ni(e, t, n) {
		return e = Xr(6, e, null, t), e.lanes = n, e;
	}
	function ri(e) {
		var t = Xr(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ii(e, t, n) {
		return t = Xr(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ai = /* @__PURE__ */ new WeakMap();
	function oi(e, t) {
		if (typeof e == "object" && e) {
			var n = ai.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ce(t)
			}, ai.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ce(t)
		};
	}
	var si = [], ci = 0, li = null, ui = 0, di = [], fi = 0, pi = null, mi = 1, hi = "";
	function gi(e, t) {
		si[ci++] = ui, si[ci++] = li, li = e, ui = t;
	}
	function _i(e, t, n) {
		di[fi++] = mi, di[fi++] = hi, di[fi++] = pi, pi = e;
		var r = mi;
		e = hi;
		var i = 32 - J(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - J(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, mi = 1 << 32 - J(t) + i | n << i | r, hi = a + e;
		} else mi = 1 << a | n << i | r, hi = e;
	}
	function vi(e) {
		e.return !== null && (gi(e, 1), _i(e, 1, 0));
	}
	function yi(e) {
		for (; e === li;) li = si[--ci], si[ci] = null, ui = si[--ci], si[ci] = null;
		for (; e === pi;) pi = di[--fi], di[fi] = null, hi = di[--fi], di[fi] = null, mi = di[--fi], di[fi] = null;
	}
	function bi(e, t) {
		di[fi++] = mi, di[fi++] = hi, di[fi++] = pi, mi = t.id, hi = t.overflow, pi = e;
	}
	var xi = null, Si = null, Ci = !1, wi = null, Ti = !1, Ei = Error(i(519));
	function Di(e) {
		throw Ni(oi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ei;
	}
	function Oi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[qe] = e, t[Je] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) $(gd[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), Et(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), At(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Vt), t = !0) : t = !1, t || Di(e, !0);
	}
	function ki(e) {
		for (xi = e.return; xi;) switch (xi.tag) {
			case 5:
			case 31:
			case 13:
				Ti = !1;
				return;
			case 27:
			case 3:
				Ti = !0;
				return;
			default: xi = xi.return;
		}
	}
	function Ai(e) {
		if (e !== xi) return !1;
		if (!Ci) return ki(e), Ci = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && Si && Di(e), ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Si = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Si = uf(e);
		} else t === 27 ? (t = Si, Zd(e.type) ? (e = lf, lf = null, Si = e) : Si = t) : Si = xi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ji() {
		Si = xi = null, Ci = !1;
	}
	function Mi() {
		var e = wi;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), wi = null), e;
	}
	function Ni(e) {
		wi === null ? wi = [e] : wi.push(e);
	}
	var Pi = R(null), Fi = null, Ii = null;
	function Li(e, t, n) {
		B(Pi, t._currentValue), t._currentValue = n;
	}
	function Ri(e) {
		e._currentValue = Pi.current, z(Pi);
	}
	function zi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Bi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), zi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), zi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Vi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					ur(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === te.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Bi(t, e, n, r), t.flags |= 262144;
	}
	function Hi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!ur(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ui(e) {
		Fi = e, Ii = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Wi(e) {
		return Ki(Fi, e);
	}
	function Gi(e, t) {
		return Fi === null && Ui(e), Ki(e, t);
	}
	function Ki(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ii === null) {
			if (e === null) throw Error(i(308));
			Ii = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ii = Ii.next = t;
		return n;
	}
	var qi = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Ji = t.unstable_scheduleCallback, Yi = t.unstable_NormalPriority, Xi = {
		$$typeof: b,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Zi() {
		return {
			controller: new qi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Qi(e) {
		e.refCount--, e.refCount === 0 && Ji(Yi, function() {
			e.controller.abort();
		});
	}
	var $i = null, ea = 0, ta = 0, na = null;
	function ra(e, t) {
		if ($i === null) {
			var n = $i = [];
			ea = 0, ta = ud(), na = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ea++, t.then(ia, ia), t;
	}
	function ia() {
		if (--ea === 0 && $i !== null) {
			na !== null && (na.status = "fulfilled");
			var e = $i;
			$i = null, ta = 0, na = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function aa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var oa = N.S;
	N.S = function(e, t) {
		Ql = me(), typeof t == "object" && t && typeof t.then == "function" && ra(e, t), oa !== null && oa(e, t);
	};
	var sa = R(null);
	function ca() {
		var e = sa.current;
		return e === null ? Pl.pooledCache : e;
	}
	function la(e, t) {
		t === null ? B(sa, sa.current) : B(sa, t.pool);
	}
	function ua() {
		var e = ca();
		return e === null ? null : {
			parent: Xi._currentValue,
			pool: e
		};
	}
	var da = Error(i(460)), fa = Error(i(474)), pa = Error(i(542)), ma = { then: function() {} };
	function ha(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ga(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Vt, Vt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ba(e), e;
			default:
				if (typeof t.status == "string") t.then(Vt, Vt);
				else {
					if (e = Pl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ba(e), e;
				}
				throw va = t, da;
		}
	}
	function _a(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (va = e, da) : e;
		}
	}
	var va = null;
	function ya() {
		if (va === null) throw Error(i(459));
		var e = va;
		return va = null, e;
	}
	function ba(e) {
		if (e === da || e === pa) throw Error(i(483));
	}
	var xa = null, Sa = 0;
	function Ca(e) {
		var t = Sa;
		return Sa += 1, xa === null && (xa = []), ga(xa, e, t);
	}
	function wa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ta(e, t) {
		throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ea(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Qr(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ni(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && _a(i) === t.type) ? (t = a(t, n.props), wa(t, n), t.return = e, t) : (t = ei(n.type, n.key, n.props, null, e.mode, r), wa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ii(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ti(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ni("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case m: return n = ei(t.type, t.key, t.props, null, e.mode, n), wa(n, t), n.return = e, n;
					case h: return t = ii(t, e.mode, n), t.return = e, t;
					case T: return t = _a(t), f(e, t, n);
				}
				if (M(t) || k(t)) return t = ti(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ca(t), n);
				if (t.$$typeof === b) return f(e, Gi(e, t), n);
				Ta(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case m: return n.key === i ? l(e, t, n, r) : null;
					case h: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = _a(n), p(e, t, n, r);
				}
				if (M(n) || k(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ca(n), r);
				if (n.$$typeof === b) return p(e, t, Gi(e, n), r);
				Ta(e, n);
			}
			return null;
		}
		function _(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case m: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case h: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = _a(r), _(e, t, n, r, i);
				}
				if (M(r) || k(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return _(e, t, n, Ca(r), i);
				if (r.$$typeof === b) return _(e, t, n, Gi(t, r), i);
				Ta(t, r);
			}
			return null;
		}
		function v(i, a, s, c) {
			for (var l = null, u = null, d = a, m = a = 0, h = null; d !== null && m < s.length; m++) {
				d.index > m ? (h = d, d = null) : h = d.sibling;
				var g = p(i, d, s[m], c);
				if (g === null) {
					d === null && (d = h);
					break;
				}
				e && d && g.alternate === null && t(i, d), a = o(g, a, m), u === null ? l = g : u.sibling = g, u = g, d = h;
			}
			if (m === s.length) return n(i, d), Ci && gi(i, m), l;
			if (d === null) {
				for (; m < s.length; m++) d = f(i, s[m], c), d !== null && (a = o(d, a, m), u === null ? l = d : u.sibling = d, u = d);
				return Ci && gi(i, m), l;
			}
			for (d = r(d); m < s.length; m++) h = _(d, i, m, s[m], c), h !== null && (e && h.alternate !== null && d.delete(h.key === null ? m : h.key), a = o(h, a, m), u === null ? l = h : u.sibling = h, u = h);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), Ci && gi(i, m), l;
		}
		function y(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, m = s, h = s = 0, g = null, v = c.next(); m !== null && !v.done; h++, v = c.next()) {
				m.index > h ? (g = m, m = null) : g = m.sibling;
				var y = p(a, m, v.value, l);
				if (y === null) {
					m === null && (m = g);
					break;
				}
				e && m && y.alternate === null && t(a, m), s = o(y, s, h), d === null ? u = y : d.sibling = y, d = y, m = g;
			}
			if (v.done) return n(a, m), Ci && gi(a, h), u;
			if (m === null) {
				for (; !v.done; h++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
				return Ci && gi(a, h), u;
			}
			for (m = r(m); !v.done; h++, v = c.next()) v = _(m, a, h, v.value, l), v !== null && (e && v.alternate !== null && m.delete(v.key === null ? h : v.key), s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
			return e && m.forEach(function(e) {
				return t(a, e);
			}), Ci && gi(a, h), u;
		}
		function x(e, r, o, c) {
			if (typeof o == "object" && o && o.type === g && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case m:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === g) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && _a(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), wa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === g ? (c = ti(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ei(o.type, o.key, o.props, null, e.mode, c), wa(c, o), c.return = e, e = c);
						}
						return s(e);
					case h:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = ii(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = _a(o), x(e, r, o, c);
				}
				if (M(o)) return v(e, r, o, c);
				if (k(o)) {
					if (l = k(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return x(e, r, Ca(o), c);
				if (o.$$typeof === b) return x(e, r, Gi(e, o), c);
				Ta(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ni(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Sa = 0;
				var i = x(e, t, n, r);
				return xa = null, i;
			} catch (t) {
				if (t === da || t === pa) throw t;
				var a = Xr(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Da = Ea(!0), Oa = Ea(!1), ka = !1;
	function Aa(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function ja(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ma(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Na(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Nl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = qr(e), Kr(e, null, n), t;
		}
		return Ur(e, r, t, n), qr(e);
	}
	function Pa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Be(e, n);
		}
	}
	function Fa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ia = !1;
	function La() {
		if (Ia) {
			var e = na;
			if (e !== null) throw e;
		}
	}
	function Ra(e, t, n, r) {
		Ia = !1;
		var i = e.updateQueue;
		ka = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var p = s.lane & -536870913, m = p !== s.lane;
				if (m ? (Fl & p) === p : (r & p) === p) {
					p !== 0 && p === ta && (Ia = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						p = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, p);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, p = typeof h == "function" ? h.call(_, d, p) : h, p == null) break a;
								d = f({}, d, p);
								break a;
							case 2: ka = !0;
						}
					}
					p = s.callback, p !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [p] : m.push(p));
				} else m = {
					lane: p,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= p;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function za(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ba(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) za(n[e], t);
	}
	var Va = R(null), Ha = R(0);
	function Ua(e, t) {
		e = Vl, B(Ha, e), B(Va, t), Vl = e | t.baseLanes;
	}
	function Wa() {
		B(Ha, Vl), B(Va, Va.current);
	}
	function Ga() {
		Vl = Ha.current, z(Va), z(Ha);
	}
	var Ka = R(null), qa = null;
	function Ja(e) {
		var t = e.alternate;
		B($a, $a.current & 1), B(Ka, e), qa === null && (t === null || Va.current !== null || t.memoizedState !== null) && (qa = e);
	}
	function Ya(e) {
		B($a, $a.current), B(Ka, e), qa === null && (qa = e);
	}
	function Xa(e) {
		e.tag === 22 ? (B($a, $a.current), B(Ka, e), qa === null && (qa = e)) : Za(e);
	}
	function Za() {
		B($a, $a.current), B(Ka, Ka.current);
	}
	function Qa(e) {
		z(Ka), qa === e && (qa = null), z($a);
	}
	var $a = R(0);
	function eo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var to = 0, Z = null, no = null, ro = null, io = !1, ao = !1, oo = !1, so = 0, co = 0, lo = null, uo = 0;
	function fo() {
		throw Error(i(321));
	}
	function po(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!ur(e[n], t[n])) return !1;
		return !0;
	}
	function mo(e, t, n, r, i, a) {
		return to = a, Z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, N.H = e === null || e.memoizedState === null ? js : Ms, oo = !1, a = n(r, i), oo = !1, ao && (a = go(t, n, r, i)), ho(e), a;
	}
	function ho(e) {
		N.H = As;
		var t = no !== null && no.next !== null;
		if (to = 0, ro = no = Z = null, io = !1, co = 0, lo = null, t) throw Error(i(300));
		e === null || Ys || (e = e.dependencies, e !== null && Hi(e) && (Ys = !0));
	}
	function go(e, t, n, r) {
		Z = e;
		var a = 0;
		do {
			if (ao && (lo = null), co = 0, ao = !1, 25 <= a) throw Error(i(301));
			if (a += 1, ro = no = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			N.H = Ns, o = t(n, r);
		} while (ao);
		return o;
	}
	function _o() {
		var e = N.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? wo(t) : t, e = e.useState()[0], (no === null ? null : no.memoizedState) !== e && (Z.flags |= 1024), t;
	}
	function vo() {
		var e = so !== 0;
		return so = 0, e;
	}
	function yo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function bo(e) {
		if (io) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			io = !1;
		}
		to = 0, ro = no = Z = null, ao = !1, co = so = 0, lo = null;
	}
	function xo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ro === null ? Z.memoizedState = ro = e : ro = ro.next = e, ro;
	}
	function So() {
		if (no === null) {
			var e = Z.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = no.next;
		var t = ro === null ? Z.memoizedState : ro.next;
		if (t !== null) ro = t, no = e;
		else {
			if (e === null) throw Z.alternate === null ? Error(i(467)) : Error(i(310));
			no = e, e = {
				memoizedState: no.memoizedState,
				baseState: no.baseState,
				baseQueue: no.baseQueue,
				queue: no.queue,
				next: null
			}, ro === null ? Z.memoizedState = ro = e : ro = ro.next = e;
		}
		return ro;
	}
	function Co() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function wo(e) {
		var t = co;
		return co += 1, lo === null && (lo = []), e = ga(lo, e, t), t = Z, (ro === null ? t.memoizedState : ro.next) === null && (t = t.alternate, N.H = t === null || t.memoizedState === null ? js : Ms), e;
	}
	function To(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return wo(e);
			if (e.$$typeof === b) return Wi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Eo(e) {
		var t = null, n = Z.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Z.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ?? (t = {
			data: [],
			index: 0
		}), n === null && (n = Co(), Z.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = D;
		return t.index++, n;
	}
	function Do(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Oo(e) {
		return ko(So(), no, e);
	}
	function ko(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (to & f) === f : (Fl & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ta && (d = !0);
					else if ((to & p) === p) {
						u = u.next, p === ta && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Z.lanes |= p, Ul |= p;
					f = u.action, oo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Z.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !ur(o, e.memoizedState) && (Ys = !0, d && (n = na, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ao(e) {
		var t = So(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			ur(o, t.memoizedState) || (Ys = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function jo(e, t, n) {
		var r = Z, a = So(), o = Ci;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !ur((no || a).memoizedState, n);
		if (s && (a.memoizedState = n, Ys = !0), a = a.queue, ns(Po.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || ro !== null && ro.memoizedState.tag & 1) {
			if (r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, a, n, t), null), Pl === null) throw Error(i(349));
			o || to & 127 || Mo(r, t, n);
		}
		return n;
	}
	function Mo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Z.updateQueue, t === null ? (t = Co(), Z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function No(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Fo(t) && Io(e);
	}
	function Po(e, t, n) {
		return n(function() {
			Fo(t) && Io(e);
		});
	}
	function Fo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !ur(e, n);
		} catch {
			return !0;
		}
	}
	function Io(e) {
		var t = Gr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function Lo(e) {
		var t = xo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), oo) {
				Te(!0);
				try {
					n();
				} finally {
					Te(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Do,
			lastRenderedState: e
		}, t;
	}
	function Ro(e, t, n, r) {
		return e.baseState = n, ko(e, no, typeof r == "function" ? r : Do);
	}
	function zo(e, t, n, r, a) {
		if (Ds(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			N.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Bo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Bo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = N.T, o = {};
			N.T = o;
			try {
				var s = n(i, r), c = N.S;
				c !== null && c(o, s), Vo(e, t, s);
			} catch (n) {
				Uo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), N.T = a;
			}
		} else try {
			a = n(i, r), Vo(e, t, a);
		} catch (n) {
			Uo(e, t, n);
		}
	}
	function Vo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ho(e, t, n);
		}, function(n) {
			return Uo(e, t, n);
		}) : Ho(e, t, n);
	}
	function Ho(e, t, n) {
		t.status = "fulfilled", t.value = n, Wo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Bo(e, n)));
	}
	function Uo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Wo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Wo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Go(e, t) {
		return t;
	}
	function Ko(e, t) {
		if (Ci) {
			var n = Pl.formState;
			if (n !== null) {
				a: {
					var r = Z;
					if (Ci) {
						if (Si) {
							b: {
								for (var i = Si, a = Ti; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Si = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Di(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = xo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Go,
			lastRenderedState: t
		}, n.queue = r, n = ws.bind(null, Z, r), r.dispatch = n, r = Lo(!1), a = Es.bind(null, Z, !1, r.queue), r = xo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = zo.bind(null, Z, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function qo(e) {
		return Jo(So(), no, e);
	}
	function Jo(e, t, n) {
		if (t = ko(e, t, Go)[0], e = Oo(Do)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = wo(t);
		} catch (e) {
			throw e === da ? pa : e;
		}
		else r = t;
		t = So();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Z.flags |= 2048, Zo(9, { destroy: void 0 }, Yo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Yo(e, t) {
		e.action = t;
	}
	function Xo(e) {
		var t = So(), n = no;
		if (n !== null) return Jo(t, n, e);
		So(), t = t.memoizedState, n = So();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function Zo(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Z.updateQueue, t === null && (t = Co(), Z.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Qo() {
		return So().memoizedState;
	}
	function $o(e, t, n, r) {
		var i = xo();
		Z.flags |= e, i.memoizedState = Zo(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function es(e, t, n, r) {
		var i = So();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		no !== null && r !== null && po(r, no.memoizedState.deps) ? i.memoizedState = Zo(t, a, n, r) : (Z.flags |= e, i.memoizedState = Zo(1 | t, a, n, r));
	}
	function ts(e, t) {
		$o(8390656, 8, e, t);
	}
	function ns(e, t) {
		es(2048, 8, e, t);
	}
	function rs(e) {
		Z.flags |= 4;
		var t = Z.updateQueue;
		if (t === null) t = Co(), Z.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function is(e) {
		var t = So().memoizedState;
		return rs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Nl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function as(e, t) {
		return es(4, 2, e, t);
	}
	function os(e, t) {
		return es(4, 4, e, t);
	}
	function ss(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function cs(e, t, n) {
		n = n == null ? null : n.concat([e]), es(4, 4, ss.bind(null, t, e), n);
	}
	function ls() {}
	function us(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && po(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ds(e, t) {
		var n = So();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && po(t, r[1])) return r[0];
		if (r = e(), oo) {
			Te(!0);
			try {
				e();
			} finally {
				Te(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function fs(e, t, n) {
		return n === void 0 || to & 1073741824 && !(Fl & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), Z.lanes |= e, Ul |= e, n);
	}
	function ps(e, t, n, r) {
		return ur(n, t) ? n : Va.current === null ? !(to & 42) || to & 1073741824 && !(Fl & 261930) ? (Ys = !0, e.memoizedState = n) : (e = fu(), Z.lanes |= e, Ul |= e, t) : (e = fs(e, n, r), ur(e, t) || (Ys = !0), e);
	}
	function ms(e, t, n, r, i) {
		var a = P.p;
		P.p = a !== 0 && 8 > a ? a : 8;
		var o = N.T, s = {};
		N.T = s, Es(e, !1, t, n);
		try {
			var c = i(), l = N.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ts(e, t, aa(c, r), du(e)) : Ts(e, t, r, du(e));
		} catch (n) {
			Ts(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			P.p = a, o !== null && s.types !== null && (o.types = s.types), N.T = o;
		}
	}
	function hs() {}
	function gs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = _s(e).queue;
		ms(e, a, t, F, n === null ? hs : function() {
			return vs(e), n(r);
		});
	}
	function _s(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: F,
			baseState: F,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Do,
				lastRenderedState: F
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Do,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function vs(e) {
		var t = _s(e);
		t.next === null && (t = e.alternate.memoizedState), Ts(e, t.next.queue, {}, du());
	}
	function ys() {
		return Wi(Qf);
	}
	function bs() {
		return So().memoizedState;
	}
	function xs() {
		return So().memoizedState;
	}
	function Ss(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Ma(n);
					var r = Na(t, e, n);
					r !== null && (pu(r, t, n), Pa(r, t, n)), t = { cache: Zi() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Cs(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e) ? Os(t, n) : (n = Wr(e, t, n, r), n !== null && (pu(n, e, r), ks(n, t, r)));
	}
	function ws(e, t, n) {
		Ts(e, t, n, du());
	}
	function Ts(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ds(e)) Os(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, ur(s, o)) return Ur(e, t, i, 0), Pl === null && Hr(), !1;
			} catch {}
			if (n = Wr(e, t, i, r), n !== null) return pu(n, e, r), ks(n, t, r), !0;
		}
		return !1;
	}
	function Es(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ds(e)) {
			if (t) throw Error(i(479));
		} else t = Wr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function Ds(e) {
		var t = e.alternate;
		return e === Z || t !== null && t === Z;
	}
	function Os(e, t) {
		ao = io = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function ks(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Be(e, n);
		}
	}
	var As = {
		readContext: Wi,
		use: To,
		useCallback: fo,
		useContext: fo,
		useEffect: fo,
		useImperativeHandle: fo,
		useLayoutEffect: fo,
		useInsertionEffect: fo,
		useMemo: fo,
		useReducer: fo,
		useRef: fo,
		useState: fo,
		useDebugValue: fo,
		useDeferredValue: fo,
		useTransition: fo,
		useSyncExternalStore: fo,
		useId: fo,
		useHostTransitionStatus: fo,
		useFormState: fo,
		useActionState: fo,
		useOptimistic: fo,
		useMemoCache: fo,
		useCacheRefresh: fo
	};
	As.useEffectEvent = fo;
	var js = {
		readContext: Wi,
		use: To,
		useCallback: function(e, t) {
			return xo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Wi,
		useEffect: ts,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), $o(4194308, 4, ss.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return $o(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			$o(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = xo();
			t = t === void 0 ? null : t;
			var r = e();
			if (oo) {
				Te(!0);
				try {
					e();
				} finally {
					Te(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = xo();
			if (n !== void 0) {
				var i = n(t);
				if (oo) {
					Te(!0);
					try {
						n(t);
					} finally {
						Te(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Cs.bind(null, Z, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = xo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Lo(e);
			var t = e.queue, n = ws.bind(null, Z, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return fs(xo(), e, t);
		},
		useTransition: function() {
			var e = Lo(!1);
			return e = ms.bind(null, Z, e.queue, !0, !1), xo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Z, a = xo();
			if (Ci) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Pl === null) throw Error(i(349));
				Fl & 127 || Mo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ts(Po.bind(null, r, o, e), [e]), r.flags |= 2048, Zo(9, { destroy: void 0 }, No.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = xo(), t = Pl.identifierPrefix;
			if (Ci) {
				var n = hi, r = mi;
				n = (r & ~(1 << 32 - J(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = so++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ys,
		useFormState: Ko,
		useActionState: Ko,
		useOptimistic: function(e) {
			var t = xo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Es.bind(null, Z, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Eo,
		useCacheRefresh: function() {
			return xo().memoizedState = Ss.bind(null, Z);
		},
		useEffectEvent: function(e) {
			var t = xo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Nl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ms = {
		readContext: Wi,
		use: To,
		useCallback: us,
		useContext: Wi,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Oo,
		useRef: Qo,
		useState: function() {
			return Oo(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			return ps(So(), no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Oo(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: qo,
		useActionState: qo,
		useOptimistic: function(e, t) {
			return Ro(So(), no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ms.useEffectEvent = is;
	var Ns = {
		readContext: Wi,
		use: To,
		useCallback: us,
		useContext: Wi,
		useEffect: ns,
		useImperativeHandle: cs,
		useInsertionEffect: as,
		useLayoutEffect: os,
		useMemo: ds,
		useReducer: Ao,
		useRef: Qo,
		useState: function() {
			return Ao(Do);
		},
		useDebugValue: ls,
		useDeferredValue: function(e, t) {
			var n = So();
			return no === null ? fs(n, e, t) : ps(n, no.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ao(Do)[0], t = So().memoizedState;
			return [typeof e == "boolean" ? e : wo(e), t];
		},
		useSyncExternalStore: jo,
		useId: bs,
		useHostTransitionStatus: ys,
		useFormState: Xo,
		useActionState: Xo,
		useOptimistic: function(e, t) {
			var n = So();
			return no === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ro(n, no, e, t);
		},
		useMemoCache: Eo,
		useCacheRefresh: xs
	};
	Ns.useEffectEvent = is;
	function Ps(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Fs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ma(r);
			i.payload = t, n != null && (i.callback = n), t = Na(e, i, r), t !== null && (pu(t, e, r), Pa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ma(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Na(e, i, r), t !== null && (pu(t, e, r), Pa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Ma(n);
			r.tag = 2, t != null && (r.callback = t), t = Na(e, r, n), t !== null && (pu(t, e, n), Pa(t, e, n));
		}
	};
	function Is(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !dr(n, r) || !dr(i, a) : !0;
	}
	function Ls(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Fs.enqueueReplaceState(t, t.state, null);
	}
	function Rs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function zs(e) {
		Rr(e);
	}
	function Bs(e) {
		console.error(e);
	}
	function Vs(e) {
		Rr(e);
	}
	function Hs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Us(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ws(e, t, n) {
		return n = Ma(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Hs(e, t);
		}, n;
	}
	function Gs(e) {
		return e = Ma(e), e.tag = 3, e;
	}
	function Ks(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Us(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Us(t, n, r), typeof i != "function" && (tu === null ? tu = /* @__PURE__ */ new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Vi(t, n, a, !0), n = Ka.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return qa === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ma ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (Ci) return t = Ka.current, t === null ? (r !== Ei && (t = Error(i(423), { cause: r }), Ni(oi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = oi(r, n), a = Ws(e.stateNode, r, a), Fa(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ei && (e = Error(i(422), { cause: r }), Ni(oi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = oi(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = oi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ws(n.stateNode, r, e), Fa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Gs(a), Ks(a, e, n, r), Fa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Js = Error(i(461)), Ys = !1;
	function Xs(e, t, n, r) {
		t.child = e === null ? Oa(t, null, n, r) : Da(t, e.child, n, r);
	}
	function Zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ui(t), r = mo(e, t, n, o, a, i), s = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Ci && s && vi(t), t.flags |= 1, Xs(e, t, r, i), t.child);
	}
	function Qs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Zr(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, $s(e, t, a, r, i)) : (e = ei(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Sc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? dr : n, n(o, r) && e.ref === t.ref) return xc(e, t, i);
		}
		return t.flags |= 1, e = Qr(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function $s(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (dr(a, r) && e.ref === t.ref) {
				if (Ys = !1, t.pendingProps = r = a, Sc(e, i)) e.flags & 131072 && (Ys = !0);
				else return t.lanes = e.lanes, xc(e, t, i);
			}
		}
		return sc(e, t, n, r, i);
	}
	function ec(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return nc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && la(t, a === null ? null : a.cachePool), a === null ? Wa() : Ua(t, a), Xa(t);
			else return r = t.lanes = 536870912, nc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && la(t, null), Wa(), Za(t)) : (la(t, a.cachePool), Ua(t, a), Za(t), t.memoizedState = null);
		return Xs(e, t, i, n), t.child;
	}
	function tc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function nc(e, t, n, r, i) {
		var a = ca();
		return a = a === null ? null : {
			parent: Xi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && la(t, null), Wa(), Xa(t), e !== null && Vi(e, t, r, !0), t.childLanes = i, null;
	}
	function rc(e, t) {
		return t = gc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ic(e, t, n) {
		return Da(t, e.child, null, n), e = rc(t, t.pendingProps), e.flags |= 2, Qa(t), t.memoizedState = null, e;
	}
	function ac(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (Ci) {
				if (r.mode === "hidden") return e = rc(t, r), t.lanes = 536870912, tc(null, e);
				if (Ya(t), (e = Si) ? (e = rf(e, Ti), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: pi === null ? null : {
						id: mi,
						overflow: hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ri(e), n.return = t, t.child = n, xi = t, Si = null)) : e = null, e === null) throw Di(t);
				return t.lanes = 536870912, null;
			}
			return rc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Ya(t), a) {
				if (t.flags & 256) t.flags &= -257, t = ic(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Ys || Vi(e, t, n, !1), a = (n & e.childLanes) !== 0, Ys || a) {
				if (r = Pl, r !== null && (s = Ve(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Gr(e, s), pu(r, e, s), Js;
				Tu(), t = ic(e, t, n);
			} else e = o.treeContext, Si = cf(s.nextSibling), xi = t, Ci = !0, wi = null, Ti = !1, e !== null && bi(t, e), t = rc(t, r), t.flags |= 4096;
			return t;
		}
		return e = Qr(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function oc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function sc(e, t, n, r, i) {
		return Ui(t), n = mo(e, t, n, r, void 0, i), r = vo(), e !== null && !Ys ? (yo(e, t, i), xc(e, t, i)) : (Ci && r && vi(t), t.flags |= 1, Xs(e, t, n, i), t.child);
	}
	function cc(e, t, n, r, i, a) {
		return Ui(t), t.updateQueue = null, n = go(t, r, n, i), ho(e), r = vo(), e !== null && !Ys ? (yo(e, t, a), xc(e, t, a)) : (Ci && r && vi(t), t.flags |= 1, Xs(e, t, n, a), t.child);
	}
	function lc(e, t, n, r, i) {
		if (Ui(t), t.stateNode === null) {
			var a = Jr, o = n.contextType;
			typeof o == "object" && o && (a = Wi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Fs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Aa(t), o = n.contextType, a.context = typeof o == "object" && o ? Wi(o) : Jr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ps(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Fs.enqueueReplaceState(a, a.state, null), Ra(t, r, a, i), La(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Rs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Jr, typeof u == "object" && u && (o = Wi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ls(t, a, r, o), ka = !1;
			var f = t.memoizedState;
			a.state = f, Ra(t, r, a, i), La(), l = t.memoizedState, s || f !== l || ka ? (typeof d == "function" && (Ps(t, n, d, r), l = t.memoizedState), (c = ka || Is(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, ja(e, t), o = t.memoizedProps, u = Rs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Jr, typeof l == "object" && l && (c = Wi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ls(t, a, r, c), ka = !1, f = t.memoizedState, a.state = f, Ra(t, r, a, i), La();
			var p = t.memoizedState;
			o !== d || f !== p || ka || e !== null && e.dependencies !== null && Hi(e.dependencies) ? (typeof s == "function" && (Ps(t, n, s, r), p = t.memoizedState), (u = ka || Is(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Hi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, oc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Da(t, e.child, null, i), t.child = Da(t, null, n, i)) : Xs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = xc(e, t, i), e;
	}
	function uc(e, t, n, r) {
		return ji(), t.flags |= 256, Xs(e, t, n, r), t.child;
	}
	var dc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function fc(e) {
		return {
			baseLanes: e,
			cachePool: ua()
		};
	}
	function pc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!($a.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (Ci) {
				if (a ? Ja(t) : Za(t), (e = Si) ? (e = rf(e, Ti), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: pi === null ? null : {
						id: mi,
						overflow: hi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ri(e), n.return = t, t.child = n, xi = t, Si = null)) : e = null, e === null) throw Di(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (Za(t), a = t.mode, c = gc({
				mode: "hidden",
				children: c
			}, a), r = ti(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(null, r)) : (Ja(t), hc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Ja(t), t.flags &= -257, t = _c(e, t, n)) : t.memoizedState === null ? (Za(t), c = r.fallback, a = t.mode, r = gc({
				mode: "visible",
				children: r.children
			}, a), c = ti(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Da(t, e.child, null, n), r = t.child, r.memoizedState = fc(n), r.childLanes = pc(e, s, n), t.memoizedState = dc, t = tc(null, r)) : (Za(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Ja(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ni({
					value: r,
					source: null,
					stack: null
				}), t = _c(e, t, n);
			} else if (Ys || Vi(e, t, n, !1), s = (n & e.childLanes) !== 0, Ys || s) {
				if (s = Pl, s !== null && (r = Ve(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Gr(e, r), pu(s, e, r), Js;
				af(c) || Tu(), t = _c(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Si = cf(c.nextSibling), xi = t, Ci = !0, wi = null, Ti = !1, e !== null && bi(t, e), t = hc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (Za(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = Qr(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ti(c, a, n, null), c.flags |= 2) : c = Qr(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, tc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = fc(n) : (a = c.cachePool, a === null ? a = ua() : (l = Xi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = pc(e, s, n), t.memoizedState = dc, tc(e.child, r)) : (Ja(t), n = e.child, e = n.sibling, n = Qr(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function hc(e, t) {
		return t = gc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function gc(e, t) {
		return e = Xr(22, e, null, t), e.lanes = 0, e;
	}
	function _c(e, t, n) {
		return Da(t, e.child, null, n), e = hc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function vc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), zi(e.return, t, n);
	}
	function yc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function bc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = $a.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, B($a, o), Xs(e, t, r, n), r = Ci ? ui : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && vc(e, n, t);
			else if (e.tag === 19) vc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && eo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), yc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && eo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				yc(t, !0, n, null, a, r);
				break;
			case "together":
				yc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function xc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Vi(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Qr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Qr(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Sc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Hi(e)));
	}
	function Cc(e, t, n) {
		switch (t.tag) {
			case 3:
				ne(t, t.stateNode.containerInfo), Li(t, Xi, e.memoizedState.cache), ji();
				break;
			case 27:
			case 5:
				re(t);
				break;
			case 4:
				ne(t, t.stateNode.containerInfo);
				break;
			case 10:
				Li(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Ya(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Ja(t), e = xc(e, t, n), e === null ? null : e.sibling) : mc(e, t, n) : (Ja(t), t.flags |= 128, null);
				Ja(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r || (Vi(e, t, n, !1), r = (n & t.childLanes) !== 0), i) {
					if (r) return bc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), B($a, $a.current), r) break;
				return null;
			case 22: return t.lanes = 0, ec(e, t, n, t.pendingProps);
			case 24: Li(t, Xi, e.memoizedState.cache);
		}
		return xc(e, t, n);
	}
	function wc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Ys = !0;
			else {
				if (!Sc(e, n) && !(t.flags & 128)) return Ys = !1, Cc(e, t, n);
				Ys = !!(e.flags & 131072);
			}
		} else Ys = !1, Ci && t.flags & 1048576 && _i(t, ui, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = _a(t.elementType), t.type = e, typeof e == "function") Zr(e) ? (r = Rs(e, r), t.tag = 1, t = lc(null, t, e, r, n)) : (t.tag = 0, t = sc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === x) {
								t.tag = 11, t = Zs(null, t, e, r, n);
								break a;
							}
							if (a === w) {
								t.tag = 14, t = Qs(null, t, e, r, n);
								break a;
							}
						}
						throw t = j(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return sc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Rs(r, t.pendingProps), lc(e, t, r, a, n);
			case 3:
				a: {
					if (ne(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, ja(e, t), Ra(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Li(t, Xi, r), r !== o.cache && Bi(t, [Xi], n, !0), La(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = uc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = oi(Error(i(424)), t), Ni(a), t = uc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Si = cf(e.firstChild), xi = t, Ci = !0, wi = null, Ti = !0, n = Oa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (ji(), r === a) {
							t = xc(e, t, n);
							break a;
						}
						Xs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return oc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : Ci || (n = t.type, e = t.pendingProps, r = Bd(ee.current).createElement(n), r[qe] = t, r[Je] = e, Pd(r, n, e), ot(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return re(t), e === null && Ci && (r = t.stateNode = ff(t.type, t.pendingProps, ee.current), xi = t, Ti = !0, a = Si, Zd(t.type) ? (lf = a, Si = cf(r.firstChild)) : Si = a), Xs(e, t, t.pendingProps.children, n), oc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && Ci && ((a = r = Si) && (r = tf(r, t.type, t.pendingProps, Ti), r === null ? a = !1 : (t.stateNode = r, xi = t, Si = cf(r.firstChild), Ti = !1, a = !0)), a || Di(t)), re(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = mo(e, t, _o, null, null, n), Qf._currentValue = a), oc(e, t), Xs(e, t, r, n), t.child;
			case 6: return e === null && Ci && ((e = n = Si) && (n = nf(n, t.pendingProps, Ti), n === null ? e = !1 : (t.stateNode = n, xi = t, Si = null, e = !0)), e || Di(t)), null;
			case 13: return mc(e, t, n);
			case 4: return ne(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Da(t, null, r, n) : Xs(e, t, r, n), t.child;
			case 11: return Zs(e, t, t.type, t.pendingProps, n);
			case 7: return Xs(e, t, t.pendingProps, n), t.child;
			case 8: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Li(t, t.type, r.value), Xs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Ui(t), a = Wi(a), r = r(a), t.flags |= 1, Xs(e, t, r, n), t.child;
			case 14: return Qs(e, t, t.type, t.pendingProps, n);
			case 15: return $s(e, t, t.type, t.pendingProps, n);
			case 19: return bc(e, t, n);
			case 31: return ac(e, t, n);
			case 22: return ec(e, t, n, t.pendingProps);
			case 24: return Ui(t), r = Wi(Xi), e === null ? (a = ca(), a === null && (a = Pl, o = Zi(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Aa(t), Li(t, Xi, a)) : ((e.lanes & n) !== 0 && (ja(e, t), Ra(t, null, null, n), La()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Li(t, Xi, r), r !== a.cache && Bi(t, [Xi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Li(t, Xi, r))), Xs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Tc(e) {
		e.flags |= 4;
	}
	function Ec(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Su()) e.flags |= 8192;
				else throw va = ma, fa;
			}
		} else e.flags &= -16777217;
	}
	function Dc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (Su()) e.flags |= 8192;
			else throw va = ma, fa;
		}
	}
	function Oc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Fe(), e.lanes |= t, ql |= t);
	}
	function kc(e, t) {
		if (!Ci) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Ac(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function jc(e, t, n) {
		var r = t.pendingProps;
		switch (yi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Ac(t), null;
			case 1: return Ac(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ri(Xi), U(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ai(t) ? Tc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Mi())), Ac(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Tc(t), o === null ? (Ac(t), Ec(t, a, null, r, n)) : (Ac(t), Dc(t, o))) : o ? o === e.memoizedState ? (Ac(t), t.flags &= -16777217) : (Tc(t), Ac(t), Dc(t, o)) : (e = e.memoizedProps, e !== r && Tc(t), Ac(t), Ec(t, a, e, r, n)), null;
			case 27:
				if (W(t), n = ee.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					e = V.current, Ai(t) ? Oi(t, e) : (e = ff(a, r, n), t.stateNode = e, Tc(t));
				}
				return Ac(t), null;
			case 5:
				if (W(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ac(t), null;
					}
					if (o = V.current, Ai(t)) Oi(t, o);
					else {
						var s = Bd(ee.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[qe] = t, o[Je] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Tc(t);
					}
				}
				return Ac(t), Ec(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Tc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ee.current, Ai(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = xi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[qe] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || Di(t, !0);
					} else e = Bd(e).createTextNode(r), e[qe] = t, t.stateNode = e;
				}
				return Ac(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ai(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[qe] = t;
						} else ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), e = !1;
					} else n = Mi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (Qa(t), t) : (Qa(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ac(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ai(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[qe] = t;
						} else ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ac(t), a = !1;
					} else a = Mi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (Qa(t), t) : (Qa(t), null);
				}
				return Qa(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Oc(t, t.updateQueue), Ac(t), null);
			case 4: return U(), e === null && xd(t.stateNode.containerInfo), Ac(t), null;
			case 10: return Ri(t.type), Ac(t), null;
			case 19:
				if (z($a), r = t.memoizedState, r === null) return Ac(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) kc(r, !1);
					else {
						if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = eo(e), o !== null) {
								for (t.flags |= 128, kc(r, !1), e = o.updateQueue, t.updateQueue = e, Oc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) $r(n, e), n = n.sibling;
								return B($a, $a.current & 1 | 2), Ci && gi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && me() > $l && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = eo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Oc(t, e), kc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !Ci) return Ac(t), null;
						} else 2 * me() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, kc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ac(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = me(), e.sibling = null, n = $a.current, B($a, a ? n & 1 | 2 : n & 1), Ci && gi(t, r.treeForkCount), e);
			case 22:
			case 23: return Qa(t), Ga(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ac(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ac(t), n = t.updateQueue, n !== null && Oc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && z(sa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ri(Xi), Ac(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e, t) {
		switch (yi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ri(Xi), U(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return W(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (Qa(t), t.alternate === null) throw Error(i(340));
					ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (Qa(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return z($a), null;
			case 4: return U(), null;
			case 10: return Ri(t.type), null;
			case 22:
			case 23: return Qa(t), Ga(), e !== null && z(sa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ri(Xi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Nc(e, t) {
		switch (yi(t), t.tag) {
			case 3:
				Ri(Xi), U();
				break;
			case 26:
			case 27:
			case 5:
				W(t);
				break;
			case 4:
				U();
				break;
			case 31:
				t.memoizedState !== null && Qa(t);
				break;
			case 13:
				Qa(t);
				break;
			case 19:
				z($a);
				break;
			case 10:
				Ri(t.type);
				break;
			case 22:
			case 23:
				Qa(t), Ga(), e !== null && z(sa);
				break;
			case 24: Ri(Xi);
		}
	}
	function Pc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Fc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Uu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Ic(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ba(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function Lc(e, t, n) {
		n.props = Rs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Rc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function zc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Uu(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Uu(e, t, n);
			}
			else n.current = null;
		}
	}
	function Bc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Vc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[Je] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Hc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Uc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Hc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Wc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Vt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Wc(e, t, n), e = e.sibling; e !== null;) Wc(e, t, n), e = e.sibling;
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[qe] = e, t[Je] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var qc = !1, Jc = !1, Yc = !1, Xc = typeof WeakSet == "function" ? WeakSet : Set, Zc = null;
	function Qc(e, t) {
		if (e = e.containerInfo, Rd = sp, e = hr(e), gr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n = n || {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, Zc = t; Zc !== null;) if (t = Zc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Zc = e;
		else for (; Zc !== null;) {
			switch (t = Zc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Rs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Uu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Zc = e;
				break;
			}
			Zc = t.return;
		}
	}
	function $c(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ml(e, n), r & 4 && Pc(5, n);
				break;
			case 1:
				if (ml(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Uu(n, n.return, e);
					}
					else {
						var i = Rs(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Uu(n, n.return, e);
						}
					}
				}
				r & 64 && Ic(n), r & 512 && Rc(n, n.return);
				break;
			case 3:
				if (ml(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ba(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Kc(n);
			case 26:
			case 5:
				ml(e, n), t === null && r & 4 && Bc(n), r & 512 && Rc(n, n.return);
				break;
			case 12:
				ml(e, n);
				break;
			case 31:
				ml(e, n), r & 4 && al(e, n);
				break;
			case 13:
				ml(e, n), r & 4 && ol(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || qc, !r) {
					t = t !== null && t.memoizedState !== null || Jc, i = qc;
					var a = Jc;
					qc = r, (Jc = t) && !a ? gl(e, n, !!(n.subtreeFlags & 8772)) : ml(e, n), qc = i, Jc = a;
				}
				break;
			case 30: break;
			default: ml(e, n);
		}
	}
	function el(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, el(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && tt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var tl = null, nl = !1;
	function rl(e, t, n) {
		for (n = n.child; n !== null;) il(e, t, n), n = n.sibling;
	}
	function il(e, t, n) {
		if (we && typeof we.onCommitFiberUnmount == "function") try {
			we.onCommitFiberUnmount(Ce, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Jc || zc(n, t), rl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Jc || zc(n, t);
				var r = tl, i = nl;
				Zd(n.type) && (tl = n.stateNode, nl = !1), rl(e, t, n), pf(n.stateNode), tl = r, nl = i;
				break;
			case 5: Jc || zc(n, t);
			case 6:
				if (r = tl, i = nl, tl = null, rl(e, t, n), tl = r, nl = i, tl !== null) {
					if (nl) try {
						(tl.nodeType === 9 ? tl.body : tl.nodeName === "HTML" ? tl.ownerDocument.body : tl).removeChild(n.stateNode);
					} catch (e) {
						Uu(n, t, e);
					}
					else try {
						tl.removeChild(n.stateNode);
					} catch (e) {
						Uu(n, t, e);
					}
				}
				break;
			case 18:
				tl !== null && (nl ? (e = tl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(tl, n.stateNode));
				break;
			case 4:
				r = tl, i = nl, tl = n.stateNode.containerInfo, nl = !0, rl(e, t, n), tl = r, nl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Fc(2, n, t), Jc || Fc(4, n, t), rl(e, t, n);
				break;
			case 1:
				Jc || (zc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Lc(n, t, r)), rl(e, t, n);
				break;
			case 21:
				rl(e, t, n);
				break;
			case 22:
				Jc = (r = Jc) || n.memoizedState !== null, rl(e, t, n), Jc = r;
				break;
			default: rl(e, t, n);
		}
	}
	function al(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function sl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Xc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function cl(e, t) {
		var n = sl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ll(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							tl = c.stateNode, nl = !1;
							break a;
						}
						break;
					case 5:
						tl = c.stateNode, nl = !1;
						break a;
					case 3:
					case 4:
						tl = c.stateNode.containerInfo, nl = !0;
						break a;
				}
				c = c.return;
			}
			if (tl === null) throw Error(i(160));
			il(o, s, a), tl = null, nl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) dl(t, e), t = t.sibling;
	}
	var ul = null;
	function dl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ll(t, e), fl(e), r & 4 && (Fc(3, e, e.return), Pc(3, e), Fc(5, e, e.return));
				break;
			case 1:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 64 && qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = ul;
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[et] || o[qe] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[qe] = e, ot(o), r = o;
											break a;
										case "link":
											var s = Vf("link", "href", a).get(r + (n.href || ""));
											if (s) {
												for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										case "meta":
											if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
												for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
													s.splice(c, 1);
													break b;
												}
											}
											o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
											break;
										default: throw Error(i(468, r));
									}
									o[qe] = e, ot(o), r = o;
								}
								e.stateNode = r;
							} else Hf(a, e.type, e.stateNode);
						} else e.stateNode = If(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && Vc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), n !== null && r & 4 && Vc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ll(t, e), fl(e), r & 512 && (Jc || n === null || zc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						jt(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Vc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Yc = !0);
				break;
			case 6:
				if (ll(t, e), fl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = ul, ul = gf(t.containerInfo), ll(t, e), ul = a, fl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Yc && (Yc = !1, pl(e));
				break;
			case 4:
				r = ul, ul = gf(e.stateNode.containerInfo), ll(t, e), fl(e), ul = r;
				break;
			case 12:
				ll(t, e), fl(e);
				break;
			case 31:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 13:
				ll(t, e), fl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = qc, d = Jc;
				if (qc = u || a, Jc = d || l, ll(t, e), Jc = d, qc = u, fl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || qc || Jc || hl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, cl(e, n))));
				break;
			case 19:
				ll(t, e), fl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, cl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ll(t, e), fl(e);
		}
	}
	function fl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Hc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Gc(e, Uc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (jt(o, ""), n.flags &= -33), Gc(e, Uc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Wc(e, Uc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Uu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function pl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			pl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function ml(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) $c(e, t.alternate, t), t = t.sibling;
	}
	function hl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Fc(4, t, t.return), hl(t);
					break;
				case 1:
					zc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Lc(t, t.return, n), hl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					zc(t, t.return), hl(t);
					break;
				case 22:
					t.memoizedState === null && hl(t);
					break;
				case 30:
					hl(t);
					break;
				default: hl(t);
			}
			e = e.sibling;
		}
	}
	function gl(e, t, n) {
		for (n = n && !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					gl(i, a, n), Pc(4, a);
					break;
				case 1:
					if (gl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) za(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Ic(a), Rc(a, a.return);
					break;
				case 27: Kc(a);
				case 26:
				case 5:
					gl(i, a, n), n && r === null && o & 4 && Bc(a), Rc(a, a.return);
					break;
				case 12:
					gl(i, a, n);
					break;
				case 31:
					gl(i, a, n), n && o & 4 && al(i, a);
					break;
				case 13:
					gl(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 22:
					a.memoizedState === null && gl(i, a, n), Rc(a, a.return);
					break;
				case 30: break;
				default: gl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function _l(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Qi(n));
	}
	function vl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Qi(e));
	}
	function yl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) bl(e, t, n, r), t = t.sibling;
	}
	function bl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, t, n, r), i & 2048 && Pc(9, t);
				break;
			case 1:
				yl(e, t, n, r);
				break;
			case 3:
				yl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Qi(e)));
				break;
			case 12:
				if (i & 2048) {
					yl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else yl(e, t, n, r);
				break;
			case 31:
				yl(e, t, n, r);
				break;
			case 13:
				yl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? yl(e, t, n, r) : (a._visibility |= 2, xl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? yl(e, t, n, r) : Sl(e, t), i & 2048 && _l(o, t);
				break;
			case 24:
				yl(e, t, n, r), i & 2048 && vl(t.alternate, t);
				break;
			default: yl(e, t, n, r);
		}
	}
	function xl(e, t, n, r, i) {
		for (i = i && (!!(t.subtreeFlags & 10256) || !1), t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					xl(a, o, s, c, i), Pc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, xl(a, o, s, c, i)) : u._visibility & 2 ? xl(a, o, s, c, i) : Sl(a, o), i && l & 2048 && _l(o.alternate, o);
					break;
				case 24:
					xl(a, o, s, c, i), i && l & 2048 && vl(o.alternate, o);
					break;
				default: xl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Sl(n, r), i & 2048 && _l(r.alternate, r);
					break;
				case 24:
					Sl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				default: Sl(n, r);
			}
			t = t.sibling;
		}
	}
	var Cl = 8192;
	function wl(e, t, n) {
		if (e.subtreeFlags & Cl) for (e = e.child; e !== null;) Tl(e, t, n), e = e.sibling;
	}
	function Tl(e, t, n) {
		switch (e.tag) {
			case 26:
				wl(e, t, n), e.flags & Cl && e.memoizedState !== null && Gf(n, ul, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				wl(e, t, n);
				break;
			case 3:
			case 4:
				var r = ul;
				ul = gf(e.stateNode.containerInfo), wl(e, t, n), ul = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Cl, Cl = 16777216, wl(e, t, n), Cl = r) : wl(e, t, n));
				break;
			default: wl(e, t, n);
		}
	}
	function El(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Dl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Ol(e), e = e.sibling;
	}
	function Ol(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e), e.flags & 2048 && Fc(9, e, e.return);
				break;
			case 3:
				Dl(e);
				break;
			case 12:
				Dl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, kl(e)) : Dl(e);
				break;
			default: Dl(e);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Zc = r, Al(r, e);
			}
			El(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, t, t.return), kl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, kl(t));
					break;
				default: kl(t);
			}
			e = e.sibling;
		}
	}
	function Al(e, t) {
		for (; Zc !== null;) {
			var n = Zc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Fc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Qi(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Zc = r;
			else a: for (n = e; Zc !== null;) {
				r = Zc;
				var i = r.sibling, a = r.return;
				if (el(r), r === n) {
					Zc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Zc = i;
					break a;
				}
				Zc = a;
			}
		}
	}
	var jl = {
		getCacheForType: function(e) {
			var t = Wi(Xi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Wi(Xi).controller.signal;
		}
	}, Ml = typeof WeakMap == "function" ? WeakMap : Map, Nl = 0, Pl = null, Q = null, Fl = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return Nl & 2 && Fl !== 0 ? Fl & -Fl : N.T === null ? We() : ud();
	}
	function fu() {
		if (Kl === 0) {
			if (!(Fl & 536870912) || Ci) {
				var e = Y;
				Y <<= 1, !(Y & 3932160) && (Y = 262144), Kl = e;
			} else Kl = 536870912;
		}
		return e = Ka.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Pl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Fl, Kl, !1)), Le(e, n), (!(Nl & 2) || e !== Pl) && (e === Pl && (!(Nl & 2) && (Wl |= n), Hl === 4 && _u(e, Fl, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (Nl & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || Ne(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				zl && !r && _u(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !gu(n)) {
				a = Eu(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Jl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (bu(c, s).flags |= 256), s = Eu(c, s, !1), s !== 2) {
							if (Bl && !l) {
								c.errorRecoveryDisabledLanes |= o, Wl |= o, a = 4;
								break a;
							}
							o = Yl, Yl = a, o !== null && (Yl === null ? Yl = o : Yl.push.apply(Yl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				bu(e, 0), _u(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						_u(r, t, Kl, !Rl);
						break a;
					case 2:
						Yl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = Zl + 300 - me(), 10 < a)) {
					if (_u(r, t, Kl, !Rl), Me(r, 0, !0) !== 0) break a;
					au = t, r.timeoutHandle = Kd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, "Throttled", -0, 0), a);
					break a;
				}
				hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, null, -0, 0);
			}
			break;
		} while (1);
		nd(e);
	}
	function hu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Vt
			}, Tl(t, a, d);
			var m = (a & 62914560) === a ? Zl - me() : (a & 4194048) === a ? Ql - me() : 0;
			if (m = qf(d, m), m !== null) {
				au = a, e.cancelPendingCommit = m(Fu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), _u(e, a, o, !l);
				return;
			}
		}
		Fu(e, t, a, n, r, i, o, s, c);
	}
	function gu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!ur(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - J(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ze(e, n, t);
	}
	function vu() {
		return Nl & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Q !== null) {
			if (Il === 0) var e = Q.return;
			else e = Q, Ii = Fi = null, bo(e), xa = null, Sa = 0, e = Q;
			for (; e !== null;) Nc(e.alternate, e), e = e.return;
			Q = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Pl = e, Q = n = Qr(e.current, null), Fl = t, Il = 0, Ll = null, Rl = !1, zl = Ne(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - J(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Hr(), n;
	}
	function xu(e, t) {
		Z = null, N.H = As, t === da || t === pa ? (t = ya(), Il = 3) : t === fa ? (t = ya(), Il = 4) : Il = t === Js ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Q === null && (Hl = 1, Hs(e, oi(t, e.current)));
	}
	function Su() {
		var e = Ka.current;
		return e === null ? !0 : (Fl & 4194048) === Fl ? qa === null : (Fl & 62914560) === Fl || Fl & 536870912 ? e === qa : !1;
	}
	function Cu() {
		var e = N.H;
		return N.H = As, e === null ? As : e;
	}
	function wu() {
		var e = N.A;
		return N.A = jl, e;
	}
	function Tu() {
		Hl = 4, Rl || (Fl & 4194048) !== Fl && Ka.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Pl === null || _u(Pl, Fl, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = Nl;
		Nl |= 2;
		var i = Cu(), a = wu();
		(Pl !== e || Fl !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Q !== null) {
					var s = Q, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ka.current === null && (t = !0);
							var l = Il;
							if (Il = 0, Ll = null, Mu(e, s, c, l), n && zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Il, Il = 0, Ll = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Hl;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ii = Fi = null, Nl = r, N.H = i, N.A = a, Q === null && (Pl = null, Fl = 0, Hr()), o;
	}
	function Du() {
		for (; Q !== null;) Au(Q);
	}
	function Ou(e, t) {
		var n = Nl;
		Nl |= 2;
		var r = Cu(), a = wu();
		Pl !== e || Fl !== t ? (eu = null, $l = me() + 500, bu(e, t)) : zl = Ne(e, t);
		a: do
			try {
				if (Il !== 0 && Q !== null) {
					t = Q;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ha(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Pl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							ha(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Q.tag) {
								case 26: s = Q.memoizedState;
								case 5:
								case 27:
									var c = Q;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Q = l;
										else {
											var u = c.return;
											u === null ? Q = null : (Q = u, Nu(u));
										}
										break b;
									}
							}
							Il = 0, Ll = null, Mu(e, t, o, 5);
							break;
						case 6:
							Il = 0, Ll = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Hl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ku();
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return Ii = Fi = null, N.H = r, N.A = a, Nl = n, Q === null ? (Pl = null, Fl = 0, Hr(), Hl) : 0;
	}
	function ku() {
		for (; Q !== null && !fe();) Au(Q);
	}
	function Au(e) {
		var t = wc(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Q = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = cc(n, t, t.pendingProps, t.type, void 0, Fl);
				break;
			case 11:
				t = cc(n, t, t.pendingProps, t.type.render, t.ref, Fl);
				break;
			case 5: bo(t);
			default: Nc(n, t), t = Q = $r(t, Vl), t = wc(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Q = t;
	}
	function Mu(e, t, n, r) {
		Ii = Fi = null, bo(t), xa = null, Sa = 0;
		var i = t.return;
		try {
			if (qs(e, i, t, n, Fl)) {
				Hl = 1, Hs(e, oi(n, e.current)), Q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Q = i, t;
			Hl = 1, Hs(e, oi(n, e.current)), Q = null;
			return;
		}
		t.flags & 32768 ? (Ci || r === 1 ? e = !0 : zl || Fl & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ka.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = jc(t.alternate, t, Vl);
			if (n !== null) {
				Q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Q = t;
				return;
			}
			Q = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Mc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Q = e;
				return;
			}
			Q = e = n;
		} while (e !== null);
		Hl = 6, Q = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (Nl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Vr, Re(e, n, o, s, c, l), e === Pl && (Q = Pl = null, Fl = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(ve, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = N.T, N.T = null, a = P.p, P.p = 2, s = Nl, Nl |= 4;
				try {
					Qc(e, t, n);
				} finally {
					Nl = s, P.p = a, N.T = r;
				}
			}
			nu = 1, Iu(), Lu(), Ru();
		}
	}
	function Iu() {
		if (nu === 1) {
			nu = 0;
			var e = ru, t = iu, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					dl(t, e);
					var a = zd, o = hr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && mr(s.ownerDocument.documentElement, s)) {
						if (c !== null && gr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = pr(s, h), v = pr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					Nl = i, P.p = r, N.T = n;
				}
			}
			e.current = t, nu = 2;
		}
	}
	function Lu() {
		if (nu === 2) {
			nu = 0;
			var e = ru, t = iu, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = N.T, N.T = null;
				var r = P.p;
				P.p = 2;
				var i = Nl;
				Nl |= 4;
				try {
					$c(e, t.alternate, t);
				} finally {
					Nl = i, P.p = r, N.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, pe();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), Ue(n), t = t.stateNode, we && typeof we.onCommitFiberRoot == "function") try {
				we.onCommitFiberRoot(Ce, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = N.T, i = P.p, P.p = 2, N.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					N.T = t, P.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Qi(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = Ue(au), r = N.T, a = P.p;
		try {
			P.p = 32 > n ? 32 : n, N.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, Nl & 6) throw Error(i(331));
			var c = Nl;
			if (Nl |= 4, Ol(o.current), bl(o, o.current, s, n), Nl = c, rd(0, !1), we && typeof we.onPostCommitFiberRoot == "function") try {
				we.onPostCommitFiberRoot(Ce, o);
			} catch {}
			return !0;
		} finally {
			P.p = a, N.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = oi(n, t), t = Ws(e.stateNode, t, 2), e = Na(e, t, 2), e !== null && (Le(e, 2), nd(e));
	}
	function Uu(e, t, n) {
		if (e.tag === 3) Hu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Hu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (tu === null || !tu.has(r))) {
					e = oi(n, e), n = Gs(2), r = Na(t, n, 2), r !== null && (Ks(n, r, t, e), Le(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ml();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Pl === e && (Fl & n) === n && (Hl === 4 || Hl === 3 && (Fl & 62914560) === Fl && 300 > me() - Zl ? !(Nl & 2) && bu(e, 0) : Gl |= n, ql === Fl && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = Fe()), e = Gr(e, t), e !== null && (Le(e, t), nd(e));
	}
	function qu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ku(e, n);
	}
	function Ju(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ku(e, n);
	}
	function Yu(e, t) {
		return ue(e, t);
	}
	var Xu = null, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0;
	function nd(e) {
		e !== Zu && e.next === null && (Zu === null ? Xu = Zu = e : Zu = Zu.next = e), $u = !0, Qu || (Qu = !0, ld());
	}
	function rd(e, t) {
		if (!ed && $u) {
			ed = !0;
			do
				for (var n = !1, r = Xu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - J(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, cd(r, a));
						} else a = Fl, a = Me(r, r === Pl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Ne(r, a) || (n = !0, cd(r, a));
					}
					r = r.next;
				}
			while (n);
			ed = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		$u = Qu = !1;
		var e = 0;
		td !== 0 && Gd() && (e = td);
		for (var t = me(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - J(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Pe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Pl, n = Fl, n = Me(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && de(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ne(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && de(r), Ue(n)) {
				case 2:
				case 8:
					n = _e;
					break;
				case 32:
					n = ve;
					break;
				case 268435456:
					n = be;
					break;
				default: n = ve;
			}
			return r = sd.bind(null, e), n = ue(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && de(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Fl;
		return r = Me(e, e === Pl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, me()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			Nl & 6 ? ue(ge, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ta;
			e === 0 && (e = ke, ke <<= 1, !(ke & 261888) && (ke = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Bt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[Je] || null).action), o = r.submitter;
			o && (t = (t = o[Je] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new ln("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								gs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), gs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var md = 0; md < Ir.length; md++) {
		var hd = Ir[md];
		Lr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Lr(Or, "onAnimationEnd"), Lr(kr, "onAnimationIteration"), Lr(Ar, "onAnimationStart"), Lr("dblclick", "onDoubleClick"), Lr("focusin", "onFocus"), Lr("focusout", "onBlur"), Lr(jr, "onTransitionRun"), Lr(Mr, "onTransitionStart"), Lr(Nr, "onTransitionCancel"), Lr(Pr, "onTransitionEnd"), ut("onMouseEnter", ["mouseout", "mouseover"]), ut("onMouseLeave", ["mouseout", "mouseover"]), ut("onPointerEnter", ["pointerout", "pointerover"]), ut("onPointerLeave", ["pointerout", "pointerover"]), lt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), lt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), lt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), lt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), lt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), lt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Rr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Rr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[Xe];
		n === void 0 && (n = t[Xe] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, st.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !Zt || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = nt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Jt(function() {
			var r = a, i = Ut(n), s = [];
			a: {
				var c = Fr.get(e);
				if (c !== void 0) {
					var l = ln, u = e;
					switch (e) {
						case "keypress": if (rn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Dn;
							break;
						case "focusin":
							u = "focus", l = vn;
							break;
						case "focusout":
							u = "blur", l = vn;
							break;
						case "beforeblur":
						case "afterblur":
							l = vn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = gn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = _n;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = kn;
							break;
						case Or:
						case kr:
						case Ar:
							l = yn;
							break;
						case Pr:
							l = An;
							break;
						case "scroll":
						case "scrollend":
							l = dn;
							break;
						case "wheel":
							l = jn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = bn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = On;
							break;
						case "toggle":
						case "beforetoggle": l = Mn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Yt(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Ht && (u = n.relatedTarget || n.fromElement) && (nt(u) || u[Ye])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? nt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = gn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = On, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : it(l), h = u == null ? c : it(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, nt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? it(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = Qn;
					else if (Kn(c)) {
						if ($n) v = cr;
						else {
							v = or;
							var y = ar;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Lt(r.elementType) && (v = Qn) : v = sr;
					if (v && (v = v(e, r))) {
						qn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Dt(c, "number", c.value);
				}
				switch (y = r ? it(r) : window, e) {
					case "focusin":
						(Kn(y) || y.contentEditable === "true") && (vr = y, yr = r, br = null);
						break;
					case "focusout":
						br = yr = vr = null;
						break;
					case "mousedown":
						xr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						xr = !1, Sr(s, n, i);
						break;
					case "selectionchange": if (_r) break;
					case "keydown":
					case "keyup": Sr(s, n, i);
				}
				var b;
				if (Pn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else Hn ? Bn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Ln && n.locale !== "ko" && (Hn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Hn && (b = nn()) : ($t = i, en = "value" in $t ? $t.value : $t.textContent, Hn = !0)), y = Td(r, x), 0 < y.length && (x = new xn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Vn(n), b !== null && (x.data = b)))), (b = In ? Un(e, n) : Wn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new xn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Yt(e, n), i != null && r.unshift(wd(e, i, a)), i = Yt(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Yt(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = Yt(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || jt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && jt(e, "" + r);
				break;
			case "className":
				gt(e, "class", r);
				break;
			case "tabIndex":
				gt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				gt(e, n, r);
				break;
			case "style":
				It(e, r, o);
				break;
			case "data": if (t !== "object") {
				gt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Bt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Bt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Vt);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = Bt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), ht(e, "popover", r);
				break;
			case "xlinkActuate":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				_t(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				_t(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				_t(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				_t(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				ht(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Rt.get(n) || n, ht(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				It(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? jt(e, r) : (typeof r == "number" || typeof r == "bigint") && jt(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Vt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ct.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[Je] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : ht(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				Et(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Ot(e, !!r, n, !0) : Ot(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				At(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) $(gd[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (Lt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				Tt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Ot(e, !!n, n ? [] : "", !1) : Ot(e, !!n, t, !0)) : Ot(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				kt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (Lt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Np(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") pf(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, pf(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[et] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && pf(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), tt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[et]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		tt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = P.d;
	P.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = vu();
		return e || t;
	}
	function yf(e) {
		var t = rt(e);
		t !== null && t.tag === 5 && t.type === "form" ? vs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = wt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), ot(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + wt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + wt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + wt(n.imageSizes) + "\"]")) : i += "[href=\"" + wt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = f({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), ot(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + wt(r) + "\"][href=\"" + wt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = f({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), ot(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = at(r).hoistableStyles, a = Af(e);
			t = t || "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = f({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					ot(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = at(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ot(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = at(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), ot(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = ee.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = at(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = at(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = at(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + wt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return f({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), ot(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + wt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + wt(n.href) + "\"]");
				if (r) return t.instance = r, ot(r), r;
				var a = f({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), ot(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, ot(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), ot(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, ot(a), a) : (r = n, (a = mf.get(o)) && (r = f({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), ot(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ?? (e.crossOrigin = t.crossOrigin), e.referrerPolicy ?? (e.referrerPolicy = t.referrerPolicy), e.title ?? (e.title = t.title);
	}
	function zf(e, t) {
		e.crossOrigin ?? (e.crossOrigin = t.crossOrigin), e.referrerPolicy ?? (e.referrerPolicy = t.referrerPolicy), e.integrity ?? (e.integrity = t.integrity);
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[et] || a[qe] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, ot(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), ot(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: b,
		Provider: null,
		Consumer: null,
		_currentValue: F,
		_currentValue2: F,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ie(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ie(0), this.hiddenUpdates = Ie(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Xr(3, null, null, t), e.current = a, a.stateNode = e, t = Zi(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Aa(a), e;
	}
	function tp(e) {
		return e ? (e = Jr, e) : Jr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ma(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Na(e, r, t), n !== null && (pu(n, e, t), Pa(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Gr(e, 67108864);
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = He(t);
			var n = Gr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 2, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = N.T;
		N.T = null;
		var a = P.p;
		try {
			P.p = 8, up(e, t, n, r);
		} finally {
			P.p = a, N.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = rt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = je(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - J(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(Nl & 6) && ($l = me() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Gr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Ut(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = nt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (he()) {
				case ge: return 2;
				case _e: return 8;
				case ve:
				case ye: return 32;
				case be: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = rt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = nt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, Ge(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, Ge(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Ht = r, n.target.dispatchEvent(r), Ht = null;
			} else return t = rt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = rt(n);
				a !== null && (e.splice(t, 3), t -= 3, gs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Je] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Je] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), vu(), t[Ye] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = We();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.8") throw Error(i(527, Lp, "19.2.8"));
	P.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: N,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ce = zp.inject(Rp), we = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = zs, s = Bs, c = Vs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[Ye] = t.current, xd(e), new Fp(t);
	};
})), It = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = Ft();
})))(), Lt = "__HA_LIQUID_GLASS_REACT_CARD_RUNTIME__", Rt = globalThis, zt = Rt[Lt] ?? (Rt[Lt] = {
	constructors: /* @__PURE__ */ new Map(),
	definitions: /* @__PURE__ */ new Map(),
	instances: /* @__PURE__ */ new Map()
});
function Bt(e) {
	let t = e.tagName, n = e;
	zt.definitions.set(t, n);
	let r = zt.constructors.get(t), i = customElements.get(t);
	if (r && i === r) {
		let n = i;
		n.getConfigElement = e.getConfigElement, n.getStubConfig = e.getStubConfig;
		for (let e of zt.instances.get(t) ?? []) e.requestRender();
		return n;
	}
	if (i) {
		let n = i;
		zt.constructors.set(t, n), n.getConfigElement = e.getConfigElement, n.getStubConfig = e.getStubConfig;
		for (let e of zt.instances.get(t) ?? []) e.requestRender();
		return n;
	}
	zt.constructors.delete(t);
	class a extends HTMLElement {
		constructor() {
			super(), this.renderQueued = !1;
			let e = this.attachShadow({ mode: "open" });
			this.mountNode = document.createElement("div"), this.mountNode.setAttribute("part", "root"), e.append(this.mountNode);
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
		connectedCallback() {
			let e = zt.instances.get(t) ?? /* @__PURE__ */ new Set();
			e.add(this), zt.instances.set(t, e), this.requestRender();
		}
		disconnectedCallback() {
			zt.instances.get(t)?.delete(this), this.root?.unmount(), this.root = void 0;
		}
		requestRender() {
			this.isConnected && this.configValue && !this.renderQueued && (this.renderQueued = !0, queueMicrotask(() => {
				if (this.renderQueued = !1, !this.isConnected || !this.configValue) return;
				this.root ?? (this.root = (0, It.createRoot)(this.mountNode));
				let e = this.currentDefinition();
				this.root.render((0, K.createElement)(e.component, {
					config: this.configValue,
					hass: this.hassValue,
					host: this
				}));
			}));
		}
		currentDefinition() {
			let e = zt.definitions.get(t);
			if (!e) throw Error(`React card definition for "${t}" is unavailable`);
			return e;
		}
	}
	let o = a;
	return e.getConfigElement && (o.getConfigElement = e.getConfigElement), e.getStubConfig && (o.getStubConfig = e.getStubConfig), zt.constructors.set(t, o), customElements.define(t, o), o;
}
//#endregion
//#region src/react/platform.ts
var Vt = typeof navigator > "u" ? "" : navigator.userAgent, Ht = /(?:^|[; (])wv(?:[;) ]|$)|Home[ /]?Assistant/i, Ut = Ht.test(Vt);
function Wt(e = Vt) {
	return e === Vt ? Ut : Ht.test(e);
}
function Gt(e, t = Vt) {
	return e === !0 || e !== !1 && !Wt(t);
}
function Kt(e, t = Vt) {
	return e === "high" || e === "medium" ? e : /Android/i.test(t) ? "medium" : "high";
}
//#endregion
//#region src/react/define-liquid-glass-card.ts
var qt = async () => (await At(), document.createElement("liquid-glass-card-editor"));
function Jt(e) {
	let t = e.component;
	return Bt({
		...e,
		component: (e) => (0, K.createElement)(ct.Provider, { value: Kt(e.config.refraction_quality) }, (0, K.createElement)(t, e)),
		normalizeConfig: (e) => ({
			refraction: "auto",
			refraction_quality: "auto",
			theme: "auto",
			...e
		}),
		getConfigElement: qt
	});
}
//#endregion
//#region src/react/glass-slider.tsx
var Yt = .05, Xt = 30, Zt = {
	ease: De(.34, 1.36, .42, 1),
	duration: .27
}, Qt = {
	ease: De(.36, 0, .18, 1),
	duration: .46
}, $t = {
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
}, en = {
	restEdgeShadow: "0 1.333px 5.333px rgba(0, 0, 0, 0.5)",
	scaleX: .133,
	scaleY: .135,
	brightness: .12,
	sheenAngle: 45,
	glowFalloff: 1.5,
	sheen: .5,
	sheenWidth: 1,
	sheenFalloff: 1.5
}, tn = {
	restEdgeShadow: "0 1.333px 5.333px rgba(46, 15, 15, 0.12)",
	scaleX: .1,
	scaleY: .1,
	brightness: -.02,
	sheenAngle: 30,
	glowFalloff: 2,
	sheen: 1,
	sheenWidth: 1,
	sheenFalloff: 1
}, nn = { scaleY: .25 }, rn = typeof navigator < "u" && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent);
function an(e, t) {
	let n = lt();
	return (0, K.useMemo)(() => dt({
		...$t,
		...t === "dark" ? en : tn,
		...rn ? nn : null,
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
var on = "\n  .lg-react-slider {\n    --lg-effective-slider-height: var(--lg-slider-height, 44px);\n    --lg-effective-bar-height: var(--lg-slider-bar-height, 6px);\n    --lg-effective-thumb-width: var(--lg-slider-thumb-width, var(--lg-slider-knob-size, 22px));\n    --lg-effective-thumb-height: var(--lg-slider-thumb-height, 34px);\n    position: relative;\n    display: block;\n    width: 100%;\n    height: var(--lg-slider-height, 44px);\n    overflow: visible;\n    touch-action: none;\n    user-select: none;\n    -webkit-user-select: none;\n  }\n  .lg-react-slider.disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n  .slider-glass {\n    position: absolute !important;\n    overflow: visible !important;\n  }\n  .slider-content,\n  .slider-refraction-content { box-sizing: content-box; }\n  .slider-refraction-content {\n    display: flex;\n    align-items: center;\n  }\n  .slider-track {\n    position: relative;\n    width: 100%;\n    height: var(--lg-effective-slider-height);\n    border-radius: 999px;\n    cursor: pointer;\n    touch-action: none;\n  }\n  .lg-react-slider.disabled .slider-track { cursor: not-allowed; }\n  .slider-track:focus-visible {\n    outline: 2px solid var(--lg-cool-deep);\n    outline-offset: 2px;\n  }\n  .slider-bar,\n  .slider-refraction-bar {\n    position: absolute;\n    inset-inline: 0;\n    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-bar-height)) / 2);\n    height: var(--lg-effective-bar-height);\n    overflow: hidden;\n    border-radius: 999px;\n    background: var(--lg-slider-track, var(--lg-slider-bar-bg));\n  }\n  .slider-refraction-bar {\n    position: relative;\n    inset: auto;\n    top: auto;\n    transform-origin: center;\n  }\n  .slider-fill {\n    position: absolute;\n    inset-block: 0;\n    left: 0;\n    border-radius: inherit;\n    background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));\n    pointer-events: none;\n  }\n  .slider-fill.clipped {\n    inset-inline: 0;\n    transition: clip-path 0.35s cubic-bezier(0.3, 0.8, 0.3, 1);\n  }\n  .lg-react-slider.active .slider-fill.clipped { transition: none; }\n  .slider-anchor {\n    position: absolute;\n    top: 50%;\n    width: 2px;\n    height: calc(var(--lg-effective-bar-height) + 6px);\n    margin-left: -1px;\n    transform: translateY(-50%);\n    border-radius: 1px;\n    background: var(--lg-slider-mark);\n    pointer-events: none;\n  }\n  .marks {\n    position: absolute;\n    inset-block: 0;\n    inset-inline: calc(var(--lg-effective-thumb-width) / 2 - 2px);\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    pointer-events: none;\n  }\n  .marks span {\n    width: 4px;\n    height: 4px;\n    border-radius: 50%;\n    background: var(--lg-slider-mark);\n  }\n  .slider-knob {\n    position: absolute;\n    top: calc((var(--lg-effective-slider-height) - var(--lg-effective-thumb-height)) / 2);\n    left: 0;\n    width: var(--lg-effective-thumb-width);\n    height: var(--lg-effective-thumb-height);\n    border-radius: 999px;\n    pointer-events: none;\n  }\n  .slider-knob.static {\n    background: var(--lg-knob-solid);\n    box-shadow: var(--lg-knob-shadow);\n  }\n  .knob-probe {\n    position: absolute;\n    visibility: hidden;\n    width: var(--lg-effective-thumb-width);\n    height: var(--lg-effective-thumb-height);\n    pointer-events: none;\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .slider-fill.clipped { transition-duration: 0.01ms !important; }\n  }\n", sn = (e, t, n, r) => {
	let i = Math.max(0, e - n), a = e * Yt, o = Math.ceil(.5 * Math.max(n / 2, r / 2) + a) + 2;
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
}, cn = sn(240, 44, 22, 34), ln = (e, t) => e.trackW === t.trackW && e.controlH === t.controlH && e.thumbW === t.thumbW && e.thumbH === t.thumbH && e.pad === t.pad;
function un({ value: e, highValue: t, min: n, max: r, step: i, keyboardStep: a, restTintOpacity: o = 1, disabled: s = !1, refraction: c, scheme: l = "light", showFill: u = !0, clipFill: d = !1, showKnob: f = !0, fillFrom: p, ticks: m = 0, label: h, valueText: g, trackContent: _, thumbContent: v, onInput: b, onChange: x }) {
	let S = lt(), C = an(c, l), w = t !== void 0, T = (0, K.useRef)(null), E = (0, K.useRef)(null), D = (0, K.useRef)(null), O = (0, K.useRef)(null), k = (0, K.useRef)(!1), A = (0, K.useRef)(0), j = (0, K.useRef)(0), M = (0, K.useRef)("low"), N = (0, K.useRef)(cn), P = (0, K.useRef)({
		value: e,
		highValue: t,
		min: n,
		max: r,
		step: i
	});
	P.current = {
		value: e,
		highValue: t,
		min: n,
		max: r,
		step: i
	};
	let F = (0, K.useRef)(o);
	F.current = o;
	let [I, L] = (0, K.useState)(cn), [R, z] = (0, K.useState)("low"), [B, V] = (0, K.useState)(), [H, ee] = (0, K.useState)(!1), te = (0, K.useRef)(void 0), ne = (0, K.useCallback)((e, t = N.current) => {
		let n = P.current.max - P.current.min;
		return n > 0 ? (e - P.current.min) / n * t.travel : 0;
	}, []), U = (0, K.useCallback)((e, t = N.current) => {
		let { min: n, max: r, step: i } = P.current, a = y(e, 0, t.travel), o = t.travel > 0 ? n + a / t.travel * (r - n) : n;
		return y(i > 0 ? Math.round((o - n) / i) * i + n : o, n, r);
	}, []), re = (0, K.useRef)(e), W = (0, K.useMemo)(() => {
		let e = J(cn.travel * y((re.current - P.current.min) / (P.current.max - P.current.min || 1), 0, 1)), t = J(cn.fullW), n = J(cn.pad), r = J(cn.thumbW), i = J(cn.thumbW / 2), a = J(cn.thumbH / 2), o = J(Math.min(cn.thumbW, cn.thumbH) / 2), s = J(F.current), c = J(.85), l = J(.525), u = J(0), d = Ee([u], () => 1 - u.get()), f = J(0);
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
			shadowOpacity: u,
			restShadowOpacity: d,
			stretch: f,
			lensX: Ee([
				e,
				t,
				n,
				r
			], () => (n.get() + r.get() / 2 + e.get()) / t.get()),
			lensW: Ee([i, f], () => i.get() * (1 - .2 * f.get()) * 2),
			lensH: Ee([a, f], () => a.get() * (1 + .4 * f.get()) * 2)
		};
	}, []), ie = (0, K.useRef)(0), G = (0, K.useRef)(() => {}), ae = (0, K.useMemo)(() => J(0), []);
	at(c ? W.thumbX : ae, W.stretch, ie, G);
	let oe = (0, K.useCallback)(() => {
		let n = T.current, r = E.current, i = D.current;
		if (!n || !r || !i) return;
		let a = n.getBoundingClientRect(), o = r.getBoundingClientRect(), s = i.getBoundingClientRect(), c = N.current, l = sn(a.width || o.width || c.trackW, o.height || c.controlH, s.width || i.offsetWidth || c.thumbW, s.height || i.offsetHeight || c.thumbH);
		if (N.current = l, W.surfaceW.set(l.fullW), W.pad.set(l.pad), W.thumbW.set(l.thumbW), !k.current) {
			W.halfW.set(l.thumbW / 2), W.halfH.set(l.thumbH / 2), W.radius.set(Math.min(l.thumbW, l.thumbH) / 2);
			let n = M.current === "high" ? t ?? e : e;
			W.thumbX.set(ne(n, l));
		}
		L((e) => ln(e, l) ? e : l);
	}, [
		t,
		W,
		e,
		ne
	]);
	(0, K.useLayoutEffect)(() => {
		if (oe(), typeof ResizeObserver > "u" || !T.current) return;
		let e = new ResizeObserver(oe);
		return e.observe(T.current), () => e.disconnect();
	}, [oe]), (0, K.useEffect)(() => {
		if (k.current || !f) return;
		let n = M.current === "high" ? t ?? e : e;
		W.thumbX.set(ne(n));
	}, [
		t,
		W.thumbX,
		f,
		e,
		ne
	]), (0, K.useEffect)(() => () => {
		window.clearTimeout(te.current);
		let e = O.current;
		e !== null && E.current?.hasPointerCapture?.(e) && E.current.releasePointerCapture(e);
	}, []);
	let se = (0, K.useCallback)(() => {
		c && (Y(W.halfW, 1.5 * N.current.thumbW / 2, Zt), Y(W.halfH, 1.5 * N.current.thumbH / 2, Zt), Y(W.radius, 1.5 * Math.min(N.current.thumbW, N.current.thumbH) / 2, Zt), Y(W.tintOpacity, 0, Zt), Y(W.trackScaleX, .95, Zt), Y(W.trackScaleY, .975, Zt), Y(W.shadowOpacity, 1, Zt));
	}, [W, c]), ce = (0, K.useCallback)(() => {
		c && (Y(W.halfW, N.current.thumbW / 2, Qt), Y(W.halfH, N.current.thumbH / 2, Qt), Y(W.radius, Math.min(N.current.thumbW, N.current.thumbH) / 2, Qt), Y(W.tintOpacity, F.current, Qt), Y(W.trackScaleX, .85, Qt), Y(W.trackScaleY, .525, Qt), Y(W.shadowOpacity, 0, Qt));
	}, [W, c]), le = (0, K.useCallback)(() => {
		se(), c && (ie.current = .175, G.current());
	}, [se, c]), ue = B?.handle === "low" ? B.value : e, de = B?.handle === "high" ? B.value : t ?? e, fe = (e) => {
		if (s || !f || e.button !== 0 || O.current !== null) return;
		e.preventDefault(), oe(), O.current = e.pointerId, e.currentTarget.setPointerCapture?.(e.pointerId), k.current = !0, e.currentTarget.focus({ preventScroll: !0 });
		let t = e.currentTarget.getBoundingClientRect(), n = y(e.clientX - t.left - N.current.thumbW / 2, 0, N.current.travel), r = U(n), i = w && Math.abs(r - de) < Math.abs(r - ue) ? "high" : "low";
		M.current = i, z(i), W.thumbX.set(n), V({
			handle: i,
			value: r
		}), A.current = e.clientX, j.current = n, le(), b(r, i);
	}, pe = (e) => {
		if (e.pointerId !== O.current) return;
		let t = j.current + e.clientX - A.current, n = N.current.trackW * Yt, r = n * Xt;
		t < 0 ? t = -ot(-t, n, r) : t > N.current.travel && (t = N.current.travel + ot(t - N.current.travel, n, r)), W.thumbX.set(t);
		let i = U(t), a = M.current;
		V({
			handle: a,
			value: i
		}), b(i, a);
	}, me = (e) => {
		if (e.pointerId !== O.current) return;
		let t = M.current, n = y(W.thumbX.get(), 0, N.current.travel), r = U(n);
		O.current = null, k.current = !1, ie.current = 0, V(void 0), Y(W.thumbX, n, Qt), ce(), x(r, t);
	}, he = (t) => {
		if (s || !f || w) return;
		let o = a ?? (i > 0 ? i : (r - n) / 20), c = e;
		if (t.key === "ArrowRight" || t.key === "ArrowUp") c += o;
		else if (t.key === "ArrowLeft" || t.key === "ArrowDown") c -= o;
		else if (t.key === "Home") c = n;
		else if (t.key === "End") c = r;
		else return;
		t.preventDefault(), c = y(c, n, r), M.current = "low", z("low"), W.thumbX.set(ne(c)), ee(!0), le(), window.clearTimeout(te.current), te.current = window.setTimeout(() => {
			ie.current = 0, ee(!1), ce();
		}, 320), x(c, "low");
	}, ge = r - n || 1, _e = (e) => y((e - n) / ge, 0, 1), ve = _e(ue), ye = _e(de), be = f ? "(100% - var(--lg-effective-thumb-width))" : "100%", xe = (e) => f ? `calc(var(--lg-effective-thumb-width) / 2 + ${be} * ${e})` : `${(e * 100).toFixed(3)}%`, Se = p === void 0 ? void 0 : y((p - n) / ge, 0, 1), Ce = Se === void 0 ? w ? ve : 0 : Math.min(Se, ye), we = Se === void 0 ? ye : Math.max(Se, ye), Te = d ? { clipPath: `inset(0 calc(100% - ${xe(we)}) 0 ${w || Se !== void 0 ? xe(Ce) : "0px"} round 999px)` } : Se !== void 0 || w ? {
		left: xe(Ce),
		width: `calc(${be} * ${we - Ce})`
	} : { width: xe(we) }, De = w ? [{
		key: "low",
		ratio: ve
	}, {
		key: "high",
		ratio: ye
	}] : [{
		key: "low",
		ratio: ye
	}], Oe = B !== void 0 || H, ke = /* @__PURE__ */ (0, q.jsxs)("div", {
		ref: E,
		className: "slider-track",
		role: "slider",
		tabIndex: s ? -1 : 0,
		"aria-label": h,
		"aria-valuemin": n,
		"aria-valuemax": r,
		"aria-valuenow": w ? void 0 : de,
		"aria-valuetext": g ?? (w ? `${ue}-${de}` : void 0),
		"aria-disabled": s,
		onPointerDown: fe,
		onPointerMove: pe,
		onPointerUp: me,
		onPointerCancel: me,
		onKeyDown: he,
		onDragStart: (e) => e.preventDefault(),
		children: [
			/* @__PURE__ */ (0, q.jsx)("div", {
				className: "slider-bar",
				children: u && /* @__PURE__ */ (0, q.jsx)("div", {
					className: `slider-fill${d ? " clipped" : ""}`,
					style: Te
				})
			}),
			_,
			Se !== void 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "slider-anchor",
				style: { left: xe(Se) },
				"aria-hidden": "true"
			}),
			m > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "marks",
				"aria-hidden": "true",
				children: Array.from({ length: m }, (e, t) => /* @__PURE__ */ (0, q.jsx)("span", {}, t))
			}),
			f && /* @__PURE__ */ (0, q.jsx)("div", {
				ref: D,
				className: "knob-probe",
				"aria-hidden": "true"
			}),
			f && De.filter(({ key: e }) => e !== R).map(({ key: e, ratio: t }) => /* @__PURE__ */ (0, q.jsx)("div", {
				className: "slider-knob static",
				style: { left: `calc(${be} * ${t})` },
				"aria-hidden": "true",
				children: v
			}, e)),
			f && /* @__PURE__ */ (0, q.jsx)(st, {
				x: W.thumbX,
				className: `slider-knob moving${c ? "" : " static"}`,
				"aria-hidden": "true",
				children: v
			})
		]
	});
	return !f || !c ? /* @__PURE__ */ (0, q.jsx)("div", {
		ref: T,
		className: `lg-react-slider${Oe ? " active" : ""}${s ? " disabled" : ""}`,
		children: ke
	}) : /* @__PURE__ */ (0, q.jsx)("div", {
		ref: T,
		className: `lg-react-slider${Oe ? " active" : ""}${s ? " disabled" : ""}`,
		children: /* @__PURE__ */ (0, q.jsx)(Xe, {
			className: "slider-glass",
			optics: C,
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
			filterResolution: ut(S),
			behind: l === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				left: -I.pad,
				top: -I.pad,
				width: I.fullW,
				height: I.fullH
			},
			refract: c ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "slider-refraction-content",
				"data-lg-refraction-source": "copy",
				"aria-hidden": "true",
				style: {
					padding: I.pad,
					width: I.trackW,
					height: I.controlH
				},
				children: /* @__PURE__ */ (0, q.jsx)(st, {
					className: "slider-refraction-bar",
					scaleX: W.trackScaleX,
					scaleY: W.trackScaleY,
					style: {
						width: I.trackW,
						height: I.refractionTrackH,
						borderRadius: I.refractionTrackH / 2
					},
					children: u && /* @__PURE__ */ (0, q.jsx)("div", {
						className: `slider-fill${d ? " clipped" : ""}`,
						style: Te
					})
				})
			}) : void 0,
			children: /* @__PURE__ */ (0, q.jsx)("div", {
				className: "slider-content",
				style: { padding: I.pad },
				children: ke
			})
		})
	});
}
//#endregion
//#region src/react/glass-switch.tsx
var dn = De(.34, 1.36, .42, 1), fn = De(.36, 0, .18, 1), pn = {
	ease: dn,
	duration: .52
}, mn = {
	ease: dn,
	duration: .26
}, hn = {
	ease: fn,
	duration: .46
}, gn = {
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
}, _n = {
	brightness: .12,
	glow: .4,
	sheen: .5
}, vn = {
	brightness: -.02,
	sheenAngle: 30,
	specular: 1.5,
	glow: .4,
	glowSpread: .5,
	glowFalloff: 2,
	sheen: 1,
	sheenWidth: 1.5,
	sheenFalloff: 1
}, yn = "color-mix(in srgb, var(--glass-track), var(--glass-active) calc(var(--switch-progress, 0) * 100%))", bn = "\n  .lg-glass-switch:has(> input:focus-visible) {\n    outline: 2px solid var(--glass-active, var(--lg-accent));\n    outline-offset: 3px;\n  }\n  .lg-glass-switch-static-puck {\n    width: 100%;\n    height: 100%;\n    border-radius: inherit;\n    background: #fff;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24), 0 4px 10px rgba(0, 0, 0, 0.14);\n    transform: scale(1);\n    transition:\n      transform 0.26s cubic-bezier(0.34, 1.36, 0.42, 1),\n      background 0.26s ease,\n      box-shadow 0.26s ease;\n  }\n  .lg-glass-switch-static-puck.expanded {\n    background: rgba(255, 255, 255, 0.34);\n    box-shadow:\n      inset 0 0 0 1px rgba(255, 255, 255, 0.72),\n      0 2px 6px rgba(0, 0, 0, 0.16);\n    transform: scale(1.5);\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .lg-glass-switch-static-puck {\n      transition-duration: 0.01ms;\n    }\n  }\n";
function xn({ checked: e, onCheckedChange: t, disabled: n = !1, ariaLabel: r, width: i = 74, height: a = 28, refraction: o = !0, scheme: s = "light", trackColor: c, activeColor: l, surface: u }) {
	let d = lt(), f = s === "dark", p = Math.round(.6 * i), m = a - 6, h = i - p - 6, g = i * .15, _ = g * 10, v = a / 2, y = m / 2, b = p / 2, x = m / 2, S = Math.round(.75 * a), C = Math.ceil(.5 * Math.max(b, x) + g) + 2, w = i + 2 * C, T = a + 2 * C, E = (0, K.useRef)(h), D = (0, K.useRef)(p), O = (0, K.useRef)(w), k = (0, K.useRef)(C), A = (0, K.useRef)(b), j = (0, K.useRef)(x), M = (0, K.useRef)(y);
	(0, K.useLayoutEffect)(() => {
		E.current = h, D.current = p, O.current = w, k.current = C, A.current = b, j.current = x, M.current = y;
	});
	let N = (0, K.useMemo)(() => {
		let t = J(e ? E.current : 0), n = Ee([t], () => (k.current + 3 + D.current / 2 + t.get()) / O.current), r = J(A.current), i = J(j.current), a = J(M.current), o = J(1), s = J(.85), c = J(.525), l = J(0), u = Ee([l], () => 1 - l.get()), d = J(0);
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
			lensWidth: Ee([r, d], () => r.get() * (1 - .2 * d.get()) * 2),
			lensHeight: Ee([i, d], () => i.get() * (1 + .4 * d.get()) * 2),
			edgeBias: Ee([o], () => .5 * o.get())
		};
	}, []), P = (0, K.useRef)(0), F = (0, K.useRef)(() => {});
	at(N.thumbX, N.stretch, P, F);
	let [I, L] = (0, K.useState)(!1), [R, z] = (0, K.useState)(!1), B = () => {
		L(!0), Y(N.halfWidth, 1.5 * A.current, mn), Y(N.halfHeight, 1.5 * j.current, mn), Y(N.radius, 1.5 * M.current, mn), Y(N.tintOpacity, 0, mn), Y(N.trackScaleX, .95, mn), Y(N.trackScaleY, .975, mn), Y(N.shadowOpacity, 1, mn);
	}, V = () => {
		L(!1), Y(N.halfWidth, A.current, hn), Y(N.halfHeight, j.current, hn), Y(N.radius, M.current, hn), Y(N.tintOpacity, 1, hn), Y(N.trackScaleX, .85, hn), Y(N.trackScaleY, .525, hn), Y(N.shadowOpacity, 0, hn);
	}, H = (0, K.useRef)("idle"), ee = (0, K.useRef)(void 0), te = (0, K.useRef)(void 0), ne = (0, K.useRef)(!0), U = (0, K.useRef)(!1), re = (0, K.useRef)(null), W = (0, K.useRef)(null), ie = (0, K.useRef)(null), G = (0, K.useRef)(0), ae = (0, K.useRef)(0), oe = (0, K.useRef)(!1), se = (0, K.useRef)(null);
	(0, K.useEffect)(() => () => {
		if (ne.current = !1, clearTimeout(ee.current), clearTimeout(te.current), ie.current !== null && W.current) try {
			W.current.releasePointerCapture(ie.current);
		} catch {}
	}, []), (0, K.useEffect)(() => {
		R || H.current === "tap" || (se.current = Y(N.thumbX, e ? h : 0, pn));
	}, [
		e,
		R,
		N.thumbX,
		h
	]), (0, K.useLayoutEffect)(() => {
		let e = (e) => {
			let t = E.current;
			re.current?.style.setProperty("--switch-progress", String(t > 0 ? Math.max(0, Math.min(1, e / t)) : 0));
		};
		return e(N.thumbX.get()), N.thumbX.on("change", e);
	}, [N.thumbX]);
	let ce = (0, K.useMemo)(() => dt({
		...gn,
		...f ? _n : vn,
		sheenDark: !f
	}, d), [f, d]), le = (e) => {
		U.current || (t?.(e), H.current === "idle" && (H.current = "tap", B(), clearTimeout(te.current), te.current = setTimeout(V, 290), se.current = Y(N.thumbX, e ? h : 0, {
			...pn,
			onComplete: () => {
				ne.current && H.current === "tap" && (H.current = "idle");
			}
		})));
	}, ue = /* @__PURE__ */ (0, q.jsx)(st, {
		ref: W,
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
			ie.current !== null || n || e.button !== 0 || (ie.current = e.pointerId, e.currentTarget.setPointerCapture(e.pointerId), G.current = e.clientX, ae.current = N.thumbX.get(), oe.current = !1, z(!0), U.current = !0, clearTimeout(ee.current), clearTimeout(te.current), H.current = "pending", ee.current = setTimeout(() => {
				H.current === "pending" && (H.current = "hold", se.current?.stop(), B(), P.current = .175, F.current());
			}, 170));
		},
		onPointerMove: (e) => {
			if (e.pointerId !== ie.current) return;
			let t = e.clientX - G.current;
			if (!oe.current) {
				if (Math.abs(t) < 3) return;
				oe.current = !0, se.current?.stop(), ae.current = N.thumbX.get(), G.current = e.clientX, clearTimeout(ee.current), P.current = 0, H.current !== "hold" && (H.current = "hold", B());
			}
			let n = ae.current + e.clientX - G.current;
			n < 0 ? n = -ot(-n, g, _) : n > h && (n = h + ot(n - h, g, _)), N.thumbX.set(n);
		},
		onPointerUp: (n) => {
			if (n.pointerId === ie.current) {
				if (ie.current = null, clearTimeout(ee.current), z(!1), oe.current) {
					H.current = "idle", V();
					let n = Math.max(0, Math.min(h, N.thumbX.get())) > h / 2;
					se.current = Y(N.thumbX, n ? h : 0, pn), n !== e && t?.(n), requestAnimationFrame(() => {
						U.current = !1;
					});
					return;
				}
				if (H.current === "pending" || H.current === "tap") {
					H.current = "tap", U.current = !1, B(), clearTimeout(te.current), te.current = setTimeout(V, 290), se.current = Y(N.thumbX, e ? 0 : h, {
						...pn,
						onComplete: () => {
							ne.current && H.current === "tap" && (H.current = "idle");
						}
					});
					return;
				}
				H.current = "idle", P.current = 0, V(), se.current = Y(N.thumbX, e ? h : 0, pn), requestAnimationFrame(() => {
					U.current = !1;
				});
			}
		},
		onPointerCancel: (t) => {
			t.pointerId === ie.current && (ie.current = null, clearTimeout(ee.current), z(!1), P.current = 0, H.current = "idle", V(), se.current = Y(N.thumbX, e ? h : 0, pn), requestAnimationFrame(() => {
				U.current = !1;
			}));
		},
		onDragStart: (e) => e.preventDefault(),
		children: !o && /* @__PURE__ */ (0, q.jsx)("div", { className: `lg-glass-switch-static-puck${I ? " expanded" : ""}` })
	}), de = c ?? (f ? "#2a2828" : "#e1dfdf"), fe = l ?? "#0a84ff", pe = u ?? (f ? "#1f1f24" : "#ffffff"), me = /* @__PURE__ */ (0, q.jsx)("div", {
		"aria-hidden": "true",
		style: {
			width: i,
			height: a,
			borderRadius: v,
			background: yn,
			position: "relative",
			overflow: "visible"
		},
		children: ue
	});
	return /* @__PURE__ */ (0, q.jsxs)("label", {
		ref: re,
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
		children: [/* @__PURE__ */ (0, q.jsx)("input", {
			type: "checkbox",
			role: "switch",
			checked: e,
			onChange: (e) => le(e.target.checked),
			onClick: (e) => {
				U.current && e.preventDefault();
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
		}), o ? /* @__PURE__ */ (0, q.jsx)(Xe, {
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
			filterResolution: ut(d),
			behind: pe,
			style: {
				width: w,
				height: T,
				overflow: "visible",
				margin: -C
			},
			refract: /* @__PURE__ */ (0, q.jsx)("div", {
				style: {
					padding: C,
					height: a,
					display: "flex",
					alignItems: "center",
					boxSizing: "content-box"
				},
				children: /* @__PURE__ */ (0, q.jsx)(st, {
					scaleX: N.trackScaleX,
					scaleY: N.trackScaleY,
					style: {
						width: i,
						height: S,
						borderRadius: S / 2,
						background: yn
					}
				})
			}),
			children: /* @__PURE__ */ (0, q.jsx)("div", {
				style: { padding: C },
				children: me
			})
		}) : me]
	});
}
//#endregion
//#region src/react/use-card-host.ts
function Sn(e, t, n) {
	let r = t.theme === "dark" || t.theme !== "light" && !!n?.themes?.darkMode, i = Gt(t.refraction), a = Kt(t.refraction_quality);
	return (0, K.useLayoutEffect)(() => {
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
//#region src/react/use-optimistic-value.ts
var Cn = 4e3;
function wn(e, t, n = Cn) {
	let [r, i] = (0, K.useState)(), [a, o] = (0, K.useState)(), s = (0, K.useRef)(void 0);
	(0, K.useEffect)(() => () => window.clearTimeout(s.current), []);
	let c = a !== void 0 && e !== void 0 && Math.abs(e - a) <= t;
	(0, K.useEffect)(() => {
		c && (window.clearTimeout(s.current), o(void 0));
	}, [c]);
	let l = (0, K.useCallback)((e) => {
		i(void 0), o(e), window.clearTimeout(s.current), s.current = window.setTimeout(() => o(void 0), n);
	}, [n]), u = (0, K.useCallback)(() => {
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
//#endregion
//#region src/styles/tokens.ts
var Tn = "\n  :host {\n    --lg-text-primary: #1c1c1e;\n    --lg-text-secondary: rgba(60, 60, 67, 0.65);\n    --lg-glass-tint: 255, 255, 255;\n    --lg-glass-tint-alpha: 0.2;\n    --lg-glass-stroke: rgba(255, 255, 255, 0.7);\n    --lg-glass-inner: rgba(255, 255, 255, 0.5);\n    /* Filter-free glass lighting used by embedded/mobile WebViews. */\n    --lg-static-glass-highlight: rgba(255, 255, 255, 0.5);\n    --lg-static-glass-sheen: rgba(255, 255, 255, 0.2);\n    --lg-static-glass-lowlight: rgba(28, 28, 30, 0.1);\n    --lg-track-bg: rgba(255, 255, 255, 0.4);\n    /* A slider knob is solid until it is dragged, when the glass under it is revealed. */\n    --lg-knob-solid: #ffffff;\n    --lg-knob-solid-rim: rgba(28, 28, 30, 0.06);\n    --lg-knob-shadow: 0 0.5px 4px rgba(28, 28, 30, 0.16), 0 6px 13px rgba(28, 28, 30, 0.18);\n    --lg-knob-shadow-active: 0 1px 6px rgba(28, 28, 30, 0.18), 0 10px 22px rgba(28, 28, 30, 0.26);\n    /* The unfilled part of a slider bar, matching the neutral fill Apple uses. */\n    --lg-slider-bar-bg: rgba(120, 120, 128, 0.24);\n    --lg-slider-mark: rgba(28, 28, 30, 0.26);\n    --lg-shadow-glass: rgba(28, 28, 30, 0.18);\n    --lg-segment-selected: rgba(255, 255, 255, 0.85);\n    --lg-glass-tint-active: 255, 255, 255;\n    --lg-glass-tint-active-alpha: 0.34;\n    --lg-glass-stroke-active: rgba(255, 255, 255, 0.82);\n    --lg-trend-up: #1e9e4a;\n    --lg-trend-up-bg: rgba(48, 209, 88, 0.18);\n    --lg-trend-down: #0a7ea4;\n    --lg-trend-down-bg: rgba(43, 179, 208, 0.18);\n    --lg-cover-badge: #0a7ea4;\n    /* A tile or chip held down. */\n    --lg-press-fill: rgba(255, 255, 255, 0.9);\n    --lg-press-stroke: rgba(94, 92, 230, 0.65);\n    --lg-press-label: #3f3dbf;\n    --lg-press-glow: rgba(94, 92, 230, 0.3);\n    --lg-motion-label: #b36a00;\n    /* Group panel: a container that holds glass cards, so it must not be glass itself. */\n    --lg-group-panel: rgba(255, 255, 255, 0.32);\n    --lg-group-panel-stroke: rgba(255, 255, 255, 0.54);\n    --lg-separator-line: rgba(28, 28, 30, 0.12);\n\n    --lg-accent: #ffb340;\n    --lg-accent-deep: #ff8a1f;\n    --lg-heat: #ff6a3d;\n    --lg-heat-deep: #ff2d55;\n    --lg-cool: #5ac8fa;\n    --lg-cool-deep: #0a84ff;\n    --lg-switch-accent: #0a84ff;\n    --lg-switch-accent-light: #6fc3ff;\n    --lg-sensor-accent: #ff9f0a;\n    --lg-alert: #ff9f0a;\n    --lg-lock-locked: #30d158;\n    --lg-lock-locked-deep: #1e9e4a;\n    --lg-lock-unlocked: #ff6b5c;\n    --lg-lock-unlocked-deep: #ff3b30;\n    --lg-warn: #ffd60a;\n    --lg-warn-deep: #e6a800;\n    --lg-warn-text: #b8860b;\n    --lg-cover-accent: #2bb3d0;\n    --lg-cover-accent-deep: #0a7ea4;\n    --lg-slider-accent: #5e5ce6;\n    --lg-slider-accent-deep: #3f3dbf;\n    --lg-slider-accent-light: #9e9cff;\n    --lg-slider-fill-light: #b0afff;\n    --lg-motion: #7c3aed;\n    --lg-motion-light: #a66bff;\n    --lg-rgb-accent: #b15cff;\n\n    --lg-font-ui: \"Inter\", \"SF Pro Text\", Roboto, system-ui, -apple-system, sans-serif;\n    --lg-font-jp: \"Inter\", \"Noto Sans JP\", \"Hiragino Sans\", \"SF Pro Text\", Roboto, system-ui, sans-serif;\n\n    --lg-radius: 40px;\n    --lg-blur: 7px;\n    --lg-saturation: 1.35;\n  }\n\n  :host([dark]) {\n    --lg-text-primary: #ffffff;\n    --lg-text-secondary: rgba(235, 235, 245, 0.65);\n    --lg-glass-tint: 28, 28, 30;\n    --lg-glass-tint-alpha: 0.24;\n    --lg-glass-stroke: rgba(255, 255, 255, 0.25);\n    --lg-glass-inner: rgba(255, 255, 255, 0.12);\n    --lg-static-glass-highlight: rgba(255, 255, 255, 0.18);\n    --lg-static-glass-sheen: rgba(255, 255, 255, 0.09);\n    --lg-static-glass-lowlight: rgba(0, 0, 0, 0.26);\n    --lg-track-bg: rgba(255, 255, 255, 0.14);\n    --lg-knob-solid: #f2f2f7;\n    --lg-knob-solid-rim: rgba(28, 28, 30, 0.12);\n    --lg-knob-shadow: 0 0.5px 4px rgba(0, 0, 0, 0.4), 0 6px 14px rgba(0, 0, 0, 0.42);\n    --lg-knob-shadow-active: 0 1px 6px rgba(0, 0, 0, 0.44), 0 10px 24px rgba(0, 0, 0, 0.5);\n    --lg-slider-bar-bg: rgba(120, 120, 128, 0.36);\n    --lg-slider-mark: rgba(255, 255, 255, 0.4);\n    --lg-shadow-glass: rgba(0, 0, 0, 0.45);\n    --lg-segment-selected: rgba(255, 255, 255, 0.2);\n    --lg-glass-tint-active: 255, 255, 255;\n    --lg-glass-tint-active-alpha: 0.22;\n    --lg-glass-stroke-active: rgba(255, 255, 255, 0.36);\n    --lg-trend-up: #4cde73;\n    --lg-trend-up-bg: rgba(48, 209, 88, 0.2);\n    --lg-trend-down: #5dd6ee;\n    --lg-trend-down-bg: rgba(93, 214, 238, 0.2);\n    --lg-cover-badge: #5dd6ee;\n    --lg-press-fill: rgba(94, 92, 230, 0.35);\n    --lg-press-stroke: rgba(176, 175, 255, 0.8);\n    --lg-press-label: #ffffff;\n    --lg-press-glow: rgba(94, 92, 230, 0.4);\n    --lg-motion-label: #ffc46b;\n    --lg-group-panel: rgba(255, 255, 255, 0.08);\n    --lg-group-panel-stroke: rgba(255, 255, 255, 0.12);\n    --lg-separator-line: rgba(255, 255, 255, 0.14);\n  }\n\n  /* Clear glass is reserved for surfaces over photos/video or user-selected showcase UI. */\n  :host([glass-variant=\"clear\"]) {\n    --lg-glass-tint-alpha: 0.07;\n    --lg-blur: 3px;\n    --lg-saturation: 1.45;\n  }\n\n  :host([dark][glass-variant=\"clear\"]) {\n    --lg-glass-tint-alpha: 0.1;\n  }\n", En = f, Dn = `${Tn}${Dt}${bt}${on}${bn}
  /* Brightness keeps its two lamps beside the bar, where a thin slider leaves room. */
  .brightness .bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brightness .bar-row .lg-react-slider {
    flex: 1;
    min-width: 0;
  }
  .brightness .sun {
    flex: none;
    display: grid;
    color: var(--sun-color, #6b5323);
    --mdc-icon-size: 24px;
  }
  .brightness .sun-dim {
    flex: none;
    display: grid;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 22px;
  }
  .temp .lg-react-slider {
    --lg-slider-track: linear-gradient(90deg, #ffa63d 0%, #ffd9a0 40%, #fff7ec 65%, #bfdbff 100%);
  }
  .hue .lg-react-slider {
    --lg-slider-track: linear-gradient(
      90deg,
      #ff3b30 0%,
      #ffcc00 17%,
      #34c759 33%,
      #32ade6 50%,
      #007aff 62%,
      #af52de 78%,
      #ff2d55 92%,
      #ff3b30 100%
    );
  }
  .sat .lg-react-slider {
    --lg-slider-track: linear-gradient(90deg, #ffffff, var(--sat-color, #b15cff));
  }
  .favorites {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .favorites .label {
    font-size: var(--lg-label);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .swatches {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }
  .swatch {
    flex: none;
    width: var(--lg-swatch, 32px);
    height: var(--lg-swatch, 32px);
    border: 0;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    background: var(--swatch);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.4),
      0 2px 3px rgba(255, 255, 255, 0.55),
      0 -2px 3px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .swatch.selected {
    box-shadow:
      inset 0 0 0 3px #fff,
      0 0 0 2px var(--swatch-glow),
      0 4px 10px var(--swatch-glow);
  }
  .swatch:active {
    transform: scale(0.92);
  }
  .swatch.add {
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    display: grid;
    place-items: center;
    --mdc-icon-size: calc(var(--lg-swatch, 32px) * 0.5);
  }
  .chip-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 14px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-swatch: clamp(24px, 8.4cqi, 32px);
    }
  }
`;
function On(e) {
	let t = parseInt(e.replace("#", ""), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	].map((e) => y(e, 0, 255));
}
function kn({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), a = g(e.language ?? t?.locale?.language ?? t?.language), [o, s] = (0, K.useState)(), c = (0, K.useRef)(void 0), l = e.entity ? t?.states[e.entity] : void 0, u = e.name ?? S(l, e.entity ?? ""), d = () => x(n, e.entity), f = l?.state === "on", p = l?.attributes.brightness, m = l?.attributes.hs_color, h = wn(f && p !== void 0 ? Math.round(p / 255 * 100) : 0, 1), _ = wn(l?.attributes.color_temp_kelvin, 25), v = wn(m?.[0], 1), y = wn(m?.[1], 1);
	if ((0, K.useEffect)(() => {
		f && p !== void 0 && (c.current = Math.round(p / 255 * 100));
	}, [f, p]), !l || w(l)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Dn }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: u,
		label: a("unavailable"),
		onOpen: d
	})] });
	let b = (n, r) => void t?.callService("light", n, {
		entity_id: e.entity,
		...r
	}), C = l.attributes, T = C.supported_color_modes ?? [], E = e.show_brightness !== !1 && T.some((e) => e !== "onoff"), k = e.show_color_temp !== !1 && T.includes("color_temp"), A = e.show_color !== !1 && T.some((e) => [
		"hs",
		"rgb",
		"rgbw",
		"rgbww",
		"xy"
	].includes(e)), j = o ?? (A ? k && C.color_mode === "color_temp" ? "color_temp" : "color" : "color_temp"), N = A && j === "color", P = h.value ?? 0, F = [C.min_color_temp_kelvin ?? 2e3, C.max_color_temp_kelvin ?? 6500], I = _.value ?? F[0], L = C.hs_color ?? [280, 85], R = v.value ?? L[0], z = y.value ?? L[1], B = C.rgb_color, V = !v.optimistic && !y.optimistic && B ? O(B) : O(D(R, z)), H = N ? V : "var(--lg-accent)", ee = f ? N ? {
		from: O(D(R, Math.min(z, 60))),
		to: V,
		glow: M(V, .24)
	} : {
		from: "#FFD36B",
		to: "var(--lg-accent-deep)",
		glow: "rgba(255, 165, 48, 0.24)"
	} : void 0, te = N ? O(D(R, Math.min(z, 10))) : "#FFF8EA", ne = N ? O(D(R, Math.min(z, 30))) : "#FFE2A6", U = N ? O(D(R, 60).map((e) => e * .5)) : "#6B5323", re = e.presets ?? [], W = e.favorites === !1 ? [] : e.favorites ?? En, ie = f ? [
		a("lit"),
		...E ? [`${P}%`] : [],
		...N ? [a("color")] : k && C.color_temp_kelvin ? [`${Math.round(I)}K`] : []
	].join(" · ") : c.current ? `${a("unlit")} · ${a("last")} ${c.current}%` : a("unlit"), G = () => b("toggle"), ae = (n) => {
		if (n.scene) {
			t?.callService("scene", "turn_on", { entity_id: n.scene });
			return;
		}
		if (n.service) {
			let [r, i] = n.service.split(".");
			t?.callService(r, i, {
				entity_id: e.entity,
				...n.data ?? {}
			});
			return;
		}
		let r = { ...n.data ?? {} };
		n.brightness !== void 0 && (r.brightness_pct = n.brightness), n.color_temp_kelvin !== void 0 && (r.color_temp_kelvin = n.color_temp_kelvin), n.rgb_color && (r.rgb_color = n.rgb_color), n.hs_color && (r.hs_color = n.hs_color), b("turn_on", r);
	};
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Dn }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: N ? V : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, q.jsx)(Ct, {
						icon: e.icon ?? C.icon ?? "mdi:lightbulb",
						style: ee,
						onClick: G
					}),
					/* @__PURE__ */ (0, q.jsx)(wt, {
						name: u,
						state: ie,
						onClick: d
					}),
					/* @__PURE__ */ (0, q.jsx)(xn, {
						checked: f,
						onCheckedChange: G,
						ariaLabel: u,
						activeColor: H,
						refraction: i,
						scheme: r ? "dark" : "light"
					})
				]
			}),
			A && k && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "segment",
				children: ["color", "color_temp"].map((e) => /* @__PURE__ */ (0, q.jsx)("button", {
					className: j === e ? "selected" : void 0,
					onClick: () => s(e),
					children: /* @__PURE__ */ (0, q.jsx)("span", { children: a(e === "color" ? "color" : "color_temp") })
				}, e))
			}),
			E && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "section brightness",
				style: {
					"--fill-from": te,
					"--fill-to": ne,
					"--sun-color": f ? U : "var(--lg-text-secondary)"
				},
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "label-row",
					children: [/* @__PURE__ */ (0, q.jsx)("span", {
						className: "label",
						children: a("brightness")
					}), /* @__PURE__ */ (0, q.jsxs)("span", {
						className: "value",
						children: [P, "%"]
					})]
				}), /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "bar-row",
					children: [
						/* @__PURE__ */ (0, q.jsx)("span", {
							className: "sun",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:white-balance-sunny" })
						}),
						/* @__PURE__ */ (0, q.jsx)(un, {
							value: P,
							min: 0,
							max: 100,
							step: 1,
							showFill: f,
							refraction: i,
							scheme: r ? "dark" : "light",
							label: a("brightness"),
							onInput: h.setPreview,
							onChange: (e) => {
								h.commit(e), b("turn_on", { brightness_pct: Math.round(e) });
							}
						}),
						/* @__PURE__ */ (0, q.jsx)("span", {
							className: "sun-dim",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:brightness-5" })
						})
					]
				})]
			}),
			k && j === "color_temp" && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: `section temp${f ? "" : " dim"}`,
				children: [
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "label-row",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "label",
							children: a("color_temp")
						}), /* @__PURE__ */ (0, q.jsxs)("span", {
							className: "value",
							children: [Math.round(I), "K"]
						})]
					}),
					/* @__PURE__ */ (0, q.jsx)(un, {
						value: I,
						min: F[0],
						max: F[1],
						step: 50,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("color_temp"),
						onInput: _.setPreview,
						onChange: (e) => {
							_.commit(e), b("turn_on", { color_temp_kelvin: Math.round(e) });
						}
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "ticks",
						children: [/* @__PURE__ */ (0, q.jsxs)("span", { children: [F[0], "K"] }), /* @__PURE__ */ (0, q.jsxs)("span", { children: [F[1], "K"] })]
					})
				]
			}),
			A && j === "color" && /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
				/* @__PURE__ */ (0, q.jsxs)("div", {
					className: `section hue${f ? "" : " dim"}`,
					children: [/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "label-row",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "label",
							children: a("hue")
						}), /* @__PURE__ */ (0, q.jsxs)("span", {
							className: "value",
							children: [Math.round(R), "°"]
						})]
					}), /* @__PURE__ */ (0, q.jsx)(un, {
						value: R,
						min: 0,
						max: 360,
						step: 1,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("hue"),
						onInput: v.setPreview,
						onChange: (e) => {
							v.commit(e), b("turn_on", { hs_color: [Math.round(e), Math.round(z)] });
						}
					})]
				}),
				/* @__PURE__ */ (0, q.jsxs)("div", {
					className: `section sat${f ? "" : " dim"}`,
					style: { "--sat-color": O(D(R, 100)) },
					children: [/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "label-row",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "label",
							children: a("saturation")
						}), /* @__PURE__ */ (0, q.jsxs)("span", {
							className: "value",
							children: [Math.round(z), "%"]
						})]
					}), /* @__PURE__ */ (0, q.jsx)(un, {
						value: z,
						min: 0,
						max: 100,
						step: 1,
						showFill: !1,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("saturation"),
						onInput: y.setPreview,
						onChange: (e) => {
							y.commit(e), b("turn_on", { hs_color: [Math.round(R), Math.round(e)] });
						}
					})]
				}),
				W.length > 0 && /* @__PURE__ */ (0, q.jsxs)("div", {
					className: `favorites${f ? "" : " muted"}`,
					children: [/* @__PURE__ */ (0, q.jsx)("div", {
						className: "label",
						children: a("favorites")
					}), /* @__PURE__ */ (0, q.jsxs)("div", {
						className: "swatches",
						children: [W.map((e) => /* @__PURE__ */ (0, q.jsx)("button", {
							className: `swatch${f && e.toLowerCase() === V.toLowerCase() ? " selected" : ""}`,
							style: {
								"--swatch": e,
								"--swatch-glow": M(e, .5)
							},
							title: e,
							onClick: () => ae({
								name: e,
								rgb_color: On(e)
							})
						}, e)), /* @__PURE__ */ (0, q.jsx)("button", {
							className: "swatch add",
							onClick: d,
							title: "More",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:plus" })
						})]
					})]
				})
			] }),
			re.length > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: `chips${f ? "" : " muted"}`,
				children: re.map((t, n) => /* @__PURE__ */ (0, q.jsx)(St, {
					className: "chip",
					refraction: i,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: H,
					style: { display: "flex" },
					children: /* @__PURE__ */ (0, q.jsxs)("button", {
						className: "chip-button",
						onClick: () => ae(t),
						children: [t.icon && /* @__PURE__ */ (0, q.jsx)(X, { icon: t.icon }), /* @__PURE__ */ (0, q.jsx)("span", { children: t.name })]
					})
				}, `${t.name}:${n}`))
			})
		]
	})] });
}
var An = Jt({
	tagName: "liquid-glass-light-card",
	component: kn,
	getCardSize: () => 5,
	getStubConfig: (e, t, n) => ({ entity: E(["light"], e, t, n, (e) => (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff")) })
}), jn = {
	ease: De(.34, 1.36, .42, 1),
	duration: .48
}, Mn = {
	ease: De(.34, 1.36, .42, 1),
	duration: .27
}, Nn = {
	ease: De(.36, 0, .18, 1),
	duration: .46
}, Pn = {
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
}, Fn = {
	scaleX: .085,
	scaleY: .115,
	brightness: .07,
	glow: .38,
	sheen: .52,
	restEdgeShadow: "0 2px 7px rgba(0, 0, 0, 0.42)"
}, In = {
	brightness: -.02,
	specular: 1.55,
	glowFalloff: 2,
	sheen: .95
}, Ln = 3, Rn = 2, zn = `
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
    top: ${Ln}px;
    bottom: ${Ln}px;
    left: calc(${Ln}px + var(--item-i) * (var(--seg-w) + ${Rn}px));
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
function Bn({ item: e, compact: t }) {
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon }), !t && /* @__PURE__ */ (0, q.jsx)("span", { children: e.label })] });
}
function Vn({ items: e, value: t, onValueChange: n, refraction: r, scheme: i, selectedColor: a, compact: o = !1, className: s, ariaLabel: c }) {
	let l = lt(), u = e.findIndex((e) => e.value === t), d = u >= 0, f = Math.max(u, 0), [p, m] = (0, K.useState)(f), [h, g] = (0, K.useState)(d), [_, v] = (0, K.useState)({
		width: 300,
		height: o ? 40 : 50
	}), [y, b] = (0, K.useState)(!1), x = (0, K.useRef)(null), S = (0, K.useRef)([]), C = (0, K.useRef)(null), w = (0, K.useRef)(0), T = (0, K.useRef)(0), E = (0, K.useRef)(!1), D = (0, K.useRef)(!1), O = (0, K.useRef)(null), k = (0, K.useRef)(void 0), A = (0, K.useRef)(!1), j = Math.max(e.length, 1), M = Math.max(1, (_.width - 6 - Rn * (j - 1)) / j), N = M + Rn, P = Math.max(1, _.height - 6), F = _.width * .045, I = F * 24, L = Math.ceil(Math.max(M / 2, P / 2) * .3 + F) + 4, R = _.width + L * 2, z = _.height + L * 2, B = (0, K.useRef)({
		segmentWidth: M,
		stepWidth: N,
		pillHeight: P,
		lensPad: L,
		lensSurfaceWidth: R
	}), V = (0, K.useRef)(i === "dark" ? .18 : .38);
	(0, K.useLayoutEffect)(() => {
		B.current = {
			segmentWidth: M,
			stepWidth: N,
			pillHeight: P,
			lensPad: L,
			lensSurfaceWidth: R
		}, V.current = i === "dark" ? .18 : .38;
	});
	let H = (0, K.useMemo)(() => {
		let e = J(f * B.current.stepWidth), t = J(B.current.segmentWidth / 2), n = J(B.current.pillHeight / 2), r = J(B.current.pillHeight / 2), i = J(V.current), a = J(0), o = Ee([a], () => 1 - a.get()), s = J(0);
		return {
			position: e,
			halfWidth: t,
			halfHeight: n,
			radius: r,
			tintOpacity: i,
			shadowOpacity: a,
			restShadowOpacity: o,
			stretch: s,
			lensWidth: Ee([t, s], () => t.get() * (1 - .16 * s.get()) * 2),
			lensHeight: Ee([n, s], () => n.get() * (1 + .34 * s.get()) * 2),
			lensX: Ee([e, t], () => (B.current.lensPad + Ln + B.current.segmentWidth / 2 + e.get()) / B.current.lensSurfaceWidth)
		};
	}, []), ee = (0, K.useRef)(0), te = (0, K.useRef)(() => {});
	at(H.position, H.stretch, ee, te);
	let ne = (0, K.useRef)(f), U = (0, K.useRef)(N);
	(0, K.useLayoutEffect)(() => {
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
	}, []), (0, K.useEffect)(() => {
		if (A.current) return;
		let e = ne.current !== f, t = U.current !== N;
		ne.current = f, U.current = N, m(f), g(d), O.current?.stop();
		let n = f * N;
		t && !e ? H.position.set(n) : O.current = Y(H.position, n, jn);
	}, [
		d,
		H.position,
		f,
		N
	]), (0, K.useEffect)(() => {
		A.current || (H.halfWidth.set(M / 2), H.halfHeight.set(P / 2), H.radius.set(P / 2));
	}, [
		H,
		P,
		M
	]), (0, K.useEffect)(() => () => {
		if (O.current?.stop(), clearTimeout(k.current), C.current !== null && x.current) try {
			x.current.releasePointerCapture(C.current);
		} catch {}
	}, []);
	let re = (0, K.useMemo)(() => dt({
		...Pn,
		...i === "dark" ? Fn : In,
		sheenDark: i !== "dark"
	}, l), [l, i]), W = () => {
		clearTimeout(k.current), b(!0);
		let e = B.current;
		Y(H.halfWidth, e.segmentWidth * .62, Mn), Y(H.halfHeight, e.pillHeight * .59, Mn), Y(H.radius, e.pillHeight * .59, Mn), Y(H.tintOpacity, .08, Mn), Y(H.shadowOpacity, 1, Mn), ee.current = .175, te.current();
	}, ie = () => {
		b(!1), ee.current = 0;
		let e = B.current;
		Y(H.halfWidth, e.segmentWidth / 2, Nn), Y(H.halfHeight, e.pillHeight / 2, Nn), Y(H.radius, e.pillHeight / 2, Nn), Y(H.tintOpacity, V.current, Nn), Y(H.shadowOpacity, 0, Nn);
	}, G = (r, i) => {
		let a = Math.max(0, Math.min(e.length - 1, r)), o = e[a];
		o && (m(a), g(!0), O.current?.stop(), O.current = Y(H.position, a * B.current.stepWidth, jn), i ? ie() : k.current = setTimeout(ie, 260), o.value !== t && n(o.value));
	}, ae = (t) => {
		let n = x.current?.getBoundingClientRect();
		if (!n || n.width <= 0) return p;
		let r = Math.max(0, Math.min(n.width - .001, t - n.left));
		return Math.max(0, Math.min(e.length - 1, Math.floor(r / n.width * e.length)));
	}, oe = (t) => {
		if (!(t.button !== 0 || C.current !== null || e.length < 2)) {
			C.current = t.pointerId, A.current = !0, E.current = !1, D.current = !1, w.current = t.clientX, T.current = H.position.get(), O.current?.stop();
			try {
				t.currentTarget.setPointerCapture(t.pointerId);
			} catch {}
			W();
		}
	}, se = (t) => {
		if (t.pointerId !== C.current) return;
		let n = t.clientX - w.current;
		if (!E.current && Math.abs(n) < 3) return;
		E.current = !0;
		let r = T.current + n, i = Math.max(0, (e.length - 1) * B.current.stepWidth);
		r < 0 ? r = -ot(-r, F, I) : r > i && (r = i + ot(r - i, F, I)), H.position.set(r);
		let a = Math.max(0, Math.min(e.length - 1, Math.round(r / B.current.stepWidth)));
		a !== p && m(a);
	}, ce = (e) => {
		if (e.pointerId === C.current) {
			if (C.current = null, A.current = !1, D.current = !0, requestAnimationFrame(() => {
				D.current = !1;
			}), E.current) {
				let e = Math.round(H.position.get() / B.current.stepWidth);
				G(e, !0);
			} else {
				let t = ae(e.clientX);
				t === p ? ie() : G(t, !1);
			}
		}
	}, le = (e) => {
		e.pointerId === C.current && (C.current = null, A.current = !1, D.current = !0, requestAnimationFrame(() => {
			D.current = !1;
		}), m(f), g(d), O.current = Y(H.position, f * B.current.stepWidth, jn), ie());
	}, ue = (e) => {
		W(), G(e, !1), S.current[e]?.focus();
	}, de = [
		s,
		"lg-glass-segmented",
		o ? "compact" : "",
		r ? "" : "static"
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		ref: x,
		className: de,
		role: "group",
		"aria-label": c,
		"data-lg-segment-pressed": y ? "" : void 0,
		style: {
			"--n": String(j),
			"--seg-w": `calc((100% - 6px - ${(j - 1) * Rn}px) / ${j})`,
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
		children: [r ? /* @__PURE__ */ (0, q.jsx)(Xe, {
			className: "lg-segment-lens",
			optics: re,
			center: {
				x: H.lensX,
				y: .5
			},
			size: [H.lensWidth, H.lensHeight],
			radius: H.radius,
			unstable_lens: {
				tintColor: "white",
				tintOpacity: H.tintOpacity,
				shadowOpacity: H.shadowOpacity,
				restShadowOpacity: H.restShadowOpacity
			},
			filterResolution: ut(l),
			behind: i === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				left: -L,
				top: -L,
				width: R,
				height: z,
				opacity: +!!h
			},
			refract: /* @__PURE__ */ (0, q.jsx)("div", {
				style: {
					padding: L,
					width: _.width,
					height: _.height
				},
				children: /* @__PURE__ */ (0, q.jsx)("div", {
					style: {
						position: "relative",
						width: "100%",
						height: "100%"
					},
					children: /* @__PURE__ */ (0, q.jsx)("div", {
						className: "lg-segment-refraction-source",
						"aria-hidden": "true"
					})
				})
			})
		}) : /* @__PURE__ */ (0, q.jsx)(st, {
			className: "lg-segment-static-pill",
			x: H.position,
			"aria-hidden": "true",
			style: {
				left: Ln,
				top: Ln,
				width: M,
				height: P,
				opacity: +!!h
			}
		}), e.map((t, n) => /* @__PURE__ */ (0, q.jsx)("button", {
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
			children: /* @__PURE__ */ (0, q.jsx)(Bn, {
				item: t,
				compact: o
			})
		}, t.value))]
	});
}
//#endregion
//#region src/cards/climate-card.tsx
var Hn = 250, Un = 24, Wn = Hn / 2 - Un / 2, Gn = 135, Kn = 4e3, qn = 270, Jn = 22, Yn = 34, Xn = (e, t = Wn) => {
	let n = e * Math.PI / 180;
	return [Hn / 2 + t * Math.cos(n), Hn / 2 + t * Math.sin(n)];
};
function Zn({ id: e, x: t, y: n, rotation: r, motionPosition: i, active: a, refraction: o, scheme: s, sourceBackground: c }) {
	let l = an(o, s), u = (0, K.useMemo)(() => ({
		...l,
		edgeShadow: "",
		edgeInsetShadow: "",
		restEdgeShadow: "",
		restEdgeInsetShadow: ""
	}), [l]), d = (0, K.useMemo)(() => {
		let e = J(i), t = J(Jn / 2), n = J(Yn / 2), r = J(Jn / 2), a = J(1), o = J(0);
		return {
			position: e,
			halfW: t,
			halfH: n,
			radius: r,
			tintOpacity: a,
			stretch: o,
			lensW: Ee([t, o], () => t.get() * (1 - .2 * o.get()) * 2),
			lensH: Ee([n, o], () => n.get() * (1 + .4 * o.get()) * 2)
		};
	}, []), f = (0, K.useRef)(0), p = (0, K.useRef)(() => {}), m = (0, K.useRef)(!1), h = (0, K.useMemo)(() => J(0), []);
	return at(o ? d.position : h, d.stretch, f, p), (0, K.useLayoutEffect)(() => {
		d.position.get() !== i && d.position.set(i);
	}, [d, i]), (0, K.useEffect)(() => {
		o && a !== m.current && (m.current = a, a ? (Y(d.halfW, 1.5 * Jn / 2, Zt), Y(d.halfH, 1.5 * Yn / 2, Zt), Y(d.radius, 1.5 * Jn / 2, Zt), Y(d.tintOpacity, 0, Zt), f.current = .175, p.current()) : (f.current = 0, Y(d.halfW, Jn / 2, Qt), Y(d.halfH, Yn / 2, Qt), Y(d.radius, Jn / 2, Qt), Y(d.tintOpacity, 1, Qt)));
	}, [
		a,
		d,
		o
	]), /* @__PURE__ */ (0, q.jsx)("div", {
		className: `dial-glass-thumb-position${a ? " active" : ""}`,
		"data-dial-glass-thumb": e,
		style: {
			left: `${(t * 100).toFixed(3)}%`,
			top: `${(n * 100).toFixed(3)}%`,
			width: 78,
			height: 90,
			transform: "translate(-50%, -50%)",
			"--dial-thumb-rotation": `${r.toFixed(3)}deg`
		},
		children: o ? /* @__PURE__ */ (0, q.jsx)(Xe, {
			className: "dial-glass-lens",
			optics: u,
			center: {
				x: .5,
				y: .5
			},
			size: [d.lensW, d.lensH],
			radius: d.radius,
			unstable_lens: {
				tintColor: "var(--lg-knob-solid)",
				tintOpacity: d.tintOpacity
			},
			filterResolution: 1,
			behind: s === "dark" ? "#1f1f24" : "#ffffff",
			style: {
				width: 78,
				height: 90
			},
			refract: /* @__PURE__ */ (0, q.jsx)("div", {
				className: "dial-refraction-source",
				"aria-hidden": "true",
				style: {
					width: "100%",
					height: "100%",
					background: c
				}
			})
		}) : /* @__PURE__ */ (0, q.jsx)("div", {
			className: "dial-thumb-static",
			"aria-hidden": "true"
		})
	});
}
function Qn(e, t) {
	let [n, r] = Xn(e), [i, a] = Xn(t);
	return `M ${n} ${r} A ${Wn} ${Wn} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}
var $n = `${Tn}${Dt}${bt}${on}${zn}
  .dial-row {
    display: flex;
    justify-content: center;
  }
  /* The SVG scales with its viewBox, so everything layered on top is positioned in
     percentages of the dial rather than in the 250px design units. */
  .dial {
    position: relative;
    width: min(${Hn}px, 100%);
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
    stroke-width: ${Un}px;
  }
  .ring-track-stroke {
    fill: none;
    stroke: var(--lg-glass-stroke);
    stroke-width: 1px;
  }
  .ring-fill {
    fill: none;
    stroke-width: ${Un}px;
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
    width: ${Jn}px;
    height: ${Yn}px;
    border-radius: ${Jn / 2}px;
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
function er(e, t) {
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
function tr(e, t) {
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
		label: t(`mode_${e}`)
	};
}
function nr({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), a = g(e.language ?? t?.locale?.language ?? t?.language), [o, s] = (0, K.useState)(), [c, l] = (0, K.useState)(), u = (0, K.useRef)(void 0), d = (0, K.useRef)(null), f = e.entity ? t?.states[e.entity] : void 0, p = e.name ?? S(f, e.entity ?? ""), m = f?.attributes ?? {};
	(0, K.useEffect)(() => () => window.clearTimeout(u.current), []);
	let h = m.target_temp_step ?? .5, _ = (e, t) => {
		let n = c?.[e];
		return n === void 0 || t !== void 0 && Math.abs(t - n) <= Math.max(h / 2, .01);
	}, v = c !== void 0 && _("single", m.temperature) && _("low", m.target_temp_low) && _("high", m.target_temp_high);
	if ((0, K.useEffect)(() => {
		v && (window.clearTimeout(u.current), l(void 0));
	}, [v]), !f || w(f)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: $n }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: p,
		label: a("unavailable"),
		onOpen: () => x(n, e.entity)
	})] });
	let b = (n, r) => void t?.callService("climate", n, {
		entity_id: e.entity,
		...r
	}), T = f.state, E = T === "off", [D, O] = [e.min_temp ?? m.min_temp ?? 7, e.max_temp ?? m.max_temp ?? 35], k = T === "heat_cool" && m.target_temp_low !== void 0, A = (e) => y((e - D) / (O - D || 1), 0, 1), j = (e, t, n) => o?.which === e ? o.value : c?.[e] ?? t ?? n, M = j("single", m.temperature, D), N = j("low", m.target_temp_low, D), P = j("high", m.target_temp_high, O), F = er(T, a), I = (e.hvac_modes ?? m.hvac_modes ?? []).filter(Boolean), L = e.design === "compact" || e.design === "a", R = m.current_temperature, z = (e, t) => {
		l((n) => ({
			...n,
			[e]: t
		})), window.clearTimeout(u.current), u.current = window.setTimeout(() => l(void 0), Kn);
	}, B = (e, t) => {
		let n = t;
		e === "single" ? b("set_temperature", { temperature: t }) : e === "low" ? (n = Math.min(t, m.target_temp_high - h), b("set_temperature", {
			target_temp_low: n,
			target_temp_high: m.target_temp_high
		})) : (n = Math.max(t, m.target_temp_low + h), b("set_temperature", {
			target_temp_low: m.target_temp_low,
			target_temp_high: n
		})), z(e, n);
	}, V = (e) => {
		let t = d.current?.getBoundingClientRect();
		if (!t) return M;
		let n = e.clientX - (t.left + t.width / 2), r = e.clientY - (t.top + t.height / 2), i = Math.atan2(r, n) * 180 / Math.PI;
		return i = ((i - Gn) % 360 + 360) % 360, i > qn && (i = i > 315 ? 0 : qn), y(Math.round((D + i / qn * (O - D)) / h) * h, D, O);
	}, H = (e) => k ? Math.abs(e - N) <= Math.abs(e - P) ? "low" : "high" : "single", ee = (e) => s({
		which: H(e),
		value: e
	}), te = () => {
		o && (s(void 0), B(o.which, o.value));
	}, ne = m.hvac_action, U = E ? a("mode_off") : ne === "heating" ? a("heating") : ne === "cooling" ? a("cooling") : ne === "drying" ? a("drying") : ne === "fan" ? a("fan_running") : ne === "idle" ? a("idle") : F.label, re = m.current_humidity, W = (e, t) => {
		let n = m[`${e}s`], r = m[e];
		return n?.length ? /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "detail",
			children: [
				/* @__PURE__ */ (0, q.jsx)(X, { icon: t }),
				/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "text",
					children: [/* @__PURE__ */ (0, q.jsx)("span", {
						className: "dl",
						children: a(e === "preset_mode" ? "preset" : e)
					}), /* @__PURE__ */ (0, q.jsx)("span", {
						className: "dv",
						children: r ?? "—"
					})]
				}),
				/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:chevron-down" }),
				/* @__PURE__ */ (0, q.jsx)("select", {
					value: r ?? "",
					onChange: (t) => b(`set_${e}`, { [e]: t.target.value }),
					children: n.map((e) => /* @__PURE__ */ (0, q.jsx)("option", {
						value: e,
						children: e
					}, e))
				})
			]
		}, e) : null;
	}, ie = /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "header",
		children: [
			/* @__PURE__ */ (0, q.jsx)(Ct, {
				icon: e.icon ?? F.icon,
				style: F.well,
				onClick: () => x(n, e.entity)
			}),
			/* @__PURE__ */ (0, q.jsx)(wt, {
				name: p,
				state: [
					U,
					...L || R === void 0 ? [] : [`${a("room_temp")} ${C(t, R, 1)}°`],
					...re === void 0 ? [] : [`${a("humidity")} ${C(t, re, 0)}%`]
				].join(" · "),
				onClick: () => x(n, e.entity)
			}),
			/* @__PURE__ */ (0, q.jsx)(Tt, {
				label: F.label,
				style: F.badge
			})
		]
	});
	if (L) {
		let [n, o] = (Math.round(M * 10) / 10).toFixed(1).split(".");
		return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: $n }), /* @__PURE__ */ (0, q.jsxs)(St, {
			className: "card climate-compact",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: F.selectedColor,
			style: {
				display: "flex",
				position: "relative",
				"--lg-slider-fill": F.selectedColor,
				"--fill-from": F.selectedColor,
				"--fill-to": F.selectedColor
			},
			children: [
				ie,
				/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "tile-readout",
					children: [/* @__PURE__ */ (0, q.jsxs)("div", {
						className: `tile-target${k ? " range" : ""}${E ? " off" : ""}`,
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "number",
							children: k ? `${C(t, N, 0)}–${C(t, P, 0)}` : C(t, Number(n), 0)
						}), /* @__PURE__ */ (0, q.jsx)("span", {
							className: "fraction",
							children: k ? "°" : `.${o}°`
						})]
					}), R !== void 0 && /* @__PURE__ */ (0, q.jsxs)("div", {
						className: "tile-room",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "caption",
							children: a("room_temp")
						}), /* @__PURE__ */ (0, q.jsxs)("span", {
							className: "value",
							children: [C(t, R, 1), "°"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, q.jsx)(un, {
					value: k ? N : M,
					highValue: k ? P : void 0,
					min: D,
					max: O,
					step: h,
					disabled: E,
					showFill: !E,
					showKnob: !E,
					clipFill: !0,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: a(k ? "target_range" : "target_temp"),
					onInput: (e, t) => s({
						which: k ? t : "single",
						value: e
					}),
					onChange: (e, t) => {
						let n = k ? t : "single";
						s(void 0), B(n, e);
					}
				}),
				I.length > 0 && /* @__PURE__ */ (0, q.jsx)(Vn, {
					className: "tile-modes",
					compact: !0,
					items: I.map((e) => {
						let t = tr(e, a);
						return {
							value: e,
							label: t.label,
							icon: e === "auto" ? "mdi:refresh" : t.icon
						};
					}),
					value: T,
					selectedColor: F.selectedColor,
					refraction: i,
					scheme: r ? "dark" : "light",
					onValueChange: (e) => b("set_hvac_mode", { hvac_mode: e })
				}),
				e.show_fan_mode === !0 && /* @__PURE__ */ (0, q.jsx)("div", {
					className: `details${E ? " muted" : ""}`,
					children: W("fan_mode", "mdi:weather-windy")
				})
			]
		})] });
	}
	let G = k ? A(N) : 0, ae = A(k ? P : M), [oe, se, ce] = F.ring, le = `linear-gradient(90deg, ${oe}, ${ce}) center / 100% 38% no-repeat,
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.42), transparent 34px)`, ue = k ? [{
		which: "low",
		value: N
	}, {
		which: "high",
		value: P
	}] : [{
		which: "single",
		value: M
	}], de = k ? `${C(t, N, 0)}–${C(t, P, 0)}` : C(t, Math.floor(M), 0), fe = k ? "°" : `.${Math.round((M - Math.floor(M)) * 10)}°`, pe = e.show_fan_mode !== !1, me = e.show_preset_mode !== !1, he = e.show_swing_mode === !0;
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: $n }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: F.selectedColor,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			ie,
			/* @__PURE__ */ (0, q.jsx)("div", {
				className: "dial-row",
				children: /* @__PURE__ */ (0, q.jsxs)("div", {
					ref: d,
					className: `dial${o ? " dragging" : ""}`,
					onPointerDown: (e) => {
						E || e.button !== 0 || (e.preventDefault(), e.currentTarget.setPointerCapture?.(e.pointerId), ee(V(e)));
					},
					onPointerMove: (e) => {
						if (!o) return;
						let t = V(e);
						t !== o.value && s({
							...o,
							value: t
						});
					},
					onPointerUp: te,
					onPointerCancel: te,
					children: [
						/* @__PURE__ */ (0, q.jsxs)("svg", {
							viewBox: `0 0 ${Hn} ${Hn}`,
							style: {
								"--ring-glow": F.glow,
								"--lg-ring-0": oe,
								"--lg-ring-1": se,
								"--lg-ring-2": ce
							},
							children: [
								/* @__PURE__ */ (0, q.jsx)("defs", { children: /* @__PURE__ */ (0, q.jsxs)("linearGradient", {
									id: "ring-grad",
									gradientUnits: "userSpaceOnUse",
									x1: "0",
									y1: Hn,
									x2: Hn,
									y2: "0",
									children: [
										/* @__PURE__ */ (0, q.jsx)("stop", {
											offset: "0",
											stopColor: "var(--lg-ring-0)"
										}),
										/* @__PURE__ */ (0, q.jsx)("stop", {
											offset: "0.55",
											stopColor: "var(--lg-ring-1)"
										}),
										/* @__PURE__ */ (0, q.jsx)("stop", {
											offset: "1",
											stopColor: "var(--lg-ring-2)"
										})
									]
								}) }),
								/* @__PURE__ */ (0, q.jsx)("path", {
									className: "ring-track",
									d: Qn(Gn, 405)
								}),
								/* @__PURE__ */ (0, q.jsx)("path", {
									className: "ring-fill",
									d: Qn(Gn, 405),
									pathLength: "1",
									stroke: "url(#ring-grad)",
									style: {
										strokeDasharray: `${Math.max(ae - G, 0).toFixed(4)} 1`,
										strokeDashoffset: (-G).toFixed(4),
										opacity: +!E
									}
								})
							]
						}),
						!E && ue.map(({ which: e, value: t }) => {
							let n = Gn + A(t) * qn, [a, s] = Xn(n);
							return /* @__PURE__ */ (0, q.jsx)(Zn, {
								id: e,
								x: a / Hn,
								y: s / Hn,
								rotation: n - 90,
								motionPosition: A(t) * Hn,
								active: o?.which === e,
								refraction: i,
								scheme: r ? "dark" : "light",
								sourceBackground: le
							}, e);
						}),
						/* @__PURE__ */ (0, q.jsxs)("div", {
							className: "center",
							children: [
								/* @__PURE__ */ (0, q.jsx)("div", {
									className: "caption",
									children: a(k ? "target_range" : "target_temp")
								}),
								/* @__PURE__ */ (0, q.jsxs)("div", {
									className: `temp-row${E ? " off" : ""}`,
									children: [/* @__PURE__ */ (0, q.jsx)("span", {
										className: `target${k ? " range" : ""}`,
										children: de
									}), /* @__PURE__ */ (0, q.jsx)("span", {
										className: "fraction",
										children: fe
									})]
								}),
								R !== void 0 && /* @__PURE__ */ (0, q.jsxs)("div", {
									className: "current",
									children: [
										a("room_temp"),
										" ",
										C(t, R, 1),
										"°"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, q.jsxs)("div", {
							className: "minmax",
							children: [/* @__PURE__ */ (0, q.jsxs)("span", { children: [C(t, D, 0), "°"] }), /* @__PURE__ */ (0, q.jsxs)("span", { children: [C(t, O, 0), "°"] })]
						})
					]
				})
			}),
			I.length > 0 && /* @__PURE__ */ (0, q.jsx)(Vn, {
				className: "segment modes",
				items: I.map((e) => ({
					value: e,
					...tr(e, a)
				})),
				value: T,
				selectedColor: F.selectedColor,
				refraction: i,
				scheme: r ? "dark" : "light",
				onValueChange: (e) => b("set_hvac_mode", { hvac_mode: e })
			}),
			(pe || me || he) && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: `details${E ? " muted" : ""}`,
				children: [
					pe && W("fan_mode", "mdi:weather-windy"),
					me && W("preset_mode", "mdi:creation"),
					he && W("swing_mode", "mdi:arrow-oscillating")
				]
			})
		]
	})] });
}
var rr = Jt({
	tagName: "liquid-glass-climate-card",
	component: nr,
	getCardSize: () => 6,
	getStubConfig: (e, t, n) => ({ entity: E(["climate"], e, t, n) })
}), ir = 500, ar = 10, or = `${Tn}${Dt}${bt}
  .card {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    transition:
      background-color 0.38s ease,
      box-shadow 0.38s ease;
  }
  .card:focus-visible {
    outline: 2px solid var(--lg-switch-accent);
    outline-offset: 2px;
  }
  /* The whole card is the control, so the title must not look separately clickable. */
  .title {
    cursor: inherit;
  }
  .card.switch-turned-on {
    animation: lg-switch-card-on 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .card.switch-turned-off {
    animation: lg-switch-card-off 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .card.switch-turned-on .icon-well {
    animation: lg-switch-icon-on 0.48s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .card.switch-turned-off .icon-well {
    animation: lg-switch-icon-off 0.36s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .card.switch-turned-on .state,
  .card.switch-turned-off .state {
    animation: lg-switch-state-change 0.32s ease-out;
  }
  @keyframes lg-switch-card-on {
    0% { transform: scale(0.985); }
    58% { transform: scale(1.008); }
    100% { transform: scale(1); }
  }
  @keyframes lg-switch-card-off {
    0% { transform: scale(1.006); }
    100% { transform: scale(1); }
  }
  @keyframes lg-switch-icon-on {
    0% { transform: scale(0.78) rotate(-8deg); }
    62% { transform: scale(1.1) rotate(2deg); }
    100% { transform: scale(1) rotate(0); }
  }
  @keyframes lg-switch-icon-off {
    0% { transform: scale(1.08); }
    55% { transform: scale(0.92); }
    100% { transform: scale(1); }
  }
  @keyframes lg-switch-state-change {
    0% { opacity: 0; transform: translateY(3px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
function sr(e) {
	switch (e?.split(".")[0]) {
		case "fan": return "mdi:fan";
		case "light": return "mdi:lightbulb";
		case "automation": return "mdi:robot";
		default: return "mdi:power-plug";
	}
}
function cr({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = e.name ?? S(a, e.entity ?? ""), s = (0, K.useRef)(void 0), c = (0, K.useRef)(void 0), l = (0, K.useRef)(!1), d = (0, K.useRef)(void 0), [f, p] = (0, K.useState)(), m = a && !w(a) ? a.state === "on" : void 0, h = () => {
		window.clearTimeout(s.current), s.current = void 0, c.current = void 0;
	};
	if ((0, K.useEffect)(() => () => window.clearTimeout(s.current), []), (0, K.useEffect)(() => {
		if (m === void 0) {
			d.current = void 0, p(void 0);
			return;
		}
		d.current !== void 0 && d.current !== m && p(m ? "on" : "off"), d.current = m;
	}, [m]), !a || w(a)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: or }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: o,
		label: i("unavailable"),
		onOpen: () => x(n, e.entity)
	})] });
	let v = m ?? !1, y = () => {
		if (!e.entity || !t) return;
		let n = e.entity.split(".")[0], r = u.includes(n) ? n : "homeassistant";
		t.callService(r, "toggle", { entity_id: e.entity });
	}, b = (t) => {
		t.button === 0 && (l.current = !1, c.current = {
			x: t.clientX,
			y: t.clientY
		}, s.current = window.setTimeout(() => {
			l.current = !0, h(), x(n, e.entity);
		}, ir));
	}, T = (e) => {
		let t = c.current;
		t && (Math.abs(e.clientX - t.x) > ar || Math.abs(e.clientY - t.y) > ar) && h();
	}, E = () => {
		if (h(), l.current) {
			l.current = !1;
			return;
		}
		y();
	}, D = (e) => {
		(e.key === " " || e.key === "Enter") && (e.preventDefault(), y());
	}, O = e.power_entity ? t?.states[e.power_entity] : void 0, k = _(a.last_changed, i), A = v ? O && !w(O) ? `${i("on")} · ${i("power")} ${C(t, Number(O.state), 0)} ${O.attributes.unit_of_measurement ?? "W"}` : `${i("on")} · ${i("since", { t: k })}` : `${i("off")} · ${i("last_on")} ${k}`;
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: or }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: `card row${v ? " active" : ""}${f ? ` switch-turned-${f}` : ""}`,
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: v ? "var(--lg-switch-accent)" : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		role: "switch",
		"aria-checked": v,
		"aria-label": o,
		tabIndex: 0,
		onClick: E,
		onKeyDown: D,
		onPointerDown: b,
		onPointerMove: T,
		onPointerUp: h,
		onPointerCancel: h,
		onPointerLeave: h,
		onContextMenu: (e) => e.preventDefault(),
		children: [/* @__PURE__ */ (0, q.jsx)(Ct, {
			icon: e.icon ?? a.attributes.icon ?? sr(e.entity),
			style: v ? {
				from: "var(--lg-switch-accent-light)",
				to: "var(--lg-switch-accent)",
				glow: "rgba(10,132,255,0.24)"
			} : void 0
		}), /* @__PURE__ */ (0, q.jsx)(wt, {
			name: o,
			state: A
		})]
	})] });
}
var lr = Jt({
	tagName: "liquid-glass-switch-card",
	component: cr,
	getCardSize: () => 1,
	getStubConfig: (e, t, n) => ({ entity: E(u, e, t, n) })
}), ur = 340, dr = 84, fr = 3e5, pr = `${Tn}${Dt}${bt}
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
    height: var(--lg-spark, ${dr}px);
    overflow: visible;
    display: block;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-value: clamp(26px, 13.5cqi, 52px);
      --lg-value-unit: clamp(13px, 5.8cqi, 22px);
      --lg-spark: clamp(52px, 22cqi, ${dr}px);
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
async function mr(e, t, n) {
	let r = (/* @__PURE__ */ new Date(Date.now() - n * 3600 * 1e3)).toISOString();
	try {
		let n = await e.callApi("GET", `history/period/${r}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`), i = [];
		for (let e of n?.[0] ?? []) {
			let t = Number(e.state ?? e.s), n = e.last_changed ?? e.last_updated, r = n ? new Date(n).getTime() : (e.lu ?? 0) * 1e3;
			Number.isFinite(t) && r && i.push({
				t: r,
				v: t
			});
		}
		let a = Number(e.states[t]?.state);
		return Number.isFinite(a) && i.push({
			t: Date.now(),
			v: a
		}), i;
	} catch {
		return [];
	}
}
function hr(e) {
	if (e.length < 2) return;
	let t = e[e.length - 1], n = t.t - 36e5, r = e[0];
	for (let t of e) if (t.t <= n) r = t;
	else break;
	return t.v - r.v;
}
function gr(e) {
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
		area: `${s} L ${c.toFixed(1)} ${dr} L ${a[0].toFixed(1)} ${dr} Z`,
		last: [c, o[o.length - 1]]
	};
}
function _r(e, t) {
	return t ? /^[°%]/.test(t) ? `${e}${t}` : `${e} ${t}` : e;
}
function vr(e, t, n, r, i) {
	let a = r ? [r] : [];
	a.push(i("updated_ago", { t: _(e.last_updated, i) }));
	let o = t.secondary_entity ? n?.states[t.secondary_entity] : void 0;
	if (o && !w(o)) {
		let e = t.secondary_label ?? o.attributes.friendly_name ?? "";
		a.push(`${e} ${o.state}${o.attributes.unit_of_measurement ?? ""}`.trim());
	}
	return a.join(" · ");
}
function yr({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), [a, o] = (0, K.useState)([]), [s, c] = (0, K.useState)(0), l = e.entity ? t?.states[e.entity] : void 0, u = e.name ?? S(l, e.entity ?? ""), d = e.hours_to_show ?? 24, f = e.value_in_caption === !0, p = e.graph !== !1 && !f, m = !!(t && e.entity && p);
	if ((0, K.useEffect)(() => {
		if (!t || !e.entity || !p) return;
		let n = !1;
		return mr(t, e.entity, d).then((e) => {
			n || o(e);
		}), () => {
			n = !0;
		};
	}, [
		m,
		e.entity,
		d,
		s,
		p
	]), (0, K.useEffect)(() => {
		if (!m) return;
		let e = window.setInterval(() => c((e) => e + 1), fr);
		return () => window.clearInterval(e);
	}, [m]), !l || w(l)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: pr }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: u,
		label: i("unavailable"),
		onOpen: () => x(n, e.entity)
	})] });
	let h = e.accent ?? "#FF9F0A", _ = Number(l.state), v = Number.isFinite(_), y = e.decimals, b = l.attributes.unit_of_measurement ?? "", T = v && e.trend !== !1 ? hr(a) : void 0, E = p ? gr(a) : void 0, D = a.map((e) => e.v), O = D.length ? Math.min(...D) : void 0, k = D.length ? Math.max(...D) : void 0, j = e.icon ?? l.attributes.icon ?? (l.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer"), N = (T ?? 0) >= 0, P = b === "°C" || b === "°F" ? "°" : b.length <= 3 ? b : "", F = v ? C(t, _, y) : l.state, I = vr(l, e, t, f ? _r(F, b) : void 0, i), L = () => x(n, e.entity), R = /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
		/* @__PURE__ */ (0, q.jsx)(Ct, {
			icon: j,
			style: {
				from: A(h),
				to: h,
				glow: M(h, .24)
			},
			onClick: L
		}),
		/* @__PURE__ */ (0, q.jsx)(wt, {
			name: u,
			state: I,
			onClick: L
		}),
		T !== void 0 && /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "badge trend",
			style: {
				"--badge-color": N ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
				"--badge-bg": N ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
				"--badge-stroke": N ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)"
			},
			children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: N ? "mdi:trending-up" : "mdi:trending-down" }), /* @__PURE__ */ (0, q.jsxs)("span", { children: [
				N ? "+" : "−",
				C(t, Math.abs(T), 1),
				P
			] })]
		})
	] });
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: pr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: `card${f ? " row" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: h,
		style: {
			display: "flex",
			position: "relative",
			"--accent": h
		},
		children: [
			f ? R : /* @__PURE__ */ (0, q.jsx)("div", {
				className: "header",
				children: R
			}),
			!f && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "value-row",
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "value",
					children: [/* @__PURE__ */ (0, q.jsx)("span", {
						className: "number",
						children: F
					}), b && /* @__PURE__ */ (0, q.jsx)("span", {
						className: "unit",
						children: b
					})]
				}), p && O !== void 0 && k !== void 0 && /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "range",
					children: [/* @__PURE__ */ (0, q.jsx)("span", {
						className: "caption",
						children: d === 24 ? i("hours_24") : `${d} h`
					}), /* @__PURE__ */ (0, q.jsxs)("span", {
						className: "rv",
						children: [
							C(t, O, y ?? 1),
							" – ",
							C(t, k, y ?? 1),
							" ",
							b
						]
					})]
				})]
			}),
			p && /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsxs)("svg", {
				className: "spark",
				viewBox: `0 0 ${ur} ${dr}`,
				preserveAspectRatio: "none",
				children: [/* @__PURE__ */ (0, q.jsx)("defs", { children: /* @__PURE__ */ (0, q.jsxs)("linearGradient", {
					id: "area",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, q.jsx)("stop", {
						offset: "0",
						stopColor: h,
						stopOpacity: "0.4"
					}), /* @__PURE__ */ (0, q.jsx)("stop", {
						offset: "1",
						stopColor: h,
						stopOpacity: "0"
					})]
				}) }), E && /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
					/* @__PURE__ */ (0, q.jsx)("path", {
						d: E.area,
						fill: "url(#area)"
					}),
					/* @__PURE__ */ (0, q.jsx)("path", {
						className: "line",
						d: E.line
					}),
					/* @__PURE__ */ (0, q.jsx)("circle", {
						className: "dot",
						cx: E.last[0],
						cy: E.last[1],
						r: "4.75"
					})
				] })]
			}), /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "axis",
				children: [
					/* @__PURE__ */ (0, q.jsx)("span", { children: i("hours_ago", { n: d }) }),
					/* @__PURE__ */ (0, q.jsx)("span", { children: i("hours_ago", { n: Math.round(d / 2) }) }),
					/* @__PURE__ */ (0, q.jsx)("span", { children: i("now") })
				]
			})] })
		]
	})] });
}
var br = Jt({
	tagName: "liquid-glass-sensor-card",
	component: yr,
	getCardSize: (e) => e.graph === !1 || e.value_in_caption ? e.value_in_caption ? 1 : 2 : 4,
	getStubConfig: (e, t, n) => ({ entity: E(["sensor"], e, t, n, (e) => Number.isFinite(Number(e.state))) })
}), xr = `${Tn}${Dt}${bt}`;
function Sr(e, t) {
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
function Cr({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), a = e.entity ? t?.states[e.entity] : void 0, o = e.name ?? S(a, e.entity ?? ""), s = () => x(n, e.entity);
	if (!a || w(a)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: xr }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: o,
		label: i("unavailable"),
		onOpen: s
	})] });
	let c = a.state === "on", l = Sr(a.attributes.device_class, i), u = e.accent ?? l.accent, d = e.accent ? A(e.accent) : l.accentLight, f = (c ? e.icon_on : e.icon_off) ?? e.icon ?? a.attributes.icon ?? (c ? l.iconOn : l.iconOff), p = c ? {
		from: d,
		to: u,
		glow: M(u, .24)
	} : void 0, m = c ? {
		color: u === "#7C3AED" ? "#A66BFF" : u,
		bg: M(u, .18),
		stroke: M(u, .3)
	} : void 0, h = _(a.last_changed, i), v = c ? `${l.stateOn} · ${i("since", { t: h })}` : `${l.stateOff} · ${i("last_change", { t: h })}`;
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: xr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card row",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: c ? u : void 0,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, q.jsx)(Ct, {
				icon: f,
				style: p,
				onClick: s
			}),
			/* @__PURE__ */ (0, q.jsx)(wt, {
				name: o,
				state: v,
				onClick: s
			}),
			/* @__PURE__ */ (0, q.jsx)(Tt, {
				label: (c ? e.label_on : e.label_off) ?? (c ? l.badgeOn : l.badgeOff),
				style: m
			})
		]
	})] });
}
var wr = Jt({
	tagName: "liquid-glass-binary-sensor-card",
	component: Cr,
	getCardSize: () => 1,
	getStubConfig: (e, t, n) => ({ entity: E(["binary_sensor"], e, t, n) })
}), Tr = `${Tn}${Dt}${bt}${on}
  .card {
    gap: 16px;
    width: 100%;
  }
  .lock-control {
    position: relative;
    display: grid;
    gap: 6px;
    --lg-slider-height: var(--lg-lock-track-h, 54px);
    --lg-slider-bar-height: var(--lg-lock-bar-h, 42px);
    --lg-slider-thumb-width: var(--lg-lock-thumb-w, 58px);
    --lg-slider-thumb-height: var(--lg-lock-thumb-h, 44px);
  }
  .lock-control .slider-track:focus-visible {
    outline-color: var(--thumb-color);
  }
  .lock-control .slider-anchor { display: none; }
  .lock-control .slider-bar,
  .lock-control .slider-refraction-bar {
    border: 1px solid var(--lg-glass-stroke);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.46),
      inset 0 -1px 0 rgba(255,255,255,0.1),
      0 4px 14px rgba(0,0,0,0.05);
    -webkit-backdrop-filter: blur(10px) saturate(1.25);
    backdrop-filter: blur(10px) saturate(1.25);
  }
  .lock-instruction {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: var(--lg-hint, 14px);
    line-height: 20px;
    font-weight: 600;
    color: var(--lg-text-secondary);
    pointer-events: none;
    white-space: nowrap;
  }
  .lock-instruction::before {
    content: "";
    width: 5px;
    height: 5px;
    flex: none;
    border-radius: 50%;
    background: var(--thumb-color);
    box-shadow: 0 0 8px color-mix(in srgb, var(--thumb-color) 70%, transparent);
  }
  .lock-instruction > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lock-instruction lg-icon {
    flex: none;
    --mdc-icon-size: 16px;
  }
  .chips .chip {
    flex: 1;
    justify-content: center;
    padding: 0;
    border-radius: 22px;
  }
  .chip-button {
    width: 100%;
    min-width: 0;
    min-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 10px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: var(--lg-label);
    font-weight: 600;
    cursor: pointer;
  }
  .chip-button > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip-button lg-icon {
    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
    width: clamp(15px, 4.7cqi, 18px);
    height: clamp(15px, 4.7cqi, 18px);
  }
  @container (max-width: 300px) {
    .lock-instruction lg-icon { display: none; }
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-hint: clamp(11.5px, 3.7cqi, 14px);
      --lg-lock-track-h: clamp(48px, 14.2cqi, 54px);
      --lg-lock-bar-h: clamp(38px, 11.1cqi, 42px);
      --lg-lock-thumb-w: clamp(52px, 15.3cqi, 58px);
      --lg-lock-thumb-h: clamp(40px, 11.6cqi, 44px);
    }
  }
`;
function Er(e, t, n, r) {
	let i = _(e.last_changed, r);
	return n ? {
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
		badgeLabel: r("jammed"),
		thumbColor: "var(--lg-warn)",
		hint: r("cannot_operate"),
		state: r("jammed_state")
	} : t ? {
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
		badgeLabel: r("locked"),
		thumbColor: "var(--lg-lock-locked)",
		hint: r("slide_to_unlock"),
		state: e.state === "locking" ? r("locking") : `${r("is_locked")} · ${r("auto_locked_at", { t: v(e.last_changed) })}`
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
		badgeLabel: r("unlocked"),
		thumbColor: "var(--lg-lock-unlocked)",
		hint: r("slide_to_lock"),
		state: e.state === "unlocking" ? r("unlocking") : `${r("is_unlocked")} · ${i}`
	};
}
function Dr({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), [a, o] = (0, K.useState)(), [s, c] = (0, K.useState)(), l = (0, K.useRef)(void 0), u = g(e.language ?? t?.locale?.language ?? t?.language), d = e.entity ? t?.states[e.entity] : void 0, f = d?.state;
	if ((0, K.useEffect)(() => () => window.clearTimeout(l.current), []), (0, K.useEffect)(() => {
		(s === "lock" && f === "locked" || s === "unlock" && f === "unlocked") && (window.clearTimeout(l.current), c(void 0));
	}, [f, s]), !d || w(d)) {
		let t = e.name ?? S(d, e.entity ?? "");
		return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Tr }), /* @__PURE__ */ (0, q.jsx)(St, {
			className: "card",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: "var(--lg-warn)",
			style: {
				display: "flex",
				position: "relative"
			},
			children: /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [/* @__PURE__ */ (0, q.jsx)("div", {
					className: "icon-well idle",
					onClick: () => x(n, e.entity),
					role: "button",
					children: /* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon ?? "mdi:help-circle-outline" })
				}), /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "title",
					onClick: () => x(n, e.entity),
					children: [/* @__PURE__ */ (0, q.jsx)("div", {
						className: "name",
						children: t
					}), /* @__PURE__ */ (0, q.jsx)("div", {
						className: "state",
						children: u("unavailable")
					})]
				})]
			})
		})] });
	}
	let p = d.state === "locked" || d.state === "locking", m = d.state === "jammed", h = s !== void 0 || d.state === "locking" || d.state === "unlocking", _ = Er(d, p, m, u), v = (n) => {
		t && e.entity && (c(n), t.callService("lock", n, { entity_id: e.entity }), window.clearTimeout(l.current), l.current = window.setTimeout(() => c(void 0), 4e3));
	}, y = (e) => {
		o(void 0), p && e >= .8 ? v("unlock") : !p && e <= .2 && v("lock");
	}, b = (n) => {
		let r = n.service.indexOf(".");
		if (!t || r < 1 || r === n.service.length - 1) return;
		let i = n.service.slice(0, r), a = n.service.slice(r + 1);
		t.callService(i, a, {
			entity_id: e.entity,
			...n.data ?? {}
		});
	}, C = { "--thumb-color": _.thumbColor };
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Tr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: _.thumbColor,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, q.jsx)("div", {
						className: "icon-well",
						style: {
							"--well-from": _.well.from,
							"--well-to": _.well.to,
							"--well-glow": _.well.glow
						},
						onClick: () => x(n, e.entity),
						role: "button",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon ?? _.icon })
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "title",
						onClick: () => x(n, e.entity),
						children: [/* @__PURE__ */ (0, q.jsx)("div", {
							className: "name",
							children: e.name ?? S(d, e.entity ?? "")
						}), /* @__PURE__ */ (0, q.jsx)("div", {
							className: "state",
							children: _.state
						})]
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "badge",
						style: {
							"--badge-color": _.badge.color,
							"--badge-bg": _.badge.background,
							"--badge-stroke": _.badge.stroke,
							"--badge-glow": _.badge.glow ?? _.badge.color
						},
						children: [/* @__PURE__ */ (0, q.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, q.jsx)("span", { children: _.badgeLabel })]
					})
				]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: `lock-control ${p ? "locked" : "unlocked"}${m ? " jammed" : ""}`,
				style: C,
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "lock-instruction",
					"aria-hidden": "true",
					children: [
						!p && !m && /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:chevron-double-left" }),
						/* @__PURE__ */ (0, q.jsx)("span", { children: _.hint }),
						p && !m && /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:chevron-double-right" })
					]
				}), /* @__PURE__ */ (0, q.jsx)(un, {
					value: a ?? (s === "unlock" ? 1 : s === "lock" ? 0 : +!p),
					min: 0,
					max: 1,
					step: .01,
					keyboardStep: 1,
					disabled: m || h,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: _.hint,
					valueText: _.badgeLabel,
					showFill: !1,
					onInput: o,
					onChange: y
				})]
			}),
			e.buttons?.length ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "chips",
				children: e.buttons.map((t, n) => /* @__PURE__ */ (0, q.jsx)(St, {
					className: "chip",
					refraction: i,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: _.thumbColor,
					style: {
						display: "flex",
						position: "relative"
					},
					children: /* @__PURE__ */ (0, q.jsxs)("button", {
						className: "chip-button",
						onClick: () => b(t),
						children: [t.icon && /* @__PURE__ */ (0, q.jsx)(X, { icon: t.icon }), /* @__PURE__ */ (0, q.jsx)("span", { children: t.name })]
					})
				}, `${t.service}:${t.name}:${n}`))
			}) : null
		]
	})] });
}
var Or = Jt({
	tagName: "liquid-glass-lock-card",
	component: Dr,
	getCardSize: () => 2,
	getStubConfig: (e, t, n) => ({ entity: E(["lock"], e, t, n) })
}), kr = {
	OPEN: 1,
	CLOSE: 2,
	SET_POSITION: 4,
	STOP: 8,
	SET_TILT: 128
}, Ar = 180, jr = `${Tn}${Dt}${bt}${on}
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
    height: var(--lg-track-h, ${Ar}px);
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
      --lg-track-h: clamp(120px, 47cqi, ${Ar}px);
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
  .tilt .lg-react-slider {
    --lg-slider-fill: linear-gradient(90deg, rgba(43, 179, 208, 0.35), rgba(43, 179, 208, 0.75));
    --fill-from: rgba(43, 179, 208, 0.35);
    --fill-to: rgba(43, 179, 208, 0.75);
  }
`;
function Mr({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), a = g(e.language ?? t?.locale?.language ?? t?.language), [o, s] = (0, K.useState)(), c = (0, K.useRef)("left"), l = (0, K.useRef)(null), u = e.entity ? t?.states[e.entity] : void 0, d = wn(u?.attributes.current_position, 1), f = wn(u?.attributes.current_tilt_position, 1), p = e.name ?? S(u, e.entity ?? ""), m = () => x(n, e.entity);
	if (!u || w(u)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: jr }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: p,
		label: a("unavailable"),
		onOpen: m
	})] });
	let h = (n, r) => void t?.callService("cover", n, {
		entity_id: e.entity,
		...r
	}), _ = u.attributes, b = o ?? d.value ?? (u.state === "closed" ? 0 : 100), C = (e.style ?? (_.device_class === "curtain" ? "curtain" : "blind")) === "curtain", E = C && (e.curtain ?? "double") === "single", D = u.state === "opening" || u.state === "closing" ? u.state : void 0, O = T(u, kr.SET_POSITION), k = e.show_tilt !== !1 && T(u, kr.SET_TILT) && _.current_tilt_position !== void 0, A = (e) => {
		let t = l.current?.getBoundingClientRect();
		if (!t) return b;
		let n;
		return n = C ? E ? (e.clientX - t.left) / t.width : 2 * (c.current === "right" ? t.right - e.clientX : e.clientX - t.left) / t.width : (e.clientY - t.top) / t.height, Math.round(y(1 - n, 0, 1) * 100);
	}, j = (e) => {
		if (!O || e.button !== 0) return;
		e.preventDefault(), e.currentTarget.setPointerCapture?.(e.pointerId);
		let t = e.currentTarget.getBoundingClientRect();
		c.current = e.clientX < t.left + t.width / 2 ? "left" : "right", s(A(e));
	}, M = (e) => {
		o !== void 0 && s(A(e));
	}, N = (e) => {
		if (o === void 0) return;
		let t = A(e);
		s(void 0), d.commit(t), h("set_cover_position", { position: t });
	}, P = b === 0 && !D, F = 1 - b / 100, I = P ? void 0 : {
		from: "#8FE3F4",
		to: "var(--lg-cover-accent-deep)",
		glow: "rgba(43,179,208,0.24)"
	}, L = P ? void 0 : {
		color: "var(--lg-cover-badge)",
		bg: "rgba(43,179,208,0.18)",
		stroke: "rgba(43,179,208,0.3)"
	}, R = e.icon ?? _.icon ?? (C ? "mdi:curtains" : "mdi:blinds-horizontal"), [z, B] = C ? E ? ["mdi:chevron-double-left", "mdi:chevron-double-right"] : ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"] : ["mdi:chevron-up", "mdi:chevron-down"], V = D ? `${a(D)} · ${b}% → ${D === "opening" ? 100 : 0}%` : u.state === "closed" || b === 0 ? `${a("is_closed")} · ${a("last_change", { t: v(u.last_changed) })}` : `${a("position")} ${b}% · ${a("stopped")}`, H = D ? `${a(D)}…` : a(P ? "is_closed" : "is_open"), ee = P || !C && D === "opening" && b < 60, te = !C && D === "opening" && b < 60 && !P, ne = f.value ?? 50, U = `${F * 100 / 2}%`;
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: jr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: "var(--lg-cover-accent)",
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, q.jsx)(Ct, {
						icon: R,
						style: I,
						onClick: m
					}),
					/* @__PURE__ */ (0, q.jsx)(wt, {
						name: p,
						state: V,
						onClick: m
					}),
					/* @__PURE__ */ (0, q.jsx)(Tt, {
						label: a(D ? "moving" : P ? "closed" : "open"),
						style: L
					})
				]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "position-row",
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					ref: l,
					className: "track",
					onPointerDown: j,
					onPointerMove: M,
					onPointerUp: N,
					onPointerCancel: N,
					children: [C ? E ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("div", {
						className: "panel left",
						style: { width: `${F * 100}%` },
						children: [
							0,
							1,
							2
						].map((e) => /* @__PURE__ */ (0, q.jsx)("span", {}, e))
					}), /* @__PURE__ */ (0, q.jsx)("div", {
						className: "handle v",
						style: { left: `calc(${F * 100}% - 13px)` }
					})] }) : /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "panel left",
							style: { width: U },
							children: [
								0,
								1,
								2
							].map((e) => /* @__PURE__ */ (0, q.jsx)("span", {}, e))
						}),
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "panel right",
							style: { width: U },
							children: [
								0,
								1,
								2
							].map((e) => /* @__PURE__ */ (0, q.jsx)("span", {}, e))
						}),
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "handle v",
							style: { left: `calc(${U} - 13px)` }
						}),
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "handle v",
							style: { right: `calc(${U} - 13px)` }
						})
					] }) : /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("div", {
						className: "fabric",
						style: { height: `${F * 100}%` },
						children: [
							0,
							1,
							2,
							3,
							4
						].map((e) => /* @__PURE__ */ (0, q.jsx)("span", {}, e))
					}), b > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
						className: "handle h",
						style: { top: `max(4px, calc(${F * 100}% - 13px))` }
					})] }), /* @__PURE__ */ (0, q.jsxs)("div", {
						className: `overlay${C && !E ? " center" : ""}${E ? " right" : ""}${te ? " top" : ""}`,
						style: ee ? {
							"--pv-color": "#0B3A46",
							"--pc-color": "rgba(11,58,70,0.7)"
						} : void 0,
						children: [/* @__PURE__ */ (0, q.jsxs)("span", {
							className: "pv",
							children: [b, "%"]
						}), /* @__PURE__ */ (0, q.jsx)("span", {
							className: "pc",
							children: H
						})]
					})]
				}), /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "buttons",
					children: [
						/* @__PURE__ */ (0, q.jsx)("button", {
							className: `round-btn${D === "opening" ? " active" : ""}`,
							onClick: () => h("open_cover"),
							title: "Open",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: z })
						}),
						/* @__PURE__ */ (0, q.jsx)("button", {
							className: `round-btn stop${D ? " selected" : ""}`,
							onClick: () => h("stop_cover"),
							title: "Stop",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:square-outline" })
						}),
						/* @__PURE__ */ (0, q.jsx)("button", {
							className: `round-btn${D === "closing" ? " active" : ""}`,
							onClick: () => h("close_cover"),
							title: "Close",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: B })
						})
					]
				})]
			}),
			k && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "section tilt",
				children: [
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "label-row",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "label",
							children: a("tilt")
						}), /* @__PURE__ */ (0, q.jsxs)("span", {
							className: "value",
							children: [Math.round(ne / 100 * 180 - 90), "°"]
						})]
					}),
					/* @__PURE__ */ (0, q.jsx)(un, {
						value: ne,
						min: 0,
						max: 100,
						step: 1,
						fillFrom: 50,
						showFill: !P,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("tilt"),
						onInput: f.setPreview,
						onChange: (e) => {
							f.commit(e), h("set_cover_tilt_position", { tilt_position: Math.round(e) });
						}
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "ticks",
						children: [
							/* @__PURE__ */ (0, q.jsx)("span", { children: "−90°" }),
							/* @__PURE__ */ (0, q.jsx)("span", { children: "0°" }),
							/* @__PURE__ */ (0, q.jsx)("span", { children: "90°" })
						]
					})
				]
			})
		]
	})] });
}
var Nr = Jt({
	tagName: "liquid-glass-cover-card",
	component: Mr,
	getCardSize: () => 4,
	getStubConfig: (e, t, n) => ({ entity: E(["cover"], e, t, n, (e) => !!((e.attributes.supported_features ?? 0) & kr.SET_POSITION)) })
}), Pr = {
	PAUSE: 1,
	SEEK: 2,
	VOLUME_SET: 4,
	PREVIOUS: 16,
	NEXT: 32,
	PLAY: 16384,
	SHUFFLE: 32768,
	REPEAT: 262144
};
function Fr(e) {
	let t = Math.max(0, Math.round(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
var Ir = `${Tn}${Dt}${bt}${on}
  .card {
    gap: 16px;
  }
  .device {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 14px;
    cursor: pointer;
  }
  .art {
    flex: none;
    width: var(--lg-art, 72px);
    height: var(--lg-art, 72px);
    border-radius: 20px;
    overflow: hidden;
    background: var(--lg-track-bg);
    background-size: cover;
    background-position: center;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.4);
    display: grid;
    place-items: center;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 28px;
  }
  .art.idle {
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .title {
    gap: 3px;
  }
  .source {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    color: var(--source-color);
    --mdc-icon-size: 12px;
  }
  .source.muted-text {
    color: var(--lg-text-secondary);
  }
  .media-control-glass {
    flex: none;
    border-radius: 50%;
    overflow: hidden;
    background: none;
    box-shadow: none;
  }
  .media-control-glass[data-lg-static-lens=""] {
    background: rgba(255, 255, 255, 0.08);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    box-shadow:
      0 5px 14px rgba(0, 0, 0, 0.22),
      inset 1px 1px 0 rgba(255, 255, 255, 0.36),
      inset -1px -1px 0 rgba(0, 0, 0, 0.14);
  }
  .more-glass {
    width: 36px;
    height: 36px;
  }
  .more {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: inherit;
    padding: 0;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--lg-text-primary);
    cursor: pointer;
    --mdc-icon-size: 18px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));
    transition: transform 120ms ease;
  }
  .more:active {
    transform: scale(0.9);
  }
  .progress {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  /* Playback bars carry no accent of their own, so they fill in the text colour. */
  .progress .lg-react-slider,
  .volume .lg-react-slider {
    --lg-slider-fill: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);
    --fill-from: color-mix(in srgb, var(--lg-text-primary) 70%, transparent);
    --fill-to: color-mix(in srgb, var(--lg-text-primary) 82%, transparent);
  }
  /* The seek bar uses a compact instance of the same glass slider as volume. */
  .progress .lg-react-slider {
    --lg-slider-height: 14px;
    --lg-slider-bar-height: 6px;
    --lg-slider-knob-size: 18px;
    --lg-slider-thumb-height: 26px;
  }
  .times {
    display: flex;
    justify-content: space-between;
    font-family: var(--lg-font-ui);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
    font-variant-numeric: tabular-nums;
  }
  .transport {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
  }
  .transport button {
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--lg-text-primary);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: opacity 0.2s ease, transform 0.1s ease;
  }
  .transport button:active {
    transform: scale(0.94);
  }
  .transport button:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .transport .aux {
    color: var(--lg-text-secondary);
    --mdc-icon-size: var(--lg-aux, 20px);
  }
  .transport .aux.on {
    color: var(--source-color);
  }
  .transport .skip {
    --mdc-icon-size: var(--lg-skip, 32px);
  }
  .play-glass {
    flex: none;
    width: var(--lg-play, 68px);
    height: var(--lg-play, 68px);
    border-radius: 50%;
    color: var(--lg-text-primary);
  }
  .play {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: inherit;
    --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.32));
  }
  .play-glass.idle {
    color: var(--lg-text-secondary);
  }
  .volume {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--lg-text-secondary);
    --mdc-icon-size: 20px;
  }
  .volume .lg-react-slider {
    flex: 1;
    --lg-slider-height: 26px;
    --lg-slider-bar-height: 6px;
    --lg-slider-knob-size: 20px;
    --lg-slider-thumb-height: 30px;
  }
  .dim,
  .fade {
    opacity: 0.4;
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-art: clamp(48px, 19cqi, 72px);
      --lg-play: clamp(48px, 18cqi, 68px);
      --lg-skip: clamp(24px, 8.4cqi, 32px);
      --lg-aux: clamp(17px, 5.3cqi, 20px);
    }
  }
  @container (max-width: 250px) {
    .transport {
      padding: 0;
    }
  }
`;
function Lr(e, t) {
	let n = e.attributes, r = n.media_duration, i = n.media_position;
	if (r && i !== void 0) return t && n.media_position_updated_at && (i += (Date.now() - new Date(n.media_position_updated_at).getTime()) / 1e3), {
		pos: y(i, 0, r),
		duration: r
	};
}
function Rr({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), a = g(e.language ?? t?.locale?.language ?? t?.language), [, o] = (0, K.useState)(0), s = e.entity ? t?.states[e.entity] : void 0, c = e.name ?? S(s, e.entity ?? ""), l = () => x(n, e.entity), u = s?.state === "playing" || s?.state === "buffering", d = s ? Lr(s, u) : void 0, f = wn(d ? d.pos / d.duration : void 0, d ? Math.max(1 / d.duration, .005) : .005), p = wn(s?.attributes.volume_level, .005);
	if ((0, K.useEffect)(() => {
		if (!u) return;
		let e = window.setInterval(() => o((e) => e + 1), 1e3);
		return () => window.clearInterval(e);
	}, [u]), !s || w(s)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Ir }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: i,
		variant: e.glass_variant,
		icon: e.icon,
		name: c,
		label: a("unavailable"),
		onOpen: l
	})] });
	let m = (n, r) => void t?.callService("media_player", n, {
		entity_id: e.entity,
		...r
	}), h = s.attributes, _ = s.state === "paused", v = !u && !_, y = e.source_color ?? "#FF375F", b = v ? void 0 : h.entity_picture, C = v ? a("not_playing") : h.media_title ?? h.friendly_name ?? "", E = [h.media_artist, h.media_album_name].filter(Boolean), D = v ? a("standby") : E.join(" — ") || (h.source ?? ""), O = h.app_name ?? h.source, k = d, A = f.value ?? 0, j = k ? A * k.duration : 0, M = k ? k.duration - j : 0, N = p.value ?? .5, P = !!h.shuffle, F = h.repeat ?? "off", I = T(s, Pr.SEEK) && !!k && !v, L = e.show_volume !== !1 && T(s, Pr.VOLUME_SET);
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Ir }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: y,
		style: {
			display: "flex",
			position: "relative",
			"--source-color": y
		},
		children: [
			e.show_device !== !1 && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "device",
				onClick: l,
				children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:speaker" }), /* @__PURE__ */ (0, q.jsx)("span", { children: c })]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, q.jsx)("div", {
						className: `art${b ? "" : " idle"}`,
						style: b ? { backgroundImage: `url("${b}")` } : void 0,
						onClick: l,
						children: !b && /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:music" })
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "title",
						onClick: l,
						children: [
							/* @__PURE__ */ (0, q.jsx)("div", {
								className: "name",
								children: C
							}),
							/* @__PURE__ */ (0, q.jsx)("div", {
								className: "state",
								children: D
							}),
							_ ? /* @__PURE__ */ (0, q.jsxs)("div", {
								className: "source muted-text",
								children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:pause" }), /* @__PURE__ */ (0, q.jsx)("span", { children: a("paused") })]
							}) : !v && O ? /* @__PURE__ */ (0, q.jsxs)("div", {
								className: "source",
								children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:waveform" }), /* @__PURE__ */ (0, q.jsx)("span", { children: O })]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, q.jsx)(xt, {
						className: "media-control-glass more-glass",
						refraction: i,
						frost: 5,
						children: /* @__PURE__ */ (0, q.jsx)("button", {
							className: "more",
							type: "button",
							onClick: l,
							title: "More",
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:dots-horizontal" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: `progress${v ? " dim" : ""}`,
				children: [/* @__PURE__ */ (0, q.jsx)(un, {
					value: v ? .003 : A,
					min: 0,
					max: 1,
					step: 0,
					disabled: !I,
					refraction: i,
					scheme: r ? "dark" : "light",
					label: C,
					onInput: f.setPreview,
					onChange: (e) => {
						f.commit(e), k && m("media_seek", { seek_position: Math.round(e * k.duration) });
					}
				}), /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "times",
					children: [/* @__PURE__ */ (0, q.jsx)("span", { children: k ? Fr(j) : "0:00" }), /* @__PURE__ */ (0, q.jsxs)("span", { children: ["−", k ? Fr(M) : "0:00"] })]
				})]
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "transport",
				children: [
					/* @__PURE__ */ (0, q.jsx)("button", {
						className: `aux${P ? " on" : ""}${v ? " fade" : ""}`,
						disabled: !T(s, Pr.SHUFFLE),
						onClick: () => m("shuffle_set", { shuffle: !P }),
						title: "Shuffle",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:shuffle-variant" })
					}),
					/* @__PURE__ */ (0, q.jsx)("button", {
						className: `skip${v ? " fade" : ""}`,
						disabled: !T(s, Pr.PREVIOUS),
						onClick: () => m("media_previous_track"),
						title: "Previous",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:skip-previous-outline" })
					}),
					/* @__PURE__ */ (0, q.jsx)(xt, {
						className: `media-control-glass play-glass${v ? " idle" : ""}`,
						refraction: i,
						frost: 5,
						children: /* @__PURE__ */ (0, q.jsx)("button", {
							className: "play",
							type: "button",
							title: "Play / Pause",
							onClick: () => {
								(!v || T(s, Pr.PLAY)) && m("media_play_pause");
							},
							children: /* @__PURE__ */ (0, q.jsx)(X, { icon: u ? "mdi:pause" : "mdi:play-outline" })
						})
					}),
					/* @__PURE__ */ (0, q.jsx)("button", {
						className: `skip${v ? " fade" : ""}`,
						disabled: !T(s, Pr.NEXT),
						onClick: () => m("media_next_track"),
						title: "Next",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:skip-next-outline" })
					}),
					/* @__PURE__ */ (0, q.jsx)("button", {
						className: `aux${F === "off" ? "" : " on"}${v ? " fade" : ""}`,
						disabled: !T(s, Pr.REPEAT),
						onClick: () => m("repeat_set", { repeat: F === "off" ? "all" : F === "all" ? "one" : "off" }),
						title: "Repeat",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: F === "one" ? "mdi:repeat-once" : "mdi:repeat" })
					})
				]
			}),
			L && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "volume",
				children: [
					/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:volume-low" }),
					/* @__PURE__ */ (0, q.jsx)(un, {
						value: N,
						min: 0,
						max: 1,
						step: .01,
						refraction: i,
						scheme: r ? "dark" : "light",
						label: a("ed_show_volume"),
						onInput: p.setPreview,
						onChange: (e) => {
							p.commit(e), m("volume_set", { volume_level: Math.round(e * 100) / 100 });
						}
					}),
					/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:volume-high" })
				]
			})
		]
	})] });
}
var zr = Jt({
	tagName: "liquid-glass-media-card",
	component: Rr,
	getCardSize: () => 4,
	getStubConfig: (e, t, n) => ({ entity: E(["media_player"], e, t, n) })
}), Br = (e) => e !== null && e !== "" && Number.isFinite(Number(e)) ? Number(e) : void 0;
function Vr(e, t) {
	let n = e.attributes, r = e.entity_id.split(".")[0], i;
	switch (r) {
		case "input_number":
		case "number":
			i = {
				min: Br(n.min) ?? 0,
				max: Br(n.max) ?? 100,
				step: Br(n.step) ?? 1,
				unit: n.unit_of_measurement ?? "",
				icon: "mdi:tune-variant",
				value: Br(e.state),
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
				step: Br(n.percentage_step) ?? 1,
				unit: "%",
				icon: "mdi:fan",
				value: e.state === "on" ? Br(n.percentage) ?? 0 : 0,
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
				value: e.state === "on" ? Math.round((Br(n.brightness) ?? 0) / 255 * 100) : 0,
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
				value: Math.round((Br(n.volume_level) ?? 0) * 100),
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
				value: Br(n.current_position) ?? (e.state === "closed" ? 0 : 100),
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
				value: Br(n.current_position) ?? (e.state === "closed" ? 0 : 100),
				call: (e) => [
					"valve",
					"set_valve_position",
					{ position: Math.round(e) }
				]
			};
			break;
		case "humidifier":
			i = {
				min: Br(n.min_humidity) ?? 0,
				max: Br(n.max_humidity) ?? 100,
				step: 1,
				unit: "%",
				icon: "mdi:air-humidifier",
				value: Br(n.humidity),
				call: (e) => [
					"humidifier",
					"set_humidity",
					{ humidity: Math.round(e) }
				]
			};
			break;
		case "water_heater":
			i = {
				min: Br(n.min_temp) ?? 30,
				max: Br(n.max_temp) ?? 60,
				step: Br(n.target_temp_step) ?? 1,
				unit: "°",
				icon: "mdi:water-boiler",
				value: Br(n.temperature),
				call: (e) => [
					"water_heater",
					"set_temperature",
					{ temperature: e }
				]
			};
			break;
		case "climate":
			i = {
				min: Br(n.min_temp) ?? 7,
				max: Br(n.max_temp) ?? 35,
				step: Br(n.target_temp_step) ?? .5,
				unit: "°",
				icon: "mdi:thermostat",
				value: Br(n.temperature),
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
			value: Br(e.state)
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
		value: t.attribute ? Br(n[t.attribute]) : i.value,
		call: a
	};
}
var Hr = `${Tn}${Dt}${bt}${on}
  .card {
    gap: 16px;
    width: 100%;
  }
  .value {
    flex: none;
    display: flex;
    align-items: flex-end;
    gap: 2px;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .value .num {
    font-size: var(--lg-sv, 28px);
    line-height: 1.1;
    letter-spacing: -1px;
    color: var(--lg-text-primary);
  }
  .value .unit {
    font-size: var(--lg-sv-unit, 15px);
    line-height: 1.6;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
  }
  .value.zero .num { color: var(--lg-text-secondary); }
  .track-wrap {
    position: relative;
    --lg-slider-height: var(--lg-track-h, 44px);
    --lg-slider-bar-height: var(--lg-bar-h, 6px);
    --lg-slider-knob-size: var(--lg-knob-size, 22px);
    --lg-slider-fill: linear-gradient(90deg, var(--fill-from), var(--fill-to));
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-sv: clamp(20px, 7.4cqi, 28px);
      --lg-sv-unit: clamp(11px, 3.9cqi, 15px);
      --lg-track-h: clamp(34px, 11.6cqi, 44px);
      --lg-bar-h: clamp(5px, 1.6cqi, 6px);
      --lg-knob-size: clamp(18px, 5.8cqi, 22px);
    }
  }
`;
function Ur(e, t) {
	return t === void 0 || e.value !== void 0 && Math.abs(e.value - t) <= Math.max(e.step / 2, 1);
}
function Wr({ config: e, hass: t, host: n }) {
	let { isDark: r, refraction: i } = Sn(n, e, t), [a, o] = (0, K.useState)(), [s, c] = (0, K.useState)(), l = (0, K.useRef)(void 0), u = g(e.language ?? t?.locale?.language ?? t?.language), d = e.entity ? t?.states[e.entity] : void 0;
	(0, K.useEffect)(() => () => window.clearTimeout(l.current), []);
	let f = d && !w(d) ? Vr(d, e) : void 0, p = !f || Ur(f, s);
	if ((0, K.useEffect)(() => {
		s !== void 0 && p && (window.clearTimeout(l.current), c(void 0));
	}, [p, s]), !d || w(d) || !f) {
		let t = e.name ?? S(d, e.entity ?? "");
		return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Hr }), /* @__PURE__ */ (0, q.jsx)(St, {
			className: "card",
			refraction: i,
			variant: e.glass_variant,
			sourceAccent: "var(--lg-slider-accent)",
			style: {
				display: "flex",
				position: "relative"
			},
			children: /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [/* @__PURE__ */ (0, q.jsx)("div", {
					className: "icon-well idle",
					onClick: () => x(n, e.entity),
					role: "button",
					children: /* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon ?? "mdi:help-circle-outline" })
				}), /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "title",
					onClick: () => x(n, e.entity),
					children: [/* @__PURE__ */ (0, q.jsx)("div", {
						className: "name",
						children: t
					}), /* @__PURE__ */ (0, q.jsx)("div", {
						className: "state",
						children: u("unavailable")
					})]
				})]
			})
		})] });
	}
	let m = y(a ?? (p ? f.value : s) ?? f.min, f.min, f.max), h = f.min === 0 && m <= 0, _ = e.decimals ?? +!Number.isInteger(f.step), v = e.accent, b = v ? A(v, .4) : "var(--lg-slider-accent-light)", T = v ? j(v, .3) : "var(--lg-slider-accent-deep)", E = v ? M(v, .3) : "rgba(94, 92, 230, 0.3)", D = v ? A(v, .55) : "var(--lg-slider-fill-light)", O = v ?? "var(--lg-slider-accent)", k = f.step > 0 ? Math.round((f.max - f.min) / f.step) : 0, N = e.subtitle === void 0 ? f.min === 0 && m <= 0 ? u("slider_off") : k >= 2 && k <= 12 ? u("slider_levels", {
		n: k,
		i: Math.round((m - f.min) / f.step)
	}) : u("slider_step", { s: `${C(t, f.step)}${f.unit}` }) : e.subtitle, P = typeof e.ticks == "number" ? y(Math.round(e.ticks), 0, 20) : e.ticks === !0 && k >= 2 && k <= 12 ? k : 0, F = (e) => C(t, e, _), I = (n) => {
		if (o(void 0), !f.call || !t) return;
		c(n), window.clearTimeout(l.current), l.current = window.setTimeout(() => c(void 0), 4e3);
		let [r, i, a] = f.call(n);
		t.callService(r, i, {
			entity_id: e.entity,
			...a
		});
	}, L = {
		display: "flex",
		position: "relative",
		"--fill-from": D,
		"--fill-to": O
	};
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Hr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: i,
		variant: e.glass_variant,
		sourceAccent: O,
		style: L,
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, q.jsx)("div", {
						className: `icon-well${h ? " idle" : ""}`,
						style: h ? void 0 : {
							"--well-from": b,
							"--well-to": T,
							"--well-glow": E
						},
						onClick: () => x(n, e.entity),
						role: "button",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: f.icon })
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "title",
						onClick: () => x(n, e.entity),
						children: [/* @__PURE__ */ (0, q.jsx)("div", {
							className: "name",
							children: e.name ?? S(d, e.entity ?? "")
						}), /* @__PURE__ */ (0, q.jsx)("div", {
							className: "state",
							children: N
						})]
					}),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: `value${h ? " zero" : ""}`,
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "num",
							children: F(m)
						}), f.unit && /* @__PURE__ */ (0, q.jsx)("span", {
							className: "unit",
							children: f.unit
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, q.jsx)("div", {
				className: "track-wrap",
				children: /* @__PURE__ */ (0, q.jsx)(un, {
					value: m,
					min: f.min,
					max: f.max,
					step: f.step,
					disabled: !f.call,
					refraction: i,
					scheme: r ? "dark" : "light",
					showFill: !h,
					ticks: P,
					label: e.name ?? S(d, e.entity ?? ""),
					onInput: o,
					onChange: I
				})
			}),
			e.show_range !== !1 && /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "ticks",
				children: [/* @__PURE__ */ (0, q.jsxs)("span", { children: [F(f.min), f.unit] }), /* @__PURE__ */ (0, q.jsxs)("span", { children: [F(f.max), f.unit] })]
			})
		]
	})] });
}
var Gr = Jt({
	tagName: "liquid-glass-slider-card",
	component: Wr,
	getCardSize: () => 2,
	getStubConfig: (e, t, n) => ({ entity: E(d, e, t, n) })
}), Kr = {
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
}, qr = {
	icon: "mdi:weather-cloudy",
	color: "#A0AEC0"
}, Jr = 9e5, Yr = `${Tn}${Dt}${bt}
  .card {
    gap: 16px;
  }

  /* Current conditions */
  .current {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .now {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    cursor: pointer;
  }
  .city {
    font-size: var(--lg-name);
    font-weight: 600;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .condition {
    font-size: var(--lg-state);
    color: var(--lg-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .temp-row {
    display: flex;
    align-items: flex-start;
    gap: 2px;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .temp-row .temp {
    font-size: var(--lg-wx-temp, 52px);
    line-height: 1.05;
    letter-spacing: -2px;
    color: var(--lg-text-primary);
  }
  .temp-row .deg {
    font-size: var(--lg-wx-deg, 26px);
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
  }
  .hilo {
    display: flex;
    gap: 10px;
    font-size: var(--lg-label);
    letter-spacing: -0.2px;
  }
  .hilo .hi {
    font-weight: 600;
    color: var(--lg-text-primary);
  }
  .hilo .lo {
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .big-icon {
    flex: none;
    display: grid;
    place-items: center;
    width: var(--lg-wx-icon-box, 110px);
    height: var(--lg-wx-icon-box, 110px);
  }
  .big-icon lg-icon {
    --mdc-icon-size: var(--lg-wx-icon, 96px);
    width: var(--lg-wx-icon, 96px);
    height: var(--lg-wx-icon, 96px);
    color: var(--wx-color);
    filter: drop-shadow(0 6px 20px var(--wx-glow));
  }

  /* Hourly strip */
  .hourly {
    display: flex;
    justify-content: space-between;
    gap: 2px;
    padding: 12px 10px;
    border-radius: 20px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .hour {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 6px 0;
    border-radius: 14px;
  }
  .hour.now {
    background: var(--lg-segment-selected);
  }
  .hour .time {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
    white-space: nowrap;
  }
  .hour.now .time {
    font-weight: 600;
    color: var(--lg-text-primary);
  }
  .hour lg-icon {
    --mdc-icon-size: var(--lg-wx-hour-icon, 22px);
    width: var(--lg-wx-hour-icon, 22px);
    height: var(--lg-wx-hour-icon, 22px);
    color: var(--wx-color);
  }
  .hour .t {
    font-family: var(--lg-font-ui);
    font-size: var(--lg-label);
    font-weight: 600;
    letter-spacing: -0.2px;
    color: var(--lg-text-primary);
    font-variant-numeric: tabular-nums;
  }

  /* Daily rows */
  .daily {
    display: flex;
    flex-direction: column;
  }
  .day {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 44px;
  }
  .day .label {
    flex: none;
    width: var(--lg-wx-day, 44px);
    font-size: var(--lg-name-sm, 14px);
    font-weight: 500;
    color: var(--lg-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .day.today .label {
    font-weight: 600;
    color: var(--lg-text-primary);
  }
  .day lg-icon {
    flex: none;
    --mdc-icon-size: var(--lg-wx-hour-icon, 22px);
    width: var(--lg-wx-hour-icon, 22px);
    height: var(--lg-wx-hour-icon, 22px);
    color: var(--wx-color);
  }
  .day .lo,
  .day .hi {
    flex: none;
    width: var(--lg-wx-temp-col, 30px);
    text-align: right;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-label);
    letter-spacing: -0.2px;
    font-variant-numeric: tabular-nums;
  }
  .day .lo {
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .day .hi {
    font-weight: 600;
    color: var(--lg-text-primary);
  }
  /* Every bar shares one scale, so a day's segment shows where it sits in the week. */
  .bar {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 6px;
    border-radius: 3px;
    background: var(--lg-track-bg);
    overflow: hidden;
  }
  .bar span {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    background: linear-gradient(90deg, #5ac8fa, #ffd60a 55%, #ff9f0a);
  }

  /* Metric tiles */
  .metrics {
    display: flex;
    gap: 8px;
  }
  .metric {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 12px;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .metric .head {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .metric .head span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .metric lg-icon {
    flex: none;
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
  }
  .metric .v {
    font-family: var(--lg-font-ui);
    font-size: var(--lg-wx-metric, 15px);
    font-weight: 600;
    letter-spacing: -0.2px;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /*
   * Row layout: the icon shrinks to the size of a card's icon well and the reading
   * moves to the trailing edge, which puts the card at a switch card's height.
   */
  .card.row .big-icon {
    width: var(--lg-well);
    height: var(--lg-well);
  }
  .card.row .big-icon lg-icon {
    --mdc-icon-size: var(--lg-well);
    width: var(--lg-well);
    height: var(--lg-well);
    filter: drop-shadow(0 3px 10px var(--wx-glow));
  }
  .card.row .temp-row {
    flex: none;
  }
  .card.row .temp-row .temp {
    font-size: var(--lg-wx-row-temp, 28px);
    line-height: 1.1;
    letter-spacing: -1px;
  }
  .card.row .temp-row .deg {
    font-size: var(--lg-wx-row-deg, 15px);
    line-height: 1.6;
  }

  @supports (container-type: inline-size) {
    .card {
      --lg-wx-row-temp: clamp(20px, 7.4cqi, 28px);
      --lg-wx-row-deg: clamp(11px, 3.9cqi, 15px);
      --lg-wx-temp: clamp(34px, 13.7cqi, 52px);
      --lg-wx-deg: clamp(17px, 6.8cqi, 26px);
      --lg-wx-icon-box: clamp(64px, 29cqi, 110px);
      --lg-wx-icon: clamp(54px, 25cqi, 96px);
      --lg-wx-hour-icon: clamp(17px, 5.8cqi, 22px);
      --lg-wx-day: clamp(32px, 11.6cqi, 44px);
      --lg-wx-temp-col: clamp(24px, 7.9cqi, 30px);
      --lg-wx-metric: clamp(12px, 3.9cqi, 15px);
      --lg-name-sm: clamp(11.5px, 3.7cqi, 14px);
    }
  }
  /* Three tiles side by side stop being readable long before the card does. */
  @container (max-width: 300px) {
    .metrics {
      flex-wrap: wrap;
    }
    .metric {
      flex-basis: calc(50% - 4px);
    }
  }
  @container (max-width: 250px) {
    .day {
      gap: 8px;
    }
    .hourly {
      padding: 10px 6px;
    }
  }
`;
async function Xr(e, t, n) {
	try {
		return ((await e.callService("weather", "get_forecasts", { type: n }, { entity_id: t }, !1, !0))?.response ?? {})[t]?.forecast ?? [];
	} catch {
		return e.states[t]?.attributes.forecast ?? [];
	}
}
function Zr({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = e.language ?? t?.locale?.language ?? t?.language ?? "en", a = g(e.language ?? t?.locale?.language ?? t?.language), [o, s] = (0, K.useState)([]), [c, l] = (0, K.useState)([]), [u, d] = (0, K.useState)(0), f = e.entity ? t?.states[e.entity] : void 0, p = e.name ?? S(f, e.entity ?? ""), m = e.layout === "row", h = () => x(n, e.entity), _ = !!(t && e.entity);
	if ((0, K.useEffect)(() => {
		if (!t || !e.entity) return;
		let n = !1, r = e.entity;
		return Xr(t, r, "daily").then((e) => {
			n || s(e);
		}), !m && e.show_hourly !== !1 && Xr(t, r, "hourly").then((e) => {
			n || l(e);
		}), () => {
			n = !0;
		};
	}, [
		_,
		e.entity,
		e.show_hourly,
		m,
		u
	]), (0, K.useEffect)(() => {
		if (!_) return;
		let e = window.setInterval(() => d((e) => e + 1), Jr);
		return () => window.clearInterval(e);
	}, [_]), !f || w(f)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Yr }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: p,
		label: a("unavailable"),
		onOpen: h
	})] });
	let v = t?.states["sun.sun"], b = v ? v.state === "below_horizon" : f.state === "clear-night", T = (e) => {
		let t = Kr[e ?? ""] ?? qr;
		return b && t.night ? {
			...t,
			icon: t.night,
			color: "#9AB6FF"
		} : t;
	}, E = (e) => e ? a(`wx_${e}`) : "", D = (e) => e === void 0 ? "–" : `${C(t, e, 0)}°`, O = (e, t) => {
		try {
			return new Intl.DateTimeFormat(i, t).format(new Date(e));
		} catch {
			return "";
		}
	}, k = f.attributes, A = T(f.state), j = o[0], N = /* @__PURE__ */ (0, q.jsx)("div", {
		className: "big-icon",
		style: {
			"--wx-color": A.color,
			"--wx-glow": M(A.color, .4)
		},
		children: /* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon ?? A.icon })
	}), P = /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "temp-row",
		children: [/* @__PURE__ */ (0, q.jsx)("span", {
			className: "temp",
			children: C(t, k.temperature ?? 0, 0)
		}), /* @__PURE__ */ (0, q.jsx)("span", {
			className: "deg",
			children: "°"
		})]
	});
	if (m) {
		let t = [E(f.state)];
		return j?.temperature !== void 0 && t.push(`${a("wx_high")} ${D(j.temperature)}`), j?.templow !== void 0 && t.push(`${a("wx_low")} ${D(j.templow)}`), /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Yr }), /* @__PURE__ */ (0, q.jsxs)(St, {
			className: "card row",
			refraction: r,
			variant: e.glass_variant,
			sourceAccent: A.color,
			style: {
				display: "flex",
				position: "relative"
			},
			children: [
				N,
				/* @__PURE__ */ (0, q.jsx)(wt, {
					name: p,
					state: t.filter(Boolean).join(" · "),
					onClick: h
				}),
				P
			]
		})] });
	}
	let F = e.show_hourly === !1 ? [] : c.slice(0, y(e.hourly_count ?? 6, 2, 12)), I = e.show_daily === !1 ? [] : o.slice(0, y(e.daily_count ?? 4, 1, 10)), L = I.map((e) => e.templow ?? e.temperature).filter((e) => e !== void 0), R = I.map((e) => e.temperature).filter((e) => e !== void 0), z = Math.min(...L, ...R), B = Math.max(...L, ...R) - z || 1, V = k.humidity, H = k.wind_speed, ee = k.wind_speed_unit ?? "", te = c[0]?.precipitation_probability ?? o[0]?.precipitation_probability, ne = c[0]?.precipitation ?? o[0]?.precipitation, U = [];
	return V !== void 0 && U.push([
		"mdi:water-percent",
		a("humidity"),
		`${C(t, V, 0)}%`
	]), H !== void 0 && U.push([
		"mdi:weather-windy",
		a("wx_wind"),
		`${C(t, H, 1)} ${ee}`.trim()
	]), te === void 0 ? ne !== void 0 && U.push([
		"mdi:weather-rainy",
		a("wx_precip"),
		`${C(t, ne, 1)} mm`
	]) : U.push([
		"mdi:weather-rainy",
		a("wx_precip"),
		`${C(t, te, 0)}%`
	]), /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Yr }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: A.color,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "current",
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					className: "now",
					onClick: h,
					children: [
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "city",
							children: p
						}),
						/* @__PURE__ */ (0, q.jsx)("div", {
							className: "condition",
							children: E(f.state)
						}),
						P,
						(j?.temperature !== void 0 || j?.templow !== void 0) && /* @__PURE__ */ (0, q.jsxs)("div", {
							className: "hilo",
							children: [j?.temperature !== void 0 && /* @__PURE__ */ (0, q.jsxs)("span", {
								className: "hi",
								children: [
									a("wx_high"),
									" ",
									D(j.temperature)
								]
							}), j?.templow !== void 0 && /* @__PURE__ */ (0, q.jsxs)("span", {
								className: "lo",
								children: [
									a("wx_low"),
									" ",
									D(j.templow)
								]
							})]
						})
					]
				}), N]
			}),
			F.length > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "hourly",
				children: F.map((e, t) => {
					let n = T(e.condition);
					return /* @__PURE__ */ (0, q.jsxs)("div", {
						className: `hour${t === 0 ? " now" : ""}`,
						style: { "--wx-color": n.color },
						children: [
							/* @__PURE__ */ (0, q.jsx)("span", {
								className: "time",
								children: t === 0 ? a("wx_now") : O(e.datetime, { hour: "numeric" })
							}),
							/* @__PURE__ */ (0, q.jsx)(X, { icon: n.icon }),
							/* @__PURE__ */ (0, q.jsx)("span", {
								className: "t",
								children: D(e.temperature)
							})
						]
					}, e.datetime);
				})
			}),
			I.length > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "daily",
				children: I.map((e, t) => {
					let n = T(e.condition), r = e.templow ?? e.temperature, i = e.temperature, o = r === void 0 ? 0 : (r - z) / B * 100, s = r === void 0 || i === void 0 ? 100 : Math.max((i - r) / B * 100, 6), c = t === 0 ? a("wx_today") : t === 1 ? a("wx_tomorrow") : O(e.datetime, { weekday: "short" });
					return /* @__PURE__ */ (0, q.jsxs)("div", {
						className: `day${t === 0 ? " today" : ""}`,
						style: { "--wx-color": n.color },
						children: [
							/* @__PURE__ */ (0, q.jsx)("span", {
								className: "label",
								children: c
							}),
							/* @__PURE__ */ (0, q.jsx)(X, { icon: n.icon }),
							/* @__PURE__ */ (0, q.jsx)("span", {
								className: "lo",
								children: D(r)
							}),
							/* @__PURE__ */ (0, q.jsx)("div", {
								className: "bar",
								children: /* @__PURE__ */ (0, q.jsx)("span", { style: {
									left: `${o}%`,
									width: `${s}%`
								} })
							}),
							/* @__PURE__ */ (0, q.jsx)("span", {
								className: "hi",
								children: D(i)
							})
						]
					}, e.datetime);
				})
			}),
			e.show_metrics !== !1 && U.length > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "metrics",
				children: U.map(([e, t, n]) => /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "metric",
					children: [/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "head",
						children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: e }), /* @__PURE__ */ (0, q.jsx)("span", { children: t })]
					}), /* @__PURE__ */ (0, q.jsx)("div", {
						className: "v",
						children: n
					})]
				}, t))
			})
		]
	})] });
}
var Qr = Jt({
	tagName: "liquid-glass-weather-card",
	component: Zr,
	getCardSize: (e) => {
		if (e.layout === "row") return 1;
		let t = 3;
		return e.show_hourly !== !1 && (t += 1), e.show_daily !== !1 && (t += 2), e.show_metrics !== !1 && (t += 1), t;
	},
	getStubConfig: (e, t, n) => ({ entity: E(["weather"], e, t, n) })
}), $r = [
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
function ei(e, t) {
	let n = e ? {
		from: A(e, .45),
		to: e
	} : t;
	return {
		...n,
		glow: M(n.to, .3)
	};
}
var ti = {
	scene: {
		service: "scene.turn_on",
		icon: "mdi:palette",
		well: $r[0],
		label: "btn_scene"
	},
	script: {
		service: "script.turn_on",
		icon: "mdi:script-text-play",
		well: $r[1],
		label: "btn_script"
	},
	automation: {
		service: "automation.trigger",
		icon: "mdi:robot",
		well: $r[3],
		label: "btn_automation"
	},
	button: {
		service: "button.press",
		icon: "mdi:gesture-tap-button",
		well: $r[3],
		label: "btn_button"
	},
	input_button: {
		service: "input_button.press",
		icon: "mdi:gesture-tap-button",
		well: $r[3],
		label: "btn_button"
	}
}, ni = 2600, ri = `${Tn}${Dt}${bt}
  .card {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }
  .card:focus-visible {
    outline: 2px solid var(--lg-slider-accent);
    outline-offset: 2px;
  }
  .title {
    cursor: inherit;
  }
  .action {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    --mdc-icon-size: 16px;
    transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
  }
  .action.done {
    background: rgba(48, 209, 88, 0.18);
    box-shadow: inset 0 0 0 1px rgba(48, 209, 88, 0.3);
    color: var(--lg-lock-locked-deep);
  }
  .card:active .action {
    background: var(--lg-segment-selected);
  }
`;
function ii(e) {
	return e.attributes.last_triggered || (Number.isNaN(Date.parse(e.state)) ? void 0 : e.state);
}
function ai(e, t, n, r, i) {
	if (t.subtitle !== void 0) return t.subtitle;
	if (r) return `${i("btn_done")} · ${i("just_now")}`;
	let a = ti[n], o = a ? i(a.label) : n, s = ii(e);
	if (!s) return o;
	let c = Date.now() - new Date(s).getTime() < 432e5 ? _(s, i) : v(s);
	return `${o} · ${i("last")} ${c}`;
}
function oi({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), [a, o] = (0, K.useState)(!1), s = (0, K.useRef)(void 0), c = e.entity ? t?.states[e.entity] : void 0, l = e.name ?? S(c, e.entity ?? "");
	if ((0, K.useEffect)(() => () => window.clearTimeout(s.current), []), !c || w(c)) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: ri }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: l,
		label: i("unavailable"),
		onOpen: () => x(n, e.entity)
	})] });
	let u = e.entity?.split(".")[0] ?? "", d = ti[u], f = ei(e.accent, d?.well ?? $r[0]), p = e.icon ?? c.attributes.icon ?? d?.icon ?? "mdi:gesture-tap-button", m = () => {
		let [n, r] = (e.service ?? d?.service ?? "").split(".");
		n && r && (t?.callService(n, r, {
			entity_id: e.entity,
			...e.service_data ?? {}
		}), o(!0), window.clearTimeout(s.current), s.current = window.setTimeout(() => o(!1), ni));
	};
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: ri }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: "card row",
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: f.to,
		style: {
			display: "flex",
			position: "relative"
		},
		role: "button",
		tabIndex: 0,
		"aria-label": l,
		onClick: m,
		onKeyDown: (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), m());
		},
		children: [
			/* @__PURE__ */ (0, q.jsx)(Ct, {
				icon: p,
				style: f
			}),
			/* @__PURE__ */ (0, q.jsx)(wt, {
				name: l,
				state: ai(c, e, u, a, i)
			}),
			/* @__PURE__ */ (0, q.jsx)("div", {
				className: `action${a ? " done" : ""}`,
				children: /* @__PURE__ */ (0, q.jsx)(X, { icon: a ? "mdi:check" : "mdi:play" })
			})
		]
	})] });
}
var si = Jt({
	tagName: "liquid-glass-button-card",
	component: oi,
	getCardSize: () => 1,
	getStubConfig: (e, t, n) => ({ entity: E(l, e, t, n) })
}), ci = 900, li = `${Tn}${Dt}${bt}
  .card {
    gap: 14px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .head .heading {
    font-size: var(--lg-scene-title, 15px);
    font-weight: 600;
    color: var(--lg-text-primary);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .head .count {
    flex: none;
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  /* The chips row variant labels itself quietly rather than as a heading. */
  .card.chips .head .heading {
    font-size: var(--lg-label);
    color: var(--lg-text-secondary);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));
    gap: 10px;
  }
  .card.chips .grid {
    gap: 8px;
  }

  button {
    border: 0;
    font: inherit;
    cursor: pointer;
    color: var(--lg-text-primary);
    min-width: 0;
    transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.1s ease;
  }
  .tile {
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .tile:active,
  .chip:active {
    transform: scale(0.97);
  }
  .tile.on,
  .chip.on {
    background: var(--lg-press-fill);
    color: var(--lg-press-label);
    box-shadow:
      inset 0 0 0 2px var(--lg-press-stroke),
      0 0 0 3px var(--lg-press-glow),
      0 6px 16px var(--lg-press-glow);
  }

  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 14px 10px;
    border-radius: 20px;
  }
  .tile .well {
    width: var(--lg-scene-well, 40px);
    height: var(--lg-scene-well, 40px);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(180deg, var(--from), var(--to));
    box-shadow:
      0 4px 12px var(--glow),
      0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    --mdc-icon-size: calc(var(--lg-scene-well, 40px) * 0.5);
  }
  .tile.on .well {
    box-shadow:
      0 4px 16px var(--glow-strong),
      0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
  .tile .label {
    font-size: var(--lg-scene-label, 12px);
    font-weight: 600;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* A chip is its own small glass surface, with the button filling it. */
  .chip {
    position: relative;
    isolation: isolate;
    height: var(--lg-chip-h, 42px);
    border-radius: 999px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    overflow: hidden;
  }
  .chip-button {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    color: inherit;
    font-size: var(--lg-chip-label, 13px);
    font-weight: 600;
  }
  .chip-button span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip-button lg-icon {
    flex: none;
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }

  @supports (container-type: inline-size) {
    .card {
      --lg-scene-title: clamp(12.5px, 3.9cqi, 15px);
      --lg-scene-well: clamp(30px, 10.5cqi, 40px);
      --lg-scene-label: clamp(10px, 3.2cqi, 12px);
      --lg-chip-h: clamp(34px, 11cqi, 42px);
      --lg-chip-label: clamp(11px, 3.4cqi, 13px);
    }
  }
`;
function ui({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), [a, o] = (0, K.useState)(), s = (0, K.useRef)(void 0), c = e.scenes ?? [], l = y(Math.round(e.columns ?? 3), 1, 6), u = e.style === "chips";
	if ((0, K.useEffect)(() => () => window.clearTimeout(s.current), []), !c.length) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: li }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: e.title ?? e.name ?? "",
		label: i("unavailable")
	})] });
	let d = (e) => e.name ?? S(e.entity ? t?.states[e.entity] : void 0, e.entity ?? ""), f = (e) => e.icon ? e.icon : (e.entity ? t?.states[e.entity] : void 0)?.attributes.icon ?? ti[e.entity?.split(".")[0] ?? ""]?.icon ?? "mdi:palette", p = (e, n) => {
		let r = e.service ?? ti[e.entity?.split(".")[0] ?? ""]?.service;
		if (r) {
			let [n, i] = r.split(".");
			t?.callService(n, i, {
				...e.entity ? { entity_id: e.entity } : {},
				...e.service_data ?? {}
			});
		}
		o(n), window.clearTimeout(s.current), s.current = window.setTimeout(() => o(void 0), ci);
	};
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: li }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: `card${u ? " chips" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		sourceAccent: ei(e.scenes?.[0]?.accent, $r[0]).to,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [(e.title || e.show_count) && /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "head",
			children: [/* @__PURE__ */ (0, q.jsx)("span", {
				className: "heading",
				children: e.title ?? ""
			}), e.show_count && /* @__PURE__ */ (0, q.jsx)("span", {
				className: "count",
				children: i("scene_count", { n: c.length })
			})]
		}), /* @__PURE__ */ (0, q.jsx)("div", {
			className: "grid",
			style: { "--cols": String(l) },
			children: c.map((t, n) => {
				let i = a === n;
				if (u) return /* @__PURE__ */ (0, q.jsx)(St, {
					className: `chip${i ? " on" : ""}`,
					refraction: r,
					variant: e.glass_variant,
					surface: "compact",
					sourceAccent: "var(--lg-accent)",
					style: { display: "flex" },
					children: /* @__PURE__ */ (0, q.jsxs)("button", {
						className: "chip-button",
						onClick: () => p(t, n),
						children: [t.icon && /* @__PURE__ */ (0, q.jsx)(X, { icon: t.icon }), /* @__PURE__ */ (0, q.jsx)("span", { children: d(t) })]
					})
				}, `${t.entity ?? t.service ?? ""}:${n}`);
				let o = ei(t.accent, $r[n % $r.length]);
				return /* @__PURE__ */ (0, q.jsxs)("button", {
					className: `tile${i ? " on" : ""}`,
					style: {
						"--from": o.from,
						"--to": o.to,
						"--glow": o.glow,
						"--glow-strong": M(o.to, .6)
					},
					onClick: () => p(t, n),
					children: [/* @__PURE__ */ (0, q.jsx)("span", {
						className: "well",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: f(t) })
					}), /* @__PURE__ */ (0, q.jsx)("span", {
						className: "label",
						children: d(t)
					})]
				}, `${t.entity ?? t.service ?? ""}:${n}`);
			})
		})]
	})] });
}
var di = Jt({
	tagName: "liquid-glass-scene-card",
	component: ui,
	getCardSize: (e) => {
		let t = y(Math.round(e.columns ?? 3), 1, 6);
		return 1 + Math.ceil((e.scenes?.length ?? 0) / t) * (e.style === "chips" ? 1 : 2);
	},
	getStubConfig: (e, t, n) => ({ scenes: ([
		t,
		n,
		Object.keys(e?.states ?? {})
	].find((e) => e?.some((e) => e.startsWith("scene.")))?.filter((e) => e.startsWith("scene.")).slice(0, 6) ?? ["scene.example"]).map((e) => ({ entity: e })) })
}), fi = 10, pi = 32, mi = 34, hi = 8, gi = `${Tn}${Dt}${bt}
  .card {
    padding: 0;
    gap: 0;
  }
  .feed {
    position: relative;
    width: 100%;
    aspect-ratio: var(--lg-cam-ratio, 16 / 9);
    overflow: hidden;
    background: #0e1014;
    background-size: cover;
    background-position: center;
  }
  /* Darkens the top and bottom just enough for white text to hold up. */
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0) 62%,
      rgba(0, 0, 0, 0.65) 100%
    );
    pointer-events: none;
  }
  .bar {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 14px;
    height: 56px;
  }
  .bar.top {
    top: 0;
  }
  .bar.bottom {
    bottom: 0;
  }
  .trail {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Display-only badges retain their lightweight translucent treatment. */
  .float {
    position: relative;
    overflow: hidden;
    border: 0;
    padding: 0;
    color: #fff;
    background: rgba(11, 11, 15, 0.34);
    -webkit-backdrop-filter: blur(5px) saturate(1.35);
    backdrop-filter: blur(5px) saturate(1.35);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  }
  .round {
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    padding: 0;
    color: #fff;
    display: grid;
    place-items: center;
    cursor: pointer;
    --mdc-icon-size: 15px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
    transition: transform 120ms ease, opacity 160ms ease;
  }
  .round:active {
    transform: scale(0.9);
  }
  .round.big {
    width: 34px;
    height: 34px;
    --mdc-icon-size: 16px;
  }
  /*
   * Like GlassVideoControls, the WebGL surface paints the lens underneath while
   * the actual control stays crisp and has no fill of its own.
   */
  .feed.glass-active .lens-control {
    overflow: visible;
    background: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
  }
  .camera-glass-stage {
    position: absolute !important;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .live {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
  }
  .live .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--dot, #8e8e93);
    box-shadow: 0 0 6px var(--dot-glow, transparent);
  }

  .name {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;
    cursor: pointer;
  }
  .name .who {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .name .when {
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
  }
  .card.offline .name .who {
    color: rgba(255, 255, 255, 0.5);
  }

  .nosignal {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.5);
    --mdc-icon-size: 32px;
  }
  .nosignal span {
    font-size: 12px;
    font-weight: 500;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 16px;
  }
  .motion {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border-radius: 16px;
    font-size: 11px;
    font-weight: 600;
    min-width: 0;
    background: var(--chip-bg, var(--lg-track-bg));
    box-shadow: inset 0 0 0 1px var(--chip-stroke, var(--lg-glass-stroke));
    color: var(--chip-label, var(--lg-text-secondary));
  }
  .motion .dot {
    flex: none;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--chip-dot, var(--lg-text-secondary));
    box-shadow: 0 0 6px var(--chip-glow, transparent);
  }
  .motion span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .actions .spacer {
    flex: 1;
  }
  .history {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 16px;
    border: 0;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    --mdc-icon-size: 14px;
  }
  .dimmed {
    opacity: 0.4;
    pointer-events: none;
  }

  @container (max-width: 260px) {
    .bar {
      height: 46px;
      padding: 0 10px;
    }
    .actions {
      padding: 12px;
    }
  }
`;
function _i({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = lt(), a = (0, K.useMemo)(() => dt(gt, i), [i]), o = g(e.language ?? t?.locale?.language ?? t?.language), [s, c] = (0, K.useState)(0), l = e.entity ? t?.states[e.entity] : void 0, u = e.name ?? S(l, e.entity ?? ""), d = () => x(n, e.entity), f = w(l), p = l?.state === "streaming", m = l?.attributes.entity_picture, h = !(!m || f), v = f || !m ? void 0 : `${m}${m.includes("?") ? "&" : "?"}_=${s}`, y = (0, K.useRef)(null), [b, C] = (0, K.useState)({
		width: 0,
		height: 0
	}), [T, E] = (0, K.useState)();
	(0, K.useEffect)(() => {
		if (!h) return;
		let t = Math.max(e.refresh_interval ?? fi, 1), n = window.setInterval(() => c((e) => e + 1), t * 1e3);
		return () => window.clearInterval(n);
	}, [h, e.refresh_interval]), (0, K.useLayoutEffect)(() => {
		let e = y.current;
		if (!e) return;
		let t = () => C({
			width: e.clientWidth,
			height: e.clientHeight
		});
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, []), (0, K.useEffect)(() => {
		if (!r || !v) {
			E(void 0);
			return;
		}
		let e = !1, t = new Image();
		return t.crossOrigin = "anonymous", t.onload = () => {
			e || E(t);
		}, t.src = v, () => {
			e = !0;
		};
	}, [r, v]);
	let D = (0, K.useCallback)((e) => {
		if (!T || !T.naturalWidth || !T.naturalHeight) return;
		let t = e.canvas.width, n = e.canvas.height, r = Math.max(t / T.naturalWidth, n / T.naturalHeight), i = t / r, a = n / r, o = (T.naturalWidth - i) / 2, s = (T.naturalHeight - a) / 2;
		e.clearRect(0, 0, t, n), e.drawImage(T, o, s, i, a, 0, 0, t, n);
	}, [T]);
	if (!l) return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: gi }), /* @__PURE__ */ (0, q.jsx)(Et, {
		refraction: r,
		variant: e.glass_variant,
		icon: e.icon,
		name: u,
		label: o("unavailable"),
		onOpen: d
	})] });
	let O = (n) => {
		if (!n) return;
		let [r, i] = n.split(".");
		t?.callService(r, i, { entity_id: e.entity });
	}, k = () => {
		if (e.snapshot_service) {
			O(e.snapshot_service);
			return;
		}
		m && window.open(m, "_blank", "noopener");
	}, A = e.motion_entity ? t?.states[e.motion_entity] : void 0, j = A?.state === "on", M = !!(r && T && b.width > 0 && b.height > 0), N = b.width <= 260, P = N ? 46 : 56, F = N ? 10 : 14, I = b.width - F - pi / 2, L = [
		{
			x: I / b.width,
			y: P / 2 / b.height,
			w: pi,
			h: pi,
			radius: pi / 2
		},
		...e.show_mic ? [{
			x: (I - pi - hi) / b.width,
			y: P / 2 / b.height,
			w: pi,
			h: pi,
			radius: pi / 2
		}] : [],
		{
			x: (b.width - F - mi / 2) / b.width,
			y: (b.height - P / 2) / b.height,
			w: mi,
			h: mi,
			radius: mi / 2
		}
	], R = /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
		/* @__PURE__ */ (0, q.jsx)("div", { className: "scrim" }),
		/* @__PURE__ */ (0, q.jsxs)("div", {
			className: "bar top",
			children: [f ? /* @__PURE__ */ (0, q.jsx)("span", {}) : /* @__PURE__ */ (0, q.jsxs)("span", {
				className: "live float",
				style: p ? {
					"--dot": "#FF453A",
					"--dot-glow": "#FF453A"
				} : { "--dot": "#8E8E93" },
				children: [/* @__PURE__ */ (0, q.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, q.jsx)("span", {
					className: "live-label",
					children: o(p ? "cam_live" : "cam_still")
				})]
			}), /* @__PURE__ */ (0, q.jsxs)("div", {
				className: `trail${f ? " dimmed" : ""}`,
				children: [e.show_mic && /* @__PURE__ */ (0, q.jsx)("button", {
					className: "round float lens-control",
					type: "button",
					onClick: () => O(e.mic_service),
					title: o("cam_mic"),
					children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:microphone-off" })
				}), /* @__PURE__ */ (0, q.jsx)("button", {
					className: "round float lens-control",
					type: "button",
					onClick: d,
					title: o("cam_expand"),
					children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:arrow-expand" })
				})]
			})]
		}),
		f && /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "nosignal",
			children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:video-off" }), /* @__PURE__ */ (0, q.jsx)("span", { children: o("cam_no_signal") })]
		}),
		/* @__PURE__ */ (0, q.jsxs)("div", {
			className: "bar bottom",
			children: [/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "name",
				onClick: d,
				children: [/* @__PURE__ */ (0, q.jsx)("span", {
					className: "who",
					children: u
				}), /* @__PURE__ */ (0, q.jsx)("span", {
					className: "when",
					children: f ? o("cam_offline_state") : _(l.last_updated, o)
				})]
			}), /* @__PURE__ */ (0, q.jsx)("button", {
				className: `round big float lens-control${f ? " dimmed" : ""}`,
				type: "button",
				onClick: k,
				title: o("cam_snapshot"),
				children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:camera" })
			})]
		})
	] });
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: gi }), /* @__PURE__ */ (0, q.jsxs)(St, {
		className: `card${f ? " offline" : ""}`,
		refraction: r,
		variant: e.glass_variant,
		style: {
			display: "flex",
			position: "relative",
			overflow: "hidden",
			"--lg-cam-ratio": String(e.aspect_ratio ?? 16 / 9)
		},
		children: [/* @__PURE__ */ (0, q.jsx)("div", {
			ref: y,
			className: `feed${M ? " glass-active" : ""}`,
			style: v ? { backgroundImage: `url("${v}")` } : void 0,
			children: M ? /* @__PURE__ */ (0, q.jsx)(Xe, {
				className: "camera-glass-stage",
				draw: D,
				optics: a,
				lenses: L,
				maxDpr: i === "medium" ? 1 : 2,
				children: R
			}) : R
		}), e.show_actions !== !1 && /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "actions",
			children: [
				f ? /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "motion",
					style: {
						"--chip-bg": "rgba(255, 69, 58, 0.18)",
						"--chip-stroke": "rgba(255, 69, 58, 0.3)",
						"--chip-label": "#FF453A",
						"--chip-dot": "#FF453A"
					},
					children: [/* @__PURE__ */ (0, q.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, q.jsx)("span", { children: o("cam_offline") })]
				}) : A && /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "motion",
					style: j ? {
						"--chip-bg": "rgba(255, 159, 10, 0.18)",
						"--chip-stroke": "rgba(255, 159, 10, 0.3)",
						"--chip-label": "var(--lg-motion-label)",
						"--chip-dot": "#E08600",
						"--chip-glow": "#FF9F0A"
					} : void 0,
					children: [/* @__PURE__ */ (0, q.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, q.jsx)("span", { children: j ? `${o("cam_motion")} · ${_(A.last_changed, o)}` : o("cam_no_motion") })]
				}),
				/* @__PURE__ */ (0, q.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, q.jsxs)("button", {
					className: `history${f ? " dimmed" : ""}`,
					onClick: d,
					children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:bell-outline" }), /* @__PURE__ */ (0, q.jsx)("span", { children: o("cam_history") })]
				})
			]
		})]
	})] });
}
var vi = Jt({
	tagName: "liquid-glass-camera-card",
	component: _i,
	getCardSize: (e) => e.show_actions === !1 ? 4 : 5,
	getStubConfig: (e, t, n) => ({ entity: E(["camera"], e, t, n) })
}), yi = {
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
}, bi = {
	door: ["open", "closed"],
	garage_door: ["open", "closed"],
	window: ["open", "closed"],
	opening: ["open", "closed"],
	motion: ["detected", "clear"],
	occupancy: ["detected", "clear"],
	presence: ["detected", "clear"]
}, xi = {
	door: ["mdi:door-open", "mdi:door-closed"],
	garage_door: ["mdi:garage-open", "mdi:garage"],
	window: ["mdi:window-open", "mdi:window-closed"],
	opening: ["mdi:square-outline", "mdi:square"],
	motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
	occupancy: ["mdi:home-account", "mdi:home-outline"],
	presence: ["mdi:account", "mdi:account-outline"],
	moisture: ["mdi:water-alert", "mdi:water-off"],
	smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"]
}, Si = [
	["light", "custom:liquid-glass-light-card"],
	["switch", "custom:liquid-glass-switch-card"],
	["sensor", "custom:liquid-glass-sensor-card"]
], Ci = [
	"theme",
	"refraction",
	"refraction_quality",
	"language",
	"glass_variant"
], wi = [], Ti = `${Tn}${Dt}
  .panel {
    --lg-group-pad: 16px;
    --lg-group-gap: 12px;
    border-radius: var(--lg-corner, var(--lg-radius));
    padding: var(--lg-group-pad);
    display: flex;
    flex-direction: column;
    gap: var(--lg-group-gap);
    background: var(--lg-group-panel);
    box-shadow: inset 0 0 0 1px var(--lg-group-panel-stroke);
  }
  @supports (container-type: inline-size) {
    .panel {
      --lg-group-pad: clamp(10px, 4.2cqi, 16px);
      --lg-group-gap: clamp(8px, 3.2cqi, 12px);
      --lg-corner: min(calc(var(--lg-radius) + 4px), 12cqi);
      --lg-group-title: clamp(13px, 4.2cqi, 16px);
    }
  }

  .head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 4px;
  }
  .head.tappable {
    cursor: pointer;
  }
  .head .icon-well {
    width: 32px;
    height: 32px;
  }
  .head .icon-well lg-icon {
    --mdc-icon-size: 16px;
    width: 16px;
    height: 16px;
  }
  .head .text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .head .heading {
    font-size: var(--lg-group-title, 16px);
    font-weight: 700;
    color: var(--lg-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .head .sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--lg-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chevron {
    flex: none;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-secondary);
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
    --mdc-icon-size: 15px;
  }
  .chevron lg-icon {
    width: 15px;
    height: 15px;
    transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .chevron.closed lg-icon {
    transform: rotate(-180deg);
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: var(--lg-group-gap);
  }
  /* Children are full cards; they bring their own :host block layout. */
  .cards > * {
    display: block;
  }

  .summary {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 4px;
  }
  .sum {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 15px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    font-size: 11px;
    font-weight: 600;
    color: var(--tone, var(--lg-text-secondary));
    max-width: 100%;
  }
  .sum span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sum lg-icon {
    flex: none;
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
  }
  .sum.warm {
    --tone: var(--lg-motion-label);
  }
  .sum.good {
    --tone: var(--lg-trend-up);
  }
  .sum.info {
    --tone: var(--lg-cover-badge);
  }

  .empty {
    padding: 6px 4px 2px;
    font-size: var(--lg-state);
    color: var(--lg-text-secondary);
  }
`;
function Ei(e) {
	let t = String(e.type ?? ""), n = t.startsWith("custom:") ? t.slice(7) : `hui-${t}-card`, r = document.createElement(n), i = () => {
		try {
			r.setConfig?.(e);
		} catch {}
	};
	return typeof r.setConfig == "function" ? i() : customElements.whenDefined(n).then(i), r;
}
function Di(e, t) {
	if (t === "binary_sensor") {
		let t = xi[e?.attributes.device_class ?? ""];
		if (t) return e?.state === "on" ? t[0] : t[1];
	}
	return yi[t] ?? "mdi:card-outline";
}
function Oi(e, t, n) {
	let r = e.state, i = r === "on";
	switch (t) {
		case "light": {
			if (!i) return {
				label: n("unlit"),
				tone: "off"
			};
			let t = e.attributes.brightness;
			return {
				label: t ? `${Math.round(t / 255 * 100)}%` : n("lit"),
				tone: "warm"
			};
		}
		case "switch":
		case "input_boolean":
		case "fan":
		case "automation":
		case "siren": return i ? {
			label: n("on"),
			tone: "info"
		} : {
			label: n("off"),
			tone: "off"
		};
		case "lock": return r === "jammed" ? {
			label: n("jammed"),
			tone: "warm"
		} : r === "locked" ? {
			label: n("locked"),
			tone: "good"
		} : {
			label: n("unlocked"),
			tone: "warm"
		};
		case "cover": {
			if (r === "closed") return {
				label: n("closed"),
				tone: "off"
			};
			let t = e.attributes.current_position;
			return {
				label: t === void 0 ? n("open") : `${n("open")} ${Math.round(t)}%`,
				tone: "info"
			};
		}
		case "climate": {
			if (r === "off") return {
				label: n("mode_off"),
				tone: "off"
			};
			let t = e.attributes.temperature;
			return {
				label: t === void 0 ? n(`mode_${r}`) : `${t}°`,
				tone: "warm"
			};
		}
		case "binary_sensor": {
			let t = e.attributes.device_class, r = (t && bi[t]) ?? ["on", "off"];
			return i ? {
				label: n(r[0]),
				tone: "warm"
			} : {
				label: n(r[1]),
				tone: "off"
			};
		}
		case "media_player": return r === "playing" ? {
			label: n("playing"),
			tone: "info"
		} : r === "paused" ? {
			label: n("paused"),
			tone: "off"
		} : {
			label: n("standby"),
			tone: "off"
		};
		case "sensor": return {
			label: `${r}${e.attributes.unit_of_measurement ?? ""}`,
			tone: "off"
		};
		default: return i ? {
			label: n("on"),
			tone: "info"
		} : {
			label: r,
			tone: "off"
		};
	}
}
function ki({ config: e, hass: t, host: n }) {
	Sn(n, e, t);
	let r = g(e.language ?? t?.locale?.language ?? t?.language), [i, a] = (0, K.useState)(e.collapsed !== !0), [o, s] = (0, K.useState)([]), c = (0, K.useRef)(null), l = e.cards ?? wi, u = e.collapsible !== !1, d = (0, K.useMemo)(() => l.map((t) => {
		if (!String(t.type ?? "").startsWith("custom:liquid-glass-")) return t;
		let n = { ...t };
		for (let t of Ci) n[t] === void 0 && e[t] !== void 0 && (n[t] = e[t]);
		return n;
	}), [
		l,
		e.glass_variant,
		e.language,
		e.refraction,
		e.refraction_quality,
		e.theme
	]);
	(0, K.useEffect)(() => a(e.collapsed !== !0), [e.collapsed]), (0, K.useEffect)(() => {
		let e = !1;
		return (async () => {
			let t = await window.loadCardHelpers?.().catch(() => void 0);
			e || s(d.map((e) => {
				try {
					return t ? t.createCardElement(e) : Ei(e);
				} catch {
					return Ei(e);
				}
			}));
		})(), () => {
			e = !0;
		};
	}, [d]), (0, K.useEffect)(() => {
		c.current?.replaceChildren(...o);
	}, [o, i]), (0, K.useEffect)(() => {
		for (let e of o) e.hass = t;
		n.lgGroupSize = i ? 1 + o.reduce((e, t) => e + (t.getCardSize?.() ?? 3), 0) : 1;
	});
	let f = l.map((e) => {
		let n = typeof e.entity == "string" ? e.entity : void 0;
		if (!n) return;
		let i = t?.states[n], a = n.split(".", 1)[0], o = e.icon ?? i?.attributes.icon ?? Di(i, a);
		return w(i) ? {
			icon: o,
			label: r("unavailable"),
			tone: "off"
		} : {
			icon: o,
			...Oi(i, a, r)
		};
	}).filter((e) => !!e);
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: Ti }), /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "panel",
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: `head${u ? " tappable" : ""}`,
				onClick: () => u && a((e) => !e),
				children: [
					/* @__PURE__ */ (0, q.jsx)(Ct, { icon: e.icon ?? "mdi:view-grid-outline" }),
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "text",
						children: [/* @__PURE__ */ (0, q.jsx)("div", {
							className: "heading",
							children: e.title ?? r("grp_title")
						}), /* @__PURE__ */ (0, q.jsx)("div", {
							className: "sub",
							children: (() => {
								if (e.subtitle) return e.subtitle;
								if (!l.length) return "";
								let t = f.filter((e) => e.tone !== "off").length, n = [r("grp_devices", { n: l.length })];
								return f.length && n.push(t ? r("grp_running", { n: t }) : r("grp_all_idle")), !i && u && n.push(r("grp_tap_expand")), n.join(" · ");
							})()
						})]
					}),
					u && /* @__PURE__ */ (0, q.jsx)("button", {
						className: `chevron${i ? "" : " closed"}`,
						"aria-expanded": i,
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:chevron-up" })
					})
				]
			}),
			!i && e.summary !== !1 && f.length > 0 && /* @__PURE__ */ (0, q.jsx)("div", {
				className: "summary",
				children: f.map((e, t) => /* @__PURE__ */ (0, q.jsxs)("div", {
					className: `sum ${e.tone}`,
					children: [/* @__PURE__ */ (0, q.jsx)(X, { icon: e.icon }), /* @__PURE__ */ (0, q.jsx)("span", { children: e.label })]
				}, t))
			}),
			i && (l.length ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "cards",
				ref: c
			}) : /* @__PURE__ */ (0, q.jsx)("div", {
				className: "empty",
				children: r("grp_empty")
			}))
		]
	})] });
}
var Ai = Jt({
	tagName: "liquid-glass-group-card",
	component: ki,
	getCardSize: (e, t) => t.lgGroupSize ?? (e.collapsed ? 1 : 1 + (e.cards?.length ?? 0) * 3),
	getStubConfig: (e, t, n) => {
		let r = [
			t,
			n,
			Object.keys(e?.states ?? {})
		].find((e) => e?.length) ?? [];
		return { cards: Si.flatMap(([e, t]) => {
			let n = r.find((t) => t.startsWith(`${e}.`));
			return n ? [{
				type: t,
				entity: n
			}] : [];
		}) };
	}
}), ji = `${Tn}${bt}
  * { box-sizing: border-box; }
  :host {
    display: block;
    min-width: 0;
    container-type: inline-size;
    color: var(--lg-text-primary);
    font-family: var(--lg-font-jp);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  .separator {
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
    color: var(--lg-text-primary);
  }
  .separator > lg-icon,
  .pill > lg-icon,
  .header-well > lg-icon,
  .chevron > lg-icon { flex: none; }
  .plain {
    gap: 10px;
    padding: 16px 6px 10px;
    color: var(--lg-text-secondary);
  }
  .plain > lg-icon {
    --mdc-icon-size: 16px;
    width: 16px;
    height: 16px;
  }
  .plain-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0.6px;
  }
  .line {
    flex: 1 1 24px;
    min-width: 12px;
    height: 1px;
    background: var(--lg-separator-line);
  }
  .plain-count {
    flex: none;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .pill-row {
    gap: 10px;
    padding: 10px 0;
  }
  .pill {
    flex: none;
    position: relative;
    min-width: 0;
    max-width: calc(100% - 22px);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 20px;
    color: var(--lg-text-primary);
  }
  .pill > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  .pill-title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
  }
  .pill-count {
    flex: none;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .header-row {
    gap: 12px;
    padding: 14px 4px 8px;
  }
  .header-well {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--lg-text-primary);
  }
  .header-well > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  .header-text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .header-title,
  .header-subtitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .header-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
  }
  .header-subtitle {
    color: var(--lg-text-secondary);
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
  }
  .chevron {
    flex: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--lg-text-secondary);
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .chevron > lg-icon {
    --mdc-icon-size: 15px;
    width: 15px;
    height: 15px;
  }
  @container (max-width: 230px) {
    .plain,
    .pill-row { gap: 8px; }
    .pill { padding-inline: 11px; }
    .header-row { gap: 9px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
function Mi({ config: e, hass: t, host: n }) {
	let { refraction: r } = Sn(n, e, t), i = g(e.language ?? t?.locale?.language ?? t?.language), a = e.title ?? e.name ?? i("sep_title"), o = e.icon ?? "mdi:lightbulb-outline", s = e.count !== void 0 && e.count !== null && e.count !== "", c;
	switch (e.style) {
		case "plain":
			c = /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "separator plain",
				children: [
					/* @__PURE__ */ (0, q.jsx)(X, { icon: o }),
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "plain-title",
						children: a
					}),
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "line",
						"aria-hidden": "true"
					}),
					s && /* @__PURE__ */ (0, q.jsx)("span", {
						className: "plain-count",
						children: e.count
					})
				]
			});
			break;
		case "header":
			c = /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "separator header-row",
				children: [
					/* @__PURE__ */ (0, q.jsx)(St, {
						className: "header-well",
						refraction: r,
						variant: e.glass_variant,
						surface: "compact",
						sourceAccent: "var(--lg-accent)",
						style: { display: "grid" },
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: o })
					}),
					/* @__PURE__ */ (0, q.jsxs)("span", {
						className: "header-text",
						children: [/* @__PURE__ */ (0, q.jsx)("span", {
							className: "header-title",
							children: a
						}), e.subtitle && /* @__PURE__ */ (0, q.jsx)("span", {
							className: "header-subtitle",
							children: e.subtitle
						})]
					}),
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, q.jsx)(X, { icon: "mdi:chevron-up" })
					})
				]
			});
			break;
		default: c = /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "separator pill-row",
			children: [/* @__PURE__ */ (0, q.jsxs)(St, {
				className: "pill",
				refraction: r,
				variant: e.glass_variant,
				surface: "compact",
				sourceAccent: "var(--lg-accent)",
				style: { display: "flex" },
				children: [
					/* @__PURE__ */ (0, q.jsx)(X, { icon: o }),
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "pill-title",
						children: a
					}),
					s && /* @__PURE__ */ (0, q.jsx)("span", {
						className: "pill-count",
						children: e.count
					})
				]
			}), /* @__PURE__ */ (0, q.jsx)("span", {
				className: "line",
				"aria-hidden": "true"
			})]
		});
	}
	return /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("style", { children: ji }), c] });
}
var Ni = Jt({
	tagName: "liquid-glass-separator-card",
	component: Mi,
	getCardSize: () => 1,
	getStubConfig: () => ({
		title: "Section",
		icon: "mdi:lightbulb-outline",
		style: "pill"
	})
}), Pi = "0.6.0", Fi = "2026-09-05 19:22", Ii = "https://github.com/cos-overclock/ha-liquid-glass", Li = (e, t) => !!((e.attributes.supported_features ?? 0) & t);
function Ri(e, t, n, r, i, a = (e) => ({ entity: e })) {
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
var zi = 1, Bi = 4, Vi = 4, Hi = [
	Ri("liquid-glass-light-card", "Liquid Glass Light", "Brightness, color temperature, color and presets", ["light"]),
	Ri("liquid-glass-climate-card", "Liquid Glass Climate", "Thermostat dial with modes and fan / preset", ["climate"], (e) => Li(e, 3)),
	Ri("liquid-glass-switch-card", "Liquid Glass Switch", "Single row toggle", u),
	Ri("liquid-glass-sensor-card", "Liquid Glass Sensor", "Value, trend and 24h sparkline", ["sensor"]),
	Ri("liquid-glass-binary-sensor-card", "Liquid Glass Binary Sensor", "Door / motion / window status row", ["binary_sensor"]),
	Ri("liquid-glass-lock-card", "Liquid Glass Lock", "Slide to lock / unlock", ["lock"]),
	Ri("liquid-glass-cover-card", "Liquid Glass Cover", "Blinds and curtains with position and tilt", ["cover"], (e) => Li(e, 7)),
	Ri("liquid-glass-media-card", "Liquid Glass Media", "Now playing with transport and volume", ["media_player"]),
	Ri("liquid-glass-slider-card", "Liquid Glass Slider", "Any numeric value as a draggable track", d, (e) => {
		switch (e.entity_id.split(".", 1)[0]) {
			case "input_number":
			case "number": return !0;
			case "fan": return Li(e, zi);
			case "light": return (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
			case "media_player": return Li(e, Vi);
			case "cover":
			case "valve": return Li(e, Bi);
			case "humidifier": return "humidity" in e.attributes;
			case "water_heater":
			case "climate": return Li(e, zi);
			default: return !1;
		}
	}),
	Ri("liquid-glass-weather-card", "Liquid Glass Weather", "Current conditions with hourly and daily forecast", ["weather"]),
	Ri("liquid-glass-button-card", "Liquid Glass Button", "Run a scene, script, automation or button", l),
	Ri("liquid-glass-scene-card", "Liquid Glass Scenes", "A grid of scene tiles or a row of chips", l, void 0, (e) => ({ scenes: [{ entity: e }] })),
	Ri("liquid-glass-camera-card", "Liquid Glass Camera", "Camera still with motion and history", ["camera"]),
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
];
window.customCards = window.customCards ?? [];
for (let e of Hi) {
	let t = {
		...e,
		preview: !0,
		documentationURL: Ii
	}, n = window.customCards.find((t) => t.type === e.type);
	n ? Object.assign(n, t) : window.customCards.push(t);
}
console.info(`%c LIQUID-GLASS-CARDS %c v${Pi} · ${Hi.length} cards · built ${Fi} `, "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;", "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");
//#endregion
export { wr as LiquidGlassBinarySensorCard, si as LiquidGlassButtonCard, vi as LiquidGlassCameraCard, rr as LiquidGlassClimateCard, Nr as LiquidGlassCoverCard, Ai as LiquidGlassGroupCard, An as LiquidGlassLightCard, Or as LiquidGlassLockCard, zr as LiquidGlassMediaCard, di as LiquidGlassSceneCard, br as LiquidGlassSensorCard, Ni as LiquidGlassSeparatorCard, Gr as LiquidGlassSliderCard, lr as LiquidGlassSwitchCard, Qr as LiquidGlassWeatherCard, Bt as defineReactCard };
