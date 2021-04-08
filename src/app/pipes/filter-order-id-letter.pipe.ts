import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrderIdLetter'
})
export class FilterOrderIdLetterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0 && !isNaN(arg)) {
      const resultOrder = [];
      for (const order of value) {
        if (order.order_id.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultOrder.push(order);
        }
      }
      return resultOrder;
    }
    else {
      return value;
    }
  }

}
