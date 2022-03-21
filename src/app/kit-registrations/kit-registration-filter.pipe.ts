import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kitActivationFilter'
})
export class KitRegistrationFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.gender) ? String(item.gender) : '';
      let b = (item && item.shopifyOrderNumber) ? String(item.shopifyOrderNumber) : '';
      let c = (item && item.kitNumber) ? String(item.kitNumber) : '';
      let d = (item && item.email) ? String(item.email) : '';
      let e = (item && item.dob) ? String(item.dob) : '';
      let f = (item && item.status) ? String(item.status) : '';
      let h = (item && item.firstName) ? String(item.firstName) : '';
      let i = (item && item.lastName) ? String(item.lastName) : '';
      let j = (item && item.address1) ? String(item.address1) : '';
      let k = (item && item.address2) ? String(item.address2) : '';
      let l = (item && item.city) ? String(item.city) : '';
      let m = (item && item.province) ? String(item.province) : '';
      let n = (item && item.zip) ? String(item.zip) : '';
      let o = (item && item.phoneNumber) ? String(item.phoneNumber) : '';
      let p = (item && item.uid) ? String(item.uid) : '';

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
        || (l.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (m.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (n.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (o.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (p.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item);
      }


    }

    return resultArray;


  }

}
