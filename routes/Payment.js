var express = require('express');
const { payment, payment_update, payment_delete, payment_find } = require('../Controller/Payment');
var router = express.Router();


router.post('/',payment)
router.post('/paymentupdate/:id',payment_update)
router.get('/paymentdelete/:id',payment_delete)
router.get('/paymentfind/:id',payment_find)

module.exports = router;