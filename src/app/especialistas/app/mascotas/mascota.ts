import { Cliente } from "../clientes/cliente";

export class Mascota {
    mascotaId: number;
    mascotaNombre: string;
    mascotaTipo: string;
    mascotaRaza: string;
    mascotaFechaNacimiento: Date;
    mascotaColor: string;
    mascotaSexo: string;
    mascotaObservaciones: string;
    mascotaEstado: string;
    mascotaFchaCreacion: string;
    cliente: Cliente;
}
