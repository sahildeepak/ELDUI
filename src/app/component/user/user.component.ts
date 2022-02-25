import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.dataService.removeLogin();
  }

}
