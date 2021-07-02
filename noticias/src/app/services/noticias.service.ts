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
  public page: number = 0;

  constructor(private http: HttpClient) {
    this.apiKey = 'fe3b338c29394e6ca611549cd4fcf7e3';
    this.apiUrl = 'https://newsapi.org/v2/';
    this.country = 'us';
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
    return this.http.get(
      this.apiUrl + 'top-headlines?country=' + this.country + '&category=' + categoria + '&apiKey='+ this.apiKey,
      {}
    ).pipe(map( data => {
      console.log(data);
      return data;
    }));
  }
}
