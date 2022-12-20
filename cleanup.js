console.log('test')

var fs = require('fs');

const dir = './database/temp';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}