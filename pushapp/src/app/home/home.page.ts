import {ApplicationRef, Component, OnInit} from '@angular/core';
import {PushService} from "../services/push.service";
import {OSNotificationPayload} from "@ionic-native/onesignal";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public mensajes: OSNotificationPayload[] = [];

  constructor(private pushService: PushService,
              private applicationRef: ApplicationRef) {}

  ngOnInit() {
    this.pushService.pushListener.subscribe(noti =>{
      this.mensajes.unshift(noti);
      this.applicationRef.tick();
    });
  }
  async ionViewWillEnter(){
    this.mensajes = await this.pushService.getMesansajes();
  }
}
