<div class="container" data-anim-type="bounce-in-up" data-anim-delay="0">
    <!-- Footer Text -->
    <div class="footer-text">
      <?php print variable_get('text_footer', ''); ?>
    </div>
    <!-- End Footer Text -->

    <!-- Social Links -->
    <div class="footer-social-links">
      <div class="social-links tooltip-bot" data-original-title="" title="">
        <?php if (isset($social)): ?>
          <?php foreach ($social as $key => $data): ?>
            <?php
              $icon = $data[1];
              $icon = explode('|', $icon);
              $element = array(
                '#theme' => 'icon',
                '#bundle' => $icon[0],
                '#icon' => $icon[1],
              );
            ?>
            <a href="<?php print $data[0]; ?>" target="_blank"><?php print drupal_render($element); ?></a>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </div>
    <!-- End Social Links -->

</div>