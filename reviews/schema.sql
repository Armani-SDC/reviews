CREATE SCHEMA reviewSchema

CREATE TABLE photos (
  id serial PRIMARY KEY,
  url text
);

CREATE TABLE products (
  product_id integer PRIMARY KEY
);

CREATE TABLE reviews (
  id serial PRIMARY KEY,
  review_id integer,
  product_id integer,
  rating integer,
  summary integer,
  recommend boolean,
  response text,
  body text,
  date date,
  reviewer_name text,
  helpfulness integer,
  photo_id integer
  );

CREATE TABLE meta (
  id serial PRIMARY KEY,
  product_id integer,
  ratings integer,
  recommended integer,
  characteristics_id integer
);

CREATE TABLE characteristics (
  id serial PRIMARY KEY,
  Size text,
  Width text,
  Comfort text,
  Fit text,
  Length text,
  Quality text
);


ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE reviews ADD FOREIGN KEY (photo_id) REFERENCES photos (id);
ALTER TABLE meta ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE meta ADD FOREIGN KEY (characteristics_id) REFERENCES characteristics (id);