var view = {
	render: function(obj){
		var result = this.template;
		var placeholders = result.match(/{(\w+)}/g);
		if (!placeholders) return;
		
		var p, f;
		for (var i = 0; i < placeholders.length; i++){
			p = placeholders[i];
			f = p.replace('{', '').replace('}', '');
			result = result.replace(new RegExp(p, 'g'), obj[f] || '');
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
		this.getElement(obj.id).replaceWith(this.render(obj));// new element
		this.getElement(obj.id).addClass('shown');// hence we need to find it again
	},
	deleteObject: function(id){
		hideElement(this.getElement(id), true);// remove. from base/index.js
	},
	
	isHovered: function(id){
		return this.hovered && this.hovered.data('id') == id;
	},
	setHovered: function(id){
		if (this.hovered) this.hovered.removeClass('hovered');
		this.hovered = this.getElement(id);
		this.hovered.addClass('hovered');
	},
	setUnhovered: function(id){
		if (!this.isHovered(id)) return;
		this.hovered.removeClass('hovered');
		this.hovered = null;
	},
};

module.exports = function(root, template){
	if (!root || !template) throw Error('view model needs the root and template to render!');
	
	view.root = $(root);
	view.template = $(template).html();
	return view;
};