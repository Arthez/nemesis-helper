import { TranslationGroup } from '@common/interfaces/translation-group.interface';

const faqConfig: number[] = [25, 16, 9, 10, 16, 6, 8];
export const getFaqConfig: () => TranslationGroup[] = () => faqConfig.map((config, configIndex) => ({
    name: `tk.nog.faq-modal.group${ configIndex + 1 }.name`,
    items: Array.from({ length: config }).map((_, index) => `tk.nog.faq-modal.group${ configIndex + 1 }.qa${ (index + 1) }`),
}));
