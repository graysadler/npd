<?php
/**
 * @file
 * Default theme implementation to display a block.
 *
 * Available variables:
 * - $block->subject: Block title.
 * - $content: Block content.
 * - $block->module: Module that generated the block.
 * - $block->delta: An ID for the block, unique within each module.
 * - $block->region: The block region embedding the current block.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - block: The current template type, i.e., "theming hook".
 *   - block-[module]: The module generating the block. For example, the user
 *     module is responsible for handling the default user navigation block. In
 *     that case the class would be 'block-user'.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Helper variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $block_zebra: Outputs 'odd' and 'even' dependent on each block region.
 * - $zebra: Same output as $block_zebra but independent of any block region.
 * - $block_id: Counter dependent on each block region.
 * - $id: Same output as $block_id but independent of any block region.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 * - $block_html_id: A valid HTML ID and guaranteed unique.
 *
 * @see bootstrap_preprocess_block()
 * @see template_preprocess()
 * @see template_preprocess_block()
 * @see bootstrap_process_block()
 * @see template_process()
 *
 * @ingroup themeable
 */
//dsm($block);
?>

<?php if ($block->delta == 'md_service-block'): ?>
  <section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>" <?php print $attributes; ?>>
    <?php print render($title_prefix); ?>

    <div class="clearfix relative">
      <!-- Section Headings -->
      <div class="split-section-headings animate-init"
           data-anim-type="fade-in-up" data-anim-delay="100">
        <div class="ssh-table">
          <div
            class="ssh-cell pt-140 pt-sm-70 pt-xs-50 pb-140 pb-sm-70 pb-xs-50">
            <?php print render($title_suffix); ?>
            <?php if ($block->subject): ?>
              <div class="section-title white">
                <?php print $block->subject; ?>
              </div>
            <?php endif; ?>
            <?php if (isset($block_config['sub_title'])): ?>
              <h2 class="section-heading white">
                <?php print $block_config['sub_title']; ?>
              </h2>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <!-- End Section Headings -->
      <!-- Section Content -->
      <div class="split-section-content service-grid clearfix">
        <?php print $content ?>
      </div>
    </div>
  </section>
  
<?php elseif ($block->delta == 'md_portfolio-picture' || $block->delta == 'md_portfolio-content' || $block->delta == 'md_portfolio-ajax'): ?>
  <section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>">
    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>
    <div class="relative">
      <!-- Section Headings -->
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
            <?php if ($block->subject): ?>
              <div class="section-title">
                <?php print $block->subject; ?><span class="st-point">.</span>
              </div>
              <?php if (isset($block_config['sub_title'])): ?>
                <h2
                  class="section-heading"><?php print $block_config['sub_title']; ?></h2>
              <?php endif; ?>
              <div class="section-line mb-60 mb-xxs-30"></div>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <!-- End Section Headings -->

      <?php print $content; ?>
    </div>
  </section>
  
<?php elseif ($block->delta == 'md_testimonial-block'): ?>
  <!-- Testimonial Section -->
  <section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>" <?php print $attributes; ?>>
    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>
    <div class="container relative">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <!-- Section Icon -->
          <div class="section-icon color">
            <span class="icon-bubbles"></span>
          </div>
          <!-- Section Title -->
          <?php if ($block->subject): ?>
            <h3 class="small-title"><span
                class="serif"><?php print $block->subject ?></span> say:</h3>
          <?php endif; ?>
          <div class="section-line mt-20 mb-30"></div>
          <?php print $content ?>
        </div>
      </div>

    </div>
  </section>
  <!-- End Testimonial Section -->
  
<?php elseif ($block->delta == 'md_client_logo-block'): ?>
  <!-- Logotypes Section -->
  <section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>" <?php print $attributes; ?>>
    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>
    <div class="container relative">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <?php print $content ?>
        </div>
      </div>
    </div>
  </section>
  
<?php elseif (isset($block_section) && $block_section == 1) : ?>
  <section id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <?php if (isset($overlay)): ?>
      <div class="section-overlay"
           style="background-color: <?php print $block_config['bg_overlay']; ?>"></div>
    <?php endif; ?>
    <?php print render($title_prefix); ?>
    <?php print render($title_suffix); ?>
    <div class="relative">
      <!-- Section Headings -->
	  <?php if ($block->subject): ?>
      <div class="container">
        <div class="row">         
          <div class="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
            <div class="section-title">
              <?php print $block->subject; ?>
              <span class="st-point">.</span>
            </div>
            <?php if (isset($block_config['sub_title'])): ?>
            <h2 class="section-heading"><?php print $block_config['sub_title']; ?></h2>
            <?php endif; ?>
			<div class="section-line mb-60 mb-xxs-30"></div>
          </div>
        </div>
      </div>
      <?php endif; ?>
	  <?php print $content ?>
    </div>
  </section>
  
<?php elseif (isset($block_section) && $block_section == 0) : ?>
  <div id="<?php print $block_html_id; ?>" class="widget <?php print $classes; ?>">
    <?php print render($title_prefix); ?>
    <?php if ($block->subject): ?>
      <h5 class="widget-title"><?php print $block->subject ?></h5>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <div class="widget-body">
      <?php print $content ?>
    </div>
  </div>
  
<?php else: ?>
  <div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <?php print render($title_prefix); ?>
    <?php if ($block->subject): ?>
      <h2<?php print $title_attributes; ?>><?php print $block->subject ?></h2>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <div class="content"<?php print $content_attributes; ?>>
      <?php print $content ?>
    </div>
  </div>
<?php endif; ?>
