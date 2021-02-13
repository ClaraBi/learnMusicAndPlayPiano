import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRecordComponent } from './quiz-record.component';

describe('QuizRecordComponent', () => {
  let component: QuizRecordComponent;
  let fixture: ComponentFixture<QuizRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
