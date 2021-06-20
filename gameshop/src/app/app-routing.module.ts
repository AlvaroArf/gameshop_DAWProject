import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamelistComponent} from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SearchComponent } from './search/search.component'
import { VerifyComponent } from './verify/verify.component';
import { ConfirmComponent } from './verify/confirm/confirm.component';

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
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'verify/:id',
    component: ConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
