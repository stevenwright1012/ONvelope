DELETE FROM transactions;

UPDATE users
SET total = 300
WHERE user_id = 1;

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'store', 20, 1, true, 'yummy');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'trent', 300, 2, true, 'sketch');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'place', -40, 3, true, 'afsd');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'store', -20, 4, false, 'asdf');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'sold phone', 20, 5, true, 'well done');

UPDATE envelopes
set amount = 20
where id =1;

UPDATE envelopes
set amount = 300
where id =2;

UPDATE envelopes
set amount = -40
where id =3;

UPDATE envelopes
set amount = -20
where id =4;

UPDATE envelopes
set amount = 20
where id =5;

UPDATE envelopes
set amount = 0
where id = 6;
