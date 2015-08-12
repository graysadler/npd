/**
 * @file: mdf-fullscreen-configure.js
 * @author: MegaDrupal
 *
 * Contain all javascript code control on configure form
 */
(function($){
    Drupal.behaviors.fullscreen_configure = {
        attach: function(context) {
            // Controls for opacity slider
            $("#active-opacity-value").html($("input[name=thumbnail_active_opacity]").val());
            $("#thumbnail-active-opacity-slider").slider({
                min: 0,
                max:100,
                step:1,
                slide: function() {
                    $("#active-opacity-value").html($(this).slider("value"));
                },
                create: function() {
                    $(this).slider("value", $("input[name=thumbnail_active_opacity]").val());
                },
                stop: function() {
                    $("input[name=thumbnail_active_opacity]").val($(this).slider("value"));
                    $("#active-opacity-value").html($(this).slider("value"));
                }
            });
            $("#inactive-opacity-value").html($("input[name=thumbnail_inactive_opacity]").val());
            $("#thumbnail-inactive-opacity-slider").slider({
                min: 0,
                max:100,
                step:1,
                slide: function() {
                    $("#inactive-opacity-value").html($(this).slider("value"));
                },
                create: function() {
                    $(this).slider("value", $("input[name=thumbnail_inactive_opacity]").val());
                },
                stop: function() {
                    $("input[name=thumbnail_inactive_opacity]").val($(this).slider("value"));
                    $("#inactive-opacity-value").html($(this).slider("value"));
                }
            });

            $("#edit-show-loading-bar", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-loading-bar-position", context).show();
                }
                else {
                    $(".form-item-loading-bar-position", context).hide();
                }
            }).trigger("change");
            $("#edit-navigation-button", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-navigation-position", context).show();
                    $(".form-item-hover-navigation", context).show();
                }
                else {
                    $(".form-item-navigation-position", context).hide();
                    $(".form-item-hover-navigation", context).hide();
                }
            }).trigger("change");
            $("#edit-thumbnail-navigation", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-thumbnail-width", context).show();
                    $(".form-item-thumbnail-height", context).show();
                    $(".form-item-thumbnail-position", context).show();
                    $(".form-item-thumbnail-container-width", context).show();
                    $(".form-item-thumbnail-inactive-opacity", context).show();
                    $(".form-item-thumbnail-active-opacity", context).show();

                    $("#edit-thumbnail-position", context).trigger("change");
                }
                else {
                    $(".form-item-thumbnail-width", context).hide();
                    $(".form-item-thumbnail-height", context).hide();
                    $(".form-item-thumbnail-position", context).hide();
                    $(".form-item-thumbnail-container-width", context).hide();
                    $(".form-item-thumbnail-inactive-opacity", context).hide();
                    $(".form-item-thumbnail-active-opacity", context).hide();
                }
            }).trigger("change");
            $("#edit-thumbnail-position", context).change(function(){
                var selected = $(this).val();
                if (selected != 1) {
                    $(".form-item-thumbnail-container-width", context).show();
                    $(".form-item-thumbnail-inactive-opacity", context).show();
                    $(".form-item-thumbnail-active-opacity", context).show();
                }
                else {
                    $(".form-item-thumbnail-container-width", context).hide();
                    $(".form-item-thumbnail-inactive-opacity", context).hide();
                    $(".form-item-thumbnail-active-opacity", context).hide();
                }
                if (selected == 2 || selected == 3)
                    $(".form-item-thumbnail-container-width label").html("Thumbnail container height")
                else if (selected == 4 || selected == 5)
                    $(".form-item-thumbnail-container-width label").html("Thumbnail container width")
            }).trigger("change");
            $("#edit-use-google-font", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-google-font", context).show();
                }
                else {
                    $(".form-item-google-font", context).hide();
                }
            }).trigger("change");
            $("#edit-use-typekit", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-typekit-id", context).show();
                }
                else {
                    $(".form-item-typekit-id", context).hide();
                }
            }).trigger("change");
            $("#edit-background-color", context).spectrum();
            $(".form-item-choose-background-img a").click(function(){
                Drupal.media.popups.mediaBrowser(chooseBackgroundImage);
                return false;
            });
            // callback process when choose image background
            chooseBackgroundImage = function(selected) {
                $preview = $(selected[0].preview);
                $("#appearance-background-preview").empty().append($("img", $preview));
                $("input[name=background_image_fid]").val(selected[0].fid);
            }
            $("#edit-show-next-prev", context).change(function(){
                if ($(this).is(":checked")) {
                    $(".form-item-hover-next-prev", context).show();
                }
                else {
                    $(".form-item-hover-next-prev", context).hide();
                }
            }).trigger("change");
        }
    }
})(jQuery);
