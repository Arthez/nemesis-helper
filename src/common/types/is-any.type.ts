export type IsAny<TypeToCheck, ValueIfAny, ValueIfNotAny> = 0 extends (1 & TypeToCheck) ? ValueIfAny : ValueIfNotAny;
