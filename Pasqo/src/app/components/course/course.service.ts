import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(data: Course) {
    if (data.Id) {
      return this.httpClient.put<ReturnObject>('api/courses/update', data);
    }
    return this.httpClient.post<ReturnObject>('api/courses/create', data);
  }

  getOneCourse(id: number) {
    return this.httpClient.get<ReturnObject>('api/courses/getone?id=' + id);
  }

  getAllCourses() {
    return this.httpClient.get<ReturnObject>('api/courses/getall');
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/courses/delete?id=' + id);
  }
}
