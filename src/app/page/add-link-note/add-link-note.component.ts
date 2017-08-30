import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { NoteService } from './../../services/note/note.service';
import { style } from '@angular/animations';
import { TagService } from './../../services/tag/tag.service';
import { LoadingBarService } from './../../services/loading-bar/loading-bar.service';
import { Component, OnInit, ViewEncapsulation, Directive, ElementRef, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/map';
import marked from 'marked';
import highlight from 'highlight.js';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[previewHeight]'
})
export class CalculationContentHeightDirective {
  constructor(
    el: ElementRef
  ) {
    el.nativeElement.style.height = window.innerHeight - 170 + 'px';
    el.nativeElement.style.maxHeight = window.innerHeight - 170 + 'px';
    el.nativeElement.style.overflow = 'auto';
  }
}

@Component({
  selector: 'app-add-link-note',
  templateUrl: './add-link-note.component.html',
  styleUrls: ['./add-link-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddLinkNoteComponent implements OnInit, OnDestroy {
  dropdownMenuSub: Subscription;
  isShowMarkdownEditor = false;
  dropdownMenu = [];
  labelList = [];
  noteTitle = '';
  noteContent = '';
  sourceLink = '';
  constructor(
    private tagService: TagService,
    private loadingBar: LoadingBarService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
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

  onEnter(value) {
    this.sourceLink = value;
    this.loadingBar.$Loading.start();
    this.http.post('/api/generateNote', {
      link: value
    })
    .subscribe((data) => {

      marked(data['content'], function (err, content) {
        if (err) {
          throw err;
        }
      });

      this.loadingBar.$Loading.finish();
      this.isShowMarkdownEditor = true;
      this.noteTitle = data['title'];
      this.noteContent = data['content'];
    });
  }

  // 保存笔记
  save() {
     if (this.noteTitle === '' || this.noteContent === '' || this.labelList.length === 0) {
      this.msg.info('请输入完整的笔记信息！');
    } else {
      const sub = this.noteService._addNote({
        title: this.noteTitle,
        content: this.noteContent,
        tag: this.labelList,
        date: new Date(),
        sourceLink: this.sourceLink
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

  selectItem(data) {
    this.labelList.push(data);
  }

  delectLabelItem(index) {
    this.labelList.splice(index, 1);
  }

  cancel() {
    this.isShowMarkdownEditor = false;
  }
}
