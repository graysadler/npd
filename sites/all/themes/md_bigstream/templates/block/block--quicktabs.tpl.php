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
 * @see template_preprocess()
 * @see template_preprocess_block()
 * @see template_process()
 *
 * @ingroup themeable
 */
if (variable_get('about_us_img', 0) != 0) {
  $file = file_load(variable_get('about_us_img', 0));
  $picture = file_create_url($file->uri);
}

?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
   <?php if (isset($overlay)): ?>
    <div class="section-overlay" style="background-color: <?php print $block_config['bg_overlay']; ?>"></div>
  <?php endif; ?>
  <?php print render($title_prefix); ?>
  <?php print render($title_suffix); ?>

   <div class="container relative">
      <!-- Section Headings -->
    <?php if ($block->subject): ?>
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
      <?php endif; ?>
    <?php print $content ?>


    <!-- Devices Image -->
    <div class="section-bot-image animate-init slow-mo" data-anim-type="flip-in-bottom-front" data-anim-delay="0">
      <img src="<?php if(isset($picture)) print $picture; ?>" alt="" />
    </div>
    <!-- End Devices Image -->
    </div>
</div>
