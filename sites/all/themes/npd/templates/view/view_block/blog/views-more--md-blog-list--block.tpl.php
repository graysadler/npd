<?php

/**
 * @file
 * Theme the more link.
 *
 * - $view: The view object.
 * - $more_url: the url for the more link.
 * - $link_text: the text for the more link.
 *
 * @ingroup views_templates
 */
?>


	<a href="<?php print $more_url ?>" class="lp-item blog-link animate-init" data-anim-type="fade-in" data-anim-delay="400">                            
		<!-- This is the blank image with size similar to blog's preview images -->
		<img src="<?php echo $GLOBALS['base_url'].'/sites/default/files/blog-link-height.png' ?>" alt="" />
		
		<div class="bl-text js-height-parent">
			<div class="bl-text-sub">
				
				<div class="bl-icon">
					<i class="fa fa-angle-right"></i>
				</div>
				
				<div class="bl-line-1">
					See more
				</div>
				
				<div class="bl-line-2">
					in <span class="serif">Our Blog</span>
				</div>
				
			</div>
		</div>
		
	</a> 

