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
<?php foreach ($rows as $id => $row): ?>
	<?php $i++ ?>
	<section<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?> <?php print ' data-bg-color="'.$view->result[$id]->field_field_color[0]['rendered']['#markup'].'"' ?> >
	<div class="container relative">                    
        <div class="row">
		
			<?php if(isset($view->result[$id]->field_field_mutimedia)): ?>
				<?php if($i%2!=0):?>
					<div class="col-md-7 col-lg-offset-1">
						<!-- Work Gallery -->
						<div class="work-full-media mt-0 white-shadow">
						<?php if(count($view->result[$id]->field_field_mutimedia) == 1): ?>
							<?php foreach ($view->result[$id]->field_field_mutimedia as $value): ?>
								<?php if($value['rendered']['#file']->type == 'video' || $value['rendered']['#file']->type == 'audio'): ?>
									<?php print render($value['rendered']); ?>
								<?php else:?>
									<img src="<?php print file_create_url($value['rendered']['#file']->uri); ?>" alt="" />
								<?php endif ?>
							<?php endforeach; ?>	
						<?php else:?>
							<ul class="clearlist work-full-slider owl-carousel">					
								<?php foreach ($view->result[$id]->field_field_mutimedia as $value): ?>
									<li>
											<?php if($value['rendered']['#file']->type == 'video' || $value['rendered']['#file']->type == 'audio'): ?>
												<?php print render($value['rendered']); ?>
											<?php else:?>
												<img src="<?php print file_create_url($value['rendered']['#file']->uri); ?>" alt="" />
											<?php endif ?>	
									</li>	
								<?php endforeach; ?>
							</ul>
						<?php endif ?>	
						</div>
						<!-- End Work Gallery -->
					</div>
				<?php endif; ?>	
					<div class="col-md-5 col-lg-4 mb-sm-40">				
						<!-- About Project -->
						<div class="text">
							
							<h3 class="uppercase white mb-30 mb-xxs-10"><?php print $view->result[$id]->node_title; ?></h3>
							<p>
								<?php print $view->result[$id]->field_body[0]['rendered']['#markup']; ?>
							</p>
							
							<div class="mt-40">
								<?php print l('View online', 'node/' . $view->result[$id]->nid, array('html' => 'true', 'attributes' => array('class' =>  array('btn','btn-mod','btn-border-w','btn-medium')))); ?>
							</div>
							
						</div>
						<!-- End About Project -->				
					</div>
				<?php if($i%2==0):?>
					<div class="col-md-7 col-lg-offset-1">					
						<!-- Work Gallery -->
						<div class="work-full-media mt-0 white-shadow">
						<?php if(count($view->result[$id]->field_field_mutimedia) == 1): ?>
							<?php foreach ($view->result[$id]->field_field_mutimedia as $value): ?>
								<?php if($value['rendered']['#file']->type == 'video' || $value['rendered']['#file']->type == 'audio'): ?>
									<?php print render($value['rendered']); ?>
								<?php else:?>
									<img src="<?php print file_create_url($value['rendered']['#file']->uri); ?>" alt="" />
								<?php endif ?>
							<?php endforeach; ?>	
						<?php else:?>
							<ul class="clearlist work-full-slider owl-carousel">					
								<?php foreach ($view->result[$id]->field_field_mutimedia as $value): ?>
									<li>
											<?php if($value['rendered']['#file']->type == 'video' || $value['rendered']['#file']->type == 'audio'): ?>
												<?php print render($value['rendered']); ?>
											<?php else:?>
												<img src="<?php print file_create_url($value['rendered']['#file']->uri); ?>" alt="" />
											<?php endif ?>	
									</li>	
								<?php endforeach; ?>
							</ul>
						<?php endif ?>	
						</div>
						<!-- End Work Gallery -->
					</div>
				<?php endif; ?>
			<?php else:?>		
				<!-- About Project -->
				<div class="text">
					
					<h3 class="uppercase white mb-30 mb-xxs-10"><?php print $view->result[$id]->node_title; ?></h3>
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