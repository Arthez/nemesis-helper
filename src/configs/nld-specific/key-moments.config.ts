import { TranslationKey } from '@common/types/translation-key.type';

const keyMomentsConfig: TranslationKey[] = [
    'tk.nld.key-moments-modal.first-intruder',
    'tk.nld.key-moments-modal.first-player-death',
    'tk.nld.key-moments-modal.isolation-room',
    'tk.nld.key-moments-modal.autodestruction',
];

export const getKeyMomentsConfig: () => TranslationKey[] = () => [...keyMomentsConfig];
