DELETE FROM transactions
where id = $1;

SELECT * FROM transactions
Where user_id = $2