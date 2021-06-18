import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.page.html',
  styleUrls: ['./inputs.page.scss'],
})
export class InputsPage implements OnInit {

  public usuario = {
    nombre:'',
    email:'',
    password:''
  };

  constructor() { }

  ngOnInit() {
  }
  public enviar(){
    console.log('Enviando: ', this.usuario);
  }

}
