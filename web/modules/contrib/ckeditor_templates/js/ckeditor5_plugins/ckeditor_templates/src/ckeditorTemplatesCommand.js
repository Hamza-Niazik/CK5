import { Command } from "ckeditor5/src/core";

/**
 * Command for injecting code into the CKEditor.
 */
export default class CKEditorTemplatesCommand extends Command {
  /**
   * @inheritdoc
   */
  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    // Determine if the cursor (selection) is in a position where adding a
    // simpleBox is permitted. This is based on the schema of the model(s)
    // currently containing the cursor.
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "ckeditorTemplates"
    );

    this.isEnabled = allowedIn !== null;
  }

  /**
   * @inheritdoc
   */
  execute(htmlCode, replace) {
    const editor = this.editor;
    editor.model.change((writer) => {
      if (replace) {
        editor.data.set(`
          <section class="ckeditor-template-wrapper">
            <div class="ckeditor-template-content">
              ${htmlCode}
            </div>
          </section>
        `);
      } else {
        const viewFragment = editor.data.processor.toView(htmlCode);
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(createSimpleBox(writer, modelFragment));
      }
    });
  }
}

function createSimpleBox(writer, modelFragment) {
  // Create instances of the three elements registered with the editor in
  // simpleboxediting.js.
  const ckeditorTemplates = writer.createElement("ckeditorTemplates");
  const ckeditorTemplateContent = writer.createElement(
    "ckeditorTemplateContent"
  );

  // Append the title and description elements to the simpleBox, which matches
  // the parent/child relationship as defined in their schemas.
  writer.append(ckeditorTemplateContent, ckeditorTemplates);
  writer.append(modelFragment, ckeditorTemplateContent);

  // Return the element to be added to the editor.
  return ckeditorTemplates;
}
