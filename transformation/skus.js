const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/skus.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/skus.csv');

// id, styleId, size, quantity
const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'skus_id' },
    { id: 'styleId', title: 'style_id' },
    { id: 'size', title: 'size' },
    { id: 'quantity', title: 'quantity' },
  ],
  alwaysQuote: true,
});

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {

    for (let key in chunk) {
      //trims whitespace
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }

    //filters out all non-number characters
    // let onlyNumbers = chunk.default_price.replace(/\D/g, "");
    // chunk.default_price = onlyNumbers;
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