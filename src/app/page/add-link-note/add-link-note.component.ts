import { LoadingBarService } from './../../services/loading-bar/loading-bar.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-add-link-note',
  templateUrl: './add-link-note.component.html',
  styleUrls: ['./add-link-note.component.scss'],
})
export class AddLinkNoteComponent implements OnInit {

  constructor(
    private loadingBar : LoadingBarService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  private onEnter(value){
    this.loadingBar.$Loading.start()
    this.http.post('/api/generateNote', {
      link: value
    })
    .map(res => res.json())
    .subscribe((data) => {
      this.loadingBar.$Loading.finish()
      console.log(data)
    })
  }

}