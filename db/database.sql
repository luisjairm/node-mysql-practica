CREATE DATABASE IF NOT EXISTS companydb;
use companydb;

CREATE TABLE employes(
 id INT(11) NOT NULL AUTO_INCREMENT,
 name VARCHAR(45) DEFAULT NULL,
 salary INT(5) DEFAULT NULL,
 PRIMARY KEY(id)
);

INSERT INTO employes(name, salary) VALUES ('luis', '3000'),
('enrique', '4000'),
('oa', '6000');