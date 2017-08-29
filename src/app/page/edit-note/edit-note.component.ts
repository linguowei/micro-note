import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TagService } from "../../services/tag/tag.service";
import { NoteService } from "../../services/note/note.service";
import { MsgService } from "../../services/msg/msg.service";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditNoteComponent implements OnInit {
  dropdownMenuSub: Subscription
  dropdownMenu = []
  title = ''
  content = ''
  tagList = []
  noteInfo = {
    content: String,
    date: String,
    sourceLink: String,
    tag: [],
    title: '',
    __v: Number,
    _id: ''
  }

  constructor(
    private tagService: TagService,
    private noteService: NoteService,
    private msg: MsgService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dropdownMenuSub = this.tagService.tagList$.subscribe((data) => {
      this.dropdownMenu = data
    })

    this.noteInfo = JSON.parse(localStorage.getItem('noteItemInfo'))
    this.tagList = this.noteInfo.tag
    this.title = this.noteInfo.title
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
    if (this.title === '' || this.content === '' || this.tagList.length === 0){
      this.msg.info('请输入完整的笔记信息！')
    } else {
      let sub = this.noteService._modifyNote({
        title: this.title,
        content: this.content,
        tag: this.tagList,
        date: new Date(),
        sourceLink: '',
        _id: this.noteInfo._id
      }).subscribe((res) => {
        if(res['code'] === 200){
          this.msg.info('修改成功！')
          this.noteService._updateAllNote()
          localStorage.setItem('noteItemInfo', JSON.stringify(res['data']))
          this.router.navigate(['/viewNote'])
        }
      })
    }
  }

  cancel(){
    this.router.navigate(['/viewNote'])
  }
}
