var Hi=Object.defineProperty;var Li=Object.getOwnPropertyDescriptor;var m=(s,i,e,t)=>{for(var n=t>1?void 0:t?Li(i,e):i,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(t?o(i,e,n):o(n))||n);return t&&n&&Hi(i,e,n),n};var tt=globalThis,it=tt.ShadowRoot&&(tt.ShadyCSS===void 0||tt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,mt=Symbol(),jt=new WeakMap,Ie=class{constructor(i,e,t){if(this._$cssResult$=!0,t!==mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=e}get styleSheet(){let i=this.o,e=this.t;if(it&&i===void 0){let t=e!==void 0&&e.length===1;t&&(i=jt.get(e)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),t&&jt.set(e,i))}return i}toString(){return this.cssText}},nt=s=>new Ie(typeof s=="string"?s:s+"",void 0,mt),w=(s,...i)=>{let e=s.length===1?s[0]:i.reduce((t,n,r)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new Ie(e,s,mt)},Vt=(s,i)=>{if(it)s.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of i){let t=document.createElement("style"),n=tt.litNonce;n!==void 0&&t.setAttribute("nonce",n),t.textContent=e.cssText,s.appendChild(t)}},ft=it?s=>s:s=>s instanceof CSSStyleSheet?(i=>{let e="";for(let t of i.cssRules)e+=t.cssText;return nt(e)})(s):s;var{is:Ni,defineProperty:Ui,getOwnPropertyDescriptor:qi,getOwnPropertyNames:ji,getOwnPropertySymbols:Vi,getPrototypeOf:Wi}=Object,le=globalThis,Wt=le.trustedTypes,Ki=Wt?Wt.emptyScript:"",Gi=le.reactiveElementPolyfillSupport,He=(s,i)=>s,Le={toAttribute(s,i){switch(i){case Boolean:s=s?Ki:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,i){let e=s;switch(i){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},rt=(s,i)=>!Ni(s,i),Kt={attribute:!0,type:String,converter:Le,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),le.litPropertyMetadata??(le.litPropertyMetadata=new WeakMap);var ne=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??(this.l=[])).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,e=Kt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(i,e),!e.noAccessor){let t=Symbol(),n=this.getPropertyDescriptor(i,t,e);n!==void 0&&Ui(this.prototype,i,n)}}static getPropertyDescriptor(i,e,t){let{get:n,set:r}=qi(this.prototype,i)??{get(){return this[e]},set(o){this[e]=o}};return{get:n,set(o){let a=n?.call(this);r?.call(this,o),this.requestUpdate(i,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??Kt}static _$Ei(){if(this.hasOwnProperty(He("elementProperties")))return;let i=Wi(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(He("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(He("properties"))){let e=this.properties,t=[...ji(e),...Vi(e)];for(let n of t)this.createProperty(n,e[n])}let i=this[Symbol.metadata];if(i!==null){let e=litPropertyMetadata.get(i);if(e!==void 0)for(let[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let e=[];if(Array.isArray(i)){let t=new Set(i.flat(1/0).reverse());for(let n of t)e.unshift(ft(n))}else i!==void 0&&e.push(ft(i));return e}static _$Eu(i,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??(this._$EO=new Set)).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(i.set(t,this[t]),delete this[t]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Vt(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,e,t){this._$AK(i,t)}_$ET(i,e){let t=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,t);if(n!==void 0&&t.reflect===!0){let r=(t.converter?.toAttribute!==void 0?t.converter:Le).toAttribute(e,t.type);this._$Em=i,r==null?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(i,e){let t=this.constructor,n=t._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let r=t.getPropertyOptions(n),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Le;this._$Em=n;let a=o.fromAttribute(e,r.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(i,e,t,n=!1,r){if(i!==void 0){let o=this.constructor;if(n===!1&&(r=this[i]),t??(t=o.getPropertyOptions(i)),!((t.hasChanged??rt)(r,e)||t.useDefault&&t.reflect&&r===this._$Ej?.get(i)&&!this.hasAttribute(o._$Eu(i,t))))return;this.C(i,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,e,{useDefault:t,reflect:n,wrapped:r},o){t&&!(this._$Ej??(this._$Ej=new Map)).has(i)&&(this._$Ej.set(i,o??e??this[i]),r!==!0||o!==void 0)||(this._$AL.has(i)||(this.hasUpdated||t||(e=void 0),this._$AL.set(i,e)),n===!0&&this._$Em!==i&&(this._$Eq??(this._$Eq=new Set)).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[n,r]of t){let{wrapped:o}=r,a=this[n];o!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let i=!1,e=this._$AL;try{i=this.shouldUpdate(e),i?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw i=!1,this._$EM(),t}i&&this._$AE(e)}willUpdate(i){}_$AE(i){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(i){}firstUpdated(i){}};ne.elementStyles=[],ne.shadowRootOptions={mode:"open"},ne[He("elementProperties")]=new Map,ne[He("finalized")]=new Map,Gi?.({ReactiveElement:ne}),(le.reactiveElementVersions??(le.reactiveElementVersions=[])).push("2.1.2");var Ue=globalThis,Gt=s=>s,st=Ue.trustedTypes,Xt=st?st.createPolicy("lit-html",{createHTML:s=>s}):void 0,ti="$lit$",ce=`lit$${Math.random().toFixed(9).slice(2)}$`,ii="?"+ce,Xi=`<${ii}>`,ge=document,qe=()=>ge.createComment(""),je=s=>s===null||typeof s!="object"&&typeof s!="function",$t=Array.isArray,Yi=s=>$t(s)||typeof s?.[Symbol.iterator]=="function",bt=`[ 	
\f\r]`,Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yt=/-->/g,Qt=/>/g,he=RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jt=/'/g,Zt=/"/g,ni=/^(?:script|style|textarea|title)$/i,kt=s=>(i,...e)=>({_$litType$:s,strings:i,values:e}),d=kt(1),ot=kt(2),Wn=kt(3),J=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ei=new WeakMap,ue=ge.createTreeWalker(ge,129);function ri(s,i){if(!$t(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xt!==void 0?Xt.createHTML(i):i}var Qi=(s,i)=>{let e=s.length-1,t=[],n,r=i===2?"<svg>":i===3?"<math>":"",o=Ne;for(let a=0;a<e;a++){let l=s[a],c,u,h=-1,f=0;for(;f<l.length&&(o.lastIndex=f,u=o.exec(l),u!==null);)f=o.lastIndex,o===Ne?u[1]==="!--"?o=Yt:u[1]!==void 0?o=Qt:u[2]!==void 0?(ni.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=he):u[3]!==void 0&&(o=he):o===he?u[0]===">"?(o=n??Ne,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?he:u[3]==='"'?Zt:Jt):o===Zt||o===Jt?o=he:o===Yt||o===Qt?o=Ne:(o=he,n=void 0);let g=o===he&&s[a+1].startsWith("/>")?" ":"";r+=o===Ne?l+Xi:h>=0?(t.push(c),l.slice(0,h)+ti+l.slice(h)+ce+g):l+ce+(h===-2?a:g)}return[ri(s,r+(s[e]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),t]},Ve=class s{constructor({strings:i,_$litType$:e},t){let n;this.parts=[];let r=0,o=0,a=i.length-1,l=this.parts,[c,u]=Qi(i,e);if(this.el=s.createElement(c,t),ue.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=ue.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(ti)){let f=u[o++],g=n.getAttribute(h).split(ce),S=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:S[2],strings:g,ctor:S[1]==="."?xt:S[1]==="?"?wt:S[1]==="@"?_t:Ee}),n.removeAttribute(h)}else h.startsWith(ce)&&(l.push({type:6,index:r}),n.removeAttribute(h));if(ni.test(n.tagName)){let h=n.textContent.split(ce),f=h.length-1;if(f>0){n.textContent=st?st.emptyScript:"";for(let g=0;g<f;g++)n.append(h[g],qe()),ue.nextNode(),l.push({type:2,index:++r});n.append(h[f],qe())}}}else if(n.nodeType===8)if(n.data===ii)l.push({type:2,index:r});else{let h=-1;for(;(h=n.data.indexOf(ce,h+1))!==-1;)l.push({type:7,index:r}),h+=ce.length-1}r++}}static createElement(i,e){let t=ge.createElement("template");return t.innerHTML=i,t}};function Se(s,i,e=s,t){if(i===J)return i;let n=t!==void 0?e._$Co?.[t]:e._$Cl,r=je(i)?void 0:i._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),r===void 0?n=void 0:(n=new r(s),n._$AT(s,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=n:e._$Cl=n),n!==void 0&&(i=Se(s,n._$AS(s,i.values),n,t)),i}var vt=class{constructor(i,e){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:e},parts:t}=this._$AD,n=(i?.creationScope??ge).importNode(e,!0);ue.currentNode=n;let r=ue.nextNode(),o=0,a=0,l=t[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new We(r,r.nextSibling,this,i):l.type===1?c=new l.ctor(r,l.name,l.strings,this,i):l.type===6&&(c=new yt(r,this,i)),this._$AV.push(c),l=t[++a]}o!==l?.index&&(r=ue.nextNode(),o++)}return ue.currentNode=ge,n}p(i){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(i,t,e),e+=t.strings.length-2):t._$AI(i[e])),e++}},We=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,e,t,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=e,this._$AM=t,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,e=this._$AM;return e!==void 0&&i?.nodeType===11&&(i=e.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,e=this){i=Se(this,i,e),je(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==J&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):Yi(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&je(this._$AH)?this._$AA.nextSibling.data=i:this.T(ge.createTextNode(i)),this._$AH=i}$(i){let{values:e,_$litType$:t}=i,n=typeof t=="number"?this._$AC(i):(t.el===void 0&&(t.el=Ve.createElement(ri(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===n)this._$AH.p(e);else{let r=new vt(n,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(i){let e=ei.get(i.strings);return e===void 0&&ei.set(i.strings,e=new Ve(i)),e}k(i){$t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,n=0;for(let r of i)n===e.length?e.push(t=new s(this.O(qe()),this.O(qe()),this,this.options)):t=e[n],t._$AI(r),n++;n<e.length&&(this._$AR(t&&t._$AB.nextSibling,n),e.length=n)}_$AR(i=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);i!==this._$AB;){let t=Gt(i).nextSibling;Gt(i).remove(),i=t}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},Ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,e,t,n,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=e,this._$AM=n,this.options=r,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(i,e=this,t,n){let r=this.strings,o=!1;if(r===void 0)i=Se(this,i,e,0),o=!je(i)||i!==this._$AH&&i!==J,o&&(this._$AH=i);else{let a=i,l,c;for(i=r[0],l=0;l<r.length-1;l++)c=Se(this,a[t+l],e,l),c===J&&(c=this._$AH[l]),o||(o=!je(c)||c!==this._$AH[l]),c===p?i=p:i!==p&&(i+=(c??"")+r[l+1]),this._$AH[l]=c}o&&!n&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},xt=class extends Ee{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},wt=class extends Ee{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},_t=class extends Ee{constructor(i,e,t,n,r){super(i,e,t,n,r),this.type=5}_$AI(i,e=this){if((i=Se(this,i,e,0)??p)===J)return;let t=this._$AH,n=i===p&&t!==p||i.capture!==t.capture||i.once!==t.once||i.passive!==t.passive,r=i!==p&&(t===p||n);n&&this.element.removeEventListener(this.name,this,t),r&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},yt=class{constructor(i,e,t){this.element=i,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(i){Se(this,i)}};var Ji=Ue.litHtmlPolyfillSupport;Ji?.(Ve,We),(Ue.litHtmlVersions??(Ue.litHtmlVersions=[])).push("3.3.3");var si=(s,i,e)=>{let t=e?.renderBefore??i,n=t._$litPart$;if(n===void 0){let r=e?.renderBefore??null;t._$litPart$=n=new We(i.insertBefore(qe(),r),r,void 0,e??{})}return n._$AI(s),n};var Ke=globalThis,N=class extends ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let i=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=i.firstChild),i}update(i){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=si(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return J}};N._$litElement$=!0,N.finalized=!0,Ke.litElementHydrateSupport?.({LitElement:N});var Zi=Ke.litElementPolyfillSupport;Zi?.({LitElement:N});(Ke.litElementVersions??(Ke.litElementVersions=[])).push("4.2.2");var en={attribute:!0,type:String,converter:Le,reflect:!1,hasChanged:rt},tn=(s=en,i,e)=>{let{kind:t,metadata:n}=e,r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),t==="setter"&&((s=Object.create(s)).wrapped=!0),r.set(e.name,s),t==="accessor"){let{name:o}=e;return{set(a){let l=i.get.call(this);i.set.call(this,a),this.requestUpdate(o,l,s,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,s,a),a}}}if(t==="setter"){let{name:o}=e;return function(a){let l=this[o];i.call(this,a),this.requestUpdate(o,l,s,!0,a)}}throw Error("Unsupported decorator location: "+t)};function y(s){return(i,e)=>typeof e=="object"?tn(s,i,e):((t,n,r)=>{let o=n.hasOwnProperty(r);return n.constructor.createProperty(r,t),o?Object.getOwnPropertyDescriptor(n,r):void 0})(s,i,e)}function _(s){return y({...s,state:!0,attribute:!1})}var nn={on:"\u30AA\u30F3",off:"\u30AA\u30D5",lit:"\u70B9\u706F",unlit:"\u6D88\u706F",last:"\u524D\u56DE",brightness:"\u660E\u308B\u3055",color_temp:"\u8272\u6E29\u5EA6",hue:"\u8272\u76F8",saturation:"\u5F69\u5EA6",favorites:"\u304A\u6C17\u306B\u5165\u308A",color:"\u30AB\u30E9\u30FC",unavailable:"\u5229\u7528\u4E0D\u53EF",target_temp:"\u8A2D\u5B9A\u6E29\u5EA6",target_range:"\u8A2D\u5B9A\u7BC4\u56F2",decrease_temp:"\u8A2D\u5B9A\u6E29\u5EA6\u30921\u5EA6\u4E0B\u3052\u308B",increase_temp:"\u8A2D\u5B9A\u6E29\u5EA6\u30921\u5EA6\u4E0A\u3052\u308B",room_temp:"\u5BA4\u6E29",humidity:"\u6E7F\u5EA6",heating:"\u6696\u623F\u4E2D",cooling:"\u51B7\u623F\u4E2D",drying:"\u9664\u6E7F\u4E2D",fan_running:"\u9001\u98A8\u4E2D",idle:"\u5F85\u6A5F\u4E2D",mode_auto:"\u81EA\u52D5",mode_heat_cool:"\u81EA\u52D5",mode_cool:"\u51B7\u623F",mode_heat:"\u6696\u623F",mode_dry:"\u9664\u6E7F",mode_fan_only:"\u9001\u98A8",mode_off:"\u30AA\u30D5",fan_mode:"\u98A8\u91CF",preset:"\u30D7\u30EA\u30BB\u30C3\u30C8",swing_mode:"\u30B9\u30A4\u30F3\u30B0",power:"\u6D88\u8CBB\u96FB\u529B",last_on:"\u6700\u7D42\u30AA\u30F3",updated_ago:"{t}\u306B\u66F4\u65B0",hours_24:"24\u6642\u9593",ago_24h:"24\u6642\u9593\u524D",ago_12h:"12\u6642\u9593\u524D",now:"\u73FE\u5728",since:"{t}\u304B\u3089",last_change:"\u6700\u7D42\u5909\u66F4 {t}",open:"\u958B",closed:"\u9589",is_open:"\u958B\u3044\u3066\u3044\u307E\u3059",is_closed:"\u9589\u3058\u3066\u3044\u307E\u3059",detected:"\u691C\u77E5",detecting:"\u691C\u77E5\u4E2D",clear:"\u30AF\u30EA\u30A2",locked:"\u65BD\u9320",unlocked:"\u89E3\u9320",is_locked:"\u65BD\u9320\u4E2D",is_unlocked:"\u89E3\u9320\u4E2D",locking:"\u65BD\u9320\u4E2D\u2026",unlocking:"\u89E3\u9320\u4E2D\u2026",jammed:"\u8981\u78BA\u8A8D",jammed_state:"\u8A70\u307E\u308A\u3092\u691C\u77E5 \xB7 \u30C9\u30A2\u3092\u78BA\u8A8D",slide_to_unlock:"\u30B9\u30E9\u30A4\u30C9\u3057\u3066\u89E3\u9320",slide_to_lock:"\u30B9\u30E9\u30A4\u30C9\u3057\u3066\u65BD\u9320",cannot_operate:"\u64CD\u4F5C\u3067\u304D\u307E\u305B\u3093",position:"\u958B\u5EA6",stopped:"\u505C\u6B62\u4E2D",opening:"\u958B\u653E\u4E2D",closing:"\u9589\u9396\u4E2D",moving:"\u52D5\u4F5C\u4E2D",tilt:"\u30B9\u30E9\u30C3\u30C8\u306E\u50BE\u304D",not_playing:"\u518D\u751F\u3057\u3066\u3044\u307E\u305B\u3093",standby:"\u5F85\u6A5F\u4E2D",paused:"\u4E00\u6642\u505C\u6B62\u4E2D",playing:"\u518D\u751F\u4E2D",just_now:"\u305F\u3063\u305F\u4ECA",minutes_ago:"{n}\u5206\u524D",hours_ago:"{n}\u6642\u9593\u524D",days_ago:"{n}\u65E5\u524D",seconds_ago:"{n}\u79D2\u524D",auto_locked_at:"{t} \u306B\u81EA\u52D5\u65BD\u9320",manual:"\u624B\u52D5",slider_off:"\u505C\u6B62\u4E2D",slider_levels:"{n}\u6BB5\u968E\u4E2D {i}",slider_step:"{s} \u523B\u307F",wx_now:"\u4ECA",btn_scene:"\u30B7\u30FC\u30F3",btn_script:"\u30B9\u30AF\u30EA\u30D7\u30C8",btn_automation:"\u30AA\u30FC\u30C8\u30E1\u30FC\u30B7\u30E7\u30F3",btn_button:"\u30DC\u30BF\u30F3",btn_done:"\u5B9F\u884C\u3057\u307E\u3057\u305F",scene_count:"{n}\u4EF6",cam_live:"\u30E9\u30A4\u30D6",cam_still:"\u9759\u6B62\u753B",cam_mic:"\u30DE\u30A4\u30AF",cam_expand:"\u62E1\u5927",cam_snapshot:"\u30B9\u30CA\u30C3\u30D7\u30B7\u30E7\u30C3\u30C8",cam_history:"\u5C65\u6B74",cam_motion:"\u52D5\u4F53\u691C\u77E5",cam_no_motion:"\u691C\u77E5\u306A\u3057",cam_no_signal:"\u6620\u50CF\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093",cam_offline:"\u30AA\u30D5\u30E9\u30A4\u30F3",cam_offline_state:"\u63A5\u7D9A\u3067\u304D\u307E\u305B\u3093",wx_today:"\u4ECA\u65E5",wx_tomorrow:"\u660E\u65E5",wx_high:"\u6700\u9AD8",wx_low:"\u6700\u4F4E",wx_wind:"\u98A8\u901F",wx_precip:"\u964D\u6C34","wx_clear-night":"\u6674\u308C",wx_cloudy:"\u304F\u3082\u308A",wx_exceptional:"\u6CE8\u610F",wx_fog:"\u9727",wx_hail:"\u3072\u3087\u3046",wx_lightning:"\u96F7","wx_lightning-rainy":"\u96F7\u96E8",wx_partlycloudy:"\u6674\u308C\u6642\u3005\u304F\u3082\u308A",wx_pouring:"\u5927\u96E8",wx_rainy:"\u96E8",wx_snowy:"\u96EA","wx_snowy-rainy":"\u307F\u305E\u308C",wx_sunny:"\u6674\u308C",wx_windy:"\u98A8\u304C\u5F37\u3044","wx_windy-variant":"\u98A8\u304C\u5F37\u3044",grp_title:"\u30B0\u30EB\u30FC\u30D7",grp_devices:"{n}\u53F0",grp_running:"{n}\u53F0\u304C\u7A3C\u50CD\u4E2D",grp_all_idle:"\u3059\u3079\u3066\u505C\u6B62\u4E2D",grp_tap_expand:"\u30BF\u30C3\u30D7\u3067\u5C55\u958B",grp_empty:"\u30AB\u30FC\u30C9\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093",ed_entity:"\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3",ed_name:"\u8868\u793A\u540D",ed_icon:"\u30A2\u30A4\u30B3\u30F3",ed_advanced:"\u8A73\u7D30\u8A2D\u5B9A",ed_theme:"\u914D\u8272",ed_theme_auto:"\u81EA\u52D5",ed_theme_light:"\u30E9\u30A4\u30C8",ed_theme_dark:"\u30C0\u30FC\u30AF",ed_refraction:"\u5C48\u6298\u52B9\u679C",ed_refraction_auto:"\u81EA\u52D5",ed_refraction_on:"\u5E38\u306B\u6709\u52B9",ed_refraction_off:"\u7121\u52B9",ed_language:"\u8A00\u8A9E",ed_show_brightness:"\u660E\u308B\u3055",ed_show_color_temp:"\u8272\u6E29\u5EA6",ed_show_color:"\u30AB\u30E9\u30FC",ed_presets:"\u30D7\u30EA\u30BB\u30C3\u30C8",ed_favorites:"\u304A\u6C17\u306B\u5165\u308A\u306E\u8272",ed_show_fan_mode:"\u98A8\u91CF",ed_show_preset_mode:"\u30D7\u30EA\u30BB\u30C3\u30C8",ed_show_swing_mode:"\u30B9\u30A4\u30F3\u30B0",ed_design:"\u30AB\u30FC\u30C9\u30C7\u30B6\u30A4\u30F3",ed_design_classic:"\u30C0\u30A4\u30E4\u30EB\uFF08\u65E2\u5B58\uFF09",ed_design_compact:"\u30B3\u30F3\u30D1\u30AF\u30C8\u30B9\u30E9\u30A4\u30C0\u30FC",ed_hvac_modes:"\u8868\u793A\u3059\u308B\u904B\u8EE2\u30E2\u30FC\u30C9",ed_power_entity:"\u6D88\u8CBB\u96FB\u529B\u30BB\u30F3\u30B5\u30FC",ed_graph:"\u30B0\u30E9\u30D5\u3092\u8868\u793A",ed_value_in_caption:"\u5024\u3092\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306B\u8868\u793A",ed_trend:"\u30C8\u30EC\u30F3\u30C9\u30D0\u30C3\u30B8\u3092\u8868\u793A",ed_hours_to_show:"\u8868\u793A\u3059\u308B\u6642\u9593",ed_decimals:"\u5C0F\u6570\u70B9\u4EE5\u4E0B\u306E\u6841\u6570",ed_accent:"\u30A2\u30AF\u30BB\u30F3\u30C8\u30AB\u30E9\u30FC",ed_secondary_entity:"\u30B5\u30D6\u8868\u793A\u306E\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3",ed_secondary_label:"\u30B5\u30D6\u8868\u793A\u306E\u30E9\u30D9\u30EB",ed_icon_on:"\u30AA\u30F3\u6642\u306E\u30A2\u30A4\u30B3\u30F3",ed_icon_off:"\u30AA\u30D5\u6642\u306E\u30A2\u30A4\u30B3\u30F3",ed_label_on:"\u30AA\u30F3\u6642\u306E\u30E9\u30D9\u30EB",ed_label_off:"\u30AA\u30D5\u6642\u306E\u30E9\u30D9\u30EB",ed_buttons:"\u30A2\u30AF\u30B7\u30E7\u30F3\u30DC\u30BF\u30F3",ed_style:"\u8868\u793A\u30B9\u30BF\u30A4\u30EB",ed_style_blind:"\u30D6\u30E9\u30A4\u30F3\u30C9",ed_style_curtain:"\u30AB\u30FC\u30C6\u30F3",ed_curtain:"\u30AB\u30FC\u30C6\u30F3\u306E\u7A2E\u985E",ed_curtain_double:"\u4E21\u958B\u304D",ed_curtain_single:"\u7247\u958B\u304D",ed_show_tilt:"\u30B9\u30E9\u30C3\u30C8\u306E\u50BE\u304D",ed_show_volume:"\u97F3\u91CF",ed_show_device:"\u30C7\u30D0\u30A4\u30B9\u540D",ed_source_color:"\u518D\u751F\u5143\u306E\u8272",ed_help_color:"#RRGGBB \u5F62\u5F0F\u306E\u8272\u30B3\u30FC\u30C9",ed_help_presets:"name \u3068\u3001brightness / color_temp_kelvin / rgb_color / scene \u306A\u3069\u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_help_buttons:"name \u3068 service\uFF08domain.service \u5F62\u5F0F\uFF09\u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_help_favorites:"\u7A7A\u306B\u3059\u308B\u3068\u8272\u898B\u672C\u3092\u975E\u8868\u793A\u306B\u3057\u307E\u3059",ed_help_style:"\u7701\u7565\u6642\u306F device_class \u304B\u3089\u5224\u5B9A\u3057\u307E\u3059",ed_help_hvac_modes:"\u7701\u7565\u6642\u306F\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u304C\u5BFE\u5FDC\u3059\u308B\u30E2\u30FC\u30C9\u3092\u3059\u3079\u3066\u8868\u793A\u3057\u307E\u3059",ed_min:"\u6700\u5C0F\u5024",ed_max:"\u6700\u5927\u5024",ed_step:"\u523B\u307F\u5E45",ed_unit:"\u5358\u4F4D",ed_ticks:"\u76EE\u76DB\u308A\u3092\u8868\u793A",ed_show_range:"\u6700\u5C0F\u5024\u3068\u6700\u5927\u5024\u3092\u8868\u793A",ed_scenes:"\u30B7\u30FC\u30F3\u4E00\u89A7",ed_style_tiles:"\u30BF\u30A4\u30EB",ed_style_chips:"\u30C1\u30C3\u30D7",ed_columns:"\u5217\u6570",ed_title:"\u898B\u51FA\u3057",ed_show_count:"\u4EF6\u6570\u3092\u8868\u793A",ed_service_data:"\u30B5\u30FC\u30D3\u30B9\u306E\u30C7\u30FC\u30BF",ed_motion_entity:"\u52D5\u4F53\u30BB\u30F3\u30B5\u30FC",ed_show_actions:"\u4E0B\u90E8\u306E\u64CD\u4F5C\u5217",ed_show_mic:"\u30DE\u30A4\u30AF\u30DC\u30BF\u30F3",ed_mic_service:"\u30DE\u30A4\u30AF\u306E\u30B5\u30FC\u30D3\u30B9",ed_snapshot_service:"\u30B9\u30CA\u30C3\u30D7\u30B7\u30E7\u30C3\u30C8\u306E\u30B5\u30FC\u30D3\u30B9",ed_refresh_interval:"\u66F4\u65B0\u9593\u9694\uFF08\u79D2\uFF09",ed_aspect_ratio:"\u7E26\u6A2A\u6BD4",ed_help_scenes:"entity \u3068\u3001name / icon / accent / service \u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_help_snapshot_service:"\u7701\u7565\u6642\u306F\u9759\u6B62\u753B\u3092\u65B0\u3057\u3044\u30BF\u30D6\u3067\u958B\u304D\u307E\u3059",ed_help_motion_entity:"\u6307\u5B9A\u3059\u308B\u3068\u52D5\u4F53\u691C\u77E5\u306E\u30C1\u30C3\u30D7\u3092\u8868\u793A\u3057\u307E\u3059",ed_cards:"\u30AB\u30FC\u30C9\u4E00\u89A7",ed_collapsible:"\u6298\u308A\u305F\u305F\u307F\u53EF\u80FD",ed_collapsed:"\u521D\u671F\u72B6\u614B\u306F\u6298\u308A\u305F\u305F\u307F",ed_summary:"\u6298\u308A\u305F\u305F\u307F\u6642\u306B\u72B6\u614B\u30C1\u30C3\u30D7\u3092\u8868\u793A",ed_help_cards:"type \u3068\u5404\u30AB\u30FC\u30C9\u306E\u8A2D\u5B9A\u3092\u6301\u3064\u30EA\u30B9\u30C8",ed_layout:"\u30EC\u30A4\u30A2\u30A6\u30C8",ed_layout_full:"\u901A\u5E38",ed_layout_row:"1\u884C",ed_help_layout:"1\u884C\u306B\u3059\u308B\u3068\u30B9\u30A4\u30C3\u30C1\u30AB\u30FC\u30C9\u3068\u540C\u3058\u9AD8\u3055\u306B\u306A\u308A\u3001\u4E88\u5831\u306F\u7701\u304B\u308C\u307E\u3059",ed_show_hourly:"\u6642\u9593\u3054\u3068\u306E\u4E88\u5831",ed_hourly_count:"\u8868\u793A\u3059\u308B\u6642\u9593\u6570",ed_show_daily:"\u65E5\u3054\u3068\u306E\u4E88\u5831",ed_daily_count:"\u8868\u793A\u3059\u308B\u65E5\u6570",ed_show_metrics:"\u6E7F\u5EA6\u30FB\u98A8\u901F\u30FB\u964D\u6C34",ed_subtitle:"\u8AAC\u660E\u6587",ed_custom_entity:"\u30A8\u30F3\u30C6\u30A3\u30C6\u30A3\u306E\u8AAD\u307F\u66F8\u304D",ed_attribute:"\u5024\u3092\u8AAD\u3080\u5C5E\u6027",ed_service:"\u547C\u3073\u51FA\u3059\u30B5\u30FC\u30D3\u30B9",ed_service_key:"\u5024\u3092\u6E21\u3059\u30AD\u30FC",ed_help_value_in_caption:"\u5927\u304D\u306A\u6570\u5024\u3092\u3084\u3081\u3066\u8AAC\u660E\u6587\u306B\u5165\u308C\u307E\u3059\u3002\u30B9\u30A4\u30C3\u30C1\u30AB\u30FC\u30C9\u3068\u540C\u3058\u9AD8\u3055\u306B\u306A\u308A\u307E\u3059",ed_help_ticks:"\u6BB5\u968E\u304C2\u301C12\u306E\u3068\u304D\u306B\u76EE\u76DB\u308A\u3092\u5F15\u304D\u307E\u3059",ed_help_show_range:"\u5916\u3059\u3068\u30AB\u30FC\u30C9\u304C1\u884C\u5206\u4F4E\u304F\u306A\u308A\u307E\u3059",ed_help_attribute:"\u7701\u7565\u6642\u306F\u30C9\u30E1\u30A4\u30F3\u3054\u3068\u306E\u65E2\u5B9A\u306E\u4F4D\u7F6E\u304B\u3089\u8AAD\u307F\u307E\u3059",ed_help_service:"domain.service \u5F62\u5F0F\u3002\u7701\u7565\u6642\u306F\u30C9\u30E1\u30A4\u30F3\u3054\u3068\u306E\u65E2\u5B9A\u3092\u4F7F\u3044\u307E\u3059",ed_help_service_key:"\u7701\u7565\u6642\u306F value",ed_help_subtitle:"\u7701\u7565\u6642\u306F\u72B6\u614B\u306B\u5FDC\u3058\u305F\u8AAC\u660E\u3092\u81EA\u52D5\u8868\u793A\u3057\u307E\u3059"},Ct={on:"On",off:"Off",lit:"On",unlit:"Off",last:"last",brightness:"Brightness",color_temp:"Color temperature",hue:"Hue",saturation:"Saturation",favorites:"Favorites",color:"Color",unavailable:"Unavailable",target_temp:"Target",target_range:"Target range",decrease_temp:"Decrease target by 1 degree",increase_temp:"Increase target by 1 degree",room_temp:"Room",humidity:"Humidity",heating:"Heating",cooling:"Cooling",drying:"Drying",fan_running:"Fan",idle:"Idle",mode_auto:"Auto",mode_heat_cool:"Auto",mode_cool:"Cool",mode_heat:"Heat",mode_dry:"Dry",mode_fan_only:"Fan",mode_off:"Off",fan_mode:"Fan",preset:"Preset",swing_mode:"Swing",power:"Power",last_on:"last on",updated_ago:"Updated {t}",hours_24:"24 h",ago_24h:"24 h ago",ago_12h:"12 h ago",now:"Now",since:"since {t}",last_change:"changed {t}",open:"Open",closed:"Closed",is_open:"Open",is_closed:"Closed",detected:"Detected",detecting:"Detected",clear:"Clear",locked:"Locked",unlocked:"Unlocked",is_locked:"Locked",is_unlocked:"Unlocked",locking:"Locking\u2026",unlocking:"Unlocking\u2026",jammed:"Jammed",jammed_state:"Jam detected \xB7 check the door",slide_to_unlock:"Slide to unlock",slide_to_lock:"Slide to lock",cannot_operate:"Unavailable",position:"Position",stopped:"Stopped",opening:"Opening",closing:"Closing",moving:"Moving",tilt:"Slat tilt",not_playing:"Nothing playing",standby:"Idle",paused:"Paused",playing:"Playing",just_now:"just now",minutes_ago:"{n} min ago",hours_ago:"{n} h ago",days_ago:"{n} d ago",seconds_ago:"{n} s ago",auto_locked_at:"auto-locked at {t}",manual:"manually",slider_off:"Off",slider_levels:"Step {i} of {n}",slider_step:"{s} steps",wx_now:"Now",btn_scene:"Scene",btn_script:"Script",btn_automation:"Automation",btn_button:"Button",btn_done:"Activated",scene_count:"{n}",cam_live:"Live",cam_still:"Still",cam_mic:"Microphone",cam_expand:"Expand",cam_snapshot:"Snapshot",cam_history:"History",cam_motion:"Motion",cam_no_motion:"No motion",cam_no_signal:"No video",cam_offline:"Offline",cam_offline_state:"Cannot connect",wx_today:"Today",wx_tomorrow:"Tomorrow",wx_high:"High",wx_low:"Low",wx_wind:"Wind",wx_precip:"Precipitation","wx_clear-night":"Clear",wx_cloudy:"Cloudy",wx_exceptional:"Exceptional",wx_fog:"Fog",wx_hail:"Hail",wx_lightning:"Lightning","wx_lightning-rainy":"Thunderstorms",wx_partlycloudy:"Partly cloudy",wx_pouring:"Pouring",wx_rainy:"Rain",wx_snowy:"Snow","wx_snowy-rainy":"Sleet",wx_sunny:"Sunny",wx_windy:"Windy","wx_windy-variant":"Windy",grp_title:"Group",grp_devices:"{n} devices",grp_running:"{n} active",grp_all_idle:"all idle",grp_tap_expand:"tap to expand",grp_empty:"No cards yet",ed_entity:"Entity",ed_name:"Name",ed_icon:"Icon",ed_advanced:"Advanced",ed_theme:"Appearance",ed_theme_auto:"Follow Home Assistant",ed_theme_light:"Light",ed_theme_dark:"Dark",ed_refraction:"Refraction",ed_refraction_auto:"Automatic",ed_refraction_on:"Always on",ed_refraction_off:"Off",ed_language:"Language",ed_show_brightness:"Brightness",ed_show_color_temp:"Color temperature",ed_show_color:"Color",ed_presets:"Presets",ed_favorites:"Favorite colors",ed_show_fan_mode:"Fan mode",ed_show_preset_mode:"Preset",ed_show_swing_mode:"Swing",ed_design:"Card design",ed_design_classic:"Dial (existing)",ed_design_compact:"Compact slider",ed_hvac_modes:"Modes to show",ed_power_entity:"Power sensor",ed_graph:"Show graph",ed_value_in_caption:"Reading in the caption",ed_trend:"Show trend badge",ed_hours_to_show:"Hours to show",ed_decimals:"Decimal places",ed_accent:"Accent color",ed_secondary_entity:"Secondary entity",ed_secondary_label:"Secondary label",ed_icon_on:"Icon when on",ed_icon_off:"Icon when off",ed_label_on:"Label when on",ed_label_off:"Label when off",ed_buttons:"Action buttons",ed_style:"Style",ed_style_blind:"Blind",ed_style_curtain:"Curtain",ed_curtain:"Curtain type",ed_curtain_double:"Double",ed_curtain_single:"Single",ed_show_tilt:"Slat tilt",ed_show_volume:"Volume",ed_show_device:"Device name",ed_source_color:"Source color",ed_help_color:"Color code in #RRGGBB form",ed_help_presets:"List of entries with name plus brightness / color_temp_kelvin / rgb_color / scene",ed_help_buttons:"List of entries with name and service (domain.service)",ed_help_favorites:"Leave empty to hide the swatches",ed_help_style:"Derived from device_class when left empty",ed_help_hvac_modes:"Shows every mode the entity supports when left empty",ed_min:"Minimum",ed_max:"Maximum",ed_step:"Step",ed_unit:"Unit",ed_ticks:"Show tick marks",ed_show_range:"Show min and max",ed_scenes:"Scenes",ed_style_tiles:"Tiles",ed_style_chips:"Chips",ed_columns:"Columns",ed_title:"Heading",ed_show_count:"Show the count",ed_service_data:"Service data",ed_motion_entity:"Motion sensor",ed_show_actions:"Action row",ed_show_mic:"Microphone button",ed_mic_service:"Microphone service",ed_snapshot_service:"Snapshot service",ed_refresh_interval:"Refresh interval (s)",ed_aspect_ratio:"Aspect ratio",ed_help_scenes:"List of entries with entity plus name / icon / accent / service",ed_help_snapshot_service:"Opens the still in a new tab when left empty",ed_help_motion_entity:"Adds the motion chip when set",ed_cards:"Cards",ed_collapsible:"Collapsible",ed_collapsed:"Start collapsed",ed_summary:"Status chips when collapsed",ed_help_cards:"A list of card configs, each with its own type",ed_layout:"Layout",ed_layout_full:"Full",ed_layout_row:"Single row",ed_help_layout:"A single row matches a switch card's height and drops the forecast",ed_show_hourly:"Hourly forecast",ed_hourly_count:"Hours to show",ed_show_daily:"Daily forecast",ed_daily_count:"Days to show",ed_show_metrics:"Humidity, wind, precipitation",ed_subtitle:"Subtitle",ed_custom_entity:"Reading and writing",ed_attribute:"Value attribute",ed_service:"Service to call",ed_service_key:"Value key",ed_help_value_in_caption:"Drops the large number into the caption line, matching a switch card's height",ed_help_ticks:"Drawn when the control has between 2 and 12 steps",ed_help_show_range:"Turning this off makes the card one row shorter",ed_help_attribute:"Reads the domain's usual place when left empty",ed_help_service:"domain.service; the domain default is used when left empty",ed_help_service_key:"Defaults to value",ed_help_subtitle:"Describes the current state when left empty"},rn={ja:nn,en:Ct};function Ge(s){let i=(s??"en").toLowerCase().split("-")[0],e=rn[i]??Ct;return(t,n)=>{let r=e[t]??Ct[t]??t;if(n)for(let[o,a]of Object.entries(n))r=r.replace(`{${o}}`,String(a));return r}}function j(s,i){if(!s)return"";let e=Math.max(0,Date.now()-new Date(s).getTime()),t=Math.round(e/1e3);if(t<30)return i("just_now");if(t<90)return i("seconds_ago",{n:t});let n=Math.round(t/60);if(n<60)return i("minutes_ago",{n});let r=Math.round(n/60);return r<48?i("hours_ago",{n:r}):i("days_ago",{n:Math.round(r/24)})}function Ae(s){if(!s)return"";let i=new Date(s);return`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`}var $=(s,i,e)=>Math.min(e,Math.max(i,s));function St(s,i,e={}){s.dispatchEvent(new CustomEvent(i,{detail:e,bubbles:!0,composed:!0}))}function oi(s,i){i&&St(s,"hass-more-info",{entityId:i})}function lt(s,i){return s?.attributes.friendly_name??i}function k(s,i,e){let t=s?.locale?.language??s?.language??"en";try{return new Intl.NumberFormat(t,{maximumFractionDigits:e??(Number.isInteger(i)?0:1),minimumFractionDigits:e??0}).format(i)}catch{return String(i)}}function A(s){return!s||s.state==="unavailable"||s.state==="unknown"}function Z(s,i){return!!((s?.attributes.supported_features??0)&i)}function D(s,i,e,t,n){let r=[e,t,Object.keys(i?.states??{})],o=l=>s.includes(l.split(".")[0]),a=l=>{let c=i?.states[l];return!c||c.state!=="unavailable"&&c.state!=="unknown"};if(n)for(let l of r){let c=l?.find(u=>{let h=i?.states[u];return o(u)&&a(u)&&h!==void 0&&n(h)});if(c)return c}for(let l of r){let c=l?.find(u=>o(u)&&a(u));if(c)return c}return`${s[0]}.example`}function re(s,i){let e=i/100,t=(s%360+360)%360/60,n=e*(1-Math.abs(t%2-1)),r;t<1?r=[e,n,0]:t<2?r=[n,e,0]:t<3?r=[0,e,n]:t<4?r=[0,n,e]:t<5?r=[n,0,e]:r=[e,0,n];let o=1-e;return[Math.round((r[0]+o)*255),Math.round((r[1]+o)*255),Math.round((r[2]+o)*255)]}function X(s){return`#${s.slice(0,3).map(i=>Math.round($(i,0,255)).toString(16).padStart(2,"0")).join("")}`}function Et(s){let i=/^#?([0-9a-f]{6})$/i.exec(s.trim());if(!i)return;let e=parseInt(i[1],16);return[e>>16&255,e>>8&255,e&255]}function se(s,i=.45){let e=Et(s);return e?X(e.map(t=>t+(255-t)*i)):s}function ai(s,i=.3){let e=Et(s);return e?X(e.map(t=>t*(1-i))):s}function H(s,i){let e=Et(s);return e?`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${i})`:s}var ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},dt=s=>(...i)=>({_$litDirective$:s,values:i}),Me=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,e,t){this._$Ct=i,this._$AM=e,this._$Ci=t}_$AS(i,e){return this.update(i,e)}update(i,e){return this.render(...e)}};var v=dt(class extends Me{constructor(s){if(super(s),s.type!==ct.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(i=>s[i]).join(" ")+" "}update(s,[i]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(let t in i)i[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(i)}let e=s.element.classList;for(let t of this.st)t in i||(e.remove(t),this.st.delete(t));for(let t in i){let n=!!i[t];n===this.st.has(t)||this.nt?.has(t)||(n?(e.add(t),this.st.add(t)):(e.remove(t),this.st.delete(t)))}return J}});var li="important",sn=" !"+li,x=dt(class extends Me{constructor(s){if(super(s),s.type!==ct.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((i,e)=>{let t=s[e];return t==null?i:i+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[i]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let t of this.ft)i[t]==null&&(this.ft.delete(t),t.includes("-")?e.removeProperty(t):e[t]=null);for(let t in i){let n=i[t];if(n!=null){this.ft.add(t);let r=typeof n=="string"&&n.endsWith(sn);t.includes("-")||r?e.setProperty(t,r?n.slice(0,-11):n,r?li:""):e[t]=n}}return J}});var pt=(s,i,e)=>Math.min(e,Math.max(i,s)),on=(s,i,e)=>{let t=pt((e-s)/(i-s),0,1);return t*t*(3-2*t)};function ci(s){let i=1-s;return Math.pow(1-i*i*i*i,.25)}function di(s){return(ci(pt(s+.001,0,1))-ci(pt(s-.001,0,1)))*(.5/.001)}function an(s,i,e){let t=pt(s/e,-.9999,.9999);return t/Math.sqrt(1-t*t)-i}function ht(s,i,e,t=0){let n=di(s),r=n/Math.sqrt(1+n*n),o=1+e*.045+t;return-an(r,n,o)*i}var pi=s=>{let i=Math.hypot(...s)||1;return s.map(e=>e/i)};function ln(s){let i=s*Math.PI/180;return pi([Math.cos(i),Math.sin(i),.85])}function hi(s,i,e,t,n){let r=di(s),o=ln(t),a=e[0]*o[0]+e[1]*o[1],l=Math.max(a,0),c=Math.max(-a,0),u=pi([-r*e[0],-r*e[1],1]),h=-(o[0]*u[0]+o[1]*u[1]+o[2]*u[2]),f=-o[2]-2*h*u[2],g=Math.pow(Math.max(f,0),26)*l,S=Math.pow(Math.max(f,0),48)*c*.3,E=(1-on(0,2,i))*(.22+.78*l),z=Math.pow(1-u[2],3)*(.15+.85*l),b=((g+S)*1.5+z*.3+E*.28)*n,F=c*(1-u[2])*.14;return b-F}var V={edge:28,refraction:22,chroma:.35,blur:7,highlight:.85,lightAngle:120,saturation:1.35},At={top:[0,1],bottom:[0,-1],left:[-1,0],right:[1,0]};var cn=[0,.01,.02,.04,.07,.1,.15,.22,.3,.4,.55,.7,.85,1],Tt=40;function dn(s){let i=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none">${s}</svg>`;return`data:image/svg+xml;utf8,${encodeURIComponent(i)}`}function pn(s,i){let e=s==="x",t=i.toFixed(4),n=(1-i).toFixed(4);return{gradA:e?'x1="0" y1="0" x2="1" y2="0"':'x1="0" y1="0" x2="0" y2="1"',gradB:e?'x1="1" y1="0" x2="0" y2="0"':'x1="0" y1="1" x2="0" y2="0"',rectA:e?`x="0" y="0" width="${t}" height="1"`:`x="0" y="0" width="1" height="${t}"`,rectB:e?`x="${n}" y="0" width="${t}" height="1"`:`x="0" y="${n}" width="1" height="${t}"`}}function ui(s,i,e,t){let{gradA:n,gradB:r,rectA:o,rectB:a}=pn(s,i),l=u=>s==="x"?`rgb(${u},128,128)`:`rgb(128,${u},128)`,c=u=>cn.map(h=>{let f=Math.min(ht(h,e,t),Tt)/Tt;return`<stop offset="${h}" stop-color="${l(Math.round(128+u*127*f))}"/>`}).join("");return dn(`<defs><linearGradient id="a" ${n}>${c(1)}</linearGradient><linearGradient id="b" ${r}>${c(-1)}</linearGradient></defs><rect width="1" height="1" fill="rgb(128,128,128)"/><rect ${o} fill="url(#a)"/><rect ${a} fill="url(#b)"/>`)}var Ft=[{id:"lg-card",band:.09,edge:V.edge,refraction:V.refraction,blur:5,saturation:V.saturation,chroma:V.chroma},{id:"lg-knob",band:.4,edge:14,refraction:16,blur:2.2,saturation:V.saturation,chroma:V.chroma},{id:"lg-slider-knob",band:.4,edge:20,refraction:10,blur:12,saturation:V.saturation,chroma:V.chroma}],Mt={r:"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",g:"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",b:"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"};function gi(s,i){let t=ht(.15,s.edge,s.refraction),n=ht(.15,s.edge,s.refraction,i*s.chroma*.12);return t>0?n/t:1}function Rt(s){let i=ui("x",s.band,s.edge,s.refraction),e=ui("y",s.band,s.edge,s.refraction),t=Tt*2;return ot`
    <filter id=${s.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      <!-- No x/y/width/height: those are user-space units, and pinning them to 1 makes
           Chromium clip the whole result to a one-unit box. Left out, each image stretches
           to the filter region, which is the element. -->
      <feImage href=${i} preserveAspectRatio="none" result="mx" />
      <feImage href=${e} preserveAspectRatio="none" result="my" />
      <feComposite in="mx" in2="my" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.5" result="map" />

      <feGaussianBlur in="SourceGraphic" stdDeviation=${s.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(s.saturation)} result="sat" />

      <feDisplacementMap in="sat" in2="map" scale=${t*gi(s,-1)} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="sat" in2="map" scale=${t} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="sat" in2="map" scale=${t*gi(s,1)} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values=${Mt.r} result="cr" />
      <feColorMatrix in="dg" type="matrix" values=${Mt.g} result="cg" />
      <feColorMatrix in="db" type="matrix" values=${Mt.b} result="cb" />
      <feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="crg" />
      <feComposite in="crg" in2="cb" operator="arithmetic" k2="1" k3="1" />
    </filter>`}var mi=d`<svg class="lg-defs" aria-hidden="true" focusable="false">
  <defs>${Ft.map(Rt)}</defs>
</svg>`,Yr=d`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Rt(Ft[1])}</defs>
</svg>`,Qr=d`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${Rt(Ft[2])}</defs>
</svg>`,ut;function fi(){if(ut!==void 0)return ut;let s=navigator.userAgent,i=/Chrome\/|Chromium\/|CriOS\//.test(s)||!!navigator.userAgentData,e=/Safari\//.test(s)&&!/Chrome\/|Chromium\/|CriOS\//.test(s),t=/Firefox\//.test(s),n=/\bwv\b|Home[ /]?Assistant/i.test(s);return ut=i&&!e&&!t&&!n&&CSS.supports("backdrop-filter","blur(1px)"),ut}var Dt;function bi(){return Dt||(Dt=(async()=>{let s=window.loadCardHelpers;if(s)try{await(await s()).createCardElement?.({type:"entities",entities:[]})?.constructor?.getConfigElement?.()}catch{}})()),Dt}var hn=[["--well-from","#ffd36b"],["--well-to","#ff8a1f"],["--well-glow","rgba(255, 165, 48, 0.24)"],["--lg-ring-0","#ffb36b"],["--lg-ring-1","#ff6a3d"],["--lg-ring-2","#ff2d55"]];function vi(){let s=typeof CSS<"u"?CSS:void 0;if(s?.registerProperty)for(let[i,e]of hn)try{s.registerProperty({name:i,syntax:"<color>",inherits:!0,initialValue:e})}catch{}}var Xe=class extends N{constructor(){super(...arguments);this.icon=""}render(){return d`<ha-icon .icon=${this.icon}></ha-icon>`}};Xe.styles=w`
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
  `,m([y()],Xe.prototype,"icon",2);customElements.get("lg-icon")||customElements.define("lg-icon",Xe);var un=`
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`,gn=`
precision highp float;
uniform vec2 u_resolution;
uniform float u_shape;
uniform float u_radius;
uniform float u_edge;
uniform float u_refraction;
uniform float u_chroma;
uniform float u_blur;
uniform float u_highQualityBlur;
uniform float u_highlight;
uniform float u_lightAngle;
uniform float u_saturation;
uniform float u_tintAlpha;
uniform vec3 u_tint;
uniform vec3 u_colors[4];
uniform vec4 u_stops;
const int BLUR_TAPS = 8;
const int HIGH_QUALITY_BLUR_TAPS = 49;

float surfaceHeight(float t) {
  float s = 1.0 - t;
  float s4 = s * s * s * s;
  return pow(max(1.0 - s4, 0.0), 0.25);
}
float refractDisp(float sinI, float slope, float n) {
  float sinR = clamp(sinI / n, -0.9999, 0.9999);
  return sinR * inversesqrt(1.0 - sinR * sinR) - slope;
}
float roundedBox(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  float outside = length(max(q, 0.0));
  float inside = min(max(q.x, q.y), 0.0);
  return -(outside + inside - radius);
}
float shapeDistance(vec2 coord) {
  vec2 halfSize = u_resolution * 0.5;
  vec2 p = coord - halfSize;
  if (u_shape < 0.5) return min(halfSize.x, halfSize.y) - length(p);
  float radius = u_shape < 1.5 ? halfSize.y : min(u_radius, halfSize.y);
  return roundedBox(p, halfSize - vec2(0.75), max(radius - 0.75, 1.0));
}
vec3 backdropAt(vec2 coord) {
  float x = clamp(coord.x / u_resolution.x, 0.0, 1.0);
  if (x <= u_stops.y) return mix(u_colors[0], u_colors[1], smoothstep(u_stops.x, u_stops.y, x));
  if (x <= u_stops.z) return mix(u_colors[1], u_colors[2], smoothstep(u_stops.y, u_stops.z, x));
  return mix(u_colors[2], u_colors[3], smoothstep(u_stops.z, u_stops.w, x));
}
vec3 sampleBg(vec2 coord) {
  if (u_blur <= 0.0) return backdropAt(coord);
  if (u_highQualityBlur > 0.5) {
    vec3 sum = vec3(0.0);
    float weightSum = 0.0;
    for (int i = 0; i < HIGH_QUALITY_BLUR_TAPS; i++) {
      float x = (float(i) / float(HIGH_QUALITY_BLUR_TAPS - 1) * 4.0 - 2.0) * u_blur;
      float weight = exp(-0.5 * x * x / max(u_blur * u_blur, 0.0001));
      sum += backdropAt(coord + vec2(x, 0.0)) * weight;
      weightSum += weight;
    }
    return sum / weightSum;
  }
  vec3 sum = backdropAt(coord);
  for (int i = 0; i < BLUR_TAPS; i++) {
    float fi = float(i) + 0.5;
    float a = fi * 2.39996323;
    float r = sqrt(fi / float(BLUR_TAPS)) * u_blur;
    sum += backdropAt(coord + vec2(cos(a), sin(a)) * r);
  }
  return sum / (float(BLUR_TAPS) + 1.0);
}
void main() {
  vec2 coord = gl_FragCoord.xy;
  float sd = shapeDistance(coord);
  float coverage = smoothstep(-1.0, 1.0, sd);
  float ew = max(u_edge, 1.0);
  float t = clamp(sd / ew, 0.0, 1.0);
  float e = 0.75;
  vec2 grad = vec2(
    shapeDistance(coord + vec2(e, 0.0)) - shapeDistance(coord - vec2(e, 0.0)),
    shapeDistance(coord + vec2(0.0, e)) - shapeDistance(coord - vec2(0.0, e))
  );
  vec2 borderDir = -normalize(grad + vec2(1e-6));
  float delta = 0.001;
  float h1 = surfaceHeight(clamp(t - delta, 0.0, 1.0));
  float h2 = surfaceHeight(clamp(t + delta, 0.0, 1.0));
  float slope = (h2 - h1) * (0.5 / delta);
  float sinI = slope * inversesqrt(1.0 + slope * slope);
  float ior = 1.0 + u_refraction * 0.045;
  float dispG = refractDisp(sinI, slope, ior) * ew;
  vec3 col;
  if (u_chroma <= 0.0 || u_refraction <= 0.0) {
    col = sampleBg(coord + borderDir * dispG);
  } else {
    float spread = u_chroma * 0.12;
    float dispR = refractDisp(sinI, slope, max(ior - spread, 1.001)) * ew;
    float dispB = refractDisp(sinI, slope, ior + spread) * ew;
    col = vec3(sampleBg(coord + borderDir * dispR).r, sampleBg(coord + borderDir * dispG).g, sampleBg(coord + borderDir * dispB).b);
  }
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, u_saturation);
  col = mix(col, u_tint, u_tintAlpha);
  float angle = radians(u_lightAngle);
  vec3 light = normalize(vec3(cos(angle), sin(angle), 0.85));
  vec3 normal = normalize(vec3(-slope * borderDir, 1.0));
  float facing = dot(borderDir, light.xy);
  float lit = max(facing, 0.0);
  float back = max(-facing, 0.0);
  vec3 reflected = reflect(-light, normal);
  float spec = pow(max(reflected.z, 0.0), 26.0) * lit;
  float spec2 = pow(max(reflected.z, 0.0), 48.0) * back * 0.3;
  float hairline = (1.0 - smoothstep(0.0, 2.0, sd)) * (0.22 + 0.78 * lit);
  float fresnel = pow(1.0 - normal.z, 3.0) * (0.15 + 0.85 * lit);
  col += vec3(1.0) * ((spec + spec2) * 1.5 + fresnel * 0.3 + hairline * 0.28) * u_highlight;
  col -= back * (1.0 - normal.z) * 0.14;
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  col += dither / 768.0;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * coverage, coverage);
}
`;function xi(s){let i=s.trim().match(/^#([0-9a-f]{6}|[0-9a-f]{3})(?:[0-9a-f]{2})?$/i)?.[1];if(i){let t=i.length===3?[...i].map(n=>n+n).join(""):i;return[0,2,4].map(n=>parseInt(t.slice(n,n+2),16)/255)}let e=s.match(/rgba?\(\s*([\d.]+)[, ]+\s*([\d.]+)[, ]+\s*([\d.]+)/i);return e?[Number(e[1])/255,Number(e[2])/255,Number(e[3])/255]:[.72,.72,.76]}var Pt=class{constructor(){this.canvas=document.createElement("canvas");this.gl=this.canvas.getContext("webgl",{alpha:!0,antialias:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:"low-power"});this.failed=!1;if(!this.gl){this.failed=!0;return}this.canvas.addEventListener("webglcontextlost",i=>{i.preventDefault(),this.failed=!0,window.dispatchEvent(new Event("lg-webgl-lost"))}),this.canvas.addEventListener("webglcontextrestored",()=>{this.failed=!1,this.program=void 0,this.buffer=void 0,window.dispatchEvent(new Event("lg-webgl-restored"))})}shader(i,e){let t=this.gl,n=t.createShader(i);if(n){if(t.shaderSource(n,e),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){console.warn("Liquid Glass shader compile failed:",t.getShaderInfoLog(n)),t.deleteShader(n);return}return n}}init(){if(this.failed||!this.gl)return!1;if(this.program&&this.buffer)return!0;let i=this.gl,e=this.shader(i.VERTEX_SHADER,un),t=this.shader(i.FRAGMENT_SHADER,gn);if(!e||!t)return this.failed=!0,!1;let n=i.createProgram();if(!n)return this.failed=!0,!1;if(i.attachShader(n,e),i.attachShader(n,t),i.linkProgram(n),i.deleteShader(e),i.deleteShader(t),!i.getProgramParameter(n,i.LINK_STATUS))return console.warn("Liquid Glass shader link failed:",i.getProgramInfoLog(n)),this.failed=!0,!1;let r=i.createBuffer();return r?(i.bindBuffer(i.ARRAY_BUFFER,r),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),i.STATIC_DRAW),this.program=n,this.buffer=r,!0):(this.failed=!0,!1)}render(i,e,t,n){if(!this.init())return!1;let r=this.gl,o=Math.min((window.devicePixelRatio||1)*e.renderScale,e.pixelRatioLimit),a=Math.max(1,Math.round(t*o)),l=Math.max(1,Math.round(n*o));(this.canvas.width!==a||this.canvas.height!==l)&&(this.canvas.width=a,this.canvas.height=l),i.width=a,i.height=l;let c=this.program;r.viewport(0,0,a,l),r.useProgram(c),r.bindBuffer(r.ARRAY_BUFFER,this.buffer);let u=r.getAttribLocation(c,"a_position");r.enableVertexAttribArray(u),r.vertexAttribPointer(u,2,r.FLOAT,!1,0,0);let h=(S,E)=>r.uniform1f(r.getUniformLocation(c,S),E);r.uniform2f(r.getUniformLocation(c,"u_resolution"),a,l),h("u_shape",e.shape==="circle"?0:e.shape==="pill"?1:2),h("u_radius",e.radius*o),h("u_edge",e.edge*o),h("u_refraction",e.refraction),h("u_chroma",e.chroma),h("u_blur",e.blurRadius*o),h("u_highQualityBlur",e.highQualityBlur?1:0),h("u_highlight",e.highlight),h("u_lightAngle",e.lightAngle),h("u_saturation",e.saturation),h("u_tintAlpha",e.tintAlpha),r.uniform3fv(r.getUniformLocation(c,"u_tint"),xi(e.tint));let f=[...e.palette];for(;f.length<4;)f.push(f[f.length-1]??"#b8b8c2");r.uniform3fv(r.getUniformLocation(c,"u_colors[0]"),new Float32Array(f.slice(0,4).flatMap(xi))),r.uniform4fv(r.getUniformLocation(c,"u_stops"),new Float32Array(e.stops)),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.drawArrays(r.TRIANGLES,0,3),r.flush();let g=i.getContext("2d");return g?(g.clearRect(0,0,a,l),g.drawImage(this.canvas,0,0,a,l),!0):!1}},wi,I=class extends N{constructor(){super(...arguments);this.shape="roundrect";this.palette=[];this.stops=[0,.34,.68,1];this.radius=28;this.edge=14;this.refraction=16;this.chroma=.35;this.blurRadius=3;this.highQualityBlur=!1;this.renderScale=1;this.pixelRatioLimit=2;this.highlight=1.25;this.lightAngle=120;this.saturation=1.35;this.tintAlpha=.22;this.tint="#ffffff";this.draw=()=>{let e=this.renderRoot.querySelector("canvas"),t=this.getBoundingClientRect();if(!(!(e instanceof HTMLCanvasElement)||t.width<1||t.height<1)){if(!this.palette.length){this.palette=this.inferDark()?["#151619","#222327","#292a2f","#17181b"]:["#fafafa","#f1f1f2","#e8e9eb","#f8f8f9"];return}wi??(wi=new Pt),this.toggleAttribute("shader-ready",wi.render(e,this,t.width,t.height))}}}connectedCallback(){super.connectedCallback(),this.observer=new ResizeObserver(()=>this.draw()),this.observer.observe(this),window.addEventListener("lg-webgl-restored",this.draw)}disconnectedCallback(){this.observer?.disconnect(),window.removeEventListener("lg-webgl-restored",this.draw),super.disconnectedCallback()}firstUpdated(){this.draw()}updated(){this.draw()}inferDark(){let e=this;for(;e;){if(e instanceof HTMLElement&&e.hasAttribute("dark"))return!0;let t=e.getRootNode();e=t instanceof ShadowRoot?t.host:null}return!1}render(){return d`<canvas aria-hidden="true"></canvas>`}};I.styles=w`
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
  `,m([y()],I.prototype,"shape",2),m([y({attribute:!1})],I.prototype,"palette",2),m([y({attribute:!1})],I.prototype,"stops",2),m([y({type:Number})],I.prototype,"radius",2),m([y({type:Number})],I.prototype,"edge",2),m([y({type:Number})],I.prototype,"refraction",2),m([y({type:Number})],I.prototype,"chroma",2),m([y({type:Number})],I.prototype,"blurRadius",2),m([y({type:Boolean})],I.prototype,"highQualityBlur",2),m([y({type:Number})],I.prototype,"renderScale",2),m([y({type:Number})],I.prototype,"pixelRatioLimit",2),m([y({type:Number})],I.prototype,"highlight",2),m([y({type:Number})],I.prototype,"lightAngle",2),m([y({type:Number})],I.prototype,"saturation",2),m([y({type:Number})],I.prototype,"tintAlpha",2),m([y()],I.prototype,"tint",2);customElements.get("lg-glass-surface")||customElements.define("lg-glass-surface",I);var L=class extends N{constructor(){super(...arguments);this.value=0;this.min=0;this.max=1;this.step=0;this.variant="bar";this.disabled=!1;this.refraction=!1;this.fillFrom=void 0;this.showFill=!0;this.hideFillWhenZero=!1;this.showThumb=!1;this.shaderPalette=[];this.dragging=!1;this.dragValue=0;this.onPointerDown=e=>{this.disabled||e.button!==0||(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),this.dragging=!0,this.toggleAttribute("dragging",!0),this.dragValue=this.valueFromEvent(e),this.dispatchEvent(new CustomEvent("lg-input",{detail:{value:this.dragValue},bubbles:!0,composed:!0})))};this.onPointerMove=e=>{if(!this.dragging)return;let t=this.valueFromEvent(e);t!==this.dragValue&&(this.dragValue=t,this.dispatchEvent(new CustomEvent("lg-input",{detail:{value:t},bubbles:!0,composed:!0})))};this.onPointerUp=e=>{if(!this.dragging)return;this.dragging=!1,this.toggleAttribute("dragging",!1);let t=this.valueFromEvent(e);this.value=t,this.dispatchEvent(new CustomEvent("lg-change",{detail:{value:t},bubbles:!0,composed:!0}))};this.onKeyDown=e=>{if(this.disabled)return;let t=this.step>0?this.step:(this.max-this.min)/20,n=this.value;if(e.key==="ArrowRight"||e.key==="ArrowUp")n+=t;else if(e.key==="ArrowLeft"||e.key==="ArrowDown")n-=t;else if(e.key==="Home")n=this.min;else if(e.key==="End")n=this.max;else return;e.preventDefault(),this.value=$(n,this.min,this.max),this.dispatchEvent(new CustomEvent("lg-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}}get ratio(){let e=this.dragging?this.dragValue:this.value,t=this.max-this.min||1;return $((e-this.min)/t,0,1)}valueFromEvent(e){let t=this.shadowRoot?.querySelector(".track");if(!t)return this.value;let n=t.getBoundingClientRect(),o=this.variant==="thumb"||this.variant==="bar"||this.showThumb?n.height/2:0,a=Math.max(1,n.width-o*2),l=$((e.clientX-n.left-o)/a,0,1),c=this.min+l*(this.max-this.min);return this.step>0&&(c=Math.round(c/this.step)*this.step),$(c,this.min,this.max)}render(){let e=this.ratio,t=this.variant==="thumb",n=t||this.variant==="bar"||this.showThumb,r=this.showFill&&!(this.hideFillWhenZero&&e<=0),o="var(--lg-effective-slider-height)",a=`(100% - ${o})`,l={width:`${e*100}%`};if(t&&this.fillFrom!==void 0){let c=$(this.fillFrom,0,1),u=Math.min(c,e),h=Math.max(c,e);l={left:`calc(${o} / 2 + ${a} * ${u})`,width:`calc(${a} * ${h-u})`}}else n&&(l={width:`calc(${o} / 2 + ${a} * ${e})`});return d`
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
        ${r?d`<div class="fill" style=${x(l)}></div>`:p}
        ${t&&this.fillFrom!==void 0?d`<div class="center-mark" style=${x({left:`calc(${o} / 2 + ${a} * ${$(this.fillFrom,0,1)})`})}></div>`:p}
        <div class="overlay"><slot name="start"></slot><slot name="end"></slot></div>
        ${n?d`<div class="knob" style=${x({left:`calc(${a} * ${e})`})}>
              <lg-glass-surface
                shape="circle"
                .palette=${this.shaderPalette}
                .stops=${[0,.44,.56,1]}
                .radius=${999}
                .edge=${20}
                .refraction=${this.refraction?10:0}
                .blurRadius=${12}
                .highQualityBlur=${!0}
                .renderScale=${1.5}
                .pixelRatioLimit=${3}
                .highlight=${1.25}
                .tintAlpha=${this.refraction?.28:.18}
              ></lg-glass-surface>
            </div>`:p}
      </div>
    `}};L.styles=w`
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
      transform: scale(1.08);
    }
  `,m([y({type:Number})],L.prototype,"value",2),m([y({type:Number})],L.prototype,"min",2),m([y({type:Number})],L.prototype,"max",2),m([y({type:Number})],L.prototype,"step",2),m([y()],L.prototype,"variant",2),m([y({type:Boolean,reflect:!0})],L.prototype,"disabled",2),m([y({type:Boolean})],L.prototype,"refraction",2),m([y({type:Number})],L.prototype,"fillFrom",2),m([y({type:Boolean})],L.prototype,"showFill",2),m([y({type:Boolean})],L.prototype,"hideFillWhenZero",2),m([y({type:Boolean})],L.prototype,"showThumb",2),m([y({attribute:!1})],L.prototype,"shaderPalette",2),m([_()],L.prototype,"dragging",2),m([_()],L.prototype,"dragValue",2);customElements.get("lg-slider")||customElements.define("lg-slider",L);vi();var C=class extends N{constructor(){super(...arguments);this.t=Ge("en");this.openMoreInfo=()=>oi(this,this.config?.entity)}static async getConfigElement(){return await bi(),document.createElement("liquid-glass-card-editor")}static getStubConfig(e,t,n){return{}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={refraction:"auto",theme:"auto",...e},this.applyRefraction()}getCardSize(){return 3}get entity(){return this.config?.entity?this.hass?.states[this.config.entity]:void 0}get entityName(){return this.config?.name??lt(this.entity,this.config?.entity??"")}get isDark(){return this.config?.theme==="dark"?!0:this.config?.theme==="light"?!1:!!this.hass?.themes?.darkMode}get refraction(){return this.hasAttribute("refraction")}applyRefraction(){let e=this.config?.refraction??"auto",t=e===!0||e==="auto"&&fi();this.toggleAttribute("refraction",t)}willUpdate(){let e=this.config?.language??this.hass?.locale?.language??this.hass?.language;this.t=Ge(e),this.toggleAttribute("dark",this.isDark)}callService(e,t,n={}){!this.hass||!this.config?.entity||this.hass.callService(e,t,{entity_id:this.config.entity,...n})}renderDefs(){return this.refraction?mi:p}renderCardSurface(){let e=this.isDark?["#151619","#222327","#292a2f","#17181b"]:["#fafafa","#f1f1f2","#e8e9eb","#f8f8f9"];return d`<lg-glass-surface
      class="lg-card-shader"
      shape="roundrect"
      .palette=${e}
      .radius=${32}
      .edge=${28}
      .refraction=${this.refraction?22:0}
      .blurRadius=${7}
      .highlight=${.85}
      .tintAlpha=${this.isDark?.18:.24}
      .tint=${this.isDark?"#1c1c1e":"#ffffff"}
    ></lg-glass-surface>`}renderControlSurface(e,t="circle"){return d`<lg-glass-surface
      class="lg-control-shader"
      .shape=${t}
      .palette=${e??(this.isDark?["#242529","#45474d"]:["#ffffff","#d8d9dc"])}
      .radius=${t==="circle"?999:22}
      .edge=${14}
      .refraction=${this.refraction?16:0}
      .blurRadius=${3}
      .highlight=${1.25}
      .tintAlpha=${this.isDark?.12:.24}
    ></lg-glass-surface>`}renderIconWell(e,t,n){let r=!t,o=n===null?void 0:n??this.openMoreInfo;return d`<div
      class=${v({"icon-well":!0,idle:r})}
      style=${r?p:x({"--well-from":t.from,"--well-to":t.to,"--well-glow":t.glow})}
      @click=${o}
      role=${o?"button":p}
    >
      <lg-icon .icon=${e}></lg-icon>
    </div>`}renderTitle(e,t){return d`<div class="title" @click=${this.openMoreInfo}>
      <div class="name">${e}</div>
      <div class="state">${t}</div>
    </div>`}renderBadge(e,t){return d`<div
      class="badge"
      style=${t?x({"--badge-color":t.color,"--badge-bg":t.bg,"--badge-stroke":t.stroke,"--badge-glow":t.glow??t.color}):p}
    >
      <span class="dot"></span><span>${e}</span>
    </div>`}renderToggle(e,t,n){return d`<div
      class=${v({toggle:!0,on:e})}
      style=${x({"--toggle-color":t})}
      role="switch"
      aria-checked=${e}
      tabindex="0"
      @click=${n}
      @keydown=${r=>{(r.key===" "||r.key==="Enter")&&(r.preventDefault(),n())}}
    >
      <div class="knob-dot">${this.renderControlSurface()}</div>
    </div>`}renderUnavailable(){return d`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config?.icon??"mdi:help-circle-outline",void 0)}
          ${this.renderTitle(this.entityName,this.t("unavailable"))}
        </div>
      </div>`}};m([y({attribute:!1})],C.prototype,"hass",2),m([_()],C.prototype,"config",2);var M=w`
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
    /* The rim reads brighter against a dark backdrop, so it sits back a little. */
    --lg-rim-gain: 0.8;
    --lg-press-fill: rgba(94, 92, 230, 0.35);
    --lg-press-stroke: rgba(176, 175, 255, 0.8);
    --lg-press-label: #ffffff;
    --lg-press-glow: rgba(94, 92, 230, 0.4);
    --lg-motion-label: #ffc46b;
    --lg-group-panel: rgba(255, 255, 255, 0.08);
    --lg-group-panel-stroke: rgba(255, 255, 255, 0.12);
  }
`;var mn=[0,.5,1,1.5,2,2.5,3,4,5,7,9,12,16,22,28],fn={top:"to bottom",bottom:"to top",left:"to right",right:"to left"};function bn(s,i){let e=mn.map(t=>{let n=hi(t/V.edge,t,At[s],V.lightAngle,V.highlight),r=n>=0?"255 255 255":"0 0 0",o=Math.min(Math.abs(n),1).toFixed(4);return`rgb(${r} / calc(${i} * ${o})) ${t}px`});return`linear-gradient(${fn[s]}, ${e.join(", ")})`}function _i(s="var(--lg-rim-gain, 1)"){return Object.keys(At).map(i=>bn(i,s)).join(", ")}var T=w`
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
  }
  /*
   * Specular, fresnel and hairline, evaluated from liquid-glass.glsl and painted in pixel
   * stops so the rim keeps its real width on a card of any size. The shader concentrates
   * almost all of it within three pixels of the edge, which is what reads as a glass slab
   * rather than a tinted panel.
   */
  .glass::before {
    background: ${nt(_i())};
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
  .card > .lg-card-shader,
  .lg-control-shader {
    position: absolute;
    z-index: 0;
  }
  .glass:has(> .lg-card-shader) {
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  :host([refraction]) .glass:has(> .lg-card-shader) {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  .glass:has(> .lg-card-shader)::before {
    background: none;
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
`;var gt=["#FF453A","#FF9F0A","#FFD60A","#30D158","#0A84FF","#B15CFF","#FF375F"],me=class extends C{constructor(){super(...arguments);this.preview={};this.toggle=()=>this.callService("light","toggle")}static getStubConfig(e,t,n){return{entity:D(["light"],e,t,n,r=>(r.attributes.supported_color_modes??[]).some(o=>o!=="onoff"))}}getCardSize(){return 5}get isOn(){return this.entity?.state==="on"}get supportedModes(){return this.entity?.attributes.supported_color_modes??[]}get supportsBrightness(){return this.config.show_brightness===!1?!1:this.supportedModes.some(e=>e!=="onoff")}get supportsColorTemp(){return this.config.show_color_temp===!1?!1:this.supportedModes.includes("color_temp")}get supportsColor(){return this.config.show_color===!1?!1:this.supportedModes.some(e=>["hs","rgb","rgbw","rgbww","xy"].includes(e))}get activeUiMode(){return this.uiMode?this.uiMode:this.supportsColor?this.supportsColorTemp&&this.entity?.attributes.color_mode==="color_temp"?"color_temp":"color":"color_temp"}get brightnessPct(){if(this.preview.brightness!==void 0)return this.preview.brightness;let e=this.entity?.attributes.brightness;return this.isOn&&e!==void 0?Math.round(e/255*100):0}get kelvin(){return this.preview.kelvin!==void 0?this.preview.kelvin:this.entity?.attributes.color_temp_kelvin??this.kelvinRange[0]}get kelvinRange(){let e=this.entity?.attributes;return[e?.min_color_temp_kelvin??2e3,e?.max_color_temp_kelvin??6500]}get hs(){let e=this.entity?.attributes.hs_color??[280,85];return[this.preview.hue??e[0],this.preview.sat??e[1]]}get colorHex(){let e=this.entity?.attributes.rgb_color;return this.preview.hue===void 0&&this.preview.sat===void 0&&e?X(e):X(re(this.hs[0],this.hs[1]))}get colorLike(){return this.supportsColor&&this.activeUiMode==="color"}get accent(){return this.colorLike?this.colorHex:"var(--lg-accent)"}get wellStyle(){if(this.isOn){if(this.colorLike){let e=re(this.hs[0],Math.min(this.hs[1],60));return{from:X(e),to:this.colorHex,glow:H(this.colorHex,.24)}}return{from:"#FFD36B",to:"var(--lg-accent-deep)",glow:"rgba(255, 165, 48, 0.24)"}}}stateText(){let e=this.t;if(!this.isOn){let n=this.lastBrightness;return n?`${e("unlit")} \xB7 ${e("last")} ${n}%`:e("unlit")}let t=[e("lit")];return this.supportsBrightness&&t.push(`${this.brightnessPct}%`),this.colorLike?t.push(e("color")):this.supportsColorTemp&&this.entity?.attributes.color_temp_kelvin&&t.push(`${this.kelvin}K`),t.join(" \xB7 ")}willUpdate(){super.willUpdate(),this.isOn&&this.entity?.attributes.brightness!==void 0&&(this.lastBrightness=Math.round(this.entity.attributes.brightness/255*100))}setBrightness(e){this.preview={},this.callService("light","turn_on",{brightness_pct:Math.round(e)})}setKelvin(e){this.preview={},this.callService("light","turn_on",{color_temp_kelvin:Math.round(e)})}setHs(e,t){this.preview={},this.callService("light","turn_on",{hs_color:[Math.round(e),Math.round(t)]})}applyPreset(e){if(e.scene){this.hass?.callService("scene","turn_on",{entity_id:e.scene});return}if(e.service){let[n,r]=e.service.split(".");this.hass?.callService(n,r,{entity_id:this.config.entity,...e.data??{}});return}let t={...e.data??{}};e.brightness!==void 0&&(t.brightness_pct=e.brightness),e.color_temp_kelvin!==void 0&&(t.color_temp_kelvin=e.color_temp_kelvin),e.rgb_color&&(t.rgb_color=e.rgb_color),e.hs_color&&(t.hs_color=e.hs_color),this.callService("light","turn_on",t)}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.isOn,n=this.t,r=this.supportsColor&&this.supportsColorTemp,o=this.activeUiMode,a=this.config.presets??[],l=this.config.favorites===!1?[]:this.config.favorites??gt,c=this.colorHex,[u,h]=this.kelvinRange,[f,g]=this.hs,S=this.colorLike?X(re(f,Math.min(g,10))):"#FFF8EA",E=this.colorLike?X(re(f,Math.min(g,30))):"#FFE2A6",z=this.colorLike?X(re(f,60).map(b=>b*.5)):"#6B5323";return d`${this.renderDefs()}
      <div class=${v({glass:!0,card:!0})}>
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config.icon??e.attributes.icon??"mdi:lightbulb",this.wellStyle,this.toggle)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderToggle(t,this.accent,this.toggle)}
        </div>

        ${r?d`<div class="segment">
              ${["color","color_temp"].map(b=>d`<button class=${v({selected:o===b})} @click=${()=>this.uiMode=b}>
                  ${o===b?this.renderControlSurface(void 0,"pill"):p}
                  <span>${n(b==="color"?"color":"color_temp")}</span>
                </button>`)}
            </div>`:p}

        ${this.supportsBrightness?d`<div class="section brightness" style=${x({"--fill-from":S,"--fill-to":E,"--sun-color":t?z:"var(--lg-text-secondary)"})}>
              <div class="label-row"><span class="label">${n("brightness")}</span><span class="value">${this.brightnessPct}%</span></div>
              <lg-slider
                variant="bar"
                .refraction=${this.refraction}
                .shaderPalette=${[S,E,"#8e8994","#d8d4dc"]}
                .value=${this.brightnessPct}
                min="0"
                max="100"
                step="1"
                .showFill=${t}
                @lg-input=${b=>this.preview={...this.preview,brightness:b.detail.value}}
                @lg-change=${b=>this.setBrightness(b.detail.value)}
              >
                <lg-icon slot="start" class="sun" icon="mdi:white-balance-sunny"></lg-icon>
                <lg-icon slot="end" class="sun-dim" icon="mdi:brightness-5"></lg-icon>
              </lg-slider>
            </div>`:p}

        ${this.supportsColorTemp&&o==="color_temp"?d`<div class="section temp">
              <div class="label-row"><span class="label">${n("color_temp")}</span><span class="value">${Math.round(this.kelvin)}K</span></div>
              <lg-slider
                class=${v({dim:!t})}
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${["#ffb340","#fff0d8","#ffffff","#b9dcff"]}
                .value=${this.kelvin}
                .min=${u}
                .max=${h}
                step="50"
                .showFill=${!1}
                @lg-input=${b=>this.preview={...this.preview,kelvin:b.detail.value}}
                @lg-change=${b=>this.setKelvin(b.detail.value)}
              ></lg-slider>
              <div class="ticks"><span>${u}K</span><span>${h}K</span></div>
            </div>`:p}

        ${this.supportsColor&&o==="color"?d`<div class="section hue">
                <div class="label-row"><span class="label">${n("hue")}</span><span class="value">${Math.round(f)}°</span></div>
                <lg-slider
                  class=${v({dim:!t})}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${["#ff3b30","#ffcc00","#30d158","#af52de"]}
                  .value=${f}
                  min="0"
                  max="360"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${b=>this.preview={...this.preview,hue:b.detail.value}}
                  @lg-change=${b=>this.setHs(b.detail.value,g)}
                ></lg-slider>
              </div>
              <div class="section sat" style=${x({"--sat-color":X(re(f,100))})}>
                <div class="label-row"><span class="label">${n("saturation")}</span><span class="value">${Math.round(g)}%</span></div>
                <lg-slider
                  class=${v({dim:!t})}
                  variant="thumb"
                  .refraction=${this.refraction}
                  .shaderPalette=${["#ffffff","#ffffff",X(re(f,100)),X(re(f,100))]}
                  .value=${g}
                  min="0"
                  max="100"
                  step="1"
                  .showFill=${!1}
                  @lg-input=${b=>this.preview={...this.preview,sat:b.detail.value}}
                  @lg-change=${b=>this.setHs(f,b.detail.value)}
                ></lg-slider>
              </div>
              ${l.length?d`<div class=${v({favorites:!0,muted:!t})}>
                    <div class="label">${n("favorites")}</div>
                    <div class="swatches">
                      ${l.map(b=>{let F=t&&b.toLowerCase()===c.toLowerCase();return d`<button
                          class=${v({swatch:!0,selected:F})}
                          style=${x({"--swatch":b,"--swatch-glow":H(b,.5)})}
                          title=${b}
                          @click=${()=>this.applyPreset({name:b,rgb_color:vn(b)})}
                        ></button>`})}
                      <button class="swatch add" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:plus"></lg-icon></button>
                    </div>
                  </div>`:p}`:p}

        ${a.length?d`<div class=${v({chips:!0,muted:!t})}>
              ${a.map(b=>d`<button class="chip" @click=${()=>this.applyPreset(b)}>
                  ${this.renderControlSurface(void 0,"pill")}
                  ${b.icon?d`<lg-icon .icon=${b.icon}></lg-icon>`:p}<span>${b.name}</span>
                </button>`)}
            </div>`:p}
      </div>`}};me.styles=[M,T,w`
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
    `],m([_()],me.prototype,"uiMode",2),m([_()],me.prototype,"preview",2);function vn(s){let i=parseInt(s.replace("#",""),16);return[i>>16&255,i>>8&255,i&255].map(e=>$(e,0,255))}customElements.get("liquid-glass-light-card")||customElements.define("liquid-glass-light-card",me);var yi=["input_number","number","fan","light","media_player","cover","valve","humidifier","water_heater","climate"],B=s=>s!==null&&s!==""&&Number.isFinite(Number(s))?Number(s):void 0,fe=class extends C{static getStubConfig(i,e,t){return{entity:D(yi,i,e,t)}}getCardSize(){return 2}spec(){let i=this.entity,e=i.attributes,t=this.config,n=i.entity_id.split(".")[0],r;switch(n){case"input_number":case"number":r={min:B(e.min)??0,max:B(e.max)??100,step:B(e.step)??1,unit:e.unit_of_measurement??"",icon:"mdi:tune-variant",value:B(i.state),call:a=>[n,"set_value",{value:a}]};break;case"fan":r={min:0,max:100,step:B(e.percentage_step)??1,unit:"%",icon:"mdi:fan",value:i.state==="on"?B(e.percentage)??0:0,call:a=>["fan","set_percentage",{percentage:Math.round(a)}]};break;case"light":r={min:0,max:100,step:1,unit:"%",icon:"mdi:lightbulb",value:i.state==="on"?Math.round((B(e.brightness)??0)/255*100):0,call:a=>["light","turn_on",{brightness_pct:Math.round(a)}]};break;case"media_player":r={min:0,max:100,step:1,unit:"%",icon:"mdi:volume-high",value:Math.round((B(e.volume_level)??0)*100),call:a=>["media_player","volume_set",{volume_level:Math.round(a)/100}]};break;case"cover":r={min:0,max:100,step:1,unit:"%",icon:"mdi:blinds-horizontal",value:B(e.current_position)??(i.state==="closed"?0:100),call:a=>["cover","set_cover_position",{position:Math.round(a)}]};break;case"valve":r={min:0,max:100,step:1,unit:"%",icon:"mdi:pipe-valve",value:B(e.current_position)??(i.state==="closed"?0:100),call:a=>["valve","set_valve_position",{position:Math.round(a)}]};break;case"humidifier":r={min:B(e.min_humidity)??0,max:B(e.max_humidity)??100,step:1,unit:"%",icon:"mdi:air-humidifier",value:B(e.humidity),call:a=>["humidifier","set_humidity",{humidity:Math.round(a)}]};break;case"water_heater":r={min:B(e.min_temp)??30,max:B(e.max_temp)??60,step:B(e.target_temp_step)??1,unit:"\xB0",icon:"mdi:water-boiler",value:B(e.temperature),call:a=>["water_heater","set_temperature",{temperature:a}]};break;case"climate":r={min:B(e.min_temp)??7,max:B(e.max_temp)??35,step:B(e.target_temp_step)??.5,unit:"\xB0",icon:"mdi:thermostat",value:B(e.temperature),call:a=>["climate","set_temperature",{temperature:a}]};break;default:r={min:0,max:100,step:1,unit:e.unit_of_measurement??"",icon:"mdi:tune-variant",value:B(i.state)}}let o=t.service?a=>{let[l,c]=t.service.split(".");return[l,c,{[t.service_key??"value"]:a}]}:r.call;return{min:t.min??r.min,max:t.max??r.max,step:t.step??r.step,unit:t.unit??r.unit,icon:t.icon??i.attributes.icon??r.icon,value:t.attribute?B(e[t.attribute]):r.value,call:o}}subtitleFor(i,e){if(this.config.subtitle!==void 0)return this.config.subtitle;let t=this.t;if(i.min===0&&e<=0)return t("slider_off");let n=i.step>0?Math.round((i.max-i.min)/i.step):0;return n>=2&&n<=12?t("slider_levels",{n,i:Math.round((e-i.min)/i.step)}):t("slider_step",{s:`${k(this.hass,i.step)}${i.unit}`})}tickCount(i){let e=this.config.ticks;if(typeof e=="number")return $(Math.round(e),0,20);if(e!==!0)return 0;let t=i.step>0?Math.round((i.max-i.min)/i.step):0;return t>=2&&t<=12?t:0}settled(i){return this.pending===void 0?!0:i.value===void 0?!1:Math.abs(i.value-this.pending)<=Math.max(i.step/2,1)}commit(i,e){if(this.preview=void 0,!i.call)return;this.pending=e,window.clearTimeout(this.pendingTimer),this.pendingTimer=window.setTimeout(()=>this.pending=void 0,4e3);let[t,n,r]=i.call(e);this.hass?.callService(t,n,{entity_id:this.config.entity,...r})}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.pendingTimer)}updated(){this.pending!==void 0&&this.settled(this.spec())&&(window.clearTimeout(this.pendingTimer),this.pending=void 0)}render(){let i=this.entity;if(!i||A(i))return this.renderUnavailable();let e=this.spec(),t=this.preview??(this.settled(e)?e.value:this.pending)??e.min,n=$(t,e.min,e.max),r=e.min===0&&n<=0,o=this.config.decimals??(Number.isInteger(e.step)?0:1),a=this.config.accent,l=a?se(a,.4):"var(--lg-slider-accent-light)",c=a?ai(a,.3):"var(--lg-slider-accent-deep)",u=a?H(a,.3):"rgba(94, 92, 230, 0.3)",h=a?se(a,.55):"var(--lg-slider-fill-light)",f=a??"var(--lg-slider-accent)",g=r?void 0:{from:l,to:c,glow:u},S=this.tickCount(e),E=!e.call,z=b=>k(this.hass,b,o);return d`${this.renderDefs()}
      <div class="glass card" style=${x({"--fill-from":h,"--fill-to":f})}>
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(e.icon,g)}
          ${this.renderTitle(this.entityName,this.subtitleFor(e,n))}
          <div class=${v({value:!0,zero:r})}>
            <span class="num">${z(n)}</span>
            ${e.unit?d`<span class="unit">${e.unit}</span>`:p}
          </div>
        </div>

        <div class="track-wrap">
          <lg-slider
            variant="thumb"
            .refraction=${this.refraction}
            .shaderPalette=${[h,f,this.isDark?"#34343e":"#dedde2",this.isDark?"#34343e":"#dedde2"]}
            .value=${n}
            .min=${e.min}
            .max=${e.max}
            .step=${e.step}
            .disabled=${E}
            .showFill=${!r}
            @lg-input=${b=>this.preview=b.detail.value}
            @lg-change=${b=>this.commit(e,b.detail.value)}
          ></lg-slider>
          ${S?d`<div class="marks">${Array.from({length:S},()=>d`<span></span>`)}</div>`:p}
        </div>

        ${this.config.show_range===!1?p:d`<div class="ticks">
              <span>${z(e.min)}${e.unit}</span>
              <span>${z(e.max)}${e.unit}</span>
            </div>`}
      </div>`}};fe.styles=[M,T,w`
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
    `],m([_()],fe.prototype,"preview",2),m([_()],fe.prototype,"pending",2);var $i=yi;customElements.get("liquid-glass-slider-card")||customElements.define("liquid-glass-slider-card",fe);var oe=[{from:"#FFD36B",to:"#FF8A1F"},{from:"#9E9CFF",to:"#5E5CE6"},{from:"#FF9BC2",to:"#E0417F"},{from:"#8FE3F4",to:"#0A7EA4"},{from:"#7EE8A0",to:"#1E9E4A"},{from:"#FFB39B",to:"#E05A2B"}];function Bt(s,i){let e=s?{from:se(s,.45),to:s}:i;return{...e,glow:H(e.to,.3)}}var be={scene:{service:"scene.turn_on",icon:"mdi:palette",well:oe[0],label:"btn_scene"},script:{service:"script.turn_on",icon:"mdi:script-text-play",well:oe[1],label:"btn_script"},automation:{service:"automation.trigger",icon:"mdi:robot",well:oe[3],label:"btn_automation"},button:{service:"button.press",icon:"mdi:gesture-tap-button",well:oe[3],label:"btn_button"},input_button:{service:"input_button.press",icon:"mdi:gesture-tap-button",well:oe[3],label:"btn_button"}},xn=2600,Te=class extends C{constructor(){super(...arguments);this.justRan=!1;this.press=()=>{let[e,t]=(this.config.service??this.spec?.service??"").split(".");!e||!t||(this.hass?.callService(e,t,{entity_id:this.config.entity,...this.config.service_data??{}}),this.justRan=!0,window.clearTimeout(this.doneTimer),this.doneTimer=window.setTimeout(()=>this.justRan=!1,xn))};this.onKeyDown=e=>{e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.press())}}static getStubConfig(e,t,n){return{entity:D(Object.keys(be),e,t,n)}}getCardSize(){return 1}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.doneTimer)}get domain(){return this.config.entity?.split(".")[0]??""}get spec(){return be[this.domain]}lastRun(e){let t=e.attributes.last_triggered;if(t)return t;let n=Date.parse(e.state);return Number.isNaN(n)?void 0:e.state}subtitle(e){if(this.config.subtitle!==void 0)return this.config.subtitle;let t=this.t;if(this.justRan)return`${t("btn_done")} \xB7 ${t("just_now")}`;let n=this.spec?t(this.spec.label):this.domain,r=this.lastRun(e);if(!r)return n;let a=Date.now()-new Date(r).getTime()<12*3600*1e3?j(r,t):Ae(r);return`${n} \xB7 ${t("last")} ${a}`}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=Bt(this.config.accent,this.spec?.well??oe[0]),n=this.config.icon??e.attributes.icon??this.spec?.icon??"mdi:gesture-tap-button";return d`${this.renderDefs()}
      <div
        class="glass card row"
        role="button"
        tabindex="0"
        aria-label=${this.entityName}
        @click=${this.press}
        @keydown=${this.onKeyDown}
      >
        ${this.renderCardSurface()}
        ${this.renderIconWell(n,t,null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.subtitle(e)}</div>
        </div>
        <div class=${v({action:!0,done:this.justRan})}>
          <lg-icon .icon=${this.justRan?"mdi:check":"mdi:play"}></lg-icon>
        </div>
      </div>`}};Te.styles=[M,T,w`
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
    `],m([_()],Te.prototype,"justRan",2);customElements.get("liquid-glass-button-card")||customElements.define("liquid-glass-button-card",Te);var O=s=>({name:s,selector:{text:{}}}),R=s=>({name:s,selector:{boolean:{}}}),Qe=s=>({name:s,selector:{icon:{}}}),Ye=s=>({name:s,selector:{object:{}}}),P=s=>({name:"",type:"grid",schema:s}),Je=(s,i,e=!1)=>({name:s,required:e,selector:{entity:{domain:i}}}),Y=(s,i,e,t=1)=>({name:s,selector:{number:{min:i,max:e,step:t,mode:"box"}}}),ae=(s,i,e=!1)=>({name:s,selector:{select:{options:i,multiple:e,mode:"dropdown"}}});function W(s){return[Je("entity",s,!0),P([O("name"),Qe("icon")])]}function U(s){return{name:"",type:"expandable",title:s("ed_advanced"),icon:"mdi:tune",schema:[P([ae("theme",[{value:"auto",label:s("ed_theme_auto")},{value:"light",label:s("ed_theme_light")},{value:"dark",label:s("ed_theme_dark")}]),ae("refraction",[{value:"auto",label:s("ed_refraction_auto")},{value:"on",label:s("ed_refraction_on")},{value:"off",label:s("ed_refraction_off")}])]),ae("language",[{value:"ja",label:"\u65E5\u672C\u8A9E"},{value:"en",label:"English"}])]}}var wn=["auto","heat_cool","heat","cool","dry","fan_only","off"];function ve(s){return(s??"").replace(/^custom:/,"").replace(/^liquid-glass-/,"").replace(/-card$/,"")}function Ot(s,i,e){switch(ve(s)){case"light":return[...W("light"),P([R("show_brightness"),R("show_color_temp"),R("show_color")]),{name:"favorites",selector:{text:{multiple:!0}}},Ye("presets"),U(i)];case"climate":return[...W("climate"),ae("design",[{value:"classic",label:i("ed_design_classic")},{value:"compact",label:i("ed_design_compact")}]),...e?.design==="compact"||e?.design==="a"?[R("show_fan_mode")]:[P([R("show_fan_mode"),R("show_preset_mode"),R("show_swing_mode")])],ae("hvac_modes",wn.map(n=>({value:n,label:i(`mode_${n}`)})),!0),U(i)];case"switch":return[...W(["switch","input_boolean","fan","light","automation","humidifier","siren","remote"]),Je("power_entity","sensor"),U(i)];case"sensor":{let n=e?.value_in_caption===!0;return[...W("sensor"),P(n?[R("value_in_caption"),R("trend")]:[R("value_in_caption"),R("graph"),R("trend")]),P(n?[Y("decimals",0,4)]:[Y("hours_to_show",1,168),Y("decimals",0,4)]),O("accent"),P([Je("secondary_entity",["sensor","binary_sensor"]),O("secondary_label")]),U(i)]}case"binary-sensor":return[...W("binary_sensor"),P([Qe("icon_on"),Qe("icon_off")]),P([O("label_on"),O("label_off")]),O("accent"),U(i)];case"lock":return[...W("lock"),Ye("buttons"),U(i)];case"cover":return[...W("cover"),P([ae("style",[{value:"blind",label:i("ed_style_blind")},{value:"curtain",label:i("ed_style_curtain")}]),ae("curtain",[{value:"double",label:i("ed_curtain_double")},{value:"single",label:i("ed_curtain_single")}])]),R("show_tilt"),U(i)];case"media":return[...W("media_player"),P([R("show_volume"),R("show_device")]),O("source_color"),U(i)];case"slider":return[...W($i),P([Y("min",-1e3,1e4,.1),Y("max",-1e3,1e4,.1)]),P([Y("step",.01,1e3,.01),O("unit")]),P([R("ticks"),R("show_range"),Y("decimals",0,4)]),O("subtitle"),O("accent"),{name:"",type:"expandable",title:i("ed_custom_entity"),icon:"mdi:code-braces",schema:[O("attribute"),P([O("service"),O("service_key")])]},U(i)];case"weather":{let n=e?.layout==="row",r=ae("layout",[{value:"full",label:i("ed_layout_full")},{value:"row",label:i("ed_layout_row")}]);return n?[...W("weather"),r,U(i)]:[...W("weather"),r,P([R("show_hourly"),R("show_daily"),R("show_metrics")]),P([Y("hourly_count",2,12),Y("daily_count",1,10)]),U(i)]}case"button":return[...W(Object.keys(be)),O("subtitle"),O("accent"),{name:"",type:"expandable",title:i("ed_custom_entity"),icon:"mdi:code-braces",schema:[O("service"),Ye("service_data")]},U(i)];case"scene":return[P([ae("style",[{value:"tiles",label:i("ed_style_tiles")},{value:"chips",label:i("ed_style_chips")}]),Y("columns",1,6)]),P([O("title"),R("show_count")]),Ye("scenes"),U(i)];case"group":return[P([O("title"),Qe("icon")]),O("subtitle"),P([R("collapsible"),R("collapsed"),R("summary")]),Ye("cards"),U(i)];case"camera":return[...W("camera"),Je("motion_entity","binary_sensor"),P([R("show_actions"),R("show_mic")]),P([Y("refresh_interval",1,300),Y("aspect_ratio",.5,3,.01)]),{name:"",type:"expandable",title:i("ed_custom_entity"),icon:"mdi:code-braces",schema:[O("snapshot_service"),O("mic_service")]},U(i)];default:return[Je("entity",[],!0),P([O("name"),Qe("icon")]),U(i)]}}var zt=new Set(["show_brightness","show_color_temp","show_color","show_fan_mode","show_preset_mode","graph","trend","show_tilt","show_volume","show_device","show_range","show_hourly","show_daily","show_metrics","show_actions","collapsible","summary"]);function ki(s){let i=new Set,e=t=>{for(let n of t)n.schema?e(n.schema):n.name&&i.add(n.name)};return e(s),i}var Ci={presets:"ed_help_presets",buttons:"ed_help_buttons",favorites:"ed_help_favorites",accent:"ed_help_color",source_color:"ed_help_color",ticks:"ed_help_ticks",show_range:"ed_help_show_range",value_in_caption:"ed_help_value_in_caption",attribute:"ed_help_attribute",service:"ed_help_service",service_key:"ed_help_service_key",subtitle:"ed_help_subtitle",scenes:"ed_help_scenes",snapshot_service:"ed_help_snapshot_service",motion_entity:"ed_help_motion_entity",style:"ed_help_style",layout:"ed_help_layout",hvac_modes:"ed_help_hvac_modes",cards:"ed_help_cards"};var Fe=class extends N{constructor(){super(...arguments);this.computeLabel=e=>this.t(`ed_${e.name}`);this.computeHelper=e=>{let t=Ci[e.name];return t?this.t(t):void 0};this.valueChanged=e=>{e.stopPropagation(),St(this,"config-changed",{config:this.fromForm(e.detail.value)})}}setConfig(e){this.config=e}toForm(e){let{refraction:t,theme:n,...r}=e,o={...r};if(o.refraction=t===!0?"on":t===!1?"off":"auto",o.theme=n??"auto",ve(e.type)==="weather"&&(o.layout=r.layout??"full"),ve(e.type)==="climate"){let a=r.design;o.design=a==="a"?"compact":a??"classic"}for(let a of ki(Ot(e.type,this.t,o))){if(!zt.has(a))continue;let l=ve(e.type)==="climate"&&o.design==="compact"&&a==="show_fan_mode";o[a]=l?r[a]===!0:r[a]!==!1}if(ve(e.type)==="light"){let a=r.favorites;o.favorites=a===!1?[]:a??gt}return o}fromForm(e){let t={...e},n=ve(t.type)==="climate"&&(t.design==="compact"||t.design==="a"),r=this.config,o=r?.design==="compact"||r?.design==="a";r&&n!==o&&r.show_fan_mode===void 0&&delete t.show_fan_mode;for(let[l,c]of Object.entries(t))if(typeof c=="boolean"){if(n&&l==="show_fan_mode"){c===!1&&delete t[l];continue}c===zt.has(l)&&delete t[l]}t.refraction==="on"?t.refraction=!0:t.refraction==="off"?t.refraction=!1:delete t.refraction,t.theme==="auto"&&delete t.theme,t.layout==="full"&&delete t.layout,t.design==="classic"&&delete t.design;let a=t.favorites;Array.isArray(a)&&a.join()===gt.join()&&delete t.favorites;for(let[l,c]of Object.entries(t))(c==null||c===""||Array.isArray(c)&&c.length===0&&l!=="favorites")&&delete t[l];return t}get t(){return Ge(this.config?.language??this.hass?.locale?.language??this.hass?.language)}render(){return!this.hass||!this.config?p:d`<ha-form
      .hass=${this.hass}
      .data=${this.toForm(this.config)}
      .schema=${Ot(this.config.type,this.t,this.config)}
      .computeLabel=${this.computeLabel}
      .computeHelper=${this.computeHelper}
      @value-changed=${this.valueChanged}
    ></ha-form>`}};Fe.styles=w`
    :host {
      display: block;
    }
  `,m([y({attribute:!1})],Fe.prototype,"hass",2),m([_()],Fe.prototype,"config",2);customElements.get("liquid-glass-card-editor")||customElements.define("liquid-glass-card-editor",Fe);var te=250,It=24,Ht=te/2-It/2,ee=135,_n=4e3,Q=270,Lt=(s,i=Ht)=>{let e=s*Math.PI/180;return[te/2+i*Math.cos(e),te/2+i*Math.sin(e)]};function Si(s,i){let[e,t]=Lt(s),[n,r]=Lt(i),o=i-s>180?1:0;return`M ${e} ${t} A ${Ht} ${Ht} 0 ${o} 1 ${n} ${r}`}var xe=class extends C{constructor(){super(...arguments);this.onDialDown=e=>{if(this.mode==="off"||e.button!==0)return;e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId);let t=this.valueFromPointer(e),n="single";if(this.isRange){let r=this.entity.attributes.target_temp_low,o=this.entity.attributes.target_temp_high;n=Math.abs(t-r)<=Math.abs(t-o)?"low":"high"}this.drag={which:n,value:t}};this.onDialMove=e=>{if(!this.drag)return;let t=this.valueFromPointer(e);t!==this.drag.value&&(this.drag={...this.drag,value:t})};this.onTileDown=e=>{if(this.mode==="off"||e.button!==0)return;e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId);let t=this.valueFromTilePointer(e),n="single";if(this.isRange){let r=this.entity.attributes,o=this.shownValue("low",r.target_temp_low,this.range[0]),a=this.shownValue("high",r.target_temp_high,this.range[1]);n=Math.abs(t-o)<=Math.abs(t-a)?"low":"high"}this.drag={which:n,value:t}};this.onTileMove=e=>{if(!this.drag)return;let t=this.valueFromTilePointer(e);t!==this.drag.value&&(this.drag={...this.drag,value:t})};this.onTileKeyDown=e=>{if(this.mode==="off"||this.isRange)return;let[t,n]=this.range,r=this.entity?.attributes.temperature,o=this.shownValue("single",r,t);if(e.key==="ArrowRight"||e.key==="ArrowUp")o+=this.step;else if(e.key==="ArrowLeft"||e.key==="ArrowDown")o-=this.step;else if(e.key==="Home")o=t;else if(e.key==="End")o=n;else return;e.preventDefault(),this.drag={which:"single",value:$(o,t,n)},this.onDialUp()};this.onDialUp=()=>{if(!this.drag)return;let{which:e,value:t}=this.drag;this.drag=void 0;let n=this.entity?.attributes??{},r=t;e==="single"?this.callService("climate","set_temperature",{temperature:t}):e==="low"?(r=Math.min(t,n.target_temp_high-this.step),this.callService("climate","set_temperature",{target_temp_low:r,target_temp_high:n.target_temp_high})):(r=Math.max(t,n.target_temp_low+this.step),this.callService("climate","set_temperature",{target_temp_low:n.target_temp_low,target_temp_high:r})),this.hold(e,r)}}static getStubConfig(e,t,n){return{entity:D(["climate"],e,t,n)}}getCardSize(){return 6}get mode(){return this.entity?.state??"off"}get step(){return this.entity?.attributes.target_temp_step??.5}get range(){let e=this.entity?.attributes;return[e?.min_temp??7,e?.max_temp??35]}get isRange(){return this.mode==="heat_cool"&&this.entity?.attributes.target_temp_low!==void 0}ratio(e){let[t,n]=this.range;return $((e-t)/(n-t||1),0,1)}theme(){let e=this.t,t=this.mode,n="rgba(255,255,255,0.7)";switch(t){case"heat":return{icon:"mdi:fire",label:e("mode_heat"),well:{from:"#FFA073",to:"var(--lg-heat-deep)",glow:"rgba(255,106,61,0.24)"},badge:{color:"var(--lg-heat)",bg:"rgba(255,106,61,0.18)",stroke:"rgba(255,106,61,0.3)"},ring:["#FFB36B","var(--lg-heat)","var(--lg-heat-deep)"],glow:"rgba(255,106,61,0.35)",selectedColor:"var(--lg-heat)"};case"cool":return{icon:"mdi:snowflake",label:e("mode_cool"),well:{from:"#8FDBFF",to:"var(--lg-cool-deep)",glow:"rgba(10,132,255,0.24)"},badge:{color:"var(--lg-cool-deep)",bg:"rgba(10,132,255,0.18)",stroke:"rgba(10,132,255,0.3)"},ring:["#A8E4FF","var(--lg-cool)","var(--lg-cool-deep)"],glow:"rgba(10,132,255,0.35)",selectedColor:"var(--lg-cool-deep)"};case"dry":return{icon:"mdi:water-percent",label:e("mode_dry"),well:{from:"#8FDBFF",to:"#2BB3D0",glow:"rgba(43,179,208,0.24)"},badge:{color:"#0A7EA4",bg:"rgba(43,179,208,0.18)",stroke:"rgba(43,179,208,0.3)"},ring:["#A8E4FF","#5DD6EE","#0A7EA4"],glow:"rgba(43,179,208,0.35)",selectedColor:"#0A7EA4"};case"fan_only":return{icon:"mdi:fan",label:e("mode_fan_only"),well:{from:"#C9CED6",to:"#8E9AAF",glow:"rgba(142,154,175,0.24)"},badge:{color:"#5C6B82",bg:"rgba(142,154,175,0.18)",stroke:"rgba(142,154,175,0.3)"},ring:["#DDE3EC","#B4BDCC","#8E9AAF"],glow:"rgba(142,154,175,0.3)",selectedColor:"#5C6B82"};case"heat_cool":case"auto":return{icon:"mdi:thermometer-auto",label:e(t==="auto"?"mode_auto":"mode_heat_cool"),well:{from:"#7EE8A0",to:"#1E9E4A",glow:"rgba(48,209,88,0.24)"},badge:{color:"#1E9E4A",bg:"rgba(48,209,88,0.18)",stroke:"rgba(48,209,88,0.3)"},ring:["var(--lg-heat)","#C58CFF","var(--lg-cool-deep)"],glow:"rgba(142,107,255,0.35)",selectedColor:"#1E9E4A"};default:return{icon:"mdi:power",label:e("mode_off"),ring:[n,n,n],glow:"transparent",selectedColor:"var(--lg-text-primary)"}}}modeMeta(e){return{icon:{auto:"mdi:refresh-auto",heat_cool:"mdi:sun-snowflake-variant",cool:"mdi:snowflake",heat:"mdi:fire",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"}[e]??"mdi:thermostat",label:this.t(`mode_${e}`)}}actionText(){let e=this.t,t=this.entity?.attributes.hvac_action;if(this.mode==="off")return e("mode_off");switch(t){case"heating":return e("heating");case"cooling":return e("cooling");case"drying":return e("drying");case"fan":return e("fan_running");case"idle":return e("idle");default:return this.theme().label}}stateText(){let e=this.entity?.attributes??{},t=[this.actionText()];return e.current_temperature!==void 0&&t.push(`${this.t("room_temp")} ${k(this.hass,e.current_temperature,1)}\xB0`),e.current_humidity!==void 0&&t.push(`${this.t("humidity")} ${k(this.hass,e.current_humidity,0)}%`),t.join(" \xB7 ")}tileStateText(){let e=this.entity?.attributes??{},t=[this.actionText()];return e.current_humidity!==void 0&&t.push(`${this.t("humidity")} ${k(this.hass,e.current_humidity,0)}%`),t.join(" \xB7 ")}shownValue(e,t,n){return this.drag?.which===e?this.drag.value:this.pending?.[e]??t??n}valueFromPointer(e){let t=this.shadowRoot?.querySelector(".dial");if(!t)return 0;let n=t.getBoundingClientRect(),r=e.clientX-(n.left+n.width/2),o=e.clientY-(n.top+n.height/2),a=Math.atan2(o,r)*180/Math.PI;a=((a-ee)%360+360)%360,a>Q&&(a=a>Q+(360-Q)/2?0:Q);let[l,c]=this.range,u=l+a/Q*(c-l);return $(Math.round(u/this.step)*this.step,l,c)}valueFromTilePointer(e){let t=this.shadowRoot?.querySelector(".tile-track");if(!t)return this.range[0];let n=t.getBoundingClientRect(),r=n.height/2,o=$((e.clientX-n.left-r)/Math.max(n.width-r*2,1),0,1),[a,l]=this.range;return $(Math.round((a+o*(l-a))/this.step)*this.step,a,l)}stepTileTemperature(e){if(this.mode==="off")return;let t=this.entity?.attributes??{},[n,r]=this.range;if(this.isRange){let l=this.shownValue("low",t.target_temp_low,n),c=this.shownValue("high",t.target_temp_high,r),u=$(e,n-l,r-c);if(u===0)return;let h=l+u,f=c+u;this.callService("climate","set_temperature",{target_temp_low:h,target_temp_high:f}),this.hold("low",h),this.hold("high",f);return}let o=this.shownValue("single",t.temperature,n),a=$(o+e,n,r);a!==o&&(this.callService("climate","set_temperature",{temperature:a}),this.hold("single",a))}hold(e,t){this.pending={...this.pending,[e]:t},window.clearTimeout(this.pendingTimer),this.pendingTimer=window.setTimeout(()=>this.pending=void 0,_n)}settled(e,t){let n=this.pending?.[e];return n===void 0?!0:t===void 0?!1:Math.abs(t-n)<=Math.max(this.step/2,.01)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.pendingTimer)}updated(){if(!this.pending)return;let e=this.entity?.attributes??{};this.settled("single",e.temperature)&&this.settled("low",e.target_temp_low)&&this.settled("high",e.target_temp_high)&&(window.clearTimeout(this.pendingTimer),this.pending=void 0)}renderDial(e){let t=this.entity.attributes,n=this.mode==="off",r=this.t,[o,a]=this.range,l=this.shownValue("single",t.temperature,o),c=this.shownValue("low",t.target_temp_low,o),u=this.shownValue("high",t.target_temp_high,a),h=this.isRange,f=h?ee+this.ratio(c)*Q:ee,g=ee+this.ratio(h?u:l)*Q,[S,E,z]=e.ring,b=(f-ee)/Q,F=(g-ee)/Q,q=h?[c,u]:[l],G=h?k(this.hass,c,0)+"\u2013"+k(this.hass,u,0):k(this.hass,Math.floor(l),0),pe=h?"\xB0":`.${Math.round((l-Math.floor(l))*10)}\xB0`;return d`<div class="dial-row">
      <div class=${v({dial:!0,dragging:this.drag!==void 0})} @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg
          viewBox="0 0 ${te} ${te}"
          style=${x({"--ring-glow":e.glow,"--lg-ring-0":S,"--lg-ring-1":E,"--lg-ring-2":z})}
        >
          <defs>
            <!--
              Pinned across the dial rather than to the ends of the filled arc: the design
              draws it that way, and a vector that moved with the fill would swing about
              while the arc animates to its new length.
            -->
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1="0" y1=${te} x2=${te} y2="0">
              <stop offset="0" stop-color="var(--lg-ring-0)" />
              <stop offset="0.55" stop-color="var(--lg-ring-1)" />
              <stop offset="1" stop-color="var(--lg-ring-2)" />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${Si(ee,ee+Q)} />
          <!--
            The fill is the whole arc, revealed by the dash pattern. Redrawing a shorter
            path would jump between modes; a dash length interpolates.
            pathLength="1" puts the dash values in fractions of the sweep.
          -->
          <path
            class="ring-fill"
            d=${Si(ee,ee+Q)}
            pathLength="1"
            stroke="url(#ring-grad)"
            style=${x({strokeDasharray:`${Math.max(F-b,0).toFixed(4)} 1`,strokeDashoffset:(-b).toFixed(4),opacity:n?"0":"1"})}
          />
        </svg>
        ${n?p:q.map(ze=>this.renderKnobAt(ze))}
        <div class="center">
          <div class="caption">${r(h?"target_range":"target_temp")}</div>
          <div class=${v({"temp-row":!0,off:n})}>
            <span class=${v({target:!0,range:h})}>${G}</span><span class="fraction">${pe}</span>
          </div>
          ${t.current_temperature!==void 0?d`<div class="current">${r("room_temp")} ${k(this.hass,t.current_temperature,1)}°</div>`:p}
        </div>
        <div class="minmax"><span>${k(this.hass,o,0)}°</span><span>${k(this.hass,a,0)}°</span></div>
      </div>
    </div>`}renderKnobAt(e){let t=ee+this.ratio(e)*Q,[n,r]=Lt(t);return d`<div
      class="dial-knob knob"
      style=${x({left:`${(n/te*100).toFixed(3)}%`,top:`${(r/te*100).toFixed(3)}%`})}
    >${this.renderControlSurface()}</div>`}renderDetail(e,t){let n=this.entity.attributes,r=n[`${e}s`],o=n[e];return r?.length?d`<div class="detail">
      <lg-icon .icon=${t}></lg-icon>
      <div class="text">
        <span class="dl">${this.t(e==="preset_mode"?"preset":e)}</span>
        <span class="dv">${o??"\u2014"}</span>
      </div>
      <lg-icon icon="mdi:chevron-down"></lg-icon>
      <select .value=${o??""} @change=${a=>this.callService("climate",`set_${e}`,{[e]:a.target.value})}>
        ${r.map(a=>d`<option value=${a} ?selected=${a===o}>${a}</option>`)}
      </select>
    </div>`:p}tileSelectedColor(){switch(this.mode){case"heat":return"var(--lg-heat-deep)";case"cool":return"var(--lg-cool-deep)";case"dry":return"#0A7EA4";case"fan_only":return"#5C6B82";case"heat_cool":case"auto":return"#1E9E4A";default:return"var(--lg-text-primary)"}}tileModeMeta(e){let t=this.modeMeta(e);return e==="auto"?{...t,icon:"mdi:refresh"}:t}targetParts(e){let[t,n]=(Math.round(e*10)/10).toFixed(1).split(".");return{number:k(this.hass,Number(t),0),fraction:`.${n}\xB0`}}tileGradientColor(e){let t=[[0,[90,200,250]],[.35,[255,217,160]],[.62,[255,159,10]],[1,[255,45,85]]],n=Math.min(t.findIndex(([g])=>e<=g),t.length-1),[r,o]=t[Math.max(n,1)],[a,l]=t[Math.max(n-1,0)],c=$((e-a)/Math.max(r-a,.001),0,1),[u,h,f]=l.map((g,S)=>Math.round(g+(o[S]-g)*c));return`rgba(${u}, ${h}, ${f}, 0.58)`}renderCompact(e,t){let n=this.entity.attributes,r=this.mode==="off",[o,a]=this.range,l=this.shownValue("single",n.temperature,o),c=this.shownValue("low",n.target_temp_low,o),u=this.shownValue("high",n.target_temp_high,a),h=this.isRange,f=h?this.ratio(c):0,g=this.ratio(h?u:l),S=n.current_temperature,E=this.targetParts(l),z=this.tileSelectedColor();return d`${this.renderDefs()}
      <div class="glass card climate-compact">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config.icon??e.icon,e.well)}
          ${this.renderTitle(this.entityName,this.tileStateText())}
          ${this.renderBadge(e.label,e.badge)}
        </div>

        <div class="tile-readout">
          <div class=${v({"tile-target":!0,range:h,off:r})}>
            <span class="number">${h?`${k(this.hass,c,0)}\u2013${k(this.hass,u,0)}`:E.number}</span>
            <span class="fraction">${h?"\xB0":E.fraction}</span>
          </div>
          ${S===void 0?p:d`<div class="tile-room">
                <span class="caption">${this.t("room_temp")}</span>
                <span class="value">${k(this.hass,S,1)}°</span>
              </div>`}
        </div>

        <div
          class=${v({"tile-track":!0,dragging:this.drag!==void 0,off:r})}
          style=${x({"--clip-left":f<=0?"0px":`calc(var(--lg-tile-slider-size) / 2 + (100% - var(--lg-tile-slider-size)) * ${f})`,"--clip-right":g>=1?"0px":`calc(100% - var(--lg-tile-slider-size) / 2 - (100% - var(--lg-tile-slider-size)) * ${g})`})}
          role="slider"
          tabindex=${r?-1:0}
          aria-valuemin=${o}
          aria-valuemax=${a}
          aria-valuenow=${h?p:l}
          aria-valuetext=${h?`${c}\u2013${u}`:String(l)}
          aria-disabled=${r}
          @pointerdown=${this.onTileDown}
          @pointermove=${this.onTileMove}
          @pointerup=${this.onDialUp}
          @pointercancel=${this.onDialUp}
          @keydown=${this.onTileKeyDown}
        >
          <div class="tile-gradient" style=${x({opacity:r?"0":"1"})}></div>
          ${r?p:(h?[c,u]:[l]).map(b=>{let F=this.tileGradientColor(this.ratio(b));return d`<div
                    class="tile-thumb"
                    style=${x({"--value":String(this.ratio(b)),"--tile-thumb-color":F})}
                  >
                    <lg-glass-surface
                      shape="circle"
                      .palette=${[F,F,this.isDark?"#24242c":"#dedde2",this.isDark?"#24242c":"#dedde2"]}
                      .stops=${[0,.44,.56,1]}
                      .radius=${999}
                      .edge=${20}
                      .refraction=${this.refraction?10:0}
                      .blurRadius=${12}
                      .highQualityBlur=${!0}
                      .renderScale=${1.5}
                      .pixelRatioLimit=${3}
                      .highlight=${1.25}
                      .tintAlpha=${this.refraction?.28:.18}
                    ></lg-glass-surface>
                  </div>`})}
        </div>

        <div class="tile-step-controls">
          <button
            class="tile-step decrease"
            aria-label=${this.t("decrease_temp")}
            title=${this.t("decrease_temp")}
            ?disabled=${r||(h?c<=o:l<=o)}
            @click=${()=>this.stepTileTemperature(-1)}
          >−</button>
          <button
            class="tile-step increase"
            aria-label=${this.t("increase_temp")}
            title=${this.t("increase_temp")}
            ?disabled=${r||(h?u>=a:l>=a)}
            @click=${()=>this.stepTileTemperature(1)}
          >＋</button>
        </div>

        ${t.length?d`<div
              class="tile-modes"
              style=${x({"--selected-color":z,"--n":String(t.length),"--i":String(Math.max(t.indexOf(this.mode),0))})}
            >
              <div class="tile-mode-pill" style=${x({opacity:t.includes(this.mode)?"1":"0"})}>${this.renderControlSurface(void 0,"pill")}</div>
              ${t.map(b=>{let F=this.tileModeMeta(b);return d`<button
                  class=${v({selected:b===this.mode})}
                  title=${F.label}
                  aria-label=${F.label}
                  aria-pressed=${b===this.mode}
                  @click=${()=>this.callService("climate","set_hvac_mode",{hvac_mode:b})}
                >
                  <lg-icon .icon=${F.icon}></lg-icon>
                </button>`})}
            </div>`:p}

        ${this.config.show_fan_mode===!0?d`<div class=${v({details:!0,muted:r})}>${this.renderDetail("fan_mode","mdi:weather-windy")}</div>`:p}
      </div>`}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.theme(),n=this.mode==="off",r=(this.config.hvac_modes??e.attributes.hvac_modes??[]).filter(Boolean),o=this.config.show_fan_mode!==!1,a=this.config.show_preset_mode!==!1,l=this.config.show_swing_mode===!0;return this.config.design==="compact"||this.config.design==="a"?this.renderCompact(t,r):d`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config.icon??t.icon,t.well)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderBadge(t.label,t.badge)}
        </div>

        ${this.renderDial(t)}

        ${r.length?d`<div
              class="segment modes"
              style=${x({"--selected-color":t.selectedColor,"--n":String(r.length),"--i":String(Math.max(r.indexOf(this.mode),0))})}
            >
              <!--
                One pill that slides between the buttons, rather than a background that
                appears on the newly selected button and vanishes from the old one. Only a
                single element can travel; two cross-fading ones read as a blink.
                An unlisted mode leaves nothing selected, so the pill sits out.
              -->
              <div class="seg-pill" style=${x({opacity:r.includes(this.mode)?"1":"0"})}>${this.renderControlSurface(void 0,"pill")}</div>
              ${r.map(c=>{let u=this.modeMeta(c);return d`<button class=${v({selected:c===this.mode})} @click=${()=>this.callService("climate","set_hvac_mode",{hvac_mode:c})}>
                  <lg-icon .icon=${u.icon}></lg-icon><span>${u.label}</span>
                </button>`})}
            </div>`:p}

        ${o||a||l?d`<div class=${v({details:!0,muted:n})}>
              ${o?this.renderDetail("fan_mode","mdi:weather-windy"):p}
              ${a?this.renderDetail("preset_mode","mdi:creation"):p}
              ${l?this.renderDetail("swing_mode","mdi:arrow-oscillating"):p}
            </div>`:p}
      </div>`}};xe.styles=[M,T,w`
      .dial-row {
        display: flex;
        justify-content: center;
      }
      /* The SVG scales with its viewBox, so everything layered on top is positioned in
         percentages of the dial rather than in the 250px design units. */
      .dial {
        position: relative;
        width: min(${te}px, 100%);
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
        stroke-width: ${It}px;
      }
      .ring-track-stroke {
        fill: none;
        stroke: var(--lg-glass-stroke);
        stroke-width: 1px;
      }
      .ring-fill {
        fill: none;
        stroke-width: ${It}px;
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
    `],m([_()],xe.prototype,"drag",2),m([_()],xe.prototype,"pending",2);customElements.get("liquid-glass-climate-card")||customElements.define("liquid-glass-climate-card",xe);var yn=500,Ei=10,Ze=class extends C{constructor(){super(...arguments);this.heldOpen=!1;this.toggle=()=>{if(!this.config.entity)return;let e=this.config.entity.split(".")[0];["switch","light","fan","input_boolean","automation","humidifier","siren","remote"].includes(e)?this.callService(e,"toggle"):this.callService("homeassistant","toggle")};this.onPointerDown=e=>{e.button===0&&(this.heldOpen=!1,this.holdOrigin={x:e.clientX,y:e.clientY},this.holdTimer=window.setTimeout(()=>{this.heldOpen=!0,this.cancelHold(),this.openMoreInfo()},yn))};this.onPointerMove=e=>{this.holdOrigin&&(Math.abs(e.clientX-this.holdOrigin.x)>Ei||Math.abs(e.clientY-this.holdOrigin.y)>Ei)&&this.cancelHold()};this.onClick=()=>{if(this.cancelHold(),this.heldOpen){this.heldOpen=!1;return}this.toggle()};this.onKeyDown=e=>{e.key!==" "&&e.key!=="Enter"||(e.preventDefault(),this.toggle())}}static getStubConfig(e,t,n){return{entity:D(["switch","input_boolean","fan","light","automation","humidifier","siren","remote"],e,t,n)}}getCardSize(){return 1}get isOn(){return this.entity?.state==="on"}disconnectedCallback(){super.disconnectedCallback(),this.cancelHold()}cancelHold(){this.holdTimer!==void 0&&window.clearTimeout(this.holdTimer),this.holdTimer=void 0,this.holdOrigin=void 0}stateText(){let e=this.t,t=this.entity;if(this.isOn){let n=this.config.power_entity?this.hass?.states[this.config.power_entity]:void 0;if(n&&!A(n)){let r=n.attributes.unit_of_measurement??"W";return`${e("on")} \xB7 ${e("power")} ${k(this.hass,Number(n.state),0)} ${r}`}return`${e("on")} \xB7 ${e("since",{t:j(t.last_changed,e)})}`}return`${e("off")} \xB7 ${e("last_on")} ${j(t.last_changed,e)}`}defaultIcon(){let e=this.config.entity?.split(".")[0];return e==="fan"?"mdi:fan":e==="light"?"mdi:lightbulb":e==="automation"?"mdi:robot":"mdi:power-plug"}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.isOn,n=t?{from:"var(--lg-switch-accent-light)",to:"var(--lg-switch-accent)",glow:"rgba(10,132,255,0.24)"}:void 0;return d`${this.renderDefs()}
      <div
        class=${v({glass:!0,card:!0,row:!0,active:t})}
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
        ${this.renderCardSurface()}
        ${this.renderIconWell(this.config.icon??e.attributes.icon??this.defaultIcon(),n,null)}
        <div class="title">
          <div class="name">${this.entityName}</div>
          <div class="state">${this.stateText()}</div>
        </div>
      </div>`}};Ze.styles=[M,T,w`
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
    `];customElements.get("liquid-glass-switch-card")||customElements.define("liquid-glass-switch-card",Ze);var Ai=340,Re=84,Mi=5*60*1e3,De=class extends C{constructor(){super(...arguments);this.points=[];this.lastFetch=0;this.fetchedFor=""}static getStubConfig(e,t,n){return{entity:D(["sensor"],e,t,n,r=>Number.isFinite(Number(r.state)))}}getCardSize(){return this.showGraph?4:this.valueInCaption?1:2}get accent(){return this.config.accent??"#FF9F0A"}get hours(){return this.config.hours_to_show??24}get valueInCaption(){return this.config.value_in_caption===!0}get showGraph(){return this.config.graph!==!1&&!this.valueInCaption}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.maybeFetch(!0),Mi)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}updated(){this.maybeFetch(!1)}maybeFetch(e){if(!this.hass||!this.config?.entity)return;let t=`${this.config.entity}:${this.hours}`,n=Date.now()-this.lastFetch>Mi;!e&&t===this.fetchedFor&&!n||(this.fetchedFor=t,this.lastFetch=Date.now(),this.fetchHistory(this.hass,this.config.entity))}async fetchHistory(e,t){let n=new Date(Date.now()-this.hours*3600*1e3).toISOString();try{let o=(await e.callApi("GET",`history/period/${n}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes&significant_changes_only=0`))?.[0]??[],a=[];for(let c of o){let u=Number(c.state??c.s),h=c.last_changed??c.last_updated,f=h?new Date(h).getTime():(c.lu??0)*1e3;Number.isFinite(u)&&f&&a.push({t:f,v:u})}let l=Number(e.states[t]?.state);Number.isFinite(l)&&a.push({t:Date.now(),v:l}),this.points=a}catch{this.points=[]}}trend(){if(this.config.trend===!1||this.points.length<2)return;let e=this.points[this.points.length-1],t=e.t-3600*1e3,n=this.points[0];for(let r of this.points)if(r.t<=t)n=r;else break;return e.v-n.v}sparkPath(){let e=this.points;if(e.length<2)return;let t=e[0].t,n=e[e.length-1].t,r=1/0,o=-1/0;for(let g of e)r=Math.min(r,g.v),o=Math.max(o,g.v);o-r<1e-9&&(o+=1,r-=1);let a=10,l=e.map(g=>(g.t-t)/(n-t||1)*(Ai-12)),c=e.map(g=>a+(1-(g.v-r)/(o-r))*(Re-a*2)),u=`M ${l[0].toFixed(1)} ${c[0].toFixed(1)}`;for(let g=0;g<e.length-1;g++){let S=l[Math.max(0,g-1)],E=c[Math.max(0,g-1)],z=l[g],b=c[g],F=l[g+1],q=c[g+1],G=l[Math.min(e.length-1,g+2)],pe=c[Math.min(e.length-1,g+2)],ze=z+(F-S)/6,ie=b+(q-E)/6,zi=F-(G-z)/6,Ii=q-(pe-b)/6;u+=` C ${ze.toFixed(1)} ${ie.toFixed(1)}, ${zi.toFixed(1)} ${Ii.toFixed(1)}, ${F.toFixed(1)} ${q.toFixed(1)}`}let h=l[l.length-1],f=`${u} L ${h.toFixed(1)} ${Re} L ${l[0].toFixed(1)} ${Re} Z`;return{line:u,area:f,last:[h,c[c.length-1]]}}formattedValue(){let e=this.entity,t=Number(e.state);return Number.isFinite(t)?k(this.hass,t,this.config.decimals):e.state}withUnit(e,t){return t?/^[°%]/.test(t)?`${e}${t}`:`${e} ${t}`:e}subtitle(e){let t=this.t,n=e?[e]:[];if(n.push(t("updated_ago",{t:j(this.entity?.last_updated,t)})),this.config.secondary_entity){let r=this.hass?.states[this.config.secondary_entity];if(r&&!A(r)){let o=this.config.secondary_label??r.attributes.friendly_name??"";n.push(`${o} ${r.state}${r.attributes.unit_of_measurement??""}`.trim())}}return n.join(" \xB7 ")}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.t,n=this.accent,r=Number(e.state),o=Number.isFinite(r),a=this.config.decimals,l=e.attributes.unit_of_measurement??"",c=o?this.trend():void 0,u=this.showGraph?this.sparkPath():void 0,h=this.points.map(pe=>pe.v),f=h.length?Math.min(...h):void 0,g=h.length?Math.max(...h):void 0,S=this.config.icon??e.attributes.icon??(e.attributes.device_class==="humidity"?"mdi:water-percent":"mdi:thermometer"),E=(c??0)>=0,z=l==="\xB0C"||l==="\xB0F"?"\xB0":l.length<=3?l:"",b=this.valueInCaption,F=b,q=this.subtitle(F?this.withUnit(this.formattedValue(),l):void 0),G=d`
      ${this.renderIconWell(S,{from:se(n),to:n,glow:H(n,.24)})}
      ${this.renderTitle(this.entityName,q)}
      ${c!==void 0?d`<div
            class="badge trend"
            style=${x({"--badge-color":E?"var(--lg-trend-up)":"var(--lg-trend-down)","--badge-bg":E?"var(--lg-trend-up-bg)":"var(--lg-trend-down-bg)","--badge-stroke":E?"rgba(48,209,88,0.3)":"rgba(43,179,208,0.3)"})}
          >
            <lg-icon .icon=${E?"mdi:trending-up":"mdi:trending-down"}></lg-icon>
            <span>${E?"+":"\u2212"}${k(this.hass,Math.abs(c),1)}${z}</span>
          </div>`:p}`;return d`${this.renderDefs()}
      <div class=${v({glass:!0,card:!0,row:b})} style=${x({"--accent":n})}>
        ${this.renderCardSurface()}
        ${b?G:d`<div class="header">${G}</div>`}

        ${F?p:d`<div class="value-row">
              <div class="value">
                <span class="number">${o?k(this.hass,r,a):e.state}</span>
                ${l?d`<span class="unit">${l}</span>`:p}
              </div>
              ${this.showGraph&&f!==void 0&&g!==void 0?d`<div class="range">
                    <span class="caption">${this.hours===24?t("hours_24"):`${this.hours} h`}</span>
                    <span class="rv">${k(this.hass,f,a??1)} – ${k(this.hass,g,a??1)} ${l}</span>
                  </div>`:p}
            </div>`}

        ${this.showGraph?d`<svg class="spark" viewBox="0 0 ${Ai} ${Re}" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color=${n} stop-opacity="0.4" />
                    <stop offset="1" stop-color=${n} stop-opacity="0" />
                  </linearGradient>
                </defs>
                ${u?ot`<path d=${u.area} fill="url(#area)" />
                        <path class="line" d=${u.line} />
                        <circle class="dot" cx=${u.last[0]} cy=${u.last[1]} r="4.75" />`:p}
              </svg>
              <div class=${v({axis:!0})}>
                <span>${t("hours_ago",{n:this.hours})}</span>
                <span>${t("hours_ago",{n:Math.round(this.hours/2)})}</span>
                <span>${t("now")}</span>
              </div>`:p}
      </div>`}};De.styles=[M,T,w`
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
        height: var(--lg-spark, ${Re}px);
        overflow: visible;
        display: block;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-value: clamp(26px, 13.5cqi, 52px);
          --lg-value-unit: clamp(13px, 5.8cqi, 22px);
          --lg-spark: clamp(52px, 22cqi, ${Re}px);
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
    `],m([_()],De.prototype,"points",2);customElements.get("liquid-glass-sensor-card")||customElements.define("liquid-glass-sensor-card",De);var et=class extends C{static getStubConfig(i,e,t){return{entity:D(["binary_sensor"],i,e,t)}}getCardSize(){return 1}meta(){let i=this.t,e=this.entity?.attributes.device_class,t={iconOn:"mdi:checkbox-marked-circle",iconOff:"mdi:checkbox-blank-circle-outline",badgeOn:i("on"),badgeOff:i("off"),stateOn:i("on"),stateOff:i("off"),accent:"#FF9F0A",accentLight:"#FFC96B"};switch(e){case"door":case"garage_door":case"opening":return{...t,iconOn:"mdi:door-open",iconOff:"mdi:door-closed",badgeOn:i("open"),badgeOff:i("closed"),stateOn:i("is_open"),stateOff:i("is_closed")};case"window":return{...t,iconOn:"mdi:window-open-variant",iconOff:"mdi:window-closed-variant",badgeOn:i("open"),badgeOff:i("closed"),stateOn:i("is_open"),stateOff:i("is_closed")};case"motion":case"occupancy":case"presence":return{...t,iconOn:"mdi:motion-sensor",iconOff:"mdi:motion-sensor-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#7C3AED",accentLight:"#B48CFF"};case"moisture":return{...t,iconOn:"mdi:water-alert",iconOff:"mdi:water-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#0A84FF",accentLight:"#8FDBFF"};case"smoke":case"gas":case"carbon_monoxide":case"safety":case"problem":return{...t,iconOn:"mdi:alert",iconOff:"mdi:shield-check",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#FF3B30",accentLight:"#FF8A80"};case"vibration":case"sound":return{...t,iconOn:"mdi:vibrate",iconOff:"mdi:vibrate-off",badgeOn:i("detected"),badgeOff:i("clear"),stateOn:i("detecting"),stateOff:i("clear"),accent:"#7C3AED",accentLight:"#B48CFF"};case"connectivity":return{...t,iconOn:"mdi:lan-connect",iconOff:"mdi:lan-disconnect",accent:"#0A84FF",accentLight:"#8FDBFF"};case"battery":return{...t,iconOn:"mdi:battery-alert",iconOff:"mdi:battery",accent:"#FF3B30",accentLight:"#FF8A80"};case"lock":return{...t,iconOn:"mdi:lock-open-variant",iconOff:"mdi:lock",badgeOn:i("unlocked"),badgeOff:i("locked"),stateOn:i("is_unlocked"),stateOff:i("is_locked"),accent:"#FF3B30",accentLight:"#FF8A80"};default:return t}}render(){let i=this.entity;if(!i||A(i))return this.renderUnavailable();let e=i.state==="on",t=this.meta(),n=this.config.accent??t.accent,r=this.config.accent?se(this.config.accent):t.accentLight,o=this.t,a=j(i.last_changed,o),l=e?this.config.icon_on??this.config.icon??i.attributes.icon??t.iconOn:this.config.icon_off??this.config.icon??i.attributes.icon??t.iconOff,c=e?{from:r,to:n,glow:H(n,.24)}:void 0,u=e?{color:n==="#7C3AED"?"#A66BFF":n,bg:H(n,.18),stroke:H(n,.3)}:void 0,h=e?`${t.stateOn} \xB7 ${o("since",{t:a})}`:`${t.stateOff} \xB7 ${o("last_change",{t:a})}`;return d`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderCardSurface()}
        ${this.renderIconWell(l,c)}
        ${this.renderTitle(this.entityName,h)}
        ${this.renderBadge(e?this.config.label_on??t.badgeOn:this.config.label_off??t.badgeOff,u)}
      </div>`}};et.styles=[M,T,w``];customElements.get("liquid-glass-binary-sensor-card")||customElements.define("liquid-glass-binary-sensor-card",et);var Nt=64,we=0,_e=class extends C{constructor(){super(...arguments);this.pending=!1;this.onDown=e=>{this.jammed||this.busy||e.button!==0||(e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),this.dragRatio=this.ratioFromEvent(e))};this.onMove=e=>{this.dragRatio!==void 0&&(this.dragRatio=this.ratioFromEvent(e))};this.onUp=e=>{if(this.dragRatio===void 0)return;let t=this.ratioFromEvent(e);this.dragRatio=void 0,this.isLocked&&t>=.8?this.trigger("unlock"):!this.isLocked&&t<=.2&&this.trigger("lock")}}static getStubConfig(e,t,n){return{entity:D(["lock"],e,t,n)}}getCardSize(){return 2}get lockState(){return this.entity?.state??"unknown"}get isLocked(){return this.lockState==="locked"||this.lockState==="locking"}get busy(){return this.pending||this.lockState==="locking"||this.lockState==="unlocking"}get jammed(){return this.lockState==="jammed"}visual(){let e=this.t,t=this.entity,n=j(t.last_changed,e);return this.jammed?{icon:"mdi:alert",well:{from:"#FFE66B",to:"var(--lg-warn-deep)",glow:"rgba(255,214,10,0.24)"},badge:{color:"var(--lg-warn-text)",bg:"rgba(255,214,10,0.24)",stroke:"rgba(230,168,0,0.3)",glow:"var(--lg-warn)"},badgeLabel:e("jammed"),thumbColor:"var(--lg-warn-text)",hint:e("cannot_operate"),state:e("jammed_state")}:this.isLocked?{icon:"mdi:lock",well:{from:"#7EE8A0",to:"var(--lg-lock-locked-deep)",glow:"rgba(48,209,88,0.24)"},badge:{color:"var(--lg-lock-locked-deep)",bg:"rgba(30,158,74,0.18)",stroke:"rgba(30,158,74,0.3)"},badgeLabel:e("locked"),thumbColor:"var(--lg-lock-locked-deep)",hint:e("slide_to_unlock"),state:this.lockState==="locking"?e("locking"):`${e("is_locked")} \xB7 ${e("auto_locked_at",{t:Ae(t.last_changed)})}`}:{icon:"mdi:lock-open-variant",well:{from:"var(--lg-lock-unlocked)",to:"var(--lg-lock-unlocked-deep)",glow:"rgba(255,59,48,0.24)"},badge:{color:"var(--lg-lock-unlocked-deep)",bg:"rgba(255,59,48,0.18)",stroke:"rgba(255,59,48,0.3)"},badgeLabel:e("unlocked"),thumbColor:"var(--lg-lock-unlocked-deep)",hint:e("slide_to_lock"),state:this.lockState==="unlocking"?e("unlocking"):`${e("is_unlocked")} \xB7 ${n}`}}ratioFromEvent(e){let t=this.shadowRoot?.querySelector(".slide");if(!t)return 0;let n=t.getBoundingClientRect(),r=this.shadowRoot?.querySelector(".thumb")?.offsetWidth||Nt,o=n.width-we*2-r;return o<=0?0:$((e.clientX-n.left-we-r/2)/o,0,1)}trigger(e){this.pending=!0,this.callService("lock",e),window.setTimeout(()=>this.pending=!1,4e3)}runButton(e){let[t,n]=e.service.split(".");this.hass?.callService(t,n,{entity_id:this.config.entity,...e.data??{}})}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.visual(),n=this.isLocked,r=this.dragRatio!==void 0,o=r?this.dragRatio:n?0:1,a=r?1-Math.abs(o-(n?0:1))*1.6:1,l=this.config.buttons??[];return d`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(this.config.icon??t.icon,t.well)}
          ${this.renderTitle(this.entityName,t.state)}
          ${this.renderBadge(t.badgeLabel,t.badge)}
        </div>

        <div
          class=${v({slide:!0,disabled:this.jammed||this.busy})}
          @pointerdown=${this.onDown}
          @pointermove=${this.onMove}
          @pointerup=${this.onUp}
          @pointercancel=${this.onUp}
        >
          <div class="hint" style=${x({opacity:String($(a,0,1))})}>
            ${!n&&!this.jammed?d`<lg-icon icon="mdi:chevron-double-left"></lg-icon>`:p}
            <span>${t.hint}</span>
            ${n&&!this.jammed?d`<lg-icon icon="mdi:chevron-double-right"></lg-icon>`:p}
          </div>
          <div
            class=${v({thumb:!0,dragging:r})}
            style=${x({left:`calc(${we}px + (100% - ${we*2}px - var(--thumb)) * ${o})`,"--thumb-color":t.thumbColor})}
          >
            ${this.renderControlSurface()}
            <lg-icon .icon=${t.icon}></lg-icon>
          </div>
        </div>

        ${l.length?d`<div class="chips">
              ${l.map(c=>d`<button class="chip" @click=${()=>this.runButton(c)}>
                  ${this.renderControlSurface(void 0,"pill")}
                  ${c.icon?d`<lg-icon .icon=${c.icon}></lg-icon>`:p}<span>${c.name}</span>
                </button>`)}
            </div>`:p}
      </div>`}};_e.styles=[M,T,w`
      .card {
        gap: 16px;
      }
      .slide {
        --thumb: ${Nt}px;
        position: relative;
        height: calc(var(--thumb) + ${we*2}px);
        border-radius: 999px;
        padding: ${we}px;
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
        top: ${we}px;
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
          --thumb: clamp(40px, 16.8cqi, ${Nt}px);
        }
        .card {
          --lg-hint: clamp(11.5px, 3.7cqi, 14px);
        }
      }
    `],m([_()],_e.prototype,"dragRatio",2),m([_()],_e.prototype,"pending",2);customElements.get("liquid-glass-lock-card")||customElements.define("liquid-glass-lock-card",_e);var Ut={OPEN:1,CLOSE:2,SET_POSITION:4,STOP:8,SET_TILT:128},Ti=180,ye=class extends C{constructor(){super(...arguments);this.dragSide="left";this.onDown=e=>{if(!this.canSetPosition||e.button!==0)return;e.preventDefault();let t=e.currentTarget;t.setPointerCapture(e.pointerId);let n=t.getBoundingClientRect();this.dragSide=e.clientX<n.left+n.width/2?"left":"right",this.dragPos=this.posFromEvent(e)};this.onMove=e=>{this.dragPos!==void 0&&(this.dragPos=this.posFromEvent(e))};this.onUp=e=>{if(this.dragPos===void 0)return;let t=this.posFromEvent(e);this.dragPos=void 0,this.callService("cover","set_cover_position",{position:t})}}static getStubConfig(e,t,n){return{entity:D(["cover"],e,t,n,r=>!!((r.attributes.supported_features??0)&Ut.SET_POSITION))}}getCardSize(){return 4}get position(){if(this.dragPos!==void 0)return this.dragPos;let e=this.entity?.attributes.current_position;return e!==void 0?e:this.entity?.state==="closed"?0:100}get styleKind(){return this.config.style?this.config.style:this.entity?.attributes.device_class==="curtain"?"curtain":"blind"}get curtainKind(){return this.config.curtain??"double"}get moving(){let e=this.entity?.state;return e==="opening"||e==="closing"?e:void 0}get canSetPosition(){return Z(this.entity,Ut.SET_POSITION)}get hasTilt(){return this.config.show_tilt===!1?!1:Z(this.entity,Ut.SET_TILT)&&this.entity?.attributes.current_tilt_position!==void 0}stateText(){let e=this.t,t=this.entity,n=this.position;return this.moving?`${e(this.moving)} \xB7 ${n}% \u2192 ${this.moving==="opening"?100:0}%`:t.state==="closed"||n===0?`${e("is_closed")} \xB7 ${e("last_change",{t:Ae(t.last_changed)})}`:`${e("position")} ${n}% \xB7 ${e("stopped")}`}posFromEvent(e){let t=this.shadowRoot?.querySelector(".track");if(!t)return this.position;let n=t.getBoundingClientRect(),r;return this.styleKind==="blind"?r=(e.clientY-n.top)/n.height:this.curtainKind==="single"?r=(e.clientX-n.left)/n.width:r=2*(this.dragSide==="right"?n.right-e.clientX:e.clientX-n.left)/n.width,Math.round($(1-r,0,1)*100)}renderTrackVisual(e){let t=1-e/100;if(this.styleKind==="blind"){let r=`${t*100}%`;return d`<div class="fabric" style=${x({height:r})}>
          ${[0,1,2,3,4].map(()=>d`<span></span>`)}
        </div>
        ${e>0?d`<div class="handle h" style=${x({top:`max(4px, calc(${r} - 13px))`})}></div>`:p}`}if(this.curtainKind==="single")return d`<div class="panel left" style=${x({width:`${t*100}%`})}>
          ${[0,1,2].map(()=>d`<span></span>`)}
        </div>
        <div class="handle v" style=${x({left:`calc(${t*100}% - 13px)`})}></div>`;let n=`${t*100/2}%`;return d`<div class="panel left" style=${x({width:n})}>${[0,1,2].map(()=>d`<span></span>`)}</div>
      <div class="panel right" style=${x({width:n})}>${[0,1,2].map(()=>d`<span></span>`)}</div>
      <div class="handle v" style=${x({left:`calc(${n} - 13px)`})}></div>
      <div class="handle v" style=${x({right:`calc(${n} - 13px)`})}></div>`}buttonIcons(){return this.styleKind==="curtain"?this.curtainKind==="double"?["mdi:arrow-expand-horizontal","mdi:arrow-collapse-horizontal"]:["mdi:chevron-double-left","mdi:chevron-double-right"]:["mdi:chevron-up","mdi:chevron-down"]}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=this.t,n=this.position,r=n===0&&!this.moving,o=this.moving,a=this.styleKind==="curtain",[l,c]=this.buttonIcons(),u=r?void 0:{from:"#8FE3F4",to:"var(--lg-cover-accent-deep)",glow:"rgba(43,179,208,0.24)"},h=r?void 0:{color:"var(--lg-cover-badge)",bg:"rgba(43,179,208,0.18)",stroke:"rgba(43,179,208,0.3)"},f=t(o?"moving":r?"closed":"open"),g=this.config.icon??e.attributes.icon??(a?"mdi:curtains":"mdi:blinds-horizontal"),S=o?`${t(o)}\u2026`:t(r?"is_closed":"is_open"),E=a&&this.curtainKind==="single",z=r||!a&&o==="opening"&&n<60,b=!a&&o==="opening"&&n<60&&!r,F=this.tiltPreview??e.attributes.current_tilt_position??50,q=Math.round(F/100*180-90);return d`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        <div class="header">
          ${this.renderIconWell(g,u)}
          ${this.renderTitle(this.entityName,this.stateText())}
          ${this.renderBadge(f,h)}
        </div>

        <div class="position-row">
          <div class="track" @pointerdown=${this.onDown} @pointermove=${this.onMove} @pointerup=${this.onUp} @pointercancel=${this.onUp}>
            ${this.renderTrackVisual(n)}
            <div
              class=${v({overlay:!0,center:a&&!E,right:E,top:b})}
              style=${x(z?{"--pv-color":"#0B3A46","--pc-color":"rgba(11,58,70,0.7)"}:{})}
            >
              <span class="pv">${n}%</span>
              <span class="pc">${S}</span>
            </div>
          </div>
          <div class="buttons">
            <button class=${v({"round-btn":!0,active:o==="opening"})} @click=${()=>this.callService("cover","open_cover")} title="Open">
              <lg-icon .icon=${l}></lg-icon>
            </button>
            <button class=${v({"round-btn":!0,stop:!0,selected:!!o})} @click=${()=>this.callService("cover","stop_cover")} title="Stop">
              <lg-icon icon="mdi:square-outline"></lg-icon>
            </button>
            <button class=${v({"round-btn":!0,active:o==="closing"})} @click=${()=>this.callService("cover","close_cover")} title="Close">
              <lg-icon .icon=${c}></lg-icon>
            </button>
          </div>
        </div>

        ${this.hasTilt?d`<div class="section tilt">
              <div class="label-row"><span class="label">${t("tilt")}</span><span class="value">${q}°</span></div>
              <lg-slider
                variant="thumb"
                .refraction=${this.refraction}
                .shaderPalette=${["#72d4ef","#dce5ec","#79d6e8","#33515b"]}
                .value=${F}
                min="0"
                max="100"
                step="1"
                .fillFrom=${.5}
                .showFill=${!r}
                @lg-input=${G=>this.tiltPreview=G.detail.value}
                @lg-change=${G=>{this.tiltPreview=void 0,this.callService("cover","set_cover_tilt_position",{tilt_position:Math.round(G.detail.value)})}}
              ></lg-slider>
              <div class="ticks"><span>−90°</span><span>0°</span><span>90°</span></div>
            </div>`:p}
      </div>`}};ye.styles=[M,T,w`
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
        height: var(--lg-track-h, ${Ti}px);
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
          --lg-track-h: clamp(120px, 47cqi, ${Ti}px);
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
    `],m([_()],ye.prototype,"dragPos",2),m([_()],ye.prototype,"tiltPreview",2);customElements.get("liquid-glass-cover-card")||customElements.define("liquid-glass-cover-card",ye);var $e={PAUSE:1,SEEK:2,VOLUME_SET:4,PREVIOUS:16,NEXT:32,PLAY:16384,SHUFFLE:32768,REPEAT:262144};function Fi(s){let i=Math.max(0,Math.round(s)),e=Math.floor(i/3600),t=Math.floor(i%3600/60),n=i%60;return e?`${e}:${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`:`${t}:${String(n).padStart(2,"0")}`}var de=class extends C{constructor(){super(...arguments);this.tick=0;this.playPause=()=>{this.playState==="idle"&&!Z(this.entity,$e.PLAY)||this.callService("media_player","media_play_pause")}}static getStubConfig(e,t,n){return{entity:D(["media_player"],e,t,n)}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>{this.entity?.state==="playing"&&this.tick++},1e3)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}get playState(){let e=this.entity?.state;return e==="playing"||e==="buffering"?"playing":e==="paused"?"paused":"idle"}position(){let e=this.entity?.attributes??{},t=e.media_duration,n=e.media_position;if(!(!t||n===void 0))return this.playState==="playing"&&e.media_position_updated_at&&(n+=(Date.now()-new Date(e.media_position_updated_at).getTime())/1e3),this.tick,{pos:$(n,0,t),duration:t}}render(){let e=this.entity;if(!e||A(e))return this.renderUnavailable();let t=e.attributes,n=this.t,r=this.playState,o=r==="idle",a=this.config.source_color??"#FF375F",l=o?void 0:t.entity_picture,c=o?n("not_playing"):t.media_title??e.attributes.friendly_name??"",u=[t.media_artist,t.media_album_name].filter(Boolean),h=o?n("standby"):u.join(" \u2014 ")||(t.source??""),f=t.app_name??t.source,g=this.position(),S=this.seekPreview??(g?g.pos/g.duration:0),E=g?this.seekPreview!==void 0?this.seekPreview*g.duration:g.pos:0,z=g?g.duration-E:0,b=this.volumePreview??t.volume_level??.5,F=!!t.shuffle,q=t.repeat??"off",G=Z(e,$e.SEEK)&&!!g&&!o,pe=this.config.show_volume!==!1&&Z(e,$e.VOLUME_SET),ze=this.config.show_device!==!1;return d`${this.renderDefs()}
      <div class="glass card" style=${x({"--source-color":a})}>
        ${this.renderCardSurface()}
        ${ze?d`<div class="device" @click=${this.openMoreInfo}><lg-icon icon="mdi:speaker"></lg-icon><span>${this.entityName}</span></div>`:p}

        <div class="header">
          <div class=${v({art:!0,idle:!l})} style=${l?x({backgroundImage:`url("${l}")`}):p} @click=${this.openMoreInfo}>
            ${l?p:d`<lg-icon icon="mdi:music"></lg-icon>`}
          </div>
          <div class="title" @click=${this.openMoreInfo}>
            <div class="name">${c}</div>
            <div class="state">${h}</div>
            ${r==="paused"?d`<div class="source muted-text"><lg-icon icon="mdi:pause"></lg-icon><span>${n("paused")}</span></div>`:!o&&f?d`<div class="source"><lg-icon icon="mdi:waveform"></lg-icon><span>${f}</span></div>`:p}
          </div>
          <button class="more" @click=${this.openMoreInfo} title="More"><lg-icon icon="mdi:dots-horizontal"></lg-icon></button>
        </div>

        <div class=${v({progress:!0,dim:o})}>
          <lg-slider
            variant="thin"
            .value=${o?.003:S}
            min="0"
            max="1"
            .disabled=${!G}
            @lg-input=${ie=>this.seekPreview=ie.detail.value}
            @lg-change=${ie=>{this.seekPreview=void 0,g&&this.callService("media_player","media_seek",{seek_position:Math.round(ie.detail.value*g.duration)})}}
          ></lg-slider>
          <div class="times"><span>${g?Fi(E):"0:00"}</span><span>−${g?Fi(z):"0:00"}</span></div>
        </div>

        <div class="transport">
          <button class=${v({aux:!0,on:F,fade:o})} ?disabled=${!Z(e,$e.SHUFFLE)} @click=${()=>this.callService("media_player","shuffle_set",{shuffle:!F})} title="Shuffle">
            <lg-icon icon="mdi:shuffle-variant"></lg-icon>
          </button>
          <button class=${v({skip:!0,fade:o})} ?disabled=${!Z(e,$e.PREVIOUS)} @click=${()=>this.callService("media_player","media_previous_track")} title="Previous">
            <lg-icon icon="mdi:skip-previous-outline"></lg-icon>
          </button>
          <button class=${v({play:!0})} @click=${this.playPause} title="Play / Pause" style=${o?"color: var(--lg-text-secondary)":""}>
            ${this.renderControlSurface()}
            <lg-icon .icon=${r==="playing"?"mdi:pause":"mdi:play-outline"}></lg-icon>
          </button>
          <button class=${v({skip:!0,fade:o})} ?disabled=${!Z(e,$e.NEXT)} @click=${()=>this.callService("media_player","media_next_track")} title="Next">
            <lg-icon icon="mdi:skip-next-outline"></lg-icon>
          </button>
          <button class=${v({aux:!0,on:q!=="off",fade:o})} ?disabled=${!Z(e,$e.REPEAT)} @click=${()=>this.callService("media_player","repeat_set",{repeat:q==="off"?"all":q==="all"?"one":"off"})} title="Repeat">
            <lg-icon .icon=${q==="one"?"mdi:repeat-once":"mdi:repeat"}></lg-icon>
          </button>
        </div>

        ${pe?d`<div class=${v({volume:!0,muted:o})}>
              <lg-icon icon="mdi:volume-low"></lg-icon>
              <lg-slider
                variant="thin"
                .refraction=${this.refraction}
                .shaderPalette=${["#f2f2f5","#f2f2f5",this.isDark?"#44424c":"#d8d6dc",this.isDark?"#44424c":"#d8d6dc"]}
                .showThumb=${!0}
                .value=${b}
                min="0"
                max="1"
                step="0.01"
                @lg-input=${ie=>this.volumePreview=ie.detail.value}
                @lg-change=${ie=>{this.volumePreview=void 0,this.callService("media_player","volume_set",{volume_level:Math.round(ie.detail.value*100)/100})}}
              ></lg-slider>
              <lg-icon icon="mdi:volume-high"></lg-icon>
            </div>`:p}
      </div>`}};de.styles=[M,T,w`
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
    `],m([_()],de.prototype,"tick",2),m([_()],de.prototype,"seekPreview",2),m([_()],de.prototype,"volumePreview",2);customElements.get("liquid-glass-media-card")||customElements.define("liquid-glass-media-card",de);var $n={"clear-night":{icon:"mdi:weather-night",color:"#9AB6FF"},cloudy:{icon:"mdi:weather-cloudy",color:"#A0AEC0"},exceptional:{icon:"mdi:alert-circle-outline",color:"#FF9F0A"},fog:{icon:"mdi:weather-fog",color:"#A0AEC0"},hail:{icon:"mdi:weather-hail",color:"#8FD6FF"},lightning:{icon:"mdi:weather-lightning",color:"#FFD60A"},"lightning-rainy":{icon:"mdi:weather-lightning-rainy",color:"#FFD60A"},partlycloudy:{icon:"mdi:weather-partly-cloudy",night:"mdi:weather-night-partly-cloudy",color:"#FFB340"},pouring:{icon:"mdi:weather-pouring",color:"#5AC8FA"},rainy:{icon:"mdi:weather-rainy",color:"#5AC8FA"},snowy:{icon:"mdi:weather-snowy",color:"#BFE3FF"},"snowy-rainy":{icon:"mdi:weather-snowy-rainy",color:"#8FD6FF"},sunny:{icon:"mdi:weather-sunny",color:"#FFB340"},windy:{icon:"mdi:weather-windy",color:"#A0AEC0"},"windy-variant":{icon:"mdi:weather-windy-variant",color:"#A0AEC0"}},kn={icon:"mdi:weather-cloudy",color:"#A0AEC0"},Ri=15*60*1e3,ke=class extends C{constructor(){super(...arguments);this.daily=[];this.hourly=[];this.lastFetch=0;this.fetchedFor=""}static getStubConfig(e,t,n){return{entity:D(["weather"],e,t,n)}}get isRow(){return this.config?.layout==="row"}getCardSize(){if(this.isRow)return 1;let e=3;return this.config?.show_hourly!==!1&&(e+=1),this.config?.show_daily!==!1&&(e+=2),this.config?.show_metrics!==!1&&(e+=1),e}connectedCallback(){super.connectedCallback(),this.timer=window.setInterval(()=>this.maybeFetch(!0),Ri)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}updated(){this.maybeFetch(!1)}maybeFetch(e){if(!this.hass||!this.config?.entity)return;let t=Date.now()-this.lastFetch>Ri;!e&&this.config.entity===this.fetchedFor&&!t||(this.fetchedFor=this.config.entity,this.lastFetch=Date.now(),this.fetchForecasts(this.hass,this.config.entity))}async fetchForecasts(e,t){let n=["daily"];!this.isRow&&this.config.show_hourly!==!1&&n.push("hourly");for(let r of n){let o=[];try{o=((await e.callService("weather","get_forecasts",{type:r},{entity_id:t},!1,!0))?.response??{})[t]?.forecast??[]}catch{o=e.states[t]?.attributes.forecast??[]}r==="daily"?this.daily=o:this.hourly=o}}get isNight(){let e=this.hass?.states["sun.sun"];return e?e.state==="below_horizon":this.entity?.state==="clear-night"}look(e){let t=$n[e??""]??kn;return this.isNight&&t.night?{...t,icon:t.night,color:"#9AB6FF"}:t}conditionLabel(e){return e?this.t(`wx_${e}`):""}get locale(){return this.config.language??this.hass?.locale?.language??this.hass?.language??"en"}temp(e){return e===void 0?"\u2013":`${k(this.hass,e,0)}\xB0`}hourLabel(e,t){if(t===0)return this.t("wx_now");try{return new Intl.DateTimeFormat(this.locale,{hour:"numeric"}).format(new Date(e))}catch{return""}}dayLabel(e,t){if(t===0)return this.t("wx_today");if(t===1)return this.t("wx_tomorrow");try{return new Intl.DateTimeFormat(this.locale,{weekday:"short"}).format(new Date(e))}catch{return""}}renderCurrent(){let e=this.entity,t=e.attributes,n=this.look(e.state),r=this.daily[0],o=r?.temperature,a=r?.templow;return d`<div class="current">
      <div class="now" @click=${this.openMoreInfo}>
        <div class="city">${this.entityName}</div>
        <div class="condition">${this.conditionLabel(e.state)}</div>
        <div class="temp-row">
          <span class="temp">${k(this.hass,t.temperature??0,0)}</span><span class="deg">°</span>
        </div>
        ${o!==void 0||a!==void 0?d`<div class="hilo">
              ${o!==void 0?d`<span class="hi">${this.t("wx_high")} ${this.temp(o)}</span>`:p}
              ${a!==void 0?d`<span class="lo">${this.t("wx_low")} ${this.temp(a)}</span>`:p}
            </div>`:p}
      </div>
      <div class="big-icon" style=${x({"--wx-color":n.color,"--wx-glow":H(n.color,.4)})}>
        <lg-icon .icon=${this.config.icon??n.icon}></lg-icon>
      </div>
    </div>`}renderHourly(){let e=$(this.config.hourly_count??6,2,12),t=this.hourly.slice(0,e);return t.length?d`<div class="hourly">
      ${t.map((n,r)=>{let o=this.look(n.condition);return d`<div class=${v({hour:!0,now:r===0})} style=${x({"--wx-color":o.color})}>
          <span class="time">${this.hourLabel(n.datetime,r)}</span>
          <lg-icon .icon=${o.icon}></lg-icon>
          <span class="t">${this.temp(n.temperature)}</span>
        </div>`})}
    </div>`:p}renderDaily(){let e=$(this.config.daily_count??4,1,10),t=this.daily.slice(0,e);if(!t.length)return p;let n=t.map(c=>c.templow??c.temperature).filter(c=>c!==void 0),r=t.map(c=>c.temperature).filter(c=>c!==void 0),o=Math.min(...n,...r),l=Math.max(...n,...r)-o||1;return d`<div class="daily">
      ${t.map((c,u)=>{let h=this.look(c.condition),f=c.templow??c.temperature,g=c.temperature,S=f===void 0?0:(f-o)/l*100,E=f===void 0||g===void 0?100:Math.max((g-f)/l*100,6);return d`<div class=${v({day:!0,today:u===0})} style=${x({"--wx-color":h.color})}>
          <span class="label">${this.dayLabel(c.datetime,u)}</span>
          <lg-icon .icon=${h.icon}></lg-icon>
          <span class="lo">${this.temp(f)}</span>
          <div class="bar"><span style=${x({left:`${S}%`,width:`${E}%`})}></span></div>
          <span class="hi">${this.temp(g)}</span>
        </div>`})}
    </div>`}renderMetrics(){let e=this.entity.attributes,t=this.t,n=e.humidity,r=e.wind_speed,o=e.wind_speed_unit??"",a=this.hourly[0]?.precipitation_probability??this.daily[0]?.precipitation_probability,l=this.hourly[0]?.precipitation??this.daily[0]?.precipitation,u=[n===void 0?void 0:["mdi:water-percent",t("humidity"),`${k(this.hass,n,0)}%`],r===void 0?void 0:["mdi:weather-windy",t("wx_wind"),`${k(this.hass,r,1)} ${o}`.trim()],a!==void 0?["mdi:weather-rainy",t("wx_precip"),`${k(this.hass,a,0)}%`]:l!==void 0?["mdi:weather-rainy",t("wx_precip"),`${k(this.hass,l,1)} mm`]:void 0].filter(h=>h!==void 0);return u.length?d`<div class="metrics">
      ${u.map(([h,f,g])=>d`<div class="metric">
          <div class="head"><lg-icon .icon=${h}></lg-icon><span>${f}</span></div>
          <div class="v">${g}</div>
        </div>`)}
    </div>`:p}renderRow(){let e=this.entity,t=e.attributes,n=this.look(e.state),r=this.daily[0],o=[this.conditionLabel(e.state)];return r?.temperature!==void 0&&o.push(`${this.t("wx_high")} ${this.temp(r.temperature)}`),r?.templow!==void 0&&o.push(`${this.t("wx_low")} ${this.temp(r.templow)}`),d`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderCardSurface()}
        <div class="big-icon" style=${x({"--wx-color":n.color,"--wx-glow":H(n.color,.4)})}>
          <lg-icon .icon=${this.config.icon??n.icon}></lg-icon>
        </div>
        <div class="title" @click=${this.openMoreInfo}>
          <div class="name">${this.entityName}</div>
          <div class="state">${o.filter(Boolean).join(" \xB7 ")}</div>
        </div>
        <div class="temp-row">
          <span class="temp">${k(this.hass,t.temperature??0,0)}</span><span class="deg">°</span>
        </div>
      </div>`}render(){let e=this.entity;return!e||A(e)?this.renderUnavailable():this.isRow?this.renderRow():d`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        ${this.renderCurrent()}
        ${this.config.show_hourly===!1?p:this.renderHourly()}
        ${this.config.show_daily===!1?p:this.renderDaily()}
        ${this.config.show_metrics===!1?p:this.renderMetrics()}
      </div>`}};ke.styles=[M,T,w`
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
    `],m([_()],ke.prototype,"daily",2),m([_()],ke.prototype,"hourly",2);customElements.get("liquid-glass-weather-card")||customElements.define("liquid-glass-weather-card",ke);var Cn=900,Pe=class extends C{static getStubConfig(i,e,t){return{scenes:([e,t,Object.keys(i?.states??{})].find(r=>r?.some(o=>o.startsWith("scene.")))?.filter(r=>r.startsWith("scene.")).slice(0,6)??["scene.example"]).map(r=>({entity:r}))}}getCardSize(){return 1+Math.ceil(this.items.length/this.columns)*(this.config?.style==="chips"?1:2)}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this.pressTimer)}get items(){return this.config.scenes??[]}get columns(){return $(Math.round(this.config.columns??3),1,6)}label(i){if(i.name)return i.name;let e=i.entity?this.hass?.states[i.entity]:void 0;return lt(e,i.entity??"")}iconFor(i){if(i.icon)return i.icon;let t=(i.entity?this.hass?.states[i.entity]:void 0)?.attributes.icon;if(t)return t;let n=i.entity?.split(".")[0]??"";return be[n]?.icon??"mdi:palette"}wellFor(i,e){return Bt(i.accent,oe[e%oe.length])}activate(i,e){let t=i.entity?.split(".")[0]??"",n=i.service??be[t]?.service;if(n){let[r,o]=n.split(".");this.hass?.callService(r,o,{...i.entity?{entity_id:i.entity}:{},...i.service_data??{}})}this.pressed=e,window.clearTimeout(this.pressTimer),this.pressTimer=window.setTimeout(()=>this.pressed=void 0,Cn)}renderTile(i,e){let t=this.wellFor(i,e);return d`<button
      class=${v({tile:!0,on:this.pressed===e})}
      style=${x({"--from":t.from,"--to":t.to,"--glow":t.glow,"--glow-strong":H(t.to,.6)})}
      @click=${()=>this.activate(i,e)}
    >
      <span class="well"><lg-icon .icon=${this.iconFor(i)}></lg-icon></span>
      <span class="label">${this.label(i)}</span>
    </button>`}renderChip(i,e){return d`<button class=${v({chip:!0,on:this.pressed===e})} @click=${()=>this.activate(i,e)}>
      ${this.renderControlSurface(void 0,"pill")}
      ${i.icon?d`<lg-icon .icon=${i.icon}></lg-icon>`:p}<span>${this.label(i)}</span>
    </button>`}render(){let i=this.items;if(!i.length)return this.renderUnavailable();let e=this.config.style==="chips",t=this.config.title;return d`${this.renderDefs()}
      <div class=${v({glass:!0,card:!0,chips:e})}>
        ${this.renderCardSurface()}
        ${t||this.config.show_count?d`<div class="head">
              <span class="heading">${t??""}</span>
              ${this.config.show_count?d`<span class="count">${this.t("scene_count",{n:i.length})}</span>`:p}
            </div>`:p}
        <div class="grid" style=${x({"--cols":String(this.columns)})}>
          ${i.map((n,r)=>e?this.renderChip(n,r):this.renderTile(n,r))}
        </div>
      </div>`}};Pe.styles=[M,T,w`
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
    `],m([_()],Pe.prototype,"pressed",2);customElements.get("liquid-glass-scene-card")||customElements.define("liquid-glass-scene-card",Pe);var Sn=10,Be=class extends C{constructor(){super(...arguments);this.tick=0;this.openSnapshot=()=>{let e=this.config.snapshot_service;if(e){let[n,r]=e.split(".");this.hass?.callService(n,r,{entity_id:this.config.entity});return}let t=this.entity?.attributes.entity_picture;t&&window.open(t,"_blank","noopener")};this.callMic=()=>{let e=this.config.mic_service;if(!e)return;let[t,n]=e.split(".");this.hass?.callService(t,n,{entity_id:this.config.entity})}}static getStubConfig(e,t,n){return{entity:D(["camera"],e,t,n)}}getCardSize(){return this.config?.show_actions===!1?4:5}connectedCallback(){super.connectedCallback();let e=Math.max(this.config?.refresh_interval??Sn,1);this.timer=window.setInterval(()=>this.tick++,e*1e3)}disconnectedCallback(){super.disconnectedCallback(),this.timer&&window.clearInterval(this.timer)}get streaming(){return this.entity?.state==="streaming"}get stillUrl(){let e=this.entity?.attributes.entity_picture;if(e)return`${e}${e.includes("?")?"&":"?"}_=${this.tick}`}renderMotion(){let e=this.config.motion_entity;if(!e)return p;let t=this.hass?.states[e];if(!t)return p;let n=this.t,r=t.state==="on",o=r?{"--chip-bg":"rgba(255, 159, 10, 0.18)","--chip-stroke":"rgba(255, 159, 10, 0.3)","--chip-label":"var(--lg-motion-label)","--chip-dot":"#E08600","--chip-glow":"#FF9F0A"}:{},a=r?`${n("cam_motion")} \xB7 ${j(t.last_changed,n)}`:n("cam_no_motion");return d`<div class="motion" style=${x(o)}><span class="dot"></span><span>${a}</span></div>`}render(){let e=this.entity;if(!e)return this.renderUnavailable();let t=this.t,n=A(e),r=n?void 0:this.stillUrl;return d`${this.renderDefs()}
      <div
        class=${v({glass:!0,card:!0,offline:n})}
        style=${x({"--lg-cam-ratio":String(this.config.aspect_ratio??16/9)})}
      >
        ${this.renderCardSurface()}
        <div class="feed" style=${r?x({backgroundImage:`url("${r}")`}):p}>
          <div class="scrim"></div>

          <div class="bar top">
            ${n?d`<span></span>`:d`<span
                  class="live float"
                  style=${x(this.streaming?{"--dot":"#FF453A","--dot-glow":"#FF453A"}:{"--dot":"#8E8E93"})}
                  >${this.renderControlSurface(["#15151b","#34343e"],"pill")}<span class="dot"></span><span class="live-label">${t(this.streaming?"cam_live":"cam_still")}</span></span
                >`}
            <div class=${v({trail:!0,dimmed:n})}>
              ${this.config.show_mic?d`<button class="round float" @click=${this.callMic} title=${t("cam_mic")}>
                    ${this.renderControlSurface(["#15151b","#34343e"])}
                    <lg-icon icon="mdi:microphone-off"></lg-icon>
                  </button>`:p}
              <button class="round float" @click=${this.openMoreInfo} title=${t("cam_expand")}>
                ${this.renderControlSurface(["#15151b","#34343e"])}
                <lg-icon icon="mdi:arrow-expand"></lg-icon>
              </button>
            </div>
          </div>

          ${n?d`<div class="nosignal">
                <lg-icon icon="mdi:video-off"></lg-icon><span>${t("cam_no_signal")}</span>
              </div>`:p}

          <div class="bar bottom">
            <div class="name" @click=${this.openMoreInfo}>
              <span class="who">${this.entityName}</span>
              <span class="when">${n?t("cam_offline_state"):j(e.last_updated,t)}</span>
            </div>
            <button class=${v({round:!0,big:!0,float:!0,dimmed:n})} @click=${this.openSnapshot} title=${t("cam_snapshot")}>
              ${this.renderControlSurface(["#15151b","#34343e"])}
              <lg-icon icon="mdi:camera"></lg-icon>
            </button>
          </div>
        </div>

        ${this.config.show_actions===!1?p:d`<div class="actions">
              ${n?d`<div
                    class="motion"
                    style=${x({"--chip-bg":"rgba(255, 69, 58, 0.18)","--chip-stroke":"rgba(255, 69, 58, 0.3)","--chip-label":"#FF453A","--chip-dot":"#FF453A"})}
                  >
                    <span class="dot"></span><span>${t("cam_offline")}</span>
                  </div>`:this.renderMotion()}
              <div class="spacer"></div>
              <button class=${v({history:!0,dimmed:n})} @click=${this.openMoreInfo}>
                <lg-icon icon="mdi:bell-outline"></lg-icon><span>${t("cam_history")}</span>
              </button>
            </div>`}
      </div>`}};Be.styles=[M,T,w`
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
    `],m([_()],Be.prototype,"tick",2);customElements.get("liquid-glass-camera-card")||customElements.define("liquid-glass-camera-card",Be);var En={light:"mdi:lightbulb",switch:"mdi:power-plug",input_boolean:"mdi:toggle-switch",fan:"mdi:fan",lock:"mdi:lock",cover:"mdi:blinds",climate:"mdi:thermostat",sensor:"mdi:gauge",binary_sensor:"mdi:motion-sensor",media_player:"mdi:speaker",camera:"mdi:cctv",scene:"mdi:palette",script:"mdi:script-text"},An={door:["open","closed"],garage_door:["open","closed"],window:["open","closed"],opening:["open","closed"],motion:["detected","clear"],occupancy:["detected","clear"],presence:["detected","clear"]},Mn={door:["mdi:door-open","mdi:door-closed"],garage_door:["mdi:garage-open","mdi:garage"],window:["mdi:window-open","mdi:window-closed"],opening:["mdi:square-outline","mdi:square"],motion:["mdi:motion-sensor","mdi:motion-sensor-off"],occupancy:["mdi:home-account","mdi:home-outline"],presence:["mdi:account","mdi:account-outline"],moisture:["mdi:water-alert","mdi:water-off"],smoke:["mdi:smoke-detector-alert","mdi:smoke-detector"]},Tn=[["light","custom:liquid-glass-light-card"],["switch","custom:liquid-glass-switch-card"],["sensor","custom:liquid-glass-sensor-card"]],Ce=class extends C{constructor(){super(...arguments);this.open=!0;this.revision=0;this.elements=[];this.buildId=0;this.toggle=()=>{this.collapsible&&(this.open=!this.open)}}static getStubConfig(e,t,n){let r=[t,n,Object.keys(e?.states??{})].find(l=>l?.length)??[],o=l=>r.find(c=>c.startsWith(`${l}.`));return{cards:Tn.flatMap(([l,c])=>{let u=o(l);return u?[{type:c,entity:u}]:[]})}}setConfig(e){super.setConfig(e),this.open=e.collapsed!==!0,this.buildChildren()}getCardSize(){return this.open?1+this.elements.reduce((t,n)=>t+(n.getCardSize?.()??3),0):1}updated(){for(let e of this.elements)e.hass=this.hass}get cardConfigs(){return this.config?.cards??[]}get collapsible(){return this.config?.collapsible!==!1}childConfig(e){if(!String(e.type??"").startsWith("custom:liquid-glass-"))return e;let t={...e};for(let n of["theme","refraction","language"]){let r=this.config?.[n];t[n]===void 0&&r!==void 0&&(t[n]=r)}return t}async buildChildren(){let e=++this.buildId,t=this.cardConfigs.map(r=>this.childConfig(r)),n=await window.loadCardHelpers?.().catch(()=>{});if(e===this.buildId){this.elements=t.map(r=>{try{return n?n.createCardElement(r):Di(r)}catch{return Di(r)}});for(let r of this.elements)r.hass=this.hass;this.revision++}}summaryFor(e){let t=typeof e.entity=="string"?e.entity:void 0;if(!t)return;let n=this.hass?.states[t],r=t.split(".",1)[0],o=e.icon??n?.attributes.icon??Fn(n,r);return A(n)?{icon:o,label:this.t("unavailable"),tone:"off"}:{icon:o,...Rn(n,r,this.t)}}get summaryItems(){return this.cardConfigs.map(e=>this.summaryFor(e)).filter(e=>!!e)}subtitle(e){if(this.config.subtitle)return this.config.subtitle;let t=this.cardConfigs.length;if(!t)return"";let n=e.filter(o=>o.tone!=="off").length,r=[this.t("grp_devices",{n:t})];return e.length&&r.push(n?this.t("grp_running",{n}):this.t("grp_all_idle")),!this.open&&this.collapsible&&r.push(this.t("grp_tap_expand")),r.join(" \xB7 ")}render(){let e=this.summaryItems,t=!this.open&&this.config.summary!==!1&&e.length>0;return d`<div class="panel">
      <div class=${v({head:!0,tappable:this.collapsible})} @click=${this.toggle}>
        ${this.renderIconWell(this.config.icon??"mdi:view-grid-outline",void 0,null)}
        <div class="text">
          <div class="heading">${this.config.title??this.t("grp_title")}</div>
          <div class="sub">${this.subtitle(e)}</div>
        </div>
        ${this.collapsible?d`<button class=${v({chevron:!0,closed:!this.open})} aria-expanded=${this.open}>
              <lg-icon icon="mdi:chevron-up"></lg-icon>
            </button>`:p}
      </div>
      ${t?d`<div class="summary">
            ${e.map(n=>d`<div class=${v({sum:!0,[n.tone]:!0})}><lg-icon .icon=${n.icon}></lg-icon><span>${n.label}</span></div>`)}
          </div>`:p}
      ${this.open?this.cardConfigs.length?d`<div class="cards">${this.revision>=0?this.elements:p}</div>`:d`<div class="empty">${this.t("grp_empty")}</div>`:p}
    </div>`}};Ce.styles=[M,T,w`
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
    `],m([_()],Ce.prototype,"open",2),m([_()],Ce.prototype,"revision",2);function Di(s){let i=String(s.type??""),e=i.startsWith("custom:")?i.slice(7):`hui-${i}-card`,t=document.createElement(e),n=()=>{try{t.setConfig?.(s)}catch{}};return typeof t.setConfig=="function"?n():customElements.whenDefined(e).then(n),t}function Fn(s,i){if(i==="binary_sensor"){let e=Mn[s?.attributes.device_class??""];if(e)return s?.state==="on"?e[0]:e[1]}return En[i]??"mdi:card-outline"}function Rn(s,i,e){let t=s.state,n=t==="on";switch(i){case"light":{if(!n)return{label:e("unlit"),tone:"off"};let r=s.attributes.brightness;return{label:r?`${Math.round(r/255*100)}%`:e("lit"),tone:"warm"}}case"switch":case"input_boolean":case"fan":case"automation":case"siren":return n?{label:e("on"),tone:"info"}:{label:e("off"),tone:"off"};case"lock":return t==="jammed"?{label:e("jammed"),tone:"warm"}:t==="locked"?{label:e("locked"),tone:"good"}:{label:e("unlocked"),tone:"warm"};case"cover":{if(t==="closed")return{label:e("closed"),tone:"off"};let r=s.attributes.current_position;return{label:r===void 0?e("open"):`${e("open")} ${Math.round(r)}%`,tone:"info"}}case"climate":{if(t==="off")return{label:e("mode_off"),tone:"off"};let r=s.attributes.temperature;return{label:r===void 0?e(`mode_${t}`):`${r}\xB0`,tone:"warm"}}case"binary_sensor":{let r=s.attributes.device_class,o=(r&&An[r])??["on","off"];return n?{label:e(o[0]),tone:"warm"}:{label:e(o[1]),tone:"off"}}case"media_player":return t==="playing"?{label:e("playing"),tone:"info"}:t==="paused"?{label:e("paused"),tone:"off"}:{label:e("standby"),tone:"off"};case"sensor":{let r=s.attributes.unit_of_measurement??"";return{label:`${t}${r}`,tone:"off"}}default:return n?{label:e("on"),tone:"info"}:{label:t,tone:"off"}}}customElements.get("liquid-glass-group-card")||customElements.define("liquid-glass-group-card",Ce);var Dn="0.6.0",Pn="2026-09-04 11:08",Bn="https://github.com/cos-overclock/ha-liquid-glass",Oe=(s,i)=>!!((s.attributes.supported_features??0)&i);function K(s,i,e,t,n,r=o=>({entity:o})){return{type:s,name:i,description:e,getEntitySuggestion:(o,a)=>{let l=a.split(".",1)[0];if(!t.includes(l))return null;let c=o.states[a];return n&&(!c||!n(c))?null:{config:{type:`custom:${s}`,...r(a)}}}}}var Pi=["scene","script","automation","button","input_button"],On=["switch","input_boolean","fan","light","automation","humidifier","siren","remote"],zn=["input_number","number","fan","light","media_player","cover","valve","humidifier","water_heater","climate"],qt=1,In=2,Bi=4,Hn=4,Ln=s=>{switch(s.entity_id.split(".",1)[0]){case"input_number":case"number":return!0;case"fan":return Oe(s,qt);case"light":return(s.attributes.supported_color_modes??[]).some(t=>t!=="onoff");case"media_player":return Oe(s,Hn);case"cover":case"valve":return Oe(s,Bi);case"humidifier":return"humidity"in s.attributes;case"water_heater":case"climate":return Oe(s,qt);default:return!1}},Oi=[K("liquid-glass-light-card","Liquid Glass Light","Brightness, color temperature, color and presets",["light"]),K("liquid-glass-climate-card","Liquid Glass Climate","Thermostat dial with modes and fan / preset",["climate"],s=>Oe(s,qt|In)),K("liquid-glass-switch-card","Liquid Glass Switch","Single row toggle",On),K("liquid-glass-sensor-card","Liquid Glass Sensor","Value, trend and 24h sparkline",["sensor"]),K("liquid-glass-binary-sensor-card","Liquid Glass Binary Sensor","Door / motion / window status row",["binary_sensor"]),K("liquid-glass-lock-card","Liquid Glass Lock","Slide to lock / unlock",["lock"]),K("liquid-glass-cover-card","Liquid Glass Cover","Blinds and curtains with position and tilt",["cover"],s=>Oe(s,3|Bi)),K("liquid-glass-media-card","Liquid Glass Media","Now playing with transport and volume",["media_player"]),K("liquid-glass-slider-card","Liquid Glass Slider","Any numeric value as a draggable track",zn,Ln),K("liquid-glass-weather-card","Liquid Glass Weather","Current conditions with hourly and daily forecast",["weather"]),K("liquid-glass-button-card","Liquid Glass Button","Run a scene, script, automation or button",Pi),K("liquid-glass-scene-card","Liquid Glass Scenes","A grid of scene tiles or a row of chips",Pi,void 0,s=>({scenes:[{entity:s}]})),K("liquid-glass-camera-card","Liquid Glass Camera","Camera still with motion and history",["camera"]),{type:"liquid-glass-group-card",name:"Liquid Glass Group",description:"A collapsible panel that holds other cards"}];window.customCards=window.customCards??[];for(let s of Oi){let i={...s,preview:!0,documentationURL:Bn},e=window.customCards.find(t=>t.type===s.type);e?Object.assign(e,i):window.customCards.push(i)}console.info(`%c LIQUID-GLASS-CARDS %c v${Dn} \xB7 ${Oi.length} cards \xB7 built ${Pn} `,"color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;","color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;");export{et as LiquidGlassBinarySensorCard,Te as LiquidGlassButtonCard,Be as LiquidGlassCameraCard,xe as LiquidGlassClimateCard,ye as LiquidGlassCoverCard,Ce as LiquidGlassGroupCard,me as LiquidGlassLightCard,_e as LiquidGlassLockCard,de as LiquidGlassMediaCard,Pe as LiquidGlassSceneCard,De as LiquidGlassSensorCard,fe as LiquidGlassSliderCard,Ze as LiquidGlassSwitchCard,ke as LiquidGlassWeatherCard};
