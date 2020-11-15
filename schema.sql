drop database if exists seed_db;

create seed_db;

use seed_db;

create table department (
    id int auto_increment not NULL,
    name varchar(30) not NULL,
    primary key (id)
)

create table roles (
    id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    department_id int not null,
    primary key (id)
)

create table employee (
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key (id)
)
