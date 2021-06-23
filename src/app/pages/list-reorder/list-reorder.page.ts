import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {

  public personajes: Array<string>;
  public toggle: boolean;
  public toogleDisabled: boolean;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor() { }

  ngOnInit() {
    this.personajes = new Array<string>();
    this.toogleDisabled = true;
    this.llenarPersonajes();
  }

  /**
   * Funcion par allenar los datos
   */
  llenarPersonajes(){
    this.personajes.push('Superman');
    this.personajes.push('Batman');
    this.personajes.push('Flash');
    this.personajes.push('AquaMan');
    this.personajes.push('Mujer Maravilla');
  }

  /**
   * Funcion para obener el evento de la lista reordenada
   * @param evento
   */
  public doReorder(evento: CustomEvent<ItemReorderEventDetail>) {
    const from = evento.detail.from;
    const to = evento.detail.to;
    console.log('Before complete', this.personajes);
    this.personajes =  evento.detail.complete(this.personajes);
    console.log('After complete', this.personajes);
  }

  /**
   * funcion par obtener la inversa del patron
   */
  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  /**
   * Funcion para obtener la inversa del valor
   */
  toggleReorderGroupPersonajes(){
    this.toogleDisabled = !this.toogleDisabled;
  }

}
