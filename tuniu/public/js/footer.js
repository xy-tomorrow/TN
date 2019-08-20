$(function(){
    $.ajax({
      url:"footer.html",
      type:"get",
      success:function(result){
        $(result).replaceAll("footer");
        //动态创建link元素，引入header.css,自动添加到<head>元素中
        $(`<link rel="stylesheet" href="css/index/sheet.css">`).appendTo("footer");
        $(`<link rel="stylesheet" href="css/index/global.css">`).appendTo("head");
        $(`<link rel="stylesheet" href="css/index/base.css">`).appendTo("head");
        $(`<link rel="stylesheet" href="css/index/common.css">`).appendTo("head");
      }
    })
  })