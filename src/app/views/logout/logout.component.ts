import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  constructor() {
   }

  ngOnInit(): void {
    this.blockUI.start('....');
    localStorage.clear();
    window.location.href = 'https://labs.patio.com.bo/?salir=1';
    this.blockUI.stop();
  }

}
