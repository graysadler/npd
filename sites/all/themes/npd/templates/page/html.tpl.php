<!DOCTYPE html>
<html lang="en">
<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php if (isset($ios_144) && $ios_144 != NULL) : ?>
    <link rel="apple-touch-icon-precomposed" sizes="144x144"
          href="<?php print $ios_144; ?>"><?php endif; ?>
  <?php if (isset($ios_114) && $ios_114 != NULL) : ?>
    <link rel="apple-touch-icon-precomposed" sizes="114x114"
          href="<?php print $ios_114; ?>"><?php endif; ?>
  <?php if (isset($ios_72) && $ios_72 != NULL)  : ?>
    <link rel="apple-touch-icon-precomposed" sizes="72x72"
          href="<?php print $ios_72; ?>"><?php endif; ?>
  <?php if (isset($ios_57) && $ios_57 != NULL)  : ?>
    <link rel="apple-touch-icon-precomposed" sizes="57x57"
          href="<?php print $ios_57; ?>"><?php endif; ?>
  <meta name="msapplication-tap-highlight" content="no"/>
  <meta name="viewport" content="user-scalable=0, width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"/>
  <meta name="format-detection" content="telephone=no">
  <?php
    print $styles;
    print $scripts;
    global $base_url;
  ?>
  <style type="text/css">
    <?php if (isset($googlewebfonts)): print $googlewebfonts; endif; ?>
    <?php if (isset($theme_setting_css)): print $theme_setting_css; endif; ?>
    <?php
    // custom typography
    if (isset($typography)): print $typography; endif;
    ?>
    <?php if (isset($custom_css)): print $custom_css; endif; ?>
  </style>
  <!--[if IE]>
  <meta http-equiv="X-UA-Compatible"
        content="IE=9; IE=8; IE=EmulateIE8; IE=EDGE"/>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<body class="<?php print $classes; ?> appear-animate" <?php print $attributes; ?> >
<?php print $preload; ?>
<?php print $page_top; ?>
<?php print $page; ?>
<?php
  print $page_bottom;
  if (isset($footer_code)): print $footer_code;
  endif;
?>
</body>

<?php if (!empty($theme_setting_scripts)): ?>
  <script type="text/javascript">
    <?php print $theme_setting_scripts;?>
  </script>
<?php endif ?>

</html>
