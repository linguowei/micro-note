import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { Subscription } from 'rxjs/Subscription';
import { NoteService } from '../../services/note/note.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { dropdownItem } from '../../component/dropdown/dropdown.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit, OnDestroy {
  dropdownMenuSub: Subscription;
  dropdownMenu = [];
  title = '';
  content = '';
  tagList = [];

  constructor(
    private tagService: TagService,
    private noteService: NoteService,
    private msg: MsgService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dropdownMenuSub = this.tagService.tagList$.subscribe((data) => {
      this.dropdownMenu = data;
    });
  }

  ngOnDestroy() {
    this.dropdownMenuSub.unsubscribe();
  }

  selectItem(data) {
    this.tagList.push(data);
  }

  delectLabelItem(index) {
    this.tagList.splice(index, 1);
  }

  markdownValueChange(data) {
    this.content = data;
  }

  // 保存笔记
  save() {
    if (this.title === '' || this.content === '' || this.tagList.length === 0) {
      this.msg.info('请输入完整的笔记信息！');
    } else {
      const sub = this.noteService._addNote({
        title: this.title,
        content: this.content,
        tag: this.tagList,
        date: new Date(),
        sourceLink: ''
      }).subscribe((res) => {
        if (res['code'] === 200) {
          this.msg.info('保存成功！');
          this.noteService._updateAllNote();
          localStorage.setItem('noteItemInfo', JSON.stringify(res['data']));
          this.router.navigate(['/viewNote']);
        }
      });
    }
  }
}
