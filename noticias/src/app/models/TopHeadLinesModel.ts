import {Articles} from "./Articles";

export class TopHeadLinesModel{
  public status: string;
  public totalResults: number;
  public articles: Array<Articles>;


  constructor(status: string = "", totalResults: number = 0) {
    this.status = status;
    this.totalResults = totalResults;
  }
}
