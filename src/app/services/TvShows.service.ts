import { Injectable } from '@angular/core';
import {TvShows} from '../modules/TvShows';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {getLocaleId} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  shows: Observable<any>;
  detailShow: TvShows;

  constructor(private httpClient: HttpClient, private af: AngularFirestore) {
    this.shows = af.collection('shows').valueChanges({idField: 'id'});
  }

  del(game: TvShows) {
    this.af.collection('shows').doc(game.id).delete();
  }
  async save(id: number, label: string): Promise<boolean> {
    try {
      if (getLocaleId(String(id)) === null) {
        alert('Bitte geben Sie eine ID an!');
      } else {
        const data: any = await this.httpClient.get('http://api.tvmaze.com/singlesearch/shows?q=' + label).toPromise();
        if (data.name && data.id) {
          this.af.collection('shows').add({
            label: data.name,
            id: data.id,
          });
          label = '';
          return true;
        }
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
