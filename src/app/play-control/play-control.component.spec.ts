import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayControlComponent } from './play-control.component';

describe('PlayControlComponent', () => {
  let component: PlayControlComponent;
  let fixture: ComponentFixture<PlayControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayControlComponent ]
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
});
