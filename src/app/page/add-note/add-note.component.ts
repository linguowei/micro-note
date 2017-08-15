import { TagListService } from './../../services/tag-list/tag-list.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropdownItem } from '../../component/dropdown/dropdown.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  dropdownMenu = this.tagListService.tagList
  labelList = []

  constructor(
    private tagListService: TagListService
  ) { }

  ngOnInit() {
  }
  
  selectItem(data){
    this.labelList.push(data)
  }
  
  delectLabelItem(index){
    this.labelList.splice(index, 1)
  }

  markdownValueChange(data){
    console.log(data)
  }

}
