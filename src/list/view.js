var view = {
	render: function(obj){
		var result = this.template;
		var placeholders = result.match(/{(\w+)}/g);
		if (!placeholders) return;
		
		var p, f;
		for (var i = 0; i < placeholders.length; i++){
			p = placeholders[i];
			f = p.replace('{', '').replace('}', '');
			result = result.replace(new RegExp(p, 'g'), obj[f]);
		}
		
		return result;
	},
	getElement: function(id){
		return this.root.find('[data-id="'+id+'"]');
	},
	getId: function(elem){
		return $(elem).closest('[data-id]').data('id');
	},
	
	addObject: function(obj){
		var elem = $(this.render(obj));
		this.root.append(elem);
		elem.addClass('shown');
	},
	updateObject: function(obj){
		var elem = this.getElement(obj.id);
		elem.replaceWith(this.render(obj));
		elem.addClass('shown');
	},
	deleteObject: function(id){
		hideElement(this.getElement(id), true);// remove. from base/index.js
	}
};

module.exports = function(root, template){
	if (!root || !template) throw Error('view model needs the root and template to render!');
	
	view.root = $(root);
	view.template = typeof template == 'object' ? $(template).html() : template;
	return view;
};