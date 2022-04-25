import { ValidatorFn, ValidationErrors, AbstractControl} from "@angular/forms";

/**
 * Factory function for warning validators
 * @returns validator function that returns errors if warnings are not at least one minute less 
 * than total time limit, if warnings are entered out of order, or if duplicate warnings are 
 * present; otherwise returns null.
 */
export function createUniqueWarningTimeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const hours = form.get("timeLimitH")?.value;
    const mins = form.get("timeLimitM")?.value;
    const maxMinutes = (60*hours + mins) - 1;
    
    const warning1 = form.get("warning1")?.value
    const warning2 = form.get("warning2")?.value
    const warning3 = form.get("warning3")?.value
    
    //check that warnings are in range of given hours and minutes
    if(warning1 && warning1 > maxMinutes) {
      return {outOfRange:true};
    }
    if(warning2 && warning2 > maxMinutes) {
      return {outOfRange:true}
    }
    if(warning3 && warning3 > maxMinutes) {
      return {outOfRange:true}
    }

    //check that non-null warnings are unique
    if(warning1 && warning2 && warning1 == warning2) {
      return {duplicateWarning:true};
    }

    if(warning1 && warning3 && warning1 == warning3) {
      return {duplicateWarning:true};
    }

    if(warning2 && warning3 && warning2 == warning3) {
      return {duplicateWarning:true};
    }

    //check that warnings are entered sequentially (1-3)
    if(warning2 && !warning1) {
      return {warning2Before1:true}
    }

    if(warning3 && (!warning1 || !warning2)) {
      return {warning3Before1Or2: true}
    }

    //check that warnings are listed in descending order
    if(warning1 && warning2 && warning2 > warning1) {
      return {descendingOrder: true}
    }

    if(warning1 && warning2 && warning3 
        && (warning1 < warning2 || warning1 < warning3 || warning2 < warning3)) {
        return {descendingOrder: true}
    }

    //no errors detected
    return null; 
  }
}
