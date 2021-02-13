/* tslint:disable:no-unused-variable */

import { componentFactoryName } from '@angular/compiler';
import { TestBed, async, inject } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { PianoNote } from './piano-note';

describe('PianoQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizService]
    });
  });

  it('should ...', inject([QuizService], (service: QuizService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should assign correct value when startQuiz called', inject([QuizService], (service: QuizService) => {
    service.startQuiz(1, ['a']);
    expect(service.quizLength).toBe(1);
    expect(service.inProgress ).toBe(true);
  }));
  it('should retyn quizNotes when getCurrentNodeId Called', inject([QuizService], (service: QuizService) => {
    service.quizIndex = 0;
    service.quizNotes = ['a'];
    const res = service.getCurrentNoteId();
    expect(res).toBe('a');
  }));

  it('next() test', inject([QuizService], (service: QuizService) => {
    service.quizIndex = 1;
    service.quizLength =2;
    const res = service.next();
    expect(res).toBe(false);
    service.quizLength =3;
    const ress = service.next();
    expect(ress).toBe(true);
  }));

  it('recordResult() test', inject([QuizService], (service: QuizService) => {
    service.correct = service.incorrect = 0;
    service.recordResult(1, {keyId: 1, noteId: '1'} as PianoNote );
    expect(service.correct).toBe(1)
    service.recordResult(3, {keyId: 1, noteId: '1'} as PianoNote );
    expect(service.incorrect).toBe(1)
  }));
});
