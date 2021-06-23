import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {Componentes} from '../../interfaces/interfaces';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public componentes: Observable<any>;

  constructor(private menuController: MenuController,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOptions();
  }

  public mostrarMenu(){
    this.menuController.open('first');
  }

}
