import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tagListSub: Subscription
  tagList = []
  tagName: String = ''
  constructor(
    private tagService: TagService
  ) { 
    
  }

  ngOnInit() {
    this.tagService._getTagList().subscribe((res) => {
      this.tagList = res.data
    })
  }
  
  addTag(value){
    this.tagService._addTag(value)
    this.tagName = ''
  }

  delectTagItem(id){
    this.tagService._deleteTag(id)
  }
}
