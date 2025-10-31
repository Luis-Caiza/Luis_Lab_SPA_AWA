import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { Producto } from '../models/producto.model';
interface Producto {
    codigo: string;
    nombre: string;
    costo: number;
    precio: number;
    valor: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private productos: Producto[] = [];

    constructor() {
        // Datos iniciales de ejemplo (opcional)
        this.productos = [
            { codigo: 'P001', nombre: 'Producto A', costo: 10, precio: 15.5, valor: 20.0 },
            { codigo: 'P002', nombre: 'Producto B', costo: 5, precio: 8.25, valor: 10.0 }
        ];
    }

    getAll(): Observable<Producto[]> {
        return of(this.productos.slice());
    }

    add(producto: Producto): Observable<Producto> {
        this.productos.push({ ...producto });
        return of(producto);
    }

    update(codigo: string, producto: Producto): Observable<Producto | null> {
        const idx = this.productos.findIndex(p => p.codigo === codigo);
        if (idx === -1) return of(null);
        this.productos[idx] = { ...producto };
        return of(this.productos[idx]);
    }

    delete(codigo: string): Observable<boolean> {
        const idx = this.productos.findIndex(p => p.codigo === codigo);
        if (idx === -1) return of(false);
        this.productos.splice(idx, 1);
        return of(true);
    }
}
