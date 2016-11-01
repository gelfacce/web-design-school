(function($) {
	
	$.fn.parallax = function() {
				
		var moveBg = function(elem) {
			var speed = elem.data("speed");
			if(!speed) { speed = 2; }
			var y = '50% ' + ((elem.offset().top - $(window).scrollTop()) / speed) + 'px';
			elem.css({"background-position": y,"background-attachment": "fixed"});
		};
		
		if('ontouchstart' in window || navigator.msMaxTouchPoints) {
			this.css("background-position", "50% 50%");
			return this;
		} else {
			return this.each(function() {
				var self = $(this);
				moveBg(self);
				$(window).scroll(function() {
					moveBg(self);
				});
				$(window).resize(function() {
					moveBg(self);	
				});

			});	
		}
	};
	
}(jQuery));
