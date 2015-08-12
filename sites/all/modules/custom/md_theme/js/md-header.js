(function ($) {
    $( document ).ready(function() {
        var editor = ace.edit("ace-editor");
        var textarea = $('#edit-header-text');
        textarea.parent().hide();
        editor.getSession().setValue(textarea.val());
        editor.getSession().on('change', function(){
            textarea.val(editor.getSession().getValue());
        });
        editor.setTheme("ace/theme/twilight");
        editor.getSession().setMode("ace/mode/html")
    });
    Drupal.behaviors.mdHeader = {
        attach: function (context, settings) {

        }
    };
})(jQuery);