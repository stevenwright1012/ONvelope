CREATE TABLE users(
user_id SERIAL PRIMARY KEY,
username VARCHAR(40),
email VARCHAR(80),
Total DECIMAL DEFAULT 0,
auth_id TEXT,
payday JSON DEFAULT '{"amount": 0}'
)
