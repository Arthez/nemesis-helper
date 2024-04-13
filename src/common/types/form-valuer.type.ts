import { AbstractControl } from '@angular/forms';

export type FormValuer<FormGroupType extends Record<keyof FormGroupType, AbstractControl>> = { [Key in keyof FormGroupType]: FormGroupType[Key]['value'] };
