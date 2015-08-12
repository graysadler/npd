<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 $total_row = $view->row_index;
 $half = $total_row/2;
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<div class="row pt-20">

	<div class="col-sm-4 col-sm-offset-2">	
	<?php foreach ($rows as $id => $row): ?>
		<?php if($id<=$half): ?>
		  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
			<?php print $row; ?>
		  </div>		
		<?php endif;?>
	<?php endforeach; ?>
	</div>
	<div class="col-sm-4">	
	<?php foreach ($rows as $id => $row): ?>
		<?php if($id>$half): ?>
		  <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
			<?php print $row; ?>
		  </div>		
		<?php endif;?>
	<?php endforeach; ?>
	</div>

</div>