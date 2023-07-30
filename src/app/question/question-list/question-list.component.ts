import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';
import { SessionService } from 'src/app/services/session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  questions!: Question[];
  showNew = false;
  unsubscriber$ = new Subject();
  visible: boolean = false;
  questionForm: FormGroup;
  questionAnswers: Answer[] = [];
  questionText = '';

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.showNew = this.session.isAdmin();
    this.questionService.getQuestionsFromBE();
    this.handleQuestionChanges();
    this.initForm();
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

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  showDialog() {
    this.visible = true;
  }

  initForm() {
    this.questionForm = new FormGroup({
      question: new FormControl(this.questionText, Validators.required),
    });
  }

  onSubmit() {
    const questionTemp = {
      ...this.questionForm.value,
      answers: this.questionAnswers,
    };
    this.questionService.addQuestion(questionTemp);
    this.onCancel();
  }

  onCancel() {
    this.questionText = '';
    this.questionAnswers = [];
    this.initForm();
    this.visible = false;
  }
}
