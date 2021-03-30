let _index, _width, _bar, _scrollT, _prevST, _windowH, _prevSign = "down", _nowSign = "down", _parent, _beforeItem;

// 클릭 설정
function createMenu(){
	$(".tab-1 li").click(function(i){
		$(this).addClass("on").siblings().removeClass("on");
		_index = $(this).index()
		_width = $(this).width();
		_bar = $(this).closest("div").find(".bar");
		_bar.animate( {
			left: _index*_width
		} );
		$(this).parent().find("li").each(function(i){
			if(i === _index){
				$("article #tabin-"+i).fadeIn(200);
			} else {
				$("article #tabin-"+i).css("display", "none");
			}
		});
		createMotionFX(_index);
	});

	$(".tab-2 button").click(function(i){
		$(this).addClass("on").siblings().removeClass("on");
	});	

	$(".accordion .more").click(function(){
		if( !$(this).closest("#filter").length ){
			let _this = $(".accordion").is(".state") ? $(this).closest('.state-wrap') :  $(this).closest('li');
			_this.toggleClass("on");
			if(_this.is(".on") ){
				_this.find(".cont").slideDown(200);
			} else {
				_this.find(".cont").slideUp(200);
			}		
		}
	});

	$(".create-pop").click(function(){
		overflowFx(true);
		$(".pop-wrap").fadeIn();
	});
	
	// 전체팝업창
	$(".close").click(function(){
		overflowFx(false);
		$(".pop-wrap, .full-pop-wrap").fadeOut(200);
	});

	// 화면안에 툴팁창
	$(".layer-pop-wrap .share, .layer-pop-wrap .txt-btn").click(function(){
		$(this).next().fadeIn();
	});
	$(".layer-pop-wrap .btn-close").click(function(){
		$(this).parent().fadeOut();
	});

	//좋아요
	$(".btn.like").click(function(){
		$(this).toggleClass("on");
	});

	//슬라이드 팝
	$(".slider").click(function(){
		$("footer").addClass("on");
		let _pos = -$(".bot-purchase").attr("data");
		$("footer.on .bot-purchase").css("transform","translateY("+_pos+"px)");
		overflowFx(true);
	});

	try{
		$(".bot-purchase").attr("data",$(".bot-purchase").outerHeight() -1 );
	}catch(err){
	}


	$(".bot-purchase .btn-close").click(function(){
		overflowFx(false);
		$(".bot-purchase").removeAttr("style");
		$("footer, .combobox").removeClass("on");

	});
	
	$(".combobox .value").click(function(){
		$(this).parent().toggleClass("on");
	});

	// 수량
	$(".order-num .remove, .order-num .add").click(function(){
		let _input = $(this).parent().find("input");
		let _num = Number(_input.val());
		_num = ( $(this).attr("class") === "remove" ) ? _num-1 : _num+1 ;
		if(_input.attr("maxlength") < _num.toString().length  ){
			return;
		}
		$(".order-num .remove, .order-num .add").removeAttr("disabled");
		if(_num <= 1) {
			_num = 1;
			$(this).attr("disabled","disabled");
		}
		_input.val(_num);
	});

	// 좋아요 가이드
	$(".fixed-bot-area .btn-close").click(function(){
		$(this).parent().fadeOut();
	});

	//별점주기
	try{
		$(".grade button").mousedown(function(){
			$(this).parent().removeClass("ani");
		});
		$(".grade button").click(function(){
			$(this).parent().addClass("ani");
			$(this).parent().children("button").removeClass("on");
			$(this).addClass("on").prevAll("button").addClass("on");
			let _index =  $(this).index() +1;
			counterFx(_index, "grade em", _index*40);
		});
	}catch(err){
	}


	// 선주문율그래프
	try{
		$(".scale").viewFx({
			_view:["scale"]
		});
	}catch(err){
	}

	filterFx();
}

function likeDestroyFx(){
	$(".like-wrap").removeClass("off");
	setTimeout(function(){
		$(".like-wrap").addClass("off");
	}, 3000);
}


function overflowFx($isHidden){
	if($isHidden){
		$("body").css({"height":"100%","overflow":"hidden"});
	} else {
		$("body").removeAttr("style");
	}
}

//필터
function filterFx(){
	_parent = $("#filter");
	try{
		let _containerTop = _parent.children(".accordion").position().top ;
		let _liHeight = _parent.find(".accordion li .tit").outerHeight();
		_parent.find(".accordion li .tit").click(function(){
			_index = $(this).parent().index();
			if( $(this).parent().is(".on") ) {
				$(this).parent().removeClass("on");
				$(this).next().slideUp();
			} else {
				try{
					_beforeItem.next().slideUp();	
				}catch(err){
				}
				$(this).parent().addClass("on").siblings().removeClass("on");
				$(this).next().slideDown();		
				_beforeItem = $(this);
				console.log( _parent.parent() )
				_parent.parent().animate({scrollTop: _containerTop+_index*_liHeight}, 300);
			}
		});
	}catch(err){
	}
}

// 탭이동시 모션
function createMotionFX($index){
	if(  $("div").is(".product") ){
		switch($index){
			case 0:
				counterFx($(".amount").attr("data"), "amount b");
				barFx();
				break;
			case 1:
				break;
			case 2:
				break;
		}
	}
}

function barFx(){
	let _obj = $(".order-progress .bar span");
	_obj.css("width", 0);
	_obj.animate( {
		width: "100%",
		duration:500
	});
}

// 숫자카운더
function counterFx($num, $scope, $duration){
	$({ val : 0 }).animate({ val : $num }, {
		duration: $duration || 1500,
		step: function() {
		let num = numberComma(Math.floor(this.val));
			$("."+$scope).html(num);
		},
		complete: function() {
		let num = numberComma(Math.floor(this.val));
			$("."+$scope).html(num);
		}
	});
}

// 콤마
function numberComma(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 텍스트 필드 입력 
function textAreaFx($scope, $view, $total){
	$("."+$scope).keyup(function() {
		let _cnt = $(this).val();
		$("."+$view).html(_cnt.length+ "/"+ $total);
		if(_cnt.length >=  $total) {
			$(this).val(_cnt.substring(0,  $total));
			$("."+$view).html( $total+ "/"+ $total);
		}
	});
}

// 팝업
function createPopFx(){
	$(".roomOpen").click(function(){
		$("#room").css("display","block");
		$("body").css("overflow", "hidden");
		$("body").css("height", "100%");
		$(".screenWrap").css("height", "100%");
	});	
}

// 스크롤
function scrollFx(){
	let _class = ".btn-section";
	_scrollT = $(window).scrollTop();

	if(_scrollT > 100){
		$("header").addClass("on")
	} else {
		$("header").removeClass("on")
	}
	if(  $("div").is(".product-img") && _scrollT < 400){
		let _top = _scrollT/3;
		$(".product-img").css("top", -_top );
	}

	// 상세 풋터
	if( !$("footer").is(".passivity") ){
		if(_scrollT > 200){
			$("#footer").addClass("show");
		} else{
			$("#footer").removeClass("show");
		}
	}


	// 화면안에서 고정
	try{
		_class = ".fixed-in";
		let _obj = $(_class);
		let _objH =  _obj.height();
		let _objT = _obj.offset().top;
		if(_scrollT + _windowH >= _objH + _objT){
			_obj.addClass("on");
		} else {
			_obj.removeClass("on");
		}
	}catch(err){
	}

	//탭고정 
	try{
		let _obj = $(".fixed");
		let _objT = _obj.offset().top;
		if(_scrollT > _objT - 51){
			_obj.addClass("on");
		} else {
			_obj.removeClass("on");
		}
	}catch(err){
	}


	//탭2고정 
	try{
		let _beforeH = 93;//$(".fixed").height();
		let _obj = $(".fixed2");
		let _objT = _obj.offset().top;
		if(_scrollT > _objT - 51){
			_obj.addClass("on");
		} else {
			_obj.removeClass("on");
			let _pos = -(_scrollT - ( _objT - 51 - _beforeH));
			if( _pos < 0 ){
			} else {
				 _pos = 0;
			}		
			$(".fixed > div").css("transform","translateY("+_pos+"px)");
		}
	}catch(err){
	}


	// 풋터 메뉴
	// _class = ".btn-section";
	// if(  $("div").is(_class) ){
	// 	let _obj = $(_class);
	// 	if(_scrollT > _prevST){
	// 		_nowSign = "down";
	// 	} else if(_scrollT < _prevST){
	// 		_nowSign = "up";
	// 	} 
	// 	if(_nowSign != _prevSign){
	// 		if(_nowSign ==="up"){
	// 			_obj.removeClass("hide");
	// 		} else {
	// 			_obj.addClass("hide");
	// 		}
	// 	}
	// 	_prevSign = _nowSign;
	// 	_prevST = _scrollT;
	// }

}

function resizeFx(){
	_windowH = $(window).height();	
}

// 페이지 링크
function pageLink(path){
	window.location.href = path+".html";
}


$(document).ready(function(){
	createMenu();
	$(window).scroll(function(){
		scrollFx();
	});
	$( window ).resize(function() {
		resizeFx();
	});
	scrollFx();
	resizeFx();
	$(".scroll").scroll(function(){
		scrollFx();
	});

});

$(window).ready(function(){

});
