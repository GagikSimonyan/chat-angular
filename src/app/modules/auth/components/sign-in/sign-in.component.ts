import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignInService} from "../../services/sign-in.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private signInService: SignInService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.cdRef.detectChanges()
    });

    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  signIn() {
    this.signInService.signInUser(this.form.value)
      .subscribe(users => {
        if (this.checkUserPassword(users)){
          this.authService.currentUser$.next(users[0]);
          localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUser$.getValue()));
          this.router.navigate(['/dashboard']);
        }
    })
  }

  checkUserPassword(users: any): boolean {
    for (const user of users) {
      if (user.password === this.form.controls.password.value){
        // this.errorMessage = ''
        return true;
      }
    }
    return false;
  }
}

