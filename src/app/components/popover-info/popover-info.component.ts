import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-popover-info',
  templateUrl: './popover-info.component.html',
  styleUrls: ['./popover-info.component.scss'],
})
export class PopoverInfoComponent implements OnInit {

  public items: Array<number>;
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.items = new Array<number>();
    this.llenarDatos();
  }
  llenarDatos(){
    for (let i = 0; i < 10; i++){
      this.items.push(i);
    }
  }
  clicItem(valor: any){
    console.log(valor);
    this.popoverCtrl.dismiss({
      item: valor
    });
  }

}
