import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-msg',
  animations   : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ]),
    ])
  ],
  template: `
    <div class="msg-wrap" *ngIf="isShow" [@enterLeave]="message.state">
      <div class="msg-content">
        <i class="ion-alert"></i>
        <span>{{msgConifg.msg}} 说豆腐好的返回返回</span>
      </div>
    </div>
  `,
  styles: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  @Input() isShow = false

  message = {
    state: 'leave'
  }

  constructor() { }

  ngOnInit() {
  }

}
