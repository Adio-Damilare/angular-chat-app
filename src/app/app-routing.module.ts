import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApicallComponent } from "./apicall/apicall.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { SinglechatComponent } from "./dashboard/singlechat/singlechat.component";
import { StatusComponent } from "./dashboard/status/status.component";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";
import { LoginComponent } from "./Registrationsection/login/login.component";
import { RegisterComponent } from "./Registrationsection/register/register.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";

const routes: Routes = [
    { path: "Register", component: RegisterComponent, title: "Register" },
    { path: "Login", component: LoginComponent, title: "Login" },
    {
        path: "status", component: StatusComponent, title: "status"
    },
    {
     path: "", children: [
            { path: "", component: ReactiveFormComponent, pathMatch: "full" },
            {
                path: "dashboard", component: DashboardComponent, title: 'Chats'
            },
           {
                path:"user/:id",component:SinglechatComponent,
            }
        ], canActivate: [AuthGuard]
    },
    {
        path: "api-user", children:[ 
            {path:"",component: ApicallComponent, title: "Api call"},
            {path:":user",component:UserprofileComponent,title:"profile"}
        ]
    },

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }