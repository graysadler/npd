<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<div class="container">
	<div class="item-carousel owl-carousel animate-init" data-anim-type="bounce-in-right-large" data-anim-delay="200">
		<?php foreach ($rows as $id => $row): ?>
		  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
			<?php print $row; ?>
		  </div>
		<?php endforeach; ?>
	</div>
</div>