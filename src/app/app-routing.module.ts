import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
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
import { CrearServiciosComponent } from './servicios/crear-servicios/crear-servicios.component';
import { ListarServiciosComponent } from './servicios/listar-servicios/listar-servicios.component';
import { ActualizarServiciosComponent } from './servicios/actualizar-servicios/actualizar-servicios.component';
import { DetalleServiciosComponent } from './servicios/detalle-servicios/detalle-servicios.component';

const routes: Routes = [

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'clientes', component: ListarClientesComponent },
    { path: '', redirectTo: '/clientes', pathMatch: 'full' },
    { path: 'crear-clientes', component: CrearClientesComponent },
    { path: 'actualizar-clientes/:id', component: ActualizarClientesComponent },
    { path: 'detalle-clientes/:id', component: DetalleClientesComponent },

    { path: 'mascotas', component: ListarMascotasComponent },
    { path: '', redirectTo: '/mascotas', pathMatch: 'full' },
    { path: 'crear-mascotas', component: CrearMascotasComponent },
    { path: 'actualizar-mascotas/:id', component: ActualizarMascotasComponent },
    { path: 'detalle-mascotas/:id', component: DetalleMascotasComponent },

    { path: 'historias', component: ListarHistoriasComponent },
    { path: '', redirectTo: '/historias', pathMatch: 'full' },
    { path: 'actualizar-historias/:id', component: ActualizarHistoriasComponent },
    { path: 'detalle-historias/:id', component: DetalleHistoriasComponent },

    { path: 'servicios', component: ListarServiciosComponent },
    { path: '', redirectTo: '/servicios', pathMatch: 'full' },
    { path: 'crear-servicios', component: CrearServiciosComponent },
    { path: 'actualizar-servicios/:id', component: ActualizarServiciosComponent },
    { path: 'detalle-servicios/:id', component: DetalleServiciosComponent },
];

@NgModule({
    // imports: [
    //     RouterModule.forRoot([
    //         {
    //             path: '', component: AppLayoutComponent,
    //             children: [
    //                 { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    //                 { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
    //                 { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
    //                 { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
    //                 { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
    //                 { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
    //             ]
    //         },
    //         { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    //         { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
    //         { path: 'notfound', component: NotfoundComponent },
    //         { path: '**', redirectTo: '/notfound' },
    //     ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    // ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
