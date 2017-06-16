const less = require('less');
const cfg = require('./config');
const fs = require('fs');
const content = fs.readFileSync(cfg.filesource, {encoding: 'utf-8'});

module.exports = (destination, uglify) => {
	less.render(content, {paths: ['./src']}, (err, output) => {
		if (err) throw err;
		
		var path = destination + cfg.filename;
		fs.writeFileSync(path, output.css);
		console.log(cfg.filename+' has been created\n');
		
		if (uglify){
			fs.writeFileSync( path, require('uglifycss').processFiles([path]) );
			console.log(cfg.filename+' has been uglified\n');
		}
	});
};