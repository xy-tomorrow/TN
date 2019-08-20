/**
 * Created by Administrator on 2017/5/16 0016.
 */
$(function () {
    $("#nav2>#nav>a").click(function () {
        $(this).siblings("a").removeClass("bgc")
        $(this).addClass("bgc")
    })

    $(window).scroll(function () {
        if($(document).scrollTop()>1050){
            $("#link1").siblings("a").removeClass("bgc");
            $("#link1").addClass("bgc")
        } if($(document).scrollTop()>2300){
            $("#link2").siblings("a").removeClass("bgc");
            $("#link2").addClass("bgc")
        } if($(document).scrollTop()>14100){
            $("#link3").siblings("a").removeClass("bgc");
            $("#link3").addClass("bgc")
        } if($(document).scrollTop()>14950){
            $("#link4").siblings("a").removeClass("bgc");
            $("#link4").addClass("bgc")
        }if($(document).scrollTop()>16100){
            $("#link5").siblings("a").removeClass("bgc");
            $("#link5").addClass("bgc")
        }
    })

    $(window).scroll(function () {
        if($(document).scrollTop()<5470){
            $(".tianshu").fadeOut(500)
        }else if($(document).scrollTop()>13700){
            $(".tianshu").fadeOut(500)
        }else{
            $(".tianshu").fadeIn(500)
        }

    })

    $(window).scroll(function () {
        if($(document).scrollTop()>5470){
            $("#li1").siblings("li").removeClass("_bgc");
            $("#li1").addClass("_bgc")
        }  if($(document).scrollTop()>6600){
            $("#li2").siblings("li").removeClass("_bgc");
            $("#li2").addClass("_bgc")
        }  if($(document).scrollTop()>8270){
            $("#li3").siblings("li").removeClass("_bgc");
            $("#li3").addClass("_bgc")
        }  if($(document).scrollTop()>10260){
            $("#li4").siblings("li").removeClass("_bgc");
            $("#li4").addClass("_bgc")
        }  if($(document).scrollTop()>11666){
            $("#li5").siblings("li").removeClass("_bgc");
            $("#li5").addClass("_bgc")
        }  if($(document).scrollTop()>12520){
            $("#li6").siblings("li").removeClass("_bgc");
            $("#li6").addClass("_bgc")
        }  if($(document).scrollTop()>13200){
            $("#li7").siblings("li").removeClass("_bgc");
            $("#li7").addClass("_bgc")
        }

    })
    $()
})