import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm,FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})


export class SignInComponent implements OnInit {
  data = {
    correo: '',
    password: ''
  }

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup(){
    return new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.maxLength(40),Validators.pattern(this.emailPattern)]),
      contrasena: new FormControl('',[Validators.required, Validators.minLength(4)]),
      
    });
  }
 
  contactForm: FormGroup;
  constructor(private ingreso: UsuarioService, private router:Router) {
    this.contactForm = this.createFormGroup();
  }

  
  ngOnInit() {
  }
   


 
  signIn() {
    console.log(this.data)
    this.ingreso.ingresar(this.data).subscribe((rest: any) => {
      console.log(rest)
      if (rest.result == true) {

        localStorage.setItem('idusuario',rest.data._id);
        window.location.replace('/user/perfil');
        console.log(rest)
      }else {
        console.log(rest.result)
        alert("el correo o la contraseña son incorrectos")
      }
    }
)
  }
  
  get correo(){return this.contactForm.get('correo')};
  get contrasena(){return this.contactForm.get('contrasena')};

  rr(){
    window.location.replace('/user/registro');
  }

  






}
