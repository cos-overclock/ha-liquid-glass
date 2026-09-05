type HaIconElement = HTMLElement & { icon?: string };

/** Small native wrapper around Home Assistant's icon element. */
export class LgIcon extends HTMLElement {
  private readonly haIcon: HaIconElement;
  private iconValue = "";

  static get observedAttributes(): string[] {
    return ["icon"];
  }

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host{display:inline-flex;align-items:center;justify-content:center;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);color:inherit;flex:none}
      ha-icon{display:flex;--mdc-icon-size:inherit}
    `;
    this.haIcon = document.createElement("ha-icon") as HaIconElement;
    root.append(style, this.haIcon);
  }

  get icon(): string {
    return this.iconValue;
  }

  set icon(value: string) {
    if (this.iconValue === value) return;
    this.iconValue = value;
    this.haIcon.icon = value;
  }

  attributeChangedCallback(name: string, _oldValue: string | null, value: string | null): void {
    if (name === "icon") this.icon = value ?? "";
  }
}

if (!customElements.get("lg-icon")) customElements.define("lg-icon", LgIcon);

declare global {
  interface HTMLElementTagNameMap {
    "lg-icon": LgIcon;
  }
}
