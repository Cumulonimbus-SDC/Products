const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
// const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/photos.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/photos.csv');

var stream = require('stream');
var xtream = new stream.Transform( { objectMode: true } );

xtream._transform = function(chunk, encoding, done) {
	var strData = chunk.toString();

	if (this._invalidLine) {
		strData = this._invalidLine + strData;
	};

	var objLines = strData.split("\n");
	this._invalidLine = objLines.splice(objLines.length-1, 1)[0];
  // this.push(objLines);
  for (let i = 0; i < objLines.length; i++) {
    let string = objLines[i];
    if (string[string.length - 1] !== '"') {
      objLines[i] = string.concat('"');
    }
  }

  const newString = objLines.join('\n');
  this.push(newString);

	done();
};

xtream._flush = function(done) {
	if (this._invalidLine) {
		this.push([this._invalidLine]);
	};

	this._invalidLine = null;
	done();
};

readStream
  .pipe(xtream)
  .pipe(writeStream);
  // .on('finish', () => console.log('finished'));
// xtream.on('readable', function(){
// 	while (lines = xtream.read()) {
// 		lines.forEach(function(line, index){
//       if (line[line.length - 1] !== '"'){
//         console.log('----------------');
//         line = line = '"\n';
//       } else {
//         line
//       }
// 			console.log(line + '\n');
// 		});
// 	}
// });