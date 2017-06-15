var edit_form = {
	form: $('#edit_form'),
	
	setObject: function(obj){
		this.form.find('[name]').each(function(){
			$(this).val( obj[$(this).attr('name')] || '' );
		});
	},
	
	getObject: function(){
		var arr = this.form.serializeArray();
		var obj = {};
		
		for (var i = 0; i < arr.length; i++){
			obj[arr[i].name] = arr[i].value;
		}
		
		return obj;
	}
};

$('#save_btn').on('click', function(){
	$(window).trigger('save', edit_form.getObject());
	return false;
});

module.exports = edit_form;