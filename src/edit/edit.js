var form = $('#edit_form');

var edit_form = {
	setObject: function(obj){
		this.getAllElements().each(function(){
			$(this).val( obj[$(this).attr('name')] || '' );
		});
	},
	
	getObject: function(){
		var arr = form.serializeArray();
		var obj = {};
		
		for (var i = 0; i < arr.length; i++){
			obj[arr[i].name] = arr[i].value;
		}
		
		return obj;
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
		
		if ((f == 'publish_year' || f == 'page_count') && this.hasLiters(v))
			return 'Поле должно содержать только цифры!';
		
		if (f == 'publish_year' && v > (new Date()).getFullYear())
			return 'Этот год еще не наступил!';
		
		return null;
	},
	hasLiters: function(v){
		return v.replace(/\d/g, '');
	},
	showError: function(error, field){
		alert(error, function(){
			var elem = edit_form.getElement(field);
			elem.focus();
			
			Blink({// from base/index.js
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