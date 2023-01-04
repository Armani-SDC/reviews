DROP SCHEMA IF EXISTS reviewSchema CASCADE;

CREATE SCHEMA reviewSchema;

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  id serial PRIMARY KEY,
  review_id integer,
  url text
);


  DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
  id serial PRIMARY KEY,
  product_id integer,
  rating integer,
  date date,
  summary text,
  body text,
  recommend boolean,
  reported boolean DEFAULT false,
  reviewer_name text,
  reviewer_email text,
  response text,
  helpfulness integer DEFAULT 0
);
  -- copy reviews from '/Users/jonathan/HackReactor/sdc/reviews/csvs/reviews.csv' delimiter ',' header csv;

  DROP TABLE IF EXISTS meta CASCADE;
CREATE TABLE meta (
  id serial PRIMARY KEY,
  characteristics_id integer,
  review_id integer,
  value integer
);


  DROP TABLE IF EXISTS characteristics CASCADE;
CREATE TABLE characteristics (
  id serial PRIMARY KEY,
  product_id integer,
  name text
);



-- ALTER TABLE meta ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
-- ALTER TABLE meta ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics (id);

  copy characteristics from '/Users/jonathan/HackReactor/sdc/reviews/csvs/characteristics.csv' delimiter ',' header csv;

  copy meta from '/Users/jonathan/HackReactor/sdc/reviews/csvs/characteristic_reviews.csv' delimiter ',' header csv;

  copy photos from '/Users/jonathan/HackReactor/sdc/reviews/csvs/reviews_photos.csv' delimiter ',' header csv;

  SELECT setval('photos_id_seq', max(id)) FROM photos;
  SELECT setval('meta_id_seq', max(id)) FROM meta;
  SELECT setval('characteristics_id_seq', max(id)) FROM characteristics;