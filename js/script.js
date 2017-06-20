$(function() {

    var img_urls = ["img/deer.png", "img/dolphin.png", "img/kangaroo.png", "img/leopard.png", "img/panther.png", "img/penguin.png", "img/rabbit.png", "img/sheep.png", "img/swan.png", "img/wolf.png", "img/zebra.png", "img/duck.png", "img/deer.png", "img/dolphin.png", "img/kangaroo.png", "img/leopard.png", "img/panther.png", "img/penguin.png", "img/rabbit.png", "img/sheep.png", "img/swan.png", "img/wolf.png", "img/zebra.png", "img/duck.png"];

    //Shuffle js array > http://stackoverflow.com/a/2450976/4991434
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var arr = img_urls;
    arr = shuffle(arr);

    for (i = 0; i < img_urls.length; i++) {
        $(".items").append(
            "<div class='container'><div class='front'>" + img_urls[i] + "</div><div class='back'><img class='image' src=' " + img_urls[i] + "'/></div></div>"
        );
    }

    var first;
    var second;

    var total_clicks = 0;
    var count = 0;

    function check_level() {
        if (total_clicks === 10) {

            $(".first-svg").removeClass("level");

        } else if (total_clicks === 15) {

            $(".second-svg").removeClass("level");

        } else if (total_clicks === 20) {

            $(".third-svg").removeClass("level");

        }
    }

    function game_over() {
        if ($(".matched").length === 48) {

            setTimeout(function() {
                alert("Congrats. You have finished the game!");
            }, 1200);

            setTimeout(function() {
                location.reload();
            }, 1800);

        }
    }


    // for mozilla issue, make opacity 0 as default
    $('.image').addClass('noOpacity');

    $(".front").click(function(e) {

        // for mozilla issue, play opacity of .image
        var self = this;
        setTimeout(function() {
            $(self).next('.back').find('.image').addClass('yesOpacity');
        }, 300);

        count++;

        // prevent fast click
        if ($(e.target).data('oneclicked') != 'yes') {
            $(e.target).css("pointer-events", "none")
            setTimeout(function() {
                $(e.target).css("pointer-events", "auto")
            }, 400);
        }


        if (count === 1) {

            $(this, ".front").addClass("showBack-front").addClass("clicked");
            $(this).next('.back').addClass("showBack-back").addClass("clicked");

            first = $(this, ".front").text();

        } else {

            $(this, ".front").addClass("showBack-front").addClass("clicked");;
            $(this).next('.back').addClass("showBack-back").addClass("clicked");;

            second = $(this, ".front").text();
            count = 0;

            $(".front").css("pointer-events", "none");

            setTimeout(function() {

                if (first === second) {

                    total_clicks = total_clicks - 1;

                    $('.clicked').addClass('animated tada matched no-pointer-events');

                    //Check if game is over
                    game_over();

                } else {

                    $(".front").removeClass("showBack-front");
                    $(".back").removeClass("showBack-back");

                    $('.clicked').addClass('animated shake');

                    setTimeout(function() {
                        $(".clicked").removeClass("clicked shake");

                        // for mozilla issue, play opacity of .image
                        $('.image').not('section .matched').removeClass('yesOpacity');
                        $('.image').not('section .matched').addClass('noOpacity');

                    }, 500);

                }

                $(".front").css("pointer-events", "auto");

                total_clicks++;
                $(".total_clicks span").text(total_clicks);
                check_level();

            }, 525);

        }

        return false;
    });


    // hide particles in mozilla
    if (navigator.userAgent.indexOf("Firefox") > 0) {
        document.getElementById('particles-js').style.display = "none";
    }


});
