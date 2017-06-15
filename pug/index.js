const pug = require('pug');
const cfg = require('./config');
const content = pug.compileFile(cfg.filesource)();

module.exports = (destination) => {
	require('fs').writeFileSync(destination + cfg.filename, content);
	console.log(cfg.filename+' has been created\n');
};
