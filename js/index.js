$(function(){
	//给游戏规则添加点击事件
	$(".box>.rules").click(function(){
		$(".box>.rule").stop().fadeIn(100);
	});
	//给游戏规则的关闭按钮添加点击事件
	$(".rule>a").click(function(){
		$(".box>.rule").stop().fadeOut(100);
	});
	//给开始游戏添加点击事件
	$(".box>.start").click(function(){
		$(this).stop().fadeOut(100);
		progressHandler();
		StartWolf();
	});
	//给重新开始按钮添加点击事件
	$(".reStart").click(function(){
		$(".over").fadeOut(100);
		progressHandler();
		$(".score").text("0");
		StartWolf();
	});
	//定义一个方法处理进度条
	function progressHandler(){
		$(".progress").css({
			width:180
		});
		var setwidth = $(".progress").width();
		var timer = setInterval(function(){
			if(setwidth <= 0){
				clearInterval(timer);
				$(".over").stop().fadeIn(100);
				//停止动画
				stopWolf();
			}else{
				setwidth -=1;
				$(".progress").css("width",setwidth);
			}
		},300);
	}
	//处理灰太狼动画的方法
	var wolfTimer;
	function StartWolf(){
		//定义数组分别保存小灰灰和灰太狼的图片
		var wolf_h = ["img/h0.png","img/h1.png","img/h2.png","img/h3.png","img/h4.png",
		"img/h5.png",,"img/h6.png","img/h7.png","img/h8.png","img/h9.png"];
		var wolf_x = ["img/x0.png","img/x1.png","img/x2.png","img/x3.png","img/x4.png",
		"img/x5.png","img/x6.png","img/x7.png","img/x8.png","img/x9.png"];
		//定义数组对象保留所有可能出现的位置
		var pos = [
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"},
		];
		//创建一个图片
		var $wolfImg = $("<img src='' class='wolfImage'>");
		//随机获取图片的位置
		var posIndex = Math.round(Math.random()*8);
		//设置图片显示的位置
		$wolfImg.css({
			position:"absolute",
			left:pos[posIndex].left,
			top:pos[posIndex].top
		});
		//判断是小灰灰还是灰太狼
		var wolfType = Math.round(Math.random()) === 0 ? wolf_h : wolf_x;
		//随机获取图片
		//设置图片内容
		wolfIndex =0;
		wolfIndexEnd =5;
		wolfTimer = setInterval(function(){
			if(wolfIndex <= wolfIndexEnd){
				$wolfImg.attr("src",wolfType[wolfIndex]);
				wolfIndex++;
			}else{
				$wolfImg.remove();
				clearInterval(wolfTimer);
				StartWolf();
			}
		},200);
		$(".box").append($wolfImg);
		//添加一个点击图片的方法
		gameRules($wolfImg);
	}
	function gameRules($wolfImg){
		 $wolfImg.one("click",function(){ //只执行一次事件
			//修改图片索引
			wolfIndex =5;
			wolfIndexEnd =9;
			//拿到图片地址
			 var $src = $(this).attr("src");
			 var flg = $src.indexOf("h")>=0;
			 if(flg){
				 //+10
				 $(".score").text(parseInt($(".score").text())+10);
			 }else{
				 //-10
				 $(".score").text(parseInt($(".score").text())-10);
			 }
		 });
	}
	function stopWolf(){
		$(".wolfImage").remove();
		clearInterval(wolfTimer);
	}
});