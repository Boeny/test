var sort_field = $('#sort input').val();

var sort = {
	filter: function(arr){
		arr.sort(function(a, b){
			return a[sort_field] > b[sort_field] ? 1 : -1;
		});
	},
	
	onChange: function(){}
};

$(document).on('change', '#sort input', function(){
	console.log('!');
	sort_field = $(this).val();
	sort.onChange();
});

module.exports = sort;