const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/features.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/features.csv');

// feature_id,product_id,feature,value
const csvStringifier = createCsvStringifier({
  header: [
    { id: 'feature_id', title: 'feature_id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'feature', title: 'feature' },
    { id: 'value', title: 'value' },
  ],
  alwaysQuote: true,
});
// feature_id INTEGER NULL DEFAULT NULL,
//   product_id INTEGER NULL DEFAULT NULL,
//   feature VARCHAR NULL DEFAULT NULL,
//   value VARCHAR NULL DEFAULT NULL,

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {

    for (let key in chunk) {
      //trims whitespace
      chunk[key] = chunk[key].trim();
    }

    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });