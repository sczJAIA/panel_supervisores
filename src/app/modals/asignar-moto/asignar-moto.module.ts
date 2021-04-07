import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsignarMotoComponent } from './asignar-moto.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [AsignarMotoComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports: [AsignarMotoComponent]
})
export class AsignarMotoModule { }
