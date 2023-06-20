import { NgModule } from "@angular/core";
import { QuestionComponent } from "./question.component";
import { QuestionListComponent } from "./question-list/question-list.component";
import { QuestionDetailComponent } from "./question-detail/question-detail.component";
import { QuestionStartComponent } from "./question-start/question-start.component";
import { QuestionEditComponent } from "./question-edit/question-edit.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionsRoutingModule } from "./questions-routing.module";
import { SharedModule } from "../shared/shared.module";
import { QuestionItemComponent } from './question-list/question-item/question-item.component';

@NgModule({
    declarations: [
        QuestionComponent,
        QuestionListComponent,
        QuestionDetailComponent,
        QuestionStartComponent,
        QuestionEditComponent,
        QuestionItemComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        QuestionsRoutingModule,
        SharedModule
    ]
})
export class QuestionsModule {

}