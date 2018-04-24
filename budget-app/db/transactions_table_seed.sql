CREATE TABLE transactions(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
payee VARCHAR(80),
amount DECIMAL,
envelope VARCHAR(30),
status BOOLEAN NOT NULL,
note VARCHAR(140)
)
