CREATE DATABASE teesas;


--/c into todo

CREATE TABLE student( id SERIAL PRIMARY KEY, childName VARCHAR(100),email VARCHAR(100),phoneNumber VARCHAR(100),countryCode VARCHAR(100), password VARCHAR(300),grade VARCHAR(100),currentLevel VARCHAR(100));

CREATE TABLE lesson (id SERIAL PRIMARY KEY, name VARCHAR(100), level VARCHAR(100));
