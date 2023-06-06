import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialista } from './especialista';

@Injectable({
    providedIn: 'root'
})
export class EspecialistaService {

    private urlBackend = "http://localhost:7071/api/especialistas";

    constructor(private httpClient: HttpClient) { }

    obtenerListaEspecialistas(): Observable<Especialista[]> {
        return this.httpClient.get<Especialista[]>(`${this.urlBackend}`);
    } 

    obtenerListaEspecialistasHabilitados(): Observable<Especialista[]> {
        return this.httpClient.get<Especialista[]>(`${this.urlBackend}/habilitados`);
    }

    obtenerEspecialista(id: number): Observable<Especialista> {
        return this.httpClient.get<Especialista>(`${this.urlBackend}/${id}`);
    }

    crearEspecialista(especialista: Especialista): Observable<object> {
        return this.httpClient.post(`${this.urlBackend}`, especialista);
    }

    actualizarEspecialista(id: number, especialista: Especialista): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, especialista);
    }

    inhabilitarEspecialista(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`,{});
    }
}
