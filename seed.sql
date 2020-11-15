use seed_db;

insert into department (name)
values ("Baking"), ("Fudging"), ("Elf Resources"), ("Factory Management");

insert into roles (title, salary, department_id)
values ("Pastry Chef", 38000.00, 1), ("Head of Fudging", 52000.00, 2), ("Elf Resources Manager", 46000.00, 3), ("Assembly Line Worker", 25000.00, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values ("Keebleton", "Elf", 1, null), ("Keebler", "Elf", 2, 1), ("Keebling", "Elf", 3, 2), ("Keebster", "Elf", 4, 3);


