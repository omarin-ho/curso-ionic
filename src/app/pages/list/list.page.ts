import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public usuarios: Array<any>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.usuarios = new Array<any>();
    this.obtenerUsuarios();
  }

  public obtenerUsuarios(){
    this.dataService.getUsuarios().subscribe(response => {
      this.usuarios = response;
      console.log(response);
    });
  }

  public unread(item){
    console.log(item);
  }

}
