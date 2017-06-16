var sort_field = $('#sort input').val();

var sort = {
	filter: function(arr){
		arr.sort(function(a, b){
			return a[sort_field] > b[sort_field] ? 1 : -1;
		});
	},
	
	onClick: function(){}
};

$(document).on('click', '#sort input', function(){
	sort_field = $(this).val();
	sort.onClick();
});

module.exports = sort;