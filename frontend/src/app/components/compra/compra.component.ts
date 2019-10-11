import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  img:string;
  nombre: string;
  codigo:string;
  precio:string;
  descripcion:string;
  disponibilidad:string;

  constructor(private productoservice: ProductoService) { }

  ngOnInit() {
    this.traerdatosproducto()
    this.actualizarinformacion()
  }

  traerdatosproducto(){
    let idpro = localStorage.getItem('idproduc')
    this.productoservice.oneproduc(idpro).subscribe((res:any)=>{
    console.log(res)
    this.nombre= res.nombre;
    this.img=res.img;
    this.codigo=res.codigo;
    this.descripcion=res.descripcion;
    this.precio=res.precio;
 
 })
  }

  actualizarinformacion() {
    const h = this.traerdatosproducto();

    console.log(h)
  }
}
