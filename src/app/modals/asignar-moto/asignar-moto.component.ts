import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PanelService } from '../../services/panel.service';

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

  constructor(
    public dialogRef: MatDialogRef<AsignarMotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PanelService,
    private fbuilder: FormBuilder
  ) {
    this.builderForm();
    // this.driverNameField.valueChanges.subscribe(
    //   (valueField) => {
    //     if (this.drivers.length > 0) {
    //       this.driversFiltered = this.driverNameField.valueChanges.pipe(
    //         startWith(''),
    //         map(value => this._filter(value))
    //       );
    //     }
    //   }
    // );
   }

  ngOnInit(): void {
    console.log('motos filtradas', this.driversFiltered);
    this.driversFiltered = this.driverNameField.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.getDriversActives();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.drivers.filter((option: any) => option.driver_name.toLowerCase().indexOf(filterValue) === 0);
  }

  getDriversActives(): void {
    this.drivers = [];
    this.service.getActiveDrivers(this.data.city[0].city_id).subscribe(
      (resp: any) => {
        this.drivers = resp.data;
      },
      (error: any) => {
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
    console.log(this.assignDriverForm.value);
  }

}
