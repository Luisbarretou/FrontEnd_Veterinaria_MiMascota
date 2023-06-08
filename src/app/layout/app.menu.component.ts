import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'CLIENTE',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Cliente',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/crear-clientes']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/clientes']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'MASCOTA',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Mascota',
                        icon: 'pi pi-fw pi-heart',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-plus-circle',
                                routerLink: ['/crear-mascotas']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/mascotas']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'HISTORIA',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Historia',
                        icon: 'pi pi-fw pi-calendar-plus',
                        items: [
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/historias']
                            }
                        ]
                    },
                ]
            },
            {
                label: 'MANTENEDORES',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Servicios',
                        icon: 'pi pi-fw pi-shopping-bag',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/crear-servicios']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/servicios']
                            }
                        ]
                    },
                    {
                        label: 'Especialistas',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/crear-especialistas']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/especialistas']
                            }
                        ]
                    },
                    {
                        label: 'Productos',
                        icon: 'pi pi-fw pi-shopping-bag',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/crear-productos']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-database',
                                routerLink: ['/productos']
                            }
                        ]
                    },
                    {
                        label: 'Proveedores',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Registrar',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/crear-proveedores']
                            },
                            {
                                label: 'Listado',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/proveedores']
                            }
                        ]
                    },
                ]
            }
        ];
    }
}
