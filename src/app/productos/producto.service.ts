import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
    providedIn: 'root'
})
export class ProductoService {

    private urlBackend = "http://localhost:7071/api/productos";

    constructor(private httpClient: HttpClient) { }

    obtenerListaProductos(): Observable<Producto[]> {
        return this.httpClient.get<Producto[]>(`${this.urlBackend}`);
    }

    
}
