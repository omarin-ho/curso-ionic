import { Injectable } from '@angular/core';
import {RegistroModel} from "../models/registroModel";
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  public datos: Array<RegistroModel>;

  constructor(private storage: Storage) {
    this.datos  = new Array<RegistroModel>();
    this.createLocalStorage();
    this.cargarFavoritos();
  }

  async createLocalStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public guardarRegistro(format: string, text: string){
    const nuevoRegistro = new RegistroModel(format, text);
    this.datos.unshift(nuevoRegistro);
    this._storage?.set('registro', this.datos);
  }

  async cargarFavoritos(){
    const registros =  await this.storage.get('registro');
    if(registros){
      this.datos = registros;
    }else{
      this.datos = new Array<RegistroModel>();
    }
    return this.datos;
  }
}
