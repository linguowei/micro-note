import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `
    <div class="index">
      <div class="logo">
        <img src="../../assets/logo.svg">
        <div class="name">Micro-note</div>
        <div class="introduction">简约型笔记应用</div>
        <div class="introduction">支持链接动态生成文章</div>
      </div>
      <div class="start">
        <a href="https://github.com/linguowei/micro-note" target="_blank" class="github">GitHub</a>
        <a [routerLink]="['/addNote']" class="started">Get Started</a>
      </div>
    </div>
  `,
  styles: [`
    .index{
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 100;
      width: 100vw;
      height: 100vh;
      display:table-cell;
      text-align:center;
      vertical-align:middle;
      background: #f7f7f7;
    }
    .index .logo{
      height: 60vh;
      width: 100vw;
      display:table-cell;
      text-align:center;
      vertical-align:middle;
    }
    .index .name{
      padding: 10px 0;
      color: #34495e;
      font-size: 26px;
      font-family: fantasy;
    }
    .index .introduction{
      font-weight: bold;
      color: #34495e;
      font-size: 15px;
      font-family: serif;
    }
    .index .start a{
      font-size: 15px;
      border: 1px solid #42b983;
      padding: 8px;
      border-radius: 10px;
    }
    .github{
      color: #42b983;
      margin-right: 15px;
    }
    .started{
      color: #fff;
      background-color: #42b983;
      margin-left: 15px;
    }
  `]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
