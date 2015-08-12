<?php

/**
 * @file
 * Theme settings .
 */

function md_bigstream_theme_settings_design(&$form, &$form_state) {
  global $base_url;
  $theme_default = variable_get('theme_default');

  $form['md_bigstream_settings']['design'] = array(
    '#type' => 'fieldset',
    '#weight' => -4,
    '#prefix' => '<div id="md-design" class="md-tabcontent clearfix">',
    '#suffix' => '</div><!-- / #md-design -->',
  );

  $form['md_bigstream_settings']['design']['design_htmllist'] = array(
    '#markup' => '<div id="md-content-sidebar" class="md-content-sidebar">
                        <ul class="clearfix">
                            <li><a href="#ds-skin"><i class="fa-list-ul icon fa"></i>Color Skin</a></li>
                            <li><a href="#ds-preloader"><i class="fa-refresh icon fa"></i>Preloader</a></li>
                            <li><a href="#ds-menu"><i class="fa-list-ul icon fa"></i>Menu</a></li>
                            <li><a href="#ds-contact"><i class="fa-list-ul icon fa"></i>Contact</a></li>
                        </ul>
                    </div><!-- /.md-content-sidebar -->
                    <div class="md-content-main">',
    '#weight' => -15,
  );
  $form['md_bigstream_settings']['design']['design_htmllistclose'] = array(
    '#markup' => '</div><!-- /.md-listleft -->',
    '#weight' => 15,
  );
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////// Color Skin //////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  $form['md_bigstream_settings']['design']['ds_skin'] = array(
    '#type' => 'fieldset',
    '#weight' => 1,
    '#prefix' => '<div id="ds-skin"><div class="md-tabcontent-row">',
    '#suffix' => '    </div></div><!-- / #ds-general -->',
  );
  $form['md_bigstream_settings']['design']['ds_skin']['skin_color'] = array(
    '#type' => 'select',
    '#title' => t('Choose Skin Color'),
    '#default_value' => theme_get_setting('skin_color'),
    '#options' => array(
      'none' => t('Red (Default)'),
      'red-extra' => t('Red Extra'),
      'black' => t('Black'),
      'blue' => t('Blue'),
      'blue-extra' => t('Blue Extra'),
      'brown' => t('Brown'),
      'brown-extra' => t('Brown Extra'),
      'cyan' => t('Cyan'),
      'green' => t('Green'),
      'orange' => t('Orange'),
      'pink' => t('Pink'),
      'purple' => t('Purple'),
      'purple-extra' => t('Purple Extra'),
      'yellow' => t('Yellow'),
      'azure' => t('Azure'),

    ),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<h3 class="md-tabcontent-title">Menu Settings</h3><div class="form-group" style="margin-bottom: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );
  //////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// Preloader //////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  $form['md_bigstream_settings']['design']['ds_preloader'] = array(
    '#type' => 'fieldset',
    '#weight' => 1,
    '#prefix' => '<div id="ds-preloader"><div class="md-tabcontent-row">',
    '#suffix' => '    </div></div><!-- / #ds-general -->',
  );
  $form['md_bigstream_settings']['design']['ds_preloader']['preload'] = array(
    '#type' => 'checkbox',
    '#field_suffix' => '<label class="label-checkbox" for="edit-preload' . '">' . t('Enable Preload') . '</label>',
    '#attributes' => array(
      'class' => array('input-checkbox')
    ),
    '#prefix' => '<div class="form-group">',
    '#suffix' => '</div>',
    '#default_value' => theme_get_setting('preload'),
  );
  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// Menu //////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  $form['md_bigstream_settings']['design']['ds_menu'] = array(
    '#type' => 'fieldset',
    '#weight' => 1,
    '#prefix' => '<div id="ds-menu"><div class="md-tabcontent-row">',
    '#suffix' => '</div></div><!-- / #ds-general -->',
  );
  // select menu type
  $form['md_bigstream_settings']['design']['ds_menu']['menu_type'] = array(
    '#type' => 'select',
    '#title' => t('Choose menu type'),
    '#default_value' => theme_get_setting('menu_type'),
    '#options' => array(
      'vertical' => t('Menu vertical'),
      'horizontal' => t('Menu horizontal'),
    ),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<h3 class="md-tabcontent-title">Setting menu</h3><div class="form-group" style="margin-bottom: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );
  //  if menu Menu vertical -> show menu position
  $form['md_bigstream_settings']['design']['ds_menu']['menu_vertical'] = array(
    '#type' => 'container',
    '#states' => array(
      'visible' => array(
        ':input[name="menu_type"]' => array('value' => 'vertical')
      )
    )
  );
  //  if menu Menu horizontal -> show menu position
  $form['md_bigstream_settings']['design']['ds_menu']['menu_horizontal'] = array(
    '#type' => 'container',
    '#states' => array(
      'visible' => array(
        ':input[name="menu_type"]' => array('value' => 'horizontal')
      )
    )
  );
  // Position menu vertical
  $form['md_bigstream_settings']['design']['ds_menu']['menu_vertical']['menu_location'] = array(
    '#type' => 'select',
    '#default_value' => theme_get_setting('menu_location'),
    '#options' => array(
      'menu-vertical-left' => t('Left'),
      'menu-vertical-right' => t('Right'),
    ),
    '#title' => t('Choose location menu'),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<div class="form-group" style="margin-top: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );
  // Skin menu
  $form['md_bigstream_settings']['design']['ds_menu']['menu_horizontal']['menu_skin'] = array(
    '#type' => 'select',
    '#default_value' => theme_get_setting('menu_skin'),
    '#options' => array(
      'bg-dark' => t('Dark'),
      'bg-gray-lighter' => t('Light'),
    ),
    '#title' => t('Choose skin menu'),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<div class="form-group" style="margin-top: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );
  // menu position
  $form['md_bigstream_settings']['design']['ds_menu']['menu_horizontal']['menu_position'] = array(
    '#type' => 'select',
    '#default_value' => theme_get_setting('menu_position'),
    '#options' => array(
      'scroll' => t('Scroll'),
      'fixed' => t('Fixed'),
    ),
    '#title' => t('Choose menu position'),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<div class="form-group" style="margin-top: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );
  //  if menu Menu horizontal -> show menu position
  $form['md_bigstream_settings']['design']['ds_menu']['menu_horizontal']['menu_fixed'] = array(
    '#type' => 'container',
    '#states' => array(
      'visible' => array(
        ':input[name="menu_position"]' => array('value' => 'fixed')
      )
    )
  );
  // menu position
  $form['md_bigstream_settings']['design']['ds_menu']['menu_horizontal']['menu_fixed']['menu_wrapper'] = array(
    '#type' => 'select',
    '#default_value' => theme_get_setting('menu_wrapper'),
    '#options' => array(
      'full-wrapper' => t('Full'),
      'container' => t('Container'),
    ),
    '#title' => t('Choose menu Wrapper'),
    '#attributes' => array(
      'class' => array('select')
    ),
    '#prefix' => '<div class="form-group" style="margin-top: 0">',
    '#suffix' => '</div>',
    '#field_prefix' => '<div class="md-selection medium">',
    '#field_suffix' => '</div>'
  );

  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////// Custom Address ////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  $form['md_bigstream_settings']['design']['info_contact'] = array(
    '#type' => 'fieldset',
    '#weight' => 1,
    '#prefix' => '<div id="ds-contact"><div class="md-tabcontent-row">',
    '#suffix' => '    </div></div><!-- / #ds-general -->',
  );
  if (module_exists('icon')) {
    $icon_bundles = icon_bundles();
    $icons = array();
    foreach ($icon_bundles as $bundles) {
      $icons[] = md_icon_bundle_list($bundles);
    }
    $address_defaul = theme_get_setting('address_info')
      ? theme_get_setting('address_info')
      : 'icon fontello icon-phone,||,font_icon|icon-phone,||,Call Us,||,0307-567-890,||';
    $markup = '<ul id="sortable">
                    <li class="icon-sort" id="li-0">
                      <div class="toolbar">
                          <a class="delete-icon" href="#">Delete</a>
                          <a class="clone-icon" href="#">Clone</a>
                      </div>
                      <div class="wrap-icon">
                      </div>
                    </li>
                  </ul>';
    $form_popup = '<div class="form-popup">
                    <ul >
                      <li><div class="choose-icon" data-value="font_icon|icon-glyph">Choose Icon<a href="#"><i class="icon fontello icon-glyph"></i></a></div></li>
                      <li><label>Enter Title</label><input class="form-text icon-title" type="text" name="title-icon" value="" /></li>
                      <li><label>Enter Text</label><input class="form-text icon-text" type="text" name="text-icon" value="" /></li>
                    </ul>
                  </div>';
    $form['md_bigstream_settings']['design']['info_contact'] = array(
      '#type' => 'fieldset',
      '#weight' => 1,
      '#prefix' => '<div id="ds-contact"><div class="md-tabcontent-row">',
      '#suffix' => '    </div></div><!-- / #ds-general -->',
    );
    $form['md_bigstream_settings']['design']['info_contact']['markup'] = array(
      '#type' => 'markup',
      '#markup' => '<div>Shit</div>',
    );
    $form['md_bigstream_settings']['design']['info_contact']['address_info'] = array(
      '#type' => 'hidden',
      '#default_value' => theme_get_setting('address_info'),
      '#attributes' => array(
        'class' => array('icon-footer')
      )
    );
    $form['md_bigstream_settings']['design']['info_contact']['popup_icon'] = array(
      '#type' => 'markup',
      '#markup' => '<div class="icon-popup">' . drupal_render($icons) . '</div>',
      '#prefix' => '<div class="form-group" style="margin-top: 0">',
      '#suffix' => '</div>',
    );
    $form['md_bigstream_settings']['design']['info_contact']['popup_form'] = array(
      '#type' => 'markup',
      '#prefix' => '<div class="form-group" style="margin-top: 0">',
      '#suffix' => '</div>',
      '#markup' => $form_popup
    );
    $form['md_bigstream_settings']['design']['info_contact']['markup'] = array(
      '#type' => 'markup',
      '#markup' => $markup,
    );
  }
  else{
    $form['md_bigstream_settings']['design']['info_contact']['markup'] = array(
      '#type' => 'markup',
      '#markup' => '<div>You need enable module Icon</div>',
    );
  }
}
