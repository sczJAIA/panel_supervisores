import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchUserComponent } from './search-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

const routes: Routes = [
  {
    path: '',
    component: SearchUserComponent,
    data: {
      title: 'Users'
    }
  }
];

@NgModule({
  declarations: [SearchUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BlockUIModule.forRoot()
  ]
})
export class SearchUserModule { }
