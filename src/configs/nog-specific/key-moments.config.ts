import { TranslationKey } from '@common/types/translation-key.type';

const keyMomentsConfig: TranslationKey[] = [
    'tk.nog.key-moments-modal.first-intruder',
    'tk.nog.key-moments-modal.first-player-death',
    'tk.nog.key-moments-modal.hibernation-chambers',
    'tk.nog.key-moments-modal.self-destruct',
];

export const getKeyMomentsConfig: () => TranslationKey[] = () => [...keyMomentsConfig];
