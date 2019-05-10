$(document).ready(function () {
    ymaps.ready(function(){
        var map = new ymaps.Map("map", {
            center: [55.713886,37.401596],
            zoom: 17
        });

        var place = new ymaps.Placemark(
            [55.713886,37.401596], {
                hintContent: 'г. Москва, ул. Бутлерова, д.17, БЦ NEO GEO',
            },
            {
                iconImageHref: 'img/location.svg',
                iconImageSize: [25, 38],
                iconLayout: 'default#image',
            }
        );
        map.geoObjects.add(place);
    });

    ymaps.ready(function(){
        var map = new ymaps.Map("map-section", {
            center: [55.744374,37.619803],
            zoom: 9
        });

        // var place = new ymaps.Placemark(
        //     [55.713886,37.401596], {
        //         hintContent: 'г. Москва, ул. Бутлерова, д.17, БЦ NEO GEO',
        //     },
        //     {
        //         iconImageHref: 'img/location.svg',
        //         iconImageSize: [25, 38],
        //         iconLayout: 'default#image',
        //     }
        // );
        // map.geoObjects.add(place);

        var rectangle = new ymaps.Rectangle(map.getBounds(), {}, {
            cursor: "dragCursor",
            outline: false,
            strokeOpacity: 0,
            fillImageHref: 'img/map-svg.svg'
        });

        map.geoObjects.add(rectangle);

        map.behaviors.disable('scrollZoom');
        // map.behaviors.disable('drag');


    });





    $('.panel_heading .block_title').click(function () {
        $(this).toggleClass('in').next().slideToggle();
        $('.panel_heading .block_title').not(this).removeClass('in').next().slideUp();
    });

    $('.btn-category').click(function () {
        $(this).toggleClass('in').siblings('.category-ceilings').slideToggle().css('display', 'flex');
    });

    $('.gallery-price-slider').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false
                }
            },
            {
                breakpoint: 755,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    vertical: false,
                    verticalSwiping: false
                }
            }
        ]
    });

    $('.gallery-price-slider__wrapper .arrow-next').on('click', function (e) {
        e.preventDefault();
        $('.gallery-price-slider').slick('slickNext');
    });

    $('.gallery-price-slider__wrapper .arrow-prev').on('click', function (e) {
        e.preventDefault();
        $('.gallery-price-slider').slick('slickPrev');
    });

    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    });

    $('.reviews-arrows .arrow-next').on('click', function (e) {
        e.preventDefault();
        $('.reviews-slider').slick('slickNext');
    });

    $('.reviews-arrows .arrow-prev').on('click', function (e) {
        e.preventDefault();
        $('.reviews-slider').slick('slickPrev');
    });

    $('.our-team-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    });

    $('.our-team-arrows .arrow-next').on('click', function (e) {
        e.preventDefault();
        $('.our-team-slider').slick('slickNext');
    });

    $('.our-team-arrows .arrow-prev').on('click', function (e) {
        e.preventDefault();
        $('.our-team-slider').slick('slickPrev');
    });


    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $("form").submit(function () {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            // alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            $('#modal_thanks').css('display', 'flex').animate({
                opacity: 1,
                top: '50%'
            }, 200);
            $("form").trigger("reset");
        });
        return false;
    });

    $(document).ready(function () {
        var overlay = $('.overlay');
        var open_modal = $('.open_modal');
        var close = $('.modal__close, .overlay');
        var modal = $('.modal__div');

        open_modal.click(function (event) {
            event.preventDefault();
            var div = $(this).attr('href');
            overlay.fadeIn(400,
                function () {
                    $(div)
                        .css('display', 'flex')
                        .animate({
                            opacity: 1,
                            top: '50%'
                        }, 200);
                });
        });

        close.click(function () {
            modal
                .animate({
                        opacity: 0,
                        top: '45%'
                    }, 200,
                    function () {
                        $(this).css('display', 'none');
                        overlay.fadeOut(400);
                    }
                );
        });
    });

    $('.main-menu li a').each(function () {
        var location = window.location.href;
        var link = this.href;
        if (location == link) {
            $(this).addClass('current');
        }
    });


    $('.btn-mobile-menu').click(function () {
        $(this).toggleClass('open');
        $('.nav-main-menu').fadeToggle();
    });


    $(function () {

        if ($(window).width() < 700) {
            $('.category-ceilings__name').click(function () {
                // $(this).siblings('.category-ceilings__menu').fadeToggle();
                $(this).parents('.category-ceilings__box').toggleClass('open');
            });
        }

        if ($(window).width() < 620) {
            $('a.right-arrow').show();
        }
        else {
            $('a.right-arrow').hide();
        }


    });

    $("input[name='phone']").mask("+7(999) 999-9999");

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $(".category-ceilings"); // тут указываем ID элемента
        var btn = $('.btn-category');
        if (!div.is(e.target) // если клик был не по нашему блоку
            && !btn.is(e.target) && btn.has(e.target).length === 0
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.slideUp(); // скрываем его
        }
    });



    window.addEventListener("resize", function() {
        if ($(window).width() < 700) {
            $('.category-ceilings__name').click(function () {
                // $(this).siblings('.category-ceilings__menu').fadeToggle();
                $(this).parents('.category-ceilings__box').toggleClass('open');
            });
        }

        if ($(window).width() < 620) {
            $('a.right-arrow').show();
        }
        else {
            $('a.right-arrow').hide();
        }

    }, false);




});

// arrows mobile
$(document).ready(function () {
    var leftMargin = 0;
    var width = $(document).width();
    var windowWidth = ($(window).width() / 2);

    $('.right-arrow').click(function (e) {
        e.preventDefault();

        $(this).siblings('.table-wrapper').find('.manufacturer-table').animate({
            marginLeft: "-=" + windowWidth
        }, 700);

        $('.left-arrow').show();
        leftMargin = (leftMargin + windowWidth);
        if (leftMargin > width - windowWidth) {
            $('.right-arrow').hide();
        }
    });

    $('.left-arrow').click(function (e) {
        e.preventDefault();
        $(this).siblings('.table-wrapper').find('.manufacturer-table').animate({
            marginLeft: "+=" + windowWidth
        }, 700);

        $('.right-arrow').show();
        leftMargin = (leftMargin - windowWidth);
        if (leftMargin == 0) {
            $('.left-arrow').hide();
        }
    });

});
// arrows mobile end


$(function () {
    let penImg = $('.gallery-price-max .image img');
    let priceText = $('.gallery-price-max .price');

    $('.gallery-price-box .img').on('click', function () {
        var imgPath;

        imgPath = $(this).attr('data-img-path');

        let mainText = $(this).find('.price-hidden').html();

        penImg.attr('src', imgPath);

        priceText.html(mainText);

    });
});