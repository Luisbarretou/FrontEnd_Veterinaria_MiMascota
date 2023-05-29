import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private urlBackend = "http://localhost:7071/api/clientes";

    constructor(private httpClient: HttpClient) { }

    obtenerListaClientes(): Observable<Cliente[]> {
        return this.httpClient.get<Cliente[]>(`${this.urlBackend}`)
    }

    obtenerclientesHabilitados(): Observable<Cliente[]> {
        return this.httpClient.get<Cliente[]>(`${this.urlBackend}/habilitados`)
    }

    crearCliente(cliente: Cliente): Observable<Object>{
        return this.httpClient.post(`${this.urlBackend}`, cliente)
    }

    actualizarCliente(id: number, cliente: Cliente): Observable<object>{
        return this.httpClient.put(`${this.urlBackend}/${id}`, cliente);
    }

    obtenerCliente(id: number): Observable<Cliente>{
        return this.httpClient.get<Cliente>(`${this.urlBackend}/${id}`);
    }

    eliminarCliente(id: number): Observable<Object>{
        return this.httpClient.delete(`${this.urlBackend}/${id}`);
    }

}
