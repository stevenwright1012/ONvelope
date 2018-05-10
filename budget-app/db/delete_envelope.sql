UPDATE ENVELOPES
SET type = null, amount = null
WHERE id = $1;

select * from envelopes
Where user_id = $2 
Order by type