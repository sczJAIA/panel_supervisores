import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rechazar-descripcion',
  templateUrl: './rechazar-descripcion.component.html',
  styleUrls: ['./rechazar-descripcion.component.scss']
})
export class RechazarDescripcionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RechazarDescripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  form = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close({ flag: false });
  }

  onClick() {
    if (this.form.valid) {
      const respJson = { form: this.form.value, flag: true };
      this.dialogRef.close(respJson);
    } else {
      this.form.markAllAsTouched();
    }
  }

}
