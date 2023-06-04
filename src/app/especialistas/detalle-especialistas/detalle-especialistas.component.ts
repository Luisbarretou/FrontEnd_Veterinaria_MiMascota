import { Component } from '@angular/core';
import { EspecialistaService } from '../especialista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialista } from '../especialista';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-detalle-especialistas',
    templateUrl: './detalle-especialistas.component.html',
    styles: [
    ]
})
export class DetalleEspecialistasComponent {

    id: number;
    especialista: Especialista;

    items: MenuItem[];
    home: MenuItem;

    constructor(private especialistaService: EspecialistaService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.especialistaService.obtenerEspecialista(this.id).subscribe(dato => {
            this.especialista = dato;
            Swal.fire(
                'Detalle del Especialista',
                `Nombre: ${this.especialista.especialistaNombres}`,
                'info'
            )
        })

        this.items = [{ label: 'Especialista', routerLink: '/especialistas' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresarListaEspecialistas() {
        Swal.fire(
            'Lista de Especialistas',
            `Regresó a la lista de especialistas`,
            `success`
        );
        this.router.navigate(['./especialistas']);
    }

}
