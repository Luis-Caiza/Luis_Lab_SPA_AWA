import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/producto.service';

interface Producto {
    codigo: string;
    nombre: string;
    costo: number;
    precio: number;
    valor: number;
}

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
    productos: Producto[] = [];
    modelo: Producto = this.emptyProducto();
    editingCodigo: string | null = null;

    constructor(private productoService: ProductoService) { }

    ngOnInit(): void {
        this.load();
    }

    private emptyProducto(): Producto {
        return { codigo: '', nombre: '', costo: 0, precio: 0, valor: 0 };
    }

    load() {
        this.productoService.getAll().subscribe(p => this.productos = p);
    }

    save(form: NgForm) {
        if (form.invalid) return;

        const prod: Producto = { ...this.modelo };
        if (this.editingCodigo) {
            this.productoService.update(this.editingCodigo, prod).subscribe(res => {
                this.resetForm(form);
                this.load();
            });
        } else {
            this.productoService.add(prod).subscribe(() => {
                this.resetForm(form);
                this.load();
            });
        }
    }

    edit(p: Producto) {
        this.editingCodigo = p.codigo;
        this.modelo = { ...p };
    }

    remove(p: Producto) {
        if (!confirm(`Eliminar producto ${p.nombre}?`)) return;
        this.productoService.delete(p.codigo).subscribe(ok => { if (ok) this.load(); });
    }

    resetForm(form?: NgForm) {
        this.modelo = this.emptyProducto();
        this.editingCodigo = null;
        if (form) form.resetForm(this.modelo);
    }
}
