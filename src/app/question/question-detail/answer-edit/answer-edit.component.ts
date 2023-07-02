import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css'],
})
export class AnswerEditComponent implements OnInit {
  id: number;
  editMode = false;
  answerForm: FormGroup;
  answerText = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe((params: any) => {
        this.id = +params['id'];
        this.initForm();
      });
  }

  initForm() {
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answerText, Validators.required),
    });
  }

  onSubmit() {
    this.questionService.addAnswer(this.id, this.answerForm.value, this.session.getUser());
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
