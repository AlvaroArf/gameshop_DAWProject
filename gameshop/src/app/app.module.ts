import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from "./auth.guard";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { GameComponent } from './game/game.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { RatingComponent } from './game/rating/rating.component';
import { HistoryComponent } from './profile/history/history.component';
import { AdmintoolsComponent } from './profile/admintools/admintools.component';
import { SearchComponent } from './search/search.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { SuccessComponent } from './email-confirmation/success/success.component';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [
    AppComponent,
    GamelistComponent,
    GameComponent,
    WishlistComponent,
    CartComponent,
    ProfileComponent,
    RatingComponent,
    HistoryComponent,
    AdmintoolsComponent,
    CategoryComponent,
    SearchComponent,
    EmailConfirmationComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    NgbModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
