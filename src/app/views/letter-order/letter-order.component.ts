import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DetalleModalComponent } from '../../modals/detalle-modal/detalle-modal.component';
import { City } from '../../models/cityList.interface';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-letter-order',
  templateUrl: './letter-order.component.html',
  styleUrls: ['./letter-order.component.scss']
})
export class LetterOrderComponent implements OnInit {
  citiesSubscripcion: Subscription;
  cityList: City[] = [];
  orders: any[] = [];
  filterId = '';
  filterDriverId = '';
  filterStatus = 'todos';
  startDate = moment().format();
  endDate = moment().format();
  range = new FormGroup({
    start: new FormControl(this.startDate),
    end: new FormControl(this.endDate)
  });
  p: number = 1;
  nextLabel = 'Siguiente';
  previousLabel = 'Anterior';
  customerSubscripcion: Subscription;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private service: PanelService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  get startDateField() {
    return this.range.get('start');
  }

  get endDateField() {
    return this.range.get('end');
  }

  ngOnInit(): void {
    console.log(this.range.value);
    this.getCityList();
    this.getDeliveryList('395', this.startDateField.value, this.endDateField.value);
  }

  getDeliveryList(cityId: string, startDate: any, endDate: any) {
    console.log('valor', startDate, endDate);
    if (endDate !== null) {
      this.blockUI.start('Obteniendo lista de pedidos...');
      const startDate2 = moment(startDate).format('YYYY-MM-DD');
      const endDate2 = moment(endDate).format('YYYY-MM-DD');
      this.service.getDeliveryListLetter(cityId, startDate2, endDate2).subscribe(
        (resp: any) => {
          this.blockUI.stop();
          this.orders = resp.aaData;
        },
        (error: any) => {
          this.blockUI.stop();
          this.toast.error('No se pudo obtener los pedidos!');
        }
      );
    }
  }
  getCityList(): void {
    this.blockUI.start('Obteniendo lista de ciudades...');
    const cityListsubscripcion = this.service.getCityList();
    this.citiesSubscripcion = cityListsubscripcion.subscribe(
      (resp: any) => {
        this.blockUI.stop();
        console.log(resp);
        this.cityList = resp.cities_list;
      },
      (error: any) => {
        this.blockUI.stop();
        this.toast.error('Ha ocurrido un error al obtener las ciudades');
      }
    );
  }
  openDialogCustomer(userId: string): void {
    this.blockUI.start('Cargando el detalle del cliente...');
    const getCustomerSubscripcion = this.service.getCustomer(userId, '0');
    this.customerSubscripcion = getCustomerSubscripcion.subscribe(
      async (resp: any) => {
        this.blockUI.stop();
        const dialogRef = await this.dialog.open(DetalleModalComponent, {
          disableClose: false,
          data: {
            resp,
            name: 'cliente'
          },
          minWidth: '80vh',
          minHeight: '80vh'
        });
      },
      (error: any) => {
        this.blockUI.stop();
        this.toast.error('Ha ocurrido un error al intentar ver al cliente');
      }
    );
  }
  openDialogDriver(driverId: any): void {
    if (driverId !== null) {
      this.blockUI.start('Cargando el detalle del conductor...');
      const getCustomerSubscripcion = this.service.getDriver(driverId, '0');
      this.customerSubscripcion = getCustomerSubscripcion.subscribe(
        async (resp: any) => {
          this.blockUI.stop();
          const dialogRef = await this.dialog.open(DetalleModalComponent, {
            disableClose: false,
            data: {
              resp,
              name: 'conductor'
            },
            minWidth: '80vh',
            minHeight: '80vh'
          });
        },
        (error: any) => {
          this.blockUI.stop();
          this.toast.error('Ha ocurrido un error al intentar ver al conductor');
        }
      );
    } else {
      this.toast.warning('Aun no tiene moto!');
    }
  }
  openOrderDetails(orderId: any): void {
    this.router.navigate(['delivery_list/deliveryList', orderId]);
  }
}
