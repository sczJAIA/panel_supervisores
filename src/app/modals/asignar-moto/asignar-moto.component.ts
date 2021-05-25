import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PanelService } from '../../services/panel.service';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-asignar-moto',
  templateUrl: './asignar-moto.component.html',
  styleUrls: ['./asignar-moto.component.scss']
})
export class AsignarMotoComponent implements OnInit {

  driversFiltered: Observable<any[]>;
  driversFiltered2: Observable<any[]>;
  drivers: any[] = [];
  driversList: any[] = [];
  // driverName = new FormControl();
  assignDriverForm: FormGroup;
  loading = false;
  loading2 = false;
  user = this.service.getSessionSesion();

  constructor(
    public dialogRef: MatDialogRef<AsignarMotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PanelService,
    private fbuilder: FormBuilder
  ) {
    this.builderForm();
  }

  ngOnInit(): void {
    this.getDriversActives();
    this.getDriverListXDistances();
    this.driversFiltered = this.driverNameField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)));

    this.driversFiltered2 = this.driverNameField2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value)));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.drivers.filter((option: any) => option.driver_name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter2(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.driversList.filter((option: any) => option.user_name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(product): string {
    return product ? product.driver_name : product;
  }

  displayFn2(product): string {
    return product ? product.user_name : product;
  }

  getDriverListXDistances(): void {
    this.driversList = [];
    this.service.getDriversListXDistance(this.data.orderId, this.data.latitude, this.data.longitude).subscribe(
      (resp: any) => {
        if (resp.status === 200 && resp.message === 'Response has been sent successfully') {
          this.driversList = resp.data.drivers
          this.loading2 = true;
        }
      },
      (error: any) => {
        this.loading2 = true;
        alert('Ha ocurrido un error al momento de traer la lista del motos!');
      }
    );
  }

  getDriversActives(): void {
    this.drivers = [];
    this.service.getActiveDrivers(this.data.city[0].city_id).subscribe(
      (resp: any) => {
        this.drivers = resp.data;
        this.loading = true;
      },
      (error: any) => {
        this.loading = true;
        console.log('Ha ocurrido un errror al obtner la lista de motos');
      }
    );
  }

  builderForm() {
    this.assignDriverForm = this.fbuilder.group({
      driverName: ['', [Validators.required]],
      driverName2: ['', [Validators.required]]
    });
  }

  get driverNameField() {
    return this.assignDriverForm.get('driverName');
  }

  get driverNameField2() {
    return this.assignDriverForm.get('driverName2');
  }

  assingDriver(event: Event) {
    event.preventDefault();
    if (this.driverNameField.value !== '') {
      const driverId = this.driverNameField.value.driver_id;
      if (this.data.hasDriver) {
        this.service.unassignDriver(this.data.orderId).subscribe(
          (resp: any) => {
            console.log('respuesta de quitar moto', resp);
            if (resp.message === 'Successfully unassingned order') {
              this.service.assignDriver(this.data.orderId, driverId).subscribe(
                (response: any) => {
                  if (response.message === 'Successfully assigned driver') {
                    const month = moment().format('MM');
                    const management = moment().format('YYYY');
                    this.service.createCases(this.data.orderIdLast, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA',
                      month, management, this.user.username, this.data.idLocal, this.data.fecha, this.data.fecha2, this.data.cityId, this.data.montoPedido, this.data.montoCarrera, this.data.montoTotal)
                      .subscribe(
                        (respo: any) => {
                          if (respo.message === 'Product was created.') {
                            this.dialogRef.close();
                          }
                        },
                        (error: any) => {
                          console.log('Ha ocurrido un error al crear un caso', error);
                        }
                      );
                  }
                },
                (error: any) => {
                  console.log('Ha ocurrido un error al asignar la moto', error);
                }
              );
            }
          },
          (error: any) => {
            console.log('Ha ocurrido un error al quitar moto', error);
          }
        );
      } else {
        this.service.assignDriver(this.data.orderId, driverId).subscribe(
          (response: any) => {
            if (response.message === 'Successfully assigned driver') {
              const month = moment().format('MM');
              const management = moment().format('YYYY');
              this.service.createCases(this.data.orderId, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA', month,
                management, this.user.username, this.data.idLocal, this.data.fecha, this.data.fecha2, this.data.cityId, this.data.montoPedido, this.data.montoCarrera, this.data.montoTotal)
                .subscribe(
                  (respo: any) => {
                    if (respo.message === 'Product was created.') {
                      this.dialogRef.close();
                    }
                  },
                  (error: any) => {
                    console.log('Ha ocurrido un error al crear un caso', error);
                  }
                );
            }
          },
          (error: any) => {
            console.log('Ha ocurrido un error al asignar la moto', error);
          }
        );
      }
    } else if (this.driverNameField2.value !== '') {
      const driverId = this.driverNameField2.value.driver_id;
      if (this.data.hasDriver) {
        this.service.unassignDriver(this.data.orderId).subscribe(
          (resp: any) => {
            console.log('respuesta de quitar moto', resp);
            if (resp.message === 'Successfully unassingned order') {
              this.service.assignDriver(this.data.orderId, driverId).subscribe(
                (response: any) => {
                  if (response.message === 'Successfully assigned driver') {
                    const month = moment().format('MM');
                    const management = moment().format('YYYY');
                    this.service.createCases(this.data.orderIdLast, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA',
                      month, management, this.user.username, this.data.idLocal, this.data.fecha, this.data.fecha2, this.data.cityId, this.data.montoPedido, this.data.montoCarrera, this.data.montoTotal)
                      .subscribe(
                        (respo: any) => {
                          if (respo.message === 'Product was created.') {
                            this.dialogRef.close();
                          }
                        },
                        (error: any) => {
                          console.log('Ha ocurrido un error al crear un caso', error);
                        });
                  }
                },
                (error: any) => {
                  console.log('Ha ocurrido un error al asignar la moto', error);
                });
            }
          },
          (error: any) => {
            console.log('Ha ocurrido un error al quitar moto', error);
          });
      } else {
        this.service.assignDriver(this.data.orderId, driverId).subscribe(
          (response: any) => {
            if (response.message === 'Successfully assigned driver') {
              const month = moment().format('MM');
              const management = moment().format('YYYY');
              this.service.createCases(this.data.orderId, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA', month,
                management, this.user.username, this.data.idLocal, this.data.fecha, this.data.fecha2, this.data.cityId, this.data.montoPedido, this.data.montoCarrera, this.data.montoTotal)
                .subscribe(
                  (respo: any) => {
                    if (respo.message === 'Product was created.') {
                      this.dialogRef.close();
                    }
                  },
                  (error: any) => {
                    console.log('Ha ocurrido un error al crear un caso', error);
                  });
            }
          },
          (error: any) => {
            console.log('Ha ocurrido un error al asignar la moto', error);
          });
      }
    } else {
      alert('Debe seleccionar al menos un conductor!');
    }
  }
}