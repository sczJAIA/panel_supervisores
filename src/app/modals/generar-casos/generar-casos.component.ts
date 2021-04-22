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
  user = this.service.getSessionSesion();

  constructor(
    public dialogRef: MatDialogRef<GenerarCasosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: PanelService
  ) {
    this.builderForm();
  }

  ngOnInit(): void {
    console.log(this.user.username);
    this.checkedspickOrderField();
    this.checkedsreturnMoneyField();
    this.checkedslockDriverField();
    this.checkedschargeCommissionField();
    this.checkedsrefundUserField();
    this.checkedslockUserField();
    this.checkedsreportLocalField();
  }

  builderForm(): void {
    this.caseForm = this.formBuilder.group({
      pickOrder: [false, []],
      pickOrderDescription: ['', [Validators.required]],
      returnMoney: [false, []],
      returnMoneyDescription: ['', [Validators.required]],
      lockDriver: [false, []],
      lockDriverDescription: ['', [Validators.required]],
      chargeCommission: [false, []],
      chargeCommissionDescription: ['', [Validators.required]],
      refundUser: [false, []],
      refundUserDescription: ['', [Validators.required]],
      lockUser: [false, []],
      lockUserDescription: ['', [Validators.required]],
      reportLocal: [false, []],
      reportLocalDescription: ['', [Validators.required]]
    });

    this.caseForm.valueChanges.pipe(debounceTime(500)).subscribe(
      (value: any) => {
        console.log(value);
        console.log(this.caseForm.status);
      }
    );
    this.pickOrderField.valueChanges.subscribe(
      (value: any) => {
        this.checkedspickOrderField();
      }
    );
    this.returnMoneyField.valueChanges.subscribe(
      (value: any) => {
        this.checkedsreturnMoneyField();
      }
    );
    this.lockDriverField.valueChanges.subscribe(
      (value: any) => {
        this.checkedslockDriverField();
      }
    );
    this.chargeCommissionField.valueChanges.subscribe(
      (value: any) => {
        this.checkedschargeCommissionField();
      }
    );
    this.refundUserField.valueChanges.subscribe(
      (value: any) => {
        this.checkedsrefundUserField();
      }
    );
    this.lockUserField.valueChanges.subscribe(
      (value: any) => {
        this.checkedslockUserField();
      }
    );
    this.reportLocalField.valueChanges.subscribe(
      (value: any) => {
        this.checkedsreportLocalField();
      }
    );
  }

  checkedsreturnMoneyField() {
    if (!this.returnMoneyField.value) {
      this.returnMoneyDescriptionField.disable();
    } else {
      this.returnMoneyDescriptionField.enable();
    }
  }

  checkedslockDriverField() {
    if (!this.lockDriverField.value) {
      this.lockDriverDescriptionField.disable();
    } else {
      this.lockDriverDescriptionField.enable();
    }
  }

  checkedschargeCommissionField() {
    if (!this.chargeCommissionField.value) {
      this.chargeCommissionDescriptionField.disable();
    } else {
      this.chargeCommissionDescriptionField.enable();
    }
  }

  checkedsrefundUserField() {
    if (!this.refundUserField.value) {
      this.refundUserDescriptionField.disable();
    } else {
      this.refundUserDescriptionField.enable();
    }
  }

  checkedslockUserField() {
    if (!this.lockUserField.value) {
      this.lockUserDescriptionField.disable();
    } else {
      this.lockUserDescriptionField.enable();
    }
  }

  checkedsreportLocalField() {
    if (!this.reportLocalField.value) {
      this.reportLocalDescriptionField.disable();
    } else {
      this.reportLocalDescriptionField.enable();
    }
  }

  checkedspickOrderField() {
    if (!this.pickOrderField.value) {
      this.pickOrderDescriptionField.disable();
    } else {
      this.pickOrderDescriptionField.enable();
    }
  }

  get descriptionField() {
    return this.caseForm.get('description');
  }
  get pickOrderField() {
    return this.caseForm.get('pickOrder');
  }
  get returnMoneyField() {
    return this.caseForm.get('returnMoney');
  }
  get lockDriverField() {
    return this.caseForm.get('lockDriver');
  }
  get chargeCommissionField() {
    return this.caseForm.get('chargeCommission');
  }
  get refundUserField() {
    return this.caseForm.get('refundUser');
  }
  get lockUserField() {
    return this.caseForm.get('lockUser');
  }
  get reportLocalField() {
    return this.caseForm.get('reportLocal');
  }
  get customerContactField() {
    return this.caseForm.get('customerContact');
  }
  get localContactField() {
    return this.caseForm.get('localContact');
  }



  get pickOrderDescriptionField() {
    return this.caseForm.get('pickOrderDescription');
  }
  get returnMoneyDescriptionField() {
    return this.caseForm.get('returnMoneyDescription');
  }
  get lockDriverDescriptionField() {
    return this.caseForm.get('lockDriverDescription');
  }
  get chargeCommissionDescriptionField() {
    return this.caseForm.get('chargeCommissionDescription');
  }
  get refundUserDescriptionField() {
    return this.caseForm.get('refundUserDescription');
  }
  get lockUserDescriptionField() {
    return this.caseForm.get('lockUserDescription');
  }
  get reportLocalDescriptionField() {
    return this.caseForm.get('reportLocalDescription');
  }


  sendCases(event: Event): void {
    event.preventDefault();
    if (this.caseForm.valid) {
      const currenDate = moment();
      const month = currenDate.format('MM');
      const management = currenDate.format('YYYY');
      if (this.pickOrderField.value) {
        this.service.createCases(this.data[0], 'recoger pedido', '0', this.pickOrderDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.returnMoneyField.value) {
        this.service.createCases(this.data[0], 'reembolsar moto', '0', this.returnMoneyDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.lockDriverField.value) {
        // bloquear moto
        this.service.createCases(this.data[0], 'bloquear moto', '0', this.lockDriverDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.chargeCommissionField.value) {
        this.service.createCases(this.data[0], 'cobrar comision', '0', this.chargeCommissionDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.refundUserField.value) {
        this.service.createCases(this.data[0], 'reembolsar usuario', '0', this.refundUserDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.lockUserField.value) {
        // function bloquear usuario
        this.service.createCases(this.data[0], 'bloquear usuario', '0', this.lockUserDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
      if (this.reportLocalField.value) {
        this.service.createCases(this.data[0], 'reportar local', '0', this.reportLocalDescriptionField.value, month,
        management, this.user.username)
        .subscribe(
          (resp: any) => {
            console.log('Respuesta exitosa', resp);
            this.caseForm.reset();
          },
          (error: any) => {
            console.log('Ha ocurrido un error', error);
          }
        );
      }
    } else {
      this.caseForm.markAllAsTouched();
    }
  }
}
