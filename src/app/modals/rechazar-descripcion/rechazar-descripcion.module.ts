import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechazarDescripcionComponent } from './rechazar-descripcion.component';



@NgModule({
  declarations: [RechazarDescripcionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RechazarDescripcionComponent]
})
export class RechazarDescripcionModule { }
