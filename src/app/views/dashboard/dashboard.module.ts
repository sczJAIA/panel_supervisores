import { GenerarCasosModule } from './../../modals/generar-casos/generar-casos.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleModalModule } from '../../modals/detalle-modal/detalle-modal.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FiltroIdPipe } from '../../pipes/filtro-id.pipe';
import { FilterStatusPipe } from '../../pipes/filter-status.pipe';
import { FilterMerchantPipe } from '../../pipes/filter-merchant.pipe';
import { AsignarMotoModule } from '../../modals/asignar-moto/asignar-moto.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BlockUIModule } from 'ng-block-ui';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DetalleModalModule,
    MatDialogModule,
    NgxPaginationModule,
    GenerarCasosModule,
    AsignarMotoModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BlockUIModule.forRoot()
  ],
  declarations: [ DashboardComponent, FiltroIdPipe, FilterStatusPipe, FilterMerchantPipe ]
})
export class DashboardModule { }
