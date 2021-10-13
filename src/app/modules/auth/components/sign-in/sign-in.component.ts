import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.cdRef.detectChanges()  
    });

    this.formGroup = new FormGroup({
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

  submit() {
    console.log(this.formGroup.value);
  }
}
