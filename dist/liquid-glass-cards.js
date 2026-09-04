//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, l, { is: u, defineProperty: d, getOwnPropertyDescriptor: f, getOwnPropertyNames: p, getOwnPropertySymbols: m, getPrototypeOf: h } = Object, g = globalThis, _ = g.trustedTypes, ee = _ ? _.emptyScript : "", te = g.reactiveElementPolyfillSupport, ne = (e, t) => e, re = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, ie = (e, t) => !u(e, t), ae = {
	attribute: !0,
	type: String,
	converter: re,
	reflect: !1,
	useDefault: !1,
	hasChanged: ie
};
(l = Symbol).metadata ?? (l.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var oe = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ?? (this.l = [])).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ae) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && d(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = f(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ae;
	}
	static _$Ei() {
		if (this.hasOwnProperty(ne("elementProperties"))) return;
		let e = h(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(ne("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ne("properties"))) {
			let e = this.properties, t = [...p(e), ...m(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? re : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? re : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? ie)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
oe.elementStyles = [], oe.shadowRootOptions = { mode: "open" }, oe[ne("elementProperties")] = /* @__PURE__ */ new Map(), oe[ne("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: oe }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var se = globalThis, ce = (e) => e, le = se.trustedTypes, ue = le ? le.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, de = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, fe = "?" + v, pe = `<${fe}>`, me = document, he = () => me.createComment(""), ge = (e) => e === null || typeof e != "object" && typeof e != "function", _e = Array.isArray, ve = (e) => _e(e) || typeof e?.[Symbol.iterator] == "function", ye = "[ 	\n\f\r]", be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Se = />/g, Ce = RegExp(`>|${ye}(?:([^\\s"'>=/]+)(${ye}*=${ye}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, Te = /"/g, Ee = /^(?:script|style|textarea|title)$/i, De = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), y = De(1), Oe = De(2), b = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), Ae = me.createTreeWalker(me, 129);
function je(e, t) {
	if (!_e(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ue === void 0 ? t : ue.createHTML(t);
}
var Me = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = be;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === be ? c[1] === "!--" ? o = xe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = Ce) : (Ee.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = Ce) : o = Se : o === Ce ? c[0] === ">" ? (o = i ?? be, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? Ce : c[3] === "\"" ? Te : we) : o === Te || o === we ? o = Ce : o === xe || o === Se ? o = be : (o = Ce, i = void 0);
		let d = o === Ce && e[t + 1].startsWith("/>") ? " " : "";
		a += o === be ? n + pe : l >= 0 ? (r.push(s), n.slice(0, l) + de + n.slice(l) + v + d) : n + v + (l === -2 ? t : d);
	}
	return [je(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ne = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Me(t, n);
		if (this.el = e.createElement(l, r), Ae.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Ae.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(de)) {
					let t = u[o++], n = i.getAttribute(e).split(v), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Re : r[1] === "?" ? ze : r[1] === "@" ? Be : Le
					}), i.removeAttribute(e);
				} else e.startsWith(v) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (Ee.test(i.tagName)) {
					let e = i.textContent.split(v), t = e.length - 1;
					if (t > 0) {
						i.textContent = le ? le.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], he()), Ae.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], he());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === fe) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(v, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += v.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = me.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Pe(e, t, n = e, r) {
	if (t === b) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = ge(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ?? (n._$Co = []))[r] = i), i !== void 0 && (t = Pe(e, i._$AS(e, t.values), i, r)), t;
}
var Fe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? me).importNode(t, !0);
		Ae.currentNode = r;
		let i = Ae.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ie(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ve(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Ae.nextNode(), a++);
		}
		return Ae.currentNode = me, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ie = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = Pe(this, e, t), ge(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== b && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ve(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== x && ge(this._$AH) ? this._$AA.nextSibling.data = e : this.T(me.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ne.createElement(je(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Fe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ke.get(e.strings);
		return t === void 0 && ke.set(e.strings, t = new Ne(e)), t;
	}
	k(t) {
		_e(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(he()), this.O(he()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ce(e).nextSibling;
			ce(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Le = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = x;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Pe(this, e, t, 0), a = !ge(e) || e !== this._$AH && e !== b, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Pe(this, r[n + o], t, o), s === b && (s = this._$AH[o]), a || (a = !ge(s) || s !== this._$AH[o]), s === x ? e = x : e !== x && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Re = class extends Le {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === x ? void 0 : e;
	}
}, ze = class extends Le {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== x);
	}
}, Be = class extends Le {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Pe(this, e, t, 0) ?? x) === b) return;
		let n = this._$AH, r = e === x && n !== x || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== x && (n === x || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ve = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Pe(this, e);
	}
}, He = se.litHtmlPolyfillSupport;
He?.(Ne, Ie), (se.litHtmlVersions ?? (se.litHtmlVersions = [])).push("3.3.3");
var Ue = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ie(t.insertBefore(he(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, We = globalThis, S = class extends oe {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		var e;
		let t = super.createRenderRoot();
		return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ue(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return b;
	}
};
S._$litElement$ = !0, S.finalized = !0, We.litElementHydrateSupport?.({ LitElement: S });
var Ge = We.litElementPolyfillSupport;
Ge?.({ LitElement: S }), (We.litElementVersions ?? (We.litElementVersions = [])).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Ke = {
	attribute: !0,
	type: String,
	converter: re,
	reflect: !1,
	hasChanged: ie
}, qe = (e = Ke, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function C(e) {
	return (t, n) => typeof n == "object" ? qe(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function w(e) {
	return C({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/i18n.ts
var Je = {
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
	decrease_temp: "設定温度を1度下げる",
	increase_temp: "設定温度を1度上げる",
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
}, Ye = {
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
	decrease_temp: "Decrease target by 1 degree",
	increase_temp: "Increase target by 1 degree",
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
}, Xe = {
	ja: Je,
	en: Ye
};
function Ze(e) {
	let t = Xe[(e ?? "en").toLowerCase().split("-")[0]] ?? Ye;
	return (e, n) => {
		let r = t[e] ?? Ye[e] ?? e;
		if (n) for (let [e, t] of Object.entries(n)) r = r.replace(`{${e}}`, String(t));
		return r;
	};
}
function T(e, t) {
	if (!e) return "";
	let n = Math.max(0, Date.now() - new Date(e).getTime()), r = Math.round(n / 1e3);
	if (r < 30) return t("just_now");
	if (r < 90) return t("seconds_ago", { n: r });
	let i = Math.round(r / 60);
	if (i < 60) return t("minutes_ago", { n: i });
	let a = Math.round(i / 60);
	return a < 48 ? t("hours_ago", { n: a }) : t("days_ago", { n: Math.round(a / 24) });
}
function Qe(e) {
	if (!e) return "";
	let t = new Date(e);
	return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
//#endregion
//#region src/utils.ts
var E = (e, t, n) => Math.min(n, Math.max(t, e));
function $e(e, t, n = {}) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
function et(e, t) {
	t && $e(e, "hass-more-info", { entityId: t });
}
function tt(e, t) {
	return e?.attributes.friendly_name ?? t;
}
function D(e, t, n) {
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
function O(e) {
	return !e || e.state === "unavailable" || e.state === "unknown";
}
function k(e, t) {
	return !!((e?.attributes.supported_features ?? 0) & t);
}
function A(e, t, n, r, i) {
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
function nt(e, t) {
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
function j(e) {
	return `#${e.slice(0, 3).map((e) => Math.round(E(e, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}
function rt(e) {
	let t = /^#?([0-9a-f]{6})$/i.exec(e.trim());
	if (!t) return;
	let n = parseInt(t[1], 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function it(e, t = .45) {
	let n = rt(e);
	return n ? j(n.map((e) => e + (255 - e) * t)) : e;
}
function at(e, t = .3) {
	let n = rt(e);
	return n ? j(n.map((e) => e * (1 - t))) : e;
}
function M(e, t) {
	let n = rt(e);
	return n ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${t})` : e;
}
//#endregion
//#region node_modules/lit-html/directive.js
var ot = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, st = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), ct = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, N = st(class extends ct {
	constructor(e) {
		if (super(e), e.type !== ot.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
	}
	update(e, [t]) {
		if (this.st === void 0) {
			this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((e) => e !== "")));
			for (let e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
			return this.render(t);
		}
		let n = e.element.classList;
		for (let e of this.st) e in t || (n.remove(e), this.st.delete(e));
		for (let e in t) {
			let r = !!t[e];
			r === this.st.has(e) || this.nt?.has(e) || (r ? (n.add(e), this.st.add(e)) : (n.remove(e), this.st.delete(e)));
		}
		return b;
	}
}), lt = "important", ut = " !" + lt, P = st(class extends ct {
	constructor(e) {
		if (super(e), e.type !== ot.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}, "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(ut);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? lt : "") : n[e] = r;
			}
		}
		return b;
	}
}), dt = (e, t, n) => Math.min(n, Math.max(t, e)), ft = (e, t, n) => {
	let r = dt((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
};
function pt(e) {
	let t = 1 - e;
	return (1 - t * t * t * t) ** .25;
}
function mt(e) {
	let t = .001;
	return (pt(dt(e + t, 0, 1)) - pt(dt(e - t, 0, 1))) * (.5 / t);
}
function ht(e, t, n) {
	let r = dt(e / n, -.9999, .9999);
	return r / Math.sqrt(1 - r * r) - t;
}
function gt(e, t, n, r = 0) {
	let i = mt(e);
	return -ht(i / Math.sqrt(1 + i * i), i, 1 + n * .045 + r) * t;
}
var _t = (e) => {
	let t = Math.hypot(...e) || 1;
	return e.map((e) => e / t);
};
function vt(e) {
	let t = e * Math.PI / 180;
	return _t([
		Math.cos(t),
		Math.sin(t),
		.85
	]);
}
function yt(e, t, n, r, i) {
	let a = mt(e), o = vt(r), s = n[0] * o[0] + n[1] * o[1], c = Math.max(s, 0), l = Math.max(-s, 0), u = _t([
		-a * n[0],
		-a * n[1],
		1
	]), d = -(o[0] * u[0] + o[1] * u[1] + o[2] * u[2]), f = -o[2] - 2 * d * u[2], p = Math.max(f, 0) ** 26 * c, m = Math.max(f, 0) ** 48 * l * .3, h = (1 - ft(0, 2, t)) * (.22 + .78 * c), g = (1 - u[2]) ** 3 * (.15 + .85 * c);
	return ((p + m) * 1.5 + g * .3 + h * .28) * i - l * (1 - u[2]) * .14;
}
var F = {
	edge: 28,
	refraction: 22,
	chroma: .35,
	blur: 7,
	highlight: .85,
	lightAngle: 120,
	saturation: 1.35
}, bt = {
	top: [0, 1],
	bottom: [0, -1],
	left: [-1, 0],
	right: [1, 0]
}, xt = 40, St = 160, Ct = 80, wt = [
	{
		id: "lg-card",
		edge: F.edge,
		refraction: F.refraction,
		blur: 5,
		saturation: F.saturation,
		chroma: F.chroma,
		bend: .34
	},
	{
		id: "lg-knob",
		edge: 14,
		refraction: 16,
		blur: 2.2,
		saturation: F.saturation,
		chroma: F.chroma,
		bend: .46
	},
	{
		id: "lg-slider-knob",
		edge: 20,
		refraction: 10,
		blur: 12,
		saturation: F.saturation,
		chroma: F.chroma,
		bend: .38
	}
], Tt = {
	width: 320,
	height: 190,
	radius: 40
}, Et = {
	width: 64,
	height: 64,
	radius: 32
}, Dt = {
	width: 44,
	height: 44,
	radius: 22
}, Ot = /* @__PURE__ */ new Map(), kt = {
	r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
	g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
	b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
}, At = (e, t, n) => Math.min(n, Math.max(t, e));
function jt(e, t, n, r, i) {
	let a = n / 2, o = r / 2, s = At(i, 0, Math.min(a, o)), c = Math.abs(e - a) - a + s, l = Math.abs(t - o) - o + s;
	return Math.hypot(Math.max(c, 0), Math.max(l, 0)) + Math.min(Math.max(c, l), 0) - s;
}
function Mt(e, t, n) {
	let r = .6, i = jt(e + r, t, n.width, n.height, n.radius) - jt(e - r, t, n.width, n.height, n.radius), a = jt(e, t + r, n.width, n.height, n.radius) - jt(e, t - r, n.width, n.height, n.radius), o = Math.hypot(i, a) || 1;
	return [i / o, a / o];
}
function Nt(e, t) {
	if (typeof document > "u") return;
	let n = Math.max(1, e.width), r = Math.max(1, e.height), i = At(e.radius, 0, Math.min(n, r) / 2), a = [
		t.id,
		Math.round(n / 4) * 4,
		Math.round(r / 4) * 4,
		Math.round(i / 2) * 2
	].join(":"), o = Ot.get(a);
	if (o) return o;
	let s = Math.min(1, St / Math.max(n, r)), c = Math.max(32, Math.round(n * s)), l = Math.max(32, Math.round(r * s)), u = document.createElement("canvas");
	u.width = c, u.height = l;
	let d = u.getContext("2d");
	if (!d) return;
	let f = d.createImageData(c, l), p = {
		width: n,
		height: r,
		radius: i
	};
	for (let e = 0; e < l; e += 1) {
		let a = (e + .5) / l * r;
		for (let o = 0; o < c; o += 1) {
			let s = (o + .5) / c * n, l = jt(s, a, n, r, i), u = (e * c + o) * 4, d = 0, m = 0;
			if (l <= 1) {
				let e = Math.max(0, -l), n = At(e / Math.max(t.edge, 1), 0, 1), r = Math.min(gt(n, t.edge, t.refraction), xt), i = At(1 - e / Math.max(3, t.edge * .42), 0, 1);
				r += t.bend * 6.75 * i * i * (1 - i);
				let [o, c] = Mt(s, a, p);
				d = -o * r, m = -c * r;
			}
			f.data[u] = Math.round(At(128 + d / xt * 127, 0, 255)), f.data[u + 1] = Math.round(At(128 + m / xt * 127, 0, 255)), f.data[u + 2] = 128, f.data[u + 3] = 255;
		}
	}
	d.putImageData(f, 0, 0);
	let m = u.toDataURL("image/png");
	return Ot.set(a, m), Ot.size > Ct && Ot.delete(Ot.keys().next().value), m;
}
function Pt(e, t) {
	let n = .15, r = gt(n, e.edge, e.refraction), i = gt(n, e.edge, e.refraction, t * e.chroma * .12);
	return r > 0 ? i / r : 1;
}
function Ft(e, t) {
	let n = Nt(t, e);
	return Oe`
    <filter id=${e.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      ${n ? Oe`<feImage href=${n} preserveAspectRatio="none" result="map" />` : Oe`<feFlood flood-color="rgb(128,128,128)" result="map" />`}
      <feGaussianBlur in="SourceGraphic" stdDeviation=${e.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(e.saturation)} result="sat" />
      <feDisplacementMap in="sat" in2="map" scale=${80 * Pt(e, -1)} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="sat" in2="map" scale=${80} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="sat" in2="map" scale=${80 * Pt(e, 1)} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values=${kt.r} result="cr" />
      <feColorMatrix in="dg" type="matrix" values=${kt.g} result="cg" />
      <feColorMatrix in="db" type="matrix" values=${kt.b} result="cb" />
      <feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="crg" />
      <feComposite in="crg" in2="cb" operator="arithmetic" k2="1" k3="1" />
    </filter>`;
}
function It(e = Tt) {
	return y`<svg class="lg-defs" aria-hidden="true" focusable="false">
    <defs>
      ${Ft(wt[0], e)}
      ${Ft(wt[1], Et)}
      ${Ft(wt[2], Dt)}
    </defs>
  </svg>`;
}
It(), y`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Ft(wt[1], Et)}</defs>
</svg>`;
var Lt = y`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Ft(wt[2], Dt)}</defs>
</svg>`, Rt;
function zt() {
	if (Rt !== void 0) return Rt;
	let e = navigator.userAgent, t = /Chrome\/|Chromium\/|CriOS\//.test(e) || !!navigator.userAgentData, n = /Safari\//.test(e) && !/Chrome\/|Chromium\/|CriOS\//.test(e), r = /Firefox\//.test(e), i = /\bwv\b|Home[ /]?Assistant/i.test(e);
	return Rt = t && !n && !r && !i && CSS.supports("backdrop-filter", "url(#lg-test)"), Rt;
}
//#endregion
//#region src/editor/load.ts
var Bt;
function Vt() {
	return Bt || (Bt = (async () => {
		let e = window.loadCardHelpers;
		if (e) try {
			await ((await e()).createCardElement?.({
				type: "entities",
				entities: []
			})?.constructor)?.getConfigElement?.();
		} catch {}
	})()), Bt;
}
//#endregion
//#region src/styles/motion.ts
var Ht = [
	["--well-from", "#ffd36b"],
	["--well-to", "#ff8a1f"],
	["--well-glow", "rgba(255, 165, 48, 0.24)"],
	["--lg-ring-0", "#ffb36b"],
	["--lg-ring-1", "#ff6a3d"],
	["--lg-ring-2", "#ff2d55"]
];
function Ut() {
	let e = typeof CSS < "u" ? CSS : void 0;
	if (e?.registerProperty) for (let [t, n] of Ht) try {
		e.registerProperty({
			name: t,
			syntax: "<color>",
			inherits: !0,
			initialValue: n
		});
	} catch {}
}
//#endregion
//#region \0@oxc-project+runtime@0.148.0/helpers/esm/decorate.js
function I(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/components/lg-icon.ts
var Wt, Gt = class extends S {
	constructor(...e) {
		super(...e), this.icon = "";
	}
	render() {
		return y`<ha-icon .icon=${this.icon}></ha-icon>`;
	}
};
Wt = Gt, Wt.styles = o`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      color: inherit;
      flex: none;
    }
    ha-icon {
      display: flex;
      --mdc-icon-size: inherit;
    }
  `, I([C()], Gt.prototype, "icon", void 0), customElements.get("lg-icon") || customElements.define("lg-icon", Gt);
//#endregion
//#region src/components/lg-glass-surface.ts
var Kt, qt = "\nattribute vec2 a_position;\nvoid main() { gl_Position = vec4(a_position, 0.0, 1.0); }\n", Jt = "\nprecision highp float;\nuniform vec2 u_resolution;\nuniform float u_shape;\nuniform float u_radius;\nuniform float u_edge;\nuniform float u_refraction;\nuniform float u_chroma;\nuniform float u_blur;\nuniform float u_highQualityBlur;\nuniform float u_highlight;\nuniform float u_lightAngle;\nuniform float u_saturation;\nuniform float u_tintAlpha;\nuniform float u_surfaceAlpha;\nuniform vec3 u_tint;\nuniform vec3 u_colors[4];\nuniform vec4 u_stops;\nconst int BLUR_TAPS = 8;\nconst int HIGH_QUALITY_BLUR_TAPS = 49;\n\nfloat surfaceHeight(float t) {\n  float s = 1.0 - t;\n  float s4 = s * s * s * s;\n  return pow(max(1.0 - s4, 0.0), 0.25);\n}\nfloat refractDisp(float sinI, float slope, float n) {\n  float sinR = clamp(sinI / n, -0.9999, 0.9999);\n  return sinR * inversesqrt(1.0 - sinR * sinR) - slope;\n}\nfloat roundedBox(vec2 p, vec2 halfSize, float radius) {\n  vec2 q = abs(p) - halfSize + radius;\n  float outside = length(max(q, 0.0));\n  float inside = min(max(q.x, q.y), 0.0);\n  return -(outside + inside - radius);\n}\nfloat shapeDistance(vec2 coord) {\n  vec2 halfSize = u_resolution * 0.5;\n  vec2 p = coord - halfSize;\n  if (u_shape < 0.5) return min(halfSize.x, halfSize.y) - length(p);\n  float radius = u_shape < 1.5 ? halfSize.y : min(u_radius, halfSize.y);\n  return roundedBox(p, halfSize - vec2(0.75), max(radius - 0.75, 1.0));\n}\nvec3 backdropAt(vec2 coord) {\n  float x = clamp(coord.x / u_resolution.x, 0.0, 1.0);\n  if (x <= u_stops.y) return mix(u_colors[0], u_colors[1], smoothstep(u_stops.x, u_stops.y, x));\n  if (x <= u_stops.z) return mix(u_colors[1], u_colors[2], smoothstep(u_stops.y, u_stops.z, x));\n  return mix(u_colors[2], u_colors[3], smoothstep(u_stops.z, u_stops.w, x));\n}\nvec3 sampleBg(vec2 coord) {\n  if (u_blur <= 0.0) return backdropAt(coord);\n  if (u_highQualityBlur > 0.5) {\n    vec3 sum = vec3(0.0);\n    float weightSum = 0.0;\n    for (int i = 0; i < HIGH_QUALITY_BLUR_TAPS; i++) {\n      float x = (float(i) / float(HIGH_QUALITY_BLUR_TAPS - 1) * 4.0 - 2.0) * u_blur;\n      float weight = exp(-0.5 * x * x / max(u_blur * u_blur, 0.0001));\n      sum += backdropAt(coord + vec2(x, 0.0)) * weight;\n      weightSum += weight;\n    }\n    return sum / weightSum;\n  }\n  vec3 sum = backdropAt(coord);\n  for (int i = 0; i < BLUR_TAPS; i++) {\n    float fi = float(i) + 0.5;\n    float a = fi * 2.39996323;\n    float r = sqrt(fi / float(BLUR_TAPS)) * u_blur;\n    sum += backdropAt(coord + vec2(cos(a), sin(a)) * r);\n  }\n  return sum / (float(BLUR_TAPS) + 1.0);\n}\nvoid main() {\n  vec2 coord = gl_FragCoord.xy;\n  float sd = shapeDistance(coord);\n  float coverage = smoothstep(-1.0, 1.0, sd);\n  float ew = max(u_edge, 1.0);\n  float t = clamp(sd / ew, 0.0, 1.0);\n  float e = 0.75;\n  vec2 grad = vec2(\n    shapeDistance(coord + vec2(e, 0.0)) - shapeDistance(coord - vec2(e, 0.0)),\n    shapeDistance(coord + vec2(0.0, e)) - shapeDistance(coord - vec2(0.0, e))\n  );\n  vec2 borderDir = -normalize(grad + vec2(1e-6));\n  float delta = 0.001;\n  float h1 = surfaceHeight(clamp(t - delta, 0.0, 1.0));\n  float h2 = surfaceHeight(clamp(t + delta, 0.0, 1.0));\n  float slope = (h2 - h1) * (0.5 / delta);\n  float sinI = slope * inversesqrt(1.0 + slope * slope);\n  float ior = 1.0 + u_refraction * 0.045;\n  float dispG = refractDisp(sinI, slope, ior) * ew;\n  vec3 col;\n  if (u_chroma <= 0.0 || u_refraction <= 0.0) {\n    col = sampleBg(coord + borderDir * dispG);\n  } else {\n    float spread = u_chroma * 0.12;\n    float dispR = refractDisp(sinI, slope, max(ior - spread, 1.001)) * ew;\n    float dispB = refractDisp(sinI, slope, ior + spread) * ew;\n    col = vec3(sampleBg(coord + borderDir * dispR).r, sampleBg(coord + borderDir * dispG).g, sampleBg(coord + borderDir * dispB).b);\n  }\n  float luma = dot(col, vec3(0.299, 0.587, 0.114));\n  col = mix(vec3(luma), col, u_saturation);\n  col = mix(col, u_tint, u_tintAlpha);\n  float angle = radians(u_lightAngle);\n  vec3 light = normalize(vec3(cos(angle), sin(angle), 0.85));\n  vec3 normal = normalize(vec3(-slope * borderDir, 1.0));\n  float facing = dot(borderDir, light.xy);\n  float lit = max(facing, 0.0);\n  float back = max(-facing, 0.0);\n  vec3 reflected = reflect(-light, normal);\n  float spec = pow(max(reflected.z, 0.0), 26.0) * lit;\n  float spec2 = pow(max(reflected.z, 0.0), 48.0) * back * 0.3;\n  float hairline = (1.0 - smoothstep(0.0, 2.0, sd)) * (0.22 + 0.78 * lit);\n  float fresnel = pow(1.0 - normal.z, 3.0) * (0.15 + 0.85 * lit);\n  col += vec3(1.0) * ((spec + spec2) * 1.5 + fresnel * 0.3 + hairline * 0.28) * u_highlight;\n  col -= back * (1.0 - normal.z) * 0.14;\n  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;\n  col += dither / 768.0;\n  float alpha = coverage * clamp(u_surfaceAlpha, 0.0, 1.0);\n  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);\n}\n";
function Yt(e) {
	let t = e.trim().match(/^#([0-9a-f]{6}|[0-9a-f]{3})(?:[0-9a-f]{2})?$/i)?.[1];
	if (t) {
		let e = t.length === 3 ? [...t].map((e) => e + e).join("") : t;
		return [
			0,
			2,
			4
		].map((t) => parseInt(e.slice(t, t + 2), 16) / 255);
	}
	let n = e.match(/rgba?\(\s*([\d.]+)[, ]+\s*([\d.]+)[, ]+\s*([\d.]+)/i);
	return n ? [
		Number(n[1]) / 255,
		Number(n[2]) / 255,
		Number(n[3]) / 255
	] : [
		.72,
		.72,
		.76
	];
}
var Xt = class {
	constructor() {
		if (this.canvas = document.createElement("canvas"), this.gl = this.canvas.getContext("webgl", {
			alpha: !0,
			antialias: !0,
			premultipliedAlpha: !0,
			preserveDrawingBuffer: !0,
			powerPreference: "low-power"
		}), this.failed = !1, !this.gl) {
			this.failed = !0;
			return;
		}
		this.canvas.addEventListener("webglcontextlost", (e) => {
			e.preventDefault(), this.failed = !0, window.dispatchEvent(new Event("lg-webgl-lost"));
		}), this.canvas.addEventListener("webglcontextrestored", () => {
			this.failed = !1, this.program = void 0, this.buffer = void 0, window.dispatchEvent(new Event("lg-webgl-restored"));
		});
	}
	shader(e, t) {
		let n = this.gl, r = n.createShader(e);
		if (r) {
			if (n.shaderSource(r, t), n.compileShader(r), !n.getShaderParameter(r, n.COMPILE_STATUS)) {
				console.warn("Liquid Glass shader compile failed:", n.getShaderInfoLog(r)), n.deleteShader(r);
				return;
			}
			return r;
		}
	}
	init() {
		if (this.failed || !this.gl) return !1;
		if (this.program && this.buffer) return !0;
		let e = this.gl, t = this.shader(e.VERTEX_SHADER, qt), n = this.shader(e.FRAGMENT_SHADER, Jt);
		if (!t || !n) return this.failed = !0, !1;
		let r = e.createProgram();
		if (!r) return this.failed = !0, !1;
		if (e.attachShader(r, t), e.attachShader(r, n), e.linkProgram(r), e.deleteShader(t), e.deleteShader(n), !e.getProgramParameter(r, e.LINK_STATUS)) return console.warn("Liquid Glass shader link failed:", e.getProgramInfoLog(r)), this.failed = !0, !1;
		let i = e.createBuffer();
		return i ? (e.bindBuffer(e.ARRAY_BUFFER, i), e.bufferData(e.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			3,
			-1,
			-1,
			3
		]), e.STATIC_DRAW), this.program = r, this.buffer = i, !0) : (this.failed = !0, !1);
	}
	render(e, t, n, r) {
		if (!this.init()) return !1;
		let i = this.gl, a = Math.min((window.devicePixelRatio || 1) * t.renderScale, t.pixelRatioLimit), o = Math.max(1, Math.round(n * a)), s = Math.max(1, Math.round(r * a));
		(this.canvas.width !== o || this.canvas.height !== s) && (this.canvas.width = o, this.canvas.height = s), e.width = o, e.height = s;
		let c = this.program;
		i.viewport(0, 0, o, s), i.useProgram(c), i.bindBuffer(i.ARRAY_BUFFER, this.buffer);
		let l = i.getAttribLocation(c, "a_position");
		i.enableVertexAttribArray(l), i.vertexAttribPointer(l, 2, i.FLOAT, !1, 0, 0);
		let u = (e, t) => i.uniform1f(i.getUniformLocation(c, e), t);
		i.uniform2f(i.getUniformLocation(c, "u_resolution"), o, s), u("u_shape", t.shape === "circle" ? 0 : t.shape === "pill" ? 1 : 2), u("u_radius", t.radius * a), u("u_edge", t.edge * a), u("u_refraction", t.refraction), u("u_chroma", t.chroma), u("u_blur", t.blurRadius * a), u("u_highQualityBlur", +!!t.highQualityBlur), u("u_highlight", t.highlight), u("u_lightAngle", t.lightAngle), u("u_saturation", t.saturation), u("u_tintAlpha", t.tintAlpha), u("u_surfaceAlpha", t.surfaceAlpha), i.uniform3fv(i.getUniformLocation(c, "u_tint"), Yt(t.tint));
		let d = [...t.palette];
		for (; d.length < 4;) d.push(d[d.length - 1] ?? "#b8b8c2");
		i.uniform3fv(i.getUniformLocation(c, "u_colors[0]"), new Float32Array(d.slice(0, 4).flatMap(Yt))), i.uniform4fv(i.getUniformLocation(c, "u_stops"), new Float32Array(t.stops)), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLES, 0, 3), i.flush();
		let f = e.getContext("2d");
		return f ? (f.clearRect(0, 0, o, s), f.drawImage(this.canvas, 0, 0, o, s), !0) : !1;
	}
}, Zt, L = class extends S {
	constructor(...e) {
		super(...e), this.shape = "roundrect", this.palette = [], this.stops = [
			0,
			.34,
			.68,
			1
		], this.radius = 28, this.edge = 14, this.refraction = 16, this.chroma = .35, this.blurRadius = 3, this.highQualityBlur = !1, this.renderScale = 1, this.pixelRatioLimit = 2, this.highlight = 1.25, this.lightAngle = 120, this.saturation = 1.35, this.tintAlpha = .22, this.surfaceAlpha = 1, this.tint = "#ffffff", this.draw = () => {
			let e = this.renderRoot.querySelector("canvas"), t = this.getBoundingClientRect();
			if (!(!(e instanceof HTMLCanvasElement) || t.width < 1 || t.height < 1)) {
				if (!this.palette.length) {
					this.palette = this.inferDark() ? [
						"#151619",
						"#222327",
						"#292a2f",
						"#17181b"
					] : [
						"#fafafa",
						"#f1f1f2",
						"#e8e9eb",
						"#f8f8f9"
					];
					return;
				}
				Zt ?? (Zt = new Xt()), this.toggleAttribute("shader-ready", Zt.render(e, this, t.width, t.height));
			}
		};
	}
	connectedCallback() {
		super.connectedCallback(), this.observer = new ResizeObserver(() => this.draw()), this.observer.observe(this), window.addEventListener("lg-webgl-restored", this.draw);
	}
	disconnectedCallback() {
		this.observer?.disconnect(), window.removeEventListener("lg-webgl-restored", this.draw), super.disconnectedCallback();
	}
	firstUpdated() {
		this.draw();
	}
	updated() {
		this.draw();
	}
	inferDark() {
		let e = this;
		for (; e;) {
			if (e instanceof HTMLElement && e.hasAttribute("dark")) return !0;
			let t = e.getRootNode();
			e = t instanceof ShadowRoot ? t.host : null;
		}
		return !1;
	}
	render() {
		return y`<canvas aria-hidden="true"></canvas>`;
	}
};
Kt = L, Kt.styles = o`
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.22);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.72);
    }
    :host([shader-ready]) {
      background: transparent;
      box-shadow: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `, I([C()], L.prototype, "shape", void 0), I([C({ attribute: !1 })], L.prototype, "palette", void 0), I([C({ attribute: !1 })], L.prototype, "stops", void 0), I([C({ type: Number })], L.prototype, "radius", void 0), I([C({ type: Number })], L.prototype, "edge", void 0), I([C({ type: Number })], L.prototype, "refraction", void 0), I([C({ type: Number })], L.prototype, "chroma", void 0), I([C({ type: Number })], L.prototype, "blurRadius", void 0), I([C({ type: Boolean })], L.prototype, "highQualityBlur", void 0), I([C({ type: Number })], L.prototype, "renderScale", void 0), I([C({ type: Number })], L.prototype, "pixelRatioLimit", void 0), I([C({ type: Number })], L.prototype, "highlight", void 0), I([C({ type: Number })], L.prototype, "lightAngle", void 0), I([C({ type: Number })], L.prototype, "saturation", void 0), I([C({ type: Number })], L.prototype, "tintAlpha", void 0), I([C({ type: Number })], L.prototype, "surfaceAlpha", void 0), I([C()], L.prototype, "tint", void 0), customElements.get("lg-glass-surface") || customElements.define("lg-glass-surface", L);
//#endregion
//#region src/components/lg-slider.ts
var Qt, R = class extends S {
	constructor(...e) {
		super(...e), this.value = 0, this.min = 0, this.max = 1, this.step = 0, this.variant = "bar", this.disabled = !1, this.refraction = !1, this.fillFrom = void 0, this.showFill = !0, this.hideFillWhenZero = !1, this.showThumb = !1, this.shaderPalette = [], this.dragging = !1, this.dragValue = 0, this.lastPointerX = 0, this.lastPointerTime = 0, this.wobble = 0, this.wobbleTarget = 0, this.onPointerDown = (e) => {
			this.disabled || e.button !== 0 || (e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId), this.dragging = !0, this.toggleAttribute("dragging", !0), this.dragValue = this.valueFromEvent(e), this.lastPointerX = e.clientX, this.lastPointerTime = e.timeStamp, this.dispatchEvent(new CustomEvent("lg-input", {
				detail: { value: this.dragValue },
				bubbles: !0,
				composed: !0
			})));
		}, this.onPointerMove = (e) => {
			if (!this.dragging) return;
			let t = Math.max(1, e.timeStamp - this.lastPointerTime), n = Math.abs(e.clientX - this.lastPointerX) / t;
			this.lastPointerX = e.clientX, this.lastPointerTime = e.timeStamp, this.setWobbleTarget(E(n / 1.4, 0, 1));
			let r = this.valueFromEvent(e);
			r !== this.dragValue && (this.dragValue = r, this.dispatchEvent(new CustomEvent("lg-input", {
				detail: { value: r },
				bubbles: !0,
				composed: !0
			})));
		}, this.onPointerUp = (e) => {
			if (!this.dragging) return;
			this.dragging = !1, this.toggleAttribute("dragging", !1);
			let t = this.valueFromEvent(e);
			this.value = t, this.setWobbleTarget(0), this.dispatchEvent(new CustomEvent("lg-change", {
				detail: { value: t },
				bubbles: !0,
				composed: !0
			}));
		}, this.onKeyDown = (e) => {
			if (this.disabled) return;
			let t = this.step > 0 ? this.step : (this.max - this.min) / 20, n = this.value;
			if (e.key === "ArrowRight" || e.key === "ArrowUp") n += t;
			else if (e.key === "ArrowLeft" || e.key === "ArrowDown") n -= t;
			else if (e.key === "Home") n = this.min;
			else if (e.key === "End") n = this.max;
			else return;
			e.preventDefault(), this.value = E(n, this.min, this.max), this.dispatchEvent(new CustomEvent("lg-change", {
				detail: { value: this.value },
				bubbles: !0,
				composed: !0
			}));
		};
	}
	get ratio() {
		let e = this.dragging ? this.dragValue : this.value, t = this.max - this.min || 1;
		return E((e - this.min) / t, 0, 1);
	}
	valueFromEvent(e) {
		let t = this.shadowRoot?.querySelector(".track");
		if (!t) return this.value;
		let n = t.getBoundingClientRect(), r = this.variant === "thumb" || this.variant === "bar" || this.showThumb ? n.height / 2 : 0, i = Math.max(1, n.width - r * 2), a = E((e.clientX - n.left - r) / i, 0, 1), o = this.min + a * (this.max - this.min);
		return this.step > 0 && (o = Math.round(o / this.step) * this.step), E(o, this.min, this.max);
	}
	setWobbleTarget(e) {
		if (this.wobbleTarget = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : e, this.wobbleFrame !== void 0) return;
		let t = () => {
			this.wobble += (this.wobbleTarget - this.wobble) * .24, this.wobbleTarget *= this.dragging ? .9 : .72, this.style.setProperty("--lg-wobble", this.wobble.toFixed(4)), Math.abs(this.wobbleTarget - this.wobble) > .004 || this.wobbleTarget > .004 ? this.wobbleFrame = requestAnimationFrame(t) : (this.wobble = 0, this.style.removeProperty("--lg-wobble"), this.wobbleFrame = void 0);
		};
		this.wobbleFrame = requestAnimationFrame(t);
	}
	disconnectedCallback() {
		this.wobbleFrame !== void 0 && cancelAnimationFrame(this.wobbleFrame), super.disconnectedCallback();
	}
	render() {
		let e = this.ratio, t = this.variant === "thumb", n = t || this.variant === "bar" || this.showThumb, r = this.showFill && !(this.hideFillWhenZero && e <= 0), i = "var(--lg-effective-slider-height)", a = `(100% - ${i})`, o = { width: `${e * 100}%` };
		if (t && this.fillFrom !== void 0) {
			let t = E(this.fillFrom, 0, 1), n = Math.min(t, e), r = Math.max(t, e);
			o = {
				left: `calc(${i} / 2 + ${a} * ${n})`,
				width: `calc(${a} * ${r - n})`
			};
		} else n && (o = { width: `calc(${i} / 2 + ${a} * ${e})` });
		return y`
      ${this.refraction ? Lt : x}
      <div
        class="track ${this.variant}"
        role="slider"
        tabindex=${this.disabled ? -1 : 0}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this.dragging ? this.dragValue : this.value}
        aria-disabled=${this.disabled}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @keydown=${this.onKeyDown}
      >
        ${r ? y`<div class="fill" style=${P(o)}></div>` : x}
        ${t && this.fillFrom !== void 0 ? y`<div class="center-mark" style=${P({ left: `calc(${i} / 2 + ${a} * ${E(this.fillFrom, 0, 1)})` })}></div>` : x}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${n ? y`<div class=${this.refraction ? "knob refraction" : "knob"} style=${P({ left: `calc(${a} * ${e})` })}>
              ${this.refraction ? x : y`<lg-glass-surface
                shape="circle"
                .palette=${this.shaderPalette}
                .stops=${[
			0,
			.44,
			.56,
			1
		]}
                .radius=${999}
                .edge=${20}
                .refraction=${0}
                .blurRadius=${12}
                .highQualityBlur=${!0}
                .renderScale=${1.5}
                .pixelRatioLimit=${3}
                .highlight=${1.25}
                .tintAlpha=${.18}
              ></lg-glass-surface>`}
            </div>` : x}
      </div>
    `;
	}
};
//#endregion
//#region src/base-card.ts
Qt = R, Qt.styles = o`
    :host {
      display: block;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
    }
    .track {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--lg-slider-track, var(--lg-track-bg));
      box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
      cursor: pointer;
    }
    .track.bar {
      --lg-effective-slider-height: var(--lg-slider-height, 64px);
      height: var(--lg-effective-slider-height);
      border-radius: var(--lg-slider-radius, 20px);
    }
    /* Thumb geometry is driven entirely by the track height. */
    .track.thumb {
      --lg-effective-slider-height: var(--lg-slider-height, 40px);
      height: var(--lg-effective-slider-height);
      border-radius: 999px;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.14),
        inset 0 0 0 1px var(--lg-glass-stroke);
    }
    .track.thin {
      --lg-effective-slider-height: var(--lg-slider-height, 7px);
      height: var(--lg-effective-slider-height);
      border-radius: 999px;
      box-shadow: none;
    }
    .fill {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background: var(--lg-slider-fill, linear-gradient(90deg, #fff8ea, #ffe2a6));
      box-shadow: -1px 0 2px rgba(255, 255, 255, 0.8);
      pointer-events: none;
    }
    .track.thin .fill {
      background: var(--lg-slider-fill, var(--lg-text-primary));
      opacity: var(--lg-slider-fill-opacity, 0.85);
      box-shadow: none;
      border-radius: 999px;
    }
    .track.thumb .fill {
      box-shadow: none;
    }
    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      pointer-events: none;
    }
    .center-mark {
      position: absolute;
      top: 12px;
      left: 50%;
      width: 2px;
      height: 16px;
      margin-left: -1px;
      border-radius: 1px;
      background: var(--lg-text-secondary);
      pointer-events: none;
    }
    .knob {
      position: absolute;
      top: 0;
      width: var(--lg-effective-slider-height);
      height: var(--lg-effective-slider-height);
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.56);
      -webkit-backdrop-filter: blur(12px) saturate(1.35);
      backdrop-filter: blur(12px) saturate(1.35);
      box-shadow:
        0 5px 14px rgba(0, 0, 0, 0.6),
        0 1px 3px rgba(255, 255, 255, 0.4),
        inset 0 0 0 1.5px #fff;
      pointer-events: none;
      transform: scaleX(calc(1 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1 + var(--lg-wobble, 0) * 0.2));
      transition: transform 0.08s ease;
    }
    .track.thin .knob {
      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.5),
        0 1px 2px rgba(255, 255, 255, 0.4),
        inset 0 0 0 1.5px #fff;
    }
    .knob.refraction {
      -webkit-backdrop-filter: url(#lg-slider-knob);
      backdrop-filter: url(#lg-slider-knob);
    }
    .knob:has(> lg-glass-surface) {
      background: transparent;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      box-shadow: 0 5px 14px rgba(0, 0, 0, 0.38);
    }
    :host([dragging]) .knob {
      transform: scaleX(calc(1.06 - var(--lg-wobble, 0) * 0.1)) scaleY(calc(1.06 + var(--lg-wobble, 0) * 0.2));
    }
  `, I([C({ type: Number })], R.prototype, "value", void 0), I([C({ type: Number })], R.prototype, "min", void 0), I([C({ type: Number })], R.prototype, "max", void 0), I([C({ type: Number })], R.prototype, "step", void 0), I([C()], R.prototype, "variant", void 0), I([C({
	type: Boolean,
	reflect: !0
})], R.prototype, "disabled", void 0), I([C({ type: Boolean })], R.prototype, "refraction", void 0), I([C({ type: Number })], R.prototype, "fillFrom", void 0), I([C({ type: Boolean })], R.prototype, "showFill", void 0), I([C({ type: Boolean })], R.prototype, "hideFillWhenZero", void 0), I([C({ type: Boolean })], R.prototype, "showThumb", void 0), I([C({ attribute: !1 })], R.prototype, "shaderPalette", void 0), I([w()], R.prototype, "dragging", void 0), I([w()], R.prototype, "dragValue", void 0), customElements.get("lg-slider") || customElements.define("lg-slider", R), Ut();
var z = class extends S {
	constructor(...e) {
		super(...e), this.t = Ze("en"), this.updateLight = (e) => {
			if (matchMedia("(prefers-reduced-motion: reduce)").matches || !this.glassSurface) return;
			let { clientX: t, clientY: n } = e;
			this.lightFrame !== void 0 && cancelAnimationFrame(this.lightFrame), this.lightFrame = requestAnimationFrame(() => {
				if (!this.glassSurface) return;
				let e = this.glassSurface.getBoundingClientRect();
				this.glassSurface.style.setProperty("--lg-light-x", `${(t - e.left) / e.width * 100}%`), this.glassSurface.style.setProperty("--lg-light-y", `${(n - e.top) / e.height * 100}%`), this.glassSurface.style.setProperty("--lg-sheen-active", "1");
			});
		}, this.resetLight = () => {
			this.glassSurface?.style.removeProperty("--lg-light-x"), this.glassSurface?.style.removeProperty("--lg-light-y"), this.glassSurface?.style.removeProperty("--lg-sheen-active");
		}, this.openMoreInfo = () => et(this, this.config?.entity);
	}
	static async getConfigElement() {
		return await Vt(), document.createElement("liquid-glass-card-editor");
	}
	static getStubConfig(e, t, n) {
		return {};
	}
	setConfig(e) {
		if (!e) throw Error("Invalid configuration");
		this.config = {
			refraction: "auto",
			theme: "auto",
			...e
		}, this.applyRefraction();
	}
	getCardSize() {
		return 3;
	}
	get entity() {
		return this.config?.entity ? this.hass?.states[this.config.entity] : void 0;
	}
	get entityName() {
		return this.config?.name ?? tt(this.entity, this.config?.entity ?? "");
	}
	get isDark() {
		return this.config?.theme === "dark" || this.config?.theme !== "light" && !!this.hass?.themes?.darkMode;
	}
	get refraction() {
		return this.hasAttribute("refraction");
	}
	applyRefraction() {
		let e = this.config?.refraction ?? "auto", t = e === !0 || e === "auto" && zt();
		this.toggleAttribute("refraction", t);
	}
	willUpdate() {
		let e = this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language;
		this.t = Ze(e), this.toggleAttribute("dark", this.isDark), this.setAttribute("glass-variant", this.config?.glass_variant ?? "regular");
	}
	firstUpdated() {
		let e = this.renderRoot.querySelector(".glass");
		if (!e || typeof ResizeObserver > "u") return;
		this.glassSurface = e, e.addEventListener("pointermove", this.updateLight, { passive: !0 }), e.addEventListener("pointerleave", this.resetLight, { passive: !0 });
		let t = () => {
			window.clearTimeout(this.glassResizeTimer), this.glassResizeTimer = window.setTimeout(() => {
				let t = e.getBoundingClientRect();
				if (t.width < 1 || t.height < 1) return;
				let n = getComputedStyle(e).borderTopLeftRadius, r = Number.parseFloat(n) || 0, i = n.trim().endsWith("%") ? r / 100 * Math.min(t.width, t.height) : r, a = {
					width: Math.round(t.width / 4) * 4,
					height: Math.round(t.height / 4) * 4,
					radius: Math.round(i / 2) * 2
				}, o = this.glassGeometry;
				(!o || o.width !== a.width || o.height !== a.height || o.radius !== a.radius) && (this.glassGeometry = a);
			}, 120);
		};
		this.glassResizeObserver = new ResizeObserver(t), this.glassResizeObserver.observe(e), t();
	}
	disconnectedCallback() {
		this.glassResizeObserver?.disconnect(), this.glassSurface?.removeEventListener("pointermove", this.updateLight), this.glassSurface?.removeEventListener("pointerleave", this.resetLight), window.clearTimeout(this.glassResizeTimer), this.lightFrame !== void 0 && cancelAnimationFrame(this.lightFrame), super.disconnectedCallback();
	}
	callService(e, t, n = {}) {
		this.hass && this.config?.entity && this.hass.callService(e, t, {
			entity_id: this.config.entity,
			...n
		});
	}
	renderDefs() {
		return this.refraction ? It(this.glassGeometry) : x;
	}
	renderControlSurface(e, t = "circle") {
		return this.refraction ? x : y`<lg-glass-surface
      class="lg-control-shader"
      .shape=${t}
      .palette=${e ?? (this.isDark ? ["#242529", "#45474d"] : ["#ffffff", "#d8d9dc"])}
      .radius=${t === "circle" ? 999 : 22}
      .edge=${14}
      .refraction=${0}
      .blurRadius=${3}
      .highlight=${1.25}
      .tintAlpha=${this.isDark ? .12 : .24}
    ></lg-glass-surface>`;
	}
	renderIconWell(e, t, n) {
		let r = !t, i = n === null ? void 0 : n ?? this.openMoreInfo;
		return y`<div
      class=${N({
			"icon-well": !0,
			idle: r
		})}
      style=${r ? x : P({
			"--well-from": t.from,
			"--well-to": t.to,
			"--well-glow": t.glow
		})}
      @click=${i}
      role=${i ? "button" : x}
    >
      <lg-icon .icon=${e}></lg-icon>
    </div>`;
	}
	renderTitle(e, t) {
		return y`<div class="title" @click=${this.openMoreInfo}>
      <div class="name">${e}</div>
      <div class="state">${t}</div>
    </div>`;
	}
	renderBadge(e, t) {
		return y`<div
      class="badge"
      style=${t ? P({
			"--badge-color": t.color,
			"--badge-bg": t.bg,
			"--badge-stroke": t.stroke,
			"--badge-glow": t.glow ?? t.color
		}) : x}
    >
      <span class="dot"></span><span>${e}</span>
    </div>`;
	}
	renderToggle(e, t, n) {
		return y`<div
      class=${N({
			toggle: !0,
			on: e
		})}
      style=${P({ "--toggle-color": t })}
      role="switch"
      aria-checked=${e}
      tabindex="0"
      @click=${n}
      @keydown=${(e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), n());
		}}
    >
      <div class="knob-dot">${this.renderControlSurface()}</div>
    </div>`;
	}
	renderUnavailable() {
		return y`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config?.icon ?? "mdi:help-circle-outline", void 0)}
          ${this.renderTitle(this.entityName, this.t("unavailable"))}
        </div>
      </div>`;
	}
};
I([C({ attribute: !1 })], z.prototype, "hass", void 0), I([w()], z.prototype, "config", void 0), I([w()], z.prototype, "glassGeometry", void 0);
//#endregion
//#region src/styles/tokens.ts
var B = o`
  :host {
    --lg-text-primary: #1c1c1e;
    --lg-text-secondary: rgba(60, 60, 67, 0.65);
    --lg-glass-tint: 255, 255, 255;
    --lg-glass-tint-alpha: 0.2;
    --lg-glass-stroke: rgba(255, 255, 255, 0.7);
    --lg-glass-inner: rgba(255, 255, 255, 0.5);
    --lg-track-bg: rgba(255, 255, 255, 0.4);
    --lg-shadow-glass: rgba(28, 28, 30, 0.18);
    --lg-segment-selected: rgba(255, 255, 255, 0.85);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.34;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.82);
    --lg-trend-up: #1e9e4a;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.18);
    --lg-trend-down: #0a7ea4;
    --lg-trend-down-bg: rgba(43, 179, 208, 0.18);
    --lg-cover-badge: #0a7ea4;
    /* Scales the whole shader-derived rim; see styles/rim.ts. */
    --lg-rim-gain: 1;
    /* A tile or chip held down. */
    --lg-press-fill: rgba(255, 255, 255, 0.9);
    --lg-press-stroke: rgba(94, 92, 230, 0.65);
    --lg-press-label: #3f3dbf;
    --lg-press-glow: rgba(94, 92, 230, 0.3);
    --lg-motion-label: #b36a00;
    /* Group panel: a container that holds glass cards, so it must not be glass itself. */
    --lg-group-panel: rgba(255, 255, 255, 0.32);
    --lg-group-panel-stroke: rgba(255, 255, 255, 0.54);
    --lg-separator-line: rgba(28, 28, 30, 0.12);

    --lg-accent: #ffb340;
    --lg-accent-deep: #ff8a1f;
    --lg-heat: #ff6a3d;
    --lg-heat-deep: #ff2d55;
    --lg-cool: #5ac8fa;
    --lg-cool-deep: #0a84ff;
    --lg-switch-accent: #0a84ff;
    --lg-switch-accent-light: #6fc3ff;
    --lg-sensor-accent: #ff9f0a;
    --lg-alert: #ff9f0a;
    --lg-lock-locked: #30d158;
    --lg-lock-locked-deep: #1e9e4a;
    --lg-lock-unlocked: #ff6b5c;
    --lg-lock-unlocked-deep: #ff3b30;
    --lg-warn: #ffd60a;
    --lg-warn-deep: #e6a800;
    --lg-warn-text: #b8860b;
    --lg-cover-accent: #2bb3d0;
    --lg-cover-accent-deep: #0a7ea4;
    --lg-slider-accent: #5e5ce6;
    --lg-slider-accent-deep: #3f3dbf;
    --lg-slider-accent-light: #9e9cff;
    --lg-slider-fill-light: #b0afff;
    --lg-motion: #7c3aed;
    --lg-motion-light: #a66bff;
    --lg-rgb-accent: #b15cff;

    --lg-font-ui: "Inter", "SF Pro Text", Roboto, system-ui, -apple-system, sans-serif;
    --lg-font-jp: "Inter", "Noto Sans JP", "Hiragino Sans", "SF Pro Text", Roboto, system-ui, sans-serif;

    --lg-radius: 40px;
    --lg-blur: 7px;
    --lg-saturation: 1.35;
  }

  :host([dark]) {
    --lg-text-primary: #ffffff;
    --lg-text-secondary: rgba(235, 235, 245, 0.65);
    --lg-glass-tint: 28, 28, 30;
    --lg-glass-tint-alpha: 0.24;
    --lg-glass-stroke: rgba(255, 255, 255, 0.25);
    --lg-glass-inner: rgba(255, 255, 255, 0.12);
    --lg-track-bg: rgba(255, 255, 255, 0.14);
    --lg-shadow-glass: rgba(0, 0, 0, 0.45);
    --lg-segment-selected: rgba(255, 255, 255, 0.2);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.22;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.36);
    --lg-trend-up: #4cde73;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.2);
    --lg-trend-down: #5dd6ee;
    --lg-trend-down-bg: rgba(93, 214, 238, 0.2);
    --lg-cover-badge: #5dd6ee;
    /* The rim reads brighter against a dark backdrop, so it sits back a little. */
    --lg-rim-gain: 0.8;
    --lg-press-fill: rgba(94, 92, 230, 0.35);
    --lg-press-stroke: rgba(176, 175, 255, 0.8);
    --lg-press-label: #ffffff;
    --lg-press-glow: rgba(94, 92, 230, 0.4);
    --lg-motion-label: #ffc46b;
    --lg-group-panel: rgba(255, 255, 255, 0.08);
    --lg-group-panel-stroke: rgba(255, 255, 255, 0.12);
    --lg-separator-line: rgba(255, 255, 255, 0.14);
  }

  /* Clear glass is reserved for surfaces over photos/video or user-selected showcase UI. */
  :host([glass-variant="clear"]) {
    --lg-glass-tint-alpha: 0.07;
    --lg-blur: 3px;
    --lg-saturation: 1.45;
    --lg-rim-gain: 1.12;
  }

  :host([dark][glass-variant="clear"]) {
    --lg-glass-tint-alpha: 0.1;
    --lg-rim-gain: 0.94;
  }
`, $t = [
	0,
	.5,
	1,
	1.5,
	2,
	2.5,
	3,
	4,
	5,
	7,
	9,
	12,
	16,
	22,
	28
], en = {
	top: "to bottom",
	bottom: "to top",
	left: "to right",
	right: "to left"
};
function tn(e, t) {
	let n = $t.map((n) => {
		let r = yt(n / F.edge, n, bt[e], F.lightAngle, F.highlight);
		return `rgb(${r >= 0 ? "255 255 255" : "0 0 0"} / calc(${t} * ${Math.min(Math.abs(r), 1).toFixed(4)})) ${n}px`;
	});
	return `linear-gradient(${en[e]}, ${n.join(", ")})`;
}
function nn(e = "var(--lg-rim-gain, 1)") {
	return Object.keys(bt).map((t) => tn(t, e)).join(", ");
}
//#endregion
//#region src/styles/glass.ts
var V = o`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    /* Cards live in dashboard columns of wildly different widths, so every size below is
       measured against the card's own width rather than the viewport. */
    container-type: inline-size;
    font-family: var(--lg-font-jp);
    color: var(--lg-text-primary);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  .lg-defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .glass {
    position: relative;
    isolation: isolate;
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
    -webkit-backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
    backdrop-filter: blur(var(--lg-blur)) saturate(var(--lg-saturation));
    box-shadow:
      0 14px 36px -4px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  :host([refraction]) .glass {
    -webkit-backdrop-filter: url(#lg-card);
    backdrop-filter: url(#lg-card);
  }
  .glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 2;
  }
  /*
   * Specular, fresnel and hairline, evaluated from liquid-glass.glsl and painted in pixel
   * stops so the rim keeps its real width on a card of any size. The shader concentrates
   * almost all of it within three pixels of the edge, which is what reads as a glass slab
   * rather than a tinted panel.
   */
  .glass::before {
    background: ${a(nn())};
  }
  /* Pointer-following caustic: a masked one-pixel rim, never a veil over the content. */
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    padding: 1.25px;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(
      circle at var(--lg-light-x, 18%) var(--lg-light-y, 8%),
      rgb(255 255 255 / calc(0.16 + var(--lg-sheen-active, 0) * 0.5)) 0,
      rgb(255 255 255 / 0.08) 24%,
      transparent 54%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    transition: opacity 180ms ease;
  }
  .card {
    --lg-pad: 20px;
    --lg-pad-row: 16px;
    --lg-gap: 18px;
    --lg-gap-row: 14px;
    --lg-well: 48px;
    --lg-well-icon: 24px;
    --lg-name: 17px;
    --lg-state: 13px;
    --lg-label: 13px;
    --lg-tick: 11px;
    --lg-corner: var(--lg-radius);

    border-radius: var(--lg-corner);
    padding: var(--lg-pad);
    display: flex;
    flex-direction: column;
    gap: var(--lg-gap);
    overflow: hidden;
    color: var(--lg-text-primary);
  }

  /* Single row cards: icon, title, optional trailing element. */
  .card.row {
    flex-direction: row;
    align-items: center;
    gap: var(--lg-gap-row);
    padding: var(--lg-pad-row) var(--lg-pad);
  }

  @supports (container-type: inline-size) {
    .card {
      --lg-pad: clamp(12px, 5.3cqi, 20px);
      --lg-pad-row: clamp(10px, 4.2cqi, 16px);
      --lg-gap: clamp(10px, 4.7cqi, 18px);
      --lg-gap-row: clamp(9px, 3.7cqi, 14px);
      --lg-well: clamp(34px, 12.6cqi, 48px);
      --lg-well-icon: clamp(17px, 6.3cqi, 24px);
      --lg-name: clamp(13.5px, 4.5cqi, 17px);
      --lg-state: clamp(11px, 3.4cqi, 13px);
      --lg-label: clamp(11px, 3.4cqi, 13px);
      --lg-tick: clamp(9.5px, 2.9cqi, 11px);
      --lg-corner: min(var(--lg-radius), 11cqi);
    }
  }
  .card.active {
    background: rgba(var(--lg-glass-tint-active), var(--lg-glass-tint-active-alpha));
    box-shadow:
      0 14px 36px -4px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke-active);
  }
  .card > * {
    position: relative;
    z-index: 1;
  }
  .lg-control-shader {
    position: absolute;
    z-index: 0;
  }

  /* Small glass surface used for knobs / play button / slide thumb */
  .knob {
    position: relative;
    isolation: isolate;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.22);
    -webkit-backdrop-filter: blur(3px) saturate(1.35);
    backdrop-filter: blur(3px) saturate(1.35);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.3),
      inset 0 0 0 2px rgba(255, 255, 255, 0.9),
      inset 0 6px 10px -4px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px -4px rgba(0, 0, 0, 0.12);
  }
  :host([refraction]) .knob {
    -webkit-backdrop-filter: url(#lg-knob);
    backdrop-filter: url(#lg-knob);
  }
  .knob:has(> .lg-control-shader) {
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  }
  :host([refraction]) .knob:has(> .lg-control-shader) {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  /* Header block: icon well + title + trailing slot */
  .header {
    display: flex;
    align-items: center;
    gap: var(--lg-gap-row);
    min-height: var(--lg-well);
  }
  .title {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
  }
  .name {
    font-size: var(--lg-name);
    font-weight: 600;
    line-height: 1.3;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .state {
    font-size: var(--lg-state);
    line-height: 1.35;
    color: var(--lg-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon-well {
    flex: none;
    width: var(--lg-well);
    height: var(--lg-well);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(180deg, var(--well-from, #ffd36b), var(--well-to, var(--lg-accent-deep)));
    box-shadow:
      0 4px 12px var(--well-glow, rgba(255, 165, 48, 0.24)),
      0 1px 1px rgba(255, 255, 255, 0.7),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    /* The gradient itself cannot interpolate, so the colours it is built from do. */
    transition:
      --well-from 0.42s ease,
      --well-to 0.42s ease,
      --well-glow 0.42s ease,
      background 0.25s ease,
      box-shadow 0.25s ease;
  }
  .icon-well.idle {
    background: var(--lg-track-bg);
    color: var(--lg-text-secondary);
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .icon-well ha-icon,
  .icon-well lg-icon {
    --mdc-icon-size: var(--lg-well-icon);
    width: var(--lg-well-icon);
    height: var(--lg-well-icon);
  }

  /* Status badge: dot + label */
  .badge {
    flex: 0 1 auto;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--badge-color, var(--lg-text-secondary));
    background: var(--badge-bg, var(--lg-track-bg));
    box-shadow: inset 0 0 0 1px var(--badge-stroke, var(--lg-glass-stroke));
    white-space: nowrap;
    transition: background-color 0.42s ease, color 0.42s ease, box-shadow 0.42s ease;
  }
  .badge > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .badge .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--badge-color, var(--lg-text-secondary));
    box-shadow: 0 0 6px var(--badge-glow, transparent);
    transition: background-color 0.42s ease, box-shadow 0.42s ease;
  }
  /*
   * Below this width the badge would eat the room the name needs, and the state line
   * already spells the same status out in words.
   */
  @container (max-width: 250px) {
    .badge {
      display: none;
    }
  }

  /* iOS style toggle */
  .toggle {
    flex: none;
    width: 51px;
    height: 31px;
    border-radius: 16px;
    padding: 2px;
    display: flex;
    align-items: center;
    background: rgba(120, 120, 128, 0.36);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    transition: background 0.25s ease;
  }
  .toggle.on {
    background: var(--toggle-color, var(--lg-accent));
  }
  .toggle .knob-dot {
    position: relative;
    overflow: hidden;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transform: translateX(0);
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .toggle .knob-dot:has(> .lg-control-shader) {
    background: transparent;
  }
  .toggle.on .knob-dot {
    transform: translateX(20px);
  }

  /* Label rows above sliders */
  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: var(--lg-label);
  }
  .label-row .label {
    color: var(--lg-text-secondary);
    font-weight: 500;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .label-row .value {
    flex: none;
    color: var(--lg-text-primary);
    font-weight: 600;
    font-family: var(--lg-font-ui);
    letter-spacing: -0.2px;
    font-variant-numeric: tabular-nums;
  }
  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ticks {
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tick);
    font-weight: 500;
    letter-spacing: -0.2px;
    color: var(--lg-text-secondary);
  }

  /* Segmented control */
  .segment {
    display: flex;
    gap: 2px;
    padding: 3px;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .segment > button {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    flex: 1;
    min-width: 0;
    height: 30px;
    border: 0;
    border-radius: 15px;
    background: transparent;
    color: var(--lg-text-secondary);
    font: inherit;
    font-size: var(--lg-label);
    font-weight: 500;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }
  .segment > button:has(> .lg-control-shader) {
    background: transparent;
  }
  .segment > button.selected {
    background: var(--lg-segment-selected);
    color: var(--lg-text-primary);
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
  }

  /* Chips */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .chip {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border: 0;
    border-radius: 18px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    font: inherit;
    font-size: var(--lg-tick);
    font-weight: 500;
    cursor: pointer;
    min-width: 0;
    max-width: 100%;
  }
  .chip > :not(.lg-control-shader),
  .segment > button > :not(.lg-control-shader) {
    position: relative;
    z-index: 1;
  }
  .chip > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .chip ha-icon,
  .chip lg-icon {
    flex: none;
    --mdc-icon-size: 14px;
    width: 14px;
    height: 14px;
  }
  @container (max-width: 280px) {
    .chip {
      padding: 8px 11px;
    }
  }

  /* Round icon button */
  .round-btn {
    --btn: 56px;
    flex: none;
    width: var(--btn);
    height: var(--btn);
    border: 0;
    border-radius: 50%;
    background: var(--lg-track-bg);
    box-shadow:
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    display: grid;
    place-items: center;
    cursor: pointer;
    padding: 0;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .round-btn:active {
    background: var(--lg-segment-selected);
  }
  .round-btn ha-icon,
  .round-btn lg-icon {
    --mdc-icon-size: calc(var(--btn) * 0.43);
    width: calc(var(--btn) * 0.43);
    height: calc(var(--btn) * 0.43);
  }
  @supports (container-type: inline-size) {
    .round-btn {
      --btn: clamp(38px, 14.7cqi, 56px);
    }
  }

  .dim {
    opacity: 0.45;
  }
  .muted {
    opacity: 0.6;
  }
  button {
    font-family: inherit;
  }
  button:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: 2px;
  }

  /* Someone who has asked for less motion gets the end state, immediately. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`, rn, an = [
	"#FF453A",
	"#FF9F0A",
	"#FFD60A",
	"#30D158",
	"#0A84FF",
	"#B15CFF",
	"#FF375F"
], on = class extends z {
	constructor(...e) {
		super(...e), this.preview = {}, this.toggle = () => this.callService("light", "toggle");
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["light"], e, t, n, (e) => (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff")) };
	}
	getCardSize() {
		return 5;
	}
	get isOn() {
		return this.entity?.state === "on";
	}
	get supportedModes() {
		return this.entity?.attributes.supported_color_modes ?? [];
	}
	get supportsBrightness() {
		return this.config.show_brightness !== !1 && this.supportedModes.some((e) => e !== "onoff");
	}
	get supportsColorTemp() {
		return this.config.show_color_temp !== !1 && this.supportedModes.includes("color_temp");
	}
	get supportsColor() {
		return this.config.show_color !== !1 && this.supportedModes.some((e) => [
			"hs",
			"rgb",
			"rgbw",
			"rgbww",
			"xy"
		].includes(e));
	}
	get activeUiMode() {
		return this.uiMode ? this.uiMode : this.supportsColor ? this.supportsColorTemp && this.entity?.attributes.color_mode === "color_temp" ? "color_temp" : "color" : "color_temp";
	}
	get brightnessPct() {
		if (this.preview.brightness !== void 0) return this.preview.brightness;
		let e = this.entity?.attributes.brightness;
		return this.isOn && e !== void 0 ? Math.round(e / 255 * 100) : 0;
	}
	get kelvin() {
		return this.preview.kelvin === void 0 ? this.entity?.attributes.color_temp_kelvin ?? this.kelvinRange[0] : this.preview.kelvin;
	}
	get kelvinRange() {
		let e = this.entity?.attributes;
		return [e?.min_color_temp_kelvin ?? 2e3, e?.max_color_temp_kelvin ?? 6500];
	}
	get hs() {
		let e = this.entity?.attributes.hs_color ?? [280, 85];
		return [this.preview.hue ?? e[0], this.preview.sat ?? e[1]];
	}
	get colorHex() {
		let e = this.entity?.attributes.rgb_color;
		return this.preview.hue === void 0 && this.preview.sat === void 0 && e ? j(e) : j(nt(this.hs[0], this.hs[1]));
	}
	get colorLike() {
		return this.supportsColor && this.activeUiMode === "color";
	}
	get accent() {
		return this.colorLike ? this.colorHex : "var(--lg-accent)";
	}
	get wellStyle() {
		if (this.isOn) return this.colorLike ? {
			from: j(nt(this.hs[0], Math.min(this.hs[1], 60))),
			to: this.colorHex,
			glow: M(this.colorHex, .24)
		} : {
			from: "#FFD36B",
			to: "var(--lg-accent-deep)",
			glow: "rgba(255, 165, 48, 0.24)"
		};
	}
	stateText() {
		let e = this.t;
		if (!this.isOn) {
			let t = this.lastBrightness;
			return t ? `${e("unlit")} · ${e("last")} ${t}%` : e("unlit");
		}
		let t = [e("lit")];
		return this.supportsBrightness && t.push(`${this.brightnessPct}%`), this.colorLike ? t.push(e("color")) : this.supportsColorTemp && this.entity?.attributes.color_temp_kelvin && t.push(`${this.kelvin}K`), t.join(" · ");
	}
	willUpdate() {
		super.willUpdate(), this.isOn && this.entity?.attributes.brightness !== void 0 && (this.lastBrightness = Math.round(this.entity.attributes.brightness / 255 * 100));
	}
	setBrightness(e) {
		this.preview = {}, this.callService("light", "turn_on", { brightness_pct: Math.round(e) });
	}
	setKelvin(e) {
		this.preview = {}, this.callService("light", "turn_on", { color_temp_kelvin: Math.round(e) });
	}
	setHs(e, t) {
		this.preview = {}, this.callService("light", "turn_on", { hs_color: [Math.round(e), Math.round(t)] });
	}
	applyPreset(e) {
		if (e.scene) {
			this.hass?.callService("scene", "turn_on", { entity_id: e.scene });
			return;
		}
		if (e.service) {
			let [t, n] = e.service.split(".");
			this.hass?.callService(t, n, {
				entity_id: this.config.entity,
				...e.data ?? {}
			});
			return;
		}
		let t = { ...e.data ?? {} };
		e.brightness !== void 0 && (t.brightness_pct = e.brightness), e.color_temp_kelvin !== void 0 && (t.color_temp_kelvin = e.color_temp_kelvin), e.rgb_color && (t.rgb_color = e.rgb_color), e.hs_color && (t.hs_color = e.hs_color), this.callService("light", "turn_on", t);
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.isOn, n = this.t, r = this.supportsColor && this.supportsColorTemp, i = this.activeUiMode, a = this.config.presets ?? [], o = this.config.favorites === !1 ? [] : this.config.favorites ?? an, s = this.colorHex, [c, l] = this.kelvinRange, [u, d] = this.hs, f = this.colorLike ? j(nt(u, Math.min(d, 10))) : "#FFF8EA", p = this.colorLike ? j(nt(u, Math.min(d, 30))) : "#FFE2A6", m = this.colorLike ? j(nt(u, 60).map((e) => e * .5)) : "#6B5323";
		return y`${this.renderDefs()}
      <div class=${N({
			glass: !0,
			card: !0
		})}>
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? e.attributes.icon ?? "mdi:lightbulb", this.wellStyle, this.toggle)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderToggle(t, this.accent, this.toggle)}
        </div>

        ${r ? y`<div class="segment">
              ${["color", "color_temp"].map((e) => y`<button class=${N({ selected: i === e })} @click=${() => this.uiMode = e}>
                  ${i === e ? this.renderControlSurface(void 0, "pill") : x}
                  <span>${n(e === "color" ? "color" : "color_temp")}</span>
                </button>`)}
            </div>` : x}

        ${this.supportsBrightness ? y`<div class="section brightness" style=${P({
			"--fill-from": f,
			"--fill-to": p,
			"--sun-color": t ? m : "var(--lg-text-secondary)"
		})}>
              <div class="label-row"><span class="label">${n("brightness")}</span><span class="value">${this.brightnessPct}%</span></div>
              <lg-slider
                variant="bar"
                .refraction=${this.refraction}
                .shaderPalette=${[
			f,
			p,
			"#8e8994",
			"#d8d4dc"
		]}
                .value=${this.brightnessPct}
                min="0"
                max="100"
                step="1"
                .showFill=${t}
                @lg-input=${(e) => this.preview = {
			...this.preview,
			brightness: e.detail.value
		}}
                @lg-change=${(e) => this.setBrightness(e.detail.value)}
              >
                <lg-icon slot="start" class="sun" icon="mdi:white-balance-sunny"></lg-icon>
                <lg-icon slot="end" class="sun-dim" icon="mdi:brightness-5"></lg-icon>
              </lg-slider>
            </div>` : x}

        ${this.supportsColorTemp && i === "color_temp" ? y`<div class="section temp">
              <div class="label-row"><span class="label">${n("color_temp")}</span><span class="value">${Math.round(this.kelvin)}K</span></div>
              <lg-slider
                class=${N({ dim: !t })}
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${[
			"#ffb340",
			"#fff0d8",
			"#ffffff",
			"#b9dcff"
		]}
                .value=${this.kelvin}
                .min=${c}
                .max=${l}
                step="50"
                .showFill=${!1}
                @lg-input=${(e) => this.preview = {
			...this.preview,
			kelvin: e.detail.value
		}}
                @lg-change=${(e) => this.setKelvin(e.detail.value)}
              ></lg-slider>
              <div class="ticks"><span>${c}K</span><span>${l}K</span></div>
            </div>` : x}

        ${this.supportsColor && i === "color" ? y`<div class="section hue">
                <div class="label-row"><span class="label">${n("hue")}</span><span class="value">${Math.round(u)}°</span></div>
                <lg-slider
                  class=${N({ dim: !t })}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${[
			"#ff3b30",
			"#ffcc00",
			"#30d158",
			"#af52de"
		]}
                  .value=${u}
                  min="0"
                  max="360"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${(e) => this.preview = {
			...this.preview,
			hue: e.detail.value
		}}
                  @lg-change=${(e) => this.setHs(e.detail.value, d)}
                ></lg-slider>
              </div>
              <div class="section sat" style=${P({ "--sat-color": j(nt(u, 100)) })}>
                <div class="label-row"><span class="label">${n("saturation")}</span><span class="value">${Math.round(d)}%</span></div>
                <lg-slider
                  class=${N({ dim: !t })}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${[
			"#ffffff",
			"#ffffff",
			j(nt(u, 100)),
			j(nt(u, 100))
		]}
                  .value=${d}
                  min="0"
                  max="100"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${(e) => this.preview = {
			...this.preview,
			sat: e.detail.value
		}}
                  @lg-change=${(e) => this.setHs(u, e.detail.value)}
                ></lg-slider>
              </div>
              ${o.length ? y`<div class=${N({
			favorites: !0,
			muted: !t
		})}>
                    <div class="label">${n("favorites")}</div>
                    <div class="swatches">
                      ${o.map((e) => y`<button
                          class=${N({
			swatch: !0,
			selected: t && e.toLowerCase() === s.toLowerCase()
		})}
                          style=${P({
			"--swatch": e,
			"--swatch-glow": M(e, .5)
		})}
                          title=${e}
                          @click=${() => this.applyPreset({
			name: e,
			rgb_color: sn(e)
		})}
                        ></button>`)}
                      <button class="swatch add" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:plus"></lg-icon></button>
                    </div>
                  </div>` : x}` : x}

        ${a.length ? y`<div class=${N({
			chips: !0,
			muted: !t
		})}>
              ${a.map((e) => y`<button class="chip" @click=${() => this.applyPreset(e)}>
                  ${this.renderControlSurface(void 0, "pill")}
                  ${e.icon ? y`<lg-icon .icon=${e.icon}></lg-icon>` : x}<span>${e.name}</span>
                </button>`)}
            </div>` : x}
      </div>`;
	}
};
rn = on, rn.styles = [
	B,
	V,
	o`
      .brightness lg-slider {
        --lg-slider-fill: linear-gradient(90deg, var(--fill-from, #fff8ea), var(--fill-to, #ffe2a6));
      }
      .brightness .sun {
        color: var(--sun-color, #6b5323);
        --mdc-icon-size: 24px;
      }
      .brightness .sun-dim {
        color: var(--lg-text-secondary);
        --mdc-icon-size: 22px;
      }
      .temp lg-slider {
        --lg-slider-track: linear-gradient(90deg, #ffa63d 0%, #ffd9a0 40%, #fff7ec 65%, #bfdbff 100%);
      }
      .hue lg-slider {
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
      .sat lg-slider {
        --lg-slider-track: linear-gradient(90deg, #ffffff, var(--sat-color, #b15cff));
      }
      .favorites {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .favorites .label {
        font-size: 13px;
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
      .favorites .label {
        font-size: var(--lg-label);
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-swatch: clamp(24px, 8.4cqi, 32px);
        }
      }
    `
], I([w()], on.prototype, "uiMode", void 0), I([w()], on.prototype, "preview", void 0);
function sn(e) {
	let t = parseInt(e.replace("#", ""), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	].map((e) => E(e, 0, 255));
}
customElements.get("liquid-glass-light-card") || customElements.define("liquid-glass-light-card", on);
//#endregion
//#region src/cards/slider-card.ts
var cn, ln = [
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
], H = (e) => e !== null && e !== "" && Number.isFinite(Number(e)) ? Number(e) : void 0, un = class extends z {
	static getStubConfig(e, t, n) {
		return { entity: A(ln, e, t, n) };
	}
	getCardSize() {
		return 2;
	}
	spec() {
		let e = this.entity, t = e.attributes, n = this.config, r = e.entity_id.split(".")[0], i;
		switch (r) {
			case "input_number":
			case "number":
				i = {
					min: H(t.min) ?? 0,
					max: H(t.max) ?? 100,
					step: H(t.step) ?? 1,
					unit: t.unit_of_measurement ?? "",
					icon: "mdi:tune-variant",
					value: H(e.state),
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
					step: H(t.percentage_step) ?? 1,
					unit: "%",
					icon: "mdi:fan",
					value: e.state === "on" ? H(t.percentage) ?? 0 : 0,
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
					value: e.state === "on" ? Math.round((H(t.brightness) ?? 0) / 255 * 100) : 0,
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
					value: Math.round((H(t.volume_level) ?? 0) * 100),
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
					value: H(t.current_position) ?? (e.state === "closed" ? 0 : 100),
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
					value: H(t.current_position) ?? (e.state === "closed" ? 0 : 100),
					call: (e) => [
						"valve",
						"set_valve_position",
						{ position: Math.round(e) }
					]
				};
				break;
			case "humidifier":
				i = {
					min: H(t.min_humidity) ?? 0,
					max: H(t.max_humidity) ?? 100,
					step: 1,
					unit: "%",
					icon: "mdi:air-humidifier",
					value: H(t.humidity),
					call: (e) => [
						"humidifier",
						"set_humidity",
						{ humidity: Math.round(e) }
					]
				};
				break;
			case "water_heater":
				i = {
					min: H(t.min_temp) ?? 30,
					max: H(t.max_temp) ?? 60,
					step: H(t.target_temp_step) ?? 1,
					unit: "°",
					icon: "mdi:water-boiler",
					value: H(t.temperature),
					call: (e) => [
						"water_heater",
						"set_temperature",
						{ temperature: e }
					]
				};
				break;
			case "climate":
				i = {
					min: H(t.min_temp) ?? 7,
					max: H(t.max_temp) ?? 35,
					step: H(t.target_temp_step) ?? .5,
					unit: "°",
					icon: "mdi:thermostat",
					value: H(t.temperature),
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
				unit: t.unit_of_measurement ?? "",
				icon: "mdi:tune-variant",
				value: H(e.state)
			};
		}
		let a = n.service ? (e) => {
			let [t, r] = n.service.split(".");
			return [
				t,
				r,
				{ [n.service_key ?? "value"]: e }
			];
		} : i.call;
		return {
			min: n.min ?? i.min,
			max: n.max ?? i.max,
			step: n.step ?? i.step,
			unit: n.unit ?? i.unit,
			icon: n.icon ?? e.attributes.icon ?? i.icon,
			value: n.attribute ? H(t[n.attribute]) : i.value,
			call: a
		};
	}
	subtitleFor(e, t) {
		if (this.config.subtitle !== void 0) return this.config.subtitle;
		let n = this.t;
		if (e.min === 0 && t <= 0) return n("slider_off");
		let r = e.step > 0 ? Math.round((e.max - e.min) / e.step) : 0;
		return r >= 2 && r <= 12 ? n("slider_levels", {
			n: r,
			i: Math.round((t - e.min) / e.step)
		}) : n("slider_step", { s: `${D(this.hass, e.step)}${e.unit}` });
	}
	tickCount(e) {
		let t = this.config.ticks;
		if (typeof t == "number") return E(Math.round(t), 0, 20);
		if (t !== !0) return 0;
		let n = e.step > 0 ? Math.round((e.max - e.min) / e.step) : 0;
		return n >= 2 && n <= 12 ? n : 0;
	}
	settled(e) {
		return this.pending === void 0 || e.value !== void 0 && Math.abs(e.value - this.pending) <= Math.max(e.step / 2, 1);
	}
	commit(e, t) {
		if (this.preview = void 0, !e.call) return;
		this.pending = t, window.clearTimeout(this.pendingTimer), this.pendingTimer = window.setTimeout(() => this.pending = void 0, 4e3);
		let [n, r, i] = e.call(t);
		this.hass?.callService(n, r, {
			entity_id: this.config.entity,
			...i
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.pendingTimer);
	}
	updated() {
		this.pending !== void 0 && this.settled(this.spec()) && (window.clearTimeout(this.pendingTimer), this.pending = void 0);
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.spec(), n = E(this.preview ?? (this.settled(t) ? t.value : this.pending) ?? t.min, t.min, t.max), r = t.min === 0 && n <= 0, i = this.config.decimals ?? +!Number.isInteger(t.step), a = this.config.accent, o = a ? it(a, .4) : "var(--lg-slider-accent-light)", s = a ? at(a, .3) : "var(--lg-slider-accent-deep)", c = a ? M(a, .3) : "rgba(94, 92, 230, 0.3)", l = a ? it(a, .55) : "var(--lg-slider-fill-light)", u = a ?? "var(--lg-slider-accent)", d = r ? void 0 : {
			from: o,
			to: s,
			glow: c
		}, f = this.tickCount(t), p = !t.call, m = (e) => D(this.hass, e, i);
		return y`${this.renderDefs()}
      <div class="glass card" style=${P({
			"--fill-from": l,
			"--fill-to": u
		})}>
        <div class="header">
          ${this.renderIconWell(t.icon, d)}
          ${this.renderTitle(this.entityName, this.subtitleFor(t, n))}
          <div class=${N({
			value: !0,
			zero: r
		})}>
            <span class="num">${m(n)}</span>
            ${t.unit ? y`<span class="unit">${t.unit}</span>` : x}
          </div>
        </div>

        <div class="track-wrap">
          <lg-slider
            variant="thumb"
            .refraction=${this.refraction}
            .shaderPalette=${[
			l,
			u,
			this.isDark ? "#34343e" : "#dedde2",
			this.isDark ? "#34343e" : "#dedde2"
		]}
            .value=${n}
            .min=${t.min}
            .max=${t.max}
            .step=${t.step}
            .disabled=${p}
            .showFill=${!r}
            @lg-input=${(e) => this.preview = e.detail.value}
            @lg-change=${(e) => this.commit(t, e.detail.value)}
          ></lg-slider>
          ${f ? y`<div class="marks">${Array.from({ length: f }, () => y`<span></span>`)}</div>` : x}
        </div>

        ${this.config.show_range === !1 ? x : y`<div class="ticks">
              <span>${m(t.min)}${t.unit}</span>
              <span>${m(t.max)}${t.unit}</span>
            </div>`}
      </div>`;
	}
};
cn = un, cn.styles = [
	B,
	V,
	o`
      .card {
        gap: 16px;
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
      .value.zero .num {
        color: var(--lg-text-secondary);
      }
      .track-wrap {
        position: relative;
      }
      .track-wrap lg-slider {
        --lg-slider-height: var(--lg-track-h, 56px);
        --lg-slider-fill: linear-gradient(90deg, var(--fill-from), var(--fill-to));
      }
      /* Decorative level marks, evenly spread rather than pinned to exact step positions. */
      .marks {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        pointer-events: none;
      }
      .marks span {
        width: 2px;
        height: 12px;
        border-radius: 1px;
        background: rgba(255, 255, 255, 0.5);
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-sv: clamp(20px, 7.4cqi, 28px);
          --lg-sv-unit: clamp(11px, 3.9cqi, 15px);
          --lg-track-h: clamp(40px, 14.7cqi, 56px);
        }
      }
    `
], I([w()], un.prototype, "preview", void 0), I([w()], un.prototype, "pending", void 0);
var dn = ln;
customElements.get("liquid-glass-slider-card") || customElements.define("liquid-glass-slider-card", un);
//#endregion
//#region src/cards/button-card.ts
var fn, U = [
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
function pn(e, t) {
	let n = e ? {
		from: it(e, .45),
		to: e
	} : t;
	return {
		...n,
		glow: M(n.to, .3)
	};
}
var mn = {
	scene: {
		service: "scene.turn_on",
		icon: "mdi:palette",
		well: U[0],
		label: "btn_scene"
	},
	script: {
		service: "script.turn_on",
		icon: "mdi:script-text-play",
		well: U[1],
		label: "btn_script"
	},
	automation: {
		service: "automation.trigger",
		icon: "mdi:robot",
		well: U[3],
		label: "btn_automation"
	},
	button: {
		service: "button.press",
		icon: "mdi:gesture-tap-button",
		well: U[3],
		label: "btn_button"
	},
	input_button: {
		service: "input_button.press",
		icon: "mdi:gesture-tap-button",
		well: U[3],
		label: "btn_button"
	}
}, hn = 2600, gn = class extends z {
	constructor(...e) {
		super(...e), this.justRan = !1, this.press = () => {
			let [e, t] = (this.config.service ?? this.spec?.service ?? "").split(".");
			e && t && (this.hass?.callService(e, t, {
				entity_id: this.config.entity,
				...this.config.service_data ?? {}
			}), this.justRan = !0, window.clearTimeout(this.doneTimer), this.doneTimer = window.setTimeout(() => this.justRan = !1, hn));
		}, this.onKeyDown = (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), this.press());
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(Object.keys(mn), e, t, n) };
	}
	getCardSize() {
		return 1;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.doneTimer);
	}
	get domain() {
		return this.config.entity?.split(".")[0] ?? "";
	}
	get spec() {
		return mn[this.domain];
	}
	lastRun(e) {
		let t = e.attributes.last_triggered;
		if (t) return t;
		let n = Date.parse(e.state);
		return Number.isNaN(n) ? void 0 : e.state;
	}
	subtitle(e) {
		if (this.config.subtitle !== void 0) return this.config.subtitle;
		let t = this.t;
		if (this.justRan) return `${t("btn_done")} · ${t("just_now")}`;
		let n = this.spec ? t(this.spec.label) : this.domain, r = this.lastRun(e);
		if (!r) return n;
		let i = Date.now() - new Date(r).getTime() < 432e5 ? T(r, t) : Qe(r);
		return `${n} · ${t("last")} ${i}`;
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = pn(this.config.accent, this.spec?.well ?? U[0]), n = this.config.icon ?? e.attributes.icon ?? this.spec?.icon ?? "mdi:gesture-tap-button";
		return y`${this.renderDefs()}
      <div
        class="glass card row"
        role="button"
        tabindex="0"
        aria-label=${this.entityName}
        @click=${this.press}
        @keydown=${this.onKeyDown}
      >
        ${this.renderIconWell(n, t, null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.subtitle(e)}</div>
        </div>
        <div class=${N({
			action: !0,
			done: this.justRan
		})}>
          <lg-icon .icon=${this.justRan ? "mdi:check" : "mdi:play"}></lg-icon>
        </div>
      </div>`;
	}
};
fn = gn, fn.styles = [
	B,
	V,
	o`
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
    `
], I([w()], gn.prototype, "justRan", void 0), customElements.get("liquid-glass-button-card") || customElements.define("liquid-glass-button-card", gn);
//#endregion
//#region src/editor/schema.ts
var W = (e) => ({
	name: e,
	selector: { text: {} }
}), G = (e) => ({
	name: e,
	selector: { boolean: {} }
}), _n = (e) => ({
	name: e,
	selector: { icon: {} }
}), vn = (e) => ({
	name: e,
	selector: { object: {} }
}), K = (e) => ({
	name: "",
	type: "grid",
	schema: e
}), yn = (e, t, n = !1) => ({
	name: e,
	required: n,
	selector: { entity: { domain: t } }
}), q = (e, t, n, r = 1) => ({
	name: e,
	selector: { number: {
		min: t,
		max: n,
		step: r,
		mode: "box"
	} }
}), J = (e, t, n = !1) => ({
	name: e,
	selector: { select: {
		options: t,
		multiple: n,
		mode: "dropdown"
	} }
});
function Y(e) {
	return [yn("entity", e, !0), K([W("name"), _n("icon")])];
}
function X(e) {
	return {
		name: "",
		type: "expandable",
		title: e("ed_advanced"),
		icon: "mdi:tune",
		schema: [
			K([J("theme", [
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
			]), J("refraction", [
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
			J("language", [{
				value: "ja",
				label: "日本語"
			}, {
				value: "en",
				label: "English"
			}]),
			J("glass_variant", [{
				value: "regular",
				label: e("ed_glass_variant_regular")
			}, {
				value: "clear",
				label: e("ed_glass_variant_clear")
			}])
		]
	};
}
var bn = [
	"auto",
	"heat_cool",
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
];
function xn(e) {
	return (e ?? "").replace(/^custom:/, "").replace(/^liquid-glass-/, "").replace(/-card$/, "");
}
function Sn(e, t, n) {
	switch (xn(e)) {
		case "light": return [
			...Y("light"),
			K([
				G("show_brightness"),
				G("show_color_temp"),
				G("show_color")
			]),
			{
				name: "favorites",
				selector: { text: { multiple: !0 } }
			},
			vn("presets"),
			X(t)
		];
		case "climate": return [
			...Y("climate"),
			J("design", [{
				value: "classic",
				label: t("ed_design_classic")
			}, {
				value: "compact",
				label: t("ed_design_compact")
			}]),
			...n?.design === "compact" || n?.design === "a" ? [G("show_fan_mode")] : [K([
				G("show_fan_mode"),
				G("show_preset_mode"),
				G("show_swing_mode")
			])],
			J("hvac_modes", bn.map((e) => ({
				value: e,
				label: t(`mode_${e}`)
			})), !0),
			X(t)
		];
		case "switch": return [
			...Y([
				"switch",
				"input_boolean",
				"fan",
				"light",
				"automation",
				"humidifier",
				"siren",
				"remote"
			]),
			yn("power_entity", "sensor"),
			X(t)
		];
		case "sensor": {
			let e = n?.value_in_caption === !0;
			return [
				...Y("sensor"),
				K(e ? [G("value_in_caption"), G("trend")] : [
					G("value_in_caption"),
					G("graph"),
					G("trend")
				]),
				K(e ? [q("decimals", 0, 4)] : [q("hours_to_show", 1, 168), q("decimals", 0, 4)]),
				W("accent"),
				K([yn("secondary_entity", ["sensor", "binary_sensor"]), W("secondary_label")]),
				X(t)
			];
		}
		case "binary-sensor": return [
			...Y("binary_sensor"),
			K([_n("icon_on"), _n("icon_off")]),
			K([W("label_on"), W("label_off")]),
			W("accent"),
			X(t)
		];
		case "lock": return [
			...Y("lock"),
			vn("buttons"),
			X(t)
		];
		case "cover": return [
			...Y("cover"),
			K([J("style", [{
				value: "blind",
				label: t("ed_style_blind")
			}, {
				value: "curtain",
				label: t("ed_style_curtain")
			}]), J("curtain", [{
				value: "double",
				label: t("ed_curtain_double")
			}, {
				value: "single",
				label: t("ed_curtain_single")
			}])]),
			G("show_tilt"),
			X(t)
		];
		case "media": return [
			...Y("media_player"),
			K([G("show_volume"), G("show_device")]),
			W("source_color"),
			X(t)
		];
		case "slider": return [
			...Y(dn),
			K([q("min", -1e3, 1e4, .1), q("max", -1e3, 1e4, .1)]),
			K([q("step", .01, 1e3, .01), W("unit")]),
			K([
				G("ticks"),
				G("show_range"),
				q("decimals", 0, 4)
			]),
			W("subtitle"),
			W("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [W("attribute"), K([W("service"), W("service_key")])]
			},
			X(t)
		];
		case "weather": {
			let e = n?.layout === "row", r = J("layout", [{
				value: "full",
				label: t("ed_layout_full")
			}, {
				value: "row",
				label: t("ed_layout_row")
			}]);
			return e ? [
				...Y("weather"),
				r,
				X(t)
			] : [
				...Y("weather"),
				r,
				K([
					G("show_hourly"),
					G("show_daily"),
					G("show_metrics")
				]),
				K([q("hourly_count", 2, 12), q("daily_count", 1, 10)]),
				X(t)
			];
		}
		case "button": return [
			...Y(Object.keys(mn)),
			W("subtitle"),
			W("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [W("service"), vn("service_data")]
			},
			X(t)
		];
		case "scene": return [
			K([J("style", [{
				value: "tiles",
				label: t("ed_style_tiles")
			}, {
				value: "chips",
				label: t("ed_style_chips")
			}]), q("columns", 1, 6)]),
			K([W("title"), G("show_count")]),
			vn("scenes"),
			X(t)
		];
		case "group": return [
			K([W("title"), _n("icon")]),
			W("subtitle"),
			K([
				G("collapsible"),
				G("collapsed"),
				G("summary")
			]),
			vn("cards"),
			X(t)
		];
		case "separator": {
			let e = n?.style ?? "pill";
			return [
				K([W("title"), _n("icon")]),
				J("style", [
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
				...e === "header" ? [W("subtitle")] : [q("count", 0, 999)],
				X(t)
			];
		}
		case "camera": return [
			...Y("camera"),
			yn("motion_entity", "binary_sensor"),
			K([G("show_actions"), G("show_mic")]),
			K([q("refresh_interval", 1, 300), q("aspect_ratio", .5, 3, .01)]),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [W("snapshot_service"), W("mic_service")]
			},
			X(t)
		];
		default: return [
			yn("entity", [], !0),
			K([W("name"), _n("icon")]),
			X(t)
		];
	}
}
var Cn = /* @__PURE__ */ new Set([
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
function wn(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => {
		for (let r of e) r.schema ? n(r.schema) : r.name && t.add(r.name);
	};
	return n(e), t;
}
var Tn = {
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
}, En, Dn = class extends S {
	constructor(...e) {
		super(...e), this.computeLabel = (e) => this.t(`ed_${e.name}`), this.computeHelper = (e) => {
			let t = Tn[e.name];
			return t ? this.t(t) : void 0;
		}, this.valueChanged = (e) => {
			e.stopPropagation(), $e(this, "config-changed", { config: this.fromForm(e.detail.value) });
		};
	}
	setConfig(e) {
		this.config = e;
	}
	toForm(e) {
		let { refraction: t, theme: n, ...r } = e, i = { ...r };
		if (i.refraction = t === !0 ? "on" : t === !1 ? "off" : "auto", i.theme = n ?? "auto", i.glass_variant = r.glass_variant ?? "regular", xn(e.type) === "weather" && (i.layout = r.layout ?? "full"), xn(e.type) === "climate") {
			let e = r.design;
			i.design = e === "a" ? "compact" : e ?? "classic";
		}
		xn(e.type) === "separator" && (i.style = r.style ?? "pill");
		for (let t of wn(Sn(e.type, this.t, i))) Cn.has(t) && (i[t] = xn(e.type) === "climate" && i.design === "compact" && t === "show_fan_mode" ? r[t] === !0 : r[t] !== !1);
		if (xn(e.type) === "light") {
			let e = r.favorites;
			i.favorites = e === !1 ? [] : e ?? an;
		}
		return i;
	}
	fromForm(e) {
		let t = { ...e }, n = xn(t.type) === "climate" && (t.design === "compact" || t.design === "a"), r = this.config, i = r?.design === "compact" || r?.design === "a";
		r && n !== i && r.show_fan_mode === void 0 && delete t.show_fan_mode;
		for (let [e, r] of Object.entries(t)) if (typeof r == "boolean") {
			if (n && e === "show_fan_mode") {
				r === !1 && delete t[e];
				continue;
			}
			r === Cn.has(e) && delete t[e];
		}
		t.refraction === "on" ? t.refraction = !0 : t.refraction === "off" ? t.refraction = !1 : delete t.refraction, t.theme === "auto" && delete t.theme, t.glass_variant === "regular" && delete t.glass_variant, t.layout === "full" && delete t.layout, t.design === "classic" && delete t.design, t.style === "pill" && xn(t.type) === "separator" && delete t.style;
		let a = t.favorites;
		Array.isArray(a) && a.join() === an.join() && delete t.favorites;
		for (let [e, n] of Object.entries(t)) (n == null || n === "" || Array.isArray(n) && n.length === 0 && e !== "favorites") && delete t[e];
		return t;
	}
	get t() {
		return Ze(this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language);
	}
	render() {
		return !this.hass || !this.config ? x : y`<ha-form
      .hass=${this.hass}
      .data=${this.toForm(this.config)}
      .schema=${Sn(this.config.type, this.t, this.config)}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}
    ></ha-form>`;
	}
};
En = Dn, En.styles = o`
    :host {
      display: block;
    }
  `, I([C({ attribute: !1 })], Dn.prototype, "hass", void 0), I([w()], Dn.prototype, "config", void 0), customElements.get("liquid-glass-card-editor") || customElements.define("liquid-glass-card-editor", Dn);
//#endregion
//#region src/cards/climate-card.ts
var On, Z = 250, kn = 24, An = Z / 2 - kn / 2, Q = 135, jn = 4e3, Mn = 270, Nn = (e, t = An) => {
	let n = e * Math.PI / 180;
	return [Z / 2 + t * Math.cos(n), Z / 2 + t * Math.sin(n)];
};
function Pn(e, t) {
	let [n, r] = Nn(e), [i, a] = Nn(t);
	return `M ${n} ${r} A ${An} ${An} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}
var Fn = class extends z {
	constructor(...e) {
		super(...e), this.onDialDown = (e) => {
			if (this.mode === "off" || e.button !== 0) return;
			e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
			let t = this.valueFromPointer(e), n = "single";
			if (this.isRange) {
				let e = this.entity.attributes.target_temp_low, r = this.entity.attributes.target_temp_high;
				n = Math.abs(t - e) <= Math.abs(t - r) ? "low" : "high";
			}
			this.drag = {
				which: n,
				value: t
			};
		}, this.onDialMove = (e) => {
			if (!this.drag) return;
			let t = this.valueFromPointer(e);
			t !== this.drag.value && (this.drag = {
				...this.drag,
				value: t
			});
		}, this.onTileDown = (e) => {
			if (this.mode === "off" || e.button !== 0) return;
			e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId);
			let t = this.valueFromTilePointer(e), n = "single";
			if (this.isRange) {
				let e = this.entity.attributes, r = this.shownValue("low", e.target_temp_low, this.range[0]), i = this.shownValue("high", e.target_temp_high, this.range[1]);
				n = Math.abs(t - r) <= Math.abs(t - i) ? "low" : "high";
			}
			this.drag = {
				which: n,
				value: t
			};
		}, this.onTileMove = (e) => {
			if (!this.drag) return;
			let t = this.valueFromTilePointer(e);
			t !== this.drag.value && (this.drag = {
				...this.drag,
				value: t
			});
		}, this.onTileKeyDown = (e) => {
			if (this.mode === "off" || this.isRange) return;
			let [t, n] = this.range, r = this.entity?.attributes.temperature, i = this.shownValue("single", r, t);
			if (e.key === "ArrowRight" || e.key === "ArrowUp") i += this.step;
			else if (e.key === "ArrowLeft" || e.key === "ArrowDown") i -= this.step;
			else if (e.key === "Home") i = t;
			else if (e.key === "End") i = n;
			else return;
			e.preventDefault(), this.drag = {
				which: "single",
				value: E(i, t, n)
			}, this.onDialUp();
		}, this.onDialUp = () => {
			if (!this.drag) return;
			let { which: e, value: t } = this.drag;
			this.drag = void 0;
			let n = this.entity?.attributes ?? {}, r = t;
			e === "single" ? this.callService("climate", "set_temperature", { temperature: t }) : e === "low" ? (r = Math.min(t, n.target_temp_high - this.step), this.callService("climate", "set_temperature", {
				target_temp_low: r,
				target_temp_high: n.target_temp_high
			})) : (r = Math.max(t, n.target_temp_low + this.step), this.callService("climate", "set_temperature", {
				target_temp_low: n.target_temp_low,
				target_temp_high: r
			})), this.hold(e, r);
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["climate"], e, t, n) };
	}
	getCardSize() {
		return 6;
	}
	get mode() {
		return this.entity?.state ?? "off";
	}
	get step() {
		return this.entity?.attributes.target_temp_step ?? .5;
	}
	get range() {
		let e = this.entity?.attributes;
		return [e?.min_temp ?? 7, e?.max_temp ?? 35];
	}
	get isRange() {
		return this.mode === "heat_cool" && this.entity?.attributes.target_temp_low !== void 0;
	}
	ratio(e) {
		let [t, n] = this.range;
		return E((e - t) / (n - t || 1), 0, 1);
	}
	theme() {
		let e = this.t, t = this.mode, n = "rgba(255,255,255,0.7)";
		switch (t) {
			case "heat": return {
				icon: "mdi:fire",
				label: e("mode_heat"),
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
				label: e("mode_cool"),
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
				label: e("mode_dry"),
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
				label: e("mode_fan_only"),
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
				label: e(t === "auto" ? "mode_auto" : "mode_heat_cool"),
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
				label: e("mode_off"),
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
	modeMeta(e) {
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
			label: this.t(`mode_${e}`)
		};
	}
	actionText() {
		let e = this.t, t = this.entity?.attributes.hvac_action;
		if (this.mode === "off") return e("mode_off");
		switch (t) {
			case "heating": return e("heating");
			case "cooling": return e("cooling");
			case "drying": return e("drying");
			case "fan": return e("fan_running");
			case "idle": return e("idle");
			default: return this.theme().label;
		}
	}
	stateText() {
		let e = this.entity?.attributes ?? {}, t = [this.actionText()];
		return e.current_temperature !== void 0 && t.push(`${this.t("room_temp")} ${D(this.hass, e.current_temperature, 1)}°`), e.current_humidity !== void 0 && t.push(`${this.t("humidity")} ${D(this.hass, e.current_humidity, 0)}%`), t.join(" · ");
	}
	tileStateText() {
		let e = this.entity?.attributes ?? {}, t = [this.actionText()];
		return e.current_humidity !== void 0 && t.push(`${this.t("humidity")} ${D(this.hass, e.current_humidity, 0)}%`), t.join(" · ");
	}
	shownValue(e, t, n) {
		return this.drag?.which === e ? this.drag.value : this.pending?.[e] ?? t ?? n;
	}
	valueFromPointer(e) {
		let t = this.shadowRoot?.querySelector(".dial");
		if (!t) return 0;
		let n = t.getBoundingClientRect(), r = e.clientX - (n.left + n.width / 2), i = e.clientY - (n.top + n.height / 2), a = Math.atan2(i, r) * 180 / Math.PI;
		a = ((a - Q) % 360 + 360) % 360, a > Mn && (a = a > 315 ? 0 : Mn);
		let [o, s] = this.range, c = o + a / Mn * (s - o);
		return E(Math.round(c / this.step) * this.step, o, s);
	}
	valueFromTilePointer(e) {
		let t = this.shadowRoot?.querySelector(".tile-track");
		if (!t) return this.range[0];
		let n = t.getBoundingClientRect(), r = n.height / 2, i = E((e.clientX - n.left - r) / Math.max(n.width - r * 2, 1), 0, 1), [a, o] = this.range;
		return E(Math.round((a + i * (o - a)) / this.step) * this.step, a, o);
	}
	stepTileTemperature(e) {
		if (this.mode === "off") return;
		let t = this.entity?.attributes ?? {}, [n, r] = this.range;
		if (this.isRange) {
			let i = this.shownValue("low", t.target_temp_low, n), a = this.shownValue("high", t.target_temp_high, r), o = E(e, n - i, r - a);
			if (o === 0) return;
			let s = i + o, c = a + o;
			this.callService("climate", "set_temperature", {
				target_temp_low: s,
				target_temp_high: c
			}), this.hold("low", s), this.hold("high", c);
			return;
		}
		let i = this.shownValue("single", t.temperature, n), a = E(i + e, n, r);
		a !== i && (this.callService("climate", "set_temperature", { temperature: a }), this.hold("single", a));
	}
	hold(e, t) {
		this.pending = {
			...this.pending,
			[e]: t
		}, window.clearTimeout(this.pendingTimer), this.pendingTimer = window.setTimeout(() => this.pending = void 0, jn);
	}
	settled(e, t) {
		let n = this.pending?.[e];
		return n === void 0 || t !== void 0 && Math.abs(t - n) <= Math.max(this.step / 2, .01);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.pendingTimer);
	}
	updated() {
		if (!this.pending) return;
		let e = this.entity?.attributes ?? {};
		this.settled("single", e.temperature) && this.settled("low", e.target_temp_low) && this.settled("high", e.target_temp_high) && (window.clearTimeout(this.pendingTimer), this.pending = void 0);
	}
	renderDial(e) {
		let t = this.entity.attributes, n = this.mode === "off", r = this.t, [i, a] = this.range, o = this.shownValue("single", t.temperature, i), s = this.shownValue("low", t.target_temp_low, i), c = this.shownValue("high", t.target_temp_high, a), l = this.isRange, u = l ? Q + this.ratio(s) * Mn : Q, d = Q + this.ratio(l ? c : o) * Mn, [f, p, m] = e.ring, h = (u - Q) / Mn, g = (d - Q) / Mn, _ = l ? [s, c] : [o], ee = l ? D(this.hass, s, 0) + "–" + D(this.hass, c, 0) : D(this.hass, Math.floor(o), 0), te = l ? "°" : `.${Math.round((o - Math.floor(o)) * 10)}°`;
		return y`<div class="dial-row">
      <div class=${N({
			dial: !0,
			dragging: this.drag !== void 0
		})} @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg
          viewBox="0 0 ${Z} ${Z}"
          style=${P({
			"--ring-glow": e.glow,
			"--lg-ring-0": f,
			"--lg-ring-1": p,
			"--lg-ring-2": m
		})}
        >
          <defs>
            <!--
              Pinned across the dial rather than to the ends of the filled arc: the design
              draws it that way, and a vector that moved with the fill would swing about
              while the arc animates to its new length.
            -->
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1="0" y1=${Z} x2=${Z} y2="0">
              <stop offset="0" stop-color="var(--lg-ring-0)" />
              <stop offset="0.55" stop-color="var(--lg-ring-1)" />
              <stop offset="1" stop-color="var(--lg-ring-2)" />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${Pn(Q, 405)} />
          <!--
            The fill is the whole arc, revealed by the dash pattern. Redrawing a shorter
            path would jump between modes; a dash length interpolates.
            pathLength="1" puts the dash values in fractions of the sweep.
          -->
          <path
            class="ring-fill"
            d=${Pn(Q, 405)}
            pathLength="1"
            stroke="url(#ring-grad)"
            style=${P({
			strokeDasharray: `${Math.max(g - h, 0).toFixed(4)} 1`,
			strokeDashoffset: (-h).toFixed(4),
			opacity: n ? "0" : "1"
		})}
          />
        </svg>
        ${n ? x : _.map((e) => this.renderKnobAt(e))}
        <div class="center">
          <div class="caption">${r(l ? "target_range" : "target_temp")}</div>
          <div class=${N({
			"temp-row": !0,
			off: n
		})}>
            <span class=${N({
			target: !0,
			range: l
		})}>${ee}</span><span class="fraction">${te}</span>
          </div>
          ${t.current_temperature === void 0 ? x : y`<div class="current">${r("room_temp")} ${D(this.hass, t.current_temperature, 1)}°</div>`}
        </div>
        <div class="minmax"><span>${D(this.hass, i, 0)}°</span><span>${D(this.hass, a, 0)}°</span></div>
      </div>
    </div>`;
	}
	renderKnobAt(e) {
		let [t, n] = Nn(Q + this.ratio(e) * Mn);
		return y`<div
      class="dial-knob knob"
      style=${P({
			left: `${(t / Z * 100).toFixed(3)}%`,
			top: `${(n / Z * 100).toFixed(3)}%`
		})}
    >
      ${this.refraction ? x : y`<lg-glass-surface
        class="lg-control-shader dial-knob-shader"
        shape="circle"
        .palette=${this.isDark ? ["#242529", "#45474d"] : ["#ffffff", "#d8d9dc"]}
        .radius=${999}
        .edge=${14}
        .refraction=${0}
        .blurRadius=${3}
        .highQualityBlur=${!0}
        .renderScale=${1.5}
        .pixelRatioLimit=${3}
        .highlight=${1.1}
        .tintAlpha=${.22}
        .surfaceAlpha=${.52}
      ></lg-glass-surface>`}
    </div>`;
	}
	renderDetail(e, t) {
		let n = this.entity.attributes, r = n[`${e}s`], i = n[e];
		return r?.length ? y`<div class="detail">
      <lg-icon .icon=${t}></lg-icon>
      <div class="text">
        <span class="dl">${this.t(e === "preset_mode" ? "preset" : e)}</span>
        <span class="dv">${i ?? "—"}</span>
      </div>
      <lg-icon icon="mdi:chevron-down"></lg-icon>
      <select .value=${i ?? ""} @change=${(t) => this.callService("climate", `set_${e}`, { [e]: t.target.value })}>
        ${r.map((e) => y`<option value=${e} ?selected=${e === i}>${e}</option>`)}
      </select>
    </div>` : x;
	}
	tileSelectedColor() {
		switch (this.mode) {
			case "heat": return "var(--lg-heat-deep)";
			case "cool": return "var(--lg-cool-deep)";
			case "dry": return "#0A7EA4";
			case "fan_only": return "#5C6B82";
			case "heat_cool":
			case "auto": return "#1E9E4A";
			default: return "var(--lg-text-primary)";
		}
	}
	tileModeMeta(e) {
		let t = this.modeMeta(e);
		return e === "auto" ? {
			...t,
			icon: "mdi:refresh"
		} : t;
	}
	targetParts(e) {
		let [t, n] = (Math.round(e * 10) / 10).toFixed(1).split(".");
		return {
			number: D(this.hass, Number(t), 0),
			fraction: `.${n}°`
		};
	}
	tileGradientColor(e) {
		let t = [
			[0, [
				90,
				200,
				250
			]],
			[.35, [
				255,
				217,
				160
			]],
			[.62, [
				255,
				159,
				10
			]],
			[1, [
				255,
				45,
				85
			]]
		], n = Math.min(t.findIndex(([t]) => e <= t), t.length - 1), [r, i] = t[Math.max(n, 1)], [a, o] = t[Math.max(n - 1, 0)], s = E((e - a) / Math.max(r - a, .001), 0, 1), [c, l, u] = o.map((e, t) => Math.round(e + (i[t] - e) * s));
		return `rgba(${c}, ${l}, ${u}, 0.58)`;
	}
	renderCompact(e, t) {
		let n = this.entity.attributes, r = this.mode === "off", [i, a] = this.range, o = this.shownValue("single", n.temperature, i), s = this.shownValue("low", n.target_temp_low, i), c = this.shownValue("high", n.target_temp_high, a), l = this.isRange, u = l ? this.ratio(s) : 0, d = this.ratio(l ? c : o), f = n.current_temperature, p = this.targetParts(o), m = this.tileSelectedColor();
		return y`${this.renderDefs()}
      <div class="glass card climate-compact">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? e.icon, e.well)}
          ${this.renderTitle(this.entityName, this.tileStateText())}
          ${this.renderBadge(e.label, e.badge)}
        </div>

        <div class="tile-readout">
          <div class=${N({
			"tile-target": !0,
			range: l,
			off: r
		})}>
            <span class="number">${l ? `${D(this.hass, s, 0)}–${D(this.hass, c, 0)}` : p.number}</span>
            <span class="fraction">${l ? "°" : p.fraction}</span>
          </div>
          ${f === void 0 ? x : y`<div class="tile-room">
                <span class="caption">${this.t("room_temp")}</span>
                <span class="value">${D(this.hass, f, 1)}°</span>
              </div>`}
        </div>

        <div
          class=${N({
			"tile-track": !0,
			dragging: this.drag !== void 0,
			off: r
		})}
          style=${P({
			"--clip-left": u <= 0 ? "0px" : `calc(var(--lg-tile-slider-size) / 2 + (100% - var(--lg-tile-slider-size)) * ${u})`,
			"--clip-right": d >= 1 ? "0px" : `calc(100% - var(--lg-tile-slider-size) / 2 - (100% - var(--lg-tile-slider-size)) * ${d})`
		})}
          role="slider"
          tabindex=${r ? -1 : 0}
          aria-valuemin=${i}
          aria-valuemax=${a}
          aria-valuenow=${l ? x : o}
          aria-valuetext=${l ? `${s}–${c}` : String(o)}
          aria-disabled=${r}
          @pointerdown=${this.onTileDown}
          @pointermove=${this.onTileMove}
          @pointerup=${this.onDialUp}
          @pointercancel=${this.onDialUp}
          @keydown=${this.onTileKeyDown}
        >
          <div class="tile-gradient" style=${P({ opacity: r ? "0" : "1" })}></div>
          ${r ? x : (l ? [s, c] : [o]).map((e) => {
			let t = this.tileGradientColor(this.ratio(e));
			return y`<div
                    class="tile-thumb"
                    style=${P({
				"--value": String(this.ratio(e)),
				"--tile-thumb-color": t
			})}
                  >
                    ${this.refraction ? x : y`<lg-glass-surface
                      shape="circle"
                      .palette=${[
				t,
				t,
				this.isDark ? "#24242c" : "#dedde2",
				this.isDark ? "#24242c" : "#dedde2"
			]}
                      .stops=${[
				0,
				.44,
				.56,
				1
			]}
                      .radius=${999}
                      .edge=${20}
                      .refraction=${0}
                      .blurRadius=${12}
                      .highQualityBlur=${!0}
                      .renderScale=${1.5}
                      .pixelRatioLimit=${3}
                      .highlight=${1.25}
                      .tintAlpha=${.18}
                    ></lg-glass-surface>`}
                  </div>`;
		})}
        </div>

        <div class="tile-step-controls">
          <button
            class="tile-step decrease"
            aria-label=${this.t("decrease_temp")}
            title=${this.t("decrease_temp")}
            ?disabled=${r || (l ? s <= i : o <= i)}
            @click=${() => this.stepTileTemperature(-1)}
          >−</button>
          <button
            class="tile-step increase"
            aria-label=${this.t("increase_temp")}
            title=${this.t("increase_temp")}
            ?disabled=${r || (l ? c >= a : o >= a)}
            @click=${() => this.stepTileTemperature(1)}
          >＋</button>
        </div>

        ${t.length ? y`<div
              class="tile-modes"
              style=${P({
			"--selected-color": m,
			"--n": String(t.length),
			"--i": String(Math.max(t.indexOf(this.mode), 0))
		})}
            >
              <div class="tile-mode-pill" style=${P({ opacity: t.includes(this.mode) ? "1" : "0" })}></div>
              ${t.map((e) => {
			let t = this.tileModeMeta(e);
			return y`<button
                  class=${N({ selected: e === this.mode })}
                  title=${t.label}
                  aria-label=${t.label}
                  aria-pressed=${e === this.mode}
                  @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: e })}
                >
                  <lg-icon .icon=${t.icon}></lg-icon>
                </button>`;
		})}
            </div>` : x}

        ${this.config.show_fan_mode === !0 ? y`<div class=${N({
			details: !0,
			muted: r
		})}>${this.renderDetail("fan_mode", "mdi:weather-windy")}</div>` : x}
      </div>`;
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.theme(), n = this.mode === "off", r = (this.config.hvac_modes ?? e.attributes.hvac_modes ?? []).filter(Boolean), i = this.config.show_fan_mode !== !1, a = this.config.show_preset_mode !== !1, o = this.config.show_swing_mode === !0;
		return this.config.design === "compact" || this.config.design === "a" ? this.renderCompact(t, r) : y`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? t.icon, t.well)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(t.label, t.badge)}
        </div>

        ${this.renderDial(t)}

        ${r.length ? y`<div
              class="segment modes"
              style=${P({
			"--selected-color": t.selectedColor,
			"--n": String(r.length),
			"--i": String(Math.max(r.indexOf(this.mode), 0))
		})}
            >
              <!--
                One pill that slides between the buttons, rather than a background that
                appears on the newly selected button and vanishes from the old one. Only a
                single element can travel; two cross-fading ones read as a blink.
                An unlisted mode leaves nothing selected, so the pill sits out.
              -->
              <div class="seg-pill" style=${P({ opacity: r.includes(this.mode) ? "1" : "0" })}></div>
              ${r.map((e) => {
			let t = this.modeMeta(e);
			return y`<button class=${N({ selected: e === this.mode })} @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: e })}>
                  <lg-icon .icon=${t.icon}></lg-icon><span>${t.label}</span>
                </button>`;
		})}
            </div>` : x}

        ${i || a || o ? y`<div class=${N({
			details: !0,
			muted: n
		})}>
              ${i ? this.renderDetail("fan_mode", "mdi:weather-windy") : x}
              ${a ? this.renderDetail("preset_mode", "mdi:creation") : x}
              ${o ? this.renderDetail("swing_mode", "mdi:arrow-oscillating") : x}
            </div>` : x}
      </div>`;
	}
};
On = Fn, On.styles = [
	B,
	V,
	o`
      .dial-row {
        display: flex;
        justify-content: center;
      }
      /* The SVG scales with its viewBox, so everything layered on top is positioned in
         percentages of the dial rather than in the 250px design units. */
      .dial {
        position: relative;
        width: min(${Z}px, 100%);
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
        stroke-width: ${kn}px;
      }
      .ring-track-stroke {
        fill: none;
        stroke: var(--lg-glass-stroke);
        stroke-width: 1px;
      }
      .ring-fill {
        fill: none;
        stroke-width: ${kn}px;
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
      .dial-knob {
        position: absolute;
        width: var(--lg-knob, 30px);
        height: var(--lg-knob, 30px);
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: left 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), top 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), transform 0.12s ease;
      }
      /* Keep the real dial/ring visible below the shader. The WebGL layer supplies the
         liquid rim while backdrop-filter supplies the pixels it cannot sample itself. */
      .dial-knob:has(> .dial-knob-shader) {
        background: rgba(255, 255, 255, 0.14);
        -webkit-backdrop-filter: blur(3px) saturate(1.35);
        backdrop-filter: blur(3px) saturate(1.35);
        box-shadow:
          0 3px 8px rgba(0, 0, 0, 0.3),
          inset 0 0 0 1px rgba(255, 255, 255, 0.62);
      }
      :host([refraction]) .dial-knob:has(> .dial-knob-shader) {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
      }
      /* Anything that eased towards the finger would feel like lag, so while a drag is in
         flight the knob and the arc track the pointer exactly. */
      .dial.dragging .dial-knob {
        transition: transform 0.12s ease;
      }
      .dial.dragging .ring-fill {
        transition: none;
      }
      .dial-knob:active {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.08);
      }
      .center {
        position: absolute;
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
        --lg-tile-slider-size: 56px;
        --lg-tile-thumb-track: rgba(76, 76, 82, 0.18);
      }
      :host([dark]) .card.climate-compact {
        --lg-tile-thumb-track: rgba(8, 8, 10, 0.42);
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
      .tile-track {
        position: relative;
        width: 100%;
        height: var(--lg-tile-slider-size);
        overflow: hidden;
        border-radius: calc(var(--lg-tile-slider-size) / 2);
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.14),
          inset 0 0 0 1px var(--lg-glass-stroke);
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .tile-track.off {
        cursor: default;
      }
      .tile-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #5ac8fa 0%, #ffd9a0 35%, #ff9f0a 62%, #ff2d55 100%);
        clip-path: inset(0 var(--clip-right) 0 var(--clip-left));
        transition: clip-path 0.35s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.25s ease;
        pointer-events: none;
      }
      .tile-track.dragging .tile-gradient,
      .tile-track.dragging .tile-thumb {
        transition: none;
      }
      .tile-thumb {
        position: absolute;
        top: 0;
        left: calc(var(--lg-tile-slider-size) / 2 + (100% - var(--lg-tile-slider-size)) * var(--value));
        width: var(--lg-tile-slider-size);
        height: var(--lg-tile-slider-size);
        overflow: hidden;
        isolation: isolate;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.32);
        -webkit-backdrop-filter: blur(3px) saturate(1.15);
        backdrop-filter: blur(3px) saturate(1.15);
        box-shadow:
          0 5px 14px rgba(0, 0, 0, 0.42),
          0 1px 3px rgba(255, 255, 255, 0.35);
        transform: translateX(-50%);
        transition: left 0.35s cubic-bezier(0.3, 0.8, 0.3, 1), transform 0.12s ease;
        pointer-events: none;
      }
      .tile-thumb::before {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--tile-thumb-color) 0 50%, var(--lg-tile-thumb-track) 50% 100%);
        pointer-events: none;
      }
      .tile-thumb::after {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: inherit;
        background: linear-gradient(160deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.16) 38%, transparent 62%);
        box-shadow:
          inset 0 0 0 1px rgba(255, 255, 255, 0.9),
          inset 0 -5px 8px rgba(0, 0, 0, 0.08);
        pointer-events: none;
      }
      :host([refraction]) .tile-thumb {
        background: rgba(255, 255, 255, 0.48);
        -webkit-backdrop-filter: url(#lg-slider-knob);
        backdrop-filter: url(#lg-slider-knob);
      }
      .tile-thumb:has(> lg-glass-surface) {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }
      .tile-thumb:has(> lg-glass-surface)::before,
      .tile-thumb:has(> lg-glass-surface)::after {
        display: none;
      }
      .tile-track.dragging .tile-thumb {
        transform: translateX(-50%) scale(1.06);
      }
      .tile-step-controls {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .tile-step {
        width: 48px;
        height: 40px;
        display: grid;
        place-items: center;
        padding: 0 0 2px;
        border: 0;
        border-radius: 20px;
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 5px rgba(0, 0, 0, 0.12),
          inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        font-family: var(--lg-font-ui);
        font-size: 20px;
        font-weight: 600;
        line-height: 1;
        cursor: pointer;
        transition: transform 0.1s ease, opacity 0.2s ease;
      }
      .tile-step:active:not(:disabled) {
        transform: scale(0.94);
      }
      .tile-step:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .tile-modes {
        position: relative;
        display: flex;
        height: 40px;
        box-sizing: border-box;
        gap: 2px;
        padding: 3px;
        border-radius: 20px;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
      }
      .tile-mode-pill {
        --seg-w: calc((100% - 6px - (var(--n) - 1) * 2px) / var(--n));
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: calc(3px + var(--i) * (var(--seg-w) + 2px));
        width: var(--seg-w);
        border-radius: 17px;
        background: var(--lg-segment-selected);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
        transition: left 0.32s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.2s ease;
        pointer-events: none;
      }
      .tile-mode-pill:has(> .lg-control-shader),
      .seg-pill:has(> .lg-control-shader) {
        background: transparent;
        box-shadow: none;
      }
      .tile-modes button {
        position: relative;
        z-index: 1;
        flex: 1;
        min-width: 0;
        min-height: 0;
        height: 34px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 0;
        border-radius: 17px;
        color: var(--lg-text-secondary);
        background: transparent;
        cursor: pointer;
      }
      .tile-modes lg-icon {
        --mdc-icon-size: 17px;
        width: 17px;
        height: 17px;
        transition: color 0.32s ease;
      }
      .tile-modes button.selected lg-icon {
        color: var(--selected-color);
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-knob: clamp(22px, 8cqi, 30px);
          --lg-temp: clamp(34px, 14.2cqi, 54px);
          --lg-temp-range: clamp(26px, 10.5cqi, 40px);
          --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
        }
        .card.climate-compact {
          --lg-tile-slider-size: clamp(40px, 14.7cqi, 56px);
          --lg-tile-temp: clamp(38px, 14.7cqi, 56px);
          --lg-tile-range: clamp(28px, 10.5cqi, 40px);
          --lg-tile-fraction: clamp(17px, 6.3cqi, 24px);
          --lg-tile-room: clamp(13px, 4.5cqi, 17px);
        }
      }
      .segment.modes {
        position: relative;
        border-radius: 20px;
      }
      /*
       * The buttons are flex: 1 inside 3px of padding with a 2px gap, so one button is
       * (width - 6px - gaps) / n and the pill's offset is that plus a gap, per button.
       * Deriving it here keeps the pill on the button without measuring anything.
       */
      .seg-pill {
        --seg-w: calc((100% - 6px - (var(--n) - 1) * 2px) / var(--n));
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: calc(3px + var(--i) * (var(--seg-w) + 2px));
        width: var(--seg-w);
        border-radius: 17px;
        background: var(--lg-segment-selected);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
        transition: left 0.32s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.2s ease;
        pointer-events: none;
      }
      .segment.modes > button {
        position: relative;
        height: clamp(44px, 14cqi, 54px);
        border-radius: 17px;
        font-size: var(--lg-tick);
        padding: 0 2px;
      }
      /* The pill draws the selection now, so the button underneath must not draw it too. */
      .segment.modes > button.selected {
        background: transparent;
        box-shadow: none;
      }
      .segment.modes lg-icon {
        transition: color 0.32s ease;
      }
      .segment.modes > button > span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .segment.modes lg-icon {
        --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
      }
      .segment.modes > button.selected lg-icon {
        color: var(--selected-color);
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
    `
], I([w()], Fn.prototype, "drag", void 0), I([w()], Fn.prototype, "pending", void 0), customElements.get("liquid-glass-climate-card") || customElements.define("liquid-glass-climate-card", Fn);
//#endregion
//#region src/cards/switch-card.ts
var In, Ln = 500, Rn = 10, zn = class extends z {
	constructor(...e) {
		super(...e), this.heldOpen = !1, this.toggle = () => {
			if (!this.config.entity) return;
			let e = this.config.entity.split(".")[0];
			[
				"switch",
				"light",
				"fan",
				"input_boolean",
				"automation",
				"humidifier",
				"siren",
				"remote"
			].includes(e) ? this.callService(e, "toggle") : this.callService("homeassistant", "toggle");
		}, this.onPointerDown = (e) => {
			e.button === 0 && (this.heldOpen = !1, this.holdOrigin = {
				x: e.clientX,
				y: e.clientY
			}, this.holdTimer = window.setTimeout(() => {
				this.heldOpen = !0, this.cancelHold(), this.openMoreInfo();
			}, Ln));
		}, this.onPointerMove = (e) => {
			this.holdOrigin && (Math.abs(e.clientX - this.holdOrigin.x) > Rn || Math.abs(e.clientY - this.holdOrigin.y) > Rn) && this.cancelHold();
		}, this.onClick = () => {
			if (this.cancelHold(), this.heldOpen) {
				this.heldOpen = !1;
				return;
			}
			this.toggle();
		}, this.onKeyDown = (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), this.toggle());
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A([
			"switch",
			"input_boolean",
			"fan",
			"light",
			"automation",
			"humidifier",
			"siren",
			"remote"
		], e, t, n) };
	}
	getCardSize() {
		return 1;
	}
	get isOn() {
		return this.entity?.state === "on";
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.cancelHold();
	}
	cancelHold() {
		this.holdTimer !== void 0 && window.clearTimeout(this.holdTimer), this.holdTimer = void 0, this.holdOrigin = void 0;
	}
	stateText() {
		let e = this.t, t = this.entity;
		if (this.isOn) {
			let n = this.config.power_entity ? this.hass?.states[this.config.power_entity] : void 0;
			if (n && !O(n)) {
				let t = n.attributes.unit_of_measurement ?? "W";
				return `${e("on")} · ${e("power")} ${D(this.hass, Number(n.state), 0)} ${t}`;
			}
			return `${e("on")} · ${e("since", { t: T(t.last_changed, e) })}`;
		}
		return `${e("off")} · ${e("last_on")} ${T(t.last_changed, e)}`;
	}
	defaultIcon() {
		let e = this.config.entity?.split(".")[0];
		return e === "fan" ? "mdi:fan" : e === "light" ? "mdi:lightbulb" : e === "automation" ? "mdi:robot" : "mdi:power-plug";
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.isOn, n = t ? {
			from: "var(--lg-switch-accent-light)",
			to: "var(--lg-switch-accent)",
			glow: "rgba(10,132,255,0.24)"
		} : void 0;
		return y`${this.renderDefs()}
      <div
        class=${N({
			glass: !0,
			card: !0,
			row: !0,
			active: t
		})}
        role="switch"
        aria-checked=${t}
        aria-label=${this.entityName}
        tabindex="0"
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${() => this.cancelHold()}
        @pointercancel=${() => this.cancelHold()}
        @pointerleave=${() => this.cancelHold()}
        @contextmenu=${(e) => e.preventDefault()}
      >
        ${this.renderIconWell(this.config.icon ?? e.attributes.icon ?? this.defaultIcon(), n, null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.stateText()}</div>
        </div>
      </div>`;
	}
};
In = zn, In.styles = [
	B,
	V,
	o`
      .card {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }
      .card:focus-visible {
        outline: 2px solid var(--lg-switch-accent);
        outline-offset: 2px;
      }
      /* The whole card is the control, so the title must not look separately clickable. */
      .title {
        cursor: inherit;
      }
    `
], customElements.get("liquid-glass-switch-card") || customElements.define("liquid-glass-switch-card", zn);
//#endregion
//#region src/cards/sensor-card.ts
var Bn, Vn = 340, Hn = 84, Un = 3e5, Wn = class extends z {
	constructor(...e) {
		super(...e), this.points = [], this.lastFetch = 0, this.fetchedFor = "";
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["sensor"], e, t, n, (e) => Number.isFinite(Number(e.state))) };
	}
	getCardSize() {
		return this.showGraph ? 4 : this.valueInCaption ? 1 : 2;
	}
	get accent() {
		return this.config.accent ?? "#FF9F0A";
	}
	get hours() {
		return this.config.hours_to_show ?? 24;
	}
	get valueInCaption() {
		return this.config.value_in_caption === !0;
	}
	get showGraph() {
		return this.config.graph !== !1 && !this.valueInCaption;
	}
	connectedCallback() {
		super.connectedCallback(), this.timer = window.setInterval(() => this.maybeFetch(!0), Un);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.timer && window.clearInterval(this.timer);
	}
	updated() {
		this.maybeFetch(!1);
	}
	maybeFetch(e) {
		if (!this.hass || !this.config?.entity) return;
		let t = `${this.config.entity}:${this.hours}`, n = Date.now() - this.lastFetch > Un;
		(e || t !== this.fetchedFor || n) && (this.fetchedFor = t, this.lastFetch = Date.now(), this.fetchHistory(this.hass, this.config.entity));
	}
	async fetchHistory(e, t) {
		let n = (/* @__PURE__ */ new Date(Date.now() - this.hours * 3600 * 1e3)).toISOString();
		try {
			let r = (await e.callApi("GET", `history/period/${n}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`))?.[0] ?? [], i = [];
			for (let e of r) {
				let t = Number(e.state ?? e.s), n = e.last_changed ?? e.last_updated, r = n ? new Date(n).getTime() : (e.lu ?? 0) * 1e3;
				Number.isFinite(t) && r && i.push({
					t: r,
					v: t
				});
			}
			let a = Number(e.states[t]?.state);
			Number.isFinite(a) && i.push({
				t: Date.now(),
				v: a
			}), this.points = i;
		} catch {
			this.points = [];
		}
	}
	trend() {
		if (this.config.trend === !1 || this.points.length < 2) return;
		let e = this.points[this.points.length - 1], t = e.t - 36e5, n = this.points[0];
		for (let e of this.points) if (e.t <= t) n = e;
		else break;
		return e.v - n.v;
	}
	sparkPath() {
		let e = this.points;
		if (e.length < 2) return;
		let t = e[0].t, n = e[e.length - 1].t, r = Infinity, i = -Infinity;
		for (let t of e) r = Math.min(r, t.v), i = Math.max(i, t.v);
		i - r < 1e-9 && (i += 1, --r);
		let a = e.map((e) => (e.t - t) / (n - t || 1) * 328), o = e.map((e) => 10 + (1 - (e.v - r) / (i - r)) * 64), s = `M ${a[0].toFixed(1)} ${o[0].toFixed(1)}`;
		for (let t = 0; t < e.length - 1; t++) {
			let n = a[Math.max(0, t - 1)], r = o[Math.max(0, t - 1)], i = a[t], c = o[t], l = a[t + 1], u = o[t + 1], d = a[Math.min(e.length - 1, t + 2)], f = o[Math.min(e.length - 1, t + 2)], p = i + (l - n) / 6, m = c + (u - r) / 6, h = l - (d - i) / 6, g = u - (f - c) / 6;
			s += ` C ${p.toFixed(1)} ${m.toFixed(1)}, ${h.toFixed(1)} ${g.toFixed(1)}, ${l.toFixed(1)} ${u.toFixed(1)}`;
		}
		let c = a[a.length - 1], l = `${s} L ${c.toFixed(1)} ${Hn} L ${a[0].toFixed(1)} ${Hn} Z`;
		return {
			line: s,
			area: l,
			last: [c, o[o.length - 1]]
		};
	}
	formattedValue() {
		let e = this.entity, t = Number(e.state);
		return Number.isFinite(t) ? D(this.hass, t, this.config.decimals) : e.state;
	}
	withUnit(e, t) {
		return t ? /^[°%]/.test(t) ? `${e}${t}` : `${e} ${t}` : e;
	}
	subtitle(e) {
		let t = this.t, n = e ? [e] : [];
		if (n.push(t("updated_ago", { t: T(this.entity?.last_updated, t) })), this.config.secondary_entity) {
			let e = this.hass?.states[this.config.secondary_entity];
			if (e && !O(e)) {
				let t = this.config.secondary_label ?? e.attributes.friendly_name ?? "";
				n.push(`${t} ${e.state}${e.attributes.unit_of_measurement ?? ""}`.trim());
			}
		}
		return n.join(" · ");
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.t, n = this.accent, r = Number(e.state), i = Number.isFinite(r), a = this.config.decimals, o = e.attributes.unit_of_measurement ?? "", s = i ? this.trend() : void 0, c = this.showGraph ? this.sparkPath() : void 0, l = this.points.map((e) => e.v), u = l.length ? Math.min(...l) : void 0, d = l.length ? Math.max(...l) : void 0, f = this.config.icon ?? e.attributes.icon ?? (e.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer"), p = (s ?? 0) >= 0, m = o === "°C" || o === "°F" ? "°" : o.length <= 3 ? o : "", h = this.valueInCaption, g = h, _ = this.subtitle(g ? this.withUnit(this.formattedValue(), o) : void 0), ee = y`
      ${this.renderIconWell(f, {
			from: it(n),
			to: n,
			glow: M(n, .24)
		})}
      ${this.renderTitle(this.entityName, _)}
      ${s === void 0 ? x : y`<div
            class="badge trend"
            style=${P({
			"--badge-color": p ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
			"--badge-bg": p ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
			"--badge-stroke": p ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)"
		})}
          >
            <lg-icon .icon=${p ? "mdi:trending-up" : "mdi:trending-down"}></lg-icon>
            <span>${p ? "+" : "−"}${D(this.hass, Math.abs(s), 1)}${m}</span>
          </div>`}`;
		return y`${this.renderDefs()}
      <div class=${N({
			glass: !0,
			card: !0,
			row: h
		})} style=${P({ "--accent": n })}>
        ${h ? ee : y`<div class="header">${ee}</div>`}

        ${g ? x : y`<div class="value-row">
              <div class="value">
                <span class="number">${i ? D(this.hass, r, a) : e.state}</span>
                ${o ? y`<span class="unit">${o}</span>` : x}
              </div>
              ${this.showGraph && u !== void 0 && d !== void 0 ? y`<div class="range">
                    <span class="caption">${this.hours === 24 ? t("hours_24") : `${this.hours} h`}</span>
                    <span class="rv">${D(this.hass, u, a ?? 1)} – ${D(this.hass, d, a ?? 1)} ${o}</span>
                  </div>` : x}
            </div>`}

        ${this.showGraph ? y`<svg class="spark" viewBox="0 0 ${Vn} ${Hn}" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color=${n} stop-opacity="0.4" />
                    <stop offset="1" stop-color=${n} stop-opacity="0" />
                  </linearGradient>
                </defs>
                ${c ? Oe`<path d=${c.area} fill="url(#area)" />
                        <path class="line" d=${c.line} />
                        <circle class="dot" cx=${c.last[0]} cy=${c.last[1]} r="4.75" />` : x}
              </svg>
              <div class=${N({ axis: !0 })}>
                <span>${t("hours_ago", { n: this.hours })}</span>
                <span>${t("hours_ago", { n: Math.round(this.hours / 2) })}</span>
                <span>${t("now")}</span>
              </div>` : x}
      </div>`;
	}
};
Bn = Wn, Bn.styles = [
	B,
	V,
	o`
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
        height: var(--lg-spark, ${Hn}px);
        overflow: visible;
        display: block;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-value: clamp(26px, 13.5cqi, 52px);
          --lg-value-unit: clamp(13px, 5.8cqi, 22px);
          --lg-spark: clamp(52px, 22cqi, ${Hn}px);
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
    `
], I([w()], Wn.prototype, "points", void 0), customElements.get("liquid-glass-sensor-card") || customElements.define("liquid-glass-sensor-card", Wn);
//#endregion
//#region src/cards/binary-sensor-card.ts
var Gn, Kn = class extends z {
	static getStubConfig(e, t, n) {
		return { entity: A(["binary_sensor"], e, t, n) };
	}
	getCardSize() {
		return 1;
	}
	meta() {
		let e = this.t, t = this.entity?.attributes.device_class, n = {
			iconOn: "mdi:checkbox-marked-circle",
			iconOff: "mdi:checkbox-blank-circle-outline",
			badgeOn: e("on"),
			badgeOff: e("off"),
			stateOn: e("on"),
			stateOff: e("off"),
			accent: "#FF9F0A",
			accentLight: "#FFC96B"
		};
		switch (t) {
			case "door":
			case "garage_door":
			case "opening": return {
				...n,
				iconOn: "mdi:door-open",
				iconOff: "mdi:door-closed",
				badgeOn: e("open"),
				badgeOff: e("closed"),
				stateOn: e("is_open"),
				stateOff: e("is_closed")
			};
			case "window": return {
				...n,
				iconOn: "mdi:window-open-variant",
				iconOff: "mdi:window-closed-variant",
				badgeOn: e("open"),
				badgeOff: e("closed"),
				stateOn: e("is_open"),
				stateOff: e("is_closed")
			};
			case "motion":
			case "occupancy":
			case "presence": return {
				...n,
				iconOn: "mdi:motion-sensor",
				iconOff: "mdi:motion-sensor-off",
				badgeOn: e("detected"),
				badgeOff: e("clear"),
				stateOn: e("detecting"),
				stateOff: e("clear"),
				accent: "#7C3AED",
				accentLight: "#B48CFF"
			};
			case "moisture": return {
				...n,
				iconOn: "mdi:water-alert",
				iconOff: "mdi:water-off",
				badgeOn: e("detected"),
				badgeOff: e("clear"),
				stateOn: e("detecting"),
				stateOff: e("clear"),
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
				badgeOn: e("detected"),
				badgeOff: e("clear"),
				stateOn: e("detecting"),
				stateOff: e("clear"),
				accent: "#FF3B30",
				accentLight: "#FF8A80"
			};
			case "vibration":
			case "sound": return {
				...n,
				iconOn: "mdi:vibrate",
				iconOff: "mdi:vibrate-off",
				badgeOn: e("detected"),
				badgeOff: e("clear"),
				stateOn: e("detecting"),
				stateOff: e("clear"),
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
				badgeOn: e("unlocked"),
				badgeOff: e("locked"),
				stateOn: e("is_unlocked"),
				stateOff: e("is_locked"),
				accent: "#FF3B30",
				accentLight: "#FF8A80"
			};
			default: return n;
		}
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = e.state === "on", n = this.meta(), r = this.config.accent ?? n.accent, i = this.config.accent ? it(this.config.accent) : n.accentLight, a = this.t, o = T(e.last_changed, a), s = t ? this.config.icon_on ?? this.config.icon ?? e.attributes.icon ?? n.iconOn : this.config.icon_off ?? this.config.icon ?? e.attributes.icon ?? n.iconOff, c = t ? {
			from: i,
			to: r,
			glow: M(r, .24)
		} : void 0, l = t ? {
			color: r === "#7C3AED" ? "#A66BFF" : r,
			bg: M(r, .18),
			stroke: M(r, .3)
		} : void 0, u = t ? `${n.stateOn} · ${a("since", { t: o })}` : `${n.stateOff} · ${a("last_change", { t: o })}`;
		return y`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderIconWell(s, c)}
        ${this.renderTitle(this.entityName, u)}
        ${this.renderBadge(t ? this.config.label_on ?? n.badgeOn : this.config.label_off ?? n.badgeOff, l)}
      </div>`;
	}
};
Gn = Kn, Gn.styles = [
	B,
	V,
	o``
], customElements.get("liquid-glass-binary-sensor-card") || customElements.define("liquid-glass-binary-sensor-card", Kn);
//#endregion
//#region src/cards/lock-card.ts
var qn, Jn = 64, Yn = 0, Xn = class extends z {
	constructor(...e) {
		super(...e), this.pending = !1, this.onDown = (e) => {
			this.jammed || this.busy || e.button !== 0 || (e.preventDefault(), e.currentTarget.setPointerCapture(e.pointerId), this.dragRatio = this.ratioFromEvent(e));
		}, this.onMove = (e) => {
			this.dragRatio !== void 0 && (this.dragRatio = this.ratioFromEvent(e));
		}, this.onUp = (e) => {
			if (this.dragRatio === void 0) return;
			let t = this.ratioFromEvent(e);
			this.dragRatio = void 0, this.isLocked && t >= .8 ? this.trigger("unlock") : !this.isLocked && t <= .2 && this.trigger("lock");
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["lock"], e, t, n) };
	}
	getCardSize() {
		return 2;
	}
	get lockState() {
		return this.entity?.state ?? "unknown";
	}
	get isLocked() {
		return this.lockState === "locked" || this.lockState === "locking";
	}
	get busy() {
		return this.pending || this.lockState === "locking" || this.lockState === "unlocking";
	}
	get jammed() {
		return this.lockState === "jammed";
	}
	visual() {
		let e = this.t, t = this.entity, n = T(t.last_changed, e);
		return this.jammed ? {
			icon: "mdi:alert",
			well: {
				from: "#FFE66B",
				to: "var(--lg-warn-deep)",
				glow: "rgba(255,214,10,0.24)"
			},
			badge: {
				color: "var(--lg-warn-text)",
				bg: "rgba(255,214,10,0.24)",
				stroke: "rgba(230,168,0,0.3)",
				glow: "var(--lg-warn)"
			},
			badgeLabel: e("jammed"),
			thumbColor: "var(--lg-warn-text)",
			hint: e("cannot_operate"),
			state: e("jammed_state")
		} : this.isLocked ? {
			icon: "mdi:lock",
			well: {
				from: "#7EE8A0",
				to: "var(--lg-lock-locked-deep)",
				glow: "rgba(48,209,88,0.24)"
			},
			badge: {
				color: "var(--lg-lock-locked-deep)",
				bg: "rgba(30,158,74,0.18)",
				stroke: "rgba(30,158,74,0.3)"
			},
			badgeLabel: e("locked"),
			thumbColor: "var(--lg-lock-locked-deep)",
			hint: e("slide_to_unlock"),
			state: this.lockState === "locking" ? e("locking") : `${e("is_locked")} · ${e("auto_locked_at", { t: Qe(t.last_changed) })}`
		} : {
			icon: "mdi:lock-open-variant",
			well: {
				from: "var(--lg-lock-unlocked)",
				to: "var(--lg-lock-unlocked-deep)",
				glow: "rgba(255,59,48,0.24)"
			},
			badge: {
				color: "var(--lg-lock-unlocked-deep)",
				bg: "rgba(255,59,48,0.18)",
				stroke: "rgba(255,59,48,0.3)"
			},
			badgeLabel: e("unlocked"),
			thumbColor: "var(--lg-lock-unlocked-deep)",
			hint: e("slide_to_lock"),
			state: this.lockState === "unlocking" ? e("unlocking") : `${e("is_unlocked")} · ${n}`
		};
	}
	ratioFromEvent(e) {
		let t = this.shadowRoot?.querySelector(".slide");
		if (!t) return 0;
		let n = t.getBoundingClientRect(), r = this.shadowRoot?.querySelector(".thumb")?.offsetWidth || Jn, i = n.width - 0 - r;
		return i <= 0 ? 0 : E((e.clientX - n.left - Yn - r / 2) / i, 0, 1);
	}
	trigger(e) {
		this.pending = !0, this.callService("lock", e), window.setTimeout(() => this.pending = !1, 4e3);
	}
	runButton(e) {
		let [t, n] = e.service.split(".");
		this.hass?.callService(t, n, {
			entity_id: this.config.entity,
			...e.data ?? {}
		});
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.visual(), n = this.isLocked, r = this.dragRatio !== void 0, i = r ? this.dragRatio : +!n, a = r ? 1 - Math.abs(i - +!n) * 1.6 : 1, o = this.config.buttons ?? [];
		return y`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? t.icon, t.well)}
          ${this.renderTitle(this.entityName, t.state)}
          ${this.renderBadge(t.badgeLabel, t.badge)}
        </div>

        <div
          class=${N({
			slide: !0,
			disabled: this.jammed || this.busy
		})}
          @pointerdown=${this.onDown}
          @pointermove=${this.onMove}
          @pointerup=${this.onUp}
          @pointercancel=${this.onUp}
        >
          <div class="hint" style=${P({ opacity: String(E(a, 0, 1)) })}>
            ${!n && !this.jammed ? y`<lg-icon icon="mdi:chevron-double-left"></lg-icon>` : x}
            <span>${t.hint}</span>
            ${n && !this.jammed ? y`<lg-icon icon="mdi:chevron-double-right"></lg-icon>` : x}
          </div>
          <div
            class=${N({
			thumb: !0,
			dragging: r
		})}
            style=${P({
			left: `calc(${Yn}px + (100% - 0px - var(--thumb)) * ${i})`,
			"--thumb-color": t.thumbColor
		})}
          >
            ${this.renderControlSurface()}
            <lg-icon .icon=${t.icon}></lg-icon>
          </div>
        </div>

        ${o.length ? y`<div class="chips">
              ${o.map((e) => y`<button class="chip" @click=${() => this.runButton(e)}>
                  ${this.renderControlSurface(void 0, "pill")}
                  ${e.icon ? y`<lg-icon .icon=${e.icon}></lg-icon>` : x}<span>${e.name}</span>
                </button>`)}
            </div>` : x}
      </div>`;
	}
};
qn = Xn, qn.styles = [
	B,
	V,
	o`
      .card {
        gap: 16px;
      }
      .slide {
        --thumb: ${Jn}px;
        position: relative;
        height: calc(var(--thumb) + ${0}px);
        border-radius: 999px;
        padding: ${Yn}px;
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.14),
          inset 0 0 0 1px var(--lg-glass-stroke);
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
      }
      .slide.disabled {
        opacity: 0.55;
        pointer-events: none;
      }
      .hint {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        /* The thumb parks at either end, so keep that much clear on both sides. */
        padding: 0 var(--thumb);
        font-size: var(--lg-hint, 14px);
        font-weight: 500;
        color: var(--lg-text-secondary);
        pointer-events: none;
        transition: opacity 0.15s ease;
        white-space: nowrap;
      }
      .hint > span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .hint lg-icon {
        flex: none;
        --mdc-icon-size: 18px;
      }
      /* The arrow is decoration; the words matter more once space runs out. */
      @container (max-width: 300px) {
        .hint lg-icon {
          display: none;
        }
      }
      .thumb {
        position: absolute;
        top: ${Yn}px;
        width: var(--thumb);
        height: var(--thumb);
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: grab;
        background: rgba(255, 255, 255, 0.56);
        -webkit-backdrop-filter: blur(12px) saturate(1.35);
        backdrop-filter: blur(12px) saturate(1.35);
        box-shadow:
          0 5px 14px rgba(0, 0, 0, 0.6),
          0 1px 3px rgba(255, 255, 255, 0.4),
          inset 0 0 0 1.5px #fff;
        transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        --mdc-icon-size: calc(var(--thumb) * 0.43);
      }
      :host([refraction]) .thumb {
        -webkit-backdrop-filter: url(#lg-slider-knob);
        backdrop-filter: url(#lg-slider-knob);
      }
      .thumb:has(> .lg-control-shader) {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        box-shadow: 0 5px 14px rgba(0, 0, 0, 0.38);
      }
      .thumb > lg-icon {
        position: relative;
        z-index: 1;
      }
      .thumb.dragging {
        transition: none;
        cursor: grabbing;
      }
      .thumb lg-icon {
        color: var(--thumb-color);
      }
      .chips .chip {
        flex: 1;
        justify-content: center;
        padding: 12px 10px;
        font-size: var(--lg-label);
        font-weight: 600;
        border-radius: 22px;
      }
      .chips .chip lg-icon {
        --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
        width: clamp(15px, 4.7cqi, 18px);
        height: clamp(15px, 4.7cqi, 18px);
      }
      @supports (container-type: inline-size) {
        .slide {
          --thumb: clamp(40px, 16.8cqi, ${Jn}px);
        }
        .card {
          --lg-hint: clamp(11.5px, 3.7cqi, 14px);
        }
      }
    `
], I([w()], Xn.prototype, "dragRatio", void 0), I([w()], Xn.prototype, "pending", void 0), customElements.get("liquid-glass-lock-card") || customElements.define("liquid-glass-lock-card", Xn);
//#endregion
//#region src/cards/cover-card.ts
var Zn, Qn = {
	OPEN: 1,
	CLOSE: 2,
	SET_POSITION: 4,
	STOP: 8,
	SET_TILT: 128
}, $n = 180, er = class extends z {
	constructor(...e) {
		super(...e), this.dragSide = "left", this.onDown = (e) => {
			if (!this.canSetPosition || e.button !== 0) return;
			e.preventDefault();
			let t = e.currentTarget;
			t.setPointerCapture(e.pointerId);
			let n = t.getBoundingClientRect();
			this.dragSide = e.clientX < n.left + n.width / 2 ? "left" : "right", this.dragPos = this.posFromEvent(e);
		}, this.onMove = (e) => {
			this.dragPos !== void 0 && (this.dragPos = this.posFromEvent(e));
		}, this.onUp = (e) => {
			if (this.dragPos === void 0) return;
			let t = this.posFromEvent(e);
			this.dragPos = void 0, this.callService("cover", "set_cover_position", { position: t });
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["cover"], e, t, n, (e) => !!((e.attributes.supported_features ?? 0) & Qn.SET_POSITION)) };
	}
	getCardSize() {
		return 4;
	}
	get position() {
		if (this.dragPos !== void 0) return this.dragPos;
		let e = this.entity?.attributes.current_position;
		return e === void 0 ? this.entity?.state === "closed" ? 0 : 100 : e;
	}
	get styleKind() {
		return this.config.style ? this.config.style : this.entity?.attributes.device_class === "curtain" ? "curtain" : "blind";
	}
	get curtainKind() {
		return this.config.curtain ?? "double";
	}
	get moving() {
		let e = this.entity?.state;
		return e === "opening" || e === "closing" ? e : void 0;
	}
	get canSetPosition() {
		return k(this.entity, Qn.SET_POSITION);
	}
	get hasTilt() {
		return this.config.show_tilt !== !1 && k(this.entity, Qn.SET_TILT) && this.entity?.attributes.current_tilt_position !== void 0;
	}
	stateText() {
		let e = this.t, t = this.entity, n = this.position;
		return this.moving ? `${e(this.moving)} · ${n}% → ${this.moving === "opening" ? 100 : 0}%` : t.state === "closed" || n === 0 ? `${e("is_closed")} · ${e("last_change", { t: Qe(t.last_changed) })}` : `${e("position")} ${n}% · ${e("stopped")}`;
	}
	posFromEvent(e) {
		let t = this.shadowRoot?.querySelector(".track");
		if (!t) return this.position;
		let n = t.getBoundingClientRect(), r;
		return r = this.styleKind === "blind" ? (e.clientY - n.top) / n.height : this.curtainKind === "single" ? (e.clientX - n.left) / n.width : 2 * (this.dragSide === "right" ? n.right - e.clientX : e.clientX - n.left) / n.width, Math.round(E(1 - r, 0, 1) * 100);
	}
	renderTrackVisual(e) {
		let t = 1 - e / 100;
		if (this.styleKind === "blind") {
			let n = `${t * 100}%`;
			return y`<div class="fabric" style=${P({ height: n })}>
          ${[
				0,
				1,
				2,
				3,
				4
			].map(() => y`<span></span>`)}
        </div>
        ${e > 0 ? y`<div class="handle h" style=${P({ top: `max(4px, calc(${n} - 13px))` })}></div>` : x}`;
		}
		if (this.curtainKind === "single") return y`<div class="panel left" style=${P({ width: `${t * 100}%` })}>
          ${[
			0,
			1,
			2
		].map(() => y`<span></span>`)}
        </div>
        <div class="handle v" style=${P({ left: `calc(${t * 100}% - 13px)` })}></div>`;
		let n = `${t * 100 / 2}%`;
		return y`<div class="panel left" style=${P({ width: n })}>${[
			0,
			1,
			2
		].map(() => y`<span></span>`)}</div>
      <div class="panel right" style=${P({ width: n })}>${[
			0,
			1,
			2
		].map(() => y`<span></span>`)}</div>
      <div class="handle v" style=${P({ left: `calc(${n} - 13px)` })}></div>
      <div class="handle v" style=${P({ right: `calc(${n} - 13px)` })}></div>`;
	}
	buttonIcons() {
		return this.styleKind === "curtain" ? this.curtainKind === "double" ? ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"] : ["mdi:chevron-double-left", "mdi:chevron-double-right"] : ["mdi:chevron-up", "mdi:chevron-down"];
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = this.t, n = this.position, r = n === 0 && !this.moving, i = this.moving, a = this.styleKind === "curtain", [o, s] = this.buttonIcons(), c = r ? void 0 : {
			from: "#8FE3F4",
			to: "var(--lg-cover-accent-deep)",
			glow: "rgba(43,179,208,0.24)"
		}, l = r ? void 0 : {
			color: "var(--lg-cover-badge)",
			bg: "rgba(43,179,208,0.18)",
			stroke: "rgba(43,179,208,0.3)"
		}, u = t(i ? "moving" : r ? "closed" : "open"), d = this.config.icon ?? e.attributes.icon ?? (a ? "mdi:curtains" : "mdi:blinds-horizontal"), f = i ? `${t(i)}…` : t(r ? "is_closed" : "is_open"), p = a && this.curtainKind === "single", m = r || !a && i === "opening" && n < 60, h = !a && i === "opening" && n < 60 && !r, g = this.tiltPreview ?? e.attributes.current_tilt_position ?? 50, _ = Math.round(g / 100 * 180 - 90);
		return y`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(d, c)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(u, l)}
        </div>

        <div class="position-row">
          <div class="track" @pointerdown=${this.onDown} @pointermove=${this.onMove} @pointerup=${this.onUp} @pointercancel=${this.onUp}>
            ${this.renderTrackVisual(n)}
            <div
              class=${N({
			overlay: !0,
			center: a && !p,
			right: p,
			top: h
		})}
              style=${P(m ? {
			"--pv-color": "#0B3A46",
			"--pc-color": "rgba(11,58,70,0.7)"
		} : {})}
            >
              <span class="pv">${n}%</span>
              <span class="pc">${f}</span>
            </div>
          </div>
          <div class="buttons">
            <button class=${N({
			"round-btn": !0,
			active: i === "opening"
		})} @click=${() => this.callService("cover", "open_cover")} title="Open">
              <lg-icon .icon=${o}></lg-icon>
            </button>
            <button class=${N({
			"round-btn": !0,
			stop: !0,
			selected: !!i
		})} @click=${() => this.callService("cover", "stop_cover")} title="Stop">
              <lg-icon icon="mdi:square-outline"></lg-icon>
            </button>
            <button class=${N({
			"round-btn": !0,
			active: i === "closing"
		})} @click=${() => this.callService("cover", "close_cover")} title="Close">
              <lg-icon .icon=${s}></lg-icon>
            </button>
          </div>
        </div>

        ${this.hasTilt ? y`<div class="section tilt">
              <div class="label-row"><span class="label">${t("tilt")}</span><span class="value">${_}°</span></div>
              <lg-slider
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${[
			"#72d4ef",
			"#dce5ec",
			"#79d6e8",
			"#33515b"
		]}
                .value=${g}
                min="0"
                max="100"
                step="1"
                .fillFrom=${.5}
                .showFill=${!r}
                @lg-input=${(e) => this.tiltPreview = e.detail.value}
                @lg-change=${(e) => {
			this.tiltPreview = void 0, this.callService("cover", "set_cover_tilt_position", { tilt_position: Math.round(e.detail.value) });
		}}
              ></lg-slider>
              <div class="ticks"><span>−90°</span><span>0°</span><span>90°</span></div>
            </div>` : x}
      </div>`;
	}
};
Zn = er, Zn.styles = [
	B,
	V,
	o`
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
        height: var(--lg-track-h, ${$n}px);
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
          --lg-track-h: clamp(120px, 47cqi, ${$n}px);
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
      .tilt lg-slider {
        --lg-slider-fill: linear-gradient(90deg, rgba(43, 179, 208, 0.2), rgba(43, 179, 208, 0.65));
      }
    `
], I([w()], er.prototype, "dragPos", void 0), I([w()], er.prototype, "tiltPreview", void 0), customElements.get("liquid-glass-cover-card") || customElements.define("liquid-glass-cover-card", er);
//#endregion
//#region src/cards/media-card.ts
var tr, nr = {
	PAUSE: 1,
	SEEK: 2,
	VOLUME_SET: 4,
	PREVIOUS: 16,
	NEXT: 32,
	PLAY: 16384,
	SHUFFLE: 32768,
	REPEAT: 262144
};
function rr(e) {
	let t = Math.max(0, Math.round(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
var ir = class extends z {
	constructor(...e) {
		super(...e), this.tick = 0, this.playPause = () => {
			(this.playState !== "idle" || k(this.entity, nr.PLAY)) && this.callService("media_player", "media_play_pause");
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["media_player"], e, t, n) };
	}
	getCardSize() {
		return 4;
	}
	connectedCallback() {
		super.connectedCallback(), this.timer = window.setInterval(() => {
			this.entity?.state === "playing" && this.tick++;
		}, 1e3);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.timer && window.clearInterval(this.timer);
	}
	get playState() {
		let e = this.entity?.state;
		return e === "playing" || e === "buffering" ? "playing" : e === "paused" ? "paused" : "idle";
	}
	position() {
		let e = this.entity?.attributes ?? {}, t = e.media_duration, n = e.media_position;
		if (t && n !== void 0) return this.playState === "playing" && e.media_position_updated_at && (n += (Date.now() - new Date(e.media_position_updated_at).getTime()) / 1e3), this.tick, {
			pos: E(n, 0, t),
			duration: t
		};
	}
	render() {
		let e = this.entity;
		if (!e || O(e)) return this.renderUnavailable();
		let t = e.attributes, n = this.t, r = this.playState, i = r === "idle", a = this.config.source_color ?? "#FF375F", o = i ? void 0 : t.entity_picture, s = i ? n("not_playing") : t.media_title ?? e.attributes.friendly_name ?? "", c = [t.media_artist, t.media_album_name].filter(Boolean), l = i ? n("standby") : c.join(" — ") || (t.source ?? ""), u = t.app_name ?? t.source, d = this.position(), f = this.seekPreview ?? (d ? d.pos / d.duration : 0), p = d ? this.seekPreview === void 0 ? d.pos : this.seekPreview * d.duration : 0, m = d ? d.duration - p : 0, h = this.volumePreview ?? t.volume_level ?? .5, g = !!t.shuffle, _ = t.repeat ?? "off", ee = k(e, nr.SEEK) && !!d && !i, te = this.config.show_volume !== !1 && k(e, nr.VOLUME_SET), ne = this.config.show_device !== !1;
		return y`${this.renderDefs()}
      <div class="glass card" style=${P({ "--source-color": a })}>
        ${ne ? y`<div class="device" @click=${this.openMoreInfo}><lg-icon icon="mdi:speaker"></lg-icon><span>${this.entityName}</span></div>` : x}

        <div class="header">
          <div class=${N({
			art: !0,
			idle: !o
		})} style=${o ? P({ backgroundImage: `url("${o}")` }) : x} @click=${this.openMoreInfo}>
            ${o ? x : y`<lg-icon icon="mdi:music"></lg-icon>`}
          </div>
          <div class="title" @click=${this.openMoreInfo}>
            <div class="name">${s}</div>
            <div class="state">${l}</div>
            ${r === "paused" ? y`<div class="source muted-text"><lg-icon icon="mdi:pause"></lg-icon><span>${n("paused")}</span></div>` : !i && u ? y`<div class="source"><lg-icon icon="mdi:waveform"></lg-icon><span>${u}</span></div>` : x}
          </div>
          <button class="more" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:dots-horizontal"></lg-icon></button>
        </div>

        <div class=${N({
			progress: !0,
			dim: i
		})}>
          <lg-slider
            variant="thin"
            .value=${i ? .003 : f}
            min="0"
            max="1"
            .disabled=${!ee}
            @lg-input=${(e) => this.seekPreview = e.detail.value}
            @lg-change=${(e) => {
			this.seekPreview = void 0, d && this.callService("media_player", "media_seek", { seek_position: Math.round(e.detail.value * d.duration) });
		}}
          ></lg-slider>
          <div class="times"><span>${d ? rr(p) : "0:00"}</span><span>−${d ? rr(m) : "0:00"}</span></div>
        </div>

        <div class="transport">
          <button class=${N({
			aux: !0,
			on: g,
			fade: i
		})} ?disabled=${!k(e, nr.SHUFFLE)} @click=${() => this.callService("media_player", "shuffle_set", { shuffle: !g })} title="Shuffle">
            <lg-icon icon="mdi:shuffle-variant"></lg-icon>
          </button>
          <button class=${N({
			skip: !0,
			fade: i
		})} ?disabled=${!k(e, nr.PREVIOUS)} @click=${() => this.callService("media_player", "media_previous_track")} title="Previous">
            <lg-icon icon="mdi:skip-previous-outline"></lg-icon>
          </button>
          <button class=${N({ play: !0 })} @click=${this.playPause} title="Play / Pause" style=${i ? "color: var(--lg-text-secondary)" : ""}>
            ${this.renderControlSurface()}
            <lg-icon .icon=${r === "playing" ? "mdi:pause" : "mdi:play-outline"}></lg-icon>
          </button>
          <button class=${N({
			skip: !0,
			fade: i
		})} ?disabled=${!k(e, nr.NEXT)} @click=${() => this.callService("media_player", "media_next_track")} title="Next">
            <lg-icon icon="mdi:skip-next-outline"></lg-icon>
          </button>
          <button class=${N({
			aux: !0,
			on: _ !== "off",
			fade: i
		})} ?disabled=${!k(e, nr.REPEAT)} @click=${() => this.callService("media_player", "repeat_set", { repeat: _ === "off" ? "all" : _ === "all" ? "one" : "off" })} title="Repeat">
            <lg-icon .icon=${_ === "one" ? "mdi:repeat-once" : "mdi:repeat"}></lg-icon>
          </button>
        </div>

        ${te ? y`<div class=${N({
			volume: !0,
			muted: i
		})}>
              <lg-icon icon="mdi:volume-low"></lg-icon>
              <lg-slider
                variant="thin"
                .refraction=${this.refraction}
                .shaderPalette=${[
			"#f2f2f5",
			"#f2f2f5",
			this.isDark ? "#44424c" : "#d8d6dc",
			this.isDark ? "#44424c" : "#d8d6dc"
		]}
                .showThumb=${!0}
                .value=${h}
                min="0"
                max="1"
                step="0.01"
                @lg-input=${(e) => this.volumePreview = e.detail.value}
                @lg-change=${(e) => {
			this.volumePreview = void 0, this.callService("media_player", "volume_set", { volume_level: Math.round(e.detail.value * 100) / 100 });
		}}
              ></lg-slider>
              <lg-icon icon="mdi:volume-high"></lg-icon>
            </div>` : x}
      </div>`;
	}
};
tr = ir, tr.styles = [
	B,
	V,
	o`
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
      .more {
        flex: none;
        width: 36px;
        height: 36px;
        border: 0;
        border-radius: 18px;
        padding: 0;
        display: grid;
        place-items: center;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        cursor: pointer;
        --mdc-icon-size: 18px;
      }
      .progress {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .progress lg-slider {
        --lg-slider-height: 7px;
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
        --mdc-icon-size: 20px;
      }
      .transport .aux.on {
        color: var(--source-color);
      }
      .transport .aux {
        --mdc-icon-size: var(--lg-aux, 20px);
      }
      .transport .skip {
        --mdc-icon-size: var(--lg-skip, 32px);
      }
      .play {
        flex: none;
        width: var(--lg-play, 68px);
        height: var(--lg-play, 68px);
        border-radius: 50%;
        --mdc-icon-size: calc(var(--lg-play, 68px) * 0.44);
        background: rgba(255, 255, 255, 0.26);
        -webkit-backdrop-filter: blur(4px) saturate(1.35);
        backdrop-filter: blur(4px) saturate(1.35);
        box-shadow:
          0 6px 16px rgba(0, 0, 0, 0.25),
          inset 0 0 0 1.5px rgba(255, 255, 255, 0.85),
          inset 0 10px 14px -8px rgba(255, 255, 255, 0.9),
          inset 0 -8px 12px -8px rgba(0, 0, 0, 0.12);
      }
      :host([refraction]) .play {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
      }
      .play:has(> .lg-control-shader) {
        position: relative;
        overflow: hidden;
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      .play > lg-icon {
        position: relative;
        z-index: 1;
      }
      .volume {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--lg-text-secondary);
        --mdc-icon-size: 20px;
      }
      .volume lg-slider {
        flex: 1;
        --lg-slider-height: 20px;
      }
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
    `
], I([w()], ir.prototype, "tick", void 0), I([w()], ir.prototype, "seekPreview", void 0), I([w()], ir.prototype, "volumePreview", void 0), customElements.get("liquid-glass-media-card") || customElements.define("liquid-glass-media-card", ir);
//#endregion
//#region src/cards/weather-card.ts
var ar, or = {
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
}, sr = {
	icon: "mdi:weather-cloudy",
	color: "#A0AEC0"
}, cr = 9e5, lr = class extends z {
	constructor(...e) {
		super(...e), this.daily = [], this.hourly = [], this.lastFetch = 0, this.fetchedFor = "";
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["weather"], e, t, n) };
	}
	get isRow() {
		return this.config?.layout === "row";
	}
	getCardSize() {
		if (this.isRow) return 1;
		let e = 3;
		return this.config?.show_hourly !== !1 && (e += 1), this.config?.show_daily !== !1 && (e += 2), this.config?.show_metrics !== !1 && (e += 1), e;
	}
	connectedCallback() {
		super.connectedCallback(), this.timer = window.setInterval(() => this.maybeFetch(!0), cr);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.timer && window.clearInterval(this.timer);
	}
	updated() {
		this.maybeFetch(!1);
	}
	maybeFetch(e) {
		if (!this.hass || !this.config?.entity) return;
		let t = Date.now() - this.lastFetch > cr;
		(e || this.config.entity !== this.fetchedFor || t) && (this.fetchedFor = this.config.entity, this.lastFetch = Date.now(), this.fetchForecasts(this.hass, this.config.entity));
	}
	async fetchForecasts(e, t) {
		let n = ["daily"];
		!this.isRow && this.config.show_hourly !== !1 && n.push("hourly");
		for (let r of n) {
			let n = [];
			try {
				n = ((await e.callService("weather", "get_forecasts", { type: r }, { entity_id: t }, !1, !0))?.response ?? {})[t]?.forecast ?? [];
			} catch {
				n = e.states[t]?.attributes.forecast ?? [];
			}
			r === "daily" ? this.daily = n : this.hourly = n;
		}
	}
	get isNight() {
		let e = this.hass?.states["sun.sun"];
		return e ? e.state === "below_horizon" : this.entity?.state === "clear-night";
	}
	look(e) {
		let t = or[e ?? ""] ?? sr;
		return this.isNight && t.night ? {
			...t,
			icon: t.night,
			color: "#9AB6FF"
		} : t;
	}
	conditionLabel(e) {
		return e ? this.t(`wx_${e}`) : "";
	}
	get locale() {
		return this.config.language ?? this.hass?.locale?.language ?? this.hass?.language ?? "en";
	}
	temp(e) {
		return e === void 0 ? "–" : `${D(this.hass, e, 0)}°`;
	}
	hourLabel(e, t) {
		if (t === 0) return this.t("wx_now");
		try {
			return new Intl.DateTimeFormat(this.locale, { hour: "numeric" }).format(new Date(e));
		} catch {
			return "";
		}
	}
	dayLabel(e, t) {
		if (t === 0) return this.t("wx_today");
		if (t === 1) return this.t("wx_tomorrow");
		try {
			return new Intl.DateTimeFormat(this.locale, { weekday: "short" }).format(new Date(e));
		} catch {
			return "";
		}
	}
	renderCurrent() {
		let e = this.entity, t = e.attributes, n = this.look(e.state), r = this.daily[0], i = r?.temperature, a = r?.templow;
		return y`<div class="current">
      <div class="now" @click=${this.openMoreInfo}>
        <div class="city">${this.entityName}</div>
        <div class="condition">${this.conditionLabel(e.state)}</div>
        <div class="temp-row">
          <span class="temp">${D(this.hass, t.temperature ?? 0, 0)}</span><span class="deg">°</span>
        </div>
        ${i !== void 0 || a !== void 0 ? y`<div class="hilo">
              ${i === void 0 ? x : y`<span class="hi">${this.t("wx_high")} ${this.temp(i)}</span>`}
              ${a === void 0 ? x : y`<span class="lo">${this.t("wx_low")} ${this.temp(a)}</span>`}
            </div>` : x}
      </div>
      <div class="big-icon" style=${P({
			"--wx-color": n.color,
			"--wx-glow": M(n.color, .4)
		})}>
        <lg-icon .icon=${this.config.icon ?? n.icon}></lg-icon>
      </div>
    </div>`;
	}
	renderHourly() {
		let e = E(this.config.hourly_count ?? 6, 2, 12), t = this.hourly.slice(0, e);
		return t.length ? y`<div class="hourly">
      ${t.map((e, t) => {
			let n = this.look(e.condition);
			return y`<div class=${N({
				hour: !0,
				now: t === 0
			})} style=${P({ "--wx-color": n.color })}>
          <span class="time">${this.hourLabel(e.datetime, t)}</span>
          <lg-icon .icon=${n.icon}></lg-icon>
          <span class="t">${this.temp(e.temperature)}</span>
        </div>`;
		})}
    </div>` : x;
	}
	renderDaily() {
		let e = E(this.config.daily_count ?? 4, 1, 10), t = this.daily.slice(0, e);
		if (!t.length) return x;
		let n = t.map((e) => e.templow ?? e.temperature).filter((e) => e !== void 0), r = t.map((e) => e.temperature).filter((e) => e !== void 0), i = Math.min(...n, ...r), a = Math.max(...n, ...r) - i || 1;
		return y`<div class="daily">
      ${t.map((e, t) => {
			let n = this.look(e.condition), r = e.templow ?? e.temperature, o = e.temperature, s = r === void 0 ? 0 : (r - i) / a * 100, c = r === void 0 || o === void 0 ? 100 : Math.max((o - r) / a * 100, 6);
			return y`<div class=${N({
				day: !0,
				today: t === 0
			})} style=${P({ "--wx-color": n.color })}>
          <span class="label">${this.dayLabel(e.datetime, t)}</span>
          <lg-icon .icon=${n.icon}></lg-icon>
          <span class="lo">${this.temp(r)}</span>
          <div class="bar"><span style=${P({
				left: `${s}%`,
				width: `${c}%`
			})}></span></div>
          <span class="hi">${this.temp(o)}</span>
        </div>`;
		})}
    </div>`;
	}
	renderMetrics() {
		let e = this.entity.attributes, t = this.t, n = e.humidity, r = e.wind_speed, i = e.wind_speed_unit ?? "", a = this.hourly[0]?.precipitation_probability ?? this.daily[0]?.precipitation_probability, o = this.hourly[0]?.precipitation ?? this.daily[0]?.precipitation, s = [
			n === void 0 ? void 0 : [
				"mdi:water-percent",
				t("humidity"),
				`${D(this.hass, n, 0)}%`
			],
			r === void 0 ? void 0 : [
				"mdi:weather-windy",
				t("wx_wind"),
				`${D(this.hass, r, 1)} ${i}`.trim()
			],
			a === void 0 ? o === void 0 ? void 0 : [
				"mdi:weather-rainy",
				t("wx_precip"),
				`${D(this.hass, o, 1)} mm`
			] : [
				"mdi:weather-rainy",
				t("wx_precip"),
				`${D(this.hass, a, 0)}%`
			]
		].filter((e) => e !== void 0);
		return s.length ? y`<div class="metrics">
      ${s.map(([e, t, n]) => y`<div class="metric">
          <div class="head"><lg-icon .icon=${e}></lg-icon><span>${t}</span></div>
          <div class="v">${n}</div>
        </div>`)}
    </div>` : x;
	}
	renderRow() {
		let e = this.entity, t = e.attributes, n = this.look(e.state), r = this.daily[0], i = [this.conditionLabel(e.state)];
		return r?.temperature !== void 0 && i.push(`${this.t("wx_high")} ${this.temp(r.temperature)}`), r?.templow !== void 0 && i.push(`${this.t("wx_low")} ${this.temp(r.templow)}`), y`${this.renderDefs()}
      <div class="glass card row">
        <div class="big-icon" style=${P({
			"--wx-color": n.color,
			"--wx-glow": M(n.color, .4)
		})}>
          <lg-icon .icon=${this.config.icon ?? n.icon}></lg-icon>
        </div>
        <div class="title" @click=${this.openMoreInfo}>
          <div class="name">${this.entityName}</div>
          <div class="state">${i.filter(Boolean).join(" · ")}</div>
        </div>
        <div class="temp-row">
          <span class="temp">${D(this.hass, t.temperature ?? 0, 0)}</span><span class="deg">°</span>
        </div>
      </div>`;
	}
	render() {
		let e = this.entity;
		return !e || O(e) ? this.renderUnavailable() : this.isRow ? this.renderRow() : y`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCurrent()}
        ${this.config.show_hourly === !1 ? x : this.renderHourly()}
        ${this.config.show_daily === !1 ? x : this.renderDaily()}
        ${this.config.show_metrics === !1 ? x : this.renderMetrics()}
      </div>`;
	}
};
ar = lr, ar.styles = [
	B,
	V,
	o`
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
    `
], I([w()], lr.prototype, "daily", void 0), I([w()], lr.prototype, "hourly", void 0), customElements.get("liquid-glass-weather-card") || customElements.define("liquid-glass-weather-card", lr);
//#endregion
//#region src/cards/scene-card.ts
var ur, dr = 900, fr = class extends z {
	static getStubConfig(e, t, n) {
		return { scenes: ([
			t,
			n,
			Object.keys(e?.states ?? {})
		].find((e) => e?.some((e) => e.startsWith("scene.")))?.filter((e) => e.startsWith("scene.")).slice(0, 6) ?? ["scene.example"]).map((e) => ({ entity: e })) };
	}
	getCardSize() {
		return 1 + Math.ceil(this.items.length / this.columns) * (this.config?.style === "chips" ? 1 : 2);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), window.clearTimeout(this.pressTimer);
	}
	get items() {
		return this.config.scenes ?? [];
	}
	get columns() {
		return E(Math.round(this.config.columns ?? 3), 1, 6);
	}
	label(e) {
		return e.name ? e.name : tt(e.entity ? this.hass?.states[e.entity] : void 0, e.entity ?? "");
	}
	iconFor(e) {
		return e.icon ? e.icon : (e.entity ? this.hass?.states[e.entity] : void 0)?.attributes.icon || (mn[e.entity?.split(".")[0] ?? ""]?.icon ?? "mdi:palette");
	}
	wellFor(e, t) {
		return pn(e.accent, U[t % U.length]);
	}
	activate(e, t) {
		let n = e.entity?.split(".")[0] ?? "", r = e.service ?? mn[n]?.service;
		if (r) {
			let [t, n] = r.split(".");
			this.hass?.callService(t, n, {
				...e.entity ? { entity_id: e.entity } : {},
				...e.service_data ?? {}
			});
		}
		this.pressed = t, window.clearTimeout(this.pressTimer), this.pressTimer = window.setTimeout(() => this.pressed = void 0, dr);
	}
	renderTile(e, t) {
		let n = this.wellFor(e, t);
		return y`<button
      class=${N({
			tile: !0,
			on: this.pressed === t
		})}
      style=${P({
			"--from": n.from,
			"--to": n.to,
			"--glow": n.glow,
			"--glow-strong": M(n.to, .6)
		})}
      @click=${() => this.activate(e, t)}
    >
      <span class="well"><lg-icon .icon=${this.iconFor(e)}></lg-icon></span>
      <span class="label">${this.label(e)}</span>
    </button>`;
	}
	renderChip(e, t) {
		return y`<button class=${N({
			chip: !0,
			on: this.pressed === t
		})} @click=${() => this.activate(e, t)}>
      ${this.renderControlSurface(void 0, "pill")}
      ${e.icon ? y`<lg-icon .icon=${e.icon}></lg-icon>` : x}<span>${this.label(e)}</span>
    </button>`;
	}
	render() {
		let e = this.items;
		if (!e.length) return this.renderUnavailable();
		let t = this.config.style === "chips", n = this.config.title;
		return y`${this.renderDefs()}
      <div class=${N({
			glass: !0,
			card: !0,
			chips: t
		})}>
        ${n || this.config.show_count ? y`<div class="head">
              <span class="heading">${n ?? ""}</span>
              ${this.config.show_count ? y`<span class="count">${this.t("scene_count", { n: e.length })}</span>` : x}
            </div>` : x}
        <div class="grid" style=${P({ "--cols": String(this.columns) })}>
          ${e.map((e, n) => t ? this.renderChip(e, n) : this.renderTile(e, n))}
        </div>
      </div>`;
	}
};
ur = fr, ur.styles = [
	B,
	V,
	o`
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
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
        color: var(--lg-text-primary);
        min-width: 0;
        transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.1s ease;
      }
      button:active {
        transform: scale(0.97);
      }
      button.on {
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
      button.on .well {
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

      .chip {
        height: var(--lg-chip-h, 42px);
        border-radius: 999px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        font-size: var(--lg-chip-label, 13px);
        font-weight: 600;
      }
      .chip span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .chip lg-icon {
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
    `
], I([w()], fr.prototype, "pressed", void 0), customElements.get("liquid-glass-scene-card") || customElements.define("liquid-glass-scene-card", fr);
//#endregion
//#region src/cards/camera-card.ts
var pr, mr = 10, hr = class extends z {
	constructor(...e) {
		super(...e), this.tick = 0, this.openSnapshot = () => {
			let e = this.config.snapshot_service;
			if (e) {
				let [t, n] = e.split(".");
				this.hass?.callService(t, n, { entity_id: this.config.entity });
				return;
			}
			let t = this.entity?.attributes.entity_picture;
			t && window.open(t, "_blank", "noopener");
		}, this.callMic = () => {
			let e = this.config.mic_service;
			if (!e) return;
			let [t, n] = e.split(".");
			this.hass?.callService(t, n, { entity_id: this.config.entity });
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: A(["camera"], e, t, n) };
	}
	getCardSize() {
		return this.config?.show_actions === !1 ? 4 : 5;
	}
	connectedCallback() {
		super.connectedCallback();
		let e = Math.max(this.config?.refresh_interval ?? mr, 1);
		this.timer = window.setInterval(() => this.tick++, e * 1e3);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.timer && window.clearInterval(this.timer);
	}
	get streaming() {
		return this.entity?.state === "streaming";
	}
	get stillUrl() {
		let e = this.entity?.attributes.entity_picture;
		if (e) return `${e}${e.includes("?") ? "&" : "?"}_=${this.tick}`;
	}
	renderMotion() {
		let e = this.config.motion_entity;
		if (!e) return x;
		let t = this.hass?.states[e];
		if (!t) return x;
		let n = this.t, r = t.state === "on", i = r ? {
			"--chip-bg": "rgba(255, 159, 10, 0.18)",
			"--chip-stroke": "rgba(255, 159, 10, 0.3)",
			"--chip-label": "var(--lg-motion-label)",
			"--chip-dot": "#E08600",
			"--chip-glow": "#FF9F0A"
		} : {}, a = r ? `${n("cam_motion")} · ${T(t.last_changed, n)}` : n("cam_no_motion");
		return y`<div class="motion" style=${P(i)}><span class="dot"></span><span>${a}</span></div>`;
	}
	render() {
		let e = this.entity;
		if (!e) return this.renderUnavailable();
		let t = this.t, n = O(e), r = n ? void 0 : this.stillUrl;
		return y`${this.renderDefs()}
      <div
        class=${N({
			glass: !0,
			card: !0,
			offline: n
		})}
        style=${P({ "--lg-cam-ratio": String(this.config.aspect_ratio ?? 16 / 9) })}
      >
        <div class="feed" style=${r ? P({ backgroundImage: `url("${r}")` }) : x}>
          <div class="scrim"></div>

          <div class="bar top">
            ${n ? y`<span></span>` : y`<span
                  class="live float"
                  style=${P(this.streaming ? {
			"--dot": "#FF453A",
			"--dot-glow": "#FF453A"
		} : { "--dot": "#8E8E93" })}
                  >${this.renderControlSurface(["#15151b", "#34343e"], "pill")}<span class="dot"></span><span class="live-label">${t(this.streaming ? "cam_live" : "cam_still")}</span></span
                >`}
            <div class=${N({
			trail: !0,
			dimmed: n
		})}>
              ${this.config.show_mic ? y`<button class="round float" @click=${this.callMic} title=${t("cam_mic")}>
                    ${this.renderControlSurface(["#15151b", "#34343e"])}
                    <lg-icon icon="mdi:microphone-off"></lg-icon>
                  </button>` : x}
              <button class="round float" @click=${this.openMoreInfo} title=${t("cam_expand")}>
                ${this.renderControlSurface(["#15151b", "#34343e"])}
                <lg-icon icon="mdi:arrow-expand"></lg-icon>
              </button>
            </div>
          </div>

          ${n ? y`<div class="nosignal">
                <lg-icon icon="mdi:video-off"></lg-icon><span>${t("cam_no_signal")}</span>
              </div>` : x}

          <div class="bar bottom">
            <div class="name" @click=${this.openMoreInfo}>
              <span class="who">${this.entityName}</span>
              <span class="when">${n ? t("cam_offline_state") : T(e.last_updated, t)}</span>
            </div>
            <button class=${N({
			round: !0,
			big: !0,
			float: !0,
			dimmed: n
		})} @click=${this.openSnapshot} title=${t("cam_snapshot")}>
              ${this.renderControlSurface(["#15151b", "#34343e"])}
              <lg-icon icon="mdi:camera"></lg-icon>
            </button>
          </div>
        </div>

        ${this.config.show_actions === !1 ? x : y`<div class="actions">
              ${n ? y`<div
                    class="motion"
                    style=${P({
			"--chip-bg": "rgba(255, 69, 58, 0.18)",
			"--chip-stroke": "rgba(255, 69, 58, 0.3)",
			"--chip-label": "#FF453A",
			"--chip-dot": "#FF453A"
		})}
                  >
                    <span class="dot"></span><span>${t("cam_offline")}</span>
                  </div>` : this.renderMotion()}
              <div class="spacer"></div>
              <button class=${N({
			history: !0,
			dimmed: n
		})} @click=${this.openMoreInfo}>
                <lg-icon icon="mdi:bell-outline"></lg-icon><span>${t("cam_history")}</span>
              </button>
            </div>`}
      </div>`;
	}
};
pr = hr, pr.styles = [
	B,
	V,
	o`
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

      /* Controls floating on the feed get their own dark glass. */
      .float {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        border: 0;
        padding: 0;
        color: #fff;
        background: rgba(11, 11, 15, 0.34);
        -webkit-backdrop-filter: blur(5px) saturate(1.35);
        backdrop-filter: blur(5px) saturate(1.35);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
      }
      :host([refraction]) .float {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
      }
      .float:has(> .lg-control-shader) {
        background: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
      }
      .float > :not(.lg-control-shader) {
        position: relative;
        z-index: 1;
      }
      .round {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
        --mdc-icon-size: 15px;
      }
      .round.big {
        width: 34px;
        height: 34px;
        --mdc-icon-size: 16px;
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
    `
], I([w()], hr.prototype, "tick", void 0), customElements.get("liquid-glass-camera-card") || customElements.define("liquid-glass-camera-card", hr);
//#endregion
//#region src/cards/group-card.ts
var gr, _r = {
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
}, vr = {
	door: ["open", "closed"],
	garage_door: ["open", "closed"],
	window: ["open", "closed"],
	opening: ["open", "closed"],
	motion: ["detected", "clear"],
	occupancy: ["detected", "clear"],
	presence: ["detected", "clear"]
}, yr = {
	door: ["mdi:door-open", "mdi:door-closed"],
	garage_door: ["mdi:garage-open", "mdi:garage"],
	window: ["mdi:window-open", "mdi:window-closed"],
	opening: ["mdi:square-outline", "mdi:square"],
	motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
	occupancy: ["mdi:home-account", "mdi:home-outline"],
	presence: ["mdi:account", "mdi:account-outline"],
	moisture: ["mdi:water-alert", "mdi:water-off"],
	smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"]
}, br = [
	["light", "custom:liquid-glass-light-card"],
	["switch", "custom:liquid-glass-switch-card"],
	["sensor", "custom:liquid-glass-sensor-card"]
], xr = class extends z {
	constructor(...e) {
		super(...e), this.open = !0, this.revision = 0, this.elements = [], this.buildId = 0, this.toggle = () => {
			this.collapsible && (this.open = !this.open);
		};
	}
	static getStubConfig(e, t, n) {
		let r = [
			t,
			n,
			Object.keys(e?.states ?? {})
		].find((e) => e?.length) ?? [], i = (e) => r.find((t) => t.startsWith(`${e}.`));
		return { cards: br.flatMap(([e, t]) => {
			let n = i(e);
			return n ? [{
				type: t,
				entity: n
			}] : [];
		}) };
	}
	setConfig(e) {
		super.setConfig(e), this.open = e.collapsed !== !0, this.buildChildren();
	}
	getCardSize() {
		return this.open ? 1 + this.elements.reduce((e, t) => e + (t.getCardSize?.() ?? 3), 0) : 1;
	}
	updated() {
		for (let e of this.elements) e.hass = this.hass;
	}
	get cardConfigs() {
		return this.config?.cards ?? [];
	}
	get collapsible() {
		return this.config?.collapsible !== !1;
	}
	childConfig(e) {
		if (!String(e.type ?? "").startsWith("custom:liquid-glass-")) return e;
		let t = { ...e };
		for (let e of [
			"theme",
			"refraction",
			"language",
			"glass_variant"
		]) {
			let n = this.config?.[e];
			t[e] === void 0 && n !== void 0 && (t[e] = n);
		}
		return t;
	}
	async buildChildren() {
		let e = ++this.buildId, t = this.cardConfigs.map((e) => this.childConfig(e)), n = await window.loadCardHelpers?.().catch(() => void 0);
		if (e === this.buildId) {
			this.elements = t.map((e) => {
				try {
					return n ? n.createCardElement(e) : Sr(e);
				} catch {
					return Sr(e);
				}
			});
			for (let e of this.elements) e.hass = this.hass;
			this.revision++;
		}
	}
	summaryFor(e) {
		let t = typeof e.entity == "string" ? e.entity : void 0;
		if (!t) return;
		let n = this.hass?.states[t], r = t.split(".", 1)[0], i = e.icon ?? n?.attributes.icon ?? Cr(n, r);
		return O(n) ? {
			icon: i,
			label: this.t("unavailable"),
			tone: "off"
		} : {
			icon: i,
			...wr(n, r, this.t)
		};
	}
	get summaryItems() {
		return this.cardConfigs.map((e) => this.summaryFor(e)).filter((e) => !!e);
	}
	subtitle(e) {
		if (this.config.subtitle) return this.config.subtitle;
		let t = this.cardConfigs.length;
		if (!t) return "";
		let n = e.filter((e) => e.tone !== "off").length, r = [this.t("grp_devices", { n: t })];
		return e.length && r.push(n ? this.t("grp_running", { n }) : this.t("grp_all_idle")), !this.open && this.collapsible && r.push(this.t("grp_tap_expand")), r.join(" · ");
	}
	render() {
		let e = this.summaryItems, t = !this.open && this.config.summary !== !1 && e.length > 0;
		return y`<div class="panel">
      <div class=${N({
			head: !0,
			tappable: this.collapsible
		})} @click=${this.toggle}>
        ${this.renderIconWell(this.config.icon ?? "mdi:view-grid-outline", void 0, null)}
        <div class="text">
          <div class="heading">${this.config.title ?? this.t("grp_title")}</div>
          <div class="sub">${this.subtitle(e)}</div>
        </div>
        ${this.collapsible ? y`<button class=${N({
			chevron: !0,
			closed: !this.open
		})} aria-expanded=${this.open}>
              <lg-icon icon="mdi:chevron-up"></lg-icon>
            </button>` : x}
      </div>
      ${t ? y`<div class="summary">
            ${e.map((e) => y`<div class=${N({
			sum: !0,
			[e.tone]: !0
		})}><lg-icon .icon=${e.icon}></lg-icon><span>${e.label}</span></div>`)}
          </div>` : x}
      ${this.open ? this.cardConfigs.length ? y`<div class="cards">${this.revision >= 0 ? this.elements : x}</div>` : y`<div class="empty">${this.t("grp_empty")}</div>` : x}
    </div>`;
	}
};
gr = xr, gr.styles = [
	B,
	V,
	o`
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

      @supports (container-type: inline-size) {
        .panel {
          --lg-group-title: clamp(13px, 4.2cqi, 16px);
        }
      }
    `
], I([w()], xr.prototype, "open", void 0), I([w()], xr.prototype, "revision", void 0);
function Sr(e) {
	let t = String(e.type ?? ""), n = t.startsWith("custom:") ? t.slice(7) : `hui-${t}-card`, r = document.createElement(n), i = () => {
		try {
			r.setConfig?.(e);
		} catch {}
	};
	return typeof r.setConfig == "function" ? i() : customElements.whenDefined(n).then(i), r;
}
function Cr(e, t) {
	if (t === "binary_sensor") {
		let t = yr[e?.attributes.device_class ?? ""];
		if (t) return e?.state === "on" ? t[0] : t[1];
	}
	return _r[t] ?? "mdi:card-outline";
}
function wr(e, t, n) {
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
			let t = e.attributes.device_class, r = (t && vr[t]) ?? ["on", "off"];
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
customElements.get("liquid-glass-group-card") || customElements.define("liquid-glass-group-card", xr);
//#endregion
//#region src/cards/separator-card.ts
var Tr, Er = class extends z {
	static getStubConfig() {
		return {
			title: "Section",
			icon: "mdi:lightbulb-outline",
			style: "pill"
		};
	}
	getCardSize() {
		return 1;
	}
	get heading() {
		return this.config.title ?? this.config.name ?? this.t("sep_title");
	}
	get icon() {
		return this.config.icon ?? "mdi:lightbulb-outline";
	}
	get hasCount() {
		return this.config.count !== void 0 && this.config.count !== null && this.config.count !== "";
	}
	renderPlain() {
		return y`<div class="separator plain">
      <lg-icon .icon=${this.icon}></lg-icon>
      <span class="plain-title">${this.heading}</span>
      <span class="line" aria-hidden="true"></span>
      ${this.hasCount ? y`<span class="plain-count">${this.config.count}</span>` : x}
    </div>`;
	}
	renderPill() {
		return y`${this.renderDefs()}
      <div class="separator pill-row">
        <div class="glass pill">
          <lg-icon .icon=${this.icon}></lg-icon>
          <span class="pill-title">${this.heading}</span>
          ${this.hasCount ? y`<span class="pill-count">${this.config.count}</span>` : x}
        </div>
        <span class="line" aria-hidden="true"></span>
      </div>`;
	}
	renderHeader() {
		return y`${this.renderDefs()}
      <div class="separator header-row">
        <span class="glass header-well"><lg-icon .icon=${this.icon}></lg-icon></span>
        <span class="header-text">
          <span class="header-title">${this.heading}</span>
          ${this.config.subtitle ? y`<span class="header-subtitle">${this.config.subtitle}</span>` : x}
        </span>
        <span class="chevron" aria-hidden="true"><lg-icon icon="mdi:chevron-up"></lg-icon></span>
      </div>`;
	}
	render() {
		switch (this.config.style) {
			case "plain": return this.renderPlain();
			case "header": return this.renderHeader();
			default: return this.renderPill();
		}
	}
};
Tr = Er, Tr.styles = [
	B,
	V,
	o`
      :host {
        min-width: 0;
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
      .chevron > lg-icon {
        flex: none;
      }

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
        box-shadow:
          0 4px 14px -2px var(--lg-shadow-glass),
          0 1px 1px var(--lg-glass-inner),
          inset 0 0 0 1px var(--lg-glass-stroke);
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
        box-shadow:
          0 1px 1px var(--lg-glass-inner),
          inset 0 0 0 1px var(--lg-glass-stroke);
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
        .pill-row {
          gap: 8px;
        }
        .pill {
          padding-inline: 11px;
        }
        .header-row {
          gap: 9px;
        }
      }
    `
], customElements.get("liquid-glass-separator-card") || customElements.define("liquid-glass-separator-card", Er);
//#endregion
//#region src/index.ts
var Dr = "0.6.0", Or = "2026-09-04 13:14", kr = "https://github.com/cos-overclock/ha-liquid-glass", Ar = (e, t) => !!((e.attributes.supported_features ?? 0) & t);
function $(e, t, n, r, i, a = (e) => ({ entity: e })) {
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
var jr = [
	"scene",
	"script",
	"automation",
	"button",
	"input_button"
], Mr = [
	"switch",
	"input_boolean",
	"fan",
	"light",
	"automation",
	"humidifier",
	"siren",
	"remote"
], Nr = [
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
], Pr = 1, Fr = 4, Ir = 4, Lr = [
	$("liquid-glass-light-card", "Liquid Glass Light", "Brightness, color temperature, color and presets", ["light"]),
	$("liquid-glass-climate-card", "Liquid Glass Climate", "Thermostat dial with modes and fan / preset", ["climate"], (e) => Ar(e, 3)),
	$("liquid-glass-switch-card", "Liquid Glass Switch", "Single row toggle", Mr),
	$("liquid-glass-sensor-card", "Liquid Glass Sensor", "Value, trend and 24h sparkline", ["sensor"]),
	$("liquid-glass-binary-sensor-card", "Liquid Glass Binary Sensor", "Door / motion / window status row", ["binary_sensor"]),
	$("liquid-glass-lock-card", "Liquid Glass Lock", "Slide to lock / unlock", ["lock"]),
	$("liquid-glass-cover-card", "Liquid Glass Cover", "Blinds and curtains with position and tilt", ["cover"], (e) => Ar(e, 7)),
	$("liquid-glass-media-card", "Liquid Glass Media", "Now playing with transport and volume", ["media_player"]),
	$("liquid-glass-slider-card", "Liquid Glass Slider", "Any numeric value as a draggable track", Nr, (e) => {
		switch (e.entity_id.split(".", 1)[0]) {
			case "input_number":
			case "number": return !0;
			case "fan": return Ar(e, Pr);
			case "light": return (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
			case "media_player": return Ar(e, Ir);
			case "cover":
			case "valve": return Ar(e, Fr);
			case "humidifier": return "humidity" in e.attributes;
			case "water_heater":
			case "climate": return Ar(e, Pr);
			default: return !1;
		}
	}),
	$("liquid-glass-weather-card", "Liquid Glass Weather", "Current conditions with hourly and daily forecast", ["weather"]),
	$("liquid-glass-button-card", "Liquid Glass Button", "Run a scene, script, automation or button", jr),
	$("liquid-glass-scene-card", "Liquid Glass Scenes", "A grid of scene tiles or a row of chips", jr, void 0, (e) => ({ scenes: [{ entity: e }] })),
	$("liquid-glass-camera-card", "Liquid Glass Camera", "Camera still with motion and history", ["camera"]),
	{
		type: "liquid-glass-group-card",
		name: "Liquid Glass Group",
		description: "A collapsible panel that holds other cards"
	},
	{
		type: "liquid-glass-separator-card",
		name: "Liquid Glass Separator",
		description: "A section heading in plain, pill or header style"
	}
];
window.customCards = window.customCards ?? [];
for (let e of Lr) {
	let t = {
		...e,
		preview: !0,
		documentationURL: kr
	}, n = window.customCards.find((t) => t.type === e.type);
	n ? Object.assign(n, t) : window.customCards.push(t);
}
console.info(`%c LIQUID-GLASS-CARDS %c v${Dr} · ${Lr.length} cards · built ${Or} `, "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;", "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");
//#endregion
export { Kn as LiquidGlassBinarySensorCard, gn as LiquidGlassButtonCard, hr as LiquidGlassCameraCard, Fn as LiquidGlassClimateCard, er as LiquidGlassCoverCard, xr as LiquidGlassGroupCard, on as LiquidGlassLightCard, Xn as LiquidGlassLockCard, ir as LiquidGlassMediaCard, fr as LiquidGlassSceneCard, Wn as LiquidGlassSensorCard, Er as LiquidGlassSeparatorCard, un as LiquidGlassSliderCard, zn as LiquidGlassSwitchCard, lr as LiquidGlassWeatherCard };
