require('./base/base');
require('./modals/modals');

$(function(){
	var edit_window = require('./edit/edit');
	var sort = require('./sort/sort');
	var list = require('./list/list')(window.localStorage, sort.filter);
	
	list.onEdit = function(obj){
		edit_window.setObject(obj);
	};
	
	list.onStopEdit = function(){
		edit_window.clear();
	};
	
	list.onDelete = function(id){
		confirm('Вы уверены, что хотите удалить эту книгу?', function(){
			edit_window.clear();
			list.deleteObject(id);
		});
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
		
		if (+obj.id){
			list.updateObject(obj);
		}
		else{
			edit_window.clear();
			list.addObject(obj);
		}
	};
	
	var search = require('./search/search')(window.localStorage, sort.filter);
	
	search.onKeyUp = function(phrase){
		edit_window.clear();
		list.render( search.getObjects(phrase) );
	};
	
	sort.onChange = function(){
		search.keyUp();
	};
});