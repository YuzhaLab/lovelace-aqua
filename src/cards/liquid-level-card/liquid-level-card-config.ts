import { assign, object, optional, string, number } from "superstruct";
import { LovelaceCardConfig } from "../../ha";
import { 
  EntitySharedConfig,
  entitySharedConfigStruct 
} from "../../shared/config/entity-config";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";

export type LiquidLevelCardConfig = LovelaceCardConfig & EntitySharedConfig & {
  name?: string;
  entity: string;
  icon?: string;
};

export const liquidLevelCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  entitySharedConfigStruct,
  object({
    name: optional(string()),
    entity: string(),
    icon: optional(string())
  })
); 