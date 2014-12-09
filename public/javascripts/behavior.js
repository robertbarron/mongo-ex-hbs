$(document).ready(function () {
	var todolist = new todoListController();

	todolist.setModel(new todoListModel());
	todolist.setTemplateManager(JPLoad);
	todolist.setTemplate('new-item');
	todolist.setContainer($('.list'));
	todolist.loadList();

	// //New
	$('#todolist').on('click', '.todo-new', function (e) {
		e.stopPropagation();
		var item,
			taskName = prompt('Please, write your task\'s name');

		if (taskName === undefined || taskName === null)
			return;
		if (taskName.length < 3)
			return;

		item = {'task': taskName, 'done' : null};
		todolist.newItem(item);
	});

	// //Edit
	$('#todolist').on('click', '.ico-edit', function (e) {
		e.stopPropagation();
		
		var clickedEl = $(this),
			taskId = clickedEl.closest('.task').data('id'),
			newTask = prompt('Update your task\' name'),
			item = {};

		if (newTask === undefined || newTask === null)
			return;
		if (newTask.length < 3)
			return;

		item = {'taskId': taskId, 'newTask': newTask};
		todolist.editItem(item);
	});

	// //Update
	$('#todolist').on('click', '.task', function (e) {
		var clickedEl = $(this),
			taskId = clickedEl.data('id'),
			status = clickedEl.data('status'),
			item = {'taskId': taskId, 'done': status};

		e.stopPropagation();
		todolist.updateItem(item);
	});

	// //Delete
	$('#todolist').on('click', '.ico-delete', function (e) {
		var clickedEl = $(this),
			taskId = clickedEl.closest('.task').data('id'),
			item = {'taskId': taskId};
			
		e.stopPropagation();
		todolist.deleteItem(item);
	});

	// //Up Element
	$('#todolist').on('click', '.ico-up', function (e) {
		var clickedEl = $(this),
			taskId = clickedEl.closest('.task').data('id');

		e.stopPropagation();
		todolist.upItem(taskId);
	});

	// //Down Element
	$('#todolist').on('click', '.ico-down', function (e) {
		var clickedEl = $(this),
			taskId = clickedEl.closest('.task').data('id');

		e.stopPropagation();
		todolist.downItem(taskId);
	});
});