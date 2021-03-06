import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ELDResponse, Video } from '../../../model/user';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  public eldResponse! : ELDResponse;
  public msg!: string;
  public selectedVideo!: Video;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    size: 'xl'

};
  subscription!: Subscription;

  constructor(private dataService: DataService, private modalService: NgbModal) {
    this.subscription = this.dataService.eldResponse.subscribe(res =>{
      this.eldResponse = res;
     });
   }

  ngOnInit(): void {

  }

  onSelect(video: Video,tets: any){
    this.selectedVideo = video;

    let postReq = {
      videoId: this.selectedVideo.id,
      userId: this.dataService.getLoggedInUser()
    };

    console.log("onSelect() Request: "+JSON.stringify(postReq))

    this.dataService.getVideo(postReq).subscribe( respVideo => {
      console.log("onSelect() respVideo: "+JSON.stringify(respVideo))
      if(respVideo) {
        this.selectedVideo = respVideo;
        this.modalService.open(tets,this.ngbModalOptions).result.then((result) => {
          console.log(result);
        }, (reason) => {
          console.log(reason);
        });
      }
    });


  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
