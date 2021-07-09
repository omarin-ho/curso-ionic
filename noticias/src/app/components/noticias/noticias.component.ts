import {Component, Input, OnInit} from '@angular/core';
import {TopHeadLinesModel} from "../../models/TopHeadLinesModel";
import {Articles} from "../../models/Articles";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() articles: Array<Articles>;
  @Input() blnFavoritos: number;

  constructor() {
    this.articles = new Array<Articles>();
  }

  ngOnInit() {
  }

}
