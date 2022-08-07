import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './components/public/public.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { StoriesComponent } from './components/stories/stories.component';
import { EditorComponent } from './components/editor/editor.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { IfLoginGuard } from 'src/guard/if-login.guard';
import { IfLogoutGuard } from 'src/guard/if-logout.guard';
import { BlogsRelatedTopicsComponent } from './components/blogs-related-topics/blogs-related-topics.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: "", component: PublicComponent, children: [
      { path: "", component: HomeComponent },
      { path: "search", component: SearchComponent },
      { path: "bookmark", component: BookmarkComponent, canActivate: [IfLoginGuard] },
      { path: "stories", component: StoriesComponent, canActivate: [IfLoginGuard] },
      { path: "view/:id", component: ViewBlogComponent },
      { path: "topic/:topic", component: BlogsRelatedTopicsComponent },
      { path: "profile/update", component: EditProfileComponent, canActivate: [IfLoginGuard] },
      { path: "profile/:id", component: ProfileViewComponent },

    ]
  },
  { path: "login", component: LoginComponent, canActivate: [IfLogoutGuard] },
  { path: "register", component: RegisterComponent, canActivate: [IfLogoutGuard] },
  { path: "editor", component: EditorComponent, canActivate: [IfLoginGuard] },
  { path: "editor/:bid", component: EditorComponent, canActivate: [IfLoginGuard] },
  { path: "**", redirectTo: "" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
