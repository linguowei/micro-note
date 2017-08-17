import { NoteService } from './services/note/note.service';
import { TagListService } from './services/tag-list/tag-list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './page/add-note/add-note.component';
import { AddLinkNoteComponent, CalculationContentHeightDirective } from './page/add-link-note/add-link-note.component';
import { SearchComponent } from './page/search/search.component';
import { IndexComponent } from './page/index/index.component';
import { MarkdownEditorDirective } from './directives/markdown-editor/markdown-editor.directive';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ButtonComponent } from './component/button/button.component';
import { LoadingBarService } from './services/loading-bar/loading-bar.service';
import { TagComponent } from './page/tag/tag.component';
import { ClassificationComponent } from './page/classification/classification.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    AddLinkNoteComponent,
    SearchComponent,
    IndexComponent,
    MarkdownEditorDirective, // MarkdownEditor指令
    CalculationContentHeightDirective,
    DropdownComponent, ButtonComponent, TagComponent, ClassificationComponent // 自定义Dropdown、Button组件
  ],
  imports: [
    BrowserModule,
    HttpModule,  // http模块
    FormsModule, // 表单模块
    AppRoutingModule, // 路由配置模块
    BrowserAnimationsModule, // 动画模块
  ],
  providers: [LoadingBarService, TagListService, NoteService], // LoadingBar, TagListService 服务 
  bootstrap: [AppComponent] // 根组件
})
export class AppModule { }
