var ai=Object.defineProperty;var li=Object.getOwnPropertyDescriptor;var v=(s,i,e,t)=>{for(var n=t>1?void 0:t?li(i,e):i,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(t?o(i,e,n):o(n))||n);return t&&n&&ai(i,e,n),n};var ze=globalThis,Ne=ze.ShadowRoot&&(ze.ShadyCSS===void 0||ze.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),yt=new WeakMap,Ce=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(Ne&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=yt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&yt.set(e,i))}return i}toString(){return this.cssText}},wt=s=>new Ce(typeof s=="string"?s:s+"",void 0,et),x=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,n,r)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new Ce(e,s,et)},$t=(s,i)=>{if(Ne)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=ze.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,s.appendChild(t)}},tt=Ne?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return wt(e)})(s):s;var{is:ci,defineProperty:di,getOwnPropertyDescriptor:pi,getOwnPropertyNames:hi,getOwnPropertySymbols:gi,getPrototypeOf:ui}=Object,Z=globalThis,kt=Z.trustedTypes,mi=kt?kt.emptyScript:"",fi=Z.reactiveElementPolyfillSupport,Ee=(s,i)=>s,Ae={toAttribute(s,i){switch(i){case Boolean:s=s?mi:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},qe=(s,i)=>!ci(s,i),St={attribute:!0,type:String,converter:Ae,reflect:!1,useDefault:!1,hasChanged:qe};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Z.litPropertyMetadata??(Z.litPropertyMetadata=new WeakMap);var G=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=St){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&di(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:r}=pi(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??St}static _$Ei(){if(this.hasOwnProperty(Ee("elementProperties")))return;let i=ui(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(Ee("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ee("properties"))){let e=this.properties,t=[...hi(e),...gi(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(tt(n))}else i!==void 0&&e.push(tt(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:Ae).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let r=t.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Ae;this._$Em=n;let a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(i,e,t,n=!1,r){if(i!==void 0){let o=this.constructor;if(n===!1&&(r=this[i]),t??(t=o.getPropertyOptions(i)),!((t.hasChanged??qe)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:r},o){t&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,o??e??this[i]),r!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,r]of t){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(i){}firstUpdated(i){}};G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[Ee("elementProperties")]=new Map,G[Ee("finalized")]=new Map,fi?.({ReactiveElement:G}),(Z.reactiveElementVersions??(Z.reactiveElementVersions=[])).push("2.1.2");var Fe=globalThis,Ct=s=>s,je=Fe.trustedTypes,Et=je?je.createPolicy("lit-html",{createHTML:s=>s}):void 0,Pt="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,Dt="?"+Q,vi=`<${Dt}>`,se=document,Te=()=>se.createComment(""),Oe=s=>s===null||typeof s!="object"&&typeof s!="function",lt=Array.isArray,bi=s=>lt(s)||typeof s?.[Symbol.iterator]=="function",it=`[ 	
\f\r]`,Me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Mt=/>/g,ie=RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ft=/'/g,Tt=/"/g,Rt=/^(?:script|style|textarea|title)$/i,ct=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),c=ct(1),me=ct(2),Ii=ct(3),N=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ot=new WeakMap,ne=se.createTreeWalker(se,129);function Bt(s,i){if(!lt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(i):i}var _i=(s,i)=>{let e=s.length-1,t=[],n,r=i===2?"<svg>":i===3?"<math>":"",o=Me;for(let a=0;a<e;a++){let l=s[a],d,h,g=-1,f=0;for(;f<l.length&&(o.lastIndex=f,h=o.exec(l),h!==null);)f=o.lastIndex,o===Me?h[1]==="!--"?o=At:h[1]!==void 0?o=Mt:h[2]!==void 0?(Rt.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=ie):h[3]!==void 0&&(o=ie):o===ie?h[0]===">"?(o=n??Me,g=-1):h[1]===void 0?g=-2:(g=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?ie:h[3]==='"'?Tt:Ft):o===Tt||o===Ft?o=ie:o===At||o===Mt?o=Me:(o=ie,n=void 0);let u=o===ie&&s[a+1].startsWith("/>")?" ":"";r+=o===Me?l+vi:g>=0?(t.push(d),l.slice(0,g)+Pt+l.slice(g)+Q+u):l+Q+(g===-2?a:u)}return[Bt(s,r+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Pe=class s{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let r=0,o=0,a=i.length-1,l=this.parts,[d,h]=_i(i,e);if(this.el=s.createElement(d,t),ne.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(n=ne.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let g of n.getAttributeNames())if(g.endsWith(Pt)){let f=h[o++],u=n.getAttribute(g).split(Q),C=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:C[2],strings:u,ctor:C[1]==="."?st:C[1]==="?"?rt:C[1]==="@"?ot:ue}),n.removeAttribute(g)}else g.startsWith(Q)&&(l.push({type:6,index:r}),n.removeAttribute(g));if(Rt.test(n.tagName)){let g=n.textContent.split(Q),f=g.length-1;if(f>0){n.textContent=je?je.emptyScript:"";for(let u=0;u<f;u++)n.append(g[u],Te()),ne.nextNode(),l.push({type:2,index:++r});n.append(g[f],Te())}}}else if(n.nodeType===8)if(n.data===Dt)l.push({type:2,index:r});else{let g=-1;for(;(g=n.data.indexOf(Q,g+1))!==-1;)l.push({type:7,index:r}),g+=Q.length-1}r++}}static createElement(i,e){let t=se.createElement("template");return t.innerHTML=i,t}};function ge(s,i,e=s,t){if(i===N)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,r=Oe(i)?void 0:i._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=n:e._$Cl=n),n!==void 0&&(i=ge(s,n._$AS(s,i.values),n,t)),i}var nt=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??se).importNode(e,!0);ne.currentNode=n;let r=ne.nextNode(),o=0,a=0,l=t[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new De(r,r.nextSibling,this,i):l.type===1?d=new l.ctor(r,l.name,l.strings,this,i):l.type===6&&(d=new at(r,this,i)),this._$AV.push(d),l=t[++a]}o!==l?.index&&(r=ne.nextNode(),o++)}return ne.currentNode=se,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},De=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=ge(this,i,e),Oe(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==N&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):bi(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&Oe(this._$AH)?this._$AA.nextSibling.data=i:this.T(se.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Pe.createElement(Bt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new nt(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(i){let e=Ot.get(i.strings);return e===void 0&&Ot.set(i.strings,e=new Pe(i)),e}k(i){lt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let r of i)n===e.length?e.push(t=new s(this.O(Te()),this.O(Te()),this,this.options)):t=e[n],t._$AI(r),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Ct(i).nextSibling;Ct(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},ue=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(i,e=this,t,n){let r=this.strings,o=!1;if(r===void 0)i=ge(this,i,e,0),o=!Oe(i)||i!==this._$AH&&i!==N,o&&(this._$AH=i);else{let a=i,l,d;for(i=r[0],l=0;l<r.length-1;l++)d=ge(this,a[t+l],e,l),d===N&&(d=this._$AH[l]),o||(o=!Oe(d)||d!==this._$AH[l]),d===p?i=p:i!==p&&(i+=(d??"")+r[l+1]),this._$AH[l]=d}o&&!n&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},st=class extends ue{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},rt=class extends ue{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},ot=class extends ue{constructor(i,e,t,n,r){super(i,e,t,n,r),this.type=5}_$AI(i,e=this){if((i=ge(this,i,e,0)??p)===N)return;let t=this._$AH,n=i===p&&t!==p||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==p&&(t===p||n);n&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},at=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){ge(this,i)}};var xi=Fe.litHtmlPolyfillSupport;xi?.(Pe,De),(Fe.litHtmlVersions??(Fe.litHtmlVersions=[])).push("3.3.3");var Ht=(s,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let r=e?.renderBefore??null;t._$litPart$=n=new De(i.insertBefore(Te(),r),r,void 0,e??{})}return n._$AI(s),n};var Re=globalThis,B=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let i=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=i.firstChild),i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Ht(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}};B._$litElement$=!0,B.finalized=!0,Re.litElementHydrateSupport?.({LitElement:B});var yi=Re.litElementPolyfillSupport;yi?.({LitElement:B});(Re.litElementVersions??(Re.litElementVersions=[])).push("4.2.2");var wi={attribute:!0,type:String,converter:Ae,reflect:!1,hasChanged:qe},$i=(s=wi,i,e)=>{let{kind:t,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),t==="accessor"){let{name:o}=e;return{set(a){let l=i.get.call(this);i.set.call(this,a),this.requestUpdate(o,l,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(t==="setter"){let{name:o}=e;return function(a){let l=this[o];i.call(this,a),this.requestUpdate(o,l,s,!0,a)}}throw Error("Unsupported decorator location: "+t)};function A(s){return(i,e)=>typeof e=="object"?$i(s,i,e):((t,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,t),o?Object.getOwnPropertyDescriptor(n,r):void 0})(s,i,e)}function y(s){return A({...s,state:!0,attribute:!1})}var ki={on:"\u30AA\u30F3",off:"\u30AA\u30D5",lit:"\u70B9\u706F",unlit:"\u6D88\u706F",last:"\u524D\u56DE",brightness:"\u660E\u308B\u3055",color_temp:"\u8272\u6E29\u5EA6",hue:"\u8272\u76F8",saturation:"\u5F69\u5EA6",favorites:"\u304A\u6C17\u306B\u5165\u308A",color:"\u30AB\u30E9\u30FC",unavailable:"\u5229\u7528\u4E0D\u53EF",target_temp:"\u8A2D\u5B9A\u6E29\u5EA6",target_range:"\u8A2D\u5B9A\u7BC4\u56F2",room_temp:"\u5BA4\u6E29",humidity:"\u6E7F\u5EA6",heating:"\u6696\u623F\u4E2D",cooling:"\u51B7\u623F\u4E2D",drying:"\u9664\u6E7F\u4E2D",fan_running:"\u9001\u98A8\u4E2D",idle:"\u5F85\u6A5F\u4E2D",mode_auto:"\u81EA\u52D5",mode_heat_cool:"\u81EA\u52D5",mode_cool:"\u51B7\u623F",mode_heat:"\u6696\u623F",mode_dry:"\u9664\u6E7F",mode_fan_only:"\u9001\u98A8",mode_off:"\u30AA\u30D5",fan_mode:"\u98A8\u91CF",preset:"\u30D7\u30EA\u30BB\u30C3\u30C8",swing_mode:"\u30B9\u30A4\u30F3\u30B0",power:"\u6D88\u8CBB\u96FB\u529B",last_on:"\u6700\u7D42\u30AA\u30F3",updated_ago:"{t}\u306B\u66F4\u65B0",hours_24:"24\u6642\u9593",ago_24h:"24\u6642\u9593\u524D",ago_12h:"12\u6642\u9593\u524D",now:"\u73FE\u5728",since:"{t}\u304B\u3089",last_change:"\u6700\u7D42\u5909\u66F4 {t}",open:"\u958B",closed:"\u9589",is_open:"\u958B\u3044\u3066\u3044\u307E\u3059",is_closed:"\u9589\u3058\u3066\u3044\u307E\u3059",detected:"\u691C\u77E5",detecting:"\u691C\u77E5\u4E2D",clear:"\u30AF\u30EA\u30A2",locked:"\u65BD\u9320",unlocked:"\u89E3\u9320",is_locked:"\u65BD\u9320\u4E2D",is_unlocked:"\u89E3\u9320\u4E2D",locking:"\u65BD\u9320\u4E2D\u2026",unlocking:"\u89E3\u9320\u4E2D\u2026",jammed:"\u8981\u78BA\u8A8D",jammed_state:"\u8A70\u307E\u308A\u3092\u691C\u77E5 \xB7 \u30C9\u30A2\u3092\u78BA\u8A8D",slide_to_unlock:"\u30B9\u30E9\u30A4\u30C9\u3057\u3066\u89E3\u9320",slide_to_lock:"\u30B9\u30E9\u30A4\u30C9\u3057\u3066\u65BD\u9320",cannot_operate:"\u64CD\u4F5C\u3067\u304D\u307E\u305B\u3093",position:"\u958B\u5EA6",stopped:"\u505C\u6B62\u4E2D",opening:"\u958B\u653E\u4E2D",closing:"\u9589\u9396\u4E2D",moving:"\u52D5\u4F5C\u4E2D",tilt:"\u30B9\u30E9\u30C3\u30C8\u306E\u50BE\u304D",not_playing:"\u518D\u751F\u3057\u3066\u3044\u307E\u305B\u3093",standby:"\u5F85\u6A5F\u4E2D",paused:"\u4E00\u6642\u505C\u6B62\u4E2D",playing:"\u518D\u751F\u4E2D",just_now:"\u305F\u3063\u305F\u4ECA",minutes_ago:"{n}\u5206\u524D",hours_ago:"{n}\u6642\u9593\u524D",days_ago:"{n}\u65E5\u524D",seconds_ago:"{n}\u79D2\u524D",auto_locked_at:"{t} \u306B\u81EA\u52D5\u65BD\u9320",manual:"\u624B\u52D5",slider_off:"\u505C\u6B62\u4E2D",slider_levels:"{n}\u6BB5\u968E\u4E2D {i}",slider_step:"{s} \u523B\u307F",ed_entity:"\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3",ed_name:"\u8868\u793A\u540D",ed_icon:"\u30A2\u30A4\u30B3\u30F3",ed_advanced:"\u8A73\u7D30\u8A2D\u5B9A",ed_theme:"\u914D\u8272",ed_theme_auto:"\u81EA\u52D5",ed_theme_light:"\u30E9\u30A4\u30C8",ed_theme_dark:"\u30C0\u30FC\u30AF",ed_refraction:"\u5C48\u6298\u52B9\u679C",ed_refraction_auto:"\u81EA\u52D5",ed_refraction_on:"\u5E38\u306B\u6709\u52B9",ed_refraction_off:"\u7121\u52B9",ed_language:"\u8A00\u8A9E",ed_show_brightness:"\u660E\u308B\u3055",ed_show_color_temp:"\u8272\u6E29\u5EA6",ed_show_color:"\u30AB\u30E9\u30FC",ed_presets:"\u30D7\u30EA\u30BB\u30C3\u30C8",ed_favorites:"\u304A\u6C17\u306B\u5165\u308A\u306E\u8272",ed_show_fan_mode:"\u98A8\u91CF",ed_show_preset_mode:"\u30D7\u30EA\u30BB\u30C3\u30C8",ed_show_swing_mode:"\u30B9\u30A4\u30F3\u30B0",ed_hvac_modes:"\u8868\u793A\u3059\u308B\u904B\u8EE2\u30E2\u30FC\u30C9",ed_power_entity:"\u6D88\u8CBB\u96FB\u529B\u30BB\u30F3\u30B5\u30FC",ed_graph:"\u30B0\u30E9\u30D5\u3092\u8868\u793A",ed_trend:"\u30C8\u30EC\u30F3\u30C9\u30D0\u30C3\u30B8\u3092\u8868\u793A",ed_hours_to_show:"\u8868\u793A\u3059\u308B\u6642\u9593",ed_decimals:"\u5C0F\u6570\u70B9\u4EE5\u4E0B\u306E\u6841\u6570",ed_accent:"\u30A2\u30AF\u30BB\u30F3\u30C8\u30AB\u30E9\u30FC",ed_secondary_entity:"\u30B5\u30D6\u8868\u793A\u306E\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3",ed_secondary_label:"\u30B5\u30D6\u8868\u793A\u306E\u30E9\u30D9\u30EB",ed_icon_on:"\u30AA\u30F3\u6642\u306E\u30A2\u30A4\u30B3\u30F3",ed_icon_off:"\u30AA\u30D5\u6642\u306E\u30A2\u30A4\u30B3\u30F3",ed_label_on:"\u30AA\u30F3\u6642\u306E\u30E9\u30D9\u30EB",ed_label_off:"\u30AA\u30D5\u6642\u306E\u30E9\u30D9\u30EB",ed_buttons:"\u30A2\u30AF\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3",ed_style:"\u8868\u793A\u30B9\u30BF\u30A4\u30EB",ed_style_blind:"\u30D6\u30E9\u30A4\u30F3\u30C9",ed_style_curtain:"\u30AB\u30FC\u30C6\u30F3",ed_curtain:"\u30AB\u30FC\u30C6\u30F3\u306E\u7A2E\u985E",ed_curtain_double:"\u4E21\u958B\u304D",ed_curtain_single:"\u7247\u958B\u304D",ed_show_tilt:"\u30B9\u30E9\u30C3\u30C8\u306E\u50BE\u304D",ed_show_volume:"\u97F3\u91CF",ed_show_device:"\u30C7\u30D0\u30A4\u30B9\u540D",ed_source_color:"\u518D\u751F\u5143\u306E\u8272",ed_help_color:"#RRGGBB \u5F62\u5F0F\u306E\u8272\u30B3\u30FC\u30C9",ed_help_presets:"name \u3068\u3001brightness / color_temp_kelvin / rgb_color / scene \u306A\u3069\u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_help_buttons:"name \u3068 service\uFF08domain.service \u5F62\u5F0F\uFF09\u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_help_favorites:"\u7A7A\u306B\u3059\u308B\u3068\u8272\u898B\u672C\u3092\u975E\u8868\u793A\u306B\u3057\u307E\u3059",ed_help_style:"\u7701\u7565\u6642\u306F device_class \u304B\u3089\u5224\u5B9A\u3057\u307E\u3059",ed_help_hvac_modes:"\u7701\u7565\u6642\u306F\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u304C\u5BFE\u5FDC\u3059\u308B\u30E2\u30FC\u30C9\u3092\u3059\u3079\u3066\u8868\u793A\u3057\u307E\u3059",ed_min:"\u6700\u5C0F\u5024",ed_max:"\u6700\u5927\u5024",ed_step:"\u523B\u307F\u5E45",ed_unit:"\u5358\u4F4D",ed_ticks:"\u76EE\u76DB\u308A\u3092\u8868\u793A",ed_subtitle:"\u8AAC\u660E\u6587",ed_custom_entity:"\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u306E\u8AAD\u307F\u66F8\u304D",ed_attribute:"\u5024\u3092\u8AAD\u3080\u5C5E\u6027",ed_service:"\u547C\u3073\u51FA\u3059\u30B5\u30FC\u30D3\u30B9",ed_service_key:"\u5024\u3092\u6E21\u3059\u30AD\u30FC",ed_help_ticks:"\u6BB5\u968E\u304C2\u301C12\u306E\u3068\u304D\u306B\u76EE\u76DB\u308A\u3092\u5F15\u304D\u307E\u3059",ed_help_attribute:"\u7701\u7565\u6642\u306F\u30C9\u30E1\u30A4\u30F3\u3054\u3068\u306E\u65E2\u5B9A\u306E\u4F4D\u7F6E\u304B\u3089\u8AAD\u307F\u307E\u3059",ed_help_service:"domain.service \u5F62\u5F0F\u3002\u7701\u7565\u6642\u306F\u30C9\u30E1\u30A4\u30F3\u3054\u3068\u306E\u65E2\u5B9A\u3092\u4F7F\u3044\u307E\u3059",ed_help_service_key:"\u7701\u7565\u6642\u306F value",ed_help_subtitle:"\u7701\u7565\u6642\u306F\u523B\u307F\u5E45\u3084\u6BB5\u968E\u3092\u8868\u793A\u3057\u307E\u3059"},dt={on:"On",off:"Off",lit:"On",unlit:"Off",last:"last",brightness:"Brightness",color_temp:"Color temperature",hue:"Hue",saturation:"Saturation",favorites:"Favorites",color:"Color",unavailable:"Unavailable",target_temp:"Target",target_range:"Target range",room_temp:"Room",humidity:"Humidity",heating:"Heating",cooling:"Cooling",drying:"Drying",fan_running:"Fan",idle:"Idle",mode_auto:"Auto",mode_heat_cool:"Auto",mode_cool:"Cool",mode_heat:"Heat",mode_dry:"Dry",mode_fan_only:"Fan",mode_off:"Off",fan_mode:"Fan",preset:"Preset",swing_mode:"Swing",power:"Power",last_on:"last on",updated_ago:"Updated {t}",hours_24:"24 h",ago_24h:"24 h ago",ago_12h:"12 h ago",now:"Now",since:"since {t}",last_change:"changed {t}",open:"Open",closed:"Closed",is_open:"Open",is_closed:"Closed",detected:"Detected",detecting:"Detected",clear:"Clear",locked:"Locked",unlocked:"Unlocked",is_locked:"Locked",is_unlocked:"Unlocked",locking:"Locking\u2026",unlocking:"Unlocking\u2026",jammed:"Jammed",jammed_state:"Jam detected \xB7 check the door",slide_to_unlock:"Slide to unlock",slide_to_lock:"Slide to lock",cannot_operate:"Unavailable",position:"Position",stopped:"Stopped",opening:"Opening",closing:"Closing",moving:"Moving",tilt:"Slat tilt",not_playing:"Nothing playing",standby:"Idle",paused:"Paused",playing:"Playing",just_now:"just now",minutes_ago:"{n} min ago",hours_ago:"{n} h ago",days_ago:"{n} d ago",seconds_ago:"{n} s ago",auto_locked_at:"auto-locked at {t}",manual:"manually",slider_off:"Off",slider_levels:"Step {i} of {n}",slider_step:"{s} steps",ed_entity:"Entity",ed_name:"Name",ed_icon:"Icon",ed_advanced:"Advanced",ed_theme:"Appearance",ed_theme_auto:"Follow Home Assistant",ed_theme_light:"Light",ed_theme_dark:"Dark",ed_refraction:"Refraction",ed_refraction_auto:"Automatic",ed_refraction_on:"Always on",ed_refraction_off:"Off",ed_language:"Language",ed_show_brightness:"Brightness",ed_show_color_temp:"Color temperature",ed_show_color:"Color",ed_presets:"Presets",ed_favorites:"Favorite colors",ed_show_fan_mode:"Fan mode",ed_show_preset_mode:"Preset",ed_show_swing_mode:"Swing",ed_hvac_modes:"Modes to show",ed_power_entity:"Power sensor",ed_graph:"Show graph",ed_trend:"Show trend badge",ed_hours_to_show:"Hours to show",ed_decimals:"Decimal places",ed_accent:"Accent color",ed_secondary_entity:"Secondary entity",ed_secondary_label:"Secondary label",ed_icon_on:"Icon when on",ed_icon_off:"Icon when off",ed_label_on:"Label when on",ed_label_off:"Label when off",ed_buttons:"Action buttons",ed_style:"Style",ed_style_blind:"Blind",ed_style_curtain:"Curtain",ed_curtain:"Curtain type",ed_curtain_double:"Double",ed_curtain_single:"Single",ed_show_tilt:"Slat tilt",ed_show_volume:"Volume",ed_show_device:"Device name",ed_source_color:"Source color",ed_help_color:"Color code in #RRGGBB form",ed_help_presets:"List of entries with name plus brightness / color_temp_kelvin / rgb_color / scene",ed_help_buttons:"List of entries with name and service (domain.service)",ed_help_favorites:"Leave empty to hide the swatches",ed_help_style:"Derived from device_class when left empty",ed_help_hvac_modes:"Shows every mode the entity supports when left empty",ed_min:"Minimum",ed_max:"Maximum",ed_step:"Step",ed_unit:"Unit",ed_ticks:"Show tick marks",ed_subtitle:"Subtitle",ed_custom_entity:"Reading and writing",ed_attribute:"Value attribute",ed_service:"Service to call",ed_service_key:"Value key",ed_help_ticks:"Drawn when the control has between 2 and 12 steps",ed_help_attribute:"Reads the domain's usual place when left empty",ed_help_service:"domain.service; the domain default is used when left empty",ed_help_service_key:"Defaults to value",ed_help_subtitle:"Describes the step or level when left empty"},Si={ja:ki,en:dt};function Be(s){let i=(s??"en").toLowerCase().split("-")[0],e=Si[i]??dt;return(t,n)=>{let r=e[t]??dt[t]??t;if(n)for(let[o,a]of Object.entries(n))r=r.replace(`{${o}}`,String(a));return r}}function X(s,i){if(!s)return"";let e=Math.max(0,Date.now()-new Date(s).getTime()),t=Math.round(e/1e3);if(t<30)return i("just_now");if(t<90)return i("seconds_ago",{n:t});let n=Math.round(t/60);if(n<60)return i("minutes_ago",{n});let r=Math.round(n/60);return r<48?i("hours_ago",{n:r}):i("days_ago",{n:Math.round(r/24)})}function Ve(s){if(!s)return"";let i=new Date(s);return`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`}var w=(s,i,e)=>Math.min(e,Math.max(i,s));function pt(s,i,e={}){s.dispatchEvent(new CustomEvent(i,{detail:e,bubbles:!0,composed:!0}))}function Ut(s,i){i&&pt(s,"hass-more-info",{entityId:i})}function It(s,i){return s?.attributes.friendly_name??i}function M(s,i,e){let t=s?.locale?.language??s?.language??"en";try{return new Intl.NumberFormat(t,{maximumFractionDigits:e??(Number.isInteger(i)?0:1),minimumFractionDigits:e??0}).format(i)}catch{return String(i)}}function S(s){return!s||s.state==="unavailable"||s.state==="unknown"}function q(s,i){return!!((s?.attributes.supported_features??0)&i)}function F(s,i,e,t,n){let r=[e,t,Object.keys(i?.states??{})],o=l=>s.includes(l.split(".")[0]),a=l=>{let d=i?.states[l];return!d||d.state!=="unavailable"&&d.state!=="unknown"};if(n)for(let l of r){let d=l?.find(h=>{let g=i?.states[h];return o(h)&&a(h)&&g!==void 0&&n(g)});if(d)return d}for(let l of r){let d=l?.find(h=>o(h)&&a(h));if(d)return d}return`${s[0]}.example`}function re(s,i){let e=i/100,t=(s%360+360)%360/60,n=e*(1-Math.abs(t%2-1)),r;t<1?r=[e,n,0]:t<2?r=[n,e,0]:t<3?r=[0,e,n]:t<4?r=[0,n,e]:t<5?r=[n,0,e]:r=[e,0,n];let o=1-e;return[Math.round((r[0]+o)*255),Math.round((r[1]+o)*255),Math.round((r[2]+o)*255)]}function W(s){return`#${s.slice(0,3).map(i=>Math.round(w(i,0,255)).toString(16).padStart(2,"0")).join("")}`}function ht(s){let i=/^#?([0-9a-f]{6})$/i.exec(s.trim());if(!i)return;let e=parseInt(i[1],16);return[e>>16&255,e>>8&255,e&255]}function oe(s,i=.45){let e=ht(s);return e?W(e.map(t=>t+(255-t)*i)):s}function Lt(s,i=.3){let e=ht(s);return e?W(e.map(t=>t*(1-i))):s}function j(s,i){let e=ht(s);return e?`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${i})`:s}var Ke={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ge=s=>(...i)=>({_$litDirective$:s,values:i}),fe=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var b=Ge(class extends fe{constructor(s){if(super(s),s.type!==Ke.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(i=>s[i]).join(" ")+" "}update(s,[i]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(let t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}let e=s.element.classList;for(let t of this.st)t in i||(e.remove(t),this.st.delete(t));for(let t in i){let n=!!i[t];n===this.st.has(t)||this.nt?.has(t)||(n?(e.add(t),this.st.add(t)):(e.remove(t),this.st.delete(t)))}return N}});var zt="important",Ci=" !"+zt,_=Ge(class extends fe{constructor(s){if(super(s),s.type!==Ke.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((i,e)=>{let t=s[e];return t==null?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[i]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let t of this.ft)i[t]==null&&(this.ft.delete(t),t.includes("-")?e.removeProperty(t):e[t]=null);for(let t in i){let n=i[t];if(n!=null){this.ft.add(t);let r=typeof n=="string"&&n.endsWith(Ci);t.includes("-")||r?e.setProperty(t,r?n.slice(0,-11):n,r?zt:""):e[t]=n}}return N}});function Nt(s,i){let e=(h,g)=>{let f=Math.round(h+(g-h)*.25);return`<stop offset="0" stop-color="rgb(${h},${h},${h})"/><stop offset="0.5" stop-color="rgb(${f},${f},${f})"/><stop offset="1" stop-color="rgb(128,128,128)"/>`},t=s==="x",n=t?'x1="0" y1="0" x2="1" y2="0"':'x1="0" y1="0" x2="0" y2="1"',r=t?'x1="1" y1="0" x2="0" y2="0"':'x1="0" y1="1" x2="0" y2="0"',o=i.toFixed(3),a=t?`x="0" y="0" width="${o}" height="1"`:`x="0" y="0" width="1" height="${o}"`,l=t?`x="${(1-i).toFixed(3)}" y="0" width="${o}" height="1"`:`x="0" y="${(1-i).toFixed(3)}" width="1" height="${o}"`,d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none"><defs><linearGradient id="a" ${n}>${e(255,128)}</linearGradient><linearGradient id="b" ${r}>${e(0,128)}</linearGradient></defs><rect width="1" height="1" fill="rgb(128,128,128)"/><rect ${a} fill="url(#a)"/><rect ${l} fill="url(#b)"/></svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(d)}`}var qt=[{id:"lg-card",band:.08,scale:22,blur:5,saturation:1.35},{id:"lg-knob",band:.45,scale:14,blur:2.2,saturation:1.35}];function jt(s){let i=Nt("x",s.band),e=Nt("y",s.band);return me`
    <filter id=${s.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      <feImage href=${i} preserveAspectRatio="none" x="0" y="0" width="1" height="1" result="mx" />
      <feImage href=${e} preserveAspectRatio="none" x="0" y="0" width="1" height="1" result="my" />
      <feComposite in="mx" in2="my" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.5" result="map" />
      <feGaussianBlur in="SourceGraphic" stdDeviation=${s.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(s.saturation)} result="sat" />
      <feDisplacementMap in="sat" in2="map" scale=${s.scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>`}var Wt=c`<svg class="lg-defs" aria-hidden="true" focusable="false">
  <defs>${qt.map(jt)}</defs>
</svg>`,Vt=c`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${jt(qt[1])}</defs>
</svg>`,Xe;function Kt(){if(Xe!==void 0)return Xe;let s=navigator.userAgent,i=/Chrome\/|Chromium\/|CriOS\//.test(s)||!!navigator.userAgentData,e=/Safari\//.test(s)&&!/Chrome\/|Chromium\/|CriOS\//.test(s),t=/Firefox\//.test(s);return Xe=i&&!e&&!t&&CSS.supports("backdrop-filter","blur(1px)"),Xe}var gt;function Gt(){return gt||(gt=(async()=>{let s=window.loadCardHelpers;if(s)try{await(await s()).createCardElement?.({type:"entities",entities:[]})?.constructor?.getConfigElement?.()}catch{}})()),gt}var He=class extends B{constructor(){super(...arguments);this.icon=""}render(){return c`<ha-icon .icon=${this.icon}></ha-icon>`}};He.styles=x`
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
  `,v([A()],He.prototype,"icon",2);customElements.get("lg-icon")||customElements.define("lg-icon",He);var D=class extends B{constructor(){super(...arguments);this.value=0;this.min=0;this.max=1;this.step=0;this.variant="bar";this.disabled=!1;this.refraction=!1;this.fillFrom=void 0;this.showFill=!0;this.hideFillWhenZero=!1;this.dragging=!1;this.dragValue=0;this.onPointerDown=e=>{this.disabled||e.button!==0||(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),this.dragging=!0,this.toggleAttribute("dragging",!0),this.dragValue=this.valueFromEvent(e),this.dispatchEvent(new CustomEvent("lg-input",{detail:{value:this.dragValue},bubbles:!0,composed:!0})))};this.onPointerMove=e=>{if(!this.dragging)return;let t=this.valueFromEvent(e);t!==this.dragValue&&(this.dragValue=t,this.dispatchEvent(new CustomEvent("lg-input",{detail:{value:t},bubbles:!0,composed:!0})))};this.onPointerUp=e=>{if(!this.dragging)return;this.dragging=!1,this.toggleAttribute("dragging",!1);let t=this.valueFromEvent(e);this.value=t,this.dispatchEvent(new CustomEvent("lg-change",{detail:{value:t},bubbles:!0,composed:!0}))};this.onKeyDown=e=>{if(this.disabled)return;let t=this.step>0?this.step:(this.max-this.min)/20,n=this.value;if(e.key==="ArrowRight"||e.key==="ArrowUp")n+=t;else if(e.key==="ArrowLeft"||e.key==="ArrowDown")n-=t;else if(e.key==="Home")n=this.min;else if(e.key==="End")n=this.max;else return;e.preventDefault(),this.value=w(n,this.min,this.max),this.dispatchEvent(new CustomEvent("lg-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}}get ratio(){let e=this.dragging?this.dragValue:this.value,t=this.max-this.min||1;return w((e-this.min)/t,0,1)}valueFromEvent(e){let t=this.shadowRoot?.querySelector(".track");if(!t)return this.value;let n=t.getBoundingClientRect(),r=this.variant==="thumb"?20:0,o=Math.max(1,n.width-r*2),a=w((e.clientX-n.left-r)/o,0,1),l=this.min+a*(this.max-this.min);return this.step>0&&(l=Math.round(l/this.step)*this.step),w(l,this.min,this.max)}render(){let e=this.ratio,t=this.variant==="thumb",n=this.showFill&&!(this.hideFillWhenZero&&e<=0),r={width:`${e*100}%`};if(t&&this.fillFrom!==void 0){let o=w(this.fillFrom,0,1),a=Math.min(o,e),l=Math.max(o,e);r={left:`calc(20px + (100% - 40px) * ${a})`,width:`calc((100% - 40px) * ${l-a})`}}return c`
      ${t&&this.refraction?Vt:p}
      <div
        class="track ${this.variant}"
        role="slider"
        tabindex=${this.disabled?-1:0}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this.dragging?this.dragValue:this.value}
        aria-disabled=${this.disabled}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @keydown=${this.onKeyDown}
      >
        ${n?c`<div class="fill" style=${_(r)}></div>`:p}
        ${t&&this.fillFrom!==void 0?c`<div class="center-mark" style=${_({left:`calc(20px + (100% - 40px) * ${w(this.fillFrom,0,1)})`})}></div>`:p}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${t?c`<div class="knob ${this.refraction?"refraction":""}" style=${_({left:`calc(4px + (100% - 40px) * ${e})`})}></div>`:p}
      </div>
    `}};D.styles=x`
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
      height: var(--lg-slider-height, 64px);
      border-radius: var(--lg-slider-radius, 20px);
    }
    .track.thumb {
      height: 40px;
      border-radius: 20px;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.14),
        inset 0 0 0 1px var(--lg-glass-stroke);
    }
    .track.thin {
      height: var(--lg-slider-height, 7px);
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
      top: 4px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.22);
      -webkit-backdrop-filter: blur(3px) saturate(1.35);
      backdrop-filter: blur(3px) saturate(1.35);
      box-shadow:
        0 3px 8px rgba(0, 0, 0, 0.3),
        inset 0 0 0 2px rgba(255, 255, 255, 0.9),
        inset 0 6px 10px -4px rgba(255, 255, 255, 0.9),
        inset 0 -4px 8px -4px rgba(0, 0, 0, 0.12);
      pointer-events: none;
      transition: transform 0.08s ease;
    }
    .knob.refraction {
      -webkit-backdrop-filter: url(#lg-knob);
      backdrop-filter: url(#lg-knob);
    }
    :host([dragging]) .knob {
      transform: scale(1.08);
    }
  `,v([A({type:Number})],D.prototype,"value",2),v([A({type:Number})],D.prototype,"min",2),v([A({type:Number})],D.prototype,"max",2),v([A({type:Number})],D.prototype,"step",2),v([A()],D.prototype,"variant",2),v([A({type:Boolean,reflect:!0})],D.prototype,"disabled",2),v([A({type:Boolean})],D.prototype,"refraction",2),v([A({type:Number})],D.prototype,"fillFrom",2),v([A({type:Boolean})],D.prototype,"showFill",2),v([A({type:Boolean})],D.prototype,"hideFillWhenZero",2),v([y()],D.prototype,"dragging",2),v([y()],D.prototype,"dragValue",2);customElements.get("lg-slider")||customElements.define("lg-slider",D);var k=class extends B{constructor(){super(...arguments);this.t=Be("en");this.openMoreInfo=()=>Ut(this,this.config?.entity)}static async getConfigElement(){return await Gt(),document.createElement("liquid-glass-card-editor")}static getStubConfig(e,t,n){return{}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={refraction:"auto",theme:"auto",...e},this.applyRefraction()}getCardSize(){return 3}get entity(){return this.config?.entity?this.hass?.states[this.config.entity]:void 0}get entityName(){return this.config?.name??It(this.entity,this.config?.entity??"")}get isDark(){return this.config?.theme==="dark"?!0:this.config?.theme==="light"?!1:!!this.hass?.themes?.darkMode}get refraction(){return this.hasAttribute("refraction")}applyRefraction(){let e=this.config?.refraction??"auto",t=e===!0||e==="auto"&&Kt();this.toggleAttribute("refraction",t)}willUpdate(){let e=this.config?.language??this.hass?.locale?.language??this.hass?.language;this.t=Be(e),this.toggleAttribute("dark",this.isDark)}callService(e,t,n={}){!this.hass||!this.config?.entity||this.hass.callService(e,t,{entity_id:this.config.entity,...n})}renderDefs(){return this.refraction?Wt:p}renderIconWell(e,t,n){let r=!t,o=n===null?void 0:n??this.openMoreInfo;return c`<div
      class=${b({"icon-well":!0,idle:r})}
      style=${r?p:_({"--well-from":t.from,"--well-to":t.to,"--well-glow":t.glow})}
      @click=${o}
      role=${o?"button":p}
    >
      <lg-icon .icon=${e}></lg-icon>
    </div>`}renderTitle(e,t){return c`<div class="title" @click=${this.openMoreInfo}>
      <div class="name">${e}</div>
      <div class="state">${t}</div>
    </div>`}renderBadge(e,t){return c`<div
      class="badge"
      style=${t?_({"--badge-color":t.color,"--badge-bg":t.bg,"--badge-stroke":t.stroke,"--badge-glow":t.glow??t.color}):p}
    >
      <span class="dot"></span><span>${e}</span>
    </div>`}renderToggle(e,t,n){return c`<div
      class=${b({toggle:!0,on:e})}
      style=${_({"--toggle-color":t})}
      role="switch"
      aria-checked=${e}
      tabindex="0"
      @click=${n}
      @keydown=${r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),n())}}
    >
      <div class="knob-dot"></div>
    </div>`}renderUnavailable(){return c`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config?.icon??"mdi:help-circle-outline",void 0)}
          ${this.renderTitle(this.entityName,this.t("unavailable"))}
        </div>
      </div>`}};v([A({attribute:!1})],k.prototype,"hass",2),v([y()],k.prototype,"config",2);var T=x`
  :host {
    --lg-text-primary: #1c1c1e;
    --lg-text-secondary: rgba(60, 60, 67, 0.65);
    --lg-glass-tint: 255, 255, 255;
    --lg-glass-tint-alpha: 0.32;
    --lg-glass-stroke: rgba(255, 255, 255, 0.7);
    --lg-glass-inner: rgba(255, 255, 255, 0.5);
    --lg-track-bg: rgba(255, 255, 255, 0.4);
    --lg-shadow-glass: rgba(28, 28, 30, 0.18);
    --lg-segment-selected: rgba(255, 255, 255, 0.85);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.62;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.9);
    --lg-trend-up: #1e9e4a;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.18);
    --lg-trend-down: #0a7ea4;
    --lg-trend-down-bg: rgba(43, 179, 208, 0.18);
    --lg-cover-badge: #0a7ea4;
    --lg-rim-top: rgba(255, 255, 255, 0.75);
    --lg-rim-bottom: rgba(0, 0, 0, 0.05);

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
    --lg-glass-tint-alpha: 0.36;
    --lg-glass-stroke: rgba(255, 255, 255, 0.25);
    --lg-glass-inner: rgba(255, 255, 255, 0.12);
    --lg-track-bg: rgba(255, 255, 255, 0.14);
    --lg-shadow-glass: rgba(0, 0, 0, 0.45);
    --lg-segment-selected: rgba(255, 255, 255, 0.2);
    --lg-glass-tint-active: 255, 255, 255;
    --lg-glass-tint-active-alpha: 0.3;
    --lg-glass-stroke-active: rgba(255, 255, 255, 0.4);
    --lg-trend-up: #4cde73;
    --lg-trend-up-bg: rgba(48, 209, 88, 0.2);
    --lg-trend-down: #5dd6ee;
    --lg-trend-down-bg: rgba(93, 214, 238, 0.2);
    --lg-cover-badge: #5dd6ee;
    --lg-rim-top: rgba(255, 255, 255, 0.35);
    --lg-rim-bottom: rgba(0, 0, 0, 0.25);
  }
`;var O=x`
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
  .glass::before,
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }
  .glass::before {
    padding: 1.5px;
    background: linear-gradient(
      180deg,
      var(--lg-rim-top) 0%,
      rgba(255, 255, 255, 0.12) 22%,
      rgba(255, 255, 255, 0) 55%,
      var(--lg-rim-bottom) 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
  .glass::after {
    box-shadow:
      inset 0 18px 32px -18px rgba(255, 255, 255, 0.55),
      inset 0 0 28px rgba(255, 255, 255, 0.12);
  }
  :host([dark]) .glass::after {
    box-shadow:
      inset 0 18px 32px -18px rgba(255, 255, 255, 0.22),
      inset 0 0 28px rgba(255, 255, 255, 0.05);
  }

  /*
   * Metrics every card sizes itself from. The plain values are the 380px design; the
   * @supports block below rewrites them as clamps against the card's own inline size so a
   * narrow dashboard column shrinks the whole card instead of clipping its text.
   * --lg-radius stays the upper bound so a theme override is still respected.
   */
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
    transition: background 0.25s ease, box-shadow 0.25s ease;
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
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transform: translateX(0);
    transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
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
`;var Ye=["#FF453A","#FF9F0A","#FFD60A","#30D158","#0A84FF","#B15CFF","#FF375F"],ae=class extends k{constructor(){super(...arguments);this.preview={};this.toggle=()=>this.callService("light","toggle")}static getStubConfig(e,t,n){return{entity:F(["light"],e,t,n,r=>(r.attributes.supported_color_modes??[]).some(o=>o!=="onoff"))}}getCardSize(){return 5}get isOn(){return this.entity?.state==="on"}get supportedModes(){return this.entity?.attributes.supported_color_modes??[]}get supportsBrightness(){return this.config.show_brightness===!1?!1:this.supportedModes.some(e=>e!=="onoff")}get supportsColorTemp(){return this.config.show_color_temp===!1?!1:this.supportedModes.includes("color_temp")}get supportsColor(){return this.config.show_color===!1?!1:this.supportedModes.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))}get activeUiMode(){return this.uiMode?this.uiMode:this.supportsColor?this.supportsColorTemp&&this.entity?.attributes.color_mode==="color_temp"?"color_temp":"color":"color_temp"}get brightnessPct(){if(this.preview.brightness!==void 0)return this.preview.brightness;let e=this.entity?.attributes.brightness;return this.isOn&&e!==void 0?Math.round(e/255*100):0}get kelvin(){return this.preview.kelvin!==void 0?this.preview.kelvin:this.entity?.attributes.color_temp_kelvin??this.kelvinRange[0]}get kelvinRange(){let e=this.entity?.attributes;return[e?.min_color_temp_kelvin??2e3,e?.max_color_temp_kelvin??6500]}get hs(){let e=this.entity?.attributes.hs_color??[280,85];return[this.preview.hue??e[0],this.preview.sat??e[1]]}get colorHex(){let e=this.entity?.attributes.rgb_color;return this.preview.hue===void 0&&this.preview.sat===void 0&&e?W(e):W(re(this.hs[0],this.hs[1]))}get colorLike(){return this.supportsColor&&this.activeUiMode==="color"}get accent(){return this.colorLike?this.colorHex:"var(--lg-accent)"}get wellStyle(){if(this.isOn){if(this.colorLike){let e=re(this.hs[0],Math.min(this.hs[1],60));return{from:W(e),to:this.colorHex,glow:j(this.colorHex,.24)}}return{from:"#FFD36B",to:"var(--lg-accent-deep)",glow:"rgba(255, 165, 48, 0.24)"}}}stateText(){let e=this.t;if(!this.isOn){let n=this.lastBrightness;return n?`${e("unlit")} \xB7 ${e("last")} ${n}%`:e("unlit")}let t=[e("lit")];return this.supportsBrightness&&t.push(`${this.brightnessPct}%`),this.colorLike?t.push(e("color")):this.supportsColorTemp&&this.entity?.attributes.color_temp_kelvin&&t.push(`${this.kelvin}K`),t.join(" \xB7 ")}willUpdate(){super.willUpdate(),this.isOn&&this.entity?.attributes.brightness!==void 0&&(this.lastBrightness=Math.round(this.entity.attributes.brightness/255*100))}setBrightness(e){this.preview={},this.callService("light","turn_on",{brightness_pct:Math.round(e)})}setKelvin(e){this.preview={},this.callService("light","turn_on",{color_temp_kelvin:Math.round(e)})}setHs(e,t){this.preview={},this.callService("light","turn_on",{hs_color:[Math.round(e),Math.round(t)]})}applyPreset(e){if(e.scene){this.hass?.callService("scene","turn_on",{entity_id:e.scene});return}if(e.service){let[n,r]=e.service.split(".");this.hass?.callService(n,r,{entity_id:this.config.entity,...e.data??{}});return}let t={...e.data??{}};e.brightness!==void 0&&(t.brightness_pct=e.brightness),e.color_temp_kelvin!==void 0&&(t.color_temp_kelvin=e.color_temp_kelvin),e.rgb_color&&(t.rgb_color=e.rgb_color),e.hs_color&&(t.hs_color=e.hs_color),this.callService("light","turn_on",t)}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.isOn,n=this.t,r=this.supportsColor&&this.supportsColorTemp,o=this.activeUiMode,a=this.config.presets??[],l=this.config.favorites===!1?[]:this.config.favorites??Ye,d=this.colorHex,[h,g]=this.kelvinRange,[f,u]=this.hs,C=this.colorLike?W(re(f,Math.min(u,10))):"#FFF8EA",E=this.colorLike?W(re(f,Math.min(u,30))):"#FFE2A6",P=this.colorLike?W(re(f,60).map(m=>m*.5)):"#6B5323";return c`${this.renderDefs()}
      <div class=${b({glass:!0,card:!0})}>
        <div class="header">
          ${this.renderIconWell(this.config.icon??e.attributes.icon??"mdi:lightbulb",this.wellStyle,this.toggle)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderToggle(t,this.accent,this.toggle)}
        </div>

        ${r?c`<div class="segment">
              ${["color","color_temp"].map(m=>c`<button class=${b({selected:o===m})} @click=${()=>this.uiMode=m}>
                  ${n(m==="color"?"color":"color_temp")}
                </button>`)}
            </div>`:p}

        ${this.supportsBrightness?c`<div class="section brightness" style=${_({"--fill-from":C,"--fill-to":E,"--sun-color":t?P:"var(--lg-text-secondary)"})}>
              <div class="label-row"><span class="label">${n("brightness")}</span><span class="value">${this.brightnessPct}%</span></div>
              <lg-slider
                variant="bar"
                .value=${this.brightnessPct}
                min="0"
                max="100"
                step="1"
                .showFill=${t}
                @lg-input=${m=>this.preview={...this.preview,brightness:m.detail.value}}
                @lg-change=${m=>this.setBrightness(m.detail.value)}
              >
                <lg-icon slot="start" class="sun" icon="mdi:white-balance-sunny"></lg-icon>
                <lg-icon slot="end" class="sun-dim" icon="mdi:brightness-5"></lg-icon>
              </lg-slider>
            </div>`:p}

        ${this.supportsColorTemp&&o==="color_temp"?c`<div class="section temp">
              <div class="label-row"><span class="label">${n("color_temp")}</span><span class="value">${Math.round(this.kelvin)}K</span></div>
              <lg-slider
                class=${b({dim:!t})}
                variant="thumb"
                .refraction=${this.refraction}
                .value=${this.kelvin}
                .min=${h}
                .max=${g}
                step="50"
                .showFill=${!1}
                @lg-input=${m=>this.preview={...this.preview,kelvin:m.detail.value}}
                @lg-change=${m=>this.setKelvin(m.detail.value)}
              ></lg-slider>
              <div class="ticks"><span>${h}K</span><span>${g}K</span></div>
            </div>`:p}

        ${this.supportsColor&&o==="color"?c`<div class="section hue">
                <div class="label-row"><span class="label">${n("hue")}</span><span class="value">${Math.round(f)}°</span></div>
                <lg-slider
                  class=${b({dim:!t})}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .value=${f}
                  min="0"
                  max="360"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${m=>this.preview={...this.preview,hue:m.detail.value}}
                  @lg-change=${m=>this.setHs(m.detail.value,u)}
                ></lg-slider>
              </div>
              <div class="section sat" style=${_({"--sat-color":W(re(f,100))})}>
                <div class="label-row"><span class="label">${n("saturation")}</span><span class="value">${Math.round(u)}%</span></div>
                <lg-slider
                  class=${b({dim:!t})}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .value=${u}
                  min="0"
                  max="100"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${m=>this.preview={...this.preview,sat:m.detail.value}}
                  @lg-change=${m=>this.setHs(f,m.detail.value)}
                ></lg-slider>
              </div>
              ${l.length?c`<div class=${b({favorites:!0,muted:!t})}>
                    <div class="label">${n("favorites")}</div>
                    <div class="swatches">
                      ${l.map(m=>{let U=t&&m.toLowerCase()===d.toLowerCase();return c`<button
                          class=${b({swatch:!0,selected:U})}
                          style=${_({"--swatch":m,"--swatch-glow":j(m,.5)})}
                          title=${m}
                          @click=${()=>this.applyPreset({name:m,rgb_color:Ei(m)})}
                        ></button>`})}
                      <button class="swatch add" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:plus"></lg-icon></button>
                    </div>
                  </div>`:p}`:p}

        ${a.length?c`<div class=${b({chips:!0,muted:!t})}>
              ${a.map(m=>c`<button class="chip" @click=${()=>this.applyPreset(m)}>
                  ${m.icon?c`<lg-icon .icon=${m.icon}></lg-icon>`:p}<span>${m.name}</span>
                </button>`)}
            </div>`:p}
      </div>`}};ae.styles=[T,O,x`
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
    `],v([y()],ae.prototype,"uiMode",2),v([y()],ae.prototype,"preview",2);function Ei(s){let i=parseInt(s.replace("#",""),16);return[i>>16&255,i>>8&255,i&255].map(e=>w(e,0,255))}customElements.get("liquid-glass-light-card")||customElements.define("liquid-glass-light-card",ae);var Xt=["input_number","number","fan","light","media_player","cover","valve","humidifier","water_heater","climate"],$=s=>s!==null&&s!==""&&Number.isFinite(Number(s))?Number(s):void 0,ve=class extends k{static getStubConfig(i,e,t){return{entity:F(Xt,i,e,t)}}getCardSize(){return 2}spec(){let i=this.entity,e=i.attributes,t=this.config,n=i.entity_id.split(".")[0],r;switch(n){case"input_number":case"number":r={min:$(e.min)??0,max:$(e.max)??100,step:$(e.step)??1,unit:e.unit_of_measurement??"",icon:"mdi:tune-variant",value:$(i.state),call:a=>[n,"set_value",{value:a}]};break;case"fan":r={min:0,max:100,step:$(e.percentage_step)??1,unit:"%",icon:"mdi:fan",value:i.state==="on"?$(e.percentage)??0:0,call:a=>["fan","set_percentage",{percentage:Math.round(a)}]};break;case"light":r={min:0,max:100,step:1,unit:"%",icon:"mdi:lightbulb",value:i.state==="on"?Math.round(($(e.brightness)??0)/255*100):0,call:a=>["light","turn_on",{brightness_pct:Math.round(a)}]};break;case"media_player":r={min:0,max:100,step:1,unit:"%",icon:"mdi:volume-high",value:Math.round(($(e.volume_level)??0)*100),call:a=>["media_player","volume_set",{volume_level:Math.round(a)/100}]};break;case"cover":r={min:0,max:100,step:1,unit:"%",icon:"mdi:blinds-horizontal",value:$(e.current_position)??(i.state==="closed"?0:100),call:a=>["cover","set_cover_position",{position:Math.round(a)}]};break;case"valve":r={min:0,max:100,step:1,unit:"%",icon:"mdi:pipe-valve",value:$(e.current_position)??(i.state==="closed"?0:100),call:a=>["valve","set_valve_position",{position:Math.round(a)}]};break;case"humidifier":r={min:$(e.min_humidity)??0,max:$(e.max_humidity)??100,step:1,unit:"%",icon:"mdi:air-humidifier",value:$(e.humidity),call:a=>["humidifier","set_humidity",{humidity:Math.round(a)}]};break;case"water_heater":r={min:$(e.min_temp)??30,max:$(e.max_temp)??60,step:$(e.target_temp_step)??1,unit:"\xB0",icon:"mdi:water-boiler",value:$(e.temperature),call:a=>["water_heater","set_temperature",{temperature:a}]};break;case"climate":r={min:$(e.min_temp)??7,max:$(e.max_temp)??35,step:$(e.target_temp_step)??.5,unit:"\xB0",icon:"mdi:thermostat",value:$(e.temperature),call:a=>["climate","set_temperature",{temperature:a}]};break;default:r={min:0,max:100,step:1,unit:e.unit_of_measurement??"",icon:"mdi:tune-variant",value:$(i.state)}}let o=t.service?a=>{let[l,d]=t.service.split(".");return[l,d,{[t.service_key??"value"]:a}]}:r.call;return{min:t.min??r.min,max:t.max??r.max,step:t.step??r.step,unit:t.unit??r.unit,icon:t.icon??i.attributes.icon??r.icon,value:t.attribute?$(e[t.attribute]):r.value,call:o}}subtitleFor(i,e){if(this.config.subtitle!==void 0)return this.config.subtitle;let t=this.t;if(i.min===0&&e<=0)return t("slider_off");let n=i.step>0?Math.round((i.max-i.min)/i.step):0;return n>=2&&n<=12?t("slider_levels",{n,i:Math.round((e-i.min)/i.step)}):t("slider_step",{s:`${M(this.hass,i.step)}${i.unit}`})}tickCount(i){let e=this.config.ticks;if(typeof e=="number")return w(Math.round(e),0,20);if(e!==!0)return 0;let t=i.step>0?Math.round((i.max-i.min)/i.step):0;return t>=2&&t<=12?t:0}commit(i,e){if(this.preview=void 0,!i.call)return;let[t,n,r]=i.call(e);this.hass?.callService(t,n,{entity_id:this.config.entity,...r})}render(){let i=this.entity;if(!i||S(i))return this.renderUnavailable();let e=this.spec(),t=this.preview??e.value??e.min,n=w(t,e.min,e.max),r=e.min===0&&n<=0,o=this.config.decimals??(Number.isInteger(e.step)?0:1),a=this.config.accent,l=a?oe(a,.4):"var(--lg-slider-accent-light)",d=a?Lt(a,.3):"var(--lg-slider-accent-deep)",h=a?j(a,.3):"rgba(94, 92, 230, 0.3)",g=a?oe(a,.55):"var(--lg-slider-fill-light)",f=a??"var(--lg-slider-accent)",u=r?void 0:{from:l,to:d,glow:h},C=this.tickCount(e),E=!e.call,P=m=>M(this.hass,m,o);return c`${this.renderDefs()}
      <div class="glass card" style=${_({"--fill-from":g,"--fill-to":f})}>
        <div class="header">
          ${this.renderIconWell(e.icon,u)}
          ${this.renderTitle(this.entityName,this.subtitleFor(e,n))}
          <div class=${b({value:!0,zero:r})}>
            <span class="num">${P(n)}</span>
            ${e.unit?c`<span class="unit">${e.unit}</span>`:p}
          </div>
        </div>

        <div class="track-wrap">
          <lg-slider
            variant="bar"
            .value=${n}
            .min=${e.min}
            .max=${e.max}
            .step=${e.step}
            .disabled=${E}
            .showFill=${!r}
            @lg-input=${m=>this.preview=m.detail.value}
            @lg-change=${m=>this.commit(e,m.detail.value)}
          ></lg-slider>
          ${C?c`<div class="marks">${Array.from({length:C},()=>c`<span></span>`)}</div>`:p}
        </div>

        <div class="ticks">
          <span>${P(e.min)}${e.unit}</span>
          <span>${P(e.max)}${e.unit}</span>
        </div>
      </div>`}};ve.styles=[T,O,x`
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
        --lg-slider-radius: 18px;
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
    `],v([y()],ve.prototype,"preview",2);var Yt=Xt;customElements.get("liquid-glass-slider-card")||customElements.define("liquid-glass-slider-card",ve);var H=s=>({name:s,selector:{text:{}}}),L=s=>({name:s,selector:{boolean:{}}}),Je=s=>({name:s,selector:{icon:{}}}),Jt=s=>({name:s,selector:{object:{}}}),R=s=>({name:"",type:"grid",schema:s}),Ze=(s,i,e=!1)=>({name:s,required:e,selector:{entity:{domain:i}}}),be=(s,i,e,t=1)=>({name:s,selector:{number:{min:i,max:e,step:t,mode:"box"}}}),_e=(s,i,e=!1)=>({name:s,selector:{select:{options:i,multiple:e,mode:"dropdown"}}});function Y(s){return[Ze("entity",s,!0),R([H("name"),Je("icon")])]}function V(s){return{name:"",type:"expandable",title:s("ed_advanced"),icon:"mdi:tune",schema:[R([_e("theme",[{value:"auto",label:s("ed_theme_auto")},{value:"light",label:s("ed_theme_light")},{value:"dark",label:s("ed_theme_dark")}]),_e("refraction",[{value:"auto",label:s("ed_refraction_auto")},{value:"on",label:s("ed_refraction_on")},{value:"off",label:s("ed_refraction_off")}])]),_e("language",[{value:"ja",label:"\u65E5\u672C\u8A9E"},{value:"en",label:"English"}])]}}var Ai=["auto","heat_cool","heat","cool","dry","fan_only","off"];function ut(s){return(s??"").replace(/^custom:/,"").replace(/^liquid-glass-/,"").replace(/-card$/,"")}function mt(s,i){switch(ut(s)){case"light":return[...Y("light"),R([L("show_brightness"),L("show_color_temp"),L("show_color")]),{name:"favorites",selector:{text:{multiple:!0}}},Jt("presets"),V(i)];case"climate":return[...Y("climate"),R([L("show_fan_mode"),L("show_preset_mode"),L("show_swing_mode")]),_e("hvac_modes",Ai.map(t=>({value:t,label:i(`mode_${t}`)})),!0),V(i)];case"switch":return[...Y(["switch","input_boolean","fan","light","automation","humidifier","siren","remote"]),Ze("power_entity","sensor"),V(i)];case"sensor":return[...Y("sensor"),R([L("graph"),L("trend")]),R([be("hours_to_show",1,168),be("decimals",0,4)]),H("accent"),R([Ze("secondary_entity",["sensor","binary_sensor"]),H("secondary_label")]),V(i)];case"binary-sensor":return[...Y("binary_sensor"),R([Je("icon_on"),Je("icon_off")]),R([H("label_on"),H("label_off")]),H("accent"),V(i)];case"lock":return[...Y("lock"),Jt("buttons"),V(i)];case"cover":return[...Y("cover"),R([_e("style",[{value:"blind",label:i("ed_style_blind")},{value:"curtain",label:i("ed_style_curtain")}]),_e("curtain",[{value:"double",label:i("ed_curtain_double")},{value:"single",label:i("ed_curtain_single")}])]),L("show_tilt"),V(i)];case"media":return[...Y("media_player"),R([L("show_volume"),L("show_device")]),H("source_color"),V(i)];case"slider":return[...Y(Yt),R([be("min",-1e3,1e4,.1),be("max",-1e3,1e4,.1)]),R([be("step",.01,1e3,.01),H("unit")]),R([L("ticks"),be("decimals",0,4)]),H("subtitle"),H("accent"),{name:"",type:"expandable",title:i("ed_custom_entity"),icon:"mdi:code-braces",schema:[H("attribute"),R([H("service"),H("service_key")])]},V(i)];default:return[Ze("entity",[],!0),R([H("name"),Je("icon")]),V(i)]}}var ft=new Set(["show_brightness","show_color_temp","show_color","show_fan_mode","show_preset_mode","graph","trend","show_tilt","show_volume","show_device"]);function Zt(s){let i=new Set,e=t=>{for(let n of t)n.schema?e(n.schema):n.name&&i.add(n.name)};return e(s),i}var Qt={presets:"ed_help_presets",buttons:"ed_help_buttons",favorites:"ed_help_favorites",accent:"ed_help_color",source_color:"ed_help_color",ticks:"ed_help_ticks",attribute:"ed_help_attribute",service:"ed_help_service",service_key:"ed_help_service_key",subtitle:"ed_help_subtitle",style:"ed_help_style",hvac_modes:"ed_help_hvac_modes"};var xe=class extends B{constructor(){super(...arguments);this.computeLabel=e=>this.t(`ed_${e.name}`);this.computeHelper=e=>{let t=Qt[e.name];return t?this.t(t):void 0};this.valueChanged=e=>{e.stopPropagation(),pt(this,"config-changed",{config:this.fromForm(e.detail.value)})}}setConfig(e){this.config=e}toForm(e){let{refraction:t,theme:n,...r}=e,o={...r};o.refraction=t===!0?"on":t===!1?"off":"auto",o.theme=n??"auto";for(let a of Zt(mt(e.type,this.t)))ft.has(a)&&(o[a]=r[a]!==!1);if(ut(e.type)==="light"){let a=r.favorites;o.favorites=a===!1?[]:a??Ye}return o}fromForm(e){let t={...e};t.refraction==="on"?t.refraction=!0:t.refraction==="off"?t.refraction=!1:delete t.refraction,t.theme==="auto"&&delete t.theme;for(let r of ft)t[r]===!0&&delete t[r];let n=t.favorites;Array.isArray(n)&&n.join()===Ye.join()&&delete t.favorites;for(let[r,o]of Object.entries(t))(o==null||o===""||Array.isArray(o)&&o.length===0&&r!=="favorites")&&delete t[r];return t}get t(){return Be(this.config?.language??this.hass?.locale?.language??this.hass?.language)}render(){return!this.hass||!this.config?p:c`<ha-form
      .hass=${this.hass}
      .data=${this.toForm(this.config)}
      .schema=${mt(this.config.type,this.t)}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}
    ></ha-form>`}};xe.styles=x`
    :host {
      display: block;
    }
  `,v([A({attribute:!1})],xe.prototype,"hass",2),v([y()],xe.prototype,"config",2);customElements.get("liquid-glass-card-editor")||customElements.define("liquid-glass-card-editor",xe);var ee=250,vt=24,bt=ee/2-vt/2,le=135,J=270,Ue=(s,i=bt)=>{let e=s*Math.PI/180;return[ee/2+i*Math.cos(e),ee/2+i*Math.sin(e)]};function ei(s,i){let[e,t]=Ue(s),[n,r]=Ue(i),o=i-s>180?1:0;return`M ${e} ${t} A ${bt} ${bt} 0 ${o} 1 ${n} ${r}`}var ye=class extends k{constructor(){super(...arguments);this.onDialDown=e=>{if(this.mode==="off"||e.button!==0)return;e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId);let t=this.valueFromPointer(e),n="single";if(this.isRange){let r=this.entity.attributes.target_temp_low,o=this.entity.attributes.target_temp_high;n=Math.abs(t-r)<=Math.abs(t-o)?"low":"high"}this.drag={which:n,value:t}};this.onDialMove=e=>{if(!this.drag)return;let t=this.valueFromPointer(e);t!==this.drag.value&&(this.drag={...this.drag,value:t})};this.onDialUp=()=>{if(!this.drag)return;let{which:e,value:t}=this.drag;this.drag=void 0;let n=this.entity?.attributes??{};e==="single"?this.callService("climate","set_temperature",{temperature:t}):e==="low"?this.callService("climate","set_temperature",{target_temp_low:Math.min(t,n.target_temp_high-this.step),target_temp_high:n.target_temp_high}):this.callService("climate","set_temperature",{target_temp_low:n.target_temp_low,target_temp_high:Math.max(t,n.target_temp_low+this.step)})}}static getStubConfig(e,t,n){return{entity:F(["climate"],e,t,n)}}getCardSize(){return 6}get mode(){return this.entity?.state??"off"}get step(){return this.entity?.attributes.target_temp_step??.5}get range(){let e=this.entity?.attributes;return[e?.min_temp??7,e?.max_temp??35]}get isRange(){return this.mode==="heat_cool"&&this.entity?.attributes.target_temp_low!==void 0}ratio(e){let[t,n]=this.range;return w((e-t)/(n-t||1),0,1)}theme(){let e=this.t,t=this.mode,n="rgba(255,255,255,0.7)";switch(t){case"heat":return{icon:"mdi:fire",label:e("mode_heat"),well:{from:"#FFA073",to:"var(--lg-heat-deep)",glow:"rgba(255,106,61,0.24)"},badge:{color:"var(--lg-heat)",bg:"rgba(255,106,61,0.18)",stroke:"rgba(255,106,61,0.3)"},ring:["#FFB36B","var(--lg-heat)","var(--lg-heat-deep)"],glow:"rgba(255,106,61,0.35)",selectedColor:"var(--lg-heat)"};case"cool":return{icon:"mdi:snowflake",label:e("mode_cool"),well:{from:"#8FDBFF",to:"var(--lg-cool-deep)",glow:"rgba(10,132,255,0.24)"},badge:{color:"var(--lg-cool-deep)",bg:"rgba(10,132,255,0.18)",stroke:"rgba(10,132,255,0.3)"},ring:["#A8E4FF","var(--lg-cool)","var(--lg-cool-deep)"],glow:"rgba(10,132,255,0.35)",selectedColor:"var(--lg-cool-deep)"};case"dry":return{icon:"mdi:water-percent",label:e("mode_dry"),well:{from:"#8FDBFF",to:"#2BB3D0",glow:"rgba(43,179,208,0.24)"},badge:{color:"#0A7EA4",bg:"rgba(43,179,208,0.18)",stroke:"rgba(43,179,208,0.3)"},ring:["#A8E4FF","#5DD6EE","#0A7EA4"],glow:"rgba(43,179,208,0.35)",selectedColor:"#0A7EA4"};case"fan_only":return{icon:"mdi:fan",label:e("mode_fan_only"),well:{from:"#C9CED6",to:"#8E9AAF",glow:"rgba(142,154,175,0.24)"},badge:{color:"#5C6B82",bg:"rgba(142,154,175,0.18)",stroke:"rgba(142,154,175,0.3)"},ring:["#DDE3EC","#B4BDCC","#8E9AAF"],glow:"rgba(142,154,175,0.3)",selectedColor:"#5C6B82"};case"heat_cool":case"auto":return{icon:"mdi:thermometer-auto",label:e(t==="auto"?"mode_auto":"mode_heat_cool"),well:{from:"#7EE8A0",to:"#1E9E4A",glow:"rgba(48,209,88,0.24)"},badge:{color:"#1E9E4A",bg:"rgba(48,209,88,0.18)",stroke:"rgba(48,209,88,0.3)"},ring:["var(--lg-heat)","#C58CFF","var(--lg-cool-deep)"],glow:"rgba(142,107,255,0.35)",selectedColor:"#1E9E4A"};default:return{icon:"mdi:power",label:e("mode_off"),ring:[n,n,n],glow:"transparent",selectedColor:"var(--lg-text-primary)"}}}modeMeta(e){return{icon:{auto:"mdi:refresh-auto",heat_cool:"mdi:sun-snowflake-variant",cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"}[e]??"mdi:thermostat",label:this.t(`mode_${e}`)}}actionText(){let e=this.t,t=this.entity?.attributes.hvac_action;if(this.mode==="off")return e("mode_off");switch(t){case"heating":return e("heating");case"cooling":return e("cooling");case"drying":return e("drying");case"fan":return e("fan_running");case"idle":return e("idle");default:return this.theme().label}}stateText(){let e=this.entity?.attributes??{},t=[this.actionText()];return e.current_temperature!==void 0&&t.push(`${this.t("room_temp")} ${M(this.hass,e.current_temperature,1)}\xB0`),e.current_humidity!==void 0&&t.push(`${this.t("humidity")} ${M(this.hass,e.current_humidity,0)}%`),t.join(" \xB7 ")}valueFromPointer(e){let t=this.shadowRoot?.querySelector(".dial");if(!t)return 0;let n=t.getBoundingClientRect(),r=e.clientX-(n.left+n.width/2),o=e.clientY-(n.top+n.height/2),a=Math.atan2(o,r)*180/Math.PI;a=((a-le)%360+360)%360,a>J&&(a=a>J+(360-J)/2?0:J);let[l,d]=this.range,h=l+a/J*(d-l);return w(Math.round(h/this.step)*this.step,l,d)}renderDial(e){let t=this.entity.attributes,n=this.mode==="off",r=this.t,[o,a]=this.range,l=this.drag?.which==="single"?this.drag.value:t.temperature??o,d=this.drag?.which==="low"?this.drag.value:t.target_temp_low??o,h=this.drag?.which==="high"?this.drag.value:t.target_temp_high??a,g=this.isRange,f=g?le+this.ratio(d)*J:le,u=le+this.ratio(g?h:l)*J,[C,E,P]=e.ring,[m,U]=Ue(f),[I,K]=Ue(u),ke=g?[d,h]:[l],Se=g?M(this.hass,d,0)+"\u2013"+M(this.hass,h,0):M(this.hass,Math.floor(l),0),z=g?"\xB0":`.${Math.round((l-Math.floor(l))*10)}\xB0`;return c`<div class="dial-row">
      <div class="dial" @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg viewBox="0 0 ${ee} ${ee}" style=${_({"--ring-glow":e.glow})}>
          <defs>
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1=${m} y1=${U} x2=${I} y2=${K}>
              <stop offset="0" stop-color=${C} />
              <stop offset="0.55" stop-color=${E} />
              <stop offset="1" stop-color=${P} />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${ei(le,le+J)} />
          ${n||u-f<.5?p:me`<path class="ring-fill" stroke="url(#ring-grad)" d=${ei(f,u)} />`}
        </svg>
        ${n?p:ke.map(Qe=>this.renderKnobAt(Qe))}
        <div class="center">
          <div class="caption">${r(g?"target_range":"target_temp")}</div>
          <div class=${b({"temp-row":!0,off:n})}>
            <span class=${b({target:!0,range:g})}>${Se}</span><span class="fraction">${z}</span>
          </div>
          ${t.current_temperature!==void 0?c`<div class="current">${r("room_temp")} ${M(this.hass,t.current_temperature,1)}°</div>`:p}
        </div>
        <div class="minmax"><span>${M(this.hass,o,0)}°</span><span>${M(this.hass,a,0)}°</span></div>
      </div>
    </div>`}renderKnobAt(e){let t=le+this.ratio(e)*J,[n,r]=Ue(t);return c`<div
      class="dial-knob knob"
      style=${_({left:`${(n/ee*100).toFixed(3)}%`,top:`${(r/ee*100).toFixed(3)}%`})}
    ></div>`}renderDetail(e,t){let n=this.entity.attributes,r=n[`${e}s`],o=n[e];return r?.length?c`<div class="detail">
      <lg-icon .icon=${t}></lg-icon>
      <div class="text">
        <span class="dl">${this.t(e==="preset_mode"?"preset":e)}</span>
        <span class="dv">${o??"\u2014"}</span>
      </div>
      <lg-icon icon="mdi:chevron-down"></lg-icon>
      <select .value=${o??""} @change=${a=>this.callService("climate",`set_${e}`,{[e]:a.target.value})}>
        ${r.map(a=>c`<option value=${a} ?selected=${a===o}>${a}</option>`)}
      </select>
    </div>`:p}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.theme(),n=this.mode==="off",r=(this.config.hvac_modes??e.attributes.hvac_modes??[]).filter(Boolean),o=this.config.show_fan_mode!==!1,a=this.config.show_preset_mode!==!1,l=this.config.show_swing_mode===!0;return c`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon??t.icon,t.well)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderBadge(t.label,t.badge)}
        </div>

        ${this.renderDial(t)}

        ${r.length?c`<div class="segment modes" style=${_({"--selected-color":t.selectedColor})}>
              ${r.map(d=>{let h=this.modeMeta(d);return c`<button class=${b({selected:d===this.mode})} @click=${()=>this.callService("climate","set_hvac_mode",{hvac_mode:d})}>
                  <lg-icon .icon=${h.icon}></lg-icon><span>${h.label}</span>
                </button>`})}
            </div>`:p}

        ${o||a||l?c`<div class=${b({details:!0,muted:n})}>
              ${o?this.renderDetail("fan_mode","mdi:weather-windy"):p}
              ${a?this.renderDetail("preset_mode","mdi:creation"):p}
              ${l?this.renderDetail("swing_mode","mdi:arrow-oscillating"):p}
            </div>`:p}
      </div>`}};ye.styles=[T,O,x`
      .dial-row {
        display: flex;
        justify-content: center;
      }
      /* The SVG scales with its viewBox, so everything layered on top is positioned in
         percentages of the dial rather than in the 250px design units. */
      .dial {
        position: relative;
        width: min(${ee}px, 100%);
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
        stroke-width: ${vt}px;
      }
      .ring-track-stroke {
        fill: none;
        stroke: var(--lg-glass-stroke);
        stroke-width: 1px;
      }
      .ring-fill {
        fill: none;
        stroke-width: ${vt}px;
        filter: drop-shadow(0 0 7px var(--ring-glow));
      }
      .dial-knob {
        position: absolute;
        width: var(--lg-knob, 30px);
        height: var(--lg-knob, 30px);
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: transform 0.12s ease;
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
      @supports (container-type: inline-size) {
        .card {
          --lg-knob: clamp(22px, 8cqi, 30px);
          --lg-temp: clamp(34px, 14.2cqi, 54px);
          --lg-temp-range: clamp(26px, 10.5cqi, 40px);
          --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
        }
      }
      .segment.modes {
        border-radius: 20px;
      }
      .segment.modes > button {
        height: clamp(44px, 14cqi, 54px);
        border-radius: 17px;
        font-size: var(--lg-tick);
        padding: 0 2px;
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
    `],v([y()],ye.prototype,"drag",2);customElements.get("liquid-glass-climate-card")||customElements.define("liquid-glass-climate-card",ye);var Mi=500,ti=10,Ie=class extends k{constructor(){super(...arguments);this.heldOpen=!1;this.toggle=()=>{if(!this.config.entity)return;let e=this.config.entity.split(".")[0];["switch","light","fan","input_boolean","automation","humidifier","siren","remote"].includes(e)?this.callService(e,"toggle"):this.callService("homeassistant","toggle")};this.onPointerDown=e=>{e.button===0&&(this.heldOpen=!1,this.holdOrigin={x:e.clientX,y:e.clientY},this.holdTimer=window.setTimeout(()=>{this.heldOpen=!0,this.cancelHold(),this.openMoreInfo()},Mi))};this.onPointerMove=e=>{this.holdOrigin&&(Math.abs(e.clientX-this.holdOrigin.x)>ti||Math.abs(e.clientY-this.holdOrigin.y)>ti)&&this.cancelHold()};this.onClick=()=>{if(this.cancelHold(),this.heldOpen){this.heldOpen=!1;return}this.toggle()};this.onKeyDown=e=>{e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}}static getStubConfig(e,t,n){return{entity:F(["switch","input_boolean","fan","light","automation","humidifier","siren","remote"],e,t,n)}}getCardSize(){return 1}get isOn(){return this.entity?.state==="on"}disconnectedCallback(){super.disconnectedCallback(),this.cancelHold()}cancelHold(){this.holdTimer!==void 0&&window.clearTimeout(this.holdTimer),this.holdTimer=void 0,this.holdOrigin=void 0}stateText(){let e=this.t,t=this.entity;if(this.isOn){let n=this.config.power_entity?this.hass?.states[this.config.power_entity]:void 0;if(n&&!S(n)){let r=n.attributes.unit_of_measurement??"W";return`${e("on")} \xB7 ${e("power")} ${M(this.hass,Number(n.state),0)} ${r}`}return`${e("on")} \xB7 ${e("since",{t:X(t.last_changed,e)})}`}return`${e("off")} \xB7 ${e("last_on")} ${X(t.last_changed,e)}`}defaultIcon(){let e=this.config.entity?.split(".")[0];return e==="fan"?"mdi:fan":e==="light"?"mdi:lightbulb":e==="automation"?"mdi:robot":"mdi:power-plug"}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.isOn,n=t?{from:"var(--lg-switch-accent-light)",to:"var(--lg-switch-accent)",glow:"rgba(10,132,255,0.24)"}:void 0;return c`${this.renderDefs()}
      <div
        class=${b({glass:!0,card:!0,row:!0,active:t})}
        role="switch"
        aria-checked=${t}
        aria-label=${this.entityName}
        tabindex="0"
        @click=${this.onClick}
        @keydown=${this.onKeyDown}
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${()=>this.cancelHold()}
        @pointercancel=${()=>this.cancelHold()}
        @pointerleave=${()=>this.cancelHold()}
        @contextmenu=${r=>r.preventDefault()}
      >
        ${this.renderIconWell(this.config.icon??e.attributes.icon??this.defaultIcon(),n,null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.stateText()}</div>
        </div>
      </div>`}};Ie.styles=[T,O,x`
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
    `];customElements.get("liquid-glass-switch-card")||customElements.define("liquid-glass-switch-card",Ie);var ii=340,we=84,ni=5*60*1e3,$e=class extends k{constructor(){super(...arguments);this.points=[];this.lastFetch=0;this.fetchedFor=""}static getStubConfig(e,t,n){return{entity:F(["sensor"],e,t,n,r=>Number.isFinite(Number(r.state)))}}getCardSize(){return this.config?.graph===!1?2:4}get accent(){return this.config.accent??"#FF9F0A"}get hours(){return this.config.hours_to_show??24}get showGraph(){return this.config.graph!==!1}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.maybeFetch(!0),ni)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}updated(){this.maybeFetch(!1)}maybeFetch(e){if(!this.hass||!this.config?.entity)return;let t=`${this.config.entity}:${this.hours}`,n=Date.now()-this.lastFetch>ni;!e&&t===this.fetchedFor&&!n||(this.fetchedFor=t,this.lastFetch=Date.now(),this.fetchHistory(this.hass,this.config.entity))}async fetchHistory(e,t){let n=new Date(Date.now()-this.hours*3600*1e3).toISOString();try{let o=(await e.callApi("GET",`history/period/${n}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`))?.[0]??[],a=[];for(let d of o){let h=Number(d.state??d.s),g=d.last_changed??d.last_updated,f=g?new Date(g).getTime():(d.lu??0)*1e3;Number.isFinite(h)&&f&&a.push({t:f,v:h})}let l=Number(e.states[t]?.state);Number.isFinite(l)&&a.push({t:Date.now(),v:l}),this.points=a}catch{this.points=[]}}trend(){if(this.config.trend===!1||this.points.length<2)return;let e=this.points[this.points.length-1],t=e.t-3600*1e3,n=this.points[0];for(let r of this.points)if(r.t<=t)n=r;else break;return e.v-n.v}sparkPath(){let e=this.points;if(e.length<2)return;let t=e[0].t,n=e[e.length-1].t,r=1/0,o=-1/0;for(let u of e)r=Math.min(r,u.v),o=Math.max(o,u.v);o-r<1e-9&&(o+=1,r-=1);let a=10,l=e.map(u=>(u.t-t)/(n-t||1)*(ii-12)),d=e.map(u=>a+(1-(u.v-r)/(o-r))*(we-a*2)),h=`M ${l[0].toFixed(1)} ${d[0].toFixed(1)}`;for(let u=0;u<e.length-1;u++){let C=l[Math.max(0,u-1)],E=d[Math.max(0,u-1)],P=l[u],m=d[u],U=l[u+1],I=d[u+1],K=l[Math.min(e.length-1,u+2)],ke=d[Math.min(e.length-1,u+2)],Se=P+(U-C)/6,z=m+(I-E)/6,Qe=U-(K-P)/6,oi=I-(ke-m)/6;h+=` C ${Se.toFixed(1)} ${z.toFixed(1)}, ${Qe.toFixed(1)} ${oi.toFixed(1)}, ${U.toFixed(1)} ${I.toFixed(1)}`}let g=l[l.length-1],f=`${h} L ${g.toFixed(1)} ${we} L ${l[0].toFixed(1)} ${we} Z`;return{line:h,area:f,last:[g,d[d.length-1]]}}subtitle(){let e=this.t,t=[e("updated_ago",{t:X(this.entity?.last_updated,e)})];if(this.config.secondary_entity){let n=this.hass?.states[this.config.secondary_entity];if(n&&!S(n)){let r=this.config.secondary_label??n.attributes.friendly_name??"";t.push(`${r} ${n.state}${n.attributes.unit_of_measurement??""}`.trim())}}return t.join(" \xB7 ")}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.t,n=this.accent,r=Number(e.state),o=Number.isFinite(r),a=this.config.decimals,l=e.attributes.unit_of_measurement??"",d=o?this.trend():void 0,h=this.showGraph?this.sparkPath():void 0,g=this.points.map(m=>m.v),f=g.length?Math.min(...g):void 0,u=g.length?Math.max(...g):void 0,C=this.config.icon??e.attributes.icon??(e.attributes.device_class==="humidity"?"mdi:water-percent":"mdi:thermometer"),E=(d??0)>=0,P=l==="\xB0C"||l==="\xB0F"?"\xB0":l.length<=3?l:"";return c`${this.renderDefs()}
      <div class="glass card" style=${_({"--accent":n})}>
        <div class="header">
          ${this.renderIconWell(C,{from:oe(n),to:n,glow:j(n,.24)})}
          ${this.renderTitle(this.entityName,this.subtitle())}
          ${d!==void 0?c`<div
                class="badge trend"
                style=${_({"--badge-color":E?"var(--lg-trend-up)":"var(--lg-trend-down)","--badge-bg":E?"var(--lg-trend-up-bg)":"var(--lg-trend-down-bg)","--badge-stroke":E?"rgba(48,209,88,0.3)":"rgba(43,179,208,0.3)"})}
              >
                <lg-icon .icon=${E?"mdi:trending-up":"mdi:trending-down"}></lg-icon>
                <span>${E?"+":"\u2212"}${M(this.hass,Math.abs(d),1)}${P}</span>
              </div>`:p}
        </div>

        <div class="value-row">
          <div class="value">
            <span class="number">${o?M(this.hass,r,a):e.state}</span>
            ${l?c`<span class="unit">${l}</span>`:p}
          </div>
          ${this.showGraph&&f!==void 0&&u!==void 0?c`<div class="range">
                <span class="caption">${this.hours===24?t("hours_24"):`${this.hours} h`}</span>
                <span class="rv">${M(this.hass,f,a??1)} – ${M(this.hass,u,a??1)} ${l}</span>
              </div>`:p}
        </div>

        ${this.showGraph?c`<svg class="spark" viewBox="0 0 ${ii} ${we}" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color=${n} stop-opacity="0.4" />
                    <stop offset="1" stop-color=${n} stop-opacity="0" />
                  </linearGradient>
                </defs>
                ${h?me`<path d=${h.area} fill="url(#area)" />
                        <path class="line" d=${h.line} />
                        <circle class="dot" cx=${h.last[0]} cy=${h.last[1]} r="4.75" />`:p}
              </svg>
              <div class=${b({axis:!0})}>
                <span>${t("hours_ago",{n:this.hours})}</span>
                <span>${t("hours_ago",{n:Math.round(this.hours/2)})}</span>
                <span>${t("now")}</span>
              </div>`:p}
      </div>`}};$e.styles=[T,O,x`
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
        height: var(--lg-spark, ${we}px);
        overflow: visible;
        display: block;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-value: clamp(26px, 13.5cqi, 52px);
          --lg-value-unit: clamp(13px, 5.8cqi, 22px);
          --lg-spark: clamp(52px, 22cqi, ${we}px);
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
    `],v([y()],$e.prototype,"points",2);customElements.get("liquid-glass-sensor-card")||customElements.define("liquid-glass-sensor-card",$e);var Le=class extends k{static getStubConfig(i,e,t){return{entity:F(["binary_sensor"],i,e,t)}}getCardSize(){return 1}meta(){let i=this.t,e=this.entity?.attributes.device_class,t={iconOn:"mdi:checkbox-marked-circle",iconOff:"mdi:checkbox-blank-circle-outline",badgeOn:i("on"),badgeOff:i("off"),stateOn:i("on"),stateOff:i("off"),accent:"#FF9F0A",accentLight:"#FFC96B"};switch(e){case"door":case"garage_door":case"opening":return{...t,iconOn:"mdi:door-open",iconOff:"mdi:door-closed",badgeOn:i("open"),badgeOff:i("closed"),stateOn:i("is_open"),stateOff:i("is_closed")};case"window":return{...t,iconOn:"mdi:window-open-variant",iconOff:"mdi:window-closed-variant",badgeOn:i("open"),badgeOff:i("closed"),stateOn:i("is_open"),stateOff:i("is_closed")};case"motion":case"occupancy":case"presence":return{...t,iconOn:"mdi:motion-sensor",iconOff:"mdi:motion-sensor-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#7C3AED",accentLight:"#B48CFF"};case"moisture":return{...t,iconOn:"mdi:water-alert",iconOff:"mdi:water-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#0A84FF",accentLight:"#8FDBFF"};case"smoke":case"gas":case"carbon_monoxide":case"safety":case"problem":return{...t,iconOn:"mdi:alert",iconOff:"mdi:shield-check",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#FF3B30",accentLight:"#FF8A80"};case"vibration":case"sound":return{...t,iconOn:"mdi:vibrate",iconOff:"mdi:vibrate-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#7C3AED",accentLight:"#B48CFF"};case"connectivity":return{...t,iconOn:"mdi:lan-connect",iconOff:"mdi:lan-disconnect",accent:"#0A84FF",accentLight:"#8FDBFF"};case"battery":return{...t,iconOn:"mdi:battery-alert",iconOff:"mdi:battery",accent:"#FF3B30",accentLight:"#FF8A80"};case"lock":return{...t,iconOn:"mdi:lock-open-variant",iconOff:"mdi:lock",badgeOn:i("unlocked"),badgeOff:i("locked"),stateOn:i("is_unlocked"),stateOff:i("is_locked"),accent:"#FF3B30",accentLight:"#FF8A80"};default:return t}}render(){let i=this.entity;if(!i||S(i))return this.renderUnavailable();let e=i.state==="on",t=this.meta(),n=this.config.accent??t.accent,r=this.config.accent?oe(this.config.accent):t.accentLight,o=this.t,a=X(i.last_changed,o),l=e?this.config.icon_on??this.config.icon??i.attributes.icon??t.iconOn:this.config.icon_off??this.config.icon??i.attributes.icon??t.iconOff,d=e?{from:r,to:n,glow:j(n,.24)}:void 0,h=e?{color:n==="#7C3AED"?"#A66BFF":n,bg:j(n,.18),stroke:j(n,.3)}:void 0,g=e?`${t.stateOn} \xB7 ${o("since",{t:a})}`:`${t.stateOff} \xB7 ${o("last_change",{t:a})}`;return c`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderIconWell(l,d)}
        ${this.renderTitle(this.entityName,g)}
        ${this.renderBadge(e?this.config.label_on??t.badgeOn:this.config.label_off??t.badgeOff,h)}
      </div>`}};Le.styles=[T,O,x``];customElements.get("liquid-glass-binary-sensor-card")||customElements.define("liquid-glass-binary-sensor-card",Le);var _t=56,ce=4,de=class extends k{constructor(){super(...arguments);this.pending=!1;this.onDown=e=>{this.jammed||this.busy||e.button!==0||(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),this.dragRatio=this.ratioFromEvent(e))};this.onMove=e=>{this.dragRatio!==void 0&&(this.dragRatio=this.ratioFromEvent(e))};this.onUp=e=>{if(this.dragRatio===void 0)return;let t=this.ratioFromEvent(e);this.dragRatio=void 0,this.isLocked&&t>=.8?this.trigger("unlock"):!this.isLocked&&t<=.2&&this.trigger("lock")}}static getStubConfig(e,t,n){return{entity:F(["lock"],e,t,n)}}getCardSize(){return 2}get lockState(){return this.entity?.state??"unknown"}get isLocked(){return this.lockState==="locked"||this.lockState==="locking"}get busy(){return this.pending||this.lockState==="locking"||this.lockState==="unlocking"}get jammed(){return this.lockState==="jammed"}visual(){let e=this.t,t=this.entity,n=X(t.last_changed,e);return this.jammed?{icon:"mdi:alert",well:{from:"#FFE66B",to:"var(--lg-warn-deep)",glow:"rgba(255,214,10,0.24)"},badge:{color:"var(--lg-warn-text)",bg:"rgba(255,214,10,0.24)",stroke:"rgba(230,168,0,0.3)",glow:"var(--lg-warn)"},badgeLabel:e("jammed"),thumbColor:"var(--lg-warn-text)",hint:e("cannot_operate"),state:e("jammed_state")}:this.isLocked?{icon:"mdi:lock",well:{from:"#7EE8A0",to:"var(--lg-lock-locked-deep)",glow:"rgba(48,209,88,0.24)"},badge:{color:"var(--lg-lock-locked-deep)",bg:"rgba(30,158,74,0.18)",stroke:"rgba(30,158,74,0.3)"},badgeLabel:e("locked"),thumbColor:"var(--lg-lock-locked-deep)",hint:e("slide_to_unlock"),state:this.lockState==="locking"?e("locking"):`${e("is_locked")} \xB7 ${e("auto_locked_at",{t:Ve(t.last_changed)})}`}:{icon:"mdi:lock-open-variant",well:{from:"var(--lg-lock-unlocked)",to:"var(--lg-lock-unlocked-deep)",glow:"rgba(255,59,48,0.24)"},badge:{color:"var(--lg-lock-unlocked-deep)",bg:"rgba(255,59,48,0.18)",stroke:"rgba(255,59,48,0.3)"},badgeLabel:e("unlocked"),thumbColor:"var(--lg-lock-unlocked-deep)",hint:e("slide_to_lock"),state:this.lockState==="unlocking"?e("unlocking"):`${e("is_unlocked")} \xB7 ${n}`}}ratioFromEvent(e){let t=this.shadowRoot?.querySelector(".slide");if(!t)return 0;let n=t.getBoundingClientRect(),r=this.shadowRoot?.querySelector(".thumb")?.offsetWidth||_t,o=n.width-ce*2-r;return o<=0?0:w((e.clientX-n.left-ce-r/2)/o,0,1)}trigger(e){this.pending=!0,this.callService("lock",e),window.setTimeout(()=>this.pending=!1,4e3)}runButton(e){let[t,n]=e.service.split(".");this.hass?.callService(t,n,{entity_id:this.config.entity,...e.data??{}})}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.visual(),n=this.isLocked,r=this.dragRatio!==void 0,o=r?this.dragRatio:n?0:1,a=r?1-Math.abs(o-(n?0:1))*1.6:1,l=this.config.buttons??[];return c`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon??t.icon,t.well)}
          ${this.renderTitle(this.entityName,t.state)}
          ${this.renderBadge(t.badgeLabel,t.badge)}
        </div>

        <div
          class=${b({slide:!0,disabled:this.jammed||this.busy})}
          @pointerdown=${this.onDown}
          @pointermove=${this.onMove}
          @pointerup=${this.onUp}
          @pointercancel=${this.onUp}
        >
          <div class="hint" style=${_({opacity:String(w(a,0,1))})}>
            ${!n&&!this.jammed?c`<lg-icon icon="mdi:chevron-double-left"></lg-icon>`:p}
            <span>${t.hint}</span>
            ${n&&!this.jammed?c`<lg-icon icon="mdi:chevron-double-right"></lg-icon>`:p}
          </div>
          <div
            class=${b({thumb:!0,dragging:r})}
            style=${_({left:`calc(${ce}px + (100% - ${ce*2}px - var(--thumb)) * ${o})`,"--thumb-color":t.thumbColor})}
          >
            <lg-icon .icon=${t.icon}></lg-icon>
          </div>
        </div>

        ${l.length?c`<div class="chips">
              ${l.map(d=>c`<button class="chip" @click=${()=>this.runButton(d)}>
                  ${d.icon?c`<lg-icon .icon=${d.icon}></lg-icon>`:p}<span>${d.name}</span>
                </button>`)}
            </div>`:p}
      </div>`}};de.styles=[T,O,x`
      .card {
        gap: 16px;
      }
      .slide {
        --thumb: ${_t}px;
        position: relative;
        height: calc(var(--thumb) + ${ce*2}px);
        border-radius: 999px;
        padding: ${ce}px;
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
        top: ${ce}px;
        width: var(--thumb);
        height: var(--thumb);
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: grab;
        background: rgba(255, 255, 255, 0.26);
        -webkit-backdrop-filter: blur(4px) saturate(1.35);
        backdrop-filter: blur(4px) saturate(1.35);
        box-shadow:
          0 4px 12px rgba(0, 0, 0, 0.3),
          inset 0 0 0 1.5px rgba(255, 255, 255, 0.85),
          inset 0 8px 12px -6px rgba(255, 255, 255, 0.9),
          inset 0 -6px 10px -6px rgba(0, 0, 0, 0.12);
        transition: left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        --mdc-icon-size: calc(var(--thumb) * 0.43);
      }
      :host([refraction]) .thumb {
        -webkit-backdrop-filter: url(#lg-knob);
        backdrop-filter: url(#lg-knob);
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
          --thumb: clamp(40px, 14.7cqi, ${_t}px);
        }
        .card {
          --lg-hint: clamp(11.5px, 3.7cqi, 14px);
        }
      }
    `],v([y()],de.prototype,"dragRatio",2),v([y()],de.prototype,"pending",2);customElements.get("liquid-glass-lock-card")||customElements.define("liquid-glass-lock-card",de);var xt={OPEN:1,CLOSE:2,SET_POSITION:4,STOP:8,SET_TILT:128},si=180,pe=class extends k{constructor(){super(...arguments);this.dragSide="left";this.onDown=e=>{if(!this.canSetPosition||e.button!==0)return;e.preventDefault();let t=e.currentTarget;t.setPointerCapture(e.pointerId);let n=t.getBoundingClientRect();this.dragSide=e.clientX<n.left+n.width/2?"left":"right",this.dragPos=this.posFromEvent(e)};this.onMove=e=>{this.dragPos!==void 0&&(this.dragPos=this.posFromEvent(e))};this.onUp=e=>{if(this.dragPos===void 0)return;let t=this.posFromEvent(e);this.dragPos=void 0,this.callService("cover","set_cover_position",{position:t})}}static getStubConfig(e,t,n){return{entity:F(["cover"],e,t,n,r=>!!((r.attributes.supported_features??0)&xt.SET_POSITION))}}getCardSize(){return 4}get position(){if(this.dragPos!==void 0)return this.dragPos;let e=this.entity?.attributes.current_position;return e!==void 0?e:this.entity?.state==="closed"?0:100}get styleKind(){return this.config.style?this.config.style:this.entity?.attributes.device_class==="curtain"?"curtain":"blind"}get curtainKind(){return this.config.curtain??"double"}get moving(){let e=this.entity?.state;return e==="opening"||e==="closing"?e:void 0}get canSetPosition(){return q(this.entity,xt.SET_POSITION)}get hasTilt(){return this.config.show_tilt===!1?!1:q(this.entity,xt.SET_TILT)&&this.entity?.attributes.current_tilt_position!==void 0}stateText(){let e=this.t,t=this.entity,n=this.position;return this.moving?`${e(this.moving)} \xB7 ${n}% \u2192 ${this.moving==="opening"?100:0}%`:t.state==="closed"||n===0?`${e("is_closed")} \xB7 ${e("last_change",{t:Ve(t.last_changed)})}`:`${e("position")} ${n}% \xB7 ${e("stopped")}`}posFromEvent(e){let t=this.shadowRoot?.querySelector(".track");if(!t)return this.position;let n=t.getBoundingClientRect(),r;return this.styleKind==="blind"?r=(e.clientY-n.top)/n.height:this.curtainKind==="single"?r=(e.clientX-n.left)/n.width:r=2*(this.dragSide==="right"?n.right-e.clientX:e.clientX-n.left)/n.width,Math.round(w(1-r,0,1)*100)}renderTrackVisual(e){let t=1-e/100;if(this.styleKind==="blind"){let r=`${t*100}%`;return c`<div class="fabric" style=${_({height:r})}>
          ${[0,1,2,3,4].map(()=>c`<span></span>`)}
        </div>
        ${e>0?c`<div class="handle h" style=${_({top:`max(4px, calc(${r} - 13px))`})}></div>`:p}`}if(this.curtainKind==="single")return c`<div class="panel left" style=${_({width:`${t*100}%`})}>
          ${[0,1,2].map(()=>c`<span></span>`)}
        </div>
        <div class="handle v" style=${_({left:`calc(${t*100}% - 13px)`})}></div>`;let n=`${t*100/2}%`;return c`<div class="panel left" style=${_({width:n})}>${[0,1,2].map(()=>c`<span></span>`)}</div>
      <div class="panel right" style=${_({width:n})}>${[0,1,2].map(()=>c`<span></span>`)}</div>
      <div class="handle v" style=${_({left:`calc(${n} - 13px)`})}></div>
      <div class="handle v" style=${_({right:`calc(${n} - 13px)`})}></div>`}buttonIcons(){return this.styleKind==="curtain"?this.curtainKind==="double"?["mdi:arrow-expand-horizontal","mdi:arrow-collapse-horizontal"]:["mdi:chevron-double-left","mdi:chevron-double-right"]:["mdi:chevron-up","mdi:chevron-down"]}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=this.t,n=this.position,r=n===0&&!this.moving,o=this.moving,a=this.styleKind==="curtain",[l,d]=this.buttonIcons(),h=r?void 0:{from:"#8FE3F4",to:"var(--lg-cover-accent-deep)",glow:"rgba(43,179,208,0.24)"},g=r?void 0:{color:"var(--lg-cover-badge)",bg:"rgba(43,179,208,0.18)",stroke:"rgba(43,179,208,0.3)"},f=t(o?"moving":r?"closed":"open"),u=this.config.icon??e.attributes.icon??(a?"mdi:curtains":"mdi:blinds-horizontal"),C=o?`${t(o)}\u2026`:t(r?"is_closed":"is_open"),E=a&&this.curtainKind==="single",P=r||!a&&o==="opening"&&n<60,m=!a&&o==="opening"&&n<60&&!r,U=this.tiltPreview??e.attributes.current_tilt_position??50,I=Math.round(U/100*180-90);return c`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(u,h)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderBadge(f,g)}
        </div>

        <div class="position-row">
          <div class="track" @pointerdown=${this.onDown} @pointermove=${this.onMove} @pointerup=${this.onUp} @pointercancel=${this.onUp}>
            ${this.renderTrackVisual(n)}
            <div
              class=${b({overlay:!0,center:a&&!E,right:E,top:m})}
              style=${_(P?{"--pv-color":"#0B3A46","--pc-color":"rgba(11,58,70,0.7)"}:{})}
            >
              <span class="pv">${n}%</span>
              <span class="pc">${C}</span>
            </div>
          </div>
          <div class="buttons">
            <button class=${b({"round-btn":!0,active:o==="opening"})} @click=${()=>this.callService("cover","open_cover")} title="Open">
              <lg-icon .icon=${l}></lg-icon>
            </button>
            <button class=${b({"round-btn":!0,stop:!0,selected:!!o})} @click=${()=>this.callService("cover","stop_cover")} title="Stop">
              <lg-icon icon="mdi:square-outline"></lg-icon>
            </button>
            <button class=${b({"round-btn":!0,active:o==="closing"})} @click=${()=>this.callService("cover","close_cover")} title="Close">
              <lg-icon .icon=${d}></lg-icon>
            </button>
          </div>
        </div>

        ${this.hasTilt?c`<div class="section tilt">
              <div class="label-row"><span class="label">${t("tilt")}</span><span class="value">${I}°</span></div>
              <lg-slider
                variant="thumb"
                .refraction=${this.refraction}
                .value=${U}
                min="0"
                max="100"
                step="1"
                .fillFrom=${.5}
                .showFill=${!r}
                @lg-input=${K=>this.tiltPreview=K.detail.value}
                @lg-change=${K=>{this.tiltPreview=void 0,this.callService("cover","set_cover_tilt_position",{tilt_position:Math.round(K.detail.value)})}}
              ></lg-slider>
              <div class="ticks"><span>−90°</span><span>0°</span><span>90°</span></div>
            </div>`:p}
      </div>`}};pe.styles=[T,O,x`
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
        height: var(--lg-track-h, ${si}px);
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
          --lg-track-h: clamp(120px, 47cqi, ${si}px);
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
    `],v([y()],pe.prototype,"dragPos",2),v([y()],pe.prototype,"tiltPreview",2);customElements.get("liquid-glass-cover-card")||customElements.define("liquid-glass-cover-card",pe);var he={PAUSE:1,SEEK:2,VOLUME_SET:4,PREVIOUS:16,NEXT:32,PLAY:16384,SHUFFLE:32768,REPEAT:262144};function ri(s){let i=Math.max(0,Math.round(s)),e=Math.floor(i/3600),t=Math.floor(i%3600/60),n=i%60;return e?`${e}:${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`:`${t}:${String(n).padStart(2,"0")}`}var te=class extends k{constructor(){super(...arguments);this.tick=0;this.playPause=()=>{this.playState==="idle"&&!q(this.entity,he.PLAY)||this.callService("media_player","media_play_pause")}}static getStubConfig(e,t,n){return{entity:F(["media_player"],e,t,n)}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.entity?.state==="playing"&&this.tick++},1e3)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}get playState(){let e=this.entity?.state;return e==="playing"||e==="buffering"?"playing":e==="paused"?"paused":"idle"}position(){let e=this.entity?.attributes??{},t=e.media_duration,n=e.media_position;if(!(!t||n===void 0))return this.playState==="playing"&&e.media_position_updated_at&&(n+=(Date.now()-new Date(e.media_position_updated_at).getTime())/1e3),this.tick,{pos:w(n,0,t),duration:t}}render(){let e=this.entity;if(!e||S(e))return this.renderUnavailable();let t=e.attributes,n=this.t,r=this.playState,o=r==="idle",a=this.config.source_color??"#FF375F",l=o?void 0:t.entity_picture,d=o?n("not_playing"):t.media_title??e.attributes.friendly_name??"",h=[t.media_artist,t.media_album_name].filter(Boolean),g=o?n("standby"):h.join(" \u2014 ")||(t.source??""),f=t.app_name??t.source,u=this.position(),C=this.seekPreview??(u?u.pos/u.duration:0),E=u?this.seekPreview!==void 0?this.seekPreview*u.duration:u.pos:0,P=u?u.duration-E:0,m=this.volumePreview??t.volume_level??.5,U=!!t.shuffle,I=t.repeat??"off",K=q(e,he.SEEK)&&!!u&&!o,ke=this.config.show_volume!==!1&&q(e,he.VOLUME_SET),Se=this.config.show_device!==!1;return c`${this.renderDefs()}
      <div class="glass card" style=${_({"--source-color":a})}>
        ${Se?c`<div class="device" @click=${this.openMoreInfo}><lg-icon icon="mdi:speaker"></lg-icon><span>${this.entityName}</span></div>`:p}

        <div class="header">
          <div class=${b({art:!0,idle:!l})} style=${l?_({backgroundImage:`url("${l}")`}):p} @click=${this.openMoreInfo}>
            ${l?p:c`<lg-icon icon="mdi:music"></lg-icon>`}
          </div>
          <div class="title" @click=${this.openMoreInfo}>
            <div class="name">${d}</div>
            <div class="state">${g}</div>
            ${r==="paused"?c`<div class="source muted-text"><lg-icon icon="mdi:pause"></lg-icon><span>${n("paused")}</span></div>`:!o&&f?c`<div class="source"><lg-icon icon="mdi:waveform"></lg-icon><span>${f}</span></div>`:p}
          </div>
          <button class="more" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:dots-horizontal"></lg-icon></button>
        </div>

        <div class=${b({progress:!0,dim:o})}>
          <lg-slider
            variant="thin"
            .value=${o?.003:C}
            min="0"
            max="1"
            .disabled=${!K}
            @lg-input=${z=>this.seekPreview=z.detail.value}
            @lg-change=${z=>{this.seekPreview=void 0,u&&this.callService("media_player","media_seek",{seek_position:Math.round(z.detail.value*u.duration)})}}
          ></lg-slider>
          <div class="times"><span>${u?ri(E):"0:00"}</span><span>−${u?ri(P):"0:00"}</span></div>
        </div>

        <div class="transport">
          <button class=${b({aux:!0,on:U,fade:o})} ?disabled=${!q(e,he.SHUFFLE)} @click=${()=>this.callService("media_player","shuffle_set",{shuffle:!U})} title="Shuffle">
            <lg-icon icon="mdi:shuffle-variant"></lg-icon>
          </button>
          <button class=${b({skip:!0,fade:o})} ?disabled=${!q(e,he.PREVIOUS)} @click=${()=>this.callService("media_player","media_previous_track")} title="Previous">
            <lg-icon icon="mdi:skip-previous-outline"></lg-icon>
          </button>
          <button class=${b({play:!0})} @click=${this.playPause} title="Play / Pause" style=${o?"color: var(--lg-text-secondary)":""}>
            <lg-icon .icon=${r==="playing"?"mdi:pause":"mdi:play-outline"}></lg-icon>
          </button>
          <button class=${b({skip:!0,fade:o})} ?disabled=${!q(e,he.NEXT)} @click=${()=>this.callService("media_player","media_next_track")} title="Next">
            <lg-icon icon="mdi:skip-next-outline"></lg-icon>
          </button>
          <button class=${b({aux:!0,on:I!=="off",fade:o})} ?disabled=${!q(e,he.REPEAT)} @click=${()=>this.callService("media_player","repeat_set",{repeat:I==="off"?"all":I==="all"?"one":"off"})} title="Repeat">
            <lg-icon .icon=${I==="one"?"mdi:repeat-once":"mdi:repeat"}></lg-icon>
          </button>
        </div>

        ${ke?c`<div class=${b({volume:!0,muted:o})}>
              <lg-icon icon="mdi:volume-low"></lg-icon>
              <lg-slider
                variant="thin"
                .value=${m}
                min="0"
                max="1"
                step="0.01"
                @lg-input=${z=>this.volumePreview=z.detail.value}
                @lg-change=${z=>{this.volumePreview=void 0,this.callService("media_player","volume_set",{volume_level:Math.round(z.detail.value*100)/100})}}
              ></lg-slider>
              <lg-icon icon="mdi:volume-high"></lg-icon>
            </div>`:p}
      </div>`}};te.styles=[T,O,x`
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
      .volume {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--lg-text-secondary);
        --mdc-icon-size: 20px;
      }
      .volume lg-slider {
        flex: 1;
        --lg-slider-height: 10px;
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
    `],v([y()],te.prototype,"tick",2),v([y()],te.prototype,"seekPreview",2),v([y()],te.prototype,"volumePreview",2);customElements.get("liquid-glass-media-card")||customElements.define("liquid-glass-media-card",te);var Fi="0.2.0",Ti="2026-09-03 13:04",Oi="https://github.com/cos-overclock/ha-liquid-glass",Pi=[{type:"liquid-glass-light-card",name:"Liquid Glass Light",description:"Brightness, color temperature, color and presets"},{type:"liquid-glass-climate-card",name:"Liquid Glass Climate",description:"Thermostat dial with modes and fan / preset"},{type:"liquid-glass-switch-card",name:"Liquid Glass Switch",description:"Single row toggle"},{type:"liquid-glass-sensor-card",name:"Liquid Glass Sensor",description:"Value, trend and 24h sparkline"},{type:"liquid-glass-binary-sensor-card",name:"Liquid Glass Binary Sensor",description:"Door / motion / window status row"},{type:"liquid-glass-lock-card",name:"Liquid Glass Lock",description:"Slide to lock / unlock"},{type:"liquid-glass-cover-card",name:"Liquid Glass Cover",description:"Blinds and curtains with position and tilt"},{type:"liquid-glass-media-card",name:"Liquid Glass Media",description:"Now playing with transport and volume"},{type:"liquid-glass-slider-card",name:"Liquid Glass Slider",description:"Any numeric value as a draggable track"}];window.customCards=window.customCards??[];for(let s of Pi)window.customCards.some(i=>i.type===s.type)||window.customCards.push({...s,preview:!0,documentationURL:Oi});console.info(`%c LIQUID-GLASS-CARDS %c v${Fi} \xB7 built ${Ti} `,"color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;","color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");export{Le as LiquidGlassBinarySensorCard,ye as LiquidGlassClimateCard,pe as LiquidGlassCoverCard,ae as LiquidGlassLightCard,de as LiquidGlassLockCard,te as LiquidGlassMediaCard,$e as LiquidGlassSensorCard,ve as LiquidGlassSliderCard,Ie as LiquidGlassSwitchCard};
