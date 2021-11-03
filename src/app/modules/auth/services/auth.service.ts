import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

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
    }

    this.currentUser$.next(null)
    return false;
  }
}
