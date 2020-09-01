const fs = require('fs');
const readline = require('readline');


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/photos.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/photosFormatted.csv');

// test
// let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/testTransformation/test.csv');
// let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/testTransformation/testresult.csv');



function transform(line) {
  if (line[line.length - 1] !== '"') {
    // console.log(line);
    line = line.concat('"');
  }

  const current = line.split(',');

  if (current.length > 4) {
    for (let i = 3; i < current.length; i += 4) {
      current[i] = current[i].concat('\n');
    }
  }

  this.output.write(`${current.join(',')}\n`);
}

const readFile = readline.createInterface({
  input: readStream,
  output: writeStream,
  terminal: false
});

readFile
  .on('line', transform)
  .on('close', function() {
    console.log(`Created "${this.output.path}"`);
  });



// xtream._transform = function(chunk, encoding, done) {
// 	var strData = chunk.toString();

// 	if (this._invalidLine) {
// 		strData = this._invalidLine + strData;
// 	};

// 	var objLines = strData.split("\n");
// 	this._invalidLine = objLines.splice(objLines.length-1, 1)[0];
//   // this.push(objLines);
//   for (let i = 0; i < objLines.length; i++) {
//     let row = objLines[i].split(',');
//     if (row.length !== 4) {
//       // objLines[i] = row.concat('"');
//       row[3] = row[3].concat('\n');
//     }
//     objLines[i] = row.join(',');
//   }

//   const newString = objLines.join('\n');
//   this.push(newString);

// 	done();
// };

// xtream._flush = function(done) {
// 	if (this._invalidLine) {
// 		this.push([this._invalidLine]);
// 	};

// 	this._invalidLine = null;
// 	done();
// };

// readStream
//   .pipe(xtream)
//   .pipe(writeStream);
//   // .on('finish', () => console.log('finished'));
// // xtream.on('readable', function(){
// // 	while (lines = xtream.read()) {
// // 		lines.forEach(function(line, index){
// //       if (line[line.length - 1] !== '"'){
// //         console.log('----------------');
// //         line = line = '"\n';
// //       } else {
// //         line
// //       }
// // 			console.log(line + '\n');
// // 		});
// // 	}
// // });