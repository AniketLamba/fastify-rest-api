DROP SCHEMA demo CASCADE;

CREATE SCHEMA demo;

CREATE TABLE IF NOT EXISTS organization (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  is_active BOOLEAN
);


CREATE TABLE DoctorsByOrganization (
  id INTEGER,
  Doctor INTEGER,
  Organization INTEGER,
  IsActive BOOLEAN
);

ALTER TABLE DoctorsByOrganization
ADD CONSTRAINT doctors_org_fk FOREIGN KEY (Doctor) REFERENCES doctors(id),
ADD CONSTRAINT org_fk FOREIGN KEY (Organization) REFERENCES organization(id);
