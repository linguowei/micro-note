import { Injectable } from '@angular/core';

@Injectable()
export class MsgService {

  private createTpl(msg: String){
    let tpl = `
      <div class="msg-content">
        <i class="ion-alert"></i>
        <span>${msg}</span>
      </div>
    `
    return tpl
  }

  constructor() { }
  
  info(msg: String){
    let msgWrapEl = document.querySelector('.msg-wrap')
    if(msgWrapEl){

    }else{
      let bodyEl = document.querySelector('body')
      bodyEl.appendChild(this.parseDom(this.createTpl(msg)))
      let msgWrapEl = document.querySelector('.msg-wrap')
      setTimeout(() => {
        bodyEl.removeChild(msgWrapEl)
      }, 2000)
    }
  }

  private parseDom(arg) {
    let objl = document.createElement("div")
    objl.className = 'msg-wrap'
    objl.innerHTML = arg
    return objl
  }
}
