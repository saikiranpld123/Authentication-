-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create User_Roles Join Table
CREATE TABLE user_roles (
    userId INTEGER,
    roleId INTEGER,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY (userId, roleId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert Initial Data into Roles Table
INSERT INTO roles (name, createdAt, updatedAt) VALUES ('user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO roles (name, createdAt, updatedAt) VALUES ('moderator', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO roles (name, createdAt, updatedAt) VALUES ('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

