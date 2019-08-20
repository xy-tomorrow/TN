/**
 * Created by Administrator on 2017/5/16.
 */
$(function () {
    var io = true;
    $("#r_a").click(function () {
        if(io){
            io = false;
        }else{
            io = true;
        }
        if(io){
            $("#r_in2").animate({"opacity":0.2},1500).css("display","none");

            $("#r_in1").css({"opacity":"0.2","display":"block"}).animate({"opacity":1},1500);

        }else{
            $("#r_in1").animate({"opacity":0.2},1500).css("display","none");

            $("#r_in2").css({"opacity":"0.2","display":"block"}).animate({"opacity":1},1500);
        }

    });
})

window.onload = function () {
    var slideshow = document.getElementById("slideshow2");
    var slideshow_img = document.getElementById("slideshow_img");
    var slideshow_img_a = slideshow_img.getElementsByTagName("a");
    var times = null;
    var op = 2;
    for (var e = 0; e < slideshow_img_a.length; e++) {
        slideshow_img_a[e].index = e + 1;
        var on = slideshow_img_a[e].onclick = function () {
            for (var e = 0; e < slideshow_img_a.length; e++) {
                slideshow_img_a[e].removeAttribute("class");
            }
            this.className = "img-bd";
            op = this.index;
            slideshow.style.backgroundImage = "url(././images/strategy/slideshow" + this.index + ".jpeg)";
            console.log(slideshow);
            return false;
        }
    }
    times = setInterval(function () {
        if (op <= 4) {
            op++;
        }
        if (op > 4) {
            op = 1;
        }
        for (var e = 0; e < slideshow_img_a.length; e++) {
            slideshow_img_a[e].removeAttribute("class");
        }
        slideshow_img_a[op-1].className = "img-bd";
        slideshow.style.backgroundImage = "url(././images/strategy/slideshow" + op + ".jpeg)";

    }, 3000)
    slideshow.onmouseover = function () {
        clearInterval(times)
    }
    slideshow.onmouseout = function () {
        clearInterval(times);
        times = setInterval(function () {
            if (op <= 4) {
                op++;
            }
            if (op > 4) {
                op = 1;
            }
            for (var e = 0; e < slideshow_img_a.length; e++) {
                slideshow_img_a[e].removeAttribute("class");
            }
            slideshow_img_a[op-1].className = "img-bd";
            slideshow.style.backgroundImage = "url(././images/strategy/slideshow" + op + ".jpeg)";

        },3000)
    }

    var r_a = document.getElementById("r_a");
    var r_in1 = document.getElementById("r_in1");
    var r_in1_div = r_in1.getElementsByTagName("div");
    var r_in2 = document.getElementById("r_in2");
    var r_in2_div = r_in2.getElementsByTagName("div");
    var pl = 0;
    var ki = 0;
    /*r_a.onclick = function () {
     if(pl === 0){
     pl = 1;
     }else{
     pl = 0;
     }
     if(pl === 0){


     }else {

     }
     }*/
    var b_ol = document.getElementById("b_ol");
    var b_ollis = b_ol.getElementsByTagName("li");
    var ba_in = document.getElementById("ba_in");
    var b_ol_ul = ba_in.getElementsByTagName("ul");
    for(var y =0;y<b_ollis.length;y++){
        b_ollis[y].index = y;
        b_ollis[y].onmouseover = function(){
            for(var y =0;y<b_ol_ul.length;y++){
                b_ol_ul[y].style.display = "none";
                b_ollis[y].removeAttribute("class");
            }
            b_ol_ul[this.index].style.display = "block";
            this.className = "bargain-ul2hover";
        }
    }


    function anu(ele,json,fn){
        clearInterval(ele.tim)
        ele.tim = setInterval(function () {
            var slo = true
            for(h in json){
                var tar = json[h];
                var st = (json[h] - ki) / 10;
                st = st < 0 ? Math.floor(st) : Math.ceil(st);
                ki = st;
                ki = ki + st;
                ele.style[h] = "rotateY("+ki+"deg)";
                if(ki !== tar){
                    slo = false;
                }
            }
            console.log(slo);
            if(slo){
                clearInterval(ele.tim)
                fn && fn();
            }
        },15)
    }

    /**
     * ������Ҫ��  Ҫ���ƶ�����Ԫ�ص�λ��  �Լ��ı�����Ԫ�ص���������  ǰ������Щ�����ǿ��Բ��������
     * ͬ�����ǲ�֪���´���û��ȫ���ź�  �������ȼ���ȫ���ź���    �����ж������һ��û�е���Ŀ��ı����ֵ
     * ������Ϊopacity  ��  û�е�λ  ���ǽ���λȥ��  ����opacity������ֵ����0��1  ֮��  ��ȥС���ǳ��鷳  ����������ʱ���õ���ֵ����100
     * opacity���Ե�ǰ��ֵ������le������  �����Ŀ��  ������tar������ ÿ�θı��ֵ������st������  ���stС��0ֵ����������  ����0 ����������
     * �ڽ���ǰֵ����ÿ�����ӵ�ֵ  ������һ�ε����ֵ  �ٳ���100 �õ�ֵ  ��ֵ��Ԫ�ص�opacity����
     * @param ele   Ҫ�ƶ���Ԫ��
     * @param json  Ҫ�ı������  ��һ����������ŵ�  �����Ҹı���������е�����ֵû�а�����λ  ��������Ҫ�����ж�
     * @param fn �ص����� fn && fn(); �����ж�  ������������ �жϵڶ���  ����ִ����  ������������ǿ��ǵ��γɵ��һ�ζ�ζ���Ч��
     */

    function ani3(ele, json, fn) {
        clearInterval(ele.tim)
        ele.tim = setInterval(function () {
            var slo = true
            for (h in json) {
                if (h === "opacity") {
                    var le = getS(ele, h) * 100;
                    var tar = json[h] * 100;
                    var st = (tar - le) / 10;
                    st = st < 0 ? Math.floor(st) : Math.ceil(st);
                    console.log(st);
                    le = le + st;
                    ele.style[h] = le / 100;
                } else if (h === "zIndex") {
                    ele.style[h] = json[h];
                }
                else {
                    var le = parseInt(getS(ele, h)) || 0;
                    var tar = json[h];
                    var st = (json[h] - le) / 10;
                    st = st < 0 ? Math.floor(st) : Math.ceil(st);
                    le = le + st;
                    ele.style[h] = le + "px";
                }
                if (le !== tar) {
                    slo = false;
                }
            }
            console.log(slo);
            if (slo) {
                clearInterval(ele.tim)
                fn && fn();
            }
        }, 15)
    }


    /**
     * ��װwindow.getComputedStyle(ele,null)  ��  ele.currentStyle[aute]  ��ȡ�����ļ���������
     * @param ele   Ҫ��ȡ��Ԫ��
     * @param aute  Ҫ��ȡ������ֵ
     * @returns {*} ����֧�ֵķ�ʽ
     */
    function getS(ele, aute) {
        if (window.getComputedStyle(ele, null)) {
            return window.getComputedStyle(ele, null)[aute];
        } else {
            return ele.currentStyle[aute];
        }
    }
}
