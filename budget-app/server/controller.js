module.exports = {
    allTrans: (req, res) =>{
        const db = req.app.get('db');

        db.get_all_trans([req.params.id]).then(trans => {
            res.status(200).send(trans);
        }).catch(console.log)
    },
    addTrans:(req, res) => {
        const db = req.app.get('db');
        const {user_id, payee, amount, envelope, status, note, total} = req.body;
        let tempArr = []

        tempArr.push(db.add_trans([user_id, payee, amount, envelope, status, note]));
        tempArr.push(db.alter_total([total, user_id]));
        tempArr.push(db.alter_envelope([amount, envelope, user_id]));

        Promise.all(tempArr).then(values => {
            res.status(200).send(values);
        }).catch(console.log)
    },
    addDepo: (req, res) => {
        const db = req.app.get('db');
        const { envelope, amount, payer} = req.body
        
        db.add_trans(req.user.user_id, payer, amount, envelope, true, null).then(trans => {
            res.status(200).send(trans)
        })
    },
    deleteTrans: (req, res) => {
        const db = req.app.get('db');
        const{id, total, amount, envelope} = req.body
        const{user_id} = req.user
        let tempArr=[]
        
        tempArr.push(db.delete_trans([id, user_id]));
        tempArr.push(db.alter_total([total, user_id]));
        tempArr.push(db.alter_envelope([amount, envelope, user_id]));        

        Promise.all(tempArr).then(values => {
            res.status(200).send(values);
        }).catch(console.log)
    },
    allEnvelopes: (req, res) => {
        const db = req.app.get('db');

        db.get_envelopes([req.params.id]).then(envelopes =>{
            res.status(200).send(envelopes);
        }).catch(console.log)
    },
    addEnvelope: (req, res) => {
        const db = req.app.get('db');
        const {user_id, name, type} = req.body
        
        db.add_envelope([user_id, name, type]).then(envelopes => {
            res.status(200).send(envelopes);            
        }).catch(console.log)
    },
}