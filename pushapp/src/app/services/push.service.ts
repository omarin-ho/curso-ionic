import { Injectable, EventEmitter } from '@angular/core';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  public mensajes: Array<OSNotificationPayload>;
  private _storage: Storage | null = null;
  public pushListener = new EventEmitter<OSNotificationPayload>();
  public userId: string;

  constructor(private oneSignal: OneSignal,
              private storage: Storage
  ) {
    this.mensajes = new Array<OSNotificationPayload>();
    this.userId = '';
    this.init();
    this.cargarMensajes();
  }

  configInicial(){

    this.oneSignal.startInit('2bdf7786-67f3-41fa-9a4e-3c6312753a24', '186932366738');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((response) => {
      // do something when notification is received
      console.log('Notificacion recibida', response);
      this.notificacionRecibida(response);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async (response) => {
      // do something when a notification is opened
      console.log('Notificacion abierta', response);
      await this.notificacionRecibida(response.notification);
    });

    //Obtener el id del usuario
    this.oneSignal.getIds().then(response =>{
      this.userId = response.userId;
    });
    this.oneSignal.endInit();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }


  async notificacionRecibida(noti: OSNotification){
    const payload = noti.payload;
    const existePush = this.mensajes.find(item =>item.notificationID === payload.notificationID);
    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    await this.guardarMensajes();
  }

  guardarMensajes(){
    this._storage.set('mensajes', this.mensajes);
  }
  async cargarMensajes(){
    this.mensajes = await this._storage.get('mensajes') || [];
    return this.mensajes;
  }
  async getMesansajes(){
    await this.cargarMensajes();
    return [...this.mensajes];
  }
}
