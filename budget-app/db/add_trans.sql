INSERT INTO transactions (user_id, payee, trans_amount, envelope, status, note)
VALUES ($1, $2, $3, $4, $5, $6);

SELECT * FROM transactions t
JOIN envelopes e on e.id = t.envelope
WHERE t.user_id = $1
ORDER BY trans_id DESC;

