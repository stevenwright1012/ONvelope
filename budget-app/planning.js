// GET ('/api/trans:id', method)   //gets all transactions for a user
//     method= (req, res, next) => {db.get_user_trans([req.params.id]).then(trans => {
//             res.status(200).send(trans)
//         })
//     }

// POST ('/api/trans', method)  //adds new transaction
//     method= (req, res, next) => {db.add_trans([req.session.user_id, req.body.payee, req.body.amount...]).then(trans => {
//             res.status(200).send(trans)
//         })
//     }

// PUT ('/api/trans:id', method)  //edits transaction
//     method= (req, res, next) => {db.edit_trans([req.param.id, req.body.payee, req.body.amount...]).then(trans => {
//             res.status(200).send(trans)
//         })
//     }