import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddLinkNoteComponent } from './add-link-note/add-link-note.component';
import { SearchComponent } from './search/search.component';
import { IndexComponent } from './index/index.component';
import { MarkdownEditorDirective } from './add-note/markdown-editor/markdown-editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    AddLinkNoteComponent,
    SearchComponent,
    IndexComponent,
    MarkdownEditorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // 路由配置模块
  ],
  providers: [],
  bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
