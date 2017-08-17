import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tagList = this.tagService.tagList
  tagName: String = ''
  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
  }
  
  onEnter(value){
    this.tagService.addTagItem(value)
    this.tagName = ''
  }

  delectTagItem(id){
    this.tagService.deleteTagItem(id)
  }
}
