import { MsgService } from './../services/msg/msg.service';
import { Router, Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class GlobalResponseInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private msg: MsgService
  ) {
  }

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    return next.handle(req).map(event => {
      if (event instanceof HttpResponse) {
        if (event.body.code === 401) {
          this.msg.info('登录已过期！');
          setTimeout(() => {
            this.router.navigate(['/index']);
          }, 2000);
        }
      }
      return event;
    });
  }
}
