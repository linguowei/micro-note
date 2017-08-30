import { Router } from '@angular/router';
import { MsgService } from './../../services/msg/msg.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  name: string = ''
  pwd: string = ''

  constructor(
    private http: HttpClient,
    private msg: MsgService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  login(){
    this.http.post('/api/login', {
      name: this.name,
      pwd: this.pwd
    }).subscribe((res) => {
      if(res['code'] !== 200){
        this.msg.info(res['msg'])
      }else{
        this.router.navigate(['/addNote'])
        localStorage.setItem('userName', this.name)
      }
    })
  }
}
