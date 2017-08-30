import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import SimpleMDE from 'simplemde'
import marked from 'marked'

@Directive({
  selector: '[myMarkdownEditor]'
})
export class MarkdownEditorDirective {
  @Input() inputMarkdownEditorValue: String = ''
  // 指令往外部输出编辑器的值
  @Output() MarkdownEditorValue = new EventEmitter<any>()

  constructor(private el: ElementRef) {
    setTimeout(() => {
      let simpleMDE = new SimpleMDE({
        element: el.nativeElement.querySelector('textarea'),
        autofocus: false,
        autosave: true,
        previewRender: function(plainText) {
          return marked(plainText); // Returns HTML from a custom parser
        },
        toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'code', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', {
          name: 'side-by-side',
          action: function(editor){
            var cm = editor.codemirror;
            var wrapper = cm.getWrapperElement();
            var preview = wrapper.nextSibling;
            var toolbarButton = editor.toolbarElements["side-by-side"];
            var useSideBySideListener = false;
            if(/editor-preview-active-side/.test(preview.className)) {
              preview.className = preview.className.replace(
                /\s*editor-preview-active-side\s*/g, ""
              );
              toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
              wrapper.className = wrapper.className.replace(/\s*CodeMirror-sided\s*/g, " ");
            } else {
              // When the preview button is clicked for the first time,
              // give some time for the transition from editor.css to fire and the view to slide from right to left,
              // instead of just appearing.
              setTimeout(function() {
                if(!cm.getOption("fullScreen"))
                  simpleMDE.toggleFullScreen(editor);
                  let fullscreenDom = <HTMLElement>document.querySelector('.CodeMirror-fullscreen')
                  if(!fullscreenDom)return
                  fullscreenDom.style.height = window.innerHeight - 70 + 'px'
                  fullscreenDom.style.maxHeight = window.innerHeight - 70 + 'px'
                preview.className += " editor-preview-active-side";
              }, 1);
              toolbarButton.className += " active";
              wrapper.className += " CodeMirror-sided";
              useSideBySideListener = true;
            }
          
            // Hide normal preview if active
            var previewNormal = wrapper.lastChild;
            if(/editor-preview-active/.test(previewNormal.className)) {
              previewNormal.className = previewNormal.className.replace(
                /\s*editor-preview-active\s*/g, ""
              );
              var toolbar = editor.toolbarElements.preview;
              var toolbar_div = wrapper.previousSibling;
              toolbar.className = toolbar.className.replace(/\s*active\s*/g, "");
              toolbar_div.className = toolbar_div.className.replace(/\s*disabled-for-preview*/g, "");
            }
          
            var sideBySideRenderingFunction = function() {
              preview.innerHTML = editor.options.previewRender(editor.value(), preview);
            };
          
            if(!cm.sideBySideRenderingFunction) {
              cm.sideBySideRenderingFunction = sideBySideRenderingFunction;
            }
          
            if(useSideBySideListener) {
              preview.innerHTML = editor.options.previewRender(editor.value(), preview);
              cm.on("update", cm.sideBySideRenderingFunction);
            } else {
              cm.off("update", cm.sideBySideRenderingFunction);
            }
          
            // Refresh to fix selection being off (#309)
            cm.refresh();
          },
          className: "fa fa-columns no-disable no-mobile",
          title: "sideBySide"
        }, {
          name: "fullscreen",
          action: function(editor){
            var saved_overflow = "";
          	// Set fullscreen
          	var cm = editor.codemirror;
          	cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          
          	// Prevent scrolling on body during fullscreen active
          	if(cm.getOption("fullScreen")) {
          		saved_overflow = document.body.style.overflow;
          		document.body.style.overflow = "hidden";
          	} else {
          		document.body.style.overflow = saved_overflow;
          	}
          
          	// Update toolbar class
          	var wrap = cm.getWrapperElement();
          
          	if(!/fullscreen/.test(wrap.previousSibling.className)) {
          		wrap.previousSibling.className += " fullscreen";
          	} else {
          		wrap.previousSibling.className = wrap.previousSibling.className.replace(/\s*fullscreen\b/, "");
          	}
          
          	// Update toolbar button
          	var toolbarButton = editor.toolbarElements.fullscreen;
          
          	if(!/active/.test(toolbarButton.className)) {
          		toolbarButton.className += " active";
          	} else {
          		toolbarButton.className = toolbarButton.className.replace(/\s*active\s*/g, "");
          	}
          
          	// Hide side by side if needed
          	var sidebyside = cm.getWrapperElement().nextSibling;
          	if(/editor-preview-active-side/.test(sidebyside.className))
            simpleMDE.toggleSideBySide(editor);
            let fullscreenDom = <HTMLElement>document.querySelector('.CodeMirror-fullscreen')
            if(!fullscreenDom)return
            fullscreenDom.style.height = window.innerHeight - 70 + 'px'
            fullscreenDom.style.maxHeight = window.innerHeight - 70 + 'px'
            // let toolbar = <HTMLElement>document.querySelector('.editor-toolbar')
            // let input = document.createElement('input')
            // input.value = '这是标题'
            // toolbar.appendChild(input)
          },
          className: "fa fa-arrows-alt no-disable no-mobile",
          title: "Fullscreen",
        }],
        styleSelectedText: false
      })
      simpleMDE.codemirror.on('change', () => {
        this.MarkdownEditorValue.emit(simpleMDE.value())
      })
      simpleMDE.value(this.inputMarkdownEditorValue)
      // simpleMDE.togglePreview()
      el.nativeElement.querySelector('.CodeMirror').style.height = window.innerHeight - 220 + 'px';
      el.nativeElement.querySelector('.CodeMirror').style.maxHeight = window.innerHeight - 220 + 'px';
      el.nativeElement.querySelector('.CodeMirror').style.overflow = 'auto'
    })
  }
}
