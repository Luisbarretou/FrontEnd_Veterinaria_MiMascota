import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { Proveedor } from '../proveedores/proveedor';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    private urlBackend = "http://localhost:7071/api/productos";

    constructor(private httpClient: HttpClient) { }

    obtenerListaProductos(): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(`${this.urlBackend}`);
    }

    obtenerListaProductosHabilitados(): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(this.urlBackend + '/habilitados');
    }

    obtenerProducto(id: number): Observable<Producto> {
        return this.httpClient.get<Producto>(`${this.urlBackend}/${id}`);
    }

    crearProducto(producto: Producto): Observable<object> {
        return this.httpClient.post(`${this.urlBackend}`, producto);
    }

    actualizarProducto(id: number, producto: Producto): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}`, producto);
    }

    inhabilitarProducto(id: number): Observable<object> {
        return this.httpClient.put(`${this.urlBackend}/${id}/inhabilitar`, {});
    }

}
