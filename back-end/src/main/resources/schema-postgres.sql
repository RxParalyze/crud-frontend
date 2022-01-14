CREATE EXTENSION IF NOT EXISTS pgcrypto;

SET search_path TO crud,blog;

DROP SCHEMA IF EXISTS blog CASCADE;

CREATE SCHEMA blog;

CREATE TABLE blogUser (
  id            	 SERIAL NOT NULL,
  firstName        VARCHAR,
  lastName         VARCHAR,
  userName      	 VARCHAR,
  password         VARCHAR,
  PRIMARY KEY (id)
);

CREATE TABLE post (
  id            SERIAL NOT NULL,
  userId        INT,
  title      	  VARCHAR(140),
  content       VARCHAR,
  date          TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES blogUser(id) ON DELETE CASCADE
);