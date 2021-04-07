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
  drivers: any[] = [];
  // driverName = new FormControl();
  assignDriverForm: FormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AsignarMotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PanelService,
    private fbuilder: FormBuilder
  ) {
    this.builderForm();
   }

  ngOnInit(): void {
    console.log('data', this.data);
    this.getDriversActives();
    this.driversFiltered = this.driverNameField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.drivers.filter((option: any) => option.driver_name.toLowerCase().indexOf(filterValue) === 0);
  }
  displayFn(product): string {
    return product ? product.driver_name : product;
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
      driverName: ['', [Validators.required]]
    });
  }

  get driverNameField() {
    return this.assignDriverForm.get('driverName');
  }

  assingDriver(event: Event) {
    event.preventDefault();
    if (this.assignDriverForm.valid) {
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
                    this.service.createCases(this.data.orderIdLast, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA', month, management, 'DESDE EL MODAL')
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
              this.service.createCases(this.data.orderId, 'ASIGNAR MOTO', '0', 'ASIGNACION AUTOMATICA', month, management, 'DESDE EL MODAL')
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
      // this.service.assignDriver().subscribe();
    } else {
      this.assignDriverForm.markAllAsTouched();
    }
  }

}
