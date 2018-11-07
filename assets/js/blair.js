$(document).ready(function() {
    /*
     	Lightcase for images, videos & multimedia contents.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $("a[data-rel^=lightcase]").lightcase();

    /*
     	Disqus handling for page load speed.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(".disqus-trigger").click(function(e) {
        e.preventDefault();
        // Check if Disqus was already loaded before.
        if (typeof DISQUS === "undefined") {
            $.ajax({
                type: "GET",
                url: "//prashantshrestha.disqus.com/embed.js",
                dataType: "script",
                cache: true
            });
            $(".disqus").slideToggle("fast");
        } else {
            DISQUS.reset({
                reload: true,
                config: function() {
                    this.page.identifier = document.title;
                    this.page.url = location.href;
                }
            });
            $(".disqus").slideToggle("fast");
        }
        return false;
    });

    /* 	On Window scroll event to calculate the To Top display trigger.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(window).scroll(() => {
        if ($(this).scrollTop()) {
            $("a.to-top").fadeIn();
        } else {
            $("a.to-top").fadeOut();
        }
    });

    /* 	Smooth scrolling to anchor links.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $('a[href*="#"]:not([href="#"]), a[href^="#fn"]').click(function() {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $('[id="#' + this.hash.slice(1) + '"]');
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top
                    },
                    900,
                    "swing",
                    function() {
                        window.location.hash = this.hash;
                    }
                );

                return false;
            }
        }
    });

    /* 	External link handling.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(".posts a[href^='http://'], a[href^='https://']").click(function() {
        $(this)
            .attr("href")
            .indexOf("prashant.me") == -1
            ? $(this).attr("target", "_blank")
            : $(this).attr("target", "");
    });

    /* 	Hook the scroll event & display the progressbar.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(document).scroll(function(e) {
        var dimensions = {
            scrollTop: $(window).scrollTop(),
            documentHeight: $(document).height(),
            windowHeight: $(window).height()
        };

        // Exclude the window to get actual height!
        var pageScrolledPercentage =
            (dimensions.scrollTop /
                (dimensions.documentHeight - dimensions.windowHeight)) *
            100;
        $(".progress").css("width", pageScrolledPercentage + "%");
    });

    /* 	Search trigger - using keydown event.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $("input#toSearch").keydown(function(e) {
        var keyPressed = e.which || e.keyCode;
        var searchKey = $(this).val();

        if (keyPressed === 13 && searchKey.length > 0) {
            $(".searchButton").trigger("click");
        }
    });

    $(".searchButton").click(function(e) {
        e.preventDefault();
        var searchKey = $("input#toSearch").val();

        if (
            (searchKey !== null) |
            (searchKey !== undefined) |
            (searchKey !== "") |
            (searchKey.length > 2)
        ) {
            $.getJSON("../posts.json", {}, function(data) {
                const filteredData = data.posts.filter(
                    post =>
                        post.title
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.tags
                            .join()
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.category
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.excerpt.indexOf(searchKey) > 0
                );
                console.log(
                    "[Search] - Searching for " +
                        searchKey +
                        " returned " +
                        filteredData.length +
                        " results."
                );

                $(".search-result-container")
                    .empty()
                    .append(
                        "<h5 class='totalSearchResults'>Found " +
                            filteredData.length +
                            " results for <code>" +
                            searchKey +
                            "</code>.</h5>"
                    );

                $.each(filteredData, (key, value) => {
                    var initialFormatting =
                        '<div class="result">' +
                        '<h5><i class="fas fa-file-alt"></i>&nbsp;<a target="_blank" href="{0}">{1}</a></h5>' +
                        '<div class="tags">{2}</div>' +
                        "<p>{5}</p>" +
                        '<p class="post-misc"><span><i class="fas fa-sitemap"></i>&nbsp;&nbsp;{3}</span>' +
                        '<span><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;{4}</span></p>' +
                        "</div>";

                    $(".search-result-container").append(
                        initialFormatting
                            .replace("{0}", value.link)
                            .replace(
                                "{1}",
                                value.title.replace(
                                    searchKey,
                                    "<span style='background: yellow;'>" +
                                        searchKey +
                                        "</span>"
                                )
                            )
                            .replace(
                                "{2}",
                                value.tags
                                    .map(tag => {
                                        return (
                                            "<div class='tag'><i class='fas fa-tag'></i>" +
                                            tag.replace(",", "").toUpperCase() +
                                            "</div>".replace(",", "")
                                        );
                                    })
                                    .join("")
                            )
                            .replace(
                                "{3}",
                                value.category
                                    .toUpperCase()
                                    .replace(
                                        searchKey.toUpperCase(),
                                        "<span style='background: yellow;'>" +
                                            searchKey.toUpperCase() +
                                            "</span>"
                                    )
                            )
                            .replace("{4}", value.date.toUpperCase())
                            .replace(
                                "{5}",
                                value.excerpt.replace(
                                    searchKey,
                                    "<span style='background: yellow;'>" +
                                        searchKey +
                                        "</span>"
                                )
                            )
                    );
                });
            });
        } else {
            console.log("[Search] - Empty search instruction received.");
        }
    });
});
