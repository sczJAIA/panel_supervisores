import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailLetterComponent } from './order-detail-letter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailLetterComponent,
    data: {
      tittle: 'Detalles'
    }
  }
];

@NgModule({
  declarations: [OrderDetailLetterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderDetailLetterModule { }
