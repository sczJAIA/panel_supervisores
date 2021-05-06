import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetailSubscripcion: Subscription
  orderInfo: any = {};
  textWhatsapp = new FormControl('', [Validators.required]);
  redirectJugno = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PanelService,
    private toast: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const sesionJson = this.service.getSessionSesion();
    console.log(sesionJson);
    if ( sesionJson === null) {
      window.location.href = 'https://labs.patio.com.bo/?salir=1';
    }
    this.activatedRoute?.paramMap.subscribe(
      (params) => {
        const orderId = params.get('orderId');
        const restaurantId = params.get('restaurantId');
        this.getOrderDetails(orderId, restaurantId);
        this.redirectJugno = 'https://fatafat.ec2dashboard.com/#/app/orderDetails/' + orderId + '/' + restaurantId;
      }
    );
  }

  goBack() {
    this.location.back();
  }

  getOrderDetails(orderId: string, restaurantId: string) {
    const getOrderDetailSubscripcion = this.service.getOrderDetail(orderId, restaurantId);
    this.orderDetailSubscripcion = getOrderDetailSubscripcion.subscribe(
      (resp: any) => {
        this.orderInfo = resp.order_info[0];
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al intentar obtener el detalle del pedido');
      }
    );
  }

   sendMessage(name: string) {
    switch (name) {
      case 'cliente':
        if (this.textWhatsapp.valid) {
          window.open('https://api.whatsapp.com/send?phone=' + this.orderInfo.phone_no + '&text=' + this.textWhatsapp.value);
        } else {
          this.textWhatsapp.markAllAsTouched();
        }
        break;
      case 'comercio':
        if (this.textWhatsapp.valid) {
          window.open('https://api.whatsapp.com/send?phone=' + this.orderInfo.calling_number + '&text=' + this.textWhatsapp.value);
        } else {
          this.textWhatsapp.markAllAsTouched();
        }
        break;
      default:
        break;
    }
  }

  mapView() {
    window.open('https://www.google.com/maps/dir/' + this.orderInfo.latitude + ',' + this.orderInfo.longitude + '/' + this.orderInfo.delivery_latitude + ',' + this.orderInfo.delivery_longitude + '/@' + this.orderInfo.delivery_latitude + ',' + this.orderInfo.delivery_longitude + ',15z');
    // window.open('https://maps.google.com/maps?q=' + this.orderInfo.delivery_latitude + '%2C' + this.orderInfo.delivery_longitude + '&z=17&hl=es');
  }
}
