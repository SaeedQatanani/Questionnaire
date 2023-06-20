import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../shared/question';
import { Answer } from '../shared/answer';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private baseUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl).pipe(
      map((questinos) => {
        return questinos.map((question) => ({
          ...question,
          answers: question.answers ? question.answers : [],
        }));
      })
    );
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(this.baseUrl + '/' + id);
  }

  getQuestionAnswers(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.baseUrl + '/' + id + '/answers');
  }

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.baseUrl, question);
  }

  updateQuestion(question: Question): Observable<Question> {
    console.log(question);
    return this.http.put<Question>(this.baseUrl, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
