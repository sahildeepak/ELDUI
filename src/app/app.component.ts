import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
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
