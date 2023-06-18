import { DetalleHistoria } from "../detalleHistoria/detalle-historia";
import { Mascota } from "../mascotas/mascota";

export class Historia {
    historiaId: number;
    historiaFechaCreacion: string;
    historiaEstado: string;
    mascota: Mascota;
    detallesHistoria: Array<DetalleHistoria> = [];
}
