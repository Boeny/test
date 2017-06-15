const preproc = ['pug','less'];
const destination = './public/';

for (let i in preproc){
	require('./'+preproc[i]+'/index')(destination);
}