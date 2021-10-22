import {Injectable, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new BehaviorSubject<any>(null)

  checkForAuthUser(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser$.next(JSON.parse(currentUser))
      return true;
    } else {
      this.currentUser$.next(null)
      return false;
    }
  }
}
