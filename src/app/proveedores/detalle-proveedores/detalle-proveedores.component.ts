import { Component } from '@angular/core';
import { Proveedor } from '../proveedor';
import { MenuItem } from 'primeng/api';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle-proveedores',
    templateUrl: './detalle-proveedores.component.html',
    styles: []
})
export class DetalleProveedoresComponent {

    id: number;
    proveedor: Proveedor;

    items: MenuItem[];
    home: MenuItem;

    constructor(private proveedorService: ProveedorService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.proveedorService.obtenerProveedor(this.id).subscribe(dato => {
            this.proveedor = dato;
            Swal.fire(
                'Detalle del Proveedor',
                `Razon Social: ${this.proveedor.proveedorRazonSocial}`,
                'info'
            )
        })
        this.items = [{ label: 'Proveedor', routerLink: '/proveedores' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresaListaProveedor() {
        Swal.fire(
            'Lista de Proveedores',
            `Regresó a la lista de proveedores`,
            `success`
        );
        this.router.navigate(['./proveedores']);
    }

    obtenerEstado(estado: string) {
        switch (estado) {
            case 'Habilitado': {
                return 'success';
            }
            case 'Inhabilitado': {
                return 'danger';
            }
            default: {
                return 'warning';
            }
        }
    }

}
