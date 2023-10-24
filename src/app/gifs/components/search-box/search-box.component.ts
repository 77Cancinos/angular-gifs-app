import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
    class="form-control"
    placeholder="Buscar Gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput
  >
 `
})

export class SearchBoxComponent {
  //ViewChild toma una referencia local | ViewChildren regresa un arreglo general
  @ViewChild('txtTagInput')

  //El ! significa que siempre tendra una referencia (siempre tendra un valor)
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    //console.log({ newTag });
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = ''; //Limpiar el input

  }


}
