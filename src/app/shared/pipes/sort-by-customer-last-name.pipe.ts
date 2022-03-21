import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCustomerLastName'
})
export class SortByCustomerLastNamePipe implements PipeTransform {

  transform(data: any): any {
    if (!data) return;
    return data.sort((a: any, b: any) => {
      if (a && a.last_name && b && b.last_name) {
        if (a.last_name.trim() > b.last_name.trim()) return 1;
        if (a.last_name.trim() < b.last_name.trim()) return -1;
      }
      return 0;
    });
  }

}
