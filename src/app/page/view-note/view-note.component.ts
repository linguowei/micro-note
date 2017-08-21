import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { NoteService } from './../../services/note/note.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import marked from 'marked'

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class ViewNoteComponent implements OnInit {
  isShowEdit = false
  noteInfo = {
    content: String,
    date: String,
    sourceLink: '',
    tag: Array,
    title: String,
    __v: Number,
    _id: String
  }
  isShowDelect = false

  constructor(
    private noteService: NoteService,
    private msgService: MsgService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.noteInfo = JSON.parse(localStorage.getItem('noteItemInfo'))
    this.noteInfo.content = marked(this.noteInfo.content)
    this.noteInfo.sourceLink === '' ? this.isShowEdit = true : this.isShowEdit = false
  }
  
  delect(){
    this.isShowDelect = true
  }

  cancel(){
    this.isShowDelect = false
  }

  confirmDelete(){
    let id = this.noteInfo._id
    this.noteService._deleteNote(id).subscribe((res) => {
      if(res.data.ok === 1){
        this.isShowDelect = false
        this.msgService.info('删除成功！')
        this.noteService._updateAllNote()
        this.router.navigate(['/classification'])
      } 
    })
  }

  editNote(){
    this.router.navigate(['/editNote'])
  }
}
