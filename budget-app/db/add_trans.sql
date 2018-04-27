INSERT INTO transactions (user_id, payee, amount, envelope, status, note)
VALUES ($1, $2, $3, $4, $5, $6);

-- UPDATE users
-- SET total = total + $3
-- WHERE user_id = $1;

-- UPDATE envelopes
-- SET amount = amount + $3
-- WHERE id = $4;

SELECT * FROM transactions
WHERE user_id = $1
ORDER BY id DESC;

-- SELECT* from users
-- where user_id = $1;

-- SELECT * from envelopes
-- WHERE user_id = $1;