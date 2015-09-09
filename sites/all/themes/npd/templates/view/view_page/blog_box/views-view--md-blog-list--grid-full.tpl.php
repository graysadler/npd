<?php

/**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
 global $base_url;
?>
<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <?php if ($exposed): ?>
    <div class="view-filters">
      <?php print $exposed; ?>
    </div>
  <?php endif; ?>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <div class="view-content">
		<!-- Prev Link -->
		<a href="#" data-type="pager-previous" class="lp-item blog-link ext-link">

			<!-- This is the blank image with size similar to blog's preview images -->
			<img src="<?php print $base_url.'/sites/all/themes/md_bigstream/img/blog-link-height.png' ?>" alt="">

			<div class="bl-text js-height-parent">
				<div class="bl-text-sub">

					<div class="bl-icon">
						<i class="fa fa-angle-left"></i>
					</div>

					<div class="bl-line-1">
						Go to the
					</div>

					<div class="bl-line-2">
						Previous Page
					</div>

				</div>
			</div>

		</a>
		<!-- End Prev Link -->
      <?php print $rows; ?>
		<!-- Next Link -->
		<a href="" data-type="pager-next" class="lp-item blog-link ext-link">

			<!-- This is the blank image with size similar to blog's preview images -->
			<img src="<?php print $base_url.'/sites/all/themes/md_bigstream/img/blog-link-height.png' ?>" alt="">
			
			<div class="bl-text js-height-parent">
				<div class="bl-text-sub">
					
					<div class="bl-icon">
						<i class="fa fa-angle-right"></i>
					</div>
					
					<div class="bl-line-1">
						Go to the
					</div>
					
					<div class="bl-line-2">
						Next Page
					</div>
					
				</div>
			</div>
			
		</a>
		<!-- End Next Link -->
	  
    </div>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div><?php /* class view */ ?>