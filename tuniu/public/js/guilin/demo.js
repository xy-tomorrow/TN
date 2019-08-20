/**
 * Created by Administrator on 2017/5/10 0010.
 */
window.onload = function () {
    var pic = document.getElementById("pic");
    var ul1 = document.getElementById("ul1");
    var lis = ul1.children;
    var imgWidth = lis[0].offsetWidth
    var xt = document.getElementById("xt")
    var b_left = document.getElementById("b_left")
    var b_right = document.getElementById("b_right")
    var ul2 = xt.children[0]
    var Lis = ul2.children;
    var timer = null

    pic.onmouseover = function () {
        clearInterval(timer)
    }
    pic.onmouseout = function () {
        timer = setInterval(b_right.onclick,3000)
    }

    var aa = lis[0].cloneNode(true)
    ul1.appendChild(aa)



    for(var i=0;i<Lis.length;i++){
        Lis[i].index = i
        Lis[i].onmouseover = function () {
            for(var j=0;j<Lis.length;j++){
                Lis[j].className = ""
            }
            this.className = "col"
            var target = -this.index*imgWidth;
            animate(ul1,target)
            aa = this.index;
            bb = this.index;
        }


    }
    var aa = 0;
    var bb = 0;
    b_right.onclick = function () {
        if(aa === lis.length - 1){
            ul1.style.left = 0 + "px"
            aa = 0
        }
        aa++;
        var target = -aa*imgWidth
        animate(ul1,target)
        if( bb< Lis.length-1){
            bb++
        }else{
            bb=0
        }
        for(var i=0;i<Lis.length;i++){
            Lis[i].className = ""
        }
        Lis[bb].className = "col"
    }
    b_left.onclick = function () {
        if(aa === 0){
            ul1.style.left = -(Lis.length-1)*imgWidth + "px"
            aa = Lis.length-1
        }
        aa--;
        var target = -aa*imgWidth
        animate(ul1,target)
        if( bb>0){
            bb--
        }else{
            bb=Lis.length-1
        }
        for(var i=0;i<Lis.length;i++){
            Lis[i].className = ""
        }
        Lis[bb].className = "col"
    }
    timer = setInterval(b_right.onclick,3000)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var cal1 = document.getElementById("cal1")
    var cal2 = document.getElementById("cal2")
    var tab1 = document.getElementById("tab1")
    var tab2 = document.getElementById("tab2")
    var p1 = cal1.children[0]
    var p2 = cal2.children[0]

    cal1.onmouseover = function () {
        tab1.style.display = "block";
        tab2.style.display = "none"
        cal1.className = "bgc"
        cal2.className = ""
        cal1.style.color = "#fff"
        cal2.style.color = "#000"
    }
    cal2.onmouseover = function () {
        tab1.style.display = "none";
        tab2.style.display = "block"
        cal2.className = "bgc"
        cal1.className = " "
        cal1.style.color = "#000"
        cal2.style.color = "#fff"
    }

    var box1 = document.getElementById("box1")
    var box = document.getElementById("box")

    box1.onmouseover = function () {
        box.style.display = "block"
    }
    box1.onmouseout = function () {
        box.style.display = "none"
    }

    var jian = document.getElementById("jian")
    var LI = document.getElementById("LI")
    var jia = document.getElementById("jia")
    var jian1= document.getElementById("jian1")
    var LI1 = document.getElementById("LI1")
    var jia1 = document.getElementById("jia1")

    var cc = 1
    jia.onclick = function () {
        cc++;
        if(cc<1){
            cc=1
            LI.innerHTML = cc
        }else{
            LI.innerHTML = cc
        }
    }
    jian.onclick = function () {
        cc--;
        if(cc <1){
            LI.innerHTML = 1
        }else{
            LI.innerHTML = cc
        }
    }
    jia1.onclick = function () {
        cc++;
        if(cc<0){
            cc=1
            LI1.innerHTML = cc
        }else{
            LI1.innerHTML = cc
        }
    }
    jian1.onclick = function () {
        cc--;
        if(cc <1){
            LI1.innerHTML = 0
        }else{
            LI1.innerHTML = cc
        }
    }
    var sao = document.getElementById("sao")
    var ma = document.getElementById("ma")

    sao.onmouseover = function () {
        ma.style.display = "block"
    }
    sao.onmouseout = function () {
            ma.style.display = "none"
        }

   var fa = document.getElementById("fa")
    var nav2 = document.getElementById("nav2")
    window.addEventListener("scroll",function () {

        if(scroll().top>1050){
            nav2.className = "fixde"
            fa.style.paddingTop = nav2.offsetHeight
        }else{
            nav2.className = ""
            fa.style.paddingTop = 0;

        }
    },false);


    var product = document.getElementById("product");
    var productspan = product.getElementsByTagName("span");
    var product_ul = product.getElementsByTagName("ul");
    product.addEventListener("mouseover", function () {
        productspan[0].style.backgroundPosition = "-17px -19px";
        product_ul[0].style.display = "block";
    },false);
    product.addEventListener("mouseout", function () {
        productspan[0].style.backgroundPosition = "-8px -19px";
        product_ul[0].style.display = "none";
    },false);


    var two = document.getElementById("two");
    var twodiv = two.getElementsByTagName("div");
    var there = document.getElementById("there");
    var therediv = there.getElementsByTagName("div");
    two.addEventListener("mouseover", function () {
        twodiv[0].style.display = "block";
        this.style.backgroundColor = "#fff";
    },false);
    there.addEventListener("mouseover", function () {
        therediv[0].style.display = "block";
        this.style.backgroundColor = "#fff";
    },false)
    two.addEventListener("mouseout", function () {
        twodiv[0].style.display = "none";
        this.style.backgroundColor = "";
    },false);
    there.addEventListener("mouseout", function () {
        therediv[0].style.display = "none";
        this.style.backgroundColor = "";
    },false)

    var indent = document.getElementById("indent");
    var indent_ul = document.getElementById("indent_ul");
    var indent_span = indent.getElementsByTagName("span");
    indent.addEventListener("mouseover", function () {
        indent.style.backgroundColor = "#fff";
        indent_span[0].style.backgroundPosition = "-16px -13px";
        indent_ul.style.display = "block";
    },false)
    indent.addEventListener("mouseout", function () {
        indent.style.backgroundColor = "";
        indent_span[0].style.backgroundPosition = "-8px -13px"
        indent_ul.style.display = "none";
    },false)

    var tel = document.getElementById("tel");
    var tel_mid = document.getElementById("tel_mid");
    tel.onmouseover = function () {
        tel_mid.style.display = "block";
    }
    tel.onmouseout = function () {
        tel_mid.style.display = "none";
    }

    var search_input = document.getElementById("search_input");
    var search_news = document.getElementById("search_news");
    var search_news_span = document.getElementById("search_news_span");
    search_input.onfocus = function () {
        this.style.background = "#fff";
        search_news.style.display = "block";
    }
    search_input.onblur = function () {
        if(this.value.length === 0){
            this.style.background = "url(././image/guilin/searchinp1.png) no-repeat";
            search_news.style.display = "none";
        }
    }
    search_news_span.onclick = function () {
        var fa = this.parentNode;
        fa.style.display = "none";
    }


    var atlas = document.getElementById("atlas");
    var atlasdiv = atlas.getElementsByTagName("div");
    atlas.onmouseover = function () {
        atlasdiv[0].style.display = "block";
        atlas.style.backgroundColor = "#fff";
    }
    atlas.onmouseout = function () {
        atlasdiv[0].style.display = "none";
        atlas.style.backgroundColor = "";
    }
    var lis_selected1 = document.getElementById("lis_selected1");
    var lis_selecteddiv1 = lis_selected1.getElementsByTagName("div");

    var lis_selected2 = document.getElementById("lis_selected2");
    var lis_selecteddiv2 = lis_selected2.getElementsByTagName("div");

    var lis_selected3 = document.getElementById("lis_selected3");
    var lis_selecteddiv3 = lis_selected3.getElementsByTagName("div");

    var lis_selected4 = document.getElementById("lis_selected4");
    var lis_selecteddiv4 = lis_selected4.getElementsByTagName("div");

    lis_selected1.onmouseover = function () {
        lis_selecteddiv1[0].style.display = "block";
    }
    lis_selected1.onmouseout = function () {
        lis_selecteddiv1[0].style.display = "none";
    }

    lis_selected2.onmouseover = function () {
        lis_selecteddiv2[0].style.display = "block";
    }
    lis_selected2.onmouseout = function () {
        lis_selecteddiv2[0].style.display = "none";
    }


    lis_selected3.onmouseover = function () {
        lis_selecteddiv3[0].style.display = "block";
    }
    lis_selected3.onmouseout = function () {
        lis_selecteddiv3[0].style.display = "none";
    }


    lis_selected4.onmouseover = function () {
        lis_selecteddiv4[0].style.display = "block";
    }
    lis_selected4.onmouseout = function () {
        lis_selecteddiv4[0].style.display = "none";
    }

    var tianshu2 = document.getElementById("tianshu2")
   console.log(window.innerWidth);
    window.onscroll = function(){
        if(window.innerWidth>1400){
            tianshu2.style.left = 450 +"px"
        }else{
            tianshu2.style.left = 150 +"px"
        }
    }












}