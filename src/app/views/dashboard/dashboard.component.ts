import { Router } from '@angular/router';
import { DetalleModalComponent } from './../../modals/detalle-modal/detalle-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { PanelService } from '../../services/panel.service';
import { ToastrService } from 'ngx-toastr';
import { City } from '../../models/cityList.interface';
import { interval, Subscription } from 'rxjs';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { GenerarCasosComponent } from '../../modals/generar-casos/generar-casos.component';
import { AsignarMotoComponent } from '../../modals/asignar-moto/asignar-moto.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmacionComponent } from '../../modals/confirmacion/confirmacion.component';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  radioModel: string = 'Month';
  deliveryList: any[] = [];
  deliveryList2: any[] = [];
  dateNow = moment().format('YYYY-MM-DD');
  citySelected = '395';
  cityList: City[] = [];
  citiesSubscripcion: Subscription;
  customerSubscripcion: Subscription;
  ordersListSubscripcion: Subscription;
  restaurantSubscripcion: Subscription;
  orderDetailSubscripcion: Subscription;
  startDate = this.dateNow;
  endDate = this.dateNow;
  fulFillment: number = 0;
  p: number = 1;
  nextLabel = 'Siguiente';
  previousLabel = 'Anterior';
  filterId = '';
  filterPhone = '';
  filterStatus = 'todos';
  filterMerchant = '';
  @BlockUI() blockUI: NgBlockUI;

  startDate2 = moment().format();
  endDate2 = moment().format();
  range = new FormGroup({
    start: new FormControl(this.startDate2),
    end: new FormControl(this.endDate2)
  });
  userSession = this.service.getSessionSesion();

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  login = false;
  user = '';

  constructor(
    private service: PanelService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  get startDateField() {
    return this.range.get('start');
  }

  get endDateField() {
    return this.range.get('end');
  }

  async ngOnInit() {
    this.blockUI.start('Espere un momento por favor...');
    await this.service.getSession().subscribe(
      (resp: any) => {
        this.blockUI.stop();
        this.toast.info('Logeado');
        this.login = resp.sesion;
        this.service.isLogin = resp.sesion;
        this.service.setSession(resp);
        console.log(this.service.getSessionSesion());
        const userSession = this.service.getSessionSesion();
        this.user = userSession.username;
        if (this.login === false) {
          window.location.href = 'https://labs.patio.com.bo/?salir=1';
        }
      },
      (error) => {
        this.blockUI.stop();
      }
    );
    this.getCityList();
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
    const contador = interval(35000);
    contador.subscribe(
      (n) => {
        this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
      }
    );
    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
  }
  ngOnDestroy(): void {
    this.citiesSubscripcion?.unsubscribe();
    this.customerSubscripcion?.unsubscribe();
    this.ordersListSubscripcion?.unsubscribe();
    this.restaurantSubscripcion?.unsubscribe();
    this.orderDetailSubscripcion?.unsubscribe();
  }

  getCityList(): void {
    this.blockUI.start();
    const cityListsubscripcion = this.service.getCityList();
    this.citiesSubscripcion = cityListsubscripcion.subscribe(
      (resp: any) => {
        console.log(resp);
        this.cityList = resp.cities_list;
        this.blockUI.stop();
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al obtener las ciudades');
        this.blockUI.stop();
      }
    );
  }

  getOrderList(cityId: string, startDate: string, endDate: string): void {
    if (endDate !== null) {
      // this.blockUI.start();
      this.citySelected = cityId;
      const startDate2 = moment(startDate).format('YYYY-MM-DD');
      const endDate2 = moment(endDate).format('YYYY-MM-DD');
      const orderListSubscripcion = this.service.getDeliveryList(cityId, startDate2, endDate2);
      this.ordersListSubscripcion = orderListSubscripcion.subscribe(
        async (resp: any) => {
          // this.toast.success('Se obtuvo la lista correctamente');
          this.deliveryList = await resp['aaData'].reverse();
          this.deliveryList2 = await resp;
          console.log('2', this.deliveryList2['stats'].accepted);
          const fulfillment = (
            (this.deliveryList2['stats'].delivered + this.deliveryList2['stats'].accepted + this.deliveryList2['stats'].dispatch)
            / (this.deliveryList2['stats'].total) * 100).toFixed(2);
          this.fulFillment = parseFloat(fulfillment);
          // this.blockUI.stop();
        },
        (error: any) => {
          this.toast.error('Ha ocurrido al obtener la lista de pedidos');
          // this.blockUI.stop();
        }
      );
    }
  }
  openDialogCustomer(userId: string): void {
    const getCustomerSubscripcion = this.service.getCustomer(userId, '0');
    this.customerSubscripcion = getCustomerSubscripcion.subscribe(
      async (resp: any) => {
        const dialogRef = await this.dialog.open(DetalleModalComponent, {
          disableClose: false,
          data: {
            resp,
            name: 'cliente'
          },
          minWidth: '80vh',
          maxHeight: '80vh'
        });
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al intentar ver al cliente');
      }
    );
  }
  openDialogDriver(indexOrderList: string): void {
    if (indexOrderList !== '-') {
      const convertString = indexOrderList.replaceAll('<br/>', ' ');
      const arrayString = convertString.split(' ');
      const driverId = arrayString[0];
      const getCustomerSubscripcion = this.service.getDriver(driverId, '0');
      this.customerSubscripcion = getCustomerSubscripcion.subscribe(
        async (resp: any) => {
          const dialogRef = await this.dialog.open(DetalleModalComponent, {
            disableClose: false,
            data: {
              resp,
              name: 'conductor'
            },
            minWidth: '80vh',
            maxHeight: '80vh'
          });
        },
        (error: any) => {
          this.toast.error('Ha ocurrido un error al intentar ver al conductor');
        }
      );
    }
  }
  openDialogCommerce(restaurantId: string): void {
    const getCommerceSubscripcion = this.service.getCommerce(restaurantId);
    this.restaurantSubscripcion = getCommerceSubscripcion.subscribe(
      async (resp: any) => {
        const dialogRef = await this.dialog.open(DetalleModalComponent, {
          disableClose: false,
          data: {
            resp,
            name: 'comercio'
          },
          minWidth: '80vh',
          maxHeight: '90vh'
        });
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al intentar obtener el comercio');
      }
    );
  }
  showOrderDetail(orderId: string, restaurantId: string): void {
    this.router.navigate(['dashboard/orderDetails', orderId, restaurantId]);
  }
  createCase(order: any) {
    this.dialog.open(GenerarCasosComponent, {
      disableClose: false,
      data: order,
      minWidth: '80vh',
      width: '50%',
      maxHeight: '90vh'
    });
  }

  cancelOrder(order: any) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      disableClose: false,
      data: 'Desea cancelar el pedido?',
      minWidth: '80vh',
      width: '25%',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(
      (resp: any) => {
        if (resp) {
          switch (order[4]) {
            case 395:
              // SANTA CRUZ
              this.cancelOrderFunction(order, '7107740', 'PEDIDO CANCELADO', '+911190409044');
              break;
            case 818:
              // LA PAZ
              this.cancelOrderFunction(order, '9029134', 'Pedido Cancelado', '+59160521013');
              break;
            case 704:
              // COCHABAMBA
              this.cancelOrderFunction(order, '9481627', 'Pedido Cancelado', '+59170790241');
              break;
            case 859:
              // TARIJA
              this.cancelOrderFunction(order, '9940410', 'Pedido Cancelado', '+5917805356611');
              break;
            case 1796:
              // POTOSI
              // NO HAY MOTO PEDIDO CANCELADO EN POTOSI
              this.cancelOrderFunction(order, '9641029', 'Pedido Cancelado', '+59178735918');
              // alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 3190:
              // SAN JOSE DE MAYO
              alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 204:
              // NEW YORK
              alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 997:
              // MONTEVIDEO
              alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 3262:
              // JULIACA
              this.cancelOrderFunction(order, '10081132', 'Cancelado', '+519663700591');
              // alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 1:
              // CHANDIRGAH
              alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            case 786:
              // AREQUIPA
              alert('ESTA CIUDAD NO TIENE MOTO >PEDIDO CANCELADO<');
              break;
            default:
              break;
          }
        }
      }
    );
  }
  cancelOrderFunction(order: any, driverId: any, driverName: string, driverPhone: string) {
    this.blockUI.start('Cancelando el pedido espere un momento por favor...');
    const orderId = order[13].order_id;
    const restaurantId = order[13].restaurant_id;
    const month = moment().format('MM');
    const management = moment().format('YYYY');
    this.service.getOrderDetail(orderId, restaurantId).subscribe(
      (resp: any) => {
        const deliveryId = resp.order_info[0].delivery_id;
        if (order[9] !== '-') {
          this.service.unassignDriver(deliveryId).subscribe(
            (resp1: any) => {
              if (resp1.message === 'Successfully unassingned order' && resp1.status === 200) {
                this.service.assignDriver(deliveryId, driverId).subscribe(
                  (resp2: any) => {
                    if (resp2.message === 'Successfully assigned driver' && resp2.status === 200) {
                      this.service.forceOrderComplete(deliveryId, driverName, driverPhone).subscribe(
                        (resp3: any) => {
                          if (resp3.message === 'Successfully Completed' && resp3.status === 200) {
                            console.log('Respues de forzas completado', resp3);
                            this.service.createCases(order[13].order_id,
                              'CANCELAR PEDIDO', '0', 'CANCELACION DESDE EL BOTON', month, management, this.userSession.username)
                              .subscribe(
                                (resp4: any) => {
                                  this.blockUI.stop();
                                  console.log(resp4);
                                  this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
                                },
                                (error: any) => {
                                  this.blockUI.stop();
                                  console.log('Ha ocurrido un error al guardar un caso', error);
                                }
                              );
                          }
                        },
                        (error: any) => {
                          this.blockUI.stop();
                          console.log('Ha ocurrido un error al forzar entrega');
                        }
                      );
                    }
                  },
                  (error: any) => {
                    this.blockUI.stop();
                    console.log('Ha ocurrido un error al asignar moto');
                  }
                );
              }
            },
            (error: any) => {
              this.blockUI.stop();
              console.log('Ha ocurrido un error al desasignar moto');
            }
          );
        } else {
          this.service.assignDriver(deliveryId, driverId).subscribe(
            (resp2: any) => {
              if (resp2.message === 'Successfully assigned driver' && resp2.status === 200) {
                this.service.forceOrderComplete(deliveryId, driverName, driverPhone).subscribe(
                  (resp3: any) => {
                    if (resp3.message === 'Successfully Completed' && resp3.status === 200) {
                      console.log('Respues de forzas completado', resp3);
                      this.service.createCases(order[13].order_id,
                        'CANCELAR PEDIDO', '0', 'CANCELACION DESDE EL BOTON', month, management, this.userSession.username)
                        .subscribe(
                          (resp4: any) => {
                            this.blockUI.stop();
                            console.log(resp4);
                            this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
                          },
                          (error: any) => {
                            this.blockUI.stop();
                            console.log('Ha ocurrido un error al guardar un caso', error);
                          }
                        );
                    }
                  },
                  (error: any) => {
                    this.blockUI.stop();
                    console.log('Ha ocurrido un error al forzar entrega');
                  }
                );
              }
            },
            (error: any) => {
              this.blockUI.stop();
              console.log('Ha ocurrido un error al asignar moto');
            }
          );
        }
      },
      (error: any) => {
        this.blockUI.stop();
        console.log('Ha ocurrido un error inesperado', error);
      }
    );
  }

  assignDriver(order: any, cityId: number) {
    this.blockUI.start('Espere un momento por favor...');
    let hasDriver = true;
    if (order[9] === '-') {
      hasDriver = false;
    }
    const cityList = this.cityList;
    const orderId = order[13].order_id;
    const restaurantId = order[13].restaurant_id;
    const city = cityList.filter(value => cityId === value.city_id);
    this.service.getOrderDetail(orderId, restaurantId).subscribe(
      (resp: any) => {
        this.blockUI.stop();
        const deliveryId = resp.order_info[0].delivery_id;
        const dialog = this.dialog.open(AsignarMotoComponent, {
          disableClose: false,
          data: {
            orderId: deliveryId,
            city,
            hasDriver,
            orderIdLast: orderId
          },
          minWidth: '80vh',
          width: '50%',
          maxHeight: '90vh'
        });
        dialog.afterClosed().subscribe(
          (value) => {
            this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
          }
        );
      },
      (error: any) => {
        this.blockUI.stop();
        this.toast.error('No se puedo asignar la moto!');
      }
    );
  }
  copyOrder(order: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      disableClose: false,
      data: 'Desea copiar el pedido?',
      minWidth: '80vh',
      width: '25%',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(
      (resp3) => {
        if (resp3) {
          this.blockUI.start('Copiando el pedido espere un momento por favor...');
          const orderId = order[13].order_id;
          const restaurantId = order[13].restaurant_id;
          let orderInfo = <any>{};
          this.service.getOrderDetail(orderId, restaurantId).subscribe(
            (resp: any) => {
              orderInfo = resp.order_info[0];
              const orderItems = orderInfo.order_items;
              let details = 'CLIENTE: ' + orderInfo.user_name + ' - ' + orderInfo.phone_no + ' PEDIDO --> ' + '\n';
              const fromAddress = orderInfo.restaurant_name + ' - ' + orderInfo.restaurant_address;
              const toAddress = orderInfo.delivery_address;
              const toLatitude = orderInfo.delivery_latitude;
              const toLongitude = orderInfo.delivery_longitude;
              let fromLatitude = '';
              let fromLongitude = '';
              orderItems.forEach((orderI: any, index: number) => {
                const customizeOptionName = [];
                if (!orderI.hasOwnProperty('customize_item')) {
                  orderI['customize_item'] = [];
                }
                for (const customizeItem of orderI.customize_item) {
                  const customizeItemName = customizeItem.customize_item_name;
                  customizeOptionName.push(customizeItemName);
                  for (const value of customizeItem.customize_options) {
                    customizeOptionName.push(value.customize_option_name);
                  }
                }
                console.log(customizeOptionName.toString());
                // tslint:disable-next-line:max-line-length
                details += '# ' + (index + 1).toString() + ' Cantidad: ' + orderI.item_quantity + ' Nombre: ' + orderI.item_name + ' Detalle: ' + customizeOptionName.toString() + '\n';
              });
              console.log(details);
              this.service.getCommerce(restaurantId).subscribe(
                (respCommerce: any) => {
                  fromLatitude = respCommerce.vendor_detail.latitude;
                  fromLongitude = respCommerce.vendor_detail.longitude;
                  console.log(fromLatitude, fromLongitude);
                  this.service.copyOrder(details, fromAddress, toAddress, fromLatitude, fromLongitude, toLatitude, toLongitude).subscribe(
                    (respCopy: any) => {
                      this.blockUI.stop();
                      console.log(respCopy);
                      this.toast.success('Pedido copiado con exito!');
                    },
                    (error) => {
                      this.blockUI.stop();
                      this.toast.error('Ha ocurrido un error al intentar copiar el pedido!');
                    }
                  );
                },
                (error) => {
                  this.blockUI.stop();
                  this.toast.error('Ha ocurrido un error al intentar copiar el pedido!');
                }
              );
            },
            (error) => {
              this.blockUI.stop();
              this.toast.error('Ha ocurrido un error al intentar copiar el pedido!');
            }
          );
        }
      }
    );
  }

  getCases(order: any) {
    this.toast.info(order[13].order_id);
  }
  acceptOrder(orderId: string, restaurantId: string, userId: string): void {
    this.blockUI.start('Aceptando pedido...');
    this.service.acceptOrder(orderId, restaurantId, userId).subscribe(
      (resp: any) => {
        this.blockUI.stop();
        this.toast.success('Este pedido fue aceptado exitosamente!');
        this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
      },
      (error: any) => {
        this.blockUI.stop();
        this.toast.error('No se pudo aceptar el pedido!');
      }
    );
  }
  rejectedOrder(orderId: any, restaurantId: string, userId: string): void {

    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      disableClose: false,
      data: 'Desea rechazar el pedido?',
      minWidth: '80vh',
      width: '25%',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(
      (resp2: any) => {
        if (resp2) {
          this.blockUI.start('Rechazando el pedido...');
          this.service.rejectOrder(orderId, restaurantId, userId).subscribe(
            (resp: any) => {
              this.blockUI.stop();
              if (resp.message === 'Your order has been cancelled.') {
                this.toast.success('Pedido rechazado exitosamente!');
                this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
              }
            },
            (error: any) => {
              this.toast.error('El pedido no se pudo rechazar!');
              this.blockUI.stop();
            }
          );
        }
      }
    );
  }

  horaPasada(hora: string, moto: string, estado: number) {
    if (moto !== '-') {
      return false;
    } else {
      if (estado === 8 || estado === 0) {
        if (this.convertirFecha(hora) > 30) {
          console.log('Se cumplio!');
          return true;
        } else {
          return false;
        }
      }
    }
  }

  convertirFecha(date: string): any {
    // const date = '12:06 PM 13th-March-2021';
    // const date = '-';
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
