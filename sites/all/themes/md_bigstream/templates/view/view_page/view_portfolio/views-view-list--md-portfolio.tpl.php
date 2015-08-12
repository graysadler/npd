<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
 //dsm($view)
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
	
      <li class="<?php print $classes_array[$id]; ?><?php print $class_filter; ?>">
		<?php if(!empty($view->result[$id]->field_field_picture[0]['raw']['uri'])): ?>
		<a href="<?php print file_create_url($view->result[$id]->field_field_picture[0]['raw']['uri']); ?>" class="work-lightbox-link mfp-image">
		<?php else: ?>
		<a href="<?php print file_create_url($view->result[$id]->field_field_image[0]['raw']['uri']); ?>" class="work-lightbox-link mfp-image">
		<?php endif; ?>
			<div class="work-img">
				<img src="<?php print file_create_url($view->result[$id]->field_field_image[0]['raw']['uri']); ?>" alt="Work" />
			</div>
			<div class="work-intro">
				<h3 class="work-title"><?php print ($view->result[$id]->node_title); ?></h3>
				<?php if (!empty($view->result[$id]->field_field_subtitle)) : ?>
					<div class="work-descr">
						<?php print ($view->result[$id]->field_field_subtitle[0]['raw']['value']); ?>
					</div>
				<?php endif; ?>
			</div>
		</a>
		
	  </li>
    <?php endforeach; ?>
  </ul>
 <?php print $wrapper_suffix; ?> 
