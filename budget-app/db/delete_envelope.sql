delete from envelopes
where id = $1;

select * from envelopes
Where user_id = $2 