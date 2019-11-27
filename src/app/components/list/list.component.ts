import { Component, OnInit } from '@angular/core';
import {TvShows} from '../../modules/TvShows';
import {TvShowsService} from '../../services/TvShows.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public service: TvShowsService) {

  }
  get shows(): Observable<TvShows[]> {
    return this.service.shows;
  }

  ngOnInit() {
  }

  del(tvShow: TvShows) {
    this.service.del(tvShow);
  }

  alert(tvShow: TvShows) {
    alert('Sie haben ' + tvShow.label + ' ausgewählt');
  }

  detailInfo(show: TvShows) {
    this.service.detailInfo(show);
  }
}
