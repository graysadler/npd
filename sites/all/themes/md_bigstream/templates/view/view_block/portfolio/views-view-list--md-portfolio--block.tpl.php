<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<?php print $wrapper_prefix; ?>
  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>
	<ul id="work-grid" class="<?php print ($view->style_plugin->options['class']); ?>">
		<?php foreach ($rows as $id => $row): ?>

			<?php $class_filter = '' ?>
			<?php foreach ($view->result[$id]->field_field_work_categories as $value): ?>
				<?php $class_filter .= ' ' . strtr($value['rendered']['#markup'], ' ', '-'); ?>
			<?php endforeach; ?>

		  <li class="<?php print $classes_array[$id]; ?><?php print $class_filter; ?>"><?php print $row; ?></li>
		<?php endforeach; ?>
	</ul>
<?php print $wrapper_suffix; ?>
