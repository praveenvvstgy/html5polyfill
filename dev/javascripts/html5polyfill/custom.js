$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	
	// initialize the simple-expand
	$('.expander').simpleexpand();
	$('.top').simpleexpand();

	// initialize the list
	var listOptions = {
		listClass: 'featureList',
		valueNames: ['feature', 'type']
	},
	featureList = new List('polyfill', listOptions);
	
	var searchbox = $(".searcher");
	// Bind the hashchange event.
	$(window).hashchange( function(){
		var hash = location.hash.replace( /^#/, '' );

		// do the search (useful for the search when page loads)
		if (!featureList.searched) {
			searchbox.val(hash);
			featureList.search(hash);
			$("article .content").show();
			$("article header.collapsed").removeClass('collapsed').addClass('expanded');

			if (hash === '') {
				$("article .content").hide();
				$("article header.expanded").removeClass('expanded').addClass('collapsed');
			}
		};
		// .features article header
	})

	// Trigger the hashchange event on page load
	$(window).hashchange();
	var hashTO;
	//change the url everytime the user enters something in the search
	searchbox.on('keyup', function () {

		//perform the search first
		var searchvalue = searchbox.val();
		featureList.search(searchvalue);

		if (searchvalue === '') {
			$("article .content").hide();
			$("article header.expanded").removeClass('expanded').addClass('collapsed');
		}
		else
		{
			$("article .content").show();
			$("article header.collapsed").removeClass('collapsed').addClass('expanded');
		}
		

		// now take care of the url hash
		if (hashTO !== undefined) {
			clearTimeout(hashTO);
		}
		//hide all open containers
		
		hashTO = setTimeout(updateHash, 1000);
	});

	function updateHash() {
		var hashVal = encodeURI(searchbox.val());
		window.location.hash = hashVal;
	}
});
