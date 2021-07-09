import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  public apiKey: string;
  public apiUrl: string;
  public country: string;
  public page: number;
  public category: string;
  public pageCategory: number;

  constructor(private http: HttpClient) {
    this.apiKey = 'fe3b338c29394e6ca611549cd4fcf7e3';
    this.apiUrl = 'https://newsapi.org/v2/';
    this.country = 'us';
    this.page = 0;
    this.category = '';
    this.pageCategory = 0;
  }

  /**
   * Servicio para obtener las noticias top
   * @author Omar
   */
  public getTopHeadLines(): Observable<any>{
    this.page++;
    return this.http.get(
      this.apiUrl + 'top-headlines?country='+ this.country + '&apiKey=' + this.apiKey + '&page=' + this.page,
      {}
    ).pipe(map( data => {
      console.log(data);
      return data;
    }));
  }

  /**
   * Servicio par obtener las noticias por categoria
   * @param categoria
   * @author Omar
   */
  public getTopHeadLinesCategory(categoria: string): Observable<any>{
    if(this.category === categoria){
      this.pageCategory++;
    }else{
      this.pageCategory = 1;
      this.category = categoria;
    }
    console.log(this.pageCategory, categoria);
    return this.http.get(
      this.apiUrl + 'top-headlines?country=' + this.country + '&category=' + categoria + '&apiKey='+ this.apiKey + '&page=' + this.pageCategory,
      {}
    ).pipe(map( data => {
      console.log(data);
      return data;
    }));
  }
}
