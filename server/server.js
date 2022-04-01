// CREATE TABLE table_name ();

BULK INSERT allsides_data
FROM '/Users/adriankarnani/Documents/Codesmith/*Projects/Scratch Project/ScratchProject/server/AllSides data files/allsides.csv'
WITH
(
        FORMAT='CSV',
        FIRSTROW=2
)

ALTER TABLE allsides_data
ADD COLUMN id SERIAL PRIMARY KEY,
ADD COLUMN name VARCHAR,
ADD COLUMN bias VARCHAR;

SELECT * FROM allsides_data

INSERT INTO allsides_data(name, bias)
VALUES ('testName', 'testBias');

DELETE FROM allsides_data
WHERE id = 1;

ALTER TABLE allsides_data 
DROP COLUMN id;

\COPY allsides_data FROM '/Users/adriankarnani/Documents/Codesmith/*Projects/Scratch Project/ScratchProject/server/AllSides data files/allsides_twocolumn.csv' DELIMITER ',' CSV HEADER;