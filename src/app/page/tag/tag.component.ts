import { TagListService } from './../../services/tag-list/tag-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tagList = this.tagListService.tagList
  tagName: String = ''
  constructor(
    private tagListService: TagListService
  ) { }

  ngOnInit() {
  }
  
  onEnter(value){
    this.tagListService.addTagItem(value)
    this.tagName = ''
  }

  delectTagItem(id){
    this.tagListService.deleteTagItem(id)
  }
}
