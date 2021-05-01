import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { SearchUserComponent } from './search-user.component';


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
