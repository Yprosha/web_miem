
CREATE TABLE topk (
    id SERIAL PRIMARY KEY,
    place INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    photo_link VARCHAR(255),
    rate DECIMAL(5, 2),
    film_link VARCHAR(255),
    description TEXT
);

CREATE TABLE topi (
    id SERIAL PRIMARY KEY,
    place INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    photo_link VARCHAR(255),
    rate DECIMAL(5, 2),
    film_link VARCHAR(255),
    description TEXT
);
