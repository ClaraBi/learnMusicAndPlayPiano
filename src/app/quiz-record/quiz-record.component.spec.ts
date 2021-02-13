import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRecordComponent } from './quiz-record.component';
import { QuizService } from '../core/quiz.service';
import { of, Subject } from 'rxjs';

describe('QuizRecordComponent', () => {
  let component: QuizRecordComponent;
  let fixture: ComponentFixture<QuizRecordComponent>;
  let quizService: QuizService = new QuizService();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRecordComponent ],
      providers:    [
        {provide: QuizService, useValue: quizService}
      ]
    })
    .compileComponents();
  });

  class FakeQuizService {
    private result = new Subject();
    quizResult$ = this.result.asObservable();
    emit(val: any) {
      this.result.next(val);
    }
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get value for message depends on the quizResult subscribe', () => {
    const fakeService = new FakeQuizService();
    const component = new QuizRecordComponent(fakeService as any);
    expect(component.message).toBe("");
    const val1 = { selectedKeyId: '1' , actualNote: {keyId: '1'}}
    const val2 = { selectedKeyId: '1' , actualNote: {keyId: '2'}}

    fakeService.emit(val1);
    expect(component.message).toBe("\u2714 Correct, well done!");

    fakeService.emit(val2);
    expect(component.message).toBe("\u2718 Incorrect");

  });

  it('buttonClicked emit value and message to be empty when handleTryAgainBtnClick has been called', () => {
    spyOn(component.buttonClicked, 'emit');
    component.handleTryAgainBtnClick();
    expect(component.buttonClicked.emit).toHaveBeenCalled();
  });

});
