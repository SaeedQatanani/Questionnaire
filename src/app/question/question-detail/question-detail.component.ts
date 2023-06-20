import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/shared/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question!: Question;
  id: number;
  items: MenuItem[];

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.questionService
        .getQuestionFromBE(this.id)
        .subscribe((data) => (this.question = data));
    });
    this.setItems();
  }
  
  setItems() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.update();
        },
      },
      { separator: true },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        },
      },
    ];
  }

  update() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  
  delete() {
    this.questionService.deleteQuestion(this.id);
    this.router.navigate(['/questions']);
  }
}
