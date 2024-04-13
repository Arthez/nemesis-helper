export type ForbiddenObjectField<T extends object, U extends keyof T> = T & { [P in U]?: never };
