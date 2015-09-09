<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 //dsm($view)
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<!-- Works Filter -->

		<a href="#" class="filter active" data-filter="*">All</a>
		<?php foreach ($rows as $id => $row): ?>
		   <a class="<?php print $classes_array[$id]; ?>" data-filter=".<?php print strtr($view->result[$id]->taxonomy_term_data_name,' ','-'); ?>"><?php print $view->result[$id]->taxonomy_term_data_name; ?></a>
		<?php endforeach; ?>