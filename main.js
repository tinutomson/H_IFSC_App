jQuery(document).ready(function() {
	var socket = io();
	var search_string = "";

	$( "#userInput" ).keyup(function() {
		search_string = $('#userInput').val();
		if(search_string === "")
			$('.sub-menu').empty();
		else
			socket.emit('search_string', $('#userInput').val());
	});

	socket.on('response_string', function(response) {
//		console.log(response);
		$('.sub-menu').empty();
		if (search_string === "")
			return;
	    $.each(response, function(i, element) {
//	    	console.log(element.ifscCode);
	    	var item = $('.sub-menu').append('<li><a>'+element.ifscCode+'</a></li>');
	    })
	});
});