import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder,FormGroup, Validators,FormControl} from '@angular/forms';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup(){
    return new FormGroup({
      correo: new FormControl('',[Validators.required, Validators.maxLength(40),Validators.pattern(this.emailPattern)]),
      contrasena: new FormControl('',[Validators.required, Validators.minLength(4)]),
      
    });
  }
 
  contactForm: FormGroup;
  constructor() {
    this.contactForm =this.createFormGroup();
   }

  ngOnInit() {
  }

}
