import { Component } from '@angular/core';
import { Historia } from '../historia';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/mascotas/mascota.service';
import { Mascota } from 'src/app/mascotas/mascota';
import Swal from 'sweetalert2';
import { HistoriaService } from '../historia.service';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-actualizar-historias',
    templateUrl: './actualizar-historias.component.html',
    styles: [
    ]
})
export class ActualizarHistoriasComponent {

    historia: Historia = new Historia();
    id: number;

    mascotas: Mascota[];
    estado: string[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private hisotriaService: HistoriaService, private mascotaService: MascotaService,
        private activateRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.hisotriaService.obtenerHistoria(this.id).subscribe(dato => {
            this.historia = dato;
            Swal.fire(
                'Actualización de Historia',
                `ID: ${this.historia.historiaId}`,
                'info'
            )
        })
        this.obtenerListaMascotasHabilitadas();

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
                this.hisotriaService.actualizarHistoria(this.id, this.historia).subscribe(dato => {
                    this.router.navigate(['./historias']);
                })
            }
        })
    }

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
}
