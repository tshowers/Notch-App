import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labOrderFilter'
})
export class LabOrderFilterPipe implements PipeTransform {

  transform(value: any, filterName: string): any {
    if (!value) return;
    if (value.length === 0 || filterName === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      let a = (item && item['bill-method']) ? String(item['bill-method']) : '';
      let b = (item && item.comment) ? item.comment : '';
      let c = (item && item['customer-id']) ? String(item['customer-id']) : '';
      let d = (item && item['invoice-num']) ? String(item['invoice-num']) : '';
      let e = (item && item['order-id']) ? String(item['order-id']) : '';
      let f = (item && item['owner-fname']) ? item['owner-fname'] : '';
      let g = (item && item['owner-lname']) ? item['owner-lname'] : '';
      let h = (item && item['patient-fname']) ? item['patient-fname'] : '';
      let i = (item && item['patient-lname']) ? item['patient-lname'] : '';
      let j = (item && item['notch_order_id']) ? String(item['notch_order_id']) : '';
      let k = (item && item['notch_name']) ? String(item['notch_name']) : '';
      let l = (item && item.status) ? String(item.status) : '';
      let m = (item && item.kit_label) ? String(item.kit_label) : '';
      let n = (item && item['patient-phday']) ? String(item['patient-phday']) : '';

      let p = (item && item.order && item.order.line_items && item.order.line_items[0] && item.order.line_items[0].name) ? item.order.line_items[0].name : '';
      let q = (item && item.order && item.order.line_items && item.order.line_items[0] && item.order.line_items[0].sku) ? item.order.line_items[0].sku : '';

      let s = (item && item.order && item.order.line_items && item.order.line_items[1] && item.order.line_items[1].name) ? item.order.line_items[0].name : '';
      let t = (item && item.order && item.order.line_items && item.order.line_items[1] && item.order.line_items[1].sku) ? item.order.line_items[0].sku : '';

      let v = (item && item.order && item.order.line_items && item.order.line_items[2] && item.order.line_items[2].name) ? item.order.line_items[0].name : '';
      let w = (item && item.order && item.order.line_items && item.order.line_items[2] && item.order.line_items[2].sku) ? item.order.line_items[0].sku : '';

      let y = (item && item.order && item.order.note_attributes && item.order.note_attributes[0] && item.order.note_attributes[0].name) ? item.order.note_attributes[0].name : '';
      let z = (item && item.order && item.order.note_attributes && item.order.note_attributes[0] && item.order.note_attributes[0].value) ? String(item.order.note_attributes[0].value) : '';

      let aa = (item && item.email) ? item.email : '';

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
        || (p.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (q.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (s.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (t.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (v.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (w.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (y.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (z.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
        || (aa.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
      ) {
        resultArray.push(item)
      }
    }
    return resultArray;


  }

}
