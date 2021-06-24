import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;
  @Input() nombre: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  public respuestaModalSinArgumentos(){
    this.modalController.dismiss();
  }
  public respuestaModalConArgumentos(){
    this.modalController.dismiss({
      'Mensaje': 'Respuesta del modal',
      'Nombre': 'Omar Hernández'
    });
  }

}
