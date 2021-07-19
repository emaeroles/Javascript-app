const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('Notas desde la bbdd');
});

module.exports = router;