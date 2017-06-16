var form = $('#edit_form');

var edit_form = {
	getObject: function(){
		var arr = form.serializeArray();
		var obj = {};
		
		for (var i = 0; i < arr.length; i++){
			obj[arr[i].name] = arr[i].value;
		}
		
		return obj;
	},
	setObject: function(obj){
		this.getAllElements().each(function(){
			$(this).val( obj[$(this).attr('name')] || '' );
		});
	},
	
	clear: function(){
		this.setObject({});
	},
	
	getAllElements: function(){
		return form.find('[name]');
	},
	getElement: function(f){
		return form.find('[name='+f+']');
	},
	
	checkForErrors: function(f, v){
		if (f == 'id') return null;
		
		if (!v) return 'Поле не должно быть пустым!';
		
		switch (f){
			case 'publish_year':// negative year means B.C. date
				return v > (new Date()).getFullYear() ? 'Этот год еще не наступил!' : null;
			
			case 'page_count':
				return v > 0 ? null : 'Кол-во страниц должно быть положительным числом!';
		}
		
		return null;
	},
	showError: function(error, field){
		alert(error, function(){
			var elem = edit_form.getElement(field);
			elem.focus();
			
			Blink({// from base/base.js
				ms: 2000,
				count: 1,
				actions: [
					function(){elem.addClass('alerted')},
					function(){elem.removeClass('alerted')}
				]
			});
		});
	},
	
	onSave: function(obj){}
};

$('#save_btn').on('click', function(){
	edit_form.onSave( edit_form.getObject() );
	return false;
});

module.exports = edit_form;