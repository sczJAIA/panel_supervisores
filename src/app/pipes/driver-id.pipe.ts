import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'driverId'
})
export class DriverIdPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0) {
      const resultOrder = [];
      for (const merchant of value) {
        const firstSearch = merchant[9].indexOf('<');
        const firstCut = merchant[9].substring(0, firstSearch);
        if (firstCut.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultOrder.push(merchant);
        }
      }
      return resultOrder;
    }
    else {
      return value;
    }
  }
}
