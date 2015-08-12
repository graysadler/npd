<div class="work-wrapper">
  <!-- Work Full Section -->
  <section id="work-item" class="work-container">
    <div class="container">
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
    </div>
  </section>
  <!-- End Work Full Section -->
</div>