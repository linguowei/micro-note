import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddLinkNoteComponent } from './add-link-note/add-link-note.component';
import { SearchComponent } from './search/search.component';
import { IndexComponent } from './index/index.component';
import { MarkdownEditorDirective } from './add-note/markdown-editor/markdown-editor.directive';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ButtonComponent } from './component/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    AddLinkNoteComponent,
    SearchComponent,
    IndexComponent,
    MarkdownEditorDirective, // MarkdownEditor指令
    DropdownComponent, ButtonComponent, // 自定义Dropdown、Button组件
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // 路由配置模块
    BrowserAnimationsModule // 动画模块
  ],
  providers: [],
  bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
