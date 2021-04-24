import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPrice'
})
export class SortPricePipe implements PipeTransform {

  transform(value: any): any {
    const resultOrder = [];
    const resultFalse = [];
    for (const item of value) {
      if (item[13].status === 0 || item[13].status === 8) {
        const index = item[6].indexOf('<br/>');
        const cut = item[6].slice(-1 - index);
        item[18] = parseFloat(cut);
        resultOrder.push(item);
      } else {
        item[18] = 0;
        resultFalse.push(item);
      }
    }

    const resultTem = resultOrder.concat(resultFalse);
    const Final = resultTem.sort( (a, b) => {
      return b[18] - a[18]
    });
    return Final;
  }

}
