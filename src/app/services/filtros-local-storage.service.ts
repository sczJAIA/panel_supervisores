import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosLocalStorageService {

  constructor() { }

  setCity(citySelected: string, index: string){
    const json = {
      citySelected,
      index
    };
    localStorage.setItem('ciudadSeleccionada', JSON.stringify(json));
  }
  getCity(){
    return JSON.parse(localStorage.getItem('ciudadSeleccionada'));
  }

  setDate(startDate: string, endDate: string){
    const json = {
      startDate,
      endDate
    };
    localStorage.setItem('dateSelected', JSON.stringify(json));
  }
  getDate(){
    return JSON.parse(localStorage.getItem('dateSelected'));
  }
}
