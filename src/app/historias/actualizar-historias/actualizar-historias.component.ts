import { Component, OnInit } from '@angular/core';
import { Historia } from '../historia';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/mascotas/mascota.service';
import { Mascota } from 'src/app/mascotas/mascota';
import Swal from 'sweetalert2';
import { HistoriaService } from '../historia.service';
import { MenuItem } from 'primeng/api';
import { DetalleHistoria } from 'src/app/detalleHistoria/detalle-historia';
import { DetalleHistoriaService } from 'src/app/detalleHistoria/detalle-historia.service';
import { Servicio } from 'src/app/servicios/servicio';
import { Especialista } from 'src/app/especialistas/especialista';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { EspecialistaService } from 'src/app/especialistas/especialista.service';

@Component({
    selector: 'app-actualizar-historias',
    templateUrl: './actualizar-historias.component.html',
    styles: []
})
export class ActualizarHistoriasComponent implements OnInit {

    id: number;
    historia: Historia = new Historia();
    servicios: Servicio[];
    especialistas: Especialista[];
    mascotas: Mascota[];

    idDetalle: number;
    arrayDetalles: Array<DetalleHistoria> = [];
    detalles: DetalleHistoria[];

    detalleHistoria: DetalleHistoria = new DetalleHistoria();
    detalle: DetalleHistoria = new DetalleHistoria();
    detalle2: DetalleHistoria = new DetalleHistoria();
    seleccionDetalle: DetalleHistoria[];

    estado: string[];

    items: MenuItem[];
    home: MenuItem;

    registro: boolean;
    actualizacion: boolean;
    detail: boolean;

    constructor(private histotriaService: HistoriaService, private mascotaService: MascotaService,
        private detHistoriaService: DetalleHistoriaService, private servicioService: ServicioService,
        private especialistaService: EspecialistaService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.histotriaService.obtenerHistoria(this.id).subscribe(dato => {
            this.historia = dato;
            // Swal.fire(
            //     'Actualización de Historia',
            //     `ID: ${this.historia.historiaId}`,
            //     'info'
            // )
        })

        this.obtenerListaMascotasHabilitadas();
        this.obtenerServiciosHabilitados();
        this.obtenerEspecialistasHabilitados();
        this.obtenerDetallesHistorias();

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];

        this.items = [{ label: 'Hisotria', routerLink: '/historias' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private obtenerListaMascotasHabilitadas() {
        this.mascotaService.obtenerMascotasHabilitados().subscribe(dato => {
            this.mascotas = dato;
        })
    }

    actualizaHistoria() {
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
                    'Historia actualizada',
                    `La Historia: ${this.historia.historiaId} ha sido actualizada con éxito`,
                    'success'
                )
                this.histotriaService.actualizarHistoria(this.id, this.historia).subscribe(dato => {
                    this.router.navigate(['./historias']);
                })
            }
        })
    }

    //DETALLE HISTORIA
    private obtenerServiciosHabilitados() {
        this.servicioService.obtenerServiciosHabilitados().subscribe(dato => {
            this.servicios = dato;
        })
    }

    private obtenerEspecialistasHabilitados() {
        this.especialistaService.obtenerListaEspecialistasHabilitados().subscribe(dato => {
            this.especialistas = dato;
        })
    }

    private obtenerDetallesHistorias() {
        this.detHistoriaService.obtenerListaDetalleHistorias().subscribe(dato => {
            this.detalles = dato;
        })
    }

    showRegistro() {
        this.registro = true;
    }

    registroDetalleHistoria() {
        this.detHistoriaService.crearDetalleHistoria(this.id, this.detalleHistoria).subscribe(dato => {
            this.regresaHistoriaSeleccionada(this.id);
            window.location.reload();
        })
    }

    showActualizacion(id: number) {
        this.actualizacion = true;
        this.idDetalle = id;
        console.log(this.idDetalle)
        this.detHistoriaService.obtenerDetalleHistoria(id).subscribe( dato => {
            this.detalle = dato;
        })
    }

    actualizaDetalleHistoria() {
        this.detHistoriaService.actualizarDetalleHistoria(this.idDetalle, this.detalle).subscribe(dato => {
            this.regresaHistoriaSeleccionada(this.id);
            window.location.reload();
        })
    }

    showDetalle(id: number){
        this.detail = true;
        this.detHistoriaService.obtenerDetalleHistoria(id).subscribe( dato => {
            this.detalle2 = dato;
        })
    }

    detalleServicio(id: number){
        this.router.navigate(['detalle-servicios',id]);
    }

    detalleEspecialista(id: number){
        this.router.navigate(['detalle-especialistas',id]);
    }

    private regresaHistoriaSeleccionada(id: number) {
        this.router.navigate(['actualizar-historias', id]);
        Swal.fire(
            'Detalle registrado',
            `El detalle: ${this.detalleHistoria.detHistoriaId} ha sido vinculado con éxito`,
            'success'
        );
    }
    //

    regresaListaHistorias() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de historias!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Operación cancelada!',
                    'Has sido redirigido a la lista de historias.',
                    'error'
                )
                this.router.navigate(['./historias']);
            }
        })
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
