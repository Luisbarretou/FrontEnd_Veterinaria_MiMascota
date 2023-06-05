import { Component } from "@angular/core";
import { Servicio } from "../servicio";
import { MenuItem } from "primeng/api";
import { ServicioService } from "../servicio.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";


@Component({
    selector: 'app-actualizar-servicios',
    templateUrl: './actualizar-servicios.component.html',
    styles: []
})

export class ActualizarServiciosComponent {
    servicio: Servicio = new Servicio();
    id: number;
    estado: string[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private servicioService: ServicioService, private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.servicioService.obtenerServicio(this.id).subscribe(dato => {
            this.servicio = dato;
            Swal.fire(
                'Actualización de Servicio',
                `Categoria: ${this.servicio.servicioCategoria}`,
                'info'
            )
        })

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];

        this.items = [{ label: 'Servicio', routerLink: '/servicios' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };

    }  
    
    actualizarServicio() {
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
                    'Servicio actualizado',
                    `El servicio: ${this.servicio.servicioCategoria} ha sido actualizado con éxito`,
                    'success'
                )
                this.servicioService.actualizarServicio(this.id, this.servicio).subscribe( dato => {
                    this.router.navigate(['./servicios']);
                })
            }
        })
    }

    regresarListaServicios() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de servicios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Operación cancelada!',
                'Has sido redirigido a la lista de servicios.',
                'error'
            )
            this.router.navigate(['./servicios']);}
        })
    }
}