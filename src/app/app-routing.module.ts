import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedGuard } from './guard/authenticated.guard';
import { UnauthenticatedGuard } from './guard/unauthenticated.guard';

import { HomePageComponent } from './page/home-page/home-page.component';
import { SigninPageComponent } from './page/signin-page/signin-page.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [UnauthenticatedGuard],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
