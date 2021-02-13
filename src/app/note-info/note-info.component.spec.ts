import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoNote } from '../core/piano-note';
import { NoteInfoComponent } from './note-info.component';
import { PianoService } from '../core/piano.service';
import { of, Subject } from 'rxjs';

describe('NoteInfoComponent', () => {
  let component: NoteInfoComponent;
  let fixture: ComponentFixture<NoteInfoComponent>;
  let pianoService: PianoService = new PianoService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteInfoComponent ],
      providers:    [
        {provide: PianoService, useValue: pianoService}
      ]
    })
    .compileComponents();
  });

  class FakePianoService {
    private pianoNote = new Subject();
    notePlayed$ = this.pianoNote.asObservable();
    emit(val: any) {
      this.pianoNote.next(val);
    }
    getAlternateNote(valnoteId): PianoNote {
      return valnoteId;
    }
    playNote(valnoteId) {}
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get valuse for title currentNotealternateNote', () => {
    const fakeService = new FakePianoService();
    const component = new NoteInfoComponent(fakeService as any);
    const val = {noteId: 1 as any };
    expect(component.title).toBe('Play');
    fakeService.emit(val);
    expect(component.title).toBe("Now playing");
    // expect(component.currentNote).toBe();
    expect(component.alternateNote).toBe(val.noteId);
  });

  it('playNote should be called when playNote called', () => {
    const fakeService = new FakePianoService();
    const component = new NoteInfoComponent(fakeService as any);
    const note: PianoNote = {
      octave: 1,
      name: 'a',
      fullname: 'a1',
      keyId: 11,
      noteId: '11'
    };
    spyOn(fakeService, 'playNote');
    component.playNote(note);
    expect(fakeService.playNote).toHaveBeenCalledWith(note.noteId);
  });

});
