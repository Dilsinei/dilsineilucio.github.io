! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function ($) {
    $.fn.extend($.easing, {
        def: "easeInOutExpo",
        easeInOutExpo: function (e, a, b, c, d) {
            return 0 === a ? b : a === d ? b + c : (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
        }
    }), $(document).keydown(function (a) {
        var b = a.keyCode,
            c = $(".currentGridder"),
            d = c.find(".gridder-show");
        c.length && (37 === b && (d.prev().prev().trigger("click"), a.preventDefault()), 39 === b && (d.next().trigger("click"), a.preventDefault()))
    }), $.fn.gridderExpander = function (a) {
        var b = $.extend({}, $.fn.gridderExpander.defaults, a);
        return this.each(function () {
            var c, a = $(this),
                d = !1;

            function e(c) {
                b.scroll && $("html, body").animate({
                    scrollTop: c.find(".selectedItem").offset().top - b.scrollOffset
                }, {
                    duration: 200,
                    easing: b.animationEasing
                }), a.removeClass("hasSelectedItem"), d = !1, c.find(".selectedItem").removeClass("selectedItem"), c.find(".gridder-show").slideUp(b.animationSpeed, b.animationEasing, function () {
                    c.find(".gridder-show").remove(), b.onClosed(c)
                }), $(".currentGridder").removeClass("currentGridder")
            }

            function f(e, f) {
                var a = '<div class="gridder-padding">';
                if (b.showNav) {
                    var g = $(".selectedItem").prev(),
                        h = $(".selectedItem").next().next();
                    a += '<div class="gridder-navigation">', a += '<a href="#" class="gridder-close">' + b.closeText + "</a>", a += '<a href="#" class="gridder-nav prev ' + (g.length ? "" : "disabled") + '">' + b.prevText + "</a>", a += '<a href="#" class="gridder-nav next ' + (h.length ? "" : "disabled") + '">' + b.nextText + "</a>", a += "</div>"
                }
                if (a += '<div class="gridder-expanded-content">', a += f, a += "</div>", a += "</div>", d ? (c.html(a), c.find(".gridder-padding").fadeIn(b.animationSpeed, b.animationEasing, function () {
                        d = !0, "function" == typeof b.onContent && b.onContent(c)
                    })) : c.hide().append(a).slideDown(b.animationSpeed, b.animationEasing, function () {
                        d = !0, "function" == typeof b.onContent && b.onContent(c)
                    }), b.scroll) {
                    var i = "panel" === b.scrollTo ? e.offset().top + e.height() - b.scrollOffset : e.offset().top - b.scrollOffset;
                    $("html, body").animate({
                        scrollTop: i
                    }, {
                        duration: b.animationSpeed,
                        easing: b.animationEasing
                    })
                }
                c.removeClass("loading")
            }
            b.onStart(a), a.on("click", ".gridder-list", function (d) {
                d.preventDefault(),
                    function (d) {
                        if ($(".currentGridder").removeClass("currentGridder"), a.addClass("currentGridder"), d.hasClass("selectedItem")) {
                            e(a, b);
                            return
                        }
                        a.find(".selectedItem").removeClass("selectedItem"), d.addClass("selectedItem"), a.find(".gridder-show").remove(), a.hasClass("hasSelectedItem") || a.addClass("hasSelectedItem"), c = $('<div class="gridder-show loading"></div>').insertAfter(d);
                        var g = "";
                        0 === d.data("griddercontent").indexOf("#") ? (g = $(d.data("griddercontent")).html(), f(d, g)) : $.ajax({
                            type: "GET",
                            url: d.data("griddercontent"),
                            success: function (a) {
                                f(d, g = a)
                            },
                            error: function (a) {
                                f(d, g = a.responseText)
                            }
                        })
                    }($(this))
            }), a.on("click", ".gridder-nav.next", function (a) {
                a.preventDefault(), $(this).parents(".gridder-show").next().trigger("click")
            }), a.on("click", ".gridder-nav.prev", function (a) {
                a.preventDefault(), $(this).parents(".gridder-show").prev().prev().trigger("click")
            }), a.on("click", ".gridder-close", function (b) {
                b.preventDefault(), e(a)
            })
        })
    }, $.fn.gridderExpander.defaults = {
        scroll: !0,
        scrollOffset: 30,
        scrollTo: "panel",
        animationSpeed: 400,
        animationEasing: "easeInOutExpo",
        showNav: !0,
        nextText: "Next",
        prevText: "Previous",
        closeText: "Close",
        onStart: function () {},
        onContent: function () {},
        onClosed: function () {}
    }
})