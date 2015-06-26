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
