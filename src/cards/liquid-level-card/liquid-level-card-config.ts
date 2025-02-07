import { assign, object, optional, string, number, union, array } from "superstruct";
import { LovelaceCardConfig } from "../../ha";
import { 
  EntitySharedConfig,
  entitySharedConfigStruct 
} from "../../shared/config/entity-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";
import { AppearanceSharedConfig, appearanceSharedConfigStruct } from "../../shared/config/appearance-config";

export interface LiquidLevelCardConfig extends LovelaceCardConfig, AppearanceSharedConfig {
  entity?: string;
  name?: string;
  icon?: string;
  color?: string | number[];
}

export const liquidLevelCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  entitySharedConfigStruct,
  appearanceSharedConfigStruct,
  object({
    name: optional(string()),
    entity: optional(string()),
    icon: optional(string()),
    color: optional(union([string(), array(number())]))
  })
); 