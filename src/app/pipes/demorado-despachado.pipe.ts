import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'demoradoDespachado'
})
export class DemoradoDespachadoPipe implements PipeTransform {

  transform(value: any[], args: string): any {
    if (args !== null && args === 'demoradoDespachado') {
      const newList = value.filter(
        (p: any) => {
          if (p[13].status === 4 && this.convertirFecha(p[7]) > 30 ) {
            return p;
          }
        }
      );
      return newList;
    } else {
      return value;
    }
  }

  convertirFecha(date: string): any {
    if (date !== '-') {
      date = date.replaceAll('<br/>', ' ');
      const hora = date.substring(0, 8);
      const fecha = date.substring(9);
      var regex = /(\d+)/g;
      var soloLetras = /([A-Za-z])\w+/g;
      const matchFecha = fecha.match(regex);
      const dia = matchFecha ? matchFecha[0] : '';
      const anio = matchFecha ? matchFecha[1] : '';
      const matchMes = fecha.match(soloLetras);
      const mes = matchMes ? matchMes[1] : '';

      const mesFound: any = this.obtenerMes(mes);
      const propiedad = Object.getOwnPropertyNames(mesFound[0]).toString();
      const mesObtenido = mesFound[0][propiedad] < 9 ? '0' + mesFound[0][propiedad].toString() : mesFound[0][propiedad].toString();
      const nuevaFecha = new Date(anio + '/' + mesObtenido + '/' + dia + ' ' + hora);
      const fechaActual = moment();
      const fechaPedido = moment(nuevaFecha);
      return fechaActual.diff(fechaPedido, 'minutes');
    }
  }

  obtenerMes(mes: any) {
    const meses = [
      { 'January': 1 },
      { 'February': 2 },
      { 'March': 3 },
      { 'April': 4 },
      { 'May': 5 },
      { 'June': 6 },
      { 'July': 7 },
      { 'August': 8 },
      { 'September': 9 },
      { 'October': 10 },
      { 'November': 11 },
      { 'December': 12 }];

    const found = meses.filter(
      (element: any) => {
        if (Object.keys(element).toString() === mes) {
          return element
        }
      });
    return found;
  }

}
