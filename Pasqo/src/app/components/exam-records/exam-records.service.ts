import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExamRecord } from 'src/app/models/exam-record';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class ExamRecordsService {

  constructor(private httpClient: HttpClient) { }

  createExamRecord(data: ExamRecord) {
    return this.httpClient.post<ReturnObject>('api/examrecords/create', data);
  }

  getOneExamRecord(id: number) {
    return this.httpClient.get<ReturnObject>('api/examrecords/getone?id=' + id);
  }

  getAllExamRecords(userId: string) {
    return this.httpClient.get<ReturnObject>('api/examrecords/getall?userId=' + userId);
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/examrecords/delete?id=' + id);
  }

}
