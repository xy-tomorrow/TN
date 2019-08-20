/**
 * Created by Administrator on 2017/4/25 0025.
 */

//��ȡ�ı�neir
//element:Ҫ�����ı���html
//return: htmlԪ�ص��ı�����
function getInnerText(element){
    if(typeof  element.innerText === "string"){
        return element.innerText
    }else{
        return element.textContent
    }
}
//����htmlԪ�ص��ı�����
//element:Ҫ�����ı���html
//content:Ҫ�����ı�����

function setInnerText(element){
    if(typeof  element.innerText === "string"){
        element.innerText = content
    }else{
        element.textContent = content
    }
}
/**
 * ��ȡ��һ���ֵ�Ԫ�صļ��ݺ���
 * @param element
 * @returns {*}
 */

function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var next = element.nextSibling;//��һ���ֵܽڵ�
        while (next && next.nodeType !== 1) {//һֱ�����ҵ����� 1�� 2������Ҫ��
            next = next.nextSibling;//�����������ֵܽڵ�
        }
        return next;
    }
}


/**
 * ��ȡ��һ���ֵ�Ԫ�صļ��ݺ���
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
 * �ֲ�ͼ
 * @param element
 * @returns {*}
 */
function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = leader < target ? step : -step;//step��������
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            obj.style.left = target + "px";//�ֶ��ŵ��յ�
            clearInterval(obj.timer);
        }
    }, 15);
}
/**
 * ��������
 * @param element
 * @returns {*}
 */

function animatefn(obj,json,fn){
    clearInterval(obj.timer)//��ֹ�����ʱ������

    obj.timer = setInterval(function () {

        var flag = true //�������е����Զ�������ﵽĿ��
        //k�Ǽ� "top","left","width"
        // for .inѭ������,��ÿ�����Զ���������
        for(var k in json){
            if(k === "opacity"){
                //����û��Ҫ��Ĭ��ֵ��͸����û�е�λ.��С�������Բ���ҪparseInt
                var leader = getStyle(obj,k)*100//��Ҫ*100
                //��Ϊֵȡ0-1����С��������*100ת��Ϊ����
                var target = json[k]*100//����ֵ
                //���������ĺ���
                var step = (target-leader)/10;
                //��������ȡ�� ��������ȡ��
                step = step>0? Math.ceil(step):Math.floor(step)
                leader += step
                //��Ҫ��λ ��/100
                obj.style[k] = leader/100
            }else if(k === "zIndex"){
                obj.style.zIndex = json[k]
            }else{
                //var leader = obj.offsetLeft;//ȡ��ʼλ��  ֻ�ܻ�ȡleft
                //��ȡ����
                var leader = parseInt(getStyle(obj,k)) || 0;//���Ի�ȡ������ʽ
                var target = json[k]//����ֵ
                //���������ĺ���
                var step = (target-leader)/10;
                //��������ȡ�� ��������ȡ��
                step = step>0? Math.ceil(step):Math.floor(step)
                leader += step
                obj.style[k] = leader + "px"//�ƶ�����λ��,arre��Ϊk
            }
            //���û��ȫ�������� ��flag����false
            if(leader !== target){
                flag = false
                //clearInterval(obj.timer)//������Ŀ��ʱ�����ʱ��
            }
        }
        //���Ϊtrue�������ʱ�����������У�false�����ѭ��
        if(flag){
            clearInterval(obj.timer);
            //�ж��к���ִ�У�û�к�������
//                if(fn){
//                    fn()
//                }
            fn && fn()//��д
        }
    },15)
}
/**
 * ��ȡ�������ʽ����ֵ�ļ���
 * @param element
 * @returns {*}
 */

function getStyle(obj,attr){//���attr�����ԣ��ǵü��ַ���
    //�ж�true
    if(window.getComputedStyle){//�����þ����
        return  window.getComputedStyle(obj, null)[attr];
    }else{
        return obj.currentStyle[attr]
    }
}
/**
 * ��װ��ȡҳ�汻��ȥ��ͷ���߶Ⱥ�����ȵ� ���ݺ���
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
 * �ܹ���ȡ��ҳ�������Ŀ�Ⱥ͸߶�
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
 * ��װһ����ȡ��ǰʱ�� �����ñ�����ת�Ƕȵĺ���
 * @param element
 * @returns {*}
 */
function clock() {
    var d = new Date();
    var ms = d.getMilliseconds();
    var s = d.getSeconds() + ms / 1000;//����
    //60�� תһȦ 360�� һ��6��
    ss.style.transform = "rotate(" + (s * 6) + "deg)";
    var m = d.getMinutes() + s / 60;//����
    //60�� תһȦ 360�� һ����6��
    mm.style.transform = "rotate(" + (m * 6) + "deg)";
    var h = d.getHours() + m / 60;//Сʱ
    //12Сʱ תһȦ 360�� 30��
    hh.style.transform = "rotate(" + (h * 30) + "deg)";
}
