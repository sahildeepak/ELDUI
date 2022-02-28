import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoryWiseVideoEntity, ELDResponse, User, UserProfile, Video, VideoLikeRequest, VideoRateRequest } from '../../model/user';

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
  saveLogin(user: UserProfile) {
    localStorage.setItem('user', user.name);
    localStorage.setItem('password', user.password);
    localStorage.setItem('dept', user.dept);
    this.user.next(user.name);
  }

  getLoggedInUser() {
    const tempUser = localStorage.getItem('user');
    let user: string = '';
    if(tempUser != null) {
      user = tempUser;
    }
    return user;
  }

  getLoggedInUserProfile(): UserProfile {
    const tempUser = localStorage.getItem('user');
    const tempPwd = localStorage.getItem('password');
    const tempDept = localStorage.getItem('dept');

    let user: UserProfile = {  
      name: '',
      password: '',
      dept: ''
    };

    if(tempUser && tempPwd && tempDept) {
      user = 
      {  
        name: tempUser,
        password: tempPwd,
        dept: tempDept
      };
      
    }
    return user;
  }

  removeLogin() {
    this.clearEldResponse();
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('dept');
    this.user.next('');
  }

  likeVideo(req: VideoLikeRequest) {
    return this.http.post(this._likeUrl, req);
  }

  rateVideo(req: VideoRateRequest ) {
    return this.http.post(this._rateUrl, req);
  }


  get localStorage(): Storage {
    return localStorage;
  }
}
