var list = {
	storage: null,
	
	getObject: function(id){
		return JSON.parse(this.storage.getItem(id));
	},
	addObject: function(obj){
		
	},
	updateObject: function(obj){
		this.setItem()
	},
	deleteObject: function(id){
		this.storage.removeItem(id);
	}
};

$(document).on('click', '.edit_btn', function(){
	$(window).trigger('edit', list.getObject($(this).data('id')));
});

$(document).on('click', '.del_btn', function(){
	$(window).trigger('delete', $(this).data('id'));
});

module.exports = function(_storage){
	list.storage = _storage
	return list;
};
