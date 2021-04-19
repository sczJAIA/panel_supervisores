import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PanelService } from '../../services/panel.service';
import { FormControl, Validators } from '@angular/forms';
import { OrderDetailLetterI } from '../../models/orderDetailsLetter';

@Component({
  selector: 'app-order-detail-letter',
  templateUrl: './order-detail-letter.component.html',
  styleUrls: ['./order-detail-letter.component.scss']
})
export class OrderDetailLetterComponent implements OnInit {

  redirectJugno = '';
  orderDetailSubscripcion: Subscription;
  orderInfo: OrderDetailLetterI;
  textWhatsapp = new FormControl('', [Validators.required]);
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PanelService,
    private toast: ToastrService
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
        this.getOrderDetails(orderId);
        this.redirectJugno = 'https://fatafat.ec2dashboard.com/#/app/orderDetails/' + orderId;
      }
    );
  }

  getOrderDetails(orderId: string) {
    const getOrderDetailSubscripcion = this.service.getOrderDetailLetter(orderId);
    this.orderDetailSubscripcion = getOrderDetailSubscripcion.subscribe(
      (resp: any) => {
        const orderDetails = resp.order_details;
        const userDetails = resp.user_details;
        this.orderInfo =  Object.assign(orderDetails, userDetails);
        console.log('INFO', JSON.stringify(this.orderInfo));
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
      // case 'comercio':
      //   if (this.textWhatsapp.valid) {
      //     window.open('https://api.whatsapp.com/send?phone=' + this.orderInfo.calling_number + '&text=' + this.textWhatsapp.value);
      //   } else {
      //     this.textWhatsapp.markAllAsTouched();
      //   }
      //   break;
      default:
        break;
    }
  }

  mapView() {
    window.open('https://www.google.com/maps/dir/' + this.orderInfo.from_latitude + ',' + this.orderInfo.from_longitude + '/' + this.orderInfo.to_latitude + ',' + this.orderInfo.to_longitude + '/@' + this.orderInfo.to_latitude + ',' + this.orderInfo.to_longitude + ',15z');
  }

}
