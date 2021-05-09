import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RatingComponent } from './game/rating/rating.component';
import { HistoryComponent } from './profile/history/history.component';
import { AdmintoolsComponent } from './profile/admintools/admintools.component';

@NgModule({
  declarations: [
    AppComponent,
    GamelistComponent,
    GameComponent,
    WishlistComponent,
    CartComponent,
    ProfileComponent,
    LoginComponent,
    RatingComponent,
    HistoryComponent,
    AdmintoolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
