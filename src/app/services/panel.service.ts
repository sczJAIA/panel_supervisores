import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  getCustomer(userId: string, searchKey: string = '0', countryCode: string = '+91') {
    try {
      const url = 'https://api-panels.jugnoo.in:7013/schedule-ride-auth/get/user_details?';
      const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let formData = new URLSearchParams();
      formData.set('user_id', userId);
      formData.set('search_key', searchKey);
      formData.set('country_code', countryCode);
      formData.set('token', '83c61c67c064fab7a8be68ead432c51a');
      formData.set('paginationDetails[sf_recentRides]', '0');
      formData.set('paginationDetails[sf_paytmTxns]', '0');
      formData.set('paginationDetails[sf_mobikwikTxns]', '0');
      formData.set('paginationDetails[sf_freechargeTxns]', '0');
      formData.set('paginationDetails[sf_couponsData]', '0');
      formData.set('paginationDetails[sf_txnDetails]', '0');
      formData.set('paginationDetails[sf_promotionsApplicable]', '0');
      formData.set('paginationDetails[sf_userIssues]', '0');
      formData.set('paginationDetails[sf_cancelledRides]', '0');
      formData.set('paginationDetails[sf_freshRead]', '0');
      formData.set('paginationDetails[sf_mealsRead]', '0');
      formData.set('paginationDetails[sf_menusRead]', '0');
      formData.set('paginationDetails[ps_recentRides]', '20');
      formData.set('paginationDetails[ps_paytmTxns]', '20');
      formData.set('paginationDetails[ps_mobikwikTxns]', '20');
      formData.set('paginationDetails[ps_freechargeTxns]', '20');
      formData.set('paginationDetails[ps_couponsData]', '20');
      formData.set('paginationDetails[ps_txnDetails]', '20');
      formData.set('paginationDetails[ps_promotionsApplicable]', '20');
      formData.set('paginationDetails[ps_userIssues]', '20');
      formData.set('paginationDetails[ps_cancelledRides]', '20');
      formData.set('paginationDetails[ps_freshRead]', '20');
      formData.set('paginationDetails[ps_mealsRead]', '20');
      formData.set('paginationDetails[ps_menusRead]', '');
      formData.set('paginationDetails[sf_deductMoneyTxns]', '0');
      formData.set('paginationDetails[ps_deductMoneyTxns]', '20');
      formData.set('paginationDetails[sf_groceryRead]', '0');
      formData.set('paginationDetails[ps_groceryRead]', '20');
      formData.set('paginationDetails[sf_deliveryRead]', '0');
      formData.set('paginationDetails[ps_deliveryRead]', '20');
      formData.set('paginationDetails[ps_menuCoupons]', '20');
      formData.set('paginationDetails[sf_menuCoupons]', '0');
      return this.http.post(
        url, formData.toString(), {
        headers: header
      }).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }
  getDriver(driverId: string, searchKey: string = '0') {
    try {
      const url = 'https://api-panels.jugnoo.in:7013/schedule-ride-auth/driver_info?';
      const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let formData = new URLSearchParams();
      formData.set('driver_id', driverId);
      formData.set('token', '83c61c67c064fab7a8be68ead432c51a');
      formData.set('search_key', searchKey);
      formData.set('paginationDetails[start_from_rides]', '0');
      formData.set('paginationDetails[page_size_rides]', '40');
      formData.set('paginationDetails[start_from_issues]', '0');
      formData.set('paginationDetails[start_from_app_issues]', '0');
      formData.set('paginationDetails[page_size_issues]', '40');
      formData.set('paginationDetails[page_size_app_issues]', '40');
      formData.set('paginationDetails[start_from_dodo]', '0');
      formData.set('paginationDetails[page_size_dodo]', '40');
      formData.set('paginationDetails[start_from_can_rides]', '0');
      formData.set('paginationDetails[page_size_can_rides]', '40');
      formData.set('paginationDetails[start_from_agent_history]', '0');
      formData.set('paginationDetails[page_size_agent_history]', '40');
      return this.http.post(
        url, formData.toString(), {
        headers: header
      }).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }
  getcommerce(restaurantId: string) {
    try {
      const url = 'https://prod-fresh-api.jugnoo.in:4040/panel/fetch_restaurant_detail';
      const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let formData = new URLSearchParams();
      formData.set('restaurant_id', restaurantId);
      formData.set('secret', 'P7JlZXiRiIvSssQSSzqs');
      formData.set('locale', 'en');
      formData.set('token', '83c61c67c064fab7a8be68ead432c51a');
      return this.http.post(
        url, formData.toString(), {
        headers: header
      }).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }
  getOrderDetail(orderId: string, restaurantId: string) {
    try {
      const url = 'https://prod-fresh-api.jugnoo.in:4040/order_details';
      const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let formData = new URLSearchParams();
      formData.set('order_id', orderId);
      formData.set('restaurant_id', restaurantId);
      formData.set('locale', 'en');
      formData.set('token', '83c61c67c064fab7a8be68ead432c51a');
      return this.http.post(
        url, formData.toString(), {
        headers: header
      }).pipe(
        map(
          (resp) => {
            return resp;
          }),
        catchError((error) => {
          return throwError(error);
        })
      );
    } catch (error) {
      return throwError(error);
    }
  }
}
