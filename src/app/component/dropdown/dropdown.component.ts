import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        height: '0'
        // transform: 'scale(0)'
      })),
      state('active',   style({
        height: '200px'
        // transform: 'scale(1)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class DropdownComponent implements OnInit {
  hero = {
    state: 'inactive'
  }
  @Input() Label: string;
  @Input() DropdownMenu: Array<dropdownItem>;

  constructor() { }

  ngOnInit() {
    console.log(this.Label)
  }

  toggleDropdownMenu(): void{
    this.hero.state == 'active' ? this.hero.state = 'inactive' : this.hero.state = 'active'
  }
}

interface dropdownItem {
  name: object,
  id: number
}
