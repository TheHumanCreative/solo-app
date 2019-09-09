
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "batch"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"(id),
    "beer_id" INT NOT NULL REFERENCES beer(id),
    "batch_name" VARCHAR (255) NOT NULL,
    "temp_hlt" INT,
    "temp_mash_in" INT,
    "temp_mash_out" INT,
    "time_boil" INT,
    "notes" VARCHAR (1000)
);


CREATE TABLE "style"
(
    "id" SERIAL PRIMARY KEY,
    "beer_type" VARCHAR(255)
);

CREATE TABLE "beer"
(
    "id" SERIAL PRIMARY KEY,
    "beer_name" VARCHAR (255) NOT NULL,
    "style_id" INT NOT NULL REFERENCES style(id)
);

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255),
    "password" VARCHAR(255)
);

INSERT INTO "style"
    ("beer_type")
VALUES
    ('Amber Ale'),
    ('Pale Ale'),
    ('IPA'),
    ('Sour'),
    ('Brown Ale');

INSERT INTO "beer"
    ("beer_name", "style_id")
VALUES
    ('Amberthyst', 1),
    ('Lampshade', 2),
    ('ChordTangle', 3),
    ('Pentagram', 4),
    ('SmoresBier', 5);
	