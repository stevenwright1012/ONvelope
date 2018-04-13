module.exports = {
    butt: (req, res) => {
        const db = req.app.get('db')

        db.get_butts().then(res => {
            res.status(200).send(res)
        })
    }
}