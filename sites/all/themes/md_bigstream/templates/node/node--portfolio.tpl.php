<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */
?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
    <?php if ($title): ?>
      <h4 class="pt-0 align-center">
        <span class="uppercase"><?php print $title; ?></span>
        <br/>
        <span
          class="serif normal"><?php print render($content['field_subtitle'][0]['#markup']); ?></span>
      </h4>
      <div class="section-line mb-40 mb-xxs-30"></div>
    <?php endif; ?>

    <div class="row">
      <div class="col-md-12 col-lg-10 col-lg-offset-1">
        <!-- Work Text -->
        <div class="section-text align-left mb-40">
          <?php print render($content['body']['#items'][0]['value']); ?>
        </div>
        <!-- End Work Text -->

        <!-- Work Gallery -->
        <div class="work-full-media">
          <?php print render($content['field_mutimedia']); ?>
        </div>
        <!-- End Work Gallery -->

        <!-- Work Text -->
        <?php if (isset($content['field_online'])) {
          $link_project = $content['field_online'][0]['#markup'];
        }
        else {
          $link_project = '#';
        }
        ?>
        <div class="work-full-text mt-50 mt-xs-30">
          <?php if (isset($content['field_client']) && isset($content['field_date']) && isset($content['field_online'])): ?>
            <div class="row">
              <!-- Project Detail -->
              <div class="col-sm-4">
                <div class="work-detail">
                  <h6 class="uppercase">Project Details</h6>

                  <div class="work-full-detail">
                    <p>
                      <strong>Client:</strong> <?php print render($content['field_client'][0]['#markup']); ?>
                    </p>

                    <p>
                      <strong>Date:</strong> <?php print render($content['field_date'][0]['#markup']); ?>
                    </p>

                    <p><strong>Online:</strong> <a
                        href="<?php print render($link_project); ?>"
                        target="_blank"><?php print render($content['field_online'][0]['#markup']); ?></a>
                    </p>
                  </div>
                </div>
              </div>
              <!-- End Project Detail -->
              <!-- About Project -->
              <div class="col-sm-8">
                <h6 class="uppercase">About Project</h6>

                <p><?php print render($content['body']['#items'][0]['summary']); ?></p>
              </div>
              <!-- End About Project -->
            </div>
          <?php else: ?>
            <p><?php print render($content['body']['#items'][0]['summary']); ?></p>
          <?php endif; ?>
          <hr class="mb-40"/>
          <div class="section-text align-center">
            <a href="<?php print render($link_project); ?>"
               class="btn btn-mod btn-border-c btn-medium">View project
              online</a>
          </div>
        </div>
        <!-- End Work Text -->
      </div>
    </div>


    <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content);
    ?>


    <?php print render($content['links']); ?>

    <?php print render($content['comments']); ?>

  
</div>
