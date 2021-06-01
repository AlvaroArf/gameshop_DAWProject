import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamelistComponent} from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';
import { SignupComponent} from './signup/signup.component';
import { SigninComponent} from './signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  
  { 
    path: '', 
    component: GamelistComponent
  },
  {
    path: 'category/:id_categoria',
    component:CategoryComponent
  },
  { 
    path: 'game/:id_producto', 
    component: GameComponent
  },
  { 
    path: 'signup', 
    component: SignupComponent
  },
  { 
    path: 'signin', 
    component: SigninComponent 
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
