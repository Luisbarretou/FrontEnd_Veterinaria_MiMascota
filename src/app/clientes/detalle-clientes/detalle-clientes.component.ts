import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-detalle-clientes',
    templateUrl: './detalle-clientes.component.html',
    styles: [
    ]
})
export class DetalleClientesComponent {

    id: number;
    cliente: Cliente;
    //Este es un comentario de prueba
    //para la rama karen

    items: MenuItem[];
    home: MenuItem;

    constructor(private clienteService: ClienteService, private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.clienteService.obtenerCliente(this.id).subscribe(dato => {
            this.cliente = dato;
            Swal.fire(
                'Detalle del Cliente',
                `Nombre: ${this.cliente.clienteNombre}`,
                'info'
            )
        })

        this.items = [{ label: 'Cliente', routerLink: '/clientes' }, { label: 'Detalle' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    regresarListaClientes() {
        Swal.fire(
            'Lista de Clientes',
            `Regresó a la lista de clientes`,
            `success`
        );
        this.router.navigate(['./clientes']);
    }

}
