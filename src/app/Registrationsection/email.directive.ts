import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appEmail]',
  providers:[
    {
      provide:NG_VALIDATORS,useExisting:EmailDirective,multi:true,
    }
  ]
})
export class EmailDirective {

  constructor() { }

  validate(control:AbstractControl):{[key:string]:any}|void{
    if(!!control?.value){
      if(control?.value?.indexOf('@')==-1){
        return {noAtMail:true}
      }
      if(control?.value?.indexOf('.')==-1){
        return {noDot:true}
      }
      if(control?.value?.split('@').length-1>1){
        console.log(control.value.split("@"))
        return {atGreaterOne:true}
      }
    }
    
  }

}
