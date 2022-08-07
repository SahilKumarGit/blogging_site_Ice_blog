import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatRippleModule } from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './components/public/public.component';
import { NavBarComponent } from './sub-components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { EachListCardComponent } from './sub-components/each-list-card/each-list-card.component';
import { SearchComponent } from './components/search/search.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { StoriesComponent } from './components/stories/stories.component';
import { OtherDataComponent } from './components/other-data/other-data.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditorComponent } from './components/editor/editor.component';

import { QuillModule } from 'ngx-quill';
import { PublishingPupopComponent } from './sub-components/publishing-pupop/publishing-pupop.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ImgResizerComponent } from './sub-components/img-resizer/img-resizer.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoadingComponent } from './sub-components/loading/loading.component';
import { DateTimePipe } from './pipes/dateTime/date-time.pipe';
import { BlogsRelatedTopicsComponent } from './components/blogs-related-topics/blogs-related-topics.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { NavOptionsComponent } from './sub-components/nav-bar/nav-options/nav-options.component';
import { EachOptionComponent } from './sub-components/nav-bar/nav-options/each-option/each-option.component';
import { EachListCart2Component } from './sub-components/each-list-cart2/each-list-cart2.component';
import { ActionDialogComponent } from './sub-components/action-dialog/action-dialog.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    NavBarComponent,
    HomeComponent,
    EachListCardComponent,
    SearchComponent,
    BookmarkComponent,
    StoriesComponent,
    OtherDataComponent,
    LoginComponent,
    RegisterComponent,
    EditorComponent,
    PublishingPupopComponent,
    ViewBlogComponent,
    ImgResizerComponent,
    LoadingComponent,
    DateTimePipe,
    BlogsRelatedTopicsComponent,
    ProfileViewComponent,
    NavOptionsComponent,
    EachOptionComponent,
    EachListCart2Component,
    ActionDialogComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatTooltipModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule.forRoot(),
    MatSnackBarModule,
    ImageCropperModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
