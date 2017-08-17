import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteService {
  allNote = []
  allNote$ = new BehaviorSubject<Array<object>>(this.allNote)

  constructor(
    private http: Http
  ) { 
    this.updateAllNote()
  }
  
  // 添加
  _addNote(param: addNote){
    this.http.post('/api/addNote', param)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data)
      })
  }
  
  // 编辑
  _editNote(){

  }

  // 删除
  _deleteNote(){

  }

  // 获取单个
  _getNoteItem(){
    
  }

  private updateAllNote(){
    this.http.get('/api/allNote')
      .map(res => res.json())
      .subscribe((data) => {
        this.allNote$.next(data.data)
      })
  }
}

interface addNote {
  title: String,
  content: String,
  tag: Array<object>,
  date: Date
}