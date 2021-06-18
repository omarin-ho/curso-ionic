import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.page.html',
  styleUrls: ['./button.page.scss'],
})
export class ButtonPage implements OnInit {

  public favorito: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  click(){
    this.favorito = !this.favorito;
  }

}
