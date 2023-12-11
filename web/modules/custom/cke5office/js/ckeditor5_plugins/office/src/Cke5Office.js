import { Plugin } from 'ckeditor5/src/core';
import { Cke5OfficeCore } from './Cke5OfficeCore';

/**
 * @internal
 */
export class Cke5Office extends Plugin {
  static get requires() {
    return [ Cke5OfficeCore ];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'Cke5Office';
  }

}
