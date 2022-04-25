import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms'

/**
 * Factory function for time limit validator
 * @returns validator function that returns an error if user enters 0 hrs and 0 minutes or a time 
 * greater than 24 hours or null if no errors detected
 */
export function createValidLimitValidator(): ValidatorFn {
  return (form:AbstractControl) : ValidationErrors | null => {

    const hours = form.get("timeLimitH")?.value;
    const mins = form.get("timeLimitM")?.value;


    if(hours == 0 && mins == 0) {
      return {zeroTime: true};
    }
    if(hours == 24 && mins > 0) {
      return {over24Hours: true};
    }

    return null;
  }
}