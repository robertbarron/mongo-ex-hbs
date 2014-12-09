// QUnit.asyncTest("Checking todolist model", function (assert) {
// 	var todolist = new todoListController(),
// 		tModel = new todoListModel();

// 	todolist.setModel(tModel);

// 	assert.ok(tModel, 'tModel should be present');
// 	assert.ok(todolist, 'todolist controller should be present');
// 	assert.ok(todolist.model, 'Model should have been in place');

	// // Load list from db
	// todolist.model.loadList(function (data) {
	// 	QUnit.start();
	// 	assert.ok(data.length, 'Model should return some elements from the bd');
	// });

	// //Insert new Item on BD 
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// todolist.model.loadList(function (data) {
	// 	todolist.model.newItem(item, function (response) {
	// 		QUnit.start();
	// 		assert.ok(response.created, 'Created flag should be true');
	// 	});
	// });
	


	// // Update Item
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// item.done = (item.done == "false") ? true : null;
	// todolist.model.loadList(function (data) {
	// 	todolist.model.newItem(item, function (response) {
	// 		item.taskId = (todolist._getIndex() - 1);
	// 		todolist.model.updateItem(item, function (response) {
	// 			QUnit.start();
	// 			assert.ok(response.updated, 'Updated record of item');
	// 		});
	// 	});
	// });

	// //Delete an Item from BD
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// todolist.model.loadList(function (data) {
	// 	todolist.model.newItem(item, function (response) {
	// 		item.taskId = (todolist._getIndex() - 1);
	// 		todolist.model.deleteItem(item, function (response) {
	// 			QUnit.start();
	// 			assert.ok(response.removed, 'Item deleted');
	// 		});
	// 	});
	// });

	// // Edit Item
	// var item = {'task': 'take a bath', 'done': false};
	
	// todolist.model.newItem(item, function (response) {
	// 	item.newTask = 'take a shower';
	//  item.taskId = (todolist._getIndex() -1 );
	// 	todolist.model.editItem(item, function (response) {
	// 		QUnit.start();
	// 		if (response) {
	// 			assert.ok(response.updated, 'Object edited');
	// 		}
	// 	});
	// });
// });

// QUnit.asyncTest("Checking todolist controller", function (assert) {
// 	var todolist = new todoListController(),
// 		tModel = new todoListModel();

// 	todolist.setModel(tModel);
// 	todolist.setTemplateManager(JPLoad);

// 	//Check for template Manager
// 	assert.ok(JPLoad, 'should be present');

// 	// Check for Template Manager injected into our controller
// 	assert.ok(todolist.templateManager, 'Object should be returned');
	
	// //Check if there's a list on the controller
	// todolist.loadList(function (data) {
	// 	QUnit.start();
	// 	assert.ok(todolist.getList(), 'should be filled with items object');
	// });

	// // Adding new item to the list
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// todolist.loadList(function (data) {	
	// 	todolist.newItem(item, function (response) {
	// 		assert.ok(response, 'Added element to the list, should be true');
	// 	});
	// });
	

	// // Update Item 
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// todolist.newItem(item, function (response) {
	// 	item.done = (item.done == "false") ? true : null;
	//  item.taskId = (todolist._getIndex() - 1) ;
	// 	todolist.updateItem(item, function (response) {
	// 		assert.ok(response, 'Updated record of item');
	// 	});
	// });

	// // Delete an item from the list 
	// var item = {'task': 'Doing shores', 'done' : "false"};
	// todolist.newItem(item, function (response) {
	//  item.taskId = (todolist._getIndex() - 1) ;
	// 	todolist.deleteItem(item, function (response) {
	// 		QUnit.start();
	// 		assert.ok(response, 'Item deleted');
	// 	});
	// });

	// Edit Item
	// var item = {'task': 'take a bath', 'done': false};
	// todolist.model.newItem(item, function (response) {
	//  item.taskId = (todolist._getIndex() - 1) ;
	// 	item.newTask = 'take a shower';
	// 	todolist.model.editItem(item, function (response) {
	// 		QUnit.start();
	// 		if (response) {
	// 			assert.ok(response.updated, 'Object edited');
	// 		}
	// 	});
	// });
// });


QUnit.asyncTest("Checking todolist functional behavior", function (assert) {
	var todolist = new todoListController();
 
	todolist.setModel(new todoListModel());
	todolist.setTemplateManager(JPLoad);
	todolist.setTemplate('new-item');
	todolist.setContainer($('.list'));
	
	todolist.loadList();
	// //Clicking on creating a new task
	// $('#todolist').on('click', '.todo-new', function (e) {
	// 	e.preventDefault();
	// 	var item,
	// 		taskName = 'new task';

	// 	if (taskName === undefined || taskName === null)
	// 		return;
	// 	if (taskName.length < 3)
	// 		return;

	// 	item = {'task': taskName, 'done' : null};
	// 	todolist.newItem(item);
	// });

	// $('#todolist .todo-new').trigger('click');

	// setTimeout(function() {
	// 	var list = todolist.getList();
	// 	assert.equal(list[list.length -1 ].task, 'new task', 'should be a new task');
	// },5000);

	// // //Clicking on a task will update it's status.
	// $('#todolist').on('click', '.task', function (e) {
	// 	var clickedEl = $(this),
	// 		taskId = clickedEl.data('id'),
	// 		status = clickedEl.data('status');
	// 		item = {'taskId': taskId, 'done': status};

		
	// 	assert.ok(taskId,'taskId, should containt a number');
	// 	assert.ok(taskId,'status, status should have a flag');
	// 	assert.ok(item,'item, status should have a flag');
	// 	e.stopPropagation();
	// 	todolist.updateItem(item);
	// 	setTimeout(function () {
	// 		QUnit.start();
	// 		var status2 = $('#todolist .task:first').data('status');
	// 		assert.notEqual(status,status2, 'status before and status after should be different');
	// 	},5000);
	// });

	// setTimeout(function () {
	// 	$('#todolist .task:first').trigger('click');
	// },2000);

	// //Delete item
	// $('#todolist').on('click', '.ico-delete', function (e) {
	// 	var clickedEl = $(this),
	// 		taskId = clickedEl.closest('.task').data('id'),
	// 		item = {'taskId': taskId};
	// 	e.stopPropagation();
		
	// 	assert.ok(true, 'inside click');
	// 	assert.ok(taskId, taskId+ ' should have a number');
		
	// 	todolist.deleteItem(item, function (response) {
	// 		QUnit.start();
	// 		assert.ok('Item deleted');	
	// 	})
	// });
	// setTimeout(function () {
	// 	$('#todolist .ico-delete:last').trigger('click');
	// },1000);

	// //Click to down a position on a task
	// $('#todolist').on('click', '.ico-down', function (e) {
	// 	var clickedEl = $(this),
	// 		taskId = clickedEl.closest('.task').data('id'),
	// 		list = todolist.getList();

	// 	flag = list[list.length-1].id;

	// 	e.stopPropagation();
	// 	todolist.downItem(taskId);
	// });
	// setTimeout(function() {
	// 	$('#todolist .task:first .ico-down').trigger('click');
	// },3000);

	// setTimeout(function () {
	// 	var list = todolist.getList();
	// 	QUnit.start();
	// 	assert.notEqual(flag, list[0].id, 'Should be different');
	// },10000);

	// // Click to up a position on a task
	// var flag = -1;
	// $('#todolist').on('click', '.ico-up', function (e) {
	// 	var clickedEl = $(this),
	// 		taskId = clickedEl.closest('.task').data('id'),
	// 		list = todolist.getList();

	// 	flag = list[list.length-1].id;
		
	// 	e.stopPropagation();
	// 	todolist.upItem(taskId);
	// });

	// setTimeout(function() {
	// 	$('#todolist .task:last .ico-up').trigger('click');
	// },3000);

	// setTimeout(function () {
	// 	var list = todolist.getList();
	// 	QUnit.start();
	// 	assert.notEqual(flag, list[list.length-1].id, 'Should be different');
	// },10000);

});