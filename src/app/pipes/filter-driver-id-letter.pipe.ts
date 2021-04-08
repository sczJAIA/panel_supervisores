import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDriverIdLetter'
})
export class FilterDriverIdLetterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0 && !isNaN(arg)) {
      const resultOrder = [];
      for (const order of value) {
        const driverId = order?.driver_id?.toString();
        if (driverId?.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
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
