import { Component, OnInit } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';

@Component({
  selector: 'app-movie-entry-form',
  templateUrl: './movie-entry-form.component.html',
  styleUrl: './movie-entry-form.component.scss'
})
export class MovieEntryFormComponent implements OnInit {
  movie: MovieEntity = new MovieEntity();

  constructor(private statusLoggerService: StatusLoggerService){}

  ngOnInit(): void {
    this.movie.title = 'New Movie'
  }
}
