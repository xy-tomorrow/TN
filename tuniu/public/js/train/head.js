/**
 * Created by SDark on 2017/4/5.
 */
$(function(){
    $("#myShop").mouseenter(function(){
        $(this).children("").children("i").css({"transform":"rotate(180deg)"},2000);

        $("#allShop").show();

    })
    $("#myShop").mouseleave(function(){
        $(this).children("").children("i").css({"transform":"rotate(360deg)"},2000);
        $("#allShop").hide();
    })
    $("#indexMap").mouseenter(function(){
        $(this).children("").children("i").css({"transform":"rotate(180deg)"},2000);
        $("#indexMapDiv").show();
    })
    $("#indexMap").mouseleave(function(){
        $(this).children("").children("i").css({"transform":"rotate(360deg)"},2000);
        $("#indexMapDiv").hide();
    })
    $("#saoYsao").mouseenter(function(){
        $("#erweima").stop(true,true);
        $("#erweima").slideDown();
    })
    $("#saoYsao").mouseleave(function(){
        $("#erweima").stop(true,true);
        $("#erweima").slideUp();
    })

    $("#telep11").mouseenter(function(){
        $("#tele1").stop(true,true);
        $("#tele1").show();
    })
    $("#telep11").mouseleave(function(){
        $("#tele1").stop(true,true);
        $("#tele1").hide();
    })

    $(".showBaitiao").mouseenter(function(){

        var a = $(this).offset();
        var b = a.left;

        var c = $(this).width();
        var d = (c/2)*1;

        var e = $('.sjjt').width();
        var f = e/2;

        var sjwidth = b+d-f;
        $('.sjjt').show().css({"left":sjwidth});
        $(this).children("").children("i").css({"transform":"rotate(180deg)"},2000);


        //var lastAoff = $(".top_navBar ul li").lastChild("li");
        //console.log(lastAoff);
        var sMenu = $(this).children("div").width();
        var sW = sMenu/2;
        $(this).children("div").css("margin-left",-sW);
        $(this).children(".secondMenu").show();
        $("#baitiao").show();
    });
    $(".showBaitiao").mouseleave(function(){
        $('.sjjt').hide();
        $(".i10").css({"transform":"rotate(360deg)"},2000);
        $(this).children(".secondMenu").hide();
        $("#baitiao").hide();
    });

    $(".hotTicket ul li").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
        var index = $(this).index();
        $(".ticker_content .product").eq(index).addClass("selected").siblings("div").removeClass("selected");
    })

    $("#huan").click(function(){

        var a = $("#placeholder1").attr('placeholder');
        var b = $("#placeholder2").attr('placeholder');
        var temp = a;
        a = b;
        b = temp;

        $("#placeholder1").attr('placeholder',a);
        $("#placeholder2").attr('placeholder',b);
    })

    $("#open").click(function(){
        $("#close").show().siblings().hide();
        $(".openAndclose").addClass("openBack");
    })
    $("#close").click(function(){
        $("#open").show().siblings().hide();
        $(".openAndclose").removeClass("openBack");
    })
    $("#allProA").mouseenter(function(){
       $("#allPro").show();
    })
    $("#allProA").mouseleave(function(){
        $("#allPro").hide();
    })
    $("#getCont").focus(function(){
        $("#getPlace").show();
        $(this).attr('placeholder'," ");
        $("#placeWite").hide();
    })
    $("#getCont").blur(function(){
        $("#getPlace").hide();
        $(this).attr('placeholder',"毛里求斯");
        $("#placeWite").show();
    })
    $("#searchMoreBtn").mouseenter(function(){
        $("#searchMore").show();
    })
    $("#searchMoreBtn").mouseleave(function(){
        $("#searchMore").hide();
    })
    $("#timeDate").fdatepicker();

});

$(function(){


    var images_height = '420px';

    var images_url = [
        '././images/train/Cii9EFi2iJyIIRcwAAJNZapH9usAAIKJwOt0t0AAk1931.jpeg',
        '././images/train/Cii-Tli-UU6IX58sAAT-Wvcb9bAAAILcQKEHIIABP5y16.jpeg',
        '././images/train/Cii-U1iz5TqIQ6IWAAiT4NYzek8AAIBlgGX09gACJP411.jpeg',
        '././images/train/ii-U1jHgP2IW45nAAFfTW0jd6sAAI2bAO5dE4AAV9l63.jpeg',
        '././images/train/Cii-U1jI9GeIfy5wAAIutRCpmmgAAI39gG9_B0AAi7N94.jpeg'
    ];
    var images_count = images_url.length;

    for(var j=0;j<images_count+1;j++){
        $('.lunbo ul').append('<li></li>')
    }

    for(var j=0;j<images_count;j++){
        if(j==0){
            $('.lunbo ol').append('<li class="current"></li>')
        }else{
            $('.lunbo ol').append('<li></li>')
        }
    }


    $('.lunbo ul li').css('background-image','url('+images_url[0]+')');
    $.each(images_url,function(key,value){
        $('.lunbo ul li').eq(key).css('background-image','url('+value+')');
    });

    $('.lunbo').css('height',images_height);

    $('.lunbo ul').css('width',(images_count+1)*100+'%');

    $('.lunbo ol').css('width',images_count*20+'px');
    $('.lunbo ol').css('margin-left',-images_count*20*0.5-10+'px');



    var num = 0;

    var window_width = $(window).width();
    $(window).resize(function(){
        window_width = $(window).width();
        $('.lunbo ul li').css({width:window_width});
        clearInterval(timer);
        nextPlay();
        timer = setInterval(nextPlay,4000);
    });

    $('.lunbo ul li').width(window_width);

    $('.lunbo ol li').mouseover(function(){
        $(this).addClass('current').siblings().removeClass('current');

        var i = $(this).index();

        $('.lunbo ul').stop().animate({left:-i*window_width},4000);
        num = i;
    });

    var timer = null;
    function prevPlay(){
        num--;
        if(num<0){

            $('.lunbo ul').css({left:-window_width*images_count}).stop().animate({left:-window_width*(images_count-1)},4000);
            num=images_count-1;
        }else{

            $('.lunbo ul').stop().animate({left:-num*window_width},4000);
        }
        if(num==images_count-1){
            $('.lunbo ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
        }else{
            $('.lunbo ol li').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    function nextPlay(){
        num++;
        if(num>images_count){

            $('.lunbo ul').css({left:0}).stop().animate({left:-window_width},4000);

            num=1;
        }else{

            $('.lunbo ul').stop().animate({left:-num*window_width},4000);
        }
        if(num==images_count){
            $('.lunbo ol li').eq(0).addClass('current').siblings().removeClass('current');
        }else{
            $('.lunbo ol li').eq(num).addClass('current').siblings().removeClass('current');

        }
    }
    timer = setInterval(nextPlay,4000);

    $('.lunbo').mouseenter(function(){
        clearInterval(timer);

        $('.lunbo i').fadeIn();
    }).mouseleave(function(){
        timer = setInterval(nextPlay,4000);
        $('.lunbo i').fadeOut();
    });
    $('.lunbo .right').click(function(){
        nextPlay();
    });
    $('.lunbo .left').click(function(){
        prevPlay();
    });
});


