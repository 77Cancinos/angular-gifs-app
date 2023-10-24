import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'QsEPj67RN9YUd1EgmjYHmAYlUXSetHKC';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs service ready');

  }

  get tagsHistory() {
    return [...this._tagsHistory]; //operador spreed, evitamos mutaciones
  }


  private organizeHistory(tag: string) {
    tag = tag.toLowerCase(); //se pasa a miniscula para validar

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag); //Validar si existe, si da true lo agrega el inicio
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10); //Listado maximo de 10
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //Si se recarga el navegador, se guarda el ultimo elemento
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return; //Si el valor enviado es vacio, que no haga nada
    this.organizeHistory(tag);
    //console.log(this._tagsHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        //console.log(resp);

        this.gifList = resp.data;
        //console.log({ gifs: this.gifList });

      });

  }

}
