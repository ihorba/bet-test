;(function ($) {
	"use strict";

	var betTmpl = document.getElementById('bet-tmpl').innerHTML,
		matchList = $('.ba-matches'),
		match;

    var results = $('#results');


	$(document).ready(function() {
	  	const url = 'https://s3-eu-west-1.amazonaws.com/fa-ads/frontend/matches.json';

	  	var matchElements = [];

	    $.get( url , function showResult(data){
	    	console.log(data.matches)

	  		matchElements = data.matches.map(entry => {
	  			var template = $(betTmpl)

	  			template.data('id', entry.id)

  				template.find('.ba-match__title').html(`${entry.homeTeam} vs. ${entry.awayTeam}`)
  				template.find('.ba-match__kickoff').html(entry.kickoff)

  				template.find('button[data-odd-type="1"]').data('odd', entry.odds["1"])
  				template.find('button[data-odd-type="x"]').data('odd', entry.odds["x"])
  				template.find('button[data-odd-type="2"]').data('odd', entry.odds["2"])

	  			return template
	  		})

			// $.each(data.matches, function(index, value){
			// 	matchList.innerHTML += betTmpl
			// 	.replace(/{{homeTeam}}/ig, value.homeTeam)
			// 	.replace(/{{awayTeam}}/ig, value.awayTeam)
			// 	.replace(/{{kickoff}}/ig, value.kickoff)
			// 	.replace(/{{matchId}}/ig, value.id)
			// 	console.log(value.id);
			// 	console.log(value.kickoff);
			// 	console.log(value.homeTeam);
			// 	console.log(value.awayTeam);
			// })

			function calculateFinalOdds(number) {
				var odds = 1
				matchList.find('button.pressed').each(function(i, button) {
					odds = $(button).data('odd') * odds
				})
				return Math.round(number * odds)
			}

		    matchElements.forEach(function($template) {

		    	matchList.append($template)

		    	var buttons = $template.find('button'),
		    		currentlySelected = null

		    	$template.find('button').on('click', function() {
		    		let resultID = 'result-' + $template.data('id'),
		    			$result = $('#' + resultID)

	    			buttons.removeClass('pressed')

		    		if (currentlySelected === $(this).data('odd')) { // same button, remove selection
		    			currentlySelected = null
		    			$result.remove()
		    			results.find('.ba-final').html(``)

		    		} else { // different button
		    			currentlySelected = $(this).data('odd')
		    			$(this).addClass('pressed')
	    				let text = $template.find('.ba-match__title').html() + ' : ' + $(this).html()

			    		if ($result.length) { // changed button
			    			$result.html(text)
			    		} else { // first time click
		    				$result = $('<p>' + text + '</p>')
		    				$result.attr('id', resultID)
			    			results.append($result)
			    		}
		    		}

		    		results.find('.ba-final').html(`You bet $${10} and get $${calculateFinalOdds(10)}`)

		    	})
		    })
	    });

		// $('.ba-matches').on('click', 'button', function(){
		// 	results.append($(this).closest('.ba-match').attr('data-match-id'));
		// 	// console.log($(this).closest('.ba-match').attr('data-match-id'));
		// })
	});




})(jQuery);
