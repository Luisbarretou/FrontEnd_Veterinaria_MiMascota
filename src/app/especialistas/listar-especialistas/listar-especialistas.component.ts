import { Component } from '@angular/core';
import { EspecialistaService } from '../especialista.service';
import { Router } from '@angular/router';
import { Especialista } from '../especialista';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-listar-especialistas',
    templateUrl: './listar-especialistas.component.html',
    styles: [
    ]
})
export class ListarEspecialistasComponent {

    especialistas: Especialista[];
    estado: string[];

    pageActual: number = 1;
    seleccionEspecialista: Especialista[];
    cols: any[];
    exportColumns: any[];

    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private especialistaService: EspecialistaService, private router: Router) { }

    ngOnInit(): void {
        this.listarEspecialistas();

        this.cols = [
            { field: 'especialistaId', header: 'Codigo', customExportHeader: 'especialista' },
            { field: 'especialistaDNI', header: 'DNI' },
            { field: 'especialistaNombres', header: 'Nombres' },
            { field: 'especialistaTelefono', header: 'Telefono' },
            { field: 'especialistaArea', header: 'Area' },
            { field: 'especialistaFechaCreacion', header: 'Fcha Creacion' },
            { field: 'especialistaEstado', header: 'Estado' },
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Especialista' }, { label: 'Lista' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarEspecialistas() {
        this.especialistaService.obtenerListaEspecialistas().subscribe(dato => {
            this.especialistas = dato;
        });
    }

    actualizaEspecialista(id: number) {
        this.router.navigate([`actualizar-especialistas`, id]);
    }

    detalleEspecialista(id: number) {
        this.router.navigate([`detalle-especialistas`, id]);
    }

    inhabilitaEspecialista(id: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea inhabilitar el Especialista: "${id}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, inhabilitar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.especialistaService.inhabilitarEspecialista(id).subscribe(dato => {
                    this.listarEspecialistas();
                    swalWithBootstrapButtons.fire(
                        'Especialista Inhabilitado!',
                        `Especialista: "${id}" inhabilitao con éxito.`,
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

    exportPdf() {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                let actual = this.fechaActual.toLocaleString();
                const doc = new jsPDF.default('p', 'px', 'a4');
                (doc as any).autoTable(this.exportColumns, this.especialistas);
                doc.save(`especialistas${actual}.pdf`);
            });
        });
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.especialistas);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'especialistas');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let actual = this.fechaActual.toLocaleString();
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + actual + EXCEL_EXTENSION);
    }

    obtenerEstado(estado: string) {
        switch (estado) {
            case 'Habilitado': {
                return 'success';
            }
            case 'Inhabilitado': {
                return 'danger';
            }
            default: {
                return 'warning';
            }
        }
    }

}
