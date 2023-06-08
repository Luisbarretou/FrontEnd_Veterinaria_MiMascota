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

    obtenerListaProveedor(): Observable<Proveedor[]> {
        return this.httpClient.get<Proveedor[]>(`${this.urlBackend}`);
    }
    obtenerProveedores(id: number): Observable<Proveedor> {
        return this.httpClient.get<Proveedor>(`${this.urlBackend}/${id}`);
    }

    crearProveedores(proveedor: Proveedor): Observable<object> {
        return this.httpClient.post(`${this.urlBackend}`, proveedor);
    }

    actualizarProveedores(id: number, proveedor: Proveedor): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, proveedor);
    }

    inhabilitarProveedor(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`,{});
    }
}