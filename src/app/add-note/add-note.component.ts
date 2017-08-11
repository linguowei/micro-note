import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  label = '标签'
  dropdownMenu = [
    {id: 0, name: '01'},
    {id: 1, name: '02'},
    {id: 2, name: '03'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
    {id: 3, name: '04'},
  ]

  constructor() { }

  ngOnInit() {
  }

  private markdownValueChange(data){
    console.log(data)
  }

}
