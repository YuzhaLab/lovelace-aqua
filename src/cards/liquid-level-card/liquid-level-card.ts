import {
  css,
  CSSResultGroup,
  html,
  nothing,
} from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
} from "../../ha";
import { MushroomBaseCard } from "../../utils/base-card";
import { cardStyle } from "../../utils/card-styles";
import { registerCustomCard } from "../../utils/custom-cards";
import { 
  LIQUID_LEVEL_CARD_EDITOR_NAME,
  LIQUID_LEVEL_CARD_NAME,
  LIQUID_LEVEL_ENTITY_DOMAINS 
} from "./const";
import { LiquidLevelCardConfig } from "./liquid-level-card-config";
import { classMap } from "lit/directives/class-map.js";
import { computeAppearance } from "../../utils/appearance";
import { AppearanceSharedConfig } from "../../shared/config/appearance-config";

registerCustomCard({
  type: LIQUID_LEVEL_CARD_NAME,
  name: "Aqua Liquid Level Card",
  description: "Card for displaying liquid level"
});

@customElement(LIQUID_LEVEL_CARD_NAME)
export class LiquidLevelCard 
  extends MushroomBaseCard<LiquidLevelCardConfig>
  implements LovelaceCard {

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./liquid-level-card-editor");
    return document.createElement(LIQUID_LEVEL_CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<LiquidLevelCardConfig> {
    const entities = Object.keys(hass.states);
    const sensors = entities.filter((e) => 
      LIQUID_LEVEL_ENTITY_DOMAINS.includes(e.split(".")[0]) && 
      !e.toLowerCase().includes("example") &&
      !e.toLowerCase().includes("demo")
    );
    
    return {
      type: `custom:${LIQUID_LEVEL_CARD_NAME}`,
      entity: "",
      layout: "vertical",
      fill_container: true
    };
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return nothing;
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return nothing;
    }

    const level = Number(stateObj.state);
    const maxLevel = 4;
    const name = this._config.name || stateObj.attributes.friendly_name || this._config.entity;
    const icon = this._config.icon || stateObj.attributes.icon;
    const appearance = computeAppearance(this._config);
    // 处理颜色配置
    let levelColor = 'var(--primary-color)';
    if (this._config.color) {
      // 如果是数组,转换为 rgb() 格式
      if (Array.isArray(this._config.color)) {
        const [r, g, b] = this._config.color;
        levelColor = `rgb(${r}, ${g}, ${b})`;
      } else {
        // 如果已经是字符串,直接使用
        levelColor = this._config.color;
      }
    }

    return html`
      <ha-card class=${classMap({ "fill-container": appearance.fill_container })}>
        <div class="container">
          <div class="level-indicators">
            ${[...Array(maxLevel)].map((_, i) => html`
              <div class="level-indicator ${i < level ? 'active' : ''}"
                   style="${i < level ? `background-color: ${levelColor}; border-color: ${levelColor}` : `border-color: ${levelColor}`}">
              </div>
            `)}
          </div>
          <div class="info">
            <div class="header">
              <span class="name" >${name}</span>
              ${icon ? html`
                <ha-icon
                  class="icon"
                  .icon=${icon}
                ></ha-icon>
              ` : nothing}
            </div>
            <span class="level" style="color: ${levelColor}">${level}</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      super.styles,
      cardStyle,
      css`
        .container {
          padding: 16px 30px;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 16px;
          overflow: hidden;
        }
        .level-indicators {
          flex: 0 0 22px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
          word-break: break-all;
          color: var(--primary-text-color);
          overflow-x: hidden;
          white-space: nowrap;
          max-width: 110px;
          display: inline-block;
          text-overflow: ellipsis;
        }
        .level {
          font-size: 70px;
          // margin-top: 20px;
          font-weight: bold;
          line-height: 1;
        }
        .level-indicator {
          height: 20px;
          border: 1px solid;
          border-radius: 4px;
          transition: all 0.2s ease-in-out;
        }
        .level-indicator.active {
          border-color: inherit;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon {
          --mdc-icon-size: 20px;
          color: var(--primary-text-color);
        }
        .liquid-container {
          flex: 1;
          height: 20px;
          background-color: var(--secondary-background-color);
          border-radius: 4px;
          overflow: hidden;
        }
        .liquid-level {
          height: 100%;
          background-color: var(--primary-color);
          transition: width 0.2s ease-in-out;
        }
      `,
    ];
  }
} 