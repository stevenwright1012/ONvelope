CREATE TABLE envelopes(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
name VARCHAR(30),
type VARCHAR(30),
amount DECIMAL
)
