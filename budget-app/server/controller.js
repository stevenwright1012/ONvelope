module.exports = {
    allTrans: (req, res) =>{
        const db = req.app.get('db');

        db.get_all_trans([req.params.id]).then(trans => {
            res.status(200).send(trans);
        })
    }
}