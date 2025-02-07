import { html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { assert } from "superstruct";
import { fireEvent, HomeAssistant, LovelaceCardEditor } from "../../ha";
import setupCustomlocalize from "../../localize";
import { MushroomBaseElement } from "../../utils/base-element";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { loadHaComponents } from "../../utils/loader";
import { LiquidLevelCardConfig, liquidLevelCardConfigStruct } from "./liquid-level-card-config";
import { LIQUID_LEVEL_CARD_EDITOR_NAME, LIQUID_LEVEL_ENTITY_DOMAINS } from "./const";
import { computeRgbColor } from "../../utils/colors";

const SCHEMA: HaFormSchema[] = [
  { 
    name: "entity", 
    selector: { 
      entity: { 
        domain: LIQUID_LEVEL_ENTITY_DOMAINS 
      } 
    } 
  },
  { 
    name: "name", 
    selector: { 
      text: {} 
    } 
  },
  {
    name: "icon",
    selector: {
      icon: {}
    }
  },
  {
    name: "color",
    selector: {
      color_rgb: {
        defaultValue: [255, 255, 255]  // 设置默认值为白色
      }
    }
  }
];

@customElement(LIQUID_LEVEL_CARD_EDITOR_NAME)
export class LiquidLevelCardEditor 
  extends MushroomBaseElement
  implements LovelaceCardEditor {
    
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: LiquidLevelCardConfig;

  connectedCallback() {
    super.connectedCallback();
    void loadHaComponents();
  }

  public setConfig(config: LiquidLevelCardConfig): void {
    assert(config, liquidLevelCardConfigStruct);
    this._config = config;
  }

  private _computeLabel = (schema: HaFormSchema) => {
    const customLocalize = setupCustomlocalize(this.hass!);

    if (GENERIC_LABELS.includes(schema.name)) {
      return customLocalize(`editor.card.generic.${schema.name}`);
    }

    return this.hass!.localize(
      `ui.panel.lovelace.editor.card.generic.${schema.name}`
    );
  };

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    // 获取主题色的RGB值
    const defaultColor = computeRgbColor('var(--primary-color)').split(',').map(Number);

    const schema = [
      {
        name: "entity",
        selector: {
          entity: {
            domain: LIQUID_LEVEL_ENTITY_DOMAINS
          }
        }
      },
      {
        name: "name",
        selector: {
          text: {}
        }
      },
      {
        name: "icon",
        selector: {
          icon: {}
        }
      },
      {
        name: "color",
        selector: {
          color_rgb: {
            defaultValue: defaultColor
          }
        }
      }
    ];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, "config-changed", { config: ev.detail.value });
  }
} 