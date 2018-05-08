CREATE TABLE transactions(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
payee VARCHAR(80),
amount DECIMAL,
envelope INT REFERENCES envelopes(id),
status BOOLEAN NOT NULL,
note VARCHAR(140)
)
