import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpService} from "../../services/sign-up.service";
import {Router} from "@angular/router";
import {filter, switchMap } from "rxjs/operators";

const ERROR_MESSAGES: any = {
  email: () => 'invaid email',
  required: () => 'the field are required',
  minlength: (minlength: any) => `the field should be at least ${minlength.requiredLength}`,
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  isAvailable: boolean = false;

  constructor(private signUpService: SignUpService, private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

  getControlError(control: any) {
    if (control.touched) {
      return ''
    }

    for(const [key, value] of Object.entries(control.errors || {})) {
      return ERROR_MESSAGES[key](value);
    }

    return '';
  }

  signUp() {
    this.signUpService.checkUserExist(this.form.value)
      .pipe(
        filter(existingUsers => !existingUsers?.length),
        switchMap(() => this.signUpService.addNewUser(this.form.value)),
      )
      .subscribe(() => {
        this.route.navigate(['/dashboard'])
        this.form.reset();
      })
  }
}
