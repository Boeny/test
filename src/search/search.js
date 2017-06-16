var storage;

var search = {
	getObjects: function(phrase){
		var obj, result = [];
		
		for (var i = 0; i < storage.length; i++){
			obj = this.getObject(storage.key(i));
			
			if (obj.title.indexOf(phrase) > -1){
				result.push(obj);
			}
		}
		
		if (this.filter) this.filter(result);
		return result.length ? result : '<div style="padding: 20px">Ничего не найдено</div>';
	},
	
	getObject: function(id){
		return JSON.parse(storage.getItem(id));
	},
	
	onKeyDown: function(){},
	onKeyUp: function(){},
	
	keyUp: function(){
		search.onKeyUp($('#search input').val());
	},
	keyDown: function(){
		search.onKeyDown($('#search input').val());
	}
}

$(document).on('keydown', '#search input', function(e){
	search.onKeyDown($(this).val(), e.keyCode);
	if (e.keyCode == 13) return false;
});
$(document).on('keyup', '#search input', function(e){
	search.onKeyUp($(this).val(), e.keyCode);
});

module.exports = function(_storage, filter){
	if (!_storage || typeof _storage != 'object') throw Error('search needs a storage object!');
	storage = _storage;
	
	search.filter = filter;
	return search;
};