$(function(){
	var strg = window.localStorage;
	var edit_window = require('./edit/index.js')();
	var list = require('./list/index.js')(strg);
	
	$(window).on('edit', function(e, obj){
		edit_window.setObject(obj);
	});
	
	$(window).on('save', function(e, obj){
		if (obj.id){
			list.updateObject(obj);
		}
		else{
			list.addObject(obj);
		}
	});
	
	$(window).on('delete', function(e, id){
		list.deleteObject(id);
	});
});