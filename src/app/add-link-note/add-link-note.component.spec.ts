import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkNoteComponent } from './add-link-note.component';

describe('AddLinkNoteComponent', () => {
  let component: AddLinkNoteComponent;
  let fixture: ComponentFixture<AddLinkNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
