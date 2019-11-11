import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamePageComponent } from './game-page/game-page.component';
import { TestRenderComponent } from './test-render/test-render.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "game", component: GamePageComponent },
  { path: "test", component: TestRenderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
