import {Component, Input, OnInit} from '@angular/core';
import {Articles} from "../../models/Articles";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Articles;
  constructor() {
    this.noticia = new Articles();
  }

  ngOnInit() {}

}
