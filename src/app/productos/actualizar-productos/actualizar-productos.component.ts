import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../producto';
import { Proveedor } from 'src/app/proveedores/proveedor';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/proveedores/proveedor.service';

@Component({
    selector: 'app-actualizar-productos',
    templateUrl: './actualizar-productos.component.html',
    styles: []
})
export class ActualizarProductosComponent {

    producto: Producto = new Producto();
    proveedores: Proveedor[];

    id: number;
    estado: string[];
    marcas: any[];
    categorias: any[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private productoService: ProductoService, private proveedorService: ProveedorService,
                private activateRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.productoService.obtenerProducto(this.id).subscribe(dato => {
            this.producto = dato;
            Swal.fire(
                'Actualización de Producto',
                `Nombre: ${this.producto.productoNombre}`,
                'info'
            )
        })

        this.listaProveedores();

        this.estado = [
            "Habilitado",
            "Inhabilitado",
            "Bajo Stock"
        ];

        this.categorias = [
            { name: "No definido" },
            { name: "Accesorios" },
            { name: "Alimentos" },
            { name: "Juguetes" },
            { name: "Medicamento" },
            { name: "Vacunas" }
        ];

        this.marcas = [
            { name: "No definido" },
            { name: "Bravecto" },
            { name: "Cambo" },
            { name: "Huellita" },
            { name: "Mimaskot" },
            { name: "Proplan" },
            { name: "Ricocan" },
            { name: "Royal Canin" },
            { name: "Vetlinex" }
        ];

        this.items = [{ label: 'Producto', routerLink: '/productos' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listaProveedores() {
        this.proveedorService.obtenerListaProveedores().subscribe( dato => {
            this.proveedores = dato;
        })
    }

    actualizaProducto() {
        Swal.fire({
            title: 'Está seguro de los cambios realizados?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, actualizar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Producto actualizada',
                    `El Producto: ${this.producto.productoId} ha sido actualizada con éxito`,
                    'success'
                )
                this.productoService.actualizarProducto(this.id, this.producto).subscribe(dato => {
                    this.router.navigate(['./productos']);
                })
            }
        })
    }

    regresarListaProductos() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de productos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Operación cancelada!',
                    'Has sido redirigido a la lista de productos.',
                    'error'
                )
                this.router.navigate(['./productos']);
            }
        })
    }

    compararProveedores(proveedor1: Proveedor, proveedor2: Proveedor): boolean {
        if (proveedor1 === undefined && proveedor2 === undefined) {
            return true;
        }

        return proveedor1 === null || proveedor2 === null || proveedor1 === undefined || proveedor2 === undefined ? false : proveedor1.proveedorId === proveedor2.proveedorId;
    }

}
