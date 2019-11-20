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
    this.shows.push(new TvShows(4, 'Your Name'));
    this.shows.push(new TvShows(5, 'Das Serien'));
  }

  get tvShows() {
    return this.shows;
  }

  del(game: TvShows) {
    this.shows = this.shows.filter(t => t !== game);
  }
  save(id: number, label: string) {
    this.shows.push(new TvShows(id, label));
  }

  async detailInfo(show: TvShows) {
    const data = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + show.label).toPromise();
    show.label = data['name'];
    show.img = data['image']['medium'];
    this.detailShow = show;
    console.table(this.detailShow);
  }
}
