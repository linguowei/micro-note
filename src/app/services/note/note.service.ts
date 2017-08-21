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
    this._updateAllNote()
  }
  
  // 添加
  _addNote(param: editNote){
    return this.http.post('/api/addNote', param).map(res => res.json())
  }
  
  // 修改
  _modifyNote(param: editNote){
    return this.http.post('/api/modify', param).map(res => res.json())
  }

  // 删除
  _deleteNote(id){
    return this.http.post('/api/deleteNote', {id: id}).map(res => res.json())
  }

  _updateAllNote(){
    this.http.get('/api/allNote')
      .map(res => res.json())
      .subscribe((data) => {
        this.allNote$.next(data.data)
      })
  }
}

interface editNote {
  title: String,
  content: String,
  tag: Array<object>,
  date: Date,
  sourceLink: String,
  _id?: String
}