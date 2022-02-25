import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });


  constructor(private dataService: DataService, private router: Router) { }

  public url!: any;
  public format!: any;
  public uploaded: string = '';

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  ngOnInit(): void {
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  upload() {
    if (!this.myForm.valid)
      return;

    const formData = this.myForm.value;
    this.dataService.upload(formData).subscribe(res => {
      this.uploaded = 'success';
    }, error => {
      this.uploaded = 'error';
    });

  }
  clear() {
    this.myForm.reset();
    this.uploaded = '';
  }

}
