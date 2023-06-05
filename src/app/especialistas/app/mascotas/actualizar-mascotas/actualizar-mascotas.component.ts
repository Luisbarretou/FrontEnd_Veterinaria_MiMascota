import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MenuItem } from 'primeng/api';
import { MascotaService } from '../mascota.service';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clientes/cliente';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-actualizar-mascotas',
    templateUrl: './actualizar-mascotas.component.html',
    styles: []
})
export class ActualizarMascotasComponent {

    mascota: Mascota = new Mascota();
    id: number;

    clientes: Cliente[];

    sexo: string[];
    estado: string[];
    tipos: any[];
    razas: any[];

    items: MenuItem[];
    home: MenuItem;

    diaActual = new Date();

    constructor(private mascotaService: MascotaService, private clienteService: ClienteService,
        private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.mascotaService.obtenerMascota(this.id).subscribe(dato => {
            this.mascota = dato;
            Swal.fire(
                'Actualización de Mascota',
                `Nombre: ${this.mascota.mascotaNombre}`,
                'info'
            )
        });

        this.obtenerClientesHabilitados();

        this.sexo = [
            "No definido",
            "Macho",
            "Hembra"
        ];

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];

        this.tipos = [
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

        this.items = [{ label: 'Mascota', routerLink: '/mascotas' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private obtenerClientesHabilitados() {
        this.clienteService.obtenerClientesHabilitados().subscribe(dato => {
            this.clientes = dato;
        })
    }

    actualizarMascota() {
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
                    'Mascota actualizada',
                    `La Mascota: ${this.mascota.mascotaId} ha sido actualizada con éxito`,
                    'success'
                )
                this.mascotaService.actualizarMascota(this.id, this.mascota).subscribe(dato => {
                    this.router.navigate(['./mascotas']);
                })
            }
        })
    }

    /////////////////////////
    compararCliente(cliente1: Cliente, cliente2: Cliente): boolean {
        if (cliente1 === undefined && cliente2 === undefined) {
            return true;
        }
        return cliente1 === null || cliente2 === null || cliente1 === undefined || cliente2 === undefined ? false : cliente1.clienteId === cliente2.clienteId;
    }

    regresarListaMascotas() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de mascotas!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Operación cancelada!',
                    'Has sido redirigido a la lista de mascotas.',
                    'error'
                )
                this.router.navigate(['./mascotas']);
            }
        })
    }

}
