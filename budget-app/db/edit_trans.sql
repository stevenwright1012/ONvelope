UPDATE transactions
SET payee = $1, trans_amount = $2, envelope = $3, status = $4, note = $5
WHERE trans_id = $6;

select * from transactions t
JOIN envelopes e on e.id = t.envelope
WHERE t.user_id = $7