import { ReturnObject } from './../../models/return-object';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Programme } from 'src/app/models/Programme';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  constructor(private httpClient: HttpClient) { }

  createOrUpdate(data: Programme) {
    if (data.Id) {
      return this.httpClient.put<ReturnObject>('api/programmes/update', data);
    }
    return this.httpClient.post<ReturnObject>('api/programmes/create', data);
  }

  getOneProgramme(id: number) {
    return this.httpClient.get<ReturnObject>('api/programmes/getone?id=' + id);
  }

  getAllProgrammes() {
    return this.httpClient.get<ReturnObject>('api/programmes/getall');
  }

  delete(id: number) {
    return this.httpClient.delete<ReturnObject>('api/programmes/delete?id=' + id);
  }
}
