import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
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

  constructor(
    private service: PanelService,
    private toast: ToastrService
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
      const startDate2 = moment(startDate).format('YYYY-MM-DD');
      const endDate2 = moment(endDate).format('YYYY-MM-DD');
      this.service.getDeliveryListLetter(cityId, startDate2, endDate2).subscribe(
        (resp: any) => {
          this.orders = resp.aaData;
        },
        (error: any) => {
          this.toast.error('No se pudo obtener los pedidos!');
        }
      );
    }
  }
  getCityList(): void {
    const cityListsubscripcion = this.service.getCityList();
    this.citiesSubscripcion = cityListsubscripcion.subscribe(
      (resp: any) => {
        console.log(resp);
        this.cityList = resp.cities_list;
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al obtener las ciudades');
      }
    );
  }
}
