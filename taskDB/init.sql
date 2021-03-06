
CREATE TABLE tasks_table (
    id serial PRIMARY KEY, 
    name text,
    category text, 
    recurrence integer, 
    last_serviced date,
    user_id integer NOT NULL -- REFERENCES users ON DELETE CASCADE
    );
INSERT INTO tasks_table (name, category, recurrence, last_serviced, user_id) VALUES  
    ( 'Roof Repair', 'Roof', 15, '2020-08-23', 1),
    ( 'Hot Water Heater', 'Appliance', 10, '2020-05-13', 1),
    ( 'Garbage Disposal', 'Plumbing', 8, '2020-07-22', 3),
    ( 'Circuit Breaker', 'Electrician', 15, '2020-01-02', 4),
    ( 'Sprinkler System Check', 'Yard' , 1, '2019-03-29', 3),
    ( 'A/C Filter', 'Appliance' ,  1,  '2015-08-23', 2),
    ( 'Deck Stain', 'Carpentry' ,  7,  '2003-11-23', 3);