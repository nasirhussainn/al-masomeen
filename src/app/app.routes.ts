import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'courses', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
