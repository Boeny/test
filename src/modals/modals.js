window.showModal = function(id, content, callback){
	var overlay = $('#overlay');
	overlay.show().addClass('shown');
	
	var body = $('body');
	body.addClass('noscroll');
	
	var modal = $('#'+id);
	modal.show().addClass('shown');
	modal.find('.content').html(content);
	
	modal.find('.ok').unbind().on('click', function(){
		hideElement(modal);
		overlay.hide();
		body.removeClass('noscroll');
		callback && callback();
	});
};

window.alert = function(msg, callback){
	showModal('alert', msg, callback);
};
window.confirm = function(msg, callback){
	showModal('confirm', msg, callback);
};

$(document).on('click', '#confirm .cancel', function(){
	hideElement($('#confirm'));
	$('#overlay').hide();
	$('body').removeClass('noscroll');
});