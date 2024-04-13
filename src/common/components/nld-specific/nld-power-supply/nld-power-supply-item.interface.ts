import { PowerSupplyStateConfig } from '@configs/nld-specific/power-supply.config';

export interface NldPowerSupplyData {
    S01: PowerSupplyStateConfig;
    S02: PowerSupplyStateConfig;
    S03: PowerSupplyStateConfig;
    Elv: PowerSupplyStateConfig;
}
