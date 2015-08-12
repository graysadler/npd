<?php
include_once './' . drupal_get_path('theme', 'md_bigstream') . '/inc/front/html.preprocess.inc';
include_once './' . drupal_get_path('theme', 'md_bigstream') . '/inc/front/page.preprocess.inc';
include_once './' . drupal_get_path('theme', 'md_bigstream') . '/inc/front/function.theme.inc';




/*
	Comment remove Prefix
*/

function md_bigstream_comment_view_alter(&$build) {
  unset($build['#prefix']);
}




/**************************************
 *  Quick tab style in quicktabs.module
 ***************************************/

function md_bigstream_qt_quicktabs_tabset($vars) {
  $variables = array(
    'attributes' => array(
      'class' => 'nav nav-tabs tpl-minimal-tabs animate quicktabs-tabs',
    ),
    'items' => array(),
  );
  foreach (element_children($vars['tabset']['tablinks']) as $key) {
    $item = array();
    if (is_array($vars['tabset']['tablinks'][$key])) {
      $tab = $vars['tabset']['tablinks'][$key];
      if ($key == $vars['tabset']['#options']['active']) {
        $item['class'] = array('active');
      }
      $item['data'] = drupal_render($tab);
      $variables['items'][] = $item;
    }
  }
  return theme('item_list', $variables);
}




/**
 * Implement hook_preprocess_node()
 * @param $vars
 */
function md_bigstream_preprocess_node(&$vars) {
  $view_mode = $vars['view_mode'];
  $content_type = $vars['type'];
  $vars['theme_hook_suggestions'][] = 'node__' . $view_mode;
  $vars['theme_hook_suggestions'][] = 'node__' . $view_mode . '__' . $content_type;
}


/**
 * Implements theme_menu_tree().
 * @param $vars
 * @return string
 */
function md_bigstream_menu_tree($vars) {
  return '<ul class="menu">' . $vars['tree'] . '</ul>';
}

/**
 * Overrides theme_menu_link().
 * @param array $variables
 * @return string
 */
function md_bigstream_menu_link(array $variables) {
  $element = $variables['element'];
  if ($element['#original_link']['menu_name'] == 'main-menu') {
    $sub_menu = '';
    if ($element['#below']) {
      if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
        $sub_menu = drupal_render($element['#below']);
      }

      elseif (!empty($element['#original_link']['depth'])) {
        unset($element['#below']['#theme_wrappers']);
        $sub_menu = '';
        $sub_menu .= '<ul class="menu">' . drupal_render($element['#below']) . '</ul>';
        $element['#localized_options']['html'] = TRUE;
      }
    }

    if ($element['#href'] == '<front>' && isset($element['#localized_options']['fragment'])) {
      $output = l($element['#title'], '/', $element['#localized_options']);
    }
    else {
      $output = l($element['#title'], $element['#href'], $element['#localized_options']);
    }
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
  }
}


function md_bigstream_form_alter(&$form, &$form_state, $form_id) {
  if (($form_id == 'user_login') || ($form_id == 'user_register_form') || ($form_id == 'user_pass')) {
      $form['pass']['#attributes'] = array('class' => array('form-control'));
      $form['actions']['submit']['#attributes'] = array('class' => array('btn','btn-medium','btn-mod'));
  }
  else{
  switch ($form_id) {
      case 'comment_node_blog_form':
        $form['actions']['submit']['#value'] = t('Send Comment');
        $form['actions']['submit']['#attributes']['class'] = array(
          'btn',
          'btn-medium',
          'btn-mod'
        );
        $form['author']['homepage']['#title'] = t('Website');
        unset($form['author']['mail']['#description']);
        break;
      case 'search_form':
        $form['advanced']['submit']['#attributes'] = array('class' => array('btn','btn-medium','btn-mod'));
        break;
      case 'webform_client_form_21':
        $form['submitted']['name']['#attributes']['class'][] = 'ci-field form-control';
        $form['submitted']['email']['#attributes']['class'][] = 'ci-area form-control';
        $form['actions']['submit']['#attributes']['class'] = array(
          'submit_btn',
          'btn',
          'btn-mod',
          'btn-large',
          'btn-full',
          'ci-btn'
        );
        break;
    }
  }
}


/**
 * Implement hook_theme()
 */
function md_bigstream_theme() {
  $themes = array();
  $path = drupal_get_path('theme', 'md_bigstream') . '/templates';
  $themes['comment_form__node_blog'] = array(
    'render element' => 'form',
    'template' => 'comment-form--node-blog',
    'path' => $path . '/comment',
  );
  $themes['simplenews_block_form'] = array(
    'render element' => 'form',
    'template' => 'simplenews-block-form',
    'path' => $path . '/simplenews',
  );
  return $themes;
}

function md_bigstream_css_alter(&$css) {
  if ($GLOBALS['theme'] == 'md_bigstream') {
    $exclude = array(
      'misc/vertical-tabs.css' => FALSE,
      'modules/aggregator/aggregator.css' => FALSE,
      'modules/block/block.css' => FALSE,
      'modules/book/book.css' => FALSE,
      'modules/comment/comment.css' => FALSE,
      'modules/dblog/dblog.css' => FALSE,
      'modules/file/file.css' => FALSE,
      'modules/filter/filter.css' => FALSE,
      'modules/forum/forum.css' => FALSE,
      'modules/help/help.css' => FALSE,
      'modules/menu/menu.css' => FALSE,
      'modules/node/node.css' => FALSE,
      'modules/openid/openid.css' => FALSE,
      'modules/poll/poll.css' => FALSE,
      'modules/profile/profile.css' => FALSE,
      'modules/search/search.css' => FALSE,
      'modules/statistics/statistics.css' => FALSE,
      'modules/syslog/syslog.css' => FALSE,
      'modules/system/admin.css' => FALSE,
      'modules/system/maintenance.css' => FALSE,
      'modules/system/system.css' => FALSE,
      'modules/system/system.admin.css' => FALSE,
      //'modules/system/system.base.css' => FALSE,
      'modules/system/system.maintenance.css' => FALSE,
      'modules/system/system.menus.css' => FALSE,
      'modules/system/system.messages.css' => FALSE,
      'modules/system/system.theme.css' => FALSE,
      'modules/taxonomy/taxonomy.css' => FALSE,
      'modules/tracker/tracker.css' => FALSE,
      'modules/update/update.css' => FALSE,
      'modules/user/user.css' => FALSE,
    );
    $css = array_diff_key($css, $exclude);
  }
}


/**
 * Implement hook_preprocess_simplenews_block_form()
 * @param $vars
 */
function md_bigstream_preprocess_simplenews_block_form(&$vars) {
  $form = $vars['form'];
  $form['mail']['#title_display'] = 'invisible';
  $form['mail']['#atrributes']['placeholder'][] = t('Enter Your Email');
  $form['submit']['#attributes']['class'][] = 'btn btn-mod btn-large';
  $vars['form'] = $form;
}


/**
 * Implement hook_preprocess_webform_form()
 * @param $vars
 */
function md_bigstream_preprocess_webform_form(&$vars) {
  $info = theme_get_setting('address_info');
  $info = explode('||', $info);
  array_pop($info);
  foreach ($info as $key => $value) {
    $info[$key] = $key != 0 ? substr($value, 1, -1) : substr($value, 0, -1);
  }
  $vars['info'] = array_chunk($info, 4);
}


