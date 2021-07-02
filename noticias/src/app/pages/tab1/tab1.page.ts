import {Component, OnInit} from '@angular/core';
import {NoticiasService} from "../../services/noticias.service";
import {TopHeadLinesModel} from "../../models/TopHeadLinesModel";
import {Articles} from "../../models/Articles";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public noticias: Array<Articles>;
  public loading: HTMLIonLoadingElement;

  constructor(private noticiasService: NoticiasService,
              public loadingController: LoadingController) {
    this.noticias = new Array<Articles>();
  }

  ngOnInit() {
    this.presentLoading();
    this.cargarNoticias();
  }

  /**
   * Cargar las noticias por servicio
   * @author Omar
   */
  public cargarNoticias(){
    return new Promise((resolve, reject )=>{
      this.noticiasService.getTopHeadLines().subscribe(response =>{
        if(response.articles.length > 0 ){
          this.noticias = response.articles;
          resolve(this.noticias);
        }
        reject();
        this.loading.dismiss();
      });
    });
  }

  /**
   * Carga mediante infiniteScroll
   * @param eveno
   * @author Omar
   */
  public loadData(eveno: any){
    this.cargarNoticias().finally(()=>{
      eveno.target.complete();
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
