import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { PianoService } from './core/piano.service';
import { SoundService } from './core/sound.service';
import { QuizService } from './core/quiz.service';
import { PianoNote } from './core/piano-note';
import { PianoMode } from './core/piano-mode.enum';
import { NotationComponent } from './notation/notation.component';
import { QuizStatus } from './core/quiz-status.enum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Play Piano And learn Music';
  PianoMode = PianoMode; // allows template access to PianoMode enum
  mode: PianoMode = PianoMode.Play;
  subscription: Subscription;

  quizCorrect: number = 0;
  quizIncorrect: number = 0;
  quizLength: number = 16;
  quizStatus: QuizStatus = QuizStatus.None;
  resultDescription: string = "";

  private currentTestNote: PianoNote;
  private timeoutId : any;
  private delayMs = 1000;

  modalRef: BsModalRef;
  quizLevel = ['Easy', 'Medium', 'Hard']
  choseLevel = 'Easy';
  @ViewChild(NotationComponent, {static: false}) notation: NotationComponent;

  constructor(
    private pianoService: PianoService,
    private soundService: SoundService,
    private quizService: QuizService,
    private modalService: BsModalService) {
      this.subscription = pianoService.notePlayed$.subscribe(note=>this.handleNotePlayed(note));
  }

  ngOnInit() {
    this.soundService.initialize();
  }

  handleModeSelected(selectedMode: PianoMode, template?) {
    if( this.mode == selectedMode ) return;

    // Mode has been changed
    this.mode = selectedMode;
    if(this.mode == PianoMode.Quiz) {
        this.newQuiz();
        this.choseLevel = 'Easy';
        this.modalRef = this.modalService.show(template);

        // this.handleButtonClicked({button:'start', level:'easy'})
    }
    else {
      // Clear all notes from the notation component
      this.notation.clear();
    }
  }
  onItemChange(value) {
    this.choseLevel = value;
  }

  startInModal() {
    this.modalRef.hide();
    this.handleButtonClicked({button:'start', level: this.choseLevel.toLowerCase()})
  }
  handleKeyPlayed(keyId: number) {
    if(this.mode == PianoMode.Play) {
        this.pianoService.playNoteByKeyId(keyId);
    }
    else {
      // We are in Quiz mode, so just play the note sound
      this.soundService.playNote(keyId);

      // Update the quiz in progress
      if(this.quizService.inProgress) {

        this.quizService.recordResult(keyId, this.currentTestNote);
        this.quizCorrect = this.quizService.correct;
        this.quizIncorrect = this.quizService.incorrect;

        if(this.quizService.next()) {
          this.currentTestNote= this.pianoService.getNote( this.quizService.getCurrentNoteId() );
          this.notation.addNote(this.currentTestNote);
        }
        else {
          setTimeout( () => this.finishQuiz(), this.delayMs );
        }
      }
    }
  }

  handleNotePlayed(note: PianoNote){
    this.soundService.playNote(note.keyId);
  }

  handleButtonClicked(data: any){
    if (data.button == 'start') {
      this.startQuiz(data.level);
    }
    else if(data.button = 'try-again') {
      this.newQuiz();
      this.handleButtonClicked({button:'start', level: this.choseLevel.toLowerCase()})
    }
  }

  private newQuiz() {
    this.notation.clear();
    this.quizStatus = QuizStatus.Starting;
  }

  private startQuiz(level:string) {
    let notes: string[] = [];
    if(level == 'easy') {
      notes = this.pianoService.getAllNaturalNoteIds(3,4); // middle 2 octaves only!
    }
    else if(level == 'medium') {
      notes = this.pianoService.getAllNaturalNoteIds();
    }
    else {
      // hard level
      notes = this.pianoService.getAllNoteIds();
    }

    this.quizService.startQuiz(this.quizLength, notes);
    this.quizStatus = QuizStatus.InProgress;
    this.quizCorrect = this.quizService.correct;
    this.quizIncorrect = this.quizService.incorrect;
    this.currentTestNote = this.pianoService.getNote( this.quizService.getCurrentNoteId() );
    this.notation.addNote(this.currentTestNote);
  }

  private finishQuiz() {
    // if(this.quizCorrect == this.quizLength) {
    //   this.resultDescription = "Perfect score, awesome!";
    // }
    // else if(this.quizCorrect > (this.quizLength * 0.8)) {
    //   this.resultDescription = "Great score, well done!";
    // }
    // else if(this.quizCorrect > (this.quizLength * 0.6)) {
    //   this.resultDescription = "Good score!";
    // }
    // else if(this.quizCorrect > (this.quizLength * 0.4)) {
    //   this.resultDescription = "Not bad, keep trying.";
    // }
    // else {
    //   this.resultDescription = "Looks like you need more practice.";
    // }

    this.quizStatus = QuizStatus.Finished;
  }
}
