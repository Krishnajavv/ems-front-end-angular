import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'users',canActivate:[authGuardGuard], loadChildren: () => import('./Modules/users/users.module').then(m => m.UsersModule) },
  {path:"" , component:LoginComponent},
  {path:"dashboard",canActivate:[authGuardGuard], component:HomeComponent},

  {path:"**",redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
