require('./base/index');

$(function(){
	var edit_window = require('./edit/index.js');
	var list = require('./list/index.js')(window.localStorage);
	
	list.onEdit = function(obj){
		edit_window.setObject(obj);
	};
	
	edit_window.onSave = function(obj){
		var error;
		
		for (var f in obj)
		{
			error = edit_window.checkForErrors(f, obj[f]);
			if (error){
				edit_window.showError(error);
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