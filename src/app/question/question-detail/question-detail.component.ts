import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question!: Question;
  id: number;
  items: MenuItem[];
  isAdmin: boolean;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.questionService.getQuestionFromBE(this.id).subscribe((data) => {
        console.log(data);
        this.question = data;
        this.isAdmin = this.session.isAdmin();
      });
    });
    this.setItems();
  }

  setItems() {
    const roles: string[] = this.session.getUser().roles;
    roles.includes('ADMIN')
      ? (this.items = [
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
        ])
      : (this.items = [
          {
            label: 'Add answer',
            icon: 'pi pi-plus',
            command: () => {
              this.add();
            },
          },
        ]);
  }

  update() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  delete() {
    if (window.confirm('Are you sure you want to delete?')) {
      this.questionService.deleteQuestion(this.id);
      this.router.navigate(['/questions']);
    }
  }

  add() {
    this.router.navigate(['answers'], { relativeTo: this.route });
  }
}
