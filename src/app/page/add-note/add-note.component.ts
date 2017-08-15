import { DropdownMenuListService } from './../../services/dropdown-menu-list/dropdown-menu-list.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropdownItem } from '../../component/dropdown/dropdown.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  private dropdownMenu = this.dropdownMenuListService.dropdownMenuList
  private labelList = []

  constructor(
    private dropdownMenuListService: DropdownMenuListService
  ) { }

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
