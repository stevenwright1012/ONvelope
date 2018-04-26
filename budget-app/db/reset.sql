UPDATE users
SET total = 300
WHERE user_id = 1

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'store', 20, 'petty cash', true, 'yummy');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'trent', 300, 'petty cash', true, 'sketch');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'place', -40, 'petty cash', true, 'afsd');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'store', -20, 'petty cash', false, 'asdf');

insert into transactions(user_id, payee, amount, envelope, status, note)
values(1, 'sold phone', 20, 'rent', true, 'well done');