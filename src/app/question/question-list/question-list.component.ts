import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/shared/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions!: Question[];
  unsubscriber$ = new Subject();

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestionsFromBE();
    this.handleQuestionChanges();
  }

  ngOnDestroy(): void {
    this.unsubscriber$.unsubscribe();
  }

  handleQuestionChanges() {
    this.questionService.questionsChanged
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe((data) => {
        this.questions = data;
      });
  }
}
