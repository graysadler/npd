(function($) {
    Drupal.behaviors.FieldColor = {
        attach: function (context, settings) {
            $('.field-color', context).spectrum({
                theme: "sp-light",
                allowEmpty: true,
                showInput: true,
                showAlpha: true,
                preferredFormat: "rgb"
            });
        }
    };
})(jQuery);