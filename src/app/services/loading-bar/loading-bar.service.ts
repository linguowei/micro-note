import { style } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingBarService {

  constructor() { }
  
  public $Loading = {
    start: function(){
      const myLoadingBar = document.querySelector('.my-loading-bar')
      if (myLoadingBar !== null) return;
      const LoadingBarDiv = document.createElement('div')
      LoadingBarDiv.className = 'my-loading-bar'
      const bodyEl = document.querySelector('body')
      bodyEl.appendChild(LoadingBarDiv)
      let LoadingBarDivWidth = 0
      const timer = setInterval(() => {
        LoadingBarDivWidth++
        LoadingBarDiv.style.width = LoadingBarDivWidth + 'vw'
        if(LoadingBarDivWidth >= 100){
          clearInterval(timer)
        }
      }, 25)
    },
    finish: function(){
      let myLoadingBar = document.querySelector('.my-loading-bar')
      if(myLoadingBar !== null && myLoadingBar instanceof HTMLElement){
        myLoadingBar.style.width = 0 + 'vw'
      }
    }
  }
}
