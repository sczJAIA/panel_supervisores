import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

const routes: Routes = [
  {
    path: '',
    component: LogoutComponent,
    data: {
      title: 'Log Out'
    }
  }
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BlockUIModule.forRoot()
  ]
})
export class LogoutModule { }
