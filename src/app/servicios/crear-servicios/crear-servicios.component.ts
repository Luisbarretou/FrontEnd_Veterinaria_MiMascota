import { Component } from "@angular/core";
import { Servicio } from "../servicio";
import { Router } from "@angular/router";
import { ServicioService } from "../servicio.service";
import { MenuItem } from "primeng/api";
import Swal from "sweetalert2";
import { Producto } from "src/app/productos/producto";
import { ProductoService } from "src/app/productos/producto.service";


@Component({
    selector: 'app-crear-servicios',
    templateUrl: './crear-servicios.component.html',
    styles: []
})

export class CrearServiciosComponent {
    servicio: Servicio = new Servicio();
    productos: Producto[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private servicioService: ServicioService, private productoService: ProductoService,
                private router: Router) { }

    ngOnInit(): void {
        this.listaProductosHabilitados();

        this.items = [{ label: 'Servicio', routerLink: '/servicios' }, { label: 'Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listaProductosHabilitados(){
        this.productoService.obtenerListaProductosHabilitados().subscribe(dato => {
            this.productos = dato;
        });
    }

    registroServicio(){
        this.servicioService.crearServicio(this.servicio).subscribe( dato => {
            this.regresarListaServicios();
        })
    }

    private regresarListaServicios() {
        this.router.navigate(['./servicios']);
        Swal.fire(
            'Servicio creado',
            `El servicio: "${this.servicio.servicioCategoria}" ha sido creado con exito`,
            `success`
        );
    }
}
