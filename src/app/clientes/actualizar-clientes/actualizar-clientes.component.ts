import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-actualizar-clientes',
    templateUrl: './actualizar-clientes.component.html',
    styles: []
})
export class ActualizarClientesComponent {

    cliente: Cliente = new Cliente();
    id: number;

    genero: string[];
    estado: string[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private clienteService: ClienteService, private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.clienteService.obtenerCliente(this.id).subscribe(dato => {
            this.cliente = dato;
            Swal.fire(
                'Actualización de Cliente',
                `Nombre: ${this.cliente.clienteNombre}`,
                'info'
            )
        })

        this.estado = [
            "Habilitado",
            "Inhabilitado"
        ];

        this.genero = [
            "No definido",
            "Masculino",
            "Femenino"
        ];

        this.items = [{ label: 'Cliente', routerLink: '/clientes' }, { label: 'Actualización' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    actualizarCliente() {
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
                    'Cliente actualizado',
                    `El cliente: ${this.cliente.clienteId} ha sido actualizado con éxito`,
                    'success'
                )
                this.clienteService.actualizarCliente(this.id, this.cliente).subscribe(dato => {
                    this.router.navigate(['./clientes']);
                })
            }
        })
    }

    regresaListaClientes() {
        Swal.fire({
            title: 'Está seguro de cancelar la operación?',
            text: "Regresarás a la lista de clientes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero cancelar la actualización!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Operación cancelada!',
                    'Has sido redirigido a la lista de clientes.',
                    'error'
                )
                this.router.navigate(['./clientes']);
            }
        })
    }

}
