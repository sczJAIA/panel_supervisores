import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleModalComponent } from './detalle-modal.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [DetalleModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DetalleModalComponent
  ]
})
export class DetalleModalModule { }
