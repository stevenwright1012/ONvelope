module.exports = {
    allTrans: (req, res) =>{
        const db = req.app.get('db');

        db.get_all_trans([req.params.id]).then(trans => {
            res.status(200).send(trans);
        }).catch(console.log)
    },
    addTrans:(req, res) => {
        const db = req.app.get('db');
        const { payee, amount, envelope, status, note} = req.body;
        const{user_id} = req.user        
        let tempArr = []

        tempArr.push(db.add_trans([user_id, payee, amount, envelope, status, note]));
            if(!status){
                tempArr.push(db.alter_total([0, user_id]));
            }
            else{
                tempArr.push(db.alter_total([amount, user_id]));                
            }
        tempArr.push(db.alter_envelope([amount, envelope, user_id]));

        Promise.all(tempArr).then(values => {
            res.status(200).send(values);
        }).catch(console.log)
    },
    deleteTrans: (req, res) => {
        const db = req.app.get('db');
        const{id, amount, envelope, status} = req.body
        const{user_id} = req.user
        let tempArr=[]
        
        tempArr.push(db.delete_trans([id, user_id]));
        if(!status){
            tempArr.push(db.alter_total([0, user_id]));
        }
        else{
            tempArr.push(db.alter_total([amount, user_id]));                
        }
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
    move: (req, res) => {
        const db = req.app.get('db');
        const {fromId, toId, amount} = req.body
        const{user_id} = req.user
        
        
        db.move([fromId, toId, amount, user_id]).then(envelopes => {
            res.status(200).send(envelopes);
        }).catch(console.log)
    },
    changePlan: (req, res) => {
        const db = req.app.get('db');
        const{user_id} = req.user
        // console.log(req.body);
        
        db.change_plan([req.body, user_id]).then(user => {
            console.log(user);
            
            res.status(200).send(user[0]);
        }).catch(console.log)
    },
    editTrans: (req, res) => {
        const db = req.app.get('db');
        const{user_id} = req.user
        const{trans_id, payee, amountOG, amountNew, envelopeOG, envelopeNew, statusOG, statusNew, note} = req.body
        let tempArr=[]
        let difference = amountNew - amountOG
        
        tempArr.push(db.edit_trans([payee, amountNew, envelopeNew, statusNew, note, trans_id, user_id]));
        if(statusOG === false && statusNew === true){
            tempArr.push(db.alter_total([amountNew, user_id]));
        }
        else if(statusOG === true && statusNew === false){
            tempArr.push(db.alter_total([(amountOG * -1), user_id]));                
        }
        else if(statusOG === true && statusNew === true){
            tempArr.push(db.alter_total([difference, user_id]));                            
        }
        else if (statusOG === false && statusNew === false){
            tempArr.push(db.alter_total([0, user_id]));
        }
        tempArr.push(db.envelope_edit([amountOG, envelopeOG, amountNew, envelopeNew, user_id])); 

        Promise.all(tempArr).then(values => {
            res.status(200).send(values);
        }).catch(console.log)
    },
}