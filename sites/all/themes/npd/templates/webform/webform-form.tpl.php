<?php

/**
 * @file
 * Customize the display of a complete webform.
 *
 * This file may be renamed "webform-form-[nid].tpl.php" to target a specific
 * webform on your site. Or you can leave it "webform-form.tpl.php" to affect
 * all webforms on your site.
 *
 * Available variables:
 * - $form: The complete form array.
 * - $nid: The node ID of the Webform.
 *
 * The $form array contains two main pieces:
 * - $form['submitted']: The main content of the user-created form.
 * - $form['details']: Internal information stored by Webform.
 *
 * If a preview is enabled, these keys will be available on the preview page:
 * - $form['preview_message']: The preview message renderable.
 * - $form['preview']: A renderable representing the entire submission preview.
 */
?>

<div class="container">
  <div class="row">
    <!-- Contact Info -->
    <div class="col-md-4">
      <?php foreach ($info as $key => $value): ?>
        <div class="contact-item mb-40 mb-md-20">
          <!-- Icon -->
          <div class="ci-icon">
            <i class="<?php print $value[0] ?>"></i>
          </div>
          <div class="ci-title"><?php print $value[2]; ?></div>
          <div class="ci-text"><?php print $value[3]; ?></div>
        </div>

      <?php endforeach; ?>
    </div>
    <!-- End Contact Info -->


    <div class="contact-form col-md-7 col-md-offset-1">
        <div class="clearfix mb-20 mb-xs-0">
          <div class="cf-left-col">
            <?php print drupal_render($form['submitted']['name']); ?>
            <?php print drupal_render($form['submitted']['email']); ?>
          </div>

          <div class="cf-right-col">
            <?php print drupal_render($form['submitted']['message']); ?>
          </div>

        </div>

        <!-- Send Button -->
        <?php print drupal_render($form['actions']); ?>
        <div id="result"></div>
    </div>

  </div>

</div>


<?php
// Print out the progress bar at the top of the page
print drupal_render($form['progressbar']);

// Print out the preview message if on the preview page.
if (isset($form['preview_message'])) {
  print '<div class="messages warning">';
  print drupal_render($form['preview_message']);
  print '</div>';
}

// Print out the main part of the form.
// Feel free to break this up and move the pieces within the array.
print drupal_render($form['submitted']);

// Always print out the entire $form. This renders the remaining pieces of the
// form that haven't yet been rendered above (buttons, hidden elements, etc).
print drupal_render_children($form);
