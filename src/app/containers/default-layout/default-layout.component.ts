import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  user = '';

  constructor(
    private service: PanelService
  ) {}

  ngOnInit() {
    const userSession = this.service.getSessionSesion();
    this.user = userSession?.username;
    this.user = this.user.toUpperCase();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
