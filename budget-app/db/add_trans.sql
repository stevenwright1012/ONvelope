INSERT INTO transactions (user_id, payee, amount, envelope, status, note)
VALUES ($1, $2, $3, $4, $5, $6);

SELECT * FROM transactions
WHERE user_id = $1
ORDER BY id DESC;

