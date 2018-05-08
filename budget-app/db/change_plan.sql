UPDATE users
SET payday = $1
WHERE user_id = $2;

SELECT payday FROM users
WHERE user_id = $2