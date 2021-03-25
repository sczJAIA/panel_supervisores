import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-detalle-modal',
  templateUrl: './detalle-modal.component.html',
  styleUrls: ['./detalle-modal.component.scss']
})
export class DetalleModalComponent implements OnInit {

  textWhatsapp = new FormControl('', [Validators.required]);
  dateRegistered = '';
  lastLogin = '';


  constructor(
    public dialogRef: MatDialogRef<DetalleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // moment(this.data?.resp['Date Registered']).fromNow();
    switch (this.data.name) {
      case 'cliente':
        this.dateRegistered = moment(this.data?.resp['Date Registered']).fromNow();
        break;
      case 'conductor':
        this.dateRegistered = moment(this.data?.resp['Joining Date']).fromNow();
        this.lastLogin = moment(this.data?.resp.last_login).fromNow();
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
  }

  sendMessage() {
    switch (this.data.name) {
      case 'cliente':
        window.open('https://api.whatsapp.com/send?phone=' + this.data.resp.phone_no + '&text=' + this.textWhatsapp.value);
        break;
      case 'conductor':
        window.open('https://api.whatsapp.com/send?phone=' + this.data.resp['Phone No'] + '&text=' + this.textWhatsapp.value);
        break;
      default:
        break;
    }
  }

  mapView() {

    switch (this.data.name) {
      case 'cliente':
        window.open('https://maps.google.com/maps?q=' + this.data.resp.user_loc.current_location_latitude + '%2C' + this.data.resp.user_loc.current_location_longitude + '&z=17&hl=es');
        break;
      case 'conductor':
        window.open('https://maps.google.com/maps?q=' + this.data.resp.last_lat + '%2C' + this.data.resp.last_long + '&z=17&hl=es');
        break;
      default:
        break;
    }
  }

}
