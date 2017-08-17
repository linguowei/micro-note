import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NoteService {

  constructor(
    private http: Http
  ) { }
  
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
  
  // 获取
  _getNoteList(){

  }

  // 获取单个
  _getNoteItem(){
    
  }
}

interface addNote {
  title: String,
  content: String,
  tag: Array<object>,
  date: Date
}