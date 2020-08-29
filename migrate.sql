
-- id, name, slogan, description, category, default_price
COPY products(product_id, name, slogan, description, category, default_price)
FROM '/Users/armando/Desktop/SDC-project/Products/transformation/clean_data/products_list.csv'
DELIMITER ','
CSV HEADER;

-- -- id, styleId, size, quantity
-- COPY skus(id, style_id, size, quantity)
-- FROM '/Users/armando/Desktop/SDC-project/Products/migrations/skus.csv'
-- DELIMITER ','
-- CSV HEADER;

-- \copy products FROM ‘/var/lib/postgresql/data/products_list.csv’ WITH DELIMITER ‘,’ CSV HEADER;
