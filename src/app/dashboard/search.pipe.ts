import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, search:any): any {
   if(!search)return value;
   search=search.toLowerCase();
   let filterArray=value.filter((user:any)=>user.username.toLowerCase().includes(search));
   return filterArray;
  }
}