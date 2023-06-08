import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historia } from './historia';

@Injectable({
    providedIn: 'root'
})
export class HistoriaService {

    private urlBackend = "http://localhost:7071/api/historias";

    constructor(private httpClient: HttpClient) { }

    obtenerListaHistoria(): Observable<Historia[]> {
        return this.httpClient.get<Historia[]>(`${this.urlBackend}`);
    }

    obtenerListaHistoriasHabilitadas(): Observable<Historia[]> {
        return this.httpClient.get<Historia[]>(`${this.urlBackend}/habilitadas`);
    }

    obtenerHistoria(id: number): Observable<Historia> {
        return this.httpClient.get<Historia>(`${this.urlBackend}/${id}`);
    }

    crearHistoria(historia: Historia): Observable<object> {
        return this.httpClient.post(`${this.urlBackend}`, historia);
    }

    actualizarHistoria(id: number, historia: Historia): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, historia);
    }

    inhabilitarHistoria(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`, {});
    }

}
