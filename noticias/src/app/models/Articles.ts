import {Source} from "./Source";

export class Articles{
  public source: Source;
  public author: string;
  public title: string;
  public description: string;
  public url: string;
  public urlToImage: string;
  public publishedAt: Date;
  public content: string;


  constructor(author: string = "", title: string = "", description: string = "", url: string ="", urlToImage: string = "", content: string = "") {
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.content = content;
  }

}
