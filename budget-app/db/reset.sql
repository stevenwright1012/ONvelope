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