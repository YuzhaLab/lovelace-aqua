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
      entity: ""
    };
  }

  protected render() {
    if (!this._config || !this.hass || !this._config.entity) {
      return nothing;
    }

    const stateObj = this._stateObj;
    if (!stateObj) {
      return this.renderNotFound(this._config);
    }

    const level = Number(stateObj.state);
    const maxLevel = 4;
    const name = this._config.name || stateObj.attributes.friendly_name || this._config.entity;
    const icon = this._config.icon || stateObj.attributes.icon;

    return html`
      <ha-card>
        <div class="container">
          <div class="level-indicators">
            ${[...Array(maxLevel)].map((_, i) => html`
              <div class="level-indicator ${i < level ? 'active' : ''}"></div>
            `)}
          </div>
          <div class="info">
            <div class="header">
              <span class="name">${name}</span>
              ${icon ? html`
                <ha-icon
                  class="icon"
                  .icon=${icon}
                ></ha-icon>
              ` : nothing}
            </div>
            <span class="level">${level}</span>
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
        }
        .level-indicators {
          flex: 0 0 26px;  /* 固定宽度12% */
          display: flex;
          flex-direction: column-reverse;
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
          color: var(--primary-text-color);
        }
        .level {
          font-size: 70px;
          color: var(--primary-color);
          margin-top: 30px;
          font-weight: bold;
        }
        .level-indicator {
          height: 24px;
          border: 1px solid var(--primary-color);
          border-radius: 4px;
          transition: background-color 0.2s ease-in-out;
        }
        .level-indicator.active {
          background: var(--primary-color);
          
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
      `,
    ];
  }
} 