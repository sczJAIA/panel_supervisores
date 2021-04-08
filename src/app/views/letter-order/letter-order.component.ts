import { Component, OnInit } from '@angular/core';
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
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');

  constructor(
    private service: PanelService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCityList();
    this.getDeliveryList('395', this.startDate, this.endDate);
  }

  getDeliveryList(cityId: string, startDate: string, endDate: string) {
    console.log(cityId);
    this.service.getDeliveryListLetter(cityId, startDate, endDate).subscribe(
      (resp: any) => {
        this.orders = resp.aaData;
      },
      (error: any) => {
        this.toast.error('No se pudo obtener los pedidos!');
      }
    );
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
