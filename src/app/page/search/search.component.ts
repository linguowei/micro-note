import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NoteService } from '../../services/note/note.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  allNoteSub: Subscription;
  allNote = [];
  resultNoteList = [];
  searchName = '';

  constructor(
    private noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.allNoteSub =  this.noteService.allNote$.subscribe((data) => {
      this.allNote = data;
    });
  }

  ngOnDestroy() {
    this.allNoteSub.unsubscribe();
  }

  onEnter(name) {
    const temporary = [];
    this.allNote.forEach((item, index) => {
      const jsonStringify = JSON.stringify(item.tag) + JSON.stringify(item.title);
      if (jsonStringify.indexOf(name) !== -1) {
        temporary.push(item);
      }
    });
    this.resultNoteList = temporary;
    this.searchName = '';
  }

  viewNote(data) {
    this.router.navigate(['/viewNote']);
    localStorage.setItem('noteItemInfo', JSON.stringify(data));
  }
}
