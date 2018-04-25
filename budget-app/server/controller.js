module.exports = {
    allTrans: (req, res) =>{
        const db = req.app.get('db');

        db.get_all_trans([req.params.id]).then(trans => {
            res.status(200).send(trans);
        })
    },
    addTrans:(req, res) => {
        const db = req.app.get('db');
        const {user_id, payee, amount, envelope, status, note} = req.body

        db.add_trans([user_id, payee, amount, envelope, status, note]).then()
    },
    allEnvelopes: (req, res) => {
        const db = req.app.get('db');

        db.get_envelopes([req.params.id]).then(envelopes =>{
            res.status(200).send(envelopes);
        })
    },
    addEnvelope: (req, res) => {
        const db = req.app.get('db');
        const {user_id, name, type} = req.body
        
        db.add_envelope([user_id, name, type]).then(envelopes => {
            res.status(200).send(envelopes);            
        })
    }
}