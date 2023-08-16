import { Plugin } from "ckeditor5/src/core";
import { toWidget, toWidgetEditable } from "ckeditor5/src/widget";
import { Widget } from "ckeditor5/src/widget";
import CKEditorTemplatesCommand from "./ckeditorTemplatesCommand";

/**
 * Handles the plugin functionality.
 */
export default class CKEditorTemplatesEditing extends Plugin {

  /**
   * @inheritdoc
   */
  static get requires() {
    return [Widget];
  }

  /**
   * @inheritdoc
   */
  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      "ckeditorTemplates",
      new CKEditorTemplatesCommand(this.editor)
    );
  }

  /*
   * This registers the structure that will be seen by CKEditor 5 as
   *
   * The logic in _defineConverters() will determine how this is converted to
   * markup.
   */
  _defineSchema() {
    // Schemas are registered via the central `editor` object.
    const schema = this.editor.model.schema;

    schema.register("ckeditorTemplates", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
    });

    schema.register("ckeditorTemplateContent", {
      isLimit: true,
      allowIn: 'ckeditorTemplates',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      // Disallow ckeditorTemplates inside ckeditorTemplates.
      if (
        context.endsWith("ckeditorTemplateContent") &&
        childDefinition.name === "ckeditorTemplates"
      ) {
        return false;
      }
    });
  }
  /**
   * Converters determine how CKEditor 5 models are converted into markup and
   * vice-versa.
   */
  _defineConverters() {
    // Converters are registered via the central editor object.
    const { conversion } = this.editor;

    conversion.for("upcast").elementToElement({
      model: "ckeditorTemplates",
      view: {
        name: "section",
        classes: "ckeditor-template-wrapper",
      },
    });

    conversion.for("upcast").elementToElement({
      model: "ckeditorTemplateContent",
      view: {
        name: "div",
        classes: "ckeditor-template-content",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "ckeditorTemplates",
      view: {
        name: "section",
        classes: "ckeditor-template-wrapper",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "ckeditorTemplateContent",
      view: {
        name: "div",
        classes: "ckeditor-template-content",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "ckeditorTemplates",
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement("section", {
          class: "ckeditor-template-wrapper",
        });

        return toWidget(section, viewWriter, {
          label: "Ckeditor template widget",
        });
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "ckeditorTemplateContent",
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement("div", {
          class: "ckeditor-template-content",
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}
