CREATE TABLE ADVENTURE (
  ID serial PRIMARY KEY,
  TITLE VARCHAR (80) UNIQUE NOT NULL,
  CATEGORY VARCHAR (80) NOT NULL,
  IMAGE_URL TEXT,
  DESCRIPTION TEXT,
  PRICE decimal NOT NULL
);

  id: Number,
  title: String,
  catagory: String, // sic.
  image_URL: String,
  description: String,
  price: Number