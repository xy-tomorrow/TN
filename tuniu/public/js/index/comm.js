/**
 *����Ч��  ��װ����
 * Ҫ��  �ƶ������Ԫ��  ����  �����λ��
 * @param ele  ������ʾ  ����Ҫ�ƶ���Ԫ��
 * @param left ������ʾ  ����Ҫ�����λ��
 * @param time ������ʾ  ����ÿ��Ҫ�ƶ��ľ���
 */
function movement(ele, left, time) {
    clearInterval(ele.tar);
    ele.tar = setInterval(function () {
        //��ȡ�ƶ�Ԫ�صĵ�ǰλ��
        var one = ele.offsetLeft;
        //����ÿ���ƶ��ľ���
        var two = time;
        //�����ж�  �����ǰλ�ô��ڵ����λ��   �ƶ��ľ���ȡ��ֵ(������)  ��Ȼȡ��ֵ�������ߣ�
        two = one > left ? -two : two;
        //�����ж� ����λ�ü�ȥ��ǰԪ��λ�õľ�����ڻ����һ���ƶ���λ�þ�ִ��  Ϊ�˽��бȽϴ�С ���õ���ֵ����ȡ����ֵ���ڱȽ�  ��Ȼ��ִ��else�еĴ���
        if (Math.abs(left - one) >= Math.abs(two)) {
            one = one + two;
            ele.style.left = one + "px";
        } else {
            //���õ���Ŀ��λ��
            ele.style.left = left + "px";
            clearInterval(ele.tar);
        }
    }, 15)
}


/**
 *��װ����  ����������װ
 * Ҫ��  �ƶ������Ԫ��  ���������Ŀ�ĵ�  �����ǻ���Ч��  Ŀǰֻ�ܴӿ쵽�� ��ʱ�����������������Ч��
 * Ҫ��  ���ǵ���ȷ�� ��Щ�����ǿɱ��  ���ɱ����Ϊ����
 * @param ele   Ҫ�ƶ���Ԫ��
 * @param target    Ҫ�ﵽ��Ŀ�ĵ�
 * @param every     ����3Ϊ ÿ���ƶ��İٷ���
 */
function slow(ele, target, every) {
    clearInterval(ele.tar)
    ele.tar = setInterval(function () {
        var le = ele.offsetLeft;
        var se = (target - le) / every;
        se = se > 0 ? Math.ceil(se) : Math.floor(se);
        console.log(se);
        le = le + se;
        ele.style.left = le + "px";
        if(le === target){
            clearInterval(ele.tar)
        }
    }, 15)
}



/**
 * ��һ��Ҫ��Ҫ���ƶ�  �����Ԫ��  ����  �����λ��
 * ע���  ÿ�ν����Ƚ������  st = st < 0 ? -st : st;  ��仰 �� ��������ʱ����ȡ��ֵ
 * @param ele   Ҫ�ƶ���Ԫ��
 * @param tar   Ҫ�����λ��
 */
 function ani1(ele,tar){
        clearInterval(ele.tim);
        ele.tim = setInterval(function () {
            var le = ele.offsetLeft;
            var st = (tar - le) / 10;
            st = st < 0 ? -st : st;
            le = le + st;
            ele.style.left = le + "px";
            if(le === tar){
                clearInterval(ele.tim);
            }
        },15)
    }

/**
 * �ڶ���Ҫ��  �ƶ�����Ԫ�� ͬʱ�ı������� ���ҵ���ָ��ֵ
 * Ҫ�ĵ������е������Լ�����ֵ  Ҫʹ��for in ��������
 * ������  k����������  json[k]��������ֵ
 * �ı�����Բ��̶�Ҳ��֪�����Ǹ� ����ѭ������
 * var slo = true;Ϊʲôд�Լ�����  ��Ϊ���Ǹı�������  ��һ�����Ե���ʱ �ͻ�ֹͣ��ʱ�� ���������ȼ���ȫ������ �ڽ��б���  �ڱ���ʱ  ���ǽ����ж�  �����һ��û�е���͸ı�slo������ֵ  ��Ϊfalse
 * @param ele   Ҫ�ƶ���Ԫ��
 * @param json  �ñ�����һ������  �����б����� Ҫ�ı������  �Լ� Ҫ���������ֵ  ����ֵҪ��������
 */

function ani2(ele,json){
    clearInterval(ele.tim);
    ele.tim = setInterval(function () {
        var slo = true;
        for(k in json){
            var le = parseInt(getS(ele,k))||0;
            var st = (json[k] - le) / 10;
            st = st < 0 ? Math.floor(-st) : Math.ceil(st);
            console.log(st);
            le = le + st;
            ele.style[k] = le + "px";
            if(le !== json[k]){
                slo = false;
            }
        }
        if(slo){
            clearInterval(ele.tim);
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
        console.log(slo);
        if(slo){
            clearInterval(ele.tim)
            fn && fn();
        }
    },15)
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








/**
 * ��ȡ����Ŀ������� �ļ��ݺ���
 * @returns {{width: (Number|number), height: (Number|number)}}
 */
function getSize(){
    return {
        width :window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height :window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

/**
 * ע���¼��ļ��ݺ���
 * @param ele   Ҫע���¼���Ԫ��
 * @param eventName ע����¼�
 * @param listener  �¼���������
 */
function addEvent(ele,eventName,listener){
    if(ele.addEventListener){
        ele.addEventListener(eventName,listener,false);
    }else if(ele.attachEvent){
        ele.attachEvent("on" + eventName,listener);
    }else{
        ele["on" + eventName] = listener;
    }
}

/**
 * event������ �����������Եķ�װ����
 * ���ַ���  ����  ���ݷ�װ����
 * @param event
 * @returns {{event: (*|Event), pageX: (*|Number), pageY: (*|Number), stopPropagation: Function, target: (*|string|EventTarget|Node|Object)}}
 */

function getEvent(event){
    return {
        event: event || window.event,
        pageX: event.pageX || event.clientX + document.documentElement.scrollLeft,
        pageY: event.pageY || event.clientY + document.documentElement.scrollTop,
        stopPropagation: function () {
            if(event.stopPropagation){
                return event.stopPropagation()
            }else {
                return event.cancelBubble = true;
            }
        },
        target:event.target||event.srcElement

    }
}