(function ($) {
    function headerFullHeigh(context){
        $(".js-height-full", context).height($(window).height());
        $(".js-height-parent, .md-slide-wrap", context).each(function(){
            $(this).height($(this).parent().first().height());
        });
    }
    Drupal.behaviors.headerblock = {
        attach: function (context, settings) {
            headerFullHeigh(context);
            if ($('.md-header', context).attr("data-background")){
                $('.md-header').css("background-image", "url(" + $('.md-header').data("background") + ")");
            }
            // Video
            if (!($("html").hasClass("mobile")) && $(".player").length > 0){
                $(".player").mb_YTPlayer();
            }
            // Text rotate
            if ($('.text-rotate', context).length > 0){
                $(".text-rotate").textrotator({
                    animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
                    separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
                    speed: 4000 // How many milliseconds until the next word show.
                });
            }

            $(window).resize(function(){
                headerFullHeigh(context);
            });
        }
    };
})(jQuery);
