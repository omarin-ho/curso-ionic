import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }
  getUsuarios(): Observable<any>{
    return this.http.get(
      'https://jsonplaceholder.typicode.com/users',
      {}
    ).pipe(map( data => {
      return data;
    }));
  }
  getMenuOptions(): Observable<any>{
    return this.http.get(
      '/assets/data/menu-data.json',
      {}
    ).pipe(map( data => {
      return data;
    }));
  }
}
