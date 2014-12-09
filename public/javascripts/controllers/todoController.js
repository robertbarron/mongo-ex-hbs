var todoListController = function () {
	this.model;
	this.templateManager;
	this.template;
	this.$container;
}

todoListController.prototype = {
	constructor : todoListController,

	setModel : function (model) {
		this.model = model;
	},

	setTemplateManager : function (templateManager) {
		this.templateManager = templateManager;
	},

	setTemplate: function (template) {
		this.template = '../../views/' + template + '.tpl';
	},
	
	setContainer : function (object) {
		this.$container = object;
	},

	getList : function(callback) {
		if (callback)
			callback(this.model.getList());
		else
			return this.model.getList();
	},
	loadList : function (callback) {
		var _this = this;
		this.model.loadList( function (list) {
			_this.render();
			if (callback)
				callback(true);
		});
	},
	
	_getIndex: function (callback) {
		var list = this.model.getList();
		return (parseInt(list[list.length -1].id) + 1);
	},

	newItem : function (item, callback) {
		var _this = this;

		item.taskId = this._getIndex();
		this.model.newItem(item, function (response) {
			if (response.created) {
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	// _updateItem : function (item) {
	// 	this.list = this.list.filter(function (elem) {
	// 		if (elem.task === item.task) {
	// 			elem.done = item.done;
	// 			return elem;
	// 		} else {
	// 			return elem;
	// 		}
	// 	});
	// },

	updateItem : function (item, callback) {
		var _this = this;
		item.done = (item.done == "false" || item.done == "") ? true : null;

		this.model.updateItem(item, function (response) {
			if (response.updated) {
				// _this._updateItem(item);
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	deleteItem: function (item, callback) {
		var _this = this;
		this.model.deleteItem(item, function (response) {
			if (response.removed) {
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	editItem: function (item, callback) {
		var _this = this;
		this.model.editItem(item, function (response) {
			if (response.updated) {
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	upItem: function (itemId, callback) {
		var _this = this;
		this.model.upItem(itemId, function (response) {
			if (response) {
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	downItem: function (itemId, callback) {
		var _this = this;
		this.model.downItem(itemId, function (response) {
			if (response) {
				_this.render();
				if (callback)
					callback(true);
			} else {
				if (callback)
					callback(false);
			}
		});
	},

	render : function (callback) {
		var _this = this,
			dataList = _this.getList();

		this.templateManager.getView(this.template, function (data) {
			_this.$container.empty();
			$.each(dataList, function (index, item) {
				_this.templateManager.appendView(data, _this.$container.attr("id"), item);
			});
		});
	}
};