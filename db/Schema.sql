CREATE TABLE header (
  ID serial PRIMARY KEY,
  CATEGORY VARCHAR(80) UNIQUE NOT NULL,
);


CREATE TABLE adventure (
  ID serial PRIMARY KEY,
  TITLE VARCHAR (80) UNIQUE NOT NULL,
  CATEGORY_ID VARCHAR(80) REFERENCES header(id),
  DESCRIPTION TEXT,
  PRICE decimal NOT NULL
);

CREATE TABLE pictures (
  ID serial PRIMARY KEY,
  IMAGE_URL TEXT UNIQUE NOT NULL,
  ADVENTURE_ID INTEGER REFERENCES adventure(id)
)

-- some adventures will connect to several categories
-- maybe multiple images (images don't actually need to render from this service, I'll probably just use a fake url)
-- only one price
-- only one description