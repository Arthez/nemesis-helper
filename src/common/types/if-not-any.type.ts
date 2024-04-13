import { IsAny } from '@common/types/is-any.type';

export type IfNotAny<TypeToCheck, FallbackType> = IsAny<TypeToCheck, FallbackType, TypeToCheck>;
