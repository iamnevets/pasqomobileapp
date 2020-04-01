import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUs } from 'src/app/models/contact-us';
import { ReturnObject } from 'src/app/models/return-object';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient: HttpClient) { }

  create(data: ContactUs) {
    return this.httpClient.post<ReturnObject>('api/contactus/create', data);
  }

  getOne(id: number) {
    return this.httpClient.get<ReturnObject>('api/contactus/getone?id=' + id);
  }

  getAll() {
    return this.httpClient.get<ReturnObject>('api/contactus/getall');
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/contactus/delete?id=' + id);
  }

}
