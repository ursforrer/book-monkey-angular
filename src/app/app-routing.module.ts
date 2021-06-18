import { NgModule } from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

// Add routes to the different components here
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [CanNavigateToAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
