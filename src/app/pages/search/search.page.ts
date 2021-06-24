import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public albumnes: Array<any>;
  public textSearch: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.albumnes = new Array<any>();
    this.textSearch = '';
    this.obtenerDatos();
  }
  searchChance(evento){
    this.textSearch = evento.detail.value;
  }
  public obtenerDatos(){
    this.dataService.getAlbumnes().subscribe(response =>{
      this.albumnes = response;
    });
  }

}
