var todoListModel = function () {
	this.collection = [];
}

todoListModel.prototype = {
	constructor : todoListModel,

	loadList : function (callback) {
		var _this = this;
		$.get('/getlist', function (data) {
			_this.collection = data.todolist;
			callback(true);
		})
		.fail(function () {
			callback(false);
		});
	},

	getList : function (callback) {
		if (callback)
			callback(this.collection);
		return this.collection;
	},

	newItem : function (item, callback) {
		var _this = this;

		$.post('/new', item, function (data) {
			_this.collection.push(item);
			callback(data);
		})
		.fail(function() {
			callback(false);
		});
	},

	_updateItem : function (item) {
		this.collection = this.collection.filter( function (element) {
			if (element.id == item.taskId) {
				element.done = item.done;
				return element;
			} else {
				return element;
			}
		});
	},

	updateItem : function (item, callback) {
		var _this = this;

		$.post('/update', item, function (data) {
			_this._updateItem(item);
			callback(data);
		})
		.fail(function() {
			callback(false);
		});
	},

	_deleteItem : function (item) {
		this.collection = this.collection.filter( function (element) {
			if (element.id != item.taskId)
				return element;
		});
	},

	deleteItem : function (item, callback) {
		var _this = this;
		$.post('/delete', item , function (data) {
			_this._deleteItem(item);
			callback(data);
		})
		.fail(function () {
			callback(false);
		})
	},

	_editItem : function (item) {
		this.collection = this.collection.filter( function (element) {
			if (element.id == item.taskId) {
				element.task = item.newTask;
				return element;
			} else {
				return element;
			}
		});
	},
	
	editItem : function (item, callback) {
		var _this = this;

		$.post('/edit', item, function (data) {
			_this._editItem(item);
			callback(data);
		})
		.fail(function() {
			callback(false);
		});
	},

	upItem : function (itemId, callback) {
		var items = this.collection,
			item;
			
		if (items[0].id == itemId){
			callback(false);
			return;
		}
		for(var i = 0; i < items.length ; i++) {
			if (items[i].id == itemId) {
				item = items[i];
				items.splice(i,1);
				items.splice((i-1), 0, item);
				this.collection = items;
				callback(true);
				break;
			}
		}
	},

	downItem : function (itemId, callback) {
		var items = this.collection,
			item;
		if (items[items.length-1].id == itemId) {
			callback(false);
			return;
		}
		for(var i = 0; i < items.length ; i++) {
			if (items[i].id == itemId) {
				item = items[i];
				items.splice(i,1);
				items.splice((i+1),0, item);
				this.collection = items;
				callback(true);
				break;
			}
		}
	}
};