CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    github_link VARCHAR(255)
);

INSERT INTO projects (name, description, github_link) VALUES
('Auction Site', 'A full-stack auction website.', 'https://github.com/YashPuranik27/auction-site');
