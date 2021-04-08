import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LetterOrderComponent } from './letter-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  declarations: [LetterOrderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LetterOrderModule { }
