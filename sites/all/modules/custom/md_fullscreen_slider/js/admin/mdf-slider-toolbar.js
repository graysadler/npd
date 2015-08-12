/*------------------------------------------------------------------------
 # MegaSlide - Sep 17, 2013
 # ------------------------------------------------------------------------
 # Designed & Handcrafted by MegaDrupal
 # Websites:  http://www.megadrupal.com -  Email: info@megadrupal.com
 # Author: BaoNV
 ------------------------------------------------------------------------*/

(function($) {
    var weightArray  = {
        '100': 'Thin',
        '100italic': 'Thin Italic',
        '200': "Extra Light",
        '200italic': "Extra Light Italic",
        '300': 'Light',
        '300italic': 'Light Italic',
        '400': 'Normal',
        '400italic': 'Italic',
        '500': 'Medium',
        '500italic': 'Medium Italic',
        '600': 'Semi Bold',
        '600italic': 'Semi Bold Italic',
        '700': 'Bold',
        '700italic': 'Bold Italic',
        '800': 'Extra Bold',
        '800italic': 'Extra Bold Italic',
        '900': 'Heavy',
        '900italic': 'Heavy Italic'
    };

    MegaSlider.Toolbar = function(panel){
        this.panel = panel;
    }
    MegaSlider.Toolbar.prototype = {
        constructor : MegaSlider.Toolbar,
        init: function() {
            var self = this;

            $("#mdf-toolbar").tinyscrollbar();
            $("#mdf-toolbar .box-toolbar h3").click(function() {
                var $div = $(this).next(".box-content");
                if($div.is(":visible")) {
                    $div.slideUp(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                } else {
                    $div.slideDown(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                }
            });

            $("#mdf-toolbar .add-new-object a").click(function() {
                if ($(this).hasClass("btn-text")) {
                    self.panel.addBoxItem("text");
                } else if ($(this).hasClass("btn-image")) {
                    self.panel.addBoxItem("image");
                    $("#mdf-toolbar .mdt-proportions").trigger("click");
                }  else if ($(this).hasClass("btn-video")) {
                    self.panel.addBoxItem("video");
                    $("#mdf-toolbar .mdt-proportions").trigger("click");
                }
                return false;
            });

            $("#mdf-toolbar textarea.mdt-texttitle").keyup(function() {
                self.panel.setItemTitle($(this).val());
            });
            $("#mdf-toolbar input.mdt-alt-image").keyup(function() {
                self.panel.setItemTitle($(this).val());
            });
            $("#mdf-toolbar #mdf-edit-image").click(function() {
                var imagePopup = new MdImagePopup({
                    onSubmit: function(imageUrl, data) {
                        self.panel.setItemImageSrc(data.fileid, imageUrl, data.name);
						$("#mdf-toolbar input.mdt-alt-image").val(data.name);
                    }
                });
                return false;
            });

            function changeOpacity() {
                var value = $( "#mdt-opacity-slider" ).slider("value");
                $("#mdt-opacity").val(value / 100).trigger("change");
            }
            $("#mdt-opacity-slider").slider({
                min: 0,
                max: 100,
                value: 100,
                slide: changeOpacity,
                change: changeOpacity
            });
            $("#mdf-toolbar input.mdt-color").spectrum({
                clickoutFiresChange: true,
                showInput: true,
                preferredFormat: "hex6",
                move: function(color) {
                    $(this).val(color.toHexString()).trigger("change");
                }
            });
            $("#mdf-toolbar input.mdt-background-color").spectrum({
                clickoutFiresChange: true,
                showAlpha: true,
                showInput: true,
                preferredFormat: "rgb",
                move: function(color) {
                    $(this).val(color.toRgbString()).trigger("change");
                }
            });
            $("#checkbox-padding").bind("change", function() {
                if($(this).is(":checked")) {
                    $("#padding-content").slideDown(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setPadding(1);
                } else {
                    $("#padding-content").slideUp(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setPadding(0);
                }
            });
            $("#checkbox-border").bind("change", function() {
                if($(this).is(":checked")) {
                    $("#border-content").slideDown(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setBorder(1);
                } else {
                    $("#border-content").slideUp(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setBorder(0);
                }
            });
            $("#border-content").mdPanelBorder({
                changeAllBorder	: function(borderString) {
                    self.panel.setItemBorder("all", borderString);
                },
                changeLeftBorder: function(borderString) {
                    self.panel.setItemBorder("left", borderString);
                },
                changeTopBorder: function(borderString) {
                    self.panel.setItemBorder("top", borderString);
                },
                changeRightBorder: function(borderString) {
                    self.panel.setItemBorder("right", borderString);
                },
                changeBottomBorder: function(borderString) {
                    self.panel.setItemBorder("bottom", borderString);
                }
            });


            $("#mdf-toolbar input.mdt-width").keyup(function() {
                var $proportions = $("#mdf-toolbar a.mdt-proportions");
                if ($proportions.hasClass("active")) {
                    var proportions = $proportions.data("proportions");
                    if(proportions > 0) {
                        $("#mdf-toolbar input.mdt-height").val(Math.round($(this).val() / proportions));
                    }
                }
            });

            $("#mdf-toolbar input.mdt-height").keyup(function() {
                var $proportions = $("#mdf-toolbar a.mdt-proportions");
                if ($proportions.hasClass("active")) {
                    var proportions = $proportions.data("proportions");
                    if(proportions > 0) {
                        $("#mdf-toolbar input.mdt-width").val(Math.round($(this).val() * proportions));
                    }
                }
            });

            $("#mdf-toolbar .mdt-proportions").click(function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                } else {
                    var width = $("#mdf-toolbar input.mdt-width").val();
                    var height = $("#mdf-toolbar input.mdt-height").val();
                    var proportions = 1;
                    if (width > 0 && height > 0)
                        proportions = width / height;
                    $(this).data("proportions", proportions);
                    $(this).addClass("active");
                }
            });

            $("#checkbox-drop-shadow").bind("change", function() {
                if($(this).is(":checked")) {
                    $("#shadow-content").slideDown(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setShadow(1);
                } else {
                    $("#shadow-content").slideUp(function() {
                        $("#mdf-toolbar").tinyscrollbar_update("relative");
                    });
                    self.panel.setShadow(0);
                }
            });
            function changeShaDowValue() {
                var value = $(this).slider("value");
                $("input", this).val(value).trigger("change");
            }
            $("#mdf-toolbar input.shadow-angle").knob({
                'change' : function (v) { $("#mdf-toolbar input.shadow-angle").trigger("change") }
            });
            $("#mdf-toolbar #mdt-shadow-blur, #mdf-toolbar #mdt-shadow-offset").slider({
                min: 0,
                max: 50,
                value: 00,
                slide: changeShaDowValue,
                change: changeShaDowValue
            });
            $("#mdf-toolbar input.shadow-color").spectrum({
                clickoutFiresChange: true,
                preferredFormat: "hex6",
                showInput: true,
                move: function(color) {
                    $(this).val(color.toHexString()).trigger("change");
                }
            });
            $("#mdf-toolbar select.mdt-font-family").change(function() {
                self.panel.changeFontFamily($(this).val());
                self.changeFontWeightOption($("option:selected" ,this).data("fontweight"));
            });
            $("#mdf-toolbar select.mdt-font-family").bind("updatevalue" ,function() {
                self.changeFontWeightOption($("option:selected" ,this).data("fontweight"));
            });

            $("input.mdt-link-color, input.mdt-link-brcolor, input.mdt-link-bgcolor", "#mdf-toolbar").spectrum({
                clickoutFiresChange: true,
                showInput: true,
                showAlpha: true,
                preferredFormat: "rgb",
                move: function(color) {
                    $(this).val(color.toRgbString()).trigger("change");
                }
            });

            $("#dlg-video").dialog({
                resizable: false,
                autoOpen: false,
                draggable: false,
                modal: true,
                width: 680,
                buttons: {
                    OK: function () {
                        self.panel.setVideoData($("#video-id").val(), $("#video-name").val(), $("#video-thumb").attr("src"), $("#video-thumb-id").val());
                        $(this).dialog("close");
                    }
                },
                open: function() {
                    if (self.selectedItem != null) {
                        var itemValues = self.selectedItem.getItemValues();
                        $("#video-url").val("");
                        $("#video-id").val(itemValues.fileid);
                        $("#video-name").val(itemValues.title);
						$("#video-thumb-id").val(itemValues.thumbid);
                        $("#video-thumb").attr("src", itemValues.thumb);
                    }
                },
                close: function() {
                    //$(this).empty();
                }
            });
            $("#mdf-edit-video").click(function() {
                $("#dlg-video").dialog("open");
                return false;
            });
            $("#videothumb-pick").click(function() {
                var imagePopup = new MdImagePopup({
                    onSubmit: function(imageUrl, data) {
                        $("#video-thumb").attr("src", imageUrl);
						$("#video-thumb-id").val(data.fileid);
                    }
                });
                return false;
            });

            $("#video-search").click(function() {
                var videoUrl = $("#video-url").val();
                new submitVideo(videoUrl, function(data) {
                    $("#video-id").val(data.id);
                    $("#video-name").val(data.title);
                    $("#video-thumb").attr("src", data.thumb);
                });
                return false;
            });

            $("#mdf-toolbar .mdt-input").change(function() {
                var name = $(this).attr("name");
                switch (name) {
                    case "width":
                    case "height":
                        self.panel.setItemSize($("#mdf-toolbar input.mdt-width").val(), $("#mdf-toolbar input.mdt-height").val());
                        break;
                    case "left":
                    case "top":
                        self.panel.setItemAttribute(name, $(this).val());
                        break;
                    case "startani":
                    case "stopani":
                    case "startaniTime":
                    case "stopaniTime":
                        self.panel.setItemData(name, $(this).val());
                        break;
                    case "color":
                    case "backgroundColor":
                    case "opacity":
                        self.panel.setItemCss(name, $(this).val());
                        break;
                    case "paddingTop":
                    case "paddingBottom":
                    case "paddingRight":
                    case "paddingLeft":
                    case "borderTopLeftRadius":
                    case "borderTopRightRadius":
                    case "borderBottomRightRadius":
                    case "borderBottomLeftRadius":
                        self.panel.setItemCssPx(name, $(this).val());
                        break;
                    case "fontWeight":
                        self.panel.setItemFontWeight($(this).val());
                        break;
                    case "fontSize":
                    case "lineHeight":
                        self.panel.setItemCssPx(name, $(this).val());
                        break;
                    case "link":
                    case "linkColor":
                    case "linkBorderColor":
                    case "linkBackgroundColor":
                    case "linkTarget":
                    case "linkCustomClass":
                    case "customClass":
                    case "customCss":
                        self.panel.setItemData(name, $(this).val());
                        break;
                    case "shadowAngle":
                    case "shadowOffset":
                    case "shadowBlur":
                    case "shadowColor":
                        self.panel.setItemShadow(name, $(this).val());
                        break;
                    default:
                        self.panel.setItemCss(name, $(this).val());
                }
                return false;
            });

            $("#mdf-toolbar a.button-style").click(function() {
                if($(this).hasClass("active")) {
                    self.panel.setItemCss($(this).attr("name"), $(this).attr("normal"));
                    $(this).removeClass("active");
                } else {
                    self.panel.setItemCss($(this).attr("name"), $(this).attr("active"));
                    $(this).addClass("active");
                }
                return false;
            });
            $("#mdf-toolbar a.button-align").click(function() {
                if($(this).hasClass("active")) {
                    if($(this).hasClass("mdt-left-alignment")) return;
                    self.panel.setItemCss("textAlign", "left");
                    $("#mdf-toolbar a.mdt-left-alignment").addClass("active");
                    $(this).removeClass("active");
                } else {
                    self.panel.setItemCss("textAlign", $(this).attr("value"));
                    $("#mdf-toolbar a.button-align").removeClass("active");
                    $(this).addClass("active");
                }
                return false;
            });

            $("#mdf-toolbar a.mdt-btn-align").click(function() {
                if ($(this).hasClass("mdt-align-left")) {
                    self.panel.alignLeftSelectedBox();
                } else if ($(this).hasClass("mdt-align-right")) {
                    self.panel.alignRightSelectedBox();
                } else if ($(this).hasClass("mdt-align-center")) {
                    self.panel.alignCenterSelectedBox();
                } else if ($(this).hasClass("mdt-align-top")) {
                    self.panel.alignTopSelectedBox();
                } else if ($(this).hasClass("mdt-align-bottom")) {
                    self.panel.alignBottomSelectedBox();
                } else if ($(this).hasClass("mdt-align-vcenter")) {
                    self.panel.alignMiddleSelectedBox();
                }
                return false;
            });
            $("#mdf-toolbar a.mdt-btn-space").click(function() {
                if ($(this).hasClass("mdt-spacev")) {
                    self.panel.spaceVertical($("input.mdt-spacei", "#mdf-toolbar").val());
                } else if ($(this).hasClass("mdt-spaceh")) {
                    self.panel.spaceHorizontal($("input.mdt-spacei", "#mdf-toolbar").val());
                }
                return false;
            });
            this.hideToolbar();
            $("#mdf-toolbar").tinyscrollbar_update("relative");
        },
        changeSelectItem: function(item, multi) {
            this.selectedItem = item;
            this.triggerChangeSelectItem(multi);
        },
        triggerChangeSelectItem: function(multi) {
            if(multi) {
                this.showToolbarMultiSelect();
            } else {
                if(this.selectedItem == null) {
                    this.hideToolbar();
                } else {
                    this.changeToolbarValue();
                }
            }
            setTimeout(function() {
                $("#mdf-toolbar").tinyscrollbar_update("relative");
            }, 450);
        },
        showToolbarMultiSelect: function() {
            $("#mdf-toolbar .box-item:not(.box-align)").hide();
            $("#mdf-toolbar .box-item.box-align").slideDown();
        },
        hideToolbar: function() {
            $("#mdf-toolbar .box-item").hide();
        },
        changeToolbarValue: function() {
            if (this.selectedItem != null) {
                var itemValues = this.selectedItem.getItemValues();
                $("#mdf-toolbar input.mdt-width").val(itemValues.width);
                $("#mdf-toolbar input.mdt-height").val(itemValues.height);
                $("#mdf-toolbar .mdt-proportions").trigger("click");
                $("#mdf-toolbar input.mdt-left").val(itemValues.left);
                $("#mdf-toolbar input.mdt-top").val(itemValues.top);
                $("#mdf-toolbar select.mdt-startani").val(itemValues.startani);
                $("#mdf-toolbar select.mdt-stopani").val(itemValues.stopani);
                $("#mdf-toolbar input.mdt-startani-time").val(itemValues.startaniTime);
                $("#mdf-toolbar input.mdt-stopani-time").val(itemValues.stopaniTime);
                $("#mdf-toolbar input.mdt-color").spectrum("set", itemValues.color);
                $("#mdf-toolbar input.mdt-background-color").spectrum("set", itemValues.backgroundColor);

                if(itemValues.opacity) {
                    $("#mdf-toolbar #mdt-opacity-slider").slider("value", itemValues.opacity * 100);
                    $("#mdf-toolbar input.mdt-opacity").val(itemValues.opacity);
                } else {
                    $("#mdf-toolbar #mdt-opacity-slider").slider("value", 100);
                    $("#mdf-toolbar input.mdt-opacity").val(100);
                }
                // Padding
                $("#mdf-toolbar input.mdt-p-top").val(itemValues.paddingTop);
                $("#mdf-toolbar input.mdt-p-right").val(itemValues.paddingRight);
                $("#mdf-toolbar input.mdt-p-bottom").val(itemValues.paddingBottom);
                $("#mdf-toolbar input.mdt-p-left").val(itemValues.paddingLeft);
                if(itemValues.padding) {
                    $("#checkbox-padding").prop("checked", true).trigger("change");
                } else {
                    $("#checkbox-padding").prop("checked", false).trigger("change");
                }

                // Border
                $("#mdf-toolbar input.mdt-border-width").val("");
                $("#mdf-toolbar select.mdt-border-style").val("");
                $("#mdf-toolbar input.border-color").spectrum("set", "");
                $("#border-position a.bp-border").removeClass("active selected");
                $("#border-position a.bp-all").attr("attr-border", itemValues.borderAll).toggleClass("active", isActiveBorder(itemValues.borderAll));
                $("#border-position a.bp-top").attr("attr-border", itemValues.borderTop).toggleClass("active", isActiveBorder(itemValues.borderTop));
                $("#border-position a.bp-right").attr("attr-border", itemValues.borderRight).toggleClass("active", isActiveBorder(itemValues.borderRight));
                $("#border-position a.bp-bottom").attr("attr-border", itemValues.borderBottom).toggleClass("active", isActiveBorder(itemValues.borderBottom));
                $("#border-position a.bp-left").attr("attr-border", itemValues.borderLeft).toggleClass("active", isActiveBorder(itemValues.borderLeft));
                if(itemValues.border) {
                    $("#checkbox-border").prop("checked", true).trigger("change");
                } else {
                    $("#checkbox-border").prop("checked", false).trigger("change");
                }
                // Border Radius
                $("#mdf-toolbar input.mdt-br-topleft").val(itemValues.borderTopLeftRadius);
                $("#mdf-toolbar input.mdt-br-topright").val(itemValues.borderTopRightRadius);
                $("#mdf-toolbar input.mdt-br-bottomleft").val(itemValues.borderBottomRightRadius);
                $("#mdf-toolbar input.mdt-br-bottomright").val(itemValues.borderBottomLeftRadius);

                // Box shadow

                $("#shadow-content input.shadow-angle").val(itemValues.shadowAngle).trigger("change");
                $("#mdf-toolbar #mdt-shadow-offset").slider("value", itemValues.shadowOffset || 0);
                $("#mdf-toolbar #mdt-shadow-blur").slider("value", itemValues.shadowBlur || 0);
                $("#mdf-toolbar input.shadow-offset").val(itemValues.shadowOffset);
                $("#mdf-toolbar input.shadow-blur").val(itemValues.shadowBlur);
                $("#shadow-content input.shadow-color").spectrum('set', itemValues.shadowColor);
                if(itemValues.shadow) {
                    $("#checkbox-drop-shadow").prop("checked", true).trigger("change");
                } else {
                    $("#checkbox-drop-shadow").prop("checked", false).trigger("change");
                }

                // link
                $("#mdf-toolbar input.mdt-link-value").val(itemValues.link);
                $("#mdf-toolbar input.mdt-link-color").spectrum('set', itemValues.linkColor);
                $("#mdf-toolbar input.mdt-link-brcolor").spectrum('set', itemValues.linkBorderColor);
                $("#mdf-toolbar input.mdt-link-bgcolor").spectrum('set', itemValues.linkBackgroundColor);
                $("#mdf-toolbar select.mdt-link-target").val(itemValues.linkTarget);
                $("#mdf-toolbar input.mdt-link-custom-class").val(itemValues.linkCustomClass);

                // Custom Class
                $("#mdf-toolbar input.mdt-customclass").val(itemValues.customClass);
                $("#mdf-toolbar input.mdt-customcss").val(itemValues.customCss);


                if(itemValues.type == "text") {
                    $("#mdf-toolbar textarea.mdt-texttitle").val(itemValues.title);
                    $("#mdf-toolbar .box-item.box-text").slideDown();
                    $("#mdf-toolbar .box-item:not(.box-text)").hide();
                    $("#mdf-toolbar select.mdt-font-family").val(itemValues.fontFamily).trigger("updatevalue");
                    $("#mdf-toolbar select.mdt-font-weight").val(itemValues.fontWeight);
                    $("#mdf-toolbar input.mdt-fontsize").val(itemValues.fontSize);
                    $("#mdf-toolbar input.mdt-lineheight").val(itemValues.lineHeight);

                    $("#mdf-toolbar a.mdt-font-bold").toggleClass("active", (itemValues.fontWeight == "bold"));
                    $("#mdf-toolbar a.mdt-font-italic").toggleClass("active", (itemValues.fontStyle == "italic"));
                    $("#mdf-toolbar a.mdt-font-underline").toggleClass("active", (itemValues.textDecoration == "underline"));
                    $("#mdf-toolbar a.mdt-font-allcaps").toggleClass("active", (itemValues.textTransform == "uppercase"));
                    $("#mdf-toolbar a.mdt-left-alignment").toggleClass("active", (itemValues.textAlign == "left"));
                    $("#mdf-toolbar a.mdt-center-alignment").toggleClass("active", (itemValues.textAlign == "center"));
                    $("#mdf-toolbar a.mdt-right-alignment").toggleClass("active", (itemValues.textAlign == "right"));
                    $("#mdf-toolbar a.mdt-justified-alignment").toggleClass("active", (itemValues.textAlign == "justified"));
                } else if(itemValues.type == "image") {
                    $("#mdf-toolbar input.mdt-alt-image").val(itemValues.title);
                    $("#mdf-toolbar .box-item.box-image").slideDown();
                    $("#mdf-toolbar .box-item:not(.box-image)").hide();
                } else if(itemValues.type == "video") {
                    $("textarea.mdt-videoname", "#mdf-toolbar").val(itemValues.title);
                    $("input.mdt-video-fileid", "#mdf-toolbar").val(itemValues.fileid);
                    $("img.mdt-videosrc", "#mdf-toolbar").attr("src", itemValues.thumb);
                    $("#mdf-toolbar .box-item.box-video").slideDown();
                    $("#mdf-toolbar .box-item:not(.box-video)").hide();
                }

            }
        },
        changePositionValue: function(left, top) {
            $("input.mdt-left", "#mdf-toolbar").val(Math.round(left));
            $("input.mdt-top", "#mdf-toolbar").val(Math.round(top));
        },
        changeSizeValue: function(width, height) {
            $("input.mdt-width", "#mdf-toolbar").val(Math.round(width));
            $("input.mdt-height", "#mdf-toolbar").val(Math.round(height));
        },
        changeTimelineValue: function() {
            if (this.selectedItem != null) {
                $("input.mdt-starttime", "#mdf-toolbar").val(Math.round(this.selectedItem.data("starttime")));
                $("input.mdt-stoptime", "#mdf-toolbar").val(Math.round(this.selectedItem.data("stoptime")));
            }
        },
        changeFontWeightOption: function(fontweight) {
            var options = '<option value=""></option>';
            var oldoption = $("#mdf-toolbar select.mdt-font-weight").data("value");
            if(fontweight) {
                var fontweights = fontweight.split(",");
                for(var i = 0; i < fontweights.length; i++) {
                    var weight = fontweights[i].replace(/^\s+|\s+$/g, "");
                    options += '<option value="'+weight+'">'+ weightArray[weight] +'</option>'
                }
            }
            $("#mdf-toolbar select.mdt-font-weight").html(options).val(oldoption);
        },
        focusEdit: function() {
            if (this.selectedItem != null) {
                var type = this.selectedItem.data("type");
                if(type == "text") {
                    $("textarea.mdt-textvalue", "#mdf-toolbar").focus();
                } else if (type == "image") {
                    $("#mdf-edit-image").trigger("click");
                } else if (type == "video") {
                    $("#mdf-edit-video").trigger("click");
                }
            }
        },
        changePositionLeft: function(left) {
            $("#mdf-toolbar input.mdt-left").val(Math.round(left));
        },
        changePositionTop: function(top) {
            $("#mdf-toolbar input.mdt-top").val(Math.round(top));
        }
    }
    function isActiveBorder(borderString) {
        var borderArray = borderString.toString().split(" ");
        return (borderArray.length == 3);
    }
})(jQuery);