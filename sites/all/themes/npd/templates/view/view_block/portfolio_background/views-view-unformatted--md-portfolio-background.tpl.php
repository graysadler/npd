<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
 //dsm($view);
 $i=0;
?>
<?php if (!empty($title)): ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>
<div class="fullwidth-slider owl-carousel bg-dark">
	<?php foreach ($rows as $id => $row): ?>
		<?php 
			$i++; 
			$data_background = file_create_url($view->result[$id]->field_field_picture[0]['raw']['uri']);
		?>
		
		<section<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"  data-background="'.$data_background.'"';  } ?>>
		<div class="container relative">                    
			<div class="row">
			
				<?php if(isset($view->result[$id]->field_field_image)): ?>
					<?php if($i%2!=0):?>
						<div class="col-md-7 mb-sm-40">					
							<!-- Work Gallery -->
							<div class="work-full-media mt-0">
								<img src="<?php print file_create_url($view->result[$id]->field_field_image[0]['raw']['uri']); ?>" alt="" />
							</div>
							<!-- End Work Gallery -->
						</div>
						<div class="col-md-5 col-lg-4 col-lg-offset-1">				
							<!-- About Project -->
							<div class="text">
								
								<h3 class="uppercase mb-30 mb-xxs-10"><?php print $view->result[$id]->node_title; ?></h3>
								<p>
									<?php print $view->result[$id]->field_body[0]['rendered']['#markup']; ?>
								</p>
								
								<div class="mt-40">
									<?php print l('View online', $view->result[$id]->field_field_online[0]['raw']['value'], array('html' => 'true', 'attributes' => array('class' =>  array('btn','btn-mod','btn-border-c','btn-medium')))); ?>
								</div>
								
							</div>
							<!-- End About Project -->				
						</div>
					<?php endif; ?>	
					<?php if($i%2==0):?>
						<div class="col-md-7 mb-sm-40">				
							<!-- About Project -->
							<div class="text">
								
								<h3 class="uppercase mb-30 mb-xxs-10"><?php print $view->result[$id]->node_title; ?></h3>
								<p>
									<?php print $view->result[$id]->field_body[0]['rendered']['#markup']; ?>
								</p>
								
								<div class="mt-40">
									<?php print l('View online', 'node/' . $view->result[$id]->nid, array('html' => 'true', 'attributes' => array('class' =>  array('btn','btn-mod','btn-border-c','btn-medium')))); ?>
								</div>
								
							</div>
							<!-- End About Project -->				
						</div>
						<div class="col-md-5 col-lg-4 col-lg-offset-1">					
							<!-- Work Gallery -->
							<div class="work-full-media mt-0">
								<img src="<?php print file_create_url($view->result[$id]->field_field_image[0]['raw']['uri']); ?>" alt="" />
							</div>
							<!-- End Work Gallery -->
						</div>
					<?php endif; ?>
				<?php else:?>		
					<!-- About Project -->
					<div class="text">
						
						<h3 class="uppercase mb-30 mb-xxs-10"><?php print $view->result[$id]->node_title; ?></h3>
						<p>
							<?php print $view->result[$id]->field_body[0]['rendered']['#markup']; ?>
						</p>
						
						<div class="mt-40">
							<?php print l('View online', 'node/' . $view->result[$id]->nid, array('html' => 'true', 'attributes' => array('class' =>  array('btn','btn-mod','btn-border-w','btn-medium')))); ?>
						</div>
						
					</div>
					<!-- End About Project -->	
				<?php endif; ?>	
			</div>
		</div>
	  </section>
	<?php endforeach; ?>
</div>