import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MenuItem } from 'primeng/api';
import { MascotaService } from '../mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-detalle-mascotas',
    templateUrl: './detalle-mascotas.component.html',
    styles: []
})
export class DetalleMascotasComponent {

    id: number;
    mascota: Mascota = new Mascota();

    items: MenuItem[];
    home: MenuItem;

    constructor(private mascotaService: MascotaService, private activateRoute: ActivatedRoute,
                private router: Router){}

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.mascotaService.obtenerMascota(this.id).subscribe( dato => {
            this.mascota = dato;
            Swal.fire(
                'Detalle de la Mascota',
                `Nombre: ${this.mascota.mascotaNombre}`,
                'info'
            )
        });

        this.items = [{ label: 'Mascota', routerLink: '/mascotas' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresarListaMascotas() {
        Swal.fire(
            'Lista de Mascotas',
            `Regresó a la lista de mascotas`,
            `success`
        );
        this.router.navigate(['./mascotas']);
    }

    detalleCliente(id: number){
        this.router.navigate(['detalle-clientes',id]);
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
