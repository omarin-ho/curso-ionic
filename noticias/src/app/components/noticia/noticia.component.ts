import {Component, Input, OnInit} from '@angular/core';
import {Articles} from "../../models/Articles";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController, Platform, ToastController} from "@ionic/angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from "../../services/data-local.service";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Articles;
  @Input() public blnFavorito: number;
  public tituloFavorito: string;

  constructor(private iab: InAppBrowser,
              public actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocalService: DataLocalService,
              public toastController: ToastController,
              private platform: Platform) {
    this.noticia = new Articles();
    this.blnFavorito = 0;
  }

  ngOnInit() {
    this.cambiarFavorito();
  }

  /**
   * Funcion para abrir en navegador del dispositivo
   * @param url
   * @author Omar
   */
  abrirURL(url: string) {
    const browser = this.iab.create(url, '_system');
  }

  /**
   * Funcion asincrona para abrir el menu
   * @author Omar
   */
  async abrirMenu(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Más...',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
         this.compartirNoticia();
        }
      }, {
        text: this.tituloFavorito,
        icon: 'star-outline',
        handler: () => {
          switch (this.blnFavorito){
            case 1:
              this.dataLocalService.guardarNoticia(this.noticia);
              this.presentToast('Agregado a favoritos');
              break;
            case 2:
              this.dataLocalService.eliminarNoticia(this.noticia);
              this.presentToast('Borrado de favoritos');
              break;
          }
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  /**
   * Funcion para cambiar el titulo y funcionalidad del boton
   * @author Omar
   */
  public cambiarFavorito(){
    switch (this.blnFavorito){
      case 1:
        this.tituloFavorito = 'Añadir Favorito';
        break;
      case 2:
        this.tituloFavorito = 'Quitar Favorito';
        break;
      default:
        this.tituloFavorito = 'Añadir Favorito';
        break;
    }
  }

  compartirNoticia(){
    if(this.platform.is('cordova')){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        null,
        this.noticia.url
      );
    }else{
      if (navigator.share) {
        navigator.share({
          title:this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    }

  }

  /**
   * Funcion para mostrar mensaje
   * @param mensaje
   * @author Omar
   */
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
