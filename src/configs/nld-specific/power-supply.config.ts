import { TranslationKey } from '@common/types/translation-key.type';

export interface PowerSupplySectionConfig {
    S01: { key: TranslationKey };
    S02: { key: TranslationKey };
    S03: { key: TranslationKey };
    Elv: { key: TranslationKey };
}

export interface PowerSupplyStateConfig {
    num: number;
    initState: PowerSupplyState;
}

export enum PowerSupplyState {
    INACTIVE = 0,
    ACTIVE = 1,
}

export const powerSupplySections: PowerSupplySectionConfig = Object.freeze({
    S01: Object.freeze({ key: 'tk.nld.game-setup-modal.label.power-supply.section1' }),
    S02: Object.freeze({ key: 'tk.nld.game-setup-modal.label.power-supply.section2' }),
    S03: Object.freeze({ key: 'tk.nld.game-setup-modal.label.power-supply.section3' }),
    Elv: Object.freeze({ key: 'tk.nld.game-setup-modal.label.power-supply.elevator' }),
});

const powerSupplyStatesConfig: PowerSupplyStateConfig[] = [
    { num: 1, initState: PowerSupplyState.ACTIVE },
    { num: 2, initState: PowerSupplyState.ACTIVE },
    { num: 3, initState: PowerSupplyState.INACTIVE },
    { num: 4, initState: PowerSupplyState.INACTIVE },
];

export const getPowerSupplyStatesConfig: () => PowerSupplyStateConfig[] = () => powerSupplyStatesConfig.map(config => ({ ...config }));
