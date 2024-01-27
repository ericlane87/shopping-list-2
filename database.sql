-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE shopingList (
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(80) NOT NULL,
    Quantity DECIMAL NOT NULL,
    Unit VARCHAR(20),
    is_purchased BOOLEAN NOT NULL DEFAULT false
);


INSERT INTO shopingList (Name, Quantity, Unit) VALUES
    ('Apple', 10.5, 'oz'),
    ('Chicken', 20.2, 'pounds'),
    ('Pan', 1, NULL),
    ('eggs', 12, 'oz');