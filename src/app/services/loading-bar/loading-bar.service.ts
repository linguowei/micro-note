import { Injectable } from '@angular/core';

@Injectable()
export class LoadingBarService {
  constructor() { }

  public $Loading = {
    start: function(){
      const myLoadingBar = document.querySelector('.my-loading-bar');
      if (myLoadingBar !== null && myLoadingBar instanceof HTMLElement) {
        let LoadingBarDivWidth = 0;
        this.timer = setInterval(() => {
          LoadingBarDivWidth++;
          myLoadingBar.style.width = LoadingBarDivWidth + 'vw';
          if (LoadingBarDivWidth >= 100) {
            clearInterval(this.timer);
          }
        }, 25);
      } else {
        const LoadingBarDiv = document.createElement('div');
        LoadingBarDiv.className = 'my-loading-bar';
        const bodyEl = document.querySelector('body');
        bodyEl.appendChild(LoadingBarDiv);
        let LoadingBarDivWidth = 0;
        this.timer = setInterval(() => {
          LoadingBarDivWidth++;
          LoadingBarDiv.style.width = LoadingBarDivWidth + 'vw';
          if (LoadingBarDivWidth >= 100) {
            clearInterval(this.timer);
          }
        }, 25);
      }
    },
    finish: function(){
      const myLoadingBar = document.querySelector('.my-loading-bar');
      if (myLoadingBar !== null && myLoadingBar instanceof HTMLElement) {
        clearInterval(this.timer);
        myLoadingBar.style.width = 0 + 'vw';
      }
    }
  };
}
