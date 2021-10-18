import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../models/user.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class SignUpService {

  constructor(private http: HttpClient) { }

  addNewUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users`, newUser);
  }

  checkUserExist(user: User): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users?email=${user.email}`)
  }
}
