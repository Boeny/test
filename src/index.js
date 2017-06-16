require('./base/base');

$(function(){
	var edit_window = require('./edit/edit');
	var list = require('./list/list')(window.localStorage);
	
	list.onEdit = function(obj){
		edit_window.setObject(obj);
	};
	
	list.onStopEdit = function(){
		edit_window.setObject({});
	};
	
	edit_window.onSave = function(obj){
		var error;
		
		for (var f in obj)
		{
			error = edit_window.checkForErrors(f, obj[f]);
			if (error){
				edit_window.showError(error, f);
				return;
			}
		}
		
		if (obj.id){
			list.updateObject(obj);
		}
		else{
			list.addObject(obj);
		}
	};
});