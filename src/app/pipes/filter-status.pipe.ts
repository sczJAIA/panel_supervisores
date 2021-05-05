import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(value: any, args: any[]): any {
    if (args !== null && args.length > 0) {
      const resultOrder = [];
      args.forEach(
        (arg: string) => {
          for (const order of value) {
            let orderStatus = order[13].status;
            orderStatus = orderStatus.toString()
            if (orderStatus.indexOf(arg) > -1) {
              resultOrder.push(order);
            }
          }
        });
      return resultOrder;
    } else {
      return value;
    }
  }

}
