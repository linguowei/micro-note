import { HttpClient } from '@angular/common/http';
import { MsgService } from './../../services/msg/msg.service';
import { TagService } from './../../services/tag/tag.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit , OnDestroy {
  tagListSub: Subscription;
  tagList = [];
  tagName = '';
  constructor(
    private tagService: TagService,
    private msg: MsgService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.tagListSub = this.tagService.tagList$.subscribe((data) => {
      this.tagList = data;
    });

  }

  ngOnDestroy() {
    this.tagListSub.unsubscribe();
  }

  addTag(value) {
    if (value !== '') {
      this.tagService._addTag(value);
      this.tagName = '';
    } else {
      this.msg.info('标签名字不能为空！');
    }
  }

  delectTagItem(id) {
    this.tagService._deleteTag(id);
  }
}
