import { Injectable } from '@angular/core';
import {RegistroModel} from "../models/registroModel";
import { Storage } from '@ionic/storage-angular';
import {NavController} from "@ionic/angular";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  public datos: Array<RegistroModel>;

  constructor(private storage: Storage,
              private navCtrl: NavController,
              private iab: InAppBrowser,
              private file: File,
              private emailComposer: EmailComposer) {
    this.datos  = new Array<RegistroModel>();
    this.createLocalStorage();
    this.cargarRegistros();
  }

  async createLocalStorage() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public guardarRegistro(format: string, text: string){
    const nuevoRegistro = new RegistroModel(format, text);
    this.datos.unshift(nuevoRegistro);
    this._storage?.set('registro', this.datos);
    this.abrirRegistro(nuevoRegistro);
  }

  async cargarRegistros(){
    const registros =  await this.storage.get('registro');
    if(registros){
      this.datos = registros;
    }else{
      this.datos = new Array<RegistroModel>();
    }
    return this.datos;
  }

  abrirRegistro(registro : RegistroModel){
    console.log(registro);
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (registro.type){
      case 'http':
        const browser = this.iab.create(registro.text, '_system');
        break;
      case 'geo:':
        this.navCtrl.navigateForward('/tabs/tab2/mapa/' + registro.text);
        break;
    }
  }
  enviarCorreo(){
    const arregloTempo = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arregloTempo.push(titulos);
    this.datos.forEach(registro =>{
      const line = registro.type + ',' + registro.format + ',' + registro.created + ',' + registro.text.replace(',',' ') + '\n';
      arregloTempo.push(line);
    });
    this.crearArchivoFisco(arregloTempo.join(''));
  }

  crearArchivoFisco(text: string){
    this.file.checkFile(this.file.dataDirectory, 'registros.csv').then( response => {
      return this.escribirArchivo(text);
    }).catch(error =>{
      return this.file.createFile(this.file.dataDirectory,'registros.csv',false).then(creado =>{
        this.escribirArchivo(text);
      }).catch(fail =>{
        console.log(fail);
      });
    });
  }
  async escribirArchivo(texto: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', texto);
    const archivo = this.file.dataDirectory+'registros.csv'

    const email = {
      to: '',
      cc: '',
      bcc: [],
      attachments: [
        archivo
      ],
      subject: 'Backup de Scans',
      body: 'Aqui tiene sus backups de los scans <strong>AppQrScanner</strong>',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
