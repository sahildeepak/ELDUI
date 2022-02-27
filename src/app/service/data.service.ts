import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoryWiseVideoEntity, ELDResponse, User, Video, VideoLikeRequest, VideoRateRequest } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _uploadUrl: string = "https://eldportalservice.azurewebsites.net/video/upload";
  private _loginUrl: string = "https://eldportalservice.azurewebsites.net/video/login";
  private _searchUrl: string = "https://eldportalservice.azurewebsites.net/search/data";
  private _rateUrl: string = "https://eldportalservice.azurewebsites.net/video/rate";
  private _likeUrl: string = "https://eldportalservice.azurewebsites.net/video/like";
  private _videoDataUrl: string = "https://eldportalservice.azurewebsites.net/video";

  user: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('user'));
  eldResponse: Subject<ELDResponse> = new Subject<ELDResponse>();

  constructor(private http: HttpClient) { }

  seteldResponse(eldResponse: ELDResponse) {
    this.eldResponse.next(eldResponse);
  }

  clearEldResponse() {
    let test! : ELDResponse;
    this.eldResponse.next(test);
  }
  getListOfVideos(formData: any): Observable<ELDResponse> {
    return this.http.post<ELDResponse>(this._searchUrl, formData);
  }

  getVideo(formData: any): Observable<Video> {
    return this.http.post<Video>(this._videoDataUrl, formData);
  }

  upload(formData: any): Observable<any> {
    return this.http.post(this._uploadUrl, formData);
  }

  login(formData: User): Observable<ELDResponse> {
    return this.http.post<ELDResponse>(this._loginUrl, formData);
  }
  saveLogin(userName: string) {
    localStorage.setItem('user', userName);
    this.user.next(userName);
  }

  getLoggedInUser() {
    const tempUser = localStorage.getItem('user');
    let user: string = '';
    if(tempUser != null) {
      user = tempUser;
    }
    return user;
  }

  removeLogin() {
    this.clearEldResponse();
    localStorage.removeItem('user');
    this.user.next('');
  }

  likeVideo(req: VideoLikeRequest) {
    return this.http.post(this._likeUrl, req);
  }

  rateVideo(req: VideoRateRequest ) {
    return this.http.post(this._rateUrl, req);
  }
}
