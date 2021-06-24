import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ModalInfoPage} from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public nombre: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  public abrirModal(){
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        'firstName': 'Omar',
        'lastName': 'Hernandez',
        'middleInitial': 'OMARIN',
        'nombre': this.nombre,
      }
    });
    await modal.present();
    const {data} = await modal.onWillDismiss();
    console.log(data);
  }

}
