CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes numeric
);

ALTER TABLE blogs ALTER COLUMN likes SET DEFAULT 0;

INSERT into blogs (author, url, title, likes) VALUES ('juho', '/1', 'testi', 1);
INSERT into blogs (author, url, title, likes) VALUES ('jouko', '/2', 'joukon blogi', 1);