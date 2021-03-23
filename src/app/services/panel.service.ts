import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private http: HttpClient
  ) { }

  getDeliveryList(){
    
  }
}
