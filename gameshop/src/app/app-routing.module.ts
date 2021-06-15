import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamelistComponent} from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';
import { SignupComponent} from './signup/signup.component';
import { SigninComponent} from './signin/signin.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchComponent } from './search/search.component'

import { AuthGuard } from "./auth.guard";
import { ProfileComponent } from './profile/profile.component';

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
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id_usuario',
    component: ProfileComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
