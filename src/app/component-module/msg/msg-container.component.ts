import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MsgComponent } from "./msg.component";

@Component({
  selector: 'app-msg',
  template: `
    <ng-template #container></ng-template>
  `,
  styleUrls: ['./msg.component.scss']
})
export class MsgContainerComponent implements OnInit {
  componentRef: ComponentRef<MsgComponent>
  resolver: ComponentFactoryResolver
  
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef


  constructor() { }

  ngOnInit() {
  }

  createMsg(msg) {
    // this.container.clear()
    console.log(this.container)
    const factory: ComponentFactory<MsgComponent> = this.resolver.resolveComponentFactory(MsgComponent)
    this.componentRef = this.container.createComponent(factory)
    this.componentRef.instance.isShow = true
  }
  
  removeMsg(){
    this.componentRef.instance.isShow = false
  }

  ngOnDestroy() {
    this.componentRef.destroy()
  }
}