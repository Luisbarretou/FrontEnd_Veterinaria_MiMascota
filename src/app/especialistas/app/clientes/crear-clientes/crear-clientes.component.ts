import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-crear-clientes',
    templateUrl: './crear-clientes.component.html',
    styles: [
    ]
})
export class CrearClientesComponent {

    cliente: Cliente = new Cliente();

    genero: string[];

    items: MenuItem[];
    home: MenuItem;

    constructor(private clienteService: ClienteService, private router: Router) { }

    ngOnInit(): void {

        this.genero = [
            "No definido",
            "Masculino",
            "Femenino"
        ];

        this.items = [{ label: 'Cliente', routerLink: '/clientes' }, { label: 'Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    registroCliente(){
        this.clienteService.crearCliente(this.cliente).subscribe( dato => {
            this.regresarListaClientes();
        })
    }

    regresarListaClientes() {
        this.router.navigate(['./clientes']);
        Swal.fire(
            'Cliente creado',
            `El cliente: "${this.cliente.clienteNombre}" ha sido creado con exito`,
            `success`
        );
    }

}
