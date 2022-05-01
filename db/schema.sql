DROP TABLE IF EXISTS empInfo;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE empInfo (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) 
);

-- SELECT empInfo.*, empRole.title 
-- FROM empInfo 
-- LEFT JOIN role 
-- ON employeeInfo.role_id = empRole.id;

-- SELECT
--   empInfo.id,
--   empInfo.first_name AS 'first name',
--   empInfo.last_name AS 'last name',
--   role.title AS 'job title',
--   department.name AS 'department',
--   role.salary,
--   CONCAT (manager.first_name, ' ', manager.last_name) AS 'manager'
-- FROM
--   empInfo
--   JOIN role ON empInfo.role_id = role.id
--   JOIN department ON role.department_id = department.id
--   LEFT JOIN empInfo manager ON manager.id = empInfo.manager_id;
