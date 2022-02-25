import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CategoryWiseVideoEntity, ELDResponse, User, VideoLikeRequest, VideoRateRequest } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _uploadUrl: string = "http://localhost:8080/video/upload";
  private _loginAndSearchUrl: string = "http://localhost:8080/video/login";
  private _searchUrl: string = "http://localhost:8080/video/category";
  private _rateUrl: string = "http://localhost:8080/video/rate";
  private _likeUrl: string = "http://localhost:8080/video/like";
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
    return this.http.post<ELDResponse>(this._searchUrl,formData);
  }

  upload(formData: any): Observable<any> {
    return this.http.post(this._uploadUrl, formData);
  }

  login(formData: User): Observable<ELDResponse> {
    return this.http.post<ELDResponse>(this._loginAndSearchUrl, formData);
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
