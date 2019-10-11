import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { NgForm,FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { createAotUrlResolver } from '@angular/compiler';

declare var N: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})

export class RegistroComponent implements OnInit {

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  identiPattern: any=/^(?=.*?[0-9]).*$/;
  createFormGroup(){
    return new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.maxLength(40),Validators.pattern(this.emailPattern)]),
      name: new FormControl('',[Validators.required, Validators.minLength(3)]),
      identificacion: new FormControl('',[Validators.required, Validators.minLength(6),Validators.pattern(this.identiPattern)]),
      pais: new FormControl('',[Validators.required, ]),
      apellido: new FormControl('',[Validators.required, Validators.minLength(3)]),
      contrasena: new FormControl('',[Validators.required, Validators.minLength(4)]),
    });
  }
  contactForm: FormGroup;

  constructor(private usuarioService: UsuarioService) { 
    this.contactForm = this.createFormGroup();
  }
  myForm: FormGroup; 

  ngOnInit() {
    this.getUsuarios();


  }

  addUsuario(form?: NgForm) {
    console.log(form.value);
    if(this.contactForm.valid){
      if (form.value._id) {
        this.usuarioService.putUsuario(form.value)
          .subscribe(res => {
            this.resetForm(form);
            this.getUsuarios();
  
          });
    }} else {
      console.log('no valido')
      if (form.value.name == "") {
        alert("Debes llenar el campo nombres");
      } else if (form.value.apellido == "" ) {
        alert("Debes llenar el apellido");
      } else if (form.value.identificacion == "") {
        alert("Debes llenar el campo identificacion");
      } else if (form.value.correo == "") {
        alert("Debes llenar el campo Email" );
      } else if (form.value.pais == "") {
        alert("Debes llenar el campo Pais");
      } else if (form.value.contrasena == "") {
        alert("Debes llenar el campo nombres");
      } else {
        this.usuarioService.postUsuario(form.value)
          .subscribe(res => {
            this.getUsuarios();
            this.resetForm(form);
          });
      }

    }

  }

  get name(){return this.contactForm.get('name')};
  get identificacion(){return this.contactForm.get('identificacion')};
  get correo(){return this.contactForm.get('correo')};
  get pais(){return this.contactForm.get('pais')};
  get apellido(){return this.contactForm.get('apellido')};
  get contrasena(){return this.contactForm.get('contrasena')};

 


  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarioService.usuarios = res as Usuario[];
      });
  }

  editUsuario(usuario: Usuario) {
    this.usuarioService.selectedUsuario = usuario;
  }

  deleteUsuario(_id: string, form: NgForm) {
    if (confirm('Estas seguro que deseas borrar el usuario?')) {
      this.usuarioService.deleteUsuario(_id)
        .subscribe(res => {
          this.getUsuarios();
          this.resetForm(form);
        });
    }
  }
  
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.selectedUsuario = new Usuario();
    }
  }


}

