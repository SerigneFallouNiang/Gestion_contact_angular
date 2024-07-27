import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'contact-list',
        component: ContactListComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }