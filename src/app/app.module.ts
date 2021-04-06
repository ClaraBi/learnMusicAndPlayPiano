import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PianoKeyboardComponent } from './piano-keyboard/piano-keyboard.component';
import { NotationComponent } from './notation/notation.component';
import { PlayControlComponent } from './play-control/play-control.component';
import { SafePipe } from './shared/safe.pipe';
import { NoteInfoComponent } from './note-info/note-info.component';
import { QuizRecordComponent } from './quiz-record/quiz-record.component';

@NgModule({
  declarations: [
    AppComponent,
    PianoKeyboardComponent,
    NotationComponent,
    PlayControlComponent,
    SafePipe,
    NoteInfoComponent,
    QuizRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
