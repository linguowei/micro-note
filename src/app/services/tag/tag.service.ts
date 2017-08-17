import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TagService {  
  tagList = []
  tagList$ = new BehaviorSubject<Array<object>>(this.tagList)

  constructor(
    private http: Http
  ) {
    this.updateTagList()
  }
  
  // 新增
  _addTag(name: String){
    this.http.post('/api/addTag', {
      name: name
    })
    .map(res => res.json())
    .subscribe((data) => {
      this.updateTagList()
    })
  }
  
  // 删除
  _deleteTag(id){
    this.http.post('/api/deleteTag', {
      id: id
    }).map(res => res.json())
      .subscribe((data) => {
        this.updateTagList()
      })
  }
  
  // 获取整个列表
  _getTagList(){
    return this.tagList
  }

  private updateTagList(){
    this.http.get('/api/TagList')
      .map(res => res.json())
      .subscribe((data) => {
        this.tagList$.next(data.data)
      })
  }

}
