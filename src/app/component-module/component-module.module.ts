import { MsgContainerComponent } from './msg/msg-container.component';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgComponent } from './msg/msg.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MsgComponent, MsgContainerComponent],
  entryComponents: [MsgComponent]
})
export class ComponentModuleModule { }
