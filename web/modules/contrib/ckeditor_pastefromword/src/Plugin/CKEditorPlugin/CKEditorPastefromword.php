<?php

namespace Drupal\ckeditor_pastefromword\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "Pastefromword" plugin.
 *
 * @CKEditorPlugin(
 *   id = "pastefromword",
 *   label = @Translation("Pastefromword")
 * )
 */
class CKEditorPastefromword extends CKEditorPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    if (\Drupal::moduleHandler()->moduleExists('libraries')) {
      return libraries_get_path('pastefromword') . '/plugin.js';
    }
    return 'libraries/ckeditor/plugins/pastefromword/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    $path = drupal_get_path('module', 'ckeditor_pastefromword') . '/icons';
    return [
      'Pastefromword' => [
        'label' => t('Pastefromword'),
        'image' => $path . '/pastefromword.png',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

}
