import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.address1) ? item.address1 : '';
      let b = (item && item.address2) ? item.address2 : '';
      let c = (item && item.city) ? item.city : '';
      let d = (item && item.email) ? item.email : '';
      let e = (item && item.firstName) ? item.firstName : '';
      let f = (item && item.gender) ? item.gender : '';
      let g = (item && item.lastName) ? item.lastName : '';
      let h = (item && item.phoneNumber) ? item.phoneNumber : '';
      let i = (item && item.province) ? item.province : '';
      let j = (item && item.uid) ? item.uid : '';
      let k = (item && item.zip) ? item.zip : '';

      if (
        (a.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (j.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (k.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item);
      }


    }

    return resultArray;
  }

}
