<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 //dsm($view);
$total_row = $view->row_index;
$half = $total_row/2;
$picture= "sites/all/themes/md_bigstream/img/promo-2.png";
if (variable_get('service_alt_img', 0) != 0){
  $file = file_load(variable_get('service_alt_img', 0));
  $picture = file_create_url($file->uri);
}
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

	
	
	
<div class="col-sm-6 col-md-3 col-lg-3">	
<?php foreach ($rows as $id => $row): ?>
	<?php if($id<=$half): ?>
	  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
		<?php print $row; ?>
	  </div>		
	<?php endif;?>
<?php endforeach; ?>
</div>
<div class="col-md-6 col-lg-6 hidden-xs hidden-sm">	
	<div class="alt-services-image animate-init" data-anim-type="fade-in-up" data-anim-delay="200">
		<img src="<?php echo $picture; ?>" alt="" />
	</div>	
</div>
<div class="col-sm-6 col-md-3 col-lg-3">	
<?php foreach ($rows as $id => $row): ?>
	<?php if($id>$half): ?>
	  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
		<?php print $row; ?>
	  </div>		
	<?php endif;?>
<?php endforeach; ?>
</div>