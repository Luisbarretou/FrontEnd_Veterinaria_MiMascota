import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MascotaService } from '../mascota.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-listar-mascotas',
    templateUrl: './listar-mascotas.component.html',
    styles: []
})
export class ListarMascotasComponent {

    mascotas: Mascota[];
    pageActual: number = 1;

    seleccionMascota: Mascota[];
    cols: any[];
    exportColumns: any[];

    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private mascotaService: MascotaService, private router: Router) { }

    ngOnInit(): void {
        this.listarMascotas();
        mascota => this.mascotas = mascota;

        this.cols = [
            { field: 'mascotaId', header: 'Codigo', customExportHeader: 'Mascota' },
            { field: 'mascotaNombre', header: 'Nombre' },
            { field: 'mascotaTipo', header: 'Tipo' },
            { field: 'mascotaRaza', header: 'Raza' },
            { field: 'mascotaColor', header: 'Color' },
            { field: 'mascotaFechaNacimiento', header: 'Fecha de Nacimiento' },
            { field: 'mascotaSexo', header: 'Sexo' },
            { field: 'mascotaObservaciones', header: 'Observaciones' },
            { field: 'mascotaEstado', header: 'Estado' },
            { field: 'mascotaFchaCreacion', header: 'Fecha de Creacion' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Mascota' }, { label: 'Lista' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarMascotas() {
        this.mascotaService.obtenerListaMascotas().subscribe(dato => {
            this.mascotas = dato;
        });
    }

    actualizaMascota(id: number) {
        this.router.navigate([`actualizar-mascotas`, id]);
    }

    detalleMascota(id: number) {
        this.router.navigate([`detalle-mascotas`, id]);
    }

    eliminarMascota(mascota: Mascota) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar la Mascota: "${mascota.mascotaNombre}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.mascotaService.eliminarMascota(mascota.mascotaId).subscribe(dato => {
                    this.listarMascotas();
                    swalWithBootstrapButtons.fire(
                        'Mascota Eliminada!',
                        `Mascota: "${mascota.mascotaNombre}" eliminada con éxito.`,
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

    exportPdf(mascotas: Mascota[]): void {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('l', 'px', 'a4');
                const tableData: any = [];
                let actual = this.fechaActual.toLocaleString();

                // Recorrer los datos y agregarlos a la tabla
                mascotas.forEach((m) => {
                    const row = [m.mascotaId, m.mascotaNombre, m.mascotaTipo, m.mascotaRaza, m.mascotaColor, m.mascotaFechaNacimiento, m.mascotaSexo, m.mascotaObservaciones, m.mascotaEstado, m.mascotaFchaCreacion, m.cliente.clienteNombre, m.cliente.clienteNroDocumento]; // Ejemplo de atributos de la relación
                    tableData.push(row);
                });

                // Configurar la estructura de la tabla
                const tableHeaders = ['ID', 'Nombre', 'Tipo', 'Raza', 'Color', 'Fcha Nacimiento', 'Sexo', ' Observaciones', ' Estado', ' Fcha Creacion', 'Propietario', 'Dni'];
                (doc as any).autoTable({ head: [tableHeaders], body: tableData });

                // Guardar el PDF
                doc.save(`mascotas_${actual}.pdf`);
            });
        });
    }

    exportExcel(mascotas: Mascota[]) {
        import('xlsx').then((xlsx) => {
            const tableData: any = [];

            // Recorrer los datos y agregarlos a la tabla
            mascotas.forEach((m) => {
                const row = [m.mascotaId, m.mascotaNombre, m.mascotaTipo, m.mascotaRaza, m.mascotaColor, m.mascotaFechaNacimiento, m.mascotaSexo, m.mascotaObservaciones, m.mascotaEstado, m.mascotaFchaCreacion, m.cliente.clienteNombre, m.cliente.clienteNroDocumento]; // Ejemplo de atributos de la relación
                tableData.push(row);
            });

            const worksheet = xlsx.utils.json_to_sheet(tableData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            xlsx.utils.sheet_add_aoa(worksheet, [['ID', 'Nombre', 'Tipo', 'Raza', 'Color', 'Fcha Nacimiento', 'Sexo', ' Observaciones', ' Estado', ' Fcha Creacion', 'Propietario', 'Dni']]);
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'mascotas');
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
