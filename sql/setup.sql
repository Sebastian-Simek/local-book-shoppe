-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS author_books CASCADE;


CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob INT NOT NULL,
    pob VARCHAR NOT NULL 
);

CREATE TABLE author_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books (id),
    FOREIGN KEY (author_id) REFERENCES authors (id)
);

INSERT INTO books (
    title,
    released
)
VALUES 
('Straight Outa Gondor', 2015),
('Managing Aquariums', 2021),
('A Drive with a Van', 2018),
('Men with Ven', 2012),
('My Personal Diary, a Memoir', 2022),
('The Hardest Part about Life is Humans', 2022),
('Brahms, a Retrospective', 2010),
('Just Being Better, a Memoir', 2004),
('How Win Friends and Influence People in Chat', 2017),
('Pot Cookies for the Munchies Soul', 2015), 
('CBD Tots 4 Kids', 2020);


INSERT INTO authors (
    name,
    dob,
    pob
)
VALUES 
('Brian Thomas', 1892, 'Toronto, Canada'),
('Kat Zaro', 1744, 'Zagreb, Croatia'),
('Amanda Hecht', 1910, 'Zurich, Switzerland'),
('Amaya Alejandra', 1689, 'Tunis, Tunisia'),
('Austin Han', 1933, 'Astoria, OR'),
('David Francisco', 1922, 'New Orleans, LA');

INSERT INTO author_books (
    book_id,
    author_id
)
VALUES 
(1, 6),
(2, 3),
(3, 4),
(4, 6),
(5, 1),
(6, 2),
(7, 5),
(8, 1),
(9, 1),
(10, 3),
(11, 3);

