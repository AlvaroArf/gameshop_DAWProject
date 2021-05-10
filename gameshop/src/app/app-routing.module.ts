import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamelistComponent} from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  { path: 'gamelist', component: GamelistComponent },
  { path: 'game/:id_producto', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
