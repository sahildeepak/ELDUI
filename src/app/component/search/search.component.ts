import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public msg!: string;
  public mySearchForm = new FormGroup({
    category: new FormControl('all', []),
    searchText: new FormControl(null, [])
  });
  constructor(private dataService: DataService) {
   }

  ngOnInit(): void {
  }

  onEnter(event: any) {
    if (!this.mySearchForm.valid)
      return;

    const formData = this.mySearchForm.value;
    formData['userId'] = this.dataService.getLoggedInUser();

    console.log('mySearchForm::'+ JSON.stringify(formData));
    this.dataService.getListOfVideos(formData).subscribe(
      eldResponse => {
        if (!eldResponse || !eldResponse.categoryWiseVideo)
          this.msg = "No Result Found";
        else{
          this.dataService.seteldResponse(eldResponse);
        }
      }
    );
  }

}
