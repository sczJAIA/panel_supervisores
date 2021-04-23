import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailsComponent } from './case-details.component';
import { PaginationPipe } from '../../pipes/pagination.pipe';

const routes: Routes = [
  {
    path: '',
    component: CaseDetailsComponent
  }
];

@NgModule({
  declarations: [CaseDetailsComponent, PaginationPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CaseDetailsModule { }
