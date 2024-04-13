import { ContentItem } from '@common/interfaces/content-item.interface';
import { TranslationKey } from '@common/types/translation-key.type';

export interface ContentGroup {
    name: TranslationKey;
    items: ContentItem[];
}
