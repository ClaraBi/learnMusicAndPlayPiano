import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';

import { PianoNote } from '../core/piano-note';
import { QuizService } from '../core/quiz.service';
import { QuizStatus } from '../core/quiz-status.enum';


@Component({
  selector: 'app-quiz-record',
  templateUrl: './quiz-record.component.html',
  styleUrls: ['./quiz-record.component.scss']
})
export class QuizRecordComponent implements OnInit {
  QuizStatus = QuizStatus; // allows template access to QuizStatus enum
  @Input() correct: number;
  @Input() incorrect: number;
  @Input() total: number;
  @Input() status: QuizStatus;
  @Input() description: string;
  @Output() buttonClicked = new EventEmitter();
  subscription: Subscription;
  message: string;
  constructor(private quizService: QuizService) {
    this.subscription = quizService.quizResult$.subscribe(
      result => {
        if(result.selectedKeyId == result.actualNote.keyId){
          this.message = "\u2714 Correct, well done!";
        }
        else {
          this.message = "\u2718 Incorrect";
        }
    });
   }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  // handleStartBtnClick(value: string) {
  //    this.buttonClicked.emit( {button:'start', level:value} );
  // }

  handleTryAgainBtnClick() {
     this.buttonClicked.emit( {button:'try-again'} );
     this.message = "";
  }
}
