import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TagService {  
  tagList = []
  tagList$ = new BehaviorSubject<Array<object>>(this.tagList)

  constructor(
    private http: HttpClient
  ) {
    this.updateTagList()
  }
  
  // 新增
  _addTag(name: String){
    this.http.post('/api/addTag', {
      name: name
    })
    .subscribe((data) => {
      this.updateTagList()
    })
  }
  
  // 删除
  _deleteTag(id){
    this.http.post('/api/deleteTag', {
      id: id
    }).subscribe((data) => {
        this.updateTagList()
      })
  }
  
  // 获取整个列表
  _getTagList(){
    return this.http.get('/api/TagList')
  }

  private updateTagList(){
    this.http.get('/api/TagList')
      .subscribe((res) => {
        this.tagList$.next(res['data'])
      })
  }

}
