/*------------------------------------------------------------------------
 # MegaSlide - Sep 17, 2013
 # ------------------------------------------------------------------------
 # Designed & Handcrafted by MegaDrupal
 # Websites:  http://www.megadrupal.com -  Email: info@megadrupal.com
 # Author: BaoNV
 ------------------------------------------------------------------------*/

(function($) {
    var tabTemplate = "",
        textBoxTemplate = '<div class="slider-item ui-widget-content item-text" data-top="0" data-left="0" data-width="100" data-height="50" data-borderstyle="solid" data-type="text" data-title="Text" style="width: 100px; height: 50px;"><div>Text</div><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span> </div>',
        imageBoxTemplate = '<div class="slider-item ui-widget-content item-image" data-top="0" data-left="0" data-width="80" data-height="80" data-borderstyle="solid" style="height: 80px;width: 80px;" data-type="image"><img width="100%" height="100%" src="http://files.megadrupal.com/other/image.jpg" /><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span></div>',
        videoBoxTemplate = '<div class="slider-item ui-widget-content item-video" data-top="0" data-left="0" data-width="80" data-height="80" data-borderstyle="solid" style="height: 80px;width: 80px;" data-type="video"><img width="100%" height="100%" src="http://files.megadrupal.com/other/video.jpg" /><span class="sl-tl"></span><span class="sl-tr"></span><span class="sl-bl"></span><span class="sl-br"></span><span class="sl-top"></span><span class="sl-right"></span><span class="sl-bottom"></span><span class="sl-left"></span><span class="sl-video-play"></span></div>';
    MegaSlider.Panel = function(){
        this.activePanel = null;
        this.selectedItem = null;
        this.tabCounter = $("#mdf-tabs ul.mdf-tabs-head li.tab-item").size();
        this.toolbar = new MegaSlider.Toolbar(this);
        this.timeline = new MegaSlider.Timeline(this);

    }
    MegaSlider.Panel.prototype = {
        constructor : MegaSlider.Panel,
        init: function() {
            this.initTab();
            this.initPanel();
            this.initDlgSetting();
            this.initSliderItem();
            this.toolbar.init();
            this.timeline.init();
            this.timeline.changeActivePanel();
            this.triggerChangeSelectItem();
            var self = this;
            $(document).keydown(function(event) {
                var keyCode = event.keyCode || event.which;
                var isInput = $(event.target).is("input, textarea, select");
                if(!isInput && self.selectedItem != null) {
                    switch(keyCode) {
                        case 46:
                            var timeline = self.selectedItem.data("timeline");
                            if(timeline != null) {
                                timeline.remove();
                                self.selectedItem.remove();
                                self.triggerChangeSelectItem();
                            }
                            return false;
                            break;
                        case 37:
                            var left = self.selectedItem.data("left") - 5;
                            left = self.setPositionBoxLeft(self.selectedItem, left);
                            self.toolbar.changePositionLeft(left);
                            return false;
                            break;
                        case 38:
                            var top = self.selectedItem.data("top") - 5;
                            top = self.setPositionBoxTop(self.selectedItem, top);
                            self.toolbar.changePositionTop(top);
                            return false;
                            break;
                        case 39:
                            var left = self.selectedItem.data("left") + 5;
                            left = self.setPositionBoxLeft(self.selectedItem, left);
                            self.toolbar.changePositionLeft(left);
                            return false;
                            break;
                        case 40:
                            var top = self.selectedItem.data("top") + 5;
                            top = self.setPositionBoxTop(self.selectedItem, top);
                            self.toolbar.changePositionTop(top);
                            return false;
                            break;
                    }
                }
            });

            $("form input").keypress(function(event){
                var key = event.keyCode || event.which;
                if (key == 13)
                    event.preventDefault();
            });

            // Preview transition slides
            var slider = $("#mdf-full-screen-slider-preview").mdFullScreenSlider({
                transitionsSpeed: 800,
                wrapHeight: '151',
                wrapWidth: '291',
                width: 291,
                height: 151,
                slideShow: true,
                loop: true,
                showBullet: false,
                showThumb: false,
                posBullet: 1,
                posThumb: 1,
                css3bg: '#000000',
                showLoading: false,
                loadingPosition: 'bottom',
                showArrow: false,
                enableDrag: true,
                preLoad: false
            });
            $("#navbar-content-transitions li").hoverIntent(function(){
                var tran = $("input", this).attr('value');
                $("#mdf-full-screen-slider-preview .mdf-slide-item").data("transition", tran);
                var transition_pos = $(this).position(),
                    dialog_pos = $("#mdf-setting-dlg .mdf-setting-transition").position();

                var pos_top = 0, pos_left = transition_pos.left - 145 +  $(this).width()/2;
                if (transition_pos.top - dialog_pos.top > 161)
                    pos_top = transition_pos.top - 161;
                else
                    pos_top = transition_pos.top + 2*$(this).height();
                $("#mdf-transition-preview").css({left: pos_left, top: pos_top}).show();
            }, function() {$("#mdf-transition-preview").hide()});
        },
        initTab: function() {
            var self = this;
            tabTemplate = $("#tab-template").html();
            $("#mdf-tabs").tabs({
                activate: function(event, ui) {
                    $(self.activePanel).find(".slider-item.ui-selected").removeClass("ui-selected");
                    if($("#mdf-tabs ul.mdf-tabs-head a.active").size() > 0) {
                        self.closeTabDialog();
                    }
                    self.activePanel = $(ui.newPanel);
                    self.timeline.changeActivePanel();
                    self.triggerChangeSelectItem();
                },
                create: function(event, ui) {
                    self.activePanel = $(ui.panel);
                }
            });
            $("#mdf-tabs").find( ".ui-tabs-nav" ).sortable({
                axis: "x",
                stop: function() {
                    $("#mdf-tabs").tabs( "refresh" );
                }
            });
            $("#add_tab").click(function() {
                self.addTab();
                return false;
            });
        },
        initPanel: function() {
            var self = this;
            // tab setting click
            $(document).on("click", "#mdf-tabs ul.mdf-tabs-head .panel-settings-link", function() {
                var $link = $(this),
                    settings = $.stringToObject($('input.tab-setting', self.activePanel).val());
                if($(this).hasClass("active")) {
                    $("#mdf-setting-dlg").slideUp();
                    $link.removeClass("active");
                } else {
                    var $active = $("#mdf-tabs ul.mdf-tabs-head a.active");
                    self.setTabDialogSetting(settings);
                    if($active.size() > 0) {
                        $active.removeClass("active");
                        $link.addClass("active");
                    } else {
                        $("#mdf-setting-dlg").slideDown();
                        $link.addClass("active");
                    }
                }
                return false;
            });
            // setting dlg - button close - click
            $("#mdf-tabs a.button-close").click(function() {
                $("#mdf-setting-dlg").slideUp(function() {
                    $("#mdf-tabs ul.mdf-tabs-head a.active").removeClass("active");
                });
                return false;
            });
            $("#mdf-slide-save").click(function(event) {
                event.preventDefault();

                var data = self.getSliderData(),
                    submit_data = {slide_data: data, action: "save"};
                var temp = $.objectToString(submit_data);
                $("#edit-save-data").val(temp);
                $("form").submit();
            });
            $("#mdf-slide-download").click(function() {
                var data = self.getSliderData(),
                submit_data = {slide_data: data, action: "download"};
                $("#edit-save-data").val($.objectToString(submit_data));
                $("form").submit();
                return false;
            });
            $("#mdf-slide-preview").click(function() {
                var data = self.getSliderData(),
                    sid = $("input[name=sid]").val();
                $.post(
                    Drupal.settings.basePath + "admin/structure/fullscreen-slider/preview",
                    {sid: sid, data: $.objectToString(data)},
                    function(data){
                        var position = $(".mdf-tabs-tool").offset();
                        position.left += 0.0425*$(document).width();
                        position.top -= $(document).scrollTop();
                        $("#fullscreen-slider-preview").empty().dialog({width:"91.5%", position: [position.left, position.top]}).html(data);
                    }
                );
                return false;
            });
            $("#mdf-slide-exit").click(function() {
                $( "#exit-dialog" ).dialog({
                    resizable: false,
                    height: 200,
                    width: 300,
                    modal: true,
                    buttons: {
                        "Exit": function() {
                            var url_elements = window.location.pathname.split('/'),
                                url = '';

                            for (var i = 1; i < url_elements.length-2; i++)
                                url +=  '/' + url_elements[i];
                            window.location.replace(url);
                            $( this ).dialog( "close" );
                        },
                        Cancel: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                });
                return false;
            });
        },
        initDlgSetting: function() {
            var self = this;
            // click button clone slide
            $("#mdf-setting-dlg .row-clone a").click(function() {
                self.cloneTab(self.activePanel);
                return false;
            });

            // click button remove
            $("#mdf-setting-dlg .row-remove a").click(function() {
                if(self.activePanel) {
                    if (!confirm('Are you sure want to delete this slide? After accepting this slide will be removed completely.'))
                        return;

                    var settings =  $.stringToObject($('input.tab-setting', self.activePanel).val()),
                        panelId = self.activePanel.attr("id"),
                        allowDelete = true;

                    if (settings.slideId > 0) {
                        $.post(Drupal.settings.basePath + "?q=admin/structure/fullscreen-slider/delete-slide", {slide_id: settings.slideId}, function(response) {
                            if (response.status == 0)
                                allowDelete = false;
                        });
                    }

                    if (allowDelete) {
                        $("#mdf-tabs .mdf-tabs-head li[aria-controls="+panelId+"]").remove();
                        $( "#" + panelId ).remove();
                        $("#mdf-tabs").tabs( "refresh" );
                        $("#mdf-tabs").tabs( "option", "active", 0);
                        self.closeTabDialog();
                    }
                }
                return false;
            });
            $("#mdf-setting-dlg .row-image a.btn-choose").click(function() {
                Drupal.media.popups.mediaBrowser(chooseBackground);
                return false;
            });

            $("#mdf-setting-dlg .img-preview img").bind("change", function() {
                if($(this).attr("src")) {
                    $(this).parent().slideDown();
                } else {
                    $(this).parent().slideUp();
                }
            });

            // click button del image
            $("#mdf-setting-dlg .del-img").click(function() {
                $(this).prev().attr("src", "").trigger("change");
                return false;
            });

            $("#mdf-setting-dlg .row-thumbnail a.btn-choose").click(function() {
                Drupal.media.popups.mediaBrowser(chooseThumbnail);
                return false;
            });
            // click button del thumb
            $("#mdf-setting-dlg .del-thumb").click(function() {
                $(this).prev().attr("src", "").trigger("change");
            });

            // background image
            $(".row-background-color input, .row-background-overlay input", '#mdf-setting-dlg ').spectrum({

                clickoutFiresChange: true,
                showInput: true,
                showAlpha: true,
                preferredFormat: "rgb"
            });
            $("#tst-thumbnail").change(function() {
                if($(this).is(':checked')) {
                    $("#mdf-setting-dlg .row-thumbnail > .row-inner").slideDown();
                } else {
                    $("#mdf-setting-dlg .row-thumbnail > .row-inner").slideUp();
                }
            });
            $("#tst-transition").change(function() {
                if($(this).is(':checked')) {
                    $("#mdf-setting-dlg .row-transition > .row-inner").slideDown();
                } else {
                    $("#mdf-setting-dlg .row-transition > .row-inner").slideUp();
                }
            });
            $("#mdf-setting-dlg .button-apply").click(function() {
                var setting = self.getTabDialogSetting();
                $('input.tab-setting', self.activePanel).val($.objectToString(setting));
                // Set preview settings
                $(".mdf-slide-image img", self.activePanel).attr("src", setting.bgImage);
                $(".mdf-slide-image", self.activePanel).css("background-color", setting.bgColor);
                $(".mdf-slide-overlay", self.activePanel).css('background-color', setting.bgOverlay);

                self.closeTabDialog();
                return false;
            });
            $(".random-transition").click(function(){
                var number = Math.floor((Math.random()*5)+3),
                    number_transition = $("ul.megaslider-3columns li").length;
                $("#navbar-content-transitions input").prop("checked", false);
                for (var i = 1; i < number; i++) {
                    var transition = Math.floor((Math.random()*number_transition)+1);
                    $("#transition-"+transition).prop("checked", true);
                }
                return false;
            });
        },
        closeTabDialog: function() {
            $("#mdf-setting-dlg").slideUp(function() {
                $("#mdf-tabs ul.mdf-tabs-head a.active").removeClass("active");
            });
        },
        initSliderItem: function() {
            var self = this;
            $("#mdf-tabs div.slider-item").each(function() {
                $(this).data("slidepanel", self).triggerItemEvent();
                var setting = $(this).getItemValues();
                $(this).setItemStyle(setting);
            });
        },
        setTabDialogSetting: function(setting) {
            $("input.setting-slideid", '#mdf-setting-dlg').val(setting.slideId ? setting.slideId : "");
            $("input.setting-bgfid", '#mdf-setting-dlg').val(setting.bgFid ? setting.bgFid : "");
            $(".row-image .img-preview img", '#mdf-setting-dlg').attr("src", setting.bgImage ? setting.bgImage : "").trigger("change");
            $(".row-background-color input", '#mdf-setting-dlg').spectrum("set", setting.bgColor ? setting.bgColor : 'rgba(0,0,0,0)');
            $(".row-background-overlay input", '#mdf-setting-dlg').spectrum("set", setting.bgOverlay ? setting.bgOverlay : 'rgba(0,0,0,0)');
            $("#tst-thumbnail").prop("checked", setting.customThumb).trigger("change");

            $(".row-thumbnail .img-preview img", '#mdf-setting-dlg').attr("src", setting.thumb ? setting.thumb : "").trigger("change");
            $("input.setting-thumbfid", '#mdf-setting-dlg ').val(setting.thumbFid ? setting.thumbFid : "");
            $("#tst-transition").attr("checked", setting.customTransitionTime).trigger("change");
            $(".row-transition input.trans-time", '#mdf-setting-dlg').val(setting.transitionTime);

            $("#navbar-content-transitions input").prop("checked", false);
            if(Array.isArray(setting.transitions)) {
                $.each(setting.transitions, function(index, value) {
                    $("#navbar-content-transitions input[value="+value+"]").prop("checked", true);
                });
            }
        },
        getTabDialogSetting: function() {
            var transitions = [],
                $mdSettignsDlg = $('#mdf-setting-dlg');
            $("#navbar-content-transitions input:checked").each(function() {
                transitions.push($(this).val());
            });
            return {
                slideId: $("input.setting-slideid", $mdSettignsDlg).val(),
                bgFid: $("input.setting-bgfid", $mdSettignsDlg).val(),
                bgImage: $(".row-image img", $mdSettignsDlg).attr("src"),
                bgColor: $(".row-background-color input", $mdSettignsDlg).val(),
                bgOverlay: $(".row-background-overlay input", $mdSettignsDlg).val(),
                customThumb: $("#tst-thumbnail").is(":checked"),
                thumb: $(".row-thumbnail img", $mdSettignsDlg).attr("src"),
                thumbFid: $("input.setting-thumbfid", $mdSettignsDlg).val(),
                customTransitionTime: $("#tst-transition").is(':checked'),
                transitionTime: $(".row-transition input.trans-time", $mdSettignsDlg).val(),
                transitions: transitions
            };
        },
        triggerChangeSelectItem: function() {
            if (this.activePanel == null) return;
            var selected = $(this.activePanel).find(".slider-item.ui-selected");
            if (selected.size() == 1) {
                this.selectedItem = selected;
            } else {
                this.selectedItem = null;
            }
            this.toolbar.changeSelectItem(this.selectedItem);
            this.timeline.changeSelectItem(this.selectedItem);
        },
        addTab: function() {
            this.tabCounter++;
            var tabTitle = "Slide " + this.tabCounter,
                tabId = "tabs-" + this.tabCounter;
            var $newTab = $('<div id="' + tabId + '" class="tabs-panel"></div>');
            $newTab.append(tabTemplate).data('timelinewidth', $("#mdf-tabs").data("timelinewidth"));
            $("#mdf-tabs").append($newTab);
            var $newLi = $('<li class="tab-item"><a class="tab-link" href="#'+tabId+'"><span class="tab-text">'+tabTitle+'</span></a><a class="panel-settings-link" href="#"></a></li>');
            $newLi.appendTo("#mdf-tabs .mdf-tabs-head");
            var liindex = $("#mdf-tabs .ui-tabs-nav li").index($newLi);
            $("#mdf-tabs").tabs("refresh");
            $("#mdf-tabs").tabs( "option", "active", liindex);
        },
        cloneTab: function(tab) {
            var self = this;
            self.addTab();
            var tabId = "#tabs-" + self.tabCounter;
            $(tabId).find(".mdf-slide-image").html(tab.find(".mdf-slide-image").html());
            var setting = $.stringToObject($("input.tab-setting", tab).val());
            setting.slideId = -1;
            var timelinewidth = tab.data("timelinewidth") ? tab.data("timelinewidth") : $("#mdf-tabs").data("timelinewidth");
            $(tabId).data("timelinewidth", timelinewidth);
            $(tabId + " input.tab-setting").val($.objectToString(setting));
            self.timeline.setTimelineWidth(setting.transitiontime);
            $(".slider-item", tab).each(function() {
                self.cloneBoxItem($(this));
            });
        },
        cloneBoxItem: function(boxItem) {
            var self = this,
                itemData = $(boxItem).getItemValues();
            if(itemData && self.activePanel != null) {
                var box, type = itemData.type;
                if (type == "text") {
                    box =  $(textBoxTemplate).clone();
                } else if (type == "image") {
                    box =  $(imageBoxTemplate).clone();
                } else {
                    box =  $(videoBoxTemplate).clone();
                }
                box.data("slidepanel", self).appendTo($(".mdf-objects", self.activePanel)).triggerItemEvent();
                box.setItemValues(itemData);
                box.setItemStyle(itemData);
                box.setItemHtml(itemData);
                self.timeline.addTimelineItem(type, box);
                return true;
            }
        },
        triggerChangeSettingItem: function() {
            this.toolbar.changeToolbarValue();
        },
        addBoxItem: function(type) {
            if (this.activePanel != null) {
                var box;
                if (type == "text") {
                    box =  $(textBoxTemplate).clone();
                } else if (type == "image") {
                    box =  $(imageBoxTemplate).clone();
                } else {
                    box =  $(videoBoxTemplate).clone();
                }
                this.timeline.addTimelineItem(type, box);
                box.data("slidepanel", this).appendTo($(".mdf-objects", this.activePanel)).triggerItemEvent();
                this.changeSelectItem(box);
                this.timeline.triggerChangeOrderItem();
                this.toolbar.focusEdit();
                return true;
            }
            return false;
        },
        changeSelectItem: function(item) {
            $(this.activePanel).find(".slider-item.ui-selected").removeClass("ui-selected");
            item.addClass("ui-selected");
            this.triggerChangeSelectItem();
        },
        triggerChangeSelectItem: function() {
            if (this.activePanel == null) return;
            var selected = $(this.activePanel).find(".slider-item.ui-selected");
            if (selected.size() == 1) {
                this.selectedItem = selected;
                this.toolbar.changeSelectItem(this.selectedItem);
                this.timeline.changeSelectItem(this.selectedItem);
            } else if (selected.size() == 0) {
                this.selectedItem = null;
                this.toolbar.changeSelectItem(this.selectedItem);
                this.timeline.changeSelectItem(this.selectedItem);
            } else {
                this.selectedItem = null;
                this.toolbar.changeSelectItem(this.selectedItem, true);
                this.timeline.changeSelectItem(this.selectedItem);
            }

        },
        getAllItemBox: function() {
            return $("div.slider-item", this.activePanel);
        },
        changeTimelineValue: function() {
            this.toolbar.changeTimelineValue();
        },
        setTimelineWidth: function(timeline) {
            if(this.activePanel) {
                $(this.activePanel).data("timelinewidth", timeline);
            }
        },
        getTimelineWidth: function() {
            if(this.activePanel) {
                return $(this.activePanel).data("timelinewidth");
            }
            return null;
        },
        setItemBorder: function(name, borderString) {
            if (this.selectedItem != null) {
                if(name == "all") {
                    this.selectedItem.data("borderAll", borderString);
                    this.selectedItem.data("borderTop", borderString);
                    this.selectedItem.data("borderRight", borderString);
                    this.selectedItem.data("borderLeft", borderString);
                    this.selectedItem.data("borderBottom", borderString);
                    this.selectedItem.css({borderTop: borderString, borderRight: borderString, borderBottom: borderString, borderLeft: borderString});
                } else if(name == "top") {
                    this.selectedItem.data("borderTop", borderString);
                    this.selectedItem.css({borderTop: borderString});
                } else if(name == "right") {
                    this.selectedItem.data("borderRight", borderString);
                    this.selectedItem.css({borderRight: borderString});
                } else if(name == "bottom") {
                    this.selectedItem.data("borderBottom", borderString);
                    this.selectedItem.css({borderBottom: borderString});
                } else {
                    this.selectedItem.data("borderLeft", borderString);
                    this.selectedItem.css({borderLeft: borderString});
                }
            }
        },
        changeFontFamily: function(fontfamily) {
            if (this.selectedItem != null) {
                var font = JSON.stringify(fontfamily);

                $(this.selectedItem).data("font-family", fontfamily);

                $(this.selectedItem).css({"font-family": fontfamily});
            }
        },
        setItemSize: function(width, height) {
            this.setBoxWidth(this.selectedItem, width);
            this.setBoxHeight(this.selectedItem, height);
        },
        setBoxWidth: function(el, width) {
            if(width > 0) {
                var maxWidth = $(el).parent().width() - $(el).position().left;
                if(width > maxWidth)
                    width = maxWidth;
                $(el).width(width);
                $(el).data("width", width);
                return width;
            }
            return $(el).width();
        },
        setBoxHeight: function(el, height) {
            if(height > 0) {
                var maxHeight = $(el).parent().height() - $(el).position().top;
                if(height > maxHeight)
                    height = maxHeight;
                $(el).height(height);
                $(el).data("height", height);
                return height;
            }
            return $(el).height();
        },
        setItemAttribute: function(attrName, value) {
            if (this.selectedItem != null) {
                switch (attrName) {
                    case "left": return this.setPositionBoxLeft(this.selectedItem, value); break;
                    case "top": return this.setPositionBoxTop(this.selectedItem, value); break;
                }
            }
        },
        setPositionBoxLeft: function(el, left) {
            left = (left > 0) ? left : 0;
            var maxLeft = $(el).parent().width() - $(el).outerWidth(true);
            if(left > maxLeft)
                left = maxLeft;
            $(el).css("left", left + "px");
            $(el).data("left", left);
            return left;
        },
        setPositionBoxTop: function(el, top) {
            top = (top > 0) ? top : 0;
            var maxTop = $(el).parent().height() - $(el).outerHeight();
            if(top > maxTop)
                top = maxTop;
            $(el).css("top", top + "px");
            $(el).data("top", top);
            return top;
        },
        setItemData: function(attrName, value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data(attrName, value);
            }
        },
        setItemCss: function(attrName, value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data(attrName, value);
                $(this.selectedItem).css(attrName, value);
            }
        },
        setItemBackground: function(name, value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data(name, value);
                var bgcolor = $(this.selectedItem).data("backgroundColor");
                if(bgcolor && bgcolor != "") {
                    var opacity = parseInt($(this.selectedItem).data("backgroundTransparent"));
                    var rgb = $.HexToRGB(bgcolor);
                    opacity = opacity ? opacity : 100;
                    var itemcolor = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + (opacity / 100) + ')';
                    this.selectedItem.css("backgroundColor", itemcolor);
                } else {
                    this.selectedItem.css("backgroundColor", "transparent");
                }
            }
            return false;
        },
        setItemShadow: function(name, value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data(name, value);
                var data = $(this.selectedItem).getItemValues(),
                    shadowAngle = data.shadowAngle,
                    shadowOffset = data.shadowOffset,
                    shadowBlur = data.shadowBlur,
                    shadowColor = data.shadowColor;
                if(shadowAngle != null && shadowOffset != null && shadowBlur != null && shadowColor != null) {
                    var hshadow = Math.round(shadowOffset * Math.cos((shadowAngle - 90) / 180 * Math.PI)),
                        vshadow = Math.round(shadowOffset * Math.sin((shadowAngle - 90) / 180 * Math.PI)),
                        boxShaDow = hshadow + "px " + vshadow + "px " + parseInt(shadowBlur) + "px " + shadowColor;
                    this.selectedItem.css("box-shadow", boxShaDow);
                } else {
                    this.selectedItem.css("box-shadow", "none");
                }
            }
            return false;
        },
        setPadding: function(padding) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data("padding", padding);
                var css = {};
                if(padding) {
                    var setting = this.selectedItem.getItemValues();
                    if(setting.paddingTop)
                        css["padding-top"] = setting.paddingTop + "px";
                    if(setting.paddingRight)
                        css["padding-right"] = setting.paddingRight + "px";
                    if(setting.paddingBottom)
                        css["padding-bottom"] = setting.paddingBottom + "px";
                    if(setting.paddingLeft)
                        css["padding-left"] = setting.paddingLeft + "px";
                } else {
                    css["padding-top"] = 0;
                    css["padding-right"] = 0;
                    css["padding-bottom"] = 0;
                    css["padding-left"] = 0;
                }
                $(this.selectedItem).css(css);
            }
        },
        setItemCssPx: function(name, value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data(name, value);

                if (name == "fontSize" || name == "lineHeight")
                    $("div:first", this.selectedItem).css(name, value + "px");
                else
                    this.selectedItem.css(name, value + "px");
            }
        },
        setItemFontWeight: function(value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data("fontWeight", value);
                value = value.toString();
                if(value.indexOf("italic") > 0) {
                    this.selectedItem.css("fontWeight", parseInt(value));
                    this.selectedItem.css("fontStyle", "italic");
                } else {
                    this.selectedItem.css("fontWeight", parseInt(value));
                    this.selectedItem.css("fontStyle", "normal");
                }
            }
        },
        alignLeftSelectedBox: function() {
            var self = this, selectedItems = $(this.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var minLeft = 10000;
                selectedItems.each(function () {
                    minLeft = ($(this).position().left < minLeft) ? $(this).position().left : minLeft;
                });
                selectedItems.each(function () {
                    self.setPositionBoxLeft(this, minLeft);
                });
            }
        },
        alignRightSelectedBox: function() {
            var self = this, selectedItems = $(this.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var maxRight = 0;
                selectedItems.each(function() {
                    var thisRight = $(this).position().left + $(this).outerWidth();
                    maxRight = (thisRight > maxRight) ? thisRight : maxRight;
                });
                selectedItems.each(function() {
                    self.setPositionBoxLeft(this, maxRight - $(this).outerWidth());
                });

            }
        },
        alignCenterSelectedBox: function() {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var center = selectedItems.first().position().left + selectedItems.first().outerWidth() / 2;
                selectedItems.each(function() {
                    self.setPositionBoxLeft(this, center - $(this).outerWidth() / 2);
                });
            }
        },
        alignTopSelectedBox: function() {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var minTop = 10000;
                selectedItems.each(function() {
                    minTop = ($(this).position().top < minTop) ? $(this).position().top : minTop;
                });
                selectedItems.each(function() {
                    self.setPositionBoxTop(this, minTop);
                });
            }
        },
        alignBottomSelectedBox: function() {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var maxBottom = 0, thisBottom;
                selectedItems.each(function() {
                    thisBottom = $(this).position().top + $(this).outerHeight();
                    maxBottom = (thisBottom > maxBottom) ? thisBottom : maxBottom;
                });
                selectedItems.each(function() {
                    self.setPositionBoxTop(this, maxBottom - $(this).outerHeight());
                });

            }
        },
        alignMiddleSelectedBox: function() {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                var center = selectedItems.first().position().top + selectedItems.first().outerHeight() / 2;
                selectedItems.each(function() {
                    self.setPositionBoxTop(this, center - $(this).outerHeight() / 2);
                });
            }
        },
        spaceVertical: function(spacei) {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                spacei = parseInt(spacei);

                // sap xep thu tu top items
                var n = selectedItems.size();
                for (var i = 0; i < n - 1; i++) {
                    for (var j = i+1; j < n; j++) {
                        if ($(selectedItems[i]).position().top > $(selectedItems[j]).position().top) {
                            var swap = selectedItems[i];
                            selectedItems[i] = selectedItems[j];
                            selectedItems[j] = swap;
                        }
                    }
                }

                if (spacei > 0) {
                    for (var i = 1; i < n; i++) {
                        self.setPositionBoxTop($(selectedItems[i]), $(selectedItems[i-1]).position().top + $(selectedItems[i-1]).outerHeight() + spacei);
                    }
                } else if(n > 2) {
                    var sumHeight = 0;
                    for (var i = 0; i < n - 1; i++) {
                        sumHeight += $(selectedItems[i]).outerHeight();
                    }
                    spacei = ($(selectedItems[n-1]).position().top - $(selectedItems[0]).position().top - sumHeight) / (n - 1);
                    for (var i = 1; i < n - 1; i++) {
                        self.setPositionBoxTop($(selectedItems[i]), $(selectedItems[i-1]).position().top + $(selectedItems[i-1]).outerHeight() + spacei);
                    }
                }

            }
        },
        spaceHorizontal: function(spacei) {
            var self = this, selectedItems = $(self.activePanel).find(".slider-item.ui-selected");
            if (selectedItems.size() > 1) {
                spacei = parseInt(spacei);

                // sap xep thu tu left items
                var n = selectedItems.size();
                for (var i = 0; i < n - 1; i++) {
                    for (var j = i+1; j < n; j++) {
                        if ($(selectedItems[i]).position().left > $(selectedItems[j]).position().left) {
                            var swap = selectedItems[i];
                            selectedItems[i] = selectedItems[j];
                            selectedItems[j] = swap;
                        }
                    }
                }

                if (spacei > 0) {
                    for (var i = 1; i < n; i++) {
                        self.setPositionBoxLeft($(selectedItems[i]), $(selectedItems[i-1]).position().left + $(selectedItems[i-1]).outerWidth() + spacei);
                    }
                } else if(n > 2) {
                    var sumWidth = 0;
                    for (var i = 0; i < n - 1; i++) {
                        sumWidth += $(selectedItems[i]).outerWidth();
                    }
                    spacei = ($(selectedItems[n-1]).position().left - $(selectedItems[0]).position().left - sumWidth) / (n - 1);
                    for (var i = 1; i < n - 1; i++) {
                        self.setPositionBoxLeft($(selectedItems[i]), $(selectedItems[i-1]).position().left + $(selectedItems[i-1]).outerWidth() + spacei);
                    }
                }

            }
        },
        setItemTitle: function(value) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data("title", value);
                if($(this.selectedItem).data("type") == "text")
                    $(this.selectedItem).find("div").html(value.replace(/\n/g, "<br />"));
                this.timeline.changeSelectedItemTitle();
            }
        },
        getSliderData: function() {
            var data = [];
            $("#mdf-tabs .ui-tabs-nav a.tab-link").each(function() {
                var panel = $($(this).attr("href"));
                if(panel.size()) {
                    var itemsetting = $.stringToObject($("input.tab-setting", panel).val());
                    itemsetting.timelinewidth = panel.data("timelinewidth");
                    var boxitems = [];
                    $("div.slider-item", panel).each(function() {
                        boxitems.push($(this).getItemValues());
                    });
                    data.push({itemsetting: itemsetting, boxitems: boxitems});
                }
            });
            return data;
        },
        setItemImageSrc: function(fileid, imageSrc, name) {
            var self = this;
            if (this.selectedItem != null) {
                $(this.selectedItem).data("fileid", fileid);
                $(this.selectedItem).data("title", name);
                $(this.selectedItem).data("thumb", imageSrc);
                $(this.selectedItem).find("img").attr("src", imageSrc).load(function() {
                    var newImg = new Image();
                    newImg.src = imageSrc;
                    var width = newImg.width,
                        height = newImg.height,
                        panelWidth = self.activePanel.find(".mdf-objects").width(),
                        panelHeight = self.activePanel.find(".mdf-objects").height();
                    if(height > 0 && panelHeight > 0) {
                        if(width > panelWidth || height > panelHeight) {
                            if((width / height) > (panelWidth / panelHeight)) {
                                self.setItemSize(panelWidth, height * panelWidth / width);
                            } else {
                                self.setItemSize(width * panelHeight / height, panelHeight);
                            }
                        } else {
                            self.setItemSize(width, height);
                        }
                        self.toolbar.changeSelectItem(self.selectedItem);
                    }
                });
                this.timeline.changeSelectedItemTitle();
            }
        },
        setVideoData: function(videoid, name, thumbsrc, thumbid) {
            var self = this;
            if (this.selectedItem != null) {
                $(this.selectedItem).data("title", name);
                $(this.selectedItem).data("fileid", videoid);
                $(this.selectedItem).data("thumb", thumbsrc);
                $(this.selectedItem).data("thumbid", thumbid);
                $(this.selectedItem).find("img").attr("src", thumbsrc).load(function() {
                    var newImg = new Image();
                    newImg.src = thumbsrc;
                    var width = newImg.width,
                        height = newImg.height,
                        panelWidth = self.activePanel.find(".mdf-objects").width(),
                        panelHeight = self.activePanel.find(".mdf-objects").height();
                    if(height > 0 && panelHeight > 0) {
                        if(width > panelWidth || height > panelHeight) {
                            if((width / height) > (panelWidth / panelHeight)) {
                                self.setItemSize(panelWidth, height * panelWidth / width);
                            } else {
                                self.setItemSize(width * panelHeight / height, panelHeight);
                            }
                        } else {
                            self.setItemSize(width, height);
                        }
                        self.toolbar.changeSelectItem(self.selectedItem);
                    }
                });
                self.timeline.changeSelectedItemTitle();
            }
        },
        setBorder: function(border) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data("border", border);
                var css = {};
                if(border) {
                    var setting = this.selectedItem.getItemValues();
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
                } else {
                    css["borderTop"] = "medium none";
                    css["borderRight"] = "medium none";
                    css["borderBottom"] = "medium none";
                    css["borderLeft"] = "medium none";
                    css["border-top-left-radius"] = 0;
                    css["border-top-right-radius"] = 0;
                    css["border-bottom-right-radius"] = 0;
                    css["border-bottom-left-radius"] = 0;
                }
                $(this.selectedItem).css(css);
            }
        },
        setShadow: function(shadow) {
            if (this.selectedItem != null) {
                $(this.selectedItem).data("shadow", shadow);
                var css = {};
                if(shadow) {
                    var shadowAngle = $(this.selectedItem).data("shadowAngle"),
                        shadowOffset = $(this.selectedItem).data("shadowOffset"),
                        shadowBlur = $(this.selectedItem).data("shadowBlur"),
                        shadowColor = $(this.selectedItem).data("shadowColor");
                    if(shadowAngle != null && shadowOffset != null && shadowBlur != null && shadowColor != null) {
                        var hshadow = Math.round(shadowOffset * Math.cos((shadowAngle - 90) / 180 * Math.PI)),
                            vshadow = Math.round(shadowOffset * Math.sin((shadowAngle - 90) / 180 * Math.PI)),
                            boxShaDow = hshadow + "px " + vshadow + "px " + parseInt(shadowBlur) + "px " + shadowColor;
                        this.selectedItem.css("box-shadow", boxShaDow);
                    } else {
                        this.selectedItem.css("box-shadow", "none");
                    }
                } else {
                    this.selectedItem.css("box-shadow", "none");
                }
            }
        }
    }
    chooseBackground = function(selected) {
        $("#mdf-setting-dlg .row-image .img-preview img").attr("src", selected[0].url).trigger("change");
        $("#mdf-setting-dlg .row-image .img-preview input").val(selected[0].fid);
    }
    chooseThumbnail = function(selected) {
        $("#mdf-setting-dlg .row-thumbnail .img-preview img").attr("src", selected[0].url).trigger("change");
        $("#mdf-setting-dlg .row-thumbnail .img-preview input").val(selected[0].fid);
    }
})(jQuery);
