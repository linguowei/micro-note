import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import SimpleMDE from 'simplemde'

@Directive({
  selector: '[myMarkdownEditor]'
})
export class MarkdownEditorDirective {

  constructor(private el: ElementRef) {
    
    setTimeout(() => {
      let simpleMDE = new SimpleMDE({
        element: el.nativeElement.querySelector('textarea'),
        autofocus: false,
        autosave: true,
        toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'code', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', '|', 'guide'],
        styleSelectedText: false
      })
      simpleMDE.codemirror.on('change', () => {
        this.MarkdownEditorValue.emit(simpleMDE.value())
      })
    })
  }
  
  // 指令往外部输出编辑器的值
  @Output() MarkdownEditorValue = new EventEmitter<any>();
}
