import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common'

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard', component:  DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent },
  {path: 'heroes', component: HeroesComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRountingModule { }
