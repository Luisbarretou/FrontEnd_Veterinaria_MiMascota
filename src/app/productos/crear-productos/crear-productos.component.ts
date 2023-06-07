import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { ProveedorService } from 'src/app/proveedores/proveedor.service';
import { Proveedor } from 'src/app/proveedores/proveedor';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-crear-productos',
    templateUrl: './crear-productos.component.html',
    styles: []
})
export class CrearProductosComponent {

    producto: Producto = new Producto();
    proveedores: Proveedor[];

    marcas: any[];
    categorias: any[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private productoService: ProductoService, private router: Router, proveedorService: ProveedorService) {}

    ngOnInit(): void {
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
            { name: "Vetlinex"}
        ];

        this.items = [{ label: 'Producto', routerLink: '/productos' }, { label: 'Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    //SE USARÁ CUANDO EL PROVEEDOR SERVICE ESTE IMPLEMENTADO
    // private listaProveedoresHabilitados() {
    //     this.proveedorService.listaProveedoresHabilitados().subscribe( dato => {
    //         this.proveedores = dato;
    //     })
    // }

    registroProducto() {
        this.productoService.crearProducto(this.producto).subscribe(dato => {
            this.regresaListaProductos();
        });
    }

    private regresaListaProductos() {
        this.router.navigate(['/productos']);
        Swal.fire(
            'Producto creado',
            `El producto: "${this.producto.productoNombre}" ha sido creado con exito`,
            `success`
        );
    }

}
