import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/user.model";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) { }

  signInUser(user: User): Observable<any> {
    return this.http.get(`${environment.baseUrl}/users?email=${user.email}`)
  }
}
