import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoKeyboardComponent } from './piano-keyboard/piano-keyboard.component';
import { NotationComponent } from './notation/notation.component';
import { PlayControlComponent } from './play-control/play-control.component';
import { SafePipe } from './shared/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PianoKeyboardComponent,
    NotationComponent,
    PlayControlComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
