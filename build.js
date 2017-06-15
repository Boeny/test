const preproc = ['pug','less'];
const destination = './public/';
const fs = require('fs');

try{
	fs.statSync(destination);
}catch(err){
	fs.mkdirSync(destination);
}

for (let i in preproc){
	require('./'+preproc[i]+'/index')(destination);
}
