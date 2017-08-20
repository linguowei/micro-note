import { style } from '@angular/animations';
import { NoteService } from '../../services/note/note.service';
import { Subscription } from 'rxjs/Subscription';
import { TagService } from '../../services/tag/tag.service';
import { Component, OnInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[classificationTabsContentHeight]'
})
export class ClassificationTabsContentHeightDirective{
  constructor(el: ElementRef){
    el.nativeElement.style.height = window.innerHeight - 80 + 'px'
    el.nativeElement.style.maxHeight = window.innerHeight - 80 + 'px'
    el.nativeElement.style.overflow = 'auto'
  }
}

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  tagListSub: Subscription
  tagList = []
  content: String = '全部'
  tabIsActive: Boolean = true
  
  allNoteSub: Subscription
  allNote = []

  currentNoteList = []
  
  constructor(
    private tagService : TagService,
    private noteService: NoteService
  ) { 
    this.tagListSub = this.tagService.tagList$.subscribe((data) => {
      this.tagList = data
    })
    this._activeFalse()

    this.allNoteSub = this.noteService.allNote$.subscribe((data) => {
      this.allNote = data
      this.currentNoteList = data
    })
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.tagListSub.unsubscribe()
    this.allNoteSub.unsubscribe()
  }

  _activeFalse(){
    this.tagList.map((item) => {
      item['tabIsActive'] = false
    })
  }

  all(){
    this._activeFalse()
    this.tabIsActive = true
    this.content = '全部'
    this.currentNoteList = this.allNote
  }

  tabClick(data){
    this.tabIsActive = false
    this._activeFalse()
    data.tabIsActive = true
    
    let temporary = []
    this.allNote.forEach((item, index) => {
      const jsonStringify = JSON.stringify(item.tag)
      if(jsonStringify.indexOf(data.name) !== -1){
        temporary.push(item)
      }
    })
    this.currentNoteList = temporary
  }
}
