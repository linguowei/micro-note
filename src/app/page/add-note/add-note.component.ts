import { Subscription } from 'rxjs/Subscription';
import { NoteService } from '../../services/note/note.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropdownItem } from '../../component/dropdown/dropdown.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  dropdownMenuSub: Subscription
  dropdownMenu = []
  title = ''
  content = ''
  tagList = []

  constructor(
    private tagService: TagService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.dropdownMenuSub = this.tagService.tagList$.subscribe((data) => {
      this.dropdownMenu = data
    })
  }

  ngOnDestroy() {
    this.dropdownMenuSub.unsubscribe()
  }
  
  selectItem(data){
    this.tagList.push(data)
  }
  
  delectLabelItem(index){
    this.tagList.splice(index, 1)
  }

  markdownValueChange(data){
    this.content = data
  }
  
  // 保存笔记
  save(){
    this.noteService._addNote({
      title: this.title,
      content: this.content,
      tag: this.tagList,
      date: new Date()
    })
  }
}
