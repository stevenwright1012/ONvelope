UPDATE envelopes
SET amount = amount - $3
where id = $1;

UPDATE envelopes
SET amount = amount + $3
WHERE id = $2;

SELECT * FROM Envelopes
WHERE user_id = $4