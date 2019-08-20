#创建网站数据库
SET NAMES UTF8;
DROP DATABASE IF EXISTS zp;
CREATE DATABASE zp CHARSET=UTF8;
USE zp;
/*用户信息*/
CREATE TABLE zp_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128), 
  user_name VARCHAR(32),    
  gender BOOL    #性别  0-女  1-男
);
/**插入用户信息**/
INSERT INTO zp_user VALUES
(1, '不二', '123456', 'zhugeliang@qq.com', '13501234567', 'img/avatar/default.png', '不二', '1'),
(2, '精灵', '123456', 'daqiao@qq.com', '13501234568', 'img/avatar/default.png', '精灵', '0'),
(3, '大风', '123456', 'xiaoqiao@qq.com', '13501234569', 'img/avatar/default.png', '大风', '0');

/*首页当季热玩*/
CREATE TABLE zp_index_hotplay(
	hid INT PRIMARY KEY AUTO_INCREMENT, #hid
	img VARCHAR(128),#图片位置
	title VARCHAR(128),#图片标题
	price DECIMAL(10,2),        #价格
	satisty VARCHAR(10)  #满意度
);
INSERT INTO zp_index_hotplay VALUES(1,'image/index/hotplay-show_r-div1-1.jpg',"春夏爆款套餐-北京古北水镇-古北之光自驾2日游;下榻山水小镇，入住酒店美味春光双人能量早餐，体验永顺染坊，保龄球馆休闲欢乐1小时，赠送双人精品温泉，相约司马台长城看日出，晨曦中感受静谧小镇与烽火长城，特价888元起",900,98),
(2,'image/index/hotplay-show_r-div1-2.jpg',";北京-古北水镇1日游;纯玩无购物 夜游长城脚下的星空小镇 来一场逃霾之旅",236,94),
(3,'image/index/hotplay-show_r-div1-3.jpg',"五台山五爷庙-殊像寺-塔院寺-罗睺寺-黛螺顶2日游;牛人祈福专线，游特色景点 ，品佛国全素斋",900,98),
(4,'image/index/hotplay-show_r-div1-4.jpg',"古北水镇2日游;水镇自由活动，充足时间自由掌控，古北水镇赏夜景，深度游古北，泡温泉，宿古香古色客栈",519,96),
(5,'image/index/hotplay-show_r-div1-5.jpg',"八达岭长城-十三陵定陵1日游;登八达岭长城，定陵博物馆，专车专导",116,98),
(6,'image/index/hotplay-show_r-div1-5.jpg',"亲子爆款套餐-北京古北水镇童玩小当家自驾2日游;宿古北水镇，享大手牵小手长城徒步探秘，赠送童玩馆门票，童玩小创客手工体验，童玩礼遇，收获神秘礼物，传统工艺手工体验",1045,96);





