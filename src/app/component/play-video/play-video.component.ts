import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Video, VideoLikeRequest, VideoRateRequest } from '../../../model/user';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.css']
})
export class PlayVideoComponent implements OnInit {

  @Input("selectedVideo") selectedVideo!: Video;

  currentRate = new FormControl(null, Validators.required);
  currentLike!: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.currentRate.setValue(this.selectedVideo.rating);
    this.currentLike = this.selectedVideo.like;
  }

  onRatingClick() {
    console.log("onRatingChange() start");
    console.log("currentRate: "+this.currentRate);
    let postReq: VideoRateRequest = {
      videoId: this.selectedVideo.id,
      userId: this.dataService.getLoggedInUser(),
      rating: this.currentRate.value
    };
    console.log("Request: "+JSON.stringify(postReq))

    this.dataService.rateVideo(postReq).subscribe(resp => {
      console.log(resp);
    });
    console.log("onRatingChange() end");
  }

  onLikeClick() {
    console.log("onLikeChange() start");

    this.currentLike = !this.currentLike;

    let postReq: VideoLikeRequest = {
      videoId: this.selectedVideo.id,
      userId: this.dataService.getLoggedInUser(),
      like: this.currentLike
    };

    console.log("Request: "+JSON.stringify(postReq));

    this.dataService.likeVideo(postReq).subscribe(resp => {
      console.log(resp);
      if(this.currentLike){
        this.selectedVideo.totalNoOfLikes=this.selectedVideo.totalNoOfLikes+1;
      }else{
        this.selectedVideo.totalNoOfLikes=this.selectedVideo.totalNoOfLikes-1;
      }
    });

    

    console.log("onLikeChange() end");
  }

}
