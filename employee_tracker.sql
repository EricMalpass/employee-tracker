drop database if exists employee_db;
create database employee_db;
use employee_db;

create table department(
	id int auto_increment,
    d_name varchar(30),
    PRIMARY KEY (id)
    );

create table roles(
	id int auto_increment,
    title varchar(30) not null,
    salary decimal null,
    department_id int,
	FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
	);

create table employee(
	id int auto_increment,
	first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    department_id int,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
    );
    
use employee_db;
insert into department (d_name) values ('Sales');
insert into department (d_name) values ('Research');
insert into roles(title, salary, department_id) values ('Salesperson', 100, 1);
insert into roles(title, salary, department_id) values ('Manager', 200, 2);
insert into employee(first_name, last_name, role_id, department_id) values ('Eric', 'Malpass', 1, 1);
insert into employee(first_name, last_name, role_id, department_id) values ('Bill', 'Smith', 2, 2);



	