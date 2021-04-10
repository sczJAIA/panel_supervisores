import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleModalModule } from '../../modals/detalle-modal/detalle-modal.module';
import { FilterDriverIdLetterPipe } from '../../pipes/filter-driver-id-letter.pipe';
import { FilterOrderIdLetterPipe } from '../../pipes/filter-order-id-letter.pipe';
import { FilterStatusLetterPipe } from '../../pipes/filter-status-letter.pipe';
import { LetterOrderComponent } from './letter-order.component';


const routes: Routes = [
  {
    path: 'deliveryList',
    component: LetterOrderComponent,
    data: {
      title: 'List'
    }
  }
];
@NgModule({
  declarations: [LetterOrderComponent, FilterOrderIdLetterPipe, FilterDriverIdLetterPipe, FilterStatusLetterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxPaginationModule,
    DetalleModalModule
  ]
})
export class LetterOrderModule { }
