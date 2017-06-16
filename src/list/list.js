var view = require('./view')('#list', '#list_item_template');
var storage;
var lastId = 0;

var list = {
	init: function(){
		var maxId = 0;
		var id, objects = this.getObjects();
		
		for (var i = 0; i < objects.length; i++){
			id = +objects[i].id;
			if (maxId < id) maxId = id;
			view.addObject( this.getObject(id) );
		}
		// restoring lastId from other session
		lastId = maxId;
	},
	
	render: function(arr){
		if (!arr || typeof arr !== 'object')
			view.clear(arr);
		else
			view.renderAll(arr);
	},
	
	getLastId: function(){
		return lastId;
	},
	
	getObjects: function(){
		var result = [];
		
		for (var i = 0; i < storage.length; i++){
			result.push(this.getObject(storage.key(i)));
		}
		
		if (this.filter) this.filter(result);
		return result;
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
	onStopEdit: function(){},
	onDelete: function(id){}
};

$(document).on('click', '.edit_btn', function(){
	var id = view.getId(this);
	
	if (view.isHovered(id)){
		view.setUnhovered(id);
		list.onStopEdit();
	}else{
		view.setHovered(id);
		list.onEdit( list.getObject(id) );
	}
	
	return false;
});

$(document).on('click', '.del_btn', function(){
	list.onDelete( view.getId(this) );
	return false;
});

module.exports = function(_storage, filter){
	if (!_storage || typeof _storage != 'object') throw Error('list needs a storage object!');
	storage = _storage;
	
	list.filter = filter;
	list.init();
	return list;
};
