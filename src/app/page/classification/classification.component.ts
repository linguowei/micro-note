import { NoteService } from '../../services/note/note.service';
import { Subscription } from 'rxjs/Subscription';
import { TagService } from '../../services/tag/tag.service';
import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit() {
    this.tagListSub = this.tagService.tagList$.subscribe((data) => {
      this.tagList = data
    })
    this._activeFalse()

    this.allNoteSub = this.noteService.allNote$.subscribe((data) => {
      this.allNote = data
      this.currentNoteList = data
    })
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
  }

  tabClick(data){
    this.tabIsActive = false
    this._activeFalse()
    data.tabIsActive = true
    this.content = data.name
  }
}
