import { Producto } from "../productos/producto";

export class Servicio {
    servicioId: number;
    servicioCategoria: string;
    servicioTipo: string;
    servicioPrecio: Float32Array;
    servicioEstado: string;
    servicioFechaCreacion: string;
    productos: Array<Producto> = [];
}
