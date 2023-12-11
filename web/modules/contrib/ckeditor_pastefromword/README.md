CKEditor Pastefromword
====================

INTRODUCTION
------------

This module integrates the [pastefromword](
https://ckeditor.com/cke4/addon/pastefromword) CKEditor plugin for Drupal 8.



This plugin allows you to paste content from Microsoft Word and maintain original content formatting. It also adds the Paste from Word toolbar button which makes it possible to paste clipboard data this way only on demand.

Note: This feature was rewritten from scratch in CKEditor 4.6 and is now greatly improved when compared with previous versions in:

    Preservation of list numbering, styling and indentation (for example, nested lists with multiple levels, with different styling or custom list markers).
    Document structure parsing that fixes plenty of issues with distorted or missing content after paste.
    Smarter inline formatting, including preserving text or background color.
    Handling hotlinked images.
    Tight integration with Advanced Content Filter to efficiently adjust formatting coming from Word to what is allowed in a particular editor configuration.
    Clean and valid HTML markup.

The following configuration options are currently provided by this plugin:

    CKEDITOR.config.pasteFromWordRemoveFontStyles (to be soon deprecated in favor of Advanced Content Filter)
    CKEDITOR.config.pasteFromWordCleanupFile
    CKEDITOR.config.pasteFromWordPromptCleanup

For CKEditor versions older than 4.6 the following options were available, too:

    CKEDITOR.config.pasteFromWordNumberedHeadingToList
    CKEDITOR.config.pasteFromWordRemoveStyles


REQUIREMENTS
------------

* CKEditor Module (Core)


INSTALLATION
------------

### Install via Composer (recommended)

If you use Composer to manage dependencies, edit composer.json as follows.

* Run `composer require --prefer-dist composer/installers` to ensure you have
the composer/installers package. This facilitates installation into directories
other than vendor using Composer.

* In composer.json, make sure the "installer-paths" section in "extras" has an
entry for `type:drupal-library`. For example:

```json
{
  "libraries/{$name}": ["type:drupal-library"]
}
```

* Add the following to the "repositories" section of composer.json:

```json
{
  "type": "package",
  "package": {
    "name": "ckeditor/pastefromword",
    "version": "4.13.0",
    "type": "drupal-library",
    "extra": {
      "installer-name": "ckeditor/plugins/pastefromword"
    },
    "dist": {
      "url": "https://download.ckeditor.com/pastefromword/releases/pastefromword_4.13.0.zip",
      "type": "zip"
    }
  }
}
```

* Run `composer require 'ckeditor/pastefromword:4.13.0'` to download the plugin.

* Run `composer require 'drupal/ckeditor_pastefromword:^1.0.0'` to download the
CKEditor Pastefromword module, and enable it [as per usual](
https://www.drupal.org/docs/8/extending-drupal-8/installing-drupal-8-modules).


### Install Manually

* Download the [pastefromword](https://ckeditor.com/cke4/addon/pastefromword)
CKEditor plugin.

* Extract and place the plugin contents in the following directory:
`/libraries/ckeditor/plugins/pastefromword/`.

* Install the CKEditor Pastefromword module [as per usual](
https://www.drupal.org/docs/8/extending-drupal-8/installing-drupal-8-modules).

MAINTAINERS
-----------
Current maintainers:

 * Julien de Nas de Tourris ([julien](https://www.drupal.org/u/julien))
