import { ToastrService } from 'ngx-toastr';
import { PanelService } from './../../services/panel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  searchForm: FormGroup;
  customer: any = {};
  driver: any = {};
  reason :any[] = [];
  @BlockUI() blockUI: NgBlockUI;


  constructor(
    private fbuilder: FormBuilder,
    private service: PanelService,
    private toast: ToastrService
  ) {
    this.formBuilder();
  }

  ngOnInit(): void {
    const sesionJson = this.service.getSessionSesion();
    console.log(sesionJson);
    if ( sesionJson === null) {
      window.location.href = 'https://labs.patio.com.bo/?salir=1';
    }
  }

  formBuilder() {
    this.searchForm = this.fbuilder.group({
      user: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.searchForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
  }

  get userField() {
    return this.searchForm.get('user');
  }

  get phoneField() {
    return this.searchForm.get('phone');
  }

  search(event: Event) {
    event.preventDefault();
    this.blockUI.start('Buscando...');
    if (this.searchForm.valid) {
      this.reason = [];
      this.customer = {};
      this.driver = {};
      if (this.userField.value === 'cliente') {
        const numero = this.phoneField.value;
        if (numero.includes('+591')) {
          this.service.getCustomer(this.phoneField.value, '2', '+591').subscribe(
            ( resp: any ) => {
              this.blockUI.stop();
              this.toast.success('Usuario encontrado!');
              this.customer = resp;
              console.log(resp);
            },
            ( error: any ) => {
              this.blockUI.stop();
              this.toast.error('Ocurrio un error al buscar!!!');
              console.log(error);
            }
          );
        } else if (!numero.includes('+591')) {
          const numero2 = '+591' + this.phoneField.value;
          this.service.getCustomer(numero2, '2', '+591').subscribe(
            ( resp: any ) => {
              this.blockUI.stop();
              this.toast.success('Usuario encontrado!');
              this.customer = resp;
              console.log(resp);
            },
            ( error: any ) => {
              this.blockUI.stop();
              this.toast.error('Ocurrio un error al buscar!!!');
              console.log(error);
            }
          );
        }
      } else if (this.userField.value === 'conductor') {

        const numero = this.phoneField.value;
        if (numero.includes('+591')) {
          this.service.getDriver(this.phoneField.value, '2').subscribe(
            ( resp: any ) => {
              this.driver = resp;
              console.log(resp);
              this.service.getSuspensionLogDriver(this.driver['Driver Id'], this.driver['City']).subscribe(
                (resp2: any) => {
                  this.reason = resp2.data;
                  this.blockUI.stop();
                  this.toast.success('Usuario encontrado!');
                },
                ( error: any ) => {
                  this.blockUI.stop();
                  this.toast.error('Ocurrio un error al buscar!!!');
                  console.log(error);
                }
              );
            },
            ( error: any ) => {
              this.blockUI.stop();
              this.toast.error('Ocurrio un error al buscar!!!');
              console.log(error);
            }
          );
        } else if (!numero.includes('+591')) {
          const numero2 = '+591' + this.phoneField.value;
          this.service.getDriver(numero2, '2').subscribe(
            ( resp: any ) => {
              this.driver = resp;
              console.log(resp);
              this.service.getSuspensionLogDriver(this.driver['Driver Id'], this.driver['City']).subscribe(
                (resp2: any) => {
                  this.reason = resp2.data;
                  this.blockUI.stop();
                  this.toast.success('Usuario encontrado!');
                },
                ( error: any ) => {
                  this.blockUI.stop();
                  this.toast.error('Ocurrio un error al buscar!!!');
                  console.log(error);
                }
              );
            },
            ( error: any ) => {
              this.blockUI.stop();
              this.toast.error('Ocurrio un error al buscar!!!');
              console.log(error);
            }
          );
        }
      }
    } else {
      this.blockUI.stop();
      this.toast.error('Ocurrio un error al buscar!!!');
      this.searchForm.markAllAsTouched();
    }
  }

}
