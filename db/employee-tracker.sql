DROP database if exists employee_info;
create database employee_info;

\c employee_info;

create table department (
  id serial primary key,
  name VARCHAR(30) NOT NULL unique
);
-- role
 create table role(
    id serial primary key,
    title varchar(30) unique not null,
    salary decimal not null,
    department_id integer not null references department(id)
 );

create table employee(
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null references role(id),
    manager_id integer references employee(id) 
);
