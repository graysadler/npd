/*------------------------------------------------------------------------
 # MegaSlide - Sep 17, 2013
# ------------------------------------------------------------------------
# Websites:  http://www.megadrupal.com -  Email: info@megadrupal.com
--------------------------------------------------------------------------*/

(function($) {

    $.fn.triggerItemEvent = function() {
        var slidepanel = $(this).data("slidepanel");
        if(slidepanel == null)
            return;
        var $self = $(this);
        $self.draggable({
            containment: "parent",
            drag: function( event, ui ) {
                var left = Math.round($(ui.helper).position().left),
                    top =  Math.round($(ui.helper).position().top);
                $self.data("left", left);
                $self.data("top", top);
                slidepanel.toolbar.changePositionValue(left, top);
            }
        });
        $self.resizable({
            handles: "e, s, se",
            containment: "parent",
            resize: function(event, ui) {
                var width = Math.round($(ui.helper).width()),
                    height = Math.round($(ui.helper).height());
                $self.data("width", width);
                $self.data("height", height);
                slidepanel.toolbar.changeSizeValue(width, height);
            }
        });
        $self.bind('mousedown', function(e) {
            if(e.shiftKey) {
                if(!$(this).hasClass("ui-selected")) {
                    $(this).addClass("ui-selected");
                    slidepanel.triggerChangeSelectItem();
                }
            } else {
                if(!$(this).hasClass("ui-selected")) {
                    $(this).siblings(".slider-item").removeClass("ui-selected");
                    $(this).addClass("ui-selected");
                    slidepanel.triggerChangeSelectItem();
                } else {
                    if($(this).siblings(".slider-item.ui-selected").size() > 0) {
                        $(this).siblings(".slider-item.ui-selected").removeClass("ui-selected");
                        slidepanel.triggerChangeSelectItem();
                    }
                }
            }

        });
        return this;
    }
    $.fn.getItemValues = function() {
        if($(this).hasClass("slider-item")) {
            var data = $(this).data(),
                valDefault = {
                    width: 100,
                    height: 50,
                    left: 0,
                    top: 0,
                    starttime: 0,
                    stoptime: 0,
                    startani: "",
                    stopani: "",
                    startaniTime: 0,
                    stopaniTime: 0,
                    opacity: 100,
                    style: "",
                    zindex: "",
                    type: "",
                    title: "",
                    color: "",
                    backgroundColor: "",
                    backgroundTransparent: "",
                    border: 0,
                    borderAll: "none",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderTopLeftRadius: "",
                    borderTopRightRadius: "",
                    borderBottomRightRadius: "",
                    borderBottomLeftRadius: "",
                    padding: 0,
                    paddingTop: "",
                    paddingRight: "",
                    paddingBottom: "",
                    paddingLeft: "",
                    shadow: 0,
                    shadowAngle: 0,
                    shadowOffset: 0,
                    shadowBlur: 0,
                    shadowColor: "#000",
                    fontSize: "",
                    fontFamily: "",
                    fontWeight: "",
                    lineHeight: "",
                    textDecoration: "",
                    textTransform: "",
                    textAlign: "",
                    link: "",
                    linkColor: "",
                    linkBorderColor: "",
                    linkBackgroundColor: "",
                    linkTarget: "",
                    linkCustomClass: "",
                    customClass: "",
                    customCss: "",
                    fileid: "",
                    thumb: "",
					thumbid: ""
                },
                value = {};
            for (var attrname in valDefault) {
                value[attrname] = data[attrname];
            }
            return $.extend(valDefault, value);
        }
        return null;

    }
    $.fn.setItemValues = function(setting) {
        if($(this).hasClass("slider-item")) {
            $(this).data(setting);
            return true;
        }
        return null;

    }
    $.fn.setItemStyle = function(setting) {
        if($(this).hasClass("slider-item")) {
            var css = {};
            if(setting.customClass)
                $(this).addClass(setting.customClass);
            if(setting.width)
                css["width"] = setting.width;
            if(setting.height)
                css["height"] = setting.height;
            if(setting.top)
                css["top"] = setting.top;
            if(setting.left)
                css["left"] = setting.left;
			if(setting.opacity)
				css["opacity"] = setting.opacity;
            if(setting.backgroundColor) {
                css["background-color"] = setting.backgroundColor;
            }
            if(setting.borderTop)
                css["borderTop"] = setting.borderTop;
			if(setting.borderRight)
                css["borderRight"] = setting.borderRight;
            if(setting.borderBottom)
                css["borderBottom"] = setting.borderBottom;
            if(setting.borderLeft)
                css["borderLeft"] = setting.borderLeft;

            if(setting.borderTopLeftRadius)
                css["border-top-left-radius"] = setting.borderTopLeftRadius + "px";
            if(setting.borderTopRightRadius)
                css["border-top-right-radius"] = setting.borderTopRightRadius + "px";
            if(setting.borderBottomRightRadius)
                css["border-bottom-right-radius"] = setting.borderBottomRightRadius + "px";
            if(setting.borderBottomLeftRadius)
                css["border-bottom-left-radius"] = setting.borderBottomLeftRadius + "px";

            if(setting.paddingTop)
                css["padding-top"] = setting.paddingTop + "px";
            if(setting.paddingRight)
                css["padding-right"] = setting.paddingRight + "px";
            if(setting.paddingBottom)
                css["padding-bottom"] = setting.paddingBottom + "px";
            if(setting.paddingLeft)
                css["padding-left"] = setting.paddingLeft + "px";

            if(setting.shadow) {
                var shadowAngle = setting.shadowAngle,
                    shadowOffset = setting.shadowOffset,
                    shadowBlur = setting.shadowBlur,
                    shadowColor = setting.shadowColor;
                if(shadowAngle != null && shadowOffset != null && shadowBlur != null && shadowColor != null) {
                    var hshadow = Math.round(shadowOffset * Math.cos((shadowAngle - 90) / 180 * Math.PI)),
                        vshadow = Math.round(shadowOffset * Math.sin((shadowAngle - 90) / 180 * Math.PI)),
                        boxShaDow = hshadow + "px " + vshadow + "px " + parseInt(shadowBlur) + "px " + shadowColor;
                    css["box-shadow"] = boxShaDow;
                } else {
                    css["box-shadow"] = "none";
                }
            }
            if(setting.zindex) {
                css["z-index"] = setting.zindex;
            }
            if(setting.type == "text") {
                if(setting.fontSize)
                    css["font-size"] = setting.fontSize + "px";
				if(setting.lineHeight)
                    css["line-height"] = setting.lineHeight + "px";
                if(setting.fontFamily)
                    css["font-family"] = '"' + setting.fontFamily + '"';
                if(setting.fontWeight) {
                    var fontWeight = setting.fontWeight.toString();
                    if(fontWeight.indexOf("italic") > 0) {
                        css["font-weight"] = parseInt(fontWeight);   
                        css["font-style"] = "italic";       
                    } else {
                        css["font-weight"] = parseInt(fontWeight);   
                        css["font-style"] = "normal";   
                    } 
                }
                if(setting.textDecoration)
                    css["text-decoration"] = setting.textDecoration;
				if(setting.textTransform)
                    css["text-transform"] = setting.textTransform;
                if(setting.textAlign)
                    css["text-align"] = setting.textAlign;
                if(setting.color)
                    css["color"] = setting.color;
            }
            $(this).css(css);
        }
        return false;
    }
    $.fn.setItemHtml = function(setting) {
        if($(this).hasClass("slider-item")) {
            if(setting.type == "text") {
                $(this).find("div").html(setting.title.replace(/\n/g, "<br />"));
            } else {
                $(this).find("img").attr("src", setting.thumb);
            }
        }
        return false;
    }
    $.HexToRGB = function (hex) {
        var hex = parseInt(((hex.toString().indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
    }
    $.removeMinusSign = function(str) {
        return str.replace(/-/g, "");
    }
    $.objectToString = function(obj) {
        return JSON.stringify(obj);
    };
    $.stringToObject = function(string) {
        try {
            return jQuery.parseJSON(string);
        } catch (e) {
            return {};
        }
    };

    window.MdImagePopup = function(options) {
        var defaults = {
            onSubmit: function(imageUrl, data) {  }
        };
        options = $.extend({}, defaults, options);
        this.open = function() {
            Drupal.media.popups.mediaBrowser(chooseImage);

        }
        this.open();
        function chooseImage(selected) {
            options.onSubmit.call(this,selected[0].url, {fileid: selected[0].fid, name: selected[0].filename});
        }
    }

    window.submitVideo = function(videoUrl, callback) {
        var videoid = videoUrl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if(videoid != null) {
            $.getJSON("http://gdata.youtube.com/feeds/api/videos/" + videoid[1] + "?v=2&alt=jsonc", function(data) {
                if(data.data) {
                    var info = data.data;
                    callback.call(null, {id: info.id, title: info.title, thumb: info.thumbnail.hqDefault});
                }
            });
        } else {
            var match = /vimeo.*\/(\d+)/i.exec(videoUrl);
            if (match != null) {
                $.getJSON("http://vimeo.com/api/v2/video/" + match[1] + '.json?callback=?', {format: "json"}, function(data) {
                    if(data) {
                        callback.call(null, {id: data[0].id, title: data[0].title, thumb: data[0].thumbnail_medium});
                    }
                });
            }
        }
    }
})(jQuery);
