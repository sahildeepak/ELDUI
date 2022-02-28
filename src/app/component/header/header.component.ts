import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any;
  subscription!: Subscription;
  _localStorage: Storage;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.user.subscribe(res =>{
      this.user = res;
     });
     this._localStorage = this.dataService.localStorage;
   }

  ngOnInit(): void {
  }
  logout() {
    this.dataService.removeLogin();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
