<?php

namespace Drupal\collapse_text_xtra\Plugin\CKEditorPlugin;

use Drupal\editor\Entity\Editor;
use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor5\Plugin\CKEditor5Plugin;

/**
 * Defines the "Collapse Text Xtra" plugin.
 *
 * @CKEditorPlugin(
 *   id = "collapsetext",
 *   label = @Translation("CKEditor Collapse Text Xtra"),
 *   module = "collapse_text_xtra"
 * )
 */
class CollapseTextXtra extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return $this->getLibraryPath() . '/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = $this->getLibraryPath();

    return [
      'collapsetext' => [
        'label' => t('Collapse Text'),
        'image' => $path . '/images/collapsetext.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * Get the CKEditor library path.
   *
   * @return string
   *   The library path with support for the Libraries API module.
   */
  protected function getLibraryPath() {
    // Support for "Libraries API" module.
    if (\Drupal::moduleHandler()->moduleExists('libraries')) {
      return libraries_get_path('collapsetext');
    }

    return 'libraries/collapsetext';
  }

}
