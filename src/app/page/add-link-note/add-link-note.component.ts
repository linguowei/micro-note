import { TagListService } from './../../services/tag-list/tag-list.service';
import { LoadingBarService } from './../../services/loading-bar/loading-bar.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-link-note',
  templateUrl: './add-link-note.component.html',
  styleUrls: ['./add-link-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddLinkNoteComponent implements OnInit {
  isShowMarkdownEditor = false
  dropdownMenu = this.tagListService.tagList
  labelList = []
  markdownEditorValue = String
  noteTitle: string = ''
  constructor(
    private tagListService: TagListService,
    private loadingBar : LoadingBarService,
    private http: Http
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
      this.loadingBar.$Loading.finish()
      this.isShowMarkdownEditor = true
      this.markdownEditorValue = data.content
      this.noteTitle = data.title
    })
  }

  selectItem(data){
    this.labelList.push(data)
  }
  
  delectLabelItem(index){
    this.labelList.splice(index, 1)
  }

  markdownValueChange(data){
    // console.log(data)
  }

  cancel(){
    this.isShowMarkdownEditor = false
  }

}