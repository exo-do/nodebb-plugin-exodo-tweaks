/**
 * Hace scroll hasta el post que acabamos de postear
 */
(function () {
	"use strict";

	$(window).on('action:composer.posts.reply', function (event, data) {
		/* Ante una nueva respuesta, comprobamos si estamos en la última página. 
		 * Si es así, hacemos scroll hasta el último post. Si no, esperamos al cambio automático de página */
		if (ajaxify.variables.get('currentPage') === ajaxify.variables.get('pageCount')) {
			scrollToBottom();
		} else {
			$(window).one('action:ajaxify.end', scrollToBottom);
		}
	});

	function scrollToBottom() {
		setTimeout(function () {
			$('html, body').animate({
				scrollTop: $(document).height()
			}, 500)
		}, 500);
	}

}());