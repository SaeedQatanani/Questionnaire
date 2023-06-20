import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../shared/question';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questionsChanged = new Subject<Question[]>();
  questions: Question[] = [];
  status: string;
  errorMessage: string;

  constructor(private dataService: DataStorageService) {}

  getQuestionsFromBE() {
    this.dataService
      .getQuestions()
      .subscribe((data) => this.setQuestions(data));
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
    this.questionsChanged.next(this.questions.slice());
  }

  getQuestionFromBE(id: number): Observable<Question> {
    return this.dataService.getQuestion(id);
  }

  addQuestion(question: Question) {
    this.questions.push(question);
    this.questionsChanged.next(this.questions.slice());
  }

  updateQuestion(index: number, newQuestion: Question) {
    this.questions[index] = newQuestion;
    this.questionsChanged.next(this.questions.slice());
  }

  deleteQuestion(index: number) {
    this.dataService.deleteQuestion(index).subscribe({
      next: (data) => {
        // console.log(data);
        this.status = 'Delete successful';
        this.getQuestionsFromBE();
        this.questionsChanged.next(this.questions.slice());
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.log(this.errorMessage);
        console.error('There was an error!', error);
      },
    });
  }
}
