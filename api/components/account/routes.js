import { Router } from 'express';
import AccountController from './controller'

import { createValidator } from 'express-joi-validation';
import { createAccount, makeTransaction, accountId } from './validation'

const router            = Router();
const validator         = createValidator({passError: true});
const accountController = new AccountController();

router.get('/', accountController.index);
router.post('/signup', validator.body(createAccount), accountController.createAccount);
router.put('/deposit/:id', validator.params(makeTransaction.params), validator.body(makeTransaction.body), accountController.makeDeposit);
router.get('/balance/:id', validator.params(accountId), accountController.getBalance);
router.put('/withdraw/:id', validator.params(makeTransaction.params), validator.body(makeTransaction.body), accountController.makeWithdraw);
router.put('/block/:id', validator.params(accountId), accountController.blockAccount);
router.get('/extract/:id', validator.params(accountId), accountController.getExtract);


module.exports = router;
