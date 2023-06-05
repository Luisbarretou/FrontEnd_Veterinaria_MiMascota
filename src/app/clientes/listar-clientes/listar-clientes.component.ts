import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import * as FileSaver from 'file-saver';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-clientes',
    templateUrl: './listar-clientes.component.html',
    styles: [
    ]
})
export class ListarClientesComponent {

    clientes: Cliente[];
    pageActual: number = 1;

    seleccionCliente: Cliente[];
    cols: any[];
    exportColumns: any[];

    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private clienteService: ClienteService, private router: Router) { }

    ngOnInit(): void {
        this.listarClientes();
        cliente => this.clientes = cliente;

        this.cols = [
            { field: 'clienteId', header: 'Codigo', customExportHeader: 'Cliente' },
            { field: 'clienteNroDocumento', header: 'Documento' },
            { field: 'clienteNombre', header: 'Nombres' },
            { field: 'clienteTelefono', header: 'Telefono'},
            { field: 'clienteDireccion', header: 'Direccion' },
            { field: 'clienteCorreo', header: 'Correo'},
            { field: 'clienteGenero', header: 'Genero'},
            { field: 'clienteEstado', header: 'Estado'},
            { field: 'clienteFchaCreacion', header: 'Fecha de Creacion'}
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

        this.items = [{ label: 'Cliente' }, { label: 'Lista' }];

        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarClientes(){
        this.clienteService.obtenerListaClientes().subscribe( dato => {
        this.clientes = dato;
        })
    }

    actualizaCliente(id: number){
        this.router.navigate([`actualizar-clientes`, id]);
    }

    detalleCliente(id: number){
        this.router.navigate([`detalle-clientes`, id]);
    }

    eliminarCliente(cliente: Cliente) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar el cliente: "${cliente.clienteNombre}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.clienteService.eliminarCliente(cliente.clienteId).subscribe(dato => {
                    console.log(dato);
                    this.listarClientes();
                    swalWithBootstrapButtons.fire(
                        'Cliente Eliminado!',
                        `Cliente: "${cliente.clienteNombre}" eliminado con éxito.`,
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
                (doc as any).autoTable(this.exportColumns, this.clientes);
                doc.save(`clientes_${actual}.pdf`);
            });
        });
    }

    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.clientes);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'clientes');
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
