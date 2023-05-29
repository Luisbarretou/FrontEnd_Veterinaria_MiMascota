import { Component } from '@angular/core';
import { HistoriaService } from '../historia.service';
import { Router } from '@angular/router';
import { Historia } from '../historia';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-historias',
    templateUrl: './listar-historias.component.html',
    styles: []
})
export class ListarHistoriasComponent {

    historias: Historia[];

    constructor(private historiaService: HistoriaService, private router: Router) { }

    ngOnInit(): void {
        this.listarHistorias();
    }

    private listarHistorias() {
        this.historiaService.obtenerListaHistoria().subscribe(dato => {
            this.historias = dato;
        });
    }

    actualizarHistoria(id: number){
        this.router.navigate(['/actualizar-historia', id]);
    }

    detalleHistoria(id: number){
        this.router.navigate(['/detalle-historia', id]);
    }

    private inhabilitarHistoria(id: number){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea inhabilitar la Historia: "${id}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, inhabilitar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.historiaService.inhabilitarHistoria(id).subscribe(dato => {
                    this.listarHistorias();
                    swalWithBootstrapButtons.fire(
                        'Historia Inhabilitada!',
                        `Historia: "${id}" inhabilitada con éxito.`,
                        'success'
                    )
                })
            }
            else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'Opración cancelada',
                    'error'
                )
            }
        })
    }

}
