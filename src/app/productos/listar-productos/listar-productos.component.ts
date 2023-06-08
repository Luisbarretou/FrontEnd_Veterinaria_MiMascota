import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { Producto } from '../producto';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-listar-productos',
    templateUrl: './listar-productos.component.html',
    styles: [
    ]
})
export class ListarProductosComponent {

    productos: Producto[];

    pageActual: number = 1;

    seleccionProducto: Producto[];
    items: MenuItem[];
    home: MenuItem;

    fechaActual = new Date();

    constructor(private productoService: ProductoService, private router: Router) { }

    ngOnInit(): void {
        this.listarProductos();
        this.items = [{ label: 'Producto' }, { label: 'Lista' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    private listarProductos() {
        this.productoService.obtenerListaProductos().subscribe(dato => {
            this.productos = dato;
        });
    }

    actualizaProducto(id: number) {
        this.router.navigate([`actualizar-productos`, id]);
    }

    detalleProducto(id: number) {
        this.router.navigate([`detalle-productos`, id]);
    }

    inhabilitaProducto(id: number) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea inhabilitar el Producto: "${id}" ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, inhabilitar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.productoService.inhabilitarProducto(id).subscribe(dato => {
                    this.listarProductos();
                    swalWithBootstrapButtons.fire(
                        'Producto Inhabilitado!',
                        `Producto: "${id}" inhabilitao con éxito.`,
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

    exportPdf(productos: Producto[]): void {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('l', 'px', 'a4');
                const tableData: any = [];
                let actual = this.fechaActual.toLocaleString();

                // Recorrer los datos y agregarlos a la tabla
                productos.forEach((p) => {
                    const row = [p.productoId, p.productoNombre, p.productoMarca, p.productoCategoria, p.productoPrecio, p.productoFchaCreacion, p.productoEstado, p.proveedores.forEach((pro) => {
                        pro.proveedorRUC, pro.proveedorRazonSocial
                    })
                    ]; // Ejemplo de atributos de la relación
                    tableData.push(row);
                });

                // Configurar la estructura de la tabla
                const tableHeaders = ['ID', 'Nombre', 'Marca', 'Categoria', 'Precio', 'Fcha Creacion', 'Estado', 'Prov RUC', 'Prov Razon Social'];
                (doc as any).autoTable({ head: [tableHeaders], body: tableData });

                // Guardar el PDF
                doc.save(`productos_${actual}.pdf`);
            });
        });
    }

    exportExcel(productos: Producto[]) {
        import('xlsx').then((xlsx) => {
            const tableData: any = [];

            // Recorrer los datos y agregarlos a la tabla
            productos.forEach((p) => {
                const row = [p.productoId, p.productoNombre, p.productoMarca, p.productoCategoria, p.productoPrecio, p.productoFchaCreacion, p.productoEstado, p.proveedores.forEach((pro) => {
                    pro.proveedorRUC, pro.proveedorRazonSocial
                })
                ]; // Ejemplo de atributos de la relación
                tableData.push(row);
            });

            const worksheet = xlsx.utils.json_to_sheet(tableData);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            xlsx.utils.sheet_add_aoa(worksheet, [['ID', 'Nombre', 'Marca', 'Categoria', 'Precio', 'Fcha Creacion', 'Estado', 'Prov RUC', 'Prov Razon Social']]);
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, 'productos');
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
            case 'Bajo Stock': {
                return 'warning';
            }
            default: {
                return 'primary';
            }
        }
    }
}
