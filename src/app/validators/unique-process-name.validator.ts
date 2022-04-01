import {map, take, debounceTime, catchError, } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { ProcessService } from '../services/process.service';
import { Observable, of } from 'rxjs';


/*export class CustomValidator implements AsyncValidator{
  constructor(private processService: ProcessService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
      return this.processService.processNameQuery(control.value).pipe(map(processes => processes.length() ? {processNameUsed: true} : null), catchError(()=> of(null))
      );
  }
}*/




/*static pName(afs:AngularFirestore) {
  return (control: AbstractControl) => {

    const pName = control.value.toLowerCase();

    return afs.collection('/Processes', ref => ref.where('processName', '==', pName) )
      .valueChanges().pipemap(arr => arr.length ? {processNameUsed: true}: null), )
  }
}*/