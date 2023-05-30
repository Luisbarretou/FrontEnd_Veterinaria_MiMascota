import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from './mascota';

@Injectable({
    providedIn: 'root'
})
export class MascotaService {

    private urlBackend = "http://localhost:7071/api/mascotas";

    constructor(private httpClient: HttpClient) { }

    obtenerListaMascotas(): Observable<Mascota[]> {
        return this.httpClient.get<Mascota[]>(`${this.urlBackend}`);
    }

    obtenerMascotasHabilitados(): Observable<Mascota[]> {
        return this.httpClient.get<Mascota[]>(`${this.urlBackend}/habilitadas`)
    }

    crearMascota(mascota: Mascota): Observable<Object> {
        return this.httpClient.post(`${this.urlBackend}`, mascota);
    }

    actualizarMascota(id: number, mascota: Mascota): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, mascota);
    }

    obtenerMascota(id: number): Observable<Mascota> {
        return this.httpClient.get<Mascota>(`${this.urlBackend}/${id}`);
    }

    eliminarMascota(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.urlBackend}/${id}`);
    }
}
