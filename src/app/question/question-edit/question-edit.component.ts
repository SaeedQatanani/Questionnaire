import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Answer } from 'src/app/models/answer.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css'],
})
export class QuestionEditComponent implements OnInit {
  id: number;
  editMode = false;
  questionForm: FormGroup;
  questionAnswers: Answer[] = [];
  questionText = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.questionService.getQuestionFromBE(this.id).subscribe((data) => {
          this.questionText = data.question;
          this.questionAnswers = data.answers;
          console.log(this.questionText + "1111");
          console.log(this.questionAnswers);
          this.initForm();
        });
      }
      this.initForm();
    });
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
    this.editMode
      ? this.questionService.updateQuestion(this.id, questionTemp)
      : this.questionService.addQuestion(questionTemp);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
