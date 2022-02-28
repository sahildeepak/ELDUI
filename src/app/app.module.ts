import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { UserComponent } from './component/user/user.component';
import { SearchComponent } from './component/search/search.component';
import { UploadComponent } from './component/upload/upload.component';
import { VideosComponent } from './component/videos/videos.component';
import { PlayVideoComponent } from './component/play-video/play-video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './component/login/login.component';
import { CreateLearningPathComponent } from './create-learning-path/create-learning-path.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    SearchComponent,
    UploadComponent,
    VideosComponent,
    PlayVideoComponent,
    LoginComponent,
    CreateLearningPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
