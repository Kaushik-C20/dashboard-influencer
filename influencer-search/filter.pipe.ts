import { Pipe, PipeTransform } from '@angular/core';
import { InfModel } from './inf.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(lst: InfModel[], str: string): InfModel[] {
    const newarr: InfModel[] = [];
    let len = lst.length;
    const count: number[] = [];
    for(let i of lst){
      count[lst.indexOf(i)] = 0;
    }
    for (let i of lst) {
      if (i['interests'].length) {
        for (let j of i['interests']) {
          if (j.toLocaleLowerCase().slice(0, str.toLowerCase().trim().split(' ').join('').length) == str.toLowerCase().trim().split(' ').join('')) {
            count[lst.indexOf(i)]+=1;
          }
        }
        if(count[lst.indexOf(i)]>0){
          newarr.push(i);
        }
      }
    }
    return newarr;
  }

}
