import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleHistoria } from './detalle-historia';

@Injectable({
    providedIn: 'root'
})
export class DetalleHistoriaService {

    private urlBackend = "http://localhost:7071/api/detalleHistoria";

    constructor(private httpClient: HttpClient) { }

    obtenerListaDetalleHistorias(): Observable<DetalleHistoria[]>{
        return this.httpClient.get<DetalleHistoria[]>(`${this.urlBackend}`);
    }

    obtenerDetalleHistoria(id: number): Observable<DetalleHistoria>{
        return this.httpClient.get<DetalleHistoria>(`${this.urlBackend}/${id}`);
    }

    crearDetalleHistoria(id: number, detalleHistoria: DetalleHistoria): Observable<object>{
        return this.httpClient.post(`${this.urlBackend}/${id}`, detalleHistoria);
    }

    actualizarDetalleHistoria(id: number, detalleHistoria: DetalleHistoria): Observable<object>{
        return this.httpClient.put(`${this.urlBackend}/${id}`, detalleHistoria);
    }

    inhabilitarDetalleHistoria(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`,{});
    }
}
