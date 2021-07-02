import {Component, OnInit, ViewChild} from '@angular/core';
import {NoticiasService} from "../../services/noticias.service";
import {Articles} from "../../models/Articles";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public category: Array<string>;
  public segment: string;
  public articulos: Array<Articles>;
  public loading: HTMLIonLoadingElement;

  constructor(private noticiasService: NoticiasService,
              public loadingController: LoadingController) {
    this.category = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    this.segment = 'business';
  }
  ngOnInit() {
    this.segment = this.category[0];
    this.buscarNoticiasByCategoria(this.segment);
  }

  /**
   * obtener la categoria por el segment
   * @param evento
   * @author Omar
   */
  public obtenerCategoria(evento: any){
    this.buscarNoticiasByCategoria(evento.detail.value);
  }

  /**
   * Buscar las noticias por categorias
   * @param categoria
   * @author Omar
   */
  buscarNoticiasByCategoria(categoria: string){
    this.presentLoading();
    this.noticiasService.getTopHeadLinesCategory(categoria).subscribe(response =>{
      this.articulos = response.articles;
      this.loading.dismiss();
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
