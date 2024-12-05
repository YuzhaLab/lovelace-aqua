import { html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { assert } from "superstruct";
import { LovelaceCardEditor, fireEvent } from "../../ha";
import setupCustomlocalize from "../../localize";
import { computeActionsFormSchema } from "../../shared/config/actions-config";
import { APPEARANCE_FORM_SCHEMA } from "../../shared/config/appearance-config";
import { MushroomBaseElement } from "../../utils/base-element";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { loadHaComponents } from "../../utils/loader";
import { PUMP_CARD_EDITOR_NAME, PUMP_ENTITY_DOMAINS } from "./const";
import { FanCardConfig, fanCardConfigStruct } from "./pump-card-config";

const FAN_LABELS = [
  "icon_animation",
  "show_percentage_control",
  "show_oscillate_control",
];

const SCHEMA: HaFormSchema[] = [
  { name: "entity", selector: { entity: { domain: PUMP_ENTITY_DOMAINS } } },
  {
    name: "entity_second", selector: { entity: {  } }
  },
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "icon",
        selector: { icon: {} },
        context: { icon_entity: "entity" },
      },
      { name: "icon_animation", selector: { boolean: {} } },
    ],
  },
  ...APPEARANCE_FORM_SCHEMA,
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_percentage_control", selector: { boolean: {} } },
      { name: "show_oscillate_control", selector: { boolean: {} } },
      { name: "collapsible_controls", selector: { boolean: {} } },
    ],
  },
  ...computeActionsFormSchema(),
];

@customElement(PUMP_CARD_EDITOR_NAME)
export class FanCardEditor
  extends MushroomBaseElement
  implements LovelaceCardEditor {
  @state() private _config?: FanCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: FanCardConfig): void {
    assert(config, fanCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);
    if (GENERIC_LABELS.includes(schema.name)) {
      console.log("schema.name1", schema.name)
      return customLocalize(`editor.card.generic.${schema.name}`);
    }
    if (FAN_LABELS.includes(schema.name)) {
      console.log("schema.nam2", schema.name)
      return customLocalize(`editor.card.fan.${schema.name}`);
    }
    console.log("schema.name99", `ui.panel.lovelace.editor.card.generic.${schema.name}`)
    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    console.log("ev", ev.detail.value)
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
}
