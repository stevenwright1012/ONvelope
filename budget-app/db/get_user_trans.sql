SELECT * from transactions
WHERE user_id = $1
ORDER BY id DESC