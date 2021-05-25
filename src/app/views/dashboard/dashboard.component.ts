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
import { RechazarDescripcionComponent } from '../../modals/rechazar-descripcion/rechazar-descripcion.component';
import { FiltrosLocalStorageService } from '../../services/filtros-local-storage.service';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  cantidadPedidos = '25';
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
  filterDriverId = '';
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



  

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  login = false;
  user = '';
  driverBusysCount = 0;
  selectedIndexCity: number = 9;
  statusList = [
    { value: '0', name: 'PENDIENTE' },
    { value: '8', name: 'ACEPTADO' },
    { value: '4', name: 'DESPACHADO' },
    { value: '2', name: 'ENTREGADO' },
    { value: '7', name: 'DEVUELTO' },
    { value: '3', name: 'CANCELADO POR EL CLIENTE' },
    { value: '9', name: 'RECHAZADO POR EL LOCAL' }
  ];
  statusForm = new FormControl();
  selectedStatus = ["0", "8"];

  filterList = [
    { value: 'demoradoDespachado', name: 'DEMORADO & DESPACHADO' },
    { value: 'sinMoto', name: 'PEDIDOS SIN MOTO'},
    { value: 'terminadosCancelados', name: 'TERMINADOS O CANCELADOS'}
  ];

  filterListForm = new FormControl();

  cityListLocal: any[] = []

  constructor(
    private service: PanelService,
    private localSService: FiltrosLocalStorageService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.toast.toastrConfig.closeButton = true;
  }

  get startDateField() {
    return this.range.get('start');
  }

  get endDateField() {
    return this.range.get('end');
  }

  setCountOrder(event: any) {
    this.cantidadPedidos = event.target['value'];
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value, parseInt(this.cantidadPedidos, 10));
  }
  
  getStatusList(event: any) {
    console.log(event.value);
  }

  searchTableMerchant() {
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value, parseInt(this.cantidadPedidos, 10), this.filterMerchant);
  }

  searchTablePhone() {
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value, parseInt(this.cantidadPedidos, 10), this.filterPhone);
  }

  searchTableIdOrder() {
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value, parseInt(this.cantidadPedidos, 10), this.filterId);
  }

  searchTableIdDriver() {
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value, parseInt(this.cantidadPedidos, 10), this.filterDriverId);
  }

  setCiudad(event: any) {
    const ciudad = event.target['value'];
    this.selectedIndexCity = event.target.selectedIndex;
    this.localSService.setCity(ciudad, this.selectedIndexCity.toString());
    const json = this.localSService.getCity();
    this.citySelected = json.citySelected;
    this.selectedIndexCity = parseInt(json.index, 10);
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
  }

  setEndDate(event: any) {
    console.log(this.endDateField.value);
    this.localSService.setDate(this.startDateField.value, this.endDateField.value);
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
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
        const userSession = this.service.getSessionSesion();
        this.user = userSession.username;
        if (this.login === false) { // cambiar a false para que funcione en produccion
          window.location.href = 'https://labs.patio.com.bo/?salir=1';
        }
      },
      (error) => {
        this.blockUI.stop();
      }
    );
    this.cityListLocal = this.localSService.getCityList();
    this.cityList = this.cityListLocal;
    if (this.cityListLocal.length < 1) {
      this.getCityList();
    }
    if (this.localSService.getCity()) {
      const json = this.localSService.getCity();
      this.selectedIndexCity = parseInt(json.index, 10);
      this.citySelected = json.citySelected;
    }
    if (this.localSService.getDate()) {
      const json = this.localSService.getDate();
      console.log(this.startDateField.value);
      console.log(this.endDateField.value);
      this.startDateField.patchValue(json.startDate);
      this.endDateField.patchValue(json.endDate);
      console.log(this.startDateField.value);
      console.log(this.endDateField.value);
    }
    this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
    const contador = interval(180000);
    contador.subscribe(
      (n) => {
        this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
      }
    );
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
        this.localSService.setCityList(this.cityList);
        this.blockUI.stop();
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error al obtener las ciudades');
        this.blockUI.stop();
      }
    );
  }

  getDriversBusysList(cityId: string) {
    this.service.getDriversBusys(cityId).subscribe(
      (resp: any) => {
        this.driverBusysCount = resp.data.length;
      },
      (error: any) => {
        this.toast.error('Ocurrio un error al obtener la cantidad de motos ocupadas');
      }
    );
  }

  getOrderList(cityId: string, startDate: string, endDate: string, countOrder: number = 25, search: string = ''): void {
    if (endDate !== null) {
      // this.blockUI.start();
      this.citySelected = cityId;
      this.deliveryList2 = [];
      // this.getDriversBusysList(this.citySelected);
      this.alertOperation();
      const startDate2 = moment(startDate).format('YYYY-MM-DD');
      const endDate2 = moment(endDate).format('YYYY-MM-DD');
      const orderListSubscripcion = this.service.getDeliveryList(cityId, startDate2, endDate2, countOrder, search);
      this.ordersListSubscripcion = orderListSubscripcion.subscribe(
        async (resp: any) => {
          // this.toast.success('Se obtuvo la lista correctamente');
          // this.deliveryList = await resp['aaData'].reverse();
          this.deliveryList = await resp['aaData'];
          this.deliveryList2 = await resp;
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
    this.blockUI.start();
    const getCustomerSubscripcion = this.service.getCustomer(userId, '0');
    this.customerSubscripcion = getCustomerSubscripcion.subscribe(
      async (resp: any) => {
        this.blockUI.stop();
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
        this.blockUI.stop();
        this.toast.error('Ha ocurrido un error al intentar ver al cliente');
      }
    );
  }
  openDialogDriver(indexOrderList: string): void {
    if (indexOrderList !== '-') {
      this.blockUI.start();
      const convertString = indexOrderList.replaceAll('<br/>', ' ');
      const arrayString = convertString.split(' ');
      const driverId = arrayString[0];
      const getCustomerSubscripcion = this.service.getDriver(driverId, '0');
      this.customerSubscripcion = getCustomerSubscripcion.subscribe(
        async (resp: any) => {
          this.blockUI.stop();
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
          this.blockUI.stop();
          this.toast.error('Ha ocurrido un error al intentar ver al conductor');
        }
      );
    }
  }
  openDialogCommerce(restaurantId: string): void {
    this.blockUI.start();
    const getCommerceSubscripcion = this.service.getCommerce(restaurantId);
    this.restaurantSubscripcion = getCommerceSubscripcion.subscribe(
      async (resp: any) => {
        this.blockUI.stop();
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
        this.blockUI.stop();
        this.toast.error('Ha ocurrido un error al intentar obtener el comercio');
      }
    );
  }

  autoAssingOrder(orderId: string, restaurantId: string) {
    this.service.getOrderDetail(orderId, restaurantId).subscribe(
      (resp: any) => {
        if (resp.flag === 143 && resp.message === 'Response has been sent successfully') {
          this.service.autoAssign(resp.order_info[0].delivery_id).subscribe(
            (resp: any) => {
              this.toast.success('Auto asignando con exito!');
            },
            (error) => {
              this.toast.error('Ha ocurrido un error!', 'No se pudo auto asignar!');
            }
          );
        }
      },
      (error: any) => {
        this.toast.error('Ha ocurrido un error inesperado!');
      }
    );
  }

  showOrderDetail(orderId: string, restaurantId: string): void {
    this.router.navigate(['dashboard/orderDetails', orderId, restaurantId]);
  }
  createCase(order: any) {
    const dialogRef = this.dialog.open(GenerarCasosComponent, {
      disableClose: true,
      data: order,
      minWidth: '80vh',
      width: '50%',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(
      (resp) => {
        if (resp === 'close') {
          this.toast.info('Cerrado');
        } else if (resp) {
          this.toast.success('Se ha creado el caso correctamente!');
        } else {
          this.toast.error('No se pudo guardar!');
        }
      }
    );
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
        const driverName2 = resp.order_info[0].driver_name;
        const idLocal = resp.order_info[0].restaurant_id;
        const montoCarrera = resp.order_info[0].delivery_charges;
        const montoPedido = resp.order_info[0].sub_total;
        const montoTotal = resp.order_info[0].order_amount;
        const idCiudad = resp.order_info[0].city_id;
        const fecha = moment(resp.order_info[0].created_at).format('YYYY/MM/DD hh:mm:ss');
        const fecha2 = moment(resp.order_info[0].created_at).format('YYYY/MM/DD');
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
                              'CANCELAR PEDIDO', '0', 'CANCELACION DESDE EL BOTON', month, management, this.user, idLocal, fecha, fecha2, idCiudad, montoPedido, montoCarrera, montoTotal)
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
                        'CANCELAR PEDIDO', '0', 'CANCELACION DESDE EL BOTON', month, management, this.user,
                        idLocal, fecha, fecha2, idCiudad, montoPedido, montoCarrera, montoTotal)
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

  forceOrderCompleteV(orderId: string, restaurantId: string, driver: string) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      disableClose: true,
      data: 'Desea forzar la entrega del pedido?',
      minWidth: '80vh',
      width: '25%',
      maxHeight: '90vh',
    });
    let index = driver.indexOf('<br/>');
    let driverId = driver.slice(0, index);
    dialogRef.afterClosed().subscribe(
      (resp) => {
        this.blockUI.start('Espere por favor');
        if (resp) {
          this.service.getOrderDetail(orderId, restaurantId).subscribe(
            (resp2: any) => {
              if (resp2.order_info[0].driver_name === '') {
                this.toast.error('Este pedido no tiene moto!', 'No se pudo forzar la entrega!');
              } else {
                this.service.getDriver(driverId, '0').subscribe(
                  (resp3: any) => {
                    this.service.forceOrderComplete(parseInt(resp2.order_info[0].delivery_id), resp2.order_info[0].driver_name, resp3['Phone No']).subscribe(
                      (resp4: any) => {
                        if (resp3.message === 'Successfully Completed' && resp3.status === 200) {
                          this.blockUI.stop();
                          this.toast.success('Se ha forzado exitosamente!');
                        } else {
                          this.blockUI.stop();
                          this.toast.error('Ha ocurrido un error al forzar la entrega!');
                        }
                      },
                      (error: any) => {
                        this.blockUI.stop();
                        this.toast.error('Ha ocurrido un error al forzar la entrega!');
                      }
                    );
                  },
                  (error: any) => {
                    this.blockUI.stop();
                    this.toast.error('Ha ocurrido un error al forzar la entrega!');
                  }
                );
              }
            },
            (error: any) => {
              this.toast.error('Ha ocurrido un error al forzar la entrega!');
              this.blockUI.stop();
            }
          );
        } else {
          this.blockUI.stop();
          this.toast.info('Ventana cerrada!');
        }
      }
    );
  }

  assignDriver(order: any, cityId: number) {

    this.blockUI.start('Espere un momento por favor...');
    let hasDriver = true;
    const cityList = this.cityList;
    const orderId = order[13].order_id;
    const restaurantId = order[13].restaurant_id;
    const city = cityList.filter(value => cityId === value.city_id);
    this.service.getOrderDetail(orderId, restaurantId).subscribe(
      (resp: any) => {
        this.blockUI.stop();
        const deliveryId = resp.order_info[0].delivery_id;
        const latitude = resp.order_info[0].delivery_latitude;
        const longitude = resp.order_info[0].delivery_longitude;
        const driverName = resp.order_info[0].driver_name;
        const idLocal = resp.order_info[0].restaurant_id;
        const montoCarrera = resp.order_info[0].delivery_charges;
        const montoPedido = resp.order_info[0].sub_total;
        const montoTotal = resp.order_info[0].order_amount;
        const fecha = moment(resp.order_info[0].created_at).format('YYYY/MM/DD hh:mm:ss');
        const fecha2 = moment(resp.order_info[0].created_at).format('YYYY/MM/DD');
        if (driverName !== '') {
          hasDriver = false;
        } else {
          hasDriver = true;
        }
        const dialog = this.dialog.open(AsignarMotoComponent, {
          disableClose: false,
          data: {
            orderId: deliveryId,
            idLocal,
            montoCarrera,
            montoPedido,
            montoTotal,
            fecha,
            fecha2,
            latitude,
            longitude,
            city,
            cityId,
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
      maxHeight: '90vh',
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

  getCases(orderId: string) {
    this.router.navigate(['dashboard/caseDetails', orderId]);
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
    this.blockUI.start('...');
    const month = moment().format('MM');
    const management = moment().format('YYYY');
    const dialogRef = this.dialog.open(RechazarDescripcionComponent, {
      disableClose: false,
      data: { pregunta: 'Desea rechazar el pedido?', form: '', flag: false },
      minWidth: '80vh',
      width: '25%',
      maxHeight: '90vh'
    });
    dialogRef.afterOpened().subscribe(
      (resp: any) => {
        this.blockUI.stop();
      }
    );

    dialogRef.afterClosed().subscribe(
      (resp2: { form: string, flag: boolean }) => {
        if (resp2.flag) {
          this.service.getOrderDetail(orderId, restaurantId).subscribe(
            (resp2: any) => {
              const detalle = resp2.order_info[0];
              const fecha = moment(detalle.created_at).format('YYYY/MM/DD hh:mm:ss');
              const fecha2 = moment(detalle.created_at).format('YYYY/MM/DD');
              const idCiudad = detalle.city_id;
              const montoPedido = detalle.sub_total;
              const montoCarrera = detalle.delivery_charges;
              const montoTotal = detalle.order_amount;
              this.blockUI.start('Rechazando el pedido...');
              this.service.rejectOrder(orderId, restaurantId, userId).subscribe(
                (resp: any) => {
                  this.blockUI.stop();
                  if (resp.message === 'Your order has been cancelled.') {
                    this.service.createCases(orderId, 'RECHAZAR PEDIDO POR CENTRAL' + this.userSession.username, '0',
                      resp2.form, month, management, this.userSession.username, restaurantId, fecha, fecha2, idCiudad, montoPedido, montoCarrera, montoTotal).subscribe(
                        (resp: any) => {
                          this.toast.success('Pedido rechazado exitosamente!');
                          this.getOrderList(this.citySelected, this.startDateField.value, this.endDateField.value);
                        }
                      );
                  }
                },
                (error: any) => {
                  this.toast.error('El pedido no se pudo rechazar!');
                  this.blockUI.stop();
                }
              );
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
          return true;
        } else {
          return false;
        }
      }
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

  alertOperation() {
    const capacityDelivery = this.driverBusysCount * 1.8;
    const realOrders = this.deliveryList2['stats']?.dispatch + this.deliveryList2['stats']?.accepted;
    if (realOrders > capacityDelivery) {
      return true;
    } else {
      return false;
    }
  }
}
