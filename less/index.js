const less = require('less');
const cfg = require('./config');
const fs = require('fs');
const content = fs.readFileSync(cfg.filesource, {encoding: 'utf-8'});

module.exports = (destination) => {
	less.render(content, {paths: ['./src']}, (err, output) => {
		if (err) throw err;
		fs.writeFileSync(destination + cfg.filename, output.css);
		console.log(cfg.filename+' has been written\n');
	});
};