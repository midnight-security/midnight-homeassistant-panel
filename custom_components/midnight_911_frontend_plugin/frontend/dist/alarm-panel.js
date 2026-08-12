var e = function (t, a) {
  return e = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
  }, e(t, a);
};
function t(t, a) {
  if ("function" != typeof a && null !== a) throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
  function s() {
    this.constructor = t;
  }
  e(t, a), t.prototype = null === a ? Object.create(a) : (s.prototype = a.prototype, new s());
}
var a = function () {
  return a = Object.assign || function (e) {
    for (var t, a = 1, s = arguments.length; a < s; a++) for (var i in t = arguments[a]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e;
  }, a.apply(this, arguments);
};
function s(e, t) {
  var a = {};
  for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && t.indexOf(s) < 0 && (a[s] = e[s]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (s = Object.getOwnPropertySymbols(e); i < s.length; i++) t.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, s[i]) && (a[s[i]] = e[s[i]]);
  }
  return a;
}
function i(e, t, a, s) {
  var i,
    r = arguments.length,
    o = r < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, a) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, a, s);else for (var n = e.length - 1; n >= 0; n--) (i = e[n]) && (o = (r < 3 ? i(o) : r > 3 ? i(t, a, o) : i(t, a)) || o);
  return r > 3 && o && Object.defineProperty(t, a, o), o;
}
function r(e, t, a) {
  if (a || 2 === arguments.length) for (var s, i = 0, r = t.length; i < r; i++) !s && i in t || (s || (s = Array.prototype.slice.call(t, 0, i)), s[i] = t[i]);
  return e.concat(s || Array.prototype.slice.call(t));
}
"function" == typeof SuppressedError && SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = globalThis,
  n = o.ShadowRoot && (void 0 === o.ShadyCSS || o.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  l = Symbol(),
  h = new WeakMap();
let c = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== l) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (n && void 0 === e) {
      const a = void 0 !== t && 1 === t.length;
      a && (e = h.get(t)), void 0 === e && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && h.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const d = (e, ...t) => {
    const a = 1 === e.length ? e[0] : t.reduce((t, a, s) => t + (e => {
      if (!0 === e._$cssResult$) return e.cssText;
      if ("number" == typeof e) return e;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(a) + e[s + 1], e[0]);
    return new c(a, e, l);
  },
  p = n ? e => e : e => e instanceof CSSStyleSheet ? (e => {
    let t = "";
    for (const a of e.cssRules) t += a.cssText;
    return (e => new c("string" == typeof e ? e : e + "", void 0, l))(t);
  })(e) : e,
  {
    is: u,
    defineProperty: g,
    getOwnPropertyDescriptor: m,
    getOwnPropertyNames: v,
    getOwnPropertySymbols: b,
    getPrototypeOf: f
  } = Object,
  _ = globalThis,
  y = _.trustedTypes,
  w = y ? y.emptyScript : "",
  $ = _.reactiveElementPolyfillSupport,
  A = (e, t) => e,
  E = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? w : null;
          break;
        case Object:
        case Array:
          e = null == e ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let a = e;
      switch (t) {
        case Boolean:
          a = null !== e;
          break;
        case Number:
          a = null === e ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            a = JSON.parse(e);
          } catch (e) {
            a = null;
          }
      }
      return a;
    }
  },
  x = (e, t) => !u(e, t),
  C = {
    attribute: !0,
    type: String,
    converter: E,
    reflect: !1,
    useDefault: !1,
    hasChanged: x
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
Symbol.metadata ??= Symbol("metadata"), _.litPropertyMetadata ??= new WeakMap();
let H = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = C) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(),
        s = this.getPropertyDescriptor(e, a, t);
      void 0 !== s && g(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const {
      get: s,
      set: i
    } = m(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(e) {
        this[t] = e;
      }
    };
    return {
      get: s,
      set(t) {
        const r = s?.call(this);
        i?.call(this, t), this.requestUpdate(e, r, a);
      },
      configurable: !0,
      enumerable: !0
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? C;
  }
  static _$Ei() {
    if (this.hasOwnProperty(A("elementProperties"))) return;
    const e = f(this);
    e.finalize(), void 0 !== e.l && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(A("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(A("properties"))) {
      const e = this.properties,
        t = [...v(e), ...b(e)];
      for (const a of t) this.createProperty(a, e[a]);
    }
    const e = this[Symbol.metadata];
    if (null !== e) {
      const t = litPropertyMetadata.get(e);
      if (void 0 !== t) for (const [e, a] of t) this.elementProperties.set(e, a);
    }
    this._$Eh = new Map();
    for (const [e, t] of this.elementProperties) {
      const a = this._$Eu(e, t);
      void 0 !== a && this._$Eh.set(a, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const e of a) t.unshift(p(e));
    } else void 0 !== e && t.push(p(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return !1 === a ? void 0 : "string" == typeof a ? a : "string" == typeof e ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(e => this.enableUpdating = e), this._$AL = new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(e => e(this));
  }
  addController(e) {
    (this._$EO ??= new Set()).add(e), void 0 !== this.renderRoot && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = new Map(),
      t = this.constructor.elementProperties;
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ((e, t) => {
      if (n) e.adoptedStyleSheets = t.map(e => e instanceof CSSStyleSheet ? e : e.styleSheet);else for (const a of t) {
        const t = document.createElement("style"),
          s = o.litNonce;
        void 0 !== s && t.setAttribute("nonce", s), t.textContent = a.cssText, e.appendChild(t);
      }
    })(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(e => e.hostConnected?.());
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    this._$EO?.forEach(e => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    const a = this.constructor.elementProperties.get(e),
      s = this.constructor._$Eu(e, a);
    if (void 0 !== s && !0 === a.reflect) {
      const i = (void 0 !== a.converter?.toAttribute ? a.converter : E).toAttribute(t, a.type);
      this._$Em = e, null == i ? this.removeAttribute(s) : this.setAttribute(s, i), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const a = this.constructor,
      s = a._$Eh.get(e);
    if (void 0 !== s && this._$Em !== s) {
      const e = a.getPropertyOptions(s),
        i = "function" == typeof e.converter ? {
          fromAttribute: e.converter
        } : void 0 !== e.converter?.fromAttribute ? e.converter : E;
      this._$Em = s;
      const r = i.fromAttribute(t, e.type);
      this[s] = r ?? this._$Ej?.get(s) ?? r, this._$Em = null;
    }
  }
  requestUpdate(e, t, a, s = !1, i) {
    if (void 0 !== e) {
      const r = this.constructor;
      if (!1 === s && (i = this[e]), a ??= r.getPropertyOptions(e), !((a.hasChanged ?? x)(i, t) || a.useDefault && a.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(e, t, {
    useDefault: a,
    reflect: s,
    wrapped: i
  }, r) {
    a && !(this._$Ej ??= new Map()).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), !0 !== i || void 0 !== r) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), !0 === s && this._$Em !== e && (this._$Eq ??= new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const e = this.scheduleUpdate();
    return null != e && (await e), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [e, t] of this._$Ep) this[e] = t;
        this._$Ep = void 0;
      }
      const e = this.constructor.elementProperties;
      if (e.size > 0) for (const [t, a] of e) {
        const {
            wrapped: e
          } = a,
          s = this[t];
        !0 !== e || this._$AL.has(t) || void 0 === s || this.C(t, void 0, a, s);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(e => e.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (t) {
      throw e = !1, this._$EM(), t;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {}
  _$AE(e) {
    this._$EO?.forEach(e => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = new Map(), this.isUpdatePending = !1;
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
    this._$Eq &&= this._$Eq.forEach(e => this._$ET(e, this[e])), this._$EM();
  }
  updated(e) {}
  firstUpdated(e) {}
};
H.elementStyles = [], H.shadowRootOptions = {
  mode: "open"
}, H[A("elementProperties")] = new Map(), H[A("finalized")] = new Map(), $?.({
  ReactiveElement: H
}), (_.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = globalThis,
  O = e => e,
  L = S.trustedTypes,
  T = L ? L.createPolicy("lit-html", {
    createHTML: e => e
  }) : void 0,
  k = "$lit$",
  M = `lit$${Math.random().toFixed(9).slice(2)}$`,
  B = "?" + M,
  P = `<${B}>`,
  N = document,
  j = () => N.createComment(""),
  D = e => null === e || "object" != typeof e && "function" != typeof e,
  R = Array.isArray,
  I = "[ \t\n\f\r]",
  V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  U = /-->/g,
  G = />/g,
  F = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"),
  z = /'/g,
  W = /"/g,
  Z = /^(?:script|style|textarea|title)$/i,
  q = (e => (t, ...a) => ({
    _$litType$: e,
    strings: t,
    values: a
  }))(1),
  X = Symbol.for("lit-noChange"),
  K = Symbol.for("lit-nothing"),
  Y = new WeakMap(),
  Q = N.createTreeWalker(N, 129);
function J(e, t) {
  if (!R(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== T ? T.createHTML(t) : t;
}
const ee = (e, t) => {
  const a = e.length - 1,
    s = [];
  let i,
    r = 2 === t ? "<svg>" : 3 === t ? "<math>" : "",
    o = V;
  for (let t = 0; t < a; t++) {
    const a = e[t];
    let n,
      l,
      h = -1,
      c = 0;
    for (; c < a.length && (o.lastIndex = c, l = o.exec(a), null !== l);) c = o.lastIndex, o === V ? "!--" === l[1] ? o = U : void 0 !== l[1] ? o = G : void 0 !== l[2] ? (Z.test(l[2]) && (i = RegExp("</" + l[2], "g")), o = F) : void 0 !== l[3] && (o = F) : o === F ? ">" === l[0] ? (o = i ?? V, h = -1) : void 0 === l[1] ? h = -2 : (h = o.lastIndex - l[2].length, n = l[1], o = void 0 === l[3] ? F : '"' === l[3] ? W : z) : o === W || o === z ? o = F : o === U || o === G ? o = V : (o = F, i = void 0);
    const d = o === F && e[t + 1].startsWith("/>") ? " " : "";
    r += o === V ? a + P : h >= 0 ? (s.push(n), a.slice(0, h) + k + a.slice(h) + M + d) : a + M + (-2 === h ? t : d);
  }
  return [J(e, r + (e[a] || "<?>") + (2 === t ? "</svg>" : 3 === t ? "</math>" : "")), s];
};
class te {
  constructor({
    strings: e,
    _$litType$: t
  }, a) {
    let s;
    this.parts = [];
    let i = 0,
      r = 0;
    const o = e.length - 1,
      n = this.parts,
      [l, h] = ee(e, t);
    if (this.el = te.createElement(l, a), Q.currentNode = this.el.content, 2 === t || 3 === t) {
      const e = this.el.content.firstChild;
      e.replaceWith(...e.childNodes);
    }
    for (; null !== (s = Q.nextNode()) && n.length < o;) {
      if (1 === s.nodeType) {
        if (s.hasAttributes()) for (const e of s.getAttributeNames()) if (e.endsWith(k)) {
          const t = h[r++],
            a = s.getAttribute(e).split(M),
            o = /([.?@])?(.*)/.exec(t);
          n.push({
            type: 1,
            index: i,
            name: o[2],
            strings: a,
            ctor: "." === o[1] ? oe : "?" === o[1] ? ne : "@" === o[1] ? le : re
          }), s.removeAttribute(e);
        } else e.startsWith(M) && (n.push({
          type: 6,
          index: i
        }), s.removeAttribute(e));
        if (Z.test(s.tagName)) {
          const e = s.textContent.split(M),
            t = e.length - 1;
          if (t > 0) {
            s.textContent = L ? L.emptyScript : "";
            for (let a = 0; a < t; a++) s.append(e[a], j()), Q.nextNode(), n.push({
              type: 2,
              index: ++i
            });
            s.append(e[t], j());
          }
        }
      } else if (8 === s.nodeType) if (s.data === B) n.push({
        type: 2,
        index: i
      });else {
        let e = -1;
        for (; -1 !== (e = s.data.indexOf(M, e + 1));) n.push({
          type: 7,
          index: i
        }), e += M.length - 1;
      }
      i++;
    }
  }
  static createElement(e, t) {
    const a = N.createElement("template");
    return a.innerHTML = e, a;
  }
}
function ae(e, t, a = e, s) {
  if (t === X) return t;
  let i = void 0 !== s ? a._$Co?.[s] : a._$Cl;
  const r = D(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), void 0 === r ? i = void 0 : (i = new r(e), i._$AT(e, a, s)), void 0 !== s ? (a._$Co ??= [])[s] = i : a._$Cl = i), void 0 !== i && (t = ae(e, i._$AS(e, t.values), i, s)), t;
}
class se {
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
    const {
        el: {
          content: t
        },
        parts: a
      } = this._$AD,
      s = (e?.creationScope ?? N).importNode(t, !0);
    Q.currentNode = s;
    let i = Q.nextNode(),
      r = 0,
      o = 0,
      n = a[0];
    for (; void 0 !== n;) {
      if (r === n.index) {
        let t;
        2 === n.type ? t = new ie(i, i.nextSibling, this, e) : 1 === n.type ? t = new n.ctor(i, n.name, n.strings, this, e) : 6 === n.type && (t = new he(i, this, e)), this._$AV.push(t), n = a[++o];
      }
      r !== n?.index && (i = Q.nextNode(), r++);
    }
    return Q.currentNode = N, s;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) void 0 !== a && (void 0 !== a.strings ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class ie {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, a, s) {
    this.type = 2, this._$AH = K, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return void 0 !== t && 11 === e?.nodeType && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = ae(this, e, t), D(e) ? e === K || null == e || "" === e ? (this._$AH !== K && this._$AR(), this._$AH = K) : e !== this._$AH && e !== X && this._(e) : void 0 !== e._$litType$ ? this.$(e) : void 0 !== e.nodeType ? this.T(e) : (e => R(e) || "function" == typeof e?.[Symbol.iterator])(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== K && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(N.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const {
        values: t,
        _$litType$: a
      } = e,
      s = "number" == typeof a ? this._$AC(e) : (void 0 === a.el && (a.el = te.createElement(J(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === s) this._$AH.p(t);else {
      const e = new se(s, this),
        a = e.u(this.options);
      e.p(t), this.T(a), this._$AH = e;
    }
  }
  _$AC(e) {
    let t = Y.get(e.strings);
    return void 0 === t && Y.set(e.strings, t = new te(e)), t;
  }
  k(e) {
    R(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a,
      s = 0;
    for (const i of e) s === t.length ? t.push(a = new ie(this.O(j()), this.O(j()), this, this.options)) : a = t[s], a._$AI(i), s++;
    s < t.length && (this._$AR(a && a._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
      const t = O(e).nextSibling;
      O(e).remove(), e = t;
    }
  }
  setConnected(e) {
    void 0 === this._$AM && (this._$Cv = e, this._$AP?.(e));
  }
}
class re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, s, i) {
    this.type = 1, this._$AH = K, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = i, a.length > 2 || "" !== a[0] || "" !== a[1] ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = K;
  }
  _$AI(e, t = this, a, s) {
    const i = this.strings;
    let r = !1;
    if (void 0 === i) e = ae(this, e, t, 0), r = !D(e) || e !== this._$AH && e !== X, r && (this._$AH = e);else {
      const s = e;
      let o, n;
      for (e = i[0], o = 0; o < i.length - 1; o++) n = ae(this, s[a + o], t, o), n === X && (n = this._$AH[o]), r ||= !D(n) || n !== this._$AH[o], n === K ? e = K : e !== K && (e += (n ?? "") + i[o + 1]), this._$AH[o] = n;
    }
    r && !s && this.j(e);
  }
  j(e) {
    e === K ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class oe extends re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === K ? void 0 : e;
  }
}
class ne extends re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== K);
  }
}
class le extends re {
  constructor(e, t, a, s, i) {
    super(e, t, a, s, i), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ae(this, e, t, 0) ?? K) === X) return;
    const a = this._$AH,
      s = e === K && a !== K || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive,
      i = e !== K && (a === K || s);
    s && this.element.removeEventListener(this.name, this, a), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class he {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
}
const ce = S.litHtmlPolyfillSupport;
ce?.(te, ie), (S.litHtmlVersions ??= []).push("3.3.3");
const de = globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let pe = class extends H {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ((e, t, a) => {
      const s = a?.renderBefore ?? t;
      let i = s._$litPart$;
      if (void 0 === i) {
        const e = a?.renderBefore ?? null;
        s._$litPart$ = i = new ie(t.insertBefore(j(), e), e, void 0, a ?? {});
      }
      return i._$AI(e), i;
    })(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return X;
  }
};
pe._$litElement$ = !0, pe.finalized = !0, de.litElementHydrateSupport?.({
  LitElement: pe
});
const ue = de.litElementPolyfillSupport;
ue?.({
  LitElement: pe
}), (de.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = e => (t, a) => {
    void 0 !== a ? a.addInitializer(() => {
      customElements.define(e, t);
    }) : customElements.define(e, t);
  },
  me = {
    attribute: !0,
    type: String,
    converter: E,
    reflect: !1,
    hasChanged: x
  },
  ve = (e = me, t, a) => {
    const {
      kind: s,
      metadata: i
    } = a;
    let r = globalThis.litPropertyMetadata.get(i);
    if (void 0 === r && globalThis.litPropertyMetadata.set(i, r = new Map()), "setter" === s && ((e = Object.create(e)).wrapped = !0), r.set(a.name, e), "accessor" === s) {
      const {
        name: s
      } = a;
      return {
        set(a) {
          const i = t.get.call(this);
          t.set.call(this, a), this.requestUpdate(s, i, e, !0, a);
        },
        init(t) {
          return void 0 !== t && this.C(s, void 0, e, t), t;
        }
      };
    }
    if ("setter" === s) {
      const {
        name: s
      } = a;
      return function (a) {
        const i = this[s];
        t.call(this, a), this.requestUpdate(s, i, e, !0, a);
      };
    }
    throw Error("Unsupported decorator location: " + s);
  };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function be(e) {
  return (t, a) => "object" == typeof a ? ve(e, t, a) : ((e, t, a) => {
    const s = t.hasOwnProperty(a);
    return t.constructor.createProperty(a, e), s ? Object.getOwnPropertyDescriptor(t, a) : void 0;
  })(e, t, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function fe(e) {
  return be({
    ...e,
    state: !0,
    attribute: !1
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _e(e, t) {
  return (t, a, s) => {
    const i = t => t.renderRoot?.querySelector(e) ?? null;
    {
      const {
        get: e,
        set: r
      } = "object" == typeof a ? t : s ?? (() => {
        const e = Symbol();
        return {
          get() {
            return this[e];
          },
          set(t) {
            this[e] = t;
          }
        };
      })();
      return ((e, t, a) => (a.configurable = !0, a.enumerable = !0, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, a), a))(t, a, {
        get() {
          let t = e.call(this);
          return void 0 === t && (t = i(this), (null !== t || this.hasUpdated) && r.call(this, t)), t;
        }
      });
    }
  };
}
const ye = async () => {
    if (customElements.get("ha-checkbox") && customElements.get("ha-slider") && customElements.get("ha-panel-config")) return;
    await customElements.whenDefined("partial-panel-resolver");
    const e = document.createElement("partial-panel-resolver");
    e.hass = {
      panels: [{
        url_path: "tmp",
        component_name: "config"
      }]
    }, e._updateRoutes(), await e.routerOptions.routes.tmp.load(), await customElements.whenDefined("ha-panel-config");
    const t = document.createElement("ha-panel-config");
    await t.routerOptions.routes.automation.load();
  },
  we = d`
  ha-card {
    display: flex;
    flex-direction: column;
    margin: 5px;
    max-width: calc(100vw - 10px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-header .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div.warning {
    color: var(--error-color);
    margin-top: 20px;
  }

  div.checkbox-row {
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  div.checkbox-row ha-switch {
    margin-right: 20px;
  }

  div.checkbox-row.right ha-switch {
    margin-left: 20px;
    position: absolute;
    right: 0px;
  }

  div.entity-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 10px 0px;
  }
  div.entity-row .info {
    margin-left: 16px;
    flex: 1 0 60px;
  }
  div.entity-row .info,
  div.entity-row .info > * {
    color: var(--primary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row .secondary {
    display: block;
    color: var(--secondary-text-color);
    transition: color 0.2s ease-in-out;
  }
  div.entity-row state-badge {
    flex: 0 0 40px;
  }

  ha-dialog div.wrapper {
    margin-bottom: -20px;
  }

  ha-input {
    min-width: 220px;
  }

  a,
  a:visited {
    color: var(--primary-color);
  }
  mwc-tab {
    --mdc-tab-color-default: var(--secondary-text-color);
    --mdc-tab-text-label-color-default: var(--secondary-text-color);
  }
  mwc-tab ha-icon {
    --mdc-icon-size: 20px;
  }
  mwc-tab.disabled {
    --mdc-theme-primary: var(--disabled-text-color);
    --mdc-tab-color-default: var(--disabled-text-color);
    --mdc-tab-text-label-color-default: var(--disabled-text-color);
  }

  ha-card alarmo-settings-row:first-child,
  ha-card alarmo-settings-row:first-of-type {
    border-top: 0px;
  }

  ha-card > ha-card {
    margin: 10px;
  }
`,
  $e = d`
  /* mwc-dialog (ha-dialog) styles */
  ha-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-heading-ink-color: var(--primary-text-color);
    --mdc-dialog-content-ink-color: var(--primary-text-color);
    --justify-action-buttons: space-between;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --mdc-dialog-min-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-max-width: calc(100vw - env(safe-area-inset-right) - env(safe-area-inset-left));
      --mdc-dialog-min-height: 100%;
      --mdc-dialog-max-height: 100%;
      --vertial-align-dialog: flex-end;
      --ha-dialog-border-radius: 0px;
    }
  }
  ha-dialog div.description {
    margin-bottom: 10px;
  }
`;
var Ae = {
    modes_short: {
      armed_away: "Away",
      armed_home: "Home",
      armed_night: "Night",
      armed_custom_bypass: "Custom",
      armed_vacation: "Vacation"
    },
    enabled: "Enabled",
    disabled: "Disabled"
  },
  Ee = {
    time_picker: {
      seconds: "seconds",
      minutes: "minutes"
    },
    editor: {
      ui_mode: "To UI",
      yaml_mode: "To YAML",
      edit_in_yaml: "Edit in YAML"
    },
    table: {
      filter: {
        label: "Filter items",
        item: "Filter by {name}",
        hidden_items: "{number} {number, plural,\n  one {item is}\n  other {items are}\n} hidden"
      }
    }
  },
  xe = "Midnight 911 Alarm Panel",
  Ce = {
    general: {
      title: "General",
      cards: {
        general: {
          description: "This panel defines some global settings for the alarm.",
          fields: {
            disarm_after_trigger: {
              heading: "Disarm after triggering",
              description: "Automatically disarm the alarm rather than returning to the armed state."
            },
            ignore_blocking_sensors_after_trigger: {
              heading: "Ignore blocking sensors when re-arming",
              description: "Return to armed state without checking for sensors that may still be active."
            },
            enable_mqtt: {
              heading: "Enable MQTT",
              description: "Allow the alarm panel to be controlled through MQTT."
            },
            enable_master: {
              heading: "Enable alarm master",
              description: "Creates an entity for controlling all areas simultaneously."
            }
          },
          actions: {
            setup_mqtt: "MQTT Configuration",
            setup_master: "Master Configuration"
          }
        },
        modes: {
          title: "Modes",
          description: "This panel can be used to set up the arm modes of the alarm.",
          modes: {
            armed_away: "Armed away will be used when all people left the house. All doors and windows allowing access to the house will be guarded, as well as motion sensors inside the house.",
            armed_home: "Armed home (also known as armed stay) will be used when setting the alarm while people are in the house. All doors and windows allowing access to the house will be guarded, but not motion sensors inside the house.",
            armed_night: "Armed night will be used when setting the alarm before going to sleep. All doors and windows allowing access to the house will be guarded, and selected motion sensors (downstairs) in the house.",
            armed_vacation: "Armed vacation can be used as an extension to the armed away mode in case of absence for longer duration. The delay times and trigger responses can be adapted (as desired) to being distant from home.",
            armed_custom_bypass: "An extra mode for defining your own security perimeter."
          },
          number_sensors_active: "{number} {number, plural,\n  one {sensor}\n  other {sensors}\n} active",
          fields: {
            status: {
              heading: "Status",
              description: "Controls whether the alarm can be armed in this mode."
            },
            exit_delay: {
              heading: "Exit delay",
              description: "When arming the alarm, within this time period the sensors will not trigger the alarm yet."
            },
            entry_delay: {
              heading: "Entry delay",
              description: "Delay time until the alarm is triggered after one of the sensors is activated."
            },
            trigger_time: {
              heading: "Trigger time",
              description: "Time during which the alarm will remain in the triggered state after activation."
            }
          }
        },
        mqtt: {
          title: "MQTT configuration",
          description: "This panel can be used for configuration of the MQTT interface.",
          fields: {
            state_topic: {
              heading: "State topic",
              description: "Topic on which state updates are published"
            },
            event_topic: {
              heading: "Event topic",
              description: "Topic on which alarm events are published"
            },
            command_topic: {
              heading: "Command topic",
              description: "Topic which Alarmo listens to for arm/disarm commands."
            },
            require_code: {
              heading: "Require code",
              description: "Require the code to be sent with the command."
            },
            state_payload: {
              heading: "Configure payload per state",
              item: "Define a payload for state ''{state}''"
            },
            command_payload: {
              heading: "Configure payload per command",
              item: "Define a payload for command ''{command}''"
            }
          }
        },
        areas: {
          title: "Areas",
          description: "Areas can be used for dividing your alarm system into multiple compartments.",
          no_items: "There are no areas defined yet.",
          table: {
            remarks: "Remarks",
            summary: "This area contains {summary_sensors} and {summary_automations}.",
            summary_sensors: "{number} {number, plural,\n  one {sensor}\n  other {sensors}\n}",
            summary_automations: "{number} {number, plural,\n  one {automation}\n  other {automations}\n}"
          },
          actions: {
            add: "Add",
            import_from_alarmo: "Import from Alarmo"
          }
        }
      },
      dialogs: {
        create_area: {
          title: "New area",
          fields: {
            copy_from: "Copy settings from"
          }
        },
        edit_area: {
          title: "Editing area ''{area}''",
          name_warning: "Note: changing the name will change the entity ID"
        },
        remove_area: {
          title: "Remove area?",
          description: "Are you sure you want to remove this area? This area contains {sensors} sensors and {automations} automations, which will be removed as well."
        },
        edit_master: {
          title: "Master configuration"
        },
        disable_master: {
          title: "Disable master?",
          description: "Are you sure you want to remove the alarm master? This area contains {automations} automations, which will be removed with this action."
        },
        import_alarmo: {
          title: "Import from Alarmo",
          description: "The following will be imported from your existing Alarmo configuration:",
          not_available: "No Alarmo configuration was found to import.",
          actions: {
            import: "Import"
          },
          summary: {
            areas: "Areas",
            users: "Users",
            sensor_groups: "Sensor groups",
            sensors: "Sensors",
            sensors_skipped: "Sensors skipped",
            automations_skipped: "Automations skipped (not supported)"
          },
          reason: {
            alarmo_not_found: "No Alarmo storage file could be found. Make sure Alarmo is installed on this system.",
            alarmo_version_mismatch: "The Alarmo configuration could not be read. It may be from an unsupported version.",
            already_imported: "This Alarmo configuration has already been imported.",
            import_complete: "Import completed successfully."
          }
        }
      }
    },
    sensors: {
      title: "Sensors",
      cards: {
        sensors: {
          description: "Currently configured sensors. Click on an item to make changes.",
          table: {
            no_items: "There are no sensors to be displayed here.",
            no_area_warning: "Sensor is not assigned to any area.",
            arm_modes: "Arm Modes",
            always_on: "(Always)"
          }
        },
        add_sensors: {
          title: "Add Sensors",
          description: "Add more sensors. Make sure that your sensors have a suitable name, so you can identify them.",
          no_items: "There are no available HA entities that can be configured for the alarm. Make sure to include entities of the type binary_sensor.",
          table: {
            type: "Detected type"
          },
          actions: {
            add_to_alarm: "Add to alarm",
            filter_supported: "Hide items with unknown type"
          }
        },
        editor: {
          title: "Edit Sensor",
          description: "Configuring the sensor settings of ''{entity}''.",
          fields: {
            entity: {
              heading: "Entity",
              description: "Entity associated with this sensor"
            },
            area: {
              heading: "Area",
              description: "Select an area which contains this sensor."
            },
            group: {
              heading: "Group",
              description: "Group with other sensors for combined triggering."
            },
            device_type: {
              heading: "Device Type",
              description: "Choose a device type to automatically apply appropriate settings.",
              choose: {
                door: {
                  name: "Door",
                  description: "A door, gate or other entrance that is used for entering/leaving the home."
                },
                window: {
                  name: "Window",
                  description: "A window, or a door not used for entering the house such as balcony."
                },
                motion: {
                  name: "Motion",
                  description: "Presence sensor or similar device having a delay between activations."
                },
                tamper: {
                  name: "Tamper",
                  description: "Detector of sensor cover removal, glass break sensor, etc."
                },
                environmental: {
                  name: "Environmental",
                  description: "Smoke/gas sensor, leak detector, etc. (not related to burglar protection)."
                },
                other: {
                  name: "Generic"
                }
              }
            },
            always_on: {
              heading: "Always on",
              description: "Sensor should always trigger the alarm."
            },
            modes: {
              heading: "Enabled modes",
              description: "Alarm modes in which this sensor is active."
            },
            arm_on_close: {
              heading: "Arm after closing",
              description: "After deactivation of this sensor, the remaining exit delay will automatically be skipped."
            },
            use_exit_delay: {
              heading: "Use exit delay",
              description: "Sensor is allowed to be active when the exit delay starts."
            },
            use_entry_delay: {
              heading: "Use entry delay",
              description: "Sensor activation triggers the alarm after the entry delay rather than directly."
            },
            entry_delay: {
              heading: "Entry delay",
              description: "Override the entry delay (as configured for the arm mode) with a delay specific to the sensor."
            },
            delay_on: {
              heading: "Delay on",
              description: "Sensor must remain active for this duration before triggering. Resets if sensor deactivates."
            },
            allow_open: {
              heading: "Allow open initially",
              description: "Open state while arming is ignored (subsequent sensor activation will trigger alarm)."
            },
            auto_bypass: {
              heading: "Bypass automatically",
              description: "Exclude this sensor from the alarm if it is open while arming.",
              modes: "Modes in which sensor may be bypassed"
            },
            trigger_unavailable: {
              heading: "Trigger when unavailable",
              description: "When the sensor state becomes 'unavailable', this will activate the sensor."
            }
          },
          actions: {
            toggle_advanced: "Advanced settings",
            remove: "Remove",
            setup_groups: "Setup groups"
          },
          errors: {
            description: "Please correct the following errors:",
            no_area: "No area is selected",
            no_modes: "No modes are selected for which the sensor should be active",
            no_auto_bypass_modes: "No modes are selected for the sensor may be automatically bypassed"
          }
        }
      },
      dialogs: {
        manage_groups: {
          title: "Manage sensor groups",
          description: "In a sensor group multiple sensors must be activated within a time period before the alarm is triggered.",
          no_items: "No groups yet",
          actions: {
            new_group: "New group"
          }
        },
        create_group: {
          title: "New sensor group",
          fields: {
            name: {
              heading: "Name",
              description: "Name for sensor group"
            },
            timeout: {
              heading: "Time-out",
              description: "Time period during which consecutive sensor activations triggers the alarm."
            },
            event_count: {
              heading: "Count",
              description: "Amount of different sensors that need to be activated to trigger the alarm."
            },
            sensors: {
              heading: "Sensors",
              description: "Select the sensors which are contained by this group."
            },
            mode: {
              heading: "Trigger mode",
              description: "Choose how sensor activations within this group are combined to decide when the alarm triggers.",
              count_window: "Count within time window",
              weighted_decay: "Weighted decay"
            },
            decay_per_minute: {
              heading: "Decay per minute",
              description: "Amount subtracted from the accumulated score every minute."
            },
            threshold: {
              heading: "Threshold",
              description: "Accumulated score at which the alarm is triggered."
            },
            weight: {
              heading: "Weight"
            }
          },
          errors: {
            invalid_name: "Invalid name provided.",
            insufficient_sensors: "At least 2 sensors need to be selected."
          }
        },
        edit_group: {
          title: "Edit sensor group ''{name}''"
        }
      }
    },
    codes: {
      title: "Codes",
      cards: {
        codes: {
          description: "Change settings for the code.",
          fields: {
            code_arm_required: {
              heading: "Require code for arming",
              description: "A valid code must be provided to arm the alarm."
            },
            code_disarm_required: {
              heading: "Require code for disarming",
              description: "A valid code must be provided to disarm the alarm."
            },
            code_mode_change_required: {
              heading: "Require code for switching mode",
              description: "A valid code must be provided to change the arm mode which is active."
            },
            code_format: {
              heading: "Code format",
              description: "Sets the input type for Lovelace alarm card.",
              code_format_number: "Pincode",
              code_format_text: "Password"
            }
          }
        },
        user_management: {
          title: "User management",
          description: "Each user has its own code to arm/disarm the alarm.",
          no_items: "There are no users yet",
          actions: {
            new_user: "New user"
          }
        },
        new_user: {
          title: "Create new user",
          description: "Users can be created for providing access to operating the alarm.",
          fields: {
            name: {
              heading: "Name",
              description: "Name of the user."
            },
            code: {
              heading: "Code",
              description: "Code for this user."
            },
            confirm_code: {
              heading: "Confirm code",
              description: "Repeat the code."
            },
            can_arm: {
              heading: "Allow code for arming",
              description: "Entering this code activates the alarm"
            },
            can_disarm: {
              heading: "Allow code for disarming",
              description: "Entering this code deactivates the alarm"
            },
            is_override_code: {
              heading: "Is override code",
              description: "Entering this code will arm the alarm in force"
            },
            area_limit: {
              heading: "Restricted areas",
              description: "Limit user to control only the selected areas"
            }
          },
          errors: {
            no_name: "No name provided.",
            no_code: "Code should have 4 characters/numbers minimum.",
            code_mismatch: "The codes don't match."
          }
        },
        edit_user: {
          title: "Edit User",
          description: "Change configuration for user ''{name}''.",
          fields: {
            code: {
              description_keep_blank: "Leave blank to keep the current code unchanged."
            }
          }
        }
      }
    }
  },
  He = {
    common: Ae,
    components: Ee,
    title: xe,
    panels: Ce
  },
  Se = Object.freeze({
    __proto__: null,
    common: Ae,
    components: Ee,
    default: He,
    panels: Ce,
    title: xe
  });
function Oe(e, t) {
  var a = t && t.cache ? t.cache : Re,
    s = t && t.serializer ? t.serializer : je;
  return (t && t.strategy ? t.strategy : Me)(e, {
    cache: a,
    serializer: s
  });
}
function Le(e, t, a, s) {
  var i,
    r = null == (i = s) || "number" == typeof i || "boolean" == typeof i ? s : a(s),
    o = t.get(r);
  return void 0 === o && (o = e.call(this, s), t.set(r, o)), o;
}
function Te(e, t, a) {
  var s = Array.prototype.slice.call(arguments, 3),
    i = a(s),
    r = t.get(i);
  return void 0 === r && (r = e.apply(this, s), t.set(i, r)), r;
}
function ke(e, t, a, s, i) {
  return a.bind(t, e, s, i);
}
function Me(e, t) {
  return ke(e, this, 1 === e.length ? Le : Te, t.cache.create(), t.serializer);
}
var Be,
  Pe,
  Ne,
  je = function () {
    return JSON.stringify(arguments);
  },
  De = function () {
    function e() {
      this.cache = Object.create(null);
    }
    return e.prototype.get = function (e) {
      return this.cache[e];
    }, e.prototype.set = function (e, t) {
      this.cache[e] = t;
    }, e;
  }(),
  Re = {
    create: function () {
      return new De();
    }
  },
  Ie = {
    variadic: function (e, t) {
      return ke(e, this, Te, t.cache.create(), t.serializer);
    }
  };
function Ve(e) {
  return e.type === Pe.literal;
}
function Ue(e) {
  return e.type === Pe.argument;
}
function Ge(e) {
  return e.type === Pe.number;
}
function Fe(e) {
  return e.type === Pe.date;
}
function ze(e) {
  return e.type === Pe.time;
}
function We(e) {
  return e.type === Pe.select;
}
function Ze(e) {
  return e.type === Pe.plural;
}
function qe(e) {
  return e.type === Pe.pound;
}
function Xe(e) {
  return e.type === Pe.tag;
}
function Ke(e) {
  return !(!e || "object" != typeof e || e.type !== Ne.number);
}
function Ye(e) {
  return !(!e || "object" != typeof e || e.type !== Ne.dateTime);
}
!function (e) {
  e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
}(Be || (Be = {})), function (e) {
  e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag";
}(Pe || (Pe = {})), function (e) {
  e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime";
}(Ne || (Ne = {}));
var Qe = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,
  Je = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function et(e) {
  var t = {};
  return e.replace(Je, function (e) {
    var a = e.length;
    switch (e[0]) {
      case "G":
        t.era = 4 === a ? "long" : 5 === a ? "narrow" : "short";
        break;
      case "y":
        t.year = 2 === a ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      case "M":
      case "L":
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][a - 1];
        break;
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][a - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      case "E":
        t.weekday = 4 === a ? "long" : 5 === a ? "narrow" : "short";
        break;
      case "e":
        if (a < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][a - 4];
        break;
      case "c":
        if (a < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][a - 4];
        break;
      case "a":
        t.hour12 = !0;
        break;
      case "b":
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      case "h":
        t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "H":
        t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "K":
        t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "k":
        t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][a - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      case "m":
        t.minute = ["numeric", "2-digit"][a - 1];
        break;
      case "s":
        t.second = ["numeric", "2-digit"][a - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      case "z":
        t.timeZoneName = a < 4 ? "short" : "long";
        break;
      case "Z":
      case "O":
      case "v":
      case "V":
      case "X":
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), t;
}
var tt = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function at(e) {
  return e.replace(/^(.*?)-/, "");
}
var st = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
  it = /^(@+)?(\+|#+)?[rs]?$/g,
  rt = /(\*)(0+)|(#+)(0+)|(0+)/g,
  ot = /^(0+)$/;
function nt(e) {
  var t = {};
  return "r" === e[e.length - 1] ? t.roundingPriority = "morePrecision" : "s" === e[e.length - 1] && (t.roundingPriority = "lessPrecision"), e.replace(it, function (e, a, s) {
    return "string" != typeof s ? (t.minimumSignificantDigits = a.length, t.maximumSignificantDigits = a.length) : "+" === s ? t.minimumSignificantDigits = a.length : "#" === a[0] ? t.maximumSignificantDigits = a.length : (t.minimumSignificantDigits = a.length, t.maximumSignificantDigits = a.length + ("string" == typeof s ? s.length : 0)), "";
  }), t;
}
function lt(e) {
  switch (e) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function ht(e) {
  var t;
  if ("E" === e[0] && "E" === e[1] ? (t = {
    notation: "engineering"
  }, e = e.slice(2)) : "E" === e[0] && (t = {
    notation: "scientific"
  }, e = e.slice(1)), t) {
    var a = e.slice(0, 2);
    if ("+!" === a ? (t.signDisplay = "always", e = e.slice(2)) : "+?" === a && (t.signDisplay = "exceptZero", e = e.slice(2)), !ot.test(e)) throw new Error("Malformed concise eng/scientific notation");
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function ct(e) {
  var t = lt(e);
  return t || {};
}
function dt(e) {
  for (var t = {}, s = 0, i = e; s < i.length; s++) {
    var r = i[s];
    switch (r.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent", t.scale = 100;
        continue;
      case "currency":
        t.style = "currency", t.currency = r.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit", t.unit = at(r.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact", t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact", t.compactDisplay = "long";
        continue;
      case "scientific":
        t = a(a(a({}, t), {
          notation: "scientific"
        }), r.options.reduce(function (e, t) {
          return a(a({}, e), ct(t));
        }, {}));
        continue;
      case "engineering":
        t = a(a(a({}, t), {
          notation: "engineering"
        }), r.options.reduce(function (e, t) {
          return a(a({}, e), ct(t));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code", t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name", t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(r.options[0]);
        continue;
      case "rounding-mode-floor":
        t.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        t.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        t.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        t.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        t.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        t.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        t.roundingMode = "halfExpand";
        continue;
      case "integer-width":
        if (r.options.length > 1) throw new RangeError("integer-width stems only accept a single optional option");
        r.options[0].replace(rt, function (e, a, s, i, r, o) {
          if (a) t.minimumIntegerDigits = s.length;else {
            if (i && r) throw new Error("We currently do not support maximum integer digits");
            if (o) throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (ot.test(r.stem)) t.minimumIntegerDigits = r.stem.length;else if (st.test(r.stem)) {
      if (r.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
      r.stem.replace(st, function (e, a, s, i, r, o) {
        return "*" === s ? t.minimumFractionDigits = a.length : i && "#" === i[0] ? t.maximumFractionDigits = i.length : r && o ? (t.minimumFractionDigits = r.length, t.maximumFractionDigits = r.length + o.length) : (t.minimumFractionDigits = a.length, t.maximumFractionDigits = a.length), "";
      });
      var o = r.options[0];
      "w" === o ? t = a(a({}, t), {
        trailingZeroDisplay: "stripIfInteger"
      }) : o && (t = a(a({}, t), nt(o)));
    } else if (it.test(r.stem)) t = a(a({}, t), nt(r.stem));else {
      var n = lt(r.stem);
      n && (t = a(a({}, t), n));
      var l = ht(r.stem);
      l && (t = a(a({}, t), l));
    }
  }
  return t;
}
var pt,
  ut = {
    "001": ["H", "h"],
    419: ["h", "H", "hB", "hb"],
    AC: ["H", "h", "hb", "hB"],
    AD: ["H", "hB"],
    AE: ["h", "hB", "hb", "H"],
    AF: ["H", "hb", "hB", "h"],
    AG: ["h", "hb", "H", "hB"],
    AI: ["H", "h", "hb", "hB"],
    AL: ["h", "H", "hB"],
    AM: ["H", "hB"],
    AO: ["H", "hB"],
    AR: ["h", "H", "hB", "hb"],
    AS: ["h", "H"],
    AT: ["H", "hB"],
    AU: ["h", "hb", "H", "hB"],
    AW: ["H", "hB"],
    AX: ["H"],
    AZ: ["H", "hB", "h"],
    BA: ["H", "hB", "h"],
    BB: ["h", "hb", "H", "hB"],
    BD: ["h", "hB", "H"],
    BE: ["H", "hB"],
    BF: ["H", "hB"],
    BG: ["H", "hB", "h"],
    BH: ["h", "hB", "hb", "H"],
    BI: ["H", "h"],
    BJ: ["H", "hB"],
    BL: ["H", "hB"],
    BM: ["h", "hb", "H", "hB"],
    BN: ["hb", "hB", "h", "H"],
    BO: ["h", "H", "hB", "hb"],
    BQ: ["H"],
    BR: ["H", "hB"],
    BS: ["h", "hb", "H", "hB"],
    BT: ["h", "H"],
    BW: ["H", "h", "hb", "hB"],
    BY: ["H", "h"],
    BZ: ["H", "h", "hb", "hB"],
    CA: ["h", "hb", "H", "hB"],
    CC: ["H", "h", "hb", "hB"],
    CD: ["hB", "H"],
    CF: ["H", "h", "hB"],
    CG: ["H", "hB"],
    CH: ["H", "hB", "h"],
    CI: ["H", "hB"],
    CK: ["H", "h", "hb", "hB"],
    CL: ["h", "H", "hB", "hb"],
    CM: ["H", "h", "hB"],
    CN: ["H", "hB", "hb", "h"],
    CO: ["h", "H", "hB", "hb"],
    CP: ["H"],
    CR: ["h", "H", "hB", "hb"],
    CU: ["h", "H", "hB", "hb"],
    CV: ["H", "hB"],
    CW: ["H", "hB"],
    CX: ["H", "h", "hb", "hB"],
    CY: ["h", "H", "hb", "hB"],
    CZ: ["H"],
    DE: ["H", "hB"],
    DG: ["H", "h", "hb", "hB"],
    DJ: ["h", "H"],
    DK: ["H"],
    DM: ["h", "hb", "H", "hB"],
    DO: ["h", "H", "hB", "hb"],
    DZ: ["h", "hB", "hb", "H"],
    EA: ["H", "h", "hB", "hb"],
    EC: ["h", "H", "hB", "hb"],
    EE: ["H", "hB"],
    EG: ["h", "hB", "hb", "H"],
    EH: ["h", "hB", "hb", "H"],
    ER: ["h", "H"],
    ES: ["H", "hB", "h", "hb"],
    ET: ["hB", "hb", "h", "H"],
    FI: ["H"],
    FJ: ["h", "hb", "H", "hB"],
    FK: ["H", "h", "hb", "hB"],
    FM: ["h", "hb", "H", "hB"],
    FO: ["H", "h"],
    FR: ["H", "hB"],
    GA: ["H", "hB"],
    GB: ["H", "h", "hb", "hB"],
    GD: ["h", "hb", "H", "hB"],
    GE: ["H", "hB", "h"],
    GF: ["H", "hB"],
    GG: ["H", "h", "hb", "hB"],
    GH: ["h", "H"],
    GI: ["H", "h", "hb", "hB"],
    GL: ["H", "h"],
    GM: ["h", "hb", "H", "hB"],
    GN: ["H", "hB"],
    GP: ["H", "hB"],
    GQ: ["H", "hB", "h", "hb"],
    GR: ["h", "H", "hb", "hB"],
    GT: ["h", "H", "hB", "hb"],
    GU: ["h", "hb", "H", "hB"],
    GW: ["H", "hB"],
    GY: ["h", "hb", "H", "hB"],
    HK: ["h", "hB", "hb", "H"],
    HN: ["h", "H", "hB", "hb"],
    HR: ["H", "hB"],
    HU: ["H", "h"],
    IC: ["H", "h", "hB", "hb"],
    ID: ["H"],
    IE: ["H", "h", "hb", "hB"],
    IL: ["H", "hB"],
    IM: ["H", "h", "hb", "hB"],
    IN: ["h", "H"],
    IO: ["H", "h", "hb", "hB"],
    IQ: ["h", "hB", "hb", "H"],
    IR: ["hB", "H"],
    IS: ["H"],
    IT: ["H", "hB"],
    JE: ["H", "h", "hb", "hB"],
    JM: ["h", "hb", "H", "hB"],
    JO: ["h", "hB", "hb", "H"],
    JP: ["H", "K", "h"],
    KE: ["hB", "hb", "H", "h"],
    KG: ["H", "h", "hB", "hb"],
    KH: ["hB", "h", "H", "hb"],
    KI: ["h", "hb", "H", "hB"],
    KM: ["H", "h", "hB", "hb"],
    KN: ["h", "hb", "H", "hB"],
    KP: ["h", "H", "hB", "hb"],
    KR: ["h", "H", "hB", "hb"],
    KW: ["h", "hB", "hb", "H"],
    KY: ["h", "hb", "H", "hB"],
    KZ: ["H", "hB"],
    LA: ["H", "hb", "hB", "h"],
    LB: ["h", "hB", "hb", "H"],
    LC: ["h", "hb", "H", "hB"],
    LI: ["H", "hB", "h"],
    LK: ["H", "h", "hB", "hb"],
    LR: ["h", "hb", "H", "hB"],
    LS: ["h", "H"],
    LT: ["H", "h", "hb", "hB"],
    LU: ["H", "h", "hB"],
    LV: ["H", "hB", "hb", "h"],
    LY: ["h", "hB", "hb", "H"],
    MA: ["H", "h", "hB", "hb"],
    MC: ["H", "hB"],
    MD: ["H", "hB"],
    ME: ["H", "hB", "h"],
    MF: ["H", "hB"],
    MG: ["H", "h"],
    MH: ["h", "hb", "H", "hB"],
    MK: ["H", "h", "hb", "hB"],
    ML: ["H"],
    MM: ["hB", "hb", "H", "h"],
    MN: ["H", "h", "hb", "hB"],
    MO: ["h", "hB", "hb", "H"],
    MP: ["h", "hb", "H", "hB"],
    MQ: ["H", "hB"],
    MR: ["h", "hB", "hb", "H"],
    MS: ["H", "h", "hb", "hB"],
    MT: ["H", "h"],
    MU: ["H", "h"],
    MV: ["H", "h"],
    MW: ["h", "hb", "H", "hB"],
    MX: ["h", "H", "hB", "hb"],
    MY: ["hb", "hB", "h", "H"],
    MZ: ["H", "hB"],
    NA: ["h", "H", "hB", "hb"],
    NC: ["H", "hB"],
    NE: ["H"],
    NF: ["H", "h", "hb", "hB"],
    NG: ["H", "h", "hb", "hB"],
    NI: ["h", "H", "hB", "hb"],
    NL: ["H", "hB"],
    NO: ["H", "h"],
    NP: ["H", "h", "hB"],
    NR: ["H", "h", "hb", "hB"],
    NU: ["H", "h", "hb", "hB"],
    NZ: ["h", "hb", "H", "hB"],
    OM: ["h", "hB", "hb", "H"],
    PA: ["h", "H", "hB", "hb"],
    PE: ["h", "H", "hB", "hb"],
    PF: ["H", "h", "hB"],
    PG: ["h", "H"],
    PH: ["h", "hB", "hb", "H"],
    PK: ["h", "hB", "H"],
    PL: ["H", "h"],
    PM: ["H", "hB"],
    PN: ["H", "h", "hb", "hB"],
    PR: ["h", "H", "hB", "hb"],
    PS: ["h", "hB", "hb", "H"],
    PT: ["H", "hB"],
    PW: ["h", "H"],
    PY: ["h", "H", "hB", "hb"],
    QA: ["h", "hB", "hb", "H"],
    RE: ["H", "hB"],
    RO: ["H", "hB"],
    RS: ["H", "hB", "h"],
    RU: ["H"],
    RW: ["H", "h"],
    SA: ["h", "hB", "hb", "H"],
    SB: ["h", "hb", "H", "hB"],
    SC: ["H", "h", "hB"],
    SD: ["h", "hB", "hb", "H"],
    SE: ["H"],
    SG: ["h", "hb", "H", "hB"],
    SH: ["H", "h", "hb", "hB"],
    SI: ["H", "hB"],
    SJ: ["H"],
    SK: ["H"],
    SL: ["h", "hb", "H", "hB"],
    SM: ["H", "h", "hB"],
    SN: ["H", "h", "hB"],
    SO: ["h", "H"],
    SR: ["H", "hB"],
    SS: ["h", "hb", "H", "hB"],
    ST: ["H", "hB"],
    SV: ["h", "H", "hB", "hb"],
    SX: ["H", "h", "hb", "hB"],
    SY: ["h", "hB", "hb", "H"],
    SZ: ["h", "hb", "H", "hB"],
    TA: ["H", "h", "hb", "hB"],
    TC: ["h", "hb", "H", "hB"],
    TD: ["h", "H", "hB"],
    TF: ["H", "h", "hB"],
    TG: ["H", "hB"],
    TH: ["H", "h"],
    TJ: ["H", "h"],
    TL: ["H", "hB", "hb", "h"],
    TM: ["H", "h"],
    TN: ["h", "hB", "hb", "H"],
    TO: ["h", "H"],
    TR: ["H", "hB"],
    TT: ["h", "hb", "H", "hB"],
    TW: ["hB", "hb", "h", "H"],
    TZ: ["hB", "hb", "H", "h"],
    UA: ["H", "hB", "h"],
    UG: ["hB", "hb", "H", "h"],
    UM: ["h", "hb", "H", "hB"],
    US: ["h", "hb", "H", "hB"],
    UY: ["h", "H", "hB", "hb"],
    UZ: ["H", "hB", "h"],
    VA: ["H", "h", "hB"],
    VC: ["h", "hb", "H", "hB"],
    VE: ["h", "H", "hB", "hb"],
    VG: ["h", "hb", "H", "hB"],
    VI: ["h", "hb", "H", "hB"],
    VN: ["H", "h"],
    VU: ["h", "H"],
    WF: ["H", "hB"],
    WS: ["h", "H"],
    XK: ["H", "hB", "h"],
    YE: ["h", "hB", "hb", "H"],
    YT: ["H", "hB"],
    ZA: ["H", "h", "hb", "hB"],
    ZM: ["h", "hb", "H", "hB"],
    ZW: ["H", "h"],
    "af-ZA": ["H", "h", "hB", "hb"],
    "ar-001": ["h", "hB", "hb", "H"],
    "ca-ES": ["H", "h", "hB"],
    "en-001": ["h", "hb", "H", "hB"],
    "en-HK": ["h", "hb", "H", "hB"],
    "en-IL": ["H", "h", "hb", "hB"],
    "en-MY": ["h", "hb", "H", "hB"],
    "es-BR": ["H", "h", "hB", "hb"],
    "es-ES": ["H", "h", "hB", "hb"],
    "es-GQ": ["H", "h", "hB", "hb"],
    "fr-CA": ["H", "h", "hB"],
    "gl-ES": ["H", "h", "hB"],
    "gu-IN": ["hB", "hb", "h", "H"],
    "hi-IN": ["hB", "h", "H"],
    "it-CH": ["H", "h", "hB"],
    "it-IT": ["H", "h", "hB"],
    "kn-IN": ["hB", "h", "H"],
    "ml-IN": ["hB", "h", "H"],
    "mr-IN": ["hB", "hb", "h", "H"],
    "pa-IN": ["hB", "hb", "h", "H"],
    "ta-IN": ["hB", "h", "hb", "H"],
    "te-IN": ["hB", "h", "H"],
    "zu-ZA": ["H", "hB", "hb", "h"]
  };
function gt(e) {
  var t = e.hourCycle;
  if (void 0 === t && e.hourCycles && e.hourCycles.length && (t = e.hourCycles[0]), t) switch (t) {
    case "h24":
      return "k";
    case "h23":
      return "H";
    case "h12":
      return "h";
    case "h11":
      return "K";
    default:
      throw new Error("Invalid hourCycle");
  }
  var a,
    s = e.language;
  return "root" !== s && (a = e.maximize().region), (ut[a || ""] || ut[s || ""] || ut["".concat(s, "-001")] || ut["001"])[0];
}
var mt = new RegExp("^".concat(Qe.source, "*")),
  vt = new RegExp("".concat(Qe.source, "*$"));
function bt(e, t) {
  return {
    start: e,
    end: t
  };
}
var ft = !!String.prototype.startsWith && "_a".startsWith("a", 1),
  _t = !!String.fromCodePoint,
  yt = !!Object.fromEntries,
  wt = !!String.prototype.codePointAt,
  $t = !!String.prototype.trimStart,
  At = !!String.prototype.trimEnd,
  Et = !!Number.isSafeInteger ? Number.isSafeInteger : function (e) {
    return "number" == typeof e && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
  },
  xt = !0;
try {
  xt = "a" === (null === (pt = Mt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu").exec("a")) || void 0 === pt ? void 0 : pt[0]);
} catch (U) {
  xt = !1;
}
var Ct,
  Ht = ft ? function (e, t, a) {
    return e.startsWith(t, a);
  } : function (e, t, a) {
    return e.slice(a, a + t.length) === t;
  },
  St = _t ? String.fromCodePoint : function () {
    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    for (var a, s = "", i = e.length, r = 0; i > r;) {
      if ((a = e[r++]) > 1114111) throw RangeError(a + " is not a valid code point");
      s += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(55296 + ((a -= 65536) >> 10), a % 1024 + 56320);
    }
    return s;
  },
  Ot = yt ? Object.fromEntries : function (e) {
    for (var t = {}, a = 0, s = e; a < s.length; a++) {
      var i = s[a],
        r = i[0],
        o = i[1];
      t[r] = o;
    }
    return t;
  },
  Lt = wt ? function (e, t) {
    return e.codePointAt(t);
  } : function (e, t) {
    var a = e.length;
    if (!(t < 0 || t >= a)) {
      var s,
        i = e.charCodeAt(t);
      return i < 55296 || i > 56319 || t + 1 === a || (s = e.charCodeAt(t + 1)) < 56320 || s > 57343 ? i : s - 56320 + (i - 55296 << 10) + 65536;
    }
  },
  Tt = $t ? function (e) {
    return e.trimStart();
  } : function (e) {
    return e.replace(mt, "");
  },
  kt = At ? function (e) {
    return e.trimEnd();
  } : function (e) {
    return e.replace(vt, "");
  };
function Mt(e, t) {
  return new RegExp(e, t);
}
if (xt) {
  var Bt = Mt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Ct = function (e, t) {
    var a;
    return Bt.lastIndex = t, null !== (a = Bt.exec(e)[1]) && void 0 !== a ? a : "";
  };
} else Ct = function (e, t) {
  for (var a = [];;) {
    var s = Lt(e, t);
    if (void 0 === s || Rt(s) || It(s)) break;
    a.push(s), t += s >= 65536 ? 2 : 1;
  }
  return St.apply(void 0, a);
};
var Pt,
  Nt = function () {
    function e(e, t) {
      void 0 === t && (t = {}), this.message = e, this.position = {
        offset: 0,
        line: 1,
        column: 1
      }, this.ignoreTag = !!t.ignoreTag, this.locale = t.locale, this.requiresOtherClause = !!t.requiresOtherClause, this.shouldParseSkeletons = !!t.shouldParseSkeletons;
    }
    return e.prototype.parse = function () {
      if (0 !== this.offset()) throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, e.prototype.parseMessage = function (e, t, a) {
      for (var s = []; !this.isEOF();) {
        var i = this.char();
        if (123 === i) {
          if ((r = this.parseArgument(e, a)).err) return r;
          s.push(r.val);
        } else {
          if (125 === i && e > 0) break;
          if (35 !== i || "plural" !== t && "selectordinal" !== t) {
            if (60 === i && !this.ignoreTag && 47 === this.peek()) {
              if (a) break;
              return this.error(Be.UNMATCHED_CLOSING_TAG, bt(this.clonePosition(), this.clonePosition()));
            }
            if (60 === i && !this.ignoreTag && jt(this.peek() || 0)) {
              if ((r = this.parseTag(e, t)).err) return r;
              s.push(r.val);
            } else {
              var r;
              if ((r = this.parseLiteral(e, t)).err) return r;
              s.push(r.val);
            }
          } else {
            var o = this.clonePosition();
            this.bump(), s.push({
              type: Pe.pound,
              location: bt(o, this.clonePosition())
            });
          }
        }
      }
      return {
        val: s,
        err: null
      };
    }, e.prototype.parseTag = function (e, t) {
      var a = this.clonePosition();
      this.bump();
      var s = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>")) return {
        val: {
          type: Pe.literal,
          value: "<".concat(s, "/>"),
          location: bt(a, this.clonePosition())
        },
        err: null
      };
      if (this.bumpIf(">")) {
        var i = this.parseMessage(e + 1, t, !0);
        if (i.err) return i;
        var r = i.val,
          o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !jt(this.char())) return this.error(Be.INVALID_TAG, bt(o, this.clonePosition()));
          var n = this.clonePosition();
          return s !== this.parseTagName() ? this.error(Be.UNMATCHED_CLOSING_TAG, bt(n, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: Pe.tag,
              value: s,
              children: r,
              location: bt(a, this.clonePosition())
            },
            err: null
          } : this.error(Be.INVALID_TAG, bt(o, this.clonePosition())));
        }
        return this.error(Be.UNCLOSED_TAG, bt(a, this.clonePosition()));
      }
      return this.error(Be.INVALID_TAG, bt(a, this.clonePosition()));
    }, e.prototype.parseTagName = function () {
      var e = this.offset();
      for (this.bump(); !this.isEOF() && Dt(this.char());) this.bump();
      return this.message.slice(e, this.offset());
    }, e.prototype.parseLiteral = function (e, t) {
      for (var a = this.clonePosition(), s = "";;) {
        var i = this.tryParseQuote(t);
        if (i) s += i;else {
          var r = this.tryParseUnquoted(e, t);
          if (r) s += r;else {
            var o = this.tryParseLeftAngleBracket();
            if (!o) break;
            s += o;
          }
        }
      }
      var n = bt(a, this.clonePosition());
      return {
        val: {
          type: Pe.literal,
          value: s,
          location: n
        },
        err: null
      };
    }, e.prototype.tryParseLeftAngleBracket = function () {
      return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (jt(e = this.peek() || 0) || 47 === e) ? null : (this.bump(), "<");
      var e;
    }, e.prototype.tryParseQuote = function (e) {
      if (this.isEOF() || 39 !== this.char()) return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if ("plural" === e || "selectordinal" === e) break;
          return null;
        default:
          return null;
      }
      this.bump();
      var t = [this.char()];
      for (this.bump(); !this.isEOF();) {
        var a = this.char();
        if (39 === a) {
          if (39 !== this.peek()) {
            this.bump();
            break;
          }
          t.push(39), this.bump();
        } else t.push(a);
        this.bump();
      }
      return St.apply(void 0, t);
    }, e.prototype.tryParseUnquoted = function (e, t) {
      if (this.isEOF()) return null;
      var a = this.char();
      return 60 === a || 123 === a || 35 === a && ("plural" === t || "selectordinal" === t) || 125 === a && e > 0 ? null : (this.bump(), St(a));
    }, e.prototype.parseArgument = function (e, t) {
      var a = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF()) return this.error(Be.EXPECT_ARGUMENT_CLOSING_BRACE, bt(a, this.clonePosition()));
      if (125 === this.char()) return this.bump(), this.error(Be.EMPTY_ARGUMENT, bt(a, this.clonePosition()));
      var s = this.parseIdentifierIfPossible().value;
      if (!s) return this.error(Be.MALFORMED_ARGUMENT, bt(a, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF()) return this.error(Be.EXPECT_ARGUMENT_CLOSING_BRACE, bt(a, this.clonePosition()));
      switch (this.char()) {
        case 125:
          return this.bump(), {
            val: {
              type: Pe.argument,
              value: s,
              location: bt(a, this.clonePosition())
            },
            err: null
          };
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(Be.EXPECT_ARGUMENT_CLOSING_BRACE, bt(a, this.clonePosition())) : this.parseArgumentOptions(e, t, s, a);
        default:
          return this.error(Be.MALFORMED_ARGUMENT, bt(a, this.clonePosition()));
      }
    }, e.prototype.parseIdentifierIfPossible = function () {
      var e = this.clonePosition(),
        t = this.offset(),
        a = Ct(this.message, t),
        s = t + a.length;
      return this.bumpTo(s), {
        value: a,
        location: bt(e, this.clonePosition())
      };
    }, e.prototype.parseArgumentOptions = function (e, t, s, i) {
      var r,
        o = this.clonePosition(),
        n = this.parseIdentifierIfPossible().value,
        l = this.clonePosition();
      switch (n) {
        case "":
          return this.error(Be.EXPECT_ARGUMENT_TYPE, bt(o, l));
        case "number":
        case "date":
        case "time":
          this.bumpSpace();
          var h = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var c = this.clonePosition();
            if ((f = this.parseSimpleArgStyleIfPossible()).err) return f;
            if (0 === (g = kt(f.val)).length) return this.error(Be.EXPECT_ARGUMENT_STYLE, bt(this.clonePosition(), this.clonePosition()));
            h = {
              style: g,
              styleLocation: bt(c, this.clonePosition())
            };
          }
          if ((_ = this.tryParseArgumentClose(i)).err) return _;
          var d = bt(i, this.clonePosition());
          if (h && Ht(null == h ? void 0 : h.style, "::", 0)) {
            var p = Tt(h.style.slice(2));
            if ("number" === n) return (f = this.parseNumberSkeletonFromString(p, h.styleLocation)).err ? f : {
              val: {
                type: Pe.number,
                value: s,
                location: d,
                style: f.val
              },
              err: null
            };
            if (0 === p.length) return this.error(Be.EXPECT_DATE_TIME_SKELETON, d);
            var u = p;
            this.locale && (u = function (e, t) {
              for (var a = "", s = 0; s < e.length; s++) {
                var i = e.charAt(s);
                if ("j" === i) {
                  for (var r = 0; s + 1 < e.length && e.charAt(s + 1) === i;) r++, s++;
                  var o = 1 + (1 & r),
                    n = r < 2 ? 1 : 3 + (r >> 1),
                    l = gt(t);
                  for ("H" != l && "k" != l || (n = 0); n-- > 0;) a += "a";
                  for (; o-- > 0;) a = l + a;
                } else a += "J" === i ? "H" : i;
              }
              return a;
            }(p, this.locale));
            var g = {
              type: Ne.dateTime,
              pattern: u,
              location: h.styleLocation,
              parsedOptions: this.shouldParseSkeletons ? et(u) : {}
            };
            return {
              val: {
                type: "date" === n ? Pe.date : Pe.time,
                value: s,
                location: d,
                style: g
              },
              err: null
            };
          }
          return {
            val: {
              type: "number" === n ? Pe.number : "date" === n ? Pe.date : Pe.time,
              value: s,
              location: d,
              style: null !== (r = null == h ? void 0 : h.style) && void 0 !== r ? r : null
            },
            err: null
          };
        case "plural":
        case "selectordinal":
        case "select":
          var m = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(",")) return this.error(Be.EXPECT_SELECT_ARGUMENT_OPTIONS, bt(m, a({}, m)));
          this.bumpSpace();
          var v = this.parseIdentifierIfPossible(),
            b = 0;
          if ("select" !== n && "offset" === v.value) {
            if (!this.bumpIf(":")) return this.error(Be.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, bt(this.clonePosition(), this.clonePosition()));
            var f;
            if (this.bumpSpace(), (f = this.tryParseDecimalInteger(Be.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, Be.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE)).err) return f;
            this.bumpSpace(), v = this.parseIdentifierIfPossible(), b = f.val;
          }
          var _,
            y = this.tryParsePluralOrSelectOptions(e, n, t, v);
          if (y.err) return y;
          if ((_ = this.tryParseArgumentClose(i)).err) return _;
          var w = bt(i, this.clonePosition());
          return "select" === n ? {
            val: {
              type: Pe.select,
              value: s,
              options: Ot(y.val),
              location: w
            },
            err: null
          } : {
            val: {
              type: Pe.plural,
              value: s,
              options: Ot(y.val),
              offset: b,
              pluralType: "plural" === n ? "cardinal" : "ordinal",
              location: w
            },
            err: null
          };
        default:
          return this.error(Be.INVALID_ARGUMENT_TYPE, bt(o, l));
      }
    }, e.prototype.tryParseArgumentClose = function (e) {
      return this.isEOF() || 125 !== this.char() ? this.error(Be.EXPECT_ARGUMENT_CLOSING_BRACE, bt(e, this.clonePosition())) : (this.bump(), {
        val: !0,
        err: null
      });
    }, e.prototype.parseSimpleArgStyleIfPossible = function () {
      for (var e = 0, t = this.clonePosition(); !this.isEOF();) {
        switch (this.char()) {
          case 39:
            this.bump();
            var a = this.clonePosition();
            if (!this.bumpUntil("'")) return this.error(Be.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, bt(a, this.clonePosition()));
            this.bump();
            break;
          case 123:
            e += 1, this.bump();
            break;
          case 125:
            if (!(e > 0)) return {
              val: this.message.slice(t.offset, this.offset()),
              err: null
            };
            e -= 1;
            break;
          default:
            this.bump();
        }
      }
      return {
        val: this.message.slice(t.offset, this.offset()),
        err: null
      };
    }, e.prototype.parseNumberSkeletonFromString = function (e, t) {
      var a = [];
      try {
        a = function (e) {
          if (0 === e.length) throw new Error("Number skeleton cannot be empty");
          for (var t = e.split(tt).filter(function (e) {
              return e.length > 0;
            }), a = [], s = 0, i = t; s < i.length; s++) {
            var r = i[s].split("/");
            if (0 === r.length) throw new Error("Invalid number skeleton");
            for (var o = r[0], n = r.slice(1), l = 0, h = n; l < h.length; l++) if (0 === h[l].length) throw new Error("Invalid number skeleton");
            a.push({
              stem: o,
              options: n
            });
          }
          return a;
        }(e);
      } catch (e) {
        return this.error(Be.INVALID_NUMBER_SKELETON, t);
      }
      return {
        val: {
          type: Ne.number,
          tokens: a,
          location: t,
          parsedOptions: this.shouldParseSkeletons ? dt(a) : {}
        },
        err: null
      };
    }, e.prototype.tryParsePluralOrSelectOptions = function (e, t, a, s) {
      for (var i, r = !1, o = [], n = new Set(), l = s.value, h = s.location;;) {
        if (0 === l.length) {
          var c = this.clonePosition();
          if ("select" === t || !this.bumpIf("=")) break;
          var d = this.tryParseDecimalInteger(Be.EXPECT_PLURAL_ARGUMENT_SELECTOR, Be.INVALID_PLURAL_ARGUMENT_SELECTOR);
          if (d.err) return d;
          h = bt(c, this.clonePosition()), l = this.message.slice(c.offset, this.offset());
        }
        if (n.has(l)) return this.error("select" === t ? Be.DUPLICATE_SELECT_ARGUMENT_SELECTOR : Be.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, h);
        "other" === l && (r = !0), this.bumpSpace();
        var p = this.clonePosition();
        if (!this.bumpIf("{")) return this.error("select" === t ? Be.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : Be.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, bt(this.clonePosition(), this.clonePosition()));
        var u = this.parseMessage(e + 1, t, a);
        if (u.err) return u;
        var g = this.tryParseArgumentClose(p);
        if (g.err) return g;
        o.push([l, {
          value: u.val,
          location: bt(p, this.clonePosition())
        }]), n.add(l), this.bumpSpace(), l = (i = this.parseIdentifierIfPossible()).value, h = i.location;
      }
      return 0 === o.length ? this.error("select" === t ? Be.EXPECT_SELECT_ARGUMENT_SELECTOR : Be.EXPECT_PLURAL_ARGUMENT_SELECTOR, bt(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !r ? this.error(Be.MISSING_OTHER_CLAUSE, bt(this.clonePosition(), this.clonePosition())) : {
        val: o,
        err: null
      };
    }, e.prototype.tryParseDecimalInteger = function (e, t) {
      var a = 1,
        s = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (a = -1);
      for (var i = !1, r = 0; !this.isEOF();) {
        var o = this.char();
        if (!(o >= 48 && o <= 57)) break;
        i = !0, r = 10 * r + (o - 48), this.bump();
      }
      var n = bt(s, this.clonePosition());
      return i ? Et(r *= a) ? {
        val: r,
        err: null
      } : this.error(t, n) : this.error(e, n);
    }, e.prototype.offset = function () {
      return this.position.offset;
    }, e.prototype.isEOF = function () {
      return this.offset() === this.message.length;
    }, e.prototype.clonePosition = function () {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, e.prototype.char = function () {
      var e = this.position.offset;
      if (e >= this.message.length) throw Error("out of bound");
      var t = Lt(this.message, e);
      if (void 0 === t) throw Error("Offset ".concat(e, " is at invalid UTF-16 code unit boundary"));
      return t;
    }, e.prototype.error = function (e, t) {
      return {
        val: null,
        err: {
          kind: e,
          message: this.message,
          location: t
        }
      };
    }, e.prototype.bump = function () {
      if (!this.isEOF()) {
        var e = this.char();
        10 === e ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
      }
    }, e.prototype.bumpIf = function (e) {
      if (Ht(this.message, e, this.offset())) {
        for (var t = 0; t < e.length; t++) this.bump();
        return !0;
      }
      return !1;
    }, e.prototype.bumpUntil = function (e) {
      var t = this.offset(),
        a = this.message.indexOf(e, t);
      return a >= 0 ? (this.bumpTo(a), !0) : (this.bumpTo(this.message.length), !1);
    }, e.prototype.bumpTo = function (e) {
      if (this.offset() > e) throw Error("targetOffset ".concat(e, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (e = Math.min(e, this.message.length);;) {
        var t = this.offset();
        if (t === e) break;
        if (t > e) throw Error("targetOffset ".concat(e, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF()) break;
      }
    }, e.prototype.bumpSpace = function () {
      for (; !this.isEOF() && Rt(this.char());) this.bump();
    }, e.prototype.peek = function () {
      if (this.isEOF()) return null;
      var e = this.char(),
        t = this.offset(),
        a = this.message.charCodeAt(t + (e >= 65536 ? 2 : 1));
      return null != a ? a : null;
    }, e;
  }();
function jt(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Dt(e) {
  return 45 === e || 46 === e || e >= 48 && e <= 57 || 95 === e || e >= 97 && e <= 122 || e >= 65 && e <= 90 || 183 == e || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function Rt(e) {
  return e >= 9 && e <= 13 || 32 === e || 133 === e || e >= 8206 && e <= 8207 || 8232 === e || 8233 === e;
}
function It(e) {
  return e >= 33 && e <= 35 || 36 === e || e >= 37 && e <= 39 || 40 === e || 41 === e || 42 === e || 43 === e || 44 === e || 45 === e || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || 91 === e || 92 === e || 93 === e || 94 === e || 96 === e || 123 === e || 124 === e || 125 === e || 126 === e || 161 === e || e >= 162 && e <= 165 || 166 === e || 167 === e || 169 === e || 171 === e || 172 === e || 174 === e || 176 === e || 177 === e || 182 === e || 187 === e || 191 === e || 215 === e || 247 === e || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || 8216 === e || 8217 === e || 8218 === e || e >= 8219 && e <= 8220 || 8221 === e || 8222 === e || 8223 === e || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || 8249 === e || 8250 === e || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || 8260 === e || 8261 === e || 8262 === e || e >= 8263 && e <= 8273 || 8274 === e || 8275 === e || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || 8608 === e || e >= 8609 && e <= 8610 || 8611 === e || e >= 8612 && e <= 8613 || 8614 === e || e >= 8615 && e <= 8621 || 8622 === e || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || 8658 === e || 8659 === e || 8660 === e || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || 8968 === e || 8969 === e || 8970 === e || 8971 === e || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || 9001 === e || 9002 === e || e >= 9003 && e <= 9083 || 9084 === e || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || 9655 === e || e >= 9656 && e <= 9664 || 9665 === e || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || 9839 === e || e >= 9840 && e <= 10087 || 10088 === e || 10089 === e || 10090 === e || 10091 === e || 10092 === e || 10093 === e || 10094 === e || 10095 === e || 10096 === e || 10097 === e || 10098 === e || 10099 === e || 10100 === e || 10101 === e || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || 10181 === e || 10182 === e || e >= 10183 && e <= 10213 || 10214 === e || 10215 === e || 10216 === e || 10217 === e || 10218 === e || 10219 === e || 10220 === e || 10221 === e || 10222 === e || 10223 === e || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || 10627 === e || 10628 === e || 10629 === e || 10630 === e || 10631 === e || 10632 === e || 10633 === e || 10634 === e || 10635 === e || 10636 === e || 10637 === e || 10638 === e || 10639 === e || 10640 === e || 10641 === e || 10642 === e || 10643 === e || 10644 === e || 10645 === e || 10646 === e || 10647 === e || 10648 === e || e >= 10649 && e <= 10711 || 10712 === e || 10713 === e || 10714 === e || 10715 === e || e >= 10716 && e <= 10747 || 10748 === e || 10749 === e || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || 11158 === e || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || 11778 === e || 11779 === e || 11780 === e || 11781 === e || e >= 11782 && e <= 11784 || 11785 === e || 11786 === e || 11787 === e || 11788 === e || 11789 === e || e >= 11790 && e <= 11798 || 11799 === e || e >= 11800 && e <= 11801 || 11802 === e || 11803 === e || 11804 === e || 11805 === e || e >= 11806 && e <= 11807 || 11808 === e || 11809 === e || 11810 === e || 11811 === e || 11812 === e || 11813 === e || 11814 === e || 11815 === e || 11816 === e || 11817 === e || e >= 11818 && e <= 11822 || 11823 === e || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || 11840 === e || 11841 === e || 11842 === e || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || 11858 === e || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || 12296 === e || 12297 === e || 12298 === e || 12299 === e || 12300 === e || 12301 === e || 12302 === e || 12303 === e || 12304 === e || 12305 === e || e >= 12306 && e <= 12307 || 12308 === e || 12309 === e || 12310 === e || 12311 === e || 12312 === e || 12313 === e || 12314 === e || 12315 === e || 12316 === e || 12317 === e || e >= 12318 && e <= 12319 || 12320 === e || 12336 === e || 64830 === e || 64831 === e || e >= 65093 && e <= 65094;
}
function Vt(e) {
  e.forEach(function (e) {
    if (delete e.location, We(e) || Ze(e)) for (var t in e.options) delete e.options[t].location, Vt(e.options[t].value);else Ge(e) && Ke(e.style) || (Fe(e) || ze(e)) && Ye(e.style) ? delete e.style.location : Xe(e) && Vt(e.children);
  });
}
function Ut(e, t) {
  void 0 === t && (t = {}), t = a({
    shouldParseSkeletons: !0,
    requiresOtherClause: !0
  }, t);
  var s = new Nt(e, t).parse();
  if (s.err) {
    var i = SyntaxError(Be[s.err.kind]);
    throw i.location = s.err.location, i.originalMessage = s.err.message, i;
  }
  return (null == t ? void 0 : t.captureLocation) || Vt(s.val), s.val;
}
!function (e) {
  e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API";
}(Pt || (Pt = {}));
var Gt,
  Ft = function (e) {
    function a(t, a, s) {
      var i = e.call(this, t) || this;
      return i.code = a, i.originalMessage = s, i;
    }
    return t(a, e), a.prototype.toString = function () {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, a;
  }(Error),
  zt = function (e) {
    function a(t, a, s, i) {
      return e.call(this, 'Invalid values for "'.concat(t, '": "').concat(a, '". Options are "').concat(Object.keys(s).join('", "'), '"'), Pt.INVALID_VALUE, i) || this;
    }
    return t(a, e), a;
  }(Ft),
  Wt = function (e) {
    function a(t, a, s) {
      return e.call(this, 'Value for "'.concat(t, '" must be of type ').concat(a), Pt.INVALID_VALUE, s) || this;
    }
    return t(a, e), a;
  }(Ft),
  Zt = function (e) {
    function a(t, a) {
      return e.call(this, 'The intl string context variable "'.concat(t, '" was not provided to the string "').concat(a, '"'), Pt.MISSING_VALUE, a) || this;
    }
    return t(a, e), a;
  }(Ft);
function qt(e) {
  return "function" == typeof e;
}
function Xt(e, t, a, s, i, r, o) {
  if (1 === e.length && Ve(e[0])) return [{
    type: Gt.literal,
    value: e[0].value
  }];
  for (var n = [], l = 0, h = e; l < h.length; l++) {
    var c = h[l];
    if (Ve(c)) n.push({
      type: Gt.literal,
      value: c.value
    });else if (qe(c)) "number" == typeof r && n.push({
      type: Gt.literal,
      value: a.getNumberFormat(t).format(r)
    });else {
      var d = c.value;
      if (!i || !(d in i)) throw new Zt(d, o);
      var p = i[d];
      if (Ue(c)) p && "string" != typeof p && "number" != typeof p || (p = "string" == typeof p || "number" == typeof p ? String(p) : ""), n.push({
        type: "string" == typeof p ? Gt.literal : Gt.object,
        value: p
      });else if (Fe(c)) {
        var u = "string" == typeof c.style ? s.date[c.style] : Ye(c.style) ? c.style.parsedOptions : void 0;
        n.push({
          type: Gt.literal,
          value: a.getDateTimeFormat(t, u).format(p)
        });
      } else if (ze(c)) {
        u = "string" == typeof c.style ? s.time[c.style] : Ye(c.style) ? c.style.parsedOptions : s.time.medium;
        n.push({
          type: Gt.literal,
          value: a.getDateTimeFormat(t, u).format(p)
        });
      } else if (Ge(c)) {
        (u = "string" == typeof c.style ? s.number[c.style] : Ke(c.style) ? c.style.parsedOptions : void 0) && u.scale && (p *= u.scale || 1), n.push({
          type: Gt.literal,
          value: a.getNumberFormat(t, u).format(p)
        });
      } else {
        if (Xe(c)) {
          var g = c.children,
            m = c.value,
            v = i[m];
          if (!qt(v)) throw new Wt(m, "function", o);
          var b = v(Xt(g, t, a, s, i, r).map(function (e) {
            return e.value;
          }));
          Array.isArray(b) || (b = [b]), n.push.apply(n, b.map(function (e) {
            return {
              type: "string" == typeof e ? Gt.literal : Gt.object,
              value: e
            };
          }));
        }
        if (We(c)) {
          if (!(f = c.options[p] || c.options.other)) throw new zt(c.value, p, Object.keys(c.options), o);
          n.push.apply(n, Xt(f.value, t, a, s, i));
        } else if (Ze(c)) {
          var f;
          if (!(f = c.options["=".concat(p)])) {
            if (!Intl.PluralRules) throw new Ft('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', Pt.MISSING_INTL_API, o);
            var _ = a.getPluralRules(t, {
              type: c.pluralType
            }).select(p - (c.offset || 0));
            f = c.options[_] || c.options.other;
          }
          if (!f) throw new zt(c.value, p, Object.keys(c.options), o);
          n.push.apply(n, Xt(f.value, t, a, s, i, p - (c.offset || 0)));
        } else ;
      }
    }
  }
  return function (e) {
    return e.length < 2 ? e : e.reduce(function (e, t) {
      var a = e[e.length - 1];
      return a && a.type === Gt.literal && t.type === Gt.literal ? a.value += t.value : e.push(t), e;
    }, []);
  }(n);
}
function Kt(e, t) {
  return t ? Object.keys(e).reduce(function (s, i) {
    var r, o;
    return s[i] = (r = e[i], (o = t[i]) ? a(a(a({}, r || {}), o || {}), Object.keys(r).reduce(function (e, t) {
      return e[t] = a(a({}, r[t]), o[t] || {}), e;
    }, {})) : r), s;
  }, a({}, e)) : e;
}
function Yt(e) {
  return {
    create: function () {
      return {
        get: function (t) {
          return e[t];
        },
        set: function (t, a) {
          e[t] = a;
        }
      };
    }
  };
}
!function (e) {
  e[e.literal = 0] = "literal", e[e.object = 1] = "object";
}(Gt || (Gt = {}));
var Qt,
  Jt = function () {
    function e(t, i, o, n) {
      void 0 === i && (i = e.defaultLocale);
      var l,
        h = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function (e) {
        var t = h.formatToParts(e);
        if (1 === t.length) return t[0].value;
        var a = t.reduce(function (e, t) {
          return e.length && t.type === Gt.literal && "string" == typeof e[e.length - 1] ? e[e.length - 1] += t.value : e.push(t.value), e;
        }, []);
        return a.length <= 1 ? a[0] || "" : a;
      }, this.formatToParts = function (e) {
        return Xt(h.ast, h.locales, h.formatters, h.formats, e, void 0, h.message);
      }, this.resolvedOptions = function () {
        var e;
        return {
          locale: (null === (e = h.resolvedLocale) || void 0 === e ? void 0 : e.toString()) || Intl.NumberFormat.supportedLocalesOf(h.locales)[0]
        };
      }, this.getAst = function () {
        return h.ast;
      }, this.locales = i, this.resolvedLocale = e.resolveLocale(i), "string" == typeof t) {
        if (this.message = t, !e.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var c = n || {};
        c.formatters;
        var d = s(c, ["formatters"]);
        this.ast = e.__parse(t, a(a({}, d), {
          locale: this.resolvedLocale
        }));
      } else this.ast = t;
      if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
      this.formats = Kt(e.formats, o), this.formatters = n && n.formatters || (void 0 === (l = this.formatterCache) && (l = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }), {
        getNumberFormat: Oe(function () {
          for (var e, t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
          return new ((e = Intl.NumberFormat).bind.apply(e, r([void 0], t, !1)))();
        }, {
          cache: Yt(l.number),
          strategy: Ie.variadic
        }),
        getDateTimeFormat: Oe(function () {
          for (var e, t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
          return new ((e = Intl.DateTimeFormat).bind.apply(e, r([void 0], t, !1)))();
        }, {
          cache: Yt(l.dateTime),
          strategy: Ie.variadic
        }),
        getPluralRules: Oe(function () {
          for (var e, t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
          return new ((e = Intl.PluralRules).bind.apply(e, r([void 0], t, !1)))();
        }, {
          cache: Yt(l.pluralRules),
          strategy: Ie.variadic
        })
      });
    }
    return Object.defineProperty(e, "defaultLocale", {
      get: function () {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), e.memoizedDefaultLocale = null, e.resolveLocale = function (e) {
      if (void 0 !== Intl.Locale) {
        var t = Intl.NumberFormat.supportedLocalesOf(e);
        return t.length > 0 ? new Intl.Locale(t[0]) : new Intl.Locale("string" == typeof e ? e : e[0]);
      }
    }, e.__parse = Ut, e.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, e;
  }(),
  ea = {
    en: Se
  };
function ta(e, t, ...a) {
  const s = t.replace(/['"]+/g, "");
  var i;
  try {
    i = e.split(".").reduce((e, t) => e[t], ea[s]);
  } catch (t) {
    i = e.split(".").reduce((e, t) => e[t], ea.en);
  }
  if (void 0 === i && (i = e.split(".").reduce((e, t) => e[t], ea.en)), !a.length) return i;
  const r = {};
  for (let e = 0; e < a.length; e += 2) {
    let t = a[e];
    t = t.replace(/^{([^}]+)?}$/, "$1"), r[t] = a[e + 1];
  }
  try {
    return new Jt(i, t).format(r);
  } catch (e) {
    return "Translation " + e;
  }
}
!function (e) {
  e.ArmedAway = "armed_away", e.ArmedHome = "armed_home", e.ArmedNight = "armed_night", e.ArmedVacation = "armed_vacation", e.ArmedCustom = "armed_custom_bypass";
}(Qt || (Qt = {}));
const aa = "midnight_911_frontend_plugin",
  sa = (e, t) => e.connection.subscribeMessage(() => t(), {
    type: "config_entries/subscribe"
  }),
  ia = e => e.callWS({
    type: `${aa}/areas`
  }),
  ra = (e, t) => {
    const {
        enabled_modes: a,
        mode_timers: s
      } = (e => {
        const t = [],
          a = {};
        return e && Object.entries(e).forEach(([e, s]) => {
          var i, r, o;
          (null == s ? void 0 : s.enabled) && t.push(e), a[e] = {
            exit_time: null !== (i = null == s ? void 0 : s.exit_time) && void 0 !== i ? i : 60,
            entry_time: null !== (r = null == s ? void 0 : s.entry_time) && void 0 !== r ? r : 60,
            trigger_time: null !== (o = null == s ? void 0 : s.trigger_time) && void 0 !== o ? o : 1800
          };
        }), {
          enabled_modes: t,
          mode_timers: a
        };
      })(t.modes),
      i = {
        name: t.name,
        enabled_modes: a.length ? a : ["armed_away", "armed_home"],
        mode_timers: s
      };
    return t.area_id ? e.callWS(Object.assign({
      type: `${aa}/area/update`,
      area_id: t.area_id
    }, i)) : e.callWS(Object.assign({
      type: `${aa}/area/create`
    }, i));
  },
  oa = async e => {
    const t = await e.callWS({
        type: `${aa}/sensors`
      }),
      a = {};
    return Object.entries(t).forEach(([e, t]) => {
      a[e] = ((e, t) => {
        var a, s, i, r, o, n, l, h, c;
        return {
          entity_id: e,
          type: null !== (a = t.sensor_type) && void 0 !== a ? a : "other",
          modes: null !== (s = t.modes) && void 0 !== s ? s : [],
          use_exit_delay: null === (i = t.use_exit_delay) || void 0 === i || i,
          use_entry_delay: null === (r = t.use_entry_delay) || void 0 === r || r,
          arm_on_close: null !== (o = t.arm_on_close) && void 0 !== o && o,
          allow_open: null !== (n = t.allow_open) && void 0 !== n && n,
          always_on: null !== (l = t.always_on) && void 0 !== l && l,
          area: t.area,
          entry_delay: null !== (h = t.entry_delay) && void 0 !== h ? h : null,
          delay_on: null !== (c = t.delay_on) && void 0 !== c ? c : null
        };
      })(e, t);
    }), a;
  },
  na = e => e.callWS({
    type: `${aa}/users`
  }),
  la = e => e.callWS({
    type: `${aa}/sensor_groups`
  });
var ha = "M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  ca = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  da = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
  pa = "M12,3C10.89,3 10,3.89 10,5H3V19H2V21H22V19H21V5C21,3.89 20.11,3 19,3H12M12,5H19V19H12V5M5,11H7V13H5V11Z",
  ua = "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",
  ga = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
  ma = "M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z",
  va = "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z",
  ba = "M6,8H10V6H14V8H18V4H6V8M18,10H6V15H18V10M6,20H18V17H6V20M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z";
const fa = {
  ArmedAway: "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z",
  ArmedHome: ga,
  ArmedNight: "M2 12A10 10 0 0 0 15 21.54A10 10 0 0 1 15 2.46A10 10 0 0 0 2 12Z",
  ArmedCustom: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z",
  ArmedVacation: "M20.56 3.91C21.15 4.5 21.15 5.45 20.56 6.03L16.67 9.92L18.79 19.11L17.38 20.53L13.5 13.1L9.6 17L9.96 19.47L8.89 20.53L7.13 17.35L3.94 15.58L5 14.5L7.5 14.87L11.37 11L3.94 7.09L5.36 5.68L14.55 7.8L18.44 3.91C19 3.33 20 3.33 20.56 3.91Z"
};
var _a, ya, wa;
!function (e) {
  e.STATE_ALARM_DISARMED = "disarmed", e.STATE_ALARM_ARMED_HOME = "armed_home", e.STATE_ALARM_ARMED_AWAY = "armed_away", e.STATE_ALARM_ARMED_NIGHT = "armed_night", e.STATE_ALARM_ARMED_CUSTOM_BYPASS = "armed_custom_bypass", e.STATE_ALARM_ARMED_VACATION = "armed_vacation", e.STATE_ALARM_PENDING = "pending", e.STATE_ALARM_ARMING = "arming", e.STATE_ALARM_TRIGGERED = "triggered";
}(_a || (_a = {})), function (e) {
  e.COMMAND_ALARM_DISARM = "disarm", e.COMMAND_ALARM_ARM_HOME = "arm_home", e.COMMAND_ALARM_ARM_AWAY = "arm_away", e.COMMAND_ALARM_ARM_NIGHT = "arm_night", e.COMMAND_ALARM_ARM_CUSTOM_BYPASS = "arm_custom_bypass", e.COMMAND_ALARM_ARM_VACATION = "arm_vacation";
}(ya || (ya = {})), function (e) {
  e.Door = "door", e.Window = "window", e.Motion = "motion", e.Tamper = "tamper", e.Environmental = "environmental", e.Other = "other";
}(wa || (wa = {}));
const $a = {
    Door: "M16,11H18V13H16V11M12,3H19C20.11,3 21,3.89 21,5V19H22V21H2V19H10V5C10,3.89 10.89,3 12,3M12,5V19H19V5H12Z",
    Window: "M6,11H10V9H14V11H18V4H6V11M18,13H6V20H18V13M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2Z",
    Motion: "M11.4 8.2H15V10H13.2L11.4 8.2M19.67 1H18.33C18.33 3.58 20.42 5.67 23 5.67V4.33C21.16 4.33 19.67 2.84 19.67 1M21 1C21 2.11 21.9 3 23 3V1H21M17 1H15.67C15.67 5.05 18.95 8.33 23 8.33V7C19.69 7 17 4.31 17 1M10 3.8C11 3.8 11.8 3 11.8 2S11 .2 10 .2 8.2 1 8.2 2 9 3.8 10 3.8M2.39 1.73L1.11 3L3.46 5.35L2 5.8V11H3.8V7.33L5.05 6.94L5.68 7.57L2 22H3.8L6.67 13.89L9 17V22H10.8V15.59L8.31 11.05L8.5 10.37L20.84 22.73L22.11 21.46L2.39 1.73M9.38 4.87C9.08 4.37 8.54 4.03 7.92 4.03C7.75 4.03 7.58 4.06 7.42 4.11L7.34 4.14L11.35 8.15L9.38 4.87Z",
    Tamper: "M17,19H7V5H17M17,3H7A2,2 0 0,0 5,5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V5C19,3.89 18.1,3 17,3Z",
    Environmental: ua,
    Other: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
  },
  Aa = {
    Door: pa,
    Window: ba,
    Motion: "M10,0.2C9,0.2 8.2,1 8.2,2C8.2,3 9,3.8 10,3.8C11,3.8 11.8,3 11.8,2C11.8,1 11,0.2 10,0.2M15.67,1A7.33,7.33 0 0,0 23,8.33V7A6,6 0 0,1 17,1H15.67M18.33,1C18.33,3.58 20.42,5.67 23,5.67V4.33C21.16,4.33 19.67,2.84 19.67,1H18.33M21,1A2,2 0 0,0 23,3V1H21M7.92,4.03C7.75,4.03 7.58,4.06 7.42,4.11L2,5.8V11H3.8V7.33L5.91,6.67L2,22H3.8L6.67,13.89L9,17V22H10.8V15.59L8.31,11.05L9.04,8.18L10.12,10H15V8.2H11.38L9.38,4.87C9.08,4.37 8.54,4.03 7.92,4.03Z",
    Tamper: va,
    Environmental: "M15.66 11.2C15.43 10.9 15.15 10.64 14.89 10.38C14.22 9.78 13.46 9.35 12.82 8.72C11.33 7.26 11 4.85 11.95 3C11 3.23 10.17 3.75 9.46 4.32C6.87 6.4 5.85 10.07 7.07 13.22C7.11 13.32 7.15 13.42 7.15 13.55C7.15 13.77 7 13.97 6.8 14.05C6.57 14.15 6.33 14.09 6.14 13.93C6.08 13.88 6.04 13.83 6 13.76C4.87 12.33 4.69 10.28 5.45 8.64C3.78 10 2.87 12.3 3 14.47C3.06 14.97 3.12 15.47 3.29 15.97C3.43 16.57 3.7 17.17 4 17.7C5.08 19.43 6.95 20.67 8.96 20.92C11.1 21.19 13.39 20.8 15.03 19.32C16.86 17.66 17.5 15 16.56 12.72L16.43 12.46C16.22 12 15.66 11.2 15.66 11.2M12.5 17.5C12.22 17.74 11.76 18 11.4 18.1C10.28 18.5 9.16 17.94 8.5 17.28C9.69 17 10.4 16.12 10.61 15.23C10.78 14.43 10.46 13.77 10.33 13C10.21 12.26 10.23 11.63 10.5 10.94C10.69 11.32 10.89 11.7 11.13 12C11.9 13 13.11 13.44 13.37 14.8C13.41 14.94 13.43 15.08 13.43 15.23C13.46 16.05 13.1 16.95 12.5 17.5H12.5M21 13H19V7H21V13M21 17H19V15H21V17Z",
    Other: ha
  },
  Ea = (e, t, a, s) => {
    s = s || {}, a = null == a ? {} : a;
    const i = new Event(t, {
      bubbles: void 0 === s.bubbles || s.bubbles,
      cancelable: Boolean(s.cancelable),
      composed: void 0 === s.composed || s.composed
    });
    return i.detail = a, e.dispatchEvent(i), i;
  };
function xa(e) {
  return (e = e.replace("_", " ")).charAt(0).toUpperCase() + e.slice(1);
}
function Ca(e) {
  return e ? e.attributes && e.attributes.friendly_name ? e.attributes.friendly_name : String(e.entity_id.split(".").pop()) : "(unrecognized entity)";
}
function Ha(e) {
  let t = [];
  return e.forEach(e => {
    t.find(t => "object" == typeof e ? function (...e) {
      return e.every(t => JSON.stringify(t) === JSON.stringify(e[0]));
    }(t, e) : t === e) || t.push(e);
  }), t;
}
const Sa = (e, ...t) => {
  const a = {};
  let s;
  for (s in e) t.includes(s) || (a[s] = e[s]);
  return a;
};
function Oa(e) {
  return null != e;
}
function La(e, t) {
  const a = e instanceof HTMLElement ? e : e.target;
  Ea(a, "show-dialog", {
    dialogTag: "error-dialog",
    dialogImport: () => Promise.resolve().then(function () {
      return ps;
    }),
    dialogParams: {
      error: t
    }
  });
}
function Ta(e, t) {
  La(t, q`
    <b>Something went wrong!</b>
    <br />
    ${(null == e ? void 0 : e.message) ? q`
          ${e.message}
          <br />
          <br />
        ` : ""}
    Please
    <a href="https://github.com/midnight-security/alarmo/issues">report</a>
    the bug.
  `);
}
function ka(e, t) {
  const a = e => "object" == typeof e ? a(e.name) : e.trim().toLowerCase();
  return a(e) < a(t) ? -1 : 1;
}
const Ma = (e, t, a = !1) => {
    a ? history.replaceState(null, "", t) : history.pushState(null, "", t), Ea(window, "location-changed", {
      replace: a
    });
  },
  Ba = e => {
    class t extends e {
      connectedCallback() {
        super.connectedCallback(), this.__checkSubscribed();
      }
      disconnectedCallback() {
        if (super.disconnectedCallback(), this.__unsubs) {
          for (; this.__unsubs.length;) {
            const e = this.__unsubs.pop();
            e instanceof Promise ? e.then(e => e()) : e();
          }
          this.__unsubs = void 0;
        }
      }
      updated(e) {
        super.updated(e), e.has("hass") && this.__checkSubscribed();
      }
      hassSubscribe() {
        return [];
      }
      __checkSubscribed() {
        void 0 === this.__unsubs && this.isConnected && void 0 !== this.hass && (this.__unsubs = this.hassSubscribe());
      }
    }
    return i([be({
      attribute: !1
    })], t.prototype, "hass", void 0), t;
  },
  Pa = 60;
let Na = class extends pe {
  constructor() {
    super(...arguments), this.min = 0, this.max = 300, this.value = 0, this.step = 15, this.disabled = !1, this.showArrows = !0, this.required = !1;
  }
  render() {
    return q`
      <div class="wrapper">
        ${this.required ? K : q`
        <div class="column">
          <ha-checkbox
            @change=${this._toggleEnableClick}
            ?checked=${!this.disabled}
          >
          </ha-checkbox>`}
        </div>
        <div class="column">
          <div class="row">
          <ha-input
            id="minutes"
            inputmode="numeric"
            .value=${this.disabled ? this.placeholder : this._getMinutes()}
            label=""
            @input=${this._minutesChanged}
            @focusin=${this._onFocus}
            no-spinner
            .autoValidate=${!0}
            maxlength="1"
            min="0"
            .max=${Math.floor(this.max / Pa)}
            .disabled=${this.disabled}
            .validityTransform=${this._validateMinutesInput}
          >
          </ha-input>
          <div class="time-separator">:</div>
          </div>
          <span class="label">${ta("components.time_picker.minutes", this.hass.language)}</span>
        </div>
        <div class="column">
          <ha-input
            id="seconds"
            inputmode="numeric"
            .value=${this.disabled ? this.placeholder : this._getSeconds()}
            label=""
            @input=${this._secondsChanged}
            @focusin=${this._onFocus}
            no-spinner
            .autoValidate=${!0}
            maxlength="2"
            min="0"
            max="59"
            .disabled=${this.disabled}
            .validityTransform=${this._validateSecondsInput}
          >
          </ha-input>
          <span class="label">${ta("components.time_picker.seconds", this.hass.language)}</span>
        </div>
        ${this.showArrows ? q`
        <div class="column">
          <wa-button
            appearance="plain"
            variant="brand"
            size="medium"
            ?disabled=${this.disabled}
            @click=${this._secondsUpClick}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </wa-button>
          <wa-button
            appearance="plain"
            variant="brand"
            size="medium"
            ?disabled=${this.disabled}
            @click=${this._secondsDownClick}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </wa-button>` : K}
        </div>
      </div>
    `;
  }
  _getMinutes() {
    return Math.floor(this.value / Pa);
  }
  _getSeconds() {
    return this.value % Pa;
  }
  _minutesChanged(e) {
    let t = Number(e.target.value),
      a = t * Pa + this._getSeconds();
    a < this.min && (a = this.min, t = Math.floor(a / Pa), e.target.value = String(t)), a > this.max && (a = this.max, t = Math.floor(a / Pa), e.target.value = String(t)), this.value = a, this._valueChanged();
  }
  _secondsChanged(e) {
    let t = Number(e.target.value);
    t >= Pa && (t = 59, e.target.value = String(t));
    let a = this._getMinutes() * Pa + t;
    a < this.min && (a = this.min, t = this.value % Pa, e.target.value = String(t)), a > this.max && (a = this.max, t = this.value % Pa, e.target.value = String(t)), this.value = a, this._valueChanged();
  }
  _validateMinutesInput(e, t) {
    let a = null !== e.match(/^[0-9]+$/);
    return {
      valid: a,
      customError: !a
    };
  }
  _validateSecondsInput(e, t) {
    let a = null !== e.match(/^[0-9]+$/);
    return {
      valid: a,
      customError: !a
    };
  }
  _secondsUpClick() {
    let e = Math.round(this.value / this.step) * this.step;
    e += this.step, e > this.max && (e = this.max), this.value = e, this._valueChanged();
  }
  _secondsDownClick() {
    let e = Math.round(this.value / this.step) * this.step;
    e -= this.step, e < this.min && (e = this.min), this.value = e, this._valueChanged();
  }
  _toggleEnableClick(e) {
    const t = e.target.checked;
    this.disabled = !t, e.target.blur(), this._valueChanged();
  }
  _onFocus(e) {
    e.currentTarget.select();
  }
  _valueChanged() {
    let e = this.disabled ? null : this.value;
    Ea(this, "value-changed", {
      value: e
    });
  }
};
Na.styles = d`
    :host {
      display: flex;
      padding: 8px 0px;
    }
    div.wrapper {
      display: flex;
      flex-direction: row;
      gap: 0px;
    }
    :host([required]) div.wrapper {
      margin-left: 10px;
    }
    ha-checkbox {
      margin-top: 18px;
    }
    ha-input {
      width: 70px;
      height: 56px;
      --ha-input-padding-top: 0px;
      --ha-input-padding-bottom: 0px;
      --ha-input-text-align: center;
      --wa-form-control-value-font-size: 16px;
    }
    ha-input::part(wa-input) {
      text-align: center;
    }
    ha-input#minutes::part(wa-base) {
      border-top-right-radius: 0px;
    }
    ha-input#seconds::part(wa-base) {
      border-top-left-radius: 0px;
    }
    .time-separator {
      background-color: var(--ha-color-form-background);
      color: var(--ha-color-text-secondary);
      border-bottom: 1px solid var(--ha-color-border-neutral-loud);
      box-sizing: border-box;
      height: 56px;
      width: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      transition: background 0.15s ease-in-out;
    }
    :host([disabled]) .time-separator {
      background-color: var(--ha-color-form-background-disabled);
      opacity: 0.5;
    }
    div.column {
      display: flex;
      flex-direction: column;
    }
    div.column > * {
      display: flex;
    }
    div.row {
      display: flex;
      flex-direction: row;
    }
    wa-button {
      width: 30px;
      height: 30px;
      --wa-form-control-border-radius: 8px;
      margin-left: 4px;
    }
    wa-button ha-icon {
      color: var(--wa-color-on-normal);
    }
    span.label {
      display: flex;
      padding: 2px 0px 0px 0px;
      justify-content: center;
      color: rgba(var(--rgb-primary-text-color), 0.6);
      font-size: 0.9rem;
    }
  `, i([be({
  attribute: !1
})], Na.prototype, "hass", void 0), i([be({
  type: Number
})], Na.prototype, "min", void 0), i([be({
  type: Number
})], Na.prototype, "max", void 0), i([be({
  type: Number
})], Na.prototype, "value", void 0), i([be({
  type: Number
})], Na.prototype, "step", void 0), i([be({
  type: Boolean
})], Na.prototype, "disabled", void 0), i([be({
  type: Boolean
})], Na.prototype, "showArrows", void 0), i([be({
  type: String
})], Na.prototype, "placeholder", void 0), i([be({
  type: Boolean
})], Na.prototype, "required", void 0), Na = i([ge("alarmo-duration-picker")], Na);
const ja = [{
  name: "primary",
  weight: 10
}, {
  name: "secondary",
  weight: 8
}];
let Da = class extends pe {
  constructor() {
    super(...arguments), this.label = "", this.items = [], this.disabled = !1, this.showSearch = !1, this.clearable = !1, this.invalid = !1, this._valueRenderer = e => {
      const t = this.items.find(t => t.value === e);
      return q`
      ${(null == t ? void 0 : t.icon) ? q`<ha-icon slot="start" .icon=${t.icon}></ha-icon>` : K}
      <span slot="headline">
        ${t ? t.name : e}
      </span>
    `;
    }, this._getItems = () => this.items.map(e => Object({
      id: e.value,
      primary: e.name,
      secondary: e.description,
      icon: e.icon
    }));
  }
  render() {
    if (this.showSearch) return q`
      <ha-generic-picker
        .hass=${this.hass}
        .autofocus=${this.autofocus}
        .notFoundLabel=${this.hass.localize("ui.components.combo-box.no_match")}
        .label=${this.label}
        .value=${this.value}
        .valueRenderer=${this._valueRenderer}
        .disabled=${this.disabled}
        .helper=${this.helper}
        .getItems=${this._getItems}
        .searchKeys=${ja}
        @value-changed=${this._pickerChanged}
        hide-clear-icon
      >
      </ha-generic-picker>
      ${this.invalid ? q`<span class="invalid">Invalid</span>` : K}
   `;
    {
      const e = this.items.map(e => ({
        value: e.value,
        label: e.name,
        secondary: e.description,
        iconPath: e.icon
      }));
      return q`
        <ha-select
          .label=${this.label}
          .value=${this.value}
          .disabled=${this.disabled}
          .helper=${this.helper}
          ?clearable=${this.clearable}
          ?invalid=${this.invalid}
          .options=${e}
          @selected=${this._selectChanged}
          @closed=${e => {
        e.stopPropagation();
      }}
          fixedMenuPosition
          naturalMenuWidth
        >
        </ha-select>
        ${this.invalid ? q`<span class="invalid">Invalid</span>` : K}
      `;
    }
  }
  _renderOptions() {
    const e = this.items.some(e => e.icon);
    return this.items.map(t => q`
      <ha-dropdown-item
        .graphic=${e ? "icon" : ""}
        .value=${t.value}
        ?selected=${this.value === t.value}
      >
        ${t.icon ? q`<ha-icon slot="graphic" .icon=${t.icon}></ha-icon>` : K}
        <span>${t.name}</span>
      </ha-dropdown-item>
    `);
  }
  _selectChanged(e) {
    e.stopPropagation(), this.value = e.detail.value, Ea(this, "value-changed", {
      value: this.value
    });
  }
  _pickerChanged(e) {
    e.stopPropagation(), this.value = e.detail.value, Ea(this, "value-changed", {
      value: this.value
    });
  }
  clearValue() {
    if (this.showSearch) {
      const e = this.shadowRoot.querySelector("ha-generic-picker");
      this.value = "", e.blur();
    } else {
      const e = this.shadowRoot.querySelector("ha-select");
      this.value = void 0, setTimeout(() => {
        e.blur();
      }, 50);
    }
  }
};
Da.styles = d`
    ha-select {
      width: 100%;
    }
    .mdc-floating-label {
      inset-inline-start: var(--ha-space-4);
      inset-inline-end: initial;
      color: red;
      direction: var(--direction);
    }
    :host([invalid]) {
      --mdc-select-label-ink-color: var(--mdc-theme-error, red);
      --mdc-select-idle-line-color: var(--mdc-theme-error, red);
      --mdc-text-field-idle-line-color: var(--mdc-theme-error, red);
    }
    span.invalid {
      display: flex;
      font-size: 0.75rem;
      color: var(--mdc-theme-error, red);
      margin: 6px 16px 0px 16px;
    }
    ha-select {
      --ha-space-10: var(--ha-space-13);
    }
    :host([icons]) ha-select {
      --ha-space-10: var(--ha-space-15);
    }
  `, i([be()], Da.prototype, "hass", void 0), i([be()], Da.prototype, "label", void 0), i([be()], Da.prototype, "items", void 0), i([be({
  type: String,
  reflect: !0
})], Da.prototype, "value", void 0), i([be({
  type: Boolean,
  reflect: !0
})], Da.prototype, "disabled", void 0), i([be()], Da.prototype, "helper", void 0), i([be({
  type: Boolean
})], Da.prototype, "showSearch", void 0), i([be({
  type: Boolean
})], Da.prototype, "clearable", void 0), i([be({
  type: Boolean
})], Da.prototype, "invalid", void 0), i([_e("ha-input")], Da.prototype, "_menu", void 0), Da = i([ge("alarmo-select")], Da);
let Ra = class extends pe {
  static get styles() {
    return d`
      :host {
        display: block;
      }
    `;
  }
  render() {
    return q`
      <slot></slot>
    `;
  }
  constructor() {
    super(), this.addEventListener("clickHeader", this.manageSpoilers);
  }
  manageSpoilers(e) {
    const t = e.target;
    t.getAttribute("active") ? t.removeAttribute("active") : t.setAttribute("active", "true"), this.querySelectorAll("alarmo-collapsible-header[active]").forEach(function (e) {
      e !== t && e.removeAttribute("active");
    });
  }
};
Ra = i([ge("alarmo-collapsible-group")], Ra);
let Ia = class extends pe {
  static get styles() {
    return d`
      :host {
        display: block;
      }
    `;
  }
  render() {
    return q`
      <slot></slot>
    `;
  }
};
Ia = i([ge("alarmo-collapsible-item")], Ia);
let Va = class extends pe {
  constructor() {
    super(), this.clickHeader = new CustomEvent("clickHeader", {
      detail: {
        message: "clickHeader happened."
      },
      bubbles: !0,
      composed: !0
    }), this.active = !1, this.addEventListener("click", this.handleClick);
  }
  handleClick() {
    this.dispatchEvent(this.clickHeader);
  }
  render() {
    return q`
      <mwc-list-item graphic="avatar" twoline hasMeta>
        <slot name="icon" slot="graphic"></slot>
        <span><slot name="title"></slot></span>
        <span slot="secondary"><slot name="description"></slot></span>
        <ha-icon slot="meta" icon="hass:chevron-down" class="chevron"></ha-icon>
      </mwc-list-item>
    `;
  }
  static get styles() {
    return d`
      :host {
        display: block;
        cursor: pointer;
      }
      :host mwc-list-item::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        transition: opacity 15ms linear;
        will-change: opacity;
        background-color: black;
        opacity: 0;
      }
      :host mwc-list-item:hover::before {
        opacity: 0.04;
      }
      :host([active]) mwc-list-item::before {
        opacity: 0.1;
      }
      :host([active]) mwc-list-item:hover::before {
        opacity: 0.12;
      }
      :host mwc-list-item:active::before,
      :host([active]) mwc-list-item:active::before {
        opacity: 0.14;
      }
      ::slotted(ha-icon), ::slotted(ha-svg-icon) {
        width: 24px;
        height: 24px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }
      :host mwc-list-item {
        font-size: 15px;
        --mdc-typography-body2-font-size: 14px;
      }
      :host .chevron {
        display: block;
        transition: 0.4s;
      }
      :host([active]) .chevron {
        transform: rotate(180deg);
      }
    `;
  }
  attributeChangedCallback(e, t, a) {
    this.hasAttribute("active") && this.nextElementSibling ? this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px" : this.nextElementSibling && (this.nextElementSibling.style.maxHeight = "0px"), super.attributeChangedCallback(e, t, a);
  }
};
i([be({
  type: CustomEvent
})], Va.prototype, "clickHeader", void 0), i([be({
  type: Boolean,
  attribute: !0,
  reflect: !0
})], Va.prototype, "active", void 0), Va = i([ge("alarmo-collapsible-header")], Va);
let Ua = class extends pe {
  static get styles() {
    return d`
      :host {
        display: block;
        background-color: var(--card-background-color);
        max-height: 0px;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
      }
      .wrapper {
      }
    `;
  }
  render() {
    return q`
      <div class="wrapper">
        <slot>Default details</slot>
      </div>
    `;
  }
};
Ua = i([ge("alarmo-collapsible-body")], Ua);
const Ga = () => {
    const e = e => {
        let t = {};
        for (var a = 0; a < e.length; a += 2) {
          const s = e[a],
            i = a < e.length ? e[a + 1] : void 0;
          t = Object.assign(Object.assign({}, t), {
            [s]: i
          });
        }
        return t;
      },
      t = window.location.pathname.split("/");
    let a = {
      page: t[2] || "general",
      params: {}
    };
    if (t.length > 3) {
      let s = t.slice(3);
      if (t.includes("filter")) {
        const t = s.findIndex(e => "filter" == e),
          i = s.slice(t + 1);
        s = s.slice(0, t), a = Object.assign(Object.assign({}, a), {
          filter: e(i)
        });
      }
      s.length && (s.length % 2 && (a = Object.assign(Object.assign({}, a), {
        subpage: s.shift()
      })), s.length && (a = Object.assign(Object.assign({}, a), {
        params: e(s)
      })));
    }
    return a;
  },
  Fa = (e, ...t) => {
    let a = {
      page: e,
      params: {}
    };
    t.forEach(e => {
      "string" == typeof e ? a = Object.assign(Object.assign({}, a), {
        subpage: e
      }) : "params" in e ? a = Object.assign(Object.assign({}, a), {
        params: e.params
      }) : "filter" in e && (a = Object.assign(Object.assign({}, a), {
        filter: e.filter
      }));
    });
    const s = e => {
      let t = Object.keys(e);
      t = t.filter(t => e[t]), t.sort();
      let a = "";
      return t.forEach(t => {
        let s = e[t];
        a = a.length ? `${a}/${t}/${s}` : `${t}/${s}`;
      }), a;
    };
    let i = `/midnight_911_frontend_plugin/${a.page}`;
    return a.subpage && (i = `${i}/${a.subpage}`), s(a.params).length && (i = `${i}/${s(a.params)}`), a.filter && (i = `${i}/filter/${s(a.filter)}`), i;
  };
let za = class extends Ba(pe) {
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.areas = await ia(this.hass), this.sensors = await oa(this.hass));
  }
  async firstUpdated() {
    await this._fetchData(), this.selectedArea = Object.keys(this.areas)[0], this.data = Object.assign({}, this.areas[this.selectedArea].modes);
  }
  render() {
    return this.data ? q`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${ta("panels.general.cards.modes.title", this.hass.language)}
          </div>

          ${Object.keys(this.areas).length > 1 ? q`
          <alarmo-select
            .hass=${this.hass}
            .items=${Object.values(this.areas).map(e => Object({
      value: e.area_id,
      name: e.name
    }))}
            value=${this.selectedArea}
            label=${this.hass.localize("ui.components.area-picker.area")}
            @value-changed=${e => this.selectArea(e.target.value)}
          ></alarmo-select>
        ` : ""}
        </div>
        <div class="card-content">
          ${ta("panels.general.cards.modes.description", this.hass.language)}
        </div>

        <alarmo-collapsible-group>
          ${Object.entries(Qt).map(([e, t]) => {
      var a;
      return q`
                <alarmo-collapsible-item>
                  <alarmo-collapsible-header>
                    <ha-svg-icon slot="icon" .path=${fa[e]}></ha-svg-icon>
                    <span slot="title">
                      ${this.hass.localize(`component.alarm_control_panel.entity_component._.state.${t}`)}
                    </span>
                    <span slot="description">
                      ${(null === (a = this.data[t]) || void 0 === a ? void 0 : a.enabled) ? q`
                            ${ta("common.enabled", this.hass.language)},
                            <a href="${Fa("sensors", {
        filter: {
          area: this.selectedArea,
          mode: t
        }
      })}">
                              ${ta("panels.general.cards.modes.number_sensors_active", this.hass.language, "number", this.getSensorsByMode(t))}
                            </a>
                          ` : ta("common.disabled", this.hass.language)}
                    </span>
                  </alarmo-collapsible-header>
                  <alarmo-collapsible-body>
                    ${this.renderModeConfig(t)}
                  </alarmo-collapsible-body>
                </alarmo-collapsible-item>
              `;
    })}
        </alarmo-collapsible-group>
      </ha-card>
    ` : q``;
  }
  getSensorsByMode(e) {
    return Object.values(this.sensors).filter(t => t.area == this.selectedArea && (t.modes.includes(e) || t.always_on)).length;
  }
  renderModeConfig(e) {
    const t = e in this.data ? this.data[e] : void 0;
    return q`
      <div class="description">
        <ha-icon icon="mdi:information-outline"></ha-icon>
        ${ta(`panels.general.cards.modes.modes.${e}`, this.hass.language)}
      </div>
      <alarmo-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${ta("panels.general.cards.modes.fields.status.heading", this.hass.language)}
        </span>
        <span slot="description">
          ${ta("panels.general.cards.modes.fields.status.description", this.hass.language)}
        </span>
        <div>
          <ha-button
            appearance="${(null == t ? void 0 : t.enabled) ? "filled" : "plain"}"
            variant="${(null == t ? void 0 : t.enabled) ? "brand" : "neutral"}"
            @click=${t => this.saveData(t, e, {
      enabled: !0
    })}
          >
            <ha-icon slot="start" icon="mdi:check"></ha-icon>
            ${ta("common.enabled", this.hass.language)}
          </ha-button>
          <ha-button
            appearance="${(null == t ? void 0 : t.enabled) ? "plain" : "filled"}"
            variant="${(null == t ? void 0 : t.enabled) ? "neutral" : "brand"}"
            @click=${t => this.saveData(t, e, {
      enabled: !1
    })}
          >
            <ha-icon slot="start" icon="mdi:close"></ha-icon>
            ${ta("common.disabled", this.hass.language)}
          </ha-button>
        </div>
      </alarmo-settings-row>
      <alarmo-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${ta("panels.general.cards.modes.fields.exit_delay.heading", this.hass.language)}
        </span>
        <span slot="description">
          ${ta("panels.general.cards.modes.fields.exit_delay.description", this.hass.language)}
        </span>
        <alarmo-duration-picker
          .hass=${this.hass}
          max="300"
          placeholder="-"
          value=${(null == t ? void 0 : t.exit_time) || 0}
          @value-changed=${t => {
      this.saveData(t, e, {
        exit_time: t.detail.value
      });
    }}
          ?disabled=${!(null == t ? void 0 : t.enabled) || !Oa(null == t ? void 0 : t.exit_time)}
        ></alarmo-duration-picker>
      </alarmo-settings-row>
      <alarmo-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${ta("panels.general.cards.modes.fields.entry_delay.heading", this.hass.language)}
        </span>
        <span slot="description">
          ${ta("panels.general.cards.modes.fields.entry_delay.description", this.hass.language)}
        </span>
        <alarmo-duration-picker
          .hass=${this.hass}
          max="300"
          placeholder="-"
          value=${(null == t ? void 0 : t.entry_time) || 0}
          @value-changed=${t => this.saveData(t, e, {
      entry_time: t.detail.value
    })}
          ?disabled=${!(null == t ? void 0 : t.enabled) || !Oa(null == t ? void 0 : t.entry_time)}
        ></alarmo-duration-picker>
      </alarmo-settings-row>
      <alarmo-settings-row .narrow=${this.narrow}>
        <span slot="heading">
          ${ta("panels.general.cards.modes.fields.trigger_time.heading", this.hass.language)}
        </span>
        <span slot="description">
          ${ta("panels.general.cards.modes.fields.trigger_time.description", this.hass.language)}
        </span>
        <alarmo-duration-picker
          .hass=${this.hass}
          max="3600"
          step="60"
          placeholder="&#8734;"
          value=${(null == t ? void 0 : t.trigger_time) || 0}
          @value-changed=${t => this.saveData(t, e, {
      trigger_time: t.detail.value
    })}
          ?disabled=${!(null == t ? void 0 : t.enabled) || !Oa(null == t ? void 0 : t.trigger_time)}
        ></alarmo-duration-picker>
      </alarmo-settings-row>
    `;
  }
  selectArea(e) {
    e != this.selectedArea && (this.selectedArea = e, this.data = Object.assign({}, this.areas[e].modes));
  }
  saveClick(e) {
    ra(this.hass, {
      area_id: this.selectedArea,
      name: this.areas[this.selectedArea].name,
      modes: this.data
    }).catch(t => Ta(t, e)).then();
  }
  saveData(e, t, a) {
    this.data = Object.assign(Object.assign({}, this.data), {
      [t]: Object.assign(Object.assign({}, this.data[t] || {
        enabled: !1,
        exit_time: 60,
        entry_time: 60,
        trigger_time: 1800
      }), a)
    }), ra(this.hass, {
      area_id: this.selectedArea,
      name: this.areas[this.selectedArea].name,
      modes: this.data
    }).catch(t => Ta(t, e.target)).then();
  }
  static get styles() {
    return d`
      ${we}
      alarmo-collapsible-header:first-of-type {
        border-top: 1px solid var(--divider-color);
      }
      .description {
        margin: 8px;
        padding: 12px;
        color: var(--primary-color);
        filter: brightness(0.85);
        font-size: 14px;
        line-height: 1.5em;
        min-height: 36px;
        display: flex;
        align-items: center;
        position: relative;
      }
      .description::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        content: '';
        background: rgba(var(--rgb-primary-color), 0.12);
        border-radius: 5px;
      }
      .description ha-icon {
        --mdc-icon-size: 36px;
        display: inline;
        float: left;
        margin-right: 12px;
        align-self: flex-start;
      }
      alarmo-select {
        display: flex;
        min-width: 180px;
      }
    `;
  }
};
i([be()], za.prototype, "hass", void 0), i([be({
  type: Boolean
})], za.prototype, "narrow", void 0), i([be()], za.prototype, "areas", void 0), i([be()], za.prototype, "sensors", void 0), i([be()], za.prototype, "data", void 0), i([be()], za.prototype, "selectedArea", void 0), za = i([ge("alarm-mode-card")], za);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wa = 2;
class Za {
  constructor(e) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, a) {
    this._$Ct = e, this._$AM = t, this._$Ci = a;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class qa extends Za {
  constructor(e) {
    if (super(e), this.it = K, e.type !== Wa) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === K || null == e) return this._t = void 0, this.it = e;
    if (e === X) return e;
    if ("string" != typeof e) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = {
      _$litType$: this.constructor.resultType,
      strings: t,
      values: []
    };
  }
}
qa.directiveName = "unsafeHTML", qa.resultType = 1;
const Xa = (e => (...t) => ({
  _$litDirective$: e,
  values: t
}))(qa);
let Ka = class extends pe {
  constructor() {
    super(...arguments), this.threeLine = !1;
  }
  render() {
    return q`
      <div class="info">
        <slot name="heading"></slot>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      <slot></slot>
    `;
  }
  static get styles() {
    return d`
      :host {
        display: flex;
        flex-direction: row;
        padding: 0px 16px;
        align-items: center;
        min-height: 72px;
      }
      :host([large]) {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        border-bottom: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([narrow]) {
        align-items: normal;
        flex-direction: column;
        border-bottom: none;
        border-top: 1px solid var(--divider-color);
        padding: 16px 16px;
      }
      :host([nested]) {
        border: none;
        padding: 8px 16px 0px 16px;
        margin-top: -16px;
        min-height: 40px;
      }
      :host([nested]:not([narrow])) {
        padding: 16px 16px 0px 32px;
      }
      :host([first]) {
        border-top: none;
      }
      :host([last]) {
        border-bottom: none;
      }
      :host([dialog]) {
        border: none;
        padding: 12px 0px;
      }
      ::slotted(ha-switch) {
        padding: 16px 0;
      }
      .info {
        flex: 1 0 60px;
        margin-bottom: 4px;
      }
      :host([large]) .info,
      :host([narrow]) .info {
        flex: 1 0 40px;
      }
      :host([nested]) .info {
        flex: 1 0 26px;
      }
      :host([dialog]) .info {
        flex: 1 0 40px;
        padding-bottom: 8px;
      }
      .secondary {
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
      :host(:not([large]):not([narrow])):not([dialog])) ::slotted(*) {
        max-width: 66%;
      }
    `;
  }
};
i([be({
  type: Boolean,
  reflect: !0
})], Ka.prototype, "narrow", void 0), i([be({
  type: Boolean,
  reflect: !0
})], Ka.prototype, "large", void 0), i([be({
  type: Boolean,
  attribute: "three-line"
})], Ka.prototype, "threeLine", void 0), i([be({
  type: Boolean
})], Ka.prototype, "nested", void 0), i([be({
  type: Boolean
})], Ka.prototype, "dialog", void 0), Ka = i([ge("alarmo-settings-row")], Ka);
let Ya = class extends pe {
  constructor() {
    super(...arguments), this.active = !1;
  }
  render() {
    return q`
      <div class="chip ${this.active ? "active" : ""}" @click=${this._handleClick}>
        <div class="overlay"></div>
        ${this.renderIcon()}
        <span class="value"><slot></slot></span>
        ${this.renderTrailingIcon()}
      </div>
    `;
  }
  renderIcon() {
    var e;
    return this.icon || this.toggleable ? this.toggleable ? q`
        <div class="icon">
          <ha-icon
            icon="mdi:check"
          ></ha-icon>
        </div>
      ` : q`
        <div class="icon filled">
          ${(null === (e = this.icon) || void 0 === e ? void 0 : e.startsWith("mdi:")) ? q`<ha-icon .icon=${this.icon}></ha-icon>` : q`<ha-svg-icon .path=${this.icon}></ha-svg-icon>`}
        </div>
      ` : K;
  }
  renderTrailingIcon() {
    if (!this.removable && !this.badge) return K;
    if (this.badge) return q`
        <div class="badge">
          ${this.badge}
        </div>
      `;
    const e = Math.random().toString(36).substring(2, 9);
    return q`
        <div class="trailing-icon" @click=${this._iconClick}>
          <ha-icon icon="mdi:close" id="${e}"></ha-icon>
          <ha-tooltip for="${e}">${this.hass.localize("ui.common.remove")}</ha-tooltip>
        </div>
      `;
  }
  _handleClick(e) {
    if (this.toggleable) {
      this.active = !this.active;
      const e = new CustomEvent("click", {
        detail: {
          active: this.active,
          value: this.value
        }
      });
      this.dispatchEvent(e);
    } else {
      const e = new CustomEvent("click", {
        detail: {
          value: this.value
        }
      });
      this.dispatchEvent(e);
    }
    e.stopPropagation();
  }
  _iconClick(e) {
    const t = new CustomEvent("icon-clicked", {
      detail: {
        value: this.value
      }
    });
    this.dispatchEvent(t), e.stopPropagation();
  }
  static get styles() {
    return d`
      :host {
        margin: 4px;
      }
      .chip {
        display: inline-flex;
        position: relative;
        height: var(--chip-height, 32px);
        background: none;
        user-select: none;
        z-index: 1;
        align-items: center;
        justify-content: center;
      }
      .chip:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        border: 1px solid var(--chip-color, rgb(168, 225, 251));
        border-radius: var(--chip-border-radius, 32px);
        background: rgba(0, 0, 0, 0);
        opacity: var(--background-opacity, 1);
        z-index: -2;
      }
      .chip.active:before {
        background: var(--chip-color, rgb(168, 225, 251));
      }
      .icon {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 20px;
        margin-right: -8px;
        color: rgba(0, 0, 0, 0.54);
      }
      .icon.filled:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, rgb(168, 225, 251));
        border-radius: 32px;
        z-index: -2;
      }
      .value {
        color: var(--primary-text-color);
        font-size: var(--chip-font-size, 0.875rem);
        font-weight: 400;
        display: flex;
        align-items: center;
        padding: 0px 12px;
        opacity: 0.9;
      }
      .trailing-icon {
        position: relative;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 16px;
        margin: 0px 3px 0px -8px;
        color: var(--icon-color, rgba(0, 0, 0, 0.54));
        cursor: pointer;
      }
      .trailing-icon:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, var(--secondary-text-color));
        border-radius: 26px;
        z-index: -2;
        opacity: 0;
        transition: opacity 0.1s ease-in-out;
      }
      .trailing-icon:hover:before {
        opacity: 0.15;
      }
      .trailing-icon:active:before {
        opacity: 0.3;
      }
      :host([selectable]) .chip, :host([toggleable]) .chip {
        cursor: pointer;
      }
      .overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: rgba(0, 0, 0, 0);
        border-radius: var(--chip-border-radius, 32px);
        transition: background-color 0.1s ease-in-out, border 0.1s ease-in-out;
        border: 1px solid rgba(0, 0, 0, 0);
      }
      :host([selectable]) .chip:hover .overlay, :host([toggleable]) .chip:hover .overlay {
        border: 1px solid rgba(0, 0, 0, 0.05);
        background: rgba(0, 0, 0, 0.05);
      }
      :host([selectable]) .chip:active .overlay, :host([toggleable]) .chip:active .overlay {
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.1);
      }
      :host([selectable]) .chip:hover .value, :host([toggleable]) .chip:hover .value {
        opacity: 1;
      }
      :host([active]):host([selectable]) .chip:hover .overlay, :host([active]):host([toggleable]) .chip:hover .overlay {
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0);
      }
      :host([active]):host([selectable]) .chip:active .overlay, :host([active]):host([toggleable]) .chip:active .overlay {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(0, 0, 0, 0);
      }
      
      :host([toggleable]) .icon {
        width: 0px;
        transition: width 0.1s ease-in-out;
        overflow: hidden;
        display: flex;
        align-items: center;
        margin-left: 12px;
      }
      :host([toggleable]) .active .icon {
        width: 20px;
      }
      .badge {
        position: relative;
        display: flex;
        height: 26px;
        min-width: 26px;
        border-radius: 13px;
        font-size: var(--chip-font-size, 0.875rem);
        align-items: center;
        justify-content: center;
        margin: 0px 3px 0px -8px;
      }
      .badge:before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: var(--chip-color, var(--secondary-text-color));
        border-radius: 26px;
        z-index: -2;
        transition: opacity 0.1s ease-in-out;
        opacity: 0.1;
      }
    `;
  }
};
i([be({
  attribute: !1
})], Ya.prototype, "hass", void 0), i([be({
  type: String
})], Ya.prototype, "icon", void 0), i([be({
  type: Boolean
})], Ya.prototype, "selectable", void 0), i([be({
  type: Boolean
})], Ya.prototype, "removable", void 0), i([be({
  type: Boolean
})], Ya.prototype, "toggleable", void 0), i([be({
  type: Boolean
})], Ya.prototype, "active", void 0), i([be({
  type: String
})], Ya.prototype, "badge", void 0), i([be({
  type: String
})], Ya.prototype, "value", void 0), Ya = i([ge("alarmo-chip")], Ya);
let Qa = class extends pe {
  constructor() {
    super(...arguments), this.value = [];
  }
  render() {
    return this.items ? q`
      ${Object.values(this.items).map(e => q`
          <alarmo-chip
            .hass=${this.hass}
            .value=${e.value || e.name}
            .icon=${e.icon}
            ?active=${this.value.includes(e.value || e.name)}
            .badge=${void 0 !== e.badge ? String(e.badge) : void 0}
            ?selectable=${this.selectable}
            ?toggleable=${this.toggleable}
            ?removable=${this.removable}
            @click=${this._handleClick}
            @icon-clicked=${this._handleClick}
          >
            ${e.name}
          </alarmo-chip>
        `)}
    ` : q``;
  }
  _handleClick(e) {
    if (this.toggleable) {
      const t = e.detail.value,
        a = e.detail.active;
      this.value.includes(t) && !a ? this.value = this.value.filter(e => e != t) : !this.value.includes(t) && t && (this.value = [...this.value, t]);
      const s = new CustomEvent("value-changed", {
        detail: this.value
      });
      this.dispatchEvent(s);
    } else {
      const t = new CustomEvent("value-changed", {
        detail: e.detail.value
      });
      this.dispatchEvent(t);
    }
  }
  static get styles() {
    return d`
      :host {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin: 0px -4px;
        flex-wrap: wrap;
      }
    `;
  }
};
i([be({
  attribute: !1
})], Qa.prototype, "hass", void 0), i([be({
  attribute: !1
})], Qa.prototype, "items", void 0), i([be({
  attribute: !1
})], Qa.prototype, "value", void 0), i([be({
  type: Boolean
})], Qa.prototype, "selectable", void 0), i([be({
  type: Boolean
})], Qa.prototype, "toggleable", void 0), i([be({
  type: Boolean
})], Qa.prototype, "removable", void 0), Qa = i([ge("alarmo-chip-set")], Qa);
let Ja = class extends pe {
  set filters(e) {
    this.filterConfig || (this.filterConfig = e);
  }
  shouldUpdate(e) {
    return e.get("filters") && !this.filterConfig && (this.filterConfig = e.get("filters")), !0;
  }
  render() {
    if (!this.columns || !this.data) return q``;
    const e = this.data.filter(e => this.filterTableData(e, this.filterConfig));
    return q`
      ${this.renderFilterRow()}
      <div class="table">
        ${this.renderHeaderRow()}
        ${e.length ? e.map(e => this.renderDataRow(e)) : q`
              <div class="table-row">
                <div class="table-cell text grow">
                  <slot></slot>
                </div>
              </div>
            `}
      </div>
    `;
  }
  renderHeaderRow() {
    return this.columns ? q`
      <div class="table-row header">
        ${Object.values(this.columns).map(e => e.hide ? "" : q`
                <div
                  class="table-cell ${e.text ? "text" : ""} ${e.grow ? "grow" : ""} ${e.align ? e.align : ""}"
                  style="${e.grow ? "" : `width: ${e.width}`}"
                >
                  <span>${e.title || ""}</span>
                </div>
              `)}
      </div>
    ` : q``;
  }
  renderDataRow(e) {
    return this.columns ? q`
      <div
        class="table-row ${this.selectable ? "selectable" : ""} ${e.warning ? "warning" : ""}"
        @click=${() => this.handleClick(String(e.id))}
      >
        ${Object.entries(this.columns).map(([t, a]) => a.hide ? "" : q`
                <div
                  class="table-cell ${a.text ? "text" : ""} ${a.grow ? "grow" : ""} ${a.align ? a.align : ""}"
                  style="${a.grow ? "" : `width: ${a.width}`}"
                >
                  ${a.renderer ? a.renderer(e) : e[t]}
                </div>
              `)}
      </div>
    ` : q``;
  }
  filterTableData(e, t) {
    return !t || Object.keys(t).every(a => {
      if (!Object.keys(e).includes(a)) return !0;
      const s = t[a].value;
      return !s || !s.length || (Array.isArray(e[a]) ? e[a].some(e => s.includes(e)) : s.includes(e[a]));
    });
  }
  _getFilteredItems() {
    return this.data.filter(e => !this.filterTableData(e, this.filterConfig)).length;
  }
  handleClick(e) {
    if (!this.selectable) return;
    const t = new CustomEvent("row-click", {
      detail: {
        id: e
      }
    });
    this.dispatchEvent(t);
  }
  renderFilterRow() {
    var e;
    return this.filterConfig ? q`
      <div class="table-filter">
        <ha-dropdown
          @wa-show=${this._showFilterMenu}
          @wa-after-hide=${this._applyFilterSelection}
          placement="bottom-start"
        >
          <ha-icon-button
            slot="trigger"
            .path=${"M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z"}
            ?disabled=${!(null === (e = this.data) || void 0 === e ? void 0 : e.length)}
            label=${ta("components.table.filter.label", this.hass.language)}
          ></ha-icon-button>
          ${this.renderFilterMenu()}
        </ha-dropdown>

        ${this._getFilteredItems() ? q`
              <alarmo-chip
                .hass=${this.hass}
                removable
                active
                @icon-clicked=${this._clearFilters}
                style="--chip-color: var(--primary-color); --background-opacity: 0.12; --chip-border-radius: 8px; --chip-height: 40px; --chip-font-size: 1em; --icon-color: var(--dark-primary-color)"
              >
                ${ta("components.table.filter.hidden_items", this.hass.language, "number", this._getFilteredItems())}
              </alarmo-chip>
            ` : ""}
      </div>
    ` : q``;
  }
  _showFilterMenu() {
    this.filterSelection = Object.entries(this.filterConfig).reduce((e, [t, a]) => {
      return Object.assign(Object.assign({}, e), {
        [t]: (s = a, i = ["value"], s ? Object.entries(s).filter(([e]) => i.includes(e)).reduce((e, [t, a]) => Object.assign(e, {
          [t]: a
        }), {}) : {})
      });
      var s, i;
    }, {});
  }
  renderFilterMenu() {
    return this.filterConfig && this.filterSelection ? q`
      <span class="header">
        ${ta("components.table.filter.label", this.hass.language)}
      </span>
      <ha-icon-button
        class="close"
        .path=${da}
        @click=${e => {
      e.target.parentElement.parentElement.querySelector("ha-icon-button").click();
    }}
      ></ha-icon-button>
      ${Object.keys(this.filterConfig).map(e => {
      if (this.filterConfig[e].binary) return q`
            <div class="dropdown-item checkbox">
              <ha-checkbox
                @change=${t => this._updateFilterSelection(e, t.target.checked)}
                ?checked=${this.filterSelection[e].value.length}
              ></ha-checkbox>
              <span class="name">
                ${this.filterConfig[e].name}
              </span>
            </div>
          `;
      let t = this.filterConfig[e].items;
      t = t.map(t => {
        var a;
        return t.badge && "function" == typeof t.badge ? Object.assign(Object.assign({}, t), {
          badge: t.badge(null === (a = this.data) || void 0 === a ? void 0 : a.filter(t => this.filterTableData(t, Sa(this.filterSelection, e))))
        }) : t;
      });
      const a = this.filterSelection[e].value;
      return q`
          <div class="dropdown-item">
            <span class="name">
              ${this.filterConfig[e].name}
            </span>
            <alarmo-chip-set
              toggleable
              .items=${t}
              @value-changed=${t => this._updateFilterSelection(e, t.detail)}
              .value=${a}
            ></alarmo-chip-set>
          </div>
        `;
    })}
    ` : q``;
  }
  _updateFilterSelection(e, t) {
    "boolean" == typeof t && (t = t ? this.filterConfig[e].items[0].value : [], 1 == Object.keys(this.filterConfig).length && (this._menu.open = !1)), this.filterSelection = Object.assign(Object.assign({}, this.filterSelection), {
      [e]: {
        value: t
      }
    });
  }
  _clearFilters() {
    Object.keys(this.filterConfig).forEach(e => {
      this.filterConfig = Object.assign(Object.assign({}, this.filterConfig), {
        [e]: Object.assign(Object.assign({}, this.filterConfig[e]), {
          value: []
        })
      });
    });
  }
  _applyFilterSelection() {
    Object.keys(this.filterConfig).forEach(e => {
      this.filterConfig = Object.assign(Object.assign({}, this.filterConfig), {
        [e]: Object.assign(Object.assign({}, this.filterConfig[e]), this.filterSelection[e])
      });
    });
  }
};
Ja.styles = d`
    :host {
      width: 100%;
    }
    div.table {
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 100%;
    }
    div.table .header {
      font-weight: bold;
    }
    div.table-row {
      display: flex;
      width: 100%;
      height: 52px;
      border-top: 1px solid var(--divider-color);
      flex-direction: row;
      position: relative;
    }
    div.table-cell {
      align-self: center;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    div.table-cell.text {
      padding: 4px 16px;
    }
    div.table-cell.grow {
      flex-grow: 1;
      flex-shrink: 1;
    }

    div.table-cell > ha-switch {
      width: 68px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.table-cell.right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    div.table-cell > ha-icon-button {
      color: var(--secondary-text-color);
    }
    div.table-cell > ha-checkbox {
      display: flex;
      align-items: center;
    }
    div.table-cell > * {
      transition: color 0.2s ease-in-out;
    }
    div.table .header div.table-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    div.table-row.selectable {
      cursor: pointer;
    }
    .table-row::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.12;
      pointer-events: none;
      content: '';
      border-radius: 4px;
    }
    div.table-row.selectable:hover::before {
      background-color: rgba(var(--rgb-primary-text-color), 0.5);
    }
    div.table-row.warning::before {
      background-color: var(--error-color);
      opacity: 0.06;
    }
    div.table-row.warning:hover::before {
      background-color: var(--error-color);
      opacity: 0.12;
    }
    div.table-row.warning span {
      color: var(--error-color);
    }

    ha-icon, ha-svg-icon {
      color: var(--state-icon-color);
      padding: 8px;
    }

    .secondary {
      color: var(--secondary-text-color);
      display: flex;
      padding-top: 4px;
    }

    a,
    a:visited {
      color: var(--primary-color);
    }

    span.disabled {
      color: var(--secondary-text-color);
    }
    span.secondary.disabled {
      color: var(--disabled-text-color);
    }
    ha-icon.disabled, ha-svg-icon.disabled {
      color: var(--state-unavailable-color);
    }

    div.table-filter {
      display: flex;
      width: 100%;
      min-height: 52px;
      border-top: 1px solid var(--divider-color);
      box-sizing: border-box;
      padding: 2px 8px;
      flex: 1;
      position: relative;
      flex-direction: row;
      align-items: center;
    }
    ha-dropdown .header {
      display: flex;
      padding: 8px 16px;
      font-weight: bold;
    }
    ha-dropdown ha-icon-button.close {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    div.dropdown-item {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      padding: 8px 16px;
      width: 100%;
      min-height: 52px;
      box-sizing: border-box;
    }
    div.dropdown-item .name {
      display: inline-flex;
    }
    div.dropdown-item alarmo-chips {
      display: flex;
      flex-direction: row;
    }
    div.dropdown-item.checkbox {
      flex-direction: row;
      align-items: center;
    }
  `, i([be()], Ja.prototype, "hass", void 0), i([be()], Ja.prototype, "columns", void 0), i([be()], Ja.prototype, "data", void 0), i([fe()], Ja.prototype, "filterConfig", void 0), i([fe()], Ja.prototype, "filterSelection", void 0), i([be({
  type: Boolean
})], Ja.prototype, "selectable", void 0), i([_e("ha-dropdown")], Ja.prototype, "_menu", void 0), Ja = i([ge("alarmo-table")], Ja);
let es = class extends pe {
  async showDialog(e) {
    this._params = e, await this.updateComplete;
  }
  async closeDialog() {
    this._params && this._params.cancel(), this._params = void 0;
  }
  render() {
    return this._params ? q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">${this._params.title}</div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.description}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="primaryAction" @click=${this.cancelClick} dialogAction="close">
            ${this.hass.localize("ui.common.cancel")}
          </ha-button>
          <ha-button appearance="plain" slot="secondaryAction" style="float: left" @click=${this.confirmClick} dialogAction="close">
            ${this.hass.localize("ui.common.ok")}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    ` : q``;
  }
  confirmClick() {
    this._params.confirm();
  }
  cancelClick() {
    this._params.cancel();
  }
  static get styles() {
    return d`
      ${we}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
};
i([be({
  attribute: !1
})], es.prototype, "hass", void 0), i([fe()], es.prototype, "_params", void 0), es = i([ge("confirm-delete-dialog")], es);
var ts = Object.freeze({
  __proto__: null,
  get ConfirmDeleteDialog() {
    return es;
  }
});
let as = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.areas = {}, this.sensors = {}, this.name = "";
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.areas = await ia(this.hass), this.sensors = await oa(this.hass));
  }
  async showDialog(e) {
    await this._fetchData(), this._params = e, e.area_id && (this.area_id = e.area_id, this.name = this.areas[this.area_id].name), await this.updateComplete;
  }
  async closeDialog() {
    this._params = void 0, this.area_id = void 0, this.name = "";
  }
  render() {
    return this._params ? q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">
            ${this.area_id ? ta("panels.general.dialogs.edit_area.title", this.hass.language, "{area}", this.areas[this.area_id].name) : ta("panels.general.dialogs.create_area.title", this.hass.language)}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          <ha-input
            label=${this.hass.localize("ui.common.name")}
            @input=${e => this.name = e.target.value}
            value="${this.name}"
          ></ha-input>
          ${this.area_id ? q`
                <span class="note">
                  ${ta("panels.general.dialogs.edit_area.name_warning", this.hass.language)}
                </span>
              ` : ""}
          ${this.area_id ? "" : q`
          <alarmo-select
            .hass=${this.hass}
            .items=${Object.values(this.areas).map(e => Object({
      value: e.area_id,
      name: e.name
    }))}
            value=${this.selectedArea}
            label="${ta("panels.general.dialogs.create_area.fields.copy_from", this.hass.language)}"
            clearable=${!0}
            @value-changed=${e => this.selectedArea = e.target.value}
          ></alarmo-select>
              `}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="primaryAction" @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </ha-button>
          ${this.area_id ? q`
            <ha-button
              appearance="plain"
              slot="secondaryAction"
              @click=${this.deleteClick}
              variant="danger"
              ?disabled=${1 == Object.keys(this.areas).length}
            >
              ${this.hass.localize("ui.common.delete")}
            </ha-button>
              ` : ""}
        </ha-dialog-footer>
      </ha-dialog>
    ` : q``;
  }
  saveClick(e) {
    const t = this.name.trim();
    if (!t.length) return;
    let a = {
      name: t
    };
    this.area_id ? a = Object.assign(Object.assign({}, a), {
      area_id: this.area_id,
      modes: Object.assign({}, this.areas[this.area_id].modes)
    }) : this.selectedArea && (a = Object.assign(Object.assign({}, a), {
      modes: Object.assign({}, this.areas[this.selectedArea].modes)
    })), ra(this.hass, a).catch(t => Ta(t, e)).then(() => {
      this.closeDialog();
    });
  }
  async deleteClick(e) {
    if (!this.area_id) return;
    const t = Object.values(this.sensors).filter(e => e.area == this.area_id).length;
    let a = !1;
    var s, i;
    a = !t || (await new Promise(a => {
      Ea(e.target, "show-dialog", {
        dialogTag: "confirm-delete-dialog",
        dialogImport: () => Promise.resolve().then(function () {
          return ts;
        }),
        dialogParams: {
          title: ta("panels.general.dialogs.remove_area.title", this.hass.language),
          description: ta("panels.general.dialogs.remove_area.description", this.hass.language, "sensors", String(t)),
          cancel: () => a(!1),
          confirm: () => a(!0)
        }
      });
    })), a && (s = this.hass, i = this.area_id, s.callWS({
      type: `${aa}/area/delete`,
      area_id: i
    })).catch(t => Ta(t, e)).then(() => {
      this.closeDialog();
    });
  }
  static get styles() {
    return d`
      ${we}
      div.wrapper {
        color: var(--primary-text-color);
      }
      span.note {
        color: var(--secondary-text-color);
      }
      ha-input {
        display: block;
      }
      alarmo-select {
        margin-top: 10px;
      }
    `;
  }
};
i([be({
  attribute: !1
})], as.prototype, "hass", void 0), i([fe()], as.prototype, "_params", void 0), i([be()], as.prototype, "areas", void 0), i([be()], as.prototype, "sensors", void 0), i([be()], as.prototype, "name", void 0), i([be()], as.prototype, "area_id", void 0), i([be()], as.prototype, "selectedArea", void 0), as = i([ge("create-area-dialog")], as);
var ss = Object.freeze({
  __proto__: null,
  get CreateAreaDialog() {
    return as;
  }
});
let is = class extends pe {
  async showDialog(e) {
    this._params = e, this.result = void 0;
    try {
      this.preview = await (t = this.hass, t.callWS({
        type: `${aa}/alarmo_import/preview`
      }));
    } catch (e) {
      return this._params = void 0, void Ta(e, this);
    }
    var t;
    await this.updateComplete;
  }
  async closeDialog() {
    this._params = void 0, this.preview = void 0, this.result = void 0;
  }
  render() {
    return this._params && this.preview ? q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">${ta("panels.general.dialogs.import_alarmo.title", this.hass.language)}</div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this.result ? this.renderResult() : this.renderPreview()}
        </div>
        <ha-dialog-footer slot="footer">
          ${!this.result && this.preview.available ? q`
                <ha-button appearance="plain" slot="primaryAction" @click=${this.applyClick}>
                  ${ta("panels.general.dialogs.import_alarmo.actions.import", this.hass.language)}
                </ha-button>
              ` : ""}
          <ha-button appearance="plain" slot="secondaryAction" @click=${this.closeDialog}>
            ${this.hass.localize(this.result ? "ui.common.close" : "ui.common.cancel")}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    ` : q``;
  }
  renderPreview() {
    return this.preview.available ? q`
      <p>${ta("panels.general.dialogs.import_alarmo.description", this.hass.language)}</p>
      <ul>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.areas", this.hass.language)}: ${this.preview.areas}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.users", this.hass.language)}: ${this.preview.users}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.sensor_groups", this.hass.language)}: ${this.preview.sensor_groups}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.sensors", this.hass.language)}: ${this.preview.sensors}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.automations_skipped", this.hass.language)}: ${this.preview.automations_skipped}</li>
      </ul>
    ` : q`
        <p>${ta("panels.general.dialogs.import_alarmo.not_available", this.hass.language)}</p>
      `;
  }
  renderResult() {
    const e = q`
      <p>${ta(`panels.general.dialogs.import_alarmo.reason.${this.result.reason}`, this.hass.language)}</p>
    `;
    return "import_complete" !== this.result.reason ? e : q`
      ${e}
      <ul>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.areas", this.hass.language)}: ${this.result.areas}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.users", this.hass.language)}: ${this.result.users}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.sensor_groups", this.hass.language)}: ${this.result.sensor_groups}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.sensors", this.hass.language)}: ${this.result.sensors}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.sensors_skipped", this.hass.language)}: ${this.result.sensors_skipped}</li>
        <li>${ta("panels.general.dialogs.import_alarmo.summary.automations_skipped", this.hass.language)}: ${this.result.automations_skipped}</li>
      </ul>
    `;
  }
  async applyClick(e) {
    var t, a, s;
    if (null === (t = this.preview) || void 0 === t ? void 0 : t.flow_id) try {
      this.result = await (a = this.hass, s = this.preview.flow_id, a.callWS({
        type: `${aa}/alarmo_import/apply`,
        flow_id: s
      }));
    } catch (t) {
      Ta(t, e);
    }
  }
  static get styles() {
    return d`
      ${$e}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
};
i([be({
  attribute: !1
})], is.prototype, "hass", void 0), i([fe()], is.prototype, "_params", void 0), i([fe()], is.prototype, "preview", void 0), i([fe()], is.prototype, "result", void 0), is = i([ge("import-alarmo-dialog")], is);
var rs = Object.freeze({
  __proto__: null,
  get ImportAlarmoDialog() {
    return is;
  }
});
let os = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.areas = {}, this.sensors = {};
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.areas = await ia(this.hass), this.sensors = await oa(this.hass));
  }
  render() {
    if (!this.hass) return q``;
    const e = Object.values(this.areas);
    e.sort(ka);
    const t = {
        actions: {
          width: "48px"
        },
        name: {
          title: this.hass.localize("ui.common.name"),
          width: "40%",
          grow: !0,
          text: !0
        },
        remarks: {
          title: ta("panels.general.cards.areas.table.remarks", this.hass.language),
          width: "60%",
          hide: this.narrow,
          text: !0
        }
      },
      a = Object.values(e).map(e => {
        const t = Object.values(this.sensors).filter(t => t.area == e.area_id).length,
          a = ta("panels.general.cards.areas.table.summary_sensors", this.hass.language, "number", t);
        return {
          id: e.area_id,
          actions: q`
          <ha-icon-button @click=${t => this.editClick(t, e.area_id)} .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}></ha-icon-button>
        `,
          name: xa(e.name),
          remarks: Xa(a)
        };
      });
    return q`
      <ha-card header="${ta("panels.general.cards.areas.title", this.hass.language)}">
        <div class="card-content">
          ${ta("panels.general.cards.areas.description", this.hass.language)}
        </div>

        <alarmo-table .columns=${t} .data=${a}>
          ${ta("panels.general.cards.areas.no_items", this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addClick}>
            ${ta("panels.general.cards.areas.actions.add", this.hass.language)}
          </ha-button>
          <ha-button appearance="plain" @click=${this.importClick}>
            ${ta("panels.general.cards.areas.actions.import_from_alarmo", this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }
  addClick(e) {
    const t = e.target;
    Ea(t, "show-dialog", {
      dialogTag: "create-area-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return ss;
      }),
      dialogParams: {}
    });
  }
  editClick(e, t) {
    const a = e.target;
    Ea(a, "show-dialog", {
      dialogTag: "create-area-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return ss;
      }),
      dialogParams: {
        area_id: t
      }
    });
  }
  importClick(e) {
    const t = e.target;
    Ea(t, "show-dialog", {
      dialogTag: "import-alarmo-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return rs;
      }),
      dialogParams: {}
    });
  }
};
os.styles = we, i([be()], os.prototype, "narrow", void 0), i([be()], os.prototype, "areas", void 0), i([be()], os.prototype, "sensors", void 0), os = i([ge("area-config-card")], os);
let ns = class extends pe {
  firstUpdated() {
    (async () => {
      await ye();
    })();
  }
  render() {
    return this.hass ? q`
      <alarm-mode-card .hass=${this.hass} .narrow=${this.narrow}></alarm-mode-card>
      <area-config-card .hass=${this.hass} .narrow=${this.narrow}></area-config-card>
    ` : q``;
  }
};
i([be()], ns.prototype, "narrow", void 0), i([be()], ns.prototype, "path", void 0), ns = i([ge("alarm-view-general")], ns);
const ls = (e, t) => {
    const a = function (e) {
      const t = "string" == typeof e ? e : e.entity_id;
      return String(t.split(".").shift());
    }(e.entity_id);
    if ("binary_sensor" == a) {
      if (t) return !0;
      const a = e.attributes.device_class;
      return !!a && !!["carbon_monoxide", "door", "garage_door", "gas", "heat", "lock", "moisture", "motion", "moving", "occupancy", "opening", "presence", "safety", "smoke", "sound", "tamper", "vibration", "window"].includes(a);
    }
    return !1;
  },
  hs = e => {
    switch (e.attributes.device_class) {
      case "door":
      case "garage_door":
      case "lock":
      case "opening":
        return wa.Door;
      case "window":
        return wa.Window;
      case "carbon_monoxide":
      case "gas":
      case "heat":
      case "moisture":
      case "smoke":
      case "safety":
        return wa.Environmental;
      case "motion":
      case "moving":
      case "occupancy":
      case "presence":
        return wa.Motion;
      case "sound":
      case "vibration":
      case "tamper":
        return wa.Tamper;
      default:
        return;
    }
  },
  cs = (e, t) => {
    switch (null == e ? void 0 : e.attributes.device_class) {
      case "battery":
        return "M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";
      case "battery_charging":
        return "M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.66C6,21.4 6.6,22 7.33,22H16.66C17.4,22 18,21.4 18,20.67V5.33C18,4.6 17.4,4 16.67,4M11,20V14.5H9L13,7V12.5H15";
      case "cold":
        return "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z";
      case "connectivity":
        return "M13,19H14A1,1 0 0,1 15,20H22V22H15A1,1 0 0,1 14,23H10A1,1 0 0,1 9,22H2V20H9A1,1 0 0,1 10,19H11V17H4A1,1 0 0,1 3,16V12A1,1 0 0,1 4,11H20A1,1 0 0,1 21,12V16A1,1 0 0,1 20,17H13V19M4,3H20A1,1 0 0,1 21,4V8A1,1 0 0,1 20,9H4A1,1 0 0,1 3,8V4A1,1 0 0,1 4,3M9,7H10V5H9V7M9,15H10V13H9V15M5,5V7H7V5H5M5,13V15H7V13H5Z";
      case "door":
        return pa;
      case "garage_door":
        return "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z";
      case "power":
      case "plug":
        return ma;
      case "gas":
      case "problem":
      case "safety":
      case "tamper":
        return ha;
      case "smoke":
        return "M17 19V22H15V19C15 17.9 14.1 17 13 17H10C7.2 17 5 14.8 5 12C5 10.8 5.4 9.8 6.1 8.9C3.8 8.5 2 6.4 2 4C2 3.3 2.2 2.6 2.4 2H4.8C4.3 2.5 4 3.2 4 4C4 5.7 5.3 7 7 7H10V9C8.3 9 7 10.3 7 12S8.3 15 10 15H13C15.2 15 17 16.8 17 19M17.9 8.9C20.2 8.5 22 6.4 22 4C22 3.3 21.8 2.6 21.6 2H19.2C19.7 2.5 20 3.2 20 4C20 5.7 18.7 7 17 7H15.8C15.9 7.3 16 7.6 16 8C16 9.7 14.7 11 13 11V13C15.8 13 18 15.2 18 18V22H20V18C20 15.3 18.5 13 16.2 11.8C17.1 11.1 17.7 10.1 17.9 8.9Z";
      case "heat":
        return ua;
      case "light":
        return "M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z";
      case "lock":
        return "M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z";
      case "moisture":
        return "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";
      case "motion":
        return "M13.5,5.5C14.59,5.5 15.5,4.58 15.5,3.5C15.5,2.38 14.59,1.5 13.5,1.5C12.39,1.5 11.5,2.38 11.5,3.5C11.5,4.58 12.39,5.5 13.5,5.5M9.89,19.38L10.89,15L13,17V23H15V15.5L12.89,13.5L13.5,10.5C14.79,12 16.79,13 19,13V11C17.09,11 15.5,10 14.69,8.58L13.69,7C13.29,6.38 12.69,6 12,6C11.69,6 11.5,6.08 11.19,6.08L6,8.28V13H8V9.58L9.79,8.88L8.19,17L3.29,16L2.89,18L9.89,19.38Z";
      case "occupancy":
      case "presence":
        return ga;
      case "opening":
        return "M3,3H21V21H3V3M5,5V19H19V5H5Z";
      case "running":
        return "M8,5.14V19.14L19,12.14L8,5.14Z";
      case "sound":
        return "M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z";
      case "update":
        return "M20.54,5.23C20.83,5.57 21,6 21,6.5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V6.5C3,6 3.17,5.57 3.46,5.23L4.84,3.55C5.12,3.21 5.53,3 6,3H18C18.47,3 18.88,3.21 19.15,3.55L20.54,5.23M5.12,5H18.87L17.93,4H5.93L5.12,5M12,9.5L6.5,15H10V17H14V15H17.5L12,9.5Z";
      case "vibration":
        return va;
      case "window":
        return ba;
      default:
        return "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
    }
  };
let ds = class extends pe {
  async showDialog(e) {
    this._params = e, await this.updateComplete;
  }
  async closeDialog() {
    this._params = void 0;
  }
  render() {
    return this._params ? q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">${this.hass.localize("state_badge.default.error")}</div>
        </ha-dialog-header>
        <div class="wrapper">
          ${this._params.error || ""}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="primaryAction" style="float: left" @click=${this.closeDialog} dialogAction="close">
            ${this.hass.localize("ui.common.ok")}
          </ha-button>
        </ha-dialog-footer>
      </ha-dialog>
    ` : q``;
  }
  static get styles() {
    return d`
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
};
i([be({
  attribute: !1
})], ds.prototype, "hass", void 0), i([fe()], ds.prototype, "_params", void 0), ds = i([ge("error-dialog")], ds);
var ps = Object.freeze({
  __proto__: null,
  get ErrorDialog() {
    return ds;
  }
});
let us = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.sensorGroups = {}, this.sensors = {};
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.sensorGroups = await la(this.hass), this.sensors = await oa(this.hass));
  }
  async showDialog(e) {
    await this._fetchData(), this._params = e, e.group_id && Object.keys(this.sensorGroups).includes(e.group_id) ? this.data = Object.assign({}, this.sensorGroups[e.group_id]) : this.data = {
      name: "",
      entities: [],
      timeout: 15,
      event_count: 2,
      mode: "count_window"
    }, await this.updateComplete;
  }
  async closeDialog() {
    this._params = void 0;
  }
  render() {
    var e, t, a;
    if (!this._params) return q``;
    const s = "weighted_decay" === this.data.mode;
    return q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">
            ${this.data.group_id ? ta("panels.sensors.dialogs.edit_group.title", this.hass.language, "{name}", this.sensorGroups[this.data.group_id].name) : ta("panels.sensors.dialogs.create_group.title", this.hass.language)}
          </div>
        </ha-dialog-header>
        <div class="wrapper">
          <alarmo-settings-row dialog>
            <span slot="heading">
              ${ta("panels.sensors.dialogs.create_group.fields.name.heading", this.hass.language)}
            </span>
            <span slot="description">
              ${ta("panels.sensors.dialogs.create_group.fields.name.description", this.hass.language)}
            </span>
            <ha-input
              label=${this.hass.localize("ui.common.name")}
              @input=${e => this.data = Object.assign(Object.assign({}, this.data), {
      name: String(e.target.value).trim()
    })}
              value="${this.data.name}"
            ></ha-input>
          </alarmo-settings-row>

          <alarmo-settings-row large dialog>
            <span slot="heading">
              ${ta("panels.sensors.dialogs.create_group.fields.sensors.heading", this.hass.language)}
            </span>
            <span slot="description">
              ${ta("panels.sensors.dialogs.create_group.fields.sensors.description", this.hass.language)}
            </span>
            <div>
              ${this.renderSensorOptions()}
            </div>
          </alarmo-settings-row>

          <alarmo-settings-row dialog>
            <span slot="heading">
              ${ta("panels.sensors.dialogs.create_group.fields.mode.heading", this.hass.language)}
            </span>
            <span slot="description">
              ${ta("panels.sensors.dialogs.create_group.fields.mode.description", this.hass.language)}
            </span>
            <alarmo-select
              .hass=${this.hass}
              .items=${[{
      value: "count_window",
      name: ta("panels.sensors.dialogs.create_group.fields.mode.count_window", this.hass.language)
    }, {
      value: "weighted_decay",
      name: ta("panels.sensors.dialogs.create_group.fields.mode.weighted_decay", this.hass.language)
    }]}
              .value=${null !== (e = this.data.mode) && void 0 !== e ? e : "count_window"}
              @value-changed=${e => this.data = Object.assign(Object.assign({}, this.data), {
      mode: e.detail.value
    })}
            ></alarmo-select>
          </alarmo-settings-row>

          <alarmo-settings-row dialog>
            <span slot="heading">
              ${ta("panels.sensors.dialogs.create_group.fields.timeout.heading", this.hass.language)}
            </span>
            <span slot="description">
              ${ta("panels.sensors.dialogs.create_group.fields.timeout.description", this.hass.language)}
            </span>
            <alarmo-duration-picker
              .hass=${this.hass}
              min="10"
              max="900"
              .value=${this.data.timeout}
              ?required=${!0}
              @value-changed=${e => this.data = Object.assign(Object.assign({}, this.data), {
      timeout: e.detail.value
    })}
            ></alarmo-duration-picker>
          </alarmo-settings-row>

          ${!s && this.data.entities.length > 2 ? q`
          <alarmo-settings-row dialog>
            <span slot="heading">
              ${ta("panels.sensors.dialogs.create_group.fields.event_count.heading", this.hass.language)}
            </span>
            <span slot="description">
              ${ta("panels.sensors.dialogs.create_group.fields.event_count.description", this.hass.language)}
            </span>
            <alarmo-select
              .hass=${this.hass}
              .items=${this.renderSensorCountOptions()}
              ?disabled=${this.data.entities.length <= 2}
              @value-changed=${e => {
      this.data = Object.assign(Object.assign({}, this.data), {
        event_count: Number(e.detail.value)
      });
    }}
              .value=${String(this.data.event_count > this.data.entities.length ? this.data.entities.length : this.data.event_count)}
            ></alarmo-select>
          </alarmo-settings-row>
          ` : ""}

          ${s ? q`
              <alarmo-settings-row dialog>
                <span slot="heading">
                  ${ta("panels.sensors.dialogs.create_group.fields.decay_per_minute.heading", this.hass.language)}
                </span>
                <span slot="description">
                  ${ta("panels.sensors.dialogs.create_group.fields.decay_per_minute.description", this.hass.language)}
                </span>
                <ha-input
                  type="number"
                  value="${null !== (t = this.data.decay_per_minute) && void 0 !== t ? t : 1}"
                  @input=${e => this.data = Object.assign(Object.assign({}, this.data), {
      decay_per_minute: Number(e.target.value)
    })}
                ></ha-input>
              </alarmo-settings-row>
              <alarmo-settings-row dialog>
                <span slot="heading">
                  ${ta("panels.sensors.dialogs.create_group.fields.threshold.heading", this.hass.language)}
                </span>
                <span slot="description">
                  ${ta("panels.sensors.dialogs.create_group.fields.threshold.description", this.hass.language)}
                </span>
                <ha-input
                  type="number"
                  value="${null !== (a = this.data.threshold) && void 0 !== a ? a : 10}"
                  @input=${e => this.data = Object.assign(Object.assign({}, this.data), {
      threshold: Number(e.target.value)
    })}
                ></ha-input>
              </alarmo-settings-row>
              ${this.data.entities.map(e => {
      var t, a;
      return q`
                  <alarmo-settings-row dialog nested>
                    <span slot="heading">${Ca(this.hass.states[e])}</span>
                    <span slot="description">
                      ${ta("panels.sensors.dialogs.create_group.fields.weight.heading", this.hass.language)}
                    </span>
                    <ha-input
                      type="number"
                      value="${null !== (a = (null !== (t = this.data.weights) && void 0 !== t ? t : {})[e]) && void 0 !== a ? a : 5}"
                      @input=${t => {
        var a;
        return this.data = Object.assign(Object.assign({}, this.data), {
          weights: Object.assign(Object.assign({}, null !== (a = this.data.weights) && void 0 !== a ? a : {}), {
            [e]: Number(t.target.value)
          })
        });
      }}
                    ></ha-input>
                  </alarmo-settings-row>
                `;
    })}
            ` : ""}
        </div>
        <ha-dialog-footer slot="footer">
          <ha-button appearance="plain" slot="secondaryAction" @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </ha-button>
          ${this.data.group_id ? q`
                <ha-button appearance="plain" slot="secondaryAction" @click=${this.deleteClick} variant="danger">
                  ${this.hass.localize("ui.common.delete")}
                </ha-button>
              ` : ""}
        </ha-dialog-footer>
      </ha-dialog>
    `;
  }
  renderSensorOptions() {
    const e = new Set(Object.values(this.sensorGroups).filter(e => e.group_id !== this.data.group_id).reduce((e, t) => e.concat(t.entities), [])),
      t = Object.keys(this.sensors).filter(t => !e.has(t)).map(e => {
        const t = this.hass.states[e],
          a = Object.entries(wa).find(([, t]) => t == this.sensors[e].type)[0];
        return {
          value: e,
          name: xa(Ca(t)),
          icon: $a[a]
        };
      });
    return t.sort(ka), t.length ? q`
      <alarmo-chip-set
        .hass=${this.hass}
        .items=${t}
        .value=${this.data.entities}
        toggleable
        @value-changed=${e => this.data = Object.assign(Object.assign({}, this.data), {
      entities: e.detail
    })}
      ></alarmo-chip-set>
    ` : ta("panels.sensors.cards.sensors.table.no_items", this.hass.language);
  }
  renderSensorCountOptions() {
    let e = [];
    for (let t = 2; t <= this.data.entities.length; t++) e = [...e, {
      name: `${t}`,
      value: `${t}`
    }];
    return e;
  }
  saveClick(e) {
    this.data.name.length && (this.data.group_id && this.data.name == this.sensorGroups[this.data.group_id].name || !Object.values(this.sensorGroups).find(e => e.name.toLowerCase() == this.data.name.toLowerCase())) ? this.data.entities.length < 2 ? La(e, ta("panels.sensors.dialogs.create_group.errors.insufficient_sensors", this.hass.language)) : (this.data.event_count > this.data.entities.length && (this.data = Object.assign(Object.assign({}, this.data), {
      event_count: this.data.entities.length
    })), ((e, t) => {
      const {
          group_id: a
        } = t,
        i = s(t, ["group_id"]);
      return a ? e.callWS(Object.assign({
        type: `${aa}/sensor_group/update`,
        group_id: a
      }, i)) : e.callWS(Object.assign({
        type: `${aa}/sensor_group/create`
      }, i));
    })(this.hass, this.data).catch(t => Ta(t, e)).then(() => {
      this.closeDialog();
    })) : La(e, ta("panels.sensors.dialogs.create_group.errors.invalid_name", this.hass.language));
  }
  deleteClick(e) {
    var t, a;
    this.data.group_id && (t = this.hass, a = this.data.group_id, t.callWS({
      type: `${aa}/sensor_group/delete`,
      group_id: a
    })).catch(t => Ta(t, e)).then(() => {
      this.closeDialog();
    });
  }
  static get styles() {
    return d`
      ${$e}
      div.wrapper {
        color: var(--primary-text-color);
      }
    `;
  }
};
i([be({
  attribute: !1
})], us.prototype, "hass", void 0), i([fe()], us.prototype, "_params", void 0), i([be()], us.prototype, "sensorGroups", void 0), i([be()], us.prototype, "sensors", void 0), i([be()], us.prototype, "data", void 0), us = i([ge("create-sensor-group-dialog")], us);
var gs = Object.freeze({
  __proto__: null,
  get CreateSensorGroupDialog() {
    return us;
  }
});
let ms = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.sensorGroups = {}, this.sensors = {};
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.sensorGroups = await la(this.hass), this.sensors = await oa(this.hass));
  }
  async showDialog(e) {
    await this._fetchData(), this._params = e, await this.updateComplete;
  }
  async closeDialog() {
    this._params = void 0;
  }
  render() {
    return this._params ? q`
      <ha-dialog
        open
        @closed=${this.closeDialog}
      >
        <ha-dialog-header slot="header">
          <ha-icon-button
            slot="navigationIcon"
            data-dialog="close"
            .label=${this.hass.localize("ui.common.close")}
            .path=${da}
          ></ha-icon-button>
          <div slot="title">${ta("panels.sensors.dialogs.manage_groups.title", this.hass.language)}</div>
        </ha-dialog-header>
        <div class="wrapper">
          <div class="description">
            ${ta("panels.sensors.dialogs.manage_groups.description", this.hass.language)}
          </div>
          <div class="container">
            ${Object.keys(this.sensorGroups).length ? Object.values(this.sensorGroups).map(e => this.renderGroup(e)) : ta("panels.sensors.dialogs.manage_groups.no_items", this.hass.language)}
          </div>
        </div>
        <ha-button appearance="plain" @click=${this.createGroupClick}>
          <ha-icon icon="hass:plus"></ha-icon>
          ${ta("panels.sensors.dialogs.manage_groups.actions.new_group", this.hass.language)}
        </ha-button>
      </ha-dialog>
    ` : q``;
  }
  renderGroup(e) {
    return q`
    <ha-card
      outlined
      @click=${t => this.editGroupClick(t, e.group_id)}
    >
      <ha-icon icon="hass:folder-outline"></ha-icon>
      <div>
        <span class="name">${e.name}</span>
        <span class="description">${ta("panels.general.cards.areas.table.summary_sensors", this.hass.language, "{number}", String(e.entities.length))}
      </div>
      <ha-icon-button .path=${ca}>
      </ha-icon-button>
    </ha-card>
    `;
  }
  createGroupClick(e) {
    const t = e.target;
    Ea(t, "show-dialog", {
      dialogTag: "create-sensor-group-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return gs;
      }),
      dialogParams: {}
    });
  }
  editGroupClick(e, t) {
    const a = e.target;
    Ea(a, "show-dialog", {
      dialogTag: "create-sensor-group-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return gs;
      }),
      dialogParams: {
        group_id: t
      }
    });
  }
  static get styles() {
    return d`
      ${$e}

      div.wrapper {
        color: var(--primary-text-color);
      }
      div.container {
        display: flex;
        flex-wrap: wrap;
      }
      ha-card {
        width: 100%;
        text-align: center;
        margin: 4px;
        box-sizing: border-box;
        padding: 8px;
        color: var(--primary-text-color);
        font-size: 16px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
      }
      ha-card:hover {
        background: rgba(var(--rgb-secondary-text-color), 0.1);
      }
      ha-card ha-icon {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
        color: var(--state-icon-color);
      }
      ha-card ha-icon-button {
        --mdc-icon-size: 24px;
        display: flex;
        flex: 0 0 40px;
        margin: 0px 10px;
        align-items: center;
      }
      ha-card div {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
      }
      ha-card span {
        display: flex;
        flex: 0 0 100%;
      }
      ha-card span.description {
        color: var(--secondary-text-color);
      }
      ha-button ha-icon {
        padding-right: 11px;
      }
    `;
  }
};
i([be({
  attribute: !1
})], ms.prototype, "hass", void 0), i([fe()], ms.prototype, "_params", void 0), i([be()], ms.prototype, "sensorGroups", void 0), i([be()], ms.prototype, "sensors", void 0), ms = i([ge("manage-sensor-groups-dialog")], ms);
var vs = Object.freeze({
  __proto__: null,
  get ManageSensorGroupsDialog() {
    return ms;
  }
});
let bs = class extends pe {
  constructor() {
    super(...arguments), this.header = "", this.open = !1;
  }
  render() {
    return q`
      ${this.open ? q`
            <div class="header open">
              <span @click=${() => {
      this.open = !1;
    }}>${this.header}</span>
              <ha-icon-button .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"} @click=${() => {
      this.open = !1;
    }}>
              </ha-icon-button>
            </div>
            <slot></slot>
            <div class="header open">
              <span @click=${() => {
      this.open = !1;
    }}>${this.header}</span>
              <ha-icon-button .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"} @click=${() => {
      this.open = !1;
    }}>
              </ha-icon-button>
            </div>
          ` : q`
            <div class="header">
              <span @click=${() => {
      this.open = !0;
    }}>${this.header}</span>
              <ha-icon-button .path=${ca} @click=${() => {
      this.open = !0;
    }}>
              </ha-icon-button>
            </div>
          `}
    `;
  }
  static get styles() {
    return d`
      :host {
      }

      div.header {
        display: flex;
        align-items: center;
        padding: 0px 16px;
        cursor: pointer;
      }
      div.header.open:first-of-type {
        border-bottom: 1px solid var(--divider-color);
      }
      div.header.open:last-of-type {
        border-top: 1px solid var(--divider-color);
      }

      :host([narrow]) div.header {
        border-top: 1px solid var(--divider-color);
        border-bottom: none;
      }

      div.header span {
        display: flex;
        flex-grow: 1;
      }

      div.seperator {
        height: 1px;
        background: var(--divider-color);
      }
    `;
  }
};
i([be({
  type: Boolean,
  reflect: !0
})], bs.prototype, "narrow", void 0), i([be()], bs.prototype, "header", void 0), i([be()], bs.prototype, "open", void 0), bs = i([ge("alarmo-collapsible-section")], bs);
let fs = class extends Ba(pe) {
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    if (!this.hass) return;
    const e = await ia(this.hass);
    this.areas = e;
    const t = await oa(this.hass);
    this.data = Object.keys(t).includes(this.item) ? t[this.item] : void 0;
  }
  render() {
    return this.data ? q`
      <ha-card>
        <div class="card-header">
          <div class="name">${ta("panels.sensors.cards.editor.title", this.hass.language)}</div>
          <ha-icon-button .path=${da} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${ta("panels.sensors.cards.editor.description", this.hass.language, "{entity}", Ca(this.hass.states[this.item]))}
        </div>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.sensors.cards.editor.fields.entity.heading", this.hass.language)}
          </span>
          <span slot="description">${this.data.entity_id}</span>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.sensors.cards.editor.fields.area.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${this.data.area && this.areas[this.data.area] ? this.areas[this.data.area].name : "-"}
          </span>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow} .large=${!0}>
          <span slot="heading">
            ${ta("panels.sensors.cards.editor.fields.device_type.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.sensors.cards.editor.fields.device_type.description", this.hass.language)}
          </span>

          <alarmo-select
            .hass=${this.hass}
            .items=${e = this.hass, Object.entries(wa).filter(([, e]) => e != wa.Other).map(([t, a]) => Object({
      value: a,
      name: ta(`panels.sensors.cards.editor.fields.device_type.choose.${a}.name`, e.language),
      description: ta(`panels.sensors.cards.editor.fields.device_type.choose.${a}.description`, e.language),
      icon: $a[t]
    }))}
            label=${ta("panels.sensors.cards.editor.fields.device_type.heading", this.hass.language)}
            clearable=${!0}
            icons=${!0}
            value=${this.data.type}
            @value-changed=${e => this.setType(e.target.value || wa.Other)}
          ></alarmo-select>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow} .large=${this.modesByArea(this.data.area).length > 3}>
          <span slot="heading">
            ${ta("panels.sensors.cards.editor.fields.modes.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.sensors.cards.editor.fields.modes.description", this.hass.language)}
          </span>

          <div>
            ${this.modesByArea(this.data.area).map(e => q`
                <ha-button
                  appearance="${this.data.modes.includes(e) || this.data.always_on ? "filled" : "plain"}"
                  variant="${this.data.modes.includes(e) || this.data.always_on ? "brand" : "neutral"}"
                  @click=${() => {
      this.setMode(e);
    }}
                  ?disabled=${this.data.always_on}
                >
                  <ha-svg-icon slot="start" .path=${fa[Object.entries(Qt).find(([, t]) => t == e)[0]]}></ha-svg-icon>
                  ${ta(`common.modes_short.${e}`, this.hass.language)}
                </ha-button>
              `)}
          </div>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.sensors.cards.editor.fields.group.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.sensors.cards.editor.fields.group.description", this.hass.language)}
          </span>

          <ha-button appearance="filled" @click=${this.manageGroupsClick}>
            ${ta("panels.sensors.cards.editor.actions.setup_groups", this.hass.language)}
            <ha-icon slot="end" icon="mdi:open-in-new"></ha-icon>
          </ha-button>
        </alarmo-settings-row>

        <alarmo-collapsible-section
          .narrow=${this.narrow}
          header=${ta("panels.sensors.cards.editor.actions.toggle_advanced", this.hass.language)}
        >
          ${!this.data.type || [wa.Environmental, wa.Tamper, wa.Other].includes(this.data.type) ? q`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.always_on.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.always_on.description", this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.always_on}
                    @change=${e => this._SetData({
      always_on: e.target.checked
    })}
                  ></ha-switch>
                </alarmo-settings-row>
              ` : ""}
          ${!this.data.type || [wa.Window, wa.Door, wa.Motion, wa.Other].includes(this.data.type) ? q`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.use_exit_delay.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.use_exit_delay.description", this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_exit_delay}
                    ?disabled=${this.data.always_on}
                    @change=${e => this._SetData({
      use_exit_delay: e.target.checked
    })}
                  ></ha-switch>
                </alarmo-settings-row>

                ${this.data.type == wa.Motion && this.data.use_exit_delay ? q`
                      <alarmo-settings-row .narrow=${this.narrow} nested>
                        <span slot="heading">
                          ${ta("panels.sensors.cards.editor.fields.allow_open.heading", this.hass.language)}
                        </span>
                        <span slot="description">
                          ${ta("panels.sensors.cards.editor.fields.allow_open.description", this.hass.language)}
                        </span>

                        <ha-switch
                          ?checked=${this.data.allow_open}
                          ?disabled=${this.data.always_on || this.data.arm_on_close}
                          @change=${e => this._SetData({
      allow_open: e.target.checked
    })}
                        ></ha-switch>
                      </alarmo-settings-row>
                    ` : ""}
              ` : ""}
          ${!this.data.type || [wa.Window, wa.Door, wa.Motion, wa.Other].includes(this.data.type) ? q`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.use_entry_delay.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.use_entry_delay.description", this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.use_entry_delay}
                    ?disabled=${this.data.always_on}
                    @change=${e => this._SetData({
      use_entry_delay: e.target.checked
    })}
                  ></ha-switch>
                </alarmo-settings-row>
              ` : ""}


          ${this.data.type && ![wa.Window, wa.Door, wa.Motion, wa.Other].includes(this.data.type) || !this.data.use_entry_delay ? "" : q`
                <alarmo-settings-row .narrow=${this.narrow} nested>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.entry_delay.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.entry_delay.description", this.hass.language)}
                  </span>

                  <alarmo-duration-picker
                    .hass=${this.hass}
                    max="900"
                    placeholder="-"
                    ?disabled=${!Oa(this.data.entry_delay)}
                    value=${this.data.entry_delay}
                    @value-changed=${e => this._SetData({
      entry_delay: e.detail.value
    })}
                  ></alarmo-duration-picker>
                </alarmo-settings-row>
              `}

          ${!this.data.type || [wa.Window, wa.Door, wa.Motion, wa.Other].includes(this.data.type) ? q`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.delay_on.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.delay_on.description", this.hass.language)}
                  </span>

                  <alarmo-duration-picker
                    .hass=${this.hass}
                    max="60"
                    step="5"
                    placeholder="-"
                    ?disabled=${!Oa(this.data.delay_on)}
                    value=${this.data.delay_on}
                    @value-changed=${e => this._SetData({
      delay_on: e.detail.value
    })}
                  ></alarmo-duration-picker>
                </alarmo-settings-row>
              ` : ""}

          ${!this.data.type || [wa.Door, wa.Other].includes(this.data.type) ? q`
                <alarmo-settings-row .narrow=${this.narrow}>
                  <span slot="heading">
                    ${ta("panels.sensors.cards.editor.fields.arm_on_close.heading", this.hass.language)}
                  </span>
                  <span slot="description">
                    ${ta("panels.sensors.cards.editor.fields.arm_on_close.description", this.hass.language)}
                  </span>

                  <ha-switch
                    ?checked=${this.data.arm_on_close}
                    ?disabled=${this.data.always_on}
                    @change=${e => this._SetData({
      arm_on_close: e.target.checked
    })}
                  ></ha-switch>
                </alarmo-settings-row>
              ` : ""}

        ${!this.data.type || [wa.Window, wa.Door, wa.Other].includes(this.data.type) ? q`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${ta("panels.sensors.cards.editor.fields.allow_open.heading", this.hass.language)}
                </span>
                <span slot="description">
                  ${ta("panels.sensors.cards.editor.fields.allow_open.description", this.hass.language)}
                </span>

                <ha-switch
                  ?checked=${this.data.allow_open}
                  ?disabled=${this.data.always_on || this.data.arm_on_close}
                  @change=${e => this._SetData({
      allow_open: e.target.checked
    })}
                ></ha-switch>
              </alarmo-settings-row>
            ` : ""}
        </alarmo-collapsible-section>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </ha-button>

          <ha-button appearance="plain" variant="danger" @click=${this.deleteClick}>
            ${ta("panels.sensors.cards.editor.actions.remove", this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    ` : q``;
    var e;
  }
  modesByArea(e) {
    return e && this.areas[e] ? Object.entries(this.areas[e].modes).filter(([, e]) => e.enabled).map(([e]) => e) : [];
  }
  _SetData(e) {
    if (this.data) for (const [t, a] of Object.entries(e)) switch (t) {
      case "always_on":
        this.data = Object.assign(Object.assign({}, this.data), {
          always_on: 1 == a
        }), a && (this.data = Object.assign(Object.assign({}, this.data), {
          arm_on_close: !1,
          use_exit_delay: !1,
          use_entry_delay: !1,
          allow_open: !1
        }));
        break;
      case "use_entry_delay":
        this.data = Object.assign(Object.assign({}, this.data), {
          use_entry_delay: 1 == a
        });
        break;
      case "use_exit_delay":
        this.data = Object.assign(Object.assign({}, this.data), {
          use_exit_delay: 1 == a
        }), this.data.type !== wa.Motion || a || (this.data = Object.assign(Object.assign({}, this.data), {
          allow_open: !1
        }));
        break;
      case "arm_on_close":
        this.data = Object.assign(Object.assign({}, this.data), {
          arm_on_close: 1 == a
        }), a && (this.data = Object.assign(Object.assign({}, this.data), {
          always_on: !1,
          allow_open: !1
        }));
        break;
      case "allow_open":
        this.data = Object.assign(Object.assign({}, this.data), {
          allow_open: 1 == a
        }), a && (this.data = Object.assign(Object.assign({}, this.data), {
          arm_on_close: !1,
          always_on: !1
        }));
        break;
      case "entry_delay":
        this.data = Object.assign(Object.assign({}, this.data), {
          entry_delay: a
        });
        break;
      case "delay_on":
        this.data = Object.assign(Object.assign({}, this.data), {
          delay_on: a
        });
    }
  }
  setMode(e) {
    var t, a;
    this.data && (this.data = Object.assign(Object.assign({}, this.data), {
      modes: this.data.modes.includes(e) ? (t = this.data.modes, a = e, t.filter(e => e !== a)) : Ha(this.data.modes.concat([e]))
    }));
  }
  setType(e) {
    if (!this.data) return;
    const t = e != wa.Other ? (e => {
      const t = t => t.filter(t => e.includes(t));
      return {
        [wa.Door]: {
          modes: t([Qt.ArmedAway, Qt.ArmedHome, Qt.ArmedNight, Qt.ArmedVacation]),
          always_on: !1,
          allow_open: !1,
          arm_on_close: !1,
          use_entry_delay: !0,
          use_exit_delay: !0
        },
        [wa.Window]: {
          modes: t([Qt.ArmedAway, Qt.ArmedHome, Qt.ArmedNight, Qt.ArmedVacation]),
          always_on: !1,
          allow_open: !1,
          arm_on_close: !1,
          use_entry_delay: !1,
          use_exit_delay: !1
        },
        [wa.Motion]: {
          modes: t([Qt.ArmedAway, Qt.ArmedVacation]),
          always_on: !1,
          allow_open: !0,
          arm_on_close: !1,
          use_entry_delay: !0,
          use_exit_delay: !0
        },
        [wa.Tamper]: {
          modes: t([Qt.ArmedAway, Qt.ArmedHome, Qt.ArmedNight, Qt.ArmedVacation, Qt.ArmedCustom]),
          always_on: !1,
          allow_open: !1,
          arm_on_close: !1,
          use_entry_delay: !1,
          use_exit_delay: !1
        },
        [wa.Environmental]: {
          modes: t([Qt.ArmedAway, Qt.ArmedHome, Qt.ArmedNight, Qt.ArmedVacation, Qt.ArmedCustom]),
          always_on: !0,
          allow_open: !1,
          arm_on_close: !1,
          use_entry_delay: !1,
          use_exit_delay: !1
        }
      };
    })(this.modesByArea(this.data.area))[e] : {};
    this.data = Object.assign(Object.assign(Object.assign({}, this.data), {
      type: e
    }), t);
  }
  deleteClick(e) {
    var t, a;
    (t = this.hass, a = this.item, t.callWS({
      type: `${aa}/sensor/clear_options`,
      entity_id: a
    })).catch(t => Ta(t, e)).then(() => {
      this.cancelClick();
    });
  }
  saveClick(e) {
    if (!this.data) return;
    const t = [];
    this.data.modes.length || this.data.always_on || t.push(ta("panels.sensors.cards.editor.errors.no_modes", this.hass.language)), t.length ? La(e, q`
          ${ta("panels.sensors.cards.editor.errors.description", this.hass.language)}
          <ul>
            ${t.map(e => q`
                  <li>${e}</li>
                `)}
          </ul>
        `) : ((e, t) => {
      const {
          entity_id: a,
          type: i,
          area: r
        } = t,
        o = s(t, ["entity_id", "type", "area"]);
      return e.callWS(Object.assign(Object.assign({
        type: `${aa}/sensor/set_options`,
        entity_id: a
      }, void 0 !== i ? {
        sensor_type: i
      } : {}), o));
    })(this.hass, Object.assign({}, this.data)).catch(t => Ta(t, e)).then(() => {
      this.cancelClick();
    });
  }
  cancelClick() {
    Ma(0, Fa("sensors"), !0);
  }
  manageGroupsClick(e) {
    const t = e.target;
    Ea(t, "show-dialog", {
      dialogTag: "manage-sensor-groups-dialog",
      dialogImport: () => Promise.resolve().then(function () {
        return vs;
      }),
      dialogParams: {}
    });
  }
};
fs.styles = we, i([be()], fs.prototype, "hass", void 0), i([be()], fs.prototype, "narrow", void 0), i([be()], fs.prototype, "item", void 0), i([be()], fs.prototype, "data", void 0), fs = i([ge("sensor-editor-card")], fs);
const _s = e => Object.keys(e.modes).filter(t => e.modes[t].enabled),
  ys = e => {
    let t = [];
    return Object.values(e).forEach(e => {
      t = [...t, ..._s(e)];
    }), t = Ha(t), t.sort((e, t) => {
      const a = Object.values(Qt),
        s = a.findIndex(t => t == e),
        i = a.findIndex(e => e == t);
      return s - i;
    }), t;
  },
  ws = "no_area";
let $s = class extends Ba(pe) {
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.areas = await ia(this.hass), this.sensors = await oa(this.hass));
  }
  async firstUpdated() {
    this.path && 2 == this.path.length && "filter" == this.path[0] && (this.selectedArea = this.path[1]);
  }
  shouldUpdate(e) {
    const t = e.get("hass");
    return !t || 1 != e.size || !this.sensors || Object.keys(this.sensors).some(e => t.states[e] !== this.hass.states[e]);
  }
  render() {
    return this.hass && this.areas && this.sensors ? q`
      <ha-card header="${ta("panels.sensors.title", this.hass.language)}">
        <div class="card-content">
          ${ta("panels.sensors.cards.sensors.description", this.hass.language)}
        </div>

        <alarmo-table
          .hass=${this.hass}
          ?selectable=${!0}
          .columns=${this.tableColumns()}
          .data=${this.getTableData()}
          .filters=${this.getTableFilterOptions()}
          @row-click=${e => Ma(0, Fa("sensors", {
      params: {
        edit: e.detail.id
      }
    }), !0)}
        >
          ${ta("panels.sensors.cards.sensors.table.no_items", this.hass.language)}
        </alarmo-table>
      </ha-card>
    ` : q``;
  }
  tableColumns() {
    const e = (...e) => e.map(e => e.replace(".", "_")).join("_");
    return {
      icon: {
        width: "40px",
        renderer: t => {
          const a = this.hass.states[t.entity_id],
            s = Object.keys(wa).find(e => wa[e] == t.type),
            i = a ? "on" === a.state ? Aa[s] : $a[s] : "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z";
          return t.area == ws ? q`
              <ha-icon icon="mdi:alert" style="color: var(--error-color)" id="${e(t.entity_id, "icon")}"></ha-icon>
              <ha-tooltip for="${e(t.entity_id, "icon")}">${ta("panels.sensors.cards.sensors.table.no_area_warning", this.hass.language)}</ha-tooltip>
            ` : q`
              <ha-svg-icon .path=${i} id="${e(t.entity_id, "icon")}"></ha-svg-icon>
              <ha-tooltip for="${e(t.entity_id, "icon")}">${a ? ta(`panels.sensors.cards.editor.fields.device_type.choose.${t.type}.name`, this.hass.language) : this.hass.localize("state_badge.default.entity_not_found")}</ha-tooltip>
            `;
        }
      },
      name: {
        title: this.hass.localize("ui.components.entity.entity-picker.entity"),
        width: "60%",
        grow: !0,
        text: !0,
        renderer: t => q`
          <span id="${e(t.entity_id, "name")}">
            ${t.name}
          </span>
          ${t.area == ws ? q`<ha-tooltip for="${e(t.entity_id, "name")}">${ta("panels.sensors.cards.sensors.table.no_area_warning", this.hass.language)}</ha-tooltip>` : K}
          <span class="secondary" id="${e(t.entity_id, "name", "secondary")}">
            ${t.entity_id}
          </span>
          ${t.area == ws ? q`<ha-tooltip for="${e(t.entity_id, "name", "secondary")}">${ta("panels.sensors.cards.sensors.table.no_area_warning", this.hass.language)}</ha-tooltip>` : K}
        `
      },
      modes: {
        title: ta("panels.sensors.cards.sensors.table.arm_modes", this.hass.language),
        width: "25%",
        hide: this.narrow,
        text: !0,
        renderer: t => q`
          <span id="${e(t.entity_id, "modes")}">
            ${t.always_on ? ta("panels.sensors.cards.sensors.table.always_on", this.hass.language) : t.modes.length ? t.modes.map(e => ta(`common.modes_short.${e}`, this.hass.language)).join(", ") : this.hass.localize("state_attributes.climate.preset_mode.none")}
          </span>
          ${t.area == ws ? q`<ha-tooltip for="${e(t.entity_id, "modes")}">${ta("panels.sensors.cards.sensors.table.no_area_warning", this.hass.language)}</ha-tooltip>` : K}
        `
      }
    };
  }
  getTableData() {
    const e = Object.keys(this.sensors).map(e => {
      const t = this.hass.states[e],
        a = this.sensors[e],
        s = a.area ? _s(this.areas[a.area]) : ys(this.areas),
        i = Object.assign(Object.assign({}, a), {
          id: e,
          name: Ca(t),
          modes: a.always_on ? s : a.modes.filter(e => s.includes(e)),
          warning: !a.area,
          area: a.area || ws
        });
      return i;
    });
    return e.sort(ka), e;
  }
  getTableFilterOptions() {
    let e = Object.values(this.areas).map(e => Object({
      value: e.area_id,
      name: e.name,
      badge: t => t.filter(t => t.area == e.area_id).length
    })).sort(ka);
    Object.values(this.sensors).filter(e => !e.area).length && (e = [{
      value: ws,
      name: this.hass.localize("state_attributes.climate.preset_mode.none"),
      badge: e => e.filter(e => e.area == ws).length
    }, ...e]);
    const t = ys(this.areas).map(e => Object({
      value: e,
      name: ta(`common.modes_short.${e}`, this.hass.language),
      badge: t => t.filter(t => t.modes.includes(e)).length
    }));
    return {
      area: {
        name: ta("components.table.filter.item", this.hass.language, "name", ta("panels.sensors.cards.editor.fields.area.heading", this.hass.language)),
        items: e,
        value: this.selectedArea ? [this.selectedArea] : []
      },
      modes: {
        name: ta("components.table.filter.item", this.hass.language, "name", ta("panels.sensors.cards.sensors.table.arm_modes", this.hass.language)),
        items: t,
        value: this.selectedMode ? [this.selectedMode] : []
      }
    };
  }
};
$s.styles = we, i([be()], $s.prototype, "hass", void 0), i([be()], $s.prototype, "narrow", void 0), i([be()], $s.prototype, "areas", void 0), i([be()], $s.prototype, "sensors", void 0), i([be()], $s.prototype, "selectedArea", void 0), i([be()], $s.prototype, "selectedMode", void 0), i([be()], $s.prototype, "path", void 0), $s = i([ge("sensors-overview-card")], $s);
let As = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.addSelection = [], this.areas = {}, this.sensors = {};
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.areas = await ia(this.hass), this.sensors = await oa(this.hass), this.targetArea && Object.keys(this.areas).includes(this.targetArea) || (this.targetArea = Object.keys(this.areas)[0]));
  }
  render() {
    if (!this.hass || !this.areas) return q``;
    const e = {
        checkbox: {
          width: "48px",
          renderer: e => q`
          <ha-checkbox
            @change=${t => this.toggleSelect(t, e.id)}
            ?checked=${this.addSelection.includes(e.id)}
          ></ha-checkbox>
        `
        },
        icon: {
          width: "40px",
          renderer: e => q`
          <state-badge .hass=${this.hass} .stateObj=${this.hass.states[e.id]}></state-badge>
        `
        },
        name: {
          title: this.hass.localize("ui.components.entity.entity-picker.entity"),
          width: "40%",
          grow: !0,
          text: !0,
          renderer: e => q`
          ${xa(e.name)}
          <span class="secondary">${e.id}</span>
        `
        },
        type: {
          title: ta("panels.sensors.cards.add_sensors.table.type", this.hass.language),
          width: "40%",
          hide: this.narrow,
          text: !0,
          renderer: e => e.type ? ta(`panels.sensors.cards.editor.fields.device_type.choose.${e.type}.name`, this.hass.language) : this.hass.localize("state.default.unknown")
        }
      },
      t = ((e, t, a = !1) => {
        const s = Object.values(e.states).filter(e => ls(e, a)).filter(e => !t.includes(e.entity_id)).map(e => Object({
          id: e.entity_id,
          name: Ca(e),
          icon: cs(e)
        }));
        return s.sort(ka), s;
      })(this.hass, Object.keys(this.sensors), !0),
      a = t.map(e => Object.assign(Object.assign({}, e), {
        type: hs(this.hass.states[e.id]),
        isSupportedType: void 0 !== hs(this.hass.states[e.id]) ? "true" : "false"
      }));
    return q`
      <ha-card header="${ta("panels.sensors.cards.add_sensors.title", this.hass.language)}">
        <div class="card-content">
          ${ta("panels.sensors.cards.add_sensors.description", this.hass.language)}
        </div>

        ${Object.keys(this.areas).length > 1 ? q`
              <div class="card-content">
                <alarmo-select
                  .hass=${this.hass}
                  .items=${Object.values(this.areas).map(e => Object({
      value: e.area_id,
      name: e.name
    }))}
                  value=${this.targetArea}
                  label=${this.hass.localize("ui.components.area-picker.area")}
                  @value-changed=${e => this.targetArea = e.target.value}
                ></alarmo-select>
              </div>
            ` : ""}

        <alarmo-table
          .hass=${this.hass}
          .columns=${e}
          .data=${a}
          .filters=${this.getTableFilterOptions()}
        >
          ${ta("panels.sensors.cards.add_sensors.no_items", this.hass.language)}
        </alarmo-table>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addSelected} ?disabled=${0 == this.addSelection.length || !this.targetArea}>
            ${ta("panels.sensors.cards.add_sensors.actions.add_to_alarm", this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }
  toggleSelect(e, t) {
    const a = e.target.checked;
    this.addSelection = a && !this.addSelection.includes(t) ? [...this.addSelection, t] : a ? this.addSelection : this.addSelection.filter(e => e != t);
  }
  addSelected(e) {
    if (!this.hass || !this.targetArea) return;
    const t = Object.values(this.sensors).filter(e => e.area == this.targetArea).map(e => e.entity_id);
    var a, s, i;
    (a = this.hass, s = this.targetArea, i = [...t, ...this.addSelection], a.callWS(Object.assign(Object.assign({
      type: `${aa}/area/update_sensors`,
      area_id: s,
      sensors: i,
      arm_on_close: !1,
      delay_on: 0,
      always_on: !1
    }, {}), {}))).catch(t => Ta(t, e)).then(), this.addSelection = [];
  }
  getTableFilterOptions() {
    return {
      isSupportedType: {
        name: ta("panels.sensors.cards.add_sensors.actions.filter_supported", this.hass.language),
        items: [{
          value: "true",
          name: "true"
        }],
        value: ["true"],
        binary: !0
      }
    };
  }
};
As.styles = we, i([be()], As.prototype, "hass", void 0), i([be()], As.prototype, "narrow", void 0), i([be()], As.prototype, "addSelection", void 0), i([be()], As.prototype, "areas", void 0), i([be()], As.prototype, "sensors", void 0), i([be()], As.prototype, "targetArea", void 0), As = i([ge("add-sensors-card")], As);
let Es = class extends pe {
  firstUpdated() {
    (async () => {
      await ye();
    })();
  }
  render() {
    var e, t;
    if (!this.hass) return q``;
    if (this.path.params.edit) return q`
        <sensor-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .item=${this.path.params.edit}
        ></sensor-editor-card>
      `;
    {
      const a = null === (e = this.path.filter) || void 0 === e ? void 0 : e.area,
        s = null === (t = this.path.filter) || void 0 === t ? void 0 : t.mode;
      return q`
        <sensors-overview-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          .selectedArea=${a}
          .selectedMode=${s}
        ></sensors-overview-card>
        <add-sensors-card .hass=${this.hass} .narrow=${this.narrow}></add-sensors-card>
      `;
    }
  }
};
i([be()], Es.prototype, "hass", void 0), i([be()], Es.prototype, "narrow", void 0), i([be()], Es.prototype, "path", void 0), Es = i([ge("alarm-view-sensors")], Es);
let xs = class extends pe {
  constructor() {
    super(...arguments), this.data = {
      can_arm: !0,
      can_disarm: !0,
      is_override_code: !1
    }, this.repeatCode = "", this.areas = {};
  }
  async firstUpdated() {
    if (this.users = await na(this.hass), this.areas = await ia(this.hass), this.item) {
      const e = this.users[this.item];
      this.data = Sa(e, "code");
    }
    this.data = Object.assign(Object.assign({}, this.data), {
      area_limit: (this.data.area_limit || []).filter(e => Object.keys(this.areas).includes(e))
    }), (this.data.area_limit || []).length || (this.data = Object.assign(Object.assign({}, this.data), {
      area_limit: Object.keys(this.areas)
    }));
  }
  render() {
    return this.users ? q`
      <ha-card>
        <div class="card-header">
          <div class="name">
            ${this.item ? ta("panels.codes.cards.edit_user.title", this.hass.language) : ta("panels.codes.cards.new_user.title", this.hass.language)}
          </div>
          <ha-icon-button .path=${da} @click=${this.cancelClick}></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.item ? ta("panels.codes.cards.edit_user.description", this.hass.language, "{name}", this.users[this.item].name) : ta("panels.codes.cards.new_user.description", this.hass.language)}
        </div>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">${ta("panels.codes.cards.new_user.fields.name.heading", this.hass.language)}</span>
          <span slot="description">
            ${ta("panels.codes.cards.new_user.fields.name.description", this.hass.language)}
          </span>

          <ha-input
            label="${ta("panels.codes.cards.new_user.fields.name.heading", this.hass.language)}"
            placeholder=""
            value=${this.data.name}
            @input=${e => this.data = Object.assign(Object.assign({}, this.data), {
      name: e.target.value
    })}
          ></ha-input>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.codes.cards.new_user.fields.code.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${this.item && this.data.has_code ? ta("panels.codes.cards.edit_user.fields.code.description_keep_blank", this.hass.language) : ta("panels.codes.cards.new_user.fields.code.description", this.hass.language)}
          </span>

          <ha-input
            label="${ta("panels.codes.cards.new_user.fields.code.heading", this.hass.language)}"
            placeholder=""
            type="password"
            value=${this.data.code || ""}
            @input=${e => this.data = Object.assign(Object.assign({}, this.data), {
      code: String(e.target.value).trim()
    })}
          ></ha-input>
        </alarmo-settings-row>

        ${(this.data.code || "").length ? q`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${ta("panels.codes.cards.new_user.fields.confirm_code.heading", this.hass.language)}
                </span>
                <span slot="description">
                  ${ta("panels.codes.cards.new_user.fields.confirm_code.description", this.hass.language)}
                </span>

                <ha-input
                  label="${ta("panels.codes.cards.new_user.fields.confirm_code.heading", this.hass.language)}"
                  placeholder=""
                  type="password"
                  value=${this.repeatCode || ""}
                  @input=${e => this.repeatCode = String(e.target.value).trim()}
                ></ha-input>
              </alarmo-settings-row>
            ` : ""}

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.codes.cards.new_user.fields.can_arm.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.codes.cards.new_user.fields.can_arm.description", this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_arm}
            @change=${e => this.data = Object.assign(Object.assign({}, this.data), {
      can_arm: e.target.checked
    })}
          ></ha-switch>
        </alarmo-settings-row>

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.codes.cards.new_user.fields.can_disarm.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.codes.cards.new_user.fields.can_disarm.description", this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.can_disarm}
            @change=${e => this.data = Object.assign(Object.assign({}, this.data), {
      can_disarm: e.target.checked
    })}
          ></ha-switch>
        </alarmo-settings-row>

        ${this.getAreaOptions().length >= 2 ? q`
              <alarmo-settings-row .narrow=${this.narrow}>
                <span slot="heading">
                  ${ta("panels.codes.cards.new_user.fields.area_limit.heading", this.hass.language)}
                </span>
                <span slot="description">
                  ${ta("panels.codes.cards.new_user.fields.area_limit.description", this.hass.language)}
                </span>

                <div class="checkbox-list">
                  ${this.getAreaOptions().map(e => {
      var t;
      const a = (this.data.area_limit || []).includes(e.value) || !(null === (t = this.data.area_limit) || void 0 === t ? void 0 : t.length);
      return q`
                      <div>
                        <ha-checkbox
                          @change=${t => this.toggleSelectArea(e.value, t.target.checked)}
                          ?disabled=${a && (this.data.area_limit || []).length <= 1}
                          ?checked=${a}
                        ></ha-checkbox>
                        <span @click=${() => this.toggleSelectArea(e.value, !a)}>
                          ${e.name}
                        </span>
                      </div>
                    `;
    })}
                </div>
              </alarmo-settings-row>
            ` : ""}

        <alarmo-settings-row .narrow=${this.narrow}>
          <span slot="heading">
            ${ta("panels.codes.cards.new_user.fields.is_override_code.heading", this.hass.language)}
          </span>
          <span slot="description">
            ${ta("panels.codes.cards.new_user.fields.is_override_code.description", this.hass.language)}
          </span>

          <ha-switch
            ?checked=${this.data.is_override_code}
            @change=${e => this.data = Object.assign(Object.assign({}, this.data), {
      is_override_code: e.target.checked
    })}
          ></ha-switch>
        </alarmo-settings-row>

        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.saveClick}>
            ${this.hass.localize("ui.common.save")}
          </ha-button>

          ${this.item ? q`
                <ha-button appearance="plain" variant="danger" @click=${this.deleteClick}>
                  ${this.hass.localize("ui.common.delete")}
                </ha-button>
              ` : ""}
        </div>
      </ha-card>
    ` : q``;
  }
  getAreaOptions() {
    let e = Object.keys(this.areas || {}).map(e => Object({
      value: e,
      name: this.areas[e].name
    }));
    return e.sort(ka), e;
  }
  toggleSelectArea(e, t) {
    if ((this.data.area_limit || []).length <= 1 && !t) return;
    let a = this.data.area_limit || [];
    a = t ? a.includes(e) ? a : [...a, e] : a.includes(e) ? a.filter(t => t != e) : a, this.data = Object.assign(Object.assign({}, this.data), {
      area_limit: a
    });
  }
  deleteClick(e) {
    var t, a;
    this.item && (t = this.hass, a = this.item, t.callWS({
      type: `${aa}/user/delete`,
      user_id: a
    })).catch(t => Ta(t, e)).then(() => {
      this.cancelClick();
    });
  }
  saveClick(e) {
    var t, a;
    let i = Object.assign({}, this.data);
    (null === (t = i.name) || void 0 === t ? void 0 : t.length) ? this.item || (null === (a = i.code) || void 0 === a ? void 0 : a.length) && !(i.code.length < 4) ? (i.code || "").length && (i.code || "").length < 4 ? La(e, ta("panels.codes.cards.new_user.errors.no_code", this.hass.language)) : (i.code || "").length && i.code !== this.repeatCode ? (La(e, ta("panels.codes.cards.new_user.errors.code_mismatch", this.hass.language)), this.data = Sa(this.data, "code"), this.repeatCode = "") : (this.getAreaOptions().length && !this.getAreaOptions().every(e => (this.data.area_limit || []).includes(e.value)) || (i = Object.assign(Object.assign({}, i), {
      area_limit: []
    })), ((e, t) => {
      const {
          user_id: a,
          has_code: i
        } = t,
        r = s(t, ["user_id", "has_code"]);
      return a ? e.callWS(Object.assign({
        type: `${aa}/user/update`,
        user_id: a
      }, r)) : e.callWS(Object.assign({
        type: `${aa}/user/create`
      }, r));
    })(this.hass, i).catch(t => Ta(t, e)).then(() => this.cancelClick())) : La(e, ta("panels.codes.cards.new_user.errors.no_code", this.hass.language)) : La(e, ta("panels.codes.cards.new_user.errors.no_name", this.hass.language));
  }
  cancelClick() {
    Ma(0, Fa("codes"), !0);
  }
  static get styles() {
    return d`
      ${we}
      div.checkbox-list {
        display: flex;
        flex-direction: row;
      }
      div.checkbox-list div {
        display: flex;
        align-items: center;
      }
      div.checkbox-list div span {
        cursor: pointer;
      }
    `;
  }
};
i([be()], xs.prototype, "hass", void 0), i([be()], xs.prototype, "narrow", void 0), i([be()], xs.prototype, "item", void 0), i([be()], xs.prototype, "data", void 0), i([be()], xs.prototype, "repeatCode", void 0), xs = i([ge("user-editor-card")], xs);
let Cs = class extends Ba(pe) {
  constructor() {
    super(...arguments), this.users = {};
  }
  hassSubscribe() {
    return this._fetchData(), [sa(this.hass, () => this._fetchData())];
  }
  async _fetchData() {
    this.hass && (this.users = await na(this.hass));
  }
  render() {
    return this.hass ? "new_user" == this.path.subpage ? q`
        <user-editor-card .hass=${this.hass} .narrow=${this.narrow}></user-editor-card>
      ` : this.path.params.edit_user ? q`
        <user-editor-card
          .hass=${this.hass}
          .narrow=${this.narrow}
          item=${this.path.params.edit_user}
        ></user-editor-card>
      ` : this.usersPanel() : q``;
  }
  usersPanel() {
    if (!this.hass) return q``;
    const e = Object.values(this.users);
    e.sort(ka);
    const t = {
        icon: {
          width: "40px"
        },
        name: {
          title: this.hass.localize("ui.common.name"),
          width: "60%",
          grow: !0,
          text: !0
        },
        enabled: {
          title: ta("common.enabled", this.hass.language),
          width: "30%",
          text: !0
        }
      },
      a = e.map(e => ({
        id: e.user_id,
        icon: q`
          <ha-icon icon="mdi:account-outline" class="${e.enabled ? "" : "disabled"}"></ha-icon>
        `,
        name: q`
          <span class="${e.enabled ? "" : "disabled"}">
            ${xa(e.name)}
          </span>
        `,
        enabled: q`
          <span class="${e.enabled ? "" : "disabled"}">
            ${e.enabled ? ta("common.enabled", this.hass.language) : ta("common.disabled", this.hass.language)}
          </span>
        `
      }));
    return q`
      <ha-card header="${ta("panels.codes.cards.user_management.title", this.hass.language)}">
        <div class="card-content">
          ${ta("panels.codes.cards.user_management.description", this.hass.language)}
        </div>

        <alarmo-table
          ?selectable=${!0}
          .columns=${t}
          .data=${a}
          @row-click=${e => {
      const t = String(e.detail.id);
      Ma(0, Fa("codes", {
        params: {
          edit_user: t
        }
      }), !0);
    }}
        >
          ${ta("panels.codes.cards.user_management.no_items", this.hass.language)}
        </alarmo-table>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${this.addUserClick}>
            ${ta("panels.codes.cards.user_management.actions.new_user", this.hass.language)}
          </ha-button>
        </div>
      </ha-card>
    `;
  }
  addUserClick() {
    Ma(0, Fa("codes", "new_user"), !0);
  }
};
var Hs;
Cs.styles = we, i([be()], Cs.prototype, "hass", void 0), i([be()], Cs.prototype, "narrow", void 0), i([be()], Cs.prototype, "path", void 0), i([be()], Cs.prototype, "users", void 0), Cs = i([ge("alarm-view-codes")], Cs), function (e) {
  e.General = "general", e.Sensors = "sensors", e.Codes = "codes";
}(Hs || (Hs = {}));
let Ss = class extends pe {
  async firstUpdated() {
    window.addEventListener("location-changed", () => {
      window.location.pathname.includes("midnight_911_frontend_plugin") && this.requestUpdate();
    }), await ye(), this.userConfig = await na(this.hass);
    try {
      const {
        token: e
      } = await this.hass.callWS({
        type: "brands/access_token"
      });
      this.brandToken = e;
    } catch (e) {}
    this.requestUpdate();
  }
  render() {
    if (!customElements.get("ha-panel-config") || !this.userConfig) return q`
        loading...
      `;
    const e = Ga();
    return q`
      <div class="header">
        <div class="toolbar">
          <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
          ${this.brandToken ? q`
                <img
                  class="brand-mark"
                  src="/api/brands/integration/${"midnight_911_frontend_plugin"}/icon.png?token=${this.brandToken}"
                  alt=""
                  @error=${e => e.target.style.display = "none"}
                />
              ` : ""}
          <div class="main-title">
            ${ta("title", this.hass.language)}
          </div>
          <div class="version">
            v${"1.0.0"}
          </div>
        </div>

        <ha-tab-group
          @wa-tab-show=${this.handlePageSelected}
        >
          ${Object.values(Hs).map(t => q`
            <ha-tab-group-tab slot="nav" panel="${t}" .active=${e.page === t}>
              ${ta(`panels.${t}.title`, this.hass.language)}
            </ha-tab-group-tab>
          `)}
        </ha-tab-group>
      </div>
      <div class="view">
        ${this.getView(e)}
      </div>
    `;
  }
  getView(e) {
    switch (e.page) {
      case "general":
        return q`
          <alarm-view-general .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-general>
        `;
      case "sensors":
        return q`
          <alarm-view-sensors .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-sensors>
        `;
      case "codes":
        return q`
          <alarm-view-codes .hass=${this.hass} .narrow=${this.narrow} .path=${e}></alarm-view-codes>
        `;
      default:
        return q`
          <ha-card header="Page not found">
            <div class="card-content">
              The page you are trying to reach cannot be found. Please select a page from the menu above to continue.
            </div>
          </ha-card>
        `;
    }
  }
  handlePageSelected(e) {
    const t = e.detail.name;
    t !== Ga().page ? (Ma(0, Fa(t)), this.requestUpdate()) : scrollTo(0, 0);
  }
  static get styles() {
    return d`
      ${we} :host {
        color: var(--primary-text-color);
        --paper-card-header-color: var(--primary-text-color);
      }
      .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
      }
      .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
      }
      .brand-mark {
        height: 24px;
        width: 24px;
        margin-left: 24px;
      }
      .main-title {
        margin: 0 0 0 12px;
        line-height: 20px;
        flex-grow: 1;
      }
      ha-tab-group {
        margin-left: max(env(safe-area-inset-left), 24px);
        margin-right: max(env(safe-area-inset-right), 24px);
        --ha-tab-active-text-color: var(--app-header-text-color, white);
        --ha-tab-indicator-color: var(--app-header-text-color, white);
        --ha-tab-track-color: transparent;
      }
      .view {
        height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
      }
      .view > * {
        width: 600px;
        max-width: 600px;
      }
      .view > *:last-child {
        margin-bottom: 20px;
      }
      .version {
        font-size: 14px;
        color: var(--primary-text-color);
      }
    `;
  }
};
i([be({
  attribute: !1
})], Ss.prototype, "hass", void 0), i([be({
  type: Boolean,
  reflect: !0
})], Ss.prototype, "narrow", void 0), i([be({
  attribute: !1
})], Ss.prototype, "userConfig", void 0), i([be({
  attribute: !1
})], Ss.prototype, "brandToken", void 0), Ss = i([ge("alarm-panel")], Ss);
export { Ss as MyAlarmPanel };
