CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (50) NOT NULL,
    "priority" VARCHAR (10),
    "status" BOOLEAN DEFAULT FALSE,
    );

DROP TABLE "tasks";

INSERT INTO "tasks"
    ("desription", "priority", "status")
VALUES
    ('Wire up new fixture', '3', false)
    ('Reorganize garage', '2', false)
    ('Squirrel-proof garden' '1', false)
    ('Fix french press?' '1', false)
    
SELECT * FROM "tasks";