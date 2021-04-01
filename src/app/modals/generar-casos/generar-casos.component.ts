import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { PanelService } from '../../services/panel.service';
import * as moment from 'moment';
@Component({
  selector: 'app-generar-casos',
  templateUrl: './generar-casos.component.html',
  styleUrls: ['./generar-casos.component.scss']
})
export class GenerarCasosComponent implements OnInit {
  caseForm: FormGroup;
  colorChecked = 'primary';

  constructor(
    public dialogRef: MatDialogRef<GenerarCasosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: PanelService
  ) {
    this.builderForm();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  builderForm(): void {
    this.caseForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      pickOrder: [false, []],
      returnMoney: [false, []],
      lockDriver: [false, []],
      chargeCommission: [false, []],
      refundUser: [false, []],
      lockUser: [false, []],
      reportLocal: [false, []],
      customerContact: [false, []],
      localContact: [false, []]
    });

    this.caseForm.valueChanges.pipe(debounceTime(3000)).subscribe(
      (value: any) => {
        console.log(value);
      }
    );
  }

  get descriptionField() {
    return this.caseForm.get('description');
  }

  sendCases(event: Event): void {
    event.preventDefault();
    if (this.caseForm.valid) {
      const currenDate = moment();
      const month = currenDate.format('MM');
      const management = currenDate.format('YYYY');
      this.service.createCases(this.data[0], this.caseForm.value, '0', this.descriptionField.value, month, 
      management, this.data[13].user_id)
      .subscribe(
        (resp: any) => {
          console.log('Respuesta exitosa', resp);
          this.caseForm.reset();
        },
        (error: any) => {
          console.log('Ha ocurrido un error', error);
        }
      );
    } else {
      this.caseForm.markAllAsTouched();
    }
  }
}
