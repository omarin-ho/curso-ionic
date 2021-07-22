export class PushModel{
  public title: string;
  public boby: string;
  public date: Date;
  public additionalDate: any;
  public notificationID: any;

  constructor(title: string = ' ', boby: string =' ', date: Date = new Date()) {
    this.title = title;
    this.boby = boby;
    this.date = date;
  }
}
