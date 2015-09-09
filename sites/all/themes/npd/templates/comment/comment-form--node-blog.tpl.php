<?php
unset($form['author']['name']['#theme_wrappers']);
unset($form['author']['mail']['#theme_wrappers']);
unset($form['author']['homepage']['#theme_wrappers']);
unset($form['comment_body']['und'][0]['value']['#theme_wrappers']);
?>
<div class="row mb-20 mb-md-10">
  <div class="col-md-6 mb-md-10">
    <?php print drupal_render($form['author']['name']); ?>
  </div>
  <div class="col-md-6">
    <?php print drupal_render($form['author']['mail']); ?>
  </div>
</div>
<div class="mb-20 mb-md-10">
  <?php print drupal_render($form['author']['homepage']); ?>
</div>
<div class="mb-30 mb-md-10">
  <?php print drupal_render($form['comment_body']); ?>
</div>
  <!-- Send Button -->
<?php print drupal_render($form['actions']) ?>

<div style="display: none">
  <?php print drupal_render_children($form); ?>
</div>
