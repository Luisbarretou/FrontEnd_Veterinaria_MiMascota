import { Component } from '@angular/core';
import { EspecialistaService } from '../especialista.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Especialista } from '../especialista';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-actualizar-especialistas',
    templateUrl: './actualizar-especialistas.component.html',
    styles: []
})
export class ActualizarEspecialistasComponent {

    id: number;
    especialista: Especialista = new Especialista();

    estado: string[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private especialistaService: EspecialistaService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.especialistaService.obtenerEspecialista(this.id).subscribe( dato => {
            this.especialista = dato;
            Swal.fire(
                'Actualización de Especialista',
                `Nombre: ${this.especialista.especialistaNombres}`,
                'info'
            )
        });

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];

        this.items = [{ label: 'Especialista', routerLink: '/especialistas' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    actualizarEspecialista() {
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
                    'Especialista actualizado',
                    `El especialista: ${this.especialista.especialistaId} ha sido actualizado con éxito`,
                    'success'
                )
                this.especialistaService.actualizarEspecialista(this.id, this.especialista).subscribe( dato => {
                    this.router.navigate(['./especialistas']);
                })
            }
        })
    }

    regesaListaEspecialistas() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de especialistas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Operación cancelada!',
                    'Has sido redirigido a la lista de especialistas.',
                    'error'
                )
                this.router.navigate(['./especialistas']);
            }
        })
    }

}
