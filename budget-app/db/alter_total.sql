UPDATE users
SET total = $1
WHERE user_id = $2;

SELECT * FROM users
WHERE user_id = $2;