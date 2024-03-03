import { Component, OnInit } from '@angular/core';
import { MovieEntity } from '../../models/movie-entity';
import { StatusLoggerService } from '../../../../shared/services/status-logger.service';

@Component({
  selector: 'app-movie-entry-form',
  templateUrl: './movie-entry-form.component.html',
  styleUrl: './movie-entry-form.component.scss'
})
export class MovieEntryFormComponent implements OnInit {
  date: Date[] | undefined;
  dummyError: Error = new Error();

  constructor(private statusLoggerService: StatusLoggerService){}

  ngOnInit(): void {
    this.statusLoggerService.logErrorToConsole('Something broke', this.dummyError, 'oof ouch owie', this.date);
    this.statusLoggerService.logMessageToConsole('Something didnt break', 'poggers', this.date);
  }
}
