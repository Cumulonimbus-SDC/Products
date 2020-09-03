-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Products'
--
-- ---
DROP DATABASE IF EXISTS productsdb;

CREATE DATABASE productsdb;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  slogan VARCHAR NULL DEFAULT NULL,
  description VARCHAR NULL DEFAULT NULL,
  category VARCHAR NULL DEFAULT NULL,
  default_price INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (product_id)
);

-- \copy products(product_id, name, slogan, description, category, default_price)  FROM '/Users/armando/Desktop/SDC-project/Products/clean_data/products.csv' WITH DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Features'
--
-- ---

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  feature_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  feature VARCHAR NULL DEFAULT NULL,
  value VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (feature_id)
);

-- \copy features(feature_id, product_id, feature, value)  FROM '/Users/armando/Desktop/SDC-project/Products/clean_data/features.csv' WITH DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Styles'
--
-- ---

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  style_id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  original_price VARCHAR NULL DEFAULT NULL,
  sale_price VARCHAR NULL DEFAULT NULL,
  default_style INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (style_id)
);

-- \copy styles(style_id, product_id, name, original_price, sale_price, default_style)  FROM '/Users/armando/Desktop/SDC-project/Products/clean_data/styles.csv' WITH DELIMITER ',' CSV HEADER;

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  skus_id INTEGER NULL  DEFAULT NULL,
  style_id INTEGER NULL DEFAULT NULL,
  size VARCHAR NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (skus_id)
);

-- \copy skus(skus_id, style_id, size, quantity)  FROM '/Users/armando/Desktop/SDC-project/Products/clean_data/skus.csv' WITH DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Related'
--
-- ---

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id INTEGER NULL DEFAULT NULL,
  product_id INTEGER NULL DEFAULT NULL,
  related_id INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- \copy related(id, product_id, related_id)  FROM '/Users/armando/Desktop/SDC-project/Products/clean_data/related.csv' WITH DELIMITER ',' CSV HEADER;

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  photos_id INTEGER NULL DEFAULT NULL,
  style_id INTEGER NULL DEFAULT NULL,
  thumbnail_url VARCHAR NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- id, name, slogan, description, category, default_price
-- COPY products(product_id, name, slogan, description, category, default_price)
-- FROM '/Users/armando/Desktop/SDC-project/Products/transformation/clean_data/products_list.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- id, styleId, size, quantity
-- COPY skus(id, style_id, size, quantity)
-- FROM '/Users/armando/Desktop/testDockerPostgres/start_data/skus.csv'
-- DELIMITER ','
-- CSV HEADER;
-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
-- ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
-- ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
-- ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
-- ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Related` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`product_id`,`name`,`slogan`,`description`,`category`,`default_price`) VALUES
-- ('','','','','','');
-- INSERT INTO `Features` (`id`,`product_id`,`feature`,`value`) VALUES
-- ('','','','');
-- INSERT INTO `Styles` (`style_id`,`product_id`,`name`,`original_price`,`sale_price`,`default?`) VALUES
-- ('','','','','','');
-- INSERT INTO `skus` (`id`,`style_id`,`size`,`quatity`) VALUES
-- ('','','','');
-- INSERT INTO `Related` (`product_id`,`related_id`) VALUES
-- ('','');
-- INSERT INTO `Photos` (`id`,`style_id`,`thumbnail_url`,`url`) VALUES
-- ('','','','');