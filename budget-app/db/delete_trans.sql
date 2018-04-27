DELETE FROM transactions
WHERE id = $1;

SELECT * FROM transactions
WHERE user_id = $2
ORDER BY id DESC;