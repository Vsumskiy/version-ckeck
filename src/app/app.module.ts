import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VersionNotificationCardComponent } from '@app/components/version-notification-card/version-notification-card.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    VersionNotificationCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
