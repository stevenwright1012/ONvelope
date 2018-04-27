UPDATE envelopes
SET amount = amount + $1
WHERE id = $2;

select * from envelopes
where user_id = $3