import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from './proveedor';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProveedorService {

    private urlBackend = "http://localhost:7071/api/proveedores";

    constructor(private httpClient: HttpClient) { }

    obtenerListaProveedores(): Observable<Proveedor[]> {
        return this.httpClient.get<Proveedor[]>(`${this.urlBackend}`);
    }

    obtenerProveedoresHabilitados(): Observable<Proveedor[]> {
        return this.httpClient.get<Proveedor[]>(`${this.urlBackend}/habilitados`);
    }

    obtenerProveedor(id: number): Observable<Proveedor> {
        return this.httpClient.get<Proveedor>(`${this.urlBackend}/${id}`);
    }

    crearProveedor(proveedor: Proveedor): Observable<object> {
        return this.httpClient.post(`${this.urlBackend}`, proveedor);
    }

    actualizarProveedor(id: number, proveedor: Proveedor): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, proveedor);
    }

    inhabilitarProveedor(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`, {});
    }
}
