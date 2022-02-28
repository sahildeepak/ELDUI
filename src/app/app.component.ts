import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User, UserProfile } from 'src/model/user';
import { SearchComponent } from './component/search/search.component';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eld-portal-ui';
  user!: string | null;
  subscription!: Subscription;
  public uploadForm: boolean = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  constructor(private router: Router, private modalService: NgbModal,private dataService: DataService) {
    this.user = this.dataService.getLoggedInUser();
    this.subscription = this.dataService.user.subscribe((userName) => {
      this.user = userName;
    });
  }

  ngOnInit(): void {
    this.subscription = this.dataService.user.subscribe((userName) => {
      this.user = userName;
    });
    const tempUser = this.dataService.getLoggedInUserProfile();
    
    const tempUser2 = 
    {  
      username: tempUser.name,
      name: tempUser.name,
      password: tempUser.password
    };
    
    if(tempUser2.username != '') {
      this.dataService.login(tempUser2).subscribe(
        eldResponse => {
          
          if (!eldResponse) {
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
    
  }

  click() {
    this.uploadForm = false;
  }
  open(content: any) {
    this.modalService.open(content, this.ngbModalOptions).result.then((result) => {
    }, (reason) => {
    });
  }
  logout() {
    this.dataService.removeLogin();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
