import { Pipe, PipeTransform } from '@angular/core';
import { CasesDetails } from '../models/casesDetails.interface';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(cases: CasesDetails[], page: number = 0, count: number): any {
    return cases.slice(page, page + count);
  }

}
