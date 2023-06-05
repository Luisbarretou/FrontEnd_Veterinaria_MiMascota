import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MenuItem, SelectItemGroup } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { MascotaService } from '../mascota.service';
import { Cliente } from 'src/app/clientes/cliente';

@Component({
    selector: 'app-crear-mascotas',
    templateUrl: './crear-mascotas.component.html',
    styles: []
})
export class CrearMascotasComponent {

    mascota: Mascota = new Mascota();
    clientes: Cliente[];

    sexo: string[];

    tipos: any[];

    razas: any[];

    items: MenuItem[];
    home: MenuItem;

    diaActual = new Date();

    constructor(private mascotaService: MascotaService, private clienteService: ClienteService,
        private router: Router) { }

    ngOnInit(): void {
        this.obtenerClientesHabilitados();

        this.sexo = [
            "No definido",
            "Macho",
            "Hembra"
        ];

        this.tipos = [
            { name: 'No definido' },
            { name: 'Conejo' },
            { name: 'Hamster' },
            { name: 'Gato' },
            { name: 'Loro' },
            { name: 'Perro' }
        ];

        this.razas = [
            {
                label: 'No definido',
                value: 'No definido',
                items: [
                    { label: 'No definido', value: 'No definido' }
                ]
            }
            ,
            {
                label: 'Conejo',
                value: 'Conejo',
                items: [
                    { label: 'Belier', value: 'Belier' },
                    { label: 'Blanco', value: 'Blanco' },
                    { label: 'Cabeza de León', value: 'Cabeza de León' },
                    { label: 'Gigante', value: 'Gigante' },
                    { label: 'Rex', value: 'Rex' },
                    { label: 'Toy', value: 'Toy' }
                ]
            }
            ,
            {
                label: 'Hamster',
                value: 'Hamster',
                items: [
                    { label: 'Chino', value: 'Chino' },
                    { label: 'Dorado', value: 'Dorado' },
                    { label: 'Ruso enano', value: 'Ruso enano' }
                ]
            }
            ,
            {
                label: 'Gato',
                value: 'Gato',
                items: [
                    { label: 'Angora', value: 'Gato' },
                    { label: 'Balinés', value: 'Gato' },
                    { label: 'Bambino', value: 'Gato' },
                    { label: 'Blanco', value: 'Gato' },
                    { label: 'Bombay', value: 'Gato' },
                    { label: 'Elfo', value: 'Gato' },
                    { label: 'Esfinge', value: 'Gato' },
                    { label: 'Siamés', value: 'Gato' },
                    { label: 'Persa', value: 'Gato' }
                ]
            }
            ,
            {
                label: 'Loro',
                value: 'Loro',
                items: [
                    { label: 'Cacatua', value: 'Cacatua' },
                    { label: 'Cotorra', value: 'Cotorra' },
                    { label: 'Guacamayo', value: 'Guacamayo' },
                    { label: 'Papagayo', value: 'Papagayo' },
                    { label: 'Periquito', value: 'Periquito' },
                    { label: 'Piguicho', value: 'Piguicho' }
                ]
            }
            ,
            {
                label: 'Perro',
                value: 'Perro',
                items: [
                    { label: 'Beagle', value: 'Beagle' },
                    { label: 'Bóxer', value: 'Bóxer' },
                    { label: 'Border Collie', value: 'Border Collie' },
                    { label: 'Buldogs Francés', value: 'Buldogs Francés' },
                    { label: 'Buldogs Inglés', value: 'Buldogs Inglés' },
                    { label: 'Bull Terrier', value: 'Bull Terrier' },
                    { label: 'Caniche Poodle', value: 'Caniche Poodle' },
                    { label: 'Chihuahua', value: 'Chihuahua' },
                    { label: 'Chitzu', value: 'Chitzu' },
                    { label: 'Dálmata', value: 'Dálmata' },
                    { label: 'Doberman', value: 'Doberman' },
                    { label: 'Dogo Argentino', value: 'Dogo Argentino' },
                    { label: 'Dogo De Burdeos', value: 'Dogo De Burdeos' },
                    { label: 'Galgo', value: 'Galgo' },
                    { label: 'Labrador', value: 'Labrador' },
                    { label: 'Maltés', value: 'Maltés' },
                    { label: 'Pequinés', value: 'Pequinés' },
                    { label: 'Pomerania', value: 'Pomerania' },
                    { label: 'Pug', value: 'Pug' },
                    { label: 'Rottweiler', value: 'Rottweiler' },
                    { label: 'San Bernardo', value: 'San Bernardo' },
                    { label: 'Schnauzer', value: 'Schnauzer' },
                    { label: 'Shar Pei', value: 'Shar Pei' },
                    { label: 'Siberiano', value: 'Siberiano' }
                ]
            }
        ];

        this.items = [{ label: 'Mascota', routerLink: '/mascotas' }, { label: 'Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private obtenerClientesHabilitados() {
        this.clienteService.obtenerClientesHabilitados().subscribe(dato => {
            this.clientes = dato;
        })
    }

    registroMascota() {
        this.mascotaService.crearMascota(this.mascota).subscribe(dato => {
            this.regresarListaMascotas();
        })
    }

    regresarListaMascotas() {
        this.router.navigate(['./mascotas']);
        Swal.fire(
            'Mascota creada',
            `La Mascota: "${this.mascota.mascotaNombre}" ha sido creada con exito`,
            `success`
        );
    }

}
