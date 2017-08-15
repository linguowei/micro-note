import { DropdownMenuListService } from './../../services/dropdown-menu-list/dropdown-menu-list.service';
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
  private isShowMarkdownEditor = false
  private dropdownMenu = this.dropdownMenuListService.dropdownMenuList
  private labelList = []
  private markdownEditorValue = String
  private noteTitle: string = ''
  constructor(
    private dropdownMenuListService: DropdownMenuListService,
    private loadingBar : LoadingBarService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  private onEnter(value){
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

  private selectItem(data){
    this.labelList.push(data)
  }
  
  private delectLabelItem(index){
    this.labelList.splice(index, 1)
  }

  private markdownValueChange(data){
    // console.log(data)
  }

}