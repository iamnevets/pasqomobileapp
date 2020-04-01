import { ReturnObject } from 'src/app/models/return-object';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from 'src/app/models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(data: Exam) {
    if (data.Id) {
      return this.httpClient.put<ReturnObject>('api/exams/update', data);
    }

    return this.httpClient.post<ReturnObject>('api/exams/create', data);
  }

  getOneExam(id: number) {
    return this.httpClient.get<ReturnObject>('api/exams/getone?id=' + id);
  }

  getAllExams() {
    return this.httpClient.get<ReturnObject>('api/exams/getall');
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/exams/delete?id=' + id);
  }
}
