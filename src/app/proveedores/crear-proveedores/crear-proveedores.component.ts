import { Component } from '@angular/core';
import { Proveedor } from '../proveedor';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ProveedorService } from '../proveedor.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-proveedores',
  templateUrl: './crear-proveedores.component.html',
  styles: [
  ]
})
export class CrearProveedoresComponent {

  proveedor: Proveedor = new Proveedor();

  items: MenuItem[];
  home: MenuItem;


  constructor(private proveedorService: ProveedorService, private router: Router){ }

    ngOnInit(): void{

      this.items = [{label:'Proveedor', routerLink: '/proveedores'}, {label: 'Registro '}];
      this.home = {icon: 'pi pi-home', routerLink: '/dashboard'};
    }

    registroProveedor(){

      this.proveedorService.crearProveedores(this.proveedor).subscribe(dato => {
        this.regresarListaProveedor();
      })
    }

    private regresarListaProveedor(){

      this.router.navigate(['./proveedores']);
      Swal.fire(
        'Proveedor Creado',
        `El Proveedor: "${this.proveedor.proveedorId}" ha sido creado con exito`,
        `success`
      );
    }
  }