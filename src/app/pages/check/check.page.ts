import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  public checks = 'checks';
  public form = [
    { val: 'Pepperoni', isChecked: true, color: 'primary' },
    { val: 'Sausage', isChecked: false, color : 'warning' },
    { val: 'Mushroom', isChecked: false, color: 'danger' }
  ];

  constructor() { }

  ngOnInit() {
  }
  public click(item: any){
    console.log(item);
  }

}
