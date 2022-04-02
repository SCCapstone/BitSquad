import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function createLimitFormValidator(): ValidatorFn {
  return (form:AbstractControl): ValidationErrors | null => {

    const weekH = form.get('weeklyLimitH')?.value;
    const weekM = form.get('weeklyLimitM')?.value;

    const monH = form.get('monLimitH')?.value;
    const monM = form.get('monLimitM')?.value;

    const tuesH = form.get('tuesLimitH')?.value;
    const tuesM = form.get('tuesLimitM')?.value;

    const wedH = form.get('wedLimitH')?.value;
    const wedM = form.get('wedLimitM')?.value;

    const thursH = form.get('thursLimitH')?.value;
    const thursM = form.get('thursLimitM')?.value;

    const friH = form.get('friLimitH')?.value;
    const friM = form.get('friLimitM')?.value;

    const satH = form.get('satLimitH')?.value;
    const satM = form.get('satLimitM')?.value;

    const sunH = form.get('sunLimitH')?.value;
    const sunM = form.get('sunLimitM')?.value;

    if(weekH == 0 && weekM == 0) {
      return {zeroWeekTime: true};
    }

    if(weekH == 168 && weekM > 0) {
      return {over168Hours: true};
    }

    if(monH == 24 && monM > 0) {
      return {over24M: true};
    }

    if(tuesH == 24 && tuesM > 0) {
      return {over24Tu: true};
    }

    if(wedH == 24 && wedM > 0) {
      return {over24W: true};
    }

    if(thursH == 24 && thursM > 0) {
      return {over24Tr: true};
    }

    if(friH == 24 && friM > 0) {
      return {over24F: true};
    }

    if(satH == 24 && satM > 0) {
      return {over24Sa: true};
    }

    if(sunH == 24 && sunM > 0) {
      return {over24Su: true};
    }

    return null;


  }
}