import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ELDResponse, UserProfile } from '../../../model/user';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  msg!: string;
  submitted = false;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }
  get f() {
    return this.form.controls;
  }

  login() {
    this.submitted = true;
    this.msg='';

    if (this.form.invalid) {
      return;
    }

    this.dataService.login(this.form.value).subscribe(
      eldResponse => {
        if (!eldResponse) {
          this.msg = "No User Found";
          this.dataService.removeLogin();
        } else {
          const user: UserProfile = 
          {  
            name: eldResponse.userId,
            password: eldResponse.password,
            dept: eldResponse.dept
          };

          this.dataService.saveLogin(user);
          setTimeout(()=>this.dataService.seteldResponse(eldResponse), 100);
          
        }
      }
    );
  }
  clear() {
    this.form.setErrors({});
    this.form.reset();
    this.msg='';
  }
}
