
-- id, name, slogan, description, category, default_price
-- COPY products(product_id, name, slogan, description, category, default_price)
-- FROM '/Users/armando/Desktop/SDC-project/Products/transformation/clean_data/products_list.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- id, styleId, size, quantity
-- COPY skus(id, style_id, size, quantity)
-- FROM '/Users/armando/Desktop/SDC-project/Products/migrations/skus.csv'
-- DELIMITER ','
-- CSV HEADER;


\copy products(product_id, name, slogan, description, category, default_price)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/products.csv' WITH DELIMITER ',' CSV HEADER;

\copy features(feature_id, product_id, feature, value)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/features.csv' WITH DELIMITER ',' CSV HEADER;

\copy styles(style_id, product_id, name, original_price, sale_price, default_style)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/styles.csv' WITH DELIMITER ',' CSV HEADER;

\copy skus(skus_id, style_id, size, quantity)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/skus.csv' WITH DELIMITER ',' CSV HEADER;

\copy related(id, product_id, related_id)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/related.csv' WITH DELIMITER ',' CSV HEADER;

\copy photos(photos_id, style_id, url, thumbnail_url)  FROM '/Users/armando/HRNYC31/SDC-project/Products/clean_data/photos.csv' WITH DELIMITER ',' CSV HEADER;
