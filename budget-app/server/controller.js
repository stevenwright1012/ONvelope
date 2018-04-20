module.exports = {
    butt: (req, res) => {
        const db = req.app.get('db')
        console.log('ive been hit');
        
        db.get_butts().then(result => {
            res.status(200).send(result)
        })
    }
}