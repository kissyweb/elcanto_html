(function($){
	var defaults = {
		_isOne : 1,
		_delay:0.1,
		_view : [],
		company		: "상상의자유",
		author 		: "kissyweb@gmail.com"
	};

	$.fn.viewFx = function(options){
		var I_F 				= {};
		var _class 			= this.attr("class");
		var _classChild;
		var _length;
		var _scrollTop;
		var	_winH;

		var init = function(){
			I_F.set = $.extend({}, defaults, options);
			loadedFx();
		};

		var loadedFx = function(){
			_scrollTop = $(document).scrollTop().toFixed(0);
			var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0];
			_winH = w.innerHeight|| e.clientHeight|| g.clientHeight;
			if( $(".content").hasClass("moving-group") != 0){
				$(".moving-group").each(function(i){
					aniFx();
				});
			} else {
				aniFx();
			}
		};

		var aniFx = function(){
			for(var i=0; i< I_F.set._view.length; i++){
				$("."+I_F.set._view[i]).each(function(i){
					var _top = $(this).offset().top - _scrollTop;
					if( $(this).attr("flag") === undefined) {
						$(this).attr("flag","0");
					}
					if($(this).attr("flag") == 0){
						if(_top > 0 && _top < _winH){
							if(!$(this).hasClass("animate") ){
								$(this).addClass("animate");
								$(this).attr("flag", 1);
								$(this).one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
									$(this).attr("flag", 0);
								});
							}
						}
						if(_top > _winH &&  I_F.set._isOne==0){
							$(this).removeClass("animate");
						}
					}
				});
			}
		};

		// 스크롤
		$(window).scroll(function(){
			loadedFx();
		});

		// 리사이즈
		$( window ).resize(function() {

		});

		init();
		return this;
	};
})(jQuery);