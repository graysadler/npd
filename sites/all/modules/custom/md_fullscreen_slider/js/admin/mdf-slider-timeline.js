/*------------------------------------------------------------------------
 # MegaSlide - Sep 17, 2013
 # ------------------------------------------------------------------------
 # Designed & Handcrafted by MegaDrupal
 # Websites:  http://www.megadrupal.com -  Email: info@megadrupal.com
 # Author: BaoNV
 ------------------------------------------------------------------------*/

(function($) {
    var timeWidth = 0.07,
        unitwidth = 7,
        colwidth = 218,
        itemTemplate = '<div class="mdf-item">'
                    +  '      <div class="mdi-view"><a href="#" class="btn-viewlayer"></a></div>'
                    +  '<div class="mdi-name">'
                    +  '    <span class="mdit-type">[image]</span>'
                    +  '    <span class="title"></span>'
                    +  '    <a href="#" class="btn-deletelayer"></a>'
                    +  '    <a href="#" class="btn-clonelayer"></a>'
                    +  '</div>'
                    +  '    <div class="mdtl-times"><div class="mdi-frame"></div></div>'
                    +  '</div>';
    MegaSlider.Timeline = function(panel){
        this.panel = panel;
    }
    MegaSlider.Timeline.prototype = {
        constructor : MegaSlider.Timeline,
        init: function() {
            var self = this;
            $("#mdf-timeline").tinyscrollbar();
            $("#slideshow-time").css("left", 6000 * timeWidth);
            $("#timeline-items").width(6000 * timeWidth + colwidth);
            $(document).on("click", "a.btn-viewlayer", function() {
                var timeline = $(this).parent().parent();
                var box = timeline.data("box");
                if(box != null) {
                    if ($(this).hasClass("active")) {
                        box.show();
                        box.attr("ishidden", "false");
                        timeline.removeClass("box-hide");
                        $(this).removeClass("active");
                    } else {
                        box.hide();
                        box.attr("ishidden", "true");
                        box.removeClass("ui-selected");
                        timeline.addClass("box-hide");
                        self.panel.triggerChangeSelectItem();
                        $(this).addClass("active");
                    }
                }
                return false;
            });
            $(document).on("click", "a.btn-deletelayer", function() {
                var timeline = $(this).parent().parent();
                var box = timeline.data("box");
                if(box != null) {
                    timeline.remove();
                    box.remove();
                    self.panel.triggerChangeSelectItem();
                }
                return false;
            });
            $(document).on("click", "a.btn-clonelayer", function() {
                var timeline = $(this).parent().parent();
                var box = timeline.data("box");
                if(box != null) {
                    self.panel.cloneBoxItem(box);
                }
                return false;
            });

            $("#timeline-items").sortable({
                handle: ".mdi-name",
                update: function(event, ui) {
                    self.triggerChangeOrderItem();
                },
                placeholder: "mdf-item"
            });
            $("#slideshow-time").draggable({
                axis: "x",
                grid: [unitwidth, 20],
                containment: "parent",
                drag: function(even, ui) {
                    if (ui.position.left <= self.maxStart + unitwidth)
                        return false;
                    return self.updateTimelineWidth();
                }
            });
        },
        changeSelectItem: function(item) {
            this.selectedItem = item;
            this.triggerChangeSelectItem();
        },
        triggerChangeSelectItem: function() {
            $("#timeline-items > div.mdf-item.active").removeClass("active");
            if (this.selectedItem != null) {
                var timeline = this.selectedItem.data("timeline");
                if (timeline != null) {
                    $(timeline).addClass("active");
                }
            }
        },
        setTimelineWidth: function(timelinewidth) {
            if(timelinewidth) {
                $("#slideshow-time").css("left", timelinewidth * timeWidth);
                this.updateTimelineWidth();
            }
        },
        updateTimelineWidth: function() {
            var self = this;
            var width =  $("#slideshow-time").position().left;
            this.panel.setTimelineWidth(Math.round(width / timeWidth));
            $("#timeline-items").width(colwidth + width);
            $("#timeline-items .mdf-item").each(function() {
                var frame = $(this).find(".mdi-frame");
                var box = $(this).data("box");
                if(box != null && frame.position().left + frame.width() > width) {
                    frame.width(width - frame.position().left);
                    box.data("stoptime", width / timeWidth);
                    self.panel.changeTimelineValue();
                }
            });
            return true;
        },
        addTimelineItem: function(type, box) {
            var $item = $(itemTemplate).clone(),
                self = this;
            $item.find(".mdit-type").html('['+ type +']');
            var title = box.data("title");
            $item.find("span.title").html(title);
            var starttime = box.data("starttime") ? box.data("starttime") : 0;
            var stoptime = box.data("stoptime") ? box.data("stoptime") : Math.round(($("#timeline-items").width() - colwidth) / timeWidth);
            if(stoptime >  starttime) {
                $item.find("div.mdi-frame").css({left: starttime * timeWidth, width: (stoptime - starttime) * timeWidth});
                if(box.data("starttime") == null || box.data("stoptime") == null) {
                    box.data("starttime", starttime);
                    box.data("stoptime", stoptime);
                    this.panel.changeTimelineValue();
                }
            }
            $item.data("box", box);

            $("#timeline-items").prepend($item);
            $item.find("div.mdi-frame").draggable({
                containment: "parent",
                grid: [unitwidth, 20],
                stop: function(event, ui) {
                    var $item = $(this).parent().parent();
                    var box = $item.data("box");
                    if (box != null) {
                        var position = $(ui.helper).position();
                        box.data("starttime", Math.round(position.left / timeWidth));
                        box.data("stoptime", Math.round((position.left + $(ui.helper).width()) / timeWidth));
                        if (box.hasClass("ui-selected")) {
                            self.panel.triggerChangeSettingItem();
                        }
                    }
                    self.changeMaxStart();
                }
            });

            $item.find("div.mdi-frame").resizable({
                handles: "e, w",
                containment: "parent",
                minWidth: 2 * unitwidth,
                grid: [unitwidth, 20],
                stop: function(event, ui) {
                    var $item = $(this).parent().parent();
                    var box = $item.data("box");
                    if (box != null) {
                        var position = $(ui.helper).position();
                        box.data("starttime", Math.round(position.left / timeWidth));
                        box.data("stoptime", Math.round((position.left + $(ui.helper).width()) / timeWidth));
                        if (box.hasClass("ui-selected")) {
                            self.panel.triggerChangeSettingItem();
                        }
                    }
                    self.changeMaxStart();
                }
            });
            $item.click(function() {
                if(!$(this).hasClass("active") && !$(this).hasClass("box-hide")) {
                    var box = $(this).data("box");
                    if (box != null) {
                        self.panel.changeSelectItem(box);
                    }
                }
            });
            box.data("timeline", $item);
            $("#mdf-timeline").tinyscrollbar_update("relative");
        },
        changeMaxStart: function() {
            var maxLeft = 0;
            $("#timeline-items .mdtl-times").each(function() {
                var thisLeft = $(this).find("div.mdi-frame").position().left;
                if (thisLeft > maxLeft) {
                    maxLeft = thisLeft;
                }
            });
            this.maxStart = maxLeft;
        },

        changeSelectItem: function(item) {
            this.selectedItem = item;
            this.triggerChangeSelectItem();
        },

        triggerChangeSelectItem: function() {
            $("#timeline-items > div.mdf-item.active").removeClass("active");
            if (this.selectedItem != null) {
                var item = this.selectedItem.data("timeline");
                if (item != null) {
                    $(item).addClass("active");
                }
            }
        },
        triggerChangeOrderItem: function() {
            $("#timeline-items .mdf-item").each(function(index) {
                var box = $(this).data("box");
                if (box != null) {
                    box.data("zindex", 1000 - index);
                    box.css("z-index", 1000 - index);
                }
            });
        },
        changeSelectedItemTitle: function() {
            if (this.selectedItem != null) {
                var item = this.selectedItem.data("timeline");
                if (item != null) {
                    var title = this.selectedItem.data("title");
                    $(item).find("span.title").html(title);
                }
            }
        },
        setTimelineWidth: function(timeline) {
            if(timeline) {
                $("#slideshow-time").css("left", timeline * timeWidth);
                this.updateTimelineWidth();
            }

        },
        changeActivePanel: function() {
            $("#timeline-items").html("");
            var  timelinewidth = this.panel.getTimelineWidth()
            if(timelinewidth != null) {
                this.setTimelineWidth(timelinewidth);
            }
            else
                this.panel.setTimelineWidth($("#slideshow-time").position().left / timeWidth)
            var items = this.panel.getAllItemBox();

            items.sort(function(a, b){
                var aZindex = parseInt($(a).data("zindex"));
                var bZindex = parseInt($(b).data("zindex"));
                return ((aZindex < bZindex) ? -1 : ((aZindex > bZindex) ? 1 : 0));
            });
            var self = this;
            items.each(function() {
                self.addTimelineItem($(this).data("type"), $(this));
            });
        }
    }
})(jQuery);