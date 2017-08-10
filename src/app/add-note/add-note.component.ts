import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  private markdownValueChange(data){
    console.log(data)
  }

}
