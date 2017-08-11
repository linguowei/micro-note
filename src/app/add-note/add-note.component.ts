import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropdownItem } from '../component/dropdown/dropdown.component'

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  label = '标签'
  dropdownMenu = [
    {id: 0, name: 'node'},
    {id: 1, name: 'javascript'},
    {id: 2, name: 'angular'},
    {id: 3, name: 'react'},
    {id: 3, name: 'vue'},
    {id: 3, name: 'css'},
    {id: 3, name: 'es6'},
    {id: 3, name: 'V8'},
    {id: 3, name: 'webpack'},
    {id: 3, name: 'typescript'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
  ]
  labelList = []

  constructor() { }

  ngOnInit() {
  }
  
  private selectItem(data){
    this.labelList.push(data)
  }
  
  private delectLabelItem(index){
    this.labelList.splice(index, 1)
  }

  private markdownValueChange(data){
    console.log(data)
  }

}
