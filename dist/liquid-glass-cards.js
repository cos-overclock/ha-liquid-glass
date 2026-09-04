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
}) : o, n)), l = globalThis, u = l.ShadowRoot && (l.ShadyCSS === void 0 || l.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, d = Symbol(), f = /* @__PURE__ */ new WeakMap(), p = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== d) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (u && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = f.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && f.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, m = (e) => new p(typeof e == "string" ? e : e + "", void 0, d), h = (e, ...t) => new p(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, d), g = (e, t) => {
	if (u) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = l.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, _ = u ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return m(t);
})(e) : e, v, { is: y, defineProperty: b, getOwnPropertyDescriptor: x, getOwnPropertyNames: S, getOwnPropertySymbols: C, getPrototypeOf: w } = Object, T = globalThis, ee = T.trustedTypes, te = ee ? ee.emptyScript : "", ne = T.reactiveElementPolyfillSupport, E = (e, t) => e, D = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
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
}, re = (e, t) => !y(e, t), O = {
	attribute: !0,
	type: String,
	converter: D,
	reflect: !1,
	useDefault: !1,
	hasChanged: re
};
(v = Symbol).metadata ?? (v.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var k = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ?? (this.l = [])).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = O) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && b(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = x(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? O;
	}
	static _$Ei() {
		if (this.hasOwnProperty(E("elementProperties"))) return;
		let e = w(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(E("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
			let e = this.properties, t = [...S(e), ...C(e)];
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
			for (let e of n) t.unshift(_(e));
		} else e !== void 0 && t.push(_(e));
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
		return g(e, this.constructor.elementStyles), e;
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
			let i = (n.converter?.toAttribute === void 0 ? D : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? D : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? re)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[E("elementProperties")] = /* @__PURE__ */ new Map(), k[E("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: k }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var A = globalThis, ie = (e) => e, ae = A.trustedTypes, oe = ae ? ae.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, se = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, M = "?" + j, ce = `<${M}>`, le = document, ue = () => le.createComment(""), de = (e) => e === null || typeof e != "object" && typeof e != "function", fe = Array.isArray, pe = (e) => fe(e) || typeof e?.[Symbol.iterator] == "function", me = "[ 	\n\f\r]", he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, N = />/g, _e = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ve = /'/g, ye = /"/g, be = /^(?:script|style|textarea|title)$/i, xe = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), P = xe(1), Se = xe(2), Ce = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), Te = le.createTreeWalker(le, 129);
function Ee(e, t) {
	if (!fe(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return oe === void 0 ? t : oe.createHTML(t);
}
var De = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = he;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === he ? c[1] === "!--" ? o = ge : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = _e) : (be.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = _e) : o = N : o === _e ? c[0] === ">" ? (o = i ?? he, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? _e : c[3] === "\"" ? ye : ve) : o === ye || o === ve ? o = _e : o === ge || o === N ? o = he : (o = _e, i = void 0);
		let d = o === _e && e[t + 1].startsWith("/>") ? " " : "";
		a += o === he ? n + ce : l >= 0 ? (r.push(s), n.slice(0, l) + se + n.slice(l) + j + d) : n + j + (l === -2 ? t : d);
	}
	return [Ee(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Oe = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = De(t, n);
		if (this.el = e.createElement(l, r), Te.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Te.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(se)) {
					let t = u[o++], n = i.getAttribute(e).split(j), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ne : r[1] === "?" ? Pe : r[1] === "@" ? Fe : Me
					}), i.removeAttribute(e);
				} else e.startsWith(j) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (be.test(i.tagName)) {
					let e = i.textContent.split(j), t = e.length - 1;
					if (t > 0) {
						i.textContent = ae ? ae.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ue()), Te.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], ue());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === M) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(j, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += j.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = le.createElement("template");
		return n.innerHTML = e, n;
	}
};
function ke(e, t, n = e, r) {
	if (t === Ce) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = de(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ?? (n._$Co = []))[r] = i), i !== void 0 && (t = ke(e, i._$AS(e, t.values), i, r)), t;
}
var Ae = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? le).importNode(t, !0);
		Te.currentNode = r;
		let i = Te.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new je(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ie(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Te.nextNode(), a++);
		}
		return Te.currentNode = le, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, je = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = ke(this, e, t), de(e) ? e === F || e == null || e === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : e !== this._$AH && e !== Ce && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? pe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== F && de(this._$AH) ? this._$AA.nextSibling.data = e : this.T(le.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Oe.createElement(Ee(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Ae(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = we.get(e.strings);
		return t === void 0 && we.set(e.strings, t = new Oe(e)), t;
	}
	k(t) {
		fe(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ue()), this.O(ue()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ie(e).nextSibling;
			ie(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Me = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = F, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = F;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = ke(this, e, t, 0), a = !de(e) || e !== this._$AH && e !== Ce, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = ke(this, r[n + o], t, o), s === Ce && (s = this._$AH[o]), a || (a = !de(s) || s !== this._$AH[o]), s === F ? e = F : e !== F && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ne = class extends Me {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === F ? void 0 : e;
	}
}, Pe = class extends Me {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== F);
	}
}, Fe = class extends Me {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = ke(this, e, t, 0) ?? F) === Ce) return;
		let n = this._$AH, r = e === F && n !== F || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== F && (n === F || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ie = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		ke(this, e);
	}
}, Le = A.litHtmlPolyfillSupport;
Le?.(Oe, je), (A.litHtmlVersions ?? (A.litHtmlVersions = [])).push("3.3.3");
var Re = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new je(t.insertBefore(ue(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ze = globalThis, Be = class extends k {
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
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Re(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Ce;
	}
};
Be._$litElement$ = !0, Be.finalized = !0, ze.litElementHydrateSupport?.({ LitElement: Be });
var Ve = ze.litElementPolyfillSupport;
Ve?.({ LitElement: Be }), (ze.litElementVersions ?? (ze.litElementVersions = [])).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var He = {
	attribute: !0,
	type: String,
	converter: D,
	reflect: !1,
	hasChanged: re
}, Ue = (e = He, t, n) => {
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
function I(e) {
	return (t, n) => typeof n == "object" ? Ue(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function L(e) {
	return I({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/i18n.ts
var We = {
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
}, Ge = {
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
}, Ke = {
	ja: We,
	en: Ge
};
function qe(e) {
	let t = Ke[(e ?? "en").toLowerCase().split("-")[0]] ?? Ge;
	return (e, n) => {
		let r = t[e] ?? Ge[e] ?? e;
		if (n) for (let [e, t] of Object.entries(n)) r = r.replace(`{${e}}`, String(t));
		return r;
	};
}
function Je(e, t) {
	if (!e) return "";
	let n = Math.max(0, Date.now() - new Date(e).getTime()), r = Math.round(n / 1e3);
	if (r < 30) return t("just_now");
	if (r < 90) return t("seconds_ago", { n: r });
	let i = Math.round(r / 60);
	if (i < 60) return t("minutes_ago", { n: i });
	let a = Math.round(i / 60);
	return a < 48 ? t("hours_ago", { n: a }) : t("days_ago", { n: Math.round(a / 24) });
}
function Ye(e) {
	if (!e) return "";
	let t = new Date(e);
	return `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
//#endregion
//#region src/utils.ts
var R = (e, t, n) => Math.min(n, Math.max(t, e));
function Xe(e, t, n = {}) {
	e.dispatchEvent(new CustomEvent(t, {
		detail: n,
		bubbles: !0,
		composed: !0
	}));
}
function Ze(e, t) {
	t && Xe(e, "hass-more-info", { entityId: t });
}
function Qe(e, t) {
	return e?.attributes.friendly_name ?? t;
}
function z(e, t, n) {
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
function $e(e) {
	return !e || e.state === "unavailable" || e.state === "unknown";
}
function et(e, t) {
	return !!((e?.attributes.supported_features ?? 0) & t);
}
function tt(e, t, n, r, i) {
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
function rt(e) {
	return `#${e.slice(0, 3).map((e) => Math.round(R(e, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}
function it(e) {
	let t = /^#?([0-9a-f]{6})$/i.exec(e.trim());
	if (!t) return;
	let n = parseInt(t[1], 16);
	return [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	];
}
function at(e, t = .45) {
	let n = it(e);
	return n ? rt(n.map((e) => e + (255 - e) * t)) : e;
}
function ot(e, t = .3) {
	let n = it(e);
	return n ? rt(n.map((e) => e * (1 - t))) : e;
}
function st(e, t) {
	let n = it(e);
	return n ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${t})` : e;
}
//#endregion
//#region node_modules/lit-html/directive.js
var ct = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, lt = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), ut = class {
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
}, B = lt(class extends ut {
	constructor(e) {
		if (super(e), e.type !== ct.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
		return Ce;
	}
}), dt = "important", ft = " !" + dt, V = lt(class extends ut {
	constructor(e) {
		if (super(e), e.type !== ct.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
				let t = typeof r == "string" && r.endsWith(ft);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? dt : "") : n[e] = r;
			}
		}
		return Ce;
	}
}), pt = (e, t, n) => Math.min(n, Math.max(t, e)), mt = (e, t, n) => {
	let r = pt((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
};
function ht(e) {
	let t = 1 - e;
	return (1 - t * t * t * t) ** .25;
}
function gt(e) {
	let t = .001;
	return (ht(pt(e + t, 0, 1)) - ht(pt(e - t, 0, 1))) * (.5 / t);
}
function _t(e, t, n) {
	let r = pt(e / n, -.9999, .9999);
	return r / Math.sqrt(1 - r * r) - t;
}
function vt(e, t, n, r = 0) {
	let i = gt(e);
	return -_t(i / Math.sqrt(1 + i * i), i, 1 + n * .045 + r) * t;
}
var yt = (e) => {
	let t = Math.hypot(...e) || 1;
	return e.map((e) => e / t);
};
function bt(e) {
	let t = e * Math.PI / 180;
	return yt([
		Math.cos(t),
		Math.sin(t),
		.85
	]);
}
function xt(e, t, n, r, i) {
	let a = gt(e), o = bt(r), s = n[0] * o[0] + n[1] * o[1], c = Math.max(s, 0), l = Math.max(-s, 0), u = yt([
		-a * n[0],
		-a * n[1],
		1
	]), d = -(o[0] * u[0] + o[1] * u[1] + o[2] * u[2]), f = -o[2] - 2 * d * u[2], p = Math.max(f, 0) ** 26 * c, m = Math.max(f, 0) ** 48 * l * .3, h = (1 - mt(0, 2, t)) * (.22 + .78 * c), g = (1 - u[2]) ** 3 * (.15 + .85 * c);
	return ((p + m) * 1.5 + g * .3 + h * .28) * i - l * (1 - u[2]) * .14;
}
var St = {
	edge: 28,
	refraction: 22,
	chroma: .35,
	blur: 7,
	highlight: .85,
	lightAngle: 120,
	saturation: 1.35
}, Ct = {
	top: [0, 1],
	bottom: [0, -1],
	left: [-1, 0],
	right: [1, 0]
}, wt = 40, Tt = 160, Et = 80, Dt = [
	{
		id: "lg-card",
		edge: St.edge,
		refraction: St.refraction,
		blur: 5,
		saturation: St.saturation,
		chroma: St.chroma,
		bend: .34
	},
	{
		id: "lg-knob",
		edge: 14,
		refraction: 16,
		blur: 2.2,
		saturation: St.saturation,
		chroma: St.chroma,
		bend: .46
	},
	{
		id: "lg-slider-knob",
		edge: 20,
		refraction: 10,
		blur: 12,
		saturation: St.saturation,
		chroma: St.chroma,
		bend: .38
	}
], Ot = {
	width: 320,
	height: 190,
	radius: 40
}, kt = {
	width: 64,
	height: 64,
	radius: 32
}, At = {
	width: 44,
	height: 44,
	radius: 22
}, jt = /* @__PURE__ */ new Map(), Mt = {
	r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
	g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
	b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
}, Nt = (e, t, n) => Math.min(n, Math.max(t, e));
function Pt(e, t, n, r, i) {
	let a = n / 2, o = r / 2, s = Nt(i, 0, Math.min(a, o)), c = Math.abs(e - a) - a + s, l = Math.abs(t - o) - o + s;
	return Math.hypot(Math.max(c, 0), Math.max(l, 0)) + Math.min(Math.max(c, l), 0) - s;
}
function Ft(e, t, n) {
	let r = .6, i = Pt(e + r, t, n.width, n.height, n.radius) - Pt(e - r, t, n.width, n.height, n.radius), a = Pt(e, t + r, n.width, n.height, n.radius) - Pt(e, t - r, n.width, n.height, n.radius), o = Math.hypot(i, a) || 1;
	return [i / o, a / o];
}
function It(e, t) {
	if (typeof document > "u") return;
	let n = Math.max(1, e.width), r = Math.max(1, e.height), i = Nt(e.radius, 0, Math.min(n, r) / 2), a = [
		t.id,
		Math.round(n / 4) * 4,
		Math.round(r / 4) * 4,
		Math.round(i / 2) * 2
	].join(":"), o = jt.get(a);
	if (o) return o;
	let s = Math.min(1, Tt / Math.max(n, r)), c = Math.max(32, Math.round(n * s)), l = Math.max(32, Math.round(r * s)), u = document.createElement("canvas");
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
			let s = (o + .5) / c * n, l = Pt(s, a, n, r, i), u = (e * c + o) * 4, d = 0, m = 0;
			if (l <= 1) {
				let e = Math.max(0, -l), n = Nt(e / Math.max(t.edge, 1), 0, 1), r = Math.min(vt(n, t.edge, t.refraction), wt), i = Nt(1 - e / Math.max(3, t.edge * .42), 0, 1);
				r += t.bend * 6.75 * i * i * (1 - i);
				let [o, c] = Ft(s, a, p);
				d = -o * r, m = -c * r;
			}
			f.data[u] = Math.round(Nt(128 + d / wt * 127, 0, 255)), f.data[u + 1] = Math.round(Nt(128 + m / wt * 127, 0, 255)), f.data[u + 2] = 128, f.data[u + 3] = 255;
		}
	}
	d.putImageData(f, 0, 0);
	let m = u.toDataURL("image/png");
	return jt.set(a, m), jt.size > Et && jt.delete(jt.keys().next().value), m;
}
function Lt(e, t) {
	let n = .15, r = vt(n, e.edge, e.refraction), i = vt(n, e.edge, e.refraction, t * e.chroma * .12);
	return r > 0 ? i / r : 1;
}
function Rt(e, t) {
	let n = It(t, e);
	return Se`
    <filter id=${e.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      ${n ? Se`<feImage href=${n} preserveAspectRatio="none" result="map" />` : Se`<feFlood flood-color="rgb(128,128,128)" result="map" />`}
      <feGaussianBlur in="SourceGraphic" stdDeviation=${e.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(e.saturation)} result="sat" />
      <feDisplacementMap in="sat" in2="map" scale=${80 * Lt(e, -1)} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="sat" in2="map" scale=${80} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="sat" in2="map" scale=${80 * Lt(e, 1)} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values=${Mt.r} result="cr" />
      <feColorMatrix in="dg" type="matrix" values=${Mt.g} result="cg" />
      <feColorMatrix in="db" type="matrix" values=${Mt.b} result="cb" />
      <feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="crg" />
      <feComposite in="crg" in2="cb" operator="arithmetic" k2="1" k3="1" />
    </filter>`;
}
function zt(e = Ot) {
	return P`<svg class="lg-defs" aria-hidden="true" focusable="false">
    <defs>
      ${Rt(Dt[0], e)}
      ${Rt(Dt[1], kt)}
      ${Rt(Dt[2], At)}
    </defs>
  </svg>`;
}
zt(), P`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Rt(Dt[1], kt)}</defs>
</svg>`;
var Bt = P`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Rt(Dt[2], At)}</defs>
</svg>`, Vt;
function Ht() {
	if (Vt !== void 0) return Vt;
	let e = navigator.userAgent, t = /Chrome\/|Chromium\/|CriOS\//.test(e) || !!navigator.userAgentData, n = /Safari\//.test(e) && !/Chrome\/|Chromium\/|CriOS\//.test(e), r = /Firefox\//.test(e), i = /\bwv\b|Home[ /]?Assistant/i.test(e);
	return Vt = t && !n && !r && !i && CSS.supports("backdrop-filter", "url(#lg-test)"), Vt;
}
//#endregion
//#region src/editor/load.ts
var Ut;
function Wt() {
	return Ut || (Ut = (async () => {
		let e = window.loadCardHelpers;
		if (e) try {
			await ((await e()).createCardElement?.({
				type: "entities",
				entities: []
			})?.constructor)?.getConfigElement?.();
		} catch {}
	})()), Ut;
}
//#endregion
//#region src/styles/motion.ts
var Gt = [
	["--well-from", "#ffd36b"],
	["--well-to", "#ff8a1f"],
	["--well-glow", "rgba(255, 165, 48, 0.24)"],
	["--lg-ring-0", "#ffb36b"],
	["--lg-ring-1", "#ff6a3d"],
	["--lg-ring-2", "#ff2d55"]
];
function Kt() {
	let e = typeof CSS < "u" ? CSS : void 0;
	if (e?.registerProperty) for (let [t, n] of Gt) try {
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
function H(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/components/lg-icon.ts
var qt, Jt = class extends Be {
	constructor(...e) {
		super(...e), this.icon = "";
	}
	render() {
		return P`<ha-icon .icon=${this.icon}></ha-icon>`;
	}
};
qt = Jt, qt.styles = h`
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
  `, H([I()], Jt.prototype, "icon", void 0), customElements.get("lg-icon") || customElements.define("lg-icon", Jt);
//#endregion
//#region src/components/lg-glass-surface.ts
var Yt, Xt = "\nattribute vec2 a_position;\nvoid main() { gl_Position = vec4(a_position, 0.0, 1.0); }\n", Zt = "\nprecision highp float;\nuniform vec2 u_resolution;\nuniform float u_shape;\nuniform float u_radius;\nuniform float u_edge;\nuniform float u_refraction;\nuniform float u_chroma;\nuniform float u_blur;\nuniform float u_highQualityBlur;\nuniform float u_highlight;\nuniform float u_lightAngle;\nuniform float u_saturation;\nuniform float u_tintAlpha;\nuniform float u_surfaceAlpha;\nuniform vec3 u_tint;\nuniform vec3 u_colors[4];\nuniform vec4 u_stops;\nconst int BLUR_TAPS = 8;\nconst int HIGH_QUALITY_BLUR_TAPS = 49;\n\nfloat surfaceHeight(float t) {\n  float s = 1.0 - t;\n  float s4 = s * s * s * s;\n  return pow(max(1.0 - s4, 0.0), 0.25);\n}\nfloat refractDisp(float sinI, float slope, float n) {\n  float sinR = clamp(sinI / n, -0.9999, 0.9999);\n  return sinR * inversesqrt(1.0 - sinR * sinR) - slope;\n}\nfloat roundedBox(vec2 p, vec2 halfSize, float radius) {\n  vec2 q = abs(p) - halfSize + radius;\n  float outside = length(max(q, 0.0));\n  float inside = min(max(q.x, q.y), 0.0);\n  return -(outside + inside - radius);\n}\nfloat shapeDistance(vec2 coord) {\n  vec2 halfSize = u_resolution * 0.5;\n  vec2 p = coord - halfSize;\n  if (u_shape < 0.5) return min(halfSize.x, halfSize.y) - length(p);\n  float radius = u_shape < 1.5 ? halfSize.y : min(u_radius, halfSize.y);\n  return roundedBox(p, halfSize - vec2(0.75), max(radius - 0.75, 1.0));\n}\nvec3 backdropAt(vec2 coord) {\n  float x = clamp(coord.x / u_resolution.x, 0.0, 1.0);\n  if (x <= u_stops.y) return mix(u_colors[0], u_colors[1], smoothstep(u_stops.x, u_stops.y, x));\n  if (x <= u_stops.z) return mix(u_colors[1], u_colors[2], smoothstep(u_stops.y, u_stops.z, x));\n  return mix(u_colors[2], u_colors[3], smoothstep(u_stops.z, u_stops.w, x));\n}\nvec3 sampleBg(vec2 coord) {\n  if (u_blur <= 0.0) return backdropAt(coord);\n  if (u_highQualityBlur > 0.5) {\n    vec3 sum = vec3(0.0);\n    float weightSum = 0.0;\n    for (int i = 0; i < HIGH_QUALITY_BLUR_TAPS; i++) {\n      float x = (float(i) / float(HIGH_QUALITY_BLUR_TAPS - 1) * 4.0 - 2.0) * u_blur;\n      float weight = exp(-0.5 * x * x / max(u_blur * u_blur, 0.0001));\n      sum += backdropAt(coord + vec2(x, 0.0)) * weight;\n      weightSum += weight;\n    }\n    return sum / weightSum;\n  }\n  vec3 sum = backdropAt(coord);\n  for (int i = 0; i < BLUR_TAPS; i++) {\n    float fi = float(i) + 0.5;\n    float a = fi * 2.39996323;\n    float r = sqrt(fi / float(BLUR_TAPS)) * u_blur;\n    sum += backdropAt(coord + vec2(cos(a), sin(a)) * r);\n  }\n  return sum / (float(BLUR_TAPS) + 1.0);\n}\nvoid main() {\n  vec2 coord = gl_FragCoord.xy;\n  float sd = shapeDistance(coord);\n  float coverage = smoothstep(-1.0, 1.0, sd);\n  float ew = max(u_edge, 1.0);\n  float t = clamp(sd / ew, 0.0, 1.0);\n  float e = 0.75;\n  vec2 grad = vec2(\n    shapeDistance(coord + vec2(e, 0.0)) - shapeDistance(coord - vec2(e, 0.0)),\n    shapeDistance(coord + vec2(0.0, e)) - shapeDistance(coord - vec2(0.0, e))\n  );\n  vec2 borderDir = -normalize(grad + vec2(1e-6));\n  float delta = 0.001;\n  float h1 = surfaceHeight(clamp(t - delta, 0.0, 1.0));\n  float h2 = surfaceHeight(clamp(t + delta, 0.0, 1.0));\n  float slope = (h2 - h1) * (0.5 / delta);\n  float sinI = slope * inversesqrt(1.0 + slope * slope);\n  float ior = 1.0 + u_refraction * 0.045;\n  float dispG = refractDisp(sinI, slope, ior) * ew;\n  vec3 col;\n  if (u_chroma <= 0.0 || u_refraction <= 0.0) {\n    col = sampleBg(coord + borderDir * dispG);\n  } else {\n    float spread = u_chroma * 0.12;\n    float dispR = refractDisp(sinI, slope, max(ior - spread, 1.001)) * ew;\n    float dispB = refractDisp(sinI, slope, ior + spread) * ew;\n    col = vec3(sampleBg(coord + borderDir * dispR).r, sampleBg(coord + borderDir * dispG).g, sampleBg(coord + borderDir * dispB).b);\n  }\n  float luma = dot(col, vec3(0.299, 0.587, 0.114));\n  col = mix(vec3(luma), col, u_saturation);\n  col = mix(col, u_tint, u_tintAlpha);\n  float angle = radians(u_lightAngle);\n  vec3 light = normalize(vec3(cos(angle), sin(angle), 0.85));\n  vec3 normal = normalize(vec3(-slope * borderDir, 1.0));\n  float facing = dot(borderDir, light.xy);\n  float lit = max(facing, 0.0);\n  float back = max(-facing, 0.0);\n  vec3 reflected = reflect(-light, normal);\n  float spec = pow(max(reflected.z, 0.0), 26.0) * lit;\n  float spec2 = pow(max(reflected.z, 0.0), 48.0) * back * 0.3;\n  float hairline = (1.0 - smoothstep(0.0, 2.0, sd)) * (0.22 + 0.78 * lit);\n  float fresnel = pow(1.0 - normal.z, 3.0) * (0.15 + 0.85 * lit);\n  col += vec3(1.0) * ((spec + spec2) * 1.5 + fresnel * 0.3 + hairline * 0.28) * u_highlight;\n  col -= back * (1.0 - normal.z) * 0.14;\n  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;\n  col += dither / 768.0;\n  float alpha = coverage * clamp(u_surfaceAlpha, 0.0, 1.0);\n  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);\n}\n";
function Qt(e) {
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
var $t = class {
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
		let e = this.gl, t = this.shader(e.VERTEX_SHADER, Xt), n = this.shader(e.FRAGMENT_SHADER, Zt);
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
		i.uniform2f(i.getUniformLocation(c, "u_resolution"), o, s), u("u_shape", t.shape === "circle" ? 0 : t.shape === "pill" ? 1 : 2), u("u_radius", t.radius * a), u("u_edge", t.edge * a), u("u_refraction", t.refraction), u("u_chroma", t.chroma), u("u_blur", t.blurRadius * a), u("u_highQualityBlur", +!!t.highQualityBlur), u("u_highlight", t.highlight), u("u_lightAngle", t.lightAngle), u("u_saturation", t.saturation), u("u_tintAlpha", t.tintAlpha), u("u_surfaceAlpha", t.surfaceAlpha), i.uniform3fv(i.getUniformLocation(c, "u_tint"), Qt(t.tint));
		let d = [...t.palette];
		for (; d.length < 4;) d.push(d[d.length - 1] ?? "#b8b8c2");
		i.uniform3fv(i.getUniformLocation(c, "u_colors[0]"), new Float32Array(d.slice(0, 4).flatMap(Qt))), i.uniform4fv(i.getUniformLocation(c, "u_stops"), new Float32Array(t.stops)), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLES, 0, 3), i.flush();
		let f = e.getContext("2d");
		return f ? (f.clearRect(0, 0, o, s), f.drawImage(this.canvas, 0, 0, o, s), !0) : !1;
	}
}, en, tn = class extends Be {
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
				en ?? (en = new $t()), this.toggleAttribute("shader-ready", en.render(e, this, t.width, t.height));
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
		return P`<canvas aria-hidden="true"></canvas>`;
	}
};
Yt = tn, Yt.styles = h`
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
  `, H([I()], tn.prototype, "shape", void 0), H([I({ attribute: !1 })], tn.prototype, "palette", void 0), H([I({ attribute: !1 })], tn.prototype, "stops", void 0), H([I({ type: Number })], tn.prototype, "radius", void 0), H([I({ type: Number })], tn.prototype, "edge", void 0), H([I({ type: Number })], tn.prototype, "refraction", void 0), H([I({ type: Number })], tn.prototype, "chroma", void 0), H([I({ type: Number })], tn.prototype, "blurRadius", void 0), H([I({ type: Boolean })], tn.prototype, "highQualityBlur", void 0), H([I({ type: Number })], tn.prototype, "renderScale", void 0), H([I({ type: Number })], tn.prototype, "pixelRatioLimit", void 0), H([I({ type: Number })], tn.prototype, "highlight", void 0), H([I({ type: Number })], tn.prototype, "lightAngle", void 0), H([I({ type: Number })], tn.prototype, "saturation", void 0), H([I({ type: Number })], tn.prototype, "tintAlpha", void 0), H([I({ type: Number })], tn.prototype, "surfaceAlpha", void 0), H([I()], tn.prototype, "tint", void 0), customElements.get("lg-glass-surface") || customElements.define("lg-glass-surface", tn);
//#endregion
//#region src/components/lg-slider.ts
var nn, rn = class extends Be {
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
			this.lastPointerX = e.clientX, this.lastPointerTime = e.timeStamp, this.setWobbleTarget(R(n / 1.4, 0, 1));
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
			e.preventDefault(), this.value = R(n, this.min, this.max), this.dispatchEvent(new CustomEvent("lg-change", {
				detail: { value: this.value },
				bubbles: !0,
				composed: !0
			}));
		};
	}
	get ratio() {
		let e = this.dragging ? this.dragValue : this.value, t = this.max - this.min || 1;
		return R((e - this.min) / t, 0, 1);
	}
	valueFromEvent(e) {
		let t = this.shadowRoot?.querySelector(".track");
		if (!t) return this.value;
		let n = t.getBoundingClientRect(), r = this.variant === "thumb" || this.variant === "bar" || this.showThumb ? n.height / 2 : 0, i = Math.max(1, n.width - r * 2), a = R((e.clientX - n.left - r) / i, 0, 1), o = this.min + a * (this.max - this.min);
		return this.step > 0 && (o = Math.round(o / this.step) * this.step), R(o, this.min, this.max);
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
			let t = R(this.fillFrom, 0, 1), n = Math.min(t, e), r = Math.max(t, e);
			o = {
				left: `calc(${i} / 2 + ${a} * ${n})`,
				width: `calc(${a} * ${r - n})`
			};
		} else n && (o = { width: `calc(${i} / 2 + ${a} * ${e})` });
		return P`
      ${this.refraction ? Bt : F}
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
        ${r ? P`<div class="fill" style=${V(o)}></div>` : F}
        ${t && this.fillFrom !== void 0 ? P`<div class="center-mark" style=${V({ left: `calc(${i} / 2 + ${a} * ${R(this.fillFrom, 0, 1)})` })}></div>` : F}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${n ? P`<div class=${this.refraction ? "knob refraction" : "knob"} style=${V({ left: `calc(${a} * ${e})` })}>
              ${this.refraction ? F : P`<lg-glass-surface
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
            </div>` : F}
      </div>
    `;
	}
};
//#endregion
//#region src/base-card.ts
nn = rn, nn.styles = h`
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
  `, H([I({ type: Number })], rn.prototype, "value", void 0), H([I({ type: Number })], rn.prototype, "min", void 0), H([I({ type: Number })], rn.prototype, "max", void 0), H([I({ type: Number })], rn.prototype, "step", void 0), H([I()], rn.prototype, "variant", void 0), H([I({
	type: Boolean,
	reflect: !0
})], rn.prototype, "disabled", void 0), H([I({ type: Boolean })], rn.prototype, "refraction", void 0), H([I({ type: Number })], rn.prototype, "fillFrom", void 0), H([I({ type: Boolean })], rn.prototype, "showFill", void 0), H([I({ type: Boolean })], rn.prototype, "hideFillWhenZero", void 0), H([I({ type: Boolean })], rn.prototype, "showThumb", void 0), H([I({ attribute: !1 })], rn.prototype, "shaderPalette", void 0), H([L()], rn.prototype, "dragging", void 0), H([L()], rn.prototype, "dragValue", void 0), customElements.get("lg-slider") || customElements.define("lg-slider", rn), Kt();
var an = class extends Be {
	constructor(...e) {
		super(...e), this.t = qe("en"), this.updateLight = (e) => {
			if (matchMedia("(prefers-reduced-motion: reduce)").matches || !this.glassSurface) return;
			let { clientX: t, clientY: n } = e;
			this.lightFrame !== void 0 && cancelAnimationFrame(this.lightFrame), this.lightFrame = requestAnimationFrame(() => {
				if (!this.glassSurface) return;
				let e = this.glassSurface.getBoundingClientRect();
				this.glassSurface.style.setProperty("--lg-light-x", `${(t - e.left) / e.width * 100}%`), this.glassSurface.style.setProperty("--lg-light-y", `${(n - e.top) / e.height * 100}%`), this.glassSurface.style.setProperty("--lg-sheen-active", "1");
			});
		}, this.resetLight = () => {
			this.glassSurface?.style.removeProperty("--lg-light-x"), this.glassSurface?.style.removeProperty("--lg-light-y"), this.glassSurface?.style.removeProperty("--lg-sheen-active");
		}, this.openMoreInfo = () => Ze(this, this.config?.entity);
	}
	static async getConfigElement() {
		return await Wt(), document.createElement("liquid-glass-card-editor");
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
		return this.config?.name ?? Qe(this.entity, this.config?.entity ?? "");
	}
	get isDark() {
		return this.config?.theme === "dark" || this.config?.theme !== "light" && !!this.hass?.themes?.darkMode;
	}
	get refraction() {
		return this.hasAttribute("refraction");
	}
	applyRefraction() {
		let e = this.config?.refraction ?? "auto", t = e === !0 || e === "auto" && Ht();
		this.toggleAttribute("refraction", t);
	}
	willUpdate() {
		let e = this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language;
		this.t = qe(e), this.toggleAttribute("dark", this.isDark), this.setAttribute("glass-variant", this.config?.glass_variant ?? "regular");
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
		return this.refraction ? zt(this.glassGeometry) : F;
	}
	renderControlSurface(e, t = "circle") {
		return this.refraction ? F : P`<lg-glass-surface
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
		return P`<div
      class=${B({
			"icon-well": !0,
			idle: r
		})}
      style=${r ? F : V({
			"--well-from": t.from,
			"--well-to": t.to,
			"--well-glow": t.glow
		})}
      @click=${i}
      role=${i ? "button" : F}
    >
      <lg-icon .icon=${e}></lg-icon>
    </div>`;
	}
	renderTitle(e, t) {
		return P`<div class="title" @click=${this.openMoreInfo}>
      <div class="name">${e}</div>
      <div class="state">${t}</div>
    </div>`;
	}
	renderBadge(e, t) {
		return P`<div
      class="badge"
      style=${t ? V({
			"--badge-color": t.color,
			"--badge-bg": t.bg,
			"--badge-stroke": t.stroke,
			"--badge-glow": t.glow ?? t.color
		}) : F}
    >
      <span class="dot"></span><span>${e}</span>
    </div>`;
	}
	renderToggle(e, t, n) {
		return P`<div
      class=${B({
			toggle: !0,
			on: e
		})}
      style=${V({ "--toggle-color": t })}
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
		return P`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config?.icon ?? "mdi:help-circle-outline", void 0)}
          ${this.renderTitle(this.entityName, this.t("unavailable"))}
        </div>
      </div>`;
	}
};
H([I({ attribute: !1 })], an.prototype, "hass", void 0), H([L()], an.prototype, "config", void 0), H([L()], an.prototype, "glassGeometry", void 0);
//#endregion
//#region src/styles/tokens.ts
var on = h`
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
`, sn = [
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
], cn = {
	top: "to bottom",
	bottom: "to top",
	left: "to right",
	right: "to left"
};
function ln(e, t) {
	let n = sn.map((n) => {
		let r = xt(n / St.edge, n, Ct[e], St.lightAngle, St.highlight);
		return `rgb(${r >= 0 ? "255 255 255" : "0 0 0"} / calc(${t} * ${Math.min(Math.abs(r), 1).toFixed(4)})) ${n}px`;
	});
	return `linear-gradient(${cn[e]}, ${n.join(", ")})`;
}
function un(e = "var(--lg-rim-gain, 1)") {
	return Object.keys(Ct).map((t) => ln(t, e)).join(", ");
}
//#endregion
//#region src/styles/glass.ts
var dn = h`
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
    background: ${m(un())};
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
`, fn, pn = [
	"#FF453A",
	"#FF9F0A",
	"#FFD60A",
	"#30D158",
	"#0A84FF",
	"#B15CFF",
	"#FF375F"
], mn = class extends an {
	constructor(...e) {
		super(...e), this.preview = {}, this.toggle = () => this.callService("light", "toggle");
	}
	static getStubConfig(e, t, n) {
		return { entity: tt(["light"], e, t, n, (e) => (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff")) };
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
		return this.preview.hue === void 0 && this.preview.sat === void 0 && e ? rt(e) : rt(nt(this.hs[0], this.hs[1]));
	}
	get colorLike() {
		return this.supportsColor && this.activeUiMode === "color";
	}
	get accent() {
		return this.colorLike ? this.colorHex : "var(--lg-accent)";
	}
	get wellStyle() {
		if (this.isOn) return this.colorLike ? {
			from: rt(nt(this.hs[0], Math.min(this.hs[1], 60))),
			to: this.colorHex,
			glow: st(this.colorHex, .24)
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
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.isOn, n = this.t, r = this.supportsColor && this.supportsColorTemp, i = this.activeUiMode, a = this.config.presets ?? [], o = this.config.favorites === !1 ? [] : this.config.favorites ?? pn, s = this.colorHex, [c, l] = this.kelvinRange, [u, d] = this.hs, f = this.colorLike ? rt(nt(u, Math.min(d, 10))) : "#FFF8EA", p = this.colorLike ? rt(nt(u, Math.min(d, 30))) : "#FFE2A6", m = this.colorLike ? rt(nt(u, 60).map((e) => e * .5)) : "#6B5323";
		return P`${this.renderDefs()}
      <div class=${B({
			glass: !0,
			card: !0
		})}>
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? e.attributes.icon ?? "mdi:lightbulb", this.wellStyle, this.toggle)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderToggle(t, this.accent, this.toggle)}
        </div>

        ${r ? P`<div class="segment">
              ${["color", "color_temp"].map((e) => P`<button class=${B({ selected: i === e })} @click=${() => this.uiMode = e}>
                  ${i === e ? this.renderControlSurface(void 0, "pill") : F}
                  <span>${n(e === "color" ? "color" : "color_temp")}</span>
                </button>`)}
            </div>` : F}

        ${this.supportsBrightness ? P`<div class="section brightness" style=${V({
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
            </div>` : F}

        ${this.supportsColorTemp && i === "color_temp" ? P`<div class="section temp">
              <div class="label-row"><span class="label">${n("color_temp")}</span><span class="value">${Math.round(this.kelvin)}K</span></div>
              <lg-slider
                class=${B({ dim: !t })}
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
            </div>` : F}

        ${this.supportsColor && i === "color" ? P`<div class="section hue">
                <div class="label-row"><span class="label">${n("hue")}</span><span class="value">${Math.round(u)}°</span></div>
                <lg-slider
                  class=${B({ dim: !t })}
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
              <div class="section sat" style=${V({ "--sat-color": rt(nt(u, 100)) })}>
                <div class="label-row"><span class="label">${n("saturation")}</span><span class="value">${Math.round(d)}%</span></div>
                <lg-slider
                  class=${B({ dim: !t })}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${[
			"#ffffff",
			"#ffffff",
			rt(nt(u, 100)),
			rt(nt(u, 100))
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
              ${o.length ? P`<div class=${B({
			favorites: !0,
			muted: !t
		})}>
                    <div class="label">${n("favorites")}</div>
                    <div class="swatches">
                      ${o.map((e) => P`<button
                          class=${B({
			swatch: !0,
			selected: t && e.toLowerCase() === s.toLowerCase()
		})}
                          style=${V({
			"--swatch": e,
			"--swatch-glow": st(e, .5)
		})}
                          title=${e}
                          @click=${() => this.applyPreset({
			name: e,
			rgb_color: hn(e)
		})}
                        ></button>`)}
                      <button class="swatch add" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:plus"></lg-icon></button>
                    </div>
                  </div>` : F}` : F}

        ${a.length ? P`<div class=${B({
			chips: !0,
			muted: !t
		})}>
              ${a.map((e) => P`<button class="chip" @click=${() => this.applyPreset(e)}>
                  ${this.renderControlSurface(void 0, "pill")}
                  ${e.icon ? P`<lg-icon .icon=${e.icon}></lg-icon>` : F}<span>${e.name}</span>
                </button>`)}
            </div>` : F}
      </div>`;
	}
};
fn = mn, fn.styles = [
	on,
	dn,
	h`
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
], H([L()], mn.prototype, "uiMode", void 0), H([L()], mn.prototype, "preview", void 0);
function hn(e) {
	let t = parseInt(e.replace("#", ""), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	].map((e) => R(e, 0, 255));
}
customElements.get("liquid-glass-light-card") || customElements.define("liquid-glass-light-card", mn);
//#endregion
//#region src/cards/slider-card.ts
var gn, _n = [
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
], vn = (e) => e !== null && e !== "" && Number.isFinite(Number(e)) ? Number(e) : void 0, yn = class extends an {
	static getStubConfig(e, t, n) {
		return { entity: tt(_n, e, t, n) };
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
					min: vn(t.min) ?? 0,
					max: vn(t.max) ?? 100,
					step: vn(t.step) ?? 1,
					unit: t.unit_of_measurement ?? "",
					icon: "mdi:tune-variant",
					value: vn(e.state),
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
					step: vn(t.percentage_step) ?? 1,
					unit: "%",
					icon: "mdi:fan",
					value: e.state === "on" ? vn(t.percentage) ?? 0 : 0,
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
					value: e.state === "on" ? Math.round((vn(t.brightness) ?? 0) / 255 * 100) : 0,
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
					value: Math.round((vn(t.volume_level) ?? 0) * 100),
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
					value: vn(t.current_position) ?? (e.state === "closed" ? 0 : 100),
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
					value: vn(t.current_position) ?? (e.state === "closed" ? 0 : 100),
					call: (e) => [
						"valve",
						"set_valve_position",
						{ position: Math.round(e) }
					]
				};
				break;
			case "humidifier":
				i = {
					min: vn(t.min_humidity) ?? 0,
					max: vn(t.max_humidity) ?? 100,
					step: 1,
					unit: "%",
					icon: "mdi:air-humidifier",
					value: vn(t.humidity),
					call: (e) => [
						"humidifier",
						"set_humidity",
						{ humidity: Math.round(e) }
					]
				};
				break;
			case "water_heater":
				i = {
					min: vn(t.min_temp) ?? 30,
					max: vn(t.max_temp) ?? 60,
					step: vn(t.target_temp_step) ?? 1,
					unit: "°",
					icon: "mdi:water-boiler",
					value: vn(t.temperature),
					call: (e) => [
						"water_heater",
						"set_temperature",
						{ temperature: e }
					]
				};
				break;
			case "climate":
				i = {
					min: vn(t.min_temp) ?? 7,
					max: vn(t.max_temp) ?? 35,
					step: vn(t.target_temp_step) ?? .5,
					unit: "°",
					icon: "mdi:thermostat",
					value: vn(t.temperature),
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
				value: vn(e.state)
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
			value: n.attribute ? vn(t[n.attribute]) : i.value,
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
		}) : n("slider_step", { s: `${z(this.hass, e.step)}${e.unit}` });
	}
	tickCount(e) {
		let t = this.config.ticks;
		if (typeof t == "number") return R(Math.round(t), 0, 20);
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
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.spec(), n = R(this.preview ?? (this.settled(t) ? t.value : this.pending) ?? t.min, t.min, t.max), r = t.min === 0 && n <= 0, i = this.config.decimals ?? +!Number.isInteger(t.step), a = this.config.accent, o = a ? at(a, .4) : "var(--lg-slider-accent-light)", s = a ? ot(a, .3) : "var(--lg-slider-accent-deep)", c = a ? st(a, .3) : "rgba(94, 92, 230, 0.3)", l = a ? at(a, .55) : "var(--lg-slider-fill-light)", u = a ?? "var(--lg-slider-accent)", d = r ? void 0 : {
			from: o,
			to: s,
			glow: c
		}, f = this.tickCount(t), p = !t.call, m = (e) => z(this.hass, e, i);
		return P`${this.renderDefs()}
      <div class="glass card" style=${V({
			"--fill-from": l,
			"--fill-to": u
		})}>
        <div class="header">
          ${this.renderIconWell(t.icon, d)}
          ${this.renderTitle(this.entityName, this.subtitleFor(t, n))}
          <div class=${B({
			value: !0,
			zero: r
		})}>
            <span class="num">${m(n)}</span>
            ${t.unit ? P`<span class="unit">${t.unit}</span>` : F}
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
          ${f ? P`<div class="marks">${Array.from({ length: f }, () => P`<span></span>`)}</div>` : F}
        </div>

        ${this.config.show_range === !1 ? F : P`<div class="ticks">
              <span>${m(t.min)}${t.unit}</span>
              <span>${m(t.max)}${t.unit}</span>
            </div>`}
      </div>`;
	}
};
gn = yn, gn.styles = [
	on,
	dn,
	h`
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
], H([L()], yn.prototype, "preview", void 0), H([L()], yn.prototype, "pending", void 0);
var bn = _n;
customElements.get("liquid-glass-slider-card") || customElements.define("liquid-glass-slider-card", yn);
//#endregion
//#region src/cards/button-card.ts
var xn, Sn = [
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
function Cn(e, t) {
	let n = e ? {
		from: at(e, .45),
		to: e
	} : t;
	return {
		...n,
		glow: st(n.to, .3)
	};
}
var wn = {
	scene: {
		service: "scene.turn_on",
		icon: "mdi:palette",
		well: Sn[0],
		label: "btn_scene"
	},
	script: {
		service: "script.turn_on",
		icon: "mdi:script-text-play",
		well: Sn[1],
		label: "btn_script"
	},
	automation: {
		service: "automation.trigger",
		icon: "mdi:robot",
		well: Sn[3],
		label: "btn_automation"
	},
	button: {
		service: "button.press",
		icon: "mdi:gesture-tap-button",
		well: Sn[3],
		label: "btn_button"
	},
	input_button: {
		service: "input_button.press",
		icon: "mdi:gesture-tap-button",
		well: Sn[3],
		label: "btn_button"
	}
}, Tn = 2600, En = class extends an {
	constructor(...e) {
		super(...e), this.justRan = !1, this.press = () => {
			let [e, t] = (this.config.service ?? this.spec?.service ?? "").split(".");
			e && t && (this.hass?.callService(e, t, {
				entity_id: this.config.entity,
				...this.config.service_data ?? {}
			}), this.justRan = !0, window.clearTimeout(this.doneTimer), this.doneTimer = window.setTimeout(() => this.justRan = !1, Tn));
		}, this.onKeyDown = (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), this.press());
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: tt(Object.keys(wn), e, t, n) };
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
		return wn[this.domain];
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
		let i = Date.now() - new Date(r).getTime() < 432e5 ? Je(r, t) : Ye(r);
		return `${n} · ${t("last")} ${i}`;
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = Cn(this.config.accent, this.spec?.well ?? Sn[0]), n = this.config.icon ?? e.attributes.icon ?? this.spec?.icon ?? "mdi:gesture-tap-button";
		return P`${this.renderDefs()}
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
        <div class=${B({
			action: !0,
			done: this.justRan
		})}>
          <lg-icon .icon=${this.justRan ? "mdi:check" : "mdi:play"}></lg-icon>
        </div>
      </div>`;
	}
};
xn = En, xn.styles = [
	on,
	dn,
	h`
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
], H([L()], En.prototype, "justRan", void 0), customElements.get("liquid-glass-button-card") || customElements.define("liquid-glass-button-card", En);
//#endregion
//#region src/editor/schema.ts
var Dn = (e) => ({
	name: e,
	selector: { text: {} }
}), On = (e) => ({
	name: e,
	selector: { boolean: {} }
}), kn = (e) => ({
	name: e,
	selector: { icon: {} }
}), An = (e) => ({
	name: e,
	selector: { object: {} }
}), jn = (e) => ({
	name: "",
	type: "grid",
	schema: e
}), Mn = (e, t, n = !1) => ({
	name: e,
	required: n,
	selector: { entity: { domain: t } }
}), Nn = (e, t, n, r = 1) => ({
	name: e,
	selector: { number: {
		min: t,
		max: n,
		step: r,
		mode: "box"
	} }
}), Pn = (e, t, n = !1) => ({
	name: e,
	selector: { select: {
		options: t,
		multiple: n,
		mode: "dropdown"
	} }
});
function Fn(e) {
	return [Mn("entity", e, !0), jn([Dn("name"), kn("icon")])];
}
function In(e) {
	return {
		name: "",
		type: "expandable",
		title: e("ed_advanced"),
		icon: "mdi:tune",
		schema: [
			jn([Pn("theme", [
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
			]), Pn("refraction", [
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
			Pn("language", [{
				value: "ja",
				label: "日本語"
			}, {
				value: "en",
				label: "English"
			}]),
			Pn("glass_variant", [{
				value: "regular",
				label: e("ed_glass_variant_regular")
			}, {
				value: "clear",
				label: e("ed_glass_variant_clear")
			}])
		]
	};
}
var Ln = [
	"auto",
	"heat_cool",
	"heat",
	"cool",
	"dry",
	"fan_only",
	"off"
];
function Rn(e) {
	return (e ?? "").replace(/^custom:/, "").replace(/^liquid-glass-/, "").replace(/-card$/, "");
}
function zn(e, t, n) {
	switch (Rn(e)) {
		case "light": return [
			...Fn("light"),
			jn([
				On("show_brightness"),
				On("show_color_temp"),
				On("show_color")
			]),
			{
				name: "favorites",
				selector: { text: { multiple: !0 } }
			},
			An("presets"),
			In(t)
		];
		case "climate": return [
			...Fn("climate"),
			Pn("design", [{
				value: "classic",
				label: t("ed_design_classic")
			}, {
				value: "compact",
				label: t("ed_design_compact")
			}]),
			...n?.design === "compact" || n?.design === "a" ? [On("show_fan_mode")] : [jn([
				On("show_fan_mode"),
				On("show_preset_mode"),
				On("show_swing_mode")
			])],
			Pn("hvac_modes", Ln.map((e) => ({
				value: e,
				label: t(`mode_${e}`)
			})), !0),
			In(t)
		];
		case "switch": return [
			...Fn([
				"switch",
				"input_boolean",
				"fan",
				"light",
				"automation",
				"humidifier",
				"siren",
				"remote"
			]),
			Mn("power_entity", "sensor"),
			In(t)
		];
		case "sensor": {
			let e = n?.value_in_caption === !0;
			return [
				...Fn("sensor"),
				jn(e ? [On("value_in_caption"), On("trend")] : [
					On("value_in_caption"),
					On("graph"),
					On("trend")
				]),
				jn(e ? [Nn("decimals", 0, 4)] : [Nn("hours_to_show", 1, 168), Nn("decimals", 0, 4)]),
				Dn("accent"),
				jn([Mn("secondary_entity", ["sensor", "binary_sensor"]), Dn("secondary_label")]),
				In(t)
			];
		}
		case "binary-sensor": return [
			...Fn("binary_sensor"),
			jn([kn("icon_on"), kn("icon_off")]),
			jn([Dn("label_on"), Dn("label_off")]),
			Dn("accent"),
			In(t)
		];
		case "lock": return [
			...Fn("lock"),
			An("buttons"),
			In(t)
		];
		case "cover": return [
			...Fn("cover"),
			jn([Pn("style", [{
				value: "blind",
				label: t("ed_style_blind")
			}, {
				value: "curtain",
				label: t("ed_style_curtain")
			}]), Pn("curtain", [{
				value: "double",
				label: t("ed_curtain_double")
			}, {
				value: "single",
				label: t("ed_curtain_single")
			}])]),
			On("show_tilt"),
			In(t)
		];
		case "media": return [
			...Fn("media_player"),
			jn([On("show_volume"), On("show_device")]),
			Dn("source_color"),
			In(t)
		];
		case "slider": return [
			...Fn(bn),
			jn([Nn("min", -1e3, 1e4, .1), Nn("max", -1e3, 1e4, .1)]),
			jn([Nn("step", .01, 1e3, .01), Dn("unit")]),
			jn([
				On("ticks"),
				On("show_range"),
				Nn("decimals", 0, 4)
			]),
			Dn("subtitle"),
			Dn("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [Dn("attribute"), jn([Dn("service"), Dn("service_key")])]
			},
			In(t)
		];
		case "weather": {
			let e = n?.layout === "row", r = Pn("layout", [{
				value: "full",
				label: t("ed_layout_full")
			}, {
				value: "row",
				label: t("ed_layout_row")
			}]);
			return e ? [
				...Fn("weather"),
				r,
				In(t)
			] : [
				...Fn("weather"),
				r,
				jn([
					On("show_hourly"),
					On("show_daily"),
					On("show_metrics")
				]),
				jn([Nn("hourly_count", 2, 12), Nn("daily_count", 1, 10)]),
				In(t)
			];
		}
		case "button": return [
			...Fn(Object.keys(wn)),
			Dn("subtitle"),
			Dn("accent"),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [Dn("service"), An("service_data")]
			},
			In(t)
		];
		case "scene": return [
			jn([Pn("style", [{
				value: "tiles",
				label: t("ed_style_tiles")
			}, {
				value: "chips",
				label: t("ed_style_chips")
			}]), Nn("columns", 1, 6)]),
			jn([Dn("title"), On("show_count")]),
			An("scenes"),
			In(t)
		];
		case "group": return [
			jn([Dn("title"), kn("icon")]),
			Dn("subtitle"),
			jn([
				On("collapsible"),
				On("collapsed"),
				On("summary")
			]),
			An("cards"),
			In(t)
		];
		case "separator": {
			let e = n?.style ?? "pill";
			return [
				jn([Dn("title"), kn("icon")]),
				Pn("style", [
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
				...e === "header" ? [Dn("subtitle")] : [Nn("count", 0, 999)],
				In(t)
			];
		}
		case "camera": return [
			...Fn("camera"),
			Mn("motion_entity", "binary_sensor"),
			jn([On("show_actions"), On("show_mic")]),
			jn([Nn("refresh_interval", 1, 300), Nn("aspect_ratio", .5, 3, .01)]),
			{
				name: "",
				type: "expandable",
				title: t("ed_custom_entity"),
				icon: "mdi:code-braces",
				schema: [Dn("snapshot_service"), Dn("mic_service")]
			},
			In(t)
		];
		default: return [
			Mn("entity", [], !0),
			jn([Dn("name"), kn("icon")]),
			In(t)
		];
	}
}
var Bn = /* @__PURE__ */ new Set([
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
function Vn(e) {
	let t = /* @__PURE__ */ new Set(), n = (e) => {
		for (let r of e) r.schema ? n(r.schema) : r.name && t.add(r.name);
	};
	return n(e), t;
}
var Hn = {
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
}, Un, Wn = class extends Be {
	constructor(...e) {
		super(...e), this.computeLabel = (e) => this.t(`ed_${e.name}`), this.computeHelper = (e) => {
			let t = Hn[e.name];
			return t ? this.t(t) : void 0;
		}, this.valueChanged = (e) => {
			e.stopPropagation(), Xe(this, "config-changed", { config: this.fromForm(e.detail.value) });
		};
	}
	setConfig(e) {
		this.config = e;
	}
	toForm(e) {
		let { refraction: t, theme: n, ...r } = e, i = { ...r };
		if (i.refraction = t === !0 ? "on" : t === !1 ? "off" : "auto", i.theme = n ?? "auto", i.glass_variant = r.glass_variant ?? "regular", Rn(e.type) === "weather" && (i.layout = r.layout ?? "full"), Rn(e.type) === "climate") {
			let e = r.design;
			i.design = e === "a" ? "compact" : e ?? "classic";
		}
		Rn(e.type) === "separator" && (i.style = r.style ?? "pill");
		for (let t of Vn(zn(e.type, this.t, i))) Bn.has(t) && (i[t] = Rn(e.type) === "climate" && i.design === "compact" && t === "show_fan_mode" ? r[t] === !0 : r[t] !== !1);
		if (Rn(e.type) === "light") {
			let e = r.favorites;
			i.favorites = e === !1 ? [] : e ?? pn;
		}
		return i;
	}
	fromForm(e) {
		let t = { ...e }, n = Rn(t.type) === "climate" && (t.design === "compact" || t.design === "a"), r = this.config, i = r?.design === "compact" || r?.design === "a";
		r && n !== i && r.show_fan_mode === void 0 && delete t.show_fan_mode;
		for (let [e, r] of Object.entries(t)) if (typeof r == "boolean") {
			if (n && e === "show_fan_mode") {
				r === !1 && delete t[e];
				continue;
			}
			r === Bn.has(e) && delete t[e];
		}
		t.refraction === "on" ? t.refraction = !0 : t.refraction === "off" ? t.refraction = !1 : delete t.refraction, t.theme === "auto" && delete t.theme, t.glass_variant === "regular" && delete t.glass_variant, t.layout === "full" && delete t.layout, t.design === "classic" && delete t.design, t.style === "pill" && Rn(t.type) === "separator" && delete t.style;
		let a = t.favorites;
		Array.isArray(a) && a.join() === pn.join() && delete t.favorites;
		for (let [e, n] of Object.entries(t)) (n == null || n === "" || Array.isArray(n) && n.length === 0 && e !== "favorites") && delete t[e];
		return t;
	}
	get t() {
		return qe(this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language);
	}
	render() {
		return !this.hass || !this.config ? F : P`<ha-form
      .hass=${this.hass}
      .data=${this.toForm(this.config)}
      .schema=${zn(this.config.type, this.t, this.config)}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}
    ></ha-form>`;
	}
};
Un = Wn, Un.styles = h`
    :host {
      display: block;
    }
  `, H([I({ attribute: !1 })], Wn.prototype, "hass", void 0), H([L()], Wn.prototype, "config", void 0), customElements.get("liquid-glass-card-editor") || customElements.define("liquid-glass-card-editor", Wn);
//#endregion
//#region src/cards/climate-card.ts
var Gn, Kn = 250, qn = 24, Jn = Kn / 2 - qn / 2, Yn = 135, Xn = 4e3, Zn = 270, Qn = (e, t = Jn) => {
	let n = e * Math.PI / 180;
	return [Kn / 2 + t * Math.cos(n), Kn / 2 + t * Math.sin(n)];
};
function $n(e, t) {
	let [n, r] = Qn(e), [i, a] = Qn(t);
	return `M ${n} ${r} A ${Jn} ${Jn} 0 ${+(t - e > 180)} 1 ${i} ${a}`;
}
var er = class extends an {
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
				value: R(i, t, n)
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
		return { entity: tt(["climate"], e, t, n) };
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
		return R((e - t) / (n - t || 1), 0, 1);
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
		return e.current_temperature !== void 0 && t.push(`${this.t("room_temp")} ${z(this.hass, e.current_temperature, 1)}°`), e.current_humidity !== void 0 && t.push(`${this.t("humidity")} ${z(this.hass, e.current_humidity, 0)}%`), t.join(" · ");
	}
	tileStateText() {
		let e = this.entity?.attributes ?? {}, t = [this.actionText()];
		return e.current_humidity !== void 0 && t.push(`${this.t("humidity")} ${z(this.hass, e.current_humidity, 0)}%`), t.join(" · ");
	}
	shownValue(e, t, n) {
		return this.drag?.which === e ? this.drag.value : this.pending?.[e] ?? t ?? n;
	}
	valueFromPointer(e) {
		let t = this.shadowRoot?.querySelector(".dial");
		if (!t) return 0;
		let n = t.getBoundingClientRect(), r = e.clientX - (n.left + n.width / 2), i = e.clientY - (n.top + n.height / 2), a = Math.atan2(i, r) * 180 / Math.PI;
		a = ((a - Yn) % 360 + 360) % 360, a > Zn && (a = a > 315 ? 0 : Zn);
		let [o, s] = this.range, c = o + a / Zn * (s - o);
		return R(Math.round(c / this.step) * this.step, o, s);
	}
	valueFromTilePointer(e) {
		let t = this.shadowRoot?.querySelector(".tile-track");
		if (!t) return this.range[0];
		let n = t.getBoundingClientRect(), r = n.height / 2, i = R((e.clientX - n.left - r) / Math.max(n.width - r * 2, 1), 0, 1), [a, o] = this.range;
		return R(Math.round((a + i * (o - a)) / this.step) * this.step, a, o);
	}
	stepTileTemperature(e) {
		if (this.mode === "off") return;
		let t = this.entity?.attributes ?? {}, [n, r] = this.range;
		if (this.isRange) {
			let i = this.shownValue("low", t.target_temp_low, n), a = this.shownValue("high", t.target_temp_high, r), o = R(e, n - i, r - a);
			if (o === 0) return;
			let s = i + o, c = a + o;
			this.callService("climate", "set_temperature", {
				target_temp_low: s,
				target_temp_high: c
			}), this.hold("low", s), this.hold("high", c);
			return;
		}
		let i = this.shownValue("single", t.temperature, n), a = R(i + e, n, r);
		a !== i && (this.callService("climate", "set_temperature", { temperature: a }), this.hold("single", a));
	}
	hold(e, t) {
		this.pending = {
			...this.pending,
			[e]: t
		}, window.clearTimeout(this.pendingTimer), this.pendingTimer = window.setTimeout(() => this.pending = void 0, Xn);
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
		let t = this.entity.attributes, n = this.mode === "off", r = this.t, [i, a] = this.range, o = this.shownValue("single", t.temperature, i), s = this.shownValue("low", t.target_temp_low, i), c = this.shownValue("high", t.target_temp_high, a), l = this.isRange, u = l ? Yn + this.ratio(s) * Zn : Yn, d = Yn + this.ratio(l ? c : o) * Zn, [f, p, m] = e.ring, h = (u - Yn) / Zn, g = (d - Yn) / Zn, _ = l ? [s, c] : [o], v = l ? z(this.hass, s, 0) + "–" + z(this.hass, c, 0) : z(this.hass, Math.floor(o), 0), y = l ? "°" : `.${Math.round((o - Math.floor(o)) * 10)}°`;
		return P`<div class="dial-row">
      <div class=${B({
			dial: !0,
			dragging: this.drag !== void 0
		})} @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg
          viewBox="0 0 ${Kn} ${Kn}"
          style=${V({
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
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1="0" y1=${Kn} x2=${Kn} y2="0">
              <stop offset="0" stop-color="var(--lg-ring-0)" />
              <stop offset="0.55" stop-color="var(--lg-ring-1)" />
              <stop offset="1" stop-color="var(--lg-ring-2)" />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${$n(Yn, 405)} />
          <!--
            The fill is the whole arc, revealed by the dash pattern. Redrawing a shorter
            path would jump between modes; a dash length interpolates.
            pathLength="1" puts the dash values in fractions of the sweep.
          -->
          <path
            class="ring-fill"
            d=${$n(Yn, 405)}
            pathLength="1"
            stroke="url(#ring-grad)"
            style=${V({
			strokeDasharray: `${Math.max(g - h, 0).toFixed(4)} 1`,
			strokeDashoffset: (-h).toFixed(4),
			opacity: n ? "0" : "1"
		})}
          />
        </svg>
        ${n ? F : _.map((e) => this.renderKnobAt(e))}
        <div class="center">
          <div class="caption">${r(l ? "target_range" : "target_temp")}</div>
          <div class=${B({
			"temp-row": !0,
			off: n
		})}>
            <span class=${B({
			target: !0,
			range: l
		})}>${v}</span><span class="fraction">${y}</span>
          </div>
          ${t.current_temperature === void 0 ? F : P`<div class="current">${r("room_temp")} ${z(this.hass, t.current_temperature, 1)}°</div>`}
        </div>
        <div class="minmax"><span>${z(this.hass, i, 0)}°</span><span>${z(this.hass, a, 0)}°</span></div>
      </div>
    </div>`;
	}
	renderKnobAt(e) {
		let [t, n] = Qn(Yn + this.ratio(e) * Zn);
		return P`<div
      class="dial-knob knob"
      style=${V({
			left: `${(t / Kn * 100).toFixed(3)}%`,
			top: `${(n / Kn * 100).toFixed(3)}%`
		})}
    >
      ${this.refraction ? F : P`<lg-glass-surface
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
		return r?.length ? P`<div class="detail">
      <lg-icon .icon=${t}></lg-icon>
      <div class="text">
        <span class="dl">${this.t(e === "preset_mode" ? "preset" : e)}</span>
        <span class="dv">${i ?? "—"}</span>
      </div>
      <lg-icon icon="mdi:chevron-down"></lg-icon>
      <select .value=${i ?? ""} @change=${(t) => this.callService("climate", `set_${e}`, { [e]: t.target.value })}>
        ${r.map((e) => P`<option value=${e} ?selected=${e === i}>${e}</option>`)}
      </select>
    </div>` : F;
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
			number: z(this.hass, Number(t), 0),
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
		], n = Math.min(t.findIndex(([t]) => e <= t), t.length - 1), [r, i] = t[Math.max(n, 1)], [a, o] = t[Math.max(n - 1, 0)], s = R((e - a) / Math.max(r - a, .001), 0, 1), [c, l, u] = o.map((e, t) => Math.round(e + (i[t] - e) * s));
		return `rgba(${c}, ${l}, ${u}, 0.58)`;
	}
	renderCompact(e, t) {
		let n = this.entity.attributes, r = this.mode === "off", [i, a] = this.range, o = this.shownValue("single", n.temperature, i), s = this.shownValue("low", n.target_temp_low, i), c = this.shownValue("high", n.target_temp_high, a), l = this.isRange, u = l ? this.ratio(s) : 0, d = this.ratio(l ? c : o), f = n.current_temperature, p = this.targetParts(o), m = this.tileSelectedColor();
		return P`${this.renderDefs()}
      <div class="glass card climate-compact">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? e.icon, e.well)}
          ${this.renderTitle(this.entityName, this.tileStateText())}
          ${this.renderBadge(e.label, e.badge)}
        </div>

        <div class="tile-readout">
          <div class=${B({
			"tile-target": !0,
			range: l,
			off: r
		})}>
            <span class="number">${l ? `${z(this.hass, s, 0)}–${z(this.hass, c, 0)}` : p.number}</span>
            <span class="fraction">${l ? "°" : p.fraction}</span>
          </div>
          ${f === void 0 ? F : P`<div class="tile-room">
                <span class="caption">${this.t("room_temp")}</span>
                <span class="value">${z(this.hass, f, 1)}°</span>
              </div>`}
        </div>

        <div
          class=${B({
			"tile-track": !0,
			dragging: this.drag !== void 0,
			off: r
		})}
          style=${V({
			"--clip-left": u <= 0 ? "0px" : `calc(var(--lg-tile-slider-size) / 2 + (100% - var(--lg-tile-slider-size)) * ${u})`,
			"--clip-right": d >= 1 ? "0px" : `calc(100% - var(--lg-tile-slider-size) / 2 - (100% - var(--lg-tile-slider-size)) * ${d})`
		})}
          role="slider"
          tabindex=${r ? -1 : 0}
          aria-valuemin=${i}
          aria-valuemax=${a}
          aria-valuenow=${l ? F : o}
          aria-valuetext=${l ? `${s}–${c}` : String(o)}
          aria-disabled=${r}
          @pointerdown=${this.onTileDown}
          @pointermove=${this.onTileMove}
          @pointerup=${this.onDialUp}
          @pointercancel=${this.onDialUp}
          @keydown=${this.onTileKeyDown}
        >
          <div class="tile-gradient" style=${V({ opacity: r ? "0" : "1" })}></div>
          ${r ? F : (l ? [s, c] : [o]).map((e) => {
			let t = this.tileGradientColor(this.ratio(e));
			return P`<div
                    class="tile-thumb"
                    style=${V({
				"--value": String(this.ratio(e)),
				"--tile-thumb-color": t
			})}
                  >
                    ${this.refraction ? F : P`<lg-glass-surface
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

        ${t.length ? P`<div
              class="tile-modes"
              style=${V({
			"--selected-color": m,
			"--n": String(t.length),
			"--i": String(Math.max(t.indexOf(this.mode), 0))
		})}
            >
              <div class="tile-mode-pill" style=${V({ opacity: t.includes(this.mode) ? "1" : "0" })}></div>
              ${t.map((e) => {
			let t = this.tileModeMeta(e);
			return P`<button
                  class=${B({ selected: e === this.mode })}
                  title=${t.label}
                  aria-label=${t.label}
                  aria-pressed=${e === this.mode}
                  @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: e })}
                >
                  <lg-icon .icon=${t.icon}></lg-icon>
                </button>`;
		})}
            </div>` : F}

        ${this.config.show_fan_mode === !0 ? P`<div class=${B({
			details: !0,
			muted: r
		})}>${this.renderDetail("fan_mode", "mdi:weather-windy")}</div>` : F}
      </div>`;
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.theme(), n = this.mode === "off", r = (this.config.hvac_modes ?? e.attributes.hvac_modes ?? []).filter(Boolean), i = this.config.show_fan_mode !== !1, a = this.config.show_preset_mode !== !1, o = this.config.show_swing_mode === !0;
		return this.config.design === "compact" || this.config.design === "a" ? this.renderCompact(t, r) : P`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? t.icon, t.well)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(t.label, t.badge)}
        </div>

        ${this.renderDial(t)}

        ${r.length ? P`<div
              class="segment modes"
              style=${V({
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
              <div class="seg-pill" style=${V({ opacity: r.includes(this.mode) ? "1" : "0" })}></div>
              ${r.map((e) => {
			let t = this.modeMeta(e);
			return P`<button class=${B({ selected: e === this.mode })} @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: e })}>
                  <lg-icon .icon=${t.icon}></lg-icon><span>${t.label}</span>
                </button>`;
		})}
            </div>` : F}

        ${i || a || o ? P`<div class=${B({
			details: !0,
			muted: n
		})}>
              ${i ? this.renderDetail("fan_mode", "mdi:weather-windy") : F}
              ${a ? this.renderDetail("preset_mode", "mdi:creation") : F}
              ${o ? this.renderDetail("swing_mode", "mdi:arrow-oscillating") : F}
            </div>` : F}
      </div>`;
	}
};
Gn = er, Gn.styles = [
	on,
	dn,
	h`
      .dial-row {
        display: flex;
        justify-content: center;
      }
      /* The SVG scales with its viewBox, so everything layered on top is positioned in
         percentages of the dial rather than in the 250px design units. */
      .dial {
        position: relative;
        width: min(${Kn}px, 100%);
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
        stroke-width: ${qn}px;
      }
      .ring-track-stroke {
        fill: none;
        stroke: var(--lg-glass-stroke);
        stroke-width: 1px;
      }
      .ring-fill {
        fill: none;
        stroke-width: ${qn}px;
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
], H([L()], er.prototype, "drag", void 0), H([L()], er.prototype, "pending", void 0), customElements.get("liquid-glass-climate-card") || customElements.define("liquid-glass-climate-card", er);
//#endregion
//#region src/cards/switch-card.ts
var tr, nr = 500, rr = 10, ir = class extends an {
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
			}, nr));
		}, this.onPointerMove = (e) => {
			this.holdOrigin && (Math.abs(e.clientX - this.holdOrigin.x) > rr || Math.abs(e.clientY - this.holdOrigin.y) > rr) && this.cancelHold();
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
		return { entity: tt([
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
			if (n && !$e(n)) {
				let t = n.attributes.unit_of_measurement ?? "W";
				return `${e("on")} · ${e("power")} ${z(this.hass, Number(n.state), 0)} ${t}`;
			}
			return `${e("on")} · ${e("since", { t: Je(t.last_changed, e) })}`;
		}
		return `${e("off")} · ${e("last_on")} ${Je(t.last_changed, e)}`;
	}
	defaultIcon() {
		let e = this.config.entity?.split(".")[0];
		return e === "fan" ? "mdi:fan" : e === "light" ? "mdi:lightbulb" : e === "automation" ? "mdi:robot" : "mdi:power-plug";
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.isOn, n = t ? {
			from: "var(--lg-switch-accent-light)",
			to: "var(--lg-switch-accent)",
			glow: "rgba(10,132,255,0.24)"
		} : void 0;
		return P`${this.renderDefs()}
      <div
        class=${B({
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
tr = ir, tr.styles = [
	on,
	dn,
	h`
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
], customElements.get("liquid-glass-switch-card") || customElements.define("liquid-glass-switch-card", ir);
//#endregion
//#region src/cards/sensor-card.ts
var ar, or = 340, sr = 84, cr = 3e5, lr = class extends an {
	constructor(...e) {
		super(...e), this.points = [], this.lastFetch = 0, this.fetchedFor = "";
	}
	static getStubConfig(e, t, n) {
		return { entity: tt(["sensor"], e, t, n, (e) => Number.isFinite(Number(e.state))) };
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
		let t = `${this.config.entity}:${this.hours}`, n = Date.now() - this.lastFetch > cr;
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
		let c = a[a.length - 1], l = `${s} L ${c.toFixed(1)} ${sr} L ${a[0].toFixed(1)} ${sr} Z`;
		return {
			line: s,
			area: l,
			last: [c, o[o.length - 1]]
		};
	}
	formattedValue() {
		let e = this.entity, t = Number(e.state);
		return Number.isFinite(t) ? z(this.hass, t, this.config.decimals) : e.state;
	}
	withUnit(e, t) {
		return t ? /^[°%]/.test(t) ? `${e}${t}` : `${e} ${t}` : e;
	}
	subtitle(e) {
		let t = this.t, n = e ? [e] : [];
		if (n.push(t("updated_ago", { t: Je(this.entity?.last_updated, t) })), this.config.secondary_entity) {
			let e = this.hass?.states[this.config.secondary_entity];
			if (e && !$e(e)) {
				let t = this.config.secondary_label ?? e.attributes.friendly_name ?? "";
				n.push(`${t} ${e.state}${e.attributes.unit_of_measurement ?? ""}`.trim());
			}
		}
		return n.join(" · ");
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.t, n = this.accent, r = Number(e.state), i = Number.isFinite(r), a = this.config.decimals, o = e.attributes.unit_of_measurement ?? "", s = i ? this.trend() : void 0, c = this.showGraph ? this.sparkPath() : void 0, l = this.points.map((e) => e.v), u = l.length ? Math.min(...l) : void 0, d = l.length ? Math.max(...l) : void 0, f = this.config.icon ?? e.attributes.icon ?? (e.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer"), p = (s ?? 0) >= 0, m = o === "°C" || o === "°F" ? "°" : o.length <= 3 ? o : "", h = this.valueInCaption, g = h, _ = this.subtitle(g ? this.withUnit(this.formattedValue(), o) : void 0), v = P`
      ${this.renderIconWell(f, {
			from: at(n),
			to: n,
			glow: st(n, .24)
		})}
      ${this.renderTitle(this.entityName, _)}
      ${s === void 0 ? F : P`<div
            class="badge trend"
            style=${V({
			"--badge-color": p ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
			"--badge-bg": p ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
			"--badge-stroke": p ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)"
		})}
          >
            <lg-icon .icon=${p ? "mdi:trending-up" : "mdi:trending-down"}></lg-icon>
            <span>${p ? "+" : "−"}${z(this.hass, Math.abs(s), 1)}${m}</span>
          </div>`}`;
		return P`${this.renderDefs()}
      <div class=${B({
			glass: !0,
			card: !0,
			row: h
		})} style=${V({ "--accent": n })}>
        ${h ? v : P`<div class="header">${v}</div>`}

        ${g ? F : P`<div class="value-row">
              <div class="value">
                <span class="number">${i ? z(this.hass, r, a) : e.state}</span>
                ${o ? P`<span class="unit">${o}</span>` : F}
              </div>
              ${this.showGraph && u !== void 0 && d !== void 0 ? P`<div class="range">
                    <span class="caption">${this.hours === 24 ? t("hours_24") : `${this.hours} h`}</span>
                    <span class="rv">${z(this.hass, u, a ?? 1)} – ${z(this.hass, d, a ?? 1)} ${o}</span>
                  </div>` : F}
            </div>`}

        ${this.showGraph ? P`<svg class="spark" viewBox="0 0 ${or} ${sr}" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color=${n} stop-opacity="0.4" />
                    <stop offset="1" stop-color=${n} stop-opacity="0" />
                  </linearGradient>
                </defs>
                ${c ? Se`<path d=${c.area} fill="url(#area)" />
                        <path class="line" d=${c.line} />
                        <circle class="dot" cx=${c.last[0]} cy=${c.last[1]} r="4.75" />` : F}
              </svg>
              <div class=${B({ axis: !0 })}>
                <span>${t("hours_ago", { n: this.hours })}</span>
                <span>${t("hours_ago", { n: Math.round(this.hours / 2) })}</span>
                <span>${t("now")}</span>
              </div>` : F}
      </div>`;
	}
};
ar = lr, ar.styles = [
	on,
	dn,
	h`
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
        height: var(--lg-spark, ${sr}px);
        overflow: visible;
        display: block;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-value: clamp(26px, 13.5cqi, 52px);
          --lg-value-unit: clamp(13px, 5.8cqi, 22px);
          --lg-spark: clamp(52px, 22cqi, ${sr}px);
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
], H([L()], lr.prototype, "points", void 0), customElements.get("liquid-glass-sensor-card") || customElements.define("liquid-glass-sensor-card", lr);
//#endregion
//#region src/cards/binary-sensor-card.ts
var ur, dr = class extends an {
	static getStubConfig(e, t, n) {
		return { entity: tt(["binary_sensor"], e, t, n) };
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
		if (!e || $e(e)) return this.renderUnavailable();
		let t = e.state === "on", n = this.meta(), r = this.config.accent ?? n.accent, i = this.config.accent ? at(this.config.accent) : n.accentLight, a = this.t, o = Je(e.last_changed, a), s = t ? this.config.icon_on ?? this.config.icon ?? e.attributes.icon ?? n.iconOn : this.config.icon_off ?? this.config.icon ?? e.attributes.icon ?? n.iconOff, c = t ? {
			from: i,
			to: r,
			glow: st(r, .24)
		} : void 0, l = t ? {
			color: r === "#7C3AED" ? "#A66BFF" : r,
			bg: st(r, .18),
			stroke: st(r, .3)
		} : void 0, u = t ? `${n.stateOn} · ${a("since", { t: o })}` : `${n.stateOff} · ${a("last_change", { t: o })}`;
		return P`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderIconWell(s, c)}
        ${this.renderTitle(this.entityName, u)}
        ${this.renderBadge(t ? this.config.label_on ?? n.badgeOn : this.config.label_off ?? n.badgeOff, l)}
      </div>`;
	}
};
ur = dr, ur.styles = [
	on,
	dn,
	h``
], customElements.get("liquid-glass-binary-sensor-card") || customElements.define("liquid-glass-binary-sensor-card", dr);
//#endregion
//#region node_modules/react/cjs/react.production.js
var fr = /* @__PURE__ */ o(((e) => {
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
	function ee(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function te(e, t) {
		return ee(e.type, t, e.props);
	}
	function ne(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function E(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var D = /\/+/g;
	function re(e, t) {
		return typeof e == "object" && e && e.key != null ? E("" + e.key) : t.toString(36);
	}
	function O(e) {
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
	function k(e, r, i, a, o) {
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
				case d: return c = e._init, k(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + re(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(D, "$&/") + "/"), k(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ne(o) && (o = te(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(D, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + re(a, u), c += k(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + re(a, u++), c += k(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return k(O(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function A(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return k(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ie(e) {
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
	var ae = typeof reportError == "function" ? reportError : function(e) {
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
	}, oe = {
		map: A,
		forEach: function(e, t, n) {
			A(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return A(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return A(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ne(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = oe, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
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
		return ee(e.type, i, r);
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
		return ee(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ne, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ie
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
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, ae);
		} catch (e) {
			ae(e);
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
})), pr = /* @__PURE__ */ o(((e, t) => {
	t.exports = fr();
})), mr = /* @__PURE__ */ o(((e) => {
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
})), hr = /* @__PURE__ */ o(((e, t) => {
	t.exports = mr();
})), U = /* @__PURE__ */ c(pr(), 1), W = hr(), gr = {
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
}, _r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", vr = .22, yr = Math.sqrt(Math.PI), br = (e) => Math.tanh(yr * e), xr = (e, t) => t > 0 ? (e - Math.sqrt(e * e - t * t)) / t : 0, Sr = (e, t, n) => {
	let r = Math.max(.01, Math.min(e, Math.min(t, n) - 1)), i = (t * t + r * r) / (2 * r), a = (n * n + r * r) / (2 * r), o = xr(i, t), s = xr(a, n);
	return {
		Rx: i,
		Ry: a,
		scaleX: o > 0 ? .5 / o : 1,
		scaleY: s > 0 ? .5 / s : 1
	};
}, Cr = (e, t, n) => {
	let r = Math.min(e, t * .999);
	return r / Math.sqrt(t * t - r * r) * n;
}, wr = (e, t) => `${e} 0 0 0 ${.5 * (1 - e)}  0 ${t} 0 0 ${.5 * (1 - t)}  0 0 1 0 0  0 0 0 1 0`, Tr = /* @__PURE__ */ new Map(), Er = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t)), a = Math.max(0, Math.min(Math.round(n), Math.min(r, i) / 2)), o = `rr\xB7${r}\xB7${i}\xB7${a}`, s = Tr.get(o);
	if (s) return {
		uri: s,
		key: o
	};
	let c = .5, l = Math.max(0, r - 2 * c), u = Math.max(0, i - 2 * c), d = Math.max(0, a - c), f = `<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 ${r} ${i}'><rect fill='black' rx='${d}' ry='${d}' x='${c}' y='${c}' width='${l}' height='${u}'/></svg>`, p = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(f)}`;
	return Tr.set(o, p), {
		uri: p,
		key: o
	};
}, Dr = (e, t, n) => {
	let r = Math.max(1, Math.round(e)), i = Math.max(1, Math.round(t));
	return Er(r, i, Math.max(0, Math.min(Math.round(n), Math.floor(Math.min(r, i) / 2))));
}, Or = (e) => (.5 + e) * 255 + .5 | 0, kr = (e) => 127 * e + 128 + .5 | 0, Ar = (e) => {
	let t = null, n = null, r = null, i = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0, u = null;
	return {
		generate(d) {
			t || (t = document.createElement("canvas"), t.width = e, t.height = e, n = t.getContext("2d"), r = n.createImageData(e, e));
			let { lensHalfWidth: f, lensHalfHeight: p, borderRadius: m, depth: h, clipToShape: g, softEdge: _, sheenAngle: v = 45, glow: y = 0, glowSpread: b = 1, glowFalloff: x = 1.5, sheen: S = 0, sheenWidth: C = 3, sheenFalloff: w = 1.5, curvature: T = 0, splay: ee = 0, bend: te = 0, bendWidth: ne = .16 } = d, E = r.data, D = e >> 1, re = Math.min(m, Math.min(f, p)), O = Math.min(f, p), k = Math.min(h * O, O - 1), A = Math.max(0, f - k), ie = Math.max(0, p - k), ae = Math.max(0, Math.min(m, Math.min(A, ie))), oe = k > 0 ? Math.SQRT1_2 / k : 1e6, se = y > 0 || S > 0, j = v * Math.PI / 180, M = Math.cos(j), ce = Math.sin(j), le = C > 0 ? 1 / C : 0, ue = 1 / Math.max(2, b * Math.min(f, p)), de = 2 * f / e, fe = 2 * p / e, pe = 1 / f, me = 1 / p, he = T > 0, ge = T * Math.min(f, p), N = ee > 0, _e = te > 0, ve = 1 / Math.max(2, ne * Math.min(f, p)), ye = (e, t) => e > 0 || t > 0 ? Math.sqrt(e * e + t * t) : 0;
			if (he && ((!u || Math.abs(ge - a) > .5 || Math.abs(f - o) > 1 || Math.abs(p - s) > 1) && (u = Sr(ge, f, p), a = ge, o = f, s = p, l = !0), c !== D && (i = new Float32Array(D), c = D, l = !0), l)) {
				let e = i, t = u, n = t.Rx * t.Rx, r = t.Rx * .999;
				for (let i = 0; i < D; i += 1) {
					let a = -((i + .5) * de - f), o = a < r ? a : r;
					e[i] = o / Math.sqrt(n - o * o) * t.scaleX;
				}
				l = !1;
			}
			let be = he ? i : null, xe = .5 * Math.min(f, p), P = xe > 0 ? 1 / xe : 0, Se = Math.SQRT1_2;
			for (let t = 0; t < D; t += 1) {
				let n = e - 1 - t, r = -((t + .5) * fe - p), i = r - p + re, a = _ ? r - ie + ae : 0, o = he && be ? Cr(r, u.Ry, u.scaleY) : r * me > 1 ? 1 : r * me, s = r * me > 1 ? 1 : r * me, c = N ? Math.max(0, 1 - (p - r) * P) : 0, l = t * e, d = n * e;
				for (let t = 0; t < D; t += 1) {
					let n = e - 1 - t, r = -((t + .5) * de - f), u = r - f + re, p = ye(u > 0 ? u : 0, i > 0 ? i : 0) + (u > i ? u > 0 ? 0 : u : i > 0 ? 0 : i) - re, m = (l + t) * 4, h = (l + n) * 4, v = (d + t) * 4, b = (d + n) * 4;
					if (g && p >= 0) {
						for (let e of [
							m,
							h,
							v,
							b
						]) E[e] = 128, E[e + 1] = 128, E[e + 2] = 128, E[e + 3] = 255;
						continue;
					}
					let C = be ? be[t] : r * pe > 1 ? 1 : r * pe, T = o;
					if (N) {
						let e = c * ee, t = Math.max(0, 1 - (f - r) * P) * ee;
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
					let ne = 1;
					if (_) {
						let e = r - A + ae;
						ne = .5 * (1 + br((ye(e > 0 ? e : 0, a > 0 ? a : 0) + (e > a ? e > 0 ? 0 : e : a > 0 ? 0 : a) - ae) * oe));
					}
					let D = .5 * C * ne, O = .5 * T * ne;
					if (_e) {
						let e = p < 0 ? Math.max(0, 1 + p * ve) : 0;
						if (e > 0) {
							let t = Math.sqrt(C * C + T * T);
							if (t > 1e-4) {
								let n = 6.75 * e * e * (1 - e), r = .5 * te * n * ne / t;
								D += C * r, O += T * r;
							}
						}
					}
					let k = 0, ie = 0;
					if (se) {
						let e = r * pe > 1 ? 1 : r * pe, t = Math.min(1, Math.abs(e * M + s * ce) * Se), n = Math.min(1, Math.abs(e * M - s * ce) * Se);
						if (S > 0) {
							let e = S * (p < 0 ? Math.max(0, 1 + p * le) : 0) ** +w;
							k += e * (.16 + .84 * t ** 1.6), ie += e * (.16 + .84 * n ** 1.6);
						}
						if (y > 0) {
							let e = 1 - (p < 0 ? Math.min(1, -p * ue) : 1), r = y * (e * e * (3 - 2 * e)) ** x * ne;
							k += r * (.6 + .4 * t), ie += r * (.6 + .4 * n);
						}
						k > 1 ? k = 1 : k < -1 && (k = -1), ie > 1 ? ie = 1 : ie < -1 && (ie = -1);
					}
					let j = Or(D), fe = Or(-D), me = Or(O), he = Or(-O), ge = kr(k), xe = kr(ie);
					E[m] = j, E[m + 1] = me, E[m + 2] = ge, E[m + 3] = 255, E[h] = fe, E[h + 1] = me, E[h + 2] = xe, E[h + 3] = 255, E[v] = j, E[v + 1] = he, E[v + 2] = xe, E[v + 3] = 255, E[b] = fe, E[b + 1] = he, E[b + 2] = ge, E[b + 3] = 255;
				}
			}
			return n.putImageData(r, 0, 0), t.toDataURL();
		},
		dispose() {
			t && (t.width = 0, t.height = 0, t = null), n = null, r = null, i = null, u = null, a = -Infinity, o = -Infinity, s = -Infinity, c = 0, l = !0;
		}
	};
}, jr = (e) => typeof e == "object" && !!e && "get" in e && "on" in e, Mr = (e) => jr(e) ? e.get() : e, Nr = class {
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
}, Pr = (e) => new Nr(e), Fr = (e, t) => {
	let n = Pr(t()), r = () => n.set(t());
	for (let t of e) t.on("change", r);
	return n;
};
((e, t, n, r) => {
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
})(.34, 1.36, .42, 1);
var Ir = "#version 300 es\nin vec2 a_pos;\nout vec2 v_uv;\nvoid main() {\n  // a_pos is a -1..1 fullscreen quad; v_uv is bottom-left-origin 0..1, which\n  // (with UNPACK_FLIP_Y on the textures) samples the source upright. The lens\n  // descriptor is supplied in this same bottom-left space by the component.\n  v_uv = a_pos * 0.5 + 0.5;\n  gl_Position = vec4(a_pos, 0.0, 1.0);\n}", Lr = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nvoid main() { o = texture(u_src, v_uv); }", Rr = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform vec2 u_step;\nvoid main() {\n  vec4 c = texture(u_src, v_uv) * 0.1857;\n  c += (texture(u_src, v_uv + u_step)       + texture(u_src, v_uv - u_step))       * 0.1671;\n  c += (texture(u_src, v_uv + 2.0 * u_step) + texture(u_src, v_uv - 2.0 * u_step)) * 0.1227;\n  c += (texture(u_src, v_uv + 3.0 * u_step) + texture(u_src, v_uv - 3.0 * u_step)) * 0.0768;\n  c += (texture(u_src, v_uv + 4.0 * u_step) + texture(u_src, v_uv - 4.0 * u_step)) * 0.0414;\n  o = c;\n}", zr = "#version 300 es\nprecision highp float;\nin vec2 v_uv;\nout vec4 o;\nuniform sampler2D u_src;\nuniform sampler2D u_blur;\nuniform sampler2D u_disp;\nuniform vec2 u_origin;\nuniform vec2 u_size;\nuniform vec2 u_scale;\nuniform vec2 u_lenspx;   // lens box size in device px (for an aspect-correct SDF)\nuniform float u_radiuspx; // corner radius in device px\nuniform float u_dispersion;\nuniform float u_sheen;\nuniform float u_frost;    // 0 = sharp; >0 = blend toward the pre-blurred copy\nuniform float u_opacity;  // enter/exit fade (multiplies coverage)\nuniform float u_brightness; // white(>0)/black(<0) veil over the lens\n// Signed distance to a rounded rectangle (negative inside). Computed in pixel\n// space so the corner radius stays circular on non-square lenses. NB: the half-\n// extent arg must NOT be named `half` — that's a reserved word in GLSL ES and\n// Safari's (stricter) WebGL2 compiler rejects it, throwing at renderer init.\nfloat sdRoundRect(vec2 p, vec2 b, float r) {\n  vec2 q = abs(p) - b + r;\n  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;\n}\n// Source sample, blended toward the frosted (pre-blurred) copy by mixAmt. The\n// frost is what makes the glass read as liquid rather than a clear lens.\nvec3 frosted(vec2 p, float mixAmt) {\n  vec3 raw = texture(u_src, p).rgb;\n  return mixAmt > 0.0 ? mix(raw, texture(u_blur, p).rgb, mixAmt) : raw;\n}\nvoid main() {\n  vec2 lensUV = (v_uv - u_origin) / u_size;\n  // Rounded-rect coverage. The SDF is in device px and a true distance field\n  // (gradient ~1), so a fixed ~1px feather anti-aliases the edge without fwidth\n  // (derivatives are handled inconsistently across WebGL2 backends).\n  vec2 p = (lensUV - 0.5) * u_lenspx;\n  float sdf = sdRoundRect(p, u_lenspx * 0.5, min(u_radiuspx, min(u_lenspx.x, u_lenspx.y) * 0.5));\n  float coverage = (1.0 - smoothstep(-1.0, 1.0, sdf)) * u_opacity;\n  if (coverage <= 0.0) discard;\n  vec4 d = texture(u_disp, clamp(lensUV, 0.0, 1.0));\n  vec2 disp = (d.rg - 0.5) * u_scale;            // feDisplacementMap equivalent\n  // RGB split — red bent DISPERSION_SPREAD more than blue, green half that (keep\n  // in sync with DISPERSION_SPREAD in displacement.ts so DOM + WebGL match).\n  vec2 uvR = v_uv + disp * (1.0 + u_dispersion * 0.22);\n  vec2 uvG = v_uv + disp * (1.0 + u_dispersion * 0.11);\n  vec2 uvB = v_uv + disp;\n  vec3 lensCol = vec3(frosted(uvR, u_frost).r, frosted(uvG, u_frost).g, frosted(uvB, u_frost).b);\n  // Specular lift from B. The map encodes spec as B = 127·s + 128, so (B/255 − 0.5)\n  // = 0.498·s; this matches the DOM path's gain exactly (feColorMatrix 1× alpha\n  // then feComposite k2=specular → 0.498·specular·s). (NOT ×2 — that double-lifted it.)\n  lensCol += u_sheen * max(0.0, d.b - 0.5);\n  // Brightness veil (alpha-blend toward white/black, like the DOM path).\n  if (u_brightness > 0.0) lensCol = mix(lensCol, vec3(1.0), clamp(u_brightness, 0.0, 1.0));\n  else if (u_brightness < 0.0) lensCol = mix(lensCol, vec3(0.0), clamp(-u_brightness, 0.0, 1.0));\n  // Mix over the untouched backdrop by the coverage → an AA'd, frosted-clipping\n  // silhouette. Canvas stays fully opaque, so straight/premultiplied alpha is moot.\n  vec3 backdrop = texture(u_src, v_uv).rgb;\n  o = vec4(mix(backdrop, lensCol, coverage), 1.0);\n}", Br = (e, t, n) => {
	let r = e.createShader(t);
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r);
		throw e.deleteShader(r), Error(`glass-webgl shader: ${t}`);
	}
	return r;
}, Vr = (e, t, n) => {
	let r = e.createProgram(), i = Br(e, e.VERTEX_SHADER, t), a = Br(e, e.FRAGMENT_SHADER, n);
	if (e.attachShader(r, i), e.attachShader(r, a), e.bindAttribLocation(r, 0, "a_pos"), e.linkProgram(r), e.deleteShader(i), e.deleteShader(a), !e.getProgramParameter(r, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(r);
		throw e.deleteProgram(r), Error(`glass-webgl link: ${t}`);
	}
	return r;
}, Hr = class {
	constructor(e) {
		this.dispCache = /* @__PURE__ */ new Map(), this.blurW = 0, this.blurH = 0, this.srcW = 0, this.srcH = 0, this.disposed = !1;
		let t = e.getContext("webgl2", {
			premultipliedAlpha: !1,
			alpha: !0,
			antialias: !1,
			preserveDrawingBuffer: !1
		});
		if (!t) throw Error("webgl2 unavailable");
		this.gl = t, this.blit = Vr(t, Ir, Lr), this.lens = Vr(t, Ir, zr), this.blur = Vr(t, Ir, Rr), this.quad = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.quad), t.bufferData(t.ARRAY_BUFFER, new Float32Array([
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
}, Ur = () => typeof window < "u" && window.devicePixelRatio || 1, Wr = (e) => ({
	merged: {
		...gr,
		...e.lens
	},
	lensW: e.lensW,
	lensH: e.lensH,
	radius: e.borderRadius,
	x: e.x,
	y: e.y,
	scale: e.scale ?? 1,
	opacity: e.opacity ?? 1
}), Gr = (e, t, n, r, i, a) => {
	let [o, s] = (0, U.useState)(!1), c = (0, U.useRef)(null), l = (0, U.useRef)(null), u = r[0], d = (0, U.useRef)(r);
	d.current = r;
	let f = r.some((e) => jr(e.x) || jr(e.y) || jr(e.lensW) || jr(e.lensH) || e.radius != null && jr(e.radius));
	(0, U.useLayoutEffect)(() => {
		let n = e.current, r = t.current;
		if (!n || !r) return;
		let a;
		try {
			a = new Hr(n);
		} catch (e) {
			typeof console < "u" && console.warn("[liquid-glass] WebGL renderer unavailable, falling back:", e), s(!0);
			return;
		}
		c.current = a;
		let o = Math.min(Ur(), i), l = () => {
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
	let p = u.merged, m = Mr(u.lensW), h = Mr(u.lensH), g = u.radius == null ? Math.min(m, h) : Mr(u.radius), _ = JSON.stringify([
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
	(0, U.useEffect)(() => {
		if (!c.current) return;
		l.current || (l.current = Ar(p.mapSize));
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
		let t = e.merged, n = Mr(e.lensW), r = Mr(e.lensH), i = e.radius == null ? Math.min(n, r) : Mr(e.radius);
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
	}), y = (0, U.useRef)(v);
	y.current = v;
	let b = (0, U.useRef)(/* @__PURE__ */ new Map()), x = v.join("|");
	return (0, U.useEffect)(() => {
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
			let s = t.merged, c = Mr(t.lensW), l = Mr(t.lensH), u = t.radius == null ? Math.min(c, l) : Mr(t.radius), d = e.generate({
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
	}, [x, o]), (0, U.useEffect)(() => () => {
		l.current?.dispose(), l.current = null;
	}, []), (0, U.useEffect)(() => {
		if (o) return;
		let e = 0, r = 0, i = a, s = !!i && !f && typeof i.requestVideoFrameCallback == "function", l = () => {
			let a = c.current, o = t.current;
			if (!a || !o) return;
			let u = n();
			if (u && u.w > 0 && u.h > 0) {
				let e = o.clientWidth, t = o.clientHeight, n = Math.sqrt((e * e + t * t) / 2), r = y.current, i = d.current.map((i, a) => {
					let o = Mr(i.lensW), s = Mr(i.lensH), c = i.radius == null ? Math.min(o, s) : Mr(i.radius), l = Mr(i.x), u = Mr(i.y), d = o * i.scale, f = s * i.scale, p = a > 0 && r[a] !== r[0], m = p ? b.current.get(r[a]) : void 0, h = p && !m;
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
}, Kr = ({ src: e, draw: t, poster: n, loop: r = !0, muted: i = !0, autoPlay: a = !0, crossOrigin: o, paused: s, videoRef: c, lenses: l, width: u, height: d, lens: f, lensW: p = 90, lensH: m = 90, borderRadius: h, x: g = .5, y: _ = .5, maxDpr: v = 1.5, className: y, style: b, children: x }) => {
	let S = e != null, C = (0, U.useRef)(null), w = (0, U.useRef)(null), T = (0, U.useRef)(null), [ee, te] = (0, U.useState)(null), ne = U.useCallback((e) => {
		T.current = e, typeof c == "function" ? c(e) : c && (c.current = e);
	}, [c]), E = (0, U.useRef)(null), D = (0, U.useRef)(t);
	D.current = t;
	let re = (0, U.useRef)(0);
	!S && !E.current && typeof document < "u" && (E.current = document.createElement("canvas"));
	let O = (l && l.length ? l.map((e) => ({
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
	}]).map(Wr);
	(0, U.useEffect)(() => {
		S && te(T.current);
	}, [S]), (0, U.useEffect)(() => {
		let e = T.current;
		S && e && s !== void 0 && (s ? e.pause() : e.play().catch(() => {}));
	}, [S, s]);
	let k = Gr(w, C, U.useCallback(() => {
		if (S) {
			let e = T.current;
			return !e || e.readyState < 2 ? null : {
				source: e,
				w: e.videoWidth,
				h: e.videoHeight
			};
		}
		let e = E.current, t = C.current;
		if (!e || !t || !D.current) return null;
		let n = u ?? Math.round(t.clientWidth), r = d ?? Math.round(t.clientHeight);
		if (n === 0 || r === 0) return null;
		(e.width !== n || e.height !== r) && (e.width = n, e.height = r);
		let i = e.getContext("2d");
		return i ? (re.current === 0 && (re.current = performance.now()), D.current(i, performance.now() - re.current), {
			source: e,
			w: n,
			h: r
		}) : null;
	}, [
		S,
		u,
		d
	]), O, v, S ? ee : null);
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		ref: C,
		className: y,
		style: {
			position: "relative",
			overflow: "hidden",
			...b
		},
		children: [
			S && /* @__PURE__ */ (0, W.jsx)("video", {
				ref: ne,
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
					visibility: k ? "visible" : "hidden"
				}
			}),
			/* @__PURE__ */ (0, W.jsx)("canvas", {
				ref: w,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					display: k ? "none" : "block"
				}
			}),
			!S && k && /* @__PURE__ */ (0, W.jsx)("div", {
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
			x != null && /* @__PURE__ */ (0, W.jsx)("div", {
				style: {
					position: "absolute",
					inset: 0
				},
				children: x
			})
		]
	});
}, qr = () => {
	let [e, t] = (0, U.useState)(!1);
	return (0, U.useEffect)(() => {
		if (typeof navigator > "u") return;
		let e = navigator.userAgent, n = navigator.userAgentData != null || /\b(?:Chrome|Chromium|Edg)\//.test(e) && !/\b(?:CriOS|EdgiOS|FxiOS|OPiOS)\b/.test(e) && !/iPhone|iPad|iPod/.test(e);
		t(n);
	}, []), e;
}, Jr = {
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
}, Yr = ({ dispScale: e, dispersion: t, specular: n, hasSpecular: r, mapMatrix: i, width: a, height: o, mapUrl: s, feImageRef: c }) => {
	let l = i ? "scaledMap" : "map";
	return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
		/* @__PURE__ */ (0, W.jsx)("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ (0, W.jsx)("feImage", {
			ref: c,
			href: s || void 0,
			x: 0,
			y: 0,
			width: a,
			height: o,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ (0, W.jsx)("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		i && /* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: i,
			result: "scaledMap"
		}),
		t > 0 ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + vr * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e * (1 + vr * .5 * t),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				in: "SourceGraphic",
				in2: l,
				scale: e,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
			in: "SourceGraphic",
			in2: l,
			scale: e,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		r && /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
			in: "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, W.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: n,
			k3: "1",
			k4: "0"
		})] })
	] });
}, Xr = (e) => e == null ? void 0 : jr(e) ? Mr(e) : e, Zr = ({ children: e, optics: t, radius: n, width: r, height: i, className: a, style: o, ...s }) => {
	let c = qr(), l = (0, U.useMemo)(() => ({
		...gr,
		...Jr,
		...t
	}), [t]), u = (0, U.useId)().replace(/:/g, ""), d = (0, U.useRef)(null), f = (0, U.useRef)(null), p = (0, U.useRef)(null), m = (0, U.useRef)(null), h = (0, U.useRef)(""), g = (0, U.useRef)(0), [_, v] = (0, U.useState)({
		w: 0,
		h: 0,
		r: 0,
		appliedR: void 0
	}), [y, b] = (0, U.useState)(!1), x = _.w > 0 && _.h > 0, S = Xr(n), C = Xr(r), w = Xr(i), T = o?.borderRadius != null, ee = (0, U.useRef)(!1);
	(0, U.useLayoutEffect)(() => {
		ee.current = !1;
	}, [
		S,
		T,
		a
	]), (0, U.useLayoutEffect)(() => {
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
			else if (T || i > 0 && !ee.current) a = i, o = void 0;
			else {
				let t = e.firstElementChild;
				for (; t && t.hasAttribute("data-lg-layer");) t = t.nextElementSibling;
				let r = t && n && parseFloat(getComputedStyle(t).borderTopLeftRadius) || 0;
				a = r, o = r, ee.current = !0;
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
	let te = JSON.stringify([
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
	]), ne = l.scaleX ?? l.strength, E = l.scaleY ?? l.strength, D = Math.max(ne, E), re = D * (x ? Math.sqrt((_.w * _.w + _.h * _.h) / 2) : 0), O = x ? Math.ceil(re * (l.dispersion > 0 ? 1.2 : 1) * .5 + 28) : 0, k = D > 0 ? ne / D : 1, A = D > 0 ? E / D : 1, ie = k === 1 && A === 1 ? null : wr(k, A), ae = l.glow > 0 || l.sheen > 0;
	(0, U.useLayoutEffect)(() => {
		if (!x) return;
		let e = l.mapSize;
		(!m.current || m.current.size !== e) && (m.current?.gen.dispose(), m.current = {
			gen: Ar(e),
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
		h.current = t, p.current?.setAttribute("href", t), oe();
	}, [x, te]);
	let oe = (0, U.useMemo)(() => () => {
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
	(0, U.useEffect)(() => {
		x && oe();
	}, [
		x,
		oe,
		l.dispersion,
		l.strength,
		l.scaleX,
		l.scaleY,
		l.specular
	]), (0, U.useEffect)(() => () => {
		m.current?.gen.dispose(), m.current = null;
	}, []);
	let se = (0, U.useRef)(!1);
	(0, U.useEffect)(() => {
		if (se.current || !x || typeof getComputedStyle > "u" || typeof document > "u") return;
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
		n && typeof console < "u" && (console.warn("[liquid-glass] <Glass>: the wrapper's background is fully opaque, so it hides the refraction (no glass shows through). Give it an alpha (e.g. `bg-red-400/40` / `rgba(...,0.4)`). (An opaque `background-image` — a solid gradient or photo — hides it the same way.)"), se.current = !0);
	}, [x]);
	let j = (0, U.useMemo)(() => {
		let e = Math.max(0, Math.min(1.5, l.specular));
		return [`inset 0 1px 0 rgba(255,255,255,${(.55 * e).toFixed(3)})`, `inset 0 0 0 1px rgba(255,255,255,${(.12 * e).toFixed(3)})`].join(", ");
	}, [l.specular]), M = o?.position, ce = M != null && M !== "static" && M !== "unset" && M !== "initial" ? M : y ? "relative" : void 0, le = l.brightness === 0 ? null : /* @__PURE__ */ (0, W.jsx)("div", {
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
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		ref: d,
		"data-liquid-glass": "material",
		className: a,
		style: {
			display: "inline-block",
			...o,
			...ce == null ? null : { position: ce },
			...C == null ? null : { width: C },
			...w == null ? null : { height: w },
			..._.appliedR == null ? null : { borderRadius: _.appliedR }
		},
		...s,
		children: [
			le,
			e,
			/* @__PURE__ */ (0, W.jsx)("div", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					borderRadius: "inherit",
					boxShadow: j
				}
			}),
			/* @__PURE__ */ (0, W.jsx)("svg", {
				"aria-hidden": !0,
				"data-lg-layer": "",
				width: 0,
				height: 0,
				style: {
					position: "absolute",
					width: 0,
					height: 0
				},
				children: /* @__PURE__ */ (0, W.jsx)("defs", { children: /* @__PURE__ */ (0, W.jsx)("filter", {
					ref: f,
					id: `lg-mat-${u}-v0`,
					filterUnits: "userSpaceOnUse",
					primitiveUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					x: -O,
					y: -O,
					width: _.w + 2 * O,
					height: _.h + 2 * O,
					children: x && /* @__PURE__ */ (0, W.jsx)(Yr, {
						dispScale: re,
						dispersion: l.dispersion,
						specular: l.specular,
						hasSpecular: ae,
						mapMatrix: ie,
						width: _.w,
						height: _.h,
						mapUrl: h.current || "",
						feImageRef: p
					})
				}) })
			})
		]
	});
}, Qr = () => {
	let [e, t] = (0, U.useState)(!1);
	return (0, U.useEffect)(() => {
		t(typeof navigator < "u" && /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent));
	}, []), e;
}, $r = ({ lens: e, mapHref: t, feImageRef: n, mapMatrixRef: r, blurStdDeviation: i, specularFromRawMap: a, brightnessInFilter: o, filterW: s, filterH: c, clipShapeRef: l }) => {
	let u = e.scaleX ?? e.strength, d = e.scaleY ?? e.strength, f = Math.max(u, d), p = f * (s && c ? Math.sqrt((s * s + c * c) / 2) : 1), m = f > 0 ? u / f : 0, h = f > 0 ? d / f : 0, g = m !== 1 || h !== 1, _ = g ? "scaledMap" : "map", v = e.frost > 0 && !!i, y = v ? "blurred" : "SourceGraphic", b = e.glow > 0 || e.sheen > 0, x = e.specular, S = o && e.brightness !== 0, C = v || S;
	return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
		/* @__PURE__ */ (0, W.jsx)("feFlood", {
			floodColor: "rgb(128,128,128)",
			floodOpacity: "1",
			result: "mapBg"
		}),
		/* @__PURE__ */ (0, W.jsx)("feImage", {
			ref: n,
			"data-lens": "",
			href: t,
			preserveAspectRatio: "none",
			result: "rawMap"
		}),
		/* @__PURE__ */ (0, W.jsx)("feComposite", {
			in: "rawMap",
			in2: "mapBg",
			operator: "over",
			result: "map"
		}),
		g && /* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
			ref: r,
			in: "map",
			type: "matrix",
			values: wr(m, h),
			result: "scaledMap"
		}),
		v && /* @__PURE__ */ (0, W.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: i,
			result: "blurred"
		}),
		C && /* @__PURE__ */ (0, W.jsx)("feImage", {
			ref: l,
			"data-lens": "",
			href: _r,
			preserveAspectRatio: "none",
			result: "lensShape"
		}),
		e.dispersion > 0 ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 + vr * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractR"
			}),
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p,
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
				result: "refractG"
			}),
			/* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
				"data-lens": "",
				in: y,
				in2: _,
				scale: p * (1 - vr * .5 * e.dispersion),
				xChannelSelector: "R",
				yChannelSelector: "G"
			}),
			/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
				type: "matrix",
				values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
				result: "refractB"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "refractR",
				in2: "refractG",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "refractRG"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "refractRG",
				in2: "refractB",
				operator: "arithmetic",
				k1: "0",
				k2: "1",
				k3: "1",
				k4: "0",
				result: "lensOut"
			})
		] }) : /* @__PURE__ */ (0, W.jsx)("feDisplacementMap", {
			"data-lens": "",
			in: y,
			in2: _,
			scale: p,
			xChannelSelector: "R",
			yChannelSelector: "G",
			result: "lensOut"
		}),
		b && (e.sheenDark ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 ${-x} 0 ${1 + 128 * x / 255}  0 0 0 0 1`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, W.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "1",
			k2: "0",
			k3: "0",
			k4: "0",
			result: "lensOut"
		})] }) : /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("feColorMatrix", {
			in: a ? "rawMap" : "map",
			type: "matrix",
			values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 1 0 ${-128 / 255}`,
			result: "sheenMask"
		}), /* @__PURE__ */ (0, W.jsx)("feComposite", {
			in: "sheenMask",
			in2: "lensOut",
			operator: "arithmetic",
			k1: "0",
			k2: x,
			k3: "1",
			k4: "0",
			result: "lensOut"
		})] })),
		S && /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)("feFlood", {
				"data-lens": "",
				floodColor: e.brightness > 0 ? "white" : "black",
				floodOpacity: Math.abs(e.brightness),
				result: "brightnessFlood"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "brightnessFlood",
				in2: "lensShape",
				operator: "in",
				result: "brightnessVeil"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "brightnessVeil",
				in2: "lensOut",
				operator: "over",
				result: "lensOut"
			})
		] }),
		C ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "lensOut",
				in2: "lensShape",
				operator: "in",
				result: "lensOut"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "SourceGraphic",
				in2: "lensShape",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] }) : /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)("feFlood", {
				"data-lens": "",
				floodColor: "black",
				floodOpacity: "1",
				result: "lensMask"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "SourceGraphic",
				in2: "lensMask",
				operator: "out",
				result: "cutoutSrc"
			}),
			/* @__PURE__ */ (0, W.jsx)("feComposite", {
				in: "lensOut",
				in2: "cutoutSrc",
				operator: "over"
			})
		] })
	] });
}, ei = ({ children: e, lens: t, x: n = .5, y: r = .5, lensW: i, lensH: a, borderRadius: o, refractionTarget: s, refractionBackground: c = "transparent", overlay: l, tintColor: u, tintOpacity: d, tintBlur: f, shadowOpacity: p, restShadowOpacity: m, edgeBias: h, depth: g, scale: _, filterResolution: v = 1, brightnessInFilter: y = !1, pixelUnits: b = !1, live: x = !1, onLensMapChange: S, className: C, style: w, ...T }) => {
	let ee = Qr(), te = (0, U.useRef)(ee);
	te.current = ee;
	let ne = (0, U.useRef)(y);
	ne.current = y;
	let E = (0, U.useRef)(b);
	E.current = b;
	let D = (0, U.useRef)(x);
	D.current = x;
	let re = (0, U.useRef)(v);
	re.current = v;
	let O = (0, U.useMemo)(() => ({
		...gr,
		...t
	}), [t]), k = (0, U.useRef)(O);
	k.current = O;
	let A = (0, U.useId)().replace(/:/g, ""), ie = (0, U.useRef)(null), ae = (0, U.useRef)(null), oe = (0, U.useRef)(null), se = (0, U.useRef)(null), j = (0, U.useRef)(null), M = (0, U.useRef)(null), ce = (0, U.useRef)(null), le = (0, U.useRef)(null), ue = (0, U.useRef)(null), de = (0, U.useRef)(null), fe = (0, U.useRef)(null), pe = (0, U.useRef)(null), me = (0, U.useRef)(null), he = (0, U.useRef)([]), ge = (0, U.useRef)([]), [N, _e] = (0, U.useState)({
		w: 0,
		h: 0
	}), ve = (0, U.useRef)(N);
	ve.current = N;
	let ye = N.w > 0 && N.h > 0, be = s != null, [xe, P] = (0, U.useState)(null);
	(0, U.useLayoutEffect)(() => {
		if (!be || c !== "transparent") {
			P(null);
			return;
		}
		if (typeof window > "u") return;
		let e = ie.current?.parentElement ?? null, t = null;
		for (; e;) {
			let n = getComputedStyle(e).backgroundColor, r = n.match(/rgba?\(([^)]+)\)/)?.[1].split(",");
			if ((r && r[3] != null ? parseFloat(r[3]) : 1) > .95) {
				t = n;
				break;
			}
			e = e.parentElement;
		}
		P(t);
	}, [be, c]);
	let Se = c === "transparent" ? xe ?? "transparent" : c, Ce = (0, U.useRef)(.5), F = (0, U.useRef)(.5), we = (0, U.useRef)(O.lensW), Te = (0, U.useRef)(O.lensH), Ee = (0, U.useRef)(O.borderRadius), De = (0, U.useRef)(i !== void 0);
	De.current = i !== void 0;
	let Oe = (0, U.useRef)(a !== void 0);
	Oe.current = a !== void 0;
	let ke = (0, U.useRef)(o !== void 0);
	ke.current = o !== void 0;
	let Ae = (0, U.useRef)(0), je = (0, U.useRef)(O.depth), Me = (0, U.useRef)(O.scaleX ?? O.strength), Ne = (0, U.useRef)(O.scaleY ?? O.strength), Pe = (0, U.useRef)(1), Fe = (0, U.useRef)(0), Ie = (0, U.useRef)(1), Le = (0, U.useRef)(0), Re = (0, U.useRef)(.5), ze = (0, U.useRef)(NaN), Be = (0, U.useRef)(NaN), Ve = (0, U.useRef)(NaN), He = (0, U.useRef)(1), Ue = (0, U.useRef)(0), I = (0, U.useRef)(""), L = (0, U.useRef)(!1), We = (0, U.useRef)(null), Ge = (0, U.useRef)(null), Ke = (0, U.useRef)(null), qe = (0, U.useRef)(u);
	qe.current = u;
	let Je = (0, U.useRef)(S);
	Je.current = S;
	let Ye = N.w > 0 && N.h > 0 ? Math.sqrt((N.w * N.w + N.h * N.h) / 2) : 0, R = Math.max(O.scaleX ?? O.strength, O.scaleY ?? O.strength);
	if (Ye > 0) {
		let e = typeof i == "number" ? i * 2 : N.w, t = typeof a == "number" ? a * 2 : N.h, n = 1 + vr * O.dispersion;
		R = Math.min(R, Math.max(e, t) * .6 / (Ye * n));
	}
	let Xe = b && s != null && N.w > 0 && N.h > 0 ? Math.ceil(R * Ye * (1 + vr * O.dispersion) * .5 + O.depth + 28) + 16 : 0, Ze = (0, U.useRef)(Xe);
	Ze.current = Xe, (0, U.useLayoutEffect)(() => {
		let e = ie.current;
		if (!e) return;
		let t = () => {
			let t = e.getBoundingClientRect();
			if (!ke.current && typeof getComputedStyle < "u") {
				let t = parseFloat(getComputedStyle(e).borderTopLeftRadius) || 0, n = ae.current?.firstElementChild;
				!t && n && (t = parseFloat(getComputedStyle(n).borderTopLeftRadius) || 0), Ae.current = t;
			}
			_e((e) => e.w === t.width && e.h === t.height ? e : {
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
	let Qe = (0, U.useCallback)(() => {
		let e = ie.current;
		if (!e) return;
		let t = ve.current.w, n = ve.current.h;
		if (!(t > 0 && n > 0)) {
			let r = e.getBoundingClientRect();
			t = r.width, n = r.height;
		}
		if (!(t > 0 && n > 0)) return;
		let r = k.current, i = Me.current, a = Ne.current, o = Math.max(i, a), s = r.dispersion, c = De.current ? we.current : t / 2, l = Oe.current ? Te.current : n / 2, u = ke.current ? Ee.current : Ae.current, d = Ce.current * t, f = F.current * n;
		E.current && oe.current && (d = Math.max(c, Math.min(t - c, d)), f = Math.max(l, Math.min(n - l, f)));
		let p = d - c, m = f - l, h = 2 * c, g = 2 * l;
		if (E.current) {
			let e = Math.sqrt((t * t + n * n) / 2), r = 1 + vr * s, i = Math.max(h, g) * .6;
			e > 0 && (o = Math.min(o, i / (e * r)));
		}
		let _ = re.current, v = _ !== 1 && !te.current ? _ : 1, y = te.current ? v * He.current : v, b = p !== ze.current || m !== Be.current, x = o !== Ve.current;
		if (ze.current = p, Be.current = m, Ve.current = o, b || x || D.current) {
			let e = Re.current, r = E.current, i = Math.sqrt((t * t + n * n) / 2), a = o * i * (1 + vr * s) * .5, c = Math.ceil(a + je.current + 28), l = r && oe.current ? Ze.current : 0, d = String(r ? (p + l + e) * y : (p + e) / t), f = String(r ? (m + l + e) * y : (m + e) / n), _ = String(r ? Math.max(0, h - 2 * e) * y : Math.max(0, h - 2 * e) / t), b = String(r ? Math.max(0, g - 2 * e) * y : Math.max(0, g - 2 * e) / n);
			for (let e of he.current) e.setAttribute("x", d), e.setAttribute("y", f), e.setAttribute("width", _), e.setAttribute("height", b);
			if (x) {
				let e = r ? o * i * y : o, t = s > 0 ? [
					e * (1 + vr * .5 * s),
					e,
					e * (1 - vr * .5 * s)
				] : [e], n = ge.current;
				for (let e = 0; e < n.length; e += 1) n[e].setAttribute("scale", String(t[e] ?? 0));
			}
			let S = de.current;
			if (S) {
				r && (S.setAttribute("x", "0"), S.setAttribute("y", "0"), oe.current ? (S.setAttribute("width", String((p + l + h + c) * y)), S.setAttribute("height", String((m + l + g + c) * y))) : (S.setAttribute("width", String(t * y)), S.setAttribute("height", String(n * y)))), Ue.current += 1, S.id = `lg-${A}-v${Ue.current}`;
				let e = We.current ? `url(#${S.id})` : "";
				oe.current ? (oe.current.style.filter !== e && (oe.current.style.filter = e), oe.current.style.clipPath = `inset(${Math.max(0, m + l) * v}px ${Math.max(0, t + l - (p + h)) * v}px ${Math.max(0, n + l - (m + g)) * v}px ${Math.max(0, p + l) * v}px round ${u * v}px)`, ae.current && !se.current && (ae.current.style.filter = "")) : ae.current && ae.current.style.filter !== e && (ae.current.style.filter = e);
			}
		}
		se.current && (se.current.style.clipPath = `inset(${Math.max(0, m) * v}px ${Math.max(0, t - (p + h)) * v}px ${Math.max(0, n - (m + g)) * v}px ${Math.max(0, p) * v}px round ${u * v}px)`), j.current && !se.current && (j.current.style.clipPath = `inset(${Math.max(0, m)}px ${Math.max(0, t - (p + h))}px ${Math.max(0, n - (m + g))}px ${Math.max(0, p)}px round ${u}px)`);
		let S = (e, t) => {
			e.style.transform = `translate(${p}px, ${m}px)`, e.style.width = `${h}px`, e.style.height = `${g}px`, e.style.borderRadius = `${u}px`, t !== void 0 && (e.style.opacity = String(t));
		};
		if (le.current && S(le.current, Ie.current), ue.current && S(ue.current, Le.current), ce.current) {
			ce.current.style.transform = `translate3d(${p}px, ${m}px, 0)`, ce.current.style.width = `${h}px`, ce.current.style.height = `${g}px`, ce.current.style.borderRadius = `${u}px`;
			let { uri: e, key: t } = Er(h, g, u);
			if (I.current !== t) {
				let n = `url("${e}")`;
				ce.current.style.maskImage = n, ce.current.style.setProperty("-webkit-mask-image", n), ce.current.style.maskSize = "100% 100%", ce.current.style.setProperty("-webkit-mask-size", "100% 100%"), I.current = t;
			}
		}
		if (M.current) {
			S(M.current);
			let e = qe.current ?? "white";
			M.current.style.background = `color-mix(in srgb, ${e} ${100 * Pe.current}%, transparent)`, M.current.style.opacity = "1";
			let t = Fe.current > 0 ? `blur(${Fe.current}px)` : "none";
			M.current.style.backdropFilter = t, M.current.style.setProperty("-webkit-backdrop-filter", t);
		}
		if (me.current) {
			let e = o > 0 ? i / o : 0, t = o > 0 ? a / o : 0;
			me.current.setAttribute("values", wr(e, t));
		}
	}, [A]), z = (0, U.useCallback)(() => {
		L.current || (L.current = !0, queueMicrotask(() => {
			L.current = !1, Qe();
		}));
	}, [Qe]), $e = (0, U.useCallback)(() => {
		ze.current = NaN, Ve.current = NaN, Qe();
	}, [Qe]);
	(0, U.useEffect)(() => {
		let e = () => {
			let e = window.innerWidth, t = e > 0 ? window.outerWidth / e : 1;
			return t > .2 && t < 12 ? Math.abs(t - 1) < .04 ? 1 : t : 1;
		}, t = () => {
			let t = e();
			Math.abs(t - He.current) > .002 && (He.current = t, $e());
		};
		return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
	}, [$e]);
	let et = (0, U.useCallback)(() => {
		let e = k.current.mapSize;
		(!Ke.current || Ke.current.size !== e) && (Ke.current?.gen.dispose(), Ke.current = {
			gen: Ar(e),
			size: e
		});
		let t = k.current, n = De.current ? we.current : ve.current.w / 2, r = Oe.current ? Te.current : ve.current.h / 2, i = ke.current ? Ee.current : Ae.current, a = Ke.current.gen.generate({
			lensHalfWidth: n,
			lensHalfHeight: r,
			borderRadius: i,
			depth: je.current,
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
		if (We.current = a, fe.current?.setAttribute("href", a), t.frost > 0 || ne.current && t.brightness !== 0) {
			let e = Dr(2 * n, 2 * r, i);
			Ge.current = e.uri, pe.current?.setAttribute("href", e.uri);
		}
		Je.current?.(a), $e();
	}, [$e]), tt = (0, U.useRef)(et);
	tt.current = et;
	let nt = JSON.stringify([
		O.mapSize,
		O.clipToShape,
		O.softEdge,
		O.sheenAngle,
		O.glow,
		O.glowSpread,
		O.glowFalloff,
		O.sheen,
		O.sheenWidth,
		O.sheenFalloff,
		O.curvature,
		O.splay,
		O.bend,
		O.bendWidth,
		jr(i) ? "mv" : i ?? (N.w / 2 || O.lensW),
		jr(a) ? "mv" : a ?? (N.h / 2 || O.lensH),
		jr(o) ? "mv" : o ?? Ae.current,
		jr(g) ? "mv" : g ?? O.depth,
		y && O.brightness !== 0
	]);
	(0, U.useLayoutEffect)(() => {
		let e = [], t = (t, n, r, i = () => {
			D.current || z();
		}) => {
			if (t === void 0) {
				n.current = r;
				return;
			}
			jr(t) ? (n.current = t.get(), e.push(t.on("change", (e) => {
				n.current = e, i();
			}))) : n.current = t;
		};
		return t(n, Ce, .5), t(r, F, .5), t(i ?? O.lensW, we, O.lensW), t(a ?? O.lensH, Te, O.lensH), t(o ?? O.borderRadius, Ee, O.borderRadius), t(g ?? O.depth, je, O.depth), t(_ ?? O.scaleX ?? O.strength, Me, O.scaleX ?? O.strength), t(_ ?? O.scaleY ?? O.strength, Ne, O.scaleY ?? O.strength), t(d, Pe, 1), t(f, Fe, 0), t(p, Ie, 1), t(m, Le, 0), t(h, Re, .5), Qe(), () => e.forEach((e) => e());
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
		O,
		z,
		Qe
	]);
	let rt = O.dispersion > 0, it = O.frost > 0, at = O.glow > 0 || O.sheen > 0;
	(0, U.useLayoutEffect)(() => {
		let e = de.current;
		he.current = e ? Array.from(e.querySelectorAll("[data-lens]")) : [], ge.current = e ? Array.from(e.querySelectorAll("feDisplacementMap")) : [], fe.current && We.current && fe.current.setAttribute("href", We.current), pe.current && Ge.current && pe.current.setAttribute("href", Ge.current), $e();
	}, [
		ye,
		rt,
		it,
		at,
		O.sheenDark,
		O.scaleX,
		O.scaleY,
		O.strength,
		O.brightness,
		y,
		b,
		ee,
		s != null,
		l != null,
		$e
	]), (0, U.useLayoutEffect)(() => {
		ye && $e();
	}, [
		N.w,
		N.h,
		Xe,
		$e
	]), (0, U.useLayoutEffect)(() => {
		ye && tt.current();
	}, [ye, nt]), (0, U.useEffect)(() => {
		let e = [], t, n = () => {
			clearTimeout(t), t = setTimeout(() => tt.current(), 90);
		};
		for (let t of [
			i,
			a,
			o,
			g
		]) jr(t) && e.push(t.on("change", n));
		return () => {
			e.forEach((e) => e()), clearTimeout(t);
		};
	}, [
		i,
		a,
		o,
		g
	]), (0, U.useEffect)(() => () => {
		Ke.current?.gen.dispose(), Ke.current = null, Je.current?.(null);
	}, []), (0, U.useEffect)(() => {
		if (!x || !ye) return;
		let e = 0, t = () => {
			e = requestAnimationFrame(t), Qe();
		};
		return e = requestAnimationFrame(t), () => cancelAnimationFrame(e);
	}, [
		x,
		ye,
		Qe
	]);
	let ot = v !== 1 && !ee ? v : 1, st = it && ye ? b ? `${O.frost * ot}` : `${O.frost / N.w} ${O.frost / N.h}` : void 0, ct = v !== 1 && !ee ? v : 1, lt = ct > 1 && l == null && s == null && ye, ut = l == null && s == null && !lt && i === void 0, B = (e, t, n) => /* @__PURE__ */ (0, W.jsx)("div", {
		ref: e,
		style: {
			...n,
			position: "absolute",
			top: 0,
			left: 0,
			width: N.w * ct,
			height: N.h * ct,
			transform: `scale(${1 / ct})`,
			transformOrigin: "top left"
		},
		children: /* @__PURE__ */ (0, W.jsx)("div", {
			style: {
				transform: `scale(${ct})`,
				transformOrigin: "top left",
				width: N.w,
				height: N.h
			},
			children: t
		})
	}), dt = O.brightness !== 0 && !y ? /* @__PURE__ */ (0, W.jsx)("div", {
		ref: j,
		style: {
			position: "absolute",
			inset: 0,
			pointerEvents: "none",
			background: O.brightness > 0 ? "white" : "black",
			opacity: Math.abs(O.brightness)
		}
	}) : null, ft = (e, t, n) => t || n ? /* @__PURE__ */ (0, W.jsx)("div", {
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
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		ref: ie,
		"data-liquid-glass": "",
		className: C,
		style: {
			contain: "layout",
			position: "relative",
			overflow: "visible",
			...ut ? { width: "fit-content" } : null,
			...lt ? { minHeight: N.h } : null,
			...w
		},
		...T,
		children: [
			lt ? B(ae, e, { willChange: "filter" }) : l == null && s == null ? /* @__PURE__ */ (0, W.jsx)("div", {
				ref: ae,
				style: ut ? { willChange: "filter" } : {
					willChange: "filter",
					position: "relative",
					height: ye ? N.h : void 0,
					overflow: "hidden",
					contain: "paint"
				},
				children: e
			}) : l == null && b ? /* @__PURE__ */ (0, W.jsx)("div", {
				ref: ae,
				style: {
					position: "absolute",
					inset: 0,
					isolation: "isolate"
				},
				children: e
			}) : /* @__PURE__ */ (0, W.jsx)("div", {
				ref: l == null ? ae : void 0,
				style: l == null ? { willChange: "filter" } : void 0,
				children: e
			}),
			s != null && (b ? /* @__PURE__ */ (0, W.jsx)("div", {
				ref: oe,
				style: {
					position: "absolute",
					inset: -Xe,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: Se
				},
				children: /* @__PURE__ */ (0, W.jsx)("div", {
					style: {
						position: "absolute",
						inset: Xe
					},
					children: s
				})
			}) : ct > 1 ? B(oe, s, {
				pointerEvents: "none",
				willChange: "filter, clip-path",
				background: Se
			}) : /* @__PURE__ */ (0, W.jsx)("div", {
				ref: oe,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none",
					willChange: "filter, clip-path",
					background: Se
				},
				children: s
			})),
			l != null && /* @__PURE__ */ (0, W.jsxs)("div", {
				ref: se,
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [/* @__PURE__ */ (0, W.jsx)("div", {
					ref: ae,
					style: { willChange: "filter" },
					children: l
				}), dt]
			}),
			/* @__PURE__ */ (0, W.jsxs)("div", {
				style: {
					position: "absolute",
					inset: 0,
					pointerEvents: "none"
				},
				children: [
					/* @__PURE__ */ (0, W.jsx)("svg", {
						viewBox: `0 0 ${N.w} ${N.h}`,
						width: "100%",
						height: "100%",
						style: { display: "block" },
						children: /* @__PURE__ */ (0, W.jsx)("defs", { children: /* @__PURE__ */ (0, W.jsx)("filter", {
							ref: de,
							id: `lg-${A}-v0`,
							filterUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							primitiveUnits: b ? "userSpaceOnUse" : "objectBoundingBox",
							colorInterpolationFilters: "sRGB",
							x: 0,
							y: 0,
							width: b ? N.w * ct : 1,
							height: b ? N.h * ct : 1,
							children: ye && /* @__PURE__ */ (0, W.jsx)($r, {
								lens: {
									...O,
									scaleX: _ === void 0 ? O.scaleX ?? O.strength : Mr(_),
									scaleY: _ === void 0 ? O.scaleY ?? O.strength : Mr(_)
								},
								mapHref: _r,
								feImageRef: fe,
								mapMatrixRef: me,
								blurStdDeviation: st,
								specularFromRawMap: ee,
								brightnessInFilter: y,
								filterW: b ? N.w * ct : void 0,
								filterH: b ? N.h * ct : void 0,
								clipShapeRef: pe
							})
						}) })
					}),
					l == null && dt,
					u !== void 0 && /* @__PURE__ */ (0, W.jsx)("div", {
						ref: M,
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
			it && e == null && s == null && l == null && /* @__PURE__ */ (0, W.jsx)("div", {
				ref: ce,
				style: {
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					willChange: "backdrop-filter, transform",
					backdropFilter: `blur(${O.frost}px)`,
					WebkitBackdropFilter: `blur(${O.frost}px)`
				}
			}),
			ft(le, O.edgeShadow, O.edgeInsetShadow),
			ft(ue, O.restEdgeShadow, O.restEdgeInsetShadow)
		]
	});
}, ti = (e) => (0, U.useMemo)(() => e == null ? void 0 : jr(e) ? Fr([e], () => e.get() / 2) : e / 2, [e]), ni = (e) => {
	let { children: t, width: n, height: r, size: i, radius: a, center: o, optics: s, refract: c, behind: l, src: u, draw: d, lenses: f, videoRef: p, paused: m, poster: h, loop: g, muted: _, autoPlay: v, crossOrigin: y, maxDpr: b, unstable_lens: x, ...S } = e, C = {
		...S,
		...x ?? {}
	}, w = o?.x, T = o?.y, [ee, te] = Array.isArray(i) ? i : i == null ? [void 0, void 0] : [i, i], ne = ti(n ?? ee), E = ti(r ?? te);
	if (u != null || d != null) return /* @__PURE__ */ (0, W.jsx)(Kr, {
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
		lensW: ne,
		lensH: E,
		borderRadius: a,
		x: w,
		y: T,
		className: e.className,
		style: e.style,
		children: t
	});
	let { overlay: D, tintColor: re, tintOpacity: O, tintBlur: k, shadowOpacity: A, restShadowOpacity: ie, edgeBias: ae, brightnessInFilter: oe, depth: se, scale: j, filterResolution: M, pixelUnits: ce, live: le, onLensMapChange: ue, ...de } = C, fe = jr(n) || jr(r) || jr(a) || jr(ee) || jr(te) || jr(w) || jr(T);
	return t != null && c == null && u == null && d == null && f == null && D == null && !ce && re == null && O == null && k == null && A == null && ie == null && ae == null && !oe && M == null && !le && se == null && j == null && ue == null && w == null && T == null && !fe ? /* @__PURE__ */ (0, W.jsx)(Zr, {
		...de,
		optics: s,
		radius: a,
		width: n ?? ee,
		height: r ?? te,
		children: t
	}) : /* @__PURE__ */ (0, W.jsx)(ei, {
		...C,
		lensW: ne,
		lensH: E,
		borderRadius: a,
		x: w,
		y: T,
		lens: s,
		refractionTarget: c,
		refractionBackground: l,
		children: t
	});
}, ri = U.forwardRef(({ x: e, scaleX: t, scaleY: n, style: r, children: i, ...a }, o) => {
	let s = (0, U.useRef)(null);
	return (0, U.useEffect)(() => {
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
	]), /* @__PURE__ */ (0, W.jsx)("div", {
		ref: (e) => {
			s.current = e, typeof o == "function" ? o(e) : o && (o.current = e);
		},
		style: r,
		...a,
		children: i
	});
});
ri.displayName = "GlassDiv";
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
var ii = /* @__PURE__ */ o(((e) => {
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
			if (n(c) !== null) m = !0, S || (S = !0, ne());
			else {
				var t = n(l);
				t !== null && re(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function ee() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function te() {
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
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ee());) {
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
								u !== null && re(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ne() : S = !1;
			}
		}
	}
	var ne;
	if (typeof y == "function") ne = function() {
		y(te);
	};
	else if (typeof MessageChannel < "u") {
		var E = new MessageChannel(), D = E.port2;
		E.port1.onmessage = te, ne = function() {
			D.postMessage(null);
		};
	} else ne = function() {
		_(te, 0);
	};
	function re(t, n) {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, re(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, ne()))), r;
	}, e.unstable_shouldYield = ee, e.unstable_wrapCallback = function(e) {
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
})), ai = /* @__PURE__ */ o(((e, t) => {
	t.exports = ii();
})), oi = /* @__PURE__ */ o(((e) => {
	var t = pr();
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
})), si = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = oi();
})), ci = /* @__PURE__ */ o(((e) => {
	var t = ai(), n = pr(), r = si();
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
	var f = Object.assign, p = Symbol.for("react.element"), m = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), b = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), te = Symbol.for("react.memo_cache_sentinel"), ne = Symbol.iterator;
	function E(e) {
		return typeof e != "object" || !e ? null : (e = ne && e[ne] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var D = Symbol.for("react.client.reference");
	function re(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === D ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case g: return "Fragment";
			case v: return "Profiler";
			case _: return "StrictMode";
			case S: return "Suspense";
			case C: return "SuspenseList";
			case ee: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case h: return "Portal";
			case b: return e.displayName || "Context";
			case y: return (e._context.displayName || "Context") + ".Consumer";
			case x:
				var t = e.render;
				return e = e.displayName, e || (e = t.displayName || t.name || "", e = e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case w: return t = e.displayName || null, t === null ? re(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return re(e(t));
				} catch {}
		}
		return null;
	}
	var O = Array.isArray, k = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ie = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ae = [], oe = -1;
	function se(e) {
		return { current: e };
	}
	function j(e) {
		0 > oe || (e.current = ae[oe], ae[oe] = null, oe--);
	}
	function M(e, t) {
		oe++, ae[oe] = e.current, e.current = t;
	}
	var ce = se(null), le = se(null), ue = se(null), de = se(null);
	function fe(e, t) {
		switch (M(ue, t), M(le, e), M(ce, null), t.nodeType) {
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
		j(ce), M(ce, e);
	}
	function pe() {
		j(ce), j(le), j(ue);
	}
	function me(e) {
		e.memoizedState !== null && M(de, e);
		var t = ce.current, n = Hd(t, e.type);
		t !== n && (M(le, e), M(ce, n));
	}
	function he(e) {
		le.current === e && (j(ce), j(le)), de.current === e && (j(de), Qf._currentValue = ie);
	}
	var ge, N;
	function _e(e) {
		if (ge === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ge = t && t[1] || "", N = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ge + e + N;
	}
	var ve = !1;
	function ye(e, t) {
		if (!e || ve) return "";
		ve = !0;
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
			ve = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? _e(n) : "";
	}
	function be(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return _e(e.type);
			case 16: return _e("Lazy");
			case 13: return e.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
			case 19: return _e("SuspenseList");
			case 0:
			case 15: return ye(e.type, !1);
			case 11: return ye(e.type.render, !1);
			case 1: return ye(e.type, !0);
			case 31: return _e("Activity");
			default: return "";
		}
	}
	function xe(e) {
		try {
			var t = "", n = null;
			do
				t += be(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var P = Object.prototype.hasOwnProperty, Se = t.unstable_scheduleCallback, Ce = t.unstable_cancelCallback, F = t.unstable_shouldYield, we = t.unstable_requestPaint, Te = t.unstable_now, Ee = t.unstable_getCurrentPriorityLevel, De = t.unstable_ImmediatePriority, Oe = t.unstable_UserBlockingPriority, ke = t.unstable_NormalPriority, Ae = t.unstable_LowPriority, je = t.unstable_IdlePriority, Me = t.log, Ne = t.unstable_setDisableYieldValue, Pe = null, Fe = null;
	function Ie(e) {
		if (typeof Me == "function" && Ne(e), Fe && typeof Fe.setStrictMode == "function") try {
			Fe.setStrictMode(Pe, e);
		} catch {}
	}
	var Le = Math.clz32 ? Math.clz32 : Be, Re = Math.log, ze = Math.LN2;
	function Be(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Re(e) / ze | 0) | 0;
	}
	var Ve = 256, He = 262144, Ue = 4194304;
	function I(e) {
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
	function L(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = I(n))) : i = I(o) : i = I(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = I(n))) : i = I(o)) : i = I(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function We(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ge(e, t) {
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
	function Ke() {
		var e = Ue;
		return Ue <<= 1, !(Ue & 62914560) && (Ue = 4194304), e;
	}
	function qe(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Je(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Ye(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Le(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && R(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function R(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Le(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function Xe(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Le(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function Ze(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : Qe(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function Qe(e) {
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
	function z(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function $e() {
		var e = A.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function et(e, t) {
		var n = A.p;
		try {
			return A.p = e, t();
		} finally {
			A.p = n;
		}
	}
	var tt = Math.random().toString(36).slice(2), nt = "__reactFiber$" + tt, rt = "__reactProps$" + tt, it = "__reactContainer$" + tt, at = "__reactEvents$" + tt, ot = "__reactListeners$" + tt, st = "__reactHandles$" + tt, ct = "__reactResources$" + tt, lt = "__reactMarker$" + tt;
	function ut(e) {
		delete e[nt], delete e[rt], delete e[at], delete e[ot], delete e[st];
	}
	function B(e) {
		var t = e[nt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[it] || n[nt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[nt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function dt(e) {
		if (e = e[nt] || e[it]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ft(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function V(e) {
		var t = e[ct];
		return t || (t = e[ct] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}), t;
	}
	function pt(e) {
		e[lt] = !0;
	}
	var mt = /* @__PURE__ */ new Set(), ht = {};
	function gt(e, t) {
		_t(e, t), _t(e + "Capture", t);
	}
	function _t(e, t) {
		for (ht[e] = t, e = 0; e < t.length; e++) mt.add(t[e]);
	}
	var vt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), yt = {}, bt = {};
	function xt(e) {
		return P.call(bt, e) ? !0 : P.call(yt, e) ? !1 : vt.test(e) ? bt[e] = !0 : (yt[e] = !0, !1);
	}
	function St(e, t, n) {
		if (xt(t)) {
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
	function Ct(e, t, n) {
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
	function wt(e, t, n, r) {
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
	function Tt(e) {
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
	function Et(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Dt(e, t, n) {
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
	function Ot(e) {
		if (!e._valueTracker) {
			var t = Et(e) ? "checked" : "value";
			e._valueTracker = Dt(e, t, "" + e[t]);
		}
	}
	function kt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Et(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function At(e) {
		if (e = e || (typeof document < "u" ? document : void 0), e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var jt = /[\n"\\]/g;
	function Mt(e) {
		return e.replace(jt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Nt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Tt(t)) : e.value !== "" + Tt(t) && (e.value = "" + Tt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ft(e, o, Tt(n)) : Ft(e, o, Tt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Tt(s) : e.removeAttribute("name");
	}
	function Pt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ot(e);
				return;
			}
			n = n == null ? "" : "" + Tt(n), t = t == null ? n : "" + Tt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r = r ?? i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ot(e);
	}
	function Ft(e, t, n) {
		t === "number" && At(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function It(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Tt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Lt(e, t, n) {
		if (t != null && (t = "" + Tt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Tt(n);
	}
	function Rt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (O(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ?? (n = ""), t = n;
		}
		n = Tt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ot(e);
	}
	function zt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Bt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Vt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Bt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Ht(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Vt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Vt(e, o, t[o]);
	}
	function Ut(e) {
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
	var Wt = /* @__PURE__ */ new Map([
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
	]), Gt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Kt(e) {
		return Gt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function H() {}
	var qt = null;
	function Jt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Yt = null, Xt = null;
	function Zt(e) {
		var t = dt(e);
		if (t && (e = t.stateNode)) {
			var n = e[rt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Nt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Mt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[rt] || null;
								if (!a) throw Error(i(90));
								Nt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && kt(r);
					}
					break a;
				case "textarea":
					Lt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && It(e, !!n.multiple, t, !1);
			}
		}
	}
	var Qt = !1;
	function $t(e, t, n) {
		if (Qt) return e(t, n);
		Qt = !0;
		try {
			return e(t);
		} finally {
			if (Qt = !1, (Yt !== null || Xt !== null) && (bu(), Yt && (t = Yt, e = Xt, Xt = Yt = null, Zt(t), e))) for (t = 0; t < e.length; t++) Zt(e[t]);
		}
	}
	function en(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[rt] || null;
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
	var tn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), nn = !1;
	if (tn) try {
		var rn = {};
		Object.defineProperty(rn, "passive", { get: function() {
			nn = !0;
		} }), window.addEventListener("test", rn, rn), window.removeEventListener("test", rn, rn);
	} catch {
		nn = !1;
	}
	var an = null, on = null, sn = null;
	function cn() {
		if (sn) return sn;
		var e, t = on, n = t.length, r, i = "value" in an ? an.value : an.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return sn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function ln(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function un() {
		return !0;
	}
	function dn() {
		return !1;
	}
	function fn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? un : dn, this.isPropagationStopped = dn, this;
		}
		return f(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = un);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = un);
			},
			persist: function() {},
			isPersistent: un
		}), t;
	}
	var pn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, mn = fn(pn), hn = f({}, pn, {
		view: 0,
		detail: 0
	}), gn = fn(hn), _n, vn, yn, bn = f({}, hn, {
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
		getModifierState: jn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== yn && (yn && e.type === "mousemove" ? (_n = e.screenX - yn.screenX, vn = e.screenY - yn.screenY) : vn = _n = 0, yn = e), _n);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : vn;
		}
	}), xn = fn(bn), Sn = fn(f({}, bn, { dataTransfer: 0 })), Cn = fn(f({}, hn, { relatedTarget: 0 })), wn = fn(f({}, pn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Tn = fn(f({}, pn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), En = fn(f({}, pn, { data: 0 })), Dn = {
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
	}, On = {
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
	}, kn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function An(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = kn[e]) ? !!t[e] : !1;
	}
	function jn() {
		return An;
	}
	var Mn = fn(f({}, hn, {
		key: function(e) {
			if (e.key) {
				var t = Dn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = ln(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? On[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: jn,
		charCode: function(e) {
			return e.type === "keypress" ? ln(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? ln(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Nn = fn(f({}, bn, {
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
	})), Pn = fn(f({}, hn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: jn
	})), Fn = fn(f({}, pn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), In = fn(f({}, bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Ln = fn(f({}, pn, {
		newState: 0,
		oldState: 0
	})), Rn = [
		9,
		13,
		27,
		32
	], zn = tn && "CompositionEvent" in window, Bn = null;
	tn && "documentMode" in document && (Bn = document.documentMode);
	var Vn = tn && "TextEvent" in window && !Bn, Hn = tn && (!zn || Bn && 8 < Bn && 11 >= Bn), Un = " ", Wn = !1;
	function Gn(e, t) {
		switch (e) {
			case "keyup": return Rn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Kn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "compositionend": return Kn(t);
			case "keypress": return t.which === 32 ? (Wn = !0, Un) : null;
			case "textInput": return e = t.data, e === Un && Wn ? null : e;
			default: return null;
		}
	}
	function Yn(e, t) {
		if (qn) return e === "compositionend" || !zn && Gn(e, t) ? (e = cn(), sn = on = an = null, qn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Hn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Xn = {
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
	function Zn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Xn[e.type] : t === "textarea";
	}
	function Qn(e, t, n, r) {
		Yt ? Xt ? Xt.push(r) : Xt = [r] : Yt = r, t = Ed(t, "onChange"), 0 < t.length && (n = new mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var $n = null, er = null;
	function tr(e) {
		yd(e, 0);
	}
	function nr(e) {
		if (kt(ft(e))) return e;
	}
	function rr(e, t) {
		if (e === "change") return t;
	}
	var ir = !1;
	if (tn) {
		var ar;
		if (tn) {
			var or = "oninput" in document;
			if (!or) {
				var sr = document.createElement("div");
				sr.setAttribute("oninput", "return;"), or = typeof sr.oninput == "function";
			}
			ar = or;
		} else ar = !1;
		ir = ar && (!document.documentMode || 9 < document.documentMode);
	}
	function cr() {
		$n && ($n.detachEvent("onpropertychange", lr), er = $n = null);
	}
	function lr(e) {
		if (e.propertyName === "value" && nr(er)) {
			var t = [];
			Qn(t, er, e, Jt(e)), $t(tr, t);
		}
	}
	function ur(e, t, n) {
		e === "focusin" ? (cr(), $n = t, er = n, $n.attachEvent("onpropertychange", lr)) : e === "focusout" && cr();
	}
	function dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return nr(er);
	}
	function fr(e, t) {
		if (e === "click") return nr(t);
	}
	function mr(e, t) {
		if (e === "input" || e === "change") return nr(t);
	}
	function hr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var U = typeof Object.is == "function" ? Object.is : hr;
	function W(e, t) {
		if (U(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!P.call(t, i) || !U(e[i], t[i])) return !1;
		}
		return !0;
	}
	function gr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function _r(e, t) {
		var n = gr(e);
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
			n = gr(n);
		}
	}
	function vr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function yr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = At(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = At(e.document);
		}
		return t;
	}
	function br(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var xr = tn && "documentMode" in document && 11 >= document.documentMode, Sr = null, Cr = null, wr = null, Tr = !1;
	function Er(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Tr || Sr == null || Sr !== At(r) || (r = Sr, "selectionStart" in r && br(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), wr && W(wr, r) || (wr = r, r = Ed(Cr, "onSelect"), 0 < r.length && (t = new mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Sr)));
	}
	function Dr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Or = {
		animationend: Dr("Animation", "AnimationEnd"),
		animationiteration: Dr("Animation", "AnimationIteration"),
		animationstart: Dr("Animation", "AnimationStart"),
		transitionrun: Dr("Transition", "TransitionRun"),
		transitionstart: Dr("Transition", "TransitionStart"),
		transitioncancel: Dr("Transition", "TransitionCancel"),
		transitionend: Dr("Transition", "TransitionEnd")
	}, kr = {}, Ar = {};
	tn && (Ar = document.createElement("div").style, "AnimationEvent" in window || (delete Or.animationend.animation, delete Or.animationiteration.animation, delete Or.animationstart.animation), "TransitionEvent" in window || delete Or.transitionend.transition);
	function jr(e) {
		if (kr[e]) return kr[e];
		if (!Or[e]) return e;
		var t = Or[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Ar) return kr[e] = t[n];
		return e;
	}
	var Mr = jr("animationend"), Nr = jr("animationiteration"), Pr = jr("animationstart"), Fr = jr("transitionrun"), Ir = jr("transitionstart"), Lr = jr("transitioncancel"), Rr = jr("transitionend"), zr = /* @__PURE__ */ new Map(), Br = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Br.push("scrollEnd");
	function Vr(e, t) {
		zr.set(e, t), gt(t, [e]);
	}
	var Hr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Ur = [], Wr = 0, Gr = 0;
	function Kr() {
		for (var e = Wr, t = Gr = Wr = 0; t < e;) {
			var n = Ur[t];
			Ur[t++] = null;
			var r = Ur[t];
			Ur[t++] = null;
			var i = Ur[t];
			Ur[t++] = null;
			var a = Ur[t];
			if (Ur[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Xr(n, i, a);
		}
	}
	function qr(e, t, n, r) {
		Ur[Wr++] = e, Ur[Wr++] = t, Ur[Wr++] = n, Ur[Wr++] = r, Gr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Jr(e, t, n, r) {
		return qr(e, t, n, r), Zr(e);
	}
	function Yr(e, t) {
		return qr(e, null, null, t), Zr(e);
	}
	function Xr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Le(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Zr(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Qr = {};
	function $r(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ei(e, t, n, r) {
		return new $r(e, t, n, r);
	}
	function ti(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ni(e, t) {
		var n = e.alternate;
		return n === null ? (n = ei(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ri(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ii(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ti(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, ce.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ee: return e = ei(31, n, t, a), e.elementType = ee, e.lanes = o, e;
			case g: return oi(n.children, a, o, t);
			case _:
				s = 8, a |= 24;
				break;
			case v: return e = ei(12, n, t, a | 2), e.elementType = v, e.lanes = o, e;
			case S: return e = ei(13, n, t, a), e.elementType = S, e.lanes = o, e;
			case C: return e = ei(19, n, t, a), e.elementType = C, e.lanes = o, e;
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
		return t = ei(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function oi(e, t, n, r) {
		return e = ei(7, e, r, t), e.lanes = n, e;
	}
	function ci(e, t, n) {
		return e = ei(6, e, null, t), e.lanes = n, e;
	}
	function li(e) {
		var t = ei(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ui(e, t, n) {
		return t = ei(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var di = /* @__PURE__ */ new WeakMap();
	function fi(e, t) {
		if (typeof e == "object" && e) {
			var n = di.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: xe(t)
			}, di.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: xe(t)
		};
	}
	var pi = [], mi = 0, hi = null, gi = 0, _i = [], vi = 0, yi = null, bi = 1, xi = "";
	function Si(e, t) {
		pi[mi++] = gi, pi[mi++] = hi, hi = e, gi = t;
	}
	function Ci(e, t, n) {
		_i[vi++] = bi, _i[vi++] = xi, _i[vi++] = yi, yi = e;
		var r = bi;
		e = xi;
		var i = 32 - Le(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Le(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, bi = 1 << 32 - Le(t) + i | n << i | r, xi = a + e;
		} else bi = 1 << a | n << i | r, xi = e;
	}
	function wi(e) {
		e.return !== null && (Si(e, 1), Ci(e, 1, 0));
	}
	function Ti(e) {
		for (; e === hi;) hi = pi[--mi], pi[mi] = null, gi = pi[--mi], pi[mi] = null;
		for (; e === yi;) yi = _i[--vi], _i[vi] = null, xi = _i[--vi], _i[vi] = null, bi = _i[--vi], _i[vi] = null;
	}
	function Ei(e, t) {
		_i[vi++] = bi, _i[vi++] = xi, _i[vi++] = yi, bi = t.id, xi = t.overflow, yi = e;
	}
	var Di = null, Oi = null, G = !1, ki = null, Ai = !1, ji = Error(i(519));
	function Mi(e) {
		throw Ri(fi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ji;
	}
	function Ni(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[nt] = e, t[rt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Pt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Rt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = H), t = !0) : t = !1, t || Mi(e, !0);
	}
	function Pi(e) {
		for (Di = e.return; Di;) switch (Di.tag) {
			case 5:
			case 31:
			case 13:
				Ai = !1;
				return;
			case 27:
			case 3:
				Ai = !0;
				return;
			default: Di = Di.return;
		}
	}
	function Fi(e) {
		if (e !== Di) return !1;
		if (!G) return Pi(e), G = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && Oi && Mi(e), Pi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Oi = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Oi = uf(e);
		} else t === 27 ? (t = Oi, Zd(e.type) ? (e = lf, lf = null, Oi = e) : Oi = t) : Oi = Di ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ii() {
		Oi = Di = null, G = !1;
	}
	function Li() {
		var e = ki;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), ki = null), e;
	}
	function Ri(e) {
		ki === null ? ki = [e] : ki.push(e);
	}
	var zi = se(null), Bi = null, Vi = null;
	function Hi(e, t, n) {
		M(zi, t._currentValue), t._currentValue = n;
	}
	function Ui(e) {
		e._currentValue = zi.current, j(zi);
	}
	function Wi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Gi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Wi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Wi(s, n, e), s = null;
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
	function Ki(e, t, n, r) {
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
					U(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === de.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Gi(t, e, n, r), t.flags |= 262144;
	}
	function qi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!U(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Ji(e) {
		Bi = e, Vi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Yi(e) {
		return Zi(Bi, e);
	}
	function Xi(e, t) {
		return Bi === null && Ji(e), Zi(e, t);
	}
	function Zi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Vi === null) {
			if (e === null) throw Error(i(308));
			Vi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Vi = Vi.next = t;
		return n;
	}
	var Qi = typeof AbortController < "u" ? AbortController : function() {
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
	}, $i = t.unstable_scheduleCallback, ea = t.unstable_NormalPriority, ta = {
		$$typeof: b,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function na() {
		return {
			controller: new Qi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ra(e) {
		e.refCount--, e.refCount === 0 && $i(ea, function() {
			e.controller.abort();
		});
	}
	var ia = null, aa = 0, oa = 0, sa = null;
	function ca(e, t) {
		if (ia === null) {
			var n = ia = [];
			aa = 0, oa = dd(), sa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return aa++, t.then(la, la), t;
	}
	function la() {
		if (--aa === 0 && ia !== null) {
			sa !== null && (sa.status = "fulfilled");
			var e = ia;
			ia = null, oa = 0, sa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ua(e, t) {
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
	var da = k.S;
	k.S = function(e, t) {
		eu = Te(), typeof t == "object" && t && typeof t.then == "function" && ca(e, t), da !== null && da(e, t);
	};
	var fa = se(null);
	function pa() {
		var e = fa.current;
		return e === null ? Rl.pooledCache : e;
	}
	function ma(e, t) {
		t === null ? M(fa, fa.current) : M(fa, t.pool);
	}
	function ha() {
		var e = pa();
		return e === null ? null : {
			parent: ta._currentValue,
			pool: e
		};
	}
	var ga = Error(i(460)), _a = Error(i(474)), va = Error(i(542)), ya = { then: function() {} };
	function ba(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function xa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(H, H), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Ta(e), e;
			default:
				if (typeof t.status == "string") t.then(H, H);
				else {
					if (e = Rl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Ta(e), e;
				}
				throw Ca = t, ga;
		}
	}
	function Sa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ca = e, ga) : e;
		}
	}
	var Ca = null;
	function wa() {
		if (Ca === null) throw Error(i(459));
		var e = Ca;
		return Ca = null, e;
	}
	function Ta(e) {
		if (e === ga || e === va) throw Error(i(483));
	}
	var Ea = null, Da = 0;
	function Oa(e) {
		var t = Da;
		return Da += 1, Ea === null && (Ea = []), xa(Ea, e, t);
	}
	function ka(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Aa(e, t) {
		throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function ja(e) {
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
			return e = ni(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ci(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && Sa(i) === t.type) ? (t = a(t, n.props), ka(t, n), t.return = e, t) : (t = ii(n.type, n.key, n.props, null, e.mode, r), ka(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ui(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = oi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ci("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case m: return n = ii(t.type, t.key, t.props, null, e.mode, n), ka(n, t), n.return = e, n;
					case h: return t = ui(t, e.mode, n), t.return = e, t;
					case T: return t = Sa(t), f(e, t, n);
				}
				if (O(t) || E(t)) return t = oi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Oa(t), n);
				if (t.$$typeof === b) return f(e, Xi(e, t), n);
				Aa(e, t);
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
					case T: return n = Sa(n), p(e, t, n, r);
				}
				if (O(n) || E(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Oa(n), r);
				if (n.$$typeof === b) return p(e, t, Xi(e, n), r);
				Aa(e, n);
			}
			return null;
		}
		function _(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case m: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case h: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Sa(r), _(e, t, n, r, i);
				}
				if (O(r) || E(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return _(e, t, n, Oa(r), i);
				if (r.$$typeof === b) return _(e, t, n, Xi(t, r), i);
				Aa(t, r);
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
			if (m === s.length) return n(i, d), G && Si(i, m), l;
			if (d === null) {
				for (; m < s.length; m++) d = f(i, s[m], c), d !== null && (a = o(d, a, m), u === null ? l = d : u.sibling = d, u = d);
				return G && Si(i, m), l;
			}
			for (d = r(d); m < s.length; m++) h = _(d, i, m, s[m], c), h !== null && (e && h.alternate !== null && d.delete(h.key === null ? m : h.key), a = o(h, a, m), u === null ? l = h : u.sibling = h, u = h);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), G && Si(i, m), l;
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
			if (v.done) return n(a, m), G && Si(a, h), u;
			if (m === null) {
				for (; !v.done; h++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
				return G && Si(a, h), u;
			}
			for (m = r(m); !v.done; h++, v = c.next()) v = _(m, a, h, v.value, l), v !== null && (e && v.alternate !== null && m.delete(v.key === null ? h : v.key), s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
			return e && m.forEach(function(e) {
				return t(a, e);
			}), G && Si(a, h), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Sa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), ka(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === g ? (c = oi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ii(o.type, o.key, o.props, null, e.mode, c), ka(c, o), c.return = e, e = c);
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
							c = ui(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = Sa(o), x(e, r, o, c);
				}
				if (O(o)) return v(e, r, o, c);
				if (E(o)) {
					if (l = E(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return x(e, r, Oa(o), c);
				if (o.$$typeof === b) return x(e, r, Xi(e, o), c);
				Aa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ci(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Da = 0;
				var i = x(e, t, n, r);
				return Ea = null, i;
			} catch (t) {
				if (t === ga || t === va) throw t;
				var a = ei(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ma = ja(!0), Na = ja(!1), Pa = !1;
	function Fa(e) {
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
	function Ia(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function La(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ra(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, q & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Zr(e), Xr(e, null, n), t;
		}
		return qr(e, r, t, n), Zr(e);
	}
	function za(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Xe(e, n);
		}
	}
	function Ba(e, t) {
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
	var Va = !1;
	function Ha() {
		if (Va) {
			var e = sa;
			if (e !== null) throw e;
		}
	}
	function Ua(e, t, n, r) {
		Va = !1;
		var i = e.updateQueue;
		Pa = !1;
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
				if (m ? (Y & p) === p : (r & p) === p) {
					p !== 0 && p === oa && (Va = !0), u !== null && (u = u.next = {
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
							case 2: Pa = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Wa(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ga(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Wa(n[e], t);
	}
	var Ka = se(null), qa = se(0);
	function Ja(e, t) {
		e = Ul, M(qa, e), M(Ka, t), Ul = e | t.baseLanes;
	}
	function Ya() {
		M(qa, Ul), M(Ka, Ka.current);
	}
	function Xa() {
		Ul = qa.current, j(Ka), j(qa);
	}
	var Za = se(null), Qa = null;
	function $a(e) {
		var t = e.alternate;
		M(io, io.current & 1), M(Za, e), Qa === null && (t === null || Ka.current !== null || t.memoizedState !== null) && (Qa = e);
	}
	function eo(e) {
		M(io, io.current), M(Za, e), Qa === null && (Qa = e);
	}
	function to(e) {
		e.tag === 22 ? (M(io, io.current), M(Za, e), Qa === null && (Qa = e)) : no(e);
	}
	function no() {
		M(io, io.current), M(Za, Za.current);
	}
	function ro(e) {
		j(Za), Qa === e && (Qa = null), j(io);
	}
	var io = se(0);
	function ao(e) {
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
	var oo = 0, K = null, so = null, co = null, lo = !1, uo = !1, fo = !1, po = 0, mo = 0, ho = null, go = 0;
	function _o() {
		throw Error(i(321));
	}
	function vo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!U(e[n], t[n])) return !1;
		return !0;
	}
	function yo(e, t, n, r, i, a) {
		return oo = a, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Is : Ls, fo = !1, a = n(r, i), fo = !1, uo && (a = xo(t, n, r, i)), bo(e), a;
	}
	function bo(e) {
		k.H = Fs;
		var t = so !== null && so.next !== null;
		if (oo = 0, co = so = K = null, lo = !1, mo = 0, ho = null, t) throw Error(i(300));
		e === null || ec || (e = e.dependencies, e !== null && qi(e) && (ec = !0));
	}
	function xo(e, t, n, r) {
		K = e;
		var a = 0;
		do {
			if (uo && (ho = null), mo = 0, uo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, co = so = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			k.H = Rs, o = t(n, r);
		} while (uo);
		return o;
	}
	function So() {
		var e = k.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ko(t) : t, e = e.useState()[0], (so === null ? null : so.memoizedState) !== e && (K.flags |= 1024), t;
	}
	function Co() {
		var e = po !== 0;
		return po = 0, e;
	}
	function wo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function To(e) {
		if (lo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			lo = !1;
		}
		oo = 0, co = so = K = null, uo = !1, mo = po = 0, ho = null;
	}
	function Eo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return co === null ? K.memoizedState = co = e : co = co.next = e, co;
	}
	function Do() {
		if (so === null) {
			var e = K.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = so.next;
		var t = co === null ? K.memoizedState : co.next;
		if (t !== null) co = t, so = e;
		else {
			if (e === null) throw K.alternate === null ? Error(i(467)) : Error(i(310));
			so = e, e = {
				memoizedState: so.memoizedState,
				baseState: so.baseState,
				baseQueue: so.baseQueue,
				queue: so.queue,
				next: null
			}, co === null ? K.memoizedState = co = e : co = co.next = e;
		}
		return co;
	}
	function Oo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ko(e) {
		var t = mo;
		return mo += 1, ho === null && (ho = []), e = xa(ho, e, t), t = K, (co === null ? t.memoizedState : co.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Is : Ls), e;
	}
	function Ao(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ko(e);
			if (e.$$typeof === b) return Yi(e);
		}
		throw Error(i(438, String(e)));
	}
	function jo(e) {
		var t = null, n = K.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = K.alternate;
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
		}), n === null && (n = Oo(), K.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = te;
		return t.index++, n;
	}
	function Mo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function No(e) {
		return Po(Do(), so, e);
	}
	function Po(e, t, n) {
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
				if (f === u.lane ? (oo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === oa && (d = !0);
					else if ((oo & p) === p) {
						u = u.next, p === oa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, K.lanes |= p, Gl |= p;
					f = u.action, fo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, K.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !U(o, e.memoizedState) && (ec = !0, d && (n = sa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Fo(e) {
		var t = Do(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			U(o, t.memoizedState) || (ec = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Io(e, t, n) {
		var r = K, a = Do(), o = G;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !U((so || a).memoizedState, n);
		if (s && (a.memoizedState = n, ec = !0), a = a.queue, ss(zo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || co !== null && co.memoizedState.tag & 1) {
			if (r.flags |= 2048, ns(9, { destroy: void 0 }, Ro.bind(null, r, a, n, t), null), Rl === null) throw Error(i(349));
			o || oo & 127 || Lo(r, t, n);
		}
		return n;
	}
	function Lo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = K.updateQueue, t === null ? (t = Oo(), K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ro(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Bo(t) && Vo(e);
	}
	function zo(e, t, n) {
		return n(function() {
			Bo(t) && Vo(e);
		});
	}
	function Bo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !U(e, n);
		} catch {
			return !0;
		}
	}
	function Vo(e) {
		var t = Yr(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Ho(e) {
		var t = Eo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), fo) {
				Ie(!0);
				try {
					n();
				} finally {
					Ie(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Mo,
			lastRenderedState: e
		}, t;
	}
	function Uo(e, t, n, r) {
		return e.baseState = n, Po(e, so, typeof r == "function" ? r : Mo);
	}
	function Wo(e, t, n, r, a) {
		if (Ms(e)) throw Error(i(485));
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
			k.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Go(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Go(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = k.T, o = {};
			k.T = o;
			try {
				var s = n(i, r), c = k.S;
				c !== null && c(o, s), Ko(e, t, s);
			} catch (n) {
				Jo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), k.T = a;
			}
		} else try {
			a = n(i, r), Ko(e, t, a);
		} catch (n) {
			Jo(e, t, n);
		}
	}
	function Ko(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			qo(e, t, n);
		}, function(n) {
			return Jo(e, t, n);
		}) : qo(e, t, n);
	}
	function qo(e, t, n) {
		t.status = "fulfilled", t.value = n, Yo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Go(e, n)));
	}
	function Jo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Yo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Yo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Xo(e, t) {
		return t;
	}
	function Zo(e, t) {
		if (G) {
			var n = Rl.formState;
			if (n !== null) {
				a: {
					var r = K;
					if (G) {
						if (Oi) {
							b: {
								for (var i = Oi, a = Ai; i.nodeType !== 8;) {
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
								Oi = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Mi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Eo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Xo,
			lastRenderedState: t
		}, n.queue = r, n = ks.bind(null, K, r), r.dispatch = n, r = Ho(!1), a = js.bind(null, K, !1, r.queue), r = Eo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Wo.bind(null, K, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Qo(e) {
		return $o(Do(), so, e);
	}
	function $o(e, t, n) {
		if (t = Po(e, t, Xo)[0], e = No(Mo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ko(t);
		} catch (e) {
			throw e === ga ? va : e;
		}
		else r = t;
		t = Do();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (K.flags |= 2048, ns(9, { destroy: void 0 }, es.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function es(e, t) {
		e.action = t;
	}
	function ts(e) {
		var t = Do(), n = so;
		if (n !== null) return $o(t, n, e);
		Do(), t = t.memoizedState, n = Do();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ns(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = K.updateQueue, t === null && (t = Oo(), K.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function rs() {
		return Do().memoizedState;
	}
	function is(e, t, n, r) {
		var i = Eo();
		K.flags |= e, i.memoizedState = ns(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function as(e, t, n, r) {
		var i = Do();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		so !== null && r !== null && vo(r, so.memoizedState.deps) ? i.memoizedState = ns(t, a, n, r) : (K.flags |= e, i.memoizedState = ns(1 | t, a, n, r));
	}
	function os(e, t) {
		is(8390656, 8, e, t);
	}
	function ss(e, t) {
		as(2048, 8, e, t);
	}
	function cs(e) {
		K.flags |= 4;
		var t = K.updateQueue;
		if (t === null) t = Oo(), K.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ls(e) {
		var t = Do().memoizedState;
		return cs({
			ref: t,
			nextImpl: e
		}), function() {
			if (q & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function us(e, t) {
		return as(4, 2, e, t);
	}
	function ds(e, t) {
		return as(4, 4, e, t);
	}
	function fs(e, t) {
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
	function ps(e, t, n) {
		n = n == null ? null : n.concat([e]), as(4, 4, fs.bind(null, t, e), n);
	}
	function ms() {}
	function hs(e, t) {
		var n = Do();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && vo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function gs(e, t) {
		var n = Do();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && vo(t, r[1])) return r[0];
		if (r = e(), fo) {
			Ie(!0);
			try {
				e();
			} finally {
				Ie(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function _s(e, t, n) {
		return n === void 0 || oo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), K.lanes |= e, Gl |= e, n);
	}
	function vs(e, t, n, r) {
		return U(n, t) ? n : Ka.current === null ? !(oo & 42) || oo & 1073741824 && !(Y & 261930) ? (ec = !0, e.memoizedState = n) : (e = mu(), K.lanes |= e, Gl |= e, t) : (e = _s(e, n, r), U(e, t) || (ec = !0), e);
	}
	function ys(e, t, n, r, i) {
		var a = A.p;
		A.p = a !== 0 && 8 > a ? a : 8;
		var o = k.T, s = {};
		k.T = s, js(e, !1, t, n);
		try {
			var c = i(), l = k.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? As(e, t, ua(c, r), pu(e)) : As(e, t, r, pu(e));
		} catch (n) {
			As(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			A.p = a, o !== null && s.types !== null && (o.types = s.types), k.T = o;
		}
	}
	function bs() {}
	function xs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ss(e).queue;
		ys(e, a, t, ie, n === null ? bs : function() {
			return Cs(e), n(r);
		});
	}
	function Ss(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ie,
			baseState: ie,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Mo,
				lastRenderedState: ie
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
				lastRenderedReducer: Mo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Cs(e) {
		var t = Ss(e);
		t.next === null && (t = e.alternate.memoizedState), As(e, t.next.queue, {}, pu());
	}
	function ws() {
		return Yi(Qf);
	}
	function Ts() {
		return Do().memoizedState;
	}
	function Es() {
		return Do().memoizedState;
	}
	function Ds(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = La(n);
					var r = Ra(t, e, n);
					r !== null && (hu(r, t, n), za(r, t, n)), t = { cache: na() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Os(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ms(e) ? Ns(t, n) : (n = Jr(e, t, n, r), n !== null && (hu(n, e, r), Ps(n, t, r)));
	}
	function ks(e, t, n) {
		As(e, t, n, pu());
	}
	function As(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ms(e)) Ns(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, U(s, o)) return qr(e, t, i, 0), Rl === null && Kr(), !1;
			} catch {}
			if (n = Jr(e, t, i, r), n !== null) return hu(n, e, r), Ps(n, t, r), !0;
		}
		return !1;
	}
	function js(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ms(e)) {
			if (t) throw Error(i(479));
		} else t = Jr(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Ms(e) {
		var t = e.alternate;
		return e === K || t !== null && t === K;
	}
	function Ns(e, t) {
		uo = lo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ps(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Xe(e, n);
		}
	}
	var Fs = {
		readContext: Yi,
		use: Ao,
		useCallback: _o,
		useContext: _o,
		useEffect: _o,
		useImperativeHandle: _o,
		useLayoutEffect: _o,
		useInsertionEffect: _o,
		useMemo: _o,
		useReducer: _o,
		useRef: _o,
		useState: _o,
		useDebugValue: _o,
		useDeferredValue: _o,
		useTransition: _o,
		useSyncExternalStore: _o,
		useId: _o,
		useHostTransitionStatus: _o,
		useFormState: _o,
		useActionState: _o,
		useOptimistic: _o,
		useMemoCache: _o,
		useCacheRefresh: _o
	};
	Fs.useEffectEvent = _o;
	var Is = {
		readContext: Yi,
		use: Ao,
		useCallback: function(e, t) {
			return Eo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Yi,
		useEffect: os,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), is(4194308, 4, fs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return is(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			is(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Eo();
			t = t === void 0 ? null : t;
			var r = e();
			if (fo) {
				Ie(!0);
				try {
					e();
				} finally {
					Ie(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Eo();
			if (n !== void 0) {
				var i = n(t);
				if (fo) {
					Ie(!0);
					try {
						n(t);
					} finally {
						Ie(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Os.bind(null, K, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Eo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ho(e);
			var t = e.queue, n = ks.bind(null, K, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			return _s(Eo(), e, t);
		},
		useTransition: function() {
			var e = Ho(!1);
			return e = ys.bind(null, K, e.queue, !0, !1), Eo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = K, a = Eo();
			if (G) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Rl === null) throw Error(i(349));
				Y & 127 || Lo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, os(zo.bind(null, r, o, e), [e]), r.flags |= 2048, ns(9, { destroy: void 0 }, Ro.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Eo(), t = Rl.identifierPrefix;
			if (G) {
				var n = xi, r = bi;
				n = (r & ~(1 << 32 - Le(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = po++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = go++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: ws,
		useFormState: Zo,
		useActionState: Zo,
		useOptimistic: function(e) {
			var t = Eo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = js.bind(null, K, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: jo,
		useCacheRefresh: function() {
			return Eo().memoizedState = Ds.bind(null, K);
		},
		useEffectEvent: function(e) {
			var t = Eo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (q & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ls = {
		readContext: Yi,
		use: Ao,
		useCallback: hs,
		useContext: Yi,
		useEffect: ss,
		useImperativeHandle: ps,
		useInsertionEffect: us,
		useLayoutEffect: ds,
		useMemo: gs,
		useReducer: No,
		useRef: rs,
		useState: function() {
			return No(Mo);
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			return vs(Do(), so.memoizedState, e, t);
		},
		useTransition: function() {
			var e = No(Mo)[0], t = Do().memoizedState;
			return [typeof e == "boolean" ? e : ko(e), t];
		},
		useSyncExternalStore: Io,
		useId: Ts,
		useHostTransitionStatus: ws,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e, t) {
			return Uo(Do(), so, e, t);
		},
		useMemoCache: jo,
		useCacheRefresh: Es
	};
	Ls.useEffectEvent = ls;
	var Rs = {
		readContext: Yi,
		use: Ao,
		useCallback: hs,
		useContext: Yi,
		useEffect: ss,
		useImperativeHandle: ps,
		useInsertionEffect: us,
		useLayoutEffect: ds,
		useMemo: gs,
		useReducer: Fo,
		useRef: rs,
		useState: function() {
			return Fo(Mo);
		},
		useDebugValue: ms,
		useDeferredValue: function(e, t) {
			var n = Do();
			return so === null ? _s(n, e, t) : vs(n, so.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Fo(Mo)[0], t = Do().memoizedState;
			return [typeof e == "boolean" ? e : ko(e), t];
		},
		useSyncExternalStore: Io,
		useId: Ts,
		useHostTransitionStatus: ws,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			var n = Do();
			return so === null ? (n.baseState = e, [e, n.queue.dispatch]) : Uo(n, so, e, t);
		},
		useMemoCache: jo,
		useCacheRefresh: Es
	};
	Rs.useEffectEvent = ls;
	function zs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Bs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = La(r);
			i.payload = t, n != null && (i.callback = n), t = Ra(e, i, r), t !== null && (hu(t, e, r), za(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = La(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ra(e, i, r), t !== null && (hu(t, e, r), za(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = La(n);
			r.tag = 2, t != null && (r.callback = t), t = Ra(e, r, n), t !== null && (hu(t, e, n), za(t, e, n));
		}
	};
	function Vs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !W(n, r) || !W(i, a) : !0;
	}
	function Hs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Bs.enqueueReplaceState(t, t.state, null);
	}
	function Us(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ws(e) {
		Hr(e);
	}
	function Gs(e) {
		console.error(e);
	}
	function Ks(e) {
		Hr(e);
	}
	function qs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Js(e, t, n) {
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
	function Ys(e, t, n) {
		return n = La(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			qs(e, t);
		}, n;
	}
	function Xs(e) {
		return e = La(e), e.tag = 3, e;
	}
	function Zs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Js(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Js(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Qs(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ki(t, n, a, !0), n = Za.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Qa === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ya ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ya ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (G) return t = Za.current, t === null ? (r !== ji && (t = Error(i(423), { cause: r }), Ri(fi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = fi(r, n), a = Ys(e.stateNode, r, a), Ba(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ji && (e = Error(i(422), { cause: r }), Ri(fi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = fi(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = fi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ys(n.stateNode, r, e), Ba(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Xs(a), Zs(a, e, n, r), Ba(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var $s = Error(i(461)), ec = !1;
	function tc(e, t, n, r) {
		t.child = e === null ? Na(t, null, n, r) : Ma(t, e.child, n, r);
	}
	function nc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Ji(t), r = yo(e, t, n, o, a, i), s = Co(), e !== null && !ec ? (wo(e, t, i), Ec(e, t, i)) : (G && s && wi(t), t.flags |= 1, tc(e, t, r, i), t.child);
	}
	function rc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ti(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ic(e, t, a, r, i)) : (e = ii(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Dc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? W : n, n(o, r) && e.ref === t.ref) return Ec(e, t, i);
		}
		return t.flags |= 1, e = ni(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ic(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (W(a, r) && e.ref === t.ref) {
				if (ec = !1, t.pendingProps = r = a, Dc(e, i)) e.flags & 131072 && (ec = !0);
				else return t.lanes = e.lanes, Ec(e, t, i);
			}
		}
		return fc(e, t, n, r, i);
	}
	function ac(e, t, n, r) {
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
				return sc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ma(t, a === null ? null : a.cachePool), a === null ? Ya() : Ja(t, a), to(t);
			else return r = t.lanes = 536870912, sc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ma(t, null), Ya(), no(t)) : (ma(t, a.cachePool), Ja(t, a), no(t), t.memoizedState = null);
		return tc(e, t, i, n), t.child;
	}
	function oc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function sc(e, t, n, r, i) {
		var a = pa();
		return a = a === null ? null : {
			parent: ta._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ma(t, null), Ya(), to(t), e !== null && Ki(e, t, r, !0), t.childLanes = i, null;
	}
	function cc(e, t) {
		return t = xc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function lc(e, t, n) {
		return Ma(t, e.child, null, n), e = cc(t, t.pendingProps), e.flags |= 2, ro(t), t.memoizedState = null, e;
	}
	function uc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (G) {
				if (r.mode === "hidden") return e = cc(t, r), t.lanes = 536870912, oc(null, e);
				if (eo(t), (e = Oi) ? (e = rf(e, Ai), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: yi === null ? null : {
						id: bi,
						overflow: xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = li(e), n.return = t, t.child = n, Di = t, Oi = null)) : e = null, e === null) throw Mi(t);
				return t.lanes = 536870912, null;
			}
			return cc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (eo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = lc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (ec || Ki(e, t, n, !1), a = (n & e.childLanes) !== 0, ec || a) {
				if (r = Rl, r !== null && (s = Ze(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Yr(e, s), hu(r, e, s), $s;
				Du(), t = lc(e, t, n);
			} else e = o.treeContext, Oi = cf(s.nextSibling), Di = t, G = !0, ki = null, Ai = !1, e !== null && Ei(t, e), t = cc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ni(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function dc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function fc(e, t, n, r, i) {
		return Ji(t), n = yo(e, t, n, r, void 0, i), r = Co(), e !== null && !ec ? (wo(e, t, i), Ec(e, t, i)) : (G && r && wi(t), t.flags |= 1, tc(e, t, n, i), t.child);
	}
	function pc(e, t, n, r, i, a) {
		return Ji(t), t.updateQueue = null, n = xo(t, r, n, i), bo(e), r = Co(), e !== null && !ec ? (wo(e, t, a), Ec(e, t, a)) : (G && r && wi(t), t.flags |= 1, tc(e, t, n, a), t.child);
	}
	function mc(e, t, n, r, i) {
		if (Ji(t), t.stateNode === null) {
			var a = Qr, o = n.contextType;
			typeof o == "object" && o && (a = Yi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Bs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Fa(t), o = n.contextType, a.context = typeof o == "object" && o ? Yi(o) : Qr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (zs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Bs.enqueueReplaceState(a, a.state, null), Ua(t, r, a, i), Ha(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Us(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Qr, typeof u == "object" && u && (o = Yi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Hs(t, a, r, o), Pa = !1;
			var f = t.memoizedState;
			a.state = f, Ua(t, r, a, i), Ha(), l = t.memoizedState, s || f !== l || Pa ? (typeof d == "function" && (zs(t, n, d, r), l = t.memoizedState), (c = Pa || Vs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ia(e, t), o = t.memoizedProps, u = Us(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Qr, typeof l == "object" && l && (c = Yi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Hs(t, a, r, c), Pa = !1, f = t.memoizedState, a.state = f, Ua(t, r, a, i), Ha();
			var p = t.memoizedState;
			o !== d || f !== p || Pa || e !== null && e.dependencies !== null && qi(e.dependencies) ? (typeof s == "function" && (zs(t, n, s, r), p = t.memoizedState), (u = Pa || Vs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && qi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, dc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ma(t, e.child, null, i), t.child = Ma(t, null, n, i)) : tc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ec(e, t, i), e;
	}
	function hc(e, t, n, r) {
		return Ii(), t.flags |= 256, tc(e, t, n, r), t.child;
	}
	var gc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function _c(e) {
		return {
			baseLanes: e,
			cachePool: ha()
		};
	}
	function vc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function yc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(io.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (G) {
				if (a ? $a(t) : no(t), (e = Oi) ? (e = rf(e, Ai), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: yi === null ? null : {
						id: bi,
						overflow: xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = li(e), n.return = t, t.child = n, Di = t, Oi = null)) : e = null, e === null) throw Mi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (no(t), a = t.mode, c = xc({
				mode: "hidden",
				children: c
			}, a), r = oi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = _c(n), r.childLanes = vc(e, s, n), t.memoizedState = gc, oc(null, r)) : ($a(t), bc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? ($a(t), t.flags &= -257, t = Sc(e, t, n)) : t.memoizedState === null ? (no(t), c = r.fallback, a = t.mode, r = xc({
				mode: "visible",
				children: r.children
			}, a), c = oi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ma(t, e.child, null, n), r = t.child, r.memoizedState = _c(n), r.childLanes = vc(e, s, n), t.memoizedState = gc, t = oc(null, r)) : (no(t), t.child = e.child, t.flags |= 128, t = null);
			else if ($a(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ri({
					value: r,
					source: null,
					stack: null
				}), t = Sc(e, t, n);
			} else if (ec || Ki(e, t, n, !1), s = (n & e.childLanes) !== 0, ec || s) {
				if (s = Rl, s !== null && (r = Ze(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Yr(e, r), hu(s, e, r), $s;
				af(c) || Du(), t = Sc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Oi = cf(c.nextSibling), Di = t, G = !0, ki = null, Ai = !1, e !== null && Ei(t, e), t = bc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (no(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ni(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = oi(c, a, n, null), c.flags |= 2) : c = ni(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, oc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = _c(n) : (a = c.cachePool, a === null ? a = ha() : (l = ta._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = vc(e, s, n), t.memoizedState = gc, oc(e.child, r)) : ($a(t), n = e.child, e = n.sibling, n = ni(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function bc(e, t) {
		return t = xc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function xc(e, t) {
		return e = ei(22, e, null, t), e.lanes = 0, e;
	}
	function Sc(e, t, n) {
		return Ma(t, e.child, null, n), e = bc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Cc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Wi(e.return, t, n);
	}
	function wc(e, t, n, r, i, a) {
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
	function Tc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = io.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, M(io, o), tc(e, t, r, n), r = G ? gi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Cc(e, n, t);
			else if (e.tag === 19) Cc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ao(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), wc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ao(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				wc(t, !0, n, null, a, r);
				break;
			case "together":
				wc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ec(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (Ki(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ni(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ni(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Dc(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && qi(e)));
	}
	function Oc(e, t, n) {
		switch (t.tag) {
			case 3:
				fe(t, t.stateNode.containerInfo), Hi(t, ta, e.memoizedState.cache), Ii();
				break;
			case 27:
			case 5:
				me(t);
				break;
			case 4:
				fe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Hi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, eo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? ($a(t), e = Ec(e, t, n), e === null ? null : e.sibling) : yc(e, t, n) : ($a(t), t.flags |= 128, null);
				$a(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r || (Ki(e, t, n, !1), r = (n & t.childLanes) !== 0), i) {
					if (r) return Tc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), M(io, io.current), r) break;
				return null;
			case 22: return t.lanes = 0, ac(e, t, n, t.pendingProps);
			case 24: Hi(t, ta, e.memoizedState.cache);
		}
		return Ec(e, t, n);
	}
	function kc(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) ec = !0;
			else {
				if (!Dc(e, n) && !(t.flags & 128)) return ec = !1, Oc(e, t, n);
				ec = !!(e.flags & 131072);
			}
		} else ec = !1, G && t.flags & 1048576 && Ci(t, gi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Sa(t.elementType), t.type = e, typeof e == "function") ti(e) ? (r = Us(e, r), t.tag = 1, t = mc(null, t, e, r, n)) : (t.tag = 0, t = fc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === x) {
								t.tag = 11, t = nc(null, t, e, r, n);
								break a;
							}
							if (a === w) {
								t.tag = 14, t = rc(null, t, e, r, n);
								break a;
							}
						}
						throw t = re(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return fc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Us(r, t.pendingProps), mc(e, t, r, a, n);
			case 3:
				a: {
					if (fe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ia(e, t), Ua(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Hi(t, ta, r), r !== o.cache && Gi(t, [ta], n, !0), Ha(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = hc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = fi(Error(i(424)), t), Ri(a), t = hc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Oi = cf(e.firstChild), Di = t, G = !0, ki = null, Ai = !0, n = Na(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ii(), r === a) {
							t = Ec(e, t, n);
							break a;
						}
						tc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return dc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : G || (n = t.type, e = t.pendingProps, r = Bd(ue.current).createElement(n), r[nt] = t, r[rt] = e, Pd(r, n, e), pt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return me(t), e === null && G && (r = t.stateNode = ff(t.type, t.pendingProps, ue.current), Di = t, Ai = !0, a = Oi, Zd(t.type) ? (lf = a, Oi = cf(r.firstChild)) : Oi = a), tc(e, t, t.pendingProps.children, n), dc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && G && ((a = r = Oi) && (r = tf(r, t.type, t.pendingProps, Ai), r === null ? a = !1 : (t.stateNode = r, Di = t, Oi = cf(r.firstChild), Ai = !1, a = !0)), a || Mi(t)), me(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = yo(e, t, So, null, null, n), Qf._currentValue = a), dc(e, t), tc(e, t, r, n), t.child;
			case 6: return e === null && G && ((e = n = Oi) && (n = nf(n, t.pendingProps, Ai), n === null ? e = !1 : (t.stateNode = n, Di = t, Oi = null, e = !0)), e || Mi(t)), null;
			case 13: return yc(e, t, n);
			case 4: return fe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ma(t, null, r, n) : tc(e, t, r, n), t.child;
			case 11: return nc(e, t, t.type, t.pendingProps, n);
			case 7: return tc(e, t, t.pendingProps, n), t.child;
			case 8: return tc(e, t, t.pendingProps.children, n), t.child;
			case 12: return tc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Hi(t, t.type, r.value), tc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Ji(t), a = Yi(a), r = r(a), t.flags |= 1, tc(e, t, r, n), t.child;
			case 14: return rc(e, t, t.type, t.pendingProps, n);
			case 15: return ic(e, t, t.type, t.pendingProps, n);
			case 19: return Tc(e, t, n);
			case 31: return uc(e, t, n);
			case 22: return ac(e, t, n, t.pendingProps);
			case 24: return Ji(t), r = Yi(ta), e === null ? (a = pa(), a === null && (a = Rl, o = na(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Fa(t), Hi(t, ta, a)) : ((e.lanes & n) !== 0 && (Ia(e, t), Ua(t, null, null, n), Ha()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Hi(t, ta, r), r !== a.cache && Gi(t, [ta], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Hi(t, ta, r))), tc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ac(e) {
		e.flags |= 4;
	}
	function jc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (wu()) e.flags |= 8192;
				else throw Ca = ya, _a;
			}
		} else e.flags &= -16777217;
	}
	function Mc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) {
			if (wu()) e.flags |= 8192;
			else throw Ca = ya, _a;
		}
	}
	function Nc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ke(), e.lanes |= t, Yl |= t);
	}
	function Pc(e, t) {
		if (!G) switch (e.tailMode) {
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
	function Fc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Ic(e, t, n) {
		var r = t.pendingProps;
		switch (Ti(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Fc(t), null;
			case 1: return Fc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ui(ta), pe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Fi(t) ? Ac(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Li())), Fc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ac(t), o === null ? (Fc(t), jc(t, a, null, r, n)) : (Fc(t), Mc(t, o))) : o ? o === e.memoizedState ? (Fc(t), t.flags &= -16777217) : (Ac(t), Fc(t), Mc(t, o)) : (e = e.memoizedProps, e !== r && Ac(t), Fc(t), jc(t, a, e, r, n)), null;
			case 27:
				if (he(t), n = ue.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					e = ce.current, Fi(t) ? Ni(t, e) : (e = ff(a, r, n), t.stateNode = e, Ac(t));
				}
				return Fc(t), null;
			case 5:
				if (he(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Fc(t), null;
					}
					if (o = ce.current, Fi(t)) Ni(t, o);
					else {
						var s = Bd(ue.current);
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
						o[nt] = t, o[rt] = r;
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
						r && Ac(t);
					}
				}
				return Fc(t), jc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ac(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ue.current, Fi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Di, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[nt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Mi(t, !0);
					} else e = Bd(e).createTextNode(r), e[nt] = t, t.stateNode = e;
				}
				return Fc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Fi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[nt] = t;
						} else Ii(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), e = !1;
					} else n = Li(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ro(t), t) : (ro(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Fc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Fi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[nt] = t;
						} else Ii(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Fc(t), a = !1;
					} else a = Li(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ro(t), t) : (ro(t), null);
				}
				return ro(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Nc(t, t.updateQueue), Fc(t), null);
			case 4: return pe(), e === null && Sd(t.stateNode.containerInfo), Fc(t), null;
			case 10: return Ui(t.type), Fc(t), null;
			case 19:
				if (j(io), r = t.memoizedState, r === null) return Fc(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) Pc(r, !1);
					else {
						if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = ao(e), o !== null) {
								for (t.flags |= 128, Pc(r, !1), e = o.updateQueue, t.updateQueue = e, Nc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ri(n, e), n = n.sibling;
								return M(io, io.current & 1 | 2), G && Si(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Te() > tu && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = ao(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Nc(t, e), Pc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !G) return Fc(t), null;
						} else 2 * Te() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Pc(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Fc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Te(), e.sibling = null, n = io.current, M(io, a ? n & 1 | 2 : n & 1), G && Si(t, r.treeForkCount), e);
			case 22:
			case 23: return ro(t), Xa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Fc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Fc(t), n = t.updateQueue, n !== null && Nc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && j(fa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ui(ta), Fc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Lc(e, t) {
		switch (Ti(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ui(ta), pe(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return he(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ro(t), t.alternate === null) throw Error(i(340));
					Ii();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ro(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ii();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return j(io), null;
			case 4: return pe(), null;
			case 10: return Ui(t.type), null;
			case 22:
			case 23: return ro(t), Xa(), e !== null && j(fa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ui(ta), null;
			case 25: return null;
			default: return null;
		}
	}
	function Rc(e, t) {
		switch (Ti(t), t.tag) {
			case 3:
				Ui(ta), pe();
				break;
			case 26:
			case 27:
			case 5:
				he(t);
				break;
			case 4:
				pe();
				break;
			case 31:
				t.memoizedState !== null && ro(t);
				break;
			case 13:
				ro(t);
				break;
			case 19:
				j(io);
				break;
			case 10:
				Ui(t.type);
				break;
			case 22:
			case 23:
				ro(t), Xa(), e !== null && j(fa);
				break;
			case 24: Ui(ta);
		}
	}
	function zc(e, t) {
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
			Z(t, t.return, e);
		}
	}
	function Bc(e, t, n) {
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
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Vc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ga(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Hc(e, t, n) {
		n.props = Us(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Uc(e, t) {
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
			Z(e, t, n);
		}
	}
	function Wc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				Z(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				Z(e, t, n);
			}
			else n.current = null;
		}
	}
	function Gc(e) {
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
			Z(e, e.return, t);
		}
	}
	function Kc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[rt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function qc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Jc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || qc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Yc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = H));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Yc(e, t, n), e = e.sibling; e !== null;) Yc(e, t, n), e = e.sibling;
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[nt] = e, t[rt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var Qc = !1, $c = !1, el = !1, tl = typeof WeakSet == "function" ? WeakSet : Set, nl = null;
	function rl(e, t) {
		if (e = e.containerInfo, Rd = sp, e = yr(e), br(e)) {
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
		}, sp = !1, nl = t; nl !== null;) if (t = nl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, nl = e;
		else for (; nl !== null;) {
			switch (t = nl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Us(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
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
				e.return = t.return, nl = e;
				break;
			}
			nl = t.return;
		}
	}
	function il(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				yl(e, n), r & 4 && zc(5, n);
				break;
			case 1:
				if (yl(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						Z(n, n.return, e);
					}
					else {
						var i = Us(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							Z(n, n.return, e);
						}
					}
				}
				r & 64 && Vc(n), r & 512 && Uc(n, n.return);
				break;
			case 3:
				if (yl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ga(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Zc(n);
			case 26:
			case 5:
				yl(e, n), t === null && r & 4 && Gc(n), r & 512 && Uc(n, n.return);
				break;
			case 12:
				yl(e, n);
				break;
			case 31:
				yl(e, n), r & 4 && ul(e, n);
				break;
			case 13:
				yl(e, n), r & 4 && dl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Qc, !r) {
					t = t !== null && t.memoizedState !== null || $c, i = Qc;
					var a = $c;
					Qc = r, ($c = t) && !a ? xl(e, n, !!(n.subtreeFlags & 8772)) : yl(e, n), Qc = i, $c = a;
				}
				break;
			case 30: break;
			default: yl(e, n);
		}
	}
	function al(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, al(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ut(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ol = null, sl = !1;
	function cl(e, t, n) {
		for (n = n.child; n !== null;) ll(e, t, n), n = n.sibling;
	}
	function ll(e, t, n) {
		if (Fe && typeof Fe.onCommitFiberUnmount == "function") try {
			Fe.onCommitFiberUnmount(Pe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				$c || Wc(n, t), cl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				$c || Wc(n, t);
				var r = ol, i = sl;
				Zd(n.type) && (ol = n.stateNode, sl = !1), cl(e, t, n), pf(n.stateNode), ol = r, sl = i;
				break;
			case 5: $c || Wc(n, t);
			case 6:
				if (r = ol, i = sl, ol = null, cl(e, t, n), ol = r, sl = i, ol !== null) {
					if (sl) try {
						(ol.nodeType === 9 ? ol.body : ol.nodeName === "HTML" ? ol.ownerDocument.body : ol).removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
					else try {
						ol.removeChild(n.stateNode);
					} catch (e) {
						Z(n, t, e);
					}
				}
				break;
			case 18:
				ol !== null && (sl ? (e = ol, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(ol, n.stateNode));
				break;
			case 4:
				r = ol, i = sl, ol = n.stateNode.containerInfo, sl = !0, cl(e, t, n), ol = r, sl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Bc(2, n, t), $c || Bc(4, n, t), cl(e, t, n);
				break;
			case 1:
				$c || (Wc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Hc(n, t, r)), cl(e, t, n);
				break;
			case 21:
				cl(e, t, n);
				break;
			case 22:
				$c = (r = $c) || n.memoizedState !== null, cl(e, t, n), $c = r;
				break;
			default: cl(e, t, n);
		}
	}
	function ul(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function fl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new tl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new tl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function pl(e, t) {
		var n = fl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ml(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							ol = c.stateNode, sl = !1;
							break a;
						}
						break;
					case 5:
						ol = c.stateNode, sl = !1;
						break a;
					case 3:
					case 4:
						ol = c.stateNode.containerInfo, sl = !0;
						break a;
				}
				c = c.return;
			}
			if (ol === null) throw Error(i(160));
			ll(o, s, a), ol = null, sl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) gl(t, e), t = t.sibling;
	}
	var hl = null;
	function gl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ml(t, e), _l(e), r & 4 && (Bc(3, e, e.return), zc(3, e), Bc(5, e, e.return));
				break;
			case 1:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 64 && Qc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = hl;
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) {
						if (r === null) {
							if (e.stateNode === null) {
								a: {
									r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
									b: switch (r) {
										case "title":
											o = a.getElementsByTagName("title")[0], (!o || o[lt] || o[nt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[nt] = e, pt(o), r = o;
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
									o[nt] = e, pt(o), r = o;
								}
								e.stateNode = r;
							} else Hf(a, e.type, e.stateNode);
						} else e.stateNode = If(a, r, e.memoizedProps);
					} else o === r ? r === null && e.stateNode !== null && Kc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), n !== null && r & 4 && Kc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ml(t, e), _l(e), r & 512 && ($c || n === null || Wc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						zt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Kc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (el = !0);
				break;
			case 6:
				if (ml(t, e), _l(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = hl, hl = gf(t.containerInfo), ml(t, e), hl = a, _l(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				el && (el = !1, vl(e));
				break;
			case 4:
				r = hl, hl = gf(e.stateNode.containerInfo), ml(t, e), _l(e), hl = r;
				break;
			case 12:
				ml(t, e), _l(e);
				break;
			case 31:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 13:
				ml(t, e), _l(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Te()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Qc, d = $c;
				if (Qc = u || a, $c = d || l, ml(t, e), $c = d, Qc = u, _l(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Qc || $c || bl(e)), n = null, t = e;;) {
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
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, pl(e, n))));
				break;
			case 19:
				ml(t, e), _l(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, pl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ml(t, e), _l(e);
		}
	}
	function _l(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (qc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Xc(e, Jc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (zt(o, ""), n.flags &= -33), Xc(e, Jc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Yc(e, Jc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function vl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			vl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function yl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) il(e, t.alternate, t), t = t.sibling;
	}
	function bl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Bc(4, t, t.return), bl(t);
					break;
				case 1:
					Wc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Hc(t, t.return, n), bl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Wc(t, t.return), bl(t);
					break;
				case 22:
					t.memoizedState === null && bl(t);
					break;
				case 30:
					bl(t);
					break;
				default: bl(t);
			}
			e = e.sibling;
		}
	}
	function xl(e, t, n) {
		for (n = n && !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					xl(i, a, n), zc(4, a);
					break;
				case 1:
					if (xl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Wa(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Vc(a), Uc(a, a.return);
					break;
				case 27: Zc(a);
				case 26:
				case 5:
					xl(i, a, n), n && r === null && o & 4 && Gc(a), Uc(a, a.return);
					break;
				case 12:
					xl(i, a, n);
					break;
				case 31:
					xl(i, a, n), n && o & 4 && ul(i, a);
					break;
				case 13:
					xl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 22:
					a.memoizedState === null && xl(i, a, n), Uc(a, a.return);
					break;
				case 30: break;
				default: xl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Sl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ra(n));
	}
	function Cl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ra(e));
	}
	function wl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Tl(e, t, n, r), t = t.sibling;
	}
	function Tl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				wl(e, t, n, r), i & 2048 && zc(9, t);
				break;
			case 1:
				wl(e, t, n, r);
				break;
			case 3:
				wl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ra(e)));
				break;
			case 12:
				if (i & 2048) {
					wl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else wl(e, t, n, r);
				break;
			case 31:
				wl(e, t, n, r);
				break;
			case 13:
				wl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? wl(e, t, n, r) : (a._visibility |= 2, El(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? wl(e, t, n, r) : Dl(e, t), i & 2048 && Sl(o, t);
				break;
			case 24:
				wl(e, t, n, r), i & 2048 && Cl(t.alternate, t);
				break;
			default: wl(e, t, n, r);
		}
	}
	function El(e, t, n, r, i) {
		for (i = i && (!!(t.subtreeFlags & 10256) || !1), t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					El(a, o, s, c, i), zc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, El(a, o, s, c, i)) : u._visibility & 2 ? El(a, o, s, c, i) : Dl(a, o), i && l & 2048 && Sl(o.alternate, o);
					break;
				case 24:
					El(a, o, s, c, i), i && l & 2048 && Cl(o.alternate, o);
					break;
				default: El(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Dl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Dl(n, r), i & 2048 && Sl(r.alternate, r);
					break;
				case 24:
					Dl(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				default: Dl(n, r);
			}
			t = t.sibling;
		}
	}
	var Ol = 8192;
	function kl(e, t, n) {
		if (e.subtreeFlags & Ol) for (e = e.child; e !== null;) Al(e, t, n), e = e.sibling;
	}
	function Al(e, t, n) {
		switch (e.tag) {
			case 26:
				kl(e, t, n), e.flags & Ol && e.memoizedState !== null && Gf(n, hl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				kl(e, t, n);
				break;
			case 3:
			case 4:
				var r = hl;
				hl = gf(e.stateNode.containerInfo), kl(e, t, n), hl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Ol, Ol = 16777216, kl(e, t, n), Ol = r) : kl(e, t, n));
				break;
			default: kl(e, t, n);
		}
	}
	function jl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ml(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Nl(e), e = e.sibling;
	}
	function Nl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ml(e), e.flags & 2048 && Bc(9, e, e.return);
				break;
			case 3:
				Ml(e);
				break;
			case 12:
				Ml(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Pl(e)) : Ml(e);
				break;
			default: Ml(e);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				nl = r, Fl(r, e);
			}
			jl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, t, t.return), Pl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Pl(t));
					break;
				default: Pl(t);
			}
			e = e.sibling;
		}
	}
	function Fl(e, t) {
		for (; nl !== null;) {
			var n = nl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Bc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ra(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, nl = r;
			else a: for (n = e; nl !== null;) {
				r = nl;
				var i = r.sibling, a = r.return;
				if (al(r), r === n) {
					nl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, nl = i;
					break a;
				}
				nl = a;
			}
		}
	}
	var Il = {
		getCacheForType: function(e) {
			var t = Yi(ta), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Yi(ta).controller.signal;
		}
	}, Ll = typeof WeakMap == "function" ? WeakMap : Map, q = 0, Rl = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return q & 2 && Y !== 0 ? Y & -Y : k.T === null ? $e() : dd();
	}
	function mu() {
		if (Jl === 0) {
			if (!(Y & 536870912) || G) {
				var e = He;
				He <<= 1, !(He & 3932160) && (He = 262144), Jl = e;
			} else Jl = 536870912;
		}
		return e = Za.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === Rl && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), Je(e, n), (!(q & 2) || e !== Rl) && (e === Rl && (!(q & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (q & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || We(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !vu(n)) {
				a = Ou(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
							if (Hl && !l) {
								c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
								break a;
							}
							o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Bl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = $l + 300 - Te(), 10 < a)) {
					if (yu(r, t, Jl, !Bl), L(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: H
			}, Al(t, a, d);
			var m = (a & 62914560) === a ? $l - Te() : (a & 4194048) === a ? eu - Te() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!U(a(), i)) return !1;
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
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Le(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && R(e, n, t);
	}
	function bu() {
		return q & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Vi = Bi = null, To(e), Ea = null, Da = 0, e = J;
			for (; e !== null;) Rc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), Rl = e, J = n = ni(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = We(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Le(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, Kr(), n;
	}
	function Cu(e, t) {
		K = null, k.H = Fs, t === ga || t === va ? (t = wa(), X = 3) : t === _a ? (t = wa(), X = 4) : X = t === $s ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, qs(e, fi(t, e.current)));
	}
	function wu() {
		var e = Za.current;
		return e === null ? !0 : (Y & 4194048) === Y ? Qa === null : (Y & 62914560) === Y || Y & 536870912 ? e === Qa : !1;
	}
	function Tu() {
		var e = k.H;
		return k.H = Fs, e === null ? Fs : e;
	}
	function Eu() {
		var e = k.A;
		return k.A = Il, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && Za.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || Rl === null || yu(Rl, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = q;
		q |= 2;
		var i = Tu(), a = Eu();
		(Rl !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Za.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Vi = Bi = null, q = r, k.H = i, k.A = a, J === null && (Rl = null, Y = 0, Kr()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = q;
		q |= 2;
		var r = Tu(), a = Eu();
		Rl !== e || Y !== t ? (nu = null, tu = Te() + 500, Su(e, t)) : Vl = We(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ba(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || Rl !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							ba(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Vi = Bi = null, k.H = r, k.A = a, q = n, J === null ? (Rl = null, Y = 0, Kr(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !F();) Mu(J);
	}
	function Mu(e) {
		var t = kc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = pc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = pc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: To(t);
			default: Rc(n, t), t = J = ri(t, Ul), t = kc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Vi = Bi = null, To(t), Ea = null, Da = 0;
		var i = t.return;
		try {
			if (Qs(e, i, t, n, Y)) {
				Wl = 1, qs(e, fi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, qs(e, fi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (G || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Za.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Ic(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = Lc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (q & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Gr, Ye(e, n, o, s, c, l), e === Rl && (J = Rl = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(ke, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = k.T, k.T = null, a = A.p, A.p = 2, s = q, q |= 4;
				try {
					rl(e, t, n);
				} finally {
					q = s, A.p = a, k.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = q;
				q |= 4;
				try {
					gl(t, e);
					var a = zd, o = yr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && vr(s.ownerDocument.documentElement, s)) {
						if (c !== null && br(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = _r(s, h), v = _r(s, g);
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
					q = i, A.p = r, k.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = q;
				q |= 4;
				try {
					il(e, t.alternate, t);
				} finally {
					q = i, A.p = r, k.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, we();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), z(n), t = t.stateNode, Fe && typeof Fe.onCommitFiberRoot == "function") try {
				Fe.onCommitFiberRoot(Pe, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = k.T, i = A.p, A.p = 2, k.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					k.T = t, A.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ra(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = z(su), r = k.T, a = A.p;
		try {
			A.p = 32 > n ? 32 : n, k.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, q & 6) throw Error(i(331));
			var c = q;
			if (q |= 4, Nl(o.current), Tl(o, o.current, s, n), q = c, id(0, !1), Fe && typeof Fe.onPostCommitFiberRoot == "function") try {
				Fe.onPostCommitFiberRoot(Pe, o);
			} catch {}
			return !0;
		} finally {
			A.p = a, k.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = fi(n, t), t = Ys(e.stateNode, t, 2), e = Ra(e, t, 2), e !== null && (Je(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = fi(n, e), n = Xs(2), r = Ra(t, n, 2), r !== null && (Zs(n, r, t, e), Je(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Ll();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Rl === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > Te() - $l ? !(q & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Ke()), e = Yr(e, t), e !== null && (Je(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
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
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return Se(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Le(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, ld(r, a));
						} else a = Y, a = L(r, r === Rl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || We(r, a) || (n = !0, ld(r, a));
					}
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = Te(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Le(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ge(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Rl, n = Y, n = L(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ce(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || We(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ce(r), z(n)) {
				case 2:
				case 8:
					n = Oe;
					break;
				case 32:
					n = ke;
					break;
				case 268435456:
					n = je;
					break;
				default: n = ke;
			}
			return r = cd.bind(null, e), n = Se(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ce(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = L(e, e === Rl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Te()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			q & 6 ? Se(De, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = oa;
			e === 0 && (e = Ve, Ve <<= 1, !(Ve & 261888) && (Ve = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Kt("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[rt] || null).action), o = r.submitter;
			o && (t = (t = o[rt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								xs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), xs(n, {
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
	for (var hd = 0; hd < Br.length; hd++) {
		var gd = Br[hd];
		Vr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Vr(Mr, "onAnimationEnd"), Vr(Nr, "onAnimationIteration"), Vr(Pr, "onAnimationStart"), Vr("dblclick", "onDoubleClick"), Vr("focusin", "onFocus"), Vr("focusout", "onBlur"), Vr(Fr, "onTransitionRun"), Vr(Ir, "onTransitionStart"), Vr(Lr, "onTransitionCancel"), Vr(Rr, "onTransitionEnd"), _t("onMouseEnter", ["mouseout", "mouseover"]), _t("onMouseLeave", ["mouseout", "mouseover"]), _t("onPointerEnter", ["pointerout", "pointerover"]), _t("onPointerLeave", ["pointerout", "pointerover"]), gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), gt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
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
						Hr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Hr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[at];
		n === void 0 && (n = t[at] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, mt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !nn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
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
					if (s = B(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		$t(function() {
			var r = a, i = Jt(n), s = [];
			a: {
				var c = zr.get(e);
				if (c !== void 0) {
					var l = mn, u = e;
					switch (e) {
						case "keypress": if (ln(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Mn;
							break;
						case "focusin":
							u = "focus", l = Cn;
							break;
						case "focusout":
							u = "blur", l = Cn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Cn;
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
							l = xn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Sn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Pn;
							break;
						case Mr:
						case Nr:
						case Pr:
							l = wn;
							break;
						case Rr:
							l = Fn;
							break;
						case "scroll":
						case "scrollend":
							l = gn;
							break;
						case "wheel":
							l = In;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Tn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Nn;
							break;
						case "toggle":
						case "beforetoggle": l = Ln;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = en(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== qt && (u = n.relatedTarget || n.fromElement) && (B(u) || u[it])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? B(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = xn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Nn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : ft(l), h = u == null ? c : ft(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, B(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? ft(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = rr;
					else if (Zn(c)) {
						if (ir) v = mr;
						else {
							v = dr;
							var y = ur;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Ut(r.elementType) && (v = rr) : v = fr;
					if (v && (v = v(e, r))) {
						Qn(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ft(c, "number", c.value);
				}
				switch (y = r ? ft(r) : window, e) {
					case "focusin":
						(Zn(y) || y.contentEditable === "true") && (Sr = y, Cr = r, wr = null);
						break;
					case "focusout":
						wr = Cr = Sr = null;
						break;
					case "mousedown":
						Tr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Tr = !1, Er(s, n, i);
						break;
					case "selectionchange": if (xr) break;
					case "keydown":
					case "keyup": Er(s, n, i);
				}
				var b;
				if (zn) b: {
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
				else qn ? Gn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Hn && n.locale !== "ko" && (qn || x !== "onCompositionStart" ? x === "onCompositionEnd" && qn && (b = cn()) : (an = i, on = "value" in an ? an.value : an.textContent, qn = !0)), y = Ed(r, x), 0 < y.length && (x = new En(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Kn(n), b !== null && (x.data = b)))), (b = Vn ? Jn(e, n) : Yn(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new En("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = en(e, n), i != null && r.unshift(Td(e, i, a)), i = en(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = en(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = en(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || zt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && zt(e, "" + r);
				break;
			case "className":
				Ct(e, "class", r);
				break;
			case "tabIndex":
				Ct(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ct(e, n, r);
				break;
			case "style":
				Ht(e, r, o);
				break;
			case "data": if (t !== "object") {
				Ct(e, "data", r);
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
				r = Kt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Kt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = H);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
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
				n = Kt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Q("beforetoggle", e), Q("toggle", e), St(e, "popover", r);
				break;
			case "xlinkActuate":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				wt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				wt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				wt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				wt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				St(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Wt.get(n) || n, St(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Ht(e, r, o);
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
				typeof r == "string" ? zt(e, r) : (typeof r == "number" || typeof r == "bigint") && zt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = H);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!ht.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[rt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : St(e, n, r);
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
				Q("error", e), Q("load", e);
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
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
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
						default: $(e, t, r, d, n, null);
					}
				}
				Pt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && It(e, !!r, n, !0) : It(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: $(e, t, s, c, n, null);
				}
				Rt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
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
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Ut(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
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
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
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
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Nt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? It(e, !!n, n ? [] : "", !1) : It(e, !!n, t, !0)) : It(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
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
					default: a !== o && $(e, t, s, a, r, o);
				}
				Lt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Ut(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
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
						a[lt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), ut(n);
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
			} else if (!e[lt]) switch (t) {
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
		ut(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = A.d;
	A.d = {
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
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = dt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Cs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Mt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), pt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Mt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Mt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Mt(n.imageSizes) + "\"]")) : i += "[href=\"" + Mt(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), pt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Mt(r) + "\"][href=\"" + Mt(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), pt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = V(r).hoistableStyles, a = Af(e);
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
					pt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = V(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), pt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = V(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = f({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), pt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = ue.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = V(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = V(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = V(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Mt(e) + "\"";
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
		}), Pd(t, "link", n), pt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Mt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Mt(n.href) + "\"]");
				if (r) return t.instance = r, pt(r), r;
				var a = f({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), pt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, pt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), pt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, pt(a), a) : (r = n, (a = mf.get(o)) && (r = f({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), pt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[lt] || a[nt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, pt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), pt(a);
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
		_currentValue: ie,
		_currentValue2: ie,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = qe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qe(0), this.hiddenUpdates = qe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ei(3, null, null, t), e.current = a, a.stateNode = e, t = na(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Fa(a), e;
	}
	function tp(e) {
		return e ? (e = Qr, e) : Qr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = La(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ra(e, r, t), n !== null && (hu(n, e, t), za(n, e, t));
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
			var t = Yr(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = Qe(t);
			var n = Yr(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 2, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 8, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = dt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = I(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Le(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(q & 6) && (tu = Te() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Yr(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Jt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = B(e), e !== null) {
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
			case "message": switch (Ee()) {
				case De: return 2;
				case Oe: return 8;
				case ke:
				case Ae: return 32;
				case je: return 268435456;
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
		}, t !== null && (t = dt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = B(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, et(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, et(e.priority, function() {
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
				qt = r, n.target.dispatchEvent(r), qt = null;
			} else return t = dt(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = dt(n);
				a !== null && (e.splice(t, 3), t -= 3, xs(a, {
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
			var i = n[r], a = n[r + 1], o = i[rt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[rt] || null) s = o.formAction;
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
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[it] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = $e();
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
	A.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: k,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Pe = zp.inject(Rp), Fe = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ws, s = Gs, c = Ks;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[it] = t.current, Sd(e), new Fp(t);
	};
})), li = (/* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = ci();
})))(), ui = "__HA_LIQUID_GLASS_REACT_CARD_RUNTIME__", di = globalThis, fi = di[ui] ?? (di[ui] = {
	constructors: /* @__PURE__ */ new Map(),
	definitions: /* @__PURE__ */ new Map(),
	instances: /* @__PURE__ */ new Map()
});
function pi(e) {
	let t = e.tagName, n = e;
	fi.definitions.set(t, n);
	let r = fi.constructors.get(t);
	if (r) {
		let n = r;
		n.getConfigElement = e.getConfigElement, n.getStubConfig = e.getStubConfig;
		for (let e of fi.instances.get(t) ?? []) e.requestRender();
		return n;
	}
	if (customElements.get(t)) throw Error(`Cannot register React card: custom element "${t}" already exists`);
	class i extends HTMLElement {
		constructor() {
			super();
			let e = this.attachShadow({ mode: "open" });
			this.mountNode = document.createElement("div"), this.mountNode.setAttribute("part", "root"), e.append(this.mountNode);
		}
		get hass() {
			return this.hassValue;
		}
		set hass(e) {
			this.hassValue = e, this.requestRender();
		}
		setConfig(e) {
			if (!e || typeof e != "object") throw Error("Invalid configuration");
			let t = this.currentDefinition();
			this.configValue = t.normalizeConfig?.(e) ?? e, this.requestRender();
		}
		getCardSize() {
			return this.configValue ? this.currentDefinition().getCardSize?.(this.configValue) ?? 3 : 3;
		}
		connectedCallback() {
			let e = fi.instances.get(t) ?? /* @__PURE__ */ new Set();
			e.add(this), fi.instances.set(t, e), this.requestRender();
		}
		disconnectedCallback() {
			fi.instances.get(t)?.delete(this), this.root?.unmount(), this.root = void 0;
		}
		requestRender() {
			if (!this.isConnected || !this.configValue) return;
			this.root ?? (this.root = (0, li.createRoot)(this.mountNode));
			let e = this.currentDefinition();
			this.root.render((0, U.createElement)(e.component, {
				config: this.configValue,
				hass: this.hassValue,
				host: this
			}));
		}
		currentDefinition() {
			let e = fi.definitions.get(t);
			if (!e) throw Error(`React card definition for "${t}" is unavailable`);
			return e;
		}
	}
	let a = i;
	return e.getConfigElement && (a.getConfigElement = e.getConfigElement), e.getStubConfig && (a.getStubConfig = e.getStubConfig), fi.constructors.set(t, a), customElements.define(t, a), a;
}
//#endregion
//#region src/react/glass-primitives.tsx
var mi = {
	strength: 0,
	curvature: 0,
	dispersion: 0,
	bend: 0
};
function hi(e) {
	return e ? void 0 : mi;
}
function gi({ icon: e, decorative: t = !0 }) {
	return (0, U.createElement)("lg-icon", {
		icon: e,
		...t ? { "aria-hidden": "true" } : {}
	});
}
//#endregion
//#region src/react/use-card-host.ts
function _i(e, t, n) {
	let r = t.theme === "dark" || t.theme !== "light" && !!n?.themes?.darkMode, i = t.refraction !== !1;
	return (0, U.useLayoutEffect)(() => {
		e.toggleAttribute("dark", r), e.toggleAttribute("refraction", i), e.setAttribute("glass-variant", t.glass_variant ?? "regular");
	}, [
		t.glass_variant,
		e,
		r,
		i
	]), {
		isDark: r,
		refraction: i
	};
}
//#endregion
//#region src/cards/lock-card.tsx
var vi = 64, yi = 0, bi = `${on.cssText}${dn.cssText}
  .card {
    gap: 16px;
    width: 100%;
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
    box-shadow:
      0 14px 36px -4px var(--lg-shadow-glass),
      0 1px 1px var(--lg-glass-inner),
      inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .slide {
    --thumb: ${vi}px;
    position: relative;
    height: calc(var(--thumb) + 0px);
    border-radius: 999px;
    padding: ${yi}px;
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
  .thumb {
    top: ${yi}px;
    width: var(--thumb);
    height: var(--thumb);
    border-radius: 50%;
    place-items: center;
    cursor: grab;
    color: var(--thumb-color);
    background: rgba(255, 255, 255, 0.56);
    box-shadow:
      0 5px 14px rgba(0, 0, 0, 0.6),
      0 1px 3px rgba(255, 255, 255, 0.4),
      inset 0 0 0 1.5px #fff;
    transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    --mdc-icon-size: calc(var(--thumb) * 0.43);
  }
  .thumb.dragging {
    transition: none;
    cursor: grabbing;
  }
  .thumb > lg-icon {
    position: relative;
    z-index: 1;
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
    .hint lg-icon { display: none; }
  }
  @supports (container-type: inline-size) {
    .slide { --thumb: clamp(40px, 16.8cqi, ${vi}px); }
    .card { --lg-hint: clamp(11.5px, 3.7cqi, 14px); }
  }
`;
function xi(e, t, n, r) {
	let i = Je(e.last_changed, r);
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
		thumbColor: "var(--lg-warn-text)",
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
		thumbColor: "var(--lg-lock-locked-deep)",
		hint: r("slide_to_unlock"),
		state: e.state === "locking" ? r("locking") : `${r("is_locked")} · ${r("auto_locked_at", { t: Ye(e.last_changed) })}`
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
		thumbColor: "var(--lg-lock-unlocked-deep)",
		hint: r("slide_to_lock"),
		state: e.state === "unlocking" ? r("unlocking") : `${r("is_unlocked")} · ${i}`
	};
}
function Si({ config: e, hass: t, host: n }) {
	let { refraction: r } = _i(n, e, t), [i, a] = (0, U.useState)(), [o, s] = (0, U.useState)(!1), c = (0, U.useRef)(void 0), l = (0, U.useRef)(null), u = qe(e.language ?? t?.locale?.language ?? t?.language), d = e.entity ? t?.states[e.entity] : void 0, f = hi(r);
	if ((0, U.useEffect)(() => () => window.clearTimeout(c.current), []), !d || $e(d)) {
		let t = e.name ?? Qe(d, e.entity ?? "");
		return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("style", { children: bi }), /* @__PURE__ */ (0, W.jsx)(ni, {
			className: "card",
			optics: f,
			style: {
				display: "flex",
				position: "relative"
			},
			children: /* @__PURE__ */ (0, W.jsxs)("div", {
				className: "header",
				children: [/* @__PURE__ */ (0, W.jsx)("div", {
					className: "icon-well idle",
					onClick: () => Ze(n, e.entity),
					role: "button",
					children: /* @__PURE__ */ (0, W.jsx)(gi, { icon: e.icon ?? "mdi:help-circle-outline" })
				}), /* @__PURE__ */ (0, W.jsxs)("div", {
					className: "title",
					onClick: () => Ze(n, e.entity),
					children: [/* @__PURE__ */ (0, W.jsx)("div", {
						className: "name",
						children: t
					}), /* @__PURE__ */ (0, W.jsx)("div", {
						className: "state",
						children: u("unavailable")
					})]
				})]
			})
		})] });
	}
	let p = d.state, m = p === "locked" || p === "locking", h = p === "jammed", g = o || p === "locking" || p === "unlocking", _ = xi(d, m, h, u), v = i !== void 0, y = v ? i : +!m, b = v ? 1 - Math.abs(y - +!m) * 1.6 : 1, x = (e) => {
		let t = l.current;
		if (!t) return 0;
		let n = t.getBoundingClientRect(), r = t.querySelector(".thumb")?.offsetWidth || vi, i = n.width - 0 - r;
		return i <= 0 ? 0 : R((e - n.left - yi - r / 2) / i, 0, 1);
	}, S = (n) => {
		t && e.entity && (s(!0), t.callService("lock", n, { entity_id: e.entity }), window.clearTimeout(c.current), c.current = window.setTimeout(() => s(!1), 4e3));
	}, C = (e) => {
		h || g || e.button !== 0 || (e.preventDefault(), e.currentTarget.setPointerCapture?.(e.pointerId), a(x(e.clientX)));
	}, w = (e) => {
		i !== void 0 && a(x(e.clientX));
	}, T = (e) => {
		if (i === void 0) return;
		let t = x(e.clientX);
		a(void 0), m && t >= .8 ? S("unlock") : !m && t <= .2 && S("lock");
	}, ee = (n) => {
		let r = n.service.indexOf(".");
		if (!t || r < 1 || r === n.service.length - 1) return;
		let i = n.service.slice(0, r), a = n.service.slice(r + 1);
		t.callService(i, a, {
			entity_id: e.entity,
			...n.data ?? {}
		});
	}, te = {
		display: "grid",
		position: "absolute",
		left: `calc(${yi}px + (100% - 0px - var(--thumb)) * ${y})`,
		"--thumb-color": _.thumbColor
	};
	return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("style", { children: bi }), /* @__PURE__ */ (0, W.jsxs)(ni, {
		className: "card",
		optics: f,
		style: {
			display: "flex",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ (0, W.jsxs)("div", {
				className: "header",
				children: [
					/* @__PURE__ */ (0, W.jsx)("div", {
						className: "icon-well",
						style: {
							"--well-from": _.well.from,
							"--well-to": _.well.to,
							"--well-glow": _.well.glow
						},
						onClick: () => Ze(n, e.entity),
						role: "button",
						children: /* @__PURE__ */ (0, W.jsx)(gi, { icon: e.icon ?? _.icon })
					}),
					/* @__PURE__ */ (0, W.jsxs)("div", {
						className: "title",
						onClick: () => Ze(n, e.entity),
						children: [/* @__PURE__ */ (0, W.jsx)("div", {
							className: "name",
							children: e.name ?? Qe(d, e.entity ?? "")
						}), /* @__PURE__ */ (0, W.jsx)("div", {
							className: "state",
							children: _.state
						})]
					}),
					/* @__PURE__ */ (0, W.jsxs)("div", {
						className: "badge",
						style: {
							"--badge-color": _.badge.color,
							"--badge-bg": _.badge.background,
							"--badge-stroke": _.badge.stroke,
							"--badge-glow": _.badge.glow ?? _.badge.color
						},
						children: [/* @__PURE__ */ (0, W.jsx)("span", { className: "dot" }), /* @__PURE__ */ (0, W.jsx)("span", { children: _.badgeLabel })]
					})
				]
			}),
			/* @__PURE__ */ (0, W.jsxs)("div", {
				ref: l,
				className: `slide${h || g ? " disabled" : ""}`,
				onPointerDown: C,
				onPointerMove: w,
				onPointerUp: T,
				onPointerCancel: T,
				children: [/* @__PURE__ */ (0, W.jsxs)("div", {
					className: "hint",
					style: { opacity: R(b, 0, 1) },
					children: [
						!m && !h && /* @__PURE__ */ (0, W.jsx)(gi, { icon: "mdi:chevron-double-left" }),
						/* @__PURE__ */ (0, W.jsx)("span", { children: _.hint }),
						m && !h && /* @__PURE__ */ (0, W.jsx)(gi, { icon: "mdi:chevron-double-right" })
					]
				}), /* @__PURE__ */ (0, W.jsx)(ni, {
					className: `thumb${v ? " dragging" : ""}`,
					optics: f,
					style: te,
					children: /* @__PURE__ */ (0, W.jsx)(gi, { icon: _.icon })
				})]
			}),
			e.buttons?.length ? /* @__PURE__ */ (0, W.jsx)("div", {
				className: "chips",
				children: e.buttons.map((e, t) => /* @__PURE__ */ (0, W.jsx)(ni, {
					className: "chip",
					optics: f,
					style: {
						display: "flex",
						position: "relative"
					},
					children: /* @__PURE__ */ (0, W.jsxs)("button", {
						className: "chip-button",
						onClick: () => ee(e),
						children: [e.icon && /* @__PURE__ */ (0, W.jsx)(gi, { icon: e.icon }), /* @__PURE__ */ (0, W.jsx)("span", { children: e.name })]
					})
				}, `${e.service}:${e.name}:${t}`))
			}) : null
		]
	})] });
}
var Ci = pi({
	tagName: "liquid-glass-lock-card",
	component: Si,
	normalizeConfig: (e) => ({
		refraction: "auto",
		theme: "auto",
		...e
	}),
	getCardSize: () => 2,
	getConfigElement: async () => (await Wt(), document.createElement("liquid-glass-card-editor")),
	getStubConfig: (e, t, n) => ({ entity: tt(["lock"], e, t, n) })
}), wi, Ti = {
	OPEN: 1,
	CLOSE: 2,
	SET_POSITION: 4,
	STOP: 8,
	SET_TILT: 128
}, Ei = 180, Di = class extends an {
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
		return { entity: tt(["cover"], e, t, n, (e) => !!((e.attributes.supported_features ?? 0) & Ti.SET_POSITION)) };
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
		return et(this.entity, Ti.SET_POSITION);
	}
	get hasTilt() {
		return this.config.show_tilt !== !1 && et(this.entity, Ti.SET_TILT) && this.entity?.attributes.current_tilt_position !== void 0;
	}
	stateText() {
		let e = this.t, t = this.entity, n = this.position;
		return this.moving ? `${e(this.moving)} · ${n}% → ${this.moving === "opening" ? 100 : 0}%` : t.state === "closed" || n === 0 ? `${e("is_closed")} · ${e("last_change", { t: Ye(t.last_changed) })}` : `${e("position")} ${n}% · ${e("stopped")}`;
	}
	posFromEvent(e) {
		let t = this.shadowRoot?.querySelector(".track");
		if (!t) return this.position;
		let n = t.getBoundingClientRect(), r;
		return r = this.styleKind === "blind" ? (e.clientY - n.top) / n.height : this.curtainKind === "single" ? (e.clientX - n.left) / n.width : 2 * (this.dragSide === "right" ? n.right - e.clientX : e.clientX - n.left) / n.width, Math.round(R(1 - r, 0, 1) * 100);
	}
	renderTrackVisual(e) {
		let t = 1 - e / 100;
		if (this.styleKind === "blind") {
			let n = `${t * 100}%`;
			return P`<div class="fabric" style=${V({ height: n })}>
          ${[
				0,
				1,
				2,
				3,
				4
			].map(() => P`<span></span>`)}
        </div>
        ${e > 0 ? P`<div class="handle h" style=${V({ top: `max(4px, calc(${n} - 13px))` })}></div>` : F}`;
		}
		if (this.curtainKind === "single") return P`<div class="panel left" style=${V({ width: `${t * 100}%` })}>
          ${[
			0,
			1,
			2
		].map(() => P`<span></span>`)}
        </div>
        <div class="handle v" style=${V({ left: `calc(${t * 100}% - 13px)` })}></div>`;
		let n = `${t * 100 / 2}%`;
		return P`<div class="panel left" style=${V({ width: n })}>${[
			0,
			1,
			2
		].map(() => P`<span></span>`)}</div>
      <div class="panel right" style=${V({ width: n })}>${[
			0,
			1,
			2
		].map(() => P`<span></span>`)}</div>
      <div class="handle v" style=${V({ left: `calc(${n} - 13px)` })}></div>
      <div class="handle v" style=${V({ right: `calc(${n} - 13px)` })}></div>`;
	}
	buttonIcons() {
		return this.styleKind === "curtain" ? this.curtainKind === "double" ? ["mdi:arrow-expand-horizontal", "mdi:arrow-collapse-horizontal"] : ["mdi:chevron-double-left", "mdi:chevron-double-right"] : ["mdi:chevron-up", "mdi:chevron-down"];
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = this.t, n = this.position, r = n === 0 && !this.moving, i = this.moving, a = this.styleKind === "curtain", [o, s] = this.buttonIcons(), c = r ? void 0 : {
			from: "#8FE3F4",
			to: "var(--lg-cover-accent-deep)",
			glow: "rgba(43,179,208,0.24)"
		}, l = r ? void 0 : {
			color: "var(--lg-cover-badge)",
			bg: "rgba(43,179,208,0.18)",
			stroke: "rgba(43,179,208,0.3)"
		}, u = t(i ? "moving" : r ? "closed" : "open"), d = this.config.icon ?? e.attributes.icon ?? (a ? "mdi:curtains" : "mdi:blinds-horizontal"), f = i ? `${t(i)}…` : t(r ? "is_closed" : "is_open"), p = a && this.curtainKind === "single", m = r || !a && i === "opening" && n < 60, h = !a && i === "opening" && n < 60 && !r, g = this.tiltPreview ?? e.attributes.current_tilt_position ?? 50, _ = Math.round(g / 100 * 180 - 90);
		return P`${this.renderDefs()}
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
              class=${B({
			overlay: !0,
			center: a && !p,
			right: p,
			top: h
		})}
              style=${V(m ? {
			"--pv-color": "#0B3A46",
			"--pc-color": "rgba(11,58,70,0.7)"
		} : {})}
            >
              <span class="pv">${n}%</span>
              <span class="pc">${f}</span>
            </div>
          </div>
          <div class="buttons">
            <button class=${B({
			"round-btn": !0,
			active: i === "opening"
		})} @click=${() => this.callService("cover", "open_cover")} title="Open">
              <lg-icon .icon=${o}></lg-icon>
            </button>
            <button class=${B({
			"round-btn": !0,
			stop: !0,
			selected: !!i
		})} @click=${() => this.callService("cover", "stop_cover")} title="Stop">
              <lg-icon icon="mdi:square-outline"></lg-icon>
            </button>
            <button class=${B({
			"round-btn": !0,
			active: i === "closing"
		})} @click=${() => this.callService("cover", "close_cover")} title="Close">
              <lg-icon .icon=${s}></lg-icon>
            </button>
          </div>
        </div>

        ${this.hasTilt ? P`<div class="section tilt">
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
            </div>` : F}
      </div>`;
	}
};
wi = Di, wi.styles = [
	on,
	dn,
	h`
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
        height: var(--lg-track-h, ${Ei}px);
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
          --lg-track-h: clamp(120px, 47cqi, ${Ei}px);
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
], H([L()], Di.prototype, "dragPos", void 0), H([L()], Di.prototype, "tiltPreview", void 0), customElements.get("liquid-glass-cover-card") || customElements.define("liquid-glass-cover-card", Di);
//#endregion
//#region src/cards/media-card.ts
var Oi, G = {
	PAUSE: 1,
	SEEK: 2,
	VOLUME_SET: 4,
	PREVIOUS: 16,
	NEXT: 32,
	PLAY: 16384,
	SHUFFLE: 32768,
	REPEAT: 262144
};
function ki(e) {
	let t = Math.max(0, Math.round(e)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n ? `${n}:${String(r).padStart(2, "0")}:${String(i).padStart(2, "0")}` : `${r}:${String(i).padStart(2, "0")}`;
}
var Ai = class extends an {
	constructor(...e) {
		super(...e), this.tick = 0, this.playPause = () => {
			(this.playState !== "idle" || et(this.entity, G.PLAY)) && this.callService("media_player", "media_play_pause");
		};
	}
	static getStubConfig(e, t, n) {
		return { entity: tt(["media_player"], e, t, n) };
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
			pos: R(n, 0, t),
			duration: t
		};
	}
	render() {
		let e = this.entity;
		if (!e || $e(e)) return this.renderUnavailable();
		let t = e.attributes, n = this.t, r = this.playState, i = r === "idle", a = this.config.source_color ?? "#FF375F", o = i ? void 0 : t.entity_picture, s = i ? n("not_playing") : t.media_title ?? e.attributes.friendly_name ?? "", c = [t.media_artist, t.media_album_name].filter(Boolean), l = i ? n("standby") : c.join(" — ") || (t.source ?? ""), u = t.app_name ?? t.source, d = this.position(), f = this.seekPreview ?? (d ? d.pos / d.duration : 0), p = d ? this.seekPreview === void 0 ? d.pos : this.seekPreview * d.duration : 0, m = d ? d.duration - p : 0, h = this.volumePreview ?? t.volume_level ?? .5, g = !!t.shuffle, _ = t.repeat ?? "off", v = et(e, G.SEEK) && !!d && !i, y = this.config.show_volume !== !1 && et(e, G.VOLUME_SET), b = this.config.show_device !== !1;
		return P`${this.renderDefs()}
      <div class="glass card" style=${V({ "--source-color": a })}>
        ${b ? P`<div class="device" @click=${this.openMoreInfo}><lg-icon icon="mdi:speaker"></lg-icon><span>${this.entityName}</span></div>` : F}

        <div class="header">
          <div class=${B({
			art: !0,
			idle: !o
		})} style=${o ? V({ backgroundImage: `url("${o}")` }) : F} @click=${this.openMoreInfo}>
            ${o ? F : P`<lg-icon icon="mdi:music"></lg-icon>`}
          </div>
          <div class="title" @click=${this.openMoreInfo}>
            <div class="name">${s}</div>
            <div class="state">${l}</div>
            ${r === "paused" ? P`<div class="source muted-text"><lg-icon icon="mdi:pause"></lg-icon><span>${n("paused")}</span></div>` : !i && u ? P`<div class="source"><lg-icon icon="mdi:waveform"></lg-icon><span>${u}</span></div>` : F}
          </div>
          <button class="more" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:dots-horizontal"></lg-icon></button>
        </div>

        <div class=${B({
			progress: !0,
			dim: i
		})}>
          <lg-slider
            variant="thin"
            .value=${i ? .003 : f}
            min="0"
            max="1"
            .disabled=${!v}
            @lg-input=${(e) => this.seekPreview = e.detail.value}
            @lg-change=${(e) => {
			this.seekPreview = void 0, d && this.callService("media_player", "media_seek", { seek_position: Math.round(e.detail.value * d.duration) });
		}}
          ></lg-slider>
          <div class="times"><span>${d ? ki(p) : "0:00"}</span><span>−${d ? ki(m) : "0:00"}</span></div>
        </div>

        <div class="transport">
          <button class=${B({
			aux: !0,
			on: g,
			fade: i
		})} ?disabled=${!et(e, G.SHUFFLE)} @click=${() => this.callService("media_player", "shuffle_set", { shuffle: !g })} title="Shuffle">
            <lg-icon icon="mdi:shuffle-variant"></lg-icon>
          </button>
          <button class=${B({
			skip: !0,
			fade: i
		})} ?disabled=${!et(e, G.PREVIOUS)} @click=${() => this.callService("media_player", "media_previous_track")} title="Previous">
            <lg-icon icon="mdi:skip-previous-outline"></lg-icon>
          </button>
          <button class=${B({ play: !0 })} @click=${this.playPause} title="Play / Pause" style=${i ? "color: var(--lg-text-secondary)" : ""}>
            ${this.renderControlSurface()}
            <lg-icon .icon=${r === "playing" ? "mdi:pause" : "mdi:play-outline"}></lg-icon>
          </button>
          <button class=${B({
			skip: !0,
			fade: i
		})} ?disabled=${!et(e, G.NEXT)} @click=${() => this.callService("media_player", "media_next_track")} title="Next">
            <lg-icon icon="mdi:skip-next-outline"></lg-icon>
          </button>
          <button class=${B({
			aux: !0,
			on: _ !== "off",
			fade: i
		})} ?disabled=${!et(e, G.REPEAT)} @click=${() => this.callService("media_player", "repeat_set", { repeat: _ === "off" ? "all" : _ === "all" ? "one" : "off" })} title="Repeat">
            <lg-icon .icon=${_ === "one" ? "mdi:repeat-once" : "mdi:repeat"}></lg-icon>
          </button>
        </div>

        ${y ? P`<div class=${B({
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
            </div>` : F}
      </div>`;
	}
};
Oi = Ai, Oi.styles = [
	on,
	dn,
	h`
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
], H([L()], Ai.prototype, "tick", void 0), H([L()], Ai.prototype, "seekPreview", void 0), H([L()], Ai.prototype, "volumePreview", void 0), customElements.get("liquid-glass-media-card") || customElements.define("liquid-glass-media-card", Ai);
//#endregion
//#region src/cards/weather-card.ts
var ji, Mi = {
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
}, Ni = {
	icon: "mdi:weather-cloudy",
	color: "#A0AEC0"
}, Pi = 9e5, Fi = class extends an {
	constructor(...e) {
		super(...e), this.daily = [], this.hourly = [], this.lastFetch = 0, this.fetchedFor = "";
	}
	static getStubConfig(e, t, n) {
		return { entity: tt(["weather"], e, t, n) };
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
		super.connectedCallback(), this.timer = window.setInterval(() => this.maybeFetch(!0), Pi);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.timer && window.clearInterval(this.timer);
	}
	updated() {
		this.maybeFetch(!1);
	}
	maybeFetch(e) {
		if (!this.hass || !this.config?.entity) return;
		let t = Date.now() - this.lastFetch > Pi;
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
		let t = Mi[e ?? ""] ?? Ni;
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
		return e === void 0 ? "–" : `${z(this.hass, e, 0)}°`;
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
		return P`<div class="current">
      <div class="now" @click=${this.openMoreInfo}>
        <div class="city">${this.entityName}</div>
        <div class="condition">${this.conditionLabel(e.state)}</div>
        <div class="temp-row">
          <span class="temp">${z(this.hass, t.temperature ?? 0, 0)}</span><span class="deg">°</span>
        </div>
        ${i !== void 0 || a !== void 0 ? P`<div class="hilo">
              ${i === void 0 ? F : P`<span class="hi">${this.t("wx_high")} ${this.temp(i)}</span>`}
              ${a === void 0 ? F : P`<span class="lo">${this.t("wx_low")} ${this.temp(a)}</span>`}
            </div>` : F}
      </div>
      <div class="big-icon" style=${V({
			"--wx-color": n.color,
			"--wx-glow": st(n.color, .4)
		})}>
        <lg-icon .icon=${this.config.icon ?? n.icon}></lg-icon>
      </div>
    </div>`;
	}
	renderHourly() {
		let e = R(this.config.hourly_count ?? 6, 2, 12), t = this.hourly.slice(0, e);
		return t.length ? P`<div class="hourly">
      ${t.map((e, t) => {
			let n = this.look(e.condition);
			return P`<div class=${B({
				hour: !0,
				now: t === 0
			})} style=${V({ "--wx-color": n.color })}>
          <span class="time">${this.hourLabel(e.datetime, t)}</span>
          <lg-icon .icon=${n.icon}></lg-icon>
          <span class="t">${this.temp(e.temperature)}</span>
        </div>`;
		})}
    </div>` : F;
	}
	renderDaily() {
		let e = R(this.config.daily_count ?? 4, 1, 10), t = this.daily.slice(0, e);
		if (!t.length) return F;
		let n = t.map((e) => e.templow ?? e.temperature).filter((e) => e !== void 0), r = t.map((e) => e.temperature).filter((e) => e !== void 0), i = Math.min(...n, ...r), a = Math.max(...n, ...r) - i || 1;
		return P`<div class="daily">
      ${t.map((e, t) => {
			let n = this.look(e.condition), r = e.templow ?? e.temperature, o = e.temperature, s = r === void 0 ? 0 : (r - i) / a * 100, c = r === void 0 || o === void 0 ? 100 : Math.max((o - r) / a * 100, 6);
			return P`<div class=${B({
				day: !0,
				today: t === 0
			})} style=${V({ "--wx-color": n.color })}>
          <span class="label">${this.dayLabel(e.datetime, t)}</span>
          <lg-icon .icon=${n.icon}></lg-icon>
          <span class="lo">${this.temp(r)}</span>
          <div class="bar"><span style=${V({
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
				`${z(this.hass, n, 0)}%`
			],
			r === void 0 ? void 0 : [
				"mdi:weather-windy",
				t("wx_wind"),
				`${z(this.hass, r, 1)} ${i}`.trim()
			],
			a === void 0 ? o === void 0 ? void 0 : [
				"mdi:weather-rainy",
				t("wx_precip"),
				`${z(this.hass, o, 1)} mm`
			] : [
				"mdi:weather-rainy",
				t("wx_precip"),
				`${z(this.hass, a, 0)}%`
			]
		].filter((e) => e !== void 0);
		return s.length ? P`<div class="metrics">
      ${s.map(([e, t, n]) => P`<div class="metric">
          <div class="head"><lg-icon .icon=${e}></lg-icon><span>${t}</span></div>
          <div class="v">${n}</div>
        </div>`)}
    </div>` : F;
	}
	renderRow() {
		let e = this.entity, t = e.attributes, n = this.look(e.state), r = this.daily[0], i = [this.conditionLabel(e.state)];
		return r?.temperature !== void 0 && i.push(`${this.t("wx_high")} ${this.temp(r.temperature)}`), r?.templow !== void 0 && i.push(`${this.t("wx_low")} ${this.temp(r.templow)}`), P`${this.renderDefs()}
      <div class="glass card row">
        <div class="big-icon" style=${V({
			"--wx-color": n.color,
			"--wx-glow": st(n.color, .4)
		})}>
          <lg-icon .icon=${this.config.icon ?? n.icon}></lg-icon>
        </div>
        <div class="title" @click=${this.openMoreInfo}>
          <div class="name">${this.entityName}</div>
          <div class="state">${i.filter(Boolean).join(" · ")}</div>
        </div>
        <div class="temp-row">
          <span class="temp">${z(this.hass, t.temperature ?? 0, 0)}</span><span class="deg">°</span>
        </div>
      </div>`;
	}
	render() {
		let e = this.entity;
		return !e || $e(e) ? this.renderUnavailable() : this.isRow ? this.renderRow() : P`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCurrent()}
        ${this.config.show_hourly === !1 ? F : this.renderHourly()}
        ${this.config.show_daily === !1 ? F : this.renderDaily()}
        ${this.config.show_metrics === !1 ? F : this.renderMetrics()}
      </div>`;
	}
};
ji = Fi, ji.styles = [
	on,
	dn,
	h`
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
], H([L()], Fi.prototype, "daily", void 0), H([L()], Fi.prototype, "hourly", void 0), customElements.get("liquid-glass-weather-card") || customElements.define("liquid-glass-weather-card", Fi);
//#endregion
//#region src/cards/scene-card.ts
var Ii, Li = 900, Ri = class extends an {
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
		return R(Math.round(this.config.columns ?? 3), 1, 6);
	}
	label(e) {
		return e.name ? e.name : Qe(e.entity ? this.hass?.states[e.entity] : void 0, e.entity ?? "");
	}
	iconFor(e) {
		return e.icon ? e.icon : (e.entity ? this.hass?.states[e.entity] : void 0)?.attributes.icon || (wn[e.entity?.split(".")[0] ?? ""]?.icon ?? "mdi:palette");
	}
	wellFor(e, t) {
		return Cn(e.accent, Sn[t % Sn.length]);
	}
	activate(e, t) {
		let n = e.entity?.split(".")[0] ?? "", r = e.service ?? wn[n]?.service;
		if (r) {
			let [t, n] = r.split(".");
			this.hass?.callService(t, n, {
				...e.entity ? { entity_id: e.entity } : {},
				...e.service_data ?? {}
			});
		}
		this.pressed = t, window.clearTimeout(this.pressTimer), this.pressTimer = window.setTimeout(() => this.pressed = void 0, Li);
	}
	renderTile(e, t) {
		let n = this.wellFor(e, t);
		return P`<button
      class=${B({
			tile: !0,
			on: this.pressed === t
		})}
      style=${V({
			"--from": n.from,
			"--to": n.to,
			"--glow": n.glow,
			"--glow-strong": st(n.to, .6)
		})}
      @click=${() => this.activate(e, t)}
    >
      <span class="well"><lg-icon .icon=${this.iconFor(e)}></lg-icon></span>
      <span class="label">${this.label(e)}</span>
    </button>`;
	}
	renderChip(e, t) {
		return P`<button class=${B({
			chip: !0,
			on: this.pressed === t
		})} @click=${() => this.activate(e, t)}>
      ${this.renderControlSurface(void 0, "pill")}
      ${e.icon ? P`<lg-icon .icon=${e.icon}></lg-icon>` : F}<span>${this.label(e)}</span>
    </button>`;
	}
	render() {
		let e = this.items;
		if (!e.length) return this.renderUnavailable();
		let t = this.config.style === "chips", n = this.config.title;
		return P`${this.renderDefs()}
      <div class=${B({
			glass: !0,
			card: !0,
			chips: t
		})}>
        ${n || this.config.show_count ? P`<div class="head">
              <span class="heading">${n ?? ""}</span>
              ${this.config.show_count ? P`<span class="count">${this.t("scene_count", { n: e.length })}</span>` : F}
            </div>` : F}
        <div class="grid" style=${V({ "--cols": String(this.columns) })}>
          ${e.map((e, n) => t ? this.renderChip(e, n) : this.renderTile(e, n))}
        </div>
      </div>`;
	}
};
Ii = Ri, Ii.styles = [
	on,
	dn,
	h`
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
], H([L()], Ri.prototype, "pressed", void 0), customElements.get("liquid-glass-scene-card") || customElements.define("liquid-glass-scene-card", Ri);
//#endregion
//#region src/cards/camera-card.ts
var zi, Bi = 10, Vi = class extends an {
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
		return { entity: tt(["camera"], e, t, n) };
	}
	getCardSize() {
		return this.config?.show_actions === !1 ? 4 : 5;
	}
	connectedCallback() {
		super.connectedCallback();
		let e = Math.max(this.config?.refresh_interval ?? Bi, 1);
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
		if (!e) return F;
		let t = this.hass?.states[e];
		if (!t) return F;
		let n = this.t, r = t.state === "on", i = r ? {
			"--chip-bg": "rgba(255, 159, 10, 0.18)",
			"--chip-stroke": "rgba(255, 159, 10, 0.3)",
			"--chip-label": "var(--lg-motion-label)",
			"--chip-dot": "#E08600",
			"--chip-glow": "#FF9F0A"
		} : {}, a = r ? `${n("cam_motion")} · ${Je(t.last_changed, n)}` : n("cam_no_motion");
		return P`<div class="motion" style=${V(i)}><span class="dot"></span><span>${a}</span></div>`;
	}
	render() {
		let e = this.entity;
		if (!e) return this.renderUnavailable();
		let t = this.t, n = $e(e), r = n ? void 0 : this.stillUrl;
		return P`${this.renderDefs()}
      <div
        class=${B({
			glass: !0,
			card: !0,
			offline: n
		})}
        style=${V({ "--lg-cam-ratio": String(this.config.aspect_ratio ?? 16 / 9) })}
      >
        <div class="feed" style=${r ? V({ backgroundImage: `url("${r}")` }) : F}>
          <div class="scrim"></div>

          <div class="bar top">
            ${n ? P`<span></span>` : P`<span
                  class="live float"
                  style=${V(this.streaming ? {
			"--dot": "#FF453A",
			"--dot-glow": "#FF453A"
		} : { "--dot": "#8E8E93" })}
                  >${this.renderControlSurface(["#15151b", "#34343e"], "pill")}<span class="dot"></span><span class="live-label">${t(this.streaming ? "cam_live" : "cam_still")}</span></span
                >`}
            <div class=${B({
			trail: !0,
			dimmed: n
		})}>
              ${this.config.show_mic ? P`<button class="round float" @click=${this.callMic} title=${t("cam_mic")}>
                    ${this.renderControlSurface(["#15151b", "#34343e"])}
                    <lg-icon icon="mdi:microphone-off"></lg-icon>
                  </button>` : F}
              <button class="round float" @click=${this.openMoreInfo} title=${t("cam_expand")}>
                ${this.renderControlSurface(["#15151b", "#34343e"])}
                <lg-icon icon="mdi:arrow-expand"></lg-icon>
              </button>
            </div>
          </div>

          ${n ? P`<div class="nosignal">
                <lg-icon icon="mdi:video-off"></lg-icon><span>${t("cam_no_signal")}</span>
              </div>` : F}

          <div class="bar bottom">
            <div class="name" @click=${this.openMoreInfo}>
              <span class="who">${this.entityName}</span>
              <span class="when">${n ? t("cam_offline_state") : Je(e.last_updated, t)}</span>
            </div>
            <button class=${B({
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

        ${this.config.show_actions === !1 ? F : P`<div class="actions">
              ${n ? P`<div
                    class="motion"
                    style=${V({
			"--chip-bg": "rgba(255, 69, 58, 0.18)",
			"--chip-stroke": "rgba(255, 69, 58, 0.3)",
			"--chip-label": "#FF453A",
			"--chip-dot": "#FF453A"
		})}
                  >
                    <span class="dot"></span><span>${t("cam_offline")}</span>
                  </div>` : this.renderMotion()}
              <div class="spacer"></div>
              <button class=${B({
			history: !0,
			dimmed: n
		})} @click=${this.openMoreInfo}>
                <lg-icon icon="mdi:bell-outline"></lg-icon><span>${t("cam_history")}</span>
              </button>
            </div>`}
      </div>`;
	}
};
zi = Vi, zi.styles = [
	on,
	dn,
	h`
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
], H([L()], Vi.prototype, "tick", void 0), customElements.get("liquid-glass-camera-card") || customElements.define("liquid-glass-camera-card", Vi);
//#endregion
//#region src/cards/group-card.ts
var Hi, Ui = {
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
}, Wi = {
	door: ["open", "closed"],
	garage_door: ["open", "closed"],
	window: ["open", "closed"],
	opening: ["open", "closed"],
	motion: ["detected", "clear"],
	occupancy: ["detected", "clear"],
	presence: ["detected", "clear"]
}, Gi = {
	door: ["mdi:door-open", "mdi:door-closed"],
	garage_door: ["mdi:garage-open", "mdi:garage"],
	window: ["mdi:window-open", "mdi:window-closed"],
	opening: ["mdi:square-outline", "mdi:square"],
	motion: ["mdi:motion-sensor", "mdi:motion-sensor-off"],
	occupancy: ["mdi:home-account", "mdi:home-outline"],
	presence: ["mdi:account", "mdi:account-outline"],
	moisture: ["mdi:water-alert", "mdi:water-off"],
	smoke: ["mdi:smoke-detector-alert", "mdi:smoke-detector"]
}, Ki = [
	["light", "custom:liquid-glass-light-card"],
	["switch", "custom:liquid-glass-switch-card"],
	["sensor", "custom:liquid-glass-sensor-card"]
], qi = class extends an {
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
		return { cards: Ki.flatMap(([e, t]) => {
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
					return n ? n.createCardElement(e) : Ji(e);
				} catch {
					return Ji(e);
				}
			});
			for (let e of this.elements) e.hass = this.hass;
			this.revision++;
		}
	}
	summaryFor(e) {
		let t = typeof e.entity == "string" ? e.entity : void 0;
		if (!t) return;
		let n = this.hass?.states[t], r = t.split(".", 1)[0], i = e.icon ?? n?.attributes.icon ?? Yi(n, r);
		return $e(n) ? {
			icon: i,
			label: this.t("unavailable"),
			tone: "off"
		} : {
			icon: i,
			...Xi(n, r, this.t)
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
		return P`<div class="panel">
      <div class=${B({
			head: !0,
			tappable: this.collapsible
		})} @click=${this.toggle}>
        ${this.renderIconWell(this.config.icon ?? "mdi:view-grid-outline", void 0, null)}
        <div class="text">
          <div class="heading">${this.config.title ?? this.t("grp_title")}</div>
          <div class="sub">${this.subtitle(e)}</div>
        </div>
        ${this.collapsible ? P`<button class=${B({
			chevron: !0,
			closed: !this.open
		})} aria-expanded=${this.open}>
              <lg-icon icon="mdi:chevron-up"></lg-icon>
            </button>` : F}
      </div>
      ${t ? P`<div class="summary">
            ${e.map((e) => P`<div class=${B({
			sum: !0,
			[e.tone]: !0
		})}><lg-icon .icon=${e.icon}></lg-icon><span>${e.label}</span></div>`)}
          </div>` : F}
      ${this.open ? this.cardConfigs.length ? P`<div class="cards">${this.revision >= 0 ? this.elements : F}</div>` : P`<div class="empty">${this.t("grp_empty")}</div>` : F}
    </div>`;
	}
};
Hi = qi, Hi.styles = [
	on,
	dn,
	h`
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
], H([L()], qi.prototype, "open", void 0), H([L()], qi.prototype, "revision", void 0);
function Ji(e) {
	let t = String(e.type ?? ""), n = t.startsWith("custom:") ? t.slice(7) : `hui-${t}-card`, r = document.createElement(n), i = () => {
		try {
			r.setConfig?.(e);
		} catch {}
	};
	return typeof r.setConfig == "function" ? i() : customElements.whenDefined(n).then(i), r;
}
function Yi(e, t) {
	if (t === "binary_sensor") {
		let t = Gi[e?.attributes.device_class ?? ""];
		if (t) return e?.state === "on" ? t[0] : t[1];
	}
	return Ui[t] ?? "mdi:card-outline";
}
function Xi(e, t, n) {
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
			let t = e.attributes.device_class, r = (t && Wi[t]) ?? ["on", "off"];
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
customElements.get("liquid-glass-group-card") || customElements.define("liquid-glass-group-card", qi);
//#endregion
//#region src/cards/separator-card.tsx
var Zi = `${on.cssText}
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
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
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
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
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
function Qi({ config: e, hass: t, host: n }) {
	let { refraction: r } = _i(n, e, t), i = qe(e.language ?? t?.locale?.language ?? t?.language), a = e.title ?? e.name ?? i("sep_title"), o = e.icon ?? "mdi:lightbulb-outline", s = e.count !== void 0 && e.count !== null && e.count !== "", c = hi(r), l;
	switch (e.style) {
		case "plain":
			l = /* @__PURE__ */ (0, W.jsxs)("div", {
				className: "separator plain",
				children: [
					/* @__PURE__ */ (0, W.jsx)(gi, { icon: o }),
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "plain-title",
						children: a
					}),
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "line",
						"aria-hidden": "true"
					}),
					s && /* @__PURE__ */ (0, W.jsx)("span", {
						className: "plain-count",
						children: e.count
					})
				]
			});
			break;
		case "header":
			l = /* @__PURE__ */ (0, W.jsxs)("div", {
				className: "separator header-row",
				children: [
					/* @__PURE__ */ (0, W.jsx)(ni, {
						className: "header-well",
						optics: c,
						style: { display: "grid" },
						children: /* @__PURE__ */ (0, W.jsx)(gi, { icon: o })
					}),
					/* @__PURE__ */ (0, W.jsxs)("span", {
						className: "header-text",
						children: [/* @__PURE__ */ (0, W.jsx)("span", {
							className: "header-title",
							children: a
						}), e.subtitle && /* @__PURE__ */ (0, W.jsx)("span", {
							className: "header-subtitle",
							children: e.subtitle
						})]
					}),
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "chevron",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, W.jsx)(gi, { icon: "mdi:chevron-up" })
					})
				]
			});
			break;
		default: l = /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "separator pill-row",
			children: [/* @__PURE__ */ (0, W.jsxs)(ni, {
				className: "pill",
				optics: c,
				style: { display: "flex" },
				children: [
					/* @__PURE__ */ (0, W.jsx)(gi, { icon: o }),
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "pill-title",
						children: a
					}),
					s && /* @__PURE__ */ (0, W.jsx)("span", {
						className: "pill-count",
						children: e.count
					})
				]
			}), /* @__PURE__ */ (0, W.jsx)("span", {
				className: "line",
				"aria-hidden": "true"
			})]
		});
	}
	return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("style", { children: Zi }), l] });
}
var $i = pi({
	tagName: "liquid-glass-separator-card",
	component: Qi,
	normalizeConfig: (e) => ({
		refraction: "auto",
		theme: "auto",
		...e
	}),
	getCardSize: () => 1,
	getConfigElement: async () => (await Wt(), document.createElement("liquid-glass-card-editor")),
	getStubConfig: () => ({
		title: "Section",
		icon: "mdi:lightbulb-outline",
		style: "pill"
	})
}), ea = "0.6.0", ta = "2026-09-04 13:31", na = "https://github.com/cos-overclock/ha-liquid-glass", ra = (e, t) => !!((e.attributes.supported_features ?? 0) & t);
function ia(e, t, n, r, i, a = (e) => ({ entity: e })) {
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
var aa = [
	"scene",
	"script",
	"automation",
	"button",
	"input_button"
], oa = [
	"switch",
	"input_boolean",
	"fan",
	"light",
	"automation",
	"humidifier",
	"siren",
	"remote"
], sa = [
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
], ca = 1, la = 4, ua = 4, da = [
	ia("liquid-glass-light-card", "Liquid Glass Light", "Brightness, color temperature, color and presets", ["light"]),
	ia("liquid-glass-climate-card", "Liquid Glass Climate", "Thermostat dial with modes and fan / preset", ["climate"], (e) => ra(e, 3)),
	ia("liquid-glass-switch-card", "Liquid Glass Switch", "Single row toggle", oa),
	ia("liquid-glass-sensor-card", "Liquid Glass Sensor", "Value, trend and 24h sparkline", ["sensor"]),
	ia("liquid-glass-binary-sensor-card", "Liquid Glass Binary Sensor", "Door / motion / window status row", ["binary_sensor"]),
	ia("liquid-glass-lock-card", "Liquid Glass Lock", "Slide to lock / unlock", ["lock"]),
	ia("liquid-glass-cover-card", "Liquid Glass Cover", "Blinds and curtains with position and tilt", ["cover"], (e) => ra(e, 7)),
	ia("liquid-glass-media-card", "Liquid Glass Media", "Now playing with transport and volume", ["media_player"]),
	ia("liquid-glass-slider-card", "Liquid Glass Slider", "Any numeric value as a draggable track", sa, (e) => {
		switch (e.entity_id.split(".", 1)[0]) {
			case "input_number":
			case "number": return !0;
			case "fan": return ra(e, ca);
			case "light": return (e.attributes.supported_color_modes ?? []).some((e) => e !== "onoff");
			case "media_player": return ra(e, ua);
			case "cover":
			case "valve": return ra(e, la);
			case "humidifier": return "humidity" in e.attributes;
			case "water_heater":
			case "climate": return ra(e, ca);
			default: return !1;
		}
	}),
	ia("liquid-glass-weather-card", "Liquid Glass Weather", "Current conditions with hourly and daily forecast", ["weather"]),
	ia("liquid-glass-button-card", "Liquid Glass Button", "Run a scene, script, automation or button", aa),
	ia("liquid-glass-scene-card", "Liquid Glass Scenes", "A grid of scene tiles or a row of chips", aa, void 0, (e) => ({ scenes: [{ entity: e }] })),
	ia("liquid-glass-camera-card", "Liquid Glass Camera", "Camera still with motion and history", ["camera"]),
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
for (let e of da) {
	let t = {
		...e,
		preview: !0,
		documentationURL: na
	}, n = window.customCards.find((t) => t.type === e.type);
	n ? Object.assign(n, t) : window.customCards.push(t);
}
console.info(`%c LIQUID-GLASS-CARDS %c v${ea} · ${da.length} cards · built ${ta} `, "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;", "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");
//#endregion
export { dr as LiquidGlassBinarySensorCard, En as LiquidGlassButtonCard, Vi as LiquidGlassCameraCard, er as LiquidGlassClimateCard, Di as LiquidGlassCoverCard, qi as LiquidGlassGroupCard, mn as LiquidGlassLightCard, Ci as LiquidGlassLockCard, Ai as LiquidGlassMediaCard, Ri as LiquidGlassSceneCard, lr as LiquidGlassSensorCard, $i as LiquidGlassSeparatorCard, yn as LiquidGlassSliderCard, ir as LiquidGlassSwitchCard, Fi as LiquidGlassWeatherCard, pi as defineReactCard };
