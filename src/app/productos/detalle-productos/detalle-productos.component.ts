import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Producto } from '../producto';
import { MenuItem } from 'primeng/api';
import { Proveedor } from 'src/app/proveedores/proveedor';

@Component({
    selector: 'app-detalle-productos',
    templateUrl: './detalle-productos.component.html',
    styles: []
})
export class DetalleProductosComponent {

    id: number;
    producto: Producto;
    proveedores: Proveedor[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private productoService: ProductoService, private activateRoute: ActivatedRoute,
                private router: Router){}

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.productoService.obtenerProducto(this.id).subscribe(dato => {
            this.producto = dato;
            Swal.fire(
                'Detalle del Producto',
                `Nombre: ${this.producto.productoNombre}`,
                'info'
            )
        })
        this.items = [{ label: 'Proveedor', routerLink: '/proveedores' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresaListaProductos(){
        Swal.fire(
            'Lista de Productos',
            'Regresó a la lista de productos',
            'success'
        );
        this.router.navigate(['./productos']);
    }

    obtenerEstado(estado: string) {
        switch (estado) {
            case 'Habilitado': {
                return 'success';
            }
            case 'Inhabilitado': {
                return 'danger';
            }
            case 'Bajo Stock': {
                return 'warning';
            }
            default: {
                return 'primary';
            }
        }
    }

    detalleProveedor(id: number){
        this.router.navigate(['detalle-proveedores',id]);
    }

}
