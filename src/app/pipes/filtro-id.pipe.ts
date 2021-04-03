import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroId'
})
export class FiltroIdPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0) {
      const resultOrder = [];
      for (const order of value) {
        const orderId = order[13].order_id;
        if (orderId.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1) {
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
