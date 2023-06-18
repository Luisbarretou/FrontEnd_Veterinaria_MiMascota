import { Component } from '@angular/core';
import { DetalleHistoriaService } from '../detalle-historia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleHistoria } from '../detalle-historia';
import { Historia } from 'src/app/historias/historia';
import { HistoriaService } from 'src/app/historias/historia.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-crear-detallehistorias',
    templateUrl: './crear-detallehistorias.component.html',
    styles: []
})
export class CrearDetallehistoriasComponent {
    id: number;
    detalleHistoria: DetalleHistoria = new DetalleHistoria();
    historia: Historia = new Historia();

    constructor(private detHistoriaService: DetalleHistoriaService, private historiaService: HistoriaService,
                private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id'];
        this.historiaService.obtenerHistoria(this.id).subscribe( dato =>{
            this.historia = dato;
        });
    }

    registroDetalleHistoria(){
        this.detHistoriaService.crearDetalleHistoria(this.id,this.detalleHistoria).subscribe( dato => {
            this.regresaHistoriaSeleccionada(this.id);
        })
    }

    private regresaHistoriaSeleccionada(id: number){
        this.router.navigate(['actualizar-historias',id]);
        Swal.fire(
            'Detalle registrado',
            `El detalle: ${this.detalleHistoria.detHistoriaId} ha sido vinculado con éxito`,
            'success'
        );
    }
}
