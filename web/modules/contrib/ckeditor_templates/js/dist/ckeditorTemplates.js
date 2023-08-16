!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.ckeditorTemplates=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/widget.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/widget.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";o.d(r,{default:()=>a});var e=o("ckeditor5/src/core.js"),t=o("ckeditor5/src/ui.js");class i extends e.Plugin{init(){const e=this.editor,o=this.editor.config.get("ckeditorTemplates");o&&o.openDialog&&o.dialogSettings&&o.dialogUrl&&e.ui.componentFactory.add("ckeditorTemplates",(r=>{const i=e.commands.get("ckeditorTemplates"),s=new t.ButtonView(r);return s.set({label:Drupal.t("Templates"),icon:'<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" id="templates" data-name="Line Color" class="icon line-color" viewBox="5 2 15 20"><path id="secondary" d="M15,17H9m0-4h6M9,9h6" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: square; stroke-linejoin: square; stroke-width: 1;"/><path id="primary" d="M6,21a0,0,0,0,0-0-0V7A0,0,0,0,0,6,3h8l5,4V21a0,0,0,0,0-0,0Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: square; stroke-linejoin: square; stroke-width: 1;"/></svg>\n',tooltip:!0}),s.bind("isOn","isEnabled").to(i,"value","isEnabled"),this.listenTo(s,"execute",(()=>{const t=o.dialogUrl,r=o.dialogSettings;o.openDialog(t,(({htmlCode:t,replace:o})=>{e.execute("ckeditorTemplates",t,o)}),r)})),s}))}}var s=o("ckeditor5/src/widget.js");class n extends e.Command{refresh(){const{model:e}=this.editor,{selection:t}=e.document,o=e.schema.findAllowedParent(t.getFirstPosition(),"ckeditorTemplates");this.isEnabled=null!==o}execute(e,t){const o=this.editor;o.model.change((r=>{if(t)o.data.set(`\n          <section class="ckeditor-template-wrapper">\n            <div class="ckeditor-template-content">\n              ${e}\n            </div>\n          </section>\n        `);else{const t=o.data.processor.toView(e),i=o.data.toModel(t);o.model.insertContent(function(e,t){const o=e.createElement("ckeditorTemplates"),r=e.createElement("ckeditorTemplateContent");return e.append(r,o),e.append(t,r),o}(r,i))}}))}}class l extends e.Plugin{static get requires(){return[s.Widget]}init(){this._defineSchema(),this._defineConverters(),this.editor.commands.add("ckeditorTemplates",new n(this.editor))}_defineSchema(){const e=this.editor.model.schema;e.register("ckeditorTemplates",{isObject:!0,allowWhere:"$block"}),e.register("ckeditorTemplateContent",{isLimit:!0,allowIn:"ckeditorTemplates",allowContentOf:"$root"}),e.addChildCheck(((e,t)=>{if(e.endsWith("ckeditorTemplateContent")&&"ckeditorTemplates"===t.name)return!1}))}_defineConverters(){const{conversion:e}=this.editor;e.for("upcast").elementToElement({model:"ckeditorTemplates",view:{name:"section",classes:"ckeditor-template-wrapper"}}),e.for("upcast").elementToElement({model:"ckeditorTemplateContent",view:{name:"div",classes:"ckeditor-template-content"}}),e.for("dataDowncast").elementToElement({model:"ckeditorTemplates",view:{name:"section",classes:"ckeditor-template-wrapper"}}),e.for("dataDowncast").elementToElement({model:"ckeditorTemplateContent",view:{name:"div",classes:"ckeditor-template-content"}}),e.for("editingDowncast").elementToElement({model:"ckeditorTemplates",view:(e,{writer:t})=>{const o=t.createContainerElement("section",{class:"ckeditor-template-wrapper"});return(0,s.toWidget)(o,t,{label:"Ckeditor template widget"})}}),e.for("editingDowncast").elementToElement({model:"ckeditorTemplateContent",view:(e,{writer:t})=>{const o=t.createEditableElement("div",{class:"ckeditor-template-content"});return(0,s.toWidgetEditable)(o,t)}})}}class d extends e.Plugin{static get requires(){return[i,l]}static get pluginName(){return"ckeditorTemplates"}}const a={CKEditorTemplates:d}})(),r=r.default})()));