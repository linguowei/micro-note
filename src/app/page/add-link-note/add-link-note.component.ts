import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { NoteService } from './../../services/note/note.service';
import { style } from '@angular/animations';
import { TagService } from './../../services/tag/tag.service';
import { LoadingBarService } from './../../services/loading-bar/loading-bar.service';
import { Component, OnInit, ViewEncapsulation, Directive, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import marked from 'marked';
import highlight from 'highlight.js'
import { DomSanitizer } from '@angular/platform-browser'

const test = function (json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2)
  }
  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
  let reg = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g
  return json.replace(reg, (match) => {
    let cls = 'number'
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key'
      } else {
        cls = 'string'
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean'
    } else if (/null/.test(match)) {
      cls = 'null'
    }
    return '<span class="' + cls + '">' + match + '</span>'
  })
}

@Directive({
  selector: '[previewHeight]'
})
export class CalculationContentHeightDirective {
  constructor(
    el: ElementRef
  ){
    el.nativeElement.style.height = window.innerHeight - 170 + 'px'
    el.nativeElement.style.maxHeight = window.innerHeight - 170 + 'px'
    el.nativeElement.style.overflow = 'auto'
    
    setTimeout(() => {
      let codeList = el.nativeElement.querySelectorAll('code')
      codeList.forEach((element) => {
        // console.log(test(element.innerText))
      })
    })

  }
}

@Component({
  selector: 'app-add-link-note',
  templateUrl: './add-link-note.component.html',
  styleUrls: ['./add-link-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddLinkNoteComponent implements OnInit {
  isShowMarkdownEditor = false
  dropdownMenu = []
  labelList = []
  noteTitle: String = ''
  noteContent: String = ''
  sourceLink: String = ''
  constructor(
    private tagService: TagService,
    private loadingBar : LoadingBarService,
    private http: Http,
    private sanitizer: DomSanitizer,
    private noteService: NoteService,
    private msg: MsgService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tagService._getTagList().subscribe((res) => {
      this.dropdownMenu = res.data
    })
  }

  onEnter(value){
    this.sourceLink = value
    this.loadingBar.$Loading.start()
    this.http.post('/api/generateNote', {
      link: value
    })
    .map(res => res.json())
    .subscribe((data) => {

      marked(data.content, function (err, content) {
        if (err) throw err;
        // console.log(content);
      });

      this.loadingBar.$Loading.finish()
      this.isShowMarkdownEditor = true
      this.noteTitle = data.title
      // console.log(data.content)
      // console.log(data.content)
      this.noteContent = data.content

    })
  }
  
  // 保存笔记
  save(){
     if (this.noteTitle === '' || this.noteContent === '' || this.labelList.length === 0){
      this.msg.info('请输入完整的笔记信息！')
    } else {
      let sub = this.noteService._addNote({
        title: this.noteTitle,
        content: this.noteContent,
        tag: this.labelList,
        date: new Date(),
        sourceLink: this.sourceLink
      }).subscribe((res) => {
        if(res.code === 200){
          this.msg.info('保存成功！')
          this.noteService._updateAllNote()
          localStorage.setItem('noteItemInfo', JSON.stringify(res.data))
          this.router.navigate(['/viewNote'])
        }
      })
    }
  }

  selectItem(data){
    this.labelList.push(data)
  }
  
  delectLabelItem(index){
    this.labelList.splice(index, 1)
  }

  cancel(){
    this.isShowMarkdownEditor = false
  }

}