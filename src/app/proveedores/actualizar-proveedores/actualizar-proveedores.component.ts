import { Component } from '@angular/core';
import { Proveedor } from '../proveedor';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-proveedores',
  templateUrl: './actualizar-proveedores.component.html',
  styles: [
  ]
})
export class ActualizarProveedoresComponent {


  proveedor: Proveedor = new Proveedor();
  id: number;

  estado: String[];

  items: MenuItem[];
  home: MenuItem;


  constructor(private proveedorService: ProveedorService, private router: Router,
              private activatedRoute: ActivatedRoute){ }


  ngOnInit(): void{
    this.id= this.activatedRoute.snapshot.params['id'];
    this.proveedorService.obtenerProveedores(this.id).subscribe(dato => {
      this.proveedor = dato;
      Swal.fire(
        'Actulización de Proveedor',
        'Razon Social: ${this.proveedor.proveedorRazonSocial}',
        'info',
      )
    })

    this.estado =[
      "Habilitado",
      "Inhabilitado"
    ];

    this.items = [{label:'Proveedor', routerLink: '/proveedores'}, {label: 'Actualización '}];
    this.home = {icon: 'pi pi-home', routerLink: '/dashboard'};
  }

  actualizarProveedores(){
    Swal.fire({
      title: 'Está seguro de los cambios realizados?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire(
          'Proveedor Actualizado',
          'El Proveedor: ${this.proveedor.proveedorRazonSocial} ha sido actualizado con exito',
          'success'
        )
        this.proveedorService.actualizarProveedores(this.id, this.proveedor).subscribe(dato=>{
          this.router.navigate[('./proveedores')];
        })
      }
    })
  }


  regresarListaProveedores(){
    Swal.fire({
      title: 'Está seguro de cancelar la operación?',
      text: "Regresarás a la lista de Proveedores!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero cancelar la actualización!'
  }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire(
          'Operación cancelada!',
          'Has sido redirigido a la lista de Proveedores.',
          'error'
      )
      this.router.navigate(['./proveedores']);}
  })

  }
}
