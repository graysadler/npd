<?php if ($menu_type == 'horizontal'): ?>
  <nav class="main-nav <?php print $menu_type . ' ' . $skin_menu . ' ' . $stick_fixed; ?>">
  <div class="full-wrapper menu-horizontal relative clearfix">
<?php else: ?>
  <div class="nav-bar-compact <?php print $menu_type . ' ' . $position  ; ?> clearfix">
<?php endif ?>

<?php if ($logo): ?>
  <div class="nbc-logo-wrap local-scroll">
    <a class="nbc-logo" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="logo">
      <img width="80" height="27" src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
    </a>
  </div>
<?php endif; ?>

<?php if ($site_name || $site_slogan): ?>
  <div id="name-and-slogan"<?php if ($hide_site_name && $hide_site_slogan) { print ' class="element-invisible"'; } ?>>

    <?php if ($site_name): ?>
      <?php if ($title): ?>
        <div id="site-name"<?php if ($hide_site_name) { print ' class="element-invisible"'; } ?>>
          <strong>
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
          </strong>
        </div>
      <?php else: /* Use h1 when the content title is empty */ ?>
        <h1 id="site-name"<?php if ($hide_site_name) { print ' class="element-invisible"'; } ?>>
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
        </h1>
      <?php endif; ?>
    <?php endif; ?>

    <?php if ($site_slogan): ?>
      <div id="site-slogan"<?php if ($hide_site_slogan) { print ' class="element-invisible"'; } ?>>
        <?php print $site_slogan; ?>
      </div>
    <?php endif; ?>

  </div> <!-- /#name-and-slogan -->
<?php endif; ?>

<?php if ($menu_type == 'horizontal'): ?>
  <div class="mobile-nav"><i class="fa fa-bars"></i></div>
<?php else: ?>
  <div class="nbc-menu-button"><i class="nbc-menu-icon"></i></div>
<?php endif ?>

<?php if (!empty($primary_nav)): ?>
  <?php print render($primary_nav); ?>
<?php endif; ?>

<?php if ($menu_type == 'horizontal'): ?>
  </div></nav>
<?php else: ?>
  </div>
<?php endif ?>