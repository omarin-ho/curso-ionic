import {Component, OnInit} from '@angular/core';
import {DataLocalService} from "../../services/data-local.service";
import {Articles} from "../../models/Articles";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  public noticias: Array<Articles>;
  public loading: HTMLIonLoadingElement;
  public slideOpts = {allowSlidePrev:false,allowSlideNext :false};
  constructor(private dataLocaService: DataLocalService,
              private loadingController: LoadingController) {}

  ngOnInit() {
    this.noticias = new Array<Articles>();
    this.cargarFavoritos();
    this.dataLocaService.eventoFavorito.subscribe(respuesta =>{
     this.noticias = respuesta;
    });
  }

  /**
   * Funcion para cargar los favoritos del storage
   * @author Omar
   */
  cargarFavoritos(){
    this.dataLocaService.cargarFavoritos().then(favoritos => {
      this.noticias = favoritos;
    });
  }
  /**
   * Loading
   * @author Omar
   */
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
