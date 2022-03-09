function resize_block() {
    //if($('.phone_block').height() <= window.innerHeight) $('.phone_block').addClass('fixed'); else $('.phone_block').removeClass('fixed');

    /*  if($('html').hasClass('menu-opened') || $('html').hasClass('phone_block-opened')){
          setTimeout(function () {
          scroll_now=$(document).scrollTop();
          $('.body').css({
              "height": ($('html').hasClass('menu-opened')?$('.menu').height():$('.phone_block').height()) });
          },0);
      } else {

          $('.body').css({
              "height": 'auto' });
          $(document).scrollTop(scroll_now);
      }*/


    /* alert(window.innerWidth);
     alert(window.innerHeight);*/
    /*
   console.log(window.innerHeight);
   console.log(document.documentElement.clientHeight);*/
    if((window.outerWidth<=750 || window.innerWidth <=750) && !$('.catalog_menu_items_mobile').hasClass('slick-initialized') ){
        $('.catalog_menu_items_mobile').slick({
            autoplay: false,
            arrows: true,
            dots: false,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: "10px",
            draggable: false,
            infinite: true,
            vertical: true,
            prevArrow: '<button id="prev" type="button" ><svg viewBox="0 0 100 100"></button>',
            nextArrow: '<button id="next" type="button" ><svg viewBox="0 0 100 100"></button>',
            speed: 350,
        });
    }
    that=$(".catalog_menu_item.active");



    setTimeout(function () {
        if(typeof swiper !== 'undefined') swiper.updateAutoHeight(500);
        $('.catalog_menu_bk_item').css({'left':that.offset().left,'width':that.outerWidth()});
    },350);
    if($('.header').height() === document.documentElement.clientHeight) return false;

    if ((window.innerWidth > 420 && (window.innerHeight > 1001 || window.innerWidth > 1020))) $('.header').css({ height: window.innerHeight }); else $('.header').css({ height: 'auto' });
}

var flkty=false;
$(function() {
    flkty=false;
    flkty = new Flickity( '.catalog_slider', {
        wrapAround: true,
        pageDots: false,
        lazyLoad: 2,
        cellSelector: '.slide-cover',
        on: {
            change: function(index) {
                console.log('2');
                //$('.catalog_slider_index span').text('0'+(index+1)+' /');
                $('.active .catalog_slider_index span').text('0'+(index+1)+' /');

            }
        }
    });

    if(flkty && flkty.slides.length==3)  flkty.select(1);

    if(window.outerWidth<=750){
        $('.catalog_menu_items_mobile').slick({
            autoplay: false,
            arrows: true,
            dots: false,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: "10px",
            draggable: false,
            infinite: true,
            vertical: true,
            prevArrow: '<button id="prev" type="button" ><svg viewBox="0 0 100 100"></button>',
            nextArrow: '<button id="next" type="button" ><svg viewBox="0 0 100 100"></button>',
            speed: 350,
        });
    }


    $('.catalog_menu_items_mobile').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.catalog_menu_item').removeClass('active');
        $('[data-slick-index=-' + nextSlide + '] .catalog_menu_item').addClass('active');
    });


    $('.catalog_menu_items_mobile').on("afterChange", function (e){
        var cid= $('.catalog_menu_items_mobile .slick-current .catalog_menu_item').data('cid');
        $('.catalog_menu_block').hide().removeClass('active');
        $('.catalog_menu_bk_item').data('cid',cid);
        $('.catalog_menu_block_'+ cid).show().addClass('active');
        if(typeof flkty  !== 'undefined' && flkty!==false) flkty.destroy();
        flkty=false;
        flkty = new Flickity( '.catalog_menu_block_'+ cid+' .catalog_slider', {
            wrapAround: true,
            pageDots: false,
            lazyLoad: 2,
            cellSelector: '.slide-cover',
            on: {
                change: function(index) {
                    $('.active .catalog_slider_index span').text('0'+(index+1)+' /');
                }
            }
        });
        if(flkty && flkty.slides.length==3)  flkty.select(1);

    });

    ripple();


    new WOW().init({
        offset:0
    });
    /*
    alert(window.innerWidth);
    alert(window.innerHeight);*/
    /*
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.cssClass { color: #F00; }';
        document.getElementsByTagName('head')[0].appendChild(style);
        document.getElementById('someElementId').className = 'cssClass';*/

    postValidation_ch=false;
    $("#phone_input").inputmask({mask:"+7 9999999999",showMaskOnHover: false,  postValidation: function() {
            postValidation_ch=true;
            return true;
        }});

    $( window ).scroll(menu_cheker);
    select_foof=['Монтеррей Элит','Монтеррей Элит','Монтеррей Элит','Монтеррей Элит'];
    scroll_now=0;
    $('.return_phone').click(close_phone);
    $('.phone_submit .text_post_send').click(close_phone);
    $(".buttonUp").click(function() {

        $("html, body").animate(
            {
                scrollTop: "0px"
            },
            450,
            "swing"
        );
        return false;
    });
    $('.phone_submit .text_pre_send').click(function () {
        if (!$(this).parent().hasClass('active')) return false;
        $('.text_post_send ,.text_pre_send').slideToggle(200);
        setTimeout(function () {resize_block();},100);

        var when=$('#time_input').val();
        var name=$('#name_input').val();
        var more_info=$('#more_info').val();
         var more_info2=$('#more_info2').val();
        var phone=$('#phone_input').val();


        if($('#checkbox').is(':checked')) when='Прямо сейчас';
        var data={'when': when,'name': name,'phone': phone,'more_info': more_info,'more_info2': more_info2};
        
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: data
        });
    });

    $('.phone_opened').click(function () {
        console.log($(this).data('cid'));
        if ($(this).data('cid')===1) {
            $('.phone_h1 .text_pre_send').text('Заказать консультацию');
            $('.phone_submit .text_pre_send').text('ЗАКАЗАТЬ КОНСУЛЬТАЦИЮ');
            $('.phone_h2 .text_pre_send').text('Оставьте свои контактные данные, наш специалист перезвонит в удобное для вас время и ответит на все интересующие вопросы.');
            $('#more_info, #more_info2').val('Заявка на консультацию по металлочерепице Казань');
        } else if ($(this).data('cid')===2) {
            $('.phone_h1 .text_pre_send').text('Заказать бесплатный расчет');
            $('#more_info, #more_info2').val('Заявка на бесплатный расчет по металлочерепице Казань');
            $('.phone_submit .text_pre_send').text('ЗАКАЗАТЬ РАСЧЕТ');
            $('.phone_h2 .text_pre_send').text('Оставьте свои контактные данные, наш специалист перезвонит в удобное для вас время и ответит на все интересующие вопросы.');
        } else if ($(this).data('cid')===3) {
            console.log($(this).parents('.slide-cover').find('.color').html());
            pnames=['Стальной бархат','Printech','High Gloss Matt','Полиэстер'];
            text='Заказ расчета стоимости <br>металлочерепицы '+select_foof[$('.catalog_menu_bk_item').data('cid')-1]+' <span class="text_pre_send--accent">с покрытием '+pnames[$('.catalog_menu_bk_item').data('cid')-1]+', '+$(this).parents('.slide-cover').find('.color-name').text() + ' ' + $(this).parents('.slide-cover').find('.color-ral').text() + '</span>';
            $('#more_info , #more_info2').val("Заявка на расчет стоимости \nметаллочерепицы "+select_foof[$('.catalog_menu_bk_item').data('cid')-1]+"\nпокрытие -'"+pnames[$('.catalog_menu_bk_item').data('cid')-1]+"'\n"+$(this).parents('.slide-cover').find('.color-name').text());
            $('#more_info2').val('Заявка на расчет со скидкой по металлочерепице "'+select_foof[$('.catalog_menu_bk_item').data('cid')-1]+'" Казань');

            $('.phone_h1 .text_pre_send').html(text);
            $('.phone_submit .text_pre_send').text('ЗАКАЗАТЬ РАСЧЕТ СТОИМОСТИ');
            $('.phone_h2 .text_pre_send').text('Оставьте свои контактные данные, наш специалист перезвонит в удобное для вас время, сделает расчет вашей кровли и ответит на все интересующие вопросы.');
        }

        $('html').toggleClass('phone_block-opened');
        setTimeout(function () {resize_block();},10);

    });

    $('.menu_opened').click(function () {
        $('html').toggleClass('menu-opened');
        setTimeout(function () {resize_block();},10);
    });

    $('input').focus(function() {

        setTimeout(function () {$('.phone_block').animate({ scrollTop: 200}, 350);},200);


    });

    $('#checkbox').click(function() {
        if (!$(this).is(':checked')) {
            $('#time_input').prop('disabled',false );
        } else $('#time_input').prop('disabled', true);
        chec_all_inpt();
    });

    $('#name_input').on('input', function(event) {

        var that = this;
        setTimeout(function() {
            console.log(that.value);
            var res = /[^а-яёА-ЯЁ \-]/g.exec(that.value);
            if(res && that.value.length>0) { if(event.originalEvent.inputType !== "deleteContentBackward") $(that).parent('.phone_form_input').animateCss('shake');  $(that).parent('.phone_form_input').addClass('error'); } else  $(that).parent('.phone_form_input').removeClass('error');
            if(!res && that.value.length>0) { $(that).parent('.phone_form_input').addClass('good'); } else  $(that).parent('.phone_form_input').removeClass('good');
            chec_all_inpt();
        }, 0);
    });

    $('#phone_input').on('keyup', function(e) {

        that=this;
        console.log(e);
        if(e.keyCode==8){
            $(that).parent('.phone_form_input').removeClass('good');
            chec_all_inpt();
            return false;
        }
        if(parseInt(e.key)>0) postValidation_ch=true;
        setTimeout(function() {

            var res = parseInt(that.value.replace(' ',''))+'';
            console.log(res.length);
            if(res.length==11) {
                $(that).parent('.phone_form_input').addClass('good');
                chec_all_inpt();
                postValidation_ch=false;
                return false;
            } else  $(that).parent('.phone_form_input').removeClass('good');

            if(!postValidation_ch) $(that).parent('.phone_form_input').animateCss('shake');
            postValidation_ch=false;
            chec_all_inpt();
        }, 0);
    });


    $('#time_input').on('input', function(event) {
        var that = this;
        setTimeout(function() {
            var res = /[^а-яёА-ЯЁ0-9\- (,:.'?)"]/g.exec(that.value);
            if(res && that.value.length>0) { if(event.originalEvent.inputType !== "deleteContentBackward") $(that).parent('.phone_form_input').animateCss('shake'); $(that).parent('.phone_form_input').addClass('error'); } else  $(that).parent('.phone_form_input').removeClass('error');
            if(!res && that.value.length>0) { $(that).parent('.phone_form_input').addClass('good'); } else  $(that).parent('.phone_form_input').removeClass('good');
            chec_all_inpt();
        }, 0);
    });
    $(document).on('input', 'input', chec_all_inpt);

    $("#video_frame_modal").iziModal({
        width: 960,
        iframeHeight: 540,
        onOpening: function(modal){$('html').addClass('noscroll');},
        onClosed: function(modal){$('html').removeClass('noscroll');}
    });

    resize_block();
    $(window).resize(resize_block);

    $(".catalog_menu_item").on("click", function () {
        $(".catalog_menu_item.active").removeClass('active');
        $(this).addClass('active');
        $('.catalog_menu_bk_item').css({'left':$(this).offset().left,'width':$(this).outerWidth()}).data('cid',$(this).data('cid'));

        $('.catalog_menu_block').hide().removeClass('active');
        $('.catalog_menu_block_'+ $(this).data('cid')).show().addClass('active');
        console.log(flkty);
        if(typeof flkty  !== 'undefined' && flkty!==false) flkty.destroy();
        flkty=false;

        flkty = new Flickity( '.catalog_menu_block_'+ $(this).data('cid')+' .catalog_slider', {
            wrapAround: true,
            pageDots: false,
            lazyLoad: 2,
            cellSelector: '.slide-cover',
            on: {
                change: function(index) {
                    $('.active .catalog_slider_index span').text((index>8?'':'0')+(index+1)+' /');
                }
            }
        });
        if(flkty && flkty.slides.length==3)  flkty.select(1);


    });
    function close_phone() {
        $('html').toggleClass('phone_block-opened');
        setTimeout(function () {
            $('.text_post_send').hide();
            $('.text_pre_send').show();
            $('#time_input').val("");
            $('#name_input').val("");
            $('#phone_input').val('');
            $('#time_input').prop('disabled',false );
            $('#checkbox').prop('checked', false);
            $('.phone_submit').removeClass('active');
            $('.phone_form_input').removeClass('error').removeClass('good');


            resize_block();
        },300);
    }
    $('a').click( function(){ // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .

        if(scroll_el=="#") return false;
        if(scroll_el.charAt(0)!="#") return true;

        if ($(scroll_el).length != 0) {
            // if($(scroll_el).data('scroll')==='0') alert('vah');

            /* if(window.innerWidth>800)  $('html, body').animate({ scrollTop: $(scroll_el).offset().top+($(scroll_el).data('scroll')?$(scroll_el).data('scroll'):0)}, 0);
              else  $('html, body').animate({ scrollTop: $(scroll_el).offset().top-($(scroll_el).data('scroll')?(window.innerWidth>400?117:77):70)}, 0);*/
            console.log(scroll_el+'_scroll');
            $('html, body').animate({ scrollTop: $(scroll_el+'_scroll').offset().top-77},0);



            $('html').removeClass('menu-opened');
            setTimeout(function () {resize_block();},10);
        }
        /*
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 0);
        $('html').removeClass('menu-opened');*/
        return false; // выключаем стандартное действие
    });

    swiper = new Swiper('.swiper-container', {
        autoHeight: true,
        loop: true,
        pagination: {
            el: '.swiper-num-page',
            type: 'custom',
            currentClass: 'current-num',
            totalClass: 'total-num',
            renderCustom: function (swiper, current, total) {
                return '<span class="current-num">0' + (current - 1) + '</span>' + '/' + '<span class="total-num">0' + (total - 1) + '</span>';
            }
        },
        navigation: {
            nextEl: '.swiper-pagination1 .next',
            prevEl: '.swiper-pagination1 .prev',
        },
        effect: "fade", // select effect cube

        speed:600,
        on: {
            init: function () {
                $('.swiper-pagination1').addClass('none');
                $('.slider-pagin-wrap .bul-custom-wrap').css('display','none');

            },
        }
    });
    menu_cheker();
    swiper.on('slideChangeTransitionStart', function () {
        /* if   ($('#profiles_block').height()==$(window).height())      $('html, body').animate({ scrollTop: $('#profiles_block').offset().top }, 350);
          else*/  $('html, body').animate({ scrollTop: $('#profiles_block_scroll').offset().top-77 }, 150);

    });


    /* При перелистывании слайдов */
    swiper.on('slideChange', function () {
        /*
            if(window.innerWidth>1040)   $('html, body').animate({ scrollTop: $('.profiles_block').offset().top }, 350); else {
                $('html, body').animate({ scrollTop: $('.profiles_block').offset().top-73 }, 350);
            }*/


        $('#profiles_block .bul-dot_active').removeClass('bul-dot_active');
        $('#profiles_block .bul-dot-wrap'+(swiper.realIndex)).addClass('bul-dot_active');

        swiperCount = $('.swiper-slide').length - 1;

        console.log('текущий = ' +swiper.realIndex + ' | всего ->' + (swiperCount+1) );

        if ( swiper.realIndex != 0 ) {
            console.log('текущий = ' +swiper.realIndex + ' | всего ->' + (swiperCount+1) );

            $('.menu__header').addClass('yesl');

            /*if ( swiper.realIndex == swiperCount ) {
              $('.slider__nav-wrap.next').css('opacity','0.4');
            }
            else {
              /*$('.slider__nav-wrap.next').css('opacity','1');
            }*/

            $('.swiper-pagination1').removeClass('none');
            $('.slider-pagin-wrap .bul-custom-wrap').css('display','flex');

        } else {

            $('.swiper-pagination1').addClass('none');
            $('.menu__header').removeClass('yesl');
            $('.slider-pagin-wrap .bul-custom-wrap').css('display','none');
        }

        /*$('.bul-dot-wrap').addClass('bul-dot_active');*/


        /* #При перелистывании слайдов */

        menu_cheker();
    });


});
$('.photo__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(currentSlide);
    console.log(nextSlide);
    $('.slider-photo-pagination .bul-dot_active').removeClass('bul-dot_active');
    $('.slider-photo-pagination .bul-dot-wrap'+(nextSlide+1)).addClass('bul-dot_active');
});
$('.about-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    console.log(currentSlide);
    console.log(nextSlide);
    $('.about-slider-pagination .bul-dot_active').removeClass('bul-dot_active');
    $('.about-slider-pagination .bul-dot-wrap'+(nextSlide+1)).addClass('bul-dot_active');
});
function set_slide(num,type) {
    type= type || 1;
    if(type===1) {
        swiper.slideToLoop(parseInt(num));
        return false;
    }
    if(type===2) {
        $('.photo__slider').slick('slickGoTo', parseInt(num)-1);
        return false;
    }
    if(type===3) {
        $('.about-slider').slick('slickGoTo', parseInt(num)-1);
        return false;
    }
}
function chec_all_inpt() {
    var time=$('#time_input').parent('.phone_form_input').hasClass('good')?$('#time_input').val():'';
    var name=$('#name_input').parent('.phone_form_input').hasClass('good')?$('#name_input').val():'';
    var phone=$('#phone_input').parent('.phone_form_input').hasClass('good')?$('#phone_input').val():'';

    if(phone.length>0 && name.length>0 && (time.length>0 || $('#checkbox').is(':checked')))
        $('.phone_submit').addClass('active'); else  $('.phone_submit').removeClass('active');

}
function menu_cheker() {
    if( $(document).scrollTop()>=100){
        $("#buttonUp").fadeIn(600);
        if($(document).scrollTop()>=($('.profiles_block').offset().top*1-(swiper.realIndex==0?0:117))) {
            if($(document).scrollTop()>=$('#catalog').offset().top-150) $('.menu__header').addClass('menu_fade_white').removeClass('menu_fade_gray'); else $('.menu__header').addClass('menu_fade_gray');
        } else
            $('.menu__header').addClass('menu_fade_white').removeClass('menu_fade_gray');

    } else  { $("#buttonUp").fadeOut(600);  $('.menu__header').removeClass('menu_fade_white menu_fade_gray'); /*$('.menu-toggler-body').css({'margin-top':'0px'});*/}
}


$('.bul-dot').click(function() {
    /*
  $('.bul-dot-wrap').removeClass('bul-dot_active');
  $(this).parent('.bul-dot-wrap').addClass('bul-dot_active');*/
});
$('.map_map').click(function() {
    go_map('55.796237, 49.116278',10);
});

$('.map_list, .map_close').click(function() {
    $('.map').removeClass('active');
    $('.map_close_container').fadeOut(350);
    $('.map_map').removeClass('active');
    $('.map_list').addClass('active');
});

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

function ripple() {
    $("form button").addClass("ripplelink");
    $(".ripplelink").each(function() {
        var $this = $(this);

        var ink, d, x, y;

        setInterval(function() {

            ink = $this.find(".ink");
            ink.removeClass("animate");

            if (!ink.height() && !ink.width()) {
                d = Math.max($this.outerWidth(), $this.outerHeight());
                ink.css({ height: d, width: d });
            }

            x = Math.round(Math.random() * d - d / 2);
            y = Math.round(Math.random() * d - d / 2);
            // y = 0;
            // x = e.pageX - $this.offset().left - ink.width()/2;
            // y = e.pageY - $this.offset().top - ink.height()/2;

            ink.css({ top: y + "px", left: x + "px" }).addClass("animate");
        }, 1000);
    });
}


function go_map(pos,zoom) {
    $('.map').addClass('active');
    $('.map_close_container').fadeIn(350);
    pos= pos.split(",");
    myMap.panTo([parseFloat(pos[0]),parseFloat(pos[1])],{
        flying: false,
        duration:0
    }).then(function() {
        myMap.setZoom(zoom, { smooth: false });
        $('.map_map').addClass('active');
        $('.map_list').removeClass('active');
    });
}