import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPhoneCustomer'
})
export class FilterPhoneCustomerPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0) {
      const resultOrder = [];
      for (const merchant of value) {
        const firstSearch = merchant[1].indexOf('>') + 1;
        const firstCut = merchant[1].slice(firstSearch);
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
