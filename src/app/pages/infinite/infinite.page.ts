import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {

  public data: any[] = Array();
  constructor() { }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  ngOnInit() {
    this.llenarArreglo();
  }
  public llenarArreglo(){
    for( var i = 0; i < 20; i++){
      this.data.push(i);
    }
  }
  public loadData(event){
    console.log(event);
    setTimeout(() => {
      console.log('Done');
      this.llenarArreglo();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length === 100) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
