import { TranslationGroup } from '@common/interfaces/translation-group.interface';

const faqConfig: number[] = [4, 3, 1, 4, 2, 1, 4];
export const getFaqConfig: () => TranslationGroup[] = () => faqConfig.map((config, configIndex) => ({
    name: `tk.nld.faq-modal.group${ configIndex + 1 }.name`,
    items: Array.from({ length: config }).map((_, index) => `tk.nld.faq-modal.group${ configIndex + 1 }.qa${ (index + 1) }`),
}));
