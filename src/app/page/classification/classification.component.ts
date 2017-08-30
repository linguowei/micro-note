import { style } from '@angular/animations';
import { NoteService } from '../../services/note/note.service';
import { Subscription } from 'rxjs/Subscription';
import { TagService } from '../../services/tag/tag.service';
import { Component, OnInit, Directive, ElementRef, Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[classificationTabsContentHeight]'
})
export class ClassificationTabsContentHeightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.height = window.innerHeight - 80 + 'px';
    el.nativeElement.style.maxHeight = window.innerHeight - 80 + 'px';
    el.nativeElement.style.overflow = 'auto';
  }
}

@Pipe({name: 'filterNoteContent'})
export class FilterNoteContentPipe implements PipeTransform {
  transform(value: String): String {
    return value.replace(/[^\u4e00-\u9fa5]/gi, '');
  }
}

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit, OnDestroy {
  tagListSub: Subscription;
  tagList = [];
  content = '全部';
  tabIsActive = true;
  allNoteSub: Subscription;
  allNote = [];
  currentNoteList = [];

  constructor(
    private tagService: TagService,
    private noteService: NoteService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.tagListSub = this.tagService.tagList$.subscribe((data) => {
      this.tagList = data;
    });

    this._activeFalse();

    this.allNoteSub = this.noteService.allNote$.subscribe((data) => {
      this.allNote = data;
      this.currentNoteList = data;
    });
  }

  ngOnDestroy() {
    this.tagListSub.unsubscribe();
    this.allNoteSub.unsubscribe();
  }

  _activeFalse() {
    this.tagList.map((item) => {
      item['tabIsActive'] = false;
    });
  }

  all() {
    this._activeFalse();
    this.tabIsActive = true;
    this.content = '全部';
    this.currentNoteList = this.allNote;
  }

  tabClick(data) {
    this.tabIsActive = false;
    this._activeFalse();
    data.tabIsActive = true;

    const temporary = [];
    this.allNote.forEach((item, index) => {
      const jsonStringify = JSON.stringify(item.tag);
      if (jsonStringify.indexOf(data.name) !== -1) {
        temporary.push(item);
      }
    });
    this.currentNoteList = temporary;
  }

  viewNote(data) {
    this.router.navigate(['/viewNote']);
    localStorage.setItem('noteItemInfo', JSON.stringify(data));
  }
}
