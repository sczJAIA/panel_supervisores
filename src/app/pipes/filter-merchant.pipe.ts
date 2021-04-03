import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMerchant'
})
export class FilterMerchantPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (value !== undefined && arg !== undefined && arg.length > 0) {
      const resultOrder = [];
      for (const merchant of value) {
        const firstSearch = merchant[2].indexOf('>') + 1;
        const firstCut = merchant[2].slice(firstSearch);
        const secondSearch = firstCut.indexOf('<');
        const secondCut = firstCut.slice(0, secondSearch);
        if (secondCut.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
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
