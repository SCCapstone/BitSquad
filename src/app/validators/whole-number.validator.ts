import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Factory function
 * @returns Validator function that determines if a value contains a decimal, which returns the 
 * "containsDecimal" error or null (if input is a whole number)  
 */
export function createWholeNumberValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    const val = control.value;

    if (!val) {
      return null;
    }

    const containsDecimal = /[0-9]+['.'][0-9]+/.test(val);
    return containsDecimal ? {containsDecimal: true} : null;
  }
}