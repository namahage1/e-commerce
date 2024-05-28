insert into department (name)
values ('IT');

insert into role  (title,salary,department_id)
values ('Project Manager', 100, 1),
 ('Application Developer', 70, 1),
 ('DBA', 80, 1);

insert into employee  (first_name,last_name,role_id,manager_id)
values ('Beaie','A',1,null),
 ('KD','A',2,1),
 ('Chibi','A',3,1),
 ('Colin','A',2,1),
 ('Kenji','A',3,1);
