import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private http: HttpClient
  ) { }

  getDeliveryList(cityId: string, startDate: string, endDate: string) {
    const url = 'https://prod-fresh-api.jugnoo.in:4040/admin/get_orders?token=83c61c67c064fab7a8be68ead432c51a&secret=P7JlZXiRiIvSssQSSzqs&city=' + cityId + '&start_date=' + startDate + '&end_date=' + endDate + '&fetch_previous_orders=1&locale=en&sEcho=1&iColumns=12&sColumns=%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=100000&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=false&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=false&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=false&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=false&mDataProp_11=&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=desc&iSortingCols=1&_=1616539200339';
    return this.http.get(url);
  }
  getCityList() {
    const url = 'https://prod-fresh-api.jugnoo.in:4040/panel/fetch_country_cities';
    const params = new HttpParams()
    .append('token', '83c61c67c064fab7a8be68ead432c51a')
    .append('locale', 'en');
    return this.http.get(url, {
      params
    });
  }
}
