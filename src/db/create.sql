CREATE TYPE NOTE AS JSON (
    "text" TEXT NOT NULL,
    isColmpleted BOOLEAN NOT NULL
);
CREATE TABLE todo (
    _id uuid PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    notes NOTE [] NOT NULL,
    color TEXT NOT NULL,
    isChechBoxMode BOOLEAN NOT NULL,
    createdAt CURRENT_TIMESTAMP
);
CREATE TABLE label (
    _id uuid PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    todos TEXT [] NOT NULL
);
-- CREATE TABLE note (
--     _id uuid PRIMARY KEY NOT NULL,
--     _todoId uuid REFERENCES todo(_id),
--     "text" TEXT NOT NULL,
--     isColmpleted BOOLEAN NOT NULL
-- );