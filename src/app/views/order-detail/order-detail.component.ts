import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetailSubscripcion: Subscription
  orderInfo: any = {};
  textWhatsapp = new FormControl('', [Validators.required]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PanelService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute?.paramMap.subscribe(
      (params) => {
        const orderId = params.get('orderId');
        const restaurantId = params.get('restaurantId');        
        this.getOrderDetails(orderId, restaurantId);
      }
    );
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
    window.open('https://maps.google.com/maps?q=' + this.orderInfo.delivery_latitude + '%2C' + this.orderInfo.delivery_longitude + '&z=17&hl=es');
  }
}