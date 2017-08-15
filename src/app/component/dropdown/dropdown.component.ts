import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  animations: [
    trigger('dropdownMenuState', [
      state('inactive', style({
        height: '0'
      })),
      state('active',   style({
        height: '200px'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class DropdownComponent implements OnInit {
  dropdownMenu = {
    state: 'inactive'
  }
  @Input() Label: string;
  @Input() DropdownMenu: Array<dropdownItem>;
  @Output() SelectItem = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  toggleDropdownMenu(): void{
    this.dropdownMenu.state == 'active' ? this.dropdownMenu.state = 'inactive' : this.dropdownMenu.state = 'active'
  }
  selectItem(data): void{
    this.dropdownMenu.state = 'inactive'
    this.SelectItem.emit(data)
  }
}

export interface dropdownItem {
  name: object,
  id: number
}
