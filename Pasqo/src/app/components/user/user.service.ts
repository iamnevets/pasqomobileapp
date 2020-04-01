import { ReturnObject } from './../../models/return-object';
import { User } from './../../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isStudent = false;

  constructor(private http: HttpClient) {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    if (currentUser.UserRole.Name === 'Student') {
      this.isStudent = true;
    }

  }

  isUserStudent() {
    return this.isStudent ? this.isStudent : false;
  }

  createOrUpdateUser(data: User) {
    if (data.Id) {
      return this.http.put<ReturnObject>('api/account/UpdateUser', data);
    }

    return this.http.post<ReturnObject>('api/account/CreateUser', data);
  }

  getUsers() {
    return this.http.get<ReturnObject>('api/account/GetUsers');
  }

  getUserDetails(id: string) {
    return this.http.get<ReturnObject>('api/account/GetUserDetails?id=' + id);
  }

  deleteUser(id: string) {
    return this.http.delete<ReturnObject>('api/account/DeleteUser?id=' + id);
  }

  getRoles() {
    return this.http.get<ReturnObject>('api/account/GetRoles');
  }

  changePassword(data: any) {
    return this.http.post<ReturnObject>('api/account/ChangePassword', data);
  }
}
