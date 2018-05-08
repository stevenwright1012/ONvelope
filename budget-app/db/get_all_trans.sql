select * from transactions t
JOIN envelopes e on e.id = t.envelope
WHERE t.user_id = 1
ORDER BY t.id DESC