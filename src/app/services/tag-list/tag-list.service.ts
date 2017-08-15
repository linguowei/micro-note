import { Injectable } from '@angular/core';



@Injectable()
export class TagListService {

  constructor() { }

  public tagList = [
    {id: 0, name: '01'},
    {id: 1, name: '02'},
    {id: 2, name: '03'},
    {id: 3, name: '04'},
    {id: 4, name: '05'},
    {id: 5, name: '06'},
    {id: 6, name: '07'},
    {id: 7, name: '08'},
    {id: 8, name: '09'}
  ]
  
  public deleteTagItem = (id) => {
    this.tagList.splice(id, 1)
  }
  public addTagItem = (name) => {
    this.tagList.push({
      id: Math.random() * 100,
      name: name
    })
  }
}
