import {EventEmitter,Output, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {Articles} from "../models/Articles";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public noticias: Array<Articles>;
  private storageCreate: Storage | null = null;
  @Output() eventoFavorito: EventEmitter<any> = new EventEmitter();

  constructor(private storage: Storage) {
    this.noticias = new Array<Articles>();
    this.init();
    this.cargarFavoritos();
  }

  /**Sericio para inicializar el storage
   * @author Omar
   */
  async init() {
    this.storageCreate =  await this.storage.create();
  }

  /**
   * Servicio para guardar los favoritos en el storage
   * @param noticia
   * @author Omar
   */
  guardarNoticia(noticia: Articles){
    const existe = this.noticias.find(item => item.title === noticia.title );
    if(!existe){
      this.noticias.unshift(noticia);
      this.storageCreate?.set('favoritos', this.noticias);
    }
  }

  /**
   * Servicio asincrono para obtener los datos del storage
   * @author Omar
   */
  async cargarFavoritos(){
    const favoritos =  await this.storage.get('favoritos');
    if(favoritos){
      this.noticias = favoritos;
    }else{
      this.noticias = new Array<Articles>();
    }
    return this.noticias;
  }

  /**
   * Servicio para eliminar un favorito
   * @param noticia
   */
  eliminarNoticia(noticia: Articles){
    this.noticias = this.noticias.filter(item => item.title !== noticia.title);
    this.storageCreate?.set('favoritos', this.noticias);
    this.eventoFavorito.emit(this.noticias);
  }
}
