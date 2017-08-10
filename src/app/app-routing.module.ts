import { SearchComponent } from './search/search.component';
import { AddLinkNoteComponent } from './add-link-note/add-link-note.component';
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'addNote',
    component: AddNoteComponent,
    children: []
  },
  {
    path: 'addLinkNote',
    component: AddLinkNoteComponent,
    children: []
  },
  {
    path: 'search',
    component: SearchComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
