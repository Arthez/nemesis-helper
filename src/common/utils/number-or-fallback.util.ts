export const numberOrFallback: <FallbackValue = number | undefined>(num: number | undefined, fallbackValue: FallbackValue) => number | FallbackValue = (
    num,
    fallbackValue,
) => typeof num === 'number' ? num : fallbackValue;
