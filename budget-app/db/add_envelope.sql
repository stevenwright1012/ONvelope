INSERT INTO envelopes(user_id, name, type)
values($1, $2, $3);

SELECT * FROM envelopes
where user_id = $1
ORDER BY type