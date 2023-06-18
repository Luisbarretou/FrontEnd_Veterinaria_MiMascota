import { Component, OnInit } from '@angular/core';
import { HistoriaService } from '../historia.service';
import { Router } from '@angular/router';
import { Historia } from '../historia';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { MenuItem } from 'primeng/api';
import { Mascota } from 'src/app/mascotas/mascota';
import { MascotaService } from 'src/app/mascotas/mascota.service';

@Component({
    selector: 'app-listar-historias',
    templateUrl: './listar-historias.component.html',
    styles: []
})
export class ListarHistoriasComponent implements OnInit{

    historias: Historia[];
    historia: Historia = new Historia();
    pageActual: number = 1;
    mascotas: Mascota[];

    seleccionHistoria: Historia[];
    // cols: any[];
    // exportColumns: any[];

    items: MenuItem[];
    home: MenuItem;

    visible: boolean;

    fechaActual = new Date();

    constructor(private historiaService: HistoriaService, private mascotaService: MascotaService, private router: Router) { }

    ngOnInit(): void {
        this.listarHistorias();
        historia => this.historias = historia;

        this.obtenerMascotasHabilitados();

        // this.cols = [
        //     { field: 'mascotaId', header: 'Codigo', customExportHeader: 'Mascota' },
        //     { field: 'mascotaNombre', header: 'Nombre' },
        //     { field: 'mascotaTipo', header: 'Tipo' },
        //     { field: 'mascotaRaza', header: 'Raza' },
        //     { field: 'mascotaColor', header: 'Color' },
        //     { field: 'mascotaFechaNacimiento', header: 'Fecha de Nacimiento' },
        //     { field: 'mascotaSexo', header: 'Sexo' },
        //     { field: 'mascotaObservaciones', header: 'Observaciones' },
        //     { field: 'mascotaEstado', header: 'Estado' },
        //     { field: 'mascotaFchaCreacion', header: 'Fecha de Creacion' }
        // ];

        // this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Historia' }, { label: 'Lista' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    showDialog() {
        this.visible = true;
    }

    private listarHistorias() {
        this.historiaService.obtenerListaHistoria().subscribe(dato => {
            this.historias = dato;
        });
    }

    private obtenerMascotasHabilitados() {
        this.mascotaService.obtenerMascotasHabilitados().subscribe(dato => {
            this.mascotas = dato;
        })
    }

    registroHistoria() {
        this.historiaService.crearHistoria(this.historia).subscribe(dato => {
            this.regresarListaHistorias();
            window.location.reload();
        });
    }

    regresarListaHistorias() {
        this.router.navigate(['./historias']);
        Swal.fire(
            'Historia creada',
            `La historia ${this.historia.historiaId} ha sido creada con éxito`,
            'success'
        );
    }

    actualizaHistoria(id: number) {
        this.router.navigate(['actualizar-historias', id]);
    }

    detalleHistoria(id: number) {
        this.router.navigate(['detalle-historias', id]);
    }

    inhabilitaHistoria(id: number) {
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

    exportPdf(historias: Historia[]): void {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('l', 'px', 'a4');
                const tableData: any = [];
                let actual = this.fechaActual.toLocaleString();

                // Recorrer los datos y agregarlos a la tabla
                historias.forEach((h) => {
                    const row = [h.historiaId, h.historiaFechaCreacion, h.historiaEstado, h.mascota.mascotaId, h.mascota.mascotaNombre, h.mascota.mascotaTipo, h.mascota.mascotaRaza, h.mascota.cliente.clienteId, h.mascota.cliente.clienteNombre, h.mascota.cliente.clienteNroDocumento]; // Ejemplo de atributos de la relación
                    tableData.push(row);
                });

                // Configurar la estructura de la tabla
                const tableHeaders = ['ID', 'Fcha Creación', 'Estado', 'MascotaID', 'M. Nombre', 'M. Tipo', 'M. Raza', 'PropietarioID', ' P. Nombre', ' P. Dni'];
                (doc as any).autoTable({ head: [tableHeaders], body: tableData });

                // Guardar el PDF
                doc.save(`historias_${actual}.pdf`);
            });
        });
    }

    exportExcel(historias: Historia[]) {
        import('xlsx').then((xlsx) => {
            const tableData: any = [];

            // Recorrer los datos y agregarlos a la tabla
            historias.forEach((h) => {
                const row = [h.historiaId, h.historiaFechaCreacion, h.historiaEstado, h.mascota.mascotaId, h.mascota.mascotaNombre, h.mascota.mascotaTipo, h.mascota.mascotaRaza, h.mascota.cliente.clienteId, h.mascota.cliente.clienteNombre, h.mascota.cliente.clienteNroDocumento]; // Ejemplo de atributos de la relación
                tableData.push(row);
            });

            const worksheet = xlsx.utils.json_to_sheet(tableData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            xlsx.utils.sheet_add_aoa(worksheet, [['ID', 'Fcha Creación', 'Estado', 'MascotaID', 'M. Nombre', 'M. Tipo', 'M. Raza', 'PropietarioID', ' P. Nombre', ' P. Dni']]);
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'historias');
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
