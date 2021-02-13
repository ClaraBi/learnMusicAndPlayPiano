import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayControlComponent } from './play-control.component';
import { PianoMode } from '../core/piano-mode.enum';

describe('PlayControlComponent', () => {
  let component: PlayControlComponent;
  let fixture: ComponentFixture<PlayControlComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ PlayControlComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modeSelected should emit when handlePlayBtnClick/handleQuizBtnClick called', () => {
    spyOn(component.modeSelected, 'emit');
    component.handlePlayBtnClick();
    expect(component.modeSelected.emit).toHaveBeenCalledWith(PianoMode.Play);
    component.handleQuizBtnClick();
    expect(component.modeSelected.emit).toHaveBeenCalledWith(PianoMode.Quiz);

  });
});
