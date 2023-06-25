import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { QuestionStartComponent } from './question-start/question-start.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AuthGuard } from '../services/auth.guard';
import { AdminGuard } from '../services/admin.guard';
import { AnswerEditComponent } from './question-detail/answer-edit/answer-edit.component';
import { UserGuard } from '../services/user.guard';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: QuestionStartComponent },
      {
        path: 'new',
        component: QuestionEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: ':id',
        component: QuestionDetailComponent,
        children: [
          {
            path: 'answers',
            component: AnswerEditComponent,
            canActivate: [UserGuard],
          },
        ],
      },
      {
        path: ':id/edit',
        component: QuestionEditComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
