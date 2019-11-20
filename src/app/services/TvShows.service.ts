import { Injectable } from '@angular/core';
import {TvShows} from '../modules/TvShows';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private shows: TvShows[] = [];
  detailShow: TvShows;

  constructor(private httpClient: HttpClient) {
    this.shows.push(new TvShows(1, '4 BLOCKS'));
    this.shows.push(new TvShows(2, 'Breaking Bad'));
    this.shows.push(new TvShows(3, 'Prison Break'));
    this.shows.push(new TvShows(4, 'Kimi no na wa'));
  }

  get tvShows() {
    return this.shows;
  }

  del(game: TvShows) {
    this.shows = this.shows.filter(t => t !== game);
  }
  async save(id: number, label: string) {
    try {
      if (id === null) {
        alert('Bitte geben Sie eine ID an!');
      } else {
        const data = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + label).toPromise();
        label = data['name'];
        this.shows.push(new TvShows(id, label));
      }
    } catch (e) {
      alert('Sie wollten ' + label + ' hinzufügen die es gar nicht gibt');
    }
  }

  async detailInfo(show: TvShows) {
    const data = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + show.label).toPromise();
    show.label = data['name'];
    show.img = data['image']['medium'];
    show.summary = data['summary'];
    show.genre = data['genre'];
    this.detailShow = show;
    console.table(this.detailShow);
  }
}
