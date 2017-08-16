import { TagListService } from '../../services/tag-list/tag-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss']
})
export class ClassificationComponent implements OnInit {
  tagList = this.tagListService.tagList
  content: String = '全部'
  tabIsActive: Boolean = true

  constructor(
    private tagListService : TagListService
  ) { }

  ngOnInit() {
    this._activeFalse()
  }
  
  _activeFalse(){
    this.tagList.map((item) => {
      item['tabIsActive'] = false
    })
  }

  all(){
    this._activeFalse()
    this.tabIsActive = true
    this.content = '全部'
  }

  tabClick(data){
    this.tabIsActive = false
    this._activeFalse()
    data.tabIsActive = true
    this.content = data.name
  }
}
