import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InstaPostComponent } from './insta-post/insta-post.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { NgToastModule } from 'ng-angular-popup';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ContentComponent,
    InstaPostComponent,
    AddMenuComponent
  ],
  imports: [BrowserModule, FontAwesomeModule, FormsModule, NgToastModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
