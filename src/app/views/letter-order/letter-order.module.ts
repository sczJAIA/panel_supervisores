import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LetterOrderComponent } from './letter-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterOrderIdLetterPipe } from '../../pipes/filter-order-id-letter.pipe';
import { FilterDriverIdLetterPipe } from '../../pipes/filter-driver-id-letter.pipe';
import { FilterStatusLetterPipe } from '../../pipes/filter-status-letter.pipe';


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
    MatFormFieldModule
  ]
})
export class LetterOrderModule { }
