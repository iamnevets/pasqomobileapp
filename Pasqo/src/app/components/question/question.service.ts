import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(data: Question) {
    if (data.Id) {
      return this.httpClient.put<ReturnObject>('api/questions/update', data);
    }
    return this.httpClient.post<ReturnObject>('api/questions/create', data);
  }

  getOneQuestion(id: number) {
    return this.httpClient.get<ReturnObject>('api/questions/getone?id=' + id);
  }

  getAllQuestions(id: number) {
    return this.httpClient.get<ReturnObject>('api/questions/getall?id=' + id);
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/questions/delete?id=' + id);
  }

}
