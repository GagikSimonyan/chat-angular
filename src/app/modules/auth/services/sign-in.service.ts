import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) { }

  signInUser(user: User): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/users?email=${user.email}`)
  }
}
