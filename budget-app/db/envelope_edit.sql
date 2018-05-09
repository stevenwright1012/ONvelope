UPDATE envelopes
SET amount = amount - $1
where id = $2;

UPDATE envelopes
SET amount = amount + $3
WHERE id = $4;

SELECT * FROM Envelopes
WHERE user_id = $5
ORDER BY type