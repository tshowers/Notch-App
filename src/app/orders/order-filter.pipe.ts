import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];


    for (const item of value) {
      let a = (item && item.contact_email) ? item.contact_email : '';
      let b = (item && item.email) ? item.email : '';
      let c = (item && item.name) ? item.name : '';
      let d = (item && item.note) ? item.note : '';
      let e = (item && item.phone) ? String(item.phone) : '';
      let f = (item && item.customer && item.customer.default_address && item.customer.default_address.address1) ? item.customer.default_address.address1 : '';
      let g = (item && item.customer && item.customer.default_address && item.customer.default_address.address2) ? item.customer.default_address.address2 : '';
      let h = (item && item.customer && item.customer.default_address && item.customer.default_address.city) ? item.customer.default_address.city : '';
      let i = (item && item.customer && item.customer.default_address && item.customer.default_address.first_name) ? item.customer.default_address.first_name : '';
      let j = (item && item.customer && item.customer.default_address && item.customer.default_address.last_name) ? item.customer.default_address.last_name : '';
      let k = (item && item.customer && item.customer.default_address && item.customer.default_address.name) ? item.customer.default_address.name : '';
      let l = (item && item.customer && item.customer.default_address && item.customer.default_address.phone) ? item.customer.default_address.phone : '';
      let m = (item && item.custumer && item.customer.email) ? item.customer.email : '';
      let n = (item && item.custumer && item.customer.first_name) ? item.customer.first_name : '';
      let o = (item && item.custumer && item.customer.last_name) ? item.customer.last_name : '';

      let r = (item && item.id) ? String(item.id) : '';

      let p = (item && item.line_items[0] && item.line_items[0].name) ? item.line_items[0].name : '';
      let q = (item && item.line_items[0] && item.line_items[0].sku) ? item.line_items[0].sku : '';

      let s = (item && item.line_items[1] && item.line_items[1].name) ? item.line_items[0].name : '';
      let t = (item && item.line_items[1] && item.line_items[1].sku) ? item.line_items[0].sku : '';

      let v = (item && item.line_items[2] && item.line_items[2].name) ? item.line_items[0].name : '';
      let w = (item && item.line_items[2] && item.line_items[2].sku) ? item.line_items[0].sku : '';

      let y = (item && item.note_attributes[0] && item.note_attributes[0].name) ? item.note_attributes[0].name : '';
      let z = (item && item.note_attributes[0] && item.note_attributes[0].value) ? String(item.note_attributes[0].value) : '';


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
        || (m.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (n.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (o.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (p.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (q.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (r.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (s.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (t.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (v.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (w.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (y.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (z.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;
  }

}
