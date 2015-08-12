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
	<div class="team-grid">
		<?php foreach ($rows as $id => $row): ?>
		  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>  data-anim-type="fade-in" data-anim-delay="100">
			<?php print $row; ?>
		  </div>
		<?php endforeach; ?>
	</div>
</div>