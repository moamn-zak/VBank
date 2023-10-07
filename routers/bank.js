const express = require('express');

const bankFuncs = require('../controllers/bankFunctions');

const router = express.Router();


router.post('/createBankAccount', bankFuncs.createBankAccount);///:accountHolder
router.post('/pay', bankFuncs.pay);///:accountHolder

router.get('/getBalance/:accountId', bankFuncs.getBalance);
router.get('/getAccounts', bankFuncs.getAccounts);


// router.post('/getBalance', bankFun.getBalance);




module.exports = router;
