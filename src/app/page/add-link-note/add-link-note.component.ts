import { LoadingBarService } from './../../services/loading-bar/loading-bar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-link-note',
  templateUrl: './add-link-note.component.html',
  styleUrls: ['./add-link-note.component.scss']
})
export class AddLinkNoteComponent implements OnInit {

  constructor(private loadingBar : LoadingBarService) { }

  ngOnInit() {
    this.loadingBar.$Loading.start()
    setTimeout(() => {
      this.loadingBar.$Loading.finish()
    }, 5000)
  }

  private onEnter(value){
    this.loadingBar.$Loading.start()
  }

}