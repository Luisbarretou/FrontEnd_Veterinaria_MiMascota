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
    styles: []
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
            { field: 'servicioFechaCreacion', header: 'Fecha de Creacion' }
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

    exportPdf(servicios: Servicio[]): void {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('l', 'px', 'a4');
                const tableData: any = [];
                let actual = this.fechaActual.toLocaleString();

                // Recorrer los servicios
                servicios.forEach((s) => {
                    // Crear una fila por cada producto del servicio
                    s.productos.forEach((producto, index) => {
                        // Crear una fila con los datos del servicio y los datos del producto
                        const row = [
                            index === 0 ? s.servicioId : '',
                            index === 0 ? s.servicioCategoria : '',
                            index === 0 ? s.servicioTipo : '',
                            index === 0 ? s.servicioPrecio : '',
                            index === 0 ? s.servicioEstado : '',
                            index === 0 ? s.servicioFechaCreacion : '',
                            producto.productoId,
                            producto.productoNombre,
                            producto.productoMarca,
                            producto.productoCategoria
                        ];
                        tableData.push(row);
                    });
                });

                // Configurar la estructura de la tabla
                const tableHeaders = ['ID', 'Categoria', 'Tipo', 'Precio', 'Estado', 'Fcha Creacion', 'Prod ID', 'Prod Nombre', 'Prod Marca', 'Prod Categoria'];
                (doc as any).autoTable({ head: [tableHeaders], body: tableData });

                // Guardar el PDF
                doc.save(`servicios_${actual}.pdf`);
            });
        });
    }

    exportExcel(servicios: Servicio[]) {
        import('xlsx').then((xlsx) => {
            const tableData: any = [];

            // Recorrer los datos y agregarlos a la tabla
            servicios.forEach((s) => {
                s.productos.forEach((pro) => {
                    const row = [s.servicioId, s.servicioCategoria, s.servicioTipo, s.servicioPrecio, s.servicioEstado, s.servicioFechaCreacion,
                        pro.productoId, pro.productoNombre, pro.productoMarca, pro.productoCategoria
                    ];
                    tableData.push(row);
                });
            });

            const worksheet = xlsx.utils.json_to_sheet(tableData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            xlsx.utils.sheet_add_aoa(worksheet, [['ID', 'Categoria', 'Tipo', 'Precio', 'Estado', 'Fcha Creacion', 'Prod ID', 'Prod Nombre', 'Prod Marca', 'Prod Categoria']]);
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
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
