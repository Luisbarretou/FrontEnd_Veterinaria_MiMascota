import { Component } from '@angular/core';
import { DetalleHistoriaService } from '../detalle-historia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleHistoria } from '../detalle-historia';
import { Historia } from 'src/app/historias/historia';
import { HistoriaService } from 'src/app/historias/historia.service';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/servicios/servicio';
import { Especialista } from 'src/app/especialistas/especialista';
import { EspecialistaService } from 'src/app/especialistas/especialista.service';
import { MascotaService } from 'src/app/mascotas/mascota.service';
import { ServicioService } from 'src/app/servicios/servicio.service';

@Component({
    selector: 'app-actualizar-detallehistorias',
    templateUrl: './actualizar-detallehistorias.component.html',
    styles: []
})
export class ActualizarDetallehistoriasComponent {
    id: number;
    idHistoria: number;
    detHistoria: DetalleHistoria = new DetalleHistoria();
    historia: Historia = new Historia();
    servicios: Servicio[];
    especialistas: Especialista[];
    estado: string[];

    constructor(private histotriaService: HistoriaService, private mascotaService: MascotaService,
        private detHistoriaService: DetalleHistoriaService, private servicioService: ServicioService,
        private especialistaService: EspecialistaService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.detHistoriaService.obtenerDetalleHistoria(this.id).subscribe( dato => {
            this.detHistoria = dato;
            this.idHistoria = dato.historia.historiaId;
        });

        this.obtenerServiciosHabilitados();
        this.obtenerEspecialistasHabilitados();

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];
    }

    actualizarDetalle(){
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
                    'Detalle actualizado',
                    `La Hisotria: ${this.detHistoria.detHistoriaId} ha sido actualizada con éxito`,
                    'success'
                )
                this.detHistoriaService.actualizarDetalleHistoria(this.id, this.detHistoria).subscribe(dato => {
                    this.router.navigate(['actualizar-historias', `${this.idHistoria}`]);
                })
            }
        })
    }

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

    regresaHistoria() {
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
                    'Has sido redirigido a la historia seleccionada.',
                    'error'
                )
                this.router.navigate(['actualizar-historias', `${this.idHistoria}`]);
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
