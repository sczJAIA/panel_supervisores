import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacionComponent } from './confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ConfirmacionComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ConfirmacionComponent]
})
export class ConfirmacionModule { }
