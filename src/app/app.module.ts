import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Registrationsection/register/register.component';
import { LoginComponent } from './Registrationsection/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DialogOverviewExampleDialog, StatusComponent } from './dashboard/status/status.component';
import { UserService } from './Registrationsection/service/user.service';
import { SingleuserComponent } from './dashboard/singleuser/singleuser.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { EmailDirective } from './Registrationsection/email.directive';
import { ApicallComponent } from './apicall/apicall.component';
import {HttpClientModule} from "@angular/common/http";
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SearchPipe } from './dashboard/search.pipe';
import { SinglechatComponent } from './dashboard/singlechat/singlechat.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './module/material/material.module';
import { MaterialComponent } from './module/material/material.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SingleuserComponent,
    ReactiveFormComponent,
    EmailDirective,
    ApicallComponent,
    UserprofileComponent,
    SearchPipe,
    SinglechatComponent,
    StatusComponent,
    MaterialComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
  InfiniteScrollModule,
  NgxSpinnerModule,
  MaterialModule,
  BrowserAnimationsModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
