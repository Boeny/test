var view = require('./view')('#list', $('#list_item_template'));
var storage;
var lastId = 0;

var list = {
	init: function(){
		for (var i=0; i<storage.length; i++){
			view.addObject( this.getObject( storage.key(i) ) );
		}
	},
	
	getLastId: function(){
		return lastId;
	},
	
	getObject: function(id){
		return JSON.parse(storage.getItem(id));
	},
	addObject: function(obj){
		lastId++;
		obj.id = lastId;
		
		this.updateObject(obj);
		view.addObject(obj);
	},
	updateObject: function(obj){
		storage.setItem(obj.id, JSON.stringify(obj));
		view.updateObject(obj);
	},
	deleteObject: function(id){
		storage.removeItem(id);
		view.deleteObject(id);
	},
	
	onEdit: function(obj){},
	onDelete: function(id){
		confirm('Вы уверены, что хотите удалить эту книгу?', function(){
			list.deleteObject(id);
		});
	}
};

$(document).on('click', '.edit_btn', function(){
	list.onEdit( list.getObject( view.getId(this) ) );
	return false;
});

$(document).on('click', '.del_btn', function(){
	list.onDelete( view.getId(this) );
	return false;
});

module.exports = function(_storage){
	if (!_storage || typeof _storage != 'object') throw Error('list needs a storage object!');
	storage = _storage;
	list.init();
	return list;
};
