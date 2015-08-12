<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
 //dsm($fields)
 //dsm($row)
?>


<!-- Title Section -->
<section class="small-section bg-dark-lighter" id="project-1">
	<div class="container relative">
		
		<!-- Headings -->
		<div class="row">
			<div class="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
				
				<?php print $fields['title']->content; ?>
				
				<?php print $fields['field_work_categories']->content; ?>
				
			</div>
		</div>
		<!-- End Headings -->
		
	</div>
</section>
<!-- End Title Section -->


<!-- Fullwidth Slider -->
<?php if(isset($row->field_field_mutimedia) && count($row->field_field_mutimedia) == 1): ?>
	<?php if($row->field_field_mutimedia[0]['rendered']['#bundle'] == 'image'): ?>
		<section class="page-section bg-scroll fixed-height-medium" data-background="<?php print file_create_url($row->field_field_mutimedia[0]['rendered']['#file']->uri); ?>"></section>
	<?php else: ?>
		<section class="page-section bg-scroll fixed-height-medium" data-background="<?php print file_create_url($row->field_field_image[0]['rendered']['#item']['uri']); ?>"></section>
	<?php endif ?>	
<?php elseif(isset($row->field_field_mutimedia)): ?>	
	<div class="fullwidth-slider owl-carousel bg-dark">
		<?php $i=0; ?>
		<?php foreach ($row->field_field_mutimedia as $value): ?>
			<?php if($value['rendered']['#bundle'] == 'image'): ?>
				<?php $i++; ?>
				<section class="page-section bg-scroll fixed-height-medium" data-background="<?php print file_create_url($value['rendered']['#file']->uri); ?>"></section>
			<?php endif ?>
		<?php endforeach; ?>		
		<?php if($i==0): ?>
			<section class="page-section bg-scroll fixed-height-medium" data-background="<?php print file_create_url($row->field_field_image[0]['rendered']['#item']['uri']); ?>"></section>
		<?php endif ?>
	</div>
<!-- End Fullwidth Slider -->
<?php endif; ?>