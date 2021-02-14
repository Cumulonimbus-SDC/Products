CREATE INDEX idx_products
  ON products(product_id);

CREATE INDEX idx_features
  ON features(product_id);

CREATE INDEX idx_styles
  ON styles(product_id);

CREATE INDEX idx_skus
  ON skus(style_id);

CREATE INDEX idx_photos
  ON photos(style_id);