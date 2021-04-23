import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countFilter'
})
export class CountFilterPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0 && arg !== 'todos') {
      const resultOrder = [];
      for (const order of value) {
        const orderStatus = order[13].status;
        if (orderStatus.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultOrder.push(order);
        }
      }
      return resultOrder.length;
    } else {
      return value.length;
    }
  }

}
