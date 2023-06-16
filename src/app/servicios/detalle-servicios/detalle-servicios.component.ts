import { Component } from "@angular/core";
import { Servicio } from "../servicio";
import { MenuItem } from "primeng/api";
import { ServicioService } from "../servicio.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Producto } from "src/app/productos/producto";


@Component({
    selector: 'app-detalle-servicios',
    templateUrl: './detalle-servicios.component.html',
    styles: [
    ]
})

export class DetalleServiciosComponent {
    id: number;
    servicio: Servicio;
    productos: Producto[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private servicioService: ServicioService, private activateRoute: ActivatedRoute,
        private router: Router){}

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.servicioService.obtenerServicio(this.id).subscribe( dato => {
            this.servicio = dato;
            Swal.fire(
                'Detalle del Servicio',
                `Categoria: ${this.servicio.servicioCategoria}`,
                'info'
            )
        })

        this.items = [{ label: 'Servicio', routerLink: '/servicios' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresarListaServicios() {
        Swal.fire(
            'Lista de Servicios',
            `Regresó a la lista de servicios`,
            `success`
        );
        this.router.navigate(['./servicios']);
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

    detalleProducto(id: number){
        this.router.navigate(['detalle-productos',id]);
    }
}
