/**
 * Created by yll on 2019/6.
 */
//轮播图下七个等所有加载完之后再加载
window.onload = function () {
    var ul2 = document.getElementById("show_mid_top");
    var lis2 = ul2.getElementsByTagName("img");
    for (var i = 0; i < lis2.length; i++) {
        lis2[i].setAttribute("index", i + 1)
        lis2[i].onmouseover = function () {
            for (var i = 0; i < lis2.length; i++) {
                lis2[i].removeAttribute("class");
                var str = lis2[i].src;
                if(str.indexOf("-") > -1){
                    lis2[i].src = "././image/index/c"+lis2[i].getAttribute("index")+".jpg"
                }
            }
            this.className = "show_mid_top_img";
            this.src = "././image/index/c"+this.getAttribute("index")+"-1.jpg";
        }
    }



    //轮播图下-----超值特卖（超级自由行，旅游分期等可用vue的控制面板的知识写（上课案例饿了么下部订单，外卖））
    var special = document.getElementById("special-top");
    var speciallis = special.getElementsByTagName("a");
    var specialdiv = document.getElementById("special_buttom");
    var specialdivs = specialdiv.children;
//模拟后台拿到的数据
    var arr1 = [{
        src: "././image/index/special-buttom11.jpg",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom12.jpg",
        content: "<span>21</span>天 <span>0</span> 时 <span>51</span>分",
        contentlinks: "&lt;泰国曼谷-芭提雅-清迈&gt;8晚10日游泰航往返，入住安心酒店agoda国际四星，都市海岛与清新小城的完美结合，沙美岛出海",
        contentspanl: "<i>?<em>3174</em>起</i>",
        contentspans: "<s>?3968</s>",
        contentspanlis: "<span>8折</span>"
    }, {

        src: "././image/index/special-buttom13.jpg",
        content: "<span>10</span>天 <span>5</span> 时 <span>42</span>分",
        contentlinks: "&lt;德法意瑞比利时5国12日游&gt;尾货推荐，北京直飞，含联运，异地录指纹，酒店升级一晚阿尔卑斯山木屋酒店，特色餐厅塞纳河水上餐厅用餐",
        contentspanl: "<i>?<em>2888</em>起</i>",
        contentspans: "<s>?3600</s>",
        contentspanlis: "<span>7折</span>"
    }, {

        src: "././image/index/special-buttom14.jpg",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",


        contentlinks: "&lt;泰国-新加坡-马来西亚9晚10或11日游&gt;",
        contentspanl: "<i>?<em>4500</em>起</i>",
        contentspans: "<s>?6200</s>",
        contentspanlis: "<span>7.2折</span>"
    }];


    var arr2 = [{
        src: "././image/index/special-buttom21.png",
        content: "<span>16</span>天 <span>2</span> 时 <span>56</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom22.jpg",
        content: "<span>15</span>天 <span>08</span> 时 <span>33</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom23.jpg",
        content: "<span>12</span>天 <span>4</span> 时 <span>53</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom24.jpg",
        content: "<span>8</span>天 <span>15</span> 时 <span>55</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];


    var arr3 = [{
        src: "././image/index/special-buttom31.jpg",
        content: "<span>13</span>天 <span>5</span> 时 <span>13</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom32.jpg",
        content: "<span>6</span>天 <span>4</span> 时 <span>03</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom33.jpg",
        content: "<span>3</span>天 <span>13</span> 时 <span>46</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom34.jpg",
        content: "<span>25</span>天 <span>22</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];
    var arr4 = [{
        src: "././image/index/special-buttom41.jpg",
        content: "<span>32</span>天 <span>2</span> 时 <span>43</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom42.jpg",
        content: "<span>31</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom43.jpg",
        content: "<span>45</span>天 <span>3</span> 时 <span>56</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom44.jpg",
        content: "<span>36</span>天 <span>3</span> 时 <span>3</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];


    var arr5 = [{
        src: "././image/index/special-buttom51.png",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom52.jpg",
        content: "<span>24</span>天 <span>14</span> 时 <span>43</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom53.jpg",
        content: "<span>15</span>天 <span>31</span> 时 <span>29</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom54.jpg",
        content: "<span>17</span>天 <span>22</span> 时 <span>52</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];


    var arr6 = [{
        src: "././image/index/special-buttom61.jpg",
        content: "<span>19</span>天 <span>2</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom62.jpg",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom63.jpg",
        content: "<span>20</span>天 <span>3</span> 时 <span>20</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom64.jpg",
        content: "<span>9</span>天 <span>9</span> 时 <span>2</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];


    var arr7 = [{
        src: "././image/index/special-buttom71.png",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom72.jpg",
        content: "<span>18</span>天 <span>3</span> 时 <span>53</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/神庙/红海度假/狮身人面像/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom73.jpg",
        content: "<span>5</span>天 <span>3</span> 时 <span>23</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/亚历山大/吉萨金字塔群/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }, {

        src: "././image/index/special-buttom74.jpg",
        content: "<span>25</span>天 <span>13</span> 时 <span>20</span>分",
        contentlinks: "&lt;埃及全景8日游&gt;全程五星/埃及博物馆",
        contentspanl: "<i>?<em>3422</em>起</i>",
        contentspans: "<s>?1999</s>",
        contentspanlis: "<span>7.6折</span>"
    }];

    var arrda = [arr1, arr2, arr3, arr4, arr5, arr6, arr7,];
    for (var j = 0; j < speciallis.length; j++) {
        speciallis[j].setAttribute("index", j + 1);

        speciallis[j].onmouseover = function () {
            for (var i = 0; i < speciallis.length; i++) {
                speciallis[i].removeAttribute("class");
            }
            this.className = "special-top-pink";
            for (var h = 0; h < specialdivs.length; h++) {
                specialdivs[h].innerHTML = "";
            }
            var oin = parseInt(this.getAttribute("index"));
            console.log(oin);
            for (var k = 0; k < arrda[oin-1].length; k++) {
                specialdivs[k].innerHTML = '<img src=' + arrda[oin-1][k].src + ' alt=""/>'
                    + '<div>'
                    + '<span class="time">'
                    + arrda[oin-1][k].content
                    + '</span>'
                    + '<span class="site">'
                    + '<a href="#">'+arrda[oin-1][k].contentlinks + '</a>'
                    + '</span>'
                    + '<span class="price">'
                    + arrda[oin-1][k].contentspanl
                    + arrda[oin-1][k].contentspans
                    + arrda[oin-1][k].contentspanlis
                    + '</span>'
                    + '</div>';
            }
        }
    }
//   首页 轮播图特效开始
    var show_mid_l = document.getElementById("show_mid_l");
    var show_mid_r = document.getElementById("show_mid_r");
    var show = document.getElementById("show");
    var ul = document.getElementById("show_ul");
    var ulmid = document.getElementById("show_mid_nav");
    var ulmidlis = ulmid.getElementsByTagName("a");
    var lis = ul.children;
    lis[0].style.background = "url(././image/index/show_bg1.jpeg)";
    var li = lis[lis.length-1].cloneNode(true);
    li.style.background = "url(././image/index/show_bg1.jpeg)";
    ul.appendChild(li);
    var inde = 0;
    var pic = 0;
    for(var h=0;h<ulmidlis.length;h++){
        ulmidlis[h].index = h;
        ulmidlis[h].onmouseover = function () {
            inde = this.index;
            pic = this.index;
            for(var i=0;i<ulmidlis.length;i++){
                ulmidlis[i].removeAttribute("class");
            }
            this.className = "show_mid_nav_hover";
            var ullisW = lis[0].offsetWidth * this.index;
            ani3(ul,{"left":-ullisW});
        }
    }
    show_mid_l.onclick = function () {
        if(inde > 0 ){
            inde--;
            pic++;
            var lisW = lis[0].offsetWidth * inde;
            ani3(ul,{"left":-lisW});

        }else {
            inde = lis.length-1;
            ul.style.left = -inde * lis[0].offsetWidth + "px";
            inde--;
            var lisW = lis[0].offsetWidth * inde;
            ani3(ul,{"left":-lisW});
            pic = ulmidlis.length-1;
        }
        for(var i=0;i<ulmidlis.length;i++){
            ulmidlis[i].removeAttribute("class");
        }
        ulmidlis[pic].className = "show_mid_nav_hover";
    }
    show_mid_r.onclick = function () {
        if(inde < lis.length-1){
            inde++;
            pic++;
            if(inde === lis.length-1){
                pic = 0;
            }
            var lisW = lis[0].offsetWidth * inde;
            ani3(ul,{"left":-lisW});
        }else {
            inde = 0;
            ul.style.left = 0 + "px";
            inde++;
            var lisW = lis[0].offsetWidth * inde;
            ani3(ul,{"left":-lisW});
            pic = 1;
        }
        for(var i=0;i<ulmidlis.length;i++){
            ulmidlis[i].removeAttribute("class");
        }
        ulmidlis[pic].className = "show_mid_nav_hover";
    }

    var ultime = setInterval(show_mid_r.onclick,3000);
    show.onmouseover = function () {
        clearInterval(ultime);
    }
    show.onmouseout = function () {
        ultime = setInterval(show_mid_r.onclick,3000);
    }


    //show栏特效开始 轮播图左侧的左边show_l_l      轮播图左侧的右边show_l_l
    var show_l_l = document.getElementById("show_l_l");
    var show_l_llis = show_l_l.getElementsByTagName("li");
    var show_l_r = document.getElementById("show_l_r");
    var show_l_ruls = show_l_r.getElementsByTagName("ul");

    for (var s = 0; s < show_l_llis.length; s++) {
        show_l_llis[s].index = s;
        show_l_llis[s].onclick = function() {
            for(var i=0;i<show_l_llis.length;i++){
                show_l_llis[i].removeAttribute("class");
                show_l_ruls[i].removeAttribute("class");
            }
            this.className = "show-pitch";
            show_l_ruls[this.index].className = "show_l_r_ul";
        }
    }

    var show_r_news = document.getElementById("show_r_news");
    var show_r_newslis = show_r_news.getElementsByTagName("li");
    var show_r_newslisimg = show_r_news.getElementsByTagName("img");
    for(var z = 0;z<show_r_newslisimg.length;z++){
        show_r_newslisimg[z].src = "././image/index/4" + (z+1) + ".png";
    };
    for(var f =0;f<show_r_newslis.length;f++){
        var show_r_newslisimg = show_r_newslis[f].getElementsByTagName("img");
        show_r_newslis[f].onmouseover = function () {
            var show_r_newsimgs = this.getElementsByTagName("img");
            show_r_newsimgs[0].style.marginTop = -3 + "px";
        }
        show_r_newslis[f].onmouseout = function () {
            var show_r_newsimgs = this.getElementsByTagName("img");
            show_r_newsimgs[0].style.marginTop = 0 + "px";
        }
    }
    //show栏特效完成


//当季热玩
    var choice = document.getElementById("choice");
    var choice_a = choice.getElementsByTagName("a");

    var hotplay_show_r = document.getElementById("hotplay_show_r");

    var hotplay_show_ruls = hotplay_show_r.getElementsByTagName("ul");

    var hotplay_nav = document.getElementById("hotplay_nav");

    var hotplay_nav_lis = hotplay_nav.getElementsByTagName("li");
    var tre = true;
    var on = 0;
    for(var t = 0;t<hotplay_nav_lis.length;t++){
        hotplay_nav_lis[t].index = t;
        hotplay_nav_lis[t].onmouseover = function () {
            tre = false;
            for(var t = 0;t<hotplay_show_ruls.length;t++){
                hotplay_show_ruls[t].className = "clearfix";
            };
            hotplay_show_ruls[this.index].className = "hotplay-show_rul clearfix";
            hotplay_show_ruls[this.index].style.opacity = 0.8;
            ani3(hotplay_show_ruls[this.index],{"opacity":1},function(){
                tre = true;
            });
        }
    }









//  轮播图特效开始

    //头部

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
            this.style.background = "url(././images/index/123123.png) no-repeat 200px";
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
    //头部


    /**
     * 第三次要求  要求移动任意元素的位置  以及改变任意元素的任意属性  前提是这些属性是可以参与运算的
     * 同样我们不知道下次有没有全部排好  所以我先假设全部排好啦    进行判断如果有一个没有到达目标改变假设值
     * 当属性为opacity  是  没有单位  我们将单位去掉  由于opacity的属性值是在0到1  之间  而去小数非常麻烦  所以我们暂时将得到的值乘以100
     * opacity属性当前的值保持在le变量中  到达的目标  保存在tar变量中 每次改变的值保存在st变量中  如果st小于0值进行下舍入  大于0 进行上舍入
     * 在将当前值加上每次增加的值  计算下一次到达的值  再除以100 得到值  赋值给元素的opacity属性
     * @param ele   要移动的元素
     * @param json  要改变的属性  是一个对象包含着的  由于我改变的属性中有的属性值没有包含单位  所以我们要进行判断
     * @param fn 回调函数 fn && fn(); 进行判断  如果有这个参数 判断第二个  进行执行啦  设置这个参数是考虑到形成点击一次多次动画效果
     */

    function ani3(ele,json,fn){
        clearInterval(ele.tim)
        ele.tim = setInterval(function () {
            var slo = true
            for(h in json){
                if(h === "opacity"){
                    var le = getS(ele,h) * 100;
                    var tar = json[h]*100;
                    var st = (tar - le) / 10;
                    st = st < 0 ? Math.floor(st) : Math.ceil(st);
                    console.log(st);
                    le = le + st;
                    ele.style[h] = le / 100;
                }else if(h === "zIndex"){
                    ele.style[h] = json[h];
                }
                else {
                    var le = parseInt(getS(ele,h))||0;
                    var tar = json[h];
                    var st = (json[h] - le) / 10;
                    st = st < 0 ? Math.floor(st) : Math.ceil(st);
                    le = le + st;
                    ele.style[h] = le + "px";
                }
                if(le !== tar){
                    slo = false;
                }
            }
            if(slo){
                clearInterval(ele.tim)
                fn && fn();
            }
        },15)
    }


    /**
     * 封装window.getComputedStyle(ele,null)  与  ele.currentStyle[aute]  获取两个的兼容性问题
     * @param ele   要获取的元素
     * @param aute  要获取的属性值
     * @returns {*} 返回支持的方式
     */
    function getS(ele, aute) {
        if (window.getComputedStyle(ele, null)) {
            return window.getComputedStyle(ele, null)[aute];
        } else {
            return ele.currentStyle[aute];
        }
    }



    var hotplay_nav = document.getElementById("hotplay_nav");
    var overseas_nav = document.getElementById("o_nav");
    var t_nav = document.getElementById("t_nav");
    var l_nav = document.getElementById("l_nav");
    var z_nav = document.getElementById("z_nav");
    var r_nav = document.getElementById("r_nav");
    var h_nav = document.getElementById("h_nav");
    var f_nav = document.getElementById("f_nav");
    var i_nav = document.getElementById("i_nav");
    var p_nav = document.getElementById("p_nav");
    var d_nav = document.getElementById("d_nav");
    window.onscroll = function (e) {
        var evt = e || window.event;
        var ji = evt.pageY;
        console.log(hotplay_nav.offsetTop);
        console.log(overseas_nav.offsetTop);
        console.log(t_nav.offsetTop);
        console.log(l_nav.offsetTop);
        console.log(z_nav.offsetTop);
        console.log(r_nav.offsetTop);
        console.log(h_nav.offsetTop);
        console.log(f_nav.offsetTop);
        console.log(i_nav.offsetTop);
        console.log(p_nav.offsetTop);
        console.log(d_nav.offsetTop);
    }

    var fixed = document.getElementById("fixed");
    var id = document.getElementById("id");
    var fixed_a = fixed.getElementsByTagName("a");
    var arr2 = [839, 1306, 1735, 2164, 2593, 2593,2593, 3022, 3277, 3519, 3761, 4003, 4245];
    var ob = false;
    window.onscroll = function(){
        if(window.innerWidth < 1800){
            fixed.style.left = "2%";
        }else {
            fixed.style.left = "15%";
        };
        if (document.body.scrollTop >= 839 && document.body.scrollTop < 4250) {
            if(ob){
                ob = false;
                fixed.style.display = "block";
                ani3(fixed,{"top":400}, function () {
                    ani3(fixed,{"top":100})
                });
            }

        }
        else{
            fixed.style.display = "none";
            ob = true;
        }
    };
    for (var r = 0; r < fixed_a.length; r++) {
        fixed_a[r].index = r;
        fixed_a[r].onclick = function () {
            for(var r = 0; r < fixed_a.length; r++){
                fixed_a[r].style.backgroundColor = "";
                fixed_a[r].style.color = "#000";

            }
            this.style.color = "#fff";
            this.style.backgroundColor = "#D74568";
            //document.body.scrollTop = arr2[this.index];
            an(document.body,{"scrollTop": arr2[this.index]})
            return false;
        }
    }



    function an(ele,json,fn){
        clearInterval(ele.tim)
        ele.tim = setInterval(function () {
            var slo = true
            for(h in json){
                var le = ele[h];
                var tar = json[h];
                var st = (json[h] - le) / 10;
                st = st < 0 ? Math.floor(st) : Math.ceil(st);
                le = le + st;
                ele[h] = le;
                if(le !== tar){
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

}
