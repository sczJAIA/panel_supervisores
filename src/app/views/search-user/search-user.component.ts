import { ToastrService } from 'ngx-toastr';
import { PanelService } from './../../services/panel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  searchForm: FormGroup;
  customer: any = {};
  driver: any = {};
  reason: any[] = [];
  @BlockUI() blockUI: NgBlockUI;


  constructor(
    private fbuilder: FormBuilder,
    private service: PanelService,
    private toast: ToastrService
  ) {
    this.formBuilder();
    // this.userField.setValue('cliente');
  }

  ngOnInit(): void {
    const sesionJson = this.service.getSessionSesion();
    console.log(sesionJson);
    if (sesionJson === false) { // null
      window.location.href = 'https://labs.patio.com.bo/?salir=1';
    }
  }

  formBuilder() {
    this.searchForm = this.fbuilder.group({
      user: ['', [Validators.required]],
      phone: ['', []],
      id: ['', []]
    });
  }

  get userField() {
    return this.searchForm.get('user');
  }

  get phoneField() {
    return this.searchForm.get('phone');
  }

  get idField() {
    return this.searchForm.get('id');
  }

  get phoneFieldInvalid() {
    return this.phoneField.invalid && this.phoneField.touched;
  }

  get phoneFieldValid() {
    return this.phoneField.valid && this.phoneField.touched;
  }

  get idFieldInvalid() {
    return this.idField.invalid && this.idField.touched;
  }

  get idFieldValid() {
    return this.idField.valid && this.idField.touched;
  }

  search(event: Event) {
    event.preventDefault();
    this.blockUI.start('Buscando...');
    if (this.searchForm.valid) {
      this.reason = [];
      this.customer = {};
      this.driver = {};
      if (this.userField.value === 'cliente') {

        if (this.phoneField.value !== '') {
          let numero = this.phoneField.value;
          numero = numero.replaceAll(' ', '');
          if (numero.includes('+591')) {
            this.service.getCustomer(numero, '2', '+591').subscribe(
              (resp: any) => {
                this.blockUI.stop();
                this.toast.success('Usuario encontrado!');
                this.customer = resp;
                console.log(resp);
              },
              (error: any) => {
                this.blockUI.stop();
                this.toast.error('Ocurrio un error al buscar!!!');
                console.log(error);
              }
            );
          } else if (!numero.includes('+591')) {
            let numero2 = '+591' + this.phoneField.value;
            numero2 = numero2.replaceAll(' ', '');
            this.service.getCustomer(numero2, '2', '+591').subscribe(
              (resp: any) => {
                this.blockUI.stop();
                this.toast.success('Usuario encontrado!');
                this.customer = resp;
                console.log(resp);
              },
              (error: any) => {
                this.blockUI.stop();
                this.toast.error('Ocurrio un error al buscar!!!');
                console.log(error);
              }
            );
          }
        } else if (this.idField.value !== '') {
          let idCliente = this.idField.value;
          idCliente = idCliente.replaceAll(' ', '');
          this.service.getCustomer(idCliente).subscribe(
            (resp: any) => {
              this.blockUI.stop();
              this.customer = resp;
            },
            (error: any) => {
              this.blockUI.stop();
              this.toast.error('No se encontraron datos!');
            }
          );
        } else {
          this.blockUI.stop();
          this.toast.error('Datos insuficientes para buscar!');
        }

      } else if (this.userField.value === 'conductor') {

        if (this.phoneField.value !== '') {
          let numero = this.phoneField.value;
          numero = numero.replaceAll(' ', '');
          if (numero.includes('+591')) {
            this.service.getDriver(numero, '2').subscribe(
              (resp: any) => {
                if (resp?.log === 'Invalid Driver id') {
                  this.blockUI.stop();
                  this.toast.error('No se encontro a la moto!');
                } else {
                  this.driver = resp;
                  console.log(resp);
                  this.service.getSuspensionLogDriver(this.driver['Driver Id'], this.driver['City']).subscribe(
                    (resp2: any) => {
                      this.reason = resp2.data;
                      this.blockUI.stop();
                      this.toast.success('Usuario encontrado!');
                    },
                    (error: any) => {
                      this.blockUI.stop();
                      this.toast.error('Ocurrio un error al buscar!!!');
                      console.log(error);
                    }
                  );
                }
              },
              (error: any) => {
                this.blockUI.stop();
                this.toast.error('Ocurrio un error al buscar!!!');
                console.log(error);
              }
            );
          } else if (!numero.includes('+591')) {
            let numero2 = '+591' + this.phoneField.value;
            numero2 = numero2.replaceAll(' ', '');
            this.service.getDriver(numero2, '2').subscribe(
              (resp: any) => {
                if (resp?.log === 'Invalid Driver id') {
                  this.blockUI.stop();
                  this.toast.error('No se encontro a la moto!');
                } else {
                  this.driver = resp;
                  console.log(resp);
                  this.service.getSuspensionLogDriver(this.driver['Driver Id'], this.driver['City']).subscribe(
                    (resp2: any) => {
                      this.reason = resp2.data;
                      this.blockUI.stop();
                      this.toast.success('Usuario encontrado!');
                    },
                    (error: any) => {
                      this.blockUI.stop();
                      this.toast.error('Ocurrio un error al buscar!!!');
                      console.log(error);
                    }
                  );
                }
              },
              (error: any) => {
                this.blockUI.stop();
                this.toast.error('Ocurrio un error al buscar!!!');
                console.log(error);
              }
            );
          }
        } else if (this.idField.value !== '') {
          let idDriver = this.idField.value;
          idDriver = idDriver.replaceAll(' ', '');
          this.service.getDriver(idDriver).subscribe(
            (resp: any) => {
              this.driver = resp;
              this.service.getSuspensionLogDriver(this.driver['Driver Id'], this.driver['City']).subscribe(
                (resp2: any) => {
                  this.blockUI.stop();
                  this.reason = resp2.data;
                  this.toast.success('Usuario encontrado!');
                },
                (error: any) => {
                  this.blockUI.stop();
                  this.toast.error('Ocurrio un error al buscar!!!');
                  console.log(error);
                }
              );
            },
            (error: any) => {
              this.blockUI.stop();
              this.toast.error('No se encontro al conductor');
            }
          );
        } else {
          this.blockUI.stop();
          this.toast.error('Datos insuficientes para buscar!');
        }
      }
    } else {
      this.blockUI.stop();
      this.toast.error('Datos invalidos!!!');
      this.searchForm.markAllAsTouched();
    }
  }

}
