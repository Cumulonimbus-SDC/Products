const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/migrations/product.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/transformation/clean_data/products_list.csv');

// id, name, slogan, description, category, default_price
const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'product_id' },
    { id: 'name', title: 'name' },
    { id: 'slogan', title: 'slogan' },
    { id: 'description', title: 'description' },
    { id: 'category', title: 'category' },
    { id: 'default_price', title: 'default_price' },
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
      chunk[key] = chunk[key].trim();
    }

    //filters out all non-number characters
    let onlyNumbers = chunk.default_price.replace(/\D/g, "");
    chunk.default_price = onlyNumbers;
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