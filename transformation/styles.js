const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/styles.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/styles.csv');

// id,productId,name,sale_price,original_price,default_style
const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'style_id' },
    { id: 'productId', title: 'product_id' },
    { id: 'name', title: 'name' },
    { id: 'original_price', title: 'original_price' },
    { id: 'sale_price', title: 'sale_price' },
    { id: 'default_style', title: 'default_style' },
  ],
  alwaysQuote: true,
});

// style_id INTEGER NULL DEFAULT NULL,
// product_id INTEGER NULL DEFAULT NULL,
// name VARCHAR NULL DEFAULT NULL,
// original_price VARCHAR NULL DEFAULT NULL,
// sale_price VARCHAR NULL DEFAULT NULL,
// default_style INTEGER NULL DEFAULT NULL,

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