import { Component, Input } from '@angular/core';
import { Question } from 'src/app/shared/question';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.css']
})
export class QuestionItemComponent {
  @Input() question!: Question;
  @Input() index: number;

}
