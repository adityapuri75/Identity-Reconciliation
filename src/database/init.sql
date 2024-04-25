-- If Exists Table Drop
DROP TABLE IF EXISTS contacts cascade;
-- ================
--   TABLE [users]
-- ================
-- create users table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  phoneNumber VARCHAR(20),
  email VARCHAR(255),
  linkedId INTEGER,
  linkPrecedence VARCHAR(10),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deletedAt TIMESTAMP
);