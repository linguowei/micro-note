import { GlobalResponseInterceptor } from './interceptor/global-response-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// customize module
import { AppRoutingModule } from './app-routing.module';

// component
import { AppComponent } from './app.component';
import { AddNoteComponent } from './page/add-note/add-note.component';
import { AddLinkNoteComponent, CalculationContentHeightDirective } from './page/add-link-note/add-link-note.component';
import { SearchComponent } from './page/search/search.component';
import { IndexComponent } from './page/index/index.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { ButtonComponent } from './component/button/button.component';
import { ClassificationComponent, ClassificationTabsContentHeightDirective, FilterNoteContentPipe } from './page/classification/classification.component';
import { ViewNoteComponent } from './page/view-note/view-note.component';
import { EditNoteComponent } from './page/edit-note/edit-note.component';
import { TagComponent } from './page/tag/tag.component';

// directive
import { MarkdownEditorDirective } from './directives/markdown-editor/markdown-editor.directive';

// service
import { LoadingBarService } from './services/loading-bar/loading-bar.service';
import { MsgService } from './services/msg/msg.service';
import { NoteService } from './services/note/note.service';
import { TagService } from './services/tag/tag.service';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    AddLinkNoteComponent,
    SearchComponent,
    IndexComponent,
    MarkdownEditorDirective,
    CalculationContentHeightDirective,
    ClassificationTabsContentHeightDirective,
    DropdownComponent,
    ButtonComponent,
    TagComponent,
    ClassificationComponent,
    ViewNoteComponent,
    EditNoteComponent,
    FilterNoteContentPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // http模块
    FormsModule, // 表单模块
    AppRoutingModule, // 路由配置模块
    BrowserAnimationsModule, // 动画模块
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalResponseInterceptor,
      multi: true,
    },
    LoadingBarService,
    TagService,
    NoteService,
    MsgService,
  ],
  bootstrap: [AppComponent], // 根组件
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
