import { Proveedor } from "../proveedores/proveedor";

export class Producto {
    productoId: number;
    productoNombre: string;
    productoMarca: string;
    productoCategoria: string;
    productoDescripcion: string;
    productoPrecio: number;
    productoFchaCreacion: string;
    productoEstado: string;
    proveedores: Array<Proveedor> = [];
}
