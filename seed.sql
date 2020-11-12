use seed_db;

insert into department (name)
values ("Baking"), ("Fudging");

insert into roles (title, salary, department_id)
values ("Elf Resources Manager", 46000.00, 5);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Jessica", "Elf", 1, null)


