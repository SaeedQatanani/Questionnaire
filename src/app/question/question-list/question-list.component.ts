import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions!: Question[];
  showNew = false;
  unsubscriber$ = new Subject();

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService) {}

  ngOnInit(): void {
    this.showNew = this.session.isAdmin();
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

  onNew(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
