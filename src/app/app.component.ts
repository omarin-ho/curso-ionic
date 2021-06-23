import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public componentes: Observable<any>;
  constructor( private dataService: DataService) {
    this.componentes = this.dataService.getMenuOptions();
  }

}
