(function ($) {
    Drupal.behaviors.mdTheme = {
        attach: function (context, settings) {
            $('.input-spectrum', context).spectrum({
                theme: "sp-light",
                allowEmpty: true,
                showInput: true,
                showAlpha: true,
                preferredFormat: "rgb"
            });


        }
    };
})(jQuery);