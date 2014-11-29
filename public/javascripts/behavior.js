$(document).ready(function () {
	$("#todolist").on('click', '.task', function (e) {
		var clickedEl = $(this),
			task = $.trim(clickedEl.text()),
			status = clickedEl.attr("data-status"),
			oData = {};

		status = (status == "false") ? true : null;
		oData = {'task': task, 'done': status};
		
		e.preventDefault();

		$.post('/update', oData, function (data) {
			if (!data.error) {
				if (clickedEl.hasClass('done'))
					clickedEl.removeClass('done').attr('data-status','false');
				else
					clickedEl.addClass('done').attr('data-status','true');
			}	
		});
	});
});