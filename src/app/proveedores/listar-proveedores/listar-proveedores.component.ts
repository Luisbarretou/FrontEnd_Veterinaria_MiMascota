import { Component } from '@angular/core';
import { Proveedor } from '../proveedor';
import { MenuItem } from 'primeng/api';
import { ProveedorService } from '../proveedor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'app-listar-proveedores',
    templateUrl: './listar-proveedores.component.html',
    styles: []
})
export class ListarProveedoresComponent {

    proveedor: Proveedor[];
    pageActual: number = 1;

    seleccionProveedor: Proveedor[];
    cols: any[];
    exportColumns: any[];

    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private proveedorService: ProveedorService, private router: Router) { }

    ngOnInit(): void {

        this.listarProveedores();
        proveedor => this.proveedor = proveedor;

        this.cols = [
            { field: 'proveedorId', header: 'Codigo', customExportHeader: 'Proveedor' },
            { field: 'proveedorRUC', header: 'RUC' },
            { field: 'proveedorRazonSocial', header: 'Razon Social' },
            { field: 'proveedorTelefono', header: 'Telefono' },
            { field: 'proveedorDireccion', header: 'Direccion' },
            { field: 'proveedorCorreo', header: 'Correo' },
            { field: 'proveedorEstado', header: 'Estado' },
            { field: 'proveedorFchaCreacion', header: 'Fecha de Creacion' }

        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Proveedor' }, { label: 'Lista' }];

        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarProveedores() {
        this.proveedorService.obtenerListaProveedores().subscribe(dato => {
            this.proveedor = dato;
        })
    }


    actualizaProveedor(id: number) {
        this.router.navigate([`actualizar-proveedores`, id]);
    }

    detalleProveedor(id: number) {
        this.router.navigate([`detalle-proveedores`, id]);
    }

    inhabilitaProveedor(id: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea inhabilitar el proveedor: "${id}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, inhabilitar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.proveedorService.inhabilitarProveedor(id).subscribe(dato => {
                    this.listarProveedores();
                    swalWithBootstrapButtons.fire(
                        'Proveedor Inhabilitado!',
                        `Proveedor: "${id}" inhabilitao con éxito.`,
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

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.proveedor);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'proveedores');
        });
    }
    exportPdf() {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                let actual = this.fechaActual.toLocaleString();
                const doc = new jsPDF.default('p', 'px', 'a4');
                (doc as any).autoTable(this.exportColumns, this.proveedor);
                doc.save(`proveedores_${actual}.pdf`);
            });
        });
    }


    saveAsExcelFile(buffer: any, fileName: string): void {
        let actual = this.fechaActual.toLocaleString();
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + actual + EXCEL_EXTENSION);
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
