DROP SCHEMA IF EXISTS reviewSchema CASCADE;

CREATE SCHEMA reviewSchema;

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id integer PRIMARY KEY,
  review_id integer,
  url text
);
  copy photos from '/Users/jonathan/HackReactor/sdc/reviews/csvs/reviews_photos.csv' delimiter ',' header csv;

  DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
  id integer PRIMARY KEY,
  product_id integer,
  rating integer,
  date text,
  summary text,
  body text,
  recommend boolean,
  reported boolean,
  reviewer_name text,
  reviewer_email text,
  response text,
  helpfulness text
);
  copy reviews from '/Users/jonathan/HackReactor/sdc/reviews/csvs/reviews.csv' delimiter ',' header csv;

  DROP TABLE IF EXISTS meta CASCADE;
CREATE TABLE meta (
  id integer PRIMARY KEY,
  characteristics_id integer,
  review_id integer,
  value integer
);
  copy meta from '/Users/jonathan/HackReactor/sdc/reviews/csvs/characteristic_reviews.csv' delimiter ',' header csv;

  DROP TABLE IF EXISTS characteristics CASCADE;
CREATE TABLE characteristics (
  id integer PRIMARY KEY,
  product_id integer,
  name text
);
  copy characteristics from '/Users/jonathan/HackReactor/sdc/reviews/csvs/characteristics.csv' delimiter ',' header csv;

-- ALTER TABLE meta ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE reviews ADD FOREIGN KEY (photo_id) REFERENCES photos (id);
-- ALTER TABLE meta ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics (id);

