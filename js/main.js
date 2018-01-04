;(function ($) {
	"use strict";

	$(document).ready(function() {

		$.get('https://s3-eu-west-1.amazonaws.com/fa-ads/frontend/matches.json', function(request){
			console.log(request)
		})
	});

	var tuneTmpl = $('#tune-tmpl').innerHTML,
		matchList = $('.ba-matches');

	request.onload = function () {

	}

})(jQuery);
