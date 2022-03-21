import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.default_address && item.default_address.address1) ? item.default_address.address1 : '';
      let b = (item && item.default_address && item.default_address.address2) ? item.default_address.address2 : '';
      let c = (item && item.default_address && item.default_address.city) ? item.default_address.city : '';
      let d = (item && item.first_name) ? item.first_name : '';
      let e = (item && item.last_name) ? item.last_name : '';
      let f = (item && item.email) ? item.email : '';
      let g = (item && item.phone) ? item.phone : '';
      let h = (item && item.state) ? item.state : '';
      let i = (item && item.id) ? String(item.id) : '';


      if ((a.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (g.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
