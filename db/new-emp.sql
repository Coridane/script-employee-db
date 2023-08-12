INSERT INTO departments (id, name)
VALUES
    ( 01, 'Command' ),
    ( 02, 'Operations' ),
    ( 03, 'Sciences' );

INSERT INTO roles (id, title, salary, department_id)
VALUES    
    ( 01, 'Admiral', 3000.00, 01 ),
    ( 02, 'Captain', 2000.00, 01 ),
    ( 03, 'First Officer', 1000.00, 01 ),
    ( 04, 'Helm Officer', 1000.00, 02 ),
    ( 05, 'Nav Officer', 500.00, 02 ),    
    ( 06, 'Comm Officer', 500.00, 02 ),
    ( 07, 'Medical Officer', 2000.00, 03 ),
    ( 08, 'Counselor', 1000.00, 03 ),
    ( 09, 'Engineer', 2000.00, 02 ),
    ( 10, 'Ops Officer', 500.00, 02 ),
    ( 11, 'Security Officer', 500.00, 02 );

INSERT INTO employees (id, first_name, last_name, role_id, manager_Id)
VALUES    
    ( 01, 'Kathryn', 'Janeway', 01, NULL ),
    ( 02, 'James', 'Kirk', 02, 01 ),
    ( 03, 'Mister', 'Spock', 03, 02 ),
    ( 04, 'Leonard', 'McCoy', 07, 02 ),
    ( 05, 'Nyota', 'Uhura', 06, 02 ),
    ( 06, 'Hikaru', 'Sulu', 04, 02 ),
    ( 07, 'Pavel', 'Chekov', 05, 02 ),
    ( 08, 'Montgomery', 'Scott', 09, 02 ),
    ( 09, 'Jean-Luc', 'Picard', 02, 01 ),
    ( 10, 'William', 'Riker', 03, 09 ),
    ( 11, 'Mister', 'Data', 10, 09 ),
    ( 12, 'Wesley', 'Crusher', 04, 09 ),
    ( 13, 'Deanna', 'Troi', 08, 09 ),
    ( 14, 'Beverly', 'Crusher', 07, 09 ),
    ( 15, 'Geordi', 'La Forge', 09, 09 ),
    ( 16, 'Mister', 'Worf', 11, 09 );
    



