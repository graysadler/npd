<?php if (user_is_logged_in()): ?>
	<div class="align-center">
		<?php print drupal_render($form['submit']); ?>
		<?php print drupal_render_children($form); ?>
	</div>
<?php else: ?>
	<div class="col-md-6 col-lg-4 col-lg-offset-2 banner-text">
	  <?php print drupal_render($form['mail']); ?>
	</div>
	<div class="col-md-6 col-lg-4 banner-button pt-xs-0">
	  <?php print drupal_render($form['submit']); ?>
	</div>
	<?php print drupal_render_children($form); ?>
<?php endif;?>