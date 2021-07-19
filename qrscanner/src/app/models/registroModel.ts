export class RegistroModel{
  public format:string;
  public text: string;
  public type: string;
  public icon: string;
  public created: Date;


  constructor(format: string = "", text: string = "", type: string = "", icon: string = "") {
    this.format = format;
    this.text = text;
    this.type = type;
    this.icon = icon;
    this.created = new Date();
    this.definirTipo();
  }

  private definirTipo(){
    const inicioTexto = this.text.substr(0,4);
    console.log('TIPO', inicioTexto);
    switch (inicioTexto){
      case 'http':
        this.type = "http";
        this.icon = 'globe';
        break;
      case 'geo:':
        this.type = "geo:";
        this.icon = 'pin';
        break;
      default:
        this.type = "Undefined";
        this.icon = 'create';
        break;
    }
  }
}
