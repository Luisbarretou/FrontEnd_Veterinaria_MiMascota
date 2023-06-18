import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Servicio } from "./servicio";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    private urlBackend = "http://localhost:7071/api/servicios";

    constructor(private httpClient: HttpClient) { }

    obtenerListaServicios(): Observable<Servicio[]> {
        return this.httpClient.get<Servicio[]>(`${this.urlBackend}`);
    }

    obtenerServiciosHabilitados(): Observable<Servicio[]> {
        return this.httpClient.get<Servicio[]>(`${this.urlBackend}/habilitados`)
    }

    obtenerServicio(id: number): Observable<Servicio> {
        return this.httpClient.get<Servicio>(`${this.urlBackend}/${id}`);
    }

    crearServicio(servicio: Servicio): Observable<Object> {
        return this.httpClient.post(`${this.urlBackend}`, servicio);
    }

    actualizarServicio(id: number, servicio: Servicio): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, servicio);
    }

    inhabilitarServicio(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`, {});
    }

    eliminarServicio(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.urlBackend}/${id}`);
    }
}
