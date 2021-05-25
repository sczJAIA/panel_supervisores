import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'terminadosCancelados'
})
export class TerminadosCanceladosPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    if (args !== null && args === 'terminadosCancelados') {
      const newList = value.filter(
        (p: any) => {
          if (p[13].status === 2 || p[13].status === 7 || p[13].status === 3 || p[13].status === 9) {
            return p;
          }
        }
      );
      return newList;
    } else {
      return value;
    }
  }

}
