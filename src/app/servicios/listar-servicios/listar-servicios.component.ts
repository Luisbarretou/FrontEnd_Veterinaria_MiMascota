import { Component } from "@angular/core";
import { Servicio } from "../servicio";
import { Router } from "@angular/router";
import { ServicioService } from "../servicio.service";
import { MenuItem } from "primeng/api";
import Swal from "sweetalert2";
import * as FileSaver from "file-saver";


@Component({
    selector: 'app-listar-servicios',
    templateUrl: './listar-servicios.component.html',
    styles: [
    ]
})

export class ListarServiciosComponent {
    servicios: Servicio[];
    pageActual: number = 1;

    seleccionServicio: Servicio[];
    cols: any[];
    exportColumns: any[];
    
    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private servicioService: ServicioService, private router: Router) { }

    ngOnInit(): void {
        this.listarServicios();
        servicio => this.servicios = servicio;

        this.cols = [
            { field: 'servicioId', header: 'Codigo', customExportHeader: 'Servicio' },
            { field: 'servicioCategoria', header: 'Categoria' },
            { field: 'servicioTipo', header: 'Tipo' },
            { field: 'servicioPrecio', header: 'Precio' },
            { field: 'servicioEstado', header: 'Estado' },
            { field: 'servicioFchaCreacion', header: 'Fecha de Creacion' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Servicio' }, { label: 'Lista' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarServicios() {
        this.servicioService.obtenerListaServicios().subscribe(dato => {
            this.servicios = dato;
        });
    }

    actualizaServicio(id: number) {
        this.router.navigate([`actualizar-servicios`, id]);
    }

    detalleServicio(id: number) {
        this.router.navigate([`detalle-servicios`, id]);
    }

    eliminarServicio(servicio: Servicio) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar el servicio: "${servicio.servicioCategoria}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.servicioService.eliminarServicio(servicio.servicioId).subscribe(dato => {
                    this.listarServicios();
                    swalWithBootstrapButtons.fire(
                        'Servicio Eliminado!',
                        `Servicio: "${servicio.servicioCategoria}" eliminado con éxito.`,
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
                const doc = new jsPDF.default('l', 'px', 'a4');
                (doc as any).autoTable(this.exportColumns, this.servicios);
                doc.save(`servicios_${actual}.pdf`);
            });
        });
    }
    
    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.servicios);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'servicios');
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