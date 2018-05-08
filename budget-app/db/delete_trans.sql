DELETE FROM transactions
WHERE trans_id = $1;

SELECT * FROM transactions t
JOIN envelopes e on e.id = t.envelope
WHERE t.user_id = $2
ORDER BY trans_id DESC;