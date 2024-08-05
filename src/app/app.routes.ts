import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactsListComponent } from './contact-list/contact-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AuthGuard } from './auth.guard'; // Importez la garde de route
import { TrashComponent } from './trash/trash.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contact-list',
    component: ContactsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-contact',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-contact/:id',
    component: ContactFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add-contact', component: ContactFormComponent, canActivate: [AuthGuard] },

  { path: 'trash', component: TrashComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
