import { style } from '@angular/animations';
import { TagListService } from './../../services/tag-list/tag-list.service';
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
    el.nativeElement.style.height = window.innerHeight - 140 + 'px'
    el.nativeElement.style.maxHeight = window.innerHeight - 140 + 'px'
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
  encapsulation: ViewEncapsulation.None,
})
export class AddLinkNoteComponent implements OnInit {
  isShowMarkdownEditor = false
  dropdownMenu = this.tagListService.tagList
  labelList = []
  noteTitle: String = ''
  noteContent: String = ''
  constructor(
    private tagListService: TagListService,
    private loadingBar : LoadingBarService,
    private http: Http,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  onEnter(value){
    this.loadingBar.$Loading.start()
    this.http.post('/api/generateNote', {
      link: value
    })
    .map(res => res.json())
    .subscribe((data) => {

      marked(data.content, function (err, content) {
        if (err) throw err;
        console.log(content);
      });

      this.loadingBar.$Loading.finish()
      this.isShowMarkdownEditor = true
      this.noteTitle = data.title
      // console.log(data.content)
      // console.log(data.content)
      this.noteContent = data.content

    })
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