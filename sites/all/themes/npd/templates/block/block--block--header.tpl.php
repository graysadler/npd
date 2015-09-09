<?php
/**
 * Created by PhpStorm.
 * User: doidd
 * Date: 25/03/2015
 * Time: 17:32
 */


?>
<!-- Home Section -->
<section id="<?php print $block_html_id  ?>"  class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php if (isset($overlay)): ?>
    <div class="section-overlay" style="background-color: <?php print $block_config['bg_overlay']; ?>"></div>
  <?php endif; ?>
  <div class="js-height-full" id="larger-header">
    <?php if (isset($block_config['enable_video']) && $block_config['enable_video'] == 1):  ?>
      <!-- Video BG Init -->
      <div class="player"
           data-property="{
         videoURL:'<?php print $block_config['video_id'] ?>',
         containment:'#home',
         autoPlay:<?php print $block_config['auto_play']; ?>,
         showControls: <?php print $block_config['show_control']; ?>,
         showYTLogo: false,
         mute:<?php print $block_config['mute'] ?>,
         startAt:0, opacity:1}">
      </div>
      <!-- End Video BG Init -->
    <?php endif; ?>
    <?php if ($block_config['animation'] == 1): ?>
      <!-- Canvas Animation -->
      <canvas id="demo-canvas-<?php print $block_config['animation_value']; ?>"></canvas>
      <!-- End Canvas Animation -->
    <?php endif; ?>
    <!-- Home Page Content -->
    <?php print $content; ?>
    <!-- End Home Page Content -->
  </div>
</section>
<!-- End Home Section -->
