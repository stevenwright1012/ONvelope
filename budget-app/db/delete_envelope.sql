DELETE FROM transactions
WHERE envelope = $1;

DELETE FROM envelopes
WHERE id = $1;

select * from envelopes
Where user_id = $2 
Order by id DESC;