(function($) {
    $.fn.equalHeights = function(){
        var b = 0, c = $(this);
        return c.each(function(){
            var c = $(this).innerHeight();
            c > b && (b = c)
        }), c.css("height", b)
    }, $("[data-equal]").each(function(){
        var b = a(this), c = b.data("equal");
        b.find(c).equalHeights()
    });
    //  Check Platform
    var mobileTest,
        mozillaTest,
        safariTest;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }


    var porfolio = {
        init: function() {
            var self = this;
            // Events
            $(".work-all").click(function(){
                self.closeWork();
                //Hash change
                window.location.hash = "";
                return false;
            });
            $(".work-prev").click(function(){
                self.prevWork();
            });
            $(".work-next").click(function(){
                self.nextWork();
            });
            self.openWork();

            $(window).bind('hashchange',function(){
                if ((location.hash.search("/ajax-project") == -1) && ($(".work-full").is(":visible"))) {
                    self.closeWork();
                    //Hash change
                    window.location.hash = "";
                }
                else {
                    var hash_new = location.hash,
                        hashReplace =  hash_new.replace("#/", ""),
                        work_url = hashReplace + ' ' + '.work-wrapper';

                    if (hashReplace != '') {
                        if (hashReplace.search('ajax-project') != -1) {
                            $('#page, .parallax-mirror').css({
                                'display' : 'block',
                                'opacity': '1'
                            });    
                        }
                        
                        if ($('a[href="'+ hashReplace +'"]').length > 0){
                            window.work_before_scroll = $('a[href="'+ hashReplace +'"]').offset().top;
                        }
                        if (hashReplace.search('ajax-project') != -1) {
                            $('#page, .parallax-mirror').css({
                                'display' : 'none',
                                'opacity': '1'
                            });   
                        }
                        
                    }
                    
                    if ((hashReplace != $(".work-opened").attr("href")) && ($(".work-full").is(":visible"))) {
                    
                        $(".work-loader").fadeIn("fast");
                        
                        setTimeout(function(){
                            $(".work-full-load").empty().load(work_url, function(){
                                initWorkSlider();
                                $(".work-loader").delay(200).fadeOut(500);
                            });
                        }, 200);
                        
                        
                        if (work_before_scroll != 0) {
                            $("html, body").animate({
                                scrollTop: 0
                            }, "slow", "easeOutExpo");
                        }
                        
                        var work_opened = $(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                        $(".work-ajax-link").removeClass("work-opened");
                        work_opened.addClass("work-opened");
                        self.worksEnd();
                    }
                    
                    if ((hashReplace != $(".work-opened").attr("href")) && ($(".work-full").is(":hidden")) && (location.hash.search("/ajax-project") != -1)) {
                    
                        $("#page").hide();
                        setTimeout(function(){
                            $(".work-full").fadeIn(500);
                        }, 50);
                        setTimeout(function(){
                            $(".work-full-load").empty().load(work_url, function(){
                                initWorkSlider();
                                $(".work-loader").delay(200).fadeOut(500);
                                
                                if (work_before_scroll != 0) {
                                    $("html, body").animate({
                                        scrollTop: 0
                                    }, "fast", "easeOutExpo");
                                }
                            });
                        }, 650);
                        
                        var work_opened = $(".work-ajax-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                        $(".work-ajax-link").removeClass("work-opened");
                        work_opened.addClass("work-opened");
                        self.worksEnd();
                    }
                    
                }
            });
            $(window).trigger('hashchange');
            
        },
        worksEnd: function() {
            var $wordOpend = $(".work-opened"),
                $wordPrev = $('.work-prev'),
                $wordNext = $('.work-next');
            if (!($wordOpend.parent().prevAll(".work-item").length)) {
                $wordPrev.css("visibility", "hidden");
            }
            else {
                $wordPrev.css("visibility", "visible");
            }
            if (!($wordOpend.parent().nextAll(".work-item").length)) {
                $wordNext.css("visibility", "hidden");
            }
            else {
                $wordNext.css("visibility", "visible");
            }
        },
        hashChange: function(url) {
            var hashUrl = "#/" + url.replace(" .work-wrapper", "");

            window.location.hash = hashUrl;
        },
        openWork: function() {
            var self = this;
            window.work_before_scroll = 0;
            $(".work-ajax-link").click(function(event){
                event.preventDefault();
                var $masked = $(".body-masked"),
                    work_url;

                window.work_before_scroll = $(window).scrollTop();
                $(this).addClass("work-opened");
                $masked.show().addClass("mask-speed").delay(10).addClass("animated fadeIn");

                setTimeout(function(){
                    $masked.removeClass("animated fadeIn").addClass("animated fadeOut");
                }, 1000);
                setTimeout(function(){
                    $masked
                        .hide()
                        .removeClass("mask-speed animated fadeOut");
                }, 1300);
                
                setTimeout(function(){
                    if (window.work_before_scroll != 0) {
                        $("html, body").animate({
                            scrollTop: 0
                        }, "fast", "easeOutExpo");
                    }
                }, 550);

                work_url = $(this).attr("href") + ' ' + '.work-wrapper';
                $(".work-full-load").load(work_url, function(){
                    initWorkSlider();
                    $(".work-loader").delay(200).fadeOut(500);
                    $("#page").hide();
                    $('.parallax-mirror').hide();
                    $(".work-full").show();
                });
                self.worksEnd();
                self.hashChange(work_url);

            });
        },
        closeWork: function() {
            var self = this,
                $masked = $(".body-masked");
            $masked.show().addClass("mask-speed").delay(10).addClass("animated fadeIn");

            setTimeout(function(){
                $masked.removeClass("animated fadeIn").addClass("animated fadeOut");
            }, 1050);
            setTimeout(function(){
                $masked.hide().removeClass("mask-speed animated fadeOut");
            }, 1300);
            setTimeout(function(){

                $('.parallax-mirror').show();
                $(".work-full").hide();
                $("#page").show();
                initPageSliders();
                init_filter();
            }, 300);
            setTimeout(function(){
                $(".work-full-load").empty();
                $("html, body").animate({
                    scrollTop: window.work_before_scroll + "px"
                }, "slow", "easeOutExpo");
            }, 350);
            $(".work-opened").removeClass("work-opened");
            setTimeout(function(){
                service_height_init();
                js_height_init();
            }, 350);
        },
        prevWork: function() {
            var self = this,
                $workOpened = $(".work-opened"),
                $ajaxLink = $workOpened.parent().prevAll(".work-item:first").find(".work-ajax-link"),
                href = $ajaxLink.attr("href"),
                url = href + ' .work-wrapper';

            $(".work-loader").fadeIn("fast");
            setTimeout(function(){
                $(".work-full-load").empty().load(url, function(){
                    initWorkSlider();
                    $(".work-loader").delay(200).fadeOut("fast");
                });
            }, 500);
            $(".work-ajax-link").removeClass("work-opened");
            $ajaxLink.addClass("work-opened");

            // If left end of the links
            self.worksEnd();
            // Hash cahnge
            self.hashChange(url);
        },
        nextWork: function(){
            var self = this,
                $workOpened = $(".work-opened"),
                $ajaxLink = $workOpened.parent().nextAll(".work-item:first").find(".work-ajax-link"),
                href = $ajaxLink.attr('href'),
                url = href + ' .work-wrapper';

            $(".work-loader").fadeIn("fast");
            setTimeout(function(){
                $(".work-full-load").empty().load( url, function(){
                    initWorkSlider();
                    $(".work-loader").delay(200).fadeOut("fast");
                });
            }, 500);
            $(".work-ajax-link").removeClass("work-opened");
            $ajaxLink.addClass("work-opened");
            // If right end of the links
            self.worksEnd();
            // Hash change
            self.hashChange(url);
        }
    }

    function menu_style1() {
        if( $('.nav-bar-compact').length ) {
            $('.nav-bar-compact').children('.menu').addClass('menu-style1');
        }

        var $expanded = $(".menu-style1").find('.expanded'),
            height = window.innerHeight;
        if( $('.menu-style1').length ) {
            $('.menu-style1').css({
                'max-height' : height
            })
            if( $expanded.length ) {
                $('<span class="menu-caret"></span>').appendTo('.expanded');
            }
            if( $('body.spb-enabled').length ) {
                $.each ( $('> li.leaf:not(.first)' ,$('.menu-style1') ), function(){
                    var $a = $('> a', this),
                        href = $a.attr('href');
                    var regExp = /^[0-9A-Za-z\$ -/.*+?^=:~${}()|[\]\\]+#/g;
                    href = href.replace(regExp,'#');
                    $a.attr('href', href);
                });
            }
            $(document).delegate('.nbc-menu-button', 'click', function() {
                $('.menu-style1').toggleClass('open');
                $('.nav-bar-compact').toggleClass('js-opened');
            });

            $(document).delegate('.menu-caret', 'click', function() {
                var self =  $(this);
                self.closest('.expanded').toggleClass('up');
                self.closest('.expanded').children('.menu').toggleClass('open');
                if( self.closest('.expanded').children('.menu').hasClass('open') ) {
                    self.closest('.expanded').children('.menu').slideDown();
                } else {
                    self.closest('.expanded').children('.menu').slideUp();
                }
            });
        }

    }
    function menu_style2() {
        if( $('.horizontal').length ) {
            $('.horizontal').find('.menu-horizontal').children('.menu').addClass('menu-style2');
        }
        var $menu_style2 = $('.menu-style2').find('li.expanded');
        if( $('.menu-style2').length ) {
            $menu_style2.hover( function() {
                var self = $(this);
                self.children('.menu').stop().slideDown();
            }, function() {
                var self = $(this);
                self.children('.menu').stop().slideUp();
            });
            if( $('body.spb-enabled').length ) {

                $.each ( $('> li.leaf:not(.first)' ,$('.menu-style2') ), function(){
                    var $a = $('> a', this),
                        href = $a.attr('href');

                    var regExp = /^[0-9A-Za-z\$ -/.*+?^=:~${}()|[\]\\]+#/g;

                    href = href.replace(regExp,'#');
                    $a.attr('href', href);

                    var regLink = /^#/g;
                    if( regLink ) {
                        $a.removeClass('active');
                    }
                    $('.menu-style2 > li > a').addClass('menu-link');

                });
                $.each( $('> li.expanded > a', $('.menu-style2 ul')), function() {
                    var self = $(this);
                    self.append('<i class="desktop-icon fa fa-angle-right"></i>');
                });

                $(document).delegate( ('.menu-link'), 'click', function() {
                    var self = $(this);
                    $('.menu-style2 > li > a').removeClass('active');
                    self.addClass('active');
                });
            }
        }
    }
    function menu_responsive() {
        var $menu_style2 = $('.menu-style2'),
            $menuClone = $menu_style2.clone().removeClass('menu-style2').addClass('menu-mobile'),
            $menuToBody = $menuClone.appendTo('body');

        if ( $('.menu-mobile').length ) {
            $menuToBody.wrap('<div class="menu-container"></div>');
            $menuClone.find('.expanded').append('<i class="icon-down fa fa-angle-right"></i>');
            $menuClone.find('.expanded').children('.menu').prepend('<li class="leaf back-control"><a href="javascript:">Back <i class="fa fa-hand-o-right"></i></a></li>');
            $(document).delegate('.mobile-nav', 'click', function() {
                $('.menu-container').toggleClass('active');
            });
            $(document).delegate('.icon-down', 'click', function() {
                var self = $(this);
                self.closest('.expanded').children('.menu').toggleClass('active');
                if ( !$('.menu-mobile').hasClass('menu-ov-hidden') ) {
                    $('.menu-mobile').addClass('menu-ov-hidden');
                }
            });
            $(document).delegate('.back-control', 'click', function() {
                var self = $(this);
                self.closest('.expanded').children('.menu').toggleClass('active');

                if ( $('.menu-mobile').hasClass('menu-ov-hidden') ) {
                    $('.menu-mobile').removeClass('menu-ov-hidden');
                }

            });
            $(document).on( 'click touchstart', function( event ) {
                if( !$(event.target).closest('.menu-container, .mobile-nav').length ) {
                    if( $('.menu-container').hasClass('active')) {
                        $('.menu-container').removeClass('active');
                    }
                    if ( $('.menu').hasClass('active') ) {
                        $('.menu').removeClass('active');
                    }
                    if ( $('.menu-mobile').hasClass('menu-ov-hidden') ) {
                        $('.menu-mobile').removeClass('menu-ov-hidden');
                    }
                }
            });
        }
    }

    function service_height_init(){
        var service_item = $(".service-item"),
            service_descr = service_item.find(".service-descr"),
            service_descr_top;
        var service_max_height = 0;
        if ($(window).width() >= 767) {
            service_item.each(function(index){
                $(this).css("height", "auto");
                if ($(this).height() > service_max_height) {
                    service_max_height = $(this).height();
                }
            });

            if (service_max_height > service_item.width() * 0.9) {
                service_item.height(service_max_height);
            }
            else {
                service_item.height(service_item.width() * 0.9);
            }
        }

        var service_descr_offset;
        var service_intro_offset;
        service_descr.each(function(){
            service_descr_offset = $(this).height() / 2;
            service_intro_offset = $(this).parent(".si-inner").find(".service-intro").height() / 2;
            $(this).parent(".si-inner").find(".service-intro").css("top", service_descr_offset + "px");
            $(this).parent(".si-inner").find(".service-descr").css("top", -service_intro_offset + "px");

        });
        // Split sections
        $(".ssh-table, .split-section-content").css("height", "auto");
        if ($(window).width() > 992) {
            $(".ssh-table, .split-section-content").equalHeights();
        }
    }

    function initWorkSlider(){
        $(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        if ($(".owl-carousel").lenth) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }

        $(".work-full-media").fitVids();
    }

    function initPageSliders(){
        // Fullwidth slider
        $(".fullwidth-slider").owlCarousel({
            //transitionStyle: "backSlide",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
        // Fullwidth gallery
        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });

        // Item carousel
        $(".item-carousel").owlCarousel({
            autoPlay: 5000,
            //stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Item carousel
        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Single carousel
        $(".single-carousel").owlCarousel({
            //transitionStyle: "backSlide",
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Content Slider
        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        // Photo slider
        $(".photo-slider").owlCarousel({
            //transitionStyle: "backSlide",
            slideSpeed: 350,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        if ($(".owl-carousel").lenth) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }
    }

    function init_team(){
        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
    }

    function init_counters(){
        $(".count-number").appear(function(){
            var count = $(this);
            count.countTo({
                from: 0,
                to: count.html(),
                speed: 1300,
                refreshInterval: 60,
            });

        });
    }

    function init_lightbox(){
        // Works Item Lightbox
        $(".work-lightbox-link").magnificPopup({
            gallery: {
                enabled: true
            }
        });

        // Works Item Lightbox
        $(".lightbox-gallery-1").magnificPopup({
            gallery: {
                enabled: true
            }
        });

        // Other Custom Lightbox
        $(".lightbox-gallery-2").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox-gallery-3").magnificPopup({
            gallery: {
                enabled: true
            }
        });
        $(".lightbox").magnificPopup();

    }

    function init_scroll_navigate(){
        $(".local-scroll, .menu-style1, .menu-style2, .menu-mobile").localScroll({
            target: "body",
            duration: 1500,
            easing: "easeInOutExpo"
        });
    }

    function init_filter() {
        $('.md-portfolio').each(function(){
            var sefl = $(this),
                fselector = 0;
            sefl.find(".filter").click(function(event){
                event.preventDefault();
                sefl.find('.filter').removeClass('active');
                fselector = $(this).attr('data-filter');
                $(this).addClass('active');
                sefl.find('.works-grid').isotope({
                    itemSelector: '.mix',
                    layoutMode: 'fitRows',
                    filter: fselector
                });

            });

        });
    }
    function init_tooltips(){
        $(".tooltip-bot, .tooltip-bot a, .nav-social-links a").tooltip({
            placement: "bottom"
        });
        $(".tooltip-top, .tooltip-top a").tooltip({
            placement: "top"
        });

    }
    function init_shortcodes(){

        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").click(function(){
            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function(){
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });

            }

        });

        // Accordion
        var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion > dt > a").first().addClass("active");

        $(".accordion > dt > a").click(function(){

            var current = $(this).parent().next("dd");
            $(".accordion > dt > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");

            return false;

        });

        // Toggle
        var allToggles = $(".toggle > dd").hide();

        $(".toggle > dt > a").click(function(){

            if ($(this).hasClass("active")) {

                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");

            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }

            return false;
        });

        // Responsive video


    }

    function js_height_init(){
        $(".js-height-full").height($(window).height());
        $(".js-height-parent").each(function(){
            $(this).height($(this).parent().first().height());
        });
    }

    function fake_pager() {
        $('.blog-link.ext-link').each(function(){
           var type = $(this).data('type'),
               next_link = $(this).parents('.view-content').next('.item-list').find('.pager-next').find('a').attr('href'),
               prev_link = $(this).parents('.view-content').next('.item-list').find('.pager-previous').find('a').attr('href'),
               link = type ==  'pager-next' ? next_link : prev_link;
            $(this).attr('href', link);
            $(this).parents('.view-content').next('.item-list').hide();
            if (next_link == undefined && type == 'pager-next') {
                $(this).remove();
            }
            if (prev_link == undefined && type == 'pager-previous') {
                $(this).remove();
            }
        });
    }

    function parallax_init() {
        $('section, .small-section').each(function(){
            var src = $(this).data('image-src') || $(this).data('background');
            if(src != undefined){
                $(this).css({
                    'background-image': 'url('+src+')'
                });
            }
            if ($(this).hasClass('parallax-window') && src != undefined) {
                $(this).parallax("50%", 0.1);
            }
        });

    }
    //Windown Load
    $(window).load(function(){
        // Page loader
        $(".page-loader b").delay(0).fadeOut();
        $(".page-loader").delay(200).fadeOut("slow");
        init_scroll_navigate();
        $(window).trigger("scroll");
        $(window).trigger("resize");
    });

    $(window).scroll(function(){
        if ($(window).scrollTop() >= 100) {
            $(".nav-bar-compact").addClass("js-nbc-bg");
        }
        else {
            $(".nav-bar-compact").removeClass("js-nbc-bg");
        }
    }); 


    Drupal.behaviors.BigStream = {
        attach: function (context, settings) {
            $(window).trigger("resize");
            porfolio.init();
            parallax_init();
            service_height_init();
            initPageSliders();
            initWorkSlider();
            init_counters();
            init_tooltips();
            init_lightbox();
            init_shortcodes();
            init_team();
            menu_style1();
            menu_style2();
            menu_responsive();
            init_filter();
            js_height_init();
            fake_pager();
            $('section', context).each(function(){
                var overlay = $(this).data('overlay'),
                    src = $(this).data('image-src'),
                    color = $(this).data('bg-color');
                if (color != undefined){
                    $(this).css({
                        'background-color': color
                    })
                }
                if (!$(this).hasClass('parallax-window') && src != undefined) {
                    $(this).css({
                        'background-image': 'url('+src+')'
                    })
                }
            });
            $(".js-stick").sticky({
                topSpacing: 0
            });
            if ($('#see-map').length > 0 && $('#google-map').length > 0) {
                setTimeout(function(){
                    $('#google-map').hide();
                }, 4000);
                $('#see-map').click(function(event) {
                    event.preventDefault();
                    $('#google-map', context).slideToggle( "slow" );
                });

            }


            var progressBar = $(".progress-bar");
            progressBar.each(function(indx){
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });

            //Responsive Video
            $(".video, .resp-media, .blog-media").fitVids();
            // Window Resize
            $(window).resize(function(){

            });
        }
    };
})(jQuery);