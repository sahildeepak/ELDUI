import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbAlert, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Alert, ELDResponse, Video } from 'src/model/user';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-create-learning-path',
  templateUrl: './create-learning-path.component.html',
  styleUrls: ['./create-learning-path.component.css']
})
export class CreateLearningPathComponent implements OnInit {

  public createLearningPathForm: FormGroup;
  public existingVideoNames: string[] = [];
  public eldResponse!: ELDResponse;
  public items: string[] = [];
  public saved: boolean = false;
  public alert!: Alert;

  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    size: 'lg'
  };

  constructor(private modalService: NgbModal, private dataService: DataService) {
    this.createLearningPathForm = new FormGroup({
      programName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      department: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', []),
      file: new FormControl('', []),
      selectedVideoName: new FormControl('', [])
    });

    this.resetAlert();

    const postReq = { category: "All", searchValue: null, userId: '' };
    postReq['userId'] = this.dataService.getLoggedInUser();

    console.log('Create Learning Path Search Content::' + JSON.stringify(postReq));
    this.dataService.getListOfVideos(postReq).subscribe(
      resp => {
        if (!resp || !resp.categoryWiseVideo) {
          console.log("No content found");
        } else {
          this.eldResponse = resp;
          for (let c of this.eldResponse.categoryWiseVideo)
            if (c.videoList)
              for (let video of c.videoList) {
                this.existingVideoNames.push(video.name);
              }
        }
      }
    );

  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, this.ngbModalOptions).result.then((result) => {
    }, (reason) => {
    });
  }

  get f() {
    return this.createLearningPathForm.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createLearningPathForm.patchValue({
        fileSource: file
      });
    }
  }

  search: OperatorFunction<string, string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.existingVideoNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  addNewContent() {
    if (this.createLearningPathForm.get('file')?.value) {
      this.items.push(this.createLearningPathForm.get('file')?.value);
      this.createLearningPathForm.get('file')?.reset();
    } else {
      this.createLearningPathForm.get('file')?.setErrors({ required: true });
    }
  }

  addSearchedContent() {
    if (this.createLearningPathForm.get('selectedVideoName')?.value) {
      this.items.push(this.createLearningPathForm.get('selectedVideoName')?.value);
      this.createLearningPathForm.get('selectedVideoName')?.reset();
    } else {
      this.createLearningPathForm.get('selectedVideoName')?.setErrors({ required: true });
    }

  }

  removeItem(index: number) {
    this.items = [...this.items.splice(index, 1)];
  }

  saveContent() {
    this.resetAlert();
    this.saved = true;
    console.log('')
    if (this.items.length <= 0 || this.createLearningPathForm.pristine) {
      this.alert = {
        type: 'danger',
        message: 'Please add some content to Learning Path!'
      };
    } else if (this.createLearningPathForm.get('programName')?.errors ||
      this.createLearningPathForm.get('department')?.errors) {
      this.alert = {
        type: 'danger',
        message: 'Please check errors!'
      };
    } else {
      this.alert = {
        type: 'success',
        message: 'Learning Path saved!'
      };
    }


  }

  closeAlert() {
    this.resetAlert();
  }

  clearContent() {
    this.saved = false;
    this.items = [];
    this.resetAlert();
    this.createLearningPathForm.reset();
  }

  resetAlert() {
    this.alert = {
      type: '',
      message: ''
    };
  }


}
