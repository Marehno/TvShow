import { Component, OnInit } from '@angular/core';
import {TvShows} from '../../modules/TvShows';
import {TvShowsService} from '../../services/TvShows.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public id: number;
  public label: string;

  constructor(public service: TvShowsService) {

  }

  ngOnInit() {
  }

  save() {
    this.service.save(this.id, this.label);
  }
}
