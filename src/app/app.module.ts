import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { FileSaverModule } from 'ngx-filesaver';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { SplitterModule } from 'primeng/splitter';
import { DialogModule } from 'primeng/dialog';

// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// import { ProductService } from './demo/service/product.service';
// import { CountryService } from './demo/service/country.service';
// import { CustomerService } from './demo/service/customer.service';
// import { EventService } from './demo/service/event.service';
// import { IconService } from './demo/service/icon.service';
// import { NodeService } from './demo/service/node.service';
// import { PhotoService } from './demo/service/photo.service';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearClientesComponent } from './clientes/crear-clientes/crear-clientes.component';
import { ActualizarClientesComponent } from './clientes/actualizar-clientes/actualizar-clientes.component';
import { DetalleClientesComponent } from './clientes/detalle-clientes/detalle-clientes.component';
import { ListarMascotasComponent } from './mascotas/listar-mascotas/listar-mascotas.component';
import { CrearMascotasComponent } from './mascotas/crear-mascotas/crear-mascotas.component';
import { ActualizarMascotasComponent } from './mascotas/actualizar-mascotas/actualizar-mascotas.component';
import { DetalleMascotasComponent } from './mascotas/detalle-mascotas/detalle-mascotas.component';
import { ListarHistoriasComponent } from './historias/listar-historias/listar-historias.component';
import { ActualizarHistoriasComponent } from './historias/actualizar-historias/actualizar-historias.component';
import { DetalleHistoriasComponent } from './historias/detalle-historias/detalle-historias.component';
import { ListarEspecialistasComponent } from './especialistas/listar-especialistas/listar-especialistas.component';
import { CrearEspecialistasComponent } from './especialistas/crear-especialistas/crear-especialistas.component';
import { ActualizarEspecialistasComponent } from './especialistas/actualizar-especialistas/actualizar-especialistas.component';
import { DetalleEspecialistasComponent } from './especialistas/detalle-especialistas/detalle-especialistas.component';
import { ListarProveedoresComponent } from './proveedores/listar-proveedores/listar-proveedores.component';
import { CrearProveedoresComponent } from './proveedores/crear-proveedores/crear-proveedores.component';
import { ActualizarProveedoresComponent } from './proveedores/actualizar-proveedores/actualizar-proveedores.component';
import { DetalleProveedoresComponent } from './proveedores/detalle-proveedores/detalle-proveedores.component';
import { CrearServiciosComponent } from './servicios/crear-servicios/crear-servicios.component';
import { ListarServiciosComponent } from './servicios/listar-servicios/listar-servicios.component';
import { ActualizarServiciosComponent } from './servicios/actualizar-servicios/actualizar-servicios.component';
import { DetalleServiciosComponent } from './servicios/detalle-servicios/detalle-servicios.component';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { CrearProductosComponent } from './productos/crear-productos/crear-productos.component';
import { ActualizarProductosComponent } from './productos/actualizar-productos/actualizar-productos.component';
import { DetalleProductosComponent } from './productos/detalle-productos/detalle-productos.component';
import { CrearDetallehistoriasComponent } from './detalleHistoria/crear-detallehistorias/crear-detallehistorias.component';
import { ActualizarDetallehistoriasComponent } from './detalleHistoria/actualizar-detallehistorias/actualizar-detallehistorias.component';
import { DetalleDetallehistoriasComponent } from './detalleHistoria/detalle-detallehistorias/detalle-detallehistorias.component';

@NgModule({
    declarations: [
        AppComponent,
        ListarClientesComponent,
        DashboardComponent,
        CrearClientesComponent,
        ActualizarClientesComponent,
        DetalleClientesComponent,
        ListarMascotasComponent,
        CrearMascotasComponent,
        ActualizarMascotasComponent,
        DetalleMascotasComponent,
        ListarHistoriasComponent,
        ActualizarHistoriasComponent,
        DetalleHistoriasComponent,
        ListarEspecialistasComponent,
        CrearEspecialistasComponent,
        ActualizarEspecialistasComponent,
        DetalleEspecialistasComponent,
        ListarProveedoresComponent,
        CrearProveedoresComponent,
        ActualizarProveedoresComponent,
        DetalleProveedoresComponent,
        CrearServiciosComponent,
        ListarServiciosComponent,
        ActualizarServiciosComponent,
        DetalleServiciosComponent,
        ListarProductosComponent,
        CrearProductosComponent,
        ActualizarProductosComponent,
        DetalleProductosComponent,
        ActualizarProveedoresComponent,
        CrearProveedoresComponent,
        ListarProveedoresComponent,
        DetalleProveedoresComponent,
        CrearDetallehistoriasComponent,
        ActualizarDetallehistoriasComponent,
        DetalleDetallehistoriasComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FileSaverModule,
        BreadcrumbModule,
        TagModule,
        FormsModule,
        AutoCompleteModule,
        CalendarModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        MessagesModule,
        MessageModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        PaginatorModule,
        ChartModule,
        MenuModule,
        TableModule,
        PanelMenuModule,
        StyleClassModule,
        CardModule,
        AvatarModule,
        SplitterModule,
        DialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }/*,
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService*/
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
