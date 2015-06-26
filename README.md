# GvSlideShow
Just another js slideshow.
现成的js幻灯片很多,只是想再写一个自己用起来顺手的。

sample code:

	<!DOCTYPE html>
	<html lang="zh-CN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js"></script>
	</head>
	<body>
		<style type="text/css">
		body{
			margin:0px;
		}
		</style>

		<div id="gvSlideShow"></div>
		<div id="gvSlideShow2"></div>
		<button class="prev">prev</button>
		<button class="next">next</button>
		<button class="to">to</button>
		<button class="start">start</button>
		<button class="stop">stop</button>
		<button class="speed">speed</button>
		<button class="slideSpeed">slideSpeed</button>
		<br>
		<button class="prev2">prev2</button>
		<button class="next2">next2</button>
		<button class="to2">to2</button>
		<button class="start2">start2</button>
		<button class="stop2">stop2</button>
		<button class="speed2">speed2</button>
		<button class="slideSpeed2">slideSpeed2</button>
		<br>
		<button class="hide">hide</button>

		<style type="text/css">
		.gvSlideShow{position: relative;height:200px;overflow:hidden;}
		.gvSlideShow .slides{height:100%;position:absolute;left:0px;}
		.gvSlideShow .slide {height:100%;float:left;text-align: center;background:no-repeat center center;}
		.gvSlideShow .dots{text-align: center;position:absolute;bottom:10px;left: 0px;right:0px;}
		.gvSlideShow .dot{width:10px;height:10px;border-radius:50%;background:rgba(0,0,0,0.5);border:solid 2px rgba(255,255,255,0.5);cursor:pointer;display: inline-block;margin:0 5px 2px;}
		.gvSlideShow .dot.active{width:14px;height:14px;margin:0 3px 0;background-color:rgba(255,255,255,0.8);border-color:rgba(0,0,0,0.5);}
		</style>

	<script type="text/javascript">
	// GvSlideShow

		function GvSlideShow(param){	

			var This = this;	

			//prameter
			This.id = param.id;
			This.images = param.images ? param.images : [];
			This.links = param.links ? param.links : [];
			This.fullWidth = param.fullWidth == undefined || param.fullWidth == false ? false : true;
			This.autoPlay = param.autoPlay == undefined || param.autoPlay == true ? true : false;
			This.newWindow = param.newWindow == undefined || param.newWindow == false ? false : true;
			This.speed = param.speed?param.speed:3000;
			This.slideSpeed = param.slideSpeed?param.slideSpeed:500;

			// variable
			This.index = 0;
			This.interval;
			this.isSliding = false;
			This.target = $('#'+This.id);

			//init before
			This.target.append('<div class="gvSlideShow"></div>');
			This.target.find('.gvSlideShow').append('<div class="slides"></div>');
			This.target.find('.gvSlideShow').append('<div class="dots"></div>');

			for(var i=0; i<This.images.length; i++){
				This.target.find('.slides').append('<div class="slide" data-index="'+i+'" style="background-image:url('+This.images[i]+');"></div>');
				This.target.find('.dots').append('<div class="dot" data-index="'+i+'"></div>');
			}
			for(var i = This.links.length;i<This.images.length;i++){
				This.links.push('#');
			}
			for(var i=0; i<This.links.length; i++){
				This.target.find('.slide').eq(i).wrap('<a href="'+This.links[i]+'" target="'+(This.newWindow?'_blank':'_self')+'"></a>');
			}
			This.target.find('.slide').eq(0).addClass('active');
			This.target.find('.dot').eq(0).addClass('active');

			//event
			$(window).resize(function(){
				This.target.find('.slides').width($(window).width()*This.images.length);
				This.target.find('.slides').css('left',-1 * $(window).width()*This.index+'px');
				This.target.find('.slide').width($(window).width());
			});
			This.target.find('.dot').mouseenter(function(){
				This.slideTo( $(this).index() );
			});

			//init after
			$(window).resize();
			//图片是否拉伸至全宽
			if(This.fullWidth){
				This.target.find('.slide').css('background-size','100% 100%');
			}
			//是否自动播放
			if(This.autoPlay){
				This.start();
			}
			//

		}

		GvSlideShow.prototype = {
			slideTo: function(_index){	
				var This = this;

				if(_index==This.index){ //防止连续点击控制点的卡顿现象
					return;
				}
				This.index = _index;
				This.target.find('.slide').eq(_index).addClass('active').siblings().removeClass('active');
				This.target.find('.dot').eq(_index).addClass('active').siblings().removeClass('active');
				This.target.find('.slides').stop().animate({'left':-1 * This.index * $(window).width()},This.slideSpeed);	
				if(This.isSliding){
					This.start();
				}
			},
			prev: function(){
				var This = this;

				if(This.index!=0){
					This.slideTo(This.index-1);
				}else{
					This.slideTo(This.images.length-1);
				}
			},
			next: function(){
				var This = this;
				if(This.index<This.images.length-1){
					This.slideTo(This.index+1);
				}else{
					This.slideTo(0);
				}
			},
			start: function(){
				var This = this;
				clearInterval(This.interval);
				This.interval = setInterval(function(){
					This.next();
				},This.speed);
				This.isSliding = true;
			},
			stop: function(){
				var This = this;
				clearInterval(This.interval);
				This.isSliding = false;
			},
			setSpeed: function(_speed){
				var This = this;
				This.speed = _speed;
				if(This.isSliding){
					This.start();
				}
			},
			setSlideSpeed: function(_slideSpeed){
				var This = this;
				This.slideSpeed = _slideSpeed;
			}
		}

	</script>

	<script type="text/javascript">
	//test
	$(function(){

		var ss = new GvSlideShow({
			id:'gvSlideShow',
			images:[
			'/art/1.jpg',
			'/art/2.jpg',
			'/art/3.jpg'
			],
			links:[
			'http://www.baidu.com',
			'http://www.163.com',
			'http://www.qq.com',
			'http://www.17173.com'
			],
			newWindow:true
		});

		var ss2 = new GvSlideShow({
			id:'gvSlideShow2',
			images:[
			'/art/4.jpg',
			'/art/5.jpg',
			'/art/6.jpg',
			'/art/4.jpg',
			'/art/5.jpg',
			'/art/6.jpg',
			'/art/6.jpg'
			],
			fullWidth:true
		});

		$('button.prev').click(function(){
			ss.prev();
		});
		$('button.next').click(function(){
			ss.next();
		});
		$('button.to').click(function(){
			ss.slideTo(1);
		});
		$('button.start').click(function(){
			ss.start();
		});
		$('button.stop').click(function(){
			ss.stop();
		});
		$('button.speed').click(function(){
			ss.setSpeed(500);
		});
		$('button.slideSpeed').click(function(){
			ss.setSlideSpeed(300);
		});

		$('button.prev2').click(function(){
			ss2.prev();
		});
		$('button.next2').click(function(){
			ss2.next();
		});
		$('button.to2').click(function(){
			ss2.slideTo(2);
		});
		$('button.start2').click(function(){
			ss2.start();
		});
		$('button.stop2').click(function(){
			ss2.stop();
		});
		$('button.speed2').click(function(){
			ss2.setSpeed(3000);
		});
		$('button.slideSpeed2').click(function(){
			ss2.setSlideSpeed(1000);
		});

		$('button.hide').click(function(){
			$('.dots').remove();
		});

		console.log(ss);

	});

	</script>

	</body>
	</html>
