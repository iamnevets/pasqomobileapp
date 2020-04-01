import { School } from './../../models/school';
import { ReturnObject } from './../../models/return-object';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(data: School) {
    if (data.Id) {
      return this.httpClient.put<ReturnObject>('api/schools/update', data);
    }
    return this.httpClient.post<ReturnObject>('api/schools/create', data);
  }

  getSchoolDetails(id: number) {
    return this.httpClient.get<ReturnObject>('api/schools/getschooldetails?id=' + id);
  }

  getSchools() {
    return this.httpClient.get<ReturnObject>('api/schools/getschools');
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/schools/delete?id=' + id);
  }
}
