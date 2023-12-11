import { Plugin } from 'ckeditor5/src/core';

export class Cke5OfficeCore extends Plugin {

  init() {
    const editor = this.editor;

    // Disable rich-text pasting
    editor.editing.view.document.on('clipboardInput', (evt, data) => {
      data.content = editor.data.htmlProcessor.toView(data.dataTransfer.getData('text/plain'));
    });

    editor.model.document.on('change', () => {
      // Can't get editor data if Source mode is enabled.
      // Nadeem you will need to change this line depending on your CKE5.
      // If you already have the HR CKE5 button no need to change anything.
      // Otherwise you will need to replace the querySelector with HTML from
      // a button that gets disabled when you click the Source button.
      // I added this because there was an issue with the page hanging when
      // The the Page's Save button is clicked and there was text copied over.
      let ckButton = document.querySelector('[data-cke-tooltip-text="Horizontal line"]');
      if (ckButton.classList.contains('ck-disabled')) {
        return;
      }

      let haystack = editor.getData();

      // Replace the pesky Msoclass found in span classes.
      if (haystack.match('MsoNormal')) {
        haystack = haystack.replace(' class="MsoNormal"', '');
        editor.setData(haystack);
      }

      // WWW doesn't allow images. 
      if (haystack.match('<img')) {
        haystack = haystack.replace(/<span><img.*?><\/span>/g, '');
        editor.setData(haystack);
      }
    });
  }
}
