import { Component } from '@angular/core';
import { Especialista } from '../especialista';
import { EspecialistaService } from '../especialista.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-crear-especialistas',
    templateUrl: './crear-especialistas.component.html',
    styles: [
    ]
})
export class CrearEspecialistasComponent {

    especialista: Especialista = new Especialista();

    items: MenuItem[];
    home: MenuItem;


    constructor(private especialistaService: EspecialistaService, private router: Router) { }

    ngOnInit(): void {
        this.items = [{ label: 'Especialista', routerLink: '/especialistas' }, { label: 'Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    registroEspecialista() {
        this.especialistaService.crearEspecialista(this.especialista).subscribe(dato => {
            this.regresaListaEspecialista();
        });
    }

    private regresaListaEspecialista() {
        this.router.navigate(['/especialistas']);
        Swal.fire(
            'Especialista creado',
            `El especialista: "${this.especialista.especialistaNombres}" ha sido creado con exito`,
            `success`
        );
    }

}
