import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotchRssService {

  private _notchRSS = "https://cors-anywhere.herokuapp.com/https://notch.health/blogs/articles.atom";

  constructor(private _http: HttpClient) { 
    this.readRss();
  }

  async readRss()  {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };

    this._http.get(this._notchRSS, requestOptions).subscribe((data) => {

    })

  }
}
