import { Component } from "@angular/core";
import { Servicio } from "../servicio";
import { Router } from "@angular/router";
import { ServicioService } from "../servicio.service";
import { MenuItem } from "primeng/api";
import Swal from "sweetalert2";


@Component({
    selector: 'app-crear-servicios',
    templateUrl: './crear-servicios.component.html',
    styles: []
})

export class CrearServiciosComponent {
    servicio: Servicio = new Servicio();

    items: MenuItem[];
    home: MenuItem;

    constructor(private servicioService: ServicioService, private router: Router) { }

    registroServicio(){
        this.servicioService.crearServicio(this.servicio).subscribe( dato => {
            this.regresarListaServicios();
        })
    }

    regresarListaServicios() {
        this.router.navigate(['./servicios']);
        Swal.fire(
            'Servicio creado',
            `El servicio: "${this.servicio.servicioCategoria}" ha sido creado con exito`,
            `success`
        );
    }
}