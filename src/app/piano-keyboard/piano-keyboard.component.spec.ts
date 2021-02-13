import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PianoKeyboardComponent } from './piano-keyboard.component';
import { QuizService } from '../core/quiz.service';

describe('PianoKeyboardComponent', () => {
  let component: PianoKeyboardComponent;
  let fixture: ComponentFixture<PianoKeyboardComponent>;
  let quizService: QuizService = new QuizService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianoKeyboardComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:    [
        {provide: QuizService, useValue: quizService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keyPlayed should emit when keyPress called', () => {
    spyOn(component.keyPlayed, 'emit');
    component.keyPress(1);
    expect(component.keyPlayed.emit).toHaveBeenCalledWith(1);
  });

  it('should return "#f0e68c" or "" when getColor called', () => {
    component.highlightedKeyId = 1;
    const res = component.getColor(1);
    expect(res).toBe("#f0e68c");
  });
});
