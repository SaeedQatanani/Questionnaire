import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question.component';
import { QuestionStartComponent } from './question-start/question-start.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
    children: [
      { path: '', component: QuestionStartComponent },
      { path: 'new', component: QuestionEditComponent },
      { path: ':id', component: QuestionDetailComponent },
      { path: ':id/edit', component: QuestionEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
