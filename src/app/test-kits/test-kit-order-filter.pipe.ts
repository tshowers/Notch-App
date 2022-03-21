import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testKitOrderFilter'
})
export class TestKitOrderFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];

    for (const item of value) {
      let a = (item && item.address1) ? String(item.address1) : '';
      let b = (item && item.address2) ? String(item.address2) : '';
      let c = (item && item.city) ? String(item.city) : '';
      let d = (item && item['clinic-name']) ? String(item['clinic-name']) : '';
      let e = (item && item.comment) ? String(item.comment) : '';
      let f = (item && item['customer-id']) ? String(item['customer-id']) : '';
      let g = (item && item['kit-id']) ? String(item['kit-id']) : '';
      let h = (item && item['order-id']) ? String(item['order-id']) : '';
      let i = (item && item['order-taker']) ? String(item['order-taker']) : '';
      let j = (item && item['phone']) ? String(item['phone']) : '';
      let k = (item && item['product-id']) ? String(item['product-id']) : '';
      let l = (item && item['title']) ? String(item['title']) : '';


      if ((a.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (b.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (c.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (d.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (e.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (f.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (g.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (h.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (i.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (j.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (k.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (l.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
