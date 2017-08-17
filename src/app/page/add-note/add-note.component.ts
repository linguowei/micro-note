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
  dropdownMenu = this.tagService.tagList
  _title = ''
  _content = ''
  _labelList = []

  constructor(
    private tagService: TagService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
  }
  
  selectItem(data){
    this._labelList.push(data)
  }
  
  delectLabelItem(index){
    this._labelList.splice(index, 1)
  }

  markdownValueChange(data){
    this._content = data
  }
  
  // 保存笔记
  save(){
    this.noteService._addNote({
      title: this._title,
      content: this._content,
      tag: this._labelList,
      date: new Date()
    })
  }
}
