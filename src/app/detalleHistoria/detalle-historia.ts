import { Especialista } from "../especialistas/especialista"
import { Historia } from "../historias/historia"
import { Servicio } from "../servicios/servicio"

export class DetalleHistoria {
    detHistoriaId: number;
    detHistoriaFechaCreacion: string;
    detHistoriaFechaProgramada: string;
    detHistoriaFechaAplicada: string;
    detHistoriaFarmaco: string;
    detHistoriaPeso: number;
    detHistoriaObservaciones: string;
    detHistoriaTratamiento: string;
    detHistoriaEstado: string;
    historia: Historia;
    servicio: Servicio;
    especialista: Especialista;
}
