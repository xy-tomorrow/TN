const express=require('express');
const userRouter=require('./routes/user.js');
const jobRouter=require('./routes/job.js');
const employeeRouter=require('./routes/employee.js')
const bodyParser=require('body-parser');
// web服务器 (app.js)
var server=express();
//监听端口
server.listen(8080);
//   托管静态资源到public
server.use(express.static('public'));
//   使用body-parser中间件
server.use(bodyParser.urlencoded({
	extended:false
}));
//   使用路由器，挂载到指定的位置  例如挂载到 /user
server.use('/user',userRouter);
server.use('/job',jobRouter);
server.use('/employee',employeeRouter);













