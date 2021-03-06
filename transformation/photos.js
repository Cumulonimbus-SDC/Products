const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const Transform = require("stream").Transform;


let readStream = fs.createReadStream('/Users/armando/Desktop/SDC-project/Products/clean_data/photosFormatted.csv');
let writeStream = fs.createWriteStream('/Users/armando/Desktop/SDC-project/Products/clean_data/photos.csv');

// id, styleId, url, thumbnail_url
const csvStringifier = createCsvStringifier({
  header: [
    { id: 'photos_id', title: 'photos_id' },
    { id: 'style_id', title: 'style_id' },
    { id: 'url', title: 'thumbnail_url' },
    { id: 'thumbnail_url', title: 'url' },
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

    // console.log(chunk);
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