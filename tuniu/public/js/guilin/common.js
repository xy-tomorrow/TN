/**
 * Created by Administrator on 2017/4/25 0025.
 */

//获取文本neir
//element:要设置文本的html
//return: html元素的文本内容
function getInnerText(element){
    if(typeof  element.innerText === "string"){
        return element.innerText
    }else{
        return element.textContent
    }
}
//设置html元素的文本内容
//element:要设置文本的html
//content:要设置文本内容

function setInnerText(element){
    if(typeof  element.innerText === "string"){
        element.innerText = content
    }else{
        element.textContent = content
    }
}
/**
 * 获取下一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */

function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//下一个兄弟节点
        while (next && next.nodeType !== 1) {//一直往后找的条件 1有 2不是我要的
            next = next.nextSibling;//继续往后找兄弟节点
        }
        return next;
    }
}


/**
 * 获取上一个兄弟元素的兼容函数
 * @param element
 * @returns {*}
 */

function getpreviousElement(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling
    } else{
        var prev = ele.previousSibling
        while(prev && prev.nodeType !==1 ){
            prev = prev.previousSibling
        }
        return prev
    }
}
/**
 * 轮播图
 * @param element
 * @returns {*}
 */
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;//step有了正负
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";//手动放到终点
            clearInterval(obj.timer);
        }
    }, 15);
}
/**
 * 缓慢动画
 * @param element
 * @returns {*}
 */

function animatefn(obj,json,fn){
    clearInterval(obj.timer)//防止多个定时器运行

    obj.timer = setInterval(function () {

        var flag = true //假设所有的属性都运行完达到目标
        //k是键 "top","left","width"
        // for .in循环遍历,让每个属性都进行运算
        for(var k in json){
            if(k === "opacity"){
                //这里没必要给默认值，透明度没有单位.是小数，所以不需要parseInt
                var leader = getStyle(obj,k)*100//都要*100
                //因为值取0-1，是小数，所有*100转换为整数
                var target = json[k]*100//调用值
                //缓动动画的核心
                var step = (target-leader)/10;
                //正数向上取整 负数向下取整
                step = step>0? Math.ceil(step):Math.floor(step)
                leader += step
                //不要单位 在/100
                obj.style[k] = leader/100
            }else if(k === "zIndex"){
                obj.style.zIndex = json[k]
            }else{
                //var leader = obj.offsetLeft;//取初始位置  只能获取left
                //获取整数
                var leader = parseInt(getStyle(obj,k)) || 0;//可以获取任意样式
                var target = json[k]//调用值
                //缓动动画的核心
                var step = (target-leader)/10;
                //正数向上取整 负数向下取整
                step = step>0? Math.ceil(step):Math.floor(step)
                leader += step
                obj.style[k] = leader + "px"//移动到的位置,arre变为k
            }
            //如果没有全部运行完 则flag等于false
            if(leader !== target){
                flag = false
                //clearInterval(obj.timer)//当到达目的时清除定时器
            }
        }
        //如果为true就清除定时器，不在运行，false则继续循环
        if(flag){
            clearInterval(obj.timer);
            //判断有函数执行，没有函数跳出
//                if(fn){
//                    fn()
//                }
            fn && fn()//简写
        }
    },15)
}
/**
 * 获取计算后样式属性值的兼容
 * @param element
 * @returns {*}
 */

function getStyle(obj,attr){//这的attr是属性，记得加字符串
    //判断true
    if(window.getComputedStyle){//可以用就输出
        return  window.getComputedStyle(obj, null)[attr];
    }else{
        return obj.currentStyle[attr]
    }
}
/**
 * 封装获取页面被卷去的头部高度和左侧宽度的 兼容函数
 * @param element
 * @returns {*}
 */
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/**
 * 能够获取网页可视区的宽度和高度
 * @param element
 * @returns {*}
 */
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    };
}

/**
 * 封装一个获取当前时间 并设置表针旋转角度的函数
 * @param element
 * @returns {*}
 */
function clock() {
    var d = new Date();
    var ms = d.getMilliseconds();
    var s = d.getSeconds() + ms / 1000;//秒钟
    //60秒 转一圈 360度 一秒6度
    ss.style.transform = "rotate(" + (s * 6) + "deg)";
    var m = d.getMinutes() + s / 60;//分钟
    //60分 转一圈 360度 一分钟6度
    mm.style.transform = "rotate(" + (m * 6) + "deg)";
    var h = d.getHours() + m / 60;//小时
    //12小时 转一圈 360度 30度
    hh.style.transform = "rotate(" + (h * 30) + "deg)";
}
